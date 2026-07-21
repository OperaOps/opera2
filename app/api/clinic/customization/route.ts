/**
 * GET /api/clinic/customization — video branding defaults for this clinic
 * PUT /api/clinic/customization — save them
 *
 * These prefill the Generate Video form (doctor name, clinic name shown on
 * the video, logo) — always editable per video. Stored durably in Dynamo
 * (PREFS# item) so they work for every login, including the SQLite demo
 * account, and survive serverless deploys.
 */

import { NextRequest, NextResponse } from "next/server";
import { verifyClinicToken } from "@/lib/auth/clinic-auth";
import {
  getClinic,
  saveClinic,
  portalGetItem,
  portalPutItem,
} from "@/lib/connect/clinic-store";
import { getDb } from "@/lib/db/patient-portal-schema";

interface VideoPrefs {
  doctorName?: string;
  clinicDisplayName?: string;
  logoUrl?: string;
}

export async function GET(request: NextRequest) {
  const session = await verifyClinicToken(request);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let prefs: VideoPrefs = {};
  try {
    prefs = ((await portalGetItem(`PREFS#${session.clinicId}`)) as VideoPrefs | null) ?? {};
  } catch {
    /* defaults below */
  }

  // Fall back to the account's clinic name / logo when no explicit pref.
  let clinicName = session.clinicName;
  let logoUrl: string | null = null;
  try {
    const account = await getClinic(session.clinicId);
    if (account) {
      clinicName = account.clinicName;
      logoUrl = account.logoUrl ?? null;
    }
  } catch {
    /* session fallback */
  }

  return NextResponse.json({
    doctorName: prefs.doctorName ?? "",
    clinicDisplayName: prefs.clinicDisplayName ?? clinicName,
    logoUrl: prefs.logoUrl ?? logoUrl,
  });
}

export async function PUT(request: NextRequest) {
  const session = await verifyClinicToken(request);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const doctorName =
    typeof body.doctorName === "string" ? body.doctorName.trim().slice(0, 80) : undefined;
  const clinicDisplayName =
    typeof body.clinicDisplayName === "string"
      ? body.clinicDisplayName.trim().slice(0, 120)
      : undefined;
  const logoUrl = typeof body.logoUrl === "string" ? body.logoUrl.trim() : undefined;

  const existing =
    ((await portalGetItem(`PREFS#${session.clinicId}`).catch(() => null)) as VideoPrefs | null) ??
    {};
  const next: VideoPrefs = {
    ...existing,
    ...(doctorName !== undefined ? { doctorName } : {}),
    ...(clinicDisplayName !== undefined ? { clinicDisplayName } : {}),
    ...(logoUrl !== undefined ? { logoUrl } : {}),
  };
  await portalPutItem(`PREFS#${session.clinicId}`, next as Record<string, unknown>);

  // Mirror the logo onto the account so share pages / the portal pick it up.
  if (logoUrl !== undefined) {
    try {
      const account = await getClinic(session.clinicId);
      if (account) {
        account.logoUrl = logoUrl || null;
        await saveClinic(account);
      } else {
        getDb()
          .prepare("UPDATE clinic_accounts SET clinic_logo_url = ? WHERE id = ?")
          .run(logoUrl || null, session.clinicId);
      }
    } catch {
      /* prefs saved either way */
    }
  }

  return NextResponse.json({ success: true });
}
