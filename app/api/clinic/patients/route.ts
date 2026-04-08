/**
 * GET  /api/clinic/patients — list all patients for authenticated clinic
 * POST /api/clinic/patients — create a new patient account
 */

import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db/patient-portal-schema";
import { verifyClinicToken } from "@/lib/auth/clinic-auth";

function generateAccessCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function GET(request: NextRequest) {
  const clinic = await verifyClinicToken(request);
  if (!clinic) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = parseInt(url.searchParams.get("limit") || "50");
  const offset = (page - 1) * limit;
  const search = url.searchParams.get("search")?.trim();

  const db = getDb();

  // PORTAL-INTEGRATION: Added search param for pipeline typeahead
  const whereClause = search
    ? "WHERE clinic_id = ? AND (first_name LIKE ? OR last_name LIKE ? OR email LIKE ?)"
    : "WHERE clinic_id = ?";
  const searchParam = search ? `%${search}%` : null;
  const queryParams = search
    ? [clinic.clinicId, searchParam, searchParam, searchParam, limit, offset]
    : [clinic.clinicId, limit, offset];

  const patients = db
    .prepare(
      `SELECT id, first_name, last_name, email, date_of_birth, phone,
              treatment_type, consulting_provider, consultation_date,
              video_url, video_title, video_watched, video_watched_at,
              survey_completed, survey_completed_at, created_at
       FROM patient_accounts
       ${whereClause}
       ORDER BY created_at DESC
       LIMIT ? OFFSET ?`
    )
    .all(...queryParams);

  const countParams = search
    ? [clinic.clinicId, searchParam, searchParam, searchParam]
    : [clinic.clinicId];
  const total = db
    .prepare(`SELECT COUNT(*) as count FROM patient_accounts ${whereClause}`)
    .get(...countParams) as { count: number };

  return NextResponse.json({
    patients,
    pagination: {
      page,
      limit,
      total: total.count,
      totalPages: Math.ceil(total.count / limit),
    },
  });
}

export async function POST(request: NextRequest) {
  const clinic = await verifyClinicToken(request);
  if (!clinic) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const {
    first_name,
    last_name,
    email,
    date_of_birth,
    phone,
    treatment_type,
    consulting_provider,
    consultation_date,
    video_url,
    video_title,
  } = body;

  if (!first_name || !last_name || !email || !date_of_birth) {
    return NextResponse.json(
      { error: "First name, last name, email, and date of birth are required" },
      { status: 400 }
    );
  }

  const accessCode = generateAccessCode();
  const db = getDb();

  try {
    const result = db
      .prepare(
        `INSERT INTO patient_accounts
         (clinic_id, first_name, last_name, email, date_of_birth, phone,
          access_code, treatment_type, consulting_provider, consultation_date,
          video_url, video_title)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .run(
        clinic.clinicId,
        first_name,
        last_name,
        email.toLowerCase(),
        date_of_birth,
        phone || null,
        accessCode,
        treatment_type || null,
        consulting_provider || null,
        consultation_date || null,
        video_url || null,
        video_title || null
      );

    const patient = db
      .prepare("SELECT id, first_name, last_name, email FROM patient_accounts WHERE rowid = ?")
      .get(result.lastInsertRowid);

    return NextResponse.json({
      success: true,
      patient,
      accessCode,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    if (message.includes("UNIQUE constraint")) {
      return NextResponse.json(
        { error: "A patient with this email already exists for your clinic" },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: "Failed to create patient" }, { status: 500 });
  }
}
