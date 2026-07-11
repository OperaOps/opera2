"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Video, Copy, Check, ExternalLink, Wand2 } from "lucide-react";
import { getTreatmentLabel } from "@/lib/constants/treatment-types";

interface ClinicVideo {
  id: string;
  patient_id: string;
  video_url: string | null;
  video_title: string | null;
  treatment_type: string;
  render_status: "pending" | "rendering" | "completed" | "failed";
  duration_seconds: number | null;
  watched: number;
  is_active: number;
  created_at: string;
  first_name: string;
  last_name: string;
}

const STATUS_STYLES: Record<string, string> = {
  completed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  rendering: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  failed: "bg-red-500/10 text-red-400 border-red-500/20",
};

function formatDate(iso: string): string {
  const d = new Date(iso.includes("T") ? iso : iso.replace(" ", "T") + "Z");
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function VideosLibraryPage() {
  const router = useRouter();
  const [videos, setVideos] = useState<ClinicVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/clinic/videos")
      .then((res) => res.json())
      .then((data) => {
        if (data.videos) setVideos(data.videos);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function copyLink(videoId: string) {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/v/${videoId}`
      );
      setCopiedId(videoId);
      setTimeout(() => setCopiedId((id) => (id === videoId ? null : id)), 2000);
    } catch {
      // clipboard unavailable — silent
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl text-white font-extralight">Videos</h2>
        <button
          onClick={() => router.push("/clinic/dashboard/pipeline")}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600
            hover:from-violet-500 hover:to-purple-500 text-white text-sm font-medium
            transition-all shadow-lg shadow-violet-600/20"
        >
          + Generate Video
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-white/5 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : videos.length === 0 ? (
        <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 py-20 flex flex-col items-center text-center px-6">
          <div className="w-12 h-12 rounded-full bg-violet-500/10 flex items-center justify-center mb-4">
            <Video className="w-6 h-6 text-violet-400" />
          </div>
          <p className="text-white font-light mb-1">No videos yet</p>
          <p className="text-gray-500 text-sm mb-6 max-w-sm">
            Generate a personalized treatment video for a patient and it will
            show up here.
          </p>
          <button
            onClick={() => router.push("/clinic/dashboard/pipeline")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600
              hover:from-violet-500 hover:to-purple-500 text-white text-sm font-medium
              transition-all shadow-lg shadow-violet-600/20"
          >
            <Wand2 className="w-4 h-4" />
            Generate Video
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((v, i) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10
                hover:border-violet-500/40 transition-colors overflow-hidden flex flex-col"
            >
              {/* Thumbnail */}
              <div className="aspect-video bg-black/50 relative">
                {v.video_url ? (
                  <video
                    src={v.video_url}
                    preload="metadata"
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    onMouseEnter={(e) => {
                      e.currentTarget.play().catch(() => {});
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.pause();
                      e.currentTarget.currentTime = 0;
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Video className="w-8 h-8 text-gray-700" />
                  </div>
                )}
                <span
                  className={`absolute top-2 right-2 px-2 py-0.5 text-xs rounded-full border ${
                    STATUS_STYLES[v.render_status] || STATUS_STYLES.pending
                  }`}
                >
                  {v.render_status}
                </span>
              </div>

              {/* Body */}
              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="text-white text-sm font-medium truncate">
                    {v.first_name} {v.last_name}
                  </p>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {formatDate(v.created_at)}
                  </span>
                </div>
                <span
                  className="self-start px-2 py-0.5 text-xs rounded-full bg-violet-500/10
                    text-violet-400 border border-violet-500/20 mb-4"
                >
                  {getTreatmentLabel(v.treatment_type)}
                </span>

                <div className="mt-auto flex items-center gap-2">
                  <button
                    onClick={() => copyLink(v.id)}
                    className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md
                      text-xs font-medium border transition-colors ${
                        copiedId === v.id
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-white/5 text-gray-300 border-white/10 hover:text-white hover:border-violet-500/40"
                      }`}
                  >
                    {copiedId === v.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copy patient link
                      </>
                    )}
                  </button>
                  <a
                    href={`/v/${v.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md
                      text-xs font-medium bg-white/5 text-gray-300 border border-white/10
                      hover:text-white hover:border-violet-500/40 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Open
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
