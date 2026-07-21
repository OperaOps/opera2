/**
 * Admin: clinic roster + login creation.
 * GET  /api/admin/clinics — every clinic with usage + pending tour uploads
 * POST /api/admin/clinics — create an activated clinic login
 */

import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "../_lib/auth";
import {
  activateClinic,
  createClinic,
  findClinicByEmail,
  listClinics,
  saveClinic,
} from "@/lib/connect/clinic-store";

export async function GET(request: NextRequest) {
  if (!isAdmin(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const clinics = await listClinics();
  return NextResponse.json({
    clinics: clinics.map((c) => {
      const rec = c as unknown as Record<string, unknown>;
      return {
        clinicId: c.clinicId,
        clinicName: c.clinicName,
        contactName: c.contactName,
        email: c.email,
        status: c.status,
        plan: c.plan,
        videosGenerated: c.videosGenerated ?? 0,
        lastUsedAt: c.lastUsedAt ?? null,
        createdAt: c.createdAt,
        hasSubscription: Boolean(c.stripeSubscriptionId),
        preconsultVideoUrl: (rec.preconsultVideoUrl as string) ?? null,
        pendingTourUrl:
          (rec.preconsultUploadUrl as string) && !(rec.preconsultVideoUrl as string)
            ? (rec.preconsultUploadUrl as string)
            : null,
      };
    }),
  });
}

export async function POST(request: NextRequest) {
  if (!isAdmin(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: {
    clinicName?: string;
    contactName?: string;
    email?: string;
    password?: string;
    practiceType?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  if (!body.clinicName || !body.email || !body.password || body.password.length < 8) {
    return NextResponse.json(
      { error: "clinicName, email, and a password of 8+ characters are required" },
      { status: 400 }
    );
  }

  const existing = await findClinicByEmail(body.email);
  if (existing) {
    return NextResponse.json({ error: "email_exists" }, { status: 409 });
  }

  let clinic = await createClinic({
    clinicName: body.clinicName.trim(),
    contactName: body.contactName?.trim() || body.clinicName.trim(),
    email: body.email.trim().toLowerCase(),
    practiceType: body.practiceType || "dental",
    activationMethod: "activation_code",
    passwordHash: bcrypt.hashSync(body.password, 10),
  });
  clinic = await activateClinic(clinic, { status: "active", trialEndsAt: null });
  const rec = clinic as unknown as Record<string, unknown>;
  rec.specialties = ["dental", "orthodontic"];
  await saveClinic(clinic);

  return NextResponse.json({
    clinicId: clinic.clinicId,
    email: clinic.email,
    apiKey: clinic.apiKey,
  });
}
