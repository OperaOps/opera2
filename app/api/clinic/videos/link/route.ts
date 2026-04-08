/**
 * POST /api/clinic/videos/link
 * Links a standalone-generated video to a patient.
 * Body: { video_url, video_title, treatment_type, patient_id }
 */

import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db/patient-portal-schema";
import { verifyClinicToken } from "@/lib/auth/clinic-auth";

export async function POST(request: NextRequest) {
  const clinic = await verifyClinicToken(request);
  if (!clinic) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { video_url, video_title, treatment_type, patient_id } =
    await request.json();

  if (!video_url || !patient_id || !treatment_type) {
    return NextResponse.json(
      { error: "video_url, treatment_type, and patient_id are required" },
      { status: 400 }
    );
  }

  const db = getDb();

  // Verify patient belongs to this clinic
  const patient = db
    .prepare("SELECT id FROM patient_accounts WHERE id = ? AND clinic_id = ?")
    .get(patient_id, clinic.clinicId);

  if (!patient) {
    return NextResponse.json({ error: "Patient not found" }, { status: 404 });
  }

  // Deactivate previous active videos
  db.prepare(
    "UPDATE patient_videos SET is_active = 0 WHERE patient_id = ? AND clinic_id = ?"
  ).run(patient_id, clinic.clinicId);

  // Insert new video record
  db.prepare(
    `INSERT INTO patient_videos
     (patient_id, clinic_id, video_url, video_title, treatment_type,
      render_status, render_completed_at, is_active)
     VALUES (?, ?, ?, ?, ?, 'completed', CURRENT_TIMESTAMP, 1)`
  ).run(patient_id, clinic.clinicId, video_url, video_title || null, treatment_type);

  // Update patient_accounts active video
  db.prepare(
    "UPDATE patient_accounts SET video_url = ?, video_title = ? WHERE id = ?"
  ).run(video_url, video_title || null, patient_id);

  return NextResponse.json({ success: true });
}
