/**
 * GET /api/health — liveness + configuration snapshot (no secrets).
 * Used by App Runner checks and for the Greyfinch beta "prove it's stable" ask.
 */

import { NextResponse } from "next/server";
import { isDynamoClinicStoreEnabled } from "@/lib/connect/clinic-store";
import { isStripeConfigured } from "@/lib/connect/stripe";

export const dynamic = "force-dynamic";

export async function GET() {
  const greyfinchHost = (() => {
    try {
      return new URL(process.env.GREYFINCH_ENDPOINT || "https://connect-api.training.greyfinch.com/v1/graphql").host;
    } catch {
      return "invalid";
    }
  })();

  return NextResponse.json({
    ok: true,
    time: new Date().toISOString(),
    jobStore: process.env.PATIENT_VIDEO_JOBS_TABLE?.trim() ? "dynamodb" : "memory",
    clinicStore: isDynamoClinicStoreEnabled() ? "dynamodb" : "file",
    billing: isStripeConfigured() ? "stripe" : "activation_code",
    renderer: process.env.REMOTION_USE_LAMBDA === "1" || process.env.REMOTION_USE_LAMBDA === "true" ? "lambda" : "local",
    greyfinch: greyfinchHost,
  });
}
