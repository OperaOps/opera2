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
import type { DiagnosisType } from "../lib/schema";

import { PremiumCrowdingVisual } from "../components/dental/premium/PremiumCrowdingVisual";
import { PremiumSpacingVisual } from "../components/dental/premium/PremiumSpacingVisual";
import { PremiumOverbiteVisual } from "../components/dental/premium/PremiumOverbiteVisual";
import { PremiumUnderbiteVisual } from "../components/dental/premium/PremiumUnderbiteVisual";

const premiumConditionComponents: Partial<
  Record<DiagnosisType, React.FC<{ progress: number }>>
> = {
  crowding: PremiumCrowdingVisual,
  spacing: PremiumSpacingVisual,
  overbite: PremiumOverbiteVisual,
  underbite: PremiumUnderbiteVisual,
};

/** Warm amber/orange color for the Deep Dive badge */
const BADGE_COLOR = "#f59e0b";

export const DeepDiveScene: React.FC<{
  diagnosis: DiagnosisType;
  treatment?: string;
  heading: string;
  bullets?: string[];
  clinicName: string;
  doctorName: string;
  durationFrames: number;
  accentColor?: string;
}> = ({
  diagnosis,
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

  const ConditionVisual = premiumConditionComponents[diagnosis] ?? PremiumCrowdingVisual;

  // Look up cinematic image config for this treatment
  const sceneVisual = treatment
    ? getSceneVisualConfig(treatment, "deepDive")
    : undefined;
  const cinematicImageSrc = sceneVisual?.images[0];

  // Visual animation progress (0 to 1 over the scene)
  const visualProgress = interpolate(
    frame,
    [20, durationFrames - 30],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Layout animations
  const contentOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });

  const visualScale = spring({
    frame: Math.max(0, frame - 5),
    fps,
    config: { damping: 20, stiffness: 60 },
  });

  // Fade out at end
  const fadeOut = interpolate(
    frame,
    [durationFrames - 15, durationFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Badge pulse
  const badgePulse = interpolate(
    Math.sin(frame * 0.06),
    [-1, 1],
    [0.5, 0.9]
  );

  return (
    <AbsoluteFill>
      <Background accentColor={BADGE_COLOR} variant="warm" />

      {/* Minimal branding */}
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
        {/* Left side: Text content (30%) */}
        <div
          style={{
            flex: "0 0 30%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            opacity: contentOpacity,
            paddingRight: 30,
          }}
        >
          {/* Deep Dive badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 20,
              opacity: badgePulse,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                background: BADGE_COLOR,
                boxShadow: `0 0 12px ${BADGE_COLOR}80`,
              }}
            />
            <span
              style={{
                color: BADGE_COLOR,
                fontSize: 16,
                fontWeight: 500,
                fontFamily: "system-ui, sans-serif",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Understanding Your Condition
            </span>
          </div>

          <SceneHeading heading={heading} accentColor={accentColor} />

          {bullets.length > 0 && (
            <BulletList items={bullets} accentColor={accentColor} />
          )}
        </div>

        {/* Right side: Full-width premium visual (70%) */}
        <div
          style={{
            flex: "0 0 70%",
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
              width={780}
              height={580}
              borderRadius={24}
              overlay={sceneVisual.overlay ?? "dark"}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                maxWidth: 780,
                maxHeight: 580,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0,0,0,0.25)",
                borderRadius: 24,
                border: "1px solid rgba(255,255,255,0.06)",
                padding: 24,
                overflow: "visible",
              }}
            >
              <ConditionVisual progress={visualProgress} />
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};
