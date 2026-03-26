/**
 * render-pipeline-demo.ts
 *
 * A simplified render pipeline that uses only the demo script generator.
 * No external API calls required — suitable for testing the full render
 * pipeline end-to-end without API keys.
 */

import path from "node:path";
import fs from "node:fs/promises";
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import {
  generateDemoScript,
  type ScriptGenerationInput,
  type GeneratedScript,
} from "./script-generator";
import { generateCaptions } from "./captions-generator";
import {
  DEFAULT_FPS,
  VIDEO_WIDTH,
  VIDEO_HEIGHT,
  type PatientVideoProps,
  type DiagnosisType,
  type TreatmentType,
} from "./schema";
import { totalDurationFrames } from "./timing";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface DemoRenderInput {
  patientName: string;
  doctorName: string;
  clinicName: string;
  category: "dental" | "orthodontic" | "financial";
  diagnosis: string;
  treatment: string;
  clinicBrand?: {
    primaryColor?: string;
    accentColor?: string;
  };
}

export interface DemoRenderResult {
  videoPath: string;
  durationSeconds: number;
  script: GeneratedScript;
}

// ---------------------------------------------------------------------------
// Bundle cache
// ---------------------------------------------------------------------------

let cachedBundleUrl: string | null = null;

async function getOrCreateBundle(): Promise<string> {
  if (cachedBundleUrl) {
    try {
      await fs.access(cachedBundleUrl);
      return cachedBundleUrl;
    } catch {
      cachedBundleUrl = null;
    }
  }

  const entryPoint = path.resolve(__dirname, "../index.ts");
  console.log("[demo-pipeline] Bundling Remotion project...");
  cachedBundleUrl = await bundle({
    entryPoint,
    webpackOverride: (config) => config,
  });
  console.log("[demo-pipeline] Bundle complete.");

  return cachedBundleUrl;
}

// ---------------------------------------------------------------------------
// Main demo pipeline
// ---------------------------------------------------------------------------

/**
 * Runs the full render pipeline using only the demo script generator.
 * No API keys required.
 *
 * @param input - Patient and clinic details for the demo video.
 * @returns Path to the rendered MP4 and metadata.
 */
export async function renderDemoVideo(
  input: DemoRenderInput
): Promise<DemoRenderResult> {
  const videoRendererRoot = path.resolve(__dirname, "../..");
  const outputDir = path.join(videoRendererRoot, "out");
  await fs.mkdir(outputDir, { recursive: true });

  // --------------------------------------------------
  // Step 1: Generate demo script (no API call)
  // --------------------------------------------------
  console.log("[demo-pipeline] Generating demo script...");
  const scriptInput: ScriptGenerationInput = {
    patientName: input.patientName,
    doctorName: input.doctorName,
    clinicName: input.clinicName,
    category: input.category,
    diagnosis: input.diagnosis,
    treatment: input.treatment,
  };
  const script = generateDemoScript(scriptInput);
  console.log(`[demo-pipeline] Script generated: "${script.title}" (${script.totalDurationSeconds}s)`);

  // --------------------------------------------------
  // Step 2: Generate captions
  // --------------------------------------------------
  console.log("[demo-pipeline] Generating captions...");
  const captions = generateCaptions(script.scenes, DEFAULT_FPS);
  console.log(`[demo-pipeline] Generated ${captions.length} caption entries.`);

  // --------------------------------------------------
  // Step 3: Build Remotion input props
  // --------------------------------------------------
  const inputProps: PatientVideoProps = {
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
    clinicBrand: {
      primaryColor: input.clinicBrand?.primaryColor ?? "#7c3aed",
      accentColor: input.clinicBrand?.accentColor ?? "#a855f7",
    },
  };

  // --------------------------------------------------
  // Step 4: Bundle Remotion project
  // --------------------------------------------------
  const bundleUrl = await getOrCreateBundle();

  // --------------------------------------------------
  // Step 5: Select composition and render
  // --------------------------------------------------
  console.log("[demo-pipeline] Selecting composition...");

  const sceneDurations = [
    script.scenes.intro.durationSeconds,
    script.scenes.problem.durationSeconds,
    script.scenes.treatment.durationSeconds,
    script.scenes.outcome.durationSeconds,
    script.scenes.cta.durationSeconds,
  ];
  const durationInFrames = totalDurationFrames(sceneDurations, DEFAULT_FPS);

  const composition = await selectComposition({
    serveUrl: bundleUrl,
    id: "PatientVideo",
    inputProps,
  });

  composition.durationInFrames = durationInFrames;
  composition.fps = DEFAULT_FPS;
  composition.width = VIDEO_WIDTH;
  composition.height = VIDEO_HEIGHT;

  const outputFileName = `demo-video-${Date.now()}.mp4`;
  const outputPath = path.join(outputDir, outputFileName);

  console.log(`[demo-pipeline] Rendering ${durationInFrames} frames at ${DEFAULT_FPS}fps...`);

  await renderMedia({
    composition,
    serveUrl: bundleUrl,
    codec: "h264",
    outputLocation: outputPath,
    inputProps,
    imageFormat: "jpeg",
    onProgress: ({ progress }) => {
      const pct = Math.round(progress * 100);
      if (pct % 10 === 0) {
        process.stdout.write(`\r[demo-pipeline] Render progress: ${pct}%`);
      }
    },
  });

  console.log("\n[demo-pipeline] Render complete!");

  const durationSeconds = sceneDurations.reduce((a, b) => a + b, 0);

  return {
    videoPath: outputPath,
    durationSeconds,
    script,
  };
}
