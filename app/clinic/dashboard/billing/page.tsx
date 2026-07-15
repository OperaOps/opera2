"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CreditCard, ExternalLink, Video } from "lucide-react";

interface ClinicInfo {
  clinic_name: string;
  clinic_email: string;
  created_at: string;
}

interface BillingInfo {
  plan: string;
  status: string;
  trialEndsAt: string | null;
  videosGenerated: number;
  hasSubscription: boolean;
}

const STATUS_STYLES: Record<string, { label: string; cls: string }> = {
  trialing: { label: "Free trial", cls: "bg-purple-50 text-purple-700 border-purple-200" },
  active: { label: "Active", cls: "bg-green-50 text-green-700 border-green-200" },
  past_due: { label: "Past due", cls: "bg-amber-50 text-amber-700 border-amber-200" },
  canceled: { label: "Canceled", cls: "bg-red-50 text-red-700 border-red-200" },
  pending: { label: "Setup incomplete", cls: "bg-gray-50 text-gray-600 border-gray-200" },
};

export default function BillingPage() {
  const [clinic, setClinic] = useState<ClinicInfo | null>(null);
  const [billing, setBilling] = useState<BillingInfo | null>(null);
  const [portalLoading, setPortalLoading] = useState(false);
  const [portalUnavailable, setPortalUnavailable] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/clinic/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.clinic) setClinic(data.clinic);
        if (data.billing) setBilling(data.billing);
      })
      .catch(() => {});
  }, []);

  async function openBillingPortal() {
    setPortalLoading(true);
    setError("");
    try {
      const res = await fetch("/api/clinic/billing-portal", {
        method: "POST",
      });
      if (res.status === 503) {
        setPortalUnavailable(true);
        return;
      }
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Failed to open billing portal");
      }
      window.location.href = data.url;
    } catch {
      setError("Could not open the billing portal. Please try again.");
    } finally {
      setPortalLoading(false);
    }
  }

  const status = billing ? STATUS_STYLES[billing.status] ?? STATUS_STYLES.active : STATUS_STYLES.active;
  const trialDaysLeft =
    billing?.trialEndsAt != null
      ? Math.max(0, Math.ceil((new Date(billing.trialEndsAt).getTime() - Date.now()) / 86_400_000))
      : null;

  return (
    <div className="max-w-3xl">
      <h2 className="text-xl text-gray-900 font-semibold tracking-tight mb-1">Billing</h2>
      <p className="text-sm text-gray-500 mb-6">
        Manage your Opera subscription and payment methods.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6"
      >
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="w-4 h-4 text-purple-600" />
              <h3 className="text-gray-900 text-sm font-medium">Current plan</h3>
            </div>
            <p className="text-2xl text-gray-900 font-semibold tracking-tight mb-1">
              Opera{" "}
              <span className="text-gray-500 text-base font-normal">
                — monthly subscription
              </span>
            </p>
            {billing?.status === "trialing" && billing.trialEndsAt ? (
              <p className="text-xs text-gray-500">
                {trialDaysLeft} day{trialDaysLeft === 1 ? "" : "s"} left in your free trial —
                billing starts{" "}
                {new Date(billing.trialEndsAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
                . Cancel anytime before then and you won&apos;t be charged.
              </p>
            ) : billing?.status === "past_due" ? (
              <p className="text-xs text-amber-600">
                Your last payment didn&apos;t go through — update your card in the billing
                portal to keep generating videos.
              </p>
            ) : (
              <p className="text-xs text-gray-500">
                Your subscription renews monthly. Manage or cancel anytime.
              </p>
            )}
            {clinic && (
              <p className="text-xs text-gray-400 mt-3">
                Billed to {clinic.clinic_email}
              </p>
            )}
          </div>
          <span className={`px-2 py-0.5 text-xs rounded-full border ${status.cls}`}>
            {status.label}
          </span>
        </div>

        {billing && (
          <div className="mt-5 flex items-center gap-2 text-xs text-gray-500">
            <Video className="w-3.5 h-3.5 text-purple-500" />
            {billing.videosGenerated} video{billing.videosGenerated === 1 ? "" : "s"} generated
            on this account
          </div>
        )}

        <div className="mt-6 pt-6 border-t border-gray-100">
          <button
            onClick={openBillingPortal}
            disabled={portalLoading}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500
              text-white text-sm font-medium transition-colors disabled:opacity-50"
          >
            <ExternalLink className="w-4 h-4" />
            {portalLoading ? "Opening…" : "Manage billing"}
          </button>
          <p className="text-xs text-gray-400 mt-2">
            Update your card, download invoices, or cancel — handled securely by Stripe.
          </p>

          {portalUnavailable && (
            <p className="text-sm text-gray-500 mt-4">
              Billing portal available once Stripe is connected.{" "}
              <a
                href="/pricing"
                className="text-purple-600 hover:text-purple-500 transition-colors"
              >
                View plan details on the pricing page →
              </a>
            </p>
          )}
          {error && <p className="text-sm text-red-600 mt-4">{error}</p>}
        </div>
      </motion.div>
    </div>
  );
}
