/**
 * POST /api/patient-video/generate
 *
 * Accepts patient/treatment details, kicks off a background render job
 * via a child process (avoids webpack bundling Remotion's native deps),
 * and returns a job ID for polling status.
 */

import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import {
  saveJob,
  type VideoJob,
  type RenderInput,
} from "../_lib/job-store";
import { recordPatientVideo, patientKey } from "../_lib/patient-library";
import { runRenderInBackground } from "@/lib/video/render";

// ---------------------------------------------------------------------------
// Input validation
// ---------------------------------------------------------------------------

const VALID_CATEGORIES = new Set(["dental", "orthodontic", "financial"]);
const VALID_DIAGNOSES = new Set([
  "cavity",
  "crowding",
  "spacing",
  "overbite",
  "underbite",
  "gum_disease",
  "missing_tooth",
  "cracked_tooth",
]);
const VALID_TREATMENTS = new Set([
  "crown",
  "filling",
  "braces",
  "invisalign",
  "implant",
  "root_canal",
  "whitening",
  "veneers",
  "extraction",
  "bridge",
  "ceramic_braces",
  "lingual_braces",
  "expander",
  "retainer",
  "jaw_surgery",
  "gum_treatment",
  "dentures",
  "full_mouth",
  "full_mouth_rehab",
  "inlay_onlay",
  "sleep_apnea",
  "space_maintainer",
  "headgear",
]);

// ---------------------------------------------------------------------------
// Derivation helpers for backward compatibility
// ---------------------------------------------------------------------------

/** Map specialty to category when category is not explicitly provided. */
function deriveCategory(specialty?: string): "dental" | "orthodontic" | "financial" | undefined {
  if (!specialty) return undefined;
  if (specialty === "dental") return "dental";
  if (specialty === "orthodontic") return "orthodontic";
  return undefined;
}

/** Map treatment to a reasonable default diagnosis when diagnosis is not provided. */
const TREATMENT_TO_DIAGNOSIS: Record<string, string> = {
  crown: "cracked_tooth",
  filling: "cavity",
  root_canal: "cavity",
  whitening: "cavity",
  implant: "missing_tooth",
  bridge: "missing_tooth",
  dentures: "missing_tooth",
  extraction: "cracked_tooth",
  veneers: "spacing",
  gum_treatment: "gum_disease",
  braces: "crowding",
  invisalign: "crowding",
  ceramic_braces: "crowding",
  lingual_braces: "crowding",
  expander: "crowding",
  retainer: "crowding",
  space_maintainer: "crowding",
  jaw_surgery: "underbite",
  headgear: "overbite",
  sleep_apnea: "overbite",
  full_mouth: "cavity",
  full_mouth_rehab: "missing_tooth",
  inlay_onlay: "cavity",
};

