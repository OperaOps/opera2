/**
 * POST /api/connect/signup — start a clinic's Opera onboarding.
 *
 * Body: { clinicName, contactName, email, phone?, practiceType?,
 *         acceptTerms: true, activationCode? }
 *
 * Two paths:
 *   1. Stripe configured (default): create a pending clinic + Stripe Checkout
 *      session (monthly subscription with a 30-day free trial) → { checkoutUrl }.
 *      The API key is issued when checkout completes (webhook or success page).
 *   2. Activation code (beta fallback / hand-issued installs): matches
 *      OPERA_ACTIVATION_CODE → clinic is activated immediately with a 30-day
 *      trial and the key is returned inline → { apiKey, clinicId }.
 */

import { NextRequest, NextResponse } from "next/server";
import {
  activateClinic,
  createClinic,
  linkCheckoutSession,
} from "@/lib/connect/clinic-store";
import {
  getStripe,
  isStripeConfigured,
  normalizePlan,
  PLANS,
  planPriceId,
  TRIAL_DAYS,
} from "@/lib/connect/stripe";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function baseUrl(request: NextRequest): string {
  const configured = process.env.OPERA_PUBLIC_URL?.trim();
  if (configured) return configured.replace(/\/$/, "");
  const proto = request.headers.get("x-forwarded-proto") || "https";
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host") || "";
  return `${proto}://${host}`;
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const clinicName = typeof body.clinicName === "string" ? body.clinicName.trim() : "";
  const contactName = typeof body.contactName === "string" ? body.contactName.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : undefined;
  const practiceType = typeof body.practiceType === "string" ? body.practiceType.trim() : undefined;
  const activationCode = typeof body.activationCode === "string" ? body.activationCode.trim() : "";
  const plan = normalizePlan(body.plan);

  if (!clinicName) return NextResponse.json({ error: "Clinic name is required." }, { status: 400 });
  if (!contactName) return NextResponse.json({ error: "Contact name is required." }, { status: 400 });
  if (!EMAIL_RE.test(email)) return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  if (body.acceptTerms !== true) {
    return NextResponse.json({ error: "You must accept the Terms of Service." }, { status: 400 });
  }

  // --- Path 2: activation code (beta) -------------------------------------
  if (activationCode) {
    const expected = process.env.OPERA_ACTIVATION_CODE?.trim();
    if (!expected || activationCode !== expected) {
      return NextResponse.json({ error: "That activation code isn't valid." }, { status: 400 });
    }
    const clinic = await createClinic({
      clinicName, contactName, email, phone, practiceType,
      activationMethod: "activation_code",
    });
    await activateClinic(clinic, { status: "trialing", trialDays: TRIAL_DAYS });
    return NextResponse.json({
      mode: "activation",
      clinicId: clinic.clinicId,
      clinicName: clinic.clinicName,
      apiKey: clinic.apiKey,
      trialEndsAt: clinic.trialEndsAt,
    });
  }

  // --- Path 1: Stripe checkout ---------------------------------------------
  if (!isStripeConfigured(plan)) {
    return NextResponse.json(
      {
        error:
          "Online payment isn't live yet — use the activation code from your Opera onboarding email, or contact opera@getopera.ai.",
        code: "stripe_not_configured",
      },
      { status: 503 }
    );
  }

  const clinic = await createClinic({
    clinicName, contactName, email, phone, practiceType,
    activationMethod: "stripe",
  });

  const origin = baseUrl(request);
  const session = await getStripe().checkout.sessions.create({
    mode: "subscription",
    customer_email: email,
    line_items: [{ price: planPriceId(plan)!, quantity: 1 }],
    subscription_data: {
      trial_period_days: TRIAL_DAYS,
      metadata: { clinicId: clinic.clinicId, clinicName, plan: PLANS[plan].name },
    },
    metadata: { clinicId: clinic.clinicId, plan },
    allow_promotion_codes: true,
    success_url: `${origin}/connect/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/connect?canceled=1`,
  });

  await linkCheckoutSession(clinic.clinicId, session.id);

  return NextResponse.json({ mode: "checkout", checkoutUrl: session.url });
}
