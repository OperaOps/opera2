/**
 * POST /api/v1/video/generate
 *
 * Public API endpoint for generating patient education videos.
 * Requires Bearer API key authentication.
 */

import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { validateApiKey, checkRateLimit } from "@/lib/api/api-keys";
import { validatePublicInput } from "@/lib/api/input-schema";
import { runRenderInBackground } from "@/lib/video/render";
import { saveJob, type VideoJob } from "@/app/api/patient-video/_lib/job-store";

export async function POST(request: NextRequest): Promise<NextResponse> {
  // 1. Auth
  const apiKey = validateApiKey(request.headers.get("authorization"));
  if (!apiKey) {
    return NextResponse.json(
      { error: "Invalid or missing API key.", code: "unauthorized" },
      { status: 401 }
    );
  }

  // 2. Rate limit
  const rateCheck = checkRateLimit(apiKey);
  if (!rateCheck.allowed) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Try again later.", code: "rate_limited" },
      { status: 429, headers: { "Retry-After": String(rateCheck.retryAfter ?? 60) } }
    );
  }

  // 3. Parse body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON in request body.", code: "invalid_json" },
      { status: 400 }
    );
  }

  // 4. Validate input
  const validation = validatePublicInput(body);
  if (!validation.ok) {
    return NextResponse.json(
      { error: "Validation failed.", code: "validation_error", details: validation.errors },
      { status: 422 }
    );
  }

  // 5. Create job
  const jobId = crypto.randomUUID();
  const job: VideoJob = {
    status: "processing",
    progress: 0,
    step: "script",
    videoPath: null,
    videoUrl: null,
    error: null,
    createdAt: Date.now(),
    input: validation.data,
    contentMode: validation.data.contentMode,
  };
  await saveJob(jobId, job);

  // 6. Kick off render
  runRenderInBackground(jobId, validation.data);

  // 7. Return
  return NextResponse.json(
    {
      id: jobId,
      status: "processing",
      poll_url: `/api/v1/video/${jobId}`,
      created_at: new Date(job.createdAt).toISOString(),
    },
    { status: 202 }
  );
}
