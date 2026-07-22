/**
 * Shared types for patient video jobs (used by job store + API routes).
 */

export interface RenderInput {
  patientName: string;
  doctorName: string;
  clinicName: string;
  category: "dental" | "orthodontic" | "financial";
  diagnosis: string;
  treatment: string;
  treatmentNotes?: string;
  urgencyLevel?: "routine" | "moderate" | "urgent";
  clinicBrand?: {
    primaryColor?: string;
    accentColor?: string;
  };
  useDemo?: boolean;
  mode?: "standard" | "premium";
  beforePhotoBase64?: string;
  afterPhotoBase64?: string;
  specialty?: "dental" | "orthodontic";
  appointmentContext?: string;
  patientStatus?: string;
  videoGoal?: string;
  contentMode?: "template" | "template_ai" | "full_ai";
  concerns?: string;
  financing?: string;
  parentMode?: boolean;
  /** Optional BGM public path or URL (passed through to render pipeline). */
  bgmUrl?: string;
  logoUrl?: string;
  phoneNumber?: string;
  /** Pre-written script JSON — bypasses AI generation when provided. */
  presetScript?: Record<string, unknown>;
  /** Pre-consult welcome mode — short hello over the clinic tour footage (no AI script). */
  preconsult?: {
    tourVideoUrl: string;
    tourDurationSeconds?: number;
    appointmentType?: string;
    appointmentDate?: string;
    /** Visual is Opera stock, not the clinic's office — narration stays neutral. */
    genericVisual?: boolean;
    /** Still image for the closing beat when the visual is generic. */
    stillImageUrl?: string;
  };
}

export interface VideoJob {
  status: "processing" | "completed" | "failed";
  progress: number;
  step: string;
  videoPath: string | null;
  videoUrl: string | null;
  error: string | null;
  createdAt: number;
  input: RenderInput;
  contentMode?: string;
  /** Tenant scoping — the Dynamo clinicId that created this job (portal or API key). */
  clinicId?: string;
}
