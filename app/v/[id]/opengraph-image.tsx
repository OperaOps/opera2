/**
 * Dynamic SMS/social preview card for a patient share link — a clean, bright
 * "video card": white surface, clinic logo, big title, and a sage play button
 * so a texted link reads as a real video from the clinic (not Opera).
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
  const logo = ctx?.clinicLogoUrl;
  const headline = isPre ? `Welcome, ${first}!` : `Your visit summary, ${first}`;
  const sub = isPre
    ? "A personal hello before your visit"
    : "A personalized walkthrough of your care";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        {/* top sage accent bar */}
        <div style={{ height: 14, width: "100%", background: "linear-gradient(90deg,#5f7a61,#a9c0aa)" }} />

        <div style={{ display: "flex", flex: 1, padding: "64px 72px", alignItems: "center" }}>
          {/* left: text */}
          <div style={{ display: "flex", flexDirection: "column", flex: 1, paddingRight: 40 }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 30 }}>
              {logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={logo}
                  width={64}
                  height={64}
                  style={{
                    borderRadius: 14,
                    border: "1px solid #e6ebe6",
                    objectFit: "contain",
                    background: "#fff",
                    marginRight: 20,
                  }}
                />
              ) : null}
              <div style={{ fontSize: 30, fontWeight: 600, color: "#3e5540", letterSpacing: 0.5 }}>
                {clinic}
              </div>
            </div>
            <div style={{ fontSize: 74, fontWeight: 800, color: "#1a1a17", lineHeight: 1.04, letterSpacing: -2 }}>
              {headline}
            </div>
            <div style={{ fontSize: 34, color: "#5e6a60", marginTop: 22 }}>{sub}</div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: 40,
                fontSize: 26,
                fontWeight: 600,
                color: "#5f7a61",
              }}
            >
              Tap to watch your video
            </div>
          </div>

          {/* right: video tile with play button */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 360,
              height: 360,
              borderRadius: 32,
              background: "linear-gradient(135deg,#5f7a61,#3e5540)",
              boxShadow: "0 30px 60px -20px rgba(63,85,64,0.5)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 128,
                height: 128,
                borderRadius: 80,
                background: "#ffffff",
              }}
            >
              {/* play triangle */}
              <div
                style={{
                  width: 0,
                  height: 0,
                  marginLeft: 12,
                  borderTop: "34px solid transparent",
                  borderBottom: "34px solid transparent",
                  borderLeft: "56px solid #3e5540",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
