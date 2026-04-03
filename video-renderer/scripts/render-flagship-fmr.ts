/**
 * One-command flagship full-mouth-rehab demo for dentist / investor review.
 * Uses premium demo script (phased FMR template) + pipeline TTS when ELEVENLABS_API_KEY is set.
 *
 *   cd video-renderer && npx tsx scripts/render-flagship-fmr.ts
 *
 * Override defaults by editing scripts/fmr-input.json (same shape as RenderJobInput).
 */

import path from "node:path";
import fs from "node:fs";
import { renderPatientVideo } from "../src/lib/render-pipeline";
import type { RenderJobInput } from "../src/lib/render-pipeline";

const DEFAULT_FMR_INPUT: RenderJobInput = {
  patientName: "James",
  doctorName: "Martinez",
  clinicName: "Bright Smiles Dental",
  category: "dental",
  diagnosis: "missing_tooth",
  treatment: "full_mouth_rehab",
  mode: "premium",
  useDemo: true,
  specialty: "dental",
  videoGoal: "educate",
  patientStatus: "undecided",
  clinicBrand: {
    primaryColor: "#7c3aed",
    accentColor: "#a855f7",
  },
};

function loadFmrInput(): RenderJobInput {
  const jsonPath = path.join(__dirname, "fmr-input.json");
  try {
    const raw = fs.readFileSync(jsonPath, "utf8");
    const parsed = JSON.parse(raw) as Partial<RenderJobInput>;
    return { ...DEFAULT_FMR_INPUT, ...parsed };
  } catch {
    return DEFAULT_FMR_INPUT;
  }
}

async function main() {
  console.log("Rendering flagship FMR (premium demo script)…\n");

  const input = loadFmrInput();

  const result = await renderPatientVideo(
    input,
    (step, progress) => {
      process.stdout.write(`\r[${Math.round(progress * 100)}%] ${step}`.padEnd(70));
    }
  );

  console.log("\n\nDone.");
  console.log("Video:", result.videoPath);
  console.log("Duration (script):", result.durationSeconds, "s");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
