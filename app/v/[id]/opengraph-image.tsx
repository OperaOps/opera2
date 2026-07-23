/**
 * Dynamic SMS/social preview card for a patient share link.
 * Renders a clean sage banner: "Welcome, {name}!" (pre) or
 * "Your visit summary, {name}" (post) with the clinic name — so a texted
 * link reads as coming from the clinic, not from Opera's marketing site.
 */

import { ImageResponse } from "next/og";
import { getShareContext } from "@/lib/patient-share";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Your personalized video";

export default async function Image({ params }: { params: { id: string } }) {
  const ctx = await getShareContext(params.id).catch(() => null);
  const first = ctx?.patientFirstName ?? "there";
  const clinic = ctx?.clinicName ?? "Your clinic";
  const isPre = ctx?.stage === "pre";
  const headline = isPre ? `Welcome, ${first}!` : `Your visit summary, ${first}`;
  const sub = isPre
    ? "A personal hello before your visit"
    : "A personal walkthrough of your care";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "90px 96px",
          background: "linear-gradient(135deg, #5f7a61 0%, #3e5540 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 30,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.82)",
            marginBottom: 28,
          }}
        >
          {clinic}
        </div>
        <div style={{ fontSize: 92, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>
          {headline}
        </div>
        <div style={{ fontSize: 38, color: "rgba(255,255,255,0.9)", marginTop: 26 }}>
          {sub}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 54,
            fontSize: 30,
            color: "rgba(255,255,255,0.95)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 58,
              height: 58,
              borderRadius: 40,
              background: "rgba(255,255,255,0.2)",
              marginRight: 22,
            }}
          >
            ▶
          </div>
          Tap to watch your video
        </div>
      </div>
    ),
    { ...size }
  );
}
