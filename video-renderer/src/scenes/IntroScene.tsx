import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { Background } from "../components/Background";
import { ClinicBranding } from "../components/ClinicBranding";
import { COLORS } from "../lib/colors";

export const IntroScene: React.FC<{
  clinicName: string;
  doctorName: string;
  patientName: string;
  accentColor?: string;
}> = ({ clinicName, doctorName, patientName, accentColor = COLORS.purple }) => {
  const frame = useCurrentFrame();

  const greetingOpacity = interpolate(frame, [50, 65], [0, 1], {
    extrapolateRight: "clamp",
  });
  const greetingSlide = interpolate(frame, [50, 65], [20, 0], {
    extrapolateRight: "clamp",
  });

  // Fade out at end
  const fadeOut = interpolate(frame, [180, 210], [1, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill>
      <Background accentColor={accentColor} variant="warm" />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          opacity: fadeOut,
          gap: 40,
        }}
      >
        <ClinicBranding
          clinicName={clinicName}
          doctorName={doctorName}
          accentColor={accentColor}
        />

        {/* Patient greeting */}
        <div
          style={{
            opacity: greetingOpacity,
            transform: `translateY(${greetingSlide}px)`,
            marginTop: 20,
          }}
        >
          <p
            style={{
              color: COLORS.textMuted,
              fontSize: 22,
              fontWeight: 300,
              fontFamily: "system-ui, sans-serif",
              textAlign: "center",
              margin: 0,
            }}
          >
            Prepared especially for{" "}
            <span style={{ color: COLORS.textSecondary, fontWeight: 400 }}>
              {patientName}
            </span>
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};
