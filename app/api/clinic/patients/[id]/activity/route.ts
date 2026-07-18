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
import {
  dynamoListJobs,
  isDynamoJobStoreEnabled,
} from "@/app/api/patient-video/_lib/job-store-dynamo";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const clinic = await verifyClinicToken(request);
  if (!clinic) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const shareIds = new Set<string>();
  let patientName: string | null = null;

  // durable portal patient
  try {
    const p = await getPortalPatient(clinic.clinicId, params.id);
    if (p) {
      patientName = `${p.firstName} ${p.lastName}`.trim();
      p.videoJobs.forEach((j) => shareIds.add(j));
    }
  } catch {
    /* not a portal patient id */
  }

  // SQLite patient (demo/local): per-video share ids
  try {
    const db = getDb();
    const row = db
      .prepare(
        "SELECT first_name, last_name FROM patient_accounts WHERE id = ? AND clinic_id = ?"
      )
      .get(params.id, clinic.clinicId) as
      | { first_name: string; last_name: string }
      | undefined;
    if (row) {
      patientName = patientName ?? `${row.first_name} ${row.last_name}`.trim();
      const vids = db
        .prepare("SELECT id FROM patient_videos WHERE patient_id = ?")
        .all(params.id) as { id: string }[];
      vids.forEach((v) => shareIds.add(v.id));
    }
  } catch {
    /* sqlite unavailable */
  }

  // pipeline jobs that match this patient's name (covers Generate-page videos)
  if (patientName && isDynamoJobStoreEnabled()) {
    try {
      const jobs = await dynamoListJobs(200);
      const target = patientName.toLowerCase();
      for (const job of jobs) {
        const jp = (job.input?.patientName ?? "").toLowerCase();
        if (job.clinicId && job.clinicId !== clinic.clinicId) continue;
        if (jp && (jp === target || target.startsWith(jp) || jp.startsWith(target))) {
          shareIds.add(job.jobId);
        }
      }
    } catch {
      /* job store unreachable */
    }
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
