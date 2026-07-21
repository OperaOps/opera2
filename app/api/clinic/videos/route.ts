/**
 * GET /api/clinic/videos — list all generated videos for the authenticated
 * clinic, newest first. Merges two sources:
 *   1. the portal DB (patient_videos joined with patient_accounts)
 *   2. the render pipeline's job store (every video made via Generate Video)
 * so nothing generated in the studio gets lost after preview.
 */

import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db/patient-portal-schema";
import { verifyClinicToken } from "@/lib/auth/clinic-auth";
import {
  dynamoListJobs,
  dynamoListJobsByClinic,
  isDynamoJobStoreEnabled,
} from "@/app/api/patient-video/_lib/job-store-dynamo";

export async function GET(request: NextRequest) {
  const clinic = await verifyClinicToken(request);
  if (!clinic) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  type VideoRow = Record<string, unknown>;
  let videos: VideoRow[] = [];

  try {
    const db = getDb();
    videos = db
      .prepare(
        `SELECT pv.id, pv.patient_id, pv.video_url, pv.video_title,
                pv.treatment_type, pv.render_status, pv.render_error,
                pv.duration_seconds, pv.watched, pv.is_active, pv.created_at,
                pa.first_name, pa.last_name
         FROM patient_videos pv
         JOIN patient_accounts pa ON pa.id = pv.patient_id
         WHERE pv.clinic_id = ?
         ORDER BY pv.created_at DESC`
      )
      .all(clinic.clinicId) as VideoRow[];
  } catch {
    /* portal DB unavailable — jobs below still list */
  }

  // Pipeline jobs → same row shape. Every studio generation shows up here.
  // Tenant-scoped: a clinic sees only its own jobs. The seeded demo account
  // also sees legacy unscoped jobs (everything predating clinicId tagging).
  const isDemoClinic = clinic.email === "demo@getopera.ai";
  if (isDynamoJobStoreEnabled()) {
    try {
      // Per-clinic GSI query (fast at any table size); the demo account also
      // shows legacy unscoped jobs, which only the scan can see.
      const jobs = isDemoClinic
        ? await dynamoListJobs(200)
        : await dynamoListJobsByClinic(clinic.clinicId, 200);
      const seen = new Set(videos.map((v) => v.id));
      for (const job of jobs) {
        if (seen.has(job.jobId)) continue;
        if (job.clinicId ? job.clinicId !== clinic.clinicId : !isDemoClinic) continue;
        const input = job.input ?? ({} as Record<string, string>);
        if (!input.patientName) continue; // not a portal-visible job
        const [first, ...rest] = String(input.patientName).trim().split(/\s+/);
        videos.push({
          id: job.jobId,
          patient_id: null,
          video_url: job.videoUrl,
          video_title: `${String(input.treatment || "treatment").replace(/_/g, " ")} — personalized video`,
          treatment_type: input.treatment || "treatment",
          render_status: job.status,
          render_error: job.error,
          duration_seconds: null,
          watched: 0,
          is_active: 1,
          created_at: new Date(job.createdAt).toISOString(),
          first_name: first,
          last_name: rest.join(" ") || null,
        });
      }
      videos.sort(
        (a, b) =>
          new Date(String(b.created_at)).getTime() -
          new Date(String(a.created_at)).getTime()
      );
    } catch (err) {
      console.error("[clinic/videos] job store read failed", err);
    }
  }

  return NextResponse.json({ videos });
}
