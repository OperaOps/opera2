/**
 * POST /api/clinic/parse-consult-image
 *
 * Accepts an uploaded image (consult note, PMS screenshot, treatment card)
 * and uses Claude Vision to extract patient + treatment info.
 *
 * IMPORTANT: Image is processed and discarded — not stored.
 * IMPORTANT: No patient PII is logged to console.
 */

import { NextRequest, NextResponse } from "next/server";
import { verifyClinicToken } from "@/lib/auth/clinic-auth";
import { TREATMENT_TYPES } from "@/lib/constants/treatment-types";

const CLAUDE_API_KEY =
  process.env.CLAUDE_API_KEY ||
  process.env.ANTHROPIC_API_KEY ||
  "";
const CLAUDE_API_URL = "https://api.anthropic.com/v1/messages";

export async function POST(request: NextRequest) {
  const clinic = await verifyClinicToken(request);
  if (!clinic) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!CLAUDE_API_KEY) {
    return NextResponse.json(
      { error: "Claude API key not configured" },
      { status: 500 }
    );
  }

  let file: File | null = null;
  try {
    const formData = await request.formData();
    file = formData.get("image") as File | null;
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  if (!file) {
    return NextResponse.json({ error: "No image provided" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const base64 = buffer.toString("base64");

  const mimeType = file.type || "image/jpeg";
  const treatmentValues = TREATMENT_TYPES.map((t) => t.value).join(", ");

  const systemPrompt = `You are an assistant that extracts patient and treatment information from dental/orthodontic clinical documents. Extract the following fields if present. Return ONLY valid JSON with no additional text.

{
  "patient_first_name": string | null,
  "patient_last_name": string | null,
  "patient_email": string | null,
  "patient_date_of_birth": string | null,
  "patient_phone": string | null,
  "treatment_type": string | null,
  "consulting_provider": string | null,
  "consultation_date": string | null,
  "clinical_notes": string | null
}

If a field is not clearly present in the document, return null for that field. Do not guess or hallucinate values. For treatment_type, map whatever treatment is mentioned to the closest match from: ${treatmentValues}. For dates, use ISO format YYYY-MM-DD.`;

  try {
    const res = await fetch(CLAUDE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": CLAUDE_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-5-haiku-20241022",
        max_tokens: 1000,
        temperature: 0,
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: systemPrompt },
              {
                type: "image",
                source: { type: "base64", media_type: mimeType, data: base64 },
              },
            ],
          },
        ],
      }),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to analyze image" },
        { status: 500 }
      );
    }

    const data = await res.json();
    const text = data.content?.[0]?.text || "{}";

    // Extract JSON from response (may be wrapped in markdown code block)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ parsed: {} });
    }

    const parsed = JSON.parse(jsonMatch[0]);
    return NextResponse.json({ parsed });
  } catch {
    return NextResponse.json(
      { error: "Failed to parse image" },
      { status: 500 }
    );
  }
}
