/**
 * Deploy Remotion Lambda function + S3 site.
 * Run once: npx tsx src/lib/deploy-lambda.ts
 *
 * Prerequisites:
 *   AWS_ACCESS_KEY_ID + AWS_SECRET_ACCESS_KEY set in env
 *   @remotion/lambda installed
 */

import {
  deployFunction,
  deploySite,
  getOrCreateBucket,
} from "@remotion/lambda";
import path from "node:path";

const REGION = (process.env.AWS_REGION || "us-east-1") as
  | "us-east-1"
  | "us-east-2"
  | "us-west-2"
  | "eu-central-1"
  | "ap-southeast-1";

async function main() {
  console.log("[deploy-lambda] Deploying Remotion Lambda...");
  console.log("[deploy-lambda] Region:", REGION);

  // 1. Deploy Lambda function
  console.log("\n[deploy-lambda] Step 1: Deploying Lambda function...");
  const { functionName, alreadyExisted } = await deployFunction({
    region: REGION,
    timeoutInSeconds: 240,
    memorySizeInMb: 3009, // ~2 vCPU equivalent, good balance
    architecture: "arm64", // Graviton — cheaper + faster for Remotion
    createCloudWatchLogGroup: true,
  });
  console.log(
    `[deploy-lambda] Function: ${functionName} (${alreadyExisted ? "already existed" : "newly created"})`
  );

  // 2. Get/create S3 bucket for Remotion sites
  console.log("\n[deploy-lambda] Step 2: Getting S3 bucket...");
  const { bucketName } = await getOrCreateBucket({ region: REGION });
  console.log(`[deploy-lambda] Bucket: ${bucketName}`);

  // 3. Deploy the Remotion site (bundle + upload to S3)
  console.log("\n[deploy-lambda] Step 3: Deploying Remotion site to S3...");
  const entryPoint = path.resolve(__dirname, "../index.ts");
  const { serveUrl } = await deploySite({
    bucketName,
    entryPoint,
    region: REGION,
    siteName: "opera-patient-video",
  });
  console.log(`[deploy-lambda] Site deployed: ${serveUrl}`);

  // Output config for .env
  console.log("\n[deploy-lambda] === Add these to your environment ===");
  console.log(`REMOTION_LAMBDA_FUNCTION_NAME=${functionName}`);
  console.log(`REMOTION_LAMBDA_SERVE_URL=${serveUrl}`);
  console.log(`REMOTION_LAMBDA_REGION=${REGION}`);
  console.log(`REMOTION_LAMBDA_BUCKET=${bucketName}`);

  console.log("\n[deploy-lambda] Done!");
}

main().catch((err) => {
  console.error("[deploy-lambda] FAILED:", err);
  process.exit(1);
});
