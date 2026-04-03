/**
 * GET /api/patient-video/[jobId]
 *
 * Returns the current status of a video render job.
 */

import { NextRequest, NextResponse } from "next/server";
import { loadJob } from "../_lib/job-store";

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

export async function GET(
  _request: NextRequest,
  { params }: { params: { jobId: string } }
) {
  const { jobId } = params;

  const job = await loadJob(jobId);
  if (!job) {
    return NextResponse.json(
      { error: `Job not found: ${jobId}` },
      { status: 404 }
    );
  }

  const response: Record<string, unknown> = {
    jobId,
    status: job.status,
    progress: Math.round(job.progress * 100) / 100,
    step: job.step || "script",
  };

  if (job.status === "completed") {
    // Use S3 URL if available, otherwise fall back to local streaming
    response.videoUrl = job.videoUrl || `/api/patient-video/${jobId}/video`;
  }

  if (job.status === "failed") {
    response.error = job.error;
  }

  return NextResponse.json(response);
}
