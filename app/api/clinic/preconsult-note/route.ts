/**
 * POST /api/clinic/preconsult-note { note }
 * Clinics submit their welcome note; it lands as PENDING for Opera review
 * (admin console approves it, optionally edited) before appearing on
 * patient pages.
 */

import { NextRequest, NextResponse } from "next/server";
import { verifyClinicToken } from "@/lib/auth/clinic-auth";
import { getClinic, saveClinic } from "@/lib/connect/clinic-store";
import { getDb } from "@/lib/db/patient-portal-schema";

export async function POST(request: NextRequest) {
  const session = await verifyClinicToken(request);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let note: string | undefined;
  try {
    const body = await request.json();
    if (typeof body.note === "string") note = body.note.trim().slice(0, 400);
  } catch {
    /* handled below */
  }
  if (!note) return NextResponse.json({ error: "note required" }, { status: 400 });

  try {
    const account = await getClinic(session.clinicId);
    if (account) {
      const rec = account as unknown as Record<string, unknown>;
      rec.preconsultNotePending = note;
      await saveClinic(account);
      return NextResponse.json({ success: true, status: "pending_review" });
    }
  } catch (err) {
    console.error("[preconsult-note] store save failed", err);
  }

  try {
    getDb()
      .prepare("UPDATE clinic_accounts SET preconsult_note_pending = ? WHERE id = ?")
      .run(note, session.clinicId);
    return NextResponse.json({ success: true, status: "pending_review" });
  } catch {
    return NextResponse.json({ error: "store_error" }, { status: 500 });
  }
}
