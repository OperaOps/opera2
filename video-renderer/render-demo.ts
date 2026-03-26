/**
 * render-demo.ts
 *
 * Standalone CLI script to test the render pipeline end-to-end.
 * Uses the full pipeline with useDemo=true (demo script, no Claude API call).
 * If ELEVENLABS_API_KEY is set, generates real voiceover audio.
 *
 * Usage:
 *   cd video-renderer
 *   npx tsx render-demo.ts
 *
 * With audio:
 *   ELEVENLABS_API_KEY=sk_... npx tsx render-demo.ts
 */

import { renderPatientVideo } from "./src/lib/render-pipeline";

async function main() {
  console.log("=".repeat(60));
  console.log("  Opera Patient Video — Demo Render");
  console.log("=".repeat(60));
  console.log();

  if (process.env.ELEVENLABS_API_KEY) {
    console.log("  ElevenLabs API key detected — audio will be generated.");
  } else {
    console.log("  No ELEVENLABS_API_KEY — rendering without voiceover.");
    console.log("  Set ELEVENLABS_API_KEY to enable audio.");
  }
  console.log();

  const startTime = Date.now();

  try {
    const result = await renderPatientVideo(
      {
        patientName: "Sarah",
        doctorName: "Martinez",
        clinicName: "Bright Smiles Dental",
        category: "dental",
        diagnosis: "cavity",
        treatment: "crown",
        useDemo: true,
        clinicBrand: {
          primaryColor: "#7c3aed",
          accentColor: "#a855f7",
        },
      },
      (step, progress) => {
        const pct = Math.round(progress * 100);
        process.stdout.write(`\r  [${pct}%] ${step}`);
      }
    );

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

    console.log();
    console.log("=".repeat(60));
    console.log("  Render complete!");
    console.log("=".repeat(60));
    console.log();
    console.log(`  Video path:  ${result.videoPath}`);
    console.log(`  Duration:    ${result.durationSeconds}s`);
    console.log(`  Title:       ${result.script.title}`);
    console.log(`  Render time: ${elapsed}s`);
    console.log();
    console.log("  Scenes:");
    const scenes = result.script.scenes;
    const sceneKeys = ["intro", "problem", "treatment", "outcome", "cta"] as const;
    for (const key of sceneKeys) {
      const scene = scenes[key];
      console.log(`    ${key.padEnd(12)} ${scene.durationSeconds}s  "${scene.heading}"`);
    }
    console.log();
  } catch (err) {
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    console.error();
    console.error("=".repeat(60));
    console.error("  Render FAILED");
    console.error("=".repeat(60));
    console.error();
    console.error(`  Error: ${err instanceof Error ? err.message : String(err)}`);
    console.error(`  Time:  ${elapsed}s`);
    if (err instanceof Error && err.stack) {
      console.error();
      console.error(err.stack);
    }
    process.exit(1);
  }
}

main();
