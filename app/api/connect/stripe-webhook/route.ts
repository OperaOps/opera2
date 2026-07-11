/**
 * POST /api/connect/stripe-webhook — subscription lifecycle sync.
 *
 * Register this URL in the Stripe dashboard with events:
 *   checkout.session.completed, customer.subscription.updated,
 *   customer.subscription.deleted, invoice.payment_failed
 * and set STRIPE_WEBHOOK_SECRET.
 *
 * Keeps the clinic's status (and therefore its API key's validity) in lockstep
 * with Stripe: trial → active on conversion, past_due on failed payment,
 * canceled on cancellation.
 */

import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import {
  activateClinic,
  findClinicByCheckoutSession,
  findClinicBySubscription,
  linkSubscription,
  saveClinic,
  type ClinicStatus,
} from "@/lib/connect/clinic-store";
import { getStripe } from "@/lib/connect/stripe";

export const dynamic = "force-dynamic";

function mapStatus(s: Stripe.Subscription.Status): ClinicStatus {
  switch (s) {
    case "trialing": return "trialing";
    case "active": return "active";
    case "past_due":
    case "unpaid":
    case "incomplete": return "past_due";
    default: return "canceled"; // canceled, incomplete_expired, paused
  }
}

export async function POST(request: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET?.trim();
  if (!secret) {
    return NextResponse.json({ error: "Webhook not configured." }, { status: 503 });
  }

  const payload = await request.text();
  const signature = request.headers.get("stripe-signature") || "";

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(payload, signature, secret);
  } catch (err) {
    console.error("[connect] webhook signature verification failed", err);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const clinic = await findClinicByCheckoutSession(session.id);
        if (!clinic) break;
        if (typeof session.customer === "string") clinic.stripeCustomerId = session.customer;
        if (typeof session.subscription === "string") {
          clinic.stripeSubscriptionId = session.subscription;
          await linkSubscription(clinic.clinicId, session.subscription);
        }
        await saveClinic(clinic);
        if (!clinic.apiKey) {
          await activateClinic(clinic, { status: "trialing" });
        }
        break;
      }

      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        const clinic = await findClinicBySubscription(sub.id);
        if (!clinic) break;
        clinic.status = event.type.endsWith("deleted") ? "canceled" : mapStatus(sub.status);
        clinic.trialEndsAt = sub.trial_end ? new Date(sub.trial_end * 1000).toISOString() : clinic.trialEndsAt;
        await saveClinic(clinic);
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const subId =
          typeof (invoice as unknown as { subscription?: unknown }).subscription === "string"
            ? ((invoice as unknown as { subscription: string }).subscription)
            : null;
        if (!subId) break;
        const clinic = await findClinicBySubscription(subId);
        if (!clinic) break;
        clinic.status = "past_due";
        await saveClinic(clinic);
        break;
      }
    }
  } catch (err) {
    console.error("[connect] webhook handler error", event.type, err);
    return NextResponse.json({ error: "Handler error." }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
