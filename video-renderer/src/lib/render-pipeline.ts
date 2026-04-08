/**
 * render-pipeline.ts
 *
 * Orchestrates the full patient video generation pipeline:
 *   1. Generate script (Claude API or demo)
 *   2. Build narration text
 *   3. Generate TTS audio
 *   4. Generate captions
 *   5. Bundle Remotion project
 *   6. Render video via Remotion renderer
 *   7. Return final video path
 */

import path from "node:path";
import fs from "node:fs/promises";
import { createReadStream } from "node:fs";
import { bundle } from "@remotion/bundler";
import {
  renderMedia,
  selectComposition,
  type ChromiumOptions,
} from "@remotion/renderer";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import type { AwsRegion } from "@remotion/lambda";
import {
  generateScript,
  generateDemoScript,
  generatePremiumScript,
  generatePremiumDemoScript,
  generateScriptSmart,
  generatePremiumScriptSmart,
  type ScriptGenerationInput,
  type GeneratedScript,
  type PremiumGeneratedScript,
} from "./script-generator";
import {
  buildNarrationText,
  buildPremiumNarrationText,
  generateTTS,
  probeAudioFileDurationSeconds,
  PREMIUM_VOICE_ID,
  type TTSAlignment,
} from "./tts";
import {
  generateCaptions,
  generatePremiumCaptions,
  generateCaptionsFromAlignment,
} from "./captions-generator";
import {
  DEFAULT_FPS,
  VIDEO_WIDTH,
  VIDEO_HEIGHT,
  RENDER_SCALE as DEFAULT_RENDER_SCALE,
  type PatientVideoProps,
  type PremiumPatientVideoProps,
  type DiagnosisType,
  type TreatmentType,
} from "./schema";
import { secondsToFrames, totalDurationFrames, totalDurationFramesWithBuffer } from "./timing";
import { stripDoctorPrefix } from "./doctor-format";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface RenderJobInput {
  patientName: string;
  doctorName: string;
  clinicName: string;
  category: "dental" | "orthodontic" | "financial";
  diagnosis: string;
  treatment: string;
  treatmentNotes?: string;
  urgencyLevel?: "routine" | "moderate" | "urgent";
  clinicBrand?: {
    primaryColor?: string;
    accentColor?: string;
  };
  useDemo?: boolean;
  mode?: "standard" | "premium";
  beforePhotoBase64?: string;
  afterPhotoBase64?: string;
  // New structured fields
  specialty?: "dental" | "orthodontic";
  appointmentContext?: string;
  patientStatus?: string;
  videoGoal?: string;
  contentMode?: "template" | "template_ai" | "full_ai";
  concerns?: string;
  financing?: string;
  parentMode?: boolean;
  /** Optional BGM path (public/ relative or https). Defaults to bundled opera-bgm in composition. */
  bgmUrl?: string;
}

export interface RenderJobResult {
  videoPath: string;
  videoUrl?: string;
  durationSeconds: number;
  script: GeneratedScript;
}

export type ProgressCallback = (step: string, progress: number) => void;

// ---------------------------------------------------------------------------
// Remotion / Chromium (production stability)
// ---------------------------------------------------------------------------
//
// Remotion OffthreadVideo cache can grow large; on 4GB App Runner that starves Chromium.
// Cap offthread cache; Remotion 4.x no longer exposes a separate media cache knob here.
// Do NOT pass --single-process: it destabilizes Chrome under parallel tabs + video decode.

const REMOTION_OFFTHREAD_VIDEO_CACHE_BYTES = 150 * 1024 * 1024;
const REMOTION_OFFTHREAD_VIDEO_CACHE_BYTES_RETRY = 80 * 1024 * 1024;

/** One Remotion encode pass; keep generous so renders always complete. */
const REMOTION_RENDER_TIMEOUT_MS = 28 * 60 * 1000;

function effectiveRenderScale(): number {
  const raw = process.env.REMOTION_RENDER_SCALE?.trim();
  let scale = DEFAULT_RENDER_SCALE;
  if (raw) {
    const n = Number(raw);
    if (Number.isFinite(n) && n >= 0.25 && n <= 1) scale = n;
  }
  // H264 requires both width and height to be even integers. Snap the scale
  // up to the nearest value that produces even dimensions for 1920x1080,
  // otherwise renders fail with: "trying to render a video with a H264 codec
  // that has a width of N.NNpx, which is an uneven number".
  const w = Math.round(VIDEO_WIDTH * scale);
  const h = Math.round(VIDEO_HEIGHT * scale);
  if (w % 2 === 0 && h % 2 === 0) return scale;
  // Try the next even pair upward in 2px increments on width
  const evenW = w + (w % 2);
  return evenW / VIDEO_WIDTH;
}

/** H.264 CRF: lower = better quality (18–28 sensible). Env override for ops tuning without code changes. */
function effectiveCrf(): number {
  const raw = process.env.REMOTION_CRF?.trim();
  if (raw) {
    const n = Number(raw);
    if (Number.isFinite(n)) return Math.min(28, Math.max(18, Math.round(n)));
  }
  return 23;
}

function remotionChromiumOptions(): ChromiumOptions {
  // Remotion 4 ChromiumOptions: no raw Chrome `args` — map flags to supported fields.
  return {
    disableWebSecurity: true,
    ignoreCertificateErrors: true,
  };
}

// ---------------------------------------------------------------------------
// Bundle cache
// ---------------------------------------------------------------------------

