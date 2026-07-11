"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CreditCard, ExternalLink } from "lucide-react";

interface ClinicInfo {
  clinic_name: string;
  clinic_email: string;
  created_at: string;
}

export default function BillingPage() {
  const [clinic, setClinic] = useState<ClinicInfo | null>(null);
  const [portalLoading, setPortalLoading] = useState(false);
  const [portalUnavailable, setPortalUnavailable] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/clinic/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.clinic) setClinic(data.clinic);
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

  return (
    <div className="max-w-3xl">
      <h2 className="text-xl text-white font-extralight mb-1">Billing</h2>
      <p className="text-sm text-gray-500 mb-6">
        Manage your Opera subscription and payment methods.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6"
      >
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="w-4 h-4 text-violet-400" />
              <h3 className="text-white text-sm font-medium">Current plan</h3>
            </div>
            <p className="text-2xl text-white font-extralight mb-1">
              Core{" "}
              <span className="text-gray-400 text-base font-light">
                — $199/mo
              </span>
            </p>
            <p className="text-xs text-gray-500">
              Includes a 30-day free trial. You won&apos;t be charged until
              your trial ends.
            </p>
            {clinic && (
              <p className="text-xs text-gray-600 mt-3">
                Billed to {clinic.clinic_email}
              </p>
            )}
          </div>
          <span className="px-2 py-0.5 text-xs rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Active
          </span>
        </div>

        <div className="mt-6 pt-6 border-t border-white/10">
          <button
            onClick={openBillingPortal}
            disabled={portalLoading}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600
              hover:from-violet-500 hover:to-purple-500 text-white text-sm font-medium
              transition-all shadow-lg shadow-violet-600/20 disabled:opacity-50"
          >
            <ExternalLink className="w-4 h-4" />
            {portalLoading ? "Opening…" : "Manage billing"}
          </button>

          {portalUnavailable && (
            <p className="text-sm text-gray-500 mt-4">
              Billing portal available once Stripe is connected.{" "}
              <a
                href="/pricing"
                className="text-violet-400 hover:text-violet-300 transition-colors"
              >
                View plan details on the pricing page →
              </a>
            </p>
          )}
          {error && <p className="text-sm text-red-400 mt-4">{error}</p>}
        </div>
      </motion.div>
    </div>
  );
}
