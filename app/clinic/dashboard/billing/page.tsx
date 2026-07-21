"use client";

/**
 * Billing — plans with Stripe embedded checkout, and the Stripe customer
 * portal for anything else. Pricing matches the public site.
 */

import { useEffect, useRef, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Check } from "lucide-react";

interface BillingState {
  plan?: string;
  status?: string;
  trialEndsAt?: string | null;
  videosGenerated?: number;
  hasSubscription?: boolean;
}

const PLANS = [
  {
    key: "core",
    name: "Core",
    price: "$199",
    per: "per month",
    blurb: "For a single practice getting started.",
    features: ["Unlimited patient links", "50 videos per month", "Ask Opera for every patient", "Email support"],
  },
  {
    key: "growth",
    name: "Growth",
    price: "$999",
    per: "per month",
    blurb: "For multi provider and multi location groups.",
    features: ["Everything in Core", "Unlimited videos", "All specialties as they launch", "Priority support"],
  },
] as const;

export default function BillingPage() {
  const [billing, setBilling] = useState<BillingState | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [checkoutPlan, setCheckoutPlan] = useState<string | null>(null);
  const [error, setError] = useState("");
  const checkoutRef = useRef<HTMLDivElement>(null);
  const checkoutInstance = useRef<{ destroy: () => void } | null>(null);
  const justReturned =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("checkout") === "done";

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/clinic/settings");
        const data = await res.json();
        setBilling(data.billing ?? {});
      } finally {
        setLoaded(true);
      }
    })();
    return () => checkoutInstance.current?.destroy();
  }, []);

  const startCheckout = async (plan: "core" | "growth") => {
    setError("");
    setCheckoutPlan(plan);
    try {
      const res = await fetch("/api/clinic/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (!res.ok || !data.clientSecret) {
        setError(
          res.status === 503
            ? "Billing isn't configured on this environment yet."
            : "Couldn't start checkout. Try again."
        );
        setCheckoutPlan(null);
        return;
      }
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "");
      if (!stripe) {
        setError("Stripe failed to load.");
        setCheckoutPlan(null);
        return;
      }
      checkoutInstance.current?.destroy();
      const checkout = await stripe.createEmbeddedCheckoutPage({ clientSecret: data.clientSecret });
      checkoutInstance.current = checkout;
      checkout.mount("#stripe-checkout");
      checkoutRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch {
      setError("Couldn't start checkout. Try again.");
      setCheckoutPlan(null);
    }
  };

  const openPortal = async () => {
    const res = await fetch("/api/clinic/billing-portal", { method: "POST" });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    else setError("The billing portal isn't available for this account yet.");
  };

  const active = billing?.status === "active" || billing?.status === "trialing";
  // Partner/comped accounts: active without a Stripe subscription — billing
  // is handled by Opera, so no plan cards or checkout prompts.
  const comped = billing?.status === "active" && !billing?.hasSubscription;

  return (
    <div className="mx-auto max-w-[1080px]">
      <h1 className="cf-display text-[clamp(1.8rem,3vw,2.4rem)] font-light tracking-[-0.02em] text-[#1a1a17]">
        Billing
      </h1>
      <p className="cf-body mt-1.5 text-[15px] text-[#5e6a60]">
        Simple monthly plans. Cancel any time from the billing portal.
      </p>

      {justReturned && (
        <div className="cf-body mt-6 rounded-2xl border border-[#5f7a61]/25 bg-[#5f7a61]/[0.06] px-5 py-4 text-[14.5px] text-[#3e5540]">
          You&rsquo;re set — your subscription is being activated. This page
          updates within a minute.
        </div>
      )}

      {loaded && comped && (
        <div className="mt-6 rounded-2xl border border-[#5f7a61]/25 bg-[#5f7a61]/[0.05] px-6 py-5">
          <p className="cf-mono text-[11px] uppercase tracking-[0.16em] text-[#5f7a61]">
            Account status
          </p>
          <p className="cf-body mt-1.5 text-[16px] font-medium text-[#1a1a17]">
            Your account is fully active.
          </p>
          <p className="cf-body mt-1 text-[14px] text-[#5e6a60]">
            Billing for this account is managed directly with Opera — there&rsquo;s
            nothing to set up here. {billing?.videosGenerated ?? 0} videos
            generated so far. Questions? opera@getopera.ai
          </p>
        </div>
      )}

      {loaded && billing && active && !comped && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#1a1a17]/10 bg-white px-6 py-5">
          <div>
            <p className="cf-mono text-[11px] uppercase tracking-[0.16em] text-[#5f7a61]">
              Current plan
            </p>
            <p className="cf-body mt-1 text-[16px] font-medium capitalize text-[#1a1a17]">
              {billing.plan ?? "monthly"} · {billing.status}
              {billing.trialEndsAt && billing.status === "trialing"
                ? ` · trial ends ${new Date(billing.trialEndsAt).toLocaleDateString()}`
                : ""}
            </p>
            <p className="cf-body mt-0.5 text-[13.5px] text-[#5e6a60]">
              {billing.videosGenerated ?? 0} videos generated on this account.
            </p>
          </div>
          <button
            onClick={openPortal}
            className="cf-body rounded-full bg-[#1a1a17] px-5 py-2.5 text-[14.5px] font-medium text-white transition-colors hover:bg-[#5f7a61]"
          >
            Manage billing
          </button>
        </div>
      )}

      {!comped && (
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {PLANS.map((plan) => (
          <div
            key={plan.key}
            className={`rounded-2xl border bg-white p-7 ${
              billing?.plan === plan.key && active
                ? "border-[#5f7a61]/50 shadow-[0_20px_50px_-30px_rgba(63,85,64,0.4)]"
                : "border-[#1a1a17]/10"
            }`}
          >
            <p className="cf-mono text-[11px] uppercase tracking-[0.16em] text-[#5f7a61]">
              {plan.name}
            </p>
            <p className="cf-display mt-2 text-[38px] font-light leading-none text-[#1a1a17]">
              {plan.price}
              <span className="cf-body text-[14px] text-[#5e6a60]"> {plan.per}</span>
            </p>
            <p className="cf-body mt-2 text-[14.5px] text-[#5e6a60]">{plan.blurb}</p>
            <ul className="mt-5 space-y-2.5">
              {plan.features.map((f) => (
                <li key={f} className="cf-body flex items-start gap-2.5 text-[14.5px] text-[#1a1a17]/85">
                  <Check size={15} className="mt-0.5 shrink-0 text-[#5f7a61]" />
                  {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => startCheckout(plan.key)}
              disabled={checkoutPlan === plan.key}
              className="cf-body mt-6 w-full rounded-full bg-[#5f7a61] py-2.5 text-[14.5px] font-medium text-white transition-colors hover:bg-[#4e6650] disabled:opacity-60"
            >
              {billing?.plan === plan.key && active
                ? "Current plan"
                : checkoutPlan === plan.key
                  ? "Opening checkout…"
                  : "Start 30 day free trial"}
            </button>
          </div>
        ))}
      </div>
      )}

      {!comped && (
      <div className="cf-body mt-6 rounded-2xl border border-[#1a1a17]/10 bg-white px-6 py-5 text-[14.5px] text-[#5e6a60]">
        Need enterprise volume, custom specialties, or an EHR integration?{" "}
        <a href="mailto:opera@getopera.ai" className="font-medium text-[#3e5540] underline underline-offset-2">
          Talk to us
        </a>
        .
      </div>
      )}

      {error && (
        <p className="cf-body mt-5 text-[14px] text-[#b91c1c]">{error}</p>
      )}

      {/* Stripe embedded checkout mounts here */}
      <div ref={checkoutRef} className="mt-8">
        <div id="stripe-checkout" className="overflow-hidden rounded-2xl" />
      </div>
    </div>
  );
}
