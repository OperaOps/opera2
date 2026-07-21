/**
 * Admin: promote a clinic's pending tour upload to their live pre-consult
 * video (optionally substituting a processed URL, e.g. after adding music).
 */

import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "../_lib/auth";
import { getClinic, saveClinic } from "@/lib/connect/clinic-store";

export async function POST(request: NextRequest) {
  if (!isAdmin(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: { clinicId?: string; videoUrl?: string; audioBaked?: boolean };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  if (!body.clinicId) return NextResponse.json({ error: "clinicId required" }, { status: 400 });

  const clinic = await getClinic(body.clinicId);
  if (!clinic) return NextResponse.json({ error: "not_found" }, { status: 404 });

  const rec = clinic as unknown as Record<string, unknown>;
  const live = body.videoUrl?.trim() || (rec.preconsultUploadUrl as string);
  if (!live) return NextResponse.json({ error: "nothing_to_promote" }, { status: 409 });

  rec.preconsultVideoUrl = live;
  rec.preconsultAudioBaked = Boolean(body.audioBaked);
  rec.preconsultUploadUrl = null;
  await saveClinic(clinic);

  return NextResponse.json({ success: true, videoUrl: live });
}
