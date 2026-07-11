"use client";

/**
 * Shared pieces for the Greyfinch onboarding flow (/connect):
 * key reveal + the exact Greyfinch install steps. Light, clean styling to
 * match the greyfinch-embed surface.
 */

import React, { useCallback, useState } from "react";

export const inputCls =
  "w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-900/10 transition";

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-wide text-gray-500 mb-1">{label}</span>
      {children}
    </label>
  );
}

export function KeyReveal({
  clinicName,
  apiKey,
  trialEndsAt,
}: {
  clinicName: string;
  apiKey: string;
  trialEndsAt?: string | null;
}) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(apiKey);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = apiKey; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); } catch {}
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [apiKey]);

  const trialNote = trialEndsAt
    ? `Your free trial runs through ${new Date(trialEndsAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}.`
    : null;

  return (
    <div className="space-y-5">
      <div>
        <div className="text-[13px] text-emerald-600 mb-1">✓ {clinicName} is set up</div>
        <h2 className="text-lg font-semibold text-gray-900">Your Opera API key</h2>
        <p className="text-sm text-gray-500">
          Paste this into Greyfinch to connect the app. Keep it private — it identifies your clinic.
          {trialNote ? ` ${trialNote}` : ""}
        </p>
      </div>

      <div className="flex gap-2">
        <code className="flex-1 truncate rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-[13px] text-gray-900">
          {apiKey}
        </code>
        <button
          onClick={copy}
          className="shrink-0 rounded-lg bg-gray-900 hover:bg-gray-800 px-4 py-2.5 text-sm font-medium text-white transition"
        >
          {copied ? "✓ Copied" : "Copy"}
        </button>
      </div>

      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
        <div className="text-[11px] uppercase tracking-wide text-gray-500 mb-2">
          Finish setup in Greyfinch — about a minute
        </div>
        <ol className="space-y-2 text-sm text-gray-700 list-decimal list-inside">
          <li>In Greyfinch, open <span className="font-medium">Settings → Apps</span> and find <span className="font-medium">Opera</span>.</li>
          <li>Click <span className="font-medium">Install</span>, then <span className="font-medium">Connect</span> and paste your API key.</li>
          <li>Enable the app for your location(s).</li>
          <li>Open any patient chart and click <span className="font-medium">Generate patient video</span>. That&apos;s it — patient, doctor, and chart notes are pre-filled.</li>
        </ol>
      </div>

      <p className="text-[12px] text-gray-400">
        We also keep this key on file — if you lose it, email{" "}
        <a href="mailto:opera@getopera.ai" className="underline">opera@getopera.ai</a> and we&apos;ll resend it.
      </p>
    </div>
  );
}
