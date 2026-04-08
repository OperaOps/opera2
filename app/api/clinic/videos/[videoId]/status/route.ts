/**
 * GET /api/clinic/videos/[videoId]/status
 *
 * Polls the render status by looking up the render_job_id in patient_videos,
 * then querying the existing PV beta job store.
 * When the job completes, auto-updates patient_videos and patient_accounts.
 */

import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db/patient-portal-schema";
import { verifyClinicToken } from "@/lib/auth/clinic-auth";
import { loadJob } from "@/app/api/patient-video/_lib/job-store";

type Params = { params: Promise<{ videoId: string }> };

export async function GET(request: NextRequest, { params }: Params) {
  const clinic = await verifyClinicToken(request);
  if (!clinic) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { videoId } = await params;
  const db = getDb();

  const videoRecord = db
    .prepare(
      "SELECT id, render_job_id, render_status, patient_id, treatment_type FROM patient_videos WHERE id = ? AND clinic_id = ?"
    )
    .get(videoId, clinic.clinicId) as
    | {
        id: string;
        render_job_id: string | null;
        render_status: string;
        patient_id: string;
        treatment_type: string;
      }
    | undefined;

  if (!videoRecord) {
    return NextResponse.json({ error: "Video not found" }, { status: 404 });
  }

  // If already terminal, return directly
  if (videoRecord.render_status === "completed" || videoRecord.render_status === "failed") {
    const full = db
      .prepare("SELECT video_url, render_error FROM patient_videos WHERE id = ?")
      .get(videoId) as { video_url: string | null; render_error: string | null };
    return NextResponse.json({
      render_status: videoRecord.render_status,
      video_url: full.video_url,
      render_error: full.render_error,
    });
  }

  // Poll the PV beta job store
  if (!videoRecord.render_job_id) {
    return NextResponse.json({
      render_status: "pending",
      video_url: null,
      render_error: null,
    });
  }

  const job = await loadJob(videoRecord.render_job_id);
  if (!job) {
    return NextResponse.json({
      render_status: "rendering",
      progress: 0,
      step: "Initializing...",
      video_url: null,
      render_error: null,
    });
  }

  // Sync status from job store to patient_videos.
  // Use S3 URL if available; otherwise fall back to the local streaming endpoint
  // (matches /api/patient-video/[jobId] behaviour).
  if (job.status === "completed") {
    const finalUrl =
      job.videoUrl || `/api/patient-video/${videoRecord.render_job_id}/video`;
    const title = `${videoRecord.treatment_type.replace(/_/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase())} Treatment Plan`;

    db.prepare(
      `UPDATE patient_videos
       SET render_status = 'completed', video_url = ?, video_title = ?,
           render_completed_at = CURRENT_TIMESTAMP
       WHERE id = ?`
    ).run(finalUrl, title, videoId);

    // Update active video on patient_accounts
    db.prepare(
      "UPDATE patient_accounts SET video_url = ?, video_title = ? WHERE id = ?"
    ).run(finalUrl, title, videoRecord.patient_id);

    return NextResponse.json({
      render_status: "completed",
      video_url: finalUrl,
      render_error: null,
    });
  }

  if (job.status === "failed") {
    db.prepare(
      "UPDATE patient_videos SET render_status = 'failed', render_error = ? WHERE id = ?"
    ).run(job.error || "Render failed", videoId);

    return NextResponse.json({
      render_status: "failed",
      video_url: null,
      render_error: job.error,
    });
  }

  // Still processing
  return NextResponse.json({
    render_status: "rendering",
    progress: job.progress,
    step: job.step,
    video_url: null,
    render_error: null,
  });
}
