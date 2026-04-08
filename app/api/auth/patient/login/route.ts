/**
 * POST /api/auth/patient/login
 * Authenticates a patient with email + date_of_birth + access_code.
 */

import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db/patient-portal-schema";
import { signPatientToken, PATIENT_COOKIE_NAME } from "@/lib/auth/patient-auth";

export async function POST(request: NextRequest) {
  const { email, date_of_birth, access_code } = await request.json();

  if (!email || !date_of_birth || !access_code) {
    return NextResponse.json(
      { error: "Email, date of birth, and access code are required" },
      { status: 400 }
    );
  }

  const db = getDb();
  const patient = db
    .prepare(
      `SELECT p.id, p.first_name, p.last_name, p.email, p.video_url, p.video_title,
              p.treatment_type, p.consulting_provider, p.consultation_date,
              p.video_watched, p.survey_completed, p.clinic_id,
              c.clinic_name, c.clinic_address
       FROM patient_accounts p
       JOIN clinic_accounts c ON c.id = p.clinic_id
       WHERE p.email = ? AND p.date_of_birth = ? AND p.access_code = ?`
    )
    .get(email.toLowerCase(), date_of_birth, access_code) as
    | {
        id: string;
        first_name: string;
        last_name: string;
        email: string;
        video_url: string | null;
        video_title: string | null;
        treatment_type: string | null;
        consulting_provider: string | null;
        consultation_date: string | null;
        video_watched: number;
        survey_completed: number;
        clinic_id: string;
        clinic_name: string;
        clinic_address: string;
      }
    | undefined;

  if (!patient) {
    return NextResponse.json(
      { error: "We couldn't find your account. Please check your credentials or contact your dental office." },
      { status: 401 }
    );
  }

  const token = await signPatientToken({
    patientId: patient.id,
    clinicId: patient.clinic_id,
    firstName: patient.first_name,
    email: patient.email,
  });

  const response = NextResponse.json({
    success: true,
    patient: {
      firstName: patient.first_name,
      lastName: patient.last_name,
      videoUrl: patient.video_url,
      videoTitle: patient.video_title,
      treatmentType: patient.treatment_type,
      consultingProvider: patient.consulting_provider,
      consultationDate: patient.consultation_date,
      videoWatched: !!patient.video_watched,
      surveyCompleted: !!patient.survey_completed,
    },
    clinic: {
      name: patient.clinic_name,
      address: patient.clinic_address,
    },
  });

  response.cookies.set(PATIENT_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  });

  return response;
}
