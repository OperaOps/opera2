/**
 * Shared in-memory job store for video render jobs.
 *
 * Both the generate route and the status route import from this module.
 * ES modules are singletons in Node.js — the same Map instance is shared
 * across all importers within the same process.
 */

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
}

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
}

/**
 * Singleton job store — shared across all route modules.
 * Uses globalThis to survive Next.js dev mode hot reloads and
 * webpack module isolation between route handlers.
 */
const GLOBAL_KEY = "__patientVideoJobStore" as const;

function getOrCreateJobStore(): Map<string, VideoJob> {
  const g = globalThis as Record<string, unknown>;
  if (!g[GLOBAL_KEY]) {
    g[GLOBAL_KEY] = new Map<string, VideoJob>();
  }
  return g[GLOBAL_KEY] as Map<string, VideoJob>;
}

export const jobStore = getOrCreateJobStore();
