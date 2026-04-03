/**
 * Shared hero visual dimensions — one size system so clips aren’t over-cropped
 * and layout stays consistent across scenes.
 */
export const HERO_VISUAL_WIDTH = 800;
export const HERO_VISUAL_HEIGHT = 610;

export const HERO_VISUAL_BOX_STYLE = {
  width: HERO_VISUAL_WIDTH,
  height: HERO_VISUAL_HEIGHT,
} as const;

export const HERO_VISUAL_MAX_STYLE = {
  maxWidth: HERO_VISUAL_WIDTH,
  maxHeight: HERO_VISUAL_HEIGHT,
} as const;

/** Premium diagram / deep-dive panels — slightly wider */
export const DEEP_DIVE_VISUAL_WIDTH = 820;
export const DEEP_DIVE_VISUAL_HEIGHT = 620;

/** Before/after slider — slightly wider than hero for side-by-side clarity */
export const BEFORE_AFTER_WIDTH = 960;
export const BEFORE_AFTER_HEIGHT = 620;
