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
              Core{" "}
              <span className="text-gray-500 text-base font-normal">
                — $199/mo
              </span>
            </p>
            <p className="text-xs text-gray-500">
              Includes a 30-day free trial. You won&apos;t be charged until
              your trial ends.
            </p>
            {clinic && (
              <p className="text-xs text-gray-400 mt-3">
                Billed to {clinic.clinic_email}
              </p>
            )}
          </div>
          <span className="px-2 py-0.5 text-xs rounded-full bg-green-50 text-green-700 border border-green-200">
            Active
          </span>
        </div>

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
