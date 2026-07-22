"use client";

/**
 * Customization — the clinic's video branding defaults: preferred doctor
 * name, clinic name as shown on videos, and logo. These prefill the
 * Generate form (still editable per video).
 */

import { useEffect, useRef, useState } from "react";
import { Upload, Check } from "lucide-react";

export default function CustomizationPage() {
  const [doctorName, setDoctorName] = useState("");
  const [clinicDisplayName, setClinicDisplayName] = useState("");
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  // Welcome note (shows on every pre-consult page; Opera reviews before live)
  const [note, setNote] = useState("");
  const [noteLive, setNoteLive] = useState<string | null>(null);
  const [notePending, setNotePending] = useState<string | null>(null);
  const [noteBusy, setNoteBusy] = useState(false);
  const [noteSent, setNoteSent] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/clinic/customization");
        if (res.ok) {
          const d = await res.json();
          setDoctorName(d.doctorName ?? "");
          setClinicDisplayName(d.clinicDisplayName ?? "");
          setLogoUrl(d.logoUrl ?? null);
        }
        const s = await fetch("/api/clinic/settings");
        if (s.ok) {
          const d = await s.json();
          setNoteLive(d.clinic?.preconsult_note ?? null);
          setNotePending(d.clinic?.preconsult_note_pending ?? null);
        }
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  const submitNote = async () => {
    if (!note.trim()) return;
    setNoteBusy(true);
    setError("");
    try {
      const res = await fetch("/api/clinic/preconsult-note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note: note.trim() }),
      });
      if (!res.ok) throw new Error();
      setNotePending(note.trim());
      setNote("");
      setNoteSent(true);
      setTimeout(() => setNoteSent(false), 3000);
    } catch {
      setError("Couldn't submit the note — try again.");
    } finally {
      setNoteBusy(false);
    }
  };

  const save = async (extra?: { logoUrl?: string }) => {
    setSaving(true);
    setError("");
    setSaved(false);
    try {
      const res = await fetch("/api/clinic/customization", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctorName: doctorName.trim(),
          clinicDisplayName: clinicDisplayName.trim(),
          ...(extra?.logoUrl !== undefined ? { logoUrl: extra.logoUrl } : {}),
        }),
      });
      if (!res.ok) throw new Error();
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch {
      setError("Couldn't save — try again.");
    } finally {
      setSaving(false);
    }
  };

  const uploadLogo = async (file: File) => {
    setUploading(true);
    setError("");
    try {
      const res = await fetch("/api/clinic/logo/upload-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contentType: file.type }),
      });
      const data = await res.json();
      if (!res.ok || !data.uploadUrl) throw new Error();
      const put = await fetch(data.uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });
      if (!put.ok) throw new Error();
      setLogoUrl(data.publicUrl);
      await save({ logoUrl: data.publicUrl });
    } catch {
      setError("Logo upload failed — try a PNG or JPG under 5 MB.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mx-auto max-w-[760px]">
      <h1 className="cf-display text-[clamp(1.8rem,3vw,2.4rem)] font-light tracking-[-0.02em] text-[#1a1a17]">
        Customization
      </h1>
      <p className="cf-body mt-1.5 text-[15px] text-[#5e6a60]">
        Defaults for every video you generate — doctor, clinic name, and logo.
        You can still change them on any individual video.
      </p>

      <div className="mt-8 rounded-2xl border border-[#1a1a17]/10 bg-white p-7">
        <p className="cf-mono text-[11px] uppercase tracking-[0.16em] text-[#5f7a61]">
          Video defaults
        </p>

        <div className="mt-5 space-y-5">
          <div>
            <label className="cf-body block text-[13.5px] font-medium text-[#1a1a17]">
              Preferred doctor name
            </label>
            <input
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              placeholder="e.g. Dr. Jacob Zitterkopf"
              className="cf-body mt-1.5 w-full rounded-xl border border-[#1a1a17]/12 bg-white px-4 py-2.5 text-[14.5px] outline-none transition-colors focus:border-[#5f7a61]/60"
            />
            <p className="cf-body mt-1 text-[12.5px] text-[#6e7a71]">
              Pre-filled as the doctor on every new video.
            </p>
          </div>

          <div>
            <label className="cf-body block text-[13.5px] font-medium text-[#1a1a17]">
              Clinic name shown on videos
            </label>
            <input
              value={clinicDisplayName}
              onChange={(e) => setClinicDisplayName(e.target.value)}
              placeholder="e.g. Zitterkopf Orthodontics"
              className="cf-body mt-1.5 w-full rounded-xl border border-[#1a1a17]/12 bg-white px-4 py-2.5 text-[14.5px] outline-none transition-colors focus:border-[#5f7a61]/60"
            />
            <p className="cf-body mt-1 text-[12.5px] text-[#6e7a71]">
              How your practice is named in the video and on patient pages.
            </p>
          </div>

          <div>
            <label className="cf-body block text-[13.5px] font-medium text-[#1a1a17]">
              Logo
            </label>
            <div className="mt-2 flex items-center gap-4">
              {logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={logoUrl}
                  alt="Clinic logo"
                  className="h-14 w-14 rounded-xl border border-[#1a1a17]/10 object-contain bg-white p-1.5"
                />
              ) : (
                <div className="cf-mono flex h-14 w-14 items-center justify-center rounded-xl border border-dashed border-[#1a1a17]/20 text-[10px] uppercase text-[#6e7a71]">
                  None
                </div>
              )}
              <button
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="cf-body inline-flex items-center gap-2 rounded-full border border-[#1a1a17]/15 px-4 py-2 text-[13.5px] font-medium text-[#1a1a17] transition-colors hover:border-[#5f7a61]/50 disabled:opacity-60"
              >
                <Upload size={14} />
                {uploading ? "Uploading…" : logoUrl ? "Replace logo" : "Upload logo"}
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/svg+xml"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) uploadLogo(f);
                  e.target.value = "";
                }}
              />
            </div>
            <p className="cf-body mt-1.5 text-[12.5px] text-[#6e7a71]">
              Shown on patient share pages. PNG or JPG works best.
            </p>
          </div>
        </div>

        <div className="mt-7 flex items-center gap-3">
          <button
            onClick={() => save()}
            disabled={saving || !loaded}
            className="cf-body inline-flex items-center gap-2 rounded-full bg-[#5f7a61] px-6 py-2.5 text-[14.5px] font-medium text-white transition-colors hover:bg-[#4e6650] disabled:opacity-60"
          >
            {saved ? <Check size={15} /> : null}
            {saving ? "Saving…" : saved ? "Saved" : "Save defaults"}
          </button>
          {error && <p className="cf-body text-[13.5px] text-[#b91c1c]">{error}</p>}
        </div>
      </div>

      {/* Welcome note — set once, shows on every pre-consult page */}
      <div className="mt-6 rounded-2xl border border-[#1a1a17]/10 bg-white p-7">
        <p className="cf-mono text-[11px] uppercase tracking-[0.16em] text-[#5f7a61]">
          Personal welcome note
        </p>
        <p className="cf-body mt-2 text-[13.5px] text-[#5e6a60]">
          Shown on every pre-consult welcome page — write it once, no need to
          retype it per patient. Notes go live after a quick Opera review.
        </p>

        {noteLive && (
          <div className="mt-4 rounded-xl border border-[#5f7a61]/20 bg-[#5f7a61]/[0.05] px-4 py-3">
            <p className="cf-mono text-[10px] uppercase tracking-[0.14em] text-[#5f7a61]">
              Live now
            </p>
            <p className="cf-body mt-1 text-[14px] italic text-[#1a1a17]">&ldquo;{noteLive}&rdquo;</p>
          </div>
        )}
        {notePending && (
          <div className="mt-3 rounded-xl border border-[#1a1a17]/10 bg-[#f5f8f5]/70 px-4 py-3">
            <p className="cf-mono text-[10px] uppercase tracking-[0.14em] text-[#6e7a71]">
              In review
            </p>
            <p className="cf-body mt-1 text-[14px] italic text-[#1a1a17]/80">&ldquo;{notePending}&rdquo;</p>
          </div>
        )}

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={2}
          maxLength={400}
          placeholder="Our whole team is looking forward to meeting you…"
          className="cf-body mt-4 w-full resize-none rounded-xl border border-[#1a1a17]/12 bg-white px-4 py-2.5 text-[14.5px] outline-none transition-colors focus:border-[#5f7a61]/60"
        />
        <button
          onClick={submitNote}
          disabled={noteBusy || !note.trim()}
          className="cf-body mt-3 inline-flex items-center gap-2 rounded-full border border-[#1a1a17]/15 px-5 py-2 text-[13.5px] font-medium text-[#1a1a17] transition-colors hover:border-[#5f7a61]/50 disabled:opacity-50"
        >
          {noteSent ? <Check size={14} /> : null}
          {noteBusy ? "Submitting…" : noteSent ? "Sent for review" : "Submit for review"}
        </button>
      </div>
    </div>
  );
}
