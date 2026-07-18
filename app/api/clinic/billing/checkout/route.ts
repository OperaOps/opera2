/**
 * POST /api/clinic/billing/checkout { plan: "core" | "growth" }
 * Creates an EMBEDDED Stripe Checkout session for the signed-in clinic and
 * returns its client_secret for @stripe/stripe-js to mount in the page.
 */

import { NextRequest, NextResponse } from "next/server";
import { verifyClinicToken } from "@/lib/auth/clinic-auth";
import { getClinic, saveClinic } from "@/lib/connect/clinic-store";
import { getStripe } from "@/lib/connect/stripe";

export async function POST(request: NextRequest) {
  const session = await verifyClinicToken(request);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json({ error: "billing_not_configured" }, { status: 503 });
  }

  let plan: "core" | "growth" = "core";
  try {
    const body = await request.json();
    if (body.plan === "growth") plan = "growth";
  } catch {
    /* default core */
  }

  const priceId =
    plan === "growth"
      ? process.env.STRIPE_PRICE_ID_GROWTH
      : process.env.STRIPE_PRICE_ID_CORE;
  if (!priceId) {
    return NextResponse.json({ error: "price_not_configured" }, { status: 503 });
  }

  const base = process.env.OPERA_PUBLIC_URL || new URL(request.url).origin;

  try {
    const account = await getClinic(session.clinicId);
    let customerId = account?.stripeCustomerId;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: session.email,
        name: account?.clinicName ?? session.clinicName,
        metadata: { clinicId: session.clinicId },
      });
      customerId = customer.id;
      if (account) {
        account.stripeCustomerId = customerId;
        await saveClinic(account);
      }
    }

    const checkout = await stripe.checkout.sessions.create({
      ui_mode: "embedded_page" as never,
      mode: "subscription",
      customer: customerId,
      line_items: [{ price: priceId, quantity: 1 }],
      subscription_data: {
        trial_period_days: account?.stripeSubscriptionId ? undefined : 30,
        metadata: { clinicId: session.clinicId, plan },
      },
      metadata: { clinicId: session.clinicId, plan },
      return_url: `${base}/clinic/dashboard/billing?checkout=done&session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.json({ clientSecret: checkout.client_secret });
  } catch (err) {
    console.error("[billing-checkout] failed", err);
    return NextResponse.json({ error: "stripe_error" }, { status: 502 });
  }
}
