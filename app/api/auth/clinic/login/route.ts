/**
 * POST /api/auth/clinic/login
 * Authenticates a clinic against clinic_accounts table.
 */

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDb } from "@/lib/db/patient-portal-schema";
import { signClinicToken, CLINIC_COOKIE_NAME } from "@/lib/auth/clinic-auth";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password required" },
      { status: 400 }
    );
  }

  const db = getDb();
  const clinic = db
    .prepare(
      "SELECT id, clinic_name, clinic_address, clinic_email, password_hash FROM clinic_accounts WHERE clinic_email = ?"
    )
    .get(email.toLowerCase()) as
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
  });

  const response = NextResponse.json({
    success: true,
    clinic: {
      name: clinic.clinic_name,
      address: clinic.clinic_address,
      email: clinic.clinic_email,
    },
  });

  response.cookies.set(CLINIC_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
  });

  return response;
}