function validateInput(body: unknown): { ok: true; data: RenderInput } | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Request body must be a JSON object." };
  }

  const b = body as Record<string, unknown>;

  if (!b.patientName || typeof b.patientName !== "string") {
    return { ok: false, error: "patientName is required and must be a string." };
  }
  if (!b.doctorName || typeof b.doctorName !== "string") {
    return { ok: false, error: "doctorName is required and must be a string." };
  }
  if (!b.clinicName || typeof b.clinicName !== "string") {
    return { ok: false, error: "clinicName is required and must be a string." };
  }

  // treatment is always required
  if (!b.treatment || !VALID_TREATMENTS.has(b.treatment as string)) {
    return {
      ok: false,
      error: `treatment must be one of: ${[...VALID_TREATMENTS].join(", ")}`,
    };
  }
  const treatment = b.treatment as string;

  // category: use explicit value, derive from specialty, or derive from treatment
  let category: RenderInput["category"];
  if (b.category && VALID_CATEGORIES.has(b.category as string)) {
    category = b.category as RenderInput["category"];
  } else {
    const derived = deriveCategory(b.specialty as string | undefined);
    if (derived) {
      category = derived;
    } else {
      // Infer from treatment: ortho treatments → orthodontic, else dental
      const orthoTreatments = new Set([
        "braces", "invisalign", "ceramic_braces", "lingual_braces",
        "expander", "retainer", "space_maintainer", "jaw_surgery", "headgear",
      ]);
      category = orthoTreatments.has(treatment) ? "orthodontic" : "dental";
    }
  }

  // diagnosis: use explicit value, or derive from treatment
  let diagnosis: string;
  if (b.diagnosis && VALID_DIAGNOSES.has(b.diagnosis as string)) {
    diagnosis = b.diagnosis as string;
  } else {
    const derived = TREATMENT_TO_DIAGNOSIS[treatment];
    if (derived) {
      diagnosis = derived;
    } else {
      // Fallback — should not happen given the map covers all valid treatments
      return {
        ok: false,
        error: `diagnosis must be one of: ${[...VALID_DIAGNOSES].join(", ")} (could not derive from treatment "${treatment}")`,
      };
    }
  }

  // Validate specialty if provided
  const validSpecialties = new Set(["dental", "orthodontic"]);
  if (b.specialty && !validSpecialties.has(b.specialty as string)) {
    return {
      ok: false,
      error: `specialty must be one of: dental, orthodontic`,
    };
  }

  // All videos use premium 8-scene format
  const mode: RenderInput["mode"] = "premium";

  return {
    ok: true,
    data: {
      patientName: b.patientName as string,
      doctorName: b.doctorName as string,
      clinicName: b.clinicName as string,
      category,
      diagnosis,
      treatment,
      treatmentNotes: typeof b.treatmentNotes === "string" ? b.treatmentNotes : undefined,
      urgencyLevel:
        typeof b.urgencyLevel === "string" &&
        ["routine", "moderate", "urgent"].includes(b.urgencyLevel)
          ? (b.urgencyLevel as RenderInput["urgencyLevel"])
          : undefined,
      clinicBrand: b.clinicBrand && typeof b.clinicBrand === "object"
        ? (b.clinicBrand as RenderInput["clinicBrand"])
        : undefined,
      useDemo: typeof b.useDemo === "boolean" ? b.useDemo : false,
      mode,
      beforePhotoBase64: typeof b.beforePhotoBase64 === "string" ? b.beforePhotoBase64 : undefined,
      afterPhotoBase64: typeof b.afterPhotoBase64 === "string" ? b.afterPhotoBase64 : undefined,
      // New structured fields
      specialty: validSpecialties.has(b.specialty as string)
        ? (b.specialty as RenderInput["specialty"])
        : undefined,
      appointmentContext: typeof b.appointmentContext === "string" ? b.appointmentContext : undefined,
      patientStatus: typeof b.patientStatus === "string" ? b.patientStatus : undefined,
      videoGoal: typeof b.videoGoal === "string" ? b.videoGoal : undefined,
      // Single fixed generation mode — template skeleton + AI personalization,
      // with automatic full-AI fallback when no template exists. Any
      // client-supplied contentMode is ignored.
      contentMode: "template_ai",
      concerns: typeof b.concerns === "string" ? b.concerns : undefined,
      financing: typeof b.financing === "string" ? b.financing : undefined,
      parentMode: typeof b.parentMode === "boolean" ? b.parentMode : undefined,
      bgmUrl: typeof b.bgmUrl === "string" && b.bgmUrl.trim() ? b.bgmUrl.trim() : undefined,
    },
  };
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON in request body." },
      { status: 400 }
    );
  }

  const validation = validateInput(body);
  if (!validation.ok) {
    return NextResponse.json(
      { error: validation.error },
      { status: 400 }
    );
  }

  const input = validation.data;
  const jobId = crypto.randomUUID();

  // Initialize job
  const job: VideoJob = {
    status: "processing",
    progress: 0,
    step: "script",
    videoPath: null,
    videoUrl: null,
    error: null,
    createdAt: Date.now(),
    input,
    contentMode: input.contentMode,
  };
  await saveJob(jobId, job);

  // Index this video under the patient so the "Patient videos" view can list it.
  // Keyed by xid when the launcher supplied one, else by the patient name.
  const xid =
    typeof (body as Record<string, unknown>).xid === "string"
      ? ((body as Record<string, unknown>).xid as string).trim()
      : "";
  const key = patientKey(xid || input.patientName);
  if (key) {
    recordPatientVideo({
      jobId,
      key,
      xid: xid || undefined,
      patientName: input.patientName,
      treatment: input.treatment,
      createdAt: job.createdAt,
    });
  }

  // Start render in background via child process
  runRenderInBackground(jobId, input);

  return NextResponse.json(
    {
      jobId,
      status: "processing",
      statusUrl: `/api/patient-video/${jobId}`,
    },
    { status: 202 }
  );
}
