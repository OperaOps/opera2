"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface RenderStatus {
  status: "pending" | "rendering" | "processing" | "completed" | "failed";
  progress: number;
  step: string;
  videoUrl: string | null;
  error: string | null;
  isPolling: boolean;
}

/**
 * Polls the existing PV beta job status endpoint every 4 seconds
 * until the render completes or fails.
 */
export function useVideoRenderStatus(jobId: string | null): RenderStatus {
  const [state, setState] = useState<RenderStatus>({
    status: "pending",
    progress: 0,
    step: "",
    videoUrl: null,
    error: null,
    isPolling: false,
  });
  const failCount = useRef(0);

  const poll = useCallback(async () => {
    if (!jobId) return;
    try {
      const res = await fetch(`/api/patient-video/${jobId}`);
      if (!res.ok) {
        failCount.current++;
        return;
      }
      const data = await res.json();
      failCount.current = 0;
      setState({
        status: data.status,
        progress: data.progress ?? 0,
        step: data.step ?? "",
        videoUrl: data.videoUrl ?? null,
        error: data.error ?? null,
        isPolling: data.status === "processing",
      });
    } catch {
      failCount.current++;
    }
  }, [jobId]);

  useEffect(() => {
    if (!jobId) return;
    setState((s) => ({ ...s, isPolling: true, status: "pending" }));
    failCount.current = 0;

    // Initial poll immediately
    poll();

    const interval = setInterval(() => {
      if (failCount.current >= 10) {
        clearInterval(interval);
        setState((s) => ({
          ...s,
          status: "failed",
          error: "Lost connection to render server",
          isPolling: false,
        }));
        return;
      }
      // Stop when terminal state
      setState((prev) => {
        if (prev.status === "completed" || prev.status === "failed") {
          clearInterval(interval);
          return { ...prev, isPolling: false };
        }
        return prev;
      });
      poll();
    }, 4000);

    return () => clearInterval(interval);
  }, [jobId, poll]);

  return state;
}
