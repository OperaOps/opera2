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
import { DentalVideoClip } from "../components/DentalVideoClip";
import { getDentalVideoClips } from "../lib/dental-video-assets";
import { PremiumCrowdingVisual } from "../components/dental/premium/PremiumCrowdingVisual";
import { PremiumSpacingVisual } from "../components/dental/premium/PremiumSpacingVisual";
import { PremiumOverbiteVisual } from "../components/dental/premium/PremiumOverbiteVisual";
import { PremiumUnderbiteVisual } from "../components/dental/premium/PremiumUnderbiteVisual";
import { RidgeAugmentationVisual } from "../components/dental/treatments/RidgeAugmentationVisual";
import { PremiumVisualFrame } from "../components/PremiumVisualFrame";
import { PremiumFramedMedia } from "../components/PremiumFramedMedia";
import {
  DEEP_DIVE_VISUAL_HEIGHT,
  DEEP_DIVE_VISUAL_WIDTH,
} from "../lib/visual-layout";
import { PremiumJourneyTextPanel } from "../components/PremiumJourneyTextPanel";
import { getPremiumSyntheticDeepDive } from "../lib/synthetic-premium-registry";

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
  /** Premium 8-scene composition: glass panel + journey background (same polish as flagship FMR) */
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

  const ConditionVisual = premiumConditionComponents[diagnosis] ?? PremiumCrowdingVisual;

  const SyntheticDeepDive =
    premiumJourneyStyle ? getPremiumSyntheticDeepDive(treatment) : null;

  // Only dedicated deepDive clips — never reuse problem.mp4 (avoids back-to-back duplicate with Problem scene)
  const dentalVideoClips = treatment
    ? getDentalVideoClips(treatment, "deepDive")
    : undefined;

  // Look up cinematic image config for this treatment
  const sceneVisual = treatment
    ? getSceneVisualConfig(treatment, "deepDive")
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

  // Badge pulse
  const badgePulse = interpolate(
    Math.sin(frame * 0.06),
    [-1, 1],
    [0.5, 0.9]
  );

  // Two-beat pattern: video clip first half → synthetic SVG second half
  // Applies to ANY treatment that has both video clips AND a synthetic deep dive visual
  const isFmr = treatment === "full_mouth_rehab";
  const hasTwoBeat = !!(dentalVideoClips && dentalVideoClips.length > 0 && (isFmr || SyntheticDeepDive));
  const deepSplit =
    hasTwoBeat && durationFrames > 40 ? Math.floor(durationFrames * 0.52) : Number.POSITIVE_INFINITY;
  const deepVideoOpacity = hasTwoBeat
    ? interpolate(
        frame,
        [Math.max(0, deepSplit - 22), deepSplit],
        [1, 0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      )
    : 1;
  const ridgeMomentOpacity = hasTwoBeat
    ? interpolate(
        frame,
        [Math.max(0, deepSplit - 14), deepSplit + 14],
        [0, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      )
    : 0;
  const ridgeProgress = hasTwoBeat
    ? interpolate(
        frame,
        [deepSplit, Math.max(deepSplit + 1, durationFrames - 20)],
        [0, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      )
    : 0;

  return (
    <AbsoluteFill>
      <Background
        accentColor={BADGE_COLOR}
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
        {/* Left side: Text content (30%) */}
        <div
          style={{
            flex: "0 0 30%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingRight: 20,
            minWidth: 0,
          }}
        >
          {premiumJourneyStyle ? (
            <PremiumJourneyTextPanel
              accentBarColor={BADGE_COLOR}
              opacity={contentOpacity}
              maxWidth={520}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 18,
                  opacity: badgePulse,
                }}
              >
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    background: BADGE_COLOR,
                    boxShadow: `0 0 6px ${BADGE_COLOR}40`,
                  }}
                />
                <span
                  style={{
                    color: BADGE_COLOR,
                    fontSize: 15,
                    fontWeight: 500,
                    fontFamily: "system-ui, sans-serif",
                    letterSpacing: "0.1em",
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
            </PremiumJourneyTextPanel>
          ) : (
            <div style={{ opacity: contentOpacity }}>
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
                    boxShadow: `0 0 6px ${BADGE_COLOR}40`,
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
          {dentalVideoClips ? (
            <div
              style={{
                position: "relative",
                width: DEEP_DIVE_VISUAL_WIDTH,
                height: DEEP_DIVE_VISUAL_HEIGHT,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: deepVideoOpacity,
                }}
              >
                <DentalVideoClip
                  clips={dentalVideoClips}
                  width={DEEP_DIVE_VISUAL_WIDTH}
                  height={DEEP_DIVE_VISUAL_HEIGHT}
                  borderRadius={24}
                  accentColor={BADGE_COLOR}
                  progress={visualProgress}
                />
              </div>
              {hasTwoBeat && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    opacity: ridgeMomentOpacity,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <PremiumVisualFrame
                    width={DEEP_DIVE_VISUAL_WIDTH}
                    height={DEEP_DIVE_VISUAL_HEIGHT}
                    borderRadius={20}
                  >
                    <div
                      style={{
                        padding: "12px 16px",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxSizing: "border-box",
                      }}
                    >
                      {isFmr ? (
                        <RidgeAugmentationVisual progress={ridgeProgress} />
                      ) : SyntheticDeepDive ? (
                        <SyntheticDeepDive progress={ridgeProgress} />
                      ) : (
                        <ConditionVisual progress={ridgeProgress} />
                      )}
                    </div>
                  </PremiumVisualFrame>
                </div>
              )}
            </div>
          ) : SyntheticDeepDive ? (
            <PremiumVisualFrame
              width={DEEP_DIVE_VISUAL_WIDTH}
              height={DEEP_DIVE_VISUAL_HEIGHT}
              borderRadius={24}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "10px 14px",
                  boxSizing: "border-box",
                }}
              >
                <div style={{ width: "100%", height: "100%", minHeight: 0 }}>
                  <SyntheticDeepDive progress={visualProgress} />
                </div>
              </div>
            </PremiumVisualFrame>
          ) : cinematicImageSrc && sceneVisual ? (
            premiumJourneyStyle ? (
              <PremiumFramedMedia
                width={DEEP_DIVE_VISUAL_WIDTH}
                height={DEEP_DIVE_VISUAL_HEIGHT}
                borderRadius={24}
              >
                <CinematicImage
                  src={cinematicImageSrc}
                  effect={sceneVisual.effect}
                  progress={visualProgress}
                  width={DEEP_DIVE_VISUAL_WIDTH}
                  height={DEEP_DIVE_VISUAL_HEIGHT}
                  borderRadius={0}
                  overlay={sceneVisual.overlay ?? "dark"}
                />
              </PremiumFramedMedia>
            ) : (
              <CinematicImage
                src={cinematicImageSrc}
                effect={sceneVisual.effect}
                progress={visualProgress}
                width={DEEP_DIVE_VISUAL_WIDTH}
                height={DEEP_DIVE_VISUAL_HEIGHT}
                borderRadius={24}
                overlay={sceneVisual.overlay ?? "dark"}
              />
            )
          ) : premiumJourneyStyle ? (
            <PremiumVisualFrame
              width={DEEP_DIVE_VISUAL_WIDTH}
              height={DEEP_DIVE_VISUAL_HEIGHT}
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
                maxWidth: DEEP_DIVE_VISUAL_WIDTH,
                maxHeight: DEEP_DIVE_VISUAL_HEIGHT,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#f8f9fa",
                borderRadius: 24,
                border: "1px solid #e5e7eb",
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
