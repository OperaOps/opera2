/**
 * POST /api/auth/clinic/login
 *
 * Authenticates a clinic portal login. Order of resolution:
 *   1. Dynamo clinic store (real customers — created by /connect signup,
 *      EMAIL# pointer → ClinicAccount.passwordHash).
 *   2. SQLite clinic_accounts (the seeded demo account; ephemeral on Netlify).
 *
 * On success the JWT clinicId is the Dynamo clinicId for real customers, so
 * every /api/clinic/* route and video job scoping keys off the same identity
 * that billing and API keys already use.
 */

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDb } from "@/lib/db/patient-portal-schema";
import { findClinicByEmail } from "@/lib/connect/clinic-store";
import { signClinicToken, CLINIC_COOKIE_NAME } from "@/lib/auth/clinic-auth";

function loginResponse(clinic: { id: string; name: string; email: string; address?: string }, token: string) {
  const response = NextResponse.json({
    success: true,
    clinic: { name: clinic.name, address: clinic.address ?? "", email: clinic.email },
  });
  response.cookies.set(CLINIC_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
  });
  // Non-httpOnly so the dashboard shell can greet by name without a fetch.
  response.cookies.set("opera-clinic-name", clinic.name, {
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
  });
  return response;
}

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password required" },
      { status: 400 }
    );
  }

  const normalized = String(email).trim().toLowerCase();

  // --- 1. Real customers: Dynamo clinic store ------------------------------
  try {
    const account = await findClinicByEmail(normalized);
    if (account?.passwordHash) {
      if (!bcrypt.compareSync(password, account.passwordHash)) {
        return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
      }
      if (account.status === "canceled") {
        return NextResponse.json(
          { error: "This subscription was canceled. Email opera@getopera.ai to reactivate." },
          { status: 402 }
        );
      }
      const token = await signClinicToken({
        clinicId: account.clinicId,
        clinicName: account.clinicName,
        email: account.email,
        orgId:
          ((account as unknown as Record<string, unknown>).orgId as string) ??
          account.clinicId,
      });
      return loginResponse(
        { id: account.clinicId, name: account.clinicName, email: account.email },
        token
      );
    }
  } catch (err) {
    console.error("[clinic-login] store lookup failed", err);
  }

  // --- 2. Demo/seed account: SQLite ----------------------------------------
  const db = getDb();
  const clinic = db
    .prepare(
      "SELECT id, clinic_name, clinic_address, clinic_email, password_hash FROM clinic_accounts WHERE clinic_email = ?"
    )
    .get(normalized) as
    | {
        id: string;
        clinic_name: string;
        clinic_address: string;
        clinic_email: string;
        password_hash: string;
      }
    | undefined;

  if (!clinic || !bcrypt.compareSync(password, clinic.password_hash)) {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  }

  const token = await signClinicToken({
    clinicId: clinic.id,
    clinicName: clinic.clinic_name,
    email: clinic.clinic_email,
    orgId: clinic.id,
  });

  return loginResponse(
    {
      id: clinic.id,
      name: clinic.clinic_name,
      email: clinic.clinic_email,
      address: clinic.clinic_address,
    },
    token
  );
}
