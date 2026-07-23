/**
 * GET /api/clinic/locations — every location in the signed-in owner's
 * organization. Each location is a full standalone clinic (own patients,
 * videos, branding); this just lists them for the switcher.
 */

import { NextRequest, NextResponse } from "next/server";
import { verifyClinicToken } from "@/lib/auth/clinic-auth";
import { listClinics } from "@/lib/connect/clinic-store";

export async function GET(request: NextRequest) {
  const session = await verifyClinicToken(request);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const orgId = session.orgId ?? session.clinicId;

  let locations: {
    clinicId: string;
    clinicName: string;
    address: string;
    status: string;
    active: boolean;
  }[] = [];
  try {
    const clinics = await listClinics();
    locations = clinics
      .filter((c) => {
        const rec = c as unknown as Record<string, unknown>;
        return c.clinicId === orgId || rec.orgId === orgId;
      })
      .map((c) => ({
        clinicId: c.clinicId,
        clinicName: c.clinicName,
        address: c.clinicAddress ?? "",
        status: c.status,
        active: c.clinicId === session.clinicId,
      }))
      .sort((a, b) => Number(b.clinicId === orgId) - Number(a.clinicId === orgId));
  } catch {
    /* single-location fallback below */
  }

  // SQLite demo accounts (and any store hiccup): the active location only.
  if (locations.length === 0) {
    locations = [
      {
        clinicId: session.clinicId,
        clinicName: session.clinicName,
        address: "",
        status: "active",
        active: true,
      },
    ];
  }

  return NextResponse.json({
    email: session.email,
    activeClinicId: session.clinicId,
    locations,
  });
}
