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
import { DentalVideoClip } from "../components/DentalVideoClip";
import { getDentalVideoClips } from "../lib/dental-video-assets";
import {
  HERO_VISUAL_HEIGHT,
  HERO_VISUAL_MAX_STYLE,
  HERO_VISUAL_WIDTH,
} from "../lib/visual-layout";
import { PremiumJourneyTextPanel } from "../components/PremiumJourneyTextPanel";
import { PremiumFramedMedia } from "../components/PremiumFramedMedia";
import { PremiumVisualFrame } from "../components/PremiumVisualFrame";

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
  premiumJourneyStyle?: boolean;
}> = ({
  diagnosis,
  treatment,
  heading,
  bullets = [],
  clinicName,
  doctorName,
  durationFrames,
  accentColor = COLORS.purple,
  premiumJourneyStyle = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ConditionVisual = conditionComponents[diagnosis];

  // Look up dental video clips for the problem scene
  const dentalVideoClips = treatment
    ? getDentalVideoClips(treatment, "problem")
    : undefined;

  // Look up cinematic image config for this treatment
  const sceneVisual = treatment
    ? getSceneVisualConfig(treatment, "problem")
    : undefined;
  const cinematicImageSrc = sceneVisual?.images[0];

  // Visual animation progress (0 to 1 over the scene)
  const visualProgress = interpolate(
    frame,
    [20, Math.max(21, durationFrames - 30)],
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
      <Background
        accentColor={COLORS.problemRed}
        variant={premiumJourneyStyle ? "journey" : "warm"}
      />

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
            paddingRight: 28,
            minWidth: 0,
          }}
        >
          {premiumJourneyStyle ? (
            <PremiumJourneyTextPanel
              accentBarColor={COLORS.problemRed}
              opacity={contentOpacity}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 18,
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
                    fontSize: 15,
                    fontWeight: 500,
                    fontFamily: "system-ui, sans-serif",
                    letterSpacing: "0.1em",
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
            </PremiumJourneyTextPanel>
          ) : (
            <div style={{ opacity: contentOpacity }}>
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
          {dentalVideoClips ? (
            <DentalVideoClip
              clips={dentalVideoClips}
              width={HERO_VISUAL_WIDTH}
              height={HERO_VISUAL_HEIGHT}
              borderRadius={24}
              accentColor={COLORS.problemRed}
              progress={visualProgress}
            />
          ) : cinematicImageSrc && sceneVisual ? (
            premiumJourneyStyle ? (
              <PremiumFramedMedia
                width={HERO_VISUAL_WIDTH}
                height={HERO_VISUAL_HEIGHT}
                borderRadius={24}
              >
                <CinematicImage
                  src={cinematicImageSrc}
                  effect={sceneVisual.effect}
                  progress={visualProgress}
                  width={HERO_VISUAL_WIDTH}
                  height={HERO_VISUAL_HEIGHT}
                  borderRadius={0}
                  overlay={sceneVisual.overlay ?? "gradient-bottom"}
                />
              </PremiumFramedMedia>
            ) : (
              <CinematicImage
                src={cinematicImageSrc}
                effect={sceneVisual.effect}
                progress={visualProgress}
                width={HERO_VISUAL_WIDTH}
                height={HERO_VISUAL_HEIGHT}
                borderRadius={24}
                overlay={sceneVisual.overlay ?? "gradient-bottom"}
              />
            )
          ) : premiumJourneyStyle ? (
            <PremiumVisualFrame
              width={HERO_VISUAL_WIDTH}
              height={HERO_VISUAL_HEIGHT}
              borderRadius={24}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 28,
                  boxSizing: "border-box",
                }}
              >
                <ConditionVisual progress={visualProgress} />
              </div>
            </PremiumVisualFrame>
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                ...HERO_VISUAL_MAX_STYLE,
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
