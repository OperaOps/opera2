"use client";

/**
 * Pre-consult welcome — instant, no rendering. Uses the clinic's own tour
 * video with a calm music bed and a personalized welcome page.
 */

import { useEffect, useState } from "react";
import { Check, Copy, ExternalLink, Film, Sparkles } from "lucide-react";

interface PatientOption {
  id: string;
  first_name: string;
  last_name: string;
  consulting_provider: string | null;
}

const APPOINTMENT_TYPES = [
  { value: "new_patient_consult", label: "New patient consult" },
  { value: "records_visit", label: "Records visit" },
  { value: "cleaning_exam", label: "Cleaning and exam" },
  { value: "follow_up", label: "Follow up visit" },
  { value: "emergency_visit", label: "Emergency visit" },
];

export default function PreConsultForm() {
  const [patients, setPatients] = useState<PatientOption[]>([]);
  const [hasVideo, setHasVideo] = useState<boolean | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [provider, setProvider] = useState("");
  const [appointmentType, setAppointmentType] = useState(APPOINTMENT_TYPES[0].value);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch("/api/clinic/patients?limit=200")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d?.patients && setPatients(d.patients))
      .catch(() => {});
    fetch("/api/clinic/settings")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setHasVideo(Boolean(d?.clinic?.preconsult_video_url)))
      .catch(() => setHasVideo(false));
  }, []);

  const [showSuggest, setShowSuggest] = useState(false);

  // Typeahead over the first-name box: alphabetical, narrowed as they type.
  // Unknown names are simply new patients.
  const q = `${firstName} ${lastName}`.trim().toLowerCase();
  const suggestions = [...patients]
    .sort((a, b) =>
      `${a.first_name} ${a.last_name}`.localeCompare(`${b.first_name} ${b.last_name}`)
    )
    .filter((p) => {
      const full = `${p.first_name} ${p.last_name}`.trim().toLowerCase();
      if (full === q) return false; // already picked
      return !q || full.includes(q) || full.includes(firstName.trim().toLowerCase());
    })
    .slice(0, 30);

  const pickPatient = (id: string) => {
    const p = patients.find((x) => x.id === id);
    setShowSuggest(false);
    if (!p) return;
    setFirstName(p.first_name);
    setLastName(p.last_name);
    if (p.consulting_provider) setProvider(p.consulting_provider);
  };

  const submit = async () => {
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/clinic/preconsult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          provider,
          appointmentType,
          appointmentDate,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.shareId) {
        setError(
          res.status === 409
            ? "Upload your clinic tour video in Settings first."
            : "Couldn't create the welcome page. Try again."
        );
        return;
      }
      setResult(data.shareId);
    } catch {
      setError("Couldn't create the welcome page. Try again.");
    } finally {
      setBusy(false);
    }
  };

  const copyLink = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(`${window.location.origin}/v/${result}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const input =
    "cf-body w-full rounded-xl border border-[#1a1a17]/12 bg-white px-4 py-2.5 text-[14.5px] outline-none transition-colors focus:border-[#5f7a61]/60";

  if (result) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-[#5f7a61]/25 bg-white p-8 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#5f7a61]/10">
          <Check size={24} className="text-[#5f7a61]" />
        </span>
        <h2 className="cf-display mt-4 text-[24px] font-light text-[#1a1a17]">
          {firstName}&rsquo;s welcome page is live.
        </h2>
        <p className="cf-body mt-2 text-[14.5px] text-[#5e6a60]">
          Send it now — the page is live immediately, and their personalized
          welcome video appears on it within a few minutes. Their questions
          land on their patient card.
        </p>
        <div className="mt-5 flex items-center justify-center gap-2">
          <button
            onClick={copyLink}
            className="cf-mono inline-flex items-center gap-1.5 rounded-full border border-[#5f7a61]/30 px-4 py-2 text-[11.5px] uppercase tracking-[0.08em] text-[#3e5540] transition-colors hover:bg-[#5f7a61]/[0.07]"
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? "Copied" : "Copy link"}
          </button>
          <a
            href={`/v/${result}`}
            target="_blank"
            rel="noreferrer"
            className="cf-mono inline-flex items-center gap-1.5 rounded-full bg-[#1a1a17] px-4 py-2 text-[11.5px] uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#5f7a61]"
          >
            <ExternalLink size={12} /> Open
          </a>
        </div>
        <button
          onClick={() => {
            setResult(null);
            setFirstName("");
            setLastName("");
          }}
          className="cf-body mt-5 text-[14px] font-medium text-[#5e6a60] underline underline-offset-2 hover:text-[#1a1a17]"
        >
          Make another
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl">
      {hasVideo === false && (
        <div className="mb-5 flex items-start gap-3 rounded-2xl border border-[#5f7a61]/25 bg-[#5f7a61]/[0.05] px-5 py-4">
          <Film size={16} className="mt-0.5 shrink-0 text-[#5f7a61]" />
          <p className="cf-body text-[14px] text-[#3e5540]">
            Using Opera&rsquo;s default welcome visual for now. Upload your own
            office tour in{" "}
            <a href="/clinic/dashboard/settings" className="font-medium underline underline-offset-2">
              Settings
            </a>{" "}
            to make it feel like home.
          </p>
        </div>
      )}

      <div className="space-y-5 rounded-2xl border border-[#1a1a17]/10 bg-white p-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <label className="cf-mono mb-1.5 block text-[11px] uppercase tracking-[0.12em] text-[#6e7a71]">
              First name
            </label>
            <input
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                setShowSuggest(true);
              }}
              onFocus={() => setShowSuggest(true)}
              onBlur={() => setTimeout(() => setShowSuggest(false), 150)}
              className={input}
              placeholder="Sarah"
            />
            {showSuggest && suggestions.length > 0 && (
              <div className="absolute z-20 mt-1.5 max-h-56 w-[220%] max-w-[420px] overflow-y-auto rounded-xl border border-[#1a1a17]/12 bg-white shadow-lg">
                {suggestions.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => pickPatient(p.id)}
                    className="cf-body flex w-full items-center justify-between gap-3 px-3.5 py-2.5 text-left text-[14px] transition-colors hover:bg-[#5f7a61]/[0.07]"
                  >
                    <span className="text-[#1a1a17]">
                      {p.first_name} {p.last_name}
                    </span>
                    {p.consulting_provider && (
                      <span className="cf-mono shrink-0 text-[10.5px] text-[#6e7a71]">
                        {p.consulting_provider}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div>
            <label className="cf-mono mb-1.5 block text-[11px] uppercase tracking-[0.12em] text-[#6e7a71]">
              Last name
            </label>
            <input value={lastName} onChange={(e) => setLastName(e.target.value)} className={input} placeholder="Johnson" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="cf-mono mb-1.5 block text-[11px] uppercase tracking-[0.12em] text-[#6e7a71]">
              Provider
            </label>
            <input value={provider} onChange={(e) => setProvider(e.target.value)} className={input} placeholder="Dr. Zitterkopf" />
          </div>
          <div>
            <label className="cf-mono mb-1.5 block text-[11px] uppercase tracking-[0.12em] text-[#6e7a71]">
              Appointment date (optional)
            </label>
            <input value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} className={input} placeholder="Tuesday, July 29 at 2 pm" />
          </div>
        </div>
        <div>
          <label className="cf-mono mb-1.5 block text-[11px] uppercase tracking-[0.12em] text-[#6e7a71]">
            Appointment type
          </label>
          <select
            value={appointmentType}
            onChange={(e) => setAppointmentType(e.target.value)}
            className={input + " appearance-none"}
          >
            {APPOINTMENT_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <p className="cf-body text-[12.5px] text-[#6e7a71]">
          The welcome note on their page comes from your{" "}
          <a href="/clinic/dashboard/customization" className="font-medium underline underline-offset-2">
            Customization
          </a>{" "}
          settings — set it once, it shows for every patient.
        </p>
        {error && <p className="cf-body text-[14px] text-[#b91c1c]">{error}</p>}
        <button
          onClick={submit}
          disabled={busy || !firstName.trim()}
          className="cf-body inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#5f7a61] py-3 text-[15px] font-medium text-white transition-colors hover:bg-[#4e6650] disabled:opacity-50"
        >
          <Sparkles size={15} />
          {busy ? "Creating…" : "Create welcome page"}
        </button>
      </div>
    </div>
  );
}
