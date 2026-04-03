import { interpolate } from "remotion";

export type BgmMilestones = {
  journeyStartFrame: number;
  outcomeStartFrame: number;
  whatToExpectEndFrame: number;
  totalFrames: number;
};

/**
 * Bed ~12–18% under narration; fades in/out; slightly louder during implant/restoration arc,
 * slightly softer during outcome — keeps voice primary.
 */
export function premiumBgmVolume(
  frame: number,
  fps: number,
  m: BgmMilestones
): number {
  const base = 0.14;
  let v = base;

  v *= interpolate(frame, [0, 2 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  v *= interpolate(
    frame,
    [m.totalFrames - 6 * fps, m.totalFrames - 1],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  if (frame >= m.journeyStartFrame && frame < m.outcomeStartFrame) {
    v *= 1.12;
  }
  if (frame >= m.outcomeStartFrame && frame < m.whatToExpectEndFrame) {
    v *= 0.9;
  }

  return Math.min(0.2, Math.max(0, v));
}
