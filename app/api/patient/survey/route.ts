/**
 * POST /api/patient/survey — submit survey response
 * GET  /api/patient/survey — get existing survey (if completed)
 */

import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db/patient-portal-schema";
import { verifyPatientToken } from "@/lib/auth/patient-auth";

export async function GET(request: NextRequest) {
  const patient = await verifyPatientToken(request);
  if (!patient) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = getDb();
  const survey = db
    .prepare("SELECT * FROM survey_responses WHERE patient_id = ?")
    .get(patient.patientId);

  return NextResponse.json({ survey: survey || null });
}

export async function POST(request: NextRequest) {
  const patient = await verifyPatientToken(request);
  if (!patient) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = getDb();

  // Check if already completed
  const existing = db
    .prepare("SELECT id FROM survey_responses WHERE patient_id = ?")
    .get(patient.patientId);

  if (existing) {
    return NextResponse.json(
      { error: "Survey already completed" },
      { status: 409 }
    );
  }

  const body = await request.json();

  // Validate required fields
  const {
    q_consultation_clarity,
    q_comfort_level,
    q_staff_friendliness,
    q_likelihood_to_proceed,
  } = body;

  if (
    !q_consultation_clarity ||
    !q_comfort_level ||
    !q_staff_friendliness ||
    !q_likelihood_to_proceed
  ) {
    return NextResponse.json(
      { error: "Required fields missing" },
      { status: 400 }
    );
  }

  db.prepare(
    `INSERT INTO survey_responses
     (patient_id, clinic_id,
      q_consultation_clarity, q_comfort_level, q_staff_friendliness,
      q_video_helpfulness, q_understanding_before, q_understanding_after,
      q_video_would_recommend, q_most_helpful_resource,
      q_likelihood_to_proceed, q_primary_concern, q_additional_feedback)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    patient.patientId,
    patient.clinicId,
    q_consultation_clarity,
    q_comfort_level,
    q_staff_friendliness,
    body.q_video_helpfulness || null,
    body.q_understanding_before || null,
    body.q_understanding_after || null,
    body.q_video_would_recommend != null ? (body.q_video_would_recommend ? 1 : 0) : null,
    body.q_most_helpful_resource || null,
    q_likelihood_to_proceed,
    body.q_primary_concern || null,
    body.q_additional_feedback || null
  );

  // Mark survey as completed on the patient record
  db.prepare(
    "UPDATE patient_accounts SET survey_completed = 1, survey_completed_at = CURRENT_TIMESTAMP WHERE id = ?"
  ).run(patient.patientId);

  return NextResponse.json({ success: true });
}
