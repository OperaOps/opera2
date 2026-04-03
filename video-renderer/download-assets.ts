/**
 * download-assets.ts
 *
 * Downloads dental-video clips from S3 to the local public/ directory
 * before the server starts. Uses @aws-sdk/client-s3 (already installed).
 *
 * Run with: npx tsx download-assets.ts
 */

import { S3Client, ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";

const BUCKET = process.env.S3_VIDEO_BUCKET || "opera-ai-videos";
const REGION = process.env.AWS_REGION || "us-east-1";
const PREFIX = "dental-videos/";
const DEST = path.resolve(__dirname, "public/dental-videos");

async function streamToFile(stream: Readable, filePath: string): Promise<void> {
  await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
  await pipeline(stream, fs.createWriteStream(filePath));
}

async function main() {
  console.log(`[download-assets] Downloading dental-video clips from s3://${BUCKET}/${PREFIX}`);
  console.log(`[download-assets] Destination: ${DEST}`);

  const s3 = new S3Client({ region: REGION });

  // List all objects under dental-videos/
  let keys: string[] = [];
  let continuationToken: string | undefined;
  do {
    const res = await s3.send(new ListObjectsV2Command({
      Bucket: BUCKET,
      Prefix: PREFIX,
      ContinuationToken: continuationToken,
    }));
    for (const obj of res.Contents ?? []) {
      if (obj.Key && obj.Key.endsWith(".mp4")) {
        keys.push(obj.Key);
      }
    }
    continuationToken = res.NextContinuationToken;
  } while (continuationToken);

  console.log(`[download-assets] Found ${keys.length} clips to download`);

  let downloaded = 0;
  let skipped = 0;

  for (const key of keys) {
    // Strip the prefix to get the relative path: dental-videos/crown/step1.mp4 → crown/step1.mp4
    const relativePath = key.slice(PREFIX.length);
    const localPath = path.join(DEST, relativePath);

    // Skip if already exists (handles restarts gracefully)
    if (fs.existsSync(localPath)) {
      skipped++;
      continue;
    }

    const res = await s3.send(new GetObjectCommand({ Bucket: BUCKET, Key: key }));
    await streamToFile(res.Body as Readable, localPath);
    downloaded++;
    console.log(`[download-assets] ✓ ${relativePath}`);
  }

  console.log(`[download-assets] Done — ${downloaded} downloaded, ${skipped} already present`);
}

main().catch((err) => {
  console.error("[download-assets] FAILED:", err.message);
  // Non-fatal: server will start without videos rather than crashing
  process.exit(0);
});
