"use client";

/**
 * /connect/success — landing after Stripe Checkout.
 * Exchanges the session_id for the clinic's API key (idempotent; safe to
 * reload) and shows the Greyfinch install steps.
 */

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { KeyReveal } from "../_components";

type SessionData = {
  clinicName: string;
  apiKey: string | null;
  trialEndsAt: string | null;
  error?: string;
};

function SuccessInner() {
  const params = useSearchParams();
  const sessionId = params.get("session_id") || "";
  const [data, setData] = useState<SessionData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) { setError("Missing checkout session."); return; }
    let tries = 0;
    const load = async () => {
      try {
        const res = await fetch(`/api/connect/session?session_id=${encodeURIComponent(sessionId)}`);
        const d = await res.json();
        if (res.status === 409 && tries++ < 10) {
          // Checkout still settling — retry briefly.
          setTimeout(load, 2000);
          return;
        }
        if (!res.ok) throw new Error(d?.error || "Could not load your account.");
        setData(d);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Could not load your account.");
      }
    };
    load();
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center p-6 sm:p-10">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
        {error ? (
          <div className="space-y-3">
            <h1 className="text-lg font-semibold text-gray-900">Something went wrong</h1>
            <div className="text-[13px] text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>
            <p className="text-sm text-gray-500">
              If you completed checkout, your trial is safe — email{" "}
              <a href="mailto:opera@getopera.ai" className="underline">opera@getopera.ai</a> and we&apos;ll send your key.
            </p>
          </div>
        ) : data?.apiKey ? (
          <KeyReveal clinicName={data.clinicName} apiKey={data.apiKey} trialEndsAt={data.trialEndsAt} />
        ) : (
          <div className="space-y-3 text-center py-8">
            <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-gray-200 border-t-gray-900" />
            <p className="text-sm text-gray-500">Finishing your setup…</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ConnectSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <SuccessInner />
    </Suspense>
  );
}
