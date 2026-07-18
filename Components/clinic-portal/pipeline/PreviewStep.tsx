"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { RefreshCw, ArrowRight } from "lucide-react";
import type { PipelinePatient, PipelineVideo } from "@/lib/workflow/video-pipeline";
import { getTreatmentLabel } from "@/lib/constants/treatment-types";

interface PreviewStepProps {
  patient: PipelinePatient;
  treatmentType: string;
  video: PipelineVideo;
  onVideoUpdate: (video: PipelineVideo) => void;
  onRegenerate: () => void;
  onNext: () => void;
}

const PROGRESS_MESSAGES = [
  "Personalizing narration...",
  "Creating voiceover audio...",
  "Preparing treatment animations...",
  "Rendering video frames...",
  "Finalizing audio mix...",
  "Optimizing video quality...",
];

export default function PreviewStep({
  patient,
  treatmentType,
  video,
  onVideoUpdate,
  onRegenerate,
  onNext,
}: PreviewStepProps) {
  const [msgIndex, setMsgIndex] = useState(0);

  // Cycle progress messages while rendering
  useEffect(() => {
    if (video.status === "completed" || video.status === "failed") return;
    const interval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % PROGRESS_MESSAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [video.status]);

  // Poll video status
  const poll = useCallback(async () => {
    if (!video.videoId) return;
    try {
      const res = await fetch(`/api/clinic/videos/${video.videoId}/status`);
      const data = await res.json();
      if (data.render_status === "completed" && data.video_url) {
        onVideoUpdate({
          ...video,
          status: "completed",
          videoUrl: data.video_url,
        });
      } else if (data.render_status === "failed") {
        onVideoUpdate({
          ...video,
          status: "failed",
        });
      }
    } catch {
      // silent
    }
  }, [video, onVideoUpdate]);

  useEffect(() => {
    if (video.status === "completed" || video.status === "failed") return;
    const interval = setInterval(poll, 4000);
    poll(); // immediate first
    return () => clearInterval(interval);
  }, [video.status, poll]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-2xl mx-auto space-y-6"
    >
      <h2 className="text-lg text-white font-light">Video Preview</h2>
      <p className="text-sm text-gray-400">
        {patient.firstName} {patient.lastName} &middot;{" "}
        {getTreatmentLabel(treatmentType)}
      </p>

      {/* Rendering state */}
      {(video.status === "pending" || video.status === "rendering") && (
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-12 text-center space-y-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="w-12 h-12 border-2 border-[#5f7a61] border-t-transparent rounded-full mx-auto"
          />
          <div>
            <p className="text-white text-lg font-light">
              Generating your video...
            </p>
            <motion.p
              key={msgIndex}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-gray-400 text-sm mt-2"
            >
              {PROGRESS_MESSAGES[msgIndex]}
            </motion.p>
          </div>
          <p className="text-gray-600 text-xs">
            This typically takes 2-3 minutes
          </p>
        </div>
      )}

      {/* Completed state */}
      {video.status === "completed" && video.videoUrl && (
        <div className="space-y-4">
          <div className="rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl">
            <video
              src={video.videoUrl}
              controls
              className="w-full aspect-video"
              preload="metadata"
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">
              {video.videoTitle || `${getTreatmentLabel(treatmentType)} Treatment Plan`}
            </p>
            <p className="text-xs text-gray-600">Generated just now</p>
          </div>
        </div>
      )}

      {/* Failed state */}
      {video.status === "failed" && (
        <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-8 text-center space-y-3">
          <p className="text-red-400">Video generation failed</p>
          <button
            onClick={onRegenerate}
            className="px-4 py-2 rounded-lg bg-red-500/20 text-red-300 text-sm
              hover:bg-red-500/30 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-between pt-2">
        {video.status === "completed" && (
          <>
            <button
              onClick={onRegenerate}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm transition-colors"
            >
              <RefreshCw className="w-4 h-4" /> Regenerate Video
            </button>
            <button
              onClick={onNext}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#5f7a61] to-[#5f7a61]
                hover:from-[#4e6650] hover:to-[#4e6650] text-white font-medium transition-all
                shadow-lg shadow-[#5f7a61]/20"
            >
              Send to Patient <ArrowRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
}
