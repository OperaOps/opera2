/**
 * Mapping of dental treatments to cleaned MP4 clips under public/dental-videos/.
 *
 * VIDEO `src` is a path relative to public/ — resolved with staticFile() at render time
 * so assets bundle in Docker and avoid S3 DNS issues during Remotion.
 */

/**
 * Asset base path. Use local staticFile paths for reliable rendering.
 * S3 URLs cause DNS resolution failures and browser crashes during Remotion render.
 * Local files in public/dental-videos/ are bundled into the Remotion bundle.
 */
const LOCAL = "dental-videos";

export interface VideoClipInfo {
  /** Path under public/ (e.g. dental-videos/...) or HTTPS URL */
  src: string;
  /** Duration of the clip in seconds */
  durationSeconds: number;
  /**
   * Fraction of the frame to crop away (0–1), e.g. right: 0.05 hides a right-edge watermark.
   * Applied in DentalVideoClip via overflow + scaled video.
   */
  crop?: { top?: number; right?: number; bottom?: number; left?: number };
  /** Skip leading dead air (seconds). Passed to OffthreadVideo trimBefore. */
  trimStartSeconds?: number;
}

export interface TreatmentVideoAssets {
  problem?: VideoClipInfo[];
  treatment: VideoClipInfo[];
  outcome?: VideoClipInfo[];
  /** Premium scenes — used by PremiumOrthoVideo composition */
  deepDive?: VideoClipInfo[];
  journey?: VideoClipInfo[];
  whatToExpect?: VideoClipInfo[];
}

/** Shared smile-result clip used as outcome fallback for treatments without a specific outcome clip */
const SHARED_OUTCOME: VideoClipInfo = {
  src: `${LOCAL}/shared/smile-result.mp4`,
  durationSeconds: 9,
};

