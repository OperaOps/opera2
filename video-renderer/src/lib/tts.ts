/**
 * tts.ts
 *
 * Text-to-speech integration using the ElevenLabs API.
 * Converts narration text into natural-sounding speech audio (MP3)
 * for patient education videos.
 */

import { writeFile } from "node:fs/promises";
import type { GeneratedScript, PremiumGeneratedScript } from "./script-generator";

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

/** Maximum characters per single API request before chunking. */
const MAX_CHARS_PER_REQUEST = 5000;

/** Pause marker inserted between scenes in the narration text. */
const PAUSE_MARKER = "... ";

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
    .map((key) => scenes[key].narration.trim())
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
 */
function chunkText(text: string, maxChars: number): string[] {
  if (text.length <= maxChars) return [text];

  const sentences = text.match(/[^.!?]+[.!?]+\s*/g) || [text];
  const chunks: string[] = [];
  let current = "";

  for (const sentence of sentences) {
    if (current.length + sentence.length > maxChars && current.length > 0) {
      chunks.push(current.trim());
      current = "";
    }
    current += sentence;
  }

  if (current.trim().length > 0) {
    chunks.push(current.trim());
  }

  return chunks;
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

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 60000);
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
      `ElevenLabs TTS request failed (${response.status}): ${errorBody}`
    );
  }

  return response.arrayBuffer();
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
  const timeout = setTimeout(() => controller.abort(), 60000);
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

      // Derive actual duration from the last character's end time
      const lastEndTime =
        alignment.character_end_times_seconds.length > 0
          ? alignment.character_end_times_seconds[
              alignment.character_end_times_seconds.length - 1
            ]
          : estimateDurationFromText(text);

      return {
        filePath: outputPath,
        estimatedDurationSeconds: Math.round(lastEndTime * 10) / 10,
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

      return {
        filePath: outputPath,
        estimatedDurationSeconds: estimateDurationFromText(text),
      };
    }
  }

  // Multiple chunks — save each with a numbered suffix.
  // e.g., /tmp/narration.mp3 -> /tmp/narration_001.mp3, /tmp/narration_002.mp3
  const ext = outputPath.match(/\.[^.]+$/)?.[0] || ".mp3";
  const basePath = outputPath.replace(/\.[^.]+$/, "");
  const chunkPaths: string[] = [];

  for (let i = 0; i < chunks.length; i++) {
    const chunkPath = `${basePath}_${String(i + 1).padStart(3, "0")}${ext}`;

    const audioData = await callElevenLabsTTS(
      chunks[i],
      apiKey,
      effectiveVoiceId,
      voiceSettingsOverride
    );
    await writeFile(chunkPath, Buffer.from(audioData));

    chunkPaths.push(chunkPath);
  }

  // Write a manifest so the caller knows about all chunks
  const manifestPath = `${basePath}_manifest.json`;
  await writeFile(
    manifestPath,
    JSON.stringify(
      {
        chunks: chunkPaths,
        totalChunks: chunkPaths.length,
        note: "Concatenate these audio files in order to produce the final narration.",
      },
      null,
      2
    )
  );

  return {
    filePath: chunkPaths[0],
    estimatedDurationSeconds: estimateDurationFromText(text),
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
    .map((key) => scenes[key].narration.trim())
    .filter(Boolean)
    .join(PAUSE_MARKER);
}
