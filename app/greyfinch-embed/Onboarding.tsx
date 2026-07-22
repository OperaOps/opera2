"use client";

/**
 * In-Greyfinch onboarding — shown inside the embed modal when the clinic has
 * no (or an invalid) Opera key. The entire signup → payment → key flow happens
 * here without ever leaving the PMS:
 *
 *   form (clinic info + terms) → Stripe Embedded Checkout (30-day trial,
 *   ui_mode: "embedded", no redirect) → key issued + auto-applied.
 *
 * Also supports: paste-an-existing-key, and the beta activation-code path.
 * The issued key is handed back via onKey; the parent persists it and keeps
 * generating. The clinic is still told to paste the key into Greyfinch's
 * Connect prompt so the whole office is connected on every machine.
 */

import React, { useCallback, useEffect, useRef, useState } from "react";

const inputCls =
  "w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-900/10 transition";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-wide text-gray-500 mb-1">{label}</span>
      {children}
    </label>
  );
}

type Config = {
  stripeEnabled: boolean;
  activationEnabled: boolean;
  planName: string;
  priceDisplay: string;
  trialDays: number;
  publishableKey: string | null;
};

type Step = "form" | "payment" | "done";

export default function Onboarding({
  reason,
  onKey,
}: {
  /** Optional server message explaining why the clinic isn't connected. */
  reason?: string | null;
  onKey: (key: string) => void;
}) {
  const [config, setConfig] = useState<Config | null>(null);
  const [step, setStep] = useState<Step>("form");
  const [clinicName, setClinicName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [mode, setMode] = useState<"trial" | "key" | "code">("trial");
  const [manualKey, setManualKey] = useState("");
  const [activationCode, setActivationCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [issuedKey, setIssuedKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const checkoutRef = useRef<HTMLDivElement | null>(null);
  const checkoutInstance = useRef<{ destroy: () => void } | null>(null);

  useEffect(() => {
    fetch("/api/connect/config?plan=core")
      .then((r) => r.json())
      .then(setConfig)
      .catch(() =>
        setConfig({ stripeEnabled: false, activationEnabled: true, planName: "Opera Core", priceDisplay: "$199/month", trialDays: 30, publishableKey: null })
      );
    return () => { checkoutInstance.current?.destroy(); };
  }, []);

  const finishWithKey = useCallback((key: string) => {
    // Tear down Stripe's iframe BEFORE switching views — React doesn't know
    // about the injected iframe, so without this it survives the re-render
    // and the key screen renders squished next to it.
    checkoutInstance.current?.destroy();
    checkoutInstance.current = null;
    setIssuedKey(key);
    setStep("done");
  }, []);

  /** Poll the session endpoint until the webhook/verify has issued the key. */
  const claimKey = useCallback(async (sessionId: string) => {
    for (let i = 0; i < 15; i++) {
      const res = await fetch(`/api/connect/session?session_id=${encodeURIComponent(sessionId)}`);
      const d = await res.json();
      if (res.ok && d.apiKey) { finishWithKey(d.apiKey); return; }
      await new Promise((r) => setTimeout(r, 2000));
    }
    setError("Payment confirmed but the key is taking a moment — email opera@getopera.ai and we'll send it right over.");
  }, [finishWithKey]);

  const startTrial = useCallback(async () => {
    setError(null);
    if (!clinicName.trim()) { setError("Clinic name is required."); return; }
    if (!contactName.trim()) { setError("Your name is required."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { setError("A valid email is required."); return; }
    if (password.length < 8) { setError("Choose a password of at least 8 characters (for your Opera portal login)."); return; }
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
          password,
          acceptTerms: true,
          plan: "core",
          practiceType: "orthodontic",
          uiMode: "embedded",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Signup failed — try again.");

      if (data.mode === "embedded_checkout" && data.clientSecret) {
        if (!config?.publishableKey) throw new Error("Payment isn't fully configured — contact opera@getopera.ai.");
        setStep("payment");
        const { loadStripe } = await import("@stripe/stripe-js");
        const stripe = await loadStripe(config.publishableKey);
        if (!stripe) throw new Error("Couldn't load the payment form.");
        checkoutInstance.current?.destroy();
        // stripe-js renamed initEmbeddedCheckout → createEmbeddedCheckoutPage
        const checkout = await stripe.createEmbeddedCheckoutPage({
          clientSecret: data.clientSecret,
          onComplete: () => { claimKey(data.sessionId); },
        });
        checkoutInstance.current = checkout;
        // The container renders once step === "payment"; wait a tick for it.
        setTimeout(() => { if (checkoutRef.current) checkout.mount(checkoutRef.current); }, 50);
        return;
      }
      throw new Error(data?.error || "Unexpected response — contact opera@getopera.ai.");
    } catch (e) {
      setStep("form");
      setError(e instanceof Error ? e.message : "Signup failed — try again.");
    } finally {
      setSubmitting(false);
    }
  }, [clinicName, contactName, email, password, acceptTerms, config, claimKey]);

  const redeemCode = useCallback(async () => {
    setError(null);
    if (!clinicName.trim() || !contactName.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) || password.length < 8 || !acceptTerms) {
      setError("Fill out the clinic details above (and accept the terms) — the code activates that account.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/connect/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clinicName: clinicName.trim(), contactName: contactName.trim(), email: email.trim(),
          password, acceptTerms: true, plan: "core", practiceType: "orthodontic",
          activationCode: activationCode.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Activation failed.");
      if (data.apiKey) { finishWithKey(data.apiKey); return; }
      throw new Error("Activation failed — contact opera@getopera.ai.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Activation failed.");
    } finally {
      setSubmitting(false);
    }
  }, [clinicName, contactName, email, password, acceptTerms, activationCode, finishWithKey]);

  const copyKey = useCallback(async () => {
    if (!issuedKey) return;
    try { await navigator.clipboard.writeText(issuedKey); }
    catch {
      const ta = document.createElement("textarea");
      ta.value = issuedKey; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); } catch {}
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [issuedKey]);

  // ---- done: key issued -----------------------------------------------------
  if (step === "done" && issuedKey) {
    return (
      <div key="step-done" className="space-y-4">
        <div>
          <div className="text-[13px] text-emerald-600 mb-1">✓ {clinicName || "Your clinic"} is set up — {config?.trialDays ?? 30}-day free trial started</div>
          <h2 className="text-lg font-semibold text-gray-900">Your Opera API key</h2>
        </div>
        <div className="flex gap-2">
          <code className="flex-1 truncate rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-[13px] text-gray-900">{issuedKey}</code>
          <button onClick={copyKey} className="shrink-0 rounded-lg bg-gray-900 hover:bg-gray-800 px-4 py-2.5 text-sm font-medium text-white transition">
            {copied ? "✓ Copied" : "Copy"}
          </button>
        </div>
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-3.5 text-[13px] text-gray-700">
          <span className="font-medium text-gray-900">One last step for your whole team:</span>{" "}
          in Greyfinch go to <span className="font-medium">Settings → Apps → Opera → Connect</span> and paste this key,
          so Opera works on every computer in the office. It already works on this one — and if you ever lose it,
          email opera@getopera.ai and we&apos;ll resend it.
        </div>
        <button
          onClick={() => onKey(issuedKey)}
          className="w-full py-2.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-semibold text-sm transition"
        >
          Start generating videos
        </button>
      </div>
    );
  }

  // ---- payment: embedded Stripe checkout ------------------------------------
  if (step === "payment") {
    return (
      <div key="step-payment" className="space-y-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Start your {config?.trialDays ?? 30}-day free trial</h2>
          <p className="text-sm text-gray-500">$0 today · then {config?.priceDisplay ?? "$199/month"} · cancel anytime</p>
        </div>
        <div ref={checkoutRef} className="rounded-xl overflow-hidden min-h-[400px]" />
        {error && <div className="text-[12px] text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>}
        <button onClick={() => { checkoutInstance.current?.destroy(); checkoutInstance.current = null; setStep("form"); }}
          className="text-[12px] text-gray-400 underline hover:text-gray-600">← Back</button>
      </div>
    );
  }

  // ---- form -----------------------------------------------------------------
  return (
    <div key="step-form" className="space-y-3">
      <div>
        <div className="text-[11px] uppercase tracking-widest text-gray-400 mb-1">Opera × Greyfinch</div>
        <h2 className="text-lg font-semibold text-gray-900">Connect this clinic to Opera</h2>
        <p className="text-sm text-gray-500">
          {reason || "Personalized patient videos, one click from the chart. Set up takes a minute — right here."}
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-[13px] text-gray-700">
        <span className="font-medium text-gray-900">{config?.planName ?? "Opera Core"}</span>
        {" · "}{config ? `${config.trialDays}-day free trial` : "30-day free trial"} · then {config?.priceDisplay ?? "$199/month"} · cancel anytime
      </div>

      <Field label="Clinic name">
        <input value={clinicName} onChange={(e) => setClinicName(e.target.value)} placeholder="e.g. Zitterkopf Orthodontics" disabled={submitting} className={inputCls} />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Your name">
          <input value={contactName} onChange={(e) => setContactName(e.target.value)} placeholder="Full name" disabled={submitting} className={inputCls} />
        </Field>
        <Field label="Work email">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@yourclinic.com" disabled={submitting} className={inputCls} />
        </Field>
      </div>
      <Field label="Create a password">
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="8+ characters — for your Opera portal" disabled={submitting} className={inputCls} autoComplete="new-password" />
      </Field>

      <label className="flex items-start gap-2.5 pt-0.5 cursor-pointer">
        <input type="checkbox" checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} disabled={submitting} className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-gray-900" />
        <span className="text-[13px] text-gray-600">
          I agree to Opera&apos;s{" "}
          <a href="https://getopera.ai/connect/terms" target="_blank" rel="noopener" className="underline">Terms of Service</a>
          {" "}on behalf of this clinic.
        </span>
      </label>

      {mode === "code" && (
        <Field label="Activation code">
          <input value={activationCode} onChange={(e) => setActivationCode(e.target.value)} placeholder="From your Opera onboarding email" disabled={submitting} className={inputCls} />
        </Field>
      )}
      {mode === "key" && (
        <Field label="Opera API key">
          <input value={manualKey} onChange={(e) => setManualKey(e.target.value.trim())} placeholder="opk_…" disabled={submitting} className={inputCls} />
        </Field>
      )}

      {error && <div className="text-[12px] text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>}

      {mode === "trial" && (
        <button onClick={startTrial} disabled={submitting || !config}
          className="w-full py-2.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-white disabled:opacity-40 font-semibold text-sm transition">
          {submitting ? "Setting up…" : "Start free trial"}
        </button>
      )}
      {mode === "code" && (
        <button onClick={redeemCode} disabled={submitting || !activationCode.trim()}
          className="w-full py-2.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-white disabled:opacity-40 font-semibold text-sm transition">
          {submitting ? "Activating…" : "Activate & get my key"}
        </button>
      )}
      {mode === "key" && (
        <button onClick={() => manualKey && onKey(manualKey)} disabled={!manualKey}
          className="w-full py-2.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-white disabled:opacity-40 font-semibold text-sm transition">
          Use this key
        </button>
      )}

      <div className="flex justify-center gap-4 text-[12px] text-gray-400">
        {mode !== "key" && <button onClick={() => { setMode("key"); setError(null); }} className="underline hover:text-gray-600">Have an API key?</button>}
        {mode !== "code" && config?.activationEnabled && <button onClick={() => { setMode("code"); setError(null); }} className="underline hover:text-gray-600">Have an activation code?</button>}
        {mode !== "trial" && <button onClick={() => { setMode("trial"); setError(null); }} className="underline hover:text-gray-600">Start a free trial</button>}
      </div>
    </div>
  );
}