const dentalVideoMap: Record<string, TreatmentVideoAssets> = {
  crown: {
    treatment: [
      { src: `${LOCAL}/crown/step1.mp4`, durationSeconds: 13.5 },
      { src: `${LOCAL}/crown/step2.mp4`, durationSeconds: 9.1 },
    ],
    // Deep dive uses step2 (prep detail) — different angle from treatment step1
    deepDive: [
      { src: `${LOCAL}/crown/step2.mp4`, durationSeconds: 9.1 },
    ],
    outcome: [
      { src: `${LOCAL}/crown/outcome.mp4`, durationSeconds: 9.0 },
    ],
  },
  filling: {
    treatment: [
      { src: `${LOCAL}/filling/step1.mp4`, durationSeconds: 9.4 },
      { src: `${LOCAL}/filling/step2.mp4`, durationSeconds: 17.4 },
    ],
    // Deep dive uses step2 (composite placement) — different from step1 (cavity prep)
    deepDive: [
      { src: `${LOCAL}/filling/step2.mp4`, durationSeconds: 17.4 },
    ],
    outcome: [SHARED_OUTCOME],
  },
  implant: {
    treatment: [
      { src: `${LOCAL}/implant/step1.mp4`, durationSeconds: 19.4 },
      { src: `${LOCAL}/implant/step2.mp4`, durationSeconds: 16.6 },
    ],
    // Deep dive uses step2 (implant screw + abutment detail)
    deepDive: [
      { src: `${LOCAL}/implant/step2.mp4`, durationSeconds: 16.6 },
    ],
    outcome: [SHARED_OUTCOME],
  },
  whitening: {
    treatment: [
      { src: `${LOCAL}/whitening/step1.mp4`, durationSeconds: 11.2 },
      { src: `${LOCAL}/whitening/step2.mp4`, durationSeconds: 22.5 },
    ],
    deepDive: [
      { src: `${LOCAL}/whitening/step2.mp4`, durationSeconds: 22.5 },
    ],
    outcome: [SHARED_OUTCOME],
  },
  veneers: {
    treatment: [
      { src: `${LOCAL}/veneers/step1.mp4`, durationSeconds: 20 },
    ],
    deepDive: [
      { src: `${LOCAL}/veneers/step1.mp4`, durationSeconds: 20 },
    ],
    outcome: [SHARED_OUTCOME],
  },
  root_canal: {
    problem: [
      { src: `${LOCAL}/root_canal/problem.mp4`, durationSeconds: 15.1 },
    ],
    treatment: [
      { src: `${LOCAL}/root_canal/treatment.mp4`, durationSeconds: 18 },
    ],
    // Deep dive uses the problem clip (cross-section of infected tooth)
    deepDive: [
      { src: `${LOCAL}/root_canal/problem.mp4`, durationSeconds: 15.1 },
    ],
    outcome: [SHARED_OUTCOME],
  },
  extraction: {
    treatment: [
      { src: `${LOCAL}/extraction/step1.mp4`, durationSeconds: 12.5 },
    ],
    deepDive: [
      { src: `${LOCAL}/extraction/step1.mp4`, durationSeconds: 12.5 },
    ],
    outcome: [SHARED_OUTCOME],
  },
  bridge: {
    treatment: [
      { src: `${LOCAL}/bridge/step1.mp4`, durationSeconds: 16.5 },
    ],
    deepDive: [
      { src: `${LOCAL}/bridge/step1.mp4`, durationSeconds: 16.5 },
    ],
    outcome: [SHARED_OUTCOME],
  },
  dentures: {
    treatment: [
      { src: `${LOCAL}/dentures/step1.mp4`, durationSeconds: 12.8 },
    ],
    deepDive: [
      { src: `${LOCAL}/dentures/step1.mp4`, durationSeconds: 12.8 },
    ],
    outcome: [SHARED_OUTCOME],
  },
  gum_treatment: {
    problem: [
      { src: `${LOCAL}/gum_treatment/problem.mp4`, durationSeconds: 18.9 },
    ],
    treatment: [
      { src: `${LOCAL}/gum_treatment/treatment.mp4`, durationSeconds: 38.3 },
    ],
    // Deep dive uses treatment clip (scaling/cleaning detail)
    deepDive: [
      { src: `${LOCAL}/gum_treatment/treatment.mp4`, durationSeconds: 38.3 },
    ],
    outcome: [SHARED_OUTCOME],
  },

  /**
   * Full Mouth Rehabilitation — 6-stage phased care:
   *   Stage 1 (problem):     severe decay / compromised dentition
   *   Stage 2 (treatment):   extractions
   *   Stage 3 (deepDive):    oral surgery — ridge augmentation
   *   Stage 4 (journey):     implant placement + osseointegration
   *   Stage 5 (whatToExpect): crown / full-arch restoration
   *   Stage 6 (outcome):     final smile result
   *
   * Clips are curated from across the asset library. Each clip is used
   * for a DIFFERENT stage — no visible duplication.
   */
  full_mouth_rehab: {
    // Stage 1: The Problem — show severely compromised teeth
    problem: [
      { src: `${LOCAL}/root_canal/problem.mp4`, durationSeconds: 15.1, trimStartSeconds: 0.12 },
      { src: `${LOCAL}/gum_treatment/problem.mp4`, durationSeconds: 18.9, trimStartSeconds: 0.12 },
      { src: `${LOCAL}/crown/step1.mp4`, durationSeconds: 13.5, trimStartSeconds: 0.12 },
    ],
    // Stage 2: Extractions — removing compromised teeth (crop top-right watermark)
    treatment: [
      {
        src: `${LOCAL}/extraction/step1.mp4`,
        durationSeconds: 12.5,
        crop: { right: 0.05 },
        trimStartSeconds: 0.12,
      },
    ],
    // Stage 3: Oral Surgery — ridge augmentation / bone work
    deepDive: [
      { src: `${LOCAL}/jaw_surgery/step1.mp4`, durationSeconds: 22.8, trimStartSeconds: 0.12 },
      { src: `${LOCAL}/bridge/step1.mp4`, durationSeconds: 16.5, trimStartSeconds: 0.12 },
    ],
    // Stage 4: Implant placement (crop bottom overlay UI on some exports)
    journey: [
      {
        src: `${LOCAL}/implant/step1.mp4`,
        durationSeconds: 19.4,
        crop: { bottom: 0.08 },
        trimStartSeconds: 0.12,
      },
      {
        src: `${LOCAL}/implant/step2.mp4`,
        durationSeconds: 16.6,
        crop: { bottom: 0.08 },
        trimStartSeconds: 0.12,
      },
    ],
    // Stage 5: Restoration — crown prep + full arch placement
    whatToExpect: [
      { src: `${LOCAL}/crown/step2.mp4`, durationSeconds: 9.1, trimStartSeconds: 0.12 },
    ],
    // Stage 6: Final Outcome — beautiful smile
    outcome: [
      { src: `${LOCAL}/crown/outcome.mp4`, durationSeconds: 9.0, trimStartSeconds: 0.1 },
    ],
  },

  // ── Orthodontic treatments ──────────────────────────────────

  braces: {
    treatment: [
      { src: `${LOCAL}/braces/step1.mp4`, durationSeconds: 8.7 },
    ],
    deepDive: [
      { src: `${LOCAL}/braces/step1.mp4`, durationSeconds: 8.7 },
    ],
    outcome: [SHARED_OUTCOME],
  },
  invisalign: {
    treatment: [
      { src: `${LOCAL}/invisalign/step1.mp4`, durationSeconds: 22 },
    ],
    deepDive: [
      { src: `${LOCAL}/invisalign/step1.mp4`, durationSeconds: 22 },
    ],
    outcome: [SHARED_OUTCOME],
  },
  ceramic_braces: {
    treatment: [
      { src: `${LOCAL}/ceramic_braces/step1.mp4`, durationSeconds: 2.3 },
    ],
    deepDive: [
      { src: `${LOCAL}/ceramic_braces/step1.mp4`, durationSeconds: 2.3 },
    ],
    outcome: [SHARED_OUTCOME],
  },
  lingual_braces: {
    treatment: [
      { src: `${LOCAL}/lingual_braces/step1.mp4`, durationSeconds: 26.5 },
    ],
    deepDive: [
      { src: `${LOCAL}/lingual_braces/step1.mp4`, durationSeconds: 26.5 },
    ],
    outcome: [SHARED_OUTCOME],
  },
  expander: {
    treatment: [
      { src: `${LOCAL}/expander/step1.mp4`, durationSeconds: 9.6 },
    ],
    deepDive: [
      { src: `${LOCAL}/expander/step1.mp4`, durationSeconds: 9.6 },
    ],
    outcome: [SHARED_OUTCOME],
  },
  retainer: {
    treatment: [
      { src: `${LOCAL}/retainer/step1.mp4`, durationSeconds: 36.3 },
    ],
    deepDive: [
      { src: `${LOCAL}/retainer/step1.mp4`, durationSeconds: 36.3 },
    ],
    outcome: [SHARED_OUTCOME],
  },
  jaw_surgery: {
    treatment: [
      { src: `${LOCAL}/jaw_surgery/step1.mp4`, durationSeconds: 22.8 },
    ],
    deepDive: [
      { src: `${LOCAL}/jaw_surgery/step1.mp4`, durationSeconds: 22.8 },
    ],
    outcome: [SHARED_OUTCOME],
  },
};

export type DentalSceneType = "problem" | "treatment" | "outcome" | "deepDive" | "journey" | "whatToExpect";

/**
 * Get video clips for a given treatment and scene type.
 * Returns undefined when no clips exist for that scene — no fallback.
 * Callers should fall back to SVG/static visuals when undefined is returned.
 */
export function getDentalVideoClips(
  treatment: string,
  scene: DentalSceneType
): VideoClipInfo[] | undefined {
  const assets = dentalVideoMap[treatment];
  if (!assets) return undefined;
  return assets[scene];
}

/**
 * Check whether a treatment has any dental video assets at all.
 */
export function hasDentalVideo(treatment: string): boolean {
  return treatment in dentalVideoMap;
}

/**
 * Get the first available video clip for a treatment+scene.
 */
export function getFirstDentalClip(
  treatment: string,
  scene: DentalSceneType
): VideoClipInfo | undefined {
  const clips = getDentalVideoClips(treatment, scene);
  return clips?.[0];
}
