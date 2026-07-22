/**
 * POST /api/patient-video/preconsult
 *
 * Kicks off a rendered pre-consult welcome video: a ~25s "Hi {name}, we
 * can't wait to meet you" with warm voiceover, built around the clinic's
 * own tour footage. No AI script — a fixed template personalized with the
 * patient/clinic/appointment details. Returns a job ID for polling on the
 * same /api/patient-video/{jobId} status surface as treatment videos.
 */

import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { proxyToRenderer } from "@/lib/video/upstream-proxy";
import { saveJob, type VideoJob, type RenderInput } from "../_lib/job-store";
import { runRenderInBackground } from "@/lib/video/render";
import { authorizeVideoRequest } from "@/lib/connect/auth";
import { recordVideoGenerated } from "@/lib/connect/clinic-store";
import { verifyClinicToken } from "@/lib/auth/clinic-auth";

export async function POST(request: NextRequest) {
  const proxied = await proxyToRenderer(request, "/api/patient-video/preconsult");
  if (proxied) return proxied;

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON in request body." }, { status: 400 });
  }

  const auth = await authorizeVideoRequest(request, { body, rateLimited: true });
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error, code: auth.code }, { status: auth.status });
  }

  const patientName = typeof body.patientName === "string" ? body.patientName.trim() : "";
  const clinicName = typeof body.clinicName === "string" ? body.clinicName.trim() : "";
  const tourVideoUrl = typeof body.tourVideoUrl === "string" ? body.tourVideoUrl.trim() : "";
  if (!patientName || !clinicName) {
    return NextResponse.json({ error: "patientName and clinicName are required." }, { status: 400 });
  }
  if (!/^https:\/\//.test(tourVideoUrl)) {
    return NextResponse.json({ error: "tourVideoUrl must be an absolute https URL." }, { status: 400 });
  }

  const input: RenderInput = {
    patientName,
    doctorName: typeof body.doctorName === "string" ? body.doctorName.trim() : "",
    clinicName,
    // Placeholder classification — preconsult mode skips script generation,
    // so these never reach Claude; they only label the job in lists.
    category: "dental",
    diagnosis: "pre_consult",
    treatment: "welcome",
    mode: "premium",
    contentMode: "template_ai",
    preconsult: {
      tourVideoUrl,
      tourDurationSeconds:
        typeof body.tourDurationSeconds === "number" && body.tourDurationSeconds > 0
          ? body.tourDurationSeconds
          : undefined,
      appointmentType:
        typeof body.appointmentType === "string" ? body.appointmentType.trim() : undefined,
      appointmentDate:
        typeof body.appointmentDate === "string" ? body.appointmentDate.trim() : undefined,
      genericVisual: body.genericVisual === true,
      stillImageUrl:
        typeof body.stillImageUrl === "string" && /^https:\/\//.test(body.stillImageUrl)
          ? body.stillImageUrl.trim()
          : undefined,
    },
  };

  const jobId = crypto.randomUUID();

  let clinicId: string | undefined;
  if (auth.kind === "clinic") {
    clinicId = auth.clinic.clinicId;
  } else {
    const portal = await verifyClinicToken(request);
    clinicId = portal?.clinicId ?? request.headers.get("x-opera-clinic-id") ?? undefined;
  }

  const job: VideoJob = {
    status: "processing",
    progress: 0,
    step: "welcome",
    videoPath: null,
    videoUrl: null,
    error: null,
    createdAt: Date.now(),
    input,
    clinicId,
  };
  await saveJob(jobId, job);

  runRenderInBackground(jobId, input);

  if (clinicId) recordVideoGenerated(clinicId);

  return NextResponse.json(
    { jobId, status: "processing", statusUrl: `/api/patient-video/${jobId}` },
    { status: 202 }
  );
}
