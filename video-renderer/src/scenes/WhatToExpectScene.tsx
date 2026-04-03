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
import { DentalVideoClip } from "../components/DentalVideoClip";
import { getDentalVideoClips } from "../lib/dental-video-assets";
import { FullArchRestorationVisual } from "../components/dental/treatments/FullArchRestorationVisual";
import { PremiumVisualFrame } from "../components/PremiumVisualFrame";
import { getFocusSettleExplain } from "../lib/focus-settle-motion";
import {
  HERO_VISUAL_HEIGHT,
  HERO_VISUAL_MAX_STYLE,
  HERO_VISUAL_WIDTH,
} from "../lib/visual-layout";
import { PremiumJourneyTextPanel } from "../components/PremiumJourneyTextPanel";
import { PremiumFramedMedia } from "../components/PremiumFramedMedia";

export const WhatToExpectScene: React.FC<{
  treatment?: string;
  heading: string;
  bullets?: string[];
  clinicName: string;
  doctorName: string;
  durationFrames: number;
  accentColor?: string;
  premiumJourneyStyle?: boolean;
}> = ({
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

  // WhatToExpect uses its own clips if available (e.g. full_mouth_rehab Stage 5)
  const dentalVideoClips = treatment
    ? getDentalVideoClips(treatment, "whatToExpect")
    : undefined;

  // Look up cinematic image config for this treatment
  const sceneVisual = treatment
    ? getSceneVisualConfig(treatment, "whatToExpect")
    : undefined;
  const cinematicImageSrc = sceneVisual?.images[0];

  const visualProgress = interpolate(
    frame,
    [20, Math.max(21, durationFrames - 30)],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const isFmr = treatment === "full_mouth_rehab";
  const fse = getFocusSettleExplain(frame, fps, "left", premiumJourneyStyle);

  const visualScaleSpring = spring({
    frame: Math.max(0, frame - 5),
    fps,
    config: { damping: 20, stiffness: 60 },
  });
  const visualScale = premiumJourneyStyle ? 1 : visualScaleSpring;

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

  const hasFmrWte =
    !!(isFmr && dentalVideoClips && dentalVideoClips.length > 0);
  const wteSplit =
    hasFmrWte && durationFrames > 40 ? Math.floor(durationFrames * 0.52) : Number.POSITIVE_INFINITY;
  const wteVideoOpacity = hasFmrWte
    ? interpolate(
        frame,
        [Math.max(0, wteSplit - 22), wteSplit],
        [1, 0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      )
    : 1;
  const archMomentOpacity = hasFmrWte
    ? interpolate(
        frame,
        [Math.max(0, wteSplit - 14), wteSplit + 14],
        [0, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      )
    : 0;
  const archProgress = hasFmrWte
    ? interpolate(
        frame,
        [wteSplit, Math.max(wteSplit + 1, durationFrames - 20)],
        [0, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      )
    : 0;

  return (
    <AbsoluteFill>
      <Background
        accentColor={COLORS.healthyGreen}
        variant={premiumJourneyStyle ? "journey" : "cool"}
      />

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
            transform: `translateX(${fse.translateXPercent}%) scale(${visualScale * fse.scaleMul})`,
            transformOrigin: "center center",
          }}
        >
          {dentalVideoClips ? (
            <div
              style={{
                position: "relative",
                width: HERO_VISUAL_WIDTH,
                height: HERO_VISUAL_HEIGHT,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: wteVideoOpacity,
                }}
              >
                <DentalVideoClip
                  clips={dentalVideoClips}
                  width={HERO_VISUAL_WIDTH}
                  height={HERO_VISUAL_HEIGHT}
                  borderRadius={24}
                  accentColor={COLORS.healthyGreen}
                  progress={visualProgress}
                />
              </div>
              {hasFmrWte && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    opacity: archMomentOpacity,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <PremiumVisualFrame
                    width={HERO_VISUAL_WIDTH}
                    height={HERO_VISUAL_HEIGHT}
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
                      <FullArchRestorationVisual progress={archProgress} />
                    </div>
                  </PremiumVisualFrame>
                </div>
              )}
            </div>
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
                <RetainerVisual progress={visualProgress} />
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
            paddingLeft: 32,
            minWidth: 0,
          }}
        >
          {premiumJourneyStyle ? (
            <PremiumJourneyTextPanel
              accentBarColor={COLORS.healthyGreen}
              opacity={fse.textColumnOpacity}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 18,
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
                    fontSize: 15,
                    fontWeight: 500,
                    fontFamily: "system-ui, sans-serif",
                    letterSpacing: "0.1em",
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
            </PremiumJourneyTextPanel>
          ) : (
            <div style={{ opacity: fse.textColumnOpacity }}>
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
          )}
        </div>
      </div>

    </AbsoluteFill>
  );
};
