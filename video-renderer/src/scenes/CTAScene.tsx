import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  Img,
  staticFile,
} from "remotion";
import { Background } from "../components/Background";
import { COLORS } from "../lib/colors";

export const CTAScene: React.FC<{
  clinicName: string;
  doctorName: string;
  heading?: string;
  accentColor?: string;
  durationFrames: number;
  logoUrl?: string;
  phoneNumber?: string;
}> = ({
  clinicName,
  doctorName,
  heading = "We're here for you",
  accentColor = COLORS.purple,
  durationFrames,
  logoUrl,
  phoneNumber,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 60 },
  });

  const logoOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  const lineWidth = interpolate(frame, [20, 45], [0, 100], {
    extrapolateRight: "clamp",
  });

  const textOpacity = interpolate(frame, [25, 40], [0, 1], {
    extrapolateRight: "clamp",
  });
  const textY = interpolate(frame, [25, 40], [20, 0], {
    extrapolateRight: "clamp",
  });

  const phoneOpacity = interpolate(frame, [35, 50], [0, 1], {
    extrapolateRight: "clamp",
  });
  const phoneY = interpolate(frame, [35, 50], [15, 0], {
    extrapolateRight: "clamp",
  });

  const brandOpacity = interpolate(frame, [45, 60], [0, 1], {
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(
    frame,
    [Math.max(0, durationFrames - 20), Math.max(1, durationFrames)],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const logoSrc = logoUrl
    ? (logoUrl.startsWith("http") ? logoUrl : staticFile(logoUrl))
    : null;

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
          gap: 28,
        }}
      >
        {logoSrc ? (
          <Img
            src={logoSrc}
            style={{
              height: 180,
              width: "auto",
              maxWidth: 450,
              objectFit: "contain",
              transform: `scale(${logoScale})`,
              opacity: logoOpacity,
            }}
          />
        ) : (
          <div
            style={{
              opacity: logoOpacity,
              transform: `scale(${logoScale})`,
            }}
          >
            <h2
              style={{
                color: COLORS.textPrimary,
                fontSize: 52,
                fontWeight: 200,
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                letterSpacing: "0.03em",
                margin: 0,
                textAlign: "center",
              }}
            >
              {clinicName}
            </h2>
          </div>
        )}

        <div
          style={{
            width: `${lineWidth}px`,
            height: 1,
            background: `linear-gradient(90deg, transparent, ${accentColor}60, transparent)`,
          }}
        />

        {phoneNumber && (
          <div
            style={{
              opacity: phoneOpacity,
              transform: `translateY(${phoneY}px)`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
            }}
          >
            <p
              style={{
                color: COLORS.textSecondary,
                fontSize: 24,
                fontWeight: 300,
                fontFamily: "system-ui, sans-serif",
                margin: 0,
                textAlign: "center",
              }}
            >
              Questions? Give us a call
            </p>
            <p
              style={{
                color: COLORS.textPrimary,
                fontSize: 36,
                fontWeight: 400,
                fontFamily: "system-ui, sans-serif",
                margin: 0,
                textAlign: "center",
                letterSpacing: "0.02em",
              }}
            >
              {phoneNumber}
            </p>
          </div>
        )}

        {!phoneNumber && (
          <p
            style={{
              opacity: textOpacity,
              transform: `translateY(${textY}px)`,
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
            {heading}
          </p>
        )}

        <div
          style={{
            position: "absolute",
            bottom: 30,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            opacity: brandOpacity * 0.4,
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
