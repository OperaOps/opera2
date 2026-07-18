"use client";

import { getTreatmentLabel } from "@/lib/constants/treatment-types";

interface VideoRecord {
  id: string;
  video_url: string | null;
  video_title: string | null;
  treatment_type: string;
  render_status: string;
  render_job_id: string | null;
  watched: number;
  watched_at: string | null;
  watch_duration_seconds: number;
  is_active: number;
  created_at: string;
}

interface VideoHistoryListProps {
  videos: VideoRecord[];
}

export default function VideoHistoryList({ videos }: VideoHistoryListProps) {
  if (videos.length === 0) {
    return (
      <p className="text-gray-400 text-sm">No videos generated yet.</p>
    );
  }

  return (
    <div className="space-y-2">
      {videos.map((v, i) => (
        <div
          key={v.id}
          className={`flex items-center justify-between p-3 rounded-lg border ${
            v.is_active
              ? "bg-[#5f7a61]/[0.07] border-[#5f7a61]/20"
              : "bg-gray-50 border-gray-100"
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="text-gray-400 text-xs w-5">{i + 1}.</span>
            <div>
              <p className="text-sm text-gray-900">
                {v.video_title || getTreatmentLabel(v.treatment_type)}
                {v.is_active ? (
                  <span className="ml-2 text-[10px] text-[#5f7a61] uppercase tracking-wider">
                    active
                  </span>
                ) : null}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(v.created_at).toLocaleDateString()}
                {v.watched
                  ? ` · Watched${v.watched_at ? ` on ${new Date(v.watched_at).toLocaleDateString()}` : ""}`
                  : v.render_status === "completed"
                  ? " · Not watched"
                  : v.render_status === "failed"
                  ? " · Render failed"
                  : " · Rendering..."}
              </p>
            </div>
          </div>

          {v.video_url && v.render_status === "completed" && (
            <a
              href={v.video_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#5f7a61] hover:text-[#5f7a61] transition-colors"
            >
              Preview
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
