import { DEFAULT_FPS } from "./schema";

/** Convert seconds to frame count — always rounds UP to avoid audio cutoff */
export function secondsToFrames(seconds: number, fps = DEFAULT_FPS): number {
  return Math.ceil(seconds * fps);
}

/** Convert frames to seconds */
export function framesToSeconds(frames: number, fps = DEFAULT_FPS): number {
  return frames / fps;
}

/**
 * Calculate scene frame ranges from scene durations.
 * Returns an array of { startFrame, endFrame } for each scene.
 */
export function calculateSceneFrames(
  sceneDurations: number[],
  fps = DEFAULT_FPS
): { startFrame: number; endFrame: number; durationFrames: number }[] {
  let currentFrame = 0;
  return sceneDurations.map((seconds) => {
    const durationFrames = secondsToFrames(seconds, fps);
    const range = {
      startFrame: currentFrame,
      endFrame: currentFrame + durationFrames,
      durationFrames,
    };
    currentFrame += durationFrames;
    return range;
  });
}

/**
 * Buffer (in seconds) appended to the total duration to prevent audio cutoff.
 * TTS engines produce audio slightly longer than estimated due to natural
 * speech pacing, pauses, and trailing silence. 1 second is enough to
 * absorb this drift without introducing dead air at the end.
 */
export const AUDIO_BUFFER_SECONDS = 3;

/** Total frames for all scenes */
export function totalDurationFrames(
  sceneDurations: number[],
  fps = DEFAULT_FPS
): number {
  return sceneDurations.reduce(
    (total, sec) => total + secondsToFrames(sec, fps),
    0
  );
}

/**
 * Total frames for all scenes plus an audio safety buffer.
 * Use this when calculating composition duration for rendering
 * to ensure TTS audio is never cut off.
 */
export function totalDurationFramesWithBuffer(
  sceneDurations: number[],
  fps = DEFAULT_FPS,
  bufferSeconds: number = AUDIO_BUFFER_SECONDS
): number {
  return totalDurationFrames(sceneDurations, fps) + secondsToFrames(bufferSeconds, fps);
}

/** Ease functions for smooth transitions */
export const EASE = {
  fadeIn: 12, // frames for standard fade-in
  fadeOut: 10,
  slideUp: 18,
  scaleIn: 15,
  stagger: 6, // delay between staggered elements
} as const;
