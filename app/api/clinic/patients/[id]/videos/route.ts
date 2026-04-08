/**
 * GET /api/clinic/patients/[id]/videos
 * Returns all videos for a patient (video history), ordered newest first.
 */

import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db/patient-portal-schema";
import { verifyClinicToken } from "@/lib/auth/clinic-auth";

type Params = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, { params }: Params) {
  const clinic = await verifyClinicToken(request);
  if (!clinic) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const db = getDb();

  const videos = db
    .prepare(
      `SELECT id, video_url, video_title, treatment_type, provider_notes,
              render_job_id, render_status, render_started_at, render_completed_at,
              render_error, duration_seconds, watched, watched_at,
              watch_duration_seconds, is_active, created_at
       FROM patient_videos
       WHERE patient_id = ? AND clinic_id = ?
       ORDER BY created_at DESC`
    )
    .all(id, clinic.clinicId);

  return NextResponse.json({ videos });
}
