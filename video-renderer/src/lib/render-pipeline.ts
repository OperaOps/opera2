/**
 * render-pipeline.ts
 *
 * Orchestrates the full patient video generation pipeline (flagship format):
 *   1. Generate script (Claude API or demo)
 *   2. Build flagship segments (intro card → journey timeline → clips → warm close)
 *   3. Generate per-segment TTS audio (each segment sized to its narration)
 *   5. Bundle Remotion project / upload segment audio for Lambda
 *   6. Render the FlagshipVideo composition
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
  generateDemoScript,
  generatePremiumDemoScript,
  generateScriptSmart,
  generatePremiumScriptSmart,
  type ScriptGenerationInput,
  type GeneratedScript,
  type PremiumGeneratedScript,
} from "./script-generator";
import {
  generateTTS,
  probeAudioFileDurationSeconds,
  PREMIUM_VOICE_ID,
} from "./tts";
import {
  VIDEO_WIDTH,
  VIDEO_HEIGHT,
  RENDER_SCALE as DEFAULT_RENDER_SCALE,
} from "./schema";
import {
  buildFlagshipSegments,
  buildPreconsultSegments,
  estimateNarrationSeconds,
  flagshipTotalSeconds,
  FLAGSHIP_FPS,
  FLAGSHIP_TEAL,
  type FlagshipSegment,
  type FlagshipVideoProps,
} from "./flagship";
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
  logoUrl?: string;
  phoneNumber?: string;
  presetScript?: Record<string, unknown>;
  /** Pre-consult welcome mode — a short hello over the clinic's tour footage.
   *  Skips script generation entirely (no diagnosis/treatment exists yet). */
  preconsult?: {
    tourVideoUrl: string;
    tourDurationSeconds?: number;
    appointmentType?: string;
    appointmentDate?: string;
    /** Visual is Opera stock, not the clinic's office — narration stays neutral. */
    genericVisual?: boolean;
    /** Still image for the closing beat when the visual is generic. */
    stillImageUrl?: string;
  };
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

/**
 * Returns a render scale that ALWAYS produces integer, even dimensions.
 * Remotion passes scale * width/height to stitchFramesToVideo which requires integers.
 */
