/**
 * JWT helpers for clinic authentication.
 * Uses jose (already in project) with a separate cookie name from main app auth.
 */

import { SignJWT, jwtVerify, JWTPayload } from "jose";
import { NextRequest } from "next/server";

const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || "opera-ai-secret-key-change-in-prod"
);

const COOKIE_NAME = "opera-clinic-token";

export interface ClinicJwtPayload extends JWTPayload {
  clinicId: string;
  clinicName: string;
  email: string;
  /** Organization anchor (primary location's clinicId) — lets one login
   *  switch between a multi-location owner's clinics. Absent on old tokens;
   *  treat session.clinicId as the org in that case. */
  orgId?: string;
}

export async function signClinicToken(payload: {
  clinicId: string;
  clinicName: string;
  email: string;
  orgId?: string;
}): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET);
}

export async function verifyClinicToken(
  request: NextRequest
): Promise<ClinicJwtPayload | null> {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as ClinicJwtPayload;
  } catch {
    return null;
  }
}

export { COOKIE_NAME as CLINIC_COOKIE_NAME };
