/**
 * GET  /api/clinic/patients — list all patients for authenticated clinic
 * POST /api/clinic/patients — create a new patient account
 */

import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db/patient-portal-schema";
import { verifyClinicToken } from "@/lib/auth/clinic-auth";
import { listPortalPatients, upsertPatientByName } from "@/lib/portal/store";
import {
  dynamoListJobs,
  dynamoListJobsByClinic,
  isDynamoJobStoreEnabled,
} from "@/app/api/patient-video/_lib/job-store-dynamo";

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

  // Merge in patients who exist only as Generate Video pipeline jobs, so the
  // list reflects everything the clinic has actually generated.
  let merged = patients as Record<string, unknown>[];
  let mergedTotal = total.count;
  // Durable portal patients (production store) — merge ahead of job stubs.
  try {
    const durable = await listPortalPatients(clinic.clinicId);
    const knownNames = new Set(
      merged.map((p) =>
        `${String(p.first_name ?? "").toLowerCase()} ${String(p.last_name ?? "").toLowerCase()}`.trim()
      )
    );
    for (const dp of durable) {
      const nameKey = `${dp.firstName.toLowerCase()} ${dp.lastName.toLowerCase()}`.trim();
      if (knownNames.has(nameKey)) continue;
      knownNames.add(nameKey);
      merged.push({
        id: dp.patientId,
        first_name: dp.firstName,
        last_name: dp.lastName,
        email: dp.email ?? null,
        date_of_birth: dp.dateOfBirth ?? null,
        phone: dp.phone ?? null,
        treatment_type: dp.treatmentType ?? null,
        consulting_provider: dp.provider ?? null,
        consultation_date: null,
        video_url: null,
        video_title: null,
        video_watched: 0,
        video_watched_at: null,
        survey_completed: 0,
        survey_completed_at: null,
        created_at: dp.createdAt,
        durable: 1,
        video_jobs: dp.videoJobs,
      });
      mergedTotal++;
    }
  } catch (err) {
    console.error("[clinic/patients] durable store read failed", err);
  }

  const isDemoClinic = clinic.email === "demo@getopera.ai";
  if (isDynamoJobStoreEnabled()) {
    try {
      const jobs = isDemoClinic
        ? await dynamoListJobs(200)
        : await dynamoListJobsByClinic(clinic.clinicId, 200);
      const known = new Set(
        merged.map((p) =>
          `${String(p.first_name || "").toLowerCase()} ${String(p.last_name || "").toLowerCase()}`.trim()
        )
      );
      const byPatient = new Map<string, (typeof jobs)[number]>();
      for (const job of jobs) {
        // Tenant scoping: only this clinic's jobs (demo account keeps legacy unscoped ones).
        if (job.clinicId ? job.clinicId !== clinic.clinicId : !isDemoClinic) continue;
        const name = String(job.input?.patientName || "").trim();
        if (!name) continue;
        if (search && !name.toLowerCase().includes(search.toLowerCase())) continue;
        if (!byPatient.has(name.toLowerCase())) byPatient.set(name.toLowerCase(), job);
      }
      for (const [nameKey, job] of byPatient) {
        if (known.has(nameKey)) continue;
        const [first, ...rest] = String(job.input.patientName).trim().split(/\s+/);
        merged.push({
          id: job.jobId,
          first_name: first,
          last_name: rest.join(" ") || null,
          email: null,
          date_of_birth: null,
          phone: null,
          treatment_type: job.input.treatment || "treatment",
          consulting_provider: job.input.doctorName || null,
          consultation_date: null,
          video_url: job.videoUrl,
          video_title: null,
          video_watched: 0,
          video_watched_at: null,
          survey_completed: 0,
          survey_completed_at: null,
          created_at: new Date(job.createdAt).toISOString(),
        });
        mergedTotal++;
      }
      merged.sort(
        (a, b) =>
          new Date(String(b.created_at)).getTime() - new Date(String(a.created_at)).getTime()
      );
    } catch (err) {
      console.error("[clinic/patients] job store read failed", err);
    }
  }

  return NextResponse.json({
    patients: merged,
    pagination: {
      page,
      limit,
      total: mergedTotal,
      totalPages: Math.ceil(mergedTotal / limit),
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

    // Mirror into the durable portal store so real clinics keep patients
    // across serverless deploys (SQLite is ephemeral in production).
    upsertPatientByName(clinic.clinicId, {
      firstName: String(first_name),
      lastName: String(last_name),
      email: email ? String(email) : undefined,
      phone: phone ? String(phone) : undefined,
      treatmentType: treatment_type ? String(treatment_type) : undefined,
      provider: consulting_provider ? String(consulting_provider) : undefined,
    }).catch((err) => console.error("[patients] durable mirror failed", err));

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
