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
}> = ({ clinicName, doctorName, patientName, heading, durationFrames = 160, accentColor = COLORS.purple }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // === Staggered reveal timing ===

  // 1. Accent line sweeps in (frame 15-35)
  const lineProgress = interpolate(frame, [15, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 2. Clinic branding fades up (frame 25-45)
  const brandOpacity = interpolate(frame, [25, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const brandSlide = interpolate(frame, [25, 45], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 3. Heading appears with spring (frame 40+)
  const headingSpring = spring({
    frame: Math.max(0, frame - 40),
    fps,
    config: { damping: 20, stiffness: 80 },
  });
  const headingOpacity = interpolate(frame, [40, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 4. Patient name fades in (frame 60-80)
  const nameOpacity = interpolate(frame, [60, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const nameSlide = interpolate(frame, [60, 80], [15, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 5. Decorative elements
  const glowPulse = interpolate(
    Math.sin(frame * 0.04),
    [-1, 1],
    [0.15, 0.35]
  );

  // Fade out at end
  const fadeOut = interpolate(
    frame,
    [Math.max(0, durationFrames - 18), durationFrames],
    [1, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  // Subtle zoom on entire scene
  const sceneScale = interpolate(frame, [0, durationFrames], [1.02, 1.0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <Background accentColor={accentColor} variant="warm" />

      {/* Ambient glow orbs */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "15%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${accentColor}18 0%, transparent 70%)`,
          opacity: glowPulse,
          filter: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          right: "20%",
          width: 350,
          height: 350,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${accentColor}12 0%, transparent 70%)`,
          opacity: glowPulse * 0.7,
          filter: "none",
        }}
      />

      {/* Animated accent lines */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: fadeOut,
        }}
        viewBox="0 0 1920 1080"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="introLineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0" />
            <stop offset="30%" stopColor={accentColor} stopOpacity="0.4" />
            <stop offset="70%" stopColor={accentColor} stopOpacity="0.4" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Top accent line */}
        <rect
          x={960 - 960 * lineProgress}
          y={330}
          width={1920 * lineProgress}
          height={1}
          fill="url(#introLineGrad)"
        />

        {/* Bottom accent line (slightly delayed) */}
        <rect
          x={960 - 960 * Math.max(0, lineProgress - 0.1) / 0.9}
          y={750}
          width={1920 * Math.max(0, lineProgress - 0.1) / 0.9}
          height={1}
          fill="url(#introLineGrad)"
          opacity={0.5}
        />

        {/* Corner accents */}
        {lineProgress > 0.5 && (
          <>
            {/* Top-left corner */}
            <g opacity={(lineProgress - 0.5) * 2 * 0.3}>
              <line x1="80" y1="80" x2="80" y2="130" stroke={accentColor} strokeWidth="1" />
              <line x1="80" y1="80" x2="130" y2="80" stroke={accentColor} strokeWidth="1" />
            </g>
            {/* Top-right corner */}
            <g opacity={(lineProgress - 0.5) * 2 * 0.3}>
              <line x1="1840" y1="80" x2="1840" y2="130" stroke={accentColor} strokeWidth="1" />
              <line x1="1840" y1="80" x2="1790" y2="80" stroke={accentColor} strokeWidth="1" />
            </g>
            {/* Bottom-left corner */}
            <g opacity={(lineProgress - 0.5) * 2 * 0.2}>
              <line x1="80" y1="1000" x2="80" y2="950" stroke={accentColor} strokeWidth="1" />
              <line x1="80" y1="1000" x2="130" y2="1000" stroke={accentColor} strokeWidth="1" />
            </g>
            {/* Bottom-right corner */}
            <g opacity={(lineProgress - 0.5) * 2 * 0.2}>
              <line x1="1840" y1="1000" x2="1840" y2="950" stroke={accentColor} strokeWidth="1" />
              <line x1="1840" y1="1000" x2="1790" y2="1000" stroke={accentColor} strokeWidth="1" />
            </g>
          </>
        )}
      </svg>

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
        {/* Clinic branding */}
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
          />
        </div>

        {/* Treatment heading (if provided) */}
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

        {/* Thin divider */}
        <div
          style={{
            width: interpolate(lineProgress, [0.3, 1], [0, 120], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            height: 1,
            background: `linear-gradient(90deg, transparent, ${accentColor}60, transparent)`,
            marginTop: 10,
            marginBottom: 5,
          }}
        />

        {/* Patient greeting */}
        <div
          style={{
            opacity: nameOpacity,
            transform: `translateY(${nameSlide}px)`,
          }}
        >
          <p
            style={{
              color: COLORS.textMuted,
              fontSize: 20,
              fontWeight: 300,
              fontFamily: "system-ui, sans-serif",
              textAlign: "center",
              margin: 0,
              letterSpacing: "0.06em",
            }}
          >
            Prepared especially for
          </p>
          <p
            style={{
              color: COLORS.textSecondary,
              fontSize: 28,
              fontWeight: 400,
              fontFamily: "system-ui, sans-serif",
              textAlign: "center",
              margin: "8px 0 0",
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
