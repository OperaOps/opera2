/**
 * Shared render function — used by both the internal patient-video route
 * and the public v1 API. Spawns a child process to run the Remotion render
 * worker, streaming progress via stdout JSON lines.
 */

import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import {
  scheduleJobSave,
  type RenderInput,
} from "@/app/api/patient-video/_lib/job-store";

export function runRenderInBackground(jobId: string, input: RenderInput): void {
  const inputPath = path.join(os.tmpdir(), `opera-video-${jobId}.json`);
  fs.writeFileSync(inputPath, JSON.stringify(input));

  const projectRoot = process.cwd();
  const videoRendererDir = path.join(projectRoot, "video-renderer");
  const tsxBin = path.join(videoRendererDir, "node_modules", ".bin", "tsx");
  const workerScript = path.join(videoRendererDir, "render-worker.ts");

  const child = spawn(tsxBin, [workerScript, inputPath], {
    cwd: videoRendererDir,
    env: { ...process.env },
    stdio: ["ignore", "pipe", "pipe"],
  });

  const RENDER_TIMEOUT_MS = 30 * 60 * 1000;
  const renderTimeout = setTimeout(() => {
    scheduleJobSave(jobId, (current) => {
      if (current.status === "processing") {
        current.status = "failed";
        current.error = `Render timed out after ${Math.round(RENDER_TIMEOUT_MS / 60000)} minutes`;
      }
    });
    child.kill("SIGKILL");
  }, RENDER_TIMEOUT_MS);

  let stdoutBuffer = "";

  child.stdout.on("data", (data: Buffer) => {
    stdoutBuffer += data.toString();
    const lines = stdoutBuffer.split("\n");
    stdoutBuffer = lines.pop() || "";

    for (const line of lines) {
      if (!line.trim()) continue;
      try {
        const msg = JSON.parse(line);
        if (msg.type === "progress") {
          scheduleJobSave(jobId, (current) => {
            current.progress = msg.progress;
            current.step = msg.step || "";
          });
        } else if (msg.type === "result") {
          scheduleJobSave(jobId, (current) => {
            current.status = "completed";
            current.progress = 1.0;
            current.videoPath = msg.videoPath;
            current.videoUrl = msg.videoUrl ?? null;
            current.step = "complete";
          });
        } else if (msg.type === "error") {
          scheduleJobSave(jobId, (current) => {
            current.status = "failed";
            current.error = msg.error;
          });
        }
      } catch {}
    }
  });

  child.stderr.on("data", (data: Buffer) => {
    const text = data.toString().trim();
    if (text) console.error(`[render-worker ${jobId}] ${text}`);
  });

  child.on("close", (code) => {
    clearTimeout(renderTimeout);
    try { fs.unlinkSync(inputPath); } catch {}

    const tail = stdoutBuffer.trim();
    scheduleJobSave(jobId, (current) => {
      if (tail) {
        try {
          const msg = JSON.parse(tail);
          if (msg.type === "result") {
            current.status = "completed";
            current.progress = 1.0;
            current.videoPath = msg.videoPath;
            current.videoUrl = msg.videoUrl ?? null;
            current.step = "complete";
          } else if (msg.type === "error") {
            current.status = "failed";
            current.error = msg.error;
          }
        } catch {}
      }
      if (code !== 0 && current.status === "processing") {
        current.status = "failed";
        current.error = current.error || `Render worker exited with code ${code}`;
      }
    });
  });
}
