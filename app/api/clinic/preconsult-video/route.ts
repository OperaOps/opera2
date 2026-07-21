/**
 * POST /api/clinic/preconsult-video { videoUrl }
 * Registers an uploaded clinic tour in our database as PENDING. The Opera
 * team adds the music bed and polish, then promotes it to the live
 * preconsultVideoUrl. Uploads never go straight into the pipeline.
 */

import { NextRequest, NextResponse } from "next/server";
import { verifyClinicToken } from "@/lib/auth/clinic-auth";
import { getClinic, saveClinic } from "@/lib/connect/clinic-store";
import { getDb } from "@/lib/db/patient-portal-schema";

export async function POST(request: NextRequest) {
  const session = await verifyClinicToken(request);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let videoUrl: string | undefined;
  try {
    const body = await request.json();
    if (typeof body.videoUrl === "string") videoUrl = body.videoUrl.trim();
  } catch {
    /* handled below */
  }
  if (!videoUrl) return NextResponse.json({ error: "videoUrl required" }, { status: 400 });

  try {
    const account = await getClinic(session.clinicId);
    if (account) {
      const rec = account as unknown as Record<string, unknown>;
      rec.preconsultUploadUrl = videoUrl;
      rec.preconsultUploadAt = new Date().toISOString();
      await saveClinic(account);
      return NextResponse.json({ success: true, status: "pending_review" });
    }
  } catch (err) {
    console.error("[preconsult-video] store save failed", err);
  }

  try {
    getDb()
      .prepare("UPDATE clinic_accounts SET preconsult_upload_url = ? WHERE id = ?")
      .run(videoUrl, session.clinicId);
    return NextResponse.json({ success: true, status: "pending_review" });
  } catch {
    return NextResponse.json({ error: "store_error" }, { status: 500 });
  }
}
