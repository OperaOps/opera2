/**
 * Public API input validation — converts snake_case → camelCase,
 * applies smart defaults, validates enums.
 *
 * Easy to extend: just add fields to PublicVideoInput and the
 * validation/conversion logic below.
 */

import type { RenderInput } from "@/app/api/patient-video/_lib/job-types";

// ---------------------------------------------------------------------------
// Supported values
// ---------------------------------------------------------------------------

const VALID_TREATMENTS = new Set([
  "crown", "filling", "root_canal", "implant", "extraction", "bridge",
  "veneers", "whitening", "gum_treatment", "full_mouth_rehab",
  "braces", "invisalign", "ceramic_braces", "lingual_braces", "expander",
  "retainer", "jaw_surgery",
]);

const ORTHO_TREATMENTS = new Set([
  "braces", "invisalign", "ceramic_braces", "lingual_braces", "expander",
  "retainer", "jaw_surgery",
]);

const TREATMENT_TO_DIAGNOSIS: Record<string, string> = {
  crown: "cracked_tooth", filling: "cavity", root_canal: "cavity",
  implant: "missing_tooth", extraction: "cracked_tooth", bridge: "missing_tooth",
  veneers: "spacing", whitening: "cavity", gum_treatment: "gum_disease",
  dentures: "missing_tooth", full_mouth_rehab: "missing_tooth",
  braces: "crowding", invisalign: "crowding", ceramic_braces: "crowding",
  lingual_braces: "crowding", expander: "crowding", retainer: "crowding",
  jaw_surgery: "underbite",
};

const VALID_CONTENT_MODES = new Set(["template", "template_ai", "full_ai"]);
const VALID_URGENCY = new Set(["routine", "moderate", "urgent"]);
const VALID_GOALS = new Set(["educate", "reassure", "convince", "prepare", "follow_up", "celebrate"]);
const VALID_STATUSES = new Set(["undecided", "hesitant", "accepted", "scheduled", "in_treatment", "post_treatment"]);

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

interface FieldError {
  field: string;
  message: string;
}

type ValidationResult =
  | { ok: true; data: RenderInput }
  | { ok: false; errors: FieldError[] };

export function validatePublicInput(body: unknown): ValidationResult {
  if (!body || typeof body !== "object") {
    return { ok: false, errors: [{ field: "body", message: "Request body must be a JSON object." }] };
  }

  const b = body as Record<string, unknown>;
  const errors: FieldError[] = [];

  // Required fields
  const patientName = typeof b.patient_name === "string" ? b.patient_name.trim() : "";
  const doctorName = typeof b.doctor_name === "string" ? b.doctor_name.trim() : "";
  const clinicName = typeof b.clinic_name === "string" ? b.clinic_name.trim() : "";
  const treatment = typeof b.treatment === "string" ? b.treatment.trim().toLowerCase() : "";

  if (!patientName) errors.push({ field: "patient_name", message: "Required." });
  if (!doctorName) errors.push({ field: "doctor_name", message: "Required." });
  if (!clinicName) errors.push({ field: "clinic_name", message: "Required." });
  if (!treatment) errors.push({ field: "treatment", message: "Required." });
  else if (!VALID_TREATMENTS.has(treatment)) {
    errors.push({
      field: "treatment",
      message: `Invalid treatment "${treatment}". Valid: ${[...VALID_TREATMENTS].join(", ")}`,
    });
  }

  if (errors.length > 0) return { ok: false, errors };

  // Derived fields
  const specialty = ORTHO_TREATMENTS.has(treatment) ? "orthodontic" : "dental";
  const diagnosis = (typeof b.diagnosis === "string" && b.diagnosis.trim()) || TREATMENT_TO_DIAGNOSIS[treatment] || "cavity";
  const category = specialty;

  // Optional fields with defaults
  const contentMode = typeof b.content_mode === "string" && VALID_CONTENT_MODES.has(b.content_mode)
    ? b.content_mode as "template" | "template_ai" | "full_ai"
    : "template";

  const urgencyLevel = typeof b.urgency_level === "string" && VALID_URGENCY.has(b.urgency_level)
    ? b.urgency_level as "routine" | "moderate" | "urgent"
    : "routine";

  const videoGoal = typeof b.video_goal === "string" && VALID_GOALS.has(b.video_goal)
    ? b.video_goal
    : "educate";

  const patientStatus = typeof b.patient_status === "string" && VALID_STATUSES.has(b.patient_status)
    ? b.patient_status
    : "undecided";

  const appointmentContext = typeof b.appointment_context === "string" ? b.appointment_context.trim() : "new_patient_consult";

  const data: RenderInput = {
    patientName,
    doctorName,
    clinicName,
    treatment,
    diagnosis,
    category: category as "dental" | "orthodontic" | "financial",
    specialty,
    mode: "premium",
    contentMode,
    urgencyLevel,
    videoGoal,
    patientStatus,
    appointmentContext,
    treatmentNotes: typeof b.treatment_notes === "string" ? b.treatment_notes.trim() || undefined : undefined,
    concerns: typeof b.concerns === "string" ? b.concerns.trim() || undefined : undefined,
    financing: typeof b.financing === "string" ? b.financing.trim() || undefined : undefined,
    parentMode: b.parent_mode === true,
    clinicBrand: (typeof b.brand_primary_color === "string" || typeof b.brand_accent_color === "string")
      ? {
          primaryColor: typeof b.brand_primary_color === "string" ? b.brand_primary_color : undefined,
          accentColor: typeof b.brand_accent_color === "string" ? b.brand_accent_color : undefined,
        }
      : undefined,
    bgmUrl: typeof b.bgm_url === "string" ? b.bgm_url.trim() || undefined : undefined,
    logoUrl: typeof b.logo_url === "string" ? b.logo_url.trim() || undefined : undefined,
    phoneNumber: typeof b.phone_number === "string" ? b.phone_number.trim() || undefined : undefined,
    presetScript: (b.preset_script && typeof b.preset_script === "object") ? b.preset_script as Record<string, unknown> : undefined,
  };

  return { ok: true, data };
}

/** List of all valid treatment values (for docs) */
export const TREATMENTS = [...VALID_TREATMENTS];

/** List of all valid content modes (for docs) */
export const CONTENT_MODES = [...VALID_CONTENT_MODES];