function effectiveRenderScale(): number {
  const raw = process.env.REMOTION_RENDER_SCALE?.trim();
  let scale = DEFAULT_RENDER_SCALE;
  if (raw) {
    const n = Number(raw);
    if (Number.isFinite(n) && n >= 0.25 && n <= 1) scale = n;
  }
  // Force the final pixel dimensions to be even integers
  const w = Math.round(VIDEO_WIDTH * scale);
  const h = Math.round(VIDEO_HEIGHT * scale);
  const evenW = w % 2 === 0 ? w : w + 1;
  const evenH = h % 2 === 0 ? h : h + 1;
  // Return the exact scale that produces these integer dimensions
  // Use height-based scale since 1080 is the smaller dimension
  return evenH / VIDEO_HEIGHT;
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

  // Single generation mode: a clinically-vetted template skeleton personalized
  // by AI ("template_ai"). generate*Smart() automatically falls back to full-AI
  // generation when no template exists for the treatment.
  const smartInput = { ...scriptInput, contentMode: "template_ai" as const };

  let script: GeneratedScript | undefined;
  let premiumScript: PremiumGeneratedScript | undefined;

  if (input.preconsult) {
    // Pre-consult welcome: fixed warm template, no AI script.
    process.stderr.write("[render-pipeline] Pre-consult welcome mode (no script generation)\n");
  } else if (isPremium) {
    if (input.presetScript) {
      premiumScript = input.presetScript as unknown as PremiumGeneratedScript;
      process.stderr.write("[render-pipeline] Using preset script (skipping AI generation)\n");
    } else if (input.useDemo) {
      premiumScript = generatePremiumDemoScript(scriptInput);
    } else {
      premiumScript = await generatePremiumScriptSmart(smartInput, apiKey);
      console.log("[render-pipeline] Generated premium script (template_ai + full-AI fallback)");
    }
  } else {
    if (input.useDemo) {
      script = generateDemoScript(scriptInput);
    } else {
      script = await generateScriptSmart(smartInput, apiKey);
      console.log("[render-pipeline] Generated script (template_ai + full-AI fallback)");
    }
  }

  notify("Script generated", 0.15);

  // --------------------------------------------------
  // Step 2: Build flagship segments (intro card → timeline → clips → warm close)
  // --------------------------------------------------
  let segments: FlagshipSegment[];
  if (input.preconsult) {
    // Probe the tour footage's true length so the two tour beats can show
    // different parts of the office (ffprobe reads https URLs directly).
    const probed =
      input.preconsult.tourDurationSeconds ||
      (await probeAudioFileDurationSeconds(input.preconsult.tourVideoUrl));
    segments = buildPreconsultSegments({
      patientName: input.patientName,
      doctorName: stripDoctorPrefix(input.doctorName),
      clinicName: input.clinicName,
      tourVideoUrl: input.preconsult.tourVideoUrl,
      tourDurationSeconds: probed > 0 ? probed : 30,
      appointmentType: input.preconsult.appointmentType,
      appointmentDate: input.preconsult.appointmentDate,
      genericVisual: input.preconsult.genericVisual,
      stillImageUrl: input.preconsult.stillImageUrl,
    });
  } else {
    segments = buildFlagshipSegments({
      patientName: input.patientName,
      doctorName: stripDoctorPrefix(input.doctorName),
      clinicName: input.clinicName,
      category: input.category,
      treatment: input.treatment,
      script: isPremium ? undefined : script,
      premiumScript: isPremium ? premiumScript : undefined,
    });
  }
  process.stderr.write(`[render-pipeline] Flagship segments: ${segments.length}\n`);

  // --------------------------------------------------
  // Step 3: Per-segment TTS — each segment is sized to its own narration audio,
  // so cuts land exactly between spoken beats (the flagship format).
  // --------------------------------------------------
  const jobId = Date.now();
  const segmentAudio: { tmpPath: string; publicName: string }[] = [];

  const elevenLabsKey = process.env.ELEVENLABS_API_KEY;
  if (elevenLabsKey) {
    notify("Generating voiceover audio", 0.2);
    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      const tmpPath = path.join(tmpDir, `flagship-seg-${i}.mp3`);
      await generateTTS(
        seg.narration,
        tmpPath,
        elevenLabsKey,
        isPremium ? PREMIUM_VOICE_ID : undefined
      );
      const probed = await probeAudioFileDurationSeconds(tmpPath);
      seg.durationSeconds =
        (probed > 0 ? probed : estimateNarrationSeconds(seg.narration)) + 0.45;
      seg.audioFile = `flagship-${jobId}-${i}.mp3`;
      segmentAudio.push({ tmpPath, publicName: seg.audioFile });
      notify("Generating voiceover audio", 0.2 + ((i + 1) / segments.length) * 0.18);
    }
    process.stderr.write(
      `[render-pipeline] Segment audio ready: ${segments
        .map((s) => s.durationSeconds.toFixed(1))
        .join("s, ")}s (total ${flagshipTotalSeconds(segments).toFixed(1)}s)\n`
    );
  } else {
    console.warn(
      "[render-pipeline] ELEVENLABS_API_KEY not set — rendering without voiceover audio."
    );
    notify("Skipping TTS (no API key)", 0.38);
  }

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
  // Only the per-render segment audio (flagship-*.mp3) needs to be copied here,
  // since it is generated at render time and isn't part of the Docker build.
  // --------------------------------------------------
  // For Lambda: upload each segment's narration to the Remotion Lambda bucket and
  // hand the composition presigned URLs (Lambda workers can't read our tmpDir).
  if (lambdaConfigured && segmentAudio.length) {
    const lambdaBucket = "remotionlambda-useast1-zpvm5jjogw";
    try {
      const s3 = new S3Client({ region: process.env.AWS_REGION || "us-east-1" });
      const { getSignedUrl } = await import("@aws-sdk/s3-request-presigner");
      const { GetObjectCommand } = await import("@aws-sdk/client-s3");
      // duplicate @smithy/types trees make client/command nominally incompatible — safe cast
      const presign = getSignedUrl as unknown as (
        client: unknown,
        command: unknown,
        options: { expiresIn: number }
      ) => Promise<string>;
      for (let i = 0; i < segmentAudio.length; i++) {
        const { tmpPath, publicName } = segmentAudio[i];
        const audioKey = `audio/${publicName}`;
        const audioData = await fs.readFile(tmpPath);
        await s3.send(new PutObjectCommand({
          Bucket: lambdaBucket,
          Key: audioKey,
          Body: audioData,
          ContentType: "audio/mpeg",
        }));
        segments[i].audioUrl = await presign(
          s3,
          new GetObjectCommand({ Bucket: lambdaBucket, Key: audioKey }),
          { expiresIn: 3600 }
        );
      }
      console.log(
        `[render-pipeline] Uploaded ${segmentAudio.length} segment audio files to S3 with presigned URLs`
      );
    } catch (err) {
      console.error(`[render-pipeline] Failed to upload segment audio to S3:`, err);
    }
  }

  const bundlePublicDir = lambdaConfigured ? tmpDir : path.join(bundleUrl, "public");

  // Ensure bundle public dir exists (should already from prebundle, but safety)
  if (!lambdaConfigured) {
    await fs.mkdir(bundlePublicDir, { recursive: true }).catch(() => {});

    // Copy segment audio into bundle/public/ so staticFile("flagship-xxx.mp3") resolves.
    for (const { tmpPath, publicName } of segmentAudio) {
      const dest = path.join(bundlePublicDir, publicName);
      try {
        await fs.copyFile(tmpPath, dest);
      } catch (err) {
        // Audio missing = no narration. Fail loudly so we know.
        throw new Error(
          `[render-pipeline] FATAL: Failed to copy segment audio to bundle/public/. ` +
            `src=${tmpPath} dest=${dest} error=${err instanceof Error ? err.message : String(err)}`
        );
      }
    }
    if (segmentAudio.length) {
      process.stderr.write(
        `[render-pipeline] Copied ${segmentAudio.length} segment audio files to bundle/public/\n`
      );
    }
  }

  // Treatment clips + the opera-bgm bed live in bundle/public (Docker build) and
  // resolve via staticFile() inside the FlagshipVideo composition.

  notify("Assets synced to bundle", 0.6);

  // --------------------------------------------------
  // Step 6: Render video — always the FlagshipVideo composition
  // --------------------------------------------------
  notify("Rendering video", 0.65);

  const inputProps: FlagshipVideoProps = {
    patientName: input.patientName,
    doctorName: stripDoctorPrefix(input.doctorName),
    clinicName: input.clinicName,
    accentColor: FLAGSHIP_TEAL,
    bgmUrl: input.bgmUrl ?? (process.env.OPERA_BGM_PUBLIC_PATH?.trim() || undefined),
    segments,
  };
  const compositionId = "FlagshipVideo";
  process.stderr.write(
    `[render-pipeline] Using composition=FlagshipVideo treatment=${input.treatment} diagnosis=${input.diagnosis} segments=${segments.length} audio=${segmentAudio.length}\n`
  );

  // Composition duration: segments are sized to their real narration audio, so the
  // total is exact — plus a half-second of headroom (matches calculateFlagshipMetadata).
  const totalSeconds = flagshipTotalSeconds(segments) + 0.5;
  const durationInFrames = Math.ceil(totalSeconds * FLAGSHIP_FPS);
  console.log(
    `[render-pipeline] Composition duration: ${durationInFrames} frames (${totalSeconds.toFixed(1)}s @ ${FLAGSHIP_FPS}fps)`
  );

  let serializedInputProps = inputProps as Record<string, unknown>;

  const outputFileName = `patient-video-${Date.now()}.mp4`;
  const outputPath = path.join(outputDir, outputFileName);

  // Hardcoded Lambda config — env vars keep getting dropped by App Runner deployments
  const lambdaFnName = process.env.REMOTION_LAMBDA_FUNCTION_NAME || "remotion-render-4-0-242-mem3008mb-disk2048mb-240sec";
  const lambdaServeUrl = process.env.REMOTION_LAMBDA_SERVE_URL || "https://remotionlambda-useast1-zpvm5jjogw.s3.us-east-1.amazonaws.com/sites/opera-patient-video/index.html";
  const lambdaRegion = (process.env.REMOTION_LAMBDA_REGION || process.env.AWS_REGION || "us-east-1") as AwsRegion;
  // Always use Lambda — unless forced local (e.g. new clips not yet in the
  // deployed Lambda serve bundle).
  let useLambda = process.env.OPERA_FORCE_LOCAL_RENDER !== "1";
  process.stderr.write(`[render-pipeline] Lambda: fn=${lambdaFnName} region=${lambdaRegion}\n`);

  if (useLambda) {
    // ---- Remotion Lambda: distributed render across many workers ----
    try {
      const { renderMediaOnLambda, getRenderProgress } = await import("@remotion/lambda");
      process.stderr.write(`[render-pipeline] @remotion/lambda imported OK\n`);

      const renderScale = effectiveRenderScale();
      const crf = effectiveCrf();
      process.stderr.write(
        `[render-pipeline] Lambda render: ${compositionId} @ ${FLAGSHIP_FPS}fps, scale=${renderScale}, crf=${crf}, frames=${durationInFrames}\n`
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
      // Clip-heavy compositions fail with too many workers concurrently decoding the
      // same MP4s — 120 (retry 150) is the proven setting for video-clip scenes.
      framesPerLambda: 120,
      timeoutInMilliseconds: 240000,
      overwrite: true,
      outName: outputFileName,
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
      const errMsg = lambdaErr instanceof Error ? lambdaErr.message : String(lambdaErr);
      process.stderr.write(`[render-pipeline] Lambda render attempt 1 FAILED: ${errMsg}\n`);
      process.stderr.write(`[render-pipeline] Retrying Lambda render once...\n`);
      try {
        const { renderMediaOnLambda, getRenderProgress } = await import("@remotion/lambda");
        const renderScale = effectiveRenderScale();
        const crf = effectiveCrf();
        const { renderId: retryRenderId, bucketName: retryBucket } = await renderMediaOnLambda({
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
          framesPerLambda: 150,
          timeoutInMilliseconds: 240000,
          overwrite: true,
          outName: outputFileName,
        });
        process.stderr.write(`[render-pipeline] Lambda retry started: renderId=${retryRenderId}\n`);
        let retryDone = false;
        while (!retryDone) {
          await new Promise((r) => setTimeout(r, 2000));
          const progress = await getRenderProgress({ renderId: retryRenderId, bucketName: retryBucket, functionName: lambdaFnName, region: lambdaRegion });
          if (progress.overallProgress !== null) notify("Rendering video", 0.65 + progress.overallProgress * 0.3);
          if (progress.done) {
            retryDone = true;
            if (progress.outputFile) {
              const https = await import("node:https");
              const fsSync = await import("node:fs");
              const file = fsSync.createWriteStream(outputPath);
              await new Promise<void>((resolve, reject) => {
                https.get(progress.outputFile!, (res) => { res.pipe(file); file.on("finish", () => { file.close(); resolve(); }); }).on("error", reject);
              });
              console.log(`[render-pipeline] Lambda retry complete, downloaded to ${outputPath}`);
            }
          }
          if (progress.fatalErrorEncountered) throw new Error(`Lambda retry failed: ${JSON.stringify(progress.errors)}`);
        }
      } catch (retryErr) {
        const retryMsg = retryErr instanceof Error ? retryErr.message : String(retryErr);
        process.stderr.write(`[render-pipeline] Lambda retry also FAILED: ${retryMsg}\n`);
        process.stderr.write(`[render-pipeline] Falling back to local render\n`);
        useLambda = false;
      }
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

    // When falling back from Lambda, segment audio was left in tmpDir (not the
    // bundle's public/), so copy every segment mp3 so staticFile() resolves locally.
    const localPublicDir = path.join(bundleUrl, "public");
    await fs.mkdir(localPublicDir, { recursive: true }).catch(() => {});
    for (const { tmpPath, publicName } of segmentAudio) {
      const audioDest = path.join(localPublicDir, publicName);
      try {
        await fs.copyFile(tmpPath, audioDest);
      } catch (err) {
        throw new Error(
          `[render-pipeline] Local fallback: failed to copy segment audio: ${err instanceof Error ? err.message : String(err)}`
        );
      }
    }
    if (segmentAudio.length) {
      process.stderr.write(
        `[render-pipeline] Local fallback: copied ${segmentAudio.length} segment audio files\n`
      );
    }
    // Presigned S3 URLs from the Lambda attempt may be set on segments — clear them
    // so the composition resolves narration via staticFile() locally.
    let clearedAny = false;
    for (const seg of segments) {
      if (seg.audioUrl) {
        seg.audioUrl = undefined;
        clearedAny = true;
      }
    }
    if (clearedAny) {
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
    composition.fps = FLAGSHIP_FPS;
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
      `[render-pipeline] Render scale: ${renderScale} → ${Math.round(VIDEO_WIDTH * renderScale)}x${Math.round(VIDEO_HEIGHT * renderScale)} @ ${FLAGSHIP_FPS}fps, crf=${crf}`
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
    const s3 = new S3Client({ region, requestHandler: { requestTimeout: 120000 } as any });
    const videoBuffer = await fs.readFile(outputPath);
    const MAX_UPLOAD_RETRIES = 3;
    for (let attempt = 0; attempt < MAX_UPLOAD_RETRIES; attempt++) {
      try {
        await s3.send(
          new PutObjectCommand({
            Bucket: s3Bucket,
            Key: s3Key,
            Body: videoBuffer,
            ContentType: "video/mp4",
          })
        );
        break;
      } catch (err) {
        const detail = err instanceof Error ? err.message : String(err);
        if (attempt < MAX_UPLOAD_RETRIES - 1) {
          process.stderr.write(`[render-pipeline] S3 upload attempt ${attempt + 1} failed: ${detail.slice(0, 100)}. Retrying...\n`);
          await new Promise((r) => setTimeout(r, (attempt + 1) * 2000));
        } else {
          console.error("[render-pipeline] S3 upload failed after retries:", detail);
          throw new Error(`Video upload failed: ${detail}`);
        }
      }
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
    const currentAudio = new Set(segmentAudio.map((a) => a.publicName));
    const bundlePubFiles = await fs.readdir(bundlePublicDir);
    for (const f of bundlePubFiles) {
      if (
        (f.startsWith("narration-") || f.startsWith("flagship-")) &&
        !currentAudio.has(f)
      ) {
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
  const durationSeconds = Math.round(flagshipTotalSeconds(segments));

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
