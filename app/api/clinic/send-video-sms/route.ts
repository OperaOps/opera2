/**
 * POST /api/clinic/send-video-sms { shareId, patientId?, phone? }
 * Texts a patient their personalized video link. Resolves the patient's phone
 * (from the record, or an explicitly provided number), builds a warm message
 * with the /v/<shareId> link, and sends via Twilio. If the clinic hasn't
 * configured SMS yet, returns configured:false so the UI can say so.
 */

import { NextRequest, NextResponse } from "next/server";
import { verifyClinicToken } from "@/lib/auth/clinic-auth";
import { getClinic } from "@/lib/connect/clinic-store";
import { getPortalPatient, savePortalPatient } from "@/lib/portal/store";
import { getShareContext } from "@/lib/patient-share";
import { sendSms, smsConfigured, toE164 } from "@/lib/sms/twilio";

export async function POST(request: NextRequest) {
  const session = await verifyClinicToken(request);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: { shareId?: string; patientId?: string; phone?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  const shareId = body.shareId?.trim();
  if (!shareId) return NextResponse.json({ error: "shareId required" }, { status: 400 });

  if (!smsConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        configured: false,
        error: "Texting isn't set up yet. Add your SMS number in settings or contact opera@getopera.ai.",
      },
      { status: 200 }
    );
  }

  // Resolve the recipient phone: explicit > patient record.
  let phone = body.phone?.trim() || "";
  let patient = body.patientId
    ? await getPortalPatient(session.clinicId, body.patientId).catch(() => null)
    : null;
  if (!phone && patient?.phone) phone = patient.phone;
  if (!phone) {
    return NextResponse.json(
      { ok: false, configured: true, error: "no_phone", message: "No phone number for this patient." },
      { status: 200 }
    );
  }
  if (!toE164(phone)) {
    return NextResponse.json(
      { ok: false, configured: true, error: "invalid_phone", message: "That phone number doesn't look right." },
      { status: 200 }
    );
  }

  // Build the message from the share context (tenant-checked).
  const ctx = await getShareContext(shareId).catch(() => null);
  if (!ctx || (ctx.clinicId && ctx.clinicId !== session.clinicId)) {
    return NextResponse.json({ error: "share_not_found" }, { status: 404 });
  }
  const clinicName = ctx.clinicName || session.clinicName;
  const first = ctx.patientFirstName || "there";
  const origin =
    process.env.OPERA_PUBLIC_ORIGIN?.trim().replace(/\/$/, "") || request.nextUrl.origin;
  const url = `${origin}/v/${shareId}`;
  const msg =
    ctx.stage === "pre"
      ? `Hi ${first}! ${clinicName} here — we made a quick welcome video for you before your visit: ${url}`
      : `Hi ${first}! ${clinicName} made a personalized video just for you: ${url}`;

  const result = await sendSms(phone, msg);
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, configured: result.configured, error: result.error || "send_failed" },
      { status: 200 }
    );
  }

  // Remember the number on the patient record for next time.
  if (patient && !patient.phone) {
    patient.phone = phone;
    await savePortalPatient(patient).catch(() => {});
  }

  return NextResponse.json({ ok: true, sid: result.sid, sentTo: phone });
}
