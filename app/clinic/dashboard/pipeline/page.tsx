"use client";

/**
 * Generate Video — the same Patient Video Studio that runs standalone at
 * /patient-video, rendered natively inside the portal (no splash screen,
 * no full-screen shells). API calls proxy to App Runner on Netlify via
 * OPERA_RENDER_UPSTREAM.
 */

import { VideoStudio } from "@/Components/patient-video/VideoStudio";

export default function GenerateVideoPage() {
  return <VideoStudio embedded />;
}
