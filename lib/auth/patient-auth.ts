/**
 * JWT helpers for patient authentication.
 * Patients auth with email + DOB + 6-digit access code.
 * Sessions expire after 30 days.
 */

import { SignJWT, jwtVerify, JWTPayload } from "jose";
import { NextRequest } from "next/server";

const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || "opera-ai-secret-key-change-in-prod"
);

const COOKIE_NAME = "opera-patient-token";

export interface PatientJwtPayload extends JWTPayload {
  patientId: string;
  clinicId: string;
  firstName: string;
  email: string;
}

export async function signPatientToken(payload: {
  patientId: string;
  clinicId: string;
  firstName: string;
  email: string;
}): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(JWT_SECRET);
}

export async function verifyPatientToken(
  request: NextRequest
): Promise<PatientJwtPayload | null> {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as PatientJwtPayload;
  } catch {
    return null;
  }
}

export { COOKIE_NAME as PATIENT_COOKIE_NAME };
