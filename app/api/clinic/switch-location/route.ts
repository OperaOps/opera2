/**
 * POST /api/clinic/switch-location { clinicId }
 * Re-issues the session cookie for another location in the same
 * organization. Every /api/clinic/* call and video job after this scopes to
 * the new location — each location stays a fully separate portal.
 */

import { NextRequest, NextResponse } from "next/server";
import {
  verifyClinicToken,
  signClinicToken,
  CLINIC_COOKIE_NAME,
} from "@/lib/auth/clinic-auth";
import { getClinic } from "@/lib/connect/clinic-store";

export async function POST(request: NextRequest) {
  const session = await verifyClinicToken(request);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: { clinicId?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  if (!body.clinicId) {
    return NextResponse.json({ error: "clinicId required" }, { status: 400 });
  }

  const orgId = session.orgId ?? session.clinicId;
  const target = await getClinic(body.clinicId);
  if (!target) return NextResponse.json({ error: "not_found" }, { status: 404 });

  const targetOrg =
    ((target as unknown as Record<string, unknown>).orgId as string) ?? target.clinicId;
  if (target.clinicId !== orgId && targetOrg !== orgId) {
    return NextResponse.json({ error: "not_in_organization" }, { status: 403 });
  }

  const token = await signClinicToken({
    clinicId: target.clinicId,
    clinicName: target.clinicName,
    email: session.email,
    orgId,
  });

  const response = NextResponse.json({
    success: true,
    clinicId: target.clinicId,
    clinicName: target.clinicName,
  });
  response.cookies.set(CLINIC_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
  });
  response.cookies.set("opera-clinic-name", target.clinicName, {
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
  });
  return response;
}
