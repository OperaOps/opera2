/**
 * Admin: approve a clinic's pending welcome note (optionally edited).
 */

import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "../_lib/auth";
import { getClinic, saveClinic } from "@/lib/connect/clinic-store";

export async function POST(request: NextRequest) {
  if (!isAdmin(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: { clinicId?: string; note?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  if (!body.clinicId) return NextResponse.json({ error: "clinicId required" }, { status: 400 });

  const clinic = await getClinic(body.clinicId);
  if (!clinic) return NextResponse.json({ error: "not_found" }, { status: 404 });

  const rec = clinic as unknown as Record<string, unknown>;
  const note = body.note?.trim() || (rec.preconsultNotePending as string);
  if (!note) return NextResponse.json({ error: "nothing_to_approve" }, { status: 409 });

  rec.preconsultNote = note;
  rec.preconsultNotePending = null;
  await saveClinic(clinic);
  return NextResponse.json({ success: true, note });
}