let cachedBundleUrl: string | null = null;

/** True if we can create files in dir (needed for narration-*.mp3 into bundle/public). */
async function isDirWritableForNewFiles(dir: string): Promise<boolean> {
  try {
    await fs.mkdir(dir, { recursive: true });
    const probe = path.join(dir, `.w-${process.pid}-${Date.now()}`);
    await fs.writeFile(probe, "1");
    await fs.unlink(probe);
    return true;
  } catch {
    return false;
  }
}

/**
 * Returns a cached bundle URL or creates a new one.
 * Checks for pre-built bundle first (created at Docker build time via prebundle.ts).
 * If prebuilt exists but bundle/public is not writable (misconfigured Docker), falls back to
 * runtime bundling (output is under a writable temp path).
 */
async function getOrCreateBundle(): Promise<string> {
  if (cachedBundleUrl) {
    try {
      await fs.access(cachedBundleUrl);
      return cachedBundleUrl;
    } catch {
      cachedBundleUrl = null;
    }
  }

  const videoRendererRoot = path.resolve(__dirname, "../..");
  const preBundlePath = path.join(videoRendererRoot, ".remotion-bundle");
  const preBundleIndex = path.join(preBundlePath, "index.html");
  const bundlePublic = path.join(preBundlePath, "public");

  try {
    await fs.access(preBundleIndex);
    const ok = await isDirWritableForNewFiles(bundlePublic);
    if (ok) {
      process.stderr.write("[render-pipeline] Using pre-built Remotion bundle\n");
      cachedBundleUrl = preBundlePath;
      return cachedBundleUrl;
    }
    process.stderr.write(
      "[render-pipeline] Pre-built bundle exists but bundle/public is not writable; " +
        "using runtime bundle (set chown on .remotion-bundle in Docker to use prebundle).\n"
    );
  } catch {
    process.stderr.write("[render-pipeline] No pre-built bundle found, bundling at runtime...\n");
  }

  const entryPoint = path.resolve(__dirname, "../index.ts");
  cachedBundleUrl = await bundle({
    entryPoint,
    webpackOverride: (config) => config,
  });
  process.stderr.write(`[render-pipeline] Runtime bundle ready at ${cachedBundleUrl}\n`);

  return cachedBundleUrl;
}

// ---------------------------------------------------------------------------
// Helper: build Remotion input props from script
// ---------------------------------------------------------------------------

function buildInputProps(
  input: RenderJobInput,
  script: GeneratedScript,
  captions: { text: string; startFrame: number; endFrame: number }[],
  audioFileName?: string
): PatientVideoProps {
  return {
    patientName: input.patientName,
    doctorName: stripDoctorPrefix(input.doctorName),
    clinicName: input.clinicName,
    category: input.category,
    diagnosis: input.diagnosis as DiagnosisType,
    treatment: input.treatment as TreatmentType,
    scenes: {
      intro: {
        id: "intro",
        narration: script.scenes.intro.narration,
        durationSeconds: script.scenes.intro.durationSeconds,
        heading: script.scenes.intro.heading,
      },
      problem: {
        id: "problem",
        narration: script.scenes.problem.narration,
        durationSeconds: script.scenes.problem.durationSeconds,
        heading: script.scenes.problem.heading,
        bullets: script.scenes.problem.bullets,
      },
      treatment: {
        id: "treatment",
        narration: script.scenes.treatment.narration,
        durationSeconds: script.scenes.treatment.durationSeconds,
        heading: script.scenes.treatment.heading,
        bullets: script.scenes.treatment.bullets,
      },
      outcome: {
        id: "outcome",
        narration: script.scenes.outcome.narration,
        durationSeconds: script.scenes.outcome.durationSeconds,
        heading: script.scenes.outcome.heading,
        bullets: script.scenes.outcome.bullets,
      },
      cta: {
        id: "cta",
        narration: script.scenes.cta.narration,
        durationSeconds: script.scenes.cta.durationSeconds,
        heading: script.scenes.cta.heading,
      },
    },
    captions,
    audioUrl: audioFileName ?? undefined,
    bgmUrl:
      input.bgmUrl ??
      (process.env.OPERA_BGM_PUBLIC_PATH?.trim() || undefined),
    clinicBrand: {
      primaryColor: input.clinicBrand?.primaryColor ?? "#7c3aed",
      accentColor: input.clinicBrand?.accentColor ?? "#a855f7",
    },
  };
}

// ---------------------------------------------------------------------------
// Helper: build premium Remotion input props from premium script
// ---------------------------------------------------------------------------

