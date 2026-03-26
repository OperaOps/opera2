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
import type { TreatmentType } from "../lib/schema";

// Lazy-load condition visuals
import { CavityVisual } from "../components/dental/conditions/CavityVisual";
import { CrowdingVisual } from "../components/dental/conditions/CrowdingVisual";
import { SpacingVisual } from "../components/dental/conditions/SpacingVisual";
import { OverbiteVisual } from "../components/dental/conditions/OverbiteVisual";
import { UnderbiteVisual } from "../components/dental/conditions/UnderbiteVisual";
import { GumDiseaseVisual } from "../components/dental/conditions/GumDiseaseVisual";
import { MissingToothVisual } from "../components/dental/conditions/MissingToothVisual";
import { CrackedToothVisual } from "../components/dental/conditions/CrackedToothVisual";

const conditionComponents: Record<DiagnosisType, React.FC<{ progress: number }>> = {
  cavity: CavityVisual,
  crowding: CrowdingVisual,
  spacing: SpacingVisual,
  overbite: OverbiteVisual,
  underbite: UnderbiteVisual,
  gum_disease: GumDiseaseVisual,
  missing_tooth: MissingToothVisual,
  cracked_tooth: CrackedToothVisual,
};

export const ProblemScene: React.FC<{
  diagnosis: DiagnosisType;
  treatment?: TreatmentType | string;
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

  const ConditionVisual = conditionComponents[diagnosis];

  // Look up cinematic image config for this treatment
  const sceneVisual = treatment
    ? getSceneVisualConfig(treatment, "problem")
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

  // Problem indicator pulse
  const pulseOpacity = interpolate(
    Math.sin(frame * 0.08),
    [-1, 1],
    [0.3, 0.6]
  );

  return (
    <AbsoluteFill>
      <Background accentColor={COLORS.problemRed} variant="warm" />

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
        {/* Left side: Text content */}
        <div
          style={{
            flex: "0 0 45%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            opacity: contentOpacity,
            paddingRight: 40,
          }}
        >
          {/* Problem badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 20,
              opacity: pulseOpacity + 0.4,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                background: COLORS.problemRed,
                boxShadow: `0 0 12px ${COLORS.problemRed}80`,
              }}
            />
            <span
              style={{
                color: COLORS.problemRed,
                fontSize: 16,
                fontWeight: 500,
                fontFamily: "system-ui, sans-serif",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              What We Found
            </span>
          </div>

          <SceneHeading heading={heading} accentColor={accentColor} />

          {bullets.length > 0 && (
            <BulletList items={bullets} accentColor={accentColor} />
          )}
        </div>

        {/* Right side: Visual */}
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
                background: "rgba(0,0,0,0.2)",
                borderRadius: 24,
                border: "1px solid rgba(255,255,255,0.06)",
                padding: 30,
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
