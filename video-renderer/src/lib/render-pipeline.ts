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
import { renderMedia, selectComposition } from "@remotion/renderer";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
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
  RENDER_SCALE,
  type PatientVideoProps,
  type PremiumPatientVideoProps,
  type DiagnosisType,
  type TreatmentType,
} from "./schema";
import { secondsToFrames, totalDurationFrames, totalDurationFramesWithBuffer } from "./timing";

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
}

export interface RenderJobResult {
  videoPath: string;
  videoUrl?: string;
  durationSeconds: number;
  script: GeneratedScript;
}

export type ProgressCallback = (step: string, progress: number) => void;

// ---------------------------------------------------------------------------
// Bundle cache
// ---------------------------------------------------------------------------

let cachedBundleUrl: string | null = null;

/**
 * Returns a cached bundle URL or creates a new one.
 * Checks for pre-built bundle first (created at Docker build time via prebundle.ts).
 * Falls back to runtime bundling if not found.
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

  // Check for pre-built bundle (Docker build time)
  const videoRendererRoot = path.resolve(__dirname, "../..");
  const preBundlePath = path.join(videoRendererRoot, ".remotion-bundle");
  try {
    await fs.access(path.join(preBundlePath, "index.html"));
    console.log("[render-pipeline] Using pre-built Remotion bundle");
    cachedBundleUrl = preBundlePath;
    return cachedBundleUrl;
  } catch {
    // No pre-built bundle — bundle at runtime
    console.log("[render-pipeline] No pre-built bundle found, bundling at runtime...");
  }

  const entryPoint = path.resolve(__dirname, "../index.ts");
  cachedBundleUrl = await bundle({
    entryPoint,
    webpackOverride: (config) => config,
  });

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
    doctorName: input.doctorName,
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
    doctorName: input.doctorName,
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
  const isPremium = input.mode === "premium";

  // Resolve directories
  const videoRendererRoot = path.resolve(__dirname, "../..");
  const publicDir = path.join(videoRendererRoot, "public");
  const outputDir = path.join(videoRendererRoot, "out");
  const tmpDir = path.join(videoRendererRoot, ".tmp", `job-${Date.now()}`);

  // Ensure directories exist
  await fs.mkdir(publicDir, { recursive: true });
  await fs.mkdir(outputDir, { recursive: true });
  await fs.mkdir(tmpDir, { recursive: true });

  // --------------------------------------------------
  // Step 1: Generate script
  // --------------------------------------------------
  notify("Generating script", 0.05);

  const scriptInput: ScriptGenerationInput = {
    patientName: input.patientName,
    doctorName: input.doctorName,
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

    // Capture alignment data and real duration if with-timestamps succeeded
    ttsAlignment = ttsResult.alignment;
    if (ttsAlignment && ttsAlignment.character_end_times_seconds.length > 0) {
      realAudioDurationSeconds =
        ttsAlignment.character_end_times_seconds[
          ttsAlignment.character_end_times_seconds.length - 1
        ];
      console.log(
        `[render-pipeline] Real audio duration from TTS: ${realAudioDurationSeconds.toFixed(1)}s`
      );
    }

    // Copy to public/ so Remotion can access it via staticFile()
    const audioPublicName = `narration-${Date.now()}.mp3`;
    const audioPublicPath = path.join(publicDir, audioPublicName);
    await fs.copyFile(audioTmpPath, audioPublicPath);

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
  };

  const stockPair = stockPhotoMap[input.treatment] || { before: "stock/dental-checkup.jpg", after: "stock/smile-after-2.jpg" };
  let beforePhotoFileName = stockPair.before;
  let afterPhotoFileName = stockPair.after;

  if (input.beforePhotoBase64) {
    const beforeName = `before-photo-${Date.now()}.jpg`;
    const beforePath = path.join(publicDir, beforeName);
    await fs.writeFile(beforePath, Buffer.from(input.beforePhotoBase64, "base64"));
    beforePhotoFileName = beforeName;
  }
  if (input.afterPhotoBase64) {
    const afterName = `after-photo-${Date.now()}.jpg`;
    const afterPath = path.join(publicDir, afterName);
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
  // Step 5: Bundle Remotion project
  // --------------------------------------------------
  notify("Bundling Remotion project", 0.5);
  const bundleUrl = await getOrCreateBundle();
  notify("Bundle ready", 0.55);

  // --------------------------------------------------
  // Step 5b: Copy dynamic files into the bundle's public/ directory
  // The Remotion bundle has its own copy of public/ — files generated
  // after bundling (audio, photos) must be copied there for staticFile() to work.
  // --------------------------------------------------
  const bundlePublicDir = path.join(bundleUrl, "public");
  await fs.mkdir(bundlePublicDir, { recursive: true });

  // Copy audio file into bundle
  if (audioFileName) {
    const src = path.join(publicDir, audioFileName);
    const dest = path.join(bundlePublicDir, audioFileName);
    try {
      await fs.copyFile(src, dest);
      console.log(`[render-pipeline] Copied audio to bundle: ${audioFileName}`);
    } catch (err) {
      console.error(`[render-pipeline] Failed to copy audio to bundle:`, err);
    }
  }

  // Copy before/after photos into bundle (both uploaded and stock)
  for (const photoFile of [beforePhotoFileName, afterPhotoFileName]) {
    if (!photoFile) continue;
    const src = path.join(publicDir, photoFile);
    const dest = path.join(bundlePublicDir, photoFile);
    try {
      // Ensure subdirectory exists (e.g. stock/)
      await fs.mkdir(path.dirname(dest), { recursive: true });
      await fs.copyFile(src, dest);
      console.log(`[render-pipeline] Copied photo to bundle: ${photoFile}`);
    } catch (err) {
      console.error(`[render-pipeline] Failed to copy photo to bundle: ${photoFile}`, err);
    }
  }

  // Also ensure all stock photos are in the bundle (for before/after defaults)
  const stockDir = path.join(publicDir, "stock");
  const bundleStockDir = path.join(bundlePublicDir, "stock");
  try {
    await fs.mkdir(bundleStockDir, { recursive: true });
    const stockFiles = await fs.readdir(stockDir);
    for (const file of stockFiles) {
      const src = path.join(stockDir, file);
      const dest = path.join(bundleStockDir, file);
      try {
        await fs.copyFile(src, dest);
      } catch {
        // Skip non-files
      }
    }
    console.log(`[render-pipeline] Synced ${stockFiles.length} stock photos to bundle`);
  } catch {
    console.warn("[render-pipeline] No stock photos directory found — skipping");
  }

  // Copy dental-3d renders into the bundle
  const dental3dDir = path.join(publicDir, "dental-3d");
  const bundleDental3dDir = path.join(bundlePublicDir, "dental-3d");
  try {
    await fs.mkdir(bundleDental3dDir, { recursive: true });
    const dental3dFiles = await fs.readdir(dental3dDir);
    for (const file of dental3dFiles) {
      const src = path.join(dental3dDir, file);
      const dest = path.join(bundleDental3dDir, file);
      try {
        await fs.copyFile(src, dest);
      } catch {
        // Skip non-files
      }
    }
    console.log(`[render-pipeline] Synced ${dental3dFiles.length} dental-3d renders to bundle`);
  } catch {
    console.warn("[render-pipeline] No dental-3d directory found — skipping");
  }

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
  }

  // Calculate composition duration.
  // If we have real audio duration from the with-timestamps API, use that
  // as the source of truth (+ buffer). Otherwise fall back to script estimates.
  let durationInFrames: number;
  if (realAudioDurationSeconds) {
    // Use real audio as primary duration source with minimal buffer (1s for visual outro fade)
    const bufferSeconds = 1;
    durationInFrames = secondsToFrames(realAudioDurationSeconds + bufferSeconds, DEFAULT_FPS);
    console.log(
      `[render-pipeline] Composition duration: ${durationInFrames} frames ` +
        `(from real audio: ${realAudioDurationSeconds.toFixed(1)}s + ${bufferSeconds}s buffer = ${(durationInFrames / DEFAULT_FPS).toFixed(1)}s)`
    );
  } else {
    durationInFrames = totalDurationFramesWithBuffer(sceneDurations, DEFAULT_FPS);
  }

  // Hard cap: never exceed 2 minutes (120 seconds)
  const MAX_DURATION_SECONDS = 120;
  const maxFrames = secondsToFrames(MAX_DURATION_SECONDS, DEFAULT_FPS);
  if (durationInFrames > maxFrames) {
    console.log(`[render-pipeline] Capping duration from ${durationInFrames} to ${maxFrames} frames (${MAX_DURATION_SECONDS}s max)`);
    durationInFrames = maxFrames;
  }

  const composition = await selectComposition({
    serveUrl: bundleUrl,
    id: compositionId,
    inputProps,
    chromiumOptions: {
      args: ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
    },
  });

  // Override the duration to match the generated script (with audio buffer)
  composition.durationInFrames = durationInFrames;
  composition.fps = DEFAULT_FPS;
  composition.width = VIDEO_WIDTH;
  composition.height = VIDEO_HEIGHT;

  const outputFileName = `patient-video-${Date.now()}.mp4`;
  const outputPath = path.join(outputDir, outputFileName);

  // Concurrency: use ALL CPU cores (720p frames are lightweight enough).
  // On 4 vCPU cloud: 4. On 10-core Mac: up to 8.
  const cpuCount = (await import("node:os")).cpus().length;
  const renderConcurrency = Math.max(2, Math.min(cpuCount, 8));
  console.log(`[render-pipeline] Rendering with concurrency ${renderConcurrency} (${cpuCount} CPUs detected)`);
  console.log(`[render-pipeline] Render scale: ${RENDER_SCALE} → ${Math.round(VIDEO_WIDTH * RENDER_SCALE)}x${Math.round(VIDEO_HEIGHT * RENDER_SCALE)} @ ${DEFAULT_FPS}fps`);

  try {
    await renderMedia({
      composition,
      serveUrl: bundleUrl,
      codec: "h264",
      outputLocation: outputPath,
      inputProps,
      imageFormat: "jpeg",
      jpegQuality: 75,
      scale: RENDER_SCALE,
      crf: 30,
      concurrency: renderConcurrency,
      timeoutInMilliseconds: 8 * 60 * 1000, // 8 min timeout for render
      chromiumOptions: {
        args: [
          "--no-sandbox",
          "--disable-gpu",
          "--disable-dev-shm-usage",
          "--disable-web-security",
          "--single-process",
          "--disable-setuid-sandbox",
          "--disable-background-networking",
          "--disable-extensions",
        ],
      },
      onProgress: ({ progress }) => {
        notify("Rendering video", 0.65 + progress * 0.3);
      },
    });
  } catch (renderErr) {
    const errMsg = renderErr instanceof Error ? renderErr.message : String(renderErr);
    console.error(`[render-pipeline] renderMedia failed:`, errMsg);
    throw new Error(`Video rendering failed: ${errMsg}`);
  }

  notify("Render complete", 0.96);

  // --------------------------------------------------
  // Step 7: Upload to S3 (if configured)
  // --------------------------------------------------
  let videoUrl: string | undefined;
  const s3Bucket = process.env.S3_VIDEO_BUCKET;
  if (s3Bucket) {
    try {
      notify("Uploading video", 0.97);
      const s3Key = `videos/${outputFileName}`;
      const s3 = new S3Client({ region: process.env.AWS_REGION || "us-east-1" });
      const fileBuffer = await fs.readFile(outputPath);
      await s3.send(
        new PutObjectCommand({
          Bucket: s3Bucket,
          Key: s3Key,
          Body: fileBuffer,
          ContentType: "video/mp4",
        })
      );
      videoUrl = `https://${s3Bucket}.s3.amazonaws.com/${s3Key}`;
      notify("Upload complete", 0.99);
    } catch (err) {
      console.error("[render-pipeline] S3 upload failed, using local file:", err);
      // Non-fatal — fall back to local file serving
    }
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

  // Clean up old audio files from bundle public dir (keep only current)
  try {
    const bundlePubFiles = await fs.readdir(bundlePublicDir);
    for (const f of bundlePubFiles) {
      if (f.startsWith("narration-") && f !== audioFileName) {
        await fs.unlink(path.join(bundlePublicDir, f)).catch(() => {});
      }
      if ((f.startsWith("before-photo-") || f.startsWith("after-photo-")) && f !== beforePhotoFileName && f !== afterPhotoFileName) {
        await fs.unlink(path.join(bundlePublicDir, f)).catch(() => {});
      }
    }
  } catch {
    // Non-critical
  }

  // Clean old audio from source public dir too
  try {
    const pubFiles = await fs.readdir(publicDir);
    for (const f of pubFiles) {
      if (f.startsWith("narration-") && f !== audioFileName) {
        await fs.unlink(path.join(publicDir, f)).catch(() => {});
      }
      if ((f.startsWith("before-photo-") || f.startsWith("after-photo-")) && f !== beforePhotoFileName && f !== afterPhotoFileName) {
        await fs.unlink(path.join(publicDir, f)).catch(() => {});
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
