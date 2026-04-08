/**
 * POST /api/patient/video/watched — marks video as watched with timestamp/duration
 */

import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db/patient-portal-schema";
import { verifyPatientToken } from "@/lib/auth/patient-auth";

export async function POST(request: NextRequest) {
  const patient = await verifyPatientToken(request);
  if (!patient) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { duration_seconds } = await request.json();

  const db = getDb();
  db.prepare(
    `UPDATE patient_accounts
     SET video_watched = 1,
         video_watched_at = CURRENT_TIMESTAMP,
         video_watch_duration_seconds = ?
     WHERE id = ?`
  ).run(duration_seconds || 0, patient.patientId);

  return NextResponse.json({ success: true });
}
