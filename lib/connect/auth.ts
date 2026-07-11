/**
 * Server-side authorization for the Greyfinch-embedded video pipeline.
 *
 * The clinic's Opera API key is what they paste into Greyfinch's Connect step;
 * Greyfinch hands it back to the embed via the launcher URL
 * (`?api_key={{connection.accessToken}}`) and the embed forwards it to these
 * APIs in the `x-opera-key` header.
 *
 * Accepted keys:
 *   - a clinic key (opk_…) from the clinic store, while trialing/active
 *   - the ops master key (OPERA_MASTER_KEY env — no default, unset = disabled)
 *   - the legacy training key "greyfinchtest" when OPERA_ALLOW_TEST_KEY=1
 */

import type { NextRequest } from "next/server";
import { findClinicByApiKey, type ClinicAccount } from "./clinic-store";

export type AuthResult =
  | { ok: true; kind: "clinic"; clinic: ClinicAccount }
  | { ok: true; kind: "master" | "test" | "internal"; clinic: null }
  | { ok: false; status: 401 | 402 | 429; error: string; code: string };

const TEST_KEY = "greyfinchtest";

function extractKey(request: NextRequest, body?: Record<string, unknown>): string {
  const header = request.headers.get("x-opera-key");
  if (header?.trim()) return header.trim();
  const q = request.nextUrl.searchParams.get("api_key");
  if (q?.trim()) return q.trim();
  if (body && typeof body.apiKey === "string" && body.apiKey.trim()) return body.apiKey.trim();
  return "";
}

// Per-clinic sliding window (in-memory — per instance, generous limits; the
// point is runaway-loop protection, not billing enforcement).
const RATE_LIMIT_PER_MINUTE = 10;
const minuteWindows = new Map<string, number[]>();

function checkRateLimit(clinicId: string): boolean {
  const now = Date.now();
  const stamps = (minuteWindows.get(clinicId) || []).filter((t) => now - t < 60_000);
  if (stamps.length >= RATE_LIMIT_PER_MINUTE) return false;
  stamps.push(now);
  minuteWindows.set(clinicId, stamps);
  return true;
}

export async function authorizeVideoRequest(
  request: NextRequest,
  opts: { body?: Record<string, unknown>; rateLimited?: boolean } = {}
): Promise<AuthResult> {
  const key = extractKey(request, opts.body);

  if (!key) {
    // Key enforcement is scoped to the Greyfinch surfaces: the embed marks its
    // requests with x-opera-source. Opera's own product/demo pages (/patient-video,
    // /video-prototype, …) share these endpoints and stay open as before.
    // Set OPERA_REQUIRE_KEY=1 to require a key from every caller.
    const fromGreyfinch = request.headers.get("x-opera-source") === "greyfinch";
    if (!fromGreyfinch && process.env.OPERA_REQUIRE_KEY !== "1") {
      return { ok: true, kind: "internal", clinic: null };
    }
    return {
      ok: false,
      status: 401,
      code: "missing_key",
      error:
        "No Opera API key. Connect the Opera app in Greyfinch (Settings → Apps → Opera → Connect) or start a free trial at /connect.",
    };
  }

  const masterKey = process.env.OPERA_MASTER_KEY?.trim();
  if (masterKey && key === masterKey) return { ok: true, kind: "master", clinic: null };

  if (key === TEST_KEY && process.env.OPERA_ALLOW_TEST_KEY === "1") {
    return { ok: true, kind: "test", clinic: null };
  }

  const clinic = await findClinicByApiKey(key);
  if (!clinic) {
    return {
      ok: false,
      status: 401,
      code: "invalid_key",
      error: "This Opera API key isn't recognized. Check the key in Greyfinch → Apps → Opera → Connect.",
    };
  }

  if (clinic.status === "canceled" || clinic.status === "pending") {
    return {
      ok: false,
      status: 402,
      code: "subscription_inactive",
      error: "This clinic's Opera subscription isn't active. Restart it at /connect or contact opera@getopera.ai.",
    };
  }

  const trialExpired =
    clinic.status === "trialing" && clinic.trialEndsAt && Date.parse(clinic.trialEndsAt) < Date.now();
  if (clinic.status === "past_due" || trialExpired) {
    return {
      ok: false,
      status: 402,
      code: trialExpired ? "trial_expired" : "payment_past_due",
      error: trialExpired
        ? "This clinic's 30-day free trial has ended. Add a payment method at /connect to keep generating videos."
        : "This clinic's last payment failed. Update billing to keep generating videos.",
    };
  }

  if (opts.rateLimited && !checkRateLimit(clinic.clinicId)) {
    return {
      ok: false,
      status: 429,
      code: "rate_limited",
      error: "Too many videos started this minute — wait a moment and try again.",
    };
  }

  return { ok: true, kind: "clinic", clinic };
}
