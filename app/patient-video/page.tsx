"use client";

/**
 * Standalone Patient Video Studio (App Runner / direct link).
 * The clinic portal embeds the same studio at /clinic/dashboard/pipeline.
 */

import { VideoStudio } from "@/Components/patient-video/VideoStudio";

export default function PatientVideoPage() {
  return <VideoStudio />;
}
