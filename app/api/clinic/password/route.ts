/**
 * GET /api/clinic/password — the signed-in clinic's own login password,
 * for the Profile page's eye-toggle reveal. Stored encrypted at login
 * (PWD# item); 404 until their first sign-in after this feature shipped.
 */

import { NextRequest, NextResponse } from "next/server";
import { verifyClinicToken } from "@/lib/auth/clinic-auth";
import { portalGetItem } from "@/lib/connect/clinic-store";
import { decryptPassword } from "@/lib/auth/password-vault";

export async function GET(request: NextRequest) {
  const session = await verifyClinicToken(request);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Multi-location sessions share one login — the vault lives under the org
  // anchor so every location resolves the same password.
  const item = await portalGetItem(`PWD#${session.orgId ?? session.clinicId}`).catch(() => null);
  const vault = (item as { vault?: string } | null)?.vault;
  const password = vault ? decryptPassword(vault) : null;
  if (!password) return NextResponse.json({ error: "not_stored" }, { status: 404 });

  return NextResponse.json({ password });
}
