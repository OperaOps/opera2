/**
 * POST /api/clinic/preconsult
 * Creates a pre-consult welcome share for a patient using the clinic's own
 * tour video. No rendering — the link is live instantly.
 */

import crypto from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { verifyClinicToken } from "@/lib/auth/clinic-auth";
import { getClinic } from "@/lib/connect/clinic-store";
import { getDb } from "@/lib/db/patient-portal-schema";
import {
  attachJobToPatient,
  savePreconsultShare,
  upsertPatientByName,
} from "@/lib/portal/store";

/** Used when a clinic hasn't uploaded its own tour yet. Swap when the
 *  generated welcome visuals land (see settings copy). */
const DEFAULT_PRECONSULT_VIDEO = "/videos/sitepics/veo-05.mp4";

/** Every welcome page carries a note. This is the house default until the
 *  clinic writes (and we approve) their own. */
const DEFAULT_PRECONSULT_NOTE =
  "Our whole team is looking forward to meeting you. Come exactly as you are, ask us anything, and we'll take great care of you.";

export async function POST(request: NextRequest) {
  const session = await verifyClinicToken(request);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: {
    firstName?: string;
    lastName?: string;
    provider?: string;
    appointmentType?: string;
    appointmentDate?: string;
    personalNote?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  if (!body.firstName?.trim()) {
    return NextResponse.json({ error: "firstName required" }, { status: 400 });
  }

  // clinic tour video: Dynamo account first, SQLite fallback
  let videoUrl: string | null = null;
  let audioBaked = false;
  let clinicName = session.clinicName;
  let logoUrl: string | null = null;
  let clinicNote: string | null = null;
  try {
    const account = await getClinic(session.clinicId);
    if (account) {
      const rec = account as unknown as Record<string, unknown>;
      videoUrl = (rec.preconsultVideoUrl as string) ?? null;
      audioBaked = Boolean(rec.preconsultAudioBaked);
      clinicName = account.clinicName;
      logoUrl = account.logoUrl ?? null;
      clinicNote = (rec.preconsultNote as string) ?? null;
    }
  } catch {
    /* fall through */
  }
  if (!videoUrl) {
    try {
      const row = getDb()
        .prepare(
          "SELECT clinic_name, clinic_logo_url, preconsult_video_url FROM clinic_accounts WHERE id = ?"
        )
        .get(session.clinicId) as
        | { clinic_name: string; clinic_logo_url: string | null; preconsult_video_url: string | null }
        | undefined;
      if (row?.preconsult_video_url) {
        videoUrl = row.preconsult_video_url;
        audioBaked = videoUrl.startsWith("/videos/"); // bundled assets have the music baked in
        clinicName = row.clinic_name;
        logoUrl = row.clinic_logo_url;
      }
      const noteRow = getDb()
        .prepare("SELECT preconsult_note FROM clinic_accounts WHERE id = ?")
        .get(session.clinicId) as { preconsult_note: string | null } | undefined;
      if (noteRow?.preconsult_note && !clinicNote) clinicNote = noteRow.preconsult_note;
    } catch {
      /* sqlite unavailable */
    }
  }

  if (!videoUrl) {
    videoUrl = DEFAULT_PRECONSULT_VIDEO;
    audioBaked = false;
  }

  // Kick off the rendered welcome video — a ~25s "Hi {name}" with warm
  // voiceover over the tour footage, via the flagship pipeline. The share
  // link is live instantly with the raw tour; the page upgrades itself to
  // the rendered video once the job completes.
  let renderJobId: string | undefined;
  try {
    const origin =
      process.env.OPERA_PUBLIC_ORIGIN?.trim().replace(/\/$/, "") ||
      request.nextUrl.origin;
    const tourVideoUrl = videoUrl.startsWith("http") ? videoUrl : `${origin}${videoUrl}`;
    if (tourVideoUrl.startsWith("https://")) {
      const upstream =
        process.env.OPERA_RENDER_UPSTREAM?.trim().replace(/\/$/, "") || origin;
      const res = await fetch(`${upstream}/api/patient-video/preconsult`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-opera-clinic-id": session.clinicId,
        },
        body: JSON.stringify({
          patientName: [body.firstName.trim(), body.lastName?.trim()].filter(Boolean).join(" "),
          doctorName: body.provider?.trim() || "",
          clinicName,
          tourVideoUrl,
          appointmentType: body.appointmentType?.trim() || "consultation",
          appointmentDate: body.appointmentDate?.trim() || undefined,
        }),
        signal: AbortSignal.timeout(15_000),
      });
      const data = (await res.json().catch(() => null)) as { jobId?: string } | null;
      if (res.ok && data?.jobId) renderJobId = data.jobId;
      else console.error("[preconsult] render kickoff rejected", res.status, data);
    }
  } catch (err) {
    console.error("[preconsult] render kickoff failed", err);
  }

  const shareId = "pre-" + crypto.randomBytes(10).toString("hex");
  await savePreconsultShare({
    shareId,
    stage: "pre",
    clinicId: session.clinicId,
    clinicName,
    provider: body.provider?.trim() || undefined,
    patientFirstName: body.firstName.trim(),
    patientLastName: body.lastName?.trim() || undefined,
    appointmentType: body.appointmentType?.trim() || "consultation",
    appointmentDate: body.appointmentDate?.trim() || undefined,
    personalNote: body.personalNote?.trim() || clinicNote || DEFAULT_PRECONSULT_NOTE,
    videoUrl,
    audioBaked,
    logoUrl,
    createdAt: new Date().toISOString(),
    renderJobId,
  });

  // keep the patient record durable + linked
  try {
    const patient = await upsertPatientByName(session.clinicId, {
      firstName: body.firstName.trim(),
      lastName: body.lastName?.trim() ?? "",
      provider: body.provider?.trim(),
      treatmentType: "pre_consult",
    });
    await attachJobToPatient(session.clinicId, patient.patientId, shareId);
  } catch (err) {
    console.error("[preconsult] patient attach failed", err);
  }

  return NextResponse.json({ shareId, url: `/v/${shareId}` });
}
