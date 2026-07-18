"use client";

/**
 * Settings — clinic profile, the specialties this clinic generates for,
 * and the API key for the public video API.
 */

import { useEffect, useState } from "react";
import { Check, Copy, KeyRound, RefreshCw } from "lucide-react";

const ACTIVE_SPECIALTIES = [
  { key: "dental", label: "Dental" },
  { key: "orthodontic", label: "Orthodontics" },
];

const COMING_SOON = [
  "Oral Surgery",
  "Oncology",
  "Ophthalmology",
  "Cardiology",
  "Orthopedics",
  "GI",
  "General Medicine",
  "Dermatology",
];

export default function SettingsPage() {
  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");
  const [email, setEmail] = useState("");
  const [specialties, setSpecialties] = useState<string[]>(["dental", "orthodontic"]);
  const [saved, setSaved] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [keyCopied, setKeyCopied] = useState(false);
  const [rotating, setRotating] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/clinic/settings");
        const data = await res.json();
        setName(data.clinic?.clinic_name ?? "");
        setLogo(data.clinic?.clinic_logo_url ?? "");
        setEmail(data.clinic?.clinic_email ?? "");
        if (Array.isArray(data.clinic?.specialties)) setSpecialties(data.clinic.specialties);
      } catch {
        /* leave defaults */
      }
      try {
        const res = await fetch("/api/clinic/api-key");
        const data = await res.json();
        if (data.apiKey) setApiKey(data.apiKey);
      } catch {
        /* no key yet */
      }
    })();
  }, []);

  const toggleSpecialty = (key: string) => {
    setSpecialties((prev) => {
      if (prev.includes(key)) {
        if (prev.length === 1) return prev; // keep at least one
        return prev.filter((k) => k !== key);
      }
      return [...prev, key];
    });
  };

  const save = async () => {
    setSaved(false);
    const res = await fetch("/api/clinic/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clinic_name: name,
        clinic_logo_url: logo,
        specialties,
      }),
    });
    if (res.ok) {
      document.cookie = `opera-clinic-name=${encodeURIComponent(name)}; path=/`;
      setSaved(true);
      setTimeout(() => setSaved(false), 2200);
    }
  };

  const rotateKey = async () => {
    setRotating(true);
    try {
      const res = await fetch("/api/clinic/api-key", { method: "POST" });
      const data = await res.json();
      if (data.apiKey) setApiKey(data.apiKey);
    } finally {
      setRotating(false);
    }
  };

  const copyKey = async () => {
    if (!apiKey) return;
    await navigator.clipboard.writeText(apiKey);
    setKeyCopied(true);
    setTimeout(() => setKeyCopied(false), 1800);
  };

  const input =
    "cf-body w-full rounded-xl border border-[#1a1a17]/12 bg-white px-4 py-2.5 text-[14.5px] outline-none transition-colors focus:border-[#5f7a61]/60";

  return (
    <div className="mx-auto max-w-[860px]">
      <h1 className="cf-display text-[clamp(1.8rem,3vw,2.4rem)] font-light tracking-[-0.02em] text-[#1a1a17]">
        Settings
      </h1>

      {/* profile */}
      <div className="mt-8 rounded-2xl border border-[#1a1a17]/10 bg-white p-7">
        <p className="cf-mono text-[11px] uppercase tracking-[0.16em] text-[#5f7a61]">
          Clinic profile
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="cf-mono mb-1.5 block text-[11px] uppercase tracking-[0.12em] text-[#6e7a71]">
              Clinic name
            </label>
            <input value={name} onChange={(e) => setName(e.target.value)} className={input} />
          </div>
          <div>
            <label className="cf-mono mb-1.5 block text-[11px] uppercase tracking-[0.12em] text-[#6e7a71]">
              Login email
            </label>
            <input value={email} disabled className={`${input} opacity-60`} />
          </div>
          <div className="sm:col-span-2">
            <label className="cf-mono mb-1.5 block text-[11px] uppercase tracking-[0.12em] text-[#6e7a71]">
              Logo URL (shows on patient pages)
            </label>
            <input value={logo} onChange={(e) => setLogo(e.target.value)} className={input} placeholder="https://…" />
          </div>
        </div>
      </div>

      {/* specialties */}
      <div className="mt-6 rounded-2xl border border-[#1a1a17]/10 bg-white p-7">
        <p className="cf-mono text-[11px] uppercase tracking-[0.16em] text-[#5f7a61]">
          Specialties
        </p>
        <p className="cf-body mt-1.5 text-[14px] text-[#5e6a60]">
          What your clinic generates videos for today.
        </p>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {ACTIVE_SPECIALTIES.map((s) => {
            const on = specialties.includes(s.key);
            return (
              <button
                key={s.key}
                onClick={() => toggleSpecialty(s.key)}
                className={`cf-body inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[14.5px] font-medium transition-colors ${
                  on
                    ? "border-[#5f7a61]/50 bg-[#5f7a61]/[0.08] text-[#3e5540]"
                    : "border-[#1a1a17]/12 text-[#1a1a17]/60 hover:border-[#5f7a61]/40"
                }`}
              >
                {on && <Check size={14} />}
                {s.label}
              </button>
            );
          })}
          {COMING_SOON.map((s) => (
            <span
              key={s}
              className="cf-body inline-flex items-center gap-2 rounded-full border border-dashed border-[#1a1a17]/15 px-4 py-2 text-[14.5px] text-[#1a1a17]/35"
            >
              {s}
              <span className="cf-mono text-[9.5px] uppercase tracking-[0.1em] text-[#5f7a61]/70">
                soon
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* API key */}
      <div className="mt-6 rounded-2xl border border-[#1a1a17]/10 bg-white p-7">
        <p className="cf-mono flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[#5f7a61]">
          <KeyRound size={13} /> API key
        </p>
        <p className="cf-body mt-1.5 text-[14px] text-[#5e6a60]">
          For generating videos from your own systems via the Opera API.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2.5">
          <code className="cf-mono min-w-0 flex-1 truncate rounded-xl border border-[#1a1a17]/10 bg-[#f5f8f5] px-4 py-2.5 text-[12.5px] text-[#1a1a17]/80">
            {apiKey ?? "No key issued yet"}
          </code>
          {apiKey && (
            <button
              onClick={copyKey}
              className="cf-mono inline-flex items-center gap-1.5 rounded-full border border-[#5f7a61]/30 px-3.5 py-2 text-[11.5px] uppercase tracking-[0.08em] text-[#3e5540] transition-colors hover:bg-[#5f7a61]/[0.07]"
            >
              {keyCopied ? <Check size={12} /> : <Copy size={12} />}
              {keyCopied ? "Copied" : "Copy"}
            </button>
          )}
          <button
            onClick={rotateKey}
            disabled={rotating}
            className="cf-mono inline-flex items-center gap-1.5 rounded-full bg-[#1a1a17] px-3.5 py-2 text-[11.5px] uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#5f7a61] disabled:opacity-60"
          >
            <RefreshCw size={12} className={rotating ? "animate-spin" : ""} />
            {apiKey ? "Rotate" : "Generate key"}
          </button>
        </div>
      </div>

      <div className="mt-7 flex items-center gap-4">
        <button
          onClick={save}
          className="cf-body rounded-full bg-[#5f7a61] px-7 py-2.5 text-[14.5px] font-medium text-white transition-colors hover:bg-[#4e6650]"
        >
          Save changes
        </button>
        {saved && (
          <span className="cf-body flex items-center gap-1.5 text-[14px] text-[#3e5540]">
            <Check size={15} /> Saved
          </span>
        )}
      </div>
    </div>
  );
}
