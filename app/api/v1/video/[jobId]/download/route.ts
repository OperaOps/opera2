/**
 * GET /api/v1/video/:jobId/download
 *
 * Redirects to the video file (S3 URL) for download.
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

  if (job.status === "processing") {
    return NextResponse.json(
      { error: "Video is still being generated.", code: "not_ready", progress: job.progress },
      { status: 202 }
    );
  }

  if (job.status === "failed") {
    return NextResponse.json(
      { error: "Video generation failed.", code: "failed" },
      { status: 410 }
    );
  }

  if (!job.videoUrl) {
    return NextResponse.json(
      { error: "Video file not available.", code: "not_found" },
      { status: 404 }
    );
  }

  // Redirect to S3
  return NextResponse.redirect(job.videoUrl, 302);
}
