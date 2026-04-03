/**
 * Single “premium clinical” look for all raster/video/still content.
 * Subtle only — no heavy stylization.
 */

/** CSS filter on the media layer (slightly desaturated, lifted mids, cool-neutral). */
export const VISUAL_STANDARD_FILTER =
  "saturate(0.93) contrast(1.045) brightness(1.01)";

/** Very light cool wash (medical / neutral), soft-light so it converges real + synthetic. */
export const VISUAL_STANDARD_TONE_OVERLAY =
  "linear-gradient(195deg, rgba(210, 225, 245, 0.07) 0%, transparent 42%, rgba(12, 22, 38, 0.05) 100%)";

/** Inset vignette — edge softness only, not a heavy letterbox. */
export const VISUAL_STANDARD_INSET_SHADOW =
  "inset 0 0 100px rgba(0, 0, 0, 0.14), inset 0 0 28px rgba(0, 0, 0, 0.08)";

// --- Motion: one language across CinematicImage effects (slow / subtle) ---

export const MOTION_KEN_BURNS_IN = { scaleFrom: 1.0, scaleTo: 1.07 } as const;
export const MOTION_KEN_BURNS_OUT = { scaleFrom: 1.07, scaleTo: 1.0 } as const;
export const MOTION_PAN_BASE_SCALE = 1.06;
export const MOTION_PAN_TX_RANGE = 4.5;
