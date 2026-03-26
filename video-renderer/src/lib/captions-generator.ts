/**
 * captions-generator.ts
 *
 * Produces frame-accurate caption entries from a generated video script.
 *
 * PRIMARY approach (generateCaptionsFromAlignment): Uses real character-level
 * timing data from ElevenLabs' with-timestamps API. Each caption chunk is
 * mapped to its exact spoken time range — no estimation or guessing.
 *
 * FALLBACK approach (generateCaptions / generatePremiumCaptions): Estimates
 * timing from word counts when alignment data is unavailable.
 */

import type { GeneratedScript, PremiumGeneratedScript } from "./script-generator";
import type { TTSAlignment } from "./tts";
import { secondsToFrames } from "./timing";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type CaptionEntry = {
  text: string;
  startFrame: number;
  endFrame: number;
};

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Target number of words per caption chunk. */
const MIN_WORDS_PER_CHUNK = 6;
const MAX_WORDS_PER_CHUNK = 10;

/**
 * Pause frames to add between scenes to account for the TTS pause marker
 * ("... ") that's inserted between scene narrations. This keeps captions
 * in sync with the actual audio pacing.
 */
const INTER_SCENE_PAUSE_FRAMES = 18; // ~0.6s at 30fps

/**
 * Initial delay frames before captions start in each scene.
 * TTS has a slight ramp-up at the start of each scene's narration.
 */
const SCENE_START_DELAY_FRAMES = 6; // ~0.2s at 30fps

/** Ordered scene keys matching video playback order. */
const SCENE_ORDER: ReadonlyArray<keyof GeneratedScript["scenes"]> = [
  "intro",
  "problem",
  "treatment",
  "outcome",
  "cta",
];

// ---------------------------------------------------------------------------
// Text chunking
// ---------------------------------------------------------------------------

/**
 * Splits narration text into display-friendly chunks of 6-10 words.
 * Attempts to break at natural phrase boundaries (commas, conjunctions,
 * prepositions) for better readability.
 */
function splitNarrationIntoChunks(narration: string): string[] {
  const words = narration.split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];

  // For very short narrations, return as a single chunk
  if (words.length <= MAX_WORDS_PER_CHUNK) {
    return [words.join(" ")];
  }

  const chunks: string[] = [];
  let i = 0;

  while (i < words.length) {
    const remaining = words.length - i;

    // If the remainder fits in one chunk, take it all
    if (remaining <= MAX_WORDS_PER_CHUNK) {
      chunks.push(words.slice(i, words.length).join(" "));
      break;
    }

    // If the remainder would leave a tiny orphan, adjust
    if (remaining <= MAX_WORDS_PER_CHUNK + MIN_WORDS_PER_CHUNK) {
      // Split roughly in half to avoid an orphan
      const half = Math.ceil(remaining / 2);
      const splitPoint = findBestBreak(words, i, half);
      chunks.push(words.slice(i, splitPoint).join(" "));
      i = splitPoint;
      continue;
    }

    // Normal case: grab 6-10 words, prefer a natural break point
    const splitPoint = findBestBreak(words, i, MAX_WORDS_PER_CHUNK);
    chunks.push(words.slice(i, splitPoint).join(" "));
    i = splitPoint;
  }

  return chunks;
}

/**
 * Finds the best break point within a window of words.
 * Prefers breaking after punctuation (commas, dashes, semicolons) or
 * before conjunctions/prepositions for natural phrasing.
 */
function findBestBreak(
  words: string[],
  start: number,
  targetLength: number
): number {
  const end = Math.min(start + targetLength, words.length);
  const searchStart = Math.max(start + MIN_WORDS_PER_CHUNK, start);

  // Look backwards from the target end for a good break point
  for (let j = end; j >= searchStart; j--) {
    const prevWord = words[j - 1];
    // Break after words that end with punctuation
    if (prevWord && /[,;:\u2014\u2013\-]$/.test(prevWord)) {
      return j;
    }
  }

  // Look for a break before common conjunctions/prepositions
  for (let j = end; j >= searchStart; j--) {
    const word = words[j];
    if (
      word &&
      /^(and|but|or|so|for|nor|yet|the|a|an|in|on|at|to|with|from|by|that|which|who|when|where|if|as|then|than|into|over|after|before|during|through)$/i.test(
        word
      )
    ) {
      return j;
    }
  }

  // No natural break found — just use the target length
  return end;
}

// ---------------------------------------------------------------------------
// Main caption generator
// ---------------------------------------------------------------------------

