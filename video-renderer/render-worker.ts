/**
 * render-worker.ts
 *
 * Standalone worker script that runs the video render pipeline in its own
 * Node.js process. This avoids Next.js/webpack trying to bundle Remotion's
 * native dependencies.
 *
 * Called by the API route via child_process.spawn:
 *   tsx render-worker.ts <input-json-path>
 *
 * Communication:
 *   - Reads input from the JSON file path passed as argv[2]
 *   - Writes JSON messages to stdout (one per line):
 *     { "type": "progress", "step": "...", "progress": 0.5 }
 *     { "type": "result", "videoPath": "...", "durationSeconds": 71 }
 *     { "type": "error", "error": "..." }
 */

import { renderPatientVideo } from "./src/lib/render-pipeline";
import fs from "node:fs";

function send(msg: Record<string, unknown>) {
  process.stdout.write(JSON.stringify(msg) + "\n");
}

async function main() {
  const inputPath = process.argv[2];
  if (!inputPath) {
    send({ type: "error", error: "No input file path provided." });
    process.exit(1);
  }

  let input: Record<string, unknown>;
  try {
    input = JSON.parse(fs.readFileSync(inputPath, "utf-8"));
  } catch (err) {
    send({
      type: "error",
      error: `Failed to read input file: ${err instanceof Error ? err.message : String(err)}`,
    });
    process.exit(1);
  }

  try {
    const result = await renderPatientVideo(input as any, (step, progress) => {
      send({ type: "progress", step, progress });
    });

    send({
      type: "result",
      videoPath: result.videoPath,
      videoUrl: result.videoUrl || null,
      durationSeconds: result.durationSeconds,
    });
  } catch (err) {
    send({
      type: "error",
      error: err instanceof Error ? err.message : String(err),
    });
    process.exit(1);
  }
}

main();
