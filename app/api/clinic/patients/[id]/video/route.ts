/**
 * POST /api/clinic/patients/[id]/video — assign/reassign video to patient
 */

import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db/patient-portal-schema";
import { verifyClinicToken } from "@/lib/auth/clinic-auth";

type Params = { params: Promise<{ id: string }> };

export async function POST(request: NextRequest, { params }: Params) {
  const clinic = await verifyClinicToken(request);
  if (!clinic) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { video_url, video_title } = await request.json();

  if (!video_url) {
    return NextResponse.json({ error: "video_url is required" }, { status: 400 });
  }

  const db = getDb();
  const result = db
    .prepare(
      `UPDATE patient_accounts
       SET video_url = ?, video_title = ?, video_watched = 0, video_watched_at = NULL, video_watch_duration_seconds = 0
       WHERE id = ? AND clinic_id = ?`
    )
    .run(video_url, video_title || null, id, clinic.clinicId);

  if (result.changes === 0) {
    return NextResponse.json({ error: "Patient not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
