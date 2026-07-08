/**
 * test-flagship-local.ts — end-to-end local verification of the flagship format.
 *
 * Mirrors the production pipeline (premium demo script → flagship segments →
 * per-segment ElevenLabs TTS → FlagshipVideo composition) but renders locally
 * instead of on Lambda, so the new standard can be verified before deploying
 * the Remotion site.
 *
 * Usage: ELEVENLABS_API_KEY=... npx tsx scripts/test-flagship-local.ts [treatment]
 */

import path from "node:path";
import fs from "node:fs/promises";
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import {
  generatePremiumDemoScript,
  generatePremiumScriptSmart,
} from "../src/lib/script-generator";
import { generateTTS, probeAudioFileDurationSeconds, PREMIUM_VOICE_ID } from "../src/lib/tts";
import {
  buildFlagshipSegments,
  estimateNarrationSeconds,
  flagshipTotalSeconds,
  FLAGSHIP_TEAL,
  type FlagshipVideoProps,
} from "../src/lib/flagship";

async function main() {
  // argv: treatment [patientName] [doctorName] [clinicName] [diagnosis]
  const treatment = process.argv[2] || "invisalign";
  const patientName = process.argv[3] || "James";
  const doctorName = process.argv[4] || "Zitterkopf";
  const clinicName = process.argv[5] || "Life Orthodontics";
  const diagnosis = process.argv[6] || "crowding";
  const category = ["braces", "invisalign", "expander", "retainer", "ceramic_braces"].includes(
    treatment
  )
    ? ("orthodontic" as const)
    : ("dental" as const);

  const root = path.resolve(__dirname, "..");
  const outPath = path.join(root, "out", `flagship-test-${treatment}.mp4`);
  const tmpDir = path.join(root, ".tmp", `flagship-test-${Date.now()}`);
  await fs.mkdir(tmpDir, { recursive: true });
  await fs.mkdir(path.join(root, "out"), { recursive: true });

  // Real Claude personalization when a key + transcript are available (mirrors
  // production); otherwise the canned demo script.
  const claudeKey = process.env.CLAUDE_API_KEY || process.env.ANTHROPIC_API_KEY;
  const transcriptFile = process.env.TRANSCRIPT_FILE;
  const treatmentNotes = transcriptFile
    ? await fs.readFile(transcriptFile, "utf-8")
    : undefined;

  const scriptInput = {
    patientName,
    doctorName,
    clinicName,
    category,
    diagnosis,
    treatment,
    treatmentNotes,
    contentMode: "full_ai" as const,
  };

  let premiumScript;
  if (claudeKey && treatmentNotes) {
    console.log(`[test] Generating REAL Claude script (${category}/${treatment}) for ${patientName} from transcript…`);
    premiumScript = await generatePremiumScriptSmart(scriptInput, claudeKey);
  } else {
    console.log(`[test] Building premium demo script (${category}/${treatment}/${diagnosis}) for ${patientName}…`);
    premiumScript = generatePremiumDemoScript(scriptInput);
  }

  const segments = buildFlagshipSegments({
    patientName,
    doctorName,
    clinicName,
    category,
    treatment,
    premiumScript,
  });
  console.log(`[test] ${segments.length} segments`);

  const key = process.env.ELEVENLABS_API_KEY;
  if (key) {
    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      const tmpPath = path.join(tmpDir, `seg-${i}.mp3`);
      await generateTTS(seg.narration, tmpPath, key, PREMIUM_VOICE_ID);
      const probed = await probeAudioFileDurationSeconds(tmpPath);
      seg.durationSeconds = (probed > 0 ? probed : estimateNarrationSeconds(seg.narration)) + 0.45;
      seg.audioFile = `flagship-test-${i}.mp3`;
      console.log(`[test] seg ${i} (${seg.kind}): ${seg.durationSeconds.toFixed(1)}s`);
    }
  } else {
    console.warn("[test] No ELEVENLABS_API_KEY — using estimated durations, no narration");
  }
  console.log(`[test] Total: ${flagshipTotalSeconds(segments).toFixed(1)}s`);

  console.log("[test] Bundling…");
  const bundleUrl = await bundle({
    entryPoint: path.join(root, "src/index.ts"),
    webpackOverride: (c) => c,
  });

  // copy segment audio into bundle public
  if (key) {
    const pub = path.join(bundleUrl, "public");
    await fs.mkdir(pub, { recursive: true });
    for (let i = 0; i < segments.length; i++) {
      if (segments[i].audioFile) {
        await fs.copyFile(path.join(tmpDir, `seg-${i}.mp3`), path.join(pub, segments[i].audioFile!));
      }
    }
  }

  const inputProps: FlagshipVideoProps = {
    patientName,
    doctorName,
    clinicName,
    accentColor: FLAGSHIP_TEAL,
    segments,
  };

  console.log("[test] Selecting composition…");
  const composition = await selectComposition({
    serveUrl: bundleUrl,
    id: "FlagshipVideo",
    inputProps,
  });
  console.log(
    `[test] Composition: ${composition.durationInFrames} frames @ ${composition.fps}fps (${(composition.durationInFrames / composition.fps).toFixed(1)}s)`
  );

  console.log("[test] Rendering…");
  await renderMedia({
    composition,
    serveUrl: bundleUrl,
    codec: "h264",
    outputLocation: outPath,
    inputProps,
    imageFormat: "jpeg",
    jpegQuality: 75,
    scale: 2 / 3,
    crf: 22,
    x264Preset: "ultrafast",
    concurrency: 4,
    onProgress: ({ progress }) => {
      if (Math.round(progress * 100) % 10 === 0) {
        process.stdout.write(`\r[test] render ${(progress * 100).toFixed(0)}%   `);
      }
    },
  });
  console.log(`\n[test] DONE → ${outPath}`);
  await fs.rm(tmpDir, { recursive: true, force: true });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
