/**
 * Pre-bundles the Remotion project at Docker build time.
 * This saves 90-120s on the first render of each cold instance.
 *
 * Output: /app/video-renderer/.remotion-bundle/
 */

import { bundle } from "@remotion/bundler";
import path from "node:path";
import fs from "node:fs";

async function main() {
  const entryPoint = path.resolve(__dirname, "src/index.ts");
  const outDir = path.resolve(__dirname, ".remotion-bundle");

  console.log("[prebundle] Bundling Remotion project...");
  console.log("[prebundle] Entry:", entryPoint);

  const bundleUrl = await bundle({
    entryPoint,
    webpackOverride: (config) => config,
    outDir,
  });

  console.log("[prebundle] Bundle created at:", bundleUrl);

  // Verify
  if (fs.existsSync(path.join(bundleUrl, "index.html"))) {
    console.log("[prebundle] Verified: index.html exists in bundle");
  } else {
    console.error("[prebundle] WARNING: index.html not found in bundle!");
  }
}

main().catch((err) => {
  console.error("[prebundle] FAILED:", err);
  process.exit(1);
});
