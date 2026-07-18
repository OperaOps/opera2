"use client";

/**
 * Videos — every generated video, its permanent patient link, and the same
 * Ask Opera assistant the patient sees, right under each preview.
 */

import { useEffect, useState } from "react";
import { Check, Copy, ExternalLink, MessageCircle, X } from "lucide-react";
import { AskOpera } from "@/Components/patient/AskOpera";

interface VideoRow {
  id: string;
  patient_name?: string;
  first_name?: string;
  last_name?: string;
  video_title?: string | null;
  treatment_type?: string | null;
  video_url?: string | null;
  render_status?: string;
  created_at: string;
}

const SUGGESTIONS = [
  "Give me a short summary of my treatment.",
  "What happens if I wait?",
  "Will insurance cover this?",
  "What should I expect afterward?",
];

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });

export default function VideosPage() {
  const [videos, setVideos] = useState<VideoRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);
  const [askOpen, setAskOpen] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/clinic/videos");
        const data = await res.json();
        setVideos(data.videos ?? []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const copyLink = async (id: string) => {
    await navigator.clipboard.writeText(`${window.location.origin}/v/${id}`);
    setCopied(id);
    setTimeout(() => setCopied(null), 1800);
  };

  const name = (v: VideoRow) =>
    v.patient_name || `${v.first_name ?? ""} ${v.last_name ?? ""}`.trim() || "Patient";

  return (
    <div className="mx-auto max-w-[1160px]">
      <h1 className="cf-display text-[clamp(1.8rem,3vw,2.4rem)] font-light tracking-[-0.02em] text-[#1a1a17]">
        Videos
      </h1>
      <p className="cf-body mt-1.5 text-[15px] text-[#5e6a60]">
        Links never expire. Resend one any time, or open Ask Opera to see the
        patient&rsquo;s side.
      </p>

      {loading ? (
        <p className="cf-body mt-10 text-[15px] text-[#5e6a60]">Loading videos…</p>
      ) : videos.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-[#1a1a17]/10 bg-white p-10 text-center">
          <p className="cf-body text-[15.5px] text-[#5e6a60]">
            No videos yet. Generate your first from the Generate tab — it lands
            here with a patient link the moment it finishes.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {videos.map((v) => {
            const ready = Boolean(v.video_url);
            return (
              <div
                key={v.id}
                className="overflow-hidden rounded-2xl border border-[#1a1a17]/10 bg-white shadow-[0_20px_50px_-30px_rgba(26,26,23,0.25)]"
              >
                {ready ? (
                  <video
                    src={v.video_url ?? undefined}
                    controls
                    playsInline
                    preload="metadata"
                    className="aspect-video w-full bg-black object-contain"
                  />
                ) : (
                  <div className="flex aspect-video w-full items-center justify-center bg-[#f5f8f5]">
                    <span className="cf-mono text-[12px] uppercase tracking-[0.14em] text-[#6e7a71]">
                      {v.render_status === "failed" ? "render failed" : "rendering…"}
                    </span>
                  </div>
                )}

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-[16px] font-medium text-[#1a1a17]">{name(v)}</p>
                      <p className="cf-mono mt-0.5 text-[11px] uppercase tracking-[0.1em] text-[#6e7a71]">
                        {(v.treatment_type ?? "treatment").replace(/_/g, " ")} · {fmtDate(v.created_at)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => copyLink(v.id)}
                      className="cf-mono inline-flex items-center gap-1.5 rounded-full border border-[#5f7a61]/30 px-3.5 py-1.5 text-[11.5px] uppercase tracking-[0.08em] text-[#3e5540] transition-colors hover:bg-[#5f7a61]/[0.07]"
                    >
                      {copied === v.id ? <Check size={12} /> : <Copy size={12} />}
                      {copied === v.id ? "Copied" : "Copy patient link"}
                    </button>
                    <a
                      href={`/v/${v.id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="cf-mono inline-flex items-center gap-1.5 rounded-full bg-[#1a1a17] px-3.5 py-1.5 text-[11.5px] uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#5f7a61]"
                    >
                      <ExternalLink size={12} /> Open
                    </a>
                    {ready && (
                      <button
                        onClick={() => setAskOpen(askOpen === v.id ? null : v.id)}
                        className={`cf-mono ml-auto inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11.5px] uppercase tracking-[0.08em] transition-colors ${
                          askOpen === v.id
                            ? "bg-[#5f7a61]/10 text-[#3e5540]"
                            : "border border-[#1a1a17]/12 text-[#1a1a17]/65 hover:border-[#5f7a61]/40 hover:text-[#3e5540]"
                        }`}
                      >
                        {askOpen === v.id ? <X size={12} /> : <MessageCircle size={12} />}
                        Ask Opera
                      </button>
                    )}
                  </div>

                  {askOpen === v.id && ready && (
                    <div className="mt-5 border-t border-[#1a1a17]/[0.07] pt-5">
                      <AskOpera
                        shareId={v.id}
                        patientFirstName={name(v).split(" ")[0]}
                        clinicName="your clinic"
                        suggestions={SUGGESTIONS}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
