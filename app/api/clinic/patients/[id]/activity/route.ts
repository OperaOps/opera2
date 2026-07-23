/**
 * GET /api/clinic/patients/[id]/activity
 * Everything a patient did with their share link(s): assistant questions with
 * timestamps, when the session went quiet, plus the permanent video links.
 * Works for both durable portal patients (Dynamo) and SQLite/demo patients.
 */

import { NextRequest, NextResponse } from "next/server";
import { verifyClinicToken } from "@/lib/auth/clinic-auth";
import { getDb } from "@/lib/db/patient-portal-schema";
import { getChatLogs, getPortalPatient } from "@/lib/portal/store";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const clinic = await verifyClinicToken(request);
  if (!clinic) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // A patient's videos come ONLY from videos explicitly generated for them
  // (their video_jobs), never from fuzzy name matching against clinic history —
  // otherwise a brand-new patient inherits a same/similar-named person's videos
  // (e.g. "Ram D" would match an old "Ram Dosibhatla" job by prefix).
  const shareIds = new Set<string>();

  // durable portal patient
  try {
    const p = await getPortalPatient(clinic.clinicId, params.id);
    if (p) p.videoJobs.forEach((j) => shareIds.add(j));
  } catch {
    /* not a portal patient id */
  }

  // SQLite patient (demo/local): per-video share ids linked to THIS patient id
  try {
    const db = getDb();
    const row = db
      .prepare("SELECT id FROM patient_accounts WHERE id = ? AND clinic_id = ?")
      .get(params.id, clinic.clinicId) as { id: string } | undefined;
    if (row) {
      const vids = db
        .prepare("SELECT id FROM patient_videos WHERE patient_id = ?")
        .all(params.id) as { id: string }[];
      vids.forEach((v) => shareIds.add(v.id));
    }
  } catch {
    /* sqlite unavailable */
  }

  const logs = await getChatLogs(Array.from(shareIds)).catch(() => []);
  const events = logs
    .flatMap((l) =>
      l.events.map((e) => ({ ...e, shareId: l.shareId }))
    )
    .sort((a, b) => (a.ts < b.ts ? 1 : -1));

  const lastActiveAt = logs.length
    ? logs.map((l) => l.lastActiveAt).sort().reverse()[0]
    : null;

  return NextResponse.json({
    shareIds: Array.from(shareIds),
    questionCount: logs.reduce((n, l) => n + l.questionCount, 0),
    lastActiveAt,
    events: events.slice(0, 40),
  });
}
