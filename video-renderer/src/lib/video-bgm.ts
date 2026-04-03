import { interpolate } from "remotion";

/**
 * Default instrumental bed under narration (public/ path, resolved with staticFile()).
 * Place your track at public/audio/opera-bgm.m4a (or override via props / OPERA_BGM_URL).
 */
export const DEFAULT_BGM_PUBLIC_PATH = "audio/opera-bgm.m4a";

/**
 * Bed under voice — fade in/out with composition; ducking is light so narration stays primary.
 */
export function standardBgmVolume(
  frame: number,
  fps: number,
  totalFrames: number
): number {
  const base = 0.14;
  let v = base;
  v *= interpolate(frame, [0, 2 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  v *= interpolate(
    frame,
    [totalFrames - 6 * fps, totalFrames - 1],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  return Math.min(0.2, Math.max(0, v));
}
