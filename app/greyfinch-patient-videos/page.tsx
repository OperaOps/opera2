"use client";

/**
 * Greyfinch Connect — "Patient videos" view.
 *
 * Opened from a patient-chart launcher; lists every Opera video generated for
 * the patient (by xid) with watch / copy link / download, and a shortcut to the
 * patient's Greyfinch messages. This is the "surfaced" library for a patient —
 * the storage lives in opera2, keyed by the Greyfinch patient xid.
 *
 *   /greyfinch-patient-videos?xid=<xid>&patient_name=Jane%20Doe
 */

import React, { useCallback, useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

type LibVideo = {
  jobId: string;
  patientName: string;
  treatment: string;
  createdAt: number;
  status: "processing" | "completed" | "failed";
  progress: number;
  videoUrl: string | null;
};

function abs(u: string | null): string {
  if (!u) return "";
  if (/^https?:\/\//i.test(u)) return u;
  if (typeof window !== "undefined") return new URL(u, window.location.origin).href;
  return u;
}

function pretty(t: string) {
  return (t || "").replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function VideosInner() {
  const params = useSearchParams();
  const xid = params.get("xid") || params.get("patient_xid") || "";
  const patientName = params.get("patient_name") || params.get("patientName") || "this patient";
  const gfBase = (params.get("gf_base") || "https://admin.training.greyfinch.com").replace(/\/$/, "");
  // Clinic's Opera key from the launcher URL (unresolved {{…}} means no connection).
  const rawKey = params.get("api_key") || params.get("apiKey") || "";
  const apiKey = rawKey.includes("{{") ? "" : rawKey;

  const [videos, setVideos] = useState<LibVideo[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const load = useCallback(async () => {
    const q = xid
      ? `xid=${encodeURIComponent(xid)}`
      : patientName && patientName !== "this patient"
      ? `patient_name=${encodeURIComponent(patientName)}`
      : "";
    if (!q) { setError("No patient provided."); return; }
    try {
      const res = await fetch(`/api/patient-video/library?${q}`, {
        headers: { "x-opera-source": "greyfinch", ...(apiKey ? { "x-opera-key": apiKey } : {}) },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to load videos.");
      setVideos(data.videos || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load videos.");
    }
  }, [xid, patientName, apiKey]);

  useEffect(() => { load(); }, [load]);

  // Re-poll while anything is still rendering.
  useEffect(() => {
    if (!videos?.some((v) => v.status === "processing")) return;
    const t = setInterval(load, 3000);
    return () => clearInterval(t);
  }, [videos, load]);

  const copy = useCallback(async (v: LibVideo) => {
    const url = abs(v.videoUrl);
    try { await navigator.clipboard.writeText(url); }
    catch {
      const ta = document.createElement("textarea");
      ta.value = url; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); } catch {}
      document.body.removeChild(ta);
    }
    setCopiedId(v.jobId);
    setTimeout(() => setCopiedId((c) => (c === v.jobId ? null : c)), 2000);
  }, []);

  const goToMessages = () =>
    window.open(`${gfBase}/comms`, "_blank", "noopener");

  return (
    <div className="min-h-screen bg-white text-gray-900 p-6 sm:p-10">
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-lg font-semibold">Videos for {patientName}</h1>
            <p className="text-sm text-gray-500">Personalized education videos generated for this patient.</p>
          </div>
          <button onClick={goToMessages}
            className="shrink-0 py-2 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-900 text-sm font-medium transition">
            Go to messages</button>
        </div>

        {error && (
          <div className="text-[13px] text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>
        )}

        {!error && videos === null && <div className="text-sm text-gray-400">Loading…</div>}

        {!error && videos !== null && videos.length === 0 && (
          <div className="text-sm text-gray-500 border border-dashed border-gray-300 rounded-xl p-8 text-center">
            No videos yet for this patient. Use “Generate patient video” to create one.
          </div>
        )}

        <div className="space-y-4">
          {videos?.map((v) => (
            <div key={v.jobId} className="rounded-2xl border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="font-medium text-sm">{pretty(v.treatment)}</div>
                <div className="text-[11px] text-gray-400">{new Date(v.createdAt).toLocaleString()}</div>
              </div>

              {v.status === "completed" && v.videoUrl ? (
                <>
                  <video src={abs(v.videoUrl)} controls playsInline
                    className="w-full aspect-video object-contain rounded-xl border border-gray-200 bg-black" />
                  <div className="flex gap-2 mt-3">
                    <button onClick={() => copy(v)}
                      className="flex-1 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-900 text-sm font-medium transition">
                      {copiedId === v.jobId ? "✓ Link copied" : "Copy link"}</button>
                    <a href={abs(v.videoUrl)} download
                      className="flex-1 text-center py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-900 text-sm font-medium transition">Download</a>
                    <a href={abs(v.videoUrl)} target="_blank" rel="noopener noreferrer"
                      className="flex-1 text-center py-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium transition">Watch</a>
                  </div>
                </>
              ) : v.status === "failed" ? (
                <div className="text-[13px] text-red-600">Generation failed.</div>
              ) : (
                <div className="text-[13px] text-gray-500">Rendering… {Math.round((v.progress || 0) * 100)}%</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function GreyfinchPatientVideosPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <VideosInner />
    </Suspense>
  );
}
