"use client";

import { useVideoRenderStatus } from "@/hooks/useVideoRenderStatus";

interface VideoStatusBadgeProps {
  renderStatus: string;
  jobId?: string | null;
  videoUrl?: string | null;
  watched?: boolean;
  surveyCompleted?: boolean;
  onComplete?: (videoUrl: string) => void;
}

function stepLabel(step: string): string {
  if (step.includes("script")) return "Generating script...";
  if (step.includes("voiceover") || step.includes("audio")) return "Creating voiceover...";
  if (step.includes("Bundl") || step.includes("bundl")) return "Preparing renderer...";
  if (step.includes("Render") || step.includes("render")) return "Rendering video...";
  if (step.includes("complete") || step.includes("Finaliz")) return "Finalizing...";
  return step || "Processing...";
}

export default function VideoStatusBadge({
  renderStatus,
  jobId,
  videoUrl,
  watched,
  surveyCompleted,
  onComplete,
}: VideoStatusBadgeProps) {
  // Poll if currently rendering
  const shouldPoll =
    renderStatus === "pending" || renderStatus === "rendering";
  const poll = useVideoRenderStatus(shouldPoll ? jobId ?? null : null);

  // If poll detected completion, notify parent
  if (poll.status === "completed" && poll.videoUrl && onComplete) {
    onComplete(poll.videoUrl);
  }

  // Determine display state
  const effectiveStatus = shouldPoll ? poll.status : renderStatus;

  if (
    effectiveStatus === "pending" ||
    effectiveStatus === "rendering" ||
    effectiveStatus === "processing"
  ) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-xs rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
        {shouldPoll && poll.step
          ? stepLabel(poll.step)
          : "Generating..."}
      </span>
    );
  }

  if (effectiveStatus === "failed") {
    return (
      <span className="px-2 py-0.5 text-xs rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
        Failed
      </span>
    );
  }

  if (effectiveStatus === "completed") {
    if (surveyCompleted) {
      return (
        <span className="px-2 py-0.5 text-xs rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          Survey done
        </span>
      );
    }
    if (watched) {
      return (
        <span className="px-2 py-0.5 text-xs rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          Watched
        </span>
      );
    }
    if (videoUrl) {
      return (
        <span className="px-2 py-0.5 text-xs rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">
          Ready
        </span>
      );
    }
  }

  return (
    <span className="px-2 py-0.5 text-xs rounded-full bg-gray-500/10 text-gray-500 border border-gray-500/20">
      No video
    </span>
  );
}
