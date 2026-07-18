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
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-xs rounded-full bg-amber-50 text-amber-700 border border-amber-200">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
        {shouldPoll && poll.step
          ? stepLabel(poll.step)
          : "Generating..."}
      </span>
    );
  }

  if (effectiveStatus === "failed") {
    return (
      <span className="px-2 py-0.5 text-xs rounded-full bg-red-50 text-red-600 border border-red-200">
        Failed
      </span>
    );
  }

  if (effectiveStatus === "completed") {
    if (surveyCompleted) {
      return (
        <span className="px-2 py-0.5 text-xs rounded-full bg-green-50 text-green-700 border border-green-200">
          Survey done
        </span>
      );
    }
    if (watched) {
      return (
        <span className="px-2 py-0.5 text-xs rounded-full bg-green-50 text-green-700 border border-green-200">
          Watched
        </span>
      );
    }
    if (videoUrl) {
      return (
        <span className="px-2 py-0.5 text-xs rounded-full bg-[#5f7a61]/[0.07] text-[#3e5540] border border-[#5f7a61]/30">
          Ready
        </span>
      );
    }
  }

  return (
    <span className="px-2 py-0.5 text-xs rounded-full bg-gray-50 text-gray-500 border border-gray-200">
      No video
    </span>
  );
}
