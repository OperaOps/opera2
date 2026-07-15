/**
 * GET  /api/clinic/api-key — return the clinic's current API key (or null)
 * POST /api/clinic/api-key — generate/rotate the clinic's API key
 *
 * Dynamo clinic store first (real customers — the same key the Connect flow
 * issued, honored by the video API), SQLite fallback (demo account).
 */

import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { getDb } from "@/lib/db/patient-portal-schema";
import { verifyClinicToken } from "@/lib/auth/clinic-auth";
import { getClinic, rotateApiKey } from "@/lib/connect/clinic-store";

export async function GET(request: NextRequest) {
  const clinic = await verifyClinicToken(request);
  if (!clinic) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const account = await getClinic(clinic.clinicId);
    if (account) {
      return NextResponse.json({ apiKey: account.apiKey ?? null });
    }
  } catch (err) {
    console.error("[clinic-api-key] store lookup failed", err);
  }

  const db = getDb();
  const row = db
    .prepare("SELECT api_key FROM clinic_accounts WHERE id = ?")
    .get(clinic.clinicId) as { api_key: string | null } | undefined;

  return NextResponse.json({ apiKey: row?.api_key ?? null });
}

export async function POST(request: NextRequest) {
  const clinic = await verifyClinicToken(request);
  if (!clinic) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const rotated = await rotateApiKey(clinic.clinicId);
    if (rotated) {
      return NextResponse.json({ apiKey: rotated });
    }
  } catch (err) {
    console.error("[clinic-api-key] rotate failed", err);
  }

  const apiKey = `opk_live_${randomBytes(16).toString("hex")}`;

  const db = getDb();
  const result = db
    .prepare(
      "UPDATE clinic_accounts SET api_key = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?"
    )
    .run(apiKey, clinic.clinicId);

  if (result.changes === 0) {
    return NextResponse.json({ error: "Clinic not found" }, { status: 404 });
  }

  return NextResponse.json({ apiKey });
}
