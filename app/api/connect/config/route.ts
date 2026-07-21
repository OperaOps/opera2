/**
 * GET /api/connect/config?plan=core|growth — public config for the onboarding
 * page. Lets the UI adapt to what's configured (Stripe vs activation-code
 * fallback) without baking values into the client bundle at build time.
 */

import { NextRequest, NextResponse } from "next/server";
import { isStripeConfigured, normalizePlan, PLANS, priceDisplay, TRIAL_DAYS } from "@/lib/connect/stripe";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const plan = normalizePlan(request.nextUrl.searchParams.get("plan"));
  return NextResponse.json({
    stripeEnabled: isStripeConfigured(plan),
    activationEnabled: Boolean(process.env.OPERA_ACTIVATION_CODE?.trim()),
    plan,
    planName: PLANS[plan].name,
    priceDisplay: priceDisplay(plan),
    trialDays: TRIAL_DAYS,
    // Publishable (public by design) — lets clients mount Embedded Checkout
    // without baking the key into the bundle at build time.
    publishableKey:
      process.env.STRIPE_PUBLISHABLE_KEY?.trim() ||
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.trim() ||
      null,
  });
}
