import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { ClinicBranding } from "../components/ClinicBranding";
import { COLORS } from "../lib/colors";

export const IntroScene: React.FC<{
  clinicName: string;
  doctorName: string;
  patientName: string;
  heading?: string;
  durationFrames?: number;
  accentColor?: string;
  logoUrl?: string;
}> = ({ clinicName, doctorName, patientName, heading, durationFrames = 160, accentColor = COLORS.purple, logoUrl }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const brandOpacity = interpolate(frame, [15, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const brandSlide = interpolate(frame, [15, 35], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const headingSpring = spring({
    frame: Math.max(0, frame - 40),
    fps,
    config: { damping: 20, stiffness: 80 },
  });
  const headingOpacity = interpolate(frame, [40, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const nameOpacity = interpolate(frame, [55, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const nameSlide = interpolate(frame, [55, 75], [15, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const lineProgress = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(
    frame,
    [Math.max(0, durationFrames - 18), durationFrames],
    [1, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  const sceneScale = interpolate(frame, [0, durationFrames], [1.02, 1.0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <Background accentColor={accentColor} variant="light" />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          opacity: fadeOut,
          transform: `scale(${sceneScale})`,
          gap: 20,
        }}
      >
        <div
          style={{
            opacity: brandOpacity,
            transform: `translateY(${brandSlide}px)`,
          }}
        >
          <ClinicBranding
            clinicName={clinicName}
            doctorName={doctorName}
            accentColor={accentColor}
            logoUrl={logoUrl}
          />
        </div>

        {heading && (
          <div
            style={{
              opacity: headingOpacity,
              transform: `scale(${0.9 + headingSpring * 0.1})`,
              marginTop: 15,
            }}
          >
            <h2
              style={{
                color: COLORS.textPrimary,
                fontSize: 42,
                fontWeight: 200,
                fontFamily: "system-ui, sans-serif",
                textAlign: "center",
                margin: 0,
                letterSpacing: "0.04em",
                lineHeight: 1.3,
              }}
            >
              {heading}
            </h2>
          </div>
        )}

        <div
          style={{
            width: interpolate(lineProgress, [0, 1], [0, 120]),
            height: 1,
            background: `linear-gradient(90deg, transparent, ${accentColor}60, transparent)`,
            marginTop: 10,
            marginBottom: 5,
          }}
        />

        <div
          style={{
            opacity: nameOpacity,
            transform: `translateY(${nameSlide}px)`,
          }}
        >
          <p
            style={{
              color: COLORS.textSecondary,
              fontSize: 28,
              fontWeight: 400,
              fontFamily: "system-ui, sans-serif",
              textAlign: "center",
              margin: 0,
              letterSpacing: "0.03em",
            }}
          >
            {patientName}
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};
