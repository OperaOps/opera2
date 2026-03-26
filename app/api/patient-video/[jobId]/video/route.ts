/**
 * GET /api/patient-video/[jobId]/video
 *
 * Streams the rendered MP4 video file back to the client.
 */

import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import { stat } from "node:fs/promises";
import { jobStore } from "../../_lib/job-store";

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

export async function GET(
  request: NextRequest,
  { params }: { params: { jobId: string } }
) {
  const { jobId } = params;

  const job = jobStore.get(jobId);
  if (!job) {
    return NextResponse.json(
      { error: `Job not found: ${jobId}` },
      { status: 404 }
    );
  }

  if (job.status !== "completed" || !job.videoPath) {
    return NextResponse.json(
      {
        error:
          job.status === "processing"
            ? "Video is still rendering. Check back later."
            : job.status === "failed"
            ? `Render failed: ${job.error}`
            : "Video file not available.",
        status: job.status,
        progress: job.progress,
      },
      { status: job.status === "processing" ? 202 : 500 }
    );
  }

  // Verify the file exists
  const videoPath = job.videoPath;
  let fileStats;
  try {
    fileStats = await stat(videoPath);
  } catch {
    return NextResponse.json(
      { error: "Video file not found on disk. It may have been cleaned up." },
      { status: 404 }
    );
  }

  // Support Range requests for video seeking
  const rangeHeader = request.headers.get("range");

  if (rangeHeader) {
    const match = rangeHeader.match(/bytes=(\d+)-(\d*)/);
    if (match) {
      const start = parseInt(match[1], 10);
      const end = match[2] ? parseInt(match[2], 10) : fileStats.size - 1;
      const chunkSize = end - start + 1;

      const stream = fs.createReadStream(videoPath, { start, end });
      const webStream = readableNodeToWeb(stream);

      return new Response(webStream, {
        status: 206,
        headers: {
          "Content-Type": "video/mp4",
          "Content-Length": String(chunkSize),
          "Content-Range": `bytes ${start}-${end}/${fileStats.size}`,
          "Accept-Ranges": "bytes",
          "Cache-Control": "public, max-age=3600",
        },
      });
    }
  }

  // Full file response
  const stream = fs.createReadStream(videoPath);
  const webStream = readableNodeToWeb(stream);

  return new Response(webStream, {
    status: 200,
    headers: {
      "Content-Type": "video/mp4",
      "Content-Length": String(fileStats.size),
      "Content-Disposition": `inline; filename="patient-video-${jobId}.mp4"`,
      "Accept-Ranges": "bytes",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

// ---------------------------------------------------------------------------
// Helper: convert Node.js ReadableStream to Web ReadableStream
// ---------------------------------------------------------------------------

function readableNodeToWeb(
  nodeStream: fs.ReadStream
): ReadableStream<Uint8Array> {
  return new ReadableStream({
    start(controller) {
      nodeStream.on("data", (chunk: Buffer) => {
        controller.enqueue(new Uint8Array(chunk));
      });
      nodeStream.on("end", () => {
        controller.close();
      });
      nodeStream.on("error", (err) => {
        controller.error(err);
      });
    },
    cancel() {
      nodeStream.destroy();
    },
  });
}
