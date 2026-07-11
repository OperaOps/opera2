"use client";

/**
 * /connect — Opera for Greyfinch onboarding.
 *
 * The page a clinic lands on from the Greyfinch app listing. One form:
 * clinic info → accept terms → "Start free trial". With Stripe configured it
 * redirects to Checkout (30-day trial on a monthly subscription) and returns
 * to /connect/success with the API key; with an activation code it provisions
 * the key right here.
 */

import React, { Suspense, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Field, inputCls, KeyReveal } from "./_components";

type Config = {
  stripeEnabled: boolean;
  activationEnabled: boolean;
  plan?: string;
  planName?: string;
  priceDisplay: string;
  trialDays: number;
};

type Provisioned = { clinicName: string; apiKey: string; trialEndsAt: string | null };

function ConnectInner() {
  const params = useSearchParams();
  const canceled = params.get("canceled") === "1";
  const plan = params.get("plan") === "growth" ? "growth" : "core";

  const [config, setConfig] = useState<Config | null>(null);
  const [clinicName, setClinicName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [practiceType, setPracticeType] = useState("orthodontic");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [activationCode, setActivationCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [provisioned, setProvisioned] = useState<Provisioned | null>(null);

  useEffect(() => {
    fetch(`/api/connect/config?plan=${plan}`)
      .then((r) => r.json())
      .then(setConfig)
      .catch(() => setConfig({ stripeEnabled: false, activationEnabled: true, priceDisplay: "$199/month", trialDays: 30 }));
  }, [plan]);

  const submit = useCallback(async () => {
    setError(null);
    if (!clinicName.trim()) { setError("Clinic name is required."); return; }
    if (!contactName.trim()) { setError("Your name is required."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { setError("A valid email is required."); return; }
    if (!acceptTerms) { setError("Please accept the Terms of Service to continue."); return; }
    setSubmitting(true);
    try {
      const res = await fetch("/api/connect/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clinicName: clinicName.trim(),
          contactName: contactName.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          practiceType,
          acceptTerms: true,
          plan,
          activationCode: activationCode.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Signup failed — try again.");
      if (data.mode === "checkout" && data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
        return;
      }
      if (data.mode === "activation" && data.apiKey) {
        setProvisioned({ clinicName: data.clinicName, apiKey: data.apiKey, trialEndsAt: data.trialEndsAt });
        return;
      }
      throw new Error("Unexpected response — contact opera@getopera.ai.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Signup failed — try again.");
    } finally {
      setSubmitting(false);
    }
  }, [clinicName, contactName, email, phone, practiceType, acceptTerms, activationCode, plan]);

  return (
    <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center p-6 sm:p-10">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
        {provisioned ? (
          <KeyReveal clinicName={provisioned.clinicName} apiKey={provisioned.apiKey} trialEndsAt={provisioned.trialEndsAt} />
        ) : (
          <>
            <div className="mb-6">
              <div className="text-[11px] uppercase tracking-widest text-gray-400 mb-2">Opera × Greyfinch</div>
              <h1 className="text-lg font-semibold text-gray-900">Start your free trial</h1>
              <p className="text-sm text-gray-500">
                Personalized patient-education videos, generated in one click from the patient chart.
              </p>
            </div>

            <div className="mb-5 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">
              <span className="font-medium text-gray-900">
                {config?.planName ?? "Opera Core"} — {config ? `${config.trialDays}-day free trial` : "30-day free trial"}
              </span>
              {" · "}then {config?.priceDisplay ?? "$199/month"} · cancel anytime
            </div>

            {canceled && (
              <div className="mb-4 text-[12px] text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                Checkout was canceled — nothing was charged. Pick up where you left off below.
              </div>
            )}

            <div className="space-y-3">
              <Field label="Clinic name">
                <input value={clinicName} onChange={(e) => setClinicName(e.target.value)} placeholder="e.g. Zitterkopf Orthodontics" disabled={submitting} className={inputCls} />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Your name">
                  <input value={contactName} onChange={(e) => setContactName(e.target.value)} placeholder="Full name" disabled={submitting} className={inputCls} />
                </Field>
                <Field label="Practice type">
                  <select value={practiceType} onChange={(e) => setPracticeType(e.target.value)} disabled={submitting} className={inputCls}>
                    <option value="orthodontic">Orthodontic</option>
                    <option value="dental">General dental</option>
                    <option value="pediatric">Pediatric</option>
                    <option value="other">Other specialty</option>
                  </select>
                </Field>
              </div>
              <Field label="Work email">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@yourclinic.com" disabled={submitting} className={inputCls} />
              </Field>
              <Field label="Phone (optional)">
                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(555) 555-5555" disabled={submitting} className={inputCls} />
              </Field>

              {showCode ? (
                <Field label="Activation code">
                  <input value={activationCode} onChange={(e) => setActivationCode(e.target.value)} placeholder="From your Opera onboarding email" disabled={submitting} className={inputCls} />
                </Field>
              ) : (
                <button type="button" onClick={() => setShowCode(true)} className="text-[12px] text-gray-400 underline hover:text-gray-600">
                  Have an activation code?
                </button>
              )}

              <label className="flex items-start gap-2.5 pt-1 cursor-pointer">
                <input type="checkbox" checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} disabled={submitting} className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-gray-900" />
                <span className="text-[13px] text-gray-600">
                  I agree to Opera&apos;s{" "}
                  <a href="/connect/terms" target="_blank" rel="noopener" className="underline">Terms of Service</a>
                  {" "}on behalf of this clinic.
                </span>
              </label>

              {error && <div className="text-[12px] text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>}

              <button
                onClick={submit}
                disabled={submitting || !config}
                className="w-full mt-1 py-2.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-white disabled:opacity-40 font-semibold text-sm transition"
              >
                {submitting
                  ? "Setting up…"
                  : activationCode.trim()
                  ? "Activate & get my API key"
                  : "Start free trial"}
              </button>

              <p className="text-[12px] text-gray-400 text-center">
                {activationCode.trim()
                  ? "Your key is issued instantly — no card needed with a code."
                  : "You won't be charged during the trial. Card collected at checkout; cancel anytime."}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function ConnectPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <ConnectInner />
    </Suspense>
  );
}
