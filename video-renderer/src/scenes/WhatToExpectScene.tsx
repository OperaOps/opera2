import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";
import { Background } from "../components/Background";
import { ClinicBranding } from "../components/ClinicBranding";
import { SceneHeading, BulletList } from "../components/SceneHeading";
import { CinematicImage } from "../components/CinematicImage";
import { COLORS } from "../lib/colors";
import { getSceneVisualConfig } from "../lib/treatment-visuals";
import { RetainerVisual } from "../components/dental/premium/RetainerVisual";

export const WhatToExpectScene: React.FC<{
  treatment?: string;
  heading: string;
  bullets?: string[];
  clinicName: string;
  doctorName: string;
  durationFrames: number;
  accentColor?: string;
}> = ({
  treatment,
  heading,
  bullets = [],
  clinicName,
  doctorName,
  durationFrames,
  accentColor = COLORS.purple,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Look up cinematic image config for this treatment
  const sceneVisual = treatment
    ? getSceneVisualConfig(treatment, "whatToExpect")
    : undefined;
  const cinematicImageSrc = sceneVisual?.images[0];

  const visualProgress = interpolate(
    frame,
    [20, durationFrames - 30],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const contentOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });

  const visualScale = spring({
    frame: Math.max(0, frame - 5),
    fps,
    config: { damping: 20, stiffness: 60 },
  });

  const fadeOut = interpolate(
    frame,
    [durationFrames - 15, durationFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Green glow pulse for the aftercare badge
  const glowIntensity = interpolate(
    Math.sin(frame * 0.06),
    [-1, 1],
    [0.4, 0.85]
  );

  return (
    <AbsoluteFill>
      <Background accentColor={COLORS.healthyGreen} variant="cool" />

      <ClinicBranding
        clinicName={clinicName}
        doctorName={doctorName}
        variant="minimal"
        accentColor={accentColor}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          opacity: fadeOut,
          padding: "90px 80px 120px",
        }}
      >
        {/* Left side: Visual (55%) */}
        <div
          style={{
            flex: "0 0 55%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${visualScale})`,
          }}
        >
          {cinematicImageSrc && sceneVisual ? (
            <CinematicImage
              src={cinematicImageSrc}
              effect={sceneVisual.effect}
              progress={visualProgress}
              width={650}
              height={520}
              borderRadius={24}
              overlay={sceneVisual.overlay ?? "gradient-bottom"}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                maxWidth: 650,
                maxHeight: 520,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0,0,0,0.15)",
                borderRadius: 24,
                border: `1px solid ${COLORS.healthyGreen}15`,
                padding: 30,
                overflow: "visible",
              }}
            >
              <RetainerVisual progress={visualProgress} />
            </div>
          )}
        </div>

        {/* Right side: Text content (45%) */}
        <div
          style={{
            flex: "0 0 45%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            opacity: contentOpacity,
            paddingLeft: 40,
          }}
        >
          {/* After Treatment badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 20,
              opacity: glowIntensity,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                background: COLORS.healthyGreen,
                boxShadow: `0 0 12px ${COLORS.healthyGreen}80`,
              }}
            />
            <span
              style={{
                color: COLORS.healthyGreen,
                fontSize: 16,
                fontWeight: 500,
                fontFamily: "system-ui, sans-serif",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              After Treatment
            </span>
          </div>

          <SceneHeading heading={heading} accentColor={accentColor} />

          {bullets.length > 0 && (
            <BulletList items={bullets} accentColor={COLORS.healthyGreen} />
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};
