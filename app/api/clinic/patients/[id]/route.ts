/**
 * GET    /api/clinic/patients/[id] — single patient details + survey
 * PATCH  /api/clinic/patients/[id] — update patient fields
 * DELETE /api/clinic/patients/[id] — remove patient record
 */

import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db/patient-portal-schema";
import { verifyClinicToken } from "@/lib/auth/clinic-auth";
import { getPortalPatient, deletePortalPatient, savePortalPatient } from "@/lib/portal/store";

type Params = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, { params }: Params) {
  const clinic = await verifyClinicToken(request);
  if (!clinic) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  // Durable store first (source of truth on serverless), SQLite fallback.
  try {
    const dp = await getPortalPatient(clinic.clinicId, id);
    if (dp) {
      return NextResponse.json({
        patient: {
          id: dp.patientId,
          first_name: dp.firstName,
          last_name: dp.lastName,
          email: dp.email ?? null,
          date_of_birth: dp.dateOfBirth ?? null,
          phone: dp.phone ?? null,
          treatment_type: dp.treatmentType ?? null,
          consulting_provider: dp.provider ?? null,
          consultation_date: null,
          created_at: dp.createdAt,
        },
        survey: null,
      });
    }
  } catch {
    /* fall through to SQLite */
  }

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

  const allowedFields = [
    "video_url",
    "video_title",
    "treatment_type",
    "consulting_provider",
    "consultation_date",
    "phone",
  ];
  if (!allowedFields.some((f) => f in body)) {
    return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
  }

  // Durable store first (source of truth on serverless).
  try {
    const dp = await getPortalPatient(clinic.clinicId, id);
    if (dp) {
      if ("treatment_type" in body) dp.treatmentType = body.treatment_type ?? dp.treatmentType;
      if ("consulting_provider" in body) dp.provider = body.consulting_provider ?? dp.provider;
      if ("phone" in body) dp.phone = body.phone ?? dp.phone;
      await savePortalPatient(dp);
    }
  } catch (err) {
    console.error("[patients] durable patch failed", err);
  }

  // Best-effort SQLite mirror.
  try {
    const updates: string[] = [];
    const values: unknown[] = [];
    for (const field of allowedFields) {
      if (field in body) {
        updates.push(`${field} = ?`);
        values.push(body[field]);
      }
    }
    values.push(id, clinic.clinicId);
    getDb()
      .prepare(`UPDATE patient_accounts SET ${updates.join(", ")} WHERE id = ? AND clinic_id = ?`)
      .run(...values);
  } catch {
    /* read-only fs — durable update above is authoritative */
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const clinic = await verifyClinicToken(request);
  if (!clinic) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  // Durable store is authoritative; SQLite is best-effort.
  let removed = false;
  try {
    const dp = await getPortalPatient(clinic.clinicId, id);
    if (dp) {
      await deletePortalPatient(clinic.clinicId, id);
      removed = true;
    }
  } catch (err) {
    console.error("[patients] durable delete failed", err);
  }

  try {
    const db = getDb();
    db.prepare("DELETE FROM survey_responses WHERE patient_id = ? AND clinic_id = ?").run(
      id,
      clinic.clinicId
    );
    const result = db
      .prepare("DELETE FROM patient_accounts WHERE id = ? AND clinic_id = ?")
      .run(id, clinic.clinicId);
    if (result.changes > 0) removed = true;
  } catch {
    /* read-only fs — durable delete above is authoritative */
  }

  if (!removed) {
    return NextResponse.json({ error: "Patient not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
