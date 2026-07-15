/**
 * Upstream render proxy — lets a host that can't render video (Netlify:
 * short-lived serverless, no Remotion/ffmpeg env) serve the same
 * /api/patient-video/* surface by forwarding to the App Runner deployment,
 * which owns the actual pipeline (Lambda renders, ElevenLabs, job store).
 *
 * Set OPERA_RENDER_UPSTREAM=https://<apprunner-domain> on the proxying host.
 * Unset (App Runner itself, local dev) → routes run their real implementation.
 */

import { NextRequest, NextResponse } from "next/server";
import { verifyClinicToken } from "@/lib/auth/clinic-auth";

export function renderUpstream(): string | null {
  const u = process.env.OPERA_RENDER_UPSTREAM?.trim();
  return u ? u.replace(/\/$/, "") : null;
}

/** Forward the request to the upstream pipeline; null means "no proxy configured". */
export async function proxyToRenderer(
  request: NextRequest,
  pathname: string
): Promise<NextResponse | null> {
  const upstream = renderUpstream();
  if (!upstream) return null;

  const url = `${upstream}${pathname}${request.nextUrl.search}`;
  const headers: Record<string, string> = {};
  const contentType = request.headers.get("content-type");
  if (contentType) headers["content-type"] = contentType;
  const operaKey = request.headers.get("x-opera-key");
  if (operaKey) headers["x-opera-key"] = operaKey;
  const operaSource = request.headers.get("x-opera-source");
  if (operaSource) headers["x-opera-source"] = operaSource;
  // Tenant scoping across the proxy hop: the upstream never sees the portal
  // cookie, so resolve the session here and forward the clinic identity.
  const forwardedClinicId = request.headers.get("x-opera-clinic-id");
  if (forwardedClinicId) {
    headers["x-opera-clinic-id"] = forwardedClinicId;
  } else {
    const portal = await verifyClinicToken(request);
    if (portal?.clinicId) headers["x-opera-clinic-id"] = portal.clinicId;
  }

  try {
    const res = await fetch(url, {
      method: request.method,
      headers,
      body: request.method === "GET" || request.method === "HEAD" ? undefined : await request.text(),
      // Job creation and polling are fast; renders happen async upstream.
      signal: AbortSignal.timeout(25_000),
    });
    const body = await res.text();
    return new NextResponse(body, {
      status: res.status,
      headers: { "content-type": res.headers.get("content-type") || "application/json" },
    });
  } catch (err) {
    console.error("[render-proxy] upstream failed", err);
    return NextResponse.json(
      { error: "Video service is unreachable right now — try again in a moment." },
      { status: 502 }
    );
  }
}
