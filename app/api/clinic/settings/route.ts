/**
 * GET   /api/clinic/settings — clinic profile + plan/billing state
 * PATCH /api/clinic/settings — update clinic_name / clinic_logo_url
 *
 * Dynamo clinic store first (real customers), SQLite fallback (demo account).
 */

import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db/patient-portal-schema";
import { verifyClinicToken } from "@/lib/auth/clinic-auth";
import { getClinic, saveClinic } from "@/lib/connect/clinic-store";

export async function GET(request: NextRequest) {
  const clinic = await verifyClinicToken(request);
  if (!clinic) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // --- Dynamo (real customers) ---------------------------------------------
  try {
    const account = await getClinic(clinic.clinicId);
    if (account) {
      return NextResponse.json({
        clinic: {
          clinic_name: account.clinicName,
          clinic_email: account.email,
          clinic_phone: account.phone ?? "",
          clinic_address: account.clinicAddress ?? "",
          clinic_logo_url: account.logoUrl ?? null,
          created_at: account.createdAt,
        },
        billing: {
          plan: account.plan,
          status: account.status,
          trialEndsAt: account.trialEndsAt,
          videosGenerated: account.videosGenerated ?? 0,
          hasSubscription: Boolean(account.stripeSubscriptionId),
        },
      });
    }
  } catch (err) {
    console.error("[clinic-settings] store lookup failed", err);
  }

  // --- SQLite (demo account) -------------------------------------------------
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

  return NextResponse.json({ clinic: row, billing: null });
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

  // --- Dynamo (real customers) ---------------------------------------------
  try {
    const account = await getClinic(clinic.clinicId);
    if (account) {
      if (clinicName !== undefined) account.clinicName = clinicName;
      if (logoUrl !== undefined) account.logoUrl = logoUrl || null;
      await saveClinic(account);
      return NextResponse.json({ success: true });
    }
  } catch (err) {
    console.error("[clinic-settings] store update failed", err);
  }

  // --- SQLite (demo account) -------------------------------------------------
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
