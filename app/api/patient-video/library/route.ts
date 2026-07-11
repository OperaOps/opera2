/**
 * GET /api/patient-video/library?xid=<patient xid>
 *
 * Returns the videos generated for a patient, newest first, with each one's
 * current status + playable URL resolved live from the job store.
 */

import { NextRequest, NextResponse } from "next/server";
import { proxyToRenderer } from "@/lib/video/upstream-proxy";
import { getPatientVideos, patientKey } from "../_lib/patient-library";
import { loadJob } from "../_lib/job-store";
import { authorizeVideoRequest } from "@/lib/connect/auth";

export async function GET(request: NextRequest) {
  const proxied = await proxyToRenderer(request, "/api/patient-video/library");
  if (proxied) return proxied;

  const auth = await authorizeVideoRequest(request);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error, code: auth.code }, { status: auth.status });
  }

  const sp = request.nextUrl.searchParams;
  const xid = sp.get("xid")?.trim() || "";
  const name = sp.get("patient_name")?.trim() || sp.get("patientName")?.trim() || "";
  const key = patientKey(xid || name);
  if (!key) {
    return NextResponse.json({ error: "Missing xid or patient_name." }, { status: 400 });
  }

  const entries = getPatientVideos(key);
  const videos = await Promise.all(
    entries.map(async (e) => {
      const job = await loadJob(e.jobId);
      const status = job?.status ?? "processing";
      const videoUrl =
        job?.videoUrl ||
        (status === "completed" ? `/api/patient-video/${e.jobId}/video` : null);
      return {
        jobId: e.jobId,
        patientName: e.patientName,
        treatment: e.treatment,
        createdAt: e.createdAt,
        status,
        progress: job?.progress ?? 0,
        videoUrl,
      };
    })
  );

  return NextResponse.json({ key, count: videos.length, videos });
}
