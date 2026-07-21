/**
 * Admin: clinic roster + login creation.
 * GET  /api/admin/clinics — every clinic with usage + pending tour uploads
 * POST /api/admin/clinics — create an activated clinic login
 */

import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "../_lib/auth";
import { getDb } from "@/lib/db/patient-portal-schema";
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

  // Local/demo accounts live in SQLite — surface them too.
  const sqliteRows: Record<string, unknown>[] = [];
  try {
    const db = getDb();
    const rows = db
      .prepare(
        `SELECT id, clinic_name, clinic_email, created_at, preconsult_video_url,
                preconsult_upload_url, preconsult_note, preconsult_note_pending
         FROM clinic_accounts`
      )
      .all() as Record<string, unknown>[];
    const known = new Set(clinics.map((c) => c.email.toLowerCase()));
    for (const r of rows) {
      const email = String(r.clinic_email ?? "").toLowerCase();
      if (known.has(email)) continue;
      let videos = 0;
      let lastUsed: string | null = null;
      try {
        const v = db
          .prepare(
            "SELECT COUNT(*) as n, MAX(created_at) as last FROM patient_videos WHERE clinic_id = ?"
          )
          .get(r.id) as { n: number; last: string | null };
        videos = v.n;
        lastUsed = v.last;
      } catch {
        /* counts stay zero */
      }
      sqliteRows.push({
        clinicId: r.id,
        clinicName: r.clinic_name,
        contactName: "Demo account",
        email: r.clinic_email,
        status: "demo",
        plan: "demo",
        videosGenerated: videos,
        lastUsedAt: lastUsed,
        createdAt: r.created_at,
        hasSubscription: false,
        preconsultVideoUrl: r.preconsult_video_url ?? null,
        pendingTourUrl:
          r.preconsult_upload_url && !r.preconsult_video_url ? r.preconsult_upload_url : null,
        liveNote: r.preconsult_note ?? null,
        pendingNote: r.preconsult_note_pending ?? null,
        local: true,
      });
    }
  } catch (err) {
    console.error("[admin] sqlite roster read failed", err);
  }

  return NextResponse.json({
    clinics: [...sqliteRows, ...clinics.map((c) => {
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
        liveNote: (rec.preconsultNote as string) ?? null,
        pendingNote: (rec.preconsultNotePending as string) ?? null,
        local: false,
      };
    })],
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
