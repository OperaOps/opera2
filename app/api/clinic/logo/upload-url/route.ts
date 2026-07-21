/**
 * POST /api/clinic/logo/upload-url { contentType }
 * Presigned S3 PUT for clinic logo uploads (browser-direct, same pattern as
 * tour videos).
 */

import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { verifyClinicToken } from "@/lib/auth/clinic-auth";

const BUCKET = process.env.OPERA_VIDEO_BUCKET || "opera-ai-videos-075483";

const EXT: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/svg+xml": "svg",
};

export async function POST(request: NextRequest) {
  const session = await verifyClinicToken(request);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let contentType = "image/png";
  try {
    const body = await request.json();
    if (typeof body.contentType === "string" && body.contentType in EXT) {
      contentType = body.contentType;
    }
  } catch {
    /* default */
  }

  const region = process.env.OPERA_AWS_REGION || "us-east-1";
  const accessKeyId = process.env.OPERA_AWS_ACCESS_KEY_ID?.trim();
  const secretAccessKey = process.env.OPERA_AWS_SECRET_ACCESS_KEY?.trim();
  const s3 = new S3Client(
    accessKeyId && secretAccessKey
      ? { region, credentials: { accessKeyId, secretAccessKey } }
      : { region }
  );

  const key = `clinic-logos/${session.clinicId}/${Date.now()}.${EXT[contentType]}`;
  const url = await getSignedUrl(
    s3,
    new PutObjectCommand({ Bucket: BUCKET, Key: key, ContentType: contentType }),
    { expiresIn: 600 }
  );

  return NextResponse.json({
    uploadUrl: url,
    key,
    publicUrl: `https://${BUCKET}.s3.amazonaws.com/${key}`,
  });
}
