/**
 * tts.ts
 *
 * Text-to-speech integration using the ElevenLabs API.
 * Converts narration text into natural-sounding speech audio (MP3)
 * for patient education videos.
 */

import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { writeFile, unlink } from "node:fs/promises";
import type { GeneratedScript, PremiumGeneratedScript } from "./script-generator";

const execFileAsync = promisify(execFile);

/** True duration of an audio file (seconds). Requires ffprobe on PATH (Docker + local dev). */
export async function probeAudioFileDurationSeconds(
  audioPath: string
): Promise<number> {
  try {
    const { stdout } = await execFileAsync("ffprobe", [
      "-v",
      "error",
      "-show_entries",
      "format=duration",
      "-of",
      "default=noprint_wrappers=1:nokey=1",
      audioPath,
    ]);
    const v = parseFloat(String(stdout).trim());
    return Number.isFinite(v) && v > 0 ? v : 0;
  } catch {
    return 0;
  }
}

/** Concatenate MP3 chunks with ffmpeg (stream copy). Writes to outputPath and removes chunks. */
async function concatMp3ChunksWithFfmpeg(
  chunkPaths: string[],
  outputPath: string
): Promise<void> {
  if (chunkPaths.length === 0) {
    throw new Error("concatMp3ChunksWithFfmpeg: no chunks");
  }
  if (chunkPaths.length === 1) {
    const { copyFile } = await import("node:fs/promises");
    await copyFile(chunkPaths[0], outputPath);
    await unlink(chunkPaths[0]).catch(() => {});
    return;
  }
  const listPath = outputPath.replace(/\.[^.]+$/, "") + "_concat.txt";
  const body = chunkPaths
    .map((p) => `file '${p.replace(/'/g, `'\\''`)}'`)
    .join("\n");
  await writeFile(listPath, body, "utf8");
  await execFileAsync("ffmpeg", [
    "-y",
    "-f",
    "concat",
    "-safe",
    "0",
    "-i",
    listPath,
    "-c",
    "copy",
    outputPath,
  ]);
  await unlink(listPath).catch(() => {});
  for (const c of chunkPaths) {
    await unlink(c).catch(() => {});
  }
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const ELEVENLABS_BASE = "https://api.elevenlabs.io/v1/text-to-speech";

/** Rachel — warm, professional female voice ideal for healthcare content. */
const DEFAULT_VOICE_ID = "21m00Tcm4TlvDq8ikWAM";

/** Rachel — same warm, professional voice used for both standard and premium. */
const PREMIUM_VOICE_ID = "21m00Tcm4TlvDq8ikWAM";

const DEFAULT_MODEL_ID = "eleven_turbo_v2_5";

const DEFAULT_VOICE_SETTINGS = {
  stability: 0.65,
  similarity_boost: 0.75,
  style: 0.3,
};

/** Approximate words per minute for duration estimation. */
const WORDS_PER_MINUTE = 150;

/** Pause duration in seconds inserted between scenes. */
const PAUSE_SECONDS = 0.5;

/** Maximum characters per single API request before chunking.
 * ElevenLabs supports up to ~10000 chars. Premium 8-scene scripts are typically
 * 3000-6000 chars. Keep this high to avoid chunking (which can cause audio glitches
 * at chunk boundaries). */
const MAX_CHARS_PER_REQUEST = 10000;

/**
 * Pause marker between scenes. A single space lets ElevenLabs treat
 * consecutive sentences naturally — the period at the end of each scene
 * already produces a sentence-ending pause in speech. Ellipsis ("...")
 * causes unnatural trailing-off so we avoid it.
 */
const PAUSE_MARKER = " ";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Character-level alignment data from ElevenLabs with-timestamps API. */
export interface TTSAlignment {
  characters: string[];
  character_start_times_seconds: number[];
  character_end_times_seconds: number[];
}

export interface TTSResult {
  /** Absolute path where the audio file was written. */
  filePath: string;
  /** Estimated audio duration in seconds (based on word count + pauses). */
  estimatedDurationSeconds: number;
  /** Real character-level timing from TTS engine (if available). */
  alignment?: TTSAlignment;
}

export interface TTSChunkResult {
  /** Ordered list of audio chunk file paths that need external concatenation. */
  chunkPaths: string[];
  /** Estimated total duration in seconds. */
  estimatedDurationSeconds: number;
}

// ---------------------------------------------------------------------------
// Narration builder
// ---------------------------------------------------------------------------

/**
 * Concatenates all scene narrations into a single narration string with
 * pause markers (`"... "`) inserted between scenes for natural pacing.
 *
 * @param scenes - The scenes object from a GeneratedScript.
 * @returns A single string of narration text ready for TTS.
 *
 * @example
 * ```ts
 * const text = buildNarrationText(script.scenes);
 * // "Hi Sarah, ... During your visit, ... Here's what ..."
 * ```
 */
export function buildNarrationText(scenes: GeneratedScript["scenes"]): string {
  const sceneOrder: Array<keyof GeneratedScript["scenes"]> = [
    "intro",
    "problem",
    "treatment",
    "outcome",
    "cta",
  ];

  return sceneOrder
    .map((key) => {
      let text = scenes[key].narration.trim();
      if (text && !/[.!?]$/.test(text)) text += ".";
      return text;
    })
    .filter(Boolean)
    .join(PAUSE_MARKER);
}

// ---------------------------------------------------------------------------
// Duration estimation
// ---------------------------------------------------------------------------

function estimateDurationFromText(text: string): number {
  const words = text.split(/\s+/).filter(Boolean).length;
  const speakingSeconds = (words / WORDS_PER_MINUTE) * 60;

  // Count pauses
  const pauseCount = (text.match(/\.\.\.\s/g) || []).length;
  const pauseSeconds = pauseCount * PAUSE_SECONDS;

  return Math.round((speakingSeconds + pauseSeconds) * 10) / 10;
}

// ---------------------------------------------------------------------------
// Chunking
// ---------------------------------------------------------------------------

/**
 * Splits text into chunks at sentence boundaries, each under the
 * character limit for a single API call.
 *
 * Uses a smarter split that avoids breaking on abbreviations like "Dr.",
 * "e.g.", "3.5mm", or "U.S." — only splits on sentence-ending punctuation
 * followed by a space and an uppercase letter (or end of string).
 */
function chunkText(text: string, maxChars: number): string[] {
  if (text.length <= maxChars) return [text];

  // Split on sentence boundaries: period/question/exclamation followed by
  // whitespace and an uppercase letter (start of new sentence).
  // Keeps the punctuation + space with the preceding sentence.
  const sentences: string[] = [];
  let remaining = text;

  // Match: sentence-ending punctuation followed by space + uppercase letter,
  // but NOT after common abbreviations (Dr., Mr., Mrs., Ms., St., vs., etc.)
  const sentenceEndRegex = /(?<!Dr|Mr|Mrs|Ms|St|vs|Jr|Sr|Prof|Rev|Gen|Gov|Sgt|Lt|Col|Cmdr|Capt|Maj|e\.g|i\.e|etc|approx)([.!?]["')]*)\s+(?=[A-Z])/g;
  let lastIndex = 0;
  let match;

  while ((match = sentenceEndRegex.exec(remaining)) !== null) {
    const endPos = match.index + match[1].length;
    sentences.push(remaining.slice(lastIndex, endPos + 1));
    // Skip whitespace after the split
    lastIndex = match.index + match[0].length - 1;
    // The lookahead doesn't consume the uppercase letter, so adjust
    lastIndex = endPos + 1;
    while (lastIndex < remaining.length && remaining[lastIndex] === ' ') lastIndex++;
  }

  if (lastIndex < remaining.length) {
    sentences.push(remaining.slice(lastIndex));
  }

  if (sentences.length === 0) return [text];

  const chunks: string[] = [];
  let current = "";

  for (const sentence of sentences) {
    if (current.length + sentence.length > maxChars && current.length > 0) {
      chunks.push(current.trim());
      current = "";
    }
    current += (current ? " " : "") + sentence.trim();
  }

  if (current.trim().length > 0) {
    chunks.push(current.trim());
  }

  return chunks;
}

// ---------------------------------------------------------------------------
// TTS text sanitization — prevent audio glitches
// ---------------------------------------------------------------------------

function sanitizeForTTS(text: string): string {
  return text
    // "0.3mm" → "point three millimeters"
    .replace(/(\d+)\.(\d+)\s*mm/g, (_, a, b) => {
      const whole = a === "0" ? "" : `${a} and `;
      return `${whole}point ${numberWord(b)} millimeters`;
    })
    // "0.3-0.5mm" → "point three to point five millimeters"
    .replace(/(\d+)\.(\d+)\s*-\s*(\d+)\.(\d+)\s*mm/g, (_, a, b, c, d) => {
      const left = a === "0" ? `point ${numberWord(b)}` : `${a} point ${numberWord(b)}`;
      const right = c === "0" ? `point ${numberWord(d)}` : `${c} point ${numberWord(d)}`;
      return `${left} to ${right} millimeters`;
    })
    // "#8" → "tooth number eight" (dental tooth numbers)
    .replace(/#(\d{1,2})\b/g, (_, n) => `tooth number ${n}`)
    // "A1C 6.8" → "A1C of six point eight"
    .replace(/A1C\s+(\d+)\.(\d+)/g, (_, a, b) => `A1C of ${a} point ${b}`)
    // "8.9%" → "eight point nine percent"
    .replace(/(\d+)\.(\d+)%/g, (_, a, b) => `${a} point ${b} percent`)
    // "$5,200" → "five thousand two hundred dollars" — leave as-is, TTS handles currency well
    // Remove any remaining problematic patterns
    .replace(/\s+/g, " ")
    .trim();
}

function numberWord(d: string): string {
  const words: Record<string, string> = {
    "0": "zero", "1": "one", "2": "two", "3": "three", "4": "four",
    "5": "five", "6": "six", "7": "seven", "8": "eight", "9": "nine",
  };
  return d.split("").map(c => words[c] || c).join(" ");
}

// ---------------------------------------------------------------------------
// ElevenLabs API call
// ---------------------------------------------------------------------------

async function callElevenLabsTTS(
  text: string,
  apiKey: string,
  voiceId: string = DEFAULT_VOICE_ID,
  voiceSettingsOverride?: Partial<typeof DEFAULT_VOICE_SETTINGS>
): Promise<ArrayBuffer> {
  const url = `${ELEVENLABS_BASE}/${voiceId}`;
  const voiceSettings = voiceSettingsOverride
    ? { ...DEFAULT_VOICE_SETTINGS, ...voiceSettingsOverride }
    : DEFAULT_VOICE_SETTINGS;

  const MAX_RETRIES = 3;
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 120000);
    let response: Response;
    try {
      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": apiKey,
        },
        body: JSON.stringify({
          text,
          model_id: DEFAULT_MODEL_ID,
          voice_settings: voiceSettings,
        }),
        signal: controller.signal,
      });
    } catch (err) {
      clearTimeout(timeout);
      if (attempt < MAX_RETRIES - 1) {
        console.warn(`[tts] Attempt ${attempt + 1} failed, retrying in ${(attempt + 1) * 2}s...`);
        await new Promise((r) => setTimeout(r, (attempt + 1) * 2000));
        continue;
      }
      throw err;
    } finally {
      clearTimeout(timeout);
    }

    if (response.ok) {
      return response.arrayBuffer();
    }

    const errorBody = await response.text().catch(() => "unknown error");
    if (response.status === 429 && attempt < MAX_RETRIES - 1) {
      console.warn(`[tts] Rate limited, retrying in ${(attempt + 1) * 3}s...`);
      await new Promise((r) => setTimeout(r, (attempt + 1) * 3000));
      continue;
    }
    throw new Error(
      `ElevenLabs TTS request failed (${response.status}): ${errorBody}`
    );
  }

  throw new Error("ElevenLabs TTS: exhausted retries");
}

/**
 * Calls ElevenLabs with-timestamps endpoint.
 * Returns both the audio (as base64) and character-level alignment data
 * with exact start/end times for every character in the input text.
 */
async function callElevenLabsTTSWithTimestamps(
  text: string,
  apiKey: string,
  voiceId: string = DEFAULT_VOICE_ID,
  voiceSettingsOverride?: Partial<typeof DEFAULT_VOICE_SETTINGS>
): Promise<{ audioBase64: string; alignment: TTSAlignment }> {
  const url = `${ELEVENLABS_BASE}/${voiceId}/with-timestamps`;
  const voiceSettings = voiceSettingsOverride
    ? { ...DEFAULT_VOICE_SETTINGS, ...voiceSettingsOverride }
    : DEFAULT_VOICE_SETTINGS;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 120000);
  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": apiKey,
      },
      body: JSON.stringify({
        text,
        model_id: DEFAULT_MODEL_ID,
        voice_settings: voiceSettings,
      }),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    const errorBody = await response.text().catch(() => "unknown error");
    throw new Error(
      `ElevenLabs TTS with-timestamps request failed (${response.status}): ${errorBody}`
    );
  }

  const data = await response.json();
  return {
    audioBase64: data.audio_base64,
    alignment: data.alignment as TTSAlignment,
  };
}

// ---------------------------------------------------------------------------
// Main TTS function
// ---------------------------------------------------------------------------

/**
 * Generates speech audio from narration text using ElevenLabs TTS.
 *
 * For text under 5000 characters, a single API call is made and the audio
 * is saved directly to `outputPath`. For longer text, the input is chunked
 * at sentence boundaries and each chunk is saved as a separate file (with
 * a numbered suffix). The caller is responsible for concatenating the
 * resulting audio files.
 *
 * @param text - Full narration text (use `buildNarrationText` to build it).
 * @param outputPath - Absolute path where the audio file should be saved (e.g., `/tmp/narration.mp3`).
 * @param apiKey - ElevenLabs API key.
 * @returns The file path and estimated duration in seconds.
 *
 * @example
 * ```ts
 * const narration = buildNarrationText(script.scenes);
 * const { filePath, estimatedDurationSeconds } = await generateTTS(
 *   narration,
 *   "/tmp/output/narration.mp3",
 *   process.env.ELEVENLABS_API_KEY!
 * );
 * ```
 */
export async function generateTTS(
  text: string,
  outputPath: string,
  apiKey: string,
  voiceId?: string
): Promise<TTSResult> {
  if (!text || text.trim().length === 0) {
    throw new Error("Cannot generate TTS for empty text.");
  }

  if (!apiKey) {
    throw new Error(
      "ElevenLabs API key is required. Pass it as a parameter or set ELEVENLABS_API_KEY environment variable."
    );
  }

  // Sanitize text for TTS — convert patterns that cause audio glitches
  text = sanitizeForTTS(text);

  const effectiveVoiceId = voiceId || DEFAULT_VOICE_ID;
  const isPremiumVoice = effectiveVoiceId === PREMIUM_VOICE_ID;
  const voiceSettingsOverride = isPremiumVoice
    ? { stability: 0.75 }
    : undefined;

  const chunks = chunkText(text, MAX_CHARS_PER_REQUEST);

  if (chunks.length === 1) {
    // Use with-timestamps endpoint to get real character-level timing
    try {
      const { audioBase64, alignment } = await callElevenLabsTTSWithTimestamps(
        text,
        apiKey,
        effectiveVoiceId,
        voiceSettingsOverride
      );
      const audioBuffer = Buffer.from(audioBase64, "base64");
      await writeFile(outputPath, audioBuffer);

      const lastEndTime =
        alignment.character_end_times_seconds.length > 0
          ? alignment.character_end_times_seconds[
              alignment.character_end_times_seconds.length - 1
            ]
          : 0;

      // Alignment can be slightly shorter than the decoded MP3; always take max(ffprobe, alignment).
      const probed = await probeAudioFileDurationSeconds(outputPath);
      const combined =
        Math.max(lastEndTime, probed > 0 ? probed : 0, estimateDurationFromText(text)) +
        1.0;

      return {
        filePath: outputPath,
        estimatedDurationSeconds: Math.round(combined * 10) / 10,
        alignment,
      };
    } catch (err) {
      // Fall back to regular endpoint if with-timestamps fails
      console.warn(
        "[tts] with-timestamps endpoint failed, falling back to standard:",
        (err as Error).message
      );
      const audioData = await callElevenLabsTTS(
        text,
        apiKey,
        effectiveVoiceId,
        voiceSettingsOverride
      );
      await writeFile(outputPath, Buffer.from(audioData));

      const probed = await probeAudioFileDurationSeconds(outputPath);
      const combined = Math.max(
        probed > 0 ? probed : 0,
        estimateDurationFromText(text)
      );

      return {
        filePath: outputPath,
        estimatedDurationSeconds: Math.round(combined * 10) / 10,
      };
    }
  }

  // Multiple chunks — synthesize in parallel, then ffmpeg concat into outputPath (single file for Remotion).
  const ext = outputPath.match(/\.[^.]+$/)?.[0] || ".mp3";
  const basePath = outputPath.replace(/\.[^.]+$/, "");

  const chunkPaths = chunks.map(
    (_, i) => `${basePath}_${String(i + 1).padStart(3, "0")}${ext}`
  );

  await Promise.all(
    chunks.map(async (chunk, i) => {
      const audioData = await callElevenLabsTTS(
        chunk,
        apiKey,
        effectiveVoiceId,
        voiceSettingsOverride
      );
      await writeFile(chunkPaths[i], Buffer.from(audioData));
    })
  );

  await concatMp3ChunksWithFfmpeg(chunkPaths, outputPath);
  const probed = await probeAudioFileDurationSeconds(outputPath);
  const combined = Math.max(
    probed > 0 ? probed : 0,
    estimateDurationFromText(text)
  );

  return {
    filePath: outputPath,
    estimatedDurationSeconds: Math.round(combined * 10) / 10,
  };
}

/**
 * Generates TTS for chunked text and returns all chunk file paths.
 * Use this when you need explicit control over multi-chunk audio.
 *
 * @param text - Full narration text.
 * @param outputDir - Directory to write chunk files into.
 * @param baseName - Base filename without extension (e.g., "narration").
 * @param apiKey - ElevenLabs API key.
 * @returns Ordered list of chunk paths and estimated total duration.
 */
export async function generateTTSChunked(
  text: string,
  outputDir: string,
  baseName: string,
  apiKey: string
): Promise<TTSChunkResult> {
  if (!text || text.trim().length === 0) {
    throw new Error("Cannot generate TTS for empty text.");
  }

  if (!apiKey) {
    throw new Error("ElevenLabs API key is required.");
  }

  const chunks = chunkText(text, MAX_CHARS_PER_REQUEST);
  const chunkPaths: string[] = [];

  for (let i = 0; i < chunks.length; i++) {
    const chunkPath = `${outputDir}/${baseName}_${String(i + 1).padStart(3, "0")}.mp3`;

    const audioData = await callElevenLabsTTS(chunks[i], apiKey);
    await writeFile(chunkPath, Buffer.from(audioData));

    chunkPaths.push(chunkPath);
  }

  return {
    chunkPaths,
    estimatedDurationSeconds: estimateDurationFromText(text),
  };
}

// ---------------------------------------------------------------------------
// Premium narration builder
// ---------------------------------------------------------------------------

/** Premium voice ID re-exported for use by the render pipeline. */
export { PREMIUM_VOICE_ID };

/**
 * Concatenates all 8 premium scene narrations into a single narration string
 * with pause markers inserted between scenes for natural pacing.
 */
export function buildPremiumNarrationText(
  scenes: PremiumGeneratedScript["scenes"]
): string {
  const sceneOrder: Array<keyof PremiumGeneratedScript["scenes"]> = [
    "intro",
    "problem",
    "deepDive",
    "treatment",
    "journey",
    "outcome",
    "whatToExpect",
    "cta",
  ];

  return sceneOrder
    .map((key) => {
      let text = scenes[key].narration.trim();
      // Ensure every scene ends with sentence-ending punctuation
      if (text && !/[.!?]$/.test(text)) text += ".";
      return text;
    })
    .filter(Boolean)
    .join(PAUSE_MARKER);
}
