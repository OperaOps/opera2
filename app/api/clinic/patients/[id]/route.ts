/**
 * GET    /api/clinic/patients/[id] — single patient details + survey
 * PATCH  /api/clinic/patients/[id] — update patient fields
 * DELETE /api/clinic/patients/[id] — remove patient record
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

  const patient = db
    .prepare(
      `SELECT id, first_name, last_name, email, date_of_birth, phone,
              treatment_type, consulting_provider, consultation_date,
              video_url, video_title, video_watched, video_watched_at,
              video_watch_duration_seconds, survey_completed, survey_completed_at,
              access_code, created_at
       FROM patient_accounts
       WHERE id = ? AND clinic_id = ?`
    )
    .get(id, clinic.clinicId);

  if (!patient) {
    return NextResponse.json({ error: "Patient not found" }, { status: 404 });
  }

  const survey = db
    .prepare("SELECT * FROM survey_responses WHERE patient_id = ? AND clinic_id = ?")
    .get(id, clinic.clinicId);

  return NextResponse.json({ patient, survey: survey || null });
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const clinic = await verifyClinicToken(request);
  if (!clinic) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const db = getDb();

  const allowedFields = [
    "video_url",
    "video_title",
    "treatment_type",
    "consulting_provider",
    "consultation_date",
    "phone",
  ];

  const updates: string[] = [];
  const values: unknown[] = [];

  for (const field of allowedFields) {
    if (field in body) {
      updates.push(`${field} = ?`);
      values.push(body[field]);
    }
  }

  if (updates.length === 0) {
    return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
  }

  values.push(id, clinic.clinicId);
  db.prepare(
    `UPDATE patient_accounts SET ${updates.join(", ")} WHERE id = ? AND clinic_id = ?`
  ).run(...values);

  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const clinic = await verifyClinicToken(request);
  if (!clinic) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const db = getDb();

  db.prepare("DELETE FROM survey_responses WHERE patient_id = ? AND clinic_id = ?").run(
    id,
    clinic.clinicId
  );
  const result = db
    .prepare("DELETE FROM patient_accounts WHERE id = ? AND clinic_id = ?")
    .run(id, clinic.clinicId);

  if (result.changes === 0) {
    return NextResponse.json({ error: "Patient not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
