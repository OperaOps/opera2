"use client";

/**
 * Greyfinch Connect — embedded component.
 *
 * This page is designed to be rendered inside an iframe within the Greyfinch
 * PMS (e.g. from a patient chart launcher). It receives patient context via
 * query params and lets the provider generate a personalized Opera education
 * video with one click.
 *
 * Greyfinch passes context on the URL, e.g.:
 *   /greyfinch-embed?patient_name=Jane%20Doe&doctor_name=Dr.%20Opera
 *                    &clinic_name=Opera%20Orthodontics&treatment=invisalign&xid=1d099
 *
 * All fields remain editable so it also works standalone for local testing.
 *
 * (Deploy trigger: 2026-07-01 — redeploy getopera.ai from current main.)
 */

import React, { useCallback, useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const TREATMENTS = [
  "invisalign", "braces", "ceramic_braces", "lingual_braces", "expander",
  "retainer", "jaw_surgery", "veneers", "whitening", "implant", "crown",
  "filling", "root_canal", "extraction", "bridge", "gum_treatment", "dentures",
] as const;

type JobStatus = {
  jobId: string;
  status: "processing" | "completed" | "failed";
  progress: number;
  step: string;
  videoUrl?: string;
  error?: string;
};

function prettyTreatment(t: string) {
  return t.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function EmbedInner() {
  const params = useSearchParams();

  // Auth is handled by the Greyfinch connection (only installed/connected clinics
  // can open this launcher), so the embed itself no longer collects an API key.
  const [patientName, setPatientName] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [clinicName, setClinicName] = useState("");
  const [treatment, setTreatment] = useState<string>("invisalign");
  const [notes, setNotes] = useState("");
  const [concerns, setConcerns] = useState("");
  const notesPrefilledRef = useRef(false);

  const [xid, setXid] = useState("");
  // Clinic's SMS template (configured once at install via the app property,
  // passed through the launcher URL). Resolved server-side in send-sms.
  const [smsTemplate, setSmsTemplate] = useState("");
  const [gfBase, setGfBase] = useState("https://admin.training.greyfinch.com");
  const [job, setJob] = useState<JobStatus | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [smsState, setSmsState] = useState<"idle" | "sending" | "done">("idle");
  const [smsResult, setSmsResult] = useState<string | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const recordedRef = useRef<string | null>(null);

  // Hydrate from Greyfinch-provided query params (with sensible defaults).
  useEffect(() => {
    setPatientName(params.get("patient_name") || params.get("patientName") || "");
    setDoctorName(params.get("doctor_name") || params.get("doctorName") || "");
    setClinicName(params.get("clinic_name") || params.get("clinicName") || "");
    setXid(params.get("xid") || params.get("patient_xid") || "");
    setSmsTemplate(params.get("sms_template") || params.get("smsTemplate") || "");
    // Allow the Greyfinch admin base to be overridden via the launcher URL so the
    // "Go to messages" deep link points at the right tenant/host.
    const base = params.get("gf_base");
    if (base) setGfBase(base.replace(/\/$/, ""));
    const t = (params.get("treatment") || "").toLowerCase();
    if (t && (TREATMENTS as readonly string[]).includes(t)) setTreatment(t);
  }, [params]);

  useEffect(() => () => { if (pollRef.current) clearInterval(pollRef.current); }, []);

  // Auto-pull the patient's chart "Notes" into the Patient concerns field —
  // once, and only if the provider hasn't typed there (so they can edit/add).
  // (The chart "Tx Plan Notes" box isn't exposed by the Connect API, so the
  // Treatment notes field stays manual.)
  useEffect(() => {
    if (notesPrefilledRef.current || !patientName.trim()) return;
    notesPrefilledRef.current = true;
    (async () => {
      try {
        const q = new URLSearchParams({ patient_name: patientName });
        if (xid) q.set("xid", xid);
        const res = await fetch(`/api/patient-video/patient-context?${q.toString()}`);
        const data = await res.json();
        const notesBox = typeof data?.notesBox === "string" ? data.notesBox.trim() : "";
        const txPlanBox = typeof data?.txPlanBox === "string" ? data.txPlanBox.trim() : "";
        if (notesBox) setConcerns((cur) => (cur.trim() ? cur : notesBox));
        if (txPlanBox) setNotes((cur) => (cur.trim() ? cur : txPlanBox));
      } catch {
        /* best-effort prefill; provider can type their own */
      }
    })();
  }, [patientName, xid]);

  const poll = useCallback((jobId: string) => {
    let failures = 0;
    pollRef.current = setInterval(async () => {
      try {
        const res = await fetch(`/api/patient-video/${jobId}`);
        if (!res.ok) throw new Error(`status ${res.status}`);
        const data: JobStatus = await res.json();
        setJob(data);
        if (data.status === "completed" || data.status === "failed") {
          if (pollRef.current) clearInterval(pollRef.current);
          setSubmitting(false);
          if (data.status === "failed") setError(data.error || "Video generation failed.");
        }
        failures = 0;
      } catch {
        if (++failures > 40) {
          if (pollRef.current) clearInterval(pollRef.current);
          setSubmitting(false);
          setError("Lost connection to the render job.");
        }
      }
    }, 3000);
  }, []);

  const generate = useCallback(async () => {
    setError(null);
    if (!patientName.trim()) { setError("Patient name is required."); return; }
    setSubmitting(true);
    setJob({ jobId: "", status: "processing", progress: 0, step: "Starting…" });
    try {
      const res = await fetch("/api/patient-video/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientName: patientName.trim(),
          doctorName: doctorName.trim() || "Your Doctor",
          clinicName: clinicName.trim() || "Your Clinic",
          treatment,
          // Treatment notes + patient concerns are sent as one combined string
          // (no new API field) — concerns labeled so the model can tell them apart.
          treatmentNotes:
            [notes.trim(), concerns.trim() ? `Patient concerns: ${concerns.trim()}` : ""]
              .filter(Boolean)
              .join("\n\n") || undefined,
          xid: xid || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to start generation.");
      setJob({ jobId: data.jobId, status: "processing", progress: 0, step: "script" });
      poll(data.jobId);
    } catch (e) {
      setSubmitting(false);
      setError(e instanceof Error ? e.message : "Failed to start generation.");
      setJob(null);
    }
  }, [patientName, doctorName, clinicName, treatment, notes, concerns, xid, poll]);

  const reset = () => {
    if (pollRef.current) clearInterval(pollRef.current);
    setJob(null); setError(null); setSubmitting(false); setCopied(false);
    setSmsState("idle"); setSmsResult(null);
  };

  // Absolute, shareable URL for the rendered video. Lambda renders return a
  // fully-qualified (S3/CloudFront) URL; the local fallback is a relative path
  // we resolve against the current origin (the tunnel host when embedded).
  const shareUrl = useCallback(() => {
    const u = job?.videoUrl || "";
    if (/^https?:\/\//i.test(u)) return u;
    if (typeof window !== "undefined") return new URL(u, window.location.origin).href;
    return u;
  }, [job]);

  const copyLink = useCallback(async () => {
    const url = shareUrl();
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Clipboard API can be blocked in iframes; fall back to a temp textarea.
      const ta = document.createElement("textarea");
      ta.value = url; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); } catch {}
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [shareUrl]);

  // Option C: text the patient the video link via Greyfinch's sendSms (POC —
  // falls back to a simulated send when no number is configured).
  const sendText = useCallback(async () => {
    setSmsState("sending"); setSmsResult(null);
    try {
      const res = await fetch("/api/patient-video/send-sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          videoUrl: shareUrl(),
          patientName,
          clinicName: clinicName || undefined,
          template: smsTemplate || undefined,
          xid: xid || undefined,
        }),
      });
      const data = await res.json();
      const to = data?.payload?.toNumber;
      const toNote = data?.payload?.phoneSource === "patient_record" && to ? ` to ${to}` : "";
      setSmsResult(
        data?.simulated
          ? `Simulated send ✓ (${data.reason}).${toNote ? ` Would text${toNote}.` : ""} Message: "${data.payload?.message}"`
          : data?.ok
          ? `Text sent to patient${toNote} ✓ (id ${data.smsId})`
          : `Send failed: ${data?.error || "unknown error"}`
      );
    } catch (e) {
      setSmsResult(`Send failed: ${e instanceof Error ? e.message : "network error"}`);
    }
    setSmsState("done");
  }, [shareUrl, patientName, clinicName, smsTemplate, xid]);

  // Option A: jump to Greyfinch's comms/messages section so the link can be
  // pasted into a message.
  const goToMessages = useCallback(() => {
    window.open(`${gfBase}/comms`, "_blank", "noopener");
  }, [gfBase]);

  const pct = job ? Math.round((job.progress || 0) * 100) : 0;
  const done = job?.status === "completed" && job.videoUrl;

  // Task 4: when a video finishes, record it onto the patient's Greyfinch
  // treatment timeline (app resource). Fires once per job; the route soft-skips
  // if no connection exists yet, so this never blocks the UI.
  useEffect(() => {
    if (!done || !job?.jobId || recordedRef.current === job.jobId) return;
    recordedRef.current = job.jobId;
    if (!patientName.trim()) return;
    fetch("/api/patient-video/record-resource", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        videoUrl: shareUrl(),
        patientName,
        xid: xid || undefined,
        treatment,
        jobId: job.jobId,
      }),
    }).catch(() => { /* best-effort; tracking is non-blocking */ });
  }, [done, job, patientName, xid, treatment, shareUrl]);

  return (
    <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center p-6 sm:p-10">
      <div className={`w-full ${done ? "max-w-5xl" : "max-w-md"} rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm`}>
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-lg font-semibold text-gray-900">Generate patient video</h1>
          <p className="text-sm text-gray-500">Create a personalized education video for this patient.</p>
        </div>

        {!done && (
          <div className="space-y-3">
            <Field label="Patient">
              <input value={patientName} onChange={(e) => setPatientName(e.target.value)}
                placeholder="Patient name" disabled={submitting} className={inputCls} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Doctor">
                <input value={doctorName} onChange={(e) => setDoctorName(e.target.value)} placeholder="Doctor name" disabled={submitting} className={inputCls} />
              </Field>
              <Field label="Clinic">
                <input value={clinicName} onChange={(e) => setClinicName(e.target.value)} placeholder="Clinic name" disabled={submitting} className={inputCls} />
              </Field>
            </div>
            <Field label="Treatment">
              <select value={treatment} onChange={(e) => setTreatment(e.target.value)} disabled={submitting} className={inputCls}>
                {TREATMENTS.map((t) => <option key={t} value={t}>{prettyTreatment(t)}</option>)}
              </select>
            </Field>
            <Field label="Treatment notes">
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={8}
                placeholder="Add any context about this patient or their treatment — history, goals, tone, anything you want the video to address."
                disabled={submitting} className={`${inputCls} min-h-[180px] resize-y leading-relaxed`} />
            </Field>
            <Field label="Patient concerns">
              <textarea value={concerns} onChange={(e) => setConcerns(e.target.value)} rows={4}
                placeholder="Anything the patient is worried about — pain, cost, appearance, timeline — so the video can address it directly."
                disabled={submitting} className={`${inputCls} min-h-[96px] resize-y leading-relaxed`} />
            </Field>

            {error && <div className="text-[12px] text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>}

            {!job ? (
              <button onClick={generate} disabled={submitting || !patientName.trim()}
                className="w-full mt-1 py-2.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-white disabled:opacity-40 font-semibold text-sm transition">
                Generate video
              </button>
            ) : (
              <div className="mt-1 rounded-xl border border-gray-200 bg-gray-50 p-4">
                <div className="flex items-center justify-between text-[12px] mb-2">
                  <span className="text-gray-700">{job.status === "failed" ? "Failed" : "Generating…"}</span>
                  <span className="text-gray-400">{pct}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden">
                  <div className="h-full bg-gray-900 transition-all" style={{ width: `${Math.max(5, pct)}%` }} />
                </div>
                <div className="text-[11px] text-gray-400 mt-2 capitalize">{job.step}</div>
              </div>
            )}
          </div>
        )}

        {done && (
          <div className="space-y-3">
            <div className="text-[13px] text-emerald-600 flex items-center gap-1.5">✓ Video ready for {patientName}</div>
            <video src={job!.videoUrl} controls autoPlay playsInline className="w-full max-h-[80vh] aspect-video object-contain rounded-xl border border-gray-200 bg-black" />
            <div className="flex gap-2">
              <button onClick={copyLink}
                className="flex-1 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-900 text-sm font-medium transition">
                {copied ? "✓ Link copied" : "Copy link"}</button>
              <a href={shareUrl()} download
                className="flex-1 text-center py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-900 text-sm font-medium transition">Download</a>
              <button onClick={reset}
                className="flex-1 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium transition">New video</button>
            </div>

            {/* Comms: send to patient + jump to Greyfinch messages */}
            <div className="flex gap-2">
              <button onClick={sendText} disabled={smsState === "sending"}
                className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-sm font-medium transition">
                {smsState === "sending" ? "Sending…" : "Text to patient"}</button>
              <button onClick={goToMessages}
                className="flex-1 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-900 text-sm font-medium transition">
                Go to messages</button>
            </div>
            {smsResult && (
              <div className="text-[12px] text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">{smsResult}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

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

export default function GreyfinchEmbedPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <EmbedInner />
    </Suspense>
  );
}