/**
 * Generates frame-accurate caption entries from a video script.
 *
 * Each scene's narration is split into readable chunks of 6-10 words,
 * which are evenly distributed across the scene's frame range. Scenes
 * are laid out sequentially based on their `durationSeconds` values.
 *
 * @param scenes - The scenes object from a `GeneratedScript`.
 * @param fps - Frames per second of the output video (default: 30).
 * @returns An ordered array of caption entries with frame-accurate timing.
 *
 * @example
 * ```ts
 * import { generateCaptions } from "./captions-generator";
 * import { DEFAULT_FPS } from "./schema";
 *
 * const captions = generateCaptions(script.scenes, DEFAULT_FPS);
 * // [
 * //   { text: "Hi Sarah, this is a quick", startFrame: 0, endFrame: 63 },
 * //   { text: "message from Dr. Martinez and", startFrame: 63, endFrame: 126 },
 * //   ...
 * // ]
 * ```
 */
export function generateCaptions(
  scenes: GeneratedScript["scenes"],
  fps: number = 30
): CaptionEntry[] {
  const captions: CaptionEntry[] = [];
  let currentFrame = 0;
  let isFirstScene = true;

  for (const sceneKey of SCENE_ORDER) {
    const scene = scenes[sceneKey];
    if (!scene || !scene.narration) continue;

    // Add inter-scene pause offset (accounts for TTS "..." pause between scenes)
    if (!isFirstScene) {
      currentFrame += INTER_SCENE_PAUSE_FRAMES;
    }
    isFirstScene = false;

    const sceneDurationFrames = secondsToFrames(scene.durationSeconds, fps) - INTER_SCENE_PAUSE_FRAMES;
    const sceneStartFrame = currentFrame + SCENE_START_DELAY_FRAMES;
    const sceneEndFrame = currentFrame + sceneDurationFrames;

    const chunks = splitNarrationIntoChunks(scene.narration);

    if (chunks.length === 0) {
      currentFrame = sceneEndFrame;
      continue;
    }

    // Distribute chunks evenly across the scene's frame range.
    // We use word count proportional distribution so longer chunks
    // get proportionally more time on screen.
    const availableFrames = sceneEndFrame - sceneStartFrame;
    const chunkWordCounts = chunks.map(
      (c) => c.split(/\s+/).filter(Boolean).length
    );
    const totalWords = chunkWordCounts.reduce((sum, wc) => sum + wc, 0);

    let frameOffset = sceneStartFrame;

    for (let i = 0; i < chunks.length; i++) {
      const proportion = totalWords > 0 ? chunkWordCounts[i] / totalWords : 1 / chunks.length;
      const chunkFrames = Math.round(availableFrames * proportion);

      const startFrame = frameOffset;
      const endFrame =
        i === chunks.length - 1
          ? sceneEndFrame
          : Math.min(frameOffset + chunkFrames, sceneEndFrame);

      captions.push({
        text: chunks[i],
        startFrame,
        endFrame,
      });

      frameOffset = endFrame;
    }

    currentFrame = sceneEndFrame;
  }

  return captions;
}

// ---------------------------------------------------------------------------
// Premium caption generator (8 scenes)
// ---------------------------------------------------------------------------

/** Ordered scene keys for premium 8-scene videos. */
const PREMIUM_SCENE_ORDER: ReadonlyArray<keyof PremiumGeneratedScript["scenes"]> = [
  "intro",
  "problem",
  "deepDive",
  "treatment",
  "journey",
  "outcome",
  "whatToExpect",
  "cta",
];

/**
 * Generates frame-accurate caption entries from a premium 8-scene video script.
 *
 * Same logic as `generateCaptions` but handles the 8-scene premium structure
 * (intro, problem, deepDive, treatment, journey, outcome, whatToExpect, cta).
 *
 * @param scenes - The scenes object from a `PremiumGeneratedScript`.
 * @param fps - Frames per second of the output video (default: 30).
 * @returns An ordered array of caption entries with frame-accurate timing.
 */
export function generatePremiumCaptions(
  scenes: PremiumGeneratedScript["scenes"],
  fps: number = 30
): CaptionEntry[] {
  const captions: CaptionEntry[] = [];
  let currentFrame = 0;
  let isFirstScene = true;

  for (const sceneKey of PREMIUM_SCENE_ORDER) {
    const scene = scenes[sceneKey];
    if (!scene || !scene.narration) continue;

    // Add inter-scene pause offset (accounts for TTS "..." pause between scenes)
    if (!isFirstScene) {
      currentFrame += INTER_SCENE_PAUSE_FRAMES;
    }
    isFirstScene = false;

    const sceneDurationFrames = secondsToFrames(scene.durationSeconds, fps) - INTER_SCENE_PAUSE_FRAMES;
    const sceneStartFrame = currentFrame + SCENE_START_DELAY_FRAMES;
    const sceneEndFrame = currentFrame + sceneDurationFrames;

    const chunks = splitNarrationIntoChunks(scene.narration);

    if (chunks.length === 0) {
      currentFrame = sceneEndFrame;
      continue;
    }

    const availableFrames = sceneEndFrame - sceneStartFrame;
    const chunkWordCounts = chunks.map(
      (c) => c.split(/\s+/).filter(Boolean).length
    );
    const totalWords = chunkWordCounts.reduce((sum, wc) => sum + wc, 0);

    let frameOffset = sceneStartFrame;

    for (let i = 0; i < chunks.length; i++) {
      const proportion =
        totalWords > 0 ? chunkWordCounts[i] / totalWords : 1 / chunks.length;
      const chunkFrames = Math.round(availableFrames * proportion);

      const startFrame = frameOffset;
      const endFrame =
        i === chunks.length - 1
          ? sceneEndFrame
          : Math.min(frameOffset + chunkFrames, sceneEndFrame);

      captions.push({
        text: chunks[i],
        startFrame,
        endFrame,
      });

      frameOffset = endFrame;
    }

    currentFrame = sceneEndFrame;
  }

  return captions;
}

