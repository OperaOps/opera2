/**
 * GET /api/connect/session?session_id=cs_… — post-checkout key retrieval.
 *
 * Called by /connect/success after Stripe redirects back. Verifies the
 * checkout session with Stripe, activates the clinic if the webhook hasn't
 * landed yet (idempotent), and returns the API key + install instructions
 * data. Safe to reload: the same key is returned every time.
 */

import { NextRequest, NextResponse } from "next/server";
import {
  activateClinic,
  findClinicByCheckoutSession,
  linkSubscription,
  saveClinic,
} from "@/lib/connect/clinic-store";
import { getStripe, isStripeConfigured } from "@/lib/connect/stripe";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id")?.trim();
  if (!sessionId) {
    return NextResponse.json({ error: "session_id is required." }, { status: 400 });
  }

  const clinic = await findClinicByCheckoutSession(sessionId);
  if (!clinic) {
    return NextResponse.json({ error: "Unknown checkout session." }, { status: 404 });
  }

  // Activate on first visit if the webhook hasn't already done it.
  if (!clinic.apiKey) {
    if (!isStripeConfigured()) {
      return NextResponse.json({ error: "Payment isn't configured." }, { status: 503 });
    }
    const session = await getStripe().checkout.sessions.retrieve(sessionId, {
      expand: ["subscription"],
    });
    if (session.status !== "complete") {
      return NextResponse.json(
        { error: "Checkout isn't complete yet.", status: session.status },
        { status: 409 }
      );
    }
    const sub = session.subscription;
    const subObj = sub && typeof sub !== "string" ? sub : null;
    if (typeof session.customer === "string") clinic.stripeCustomerId = session.customer;
    if (subObj) {
      clinic.stripeSubscriptionId = subObj.id;
      await linkSubscription(clinic.clinicId, subObj.id);
    }
    await saveClinic(clinic);
    await activateClinic(clinic, {
      status: subObj?.status === "active" ? "active" : "trialing",
      trialEndsAt: subObj?.trial_end ? new Date(subObj.trial_end * 1000).toISOString() : null,
    });
  }

  return NextResponse.json({
    clinicId: clinic.clinicId,
    clinicName: clinic.clinicName,
    status: clinic.status,
    apiKey: clinic.apiKey,
    trialEndsAt: clinic.trialEndsAt,
  });
}
