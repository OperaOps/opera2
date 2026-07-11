/**
 * GET /api/connect/admin — ops visibility: every clinic, status, usage.
 * Gated by the OPERA_MASTER_KEY (x-opera-key header or ?api_key=).
 * Raw API keys are redacted to their prefix.
 */

import { NextRequest, NextResponse } from "next/server";
import { listClinics } from "@/lib/connect/clinic-store";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const master = process.env.OPERA_MASTER_KEY?.trim();
  const key =
    request.headers.get("x-opera-key")?.trim() ||
    request.nextUrl.searchParams.get("api_key")?.trim() ||
    "";
  if (!master || key !== master) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const clinics = await listClinics();
  return NextResponse.json({
    count: clinics.length,
    clinics: clinics.map((c) => ({
      clinicId: c.clinicId,
      clinicName: c.clinicName,
      contactName: c.contactName,
      email: c.email,
      practiceType: c.practiceType,
      status: c.status,
      activationMethod: c.activationMethod,
      keyPrefix: c.keyPrefix,
      trialEndsAt: c.trialEndsAt,
      videosGenerated: c.videosGenerated ?? 0,
      lastUsedAt: c.lastUsedAt,
      createdAt: c.createdAt,
    })),
  });
}
