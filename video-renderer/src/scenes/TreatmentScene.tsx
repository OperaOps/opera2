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
import type { TreatmentType } from "../lib/schema";
import { CrownVisual } from "../components/dental/treatments/CrownVisual";
import { FillingVisual } from "../components/dental/treatments/FillingVisual";
import { BracesVisual } from "../components/dental/treatments/BracesVisual";
import { InvisalignVisual } from "../components/dental/treatments/InvisalignVisual";
import { ImplantVisual } from "../components/dental/treatments/ImplantVisual";
import { RootCanalVisual } from "../components/dental/treatments/RootCanalVisual";
import { WhiteningVisual } from "../components/dental/treatments/WhiteningVisual";
import { VeneersVisual } from "../components/dental/treatments/VeneersVisual";
import { RidgeAugmentationVisual } from "../components/dental/treatments/RidgeAugmentationVisual";
import { FullArchRestorationVisual } from "../components/dental/treatments/FullArchRestorationVisual";
import { DentalVideoClip } from "../components/DentalVideoClip";
import { getDentalVideoClips } from "../lib/dental-video-assets";
import { getFocusSettleExplain } from "../lib/focus-settle-motion";
import {
  HERO_VISUAL_HEIGHT,
  HERO_VISUAL_MAX_STYLE,
  HERO_VISUAL_WIDTH,
} from "../lib/visual-layout";
import { PremiumJourneyTextPanel } from "../components/PremiumJourneyTextPanel";
import { PremiumFramedMedia } from "../components/PremiumFramedMedia";
import { PremiumVisualFrame } from "../components/PremiumVisualFrame";

const treatmentComponents: Record<string, React.FC<{ progress: number }>> = {
  crown: CrownVisual,
  filling: FillingVisual,
  braces: BracesVisual,
  invisalign: InvisalignVisual,
  implant: ImplantVisual,
  root_canal: RootCanalVisual,
  whitening: WhiteningVisual,
  veneers: VeneersVisual,
  extraction: RootCanalVisual,
  bridge: CrownVisual,
  gum_treatment: FillingVisual,
  ceramic_braces: BracesVisual,
  expander: BracesVisual,
  jaw_surgery: BracesVisual,
  lingual_braces: BracesVisual,
  dentures: CrownVisual,
  retainer: InvisalignVisual,
  full_mouth_rehab: ImplantVisual, // Stage 2 fallback: extraction phase
};

/** Extended fallback visuals for specific scenes (used by DeepDive/WhatToExpect) */
export const extendedTreatmentComponents: Record<string, React.FC<{ progress: number }>> = {
  RidgeAugmentationVisual,
  FullArchRestorationVisual,
};

export const TreatmentScene: React.FC<{
  treatment: TreatmentType;
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

  const TreatmentVisual = treatmentComponents[treatment];

  // Look up dental video clips for this treatment
  const dentalVideoClips = getDentalVideoClips(treatment, "treatment");

  // Look up cinematic image config for this treatment
  const sceneVisual = getSceneVisualConfig(treatment, "treatment");
  const cinematicImageSrc = sceneVisual?.images[0];

  const visualProgress = interpolate(
    frame,
    [20, Math.max(21, durationFrames - 30)],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const useFse = premiumJourneyStyle;
  const fse = getFocusSettleExplain(frame, fps, "left", useFse);

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

  // Step indicator animation
  const stepCount = bullets.length || 3;
  const activeStep = Math.min(
    Math.floor(visualProgress * stepCount),
    stepCount - 1
  );

  return (
    <AbsoluteFill>
      <Background accentColor={accentColor} variant={premiumJourneyStyle ? "journey" : "cool"} />

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
        {/* Left side: Visual (flipped from problem scene for variety) */}
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
            <DentalVideoClip
              clips={dentalVideoClips}
              width={HERO_VISUAL_WIDTH}
              height={HERO_VISUAL_HEIGHT}
              borderRadius={24}
              accentColor={accentColor}
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
                  overlay={sceneVisual.overlay ?? "dark"}
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
                overlay={sceneVisual.overlay ?? "dark"}
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
                <TreatmentVisual progress={visualProgress} />
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
              <TreatmentVisual progress={visualProgress} />
            </div>
          )}
        </div>

        {/* Right side: Text content */}
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
              accentBarColor={COLORS.healthyTeal}
              opacity={fse.textColumnOpacity}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 18,
                }}
              >
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    background: COLORS.healthyTeal,
                    boxShadow: `0 0 12px ${COLORS.healthyTeal}80`,
                  }}
                />
                <span
                  style={{
                    color: COLORS.healthyTeal,
                    fontSize: 15,
                    fontWeight: 500,
                    fontFamily: "system-ui, sans-serif",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Your Treatment Plan
                </span>
              </div>

              <SceneHeading heading={heading} accentColor={accentColor} />

              {bullets.length > 0 && (
                <div style={{ marginTop: 8 }}>
                  <div
                    style={{
                      display: "flex",
                      gap: 4,
                      marginBottom: 20,
                      marginTop: 16,
                    }}
                  >
                    {bullets.map((_, i) => (
                      <div
                        key={i}
                        style={{
                          flex: 1,
                          height: 3,
                          borderRadius: 2,
                          background:
                            i <= activeStep
                              ? accentColor
                              : "rgba(255,255,255,0.1)",
                          transition: "background 0.3s ease",
                        }}
                      />
                    ))}
                  </div>
                  <BulletList items={bullets} accentColor={accentColor} />
                </div>
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
                }}
              >
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    background: COLORS.healthyTeal,
                    boxShadow: `0 0 12px ${COLORS.healthyTeal}80`,
                  }}
                />
                <span
                  style={{
                    color: COLORS.healthyTeal,
                    fontSize: 16,
                    fontWeight: 500,
                    fontFamily: "system-ui, sans-serif",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  Your Treatment Plan
                </span>
              </div>

              <SceneHeading heading={heading} accentColor={accentColor} />

              {bullets.length > 0 && (
                <div style={{ marginTop: 8 }}>
                  <div
                    style={{
                      display: "flex",
                      gap: 4,
                      marginBottom: 20,
                      marginTop: 16,
                    }}
                  >
                    {bullets.map((_, i) => (
                      <div
                        key={i}
                        style={{
                          flex: 1,
                          height: 3,
                          borderRadius: 2,
                          background:
                            i <= activeStep
                              ? accentColor
                              : "rgba(255,255,255,0.1)",
                          transition: "background 0.3s ease",
                        }}
                      />
                    ))}
                  </div>
                  <BulletList items={bullets} accentColor={accentColor} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

    </AbsoluteFill>
  );
};
