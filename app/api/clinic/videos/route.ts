/**
 * GET /api/clinic/videos — list all generated videos for the authenticated
 * clinic, joined with patient names, newest first.
 */

import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db/patient-portal-schema";
import { verifyClinicToken } from "@/lib/auth/clinic-auth";

export async function GET(request: NextRequest) {
  const clinic = await verifyClinicToken(request);
  if (!clinic) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = getDb();

  const videos = db
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
    .all(clinic.clinicId);

  return NextResponse.json({ videos });
}
