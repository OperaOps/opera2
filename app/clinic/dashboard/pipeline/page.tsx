"use client";

/**
 * Generate Video — the Patient Video Studio inside the portal. Supports
 * ?patient=<id> to prefill from an existing patient, and offers the
 * patient dropdown for autofill either way.
 */

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { VideoStudio } from "@/Components/patient-video/VideoStudio";

function GenerateInner() {
  const params = useSearchParams();
  return <VideoStudio embedded prefillPatientId={params?.get("patient") ?? null} />;
}

export default function GenerateVideoPage() {
  return (
    <Suspense fallback={null}>
      <GenerateInner />
    </Suspense>
  );
}
