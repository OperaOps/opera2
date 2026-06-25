/**
 * GET /api/v1/video/:jobId
 *
 * Poll video generation status. Returns progress, step, and video_url when done.
 * Requires Bearer API key authentication.
 */

import { NextRequest, NextResponse } from "next/server";
import { validateApiKey } from "@/lib/api/api-keys";
import { loadJob } from "@/app/api/patient-video/_lib/job-store";

export async function GET(
  request: NextRequest,
  { params }: { params: { jobId: string } }
): Promise<NextResponse> {
  // Auth
  const apiKey = validateApiKey(request.headers.get("authorization"));
  if (!apiKey) {
    return NextResponse.json(
      { error: "Invalid or missing API key.", code: "unauthorized" },
      { status: 401 }
    );
  }

  const { jobId } = params;
  const job = await loadJob(jobId);

  if (!job) {
    return NextResponse.json(
      { error: `Job "${jobId}" not found.`, code: "not_found" },
      { status: 404 }
    );
  }

  const response: Record<string, unknown> = {
    id: jobId,
    status: job.status,
    progress: Math.round(job.progress * 100) / 100,
    step: job.step || null,
    created_at: new Date(job.createdAt).toISOString(),
  };

  if (job.status === "completed" && job.videoUrl) {
    response.video_url = job.videoUrl;
    response.download_url = `/api/v1/video/${jobId}/download`;
  }

  if (job.status === "failed") {
    response.error = job.error || "Unknown error.";
  }

  return NextResponse.json(response);
}