function buildPremiumInputProps(
  input: RenderJobInput,
  script: PremiumGeneratedScript,
  captions: { text: string; startFrame: number; endFrame: number }[],
  audioFileName?: string
): PremiumPatientVideoProps {
  return {
    patientName: input.patientName,
    doctorName: stripDoctorPrefix(input.doctorName),
    clinicName: input.clinicName,
    diagnosis: input.diagnosis,
    treatment: input.treatment,
    accentColor: input.clinicBrand?.primaryColor ?? "#7c3aed",
    scenes: {
      intro: {
        narration: script.scenes.intro.narration,
        durationSeconds: script.scenes.intro.durationSeconds,
        heading: script.scenes.intro.heading,
      },
      problem: {
        narration: script.scenes.problem.narration,
        durationSeconds: script.scenes.problem.durationSeconds,
        heading: script.scenes.problem.heading,
        bullets: script.scenes.problem.bullets,
      },
      deepDive: {
        narration: script.scenes.deepDive.narration,
        durationSeconds: script.scenes.deepDive.durationSeconds,
        heading: script.scenes.deepDive.heading,
        bullets: script.scenes.deepDive.bullets,
      },
      treatment: {
        narration: script.scenes.treatment.narration,
        durationSeconds: script.scenes.treatment.durationSeconds,
        heading: script.scenes.treatment.heading,
        bullets: script.scenes.treatment.bullets,
      },
      journey: {
        narration: script.scenes.journey.narration,
        durationSeconds: script.scenes.journey.durationSeconds,
        heading: script.scenes.journey.heading,
        bullets: script.scenes.journey.bullets,
      },
      outcome: {
        narration: script.scenes.outcome.narration,
        durationSeconds: script.scenes.outcome.durationSeconds,
        heading: script.scenes.outcome.heading,
        bullets: script.scenes.outcome.bullets,
      },
      whatToExpect: {
        narration: script.scenes.whatToExpect.narration,
        durationSeconds: script.scenes.whatToExpect.durationSeconds,
        heading: script.scenes.whatToExpect.heading,
        bullets: script.scenes.whatToExpect.bullets,
      },
      cta: {
        narration: script.scenes.cta.narration,
        durationSeconds: script.scenes.cta.durationSeconds,
        heading: script.scenes.cta.heading,
      },
    },
    captions,
    audioUrl: audioFileName ?? undefined,
    bgmUrl:
      input.bgmUrl ??
      (process.env.OPERA_BGM_PUBLIC_PATH?.trim() || undefined),
  };
}

// ---------------------------------------------------------------------------
// Main pipeline
// ---------------------------------------------------------------------------

/**
 * Runs the full video generation pipeline.
 *
 * @param input - Patient/clinic/treatment details.
 * @param onProgress - Optional callback for progress updates (step name + 0-1 fraction).
 * @returns The path to the rendered MP4 and metadata.
 */
