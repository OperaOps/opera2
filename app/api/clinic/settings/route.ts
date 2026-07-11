/**
 * GET   /api/clinic/settings — return the clinic's editable profile fields
 * PATCH /api/clinic/settings — update clinic_name / clinic_logo_url
 */

import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db/patient-portal-schema";
import { verifyClinicToken } from "@/lib/auth/clinic-auth";

export async function GET(request: NextRequest) {
  const clinic = await verifyClinicToken(request);
  if (!clinic) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = getDb();
  const row = db
    .prepare(
      `SELECT clinic_name, clinic_email, clinic_phone, clinic_address,
              clinic_logo_url, created_at
       FROM clinic_accounts WHERE id = ?`
    )
    .get(clinic.clinicId);

  if (!row) {
    return NextResponse.json({ error: "Clinic not found" }, { status: 404 });
  }

  return NextResponse.json({ clinic: row });
}

export async function PATCH(request: NextRequest) {
  const clinic = await verifyClinicToken(request);
  if (!clinic) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const clinicName =
    typeof body.clinic_name === "string" ? body.clinic_name.trim() : undefined;
  const logoUrl =
    typeof body.clinic_logo_url === "string"
      ? body.clinic_logo_url.trim()
      : undefined;

  if (clinicName !== undefined && !clinicName) {
    return NextResponse.json(
      { error: "Clinic name cannot be empty" },
      { status: 400 }
    );
  }
  if (clinicName === undefined && logoUrl === undefined) {
    return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
  }

  const db = getDb();
  const sets: string[] = [];
  const params: (string | null)[] = [];
  if (clinicName !== undefined) {
    sets.push("clinic_name = ?");
    params.push(clinicName);
  }
  if (logoUrl !== undefined) {
    sets.push("clinic_logo_url = ?");
    params.push(logoUrl || null);
  }

  db.prepare(
    `UPDATE clinic_accounts SET ${sets.join(", ")}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`
  ).run(...params, clinic.clinicId);

  return NextResponse.json({ success: true });
}
