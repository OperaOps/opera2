/**
 * GET  /api/clinic/api-key — return the clinic's current API key (or null)
 * POST /api/clinic/api-key — generate/rotate the clinic's API key
 */

import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { getDb } from "@/lib/db/patient-portal-schema";
import { verifyClinicToken } from "@/lib/auth/clinic-auth";

export async function GET(request: NextRequest) {
  const clinic = await verifyClinicToken(request);
  if (!clinic) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
