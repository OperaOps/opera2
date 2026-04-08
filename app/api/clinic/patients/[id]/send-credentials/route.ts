/**
 * POST /api/clinic/patients/[id]/send-credentials
 *
 * Constructs a credential message for the patient. Since no email/SMS
 * service exists in the codebase, this returns the formatted message
 * text for the staff to copy and send manually (V1 approach).
 */

import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db/patient-portal-schema";
import { verifyClinicToken } from "@/lib/auth/clinic-auth";

type Params = { params: Promise<{ id: string }> };

export async function POST(request: NextRequest, { params }: Params) {
  const clinic = await verifyClinicToken(request);
  if (!clinic) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { method } = await request.json();

  const db = getDb();
  const patient = db
    .prepare(
      "SELECT first_name, email, date_of_birth, access_code FROM patient_accounts WHERE id = ? AND clinic_id = ?"
    )
    .get(id, clinic.clinicId) as
    | { first_name: string; email: string; date_of_birth: string; access_code: string }
    | undefined;

  if (!patient) {
    return NextResponse.json({ error: "Patient not found" }, { status: 404 });
  }

  const portalUrl = "/patient/login";

  if (method === "email") {
    const subject = `Your Treatment Video from ${clinic.clinicName}`;
    const body = `Hi ${patient.first_name},

Thank you for visiting ${clinic.clinicName}! We've prepared a personalized video about your treatment plan.

To view your video, visit our patient portal:
${portalUrl}

Log in with:
- Email: ${patient.email}
- Date of Birth: ${patient.date_of_birth}
- Access Code: ${patient.access_code}

If you have any questions, please don't hesitate to reach out to our office.

Best regards,
${clinic.clinicName}`;

    return NextResponse.json({ subject, body, method: "email" });
  }

  if (method === "sms") {
    const message = `Hi ${patient.first_name}! ${clinic.clinicName} has a personalized treatment video for you. Visit ${portalUrl} and log in with your email, date of birth, and access code: ${patient.access_code}`;
    return NextResponse.json({ message, method: "sms" });
  }

  return NextResponse.json({ error: "Invalid method" }, { status: 400 });
}
