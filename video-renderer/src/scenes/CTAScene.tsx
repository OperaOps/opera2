import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";
import { Background } from "../components/Background";
import { COLORS } from "../lib/colors";

export const CTAScene: React.FC<{
  clinicName: string;
  doctorName: string;
  heading?: string;
  accentColor?: string;
  durationFrames: number;
}> = ({
  clinicName,
  doctorName,
  heading = "We're here for you",
  accentColor = COLORS.purple,
  durationFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const mainScale = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 60 },
  });

  const headingOpacity = interpolate(frame, [5, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const headingY = interpolate(frame, [5, 20], [30, 0], {
    extrapolateRight: "clamp",
  });

  const messageOpacity = interpolate(frame, [20, 35], [0, 1], {
    extrapolateRight: "clamp",
  });
  const messageY = interpolate(frame, [20, 35], [20, 0], {
    extrapolateRight: "clamp",
  });

  const clinicOpacity = interpolate(frame, [35, 50], [0, 1], {
    extrapolateRight: "clamp",
  });
  const lineWidth = interpolate(frame, [30, 55], [0, 120], {
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(
    frame,
    [durationFrames - 20, durationFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Gentle glow pulse
  const glowPulse = interpolate(
    Math.sin(frame * 0.05),
    [-1, 1],
    [0.4, 0.8]
  );

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
          gap: 24,
        }}
      >
        {/* Icon */}
        <div
          style={{
            transform: `scale(${mainScale})`,
            width: 72,
            height: 72,
            borderRadius: 36,
            background: `linear-gradient(135deg, ${accentColor}, ${COLORS.purpleLight})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 0 ${40 * glowPulse}px ${accentColor}50`,
            marginBottom: 8,
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
              fill="white"
              opacity="0.9"
            />
          </svg>
        </div>

        {/* Heading */}
        <h2
          style={{
            opacity: headingOpacity,
            transform: `translateY(${headingY}px)`,
            color: COLORS.textPrimary,
            fontSize: 56,
            fontWeight: 200,
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            letterSpacing: "0.02em",
            margin: 0,
            textAlign: "center",
          }}
        >
          {heading}
        </h2>

        {/* Divider */}
        <div
          style={{
            width: `${lineWidth}px`,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
            opacity: 0.6,
          }}
        />

        {/* Message */}
        <p
          style={{
            opacity: messageOpacity,
            transform: `translateY(${messageY}px)`,
            color: COLORS.textSecondary,
            fontSize: 26,
            fontWeight: 300,
            fontFamily: "system-ui, sans-serif",
            margin: 0,
            textAlign: "center",
            maxWidth: 600,
            lineHeight: 1.6,
          }}
        >
          Your care team at{" "}
          <span style={{ color: COLORS.purpleLight }}>
            {clinicName}
          </span>{" "}
          is ready to help you take the next step.
        </p>

        {/* Doctor name */}
        <div
          style={{
            opacity: clinicOpacity,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            marginTop: 16,
          }}
        >
          <p
            style={{
              color: COLORS.textMuted,
              fontSize: 20,
              fontWeight: 300,
              fontFamily: "system-ui, sans-serif",
              margin: 0,
            }}
          >
            Dr. {doctorName}
          </p>
          <p
            style={{
              color: COLORS.textSubtle,
              fontSize: 16,
              fontWeight: 300,
              fontFamily: "system-ui, sans-serif",
              margin: 0,
            }}
          >
            {clinicName}
          </p>
        </div>

        {/* Opera branding - subtle */}
        <div
          style={{
            position: "absolute",
            bottom: 30,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            opacity: clinicOpacity * 0.4,
          }}
        >
          <span
            style={{
              color: COLORS.textSubtle,
              fontSize: 13,
              fontFamily: "system-ui, sans-serif",
              fontWeight: 300,
              letterSpacing: "0.1em",
            }}
          >
            Powered by Opera
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
