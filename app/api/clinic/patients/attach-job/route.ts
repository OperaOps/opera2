/**
 * POST /api/clinic/patients/attach-job
 * Called after a portal video generation kicks off. Upserts the patient in the
 * durable portal store and attaches the render job (share id) to them, so the
 * patient row keeps its video links and chat activity across deploys.
 */

import { NextRequest, NextResponse } from "next/server";
import { verifyClinicToken } from "@/lib/auth/clinic-auth";
import {
  attachJobToPatient,
  getPortalPatient,
  createPortalPatient,
} from "@/lib/portal/store";

export async function POST(request: NextRequest) {
  const clinic = await verifyClinicToken(request);
  if (!clinic) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: {
    patientId?: string;
    firstName?: string;
    lastName?: string;
    jobId?: string;
    treatmentType?: string;
    provider?: string;
    email?: string;
    phone?: string;
    notes?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  if ((!body.patientId && !body.firstName) || !body.jobId) {
    return NextResponse.json({ error: "patientId or firstName, plus jobId, required" }, { status: 400 });
  }

  try {
    // When the video was generated for a SPECIFIC selected patient, attach by
    // their stable id — never re-resolve by name (two real patients can share
    // a name). Only fall back to name-upsert for a genuinely new patient.
    if (body.patientId) {
      const p = await getPortalPatient(clinic.clinicId, body.patientId);
      if (p) {
        await attachJobToPatient(clinic.clinicId, p.patientId, body.jobId);
        return NextResponse.json({ ok: true, patientId: p.patientId });
      }
    }

    // No explicit patient selected → a typed new name makes a new record.
    const patient = await createPortalPatient(clinic.clinicId, {
      firstName: body.firstName ?? "",
      lastName: body.lastName ?? "",
      email: body.email,
      phone: body.phone,
      treatmentType: body.treatmentType,
      provider: body.provider,
      notes: body.notes,
    });
    await attachJobToPatient(clinic.clinicId, patient.patientId, body.jobId);
    return NextResponse.json({ ok: true, patientId: patient.patientId });
  } catch (err) {
    console.error("[attach-job] failed", err);
    return NextResponse.json({ error: "store_error" }, { status: 500 });
  }
}