// ---------------------------------------------------------------------------
// Alignment-based caption generator (uses real TTS timing)
// ---------------------------------------------------------------------------

/**
 * Generates captions from real character-level alignment data returned by
 * the ElevenLabs with-timestamps API. This is fundamentally more accurate
 * than estimation because it uses the actual spoken timing.
 *
 * The algorithm:
 * 1. Split the full narration into display chunks (6-10 words)
 * 2. For each chunk, find where it starts and ends in the original text
 * 3. Look up the real start/end time from the alignment data
 * 4. Convert seconds → frames
 */
export function generateCaptionsFromAlignment(
  narrationText: string,
  alignment: TTSAlignment,
  fps: number = 30
): CaptionEntry[] {
  const captions: CaptionEntry[] = [];

  // Split the full narration into display chunks
  const chunks = splitNarrationIntoChunks(narrationText);
  if (chunks.length === 0) return [];

  const charStarts = alignment.character_start_times_seconds;
  const charEnds = alignment.character_end_times_seconds;

  // Walk through the original text finding each chunk's position
  let searchFrom = 0;

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];

    // Find this chunk's position in the narration text
    const chunkPos = findChunkPosition(narrationText, chunk, searchFrom);

    if (chunkPos === -1) {
      continue;
    }

    const chunkEndPos = chunkPos + chunk.length - 1;

    // Find the first non-space character's start time
    let startTime = 0;
    for (let c = chunkPos; c <= chunkEndPos && c < charStarts.length; c++) {
      if (narrationText[c] && !/\s/.test(narrationText[c])) {
        startTime = charStarts[c];
        break;
      }
    }

    // Find the last non-space character's end time
    let endTime = startTime + 0.5;
    for (let c = Math.min(chunkEndPos, charEnds.length - 1); c >= chunkPos; c--) {
      if (narrationText[c] && !/\s/.test(narrationText[c])) {
        endTime = charEnds[c];
        break;
      }
    }

    const startFrame = Math.round(startTime * fps);
    // Small buffer so caption doesn't vanish the instant the last word ends
    const endFrame = Math.round((endTime + 0.08) * fps);

    captions.push({
      text: chunk,
      startFrame,
      endFrame: Math.max(endFrame, startFrame + Math.round(fps * 0.3)),
    });

    searchFrom = chunkEndPos + 1;
  }

  // Close gaps: extend each caption to meet the next one so there's
  // no flicker of blank screen between consecutive captions
  for (let i = 0; i < captions.length - 1; i++) {
    if (captions[i].endFrame < captions[i + 1].startFrame) {
      captions[i].endFrame = captions[i + 1].startFrame;
    }
  }

  return captions;
}

/**
 * Finds the position of a chunk in the narration text, handling
 * whitespace normalization differences between original and chunked text.
 */
function findChunkPosition(
  text: string,
  chunk: string,
  searchFrom: number
): number {
  // Try direct match first
  const directPos = text.indexOf(chunk, searchFrom);
  if (directPos !== -1) return directPos;

  // Word-by-word fallback for whitespace mismatches
  const chunkWords = chunk.split(/\s+/).filter(Boolean);
  if (chunkWords.length === 0) return -1;

  const firstWord = chunkWords[0];
  let pos = searchFrom;

  while (pos < text.length) {
    const wordStart = text.indexOf(firstWord, pos);
    if (wordStart === -1) return -1;

    let valid = true;
    let checkPos = wordStart;

    for (const word of chunkWords) {
      while (checkPos < text.length && /\s/.test(text[checkPos])) {
        checkPos++;
      }
      if (text.substring(checkPos, checkPos + word.length) !== word) {
        valid = false;
        break;
      }
      checkPos += word.length;
    }

    if (valid) return wordStart;
    pos = wordStart + 1;
  }

  return -1;
}