export async function renderPatientVideo(
  input: RenderJobInput,
  onProgress?: ProgressCallback
): Promise<RenderJobResult> {
  const notify = onProgress ?? (() => {});
  // All videos use premium 8-scene format
  const isPremium = true;

  // Resolve directories
  const videoRendererRoot = path.resolve(__dirname, "../..");
  const outputDir = path.join(videoRendererRoot, "out");
  const tmpDir = path.join(videoRendererRoot, ".tmp", `job-${Date.now()}`);

  // Writable at runtime (Docker: opera owns .tmp/out; job assets stay in tmpDir, not root-owned public/).
  await fs.mkdir(outputDir, { recursive: true });
  await fs.mkdir(tmpDir, { recursive: true });

  // --------------------------------------------------
  // Step 1: Generate script
  // --------------------------------------------------
  notify("Generating script", 0.05);

  const scriptInput: ScriptGenerationInput = {
    patientName: input.patientName,
    doctorName: stripDoctorPrefix(input.doctorName),
    clinicName: input.clinicName,
    category: input.category,
    diagnosis: input.diagnosis,
    treatment: input.treatment,
    treatmentNotes: input.treatmentNotes,
    urgencyLevel: input.urgencyLevel,
    // New structured fields
    specialty: input.specialty,
    appointmentContext: input.appointmentContext,
    patientStatus: input.patientStatus,
    videoGoal: input.videoGoal,
    contentMode: input.contentMode,
    concerns: input.concerns,
    financing: input.financing,
    parentMode: input.parentMode,
  };

  // Debug: log Lambda env vars
  process.stderr.write(`[render-pipeline] REMOTION_LAMBDA_FUNCTION_NAME=${process.env.REMOTION_LAMBDA_FUNCTION_NAME || "NOT SET"}\n`);
  process.stderr.write(`[render-pipeline] REMOTION_LAMBDA_SERVE_URL=${process.env.REMOTION_LAMBDA_SERVE_URL ? "SET" : "NOT SET"}\n`);

  const apiKey = process.env.CLAUDE_API_KEY || process.env.ANTHROPIC_API_KEY;
  const useSmartGeneration = input.contentMode && input.contentMode !== "full_ai";

  let script: GeneratedScript | undefined;
  let premiumScript: PremiumGeneratedScript | undefined;

  if (isPremium) {
    if (input.useDemo) {
      premiumScript = generatePremiumDemoScript(scriptInput);
    } else if (useSmartGeneration) {
      // Use template-based generation (faster, no API key needed for "template" mode)
      premiumScript = await generatePremiumScriptSmart(scriptInput, apiKey);
      console.log(`[render-pipeline] Used smart premium generation (mode: ${input.contentMode})`);
    } else {
      if (!apiKey) {
        throw new Error(
          "No API key found. Set CLAUDE_API_KEY or ANTHROPIC_API_KEY, or use useDemo: true."
        );
      }
      premiumScript = await generatePremiumScript(scriptInput, apiKey);
    }
  } else {
    if (input.useDemo) {
      script = generateDemoScript(scriptInput);
    } else if (useSmartGeneration) {
      // Use template-based generation
      script = await generateScriptSmart(scriptInput, apiKey);
      console.log(`[render-pipeline] Used smart generation (mode: ${input.contentMode})`);
    } else {
      if (!apiKey) {
        throw new Error(
          "No API key found. Set CLAUDE_API_KEY or ANTHROPIC_API_KEY, or use useDemo: true."
        );
      }
      script = await generateScript(scriptInput, apiKey);
    }
  }

  notify("Script generated", 0.15);

  // --------------------------------------------------
  // Step 2: Build narration text
  // --------------------------------------------------
  const narrationText = isPremium
    ? buildPremiumNarrationText(premiumScript!.scenes)
    : buildNarrationText(script!.scenes);

  // --------------------------------------------------
  // Step 3: Generate TTS audio
  // --------------------------------------------------
  let audioFileName: string | undefined;
  let ttsAlignment: TTSAlignment | undefined;
  let realAudioDurationSeconds: number | undefined;

  const elevenLabsKey = process.env.ELEVENLABS_API_KEY;
  if (elevenLabsKey) {
    notify("Generating voiceover audio", 0.2);

    const audioTmpPath = path.join(tmpDir, "narration.mp3");
    const ttsResult = await generateTTS(
      narrationText,
      audioTmpPath,
      elevenLabsKey,
      isPremium ? PREMIUM_VOICE_ID : undefined
    );

    // Duration: TTS layer already merges alignment + ffprobe; we still refine with alignment coverage.
    ttsAlignment = ttsResult.alignment;
    realAudioDurationSeconds = ttsResult.estimatedDurationSeconds;

    if (ttsAlignment && ttsAlignment.character_end_times_seconds.length > 0) {
      const rawDuration =
        ttsAlignment.character_end_times_seconds[
          ttsAlignment.character_end_times_seconds.length - 1
        ];
      const alignedChars = ttsAlignment.characters.length;
      const totalChars = narrationText.length;
      const coverageRatio = alignedChars / totalChars;
      if (coverageRatio >= 0.8) {
        realAudioDurationSeconds = Math.max(rawDuration + 0.25, realAudioDurationSeconds);
        console.log(
          `[render-pipeline] Real audio duration: ${realAudioDurationSeconds.toFixed(1)}s (alignment coverage: ${Math.round(coverageRatio * 100)}%)`
        );
      } else {
        console.warn(
          `[render-pipeline] TTS alignment coverage too low (${Math.round(coverageRatio * 100)}% of ${totalChars} chars) — discarding alignment for captions.`
        );
        ttsAlignment = undefined;
      }
    }

    // Filename for staticFile() after we copy into bundle/public/ (see Step 5b). Keep bytes in tmpDir only —
    // video-renderer/public is often root-owned in Docker and must not be required for writes.
    const audioPublicName = `narration-${Date.now()}.mp3`;
    const probedTmp = await probeAudioFileDurationSeconds(audioTmpPath);
    if (probedTmp > 0) {
      realAudioDurationSeconds = Math.max(realAudioDurationSeconds, probedTmp + 0.15);
    }

    audioFileName = audioPublicName;
    notify("Audio generated", 0.35);
  } else {
    console.warn(
      "[render-pipeline] ELEVENLABS_API_KEY not set — rendering without voiceover audio."
    );
    notify("Skipping TTS (no API key)", 0.35);
  }

  // --------------------------------------------------
  // Step 3b: Save before/after photos to public/
  // --------------------------------------------------

  // Treatment-specific stock photo pairs — each treatment gets relevant imagery
  const stockPhotoMap: Record<string, { before: string; after: string }> = {
    // Ortho
    braces:      { before: "stock/dental-exam-before.jpg", after: "stock/smile-after-2.jpg" },
    invisalign:  { before: "stock/smile-closeup.jpg",      after: "stock/smile-after-2.jpg" },
    // Restorative
    crown:       { before: "stock/dental-checkup.jpg",     after: "stock/happy-dental-patient.jpg" },
    filling:     { before: "stock/dental-checkup.jpg",     after: "stock/happy-dental-patient.jpg" },
    root_canal:  { before: "stock/braces-before.jpg",      after: "stock/dental-tools-mouth.jpg" },
    bridge:      { before: "stock/implant-model.jpg",      after: "stock/happy-dental-patient.jpg" },
    // Surgical
    implant:     { before: "stock/implant-model.jpg",      after: "stock/dental-patient.jpg" },
    extraction:  { before: "stock/dental-restoration.jpg", after: "stock/dental-tools-mouth.jpg" },
    // Cosmetic
    whitening:   { before: "stock/whitening-procedure.jpg", after: "stock/smile-after-2.jpg" },
    veneers:     { before: "stock/smile-closeup.jpg",       after: "stock/smile-after-2.jpg" },
    full_mouth_rehab: { before: "stock/dental-restoration.jpg", after: "stock/perfect-smile.jpg" },
  };

  const stockPair = stockPhotoMap[input.treatment] || { before: "stock/dental-checkup.jpg", after: "stock/smile-after-2.jpg" };
  let beforePhotoFileName = stockPair.before;
  let afterPhotoFileName = stockPair.after;

  if (input.beforePhotoBase64) {
    const beforeName = `before-photo-${Date.now()}.jpg`;
    const beforePath = path.join(tmpDir, beforeName);
    await fs.writeFile(beforePath, Buffer.from(input.beforePhotoBase64, "base64"));
    beforePhotoFileName = beforeName;
  }
  if (input.afterPhotoBase64) {
    const afterName = `after-photo-${Date.now()}.jpg`;
    const afterPath = path.join(tmpDir, afterName);
    await fs.writeFile(afterPath, Buffer.from(input.afterPhotoBase64, "base64"));
    afterPhotoFileName = afterName;
  }

  // --------------------------------------------------
  // Step 4: Generate captions
  // --------------------------------------------------
  notify("Generating captions", 0.4);

  let captions;
  if (ttsAlignment) {
    // Use real timing data from ElevenLabs — exact character-level alignment
    captions = generateCaptionsFromAlignment(narrationText, ttsAlignment, DEFAULT_FPS);
    console.log(`[render-pipeline] Generated ${captions.length} captions from real TTS alignment data`);
  } else {
    // Fall back to estimation-based approach
    captions = isPremium
      ? generatePremiumCaptions(premiumScript!.scenes, DEFAULT_FPS)
      : generateCaptions(script!.scenes, DEFAULT_FPS);
    console.log(`[render-pipeline] Generated ${captions.length} captions from word-count estimation (no alignment data)`);
  }

  notify("Captions generated", 0.45);

  // --------------------------------------------------
  // Step 5: Bundle Remotion project (skip when Lambda is configured)
  // --------------------------------------------------
  const lambdaConfigured = true; // Always use Lambda — hardcoded config above
  let bundleUrl = "";
  if (lambdaConfigured) {
    notify("Using Lambda render", 0.55);
    console.log("[render-pipeline] Skipping local bundle — Lambda is configured");
  } else {
    notify("Bundling Remotion project", 0.5);
    bundleUrl = await getOrCreateBundle();
    notify("Bundle ready", 0.55);
  }

  // --------------------------------------------------
  // Step 5b: Copy dynamic audio into bundle/public/.
  //
  // Remotion sets window.remotion_staticBase = "/public" in the bundle's index.html.
  // This means staticFile("foo.mp3") resolves to /public/foo.mp3, which is served
  // from bundleRoot/public/foo.mp3.
  //
  // Static assets (dental-3d/, stock/) are already in bundleRoot/public/ because
  // bundle() copies the source public/ directory there at Docker build time.
  //
  // Only the per-render audio file (narration-xxx.mp3) needs to be copied here,
  // since it is generated at render time and isn't part of the Docker build.
  // --------------------------------------------------
  // For Lambda: upload audio to the Remotion Lambda bucket (Lambda has access to this bucket)
  let lambdaAudioUrl: string | undefined;
  if (lambdaConfigured && audioFileName) {
    const audioSrc = path.join(tmpDir, "narration.mp3");
    const audioKey = `audio/${audioFileName}`;
    const lambdaBucket = "remotionlambda-useast1-k8w7zbbn0a";
    try {
      const audioData = await fs.readFile(audioSrc);
      const s3 = new S3Client({ region: process.env.AWS_REGION || "us-east-1" });
      await s3.send(new PutObjectCommand({
        Bucket: lambdaBucket,
        Key: audioKey,
        Body: audioData,
        ContentType: "audio/mpeg",
      }));
      // Generate presigned URL so Lambda workers can download the audio
      const { getSignedUrl } = await import("@aws-sdk/s3-request-presigner");
      const { GetObjectCommand } = await import("@aws-sdk/client-s3");
      lambdaAudioUrl = await getSignedUrl(s3, new GetObjectCommand({
        Bucket: lambdaBucket,
        Key: audioKey,
      }), { expiresIn: 3600 });
      console.log(`[render-pipeline] Uploaded audio to S3 with presigned URL`);
    } catch (err) {
      console.error(`[render-pipeline] Failed to upload audio to S3:`, err);
    }
  }

  const bundlePublicDir = lambdaConfigured ? tmpDir : path.join(bundleUrl, "public");

  // Ensure bundle public dir exists (should already from prebundle, but safety)
  if (!lambdaConfigured) {
    await fs.mkdir(bundlePublicDir, { recursive: true }).catch(() => {});
  }

  // Copy audio into bundle/public/ so staticFile("narration-xxx.mp3") finds it (source: per-job tmp only)
  if (audioFileName) {
    const src = path.join(tmpDir, "narration.mp3");
    const dest = path.join(bundlePublicDir, audioFileName);
    try {
      await fs.copyFile(src, dest);
      process.stderr.write(`[render-pipeline] Copied audio to bundle/public/: ${audioFileName}\n`);
    } catch (err) {
      // Audio missing = no narration. Fail loudly so we know.
      throw new Error(
        `[render-pipeline] FATAL: Failed to copy audio to bundle/public/. ` +
        `src=${src} dest=${dest} error=${err instanceof Error ? err.message : String(err)}`
      );
    }
  } else {
    process.stderr.write("[render-pipeline] No audio file (TTS skipped or failed)\n");
  }

  // Copy user-uploaded before/after photos into bundle/public/ (if provided)
  // These use paths like "before-photo-xxx.jpg" (not stock/).
  // Stock photos are already in bundle/public/stock/ from Docker build.
  for (const photoFile of [beforePhotoFileName, afterPhotoFileName]) {
    // Only copy user-uploaded photos (they start with "before-photo-" or "after-photo-")
    if (!photoFile || photoFile.startsWith("stock/")) continue;
    const src = path.join(tmpDir, photoFile);
    const dest = path.join(bundlePublicDir, photoFile);
    try {
      await fs.mkdir(path.dirname(dest), { recursive: true });
      await fs.copyFile(src, dest);
      process.stderr.write(`[render-pipeline] Copied user photo to bundle/public/: ${photoFile}\n`);
    } catch (err) {
      console.error(`[render-pipeline] Failed to copy user photo: ${photoFile} — ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  // dental-3d/ and stock/ images: staticFile() from bundle/public (Docker build).
  // Dental procedure MP4s: HTTPS URLs from dental-video-assets.ts (S3) — OffthreadVideo/ffmpeg need HTTP, not staticFile.

  notify("Assets synced to bundle", 0.6);

  // --------------------------------------------------
  // Step 6: Render video
  // --------------------------------------------------
  notify("Rendering video", 0.65);

  let inputProps: PatientVideoProps | PremiumPatientVideoProps;
  let sceneDurations: number[];
  let compositionId: string;

  if (isPremium) {
    const ps = premiumScript!;
    inputProps = buildPremiumInputProps(input, ps, captions, audioFileName);
    (inputProps as PremiumPatientVideoProps).beforePhotoUrl = beforePhotoFileName;
    (inputProps as PremiumPatientVideoProps).afterPhotoUrl = afterPhotoFileName;
    sceneDurations = [
      ps.scenes.intro.durationSeconds,
      ps.scenes.problem.durationSeconds,
      ps.scenes.deepDive.durationSeconds,
      ps.scenes.treatment.durationSeconds,
      ps.scenes.journey.durationSeconds,
      ps.scenes.outcome.durationSeconds,
      ps.scenes.whatToExpect.durationSeconds,
      ps.scenes.cta.durationSeconds,
    ];
    compositionId = "PremiumOrthoVideo";
    process.stderr.write(`[render-pipeline] Using composition=PremiumOrthoVideo treatment=${input.treatment} diagnosis=${input.diagnosis} audioFile=${audioFileName ?? "NONE"}\n`);
  } else {
    const s = script!;
    inputProps = buildInputProps(input, s, captions, audioFileName);
    sceneDurations = [
      s.scenes.intro.durationSeconds,
      s.scenes.problem.durationSeconds,
      s.scenes.treatment.durationSeconds,
      s.scenes.outcome.durationSeconds,
      s.scenes.cta.durationSeconds,
    ];
    compositionId = "PatientVideo";
    process.stderr.write(`[render-pipeline] Using composition=PatientVideo treatment=${input.treatment} audioFile=${audioFileName ?? "NONE"}\n`);
  }

  const isLongForm = input.treatment === "full_mouth_rehab";

  // Calculate composition duration.
  // If we have real audio duration from the with-timestamps API, use that
  // as the source of truth (+ buffer). Otherwise fall back to script estimates.
  let durationInFrames: number;
  if (realAudioDurationSeconds) {
    // Pad past the MP3 end so the last sentence never gets clipped before the video ends.
    const bufferSeconds = isLongForm ? 5 : 4;
    durationInFrames = secondsToFrames(realAudioDurationSeconds + bufferSeconds, DEFAULT_FPS);
    console.log(
      `[render-pipeline] Composition duration: ${durationInFrames} frames ` +
        `(from real audio: ${realAudioDurationSeconds.toFixed(1)}s + ${bufferSeconds}s buffer = ${(durationInFrames / DEFAULT_FPS).toFixed(1)}s)`
    );
  } else {
    durationInFrames = totalDurationFramesWithBuffer(sceneDurations, DEFAULT_FPS);
  }

  // Hard cap per treatment type. FMR is a longer multi-phase procedure (up to 3 min).
  // Other premium treatments cap at 150s (2.5 min). Standard caps at 80s.
  // FMR: headroom above ~210s script. Other premium: ~150s script + TTS buffer + end padding.
  const MAX_DURATION_SECONDS = isPremium ? (isLongForm ? 300 : 240) : 120;
  const maxFrames = secondsToFrames(MAX_DURATION_SECONDS, DEFAULT_FPS);
  if (durationInFrames > maxFrames) {
    console.log(`[render-pipeline] Capping duration from ${durationInFrames} to ${maxFrames} frames (${MAX_DURATION_SECONDS}s max)`);
    durationInFrames = maxFrames;
  }

  // For Lambda: override audioUrl with S3 URL so Lambda workers can fetch it
  if (lambdaConfigured && lambdaAudioUrl) {
    (inputProps as any).audioUrl = lambdaAudioUrl;
  }

  let serializedInputProps = inputProps as Record<string, unknown>;

  const outputFileName = `patient-video-${Date.now()}.mp4`;
  const outputPath = path.join(outputDir, outputFileName);

  // Hardcoded Lambda config — env vars keep getting dropped by App Runner deployments
  const lambdaFnName = process.env.REMOTION_LAMBDA_FUNCTION_NAME || "remotion-render-4-0-242-mem3008mb-disk2048mb-240sec";
  const lambdaServeUrl = process.env.REMOTION_LAMBDA_SERVE_URL || "https://remotionlambda-useast1-k8w7zbbn0a.s3.us-east-1.amazonaws.com/sites/opera-patient-video/index.html";
  const lambdaRegion = (process.env.REMOTION_LAMBDA_REGION || process.env.AWS_REGION || "us-east-1") as AwsRegion;
  let useLambda = true; // Always use Lambda
  process.stderr.write(`[render-pipeline] Lambda: fn=${lambdaFnName} region=${lambdaRegion}\n`);

  if (useLambda) {
    // ---- Remotion Lambda: distributed render across many workers ----
    try {
      const { renderMediaOnLambda, getRenderProgress } = await import("@remotion/lambda");
      process.stderr.write(`[render-pipeline] @remotion/lambda imported OK\n`);

      const renderScale = effectiveRenderScale();
      const crf = effectiveCrf();
      process.stderr.write(
        `[render-pipeline] Lambda render: ${compositionId} @ ${DEFAULT_FPS}fps, scale=${renderScale}, crf=${crf}, frames=${durationInFrames}\n`
      );

      const { renderId, bucketName } = await renderMediaOnLambda({
        functionName: lambdaFnName!,
        serveUrl: lambdaServeUrl!,
        region: lambdaRegion,
      composition: compositionId,
      codec: "h264",
      inputProps: serializedInputProps,
      imageFormat: "jpeg",
      jpegQuality: 80,
      scale: renderScale,
      crf,
      framesPerLambda: 20,
      timeoutInMilliseconds: 240000,
      overwrite: true,
      outName: outputFileName,
      durationInFrames,
      fps: DEFAULT_FPS,
    });

    console.log(`[render-pipeline] Lambda render started: renderId=${renderId} bucket=${bucketName}`);

    // Poll until done
    let done = false;
    while (!done) {
      await new Promise((r) => setTimeout(r, 2000));
      const progress = await getRenderProgress({
        renderId,
        bucketName,
        functionName: lambdaFnName,
        region: lambdaRegion,
      });

      if (progress.overallProgress !== null) {
        notify("Rendering video", 0.65 + progress.overallProgress * 0.3);
      }

      if (progress.done) {
        done = true;
        if (progress.outputFile) {
          // Download from S3 to local path for subsequent S3 upload step
          const https = await import("node:https");
          const fsSync = await import("node:fs");
          const file = fsSync.createWriteStream(outputPath);
          await new Promise<void>((resolve, reject) => {
            https.get(progress.outputFile!, (res) => {
              res.pipe(file);
              file.on("finish", () => { file.close(); resolve(); });
            }).on("error", reject);
          });
          console.log(`[render-pipeline] Lambda render complete, downloaded to ${outputPath}`);
        }
      }

      if (progress.fatalErrorEncountered) {
        throw new Error(`Lambda render failed: ${JSON.stringify(progress.errors)}`);
      }
    }
    } catch (lambdaErr) {
      process.stderr.write(`[render-pipeline] Lambda render FAILED: ${lambdaErr}\n`);
      process.stderr.write(`[render-pipeline] Falling back to local render\n`);
      useLambda = false;
    }
  }

  if (!useLambda) {
    // ---- Local Remotion render (fallback when Lambda not configured) ----
    // Ensure we have a local bundle (may have been skipped when Lambda was expected)
    if (!bundleUrl) {
      notify("Bundling Remotion project", 0.5);
      bundleUrl = await getOrCreateBundle();
      notify("Bundle ready", 0.55);
    }

    // When falling back from Lambda, the audio file was put in tmpDir (not the
    // bundle's public/), so copy it now so staticFile() can resolve it locally.
    const localPublicDir = path.join(bundleUrl, "public");
    await fs.mkdir(localPublicDir, { recursive: true }).catch(() => {});
    if (audioFileName) {
      const audioSrc = path.join(tmpDir, "narration.mp3");
      const audioDest = path.join(localPublicDir, audioFileName);
      try {
        await fs.copyFile(audioSrc, audioDest);
        process.stderr.write(
          `[render-pipeline] Local fallback: copied audio to ${audioDest}\n`
        );
      } catch (err) {
        throw new Error(
          `[render-pipeline] Local fallback: failed to copy audio: ${err instanceof Error ? err.message : String(err)}`
        );
      }
    }
    // Also copy any user-uploaded before/after photos
    for (const photoFile of [beforePhotoFileName, afterPhotoFileName]) {
      if (!photoFile || photoFile.startsWith("stock/")) continue;
      const src = path.join(tmpDir, photoFile);
      const dest = path.join(localPublicDir, photoFile);
      try {
        await fs.mkdir(path.dirname(dest), { recursive: true });
        await fs.copyFile(src, dest);
      } catch {
        // photos are optional, don't fail render
      }
    }
    // If we set a Lambda-presigned audioUrl earlier, switch back to staticFile
    // for the local render so the composition resolves narration locally.
    if (lambdaAudioUrl && audioFileName) {
      (inputProps as { audioUrl?: string }).audioUrl = audioFileName;
      serializedInputProps = JSON.parse(JSON.stringify(inputProps));
    }

    const composition = await selectComposition({
      serveUrl: bundleUrl,
      id: compositionId,
      inputProps: serializedInputProps,
      chromiumOptions: remotionChromiumOptions(),
      offthreadVideoCacheSizeInBytes: REMOTION_OFFTHREAD_VIDEO_CACHE_BYTES,
    });

    composition.durationInFrames = durationInFrames;
    composition.fps = DEFAULT_FPS;
    composition.width = VIDEO_WIDTH;
    composition.height = VIDEO_HEIGHT;

    const cpuCount = (await import("node:os")).cpus().length;
    const envConc = process.env.REMOTION_RENDER_CONCURRENCY;
    const renderConcurrency = envConc
      ? Math.max(1, Math.min(8, parseInt(envConc, 10) || 4))
      : 4;
    const renderScale = effectiveRenderScale();
    const crf = effectiveCrf();
    console.log(`[render-pipeline] Local render: concurrency=${renderConcurrency} (${cpuCount} CPUs)`);
    console.log(
      `[render-pipeline] Render scale: ${renderScale} → ${Math.round(VIDEO_WIDTH * renderScale)}x${Math.round(VIDEO_HEIGHT * renderScale)} @ ${DEFAULT_FPS}fps, crf=${crf}`
    );

    const isRetryableRenderError = (msg: string) =>
      /crashed|page crashed|Page closed|Target closed|ECONNRESET|SIGKILL|SIGABRT|out of memory|OOM|heap|Allocation failed/i.test(
        msg
      );

    try {
      await renderMedia({
        composition,
        serveUrl: bundleUrl,
        codec: "h264",
        outputLocation: outputPath,
        inputProps: serializedInputProps,
        imageFormat: "jpeg",
        jpegQuality: 70,
        scale: renderScale,
        crf,
        x264Preset: "ultrafast",
        concurrency: renderConcurrency,
        timeoutInMilliseconds: REMOTION_RENDER_TIMEOUT_MS,
        chromiumOptions: remotionChromiumOptions(),
        offthreadVideoCacheSizeInBytes: REMOTION_OFFTHREAD_VIDEO_CACHE_BYTES,
        onProgress: ({ progress }) => {
          notify("Rendering video", 0.65 + progress * 0.3);
        },
      });
    } catch (firstErr) {
      const errMsg = firstErr instanceof Error ? firstErr.message : String(firstErr);
      if (!isRetryableRenderError(errMsg)) {
        console.error(`[render-pipeline] renderMedia failed:`, errMsg);
        throw new Error(`Video rendering failed: ${errMsg}`);
      }
      process.stderr.write(
        `[render-pipeline] Render failed (${errMsg.slice(0, 240)}); retrying with concurrency=1…\n`
      );
      await renderMedia({
        composition,
        serveUrl: bundleUrl,
        codec: "h264",
        outputLocation: outputPath,
        inputProps: serializedInputProps,
        imageFormat: "jpeg",
        jpegQuality: 65,
        scale: renderScale,
        crf,
        x264Preset: "ultrafast",
        concurrency: 1,
        timeoutInMilliseconds: REMOTION_RENDER_TIMEOUT_MS,
        chromiumOptions: remotionChromiumOptions(),
        offthreadVideoCacheSizeInBytes: REMOTION_OFFTHREAD_VIDEO_CACHE_BYTES_RETRY,
        onProgress: ({ progress }) => {
          notify("Rendering video", 0.65 + progress * 0.3);
        },
      });
    }
  }

  notify("Render complete", 0.96);

  // --------------------------------------------------
  // Step 7: Upload to S3 (if configured)
  // --------------------------------------------------
  let videoUrl: string | undefined;
  const s3Bucket = process.env.S3_VIDEO_BUCKET;
  if (s3Bucket) {
    notify("Uploading video", 0.97);
    const s3Key = `videos/${outputFileName}`;
    const region = process.env.AWS_REGION || "us-east-1";
    const s3 = new S3Client({ region });
    // Stream upload: avoids reading the entire MP4 into memory (faster + lower memory).
    const fileSize = (await fs.stat(outputPath)).size;
    try {
      await s3.send(
        new PutObjectCommand({
          Bucket: s3Bucket,
          Key: s3Key,
          Body: createReadStream(outputPath),
          ContentType: "video/mp4",
          ContentLength: fileSize,
        })
      );
    } catch (err) {
      const detail = err instanceof Error ? err.message : String(err);
      console.error("[render-pipeline] S3 upload failed:", detail);
      throw new Error(
        `Video upload failed (S3_VIDEO_BUCKET is set; fix IAM/credentials/bucket policy): ${detail}`
      );
    }
    const s3Host =
      region === "us-east-1"
        ? `${s3Bucket}.s3.amazonaws.com`
        : `${s3Bucket}.s3.${region}.amazonaws.com`;
    videoUrl = `https://${s3Host}/${s3Key}`;
    notify("Upload complete", 0.99);
  }

  notify("Complete", 1.0);

  // --------------------------------------------------
  // Step 8: Clean up temp files + old renders
  // --------------------------------------------------
  try {
    await fs.rm(tmpDir, { recursive: true, force: true });
  } catch {
    // Non-critical
  }

  // Clean up old audio files from bundle/public/ (keep only current render's audio)
  try {
    const bundlePubFiles = await fs.readdir(bundlePublicDir);
    for (const f of bundlePubFiles) {
      if (f.startsWith("narration-") && f !== audioFileName) {
        await fs.unlink(path.join(bundlePublicDir, f)).catch(() => {});
      }
    }
  } catch {
    // Non-critical
  }

  // Clean old rendered videos (keep last 5)
  try {
    const videoFiles = (await fs.readdir(outputDir))
      .filter(f => f.endsWith(".mp4"))
      .sort()
      .reverse();
    for (const f of videoFiles.slice(5)) {
      await fs.unlink(path.join(outputDir, f)).catch(() => {});
    }
  } catch {
    // Non-critical
  }

  // --------------------------------------------------
  // Return result
  // --------------------------------------------------
  const durationSeconds = sceneDurations.reduce((a, b) => a + b, 0);

  return {
    videoPath: outputPath,
    videoUrl,
    durationSeconds,
    script: isPremium ? (premiumScript as any) : script!,
  };
}

/**
 * Clears the cached Remotion bundle, forcing a fresh bundle on the next render.
 */
export function clearBundleCache(): void {
  cachedBundleUrl = null;
}
