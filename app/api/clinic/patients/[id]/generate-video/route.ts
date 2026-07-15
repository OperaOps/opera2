/**
 * POST /api/clinic/patients/[id]/generate-video
 *
 * Triggers video generation for an existing patient by calling the
 * existing PV beta pipeline at /api/patient-video/generate.
 *
 * PORTAL-INTEGRATION: This is a thin wrapper — does NOT duplicate render logic.
 *
 * Pipeline:
 *   1. Look up patient + clinic records
 *   2. Validate treatment_type against the PV beta's allowed list
 *   3. Insert patient_videos row (render_status = 'rendering')
 *   4. POST to /api/patient-video/generate with patient's info
 *   5. Store the jobId in patient_videos.render_job_id
 *   6. Return videoRecordId + jobId for client-side polling
 */

import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db/patient-portal-schema";
import { verifyClinicToken } from "@/lib/auth/clinic-auth";
import { TREATMENT_TYPES } from "@/lib/constants/treatment-types";

type Params = { params: Promise<{ id: string }> };

const VALID_TREATMENTS = new Set(TREATMENT_TYPES.map((t) => t.value));

export async function POST(request: NextRequest, { params }: Params) {
  const clinic = await verifyClinicToken(request);
  if (!clinic) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  let body: { treatment_type?: string; provider_notes?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { treatment_type, provider_notes } = body;

  if (!treatment_type) {
    return NextResponse.json(
      { error: "treatment_type is required" },
      { status: 400 }
    );
  }

  if (!VALID_TREATMENTS.has(treatment_type)) {
    return NextResponse.json(
      { error: `Invalid treatment_type: ${treatment_type}` },
      { status: 400 }
    );
  }

  const db = getDb();

  // Look up patient (include last_name for fuller personalization)
  const patient = db
    .prepare(
      "SELECT id, first_name, last_name, consulting_provider FROM patient_accounts WHERE id = ? AND clinic_id = ?"
    )
    .get(id, clinic.clinicId) as
    | {
        id: string;
        first_name: string;
        last_name: string;
        consulting_provider: string | null;
      }
    | undefined;

  if (!patient) {
    return NextResponse.json({ error: "Patient not found" }, { status: 404 });
  }

  // Mark any orphaned 'rendering' rows from prior interrupted attempts as failed,
  // so they don't sit forever in the history claiming to be in-progress.
  db.prepare(
    `UPDATE patient_videos
     SET render_status = 'failed', render_error = COALESCE(render_error, 'Superseded by new render')
     WHERE patient_id = ? AND clinic_id = ? AND render_status IN ('pending', 'rendering')`
  ).run(id, clinic.clinicId);

  // Deactivate previous active videos for this patient
  db.prepare(
    "UPDATE patient_videos SET is_active = 0 WHERE patient_id = ? AND clinic_id = ?"
  ).run(id, clinic.clinicId);

  // Insert new patient_videos record
  const videoRecord = db
    .prepare(
      `INSERT INTO patient_videos
       (patient_id, clinic_id, treatment_type, provider_notes, render_status, render_started_at, is_active)
       VALUES (?, ?, ?, ?, 'rendering', CURRENT_TIMESTAMP, 1)`
    )
    .run(id, clinic.clinicId, treatment_type, provider_notes || null);

  const videoRecordId = db
    .prepare("SELECT id FROM patient_videos WHERE rowid = ?")
    .get(videoRecord.lastInsertRowid) as { id: string };

  // Call existing PV beta generate endpoint internally.
  // Use template_ai mode for fast, reliable generation that needs no API key fallback
  // when the clinic hasn't configured Claude yet.
  const baseUrl = request.nextUrl.origin;

  let generateRes: Response;
  try {
    generateRes = await fetch(`${baseUrl}/api/patient-video/generate`, {
      method: "POST",
      // Server-side hop drops the session cookie — pass the verified clinic
      // identity explicitly so the job is tenant-scoped.
      headers: { "Content-Type": "application/json", "x-opera-clinic-id": clinic.clinicId },
      body: JSON.stringify({
        patientName: patient.first_name,
        doctorName: patient.consulting_provider || clinic.clinicName,
        clinicName: clinic.clinicName,
        treatment: treatment_type,
        treatmentNotes: provider_notes || undefined,
        mode: "premium",
        contentMode: "template_ai",
      }),
    });
  } catch {
    // Network error reaching the internal endpoint — mark failed and bail out
    db.prepare(
      "UPDATE patient_videos SET render_status = 'failed', render_error = ? WHERE id = ?"
    ).run("Internal render service unreachable", videoRecordId.id);
    return NextResponse.json(
      { error: "Render service unreachable" },
      { status: 503 }
    );
  }

  if (!generateRes.ok) {
    let errMsg = "Failed to start video generation";
    try {
      const err = await generateRes.json();
      errMsg = err.error || errMsg;
    } catch {
      // ignore parse error
    }
    db.prepare(
      "UPDATE patient_videos SET render_status = 'failed', render_error = ? WHERE id = ?"
    ).run(errMsg, videoRecordId.id);

    return NextResponse.json({ error: errMsg }, { status: 500 });
  }

  let generateData: { jobId?: string };
  try {
    generateData = await generateRes.json();
  } catch {
    db.prepare(
      "UPDATE patient_videos SET render_status = 'failed', render_error = ? WHERE id = ?"
    ).run("Invalid response from render service", videoRecordId.id);
    return NextResponse.json(
      { error: "Invalid response from render service" },
      { status: 502 }
    );
  }

  const jobId = generateData.jobId;
  if (!jobId) {
    db.prepare(
      "UPDATE patient_videos SET render_status = 'failed', render_error = ? WHERE id = ?"
    ).run("No job ID returned from render service", videoRecordId.id);
    return NextResponse.json(
      { error: "No job ID returned" },
      { status: 502 }
    );
  }

  // Store jobId in patient_videos record
  db.prepare(
    "UPDATE patient_videos SET render_job_id = ? WHERE id = ?"
  ).run(jobId, videoRecordId.id);

  return NextResponse.json({
    videoRecordId: videoRecordId.id,
    jobId,
    statusUrl: `/api/patient-video/${jobId}`,
  });
}
