/**
 * POST /api/patient-video/record-resource   — treatment-timeline tracking (task 4)
 *
 * Writes a generated video onto the patient's Greyfinch treatment timeline as an
 * app resource (insertAppResource). Called by the embed when a video finishes.
 *
 * This requires an established Greyfinch *connection* for the org and the patient
 * to be linked to it. Until the clinic connects the app (API_TOKEN), Greyfinch
 * returns MISSING_PATIENT_CONNECTION — which we surface as { skipped: true }
 * rather than an error, so generation flow never breaks (see attachVideoResource).
 *
 * Body: { videoUrl, patientName, xid?, treatment?, jobId? }
 */

import { NextRequest, NextResponse } from "next/server";
import { proxyToRenderer } from "@/lib/video/upstream-proxy";
import { attachVideoResource } from "../_lib/greyfinch";
import { authorizeVideoRequest } from "@/lib/connect/auth";

export async function POST(request: NextRequest) {
  const proxied = await proxyToRenderer(request, "/api/patient-video/record-resource");
  if (proxied) return proxied;

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const auth = await authorizeVideoRequest(request, { body });
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error, code: auth.code }, { status: auth.status });
  }

  const videoUrl = typeof body.videoUrl === "string" ? body.videoUrl : "";
  const patientName = typeof body.patientName === "string" ? body.patientName : "";
  if (!videoUrl || !patientName) {
    return NextResponse.json({ error: "videoUrl and patientName are required." }, { status: 400 });
  }
  const xid = typeof body.xid === "string" ? body.xid : undefined;
  const treatment = typeof body.treatment === "string" ? body.treatment : "";
  const jobId = typeof body.jobId === "string" ? body.jobId : "";

  // Pretty labels for the timeline card (computed here so the display props stay
  // simple): "ceramic_braces" -> "Ceramic Braces", plus a human timestamp.
  const treatmentLabel = treatment
    ? treatment.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "Video";
  const now = new Date();
  const timeLabel = now.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  const result = await attachVideoResource({
    patientName,
    patientXid: xid,
    data: {
      kind: "opera_video",
      title: "Personalized Video",
      url: videoUrl,
      treatment,
      treatmentLabel,
      timeLabel,
      jobId,
      createdAt: now.toISOString(),
    },
  });

  // Always 200: a skipped write (no connection yet) is an expected, non-fatal state.
  return NextResponse.json(result);
}
