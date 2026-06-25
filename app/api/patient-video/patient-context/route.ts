/**
 * GET /api/patient-video/patient-context?patient_name=...&xid=...
 *
 * Returns the patient's chart notes so the embed can prefill its fields:
 *   notesBox (chart "Notes" = Treatment.notes) -> embed "Patient concerns"
 *   txPlanBox (chart "Tx Plan Notes")          -> not exposed by the API ("")
 * Best-effort: empty strings if there's no connection / patient / notes.
 */

import { NextRequest, NextResponse } from "next/server";
import { connectionToken, getPatientContext, ORG_XID } from "../_lib/greyfinch";

export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;
  const name = sp.get("patient_name")?.trim() || sp.get("patientName")?.trim() || "";
  const empty = { notesBox: "", txPlanBox: "" };
  if (!name) return NextResponse.json(empty);

  try {
    const auth = await connectionToken(ORG_XID);
    if (!auth) return NextResponse.json(empty);
    return NextResponse.json(await getPatientContext(auth, { name }));
  } catch {
    return NextResponse.json(empty);
  }
}
