/**
 * Stripe client for the Connect onboarding flow (30-day free trial → monthly
 * subscription). All Stripe usage is optional: when STRIPE_SECRET_KEY or the
 * plan price IDs are unset, signup falls back to the activation-code path.
 *
 * Env:
 *   STRIPE_SECRET_KEY        sk_live_… / sk_test_…
 *   STRIPE_PRICE_ID_CORE     price_… (Core, $199/mo)
 *   STRIPE_PRICE_ID_GROWTH   price_… (Growth, $999/mo)
 *   STRIPE_PRICE_ID          legacy single-plan fallback
 *   STRIPE_WEBHOOK_SECRET    whsec_… (for /api/connect/stripe-webhook)
 */

import Stripe from "stripe";

let client: Stripe | null = null;

export type PlanId = "core" | "growth";

export const PLANS: Record<PlanId, { name: string; display: string; priceEnv: string }> = {
  core: { name: "Opera Core", display: "$199/month", priceEnv: "STRIPE_PRICE_ID_CORE" },
  growth: { name: "Opera Growth", display: "$999/month", priceEnv: "STRIPE_PRICE_ID_GROWTH" },
};

export function normalizePlan(plan: unknown): PlanId {
  return plan === "growth" ? "growth" : "core";
}

export function planPriceId(plan: PlanId): string | undefined {
  return (
    process.env[PLANS[plan].priceEnv]?.trim() ||
    process.env.STRIPE_PRICE_ID?.trim() || // legacy single-plan setups
    undefined
  );
}

export function isStripeConfigured(plan: PlanId = "core"): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY?.trim() && planPriceId(plan));
}

export function getStripe(): Stripe {
  if (!client) {
    const key = process.env.STRIPE_SECRET_KEY?.trim();
    if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
    client = new Stripe(key);
  }
  return client;
}

export const TRIAL_DAYS = 30;

/** Human price line shown on the onboarding page (server-config, no rebuild). */
export function priceDisplay(plan: PlanId = "core"): string {
  return process.env.OPERA_MONTHLY_PRICE_DISPLAY?.trim() || PLANS[plan].display;
}
