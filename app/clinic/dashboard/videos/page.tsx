"use client";

/**
 * Videos — every generated video, its permanent patient link, and the same
 * Ask Opera assistant the patient sees, right under each preview.
 */

import { useEffect, useMemo, useState } from "react";
import { Check, Copy, ExternalLink, MessageCircle, Search, X } from "lucide-react";
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
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | "ready" | "rendering">("all");
  const [treatment, setTreatment] = useState("all");

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

  const treatments = useMemo(
    () =>
      Array.from(
        new Set(videos.map((v) => (v.treatment_type ?? "").trim()).filter(Boolean))
      ).sort(),
    [videos]
  );

  const filtered = useMemo(
    () =>
      videos.filter((v) => {
        if (search.trim() && !name(v).toLowerCase().includes(search.toLowerCase()))
          return false;
        if (status === "ready" && !v.video_url) return false;
        if (status === "rendering" && v.video_url) return false;
        if (treatment !== "all" && (v.treatment_type ?? "") !== treatment) return false;
        return true;
      }),
    [videos, search, status, treatment]
  );

  const groups = useMemo(() => {
    const map = new Map<string, VideoRow[]>();
    for (const v of filtered) {
      const k = new Date(v.created_at).toLocaleDateString(undefined, {
        month: "long",
        year: "numeric",
      });
      if (!map.has(k)) map.set(k, []);
      map.get(k)!.push(v);
    }
    return Array.from(map.entries());
  }, [filtered]);

  return (
    <div className="mx-auto max-w-[1160px]">
      <h1 className="cf-display text-[clamp(1.8rem,3vw,2.4rem)] font-light tracking-[-0.02em] text-[#1a1a17]">
        Videos
      </h1>
      <p className="cf-body mt-1.5 text-[15px] text-[#5e6a60]">
        Links never expire. Resend one any time, or open Ask Opera to see the
        patient&rsquo;s side.
      </p>

      <div className="mt-7 flex flex-wrap items-center gap-3">
        <div className="relative w-full max-w-sm">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6e7a71]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by patient"
            className="cf-body w-full rounded-xl border border-[#1a1a17]/12 bg-white py-2.5 pl-10 pr-4 text-[14.5px] outline-none transition-colors focus:border-[#5f7a61]/60"
          />
        </div>
        {([
          ["all", "All"],
          ["ready", "Ready"],
          ["rendering", "Rendering"],
        ] as const).map(([k, label]) => (
          <button
            key={k}
            onClick={() => setStatus(k)}
            className={`cf-mono rounded-full border px-4 py-2 text-[11.5px] uppercase tracking-[0.08em] transition-colors ${
              status === k
                ? "border-[#5f7a61]/50 bg-[#5f7a61]/[0.08] text-[#3e5540]"
                : "border-[#1a1a17]/12 text-[#1a1a17]/55 hover:border-[#5f7a61]/40"
            }`}
          >
            {label}
          </button>
        ))}
        <select
          value={treatment}
          onChange={(e) => setTreatment(e.target.value)}
          className="cf-mono rounded-full border border-[#1a1a17]/12 bg-white px-4 py-2 text-[11.5px] uppercase tracking-[0.08em] text-[#1a1a17]/70 outline-none transition-colors hover:border-[#5f7a61]/40 focus:border-[#5f7a61]/50"
        >
          <option value="all">All treatments</option>
          {treatments.map((t) => (
            <option key={t} value={t}>
              {t.replace(/_/g, " ")}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="cf-body mt-10 text-[15px] text-[#5e6a60]">Loading videos…</p>
      ) : filtered.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-[#1a1a17]/10 bg-white p-10 text-center">
          <p className="cf-body text-[15.5px] text-[#5e6a60]">
            No videos yet. Generate your first from the Generate tab — it lands
            here with a patient link the moment it finishes.
          </p>
        </div>
      ) : (
        groups.map(([month, rows]) => (
        <section key={month} className="mt-9">
          <div className="flex items-baseline gap-3 border-b border-[#1a1a17]/10 pb-2">
            <h2 className="cf-mono text-[12px] uppercase tracking-[0.18em] text-[#5f7a61]">{month}</h2>
            <span className="cf-mono text-[11px] text-[#6e7a71]">{rows.length}</span>
          </div>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          {rows.map((v) => {
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
        </section>
        ))
      )}
    </div>
  );
}
