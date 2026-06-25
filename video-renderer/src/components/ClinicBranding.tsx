import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile } from "remotion";
import { COLORS } from "../lib/colors";

export const ClinicBranding: React.FC<{
  clinicName: string;
  doctorName: string;
  accentColor?: string;
  variant?: "full" | "minimal";
  logoUrl?: string;
}> = ({
  clinicName,
  doctorName,
  accentColor = COLORS.purple,
  variant = "full",
  logoUrl,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { damping: 15, stiffness: 80 } });
  const nameOpacity = interpolate(frame, [15, 30], [0, 1], {
    extrapolateRight: "clamp",
  });
  const nameSlide = interpolate(frame, [15, 30], [20, 0], {
    extrapolateRight: "clamp",
  });
  const doctorOpacity = interpolate(frame, [25, 40], [0, 1], {
    extrapolateRight: "clamp",
  });
  const doctorSlide = interpolate(frame, [25, 40], [15, 0], {
    extrapolateRight: "clamp",
  });
  const lineWidth = interpolate(frame, [20, 45], [0, 100], {
    extrapolateRight: "clamp",
  });

  const logoSrc = logoUrl
    ? (logoUrl.startsWith("http") ? logoUrl : staticFile(logoUrl))
    : null;

  if (variant === "minimal") {
    return (
      <div
        style={{
          position: "absolute",
          top: 36,
          left: 48,
          display: "flex",
          alignItems: "center",
          gap: 16,
          zIndex: 50,
        }}
      >
        {logoSrc ? (
          <Img
            src={logoSrc}
            style={{
              height: 36,
              width: "auto",
              objectFit: "contain",
              opacity: nameOpacity,
            }}
          />
        ) : (
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: `linear-gradient(135deg, ${accentColor}, ${COLORS.purpleLight})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: nameOpacity,
            }}
          >
            <span
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: 700,
                fontFamily: "system-ui, sans-serif",
              }}
            >
              {clinicName.charAt(0)}
            </span>
          </div>
        )}
        <span
          style={{
            color: COLORS.textSecondary,
            fontSize: 18,
            fontFamily: "system-ui, sans-serif",
            fontWeight: 300,
            opacity: nameOpacity,
          }}
        >
          {clinicName}
        </span>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
      }}
    >
      {logoSrc ? (
        <Img
          src={logoSrc}
          style={{
            height: 160,
            width: "auto",
            maxWidth: 400,
            objectFit: "contain",
            transform: `scale(${logoScale})`,
          }}
        />
      ) : (
        <div
          style={{
            transform: `scale(${logoScale})`,
            width: 80,
            height: 80,
            borderRadius: 20,
            background: `linear-gradient(135deg, ${accentColor}, ${COLORS.purpleLight})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 8px 32px ${accentColor}20`,
          }}
        >
          <span
            style={{
              color: "white",
              fontSize: 36,
              fontWeight: 700,
              fontFamily: "system-ui, sans-serif",
            }}
          >
            {clinicName.charAt(0)}
          </span>
        </div>
      )}

      <div
        style={{
          opacity: nameOpacity,
          transform: `translateY(${nameSlide}px)`,
        }}
      >
        <h1
          style={{
            color: COLORS.textPrimary,
            fontSize: 48,
            fontWeight: 200,
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            letterSpacing: "0.04em",
            margin: 0,
            textAlign: "center",
          }}
        >
          {clinicName}
        </h1>
      </div>

      <div
        style={{
          width: `${lineWidth}px`,
          height: 1,
          background: `linear-gradient(90deg, transparent, ${accentColor}80, transparent)`,
        }}
      />

      <div
        style={{
          opacity: doctorOpacity,
          transform: `translateY(${doctorSlide}px)`,
        }}
      >
        <p
          style={{
            color: COLORS.textSecondary,
            fontSize: 26,
            fontWeight: 300,
            fontFamily: "system-ui, sans-serif",
            margin: 0,
            textAlign: "center",
          }}
        >
          A message from{" "}
          <span style={{ color: COLORS.purple, fontWeight: 400 }}>
            Dr. {doctorName}
          </span>
        </p>
      </div>
    </div>
  );
};
