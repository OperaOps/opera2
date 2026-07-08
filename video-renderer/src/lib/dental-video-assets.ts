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
  treatment?: VideoClipInfo[];
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
    problem: [
      { src: `${LOCAL}/crown/problem.mp4`, durationSeconds: 8.0 },
    ],
    deepDive: [
      { src: `${LOCAL}/crown/step2.mp4`, durationSeconds: 9.1 },
    ],
    treatment: [
      { src: `${LOCAL}/crown/step1.mp4`, durationSeconds: 13.5 },
    ],
    outcome: [
      { src: `${LOCAL}/crown/outcome.mp4`, durationSeconds: 9.0 },
    ],
  },
  filling: {
    problem: [
      { src: `${LOCAL}/filling/cavity.mp4`, durationSeconds: 8.0 },
    ],
    deepDive: [
      { src: `${LOCAL}/filling/step2.mp4`, durationSeconds: 17.4 },
    ],
    treatment: [
      { src: `${LOCAL}/filling/step1.mp4`, durationSeconds: 9.4 },
    ],
    whatToExpect: [
      { src: `${LOCAL}/filling/cure.mp4`, durationSeconds: 8.0 },
    ],
    outcome: [
      { src: `${LOCAL}/braces/outcome.mp4`, durationSeconds: 8.0 },
    ],
  },
  implant: {
    deepDive: [
      { src: `${LOCAL}/implant/step2.mp4`, durationSeconds: 16.6 },
    ],
    treatment: [
      { src: `${LOCAL}/implant/step1.mp4`, durationSeconds: 19.4 },
    ],
    outcome: [
      { src: `${LOCAL}/braces/outcome.mp4`, durationSeconds: 8.0 },
    ],
  },
  whitening: {
    deepDive: [
      { src: `${LOCAL}/whitening/step2.mp4`, durationSeconds: 22.5 },
    ],
    treatment: [
      { src: `${LOCAL}/whitening/step1.mp4`, durationSeconds: 11.2 },
    ],
    outcome: [
      { src: `${LOCAL}/braces/outcome.mp4`, durationSeconds: 8.0 },
    ],
  },
  // Veneers — full Seedance flagship set (navy/cyan style), one unique clip per beat.
  veneers: {
    problem: [
      { src: `${LOCAL}/veneers/veneers-smile-overview.mp4`, durationSeconds: 8.0 },
    ],
    deepDive: [
      { src: `${LOCAL}/veneers/veneers-shell-reveal.mp4`, durationSeconds: 8.0 },
      { src: `${LOCAL}/veneers/veneers-shade-and-scan.mp4`, durationSeconds: 8.0 },
    ],
    treatment: [
      { src: `${LOCAL}/veneers/veneers-minimal-prep.mp4`, durationSeconds: 8.0 },
      { src: `${LOCAL}/veneers/veneers-etch-and-bond.mp4`, durationSeconds: 8.0 },
      { src: `${LOCAL}/veneers/veneers-seat-first.mp4`, durationSeconds: 8.0 },
    ],
    journey: [
      { src: `${LOCAL}/veneers/veneers-seat-brighten.mp4`, durationSeconds: 8.0 },
    ],
    whatToExpect: [
      { src: `${LOCAL}/veneers/veneers-cure-bond.mp4`, durationSeconds: 8.0 },
    ],
    outcome: [
      { src: `${LOCAL}/veneers/veneers-finished-smile.mp4`, durationSeconds: 4.3 },
    ],
  },
  root_canal: {
    problem: [
      { src: `${LOCAL}/root_canal/problem.mp4`, durationSeconds: 15.1 },
    ],
    deepDive: [
      { src: `${LOCAL}/root_canal/nerve.mp4`, durationSeconds: 8.0 },
    ],
    treatment: [
      { src: `${LOCAL}/root_canal/treatment.mp4`, durationSeconds: 18 },
    ],
    outcome: [
      { src: `${LOCAL}/braces/outcome.mp4`, durationSeconds: 8.0 },
    ],
  },
  extraction: {
    problem: [
      { src: `${LOCAL}/crown/problem.mp4`, durationSeconds: 8.0 },
    ],
    treatment: [
      { src: `${LOCAL}/extraction/step1.mp4`, durationSeconds: 12.5 },
    ],
    outcome: [
      { src: `${LOCAL}/braces/outcome.mp4`, durationSeconds: 8.0 },
    ],
  },
  bridge: {
    deepDive: [
      { src: `${LOCAL}/bridge/unit.mp4`, durationSeconds: 8.0 },
    ],
    treatment: [
      { src: `${LOCAL}/bridge/step1.mp4`, durationSeconds: 16.5 },
    ],
    outcome: [
      { src: `${LOCAL}/braces/outcome.mp4`, durationSeconds: 8.0 },
    ],
  },
  // dentures: removed from the offered treatment list.
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
        crop: { right: 0.12, bottom: 0.12 },
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
        crop: { bottom: 0.15, right: 0.12 },
        trimStartSeconds: 0.12,
      },
      {
        src: `${LOCAL}/implant/step2.mp4`,
        durationSeconds: 16.6,
        crop: { bottom: 0.15, right: 0.12 },
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

  // Braces — full Veo set (clean 3D medical animation), one unique clip per beat.
  braces: {
    problem: [
      { src: `${LOCAL}/braces/problem-v2.mp4`, durationSeconds: 8.0 },
    ],
    deepDive: [
      { src: `${LOCAL}/braces/deep-dive.mp4`, durationSeconds: 8.0 },
    ],
    treatment: [
      { src: `${LOCAL}/braces/treatment-v2.mp4`, durationSeconds: 8.0 },
    ],
    outcome: [
      { src: `${LOCAL}/braces/outcome.mp4`, durationSeconds: 8.0 },
    ],
  },
  invisalign: {
    problem: [
      { src: `${LOCAL}/invisalign/problem.mp4`, durationSeconds: 8.0 },
    ],
    deepDive: [
      { src: `${LOCAL}/invisalign/tray.mp4`, durationSeconds: 8.0 },
    ],
    treatment: [
      { src: `${LOCAL}/invisalign/on-teeth.mp4`, durationSeconds: 7.3 },
    ],
    journey: [
      { src: `${LOCAL}/invisalign/series.mp4`, durationSeconds: 7.0 },
    ],
    whatToExpect: [
      { src: `${LOCAL}/invisalign/case.mp4`, durationSeconds: 8.0 },
    ],
    outcome: [
      { src: `${LOCAL}/braces/outcome.mp4`, durationSeconds: 8.0 },
    ],
  },
  // Ceramic braces — comparison + smile clips, reuses braces problem/outcome beats.
  ceramic_braces: {
    problem: [
      { src: `${LOCAL}/braces/problem-v2.mp4`, durationSeconds: 8.0 },
    ],
    deepDive: [
      { src: `${LOCAL}/ceramic_braces/comparison.mp4`, durationSeconds: 8.0 },
    ],
    whatToExpect: [
      { src: `${LOCAL}/ceramic_braces/smile.mp4`, durationSeconds: 8.0 },
    ],
    outcome: [
      { src: `${LOCAL}/braces/outcome.mp4`, durationSeconds: 8.0 },
    ],
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
  // Palatal expander — full Veo set, narrow arch → device → in place → widened arch.
  expander: {
    problem: [
      { src: `${LOCAL}/expander/narrow.mp4`, durationSeconds: 8.0 },
    ],
    deepDive: [
      { src: `${LOCAL}/expander/device.mp4`, durationSeconds: 8.0 },
    ],
    treatment: [
      { src: `${LOCAL}/expander/in-place.mp4`, durationSeconds: 8.0 },
    ],
    outcome: [
      { src: `${LOCAL}/expander/wide.mp4`, durationSeconds: 8.0 },
    ],
  },
  // Retainer — problem beat shows the straight post-braces smile worth protecting.
  retainer: {
    problem: [
      { src: `${LOCAL}/braces/outcome.mp4`, durationSeconds: 8.0 },
    ],
    deepDive: [
      { src: `${LOCAL}/retainer/hawley.mp4`, durationSeconds: 8.0 },
    ],
    treatment: [
      { src: `${LOCAL}/retainer/on-teeth.mp4`, durationSeconds: 8.0 },
    ],
    whatToExpect: [
      { src: `${LOCAL}/retainer/morning.mp4`, durationSeconds: 8.0 },
    ],
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
