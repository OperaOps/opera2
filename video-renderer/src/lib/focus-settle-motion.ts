import { Easing, interpolate } from "remotion";

/** Which side the visual column sits on in the final layout. */
export type FocusSettleSide = "left" | "right";

export type FocusSettleExplainResult = {
  enabled: boolean;
  /** Horizontal offset from final layout (% of self), positive = rightward. */
  translateXPercent: number;
  /** Multiplier applied on top of base scale (final rest = 1). */
  scaleMul: number;
  /** Opacity for the text column (badge + heading + bullets). */
  textColumnOpacity: number;
  /** Frame index after focus+settle completes (explain can start). */
  motionEndFrame: number;
};

const DEFAULT_FOCUS_SEC = 0.52;
const DEFAULT_SETTLE_SEC = 0.62;
const DEFAULT_EXPLAIN_FADE_SEC = 0.52;

/**
 * Focus → settle → explain: premium entrance for key FMR stages only.
 * Uses transform-only motion; final rest matches existing layout (translate 0, scaleMul 1).
 */
export function getFocusSettleExplain(
  frame: number,
  fps: number,
  side: FocusSettleSide,
  enabled: boolean,
  opts?: {
    focusSec?: number;
    settleSec?: number;
    explainFadeSec?: number;
  }
): FocusSettleExplainResult {
  const baseTextOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });

  if (!enabled) {
    return {
      enabled: false,
      translateXPercent: 0,
      scaleMul: 1,
      textColumnOpacity: baseTextOpacity,
      motionEndFrame: 0,
    };
  }

  const focusSec = opts?.focusSec ?? DEFAULT_FOCUS_SEC;
  const settleSec = opts?.settleSec ?? DEFAULT_SETTLE_SEC;
  const explainFadeSec = opts?.explainFadeSec ?? DEFAULT_EXPLAIN_FADE_SEC;

  const focusFrames = Math.max(1, Math.round(focusSec * fps));
  const settleFrames = Math.max(1, Math.round(settleSec * fps));
  const motionEnd = focusFrames + settleFrames;
  const dir = side === "left" ? 1 : -1;

  let translateXPercent = 0;
  let scaleMul = 1;

  if (frame < focusFrames) {
    translateXPercent = interpolate(
      frame,
      [0, focusFrames],
      [11 * dir, 6 * dir],
      { easing: Easing.inOut(Easing.cubic), extrapolateRight: "clamp" }
    );
    scaleMul = interpolate(frame, [0, focusFrames], [1.09, 1.065], {
      easing: Easing.inOut(Easing.cubic),
      extrapolateRight: "clamp",
    });
  } else if (frame < motionEnd) {
    translateXPercent = interpolate(
      frame,
      [focusFrames, motionEnd],
      [6 * dir, 0],
      { easing: Easing.inOut(Easing.cubic), extrapolateRight: "clamp" }
    );
    scaleMul = interpolate(frame, [focusFrames, motionEnd], [1.065, 1], {
      easing: Easing.inOut(Easing.cubic),
      extrapolateRight: "clamp",
    });
  }

  const explainFrames = Math.max(1, Math.round(explainFadeSec * fps));
  const textColumnOpacity = interpolate(
    frame,
    [motionEnd, motionEnd + explainFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return {
    enabled: true,
    translateXPercent,
    scaleMul,
    textColumnOpacity,
    motionEndFrame: motionEnd,
  };
}
