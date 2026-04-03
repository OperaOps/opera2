import { z } from "zod";

export const DiagnosisType = z.enum([
  "cavity",
  "crowding",
  "spacing",
  "overbite",
  "underbite",
  "gum_disease",
  "missing_tooth",
  "cracked_tooth",
]);
export type DiagnosisType = z.infer<typeof DiagnosisType>;

export const TreatmentType = z.enum([
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
  "gum_treatment",
  "ceramic_braces",
  "expander",
  "jaw_surgery",
  "lingual_braces",
  "dentures",
  "retainer",
  "full_mouth_rehab",
]);
export type TreatmentType = z.infer<typeof TreatmentType>;

export const VideoCategory = z.enum(["dental", "orthodontic", "financial"]);
export type VideoCategory = z.infer<typeof VideoCategory>;

export const CaptionEntry = z.object({
  text: z.string(),
  startFrame: z.number(),
  endFrame: z.number(),
});
export type CaptionEntry = z.infer<typeof CaptionEntry>;

export const SceneScript = z.object({
  id: z.string(),
  narration: z.string(),
  durationSeconds: z.number(),
  heading: z.string().optional(),
  bullets: z.array(z.string()).optional(),
});
export type SceneScript = z.infer<typeof SceneScript>;

export const PatientVideoProps = z.object({
  patientName: z.string(),
  doctorName: z.string(),
  clinicName: z.string(),
  category: VideoCategory,
  diagnosis: DiagnosisType,
  treatment: TreatmentType,
  scenes: z.object({
    intro: SceneScript,
    problem: SceneScript,
    treatment: SceneScript,
    outcome: SceneScript,
    cta: SceneScript,
  }),
  captions: z.array(CaptionEntry).default([]),
  audioUrl: z.string().optional(),
  /** Optional bed track under narration; public/ path or https URL. Defaults to audio/opera-bgm.m4a. */
  bgmUrl: z.string().optional(),
  clinicBrand: z
    .object({
      logoUrl: z.string().optional(),
      primaryColor: z.string().default("#7c3aed"),
      accentColor: z.string().default("#a855f7"),
    })
    .default({}),
});
export type PatientVideoProps = z.infer<typeof PatientVideoProps>;

export const DEFAULT_FPS = 20;
export const VIDEO_WIDTH = 1920;
export const VIDEO_HEIGHT = 1080;
// ~1632×918 @ 0.85 — HD-ish output without full 1080p render cost; override REMOTION_RENDER_SCALE (0.25–1)
export const RENDER_SCALE = 0.85;

// ---------------------------------------------------------------------------
// Premium video types
// ---------------------------------------------------------------------------

export type VideoMode = "standard" | "premium";

export interface PremiumSceneScript {
  narration: string;
  durationSeconds: number;
  heading: string;
  bullets?: string[];
}

export type PremiumPatientVideoProps = {
  patientName: string;
  doctorName: string;
  clinicName: string;
  diagnosis: string;
  treatment: string;
  accentColor?: string;
  audioUrl?: string;
  /** Instrumental bed; public/ path (staticFile) or https. Defaults to audio/opera-bgm.m4a. */
  bgmUrl?: string;
  captions?: CaptionEntry[];
  scenes: {
    intro: PremiumSceneScript;
    problem: PremiumSceneScript;
    deepDive: PremiumSceneScript;
    treatment: PremiumSceneScript;
    journey: PremiumSceneScript;
    outcome: PremiumSceneScript;
    whatToExpect: PremiumSceneScript;
    cta: PremiumSceneScript;
  };
  beforePhotoUrl?: string;
  afterPhotoUrl?: string;
} & Record<string, unknown>;
