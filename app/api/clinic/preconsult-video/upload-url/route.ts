/**
 * POST /api/clinic/preconsult-video/upload-url { contentType }
 * Presigned S3 PUT so clinics can upload large tour videos directly from
 * the browser (Netlify function bodies are too small for video files).
 */

import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { verifyClinicToken } from "@/lib/auth/clinic-auth";

const BUCKET = process.env.OPERA_VIDEO_BUCKET || "opera-ai-videos-075483";

export async function POST(request: NextRequest) {
  const session = await verifyClinicToken(request);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let contentType = "video/mp4";
  try {
    const body = await request.json();
    if (typeof body.contentType === "string" && body.contentType.startsWith("video/")) {
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

  const ext = contentType.includes("quicktime") ? "mov" : "mp4";
  const key = `clinic-tours/${session.clinicId}/${Date.now()}.${ext}`;
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
