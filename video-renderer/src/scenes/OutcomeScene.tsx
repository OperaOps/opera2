import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  staticFile,
} from "remotion";
import { Background } from "../components/Background";
import { ClinicBranding } from "../components/ClinicBranding";
import { SceneHeading, BulletList } from "../components/SceneHeading";
import { CinematicImage } from "../components/CinematicImage";
import { COLORS } from "../lib/colors";
import { getSceneVisualConfig } from "../lib/treatment-visuals";
import { getStockPhotos } from "../lib/asset-packs";
import type { TreatmentType } from "../lib/schema";
import { BeforeAfterComparison } from "../components/BeforeAfterComparison";
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

import { HealthyToothVisual } from "../components/dental/outcomes/HealthyToothVisual";
import { AlignedTeethVisual } from "../components/dental/outcomes/AlignedTeethVisual";
import { BrightSmileVisual } from "../components/dental/outcomes/BrightSmileVisual";

/** Pick the right outcome visual based on treatment type */
function getOutcomeComponent(
  treatment: string
): React.FC<{ progress: number }> {
  switch (treatment) {
    case "braces":
    case "invisalign":
    case "ceramic_braces":
    case "lingual_braces":
    case "expander":
    case "jaw_surgery":
    case "retainer":
      return AlignedTeethVisual;
    case "whitening":
    case "veneers":
      return BrightSmileVisual;
    case "gum_treatment":
    case "dentures":
      return HealthyToothVisual;
    default:
      return HealthyToothVisual;
  }
}

export const OutcomeScene: React.FC<{
  treatment: TreatmentType;
  heading: string;
  bullets?: string[];
  clinicName: string;
  doctorName: string;
  durationFrames: number;
  accentColor?: string;
  beforePhotoUrl?: string;
  afterPhotoUrl?: string;
  premiumJourneyStyle?: boolean;
}> = ({
  treatment,
  heading,
  bullets = [],
  clinicName,
  doctorName,
  durationFrames,
  accentColor = COLORS.purple,
  beforePhotoUrl,
  afterPhotoUrl,
  premiumJourneyStyle = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const OutcomeVisual = getOutcomeComponent(treatment);

  // Look up dental video clips for outcome
  const dentalVideoClips = getDentalVideoClips(treatment, "outcome");

  // Look up cinematic image config for this treatment
  const sceneVisual = getSceneVisualConfig(treatment, "outcome");
  const cinematicImageSrc = sceneVisual?.images[0];

  // Resolve before/after photos: use patient-provided if available,
  // otherwise fall back to stock photos from the asset pack registry
  const stockPhotos = getStockPhotos(treatment);
  const resolvedBeforeUrl = beforePhotoUrl ?? stockPhotos.before;
  const resolvedAfterUrl = afterPhotoUrl ?? stockPhotos.after;
  const hasBeforeAfter = !!(resolvedBeforeUrl && resolvedAfterUrl);

  const visualProgress = interpolate(
    frame,
    [15, Math.max(16, durationFrames - 20)],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Before/after comparison uses a more dramatic timing curve:
  // - Hold "before" for the first 15% of the scene to let it register
  // - Sweep the divider from 15% → 75% of scene duration
  // - Hold "after" for the remaining 25% so the result sinks in
  const beforeAfterProgress = interpolate(
    frame,
    [
      Math.round(durationFrames * 0.15),
      Math.round(durationFrames * 0.75),
    ],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const contentOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });

  const visualScale = spring({
    frame: Math.max(0, frame - 5),
    fps,
    config: { damping: 15, stiffness: 50 },
  });

  const fadeOut = interpolate(
    frame,
    [durationFrames - 15, durationFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Success glow pulse
  const glowIntensity = interpolate(
    Math.sin(frame * 0.06),
    [-1, 1],
    [0.3, 0.8]
  );

  // Two-beat outcome: video clip first half → still images second half
  // Applies to any treatment with both video clips and 2+ outcome images
  const isFmrOutcome =
    !!dentalVideoClips?.length &&
    !!sceneVisual &&
    sceneVisual.images.length >= 2;
  const outcomeSplit =
    isFmrOutcome && durationFrames > 50
      ? Math.floor(durationFrames * 0.48)
      : Number.POSITIVE_INFINITY;
  const outcomeVideoOpacity = isFmrOutcome
    ? interpolate(
        frame,
        [Math.max(0, outcomeSplit - 20), outcomeSplit],
        [1, 0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      )
    : 1;
  const outcomeStillsOpacity = isFmrOutcome
    ? interpolate(
        frame,
        [Math.max(0, outcomeSplit - 12), outcomeSplit + 12],
        [0, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      )
    : 0;
  const stillProgress = isFmrOutcome
    ? interpolate(
        frame,
        [outcomeSplit, Math.max(outcomeSplit + 1, durationFrames - 8)],
        [0, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      )
    : 0;
  const stillImg0Opacity = isFmrOutcome
    ? interpolate(stillProgress, [0, 0.45, 0.58], [1, 1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 1;
  const stillImg1Opacity = isFmrOutcome
    ? interpolate(stillProgress, [0.4, 0.55, 1], [0, 1, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
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
              accentBarColor={COLORS.healthyGreen}
              opacity={contentOpacity}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 18,
                  opacity: glowIntensity * 0.6 + 0.4,
                }}
              >
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    background: COLORS.healthyGreen,
                    boxShadow: `0 0 6px ${COLORS.healthyGreen}40`,
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
                  Expected Results
                </span>
              </div>

              <SceneHeading heading={heading} accentColor={accentColor} />

              {bullets.length > 0 && (
                <BulletList items={bullets} accentColor={COLORS.healthyGreen} />
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
                  opacity: glowIntensity * 0.6 + 0.4,
                }}
              >
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    background: COLORS.healthyGreen,
                    boxShadow: `0 0 6px ${COLORS.healthyGreen}40`,
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
                  Expected Results
                </span>
              </div>

              <SceneHeading heading={heading} accentColor={accentColor} />

              {bullets.length > 0 && (
                <BulletList items={bullets} accentColor={COLORS.healthyGreen} />
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
          {isFmrOutcome && sceneVisual ? (
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
                  opacity: outcomeVideoOpacity,
                }}
              >
                <DentalVideoClip
                  clips={dentalVideoClips!}
                  width={HERO_VISUAL_WIDTH}
                  height={HERO_VISUAL_HEIGHT}
                  borderRadius={24}
                  accentColor={COLORS.healthyGreen}
                  progress={visualProgress}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: outcomeStillsOpacity,
                  borderRadius: 24,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    opacity: stillImg0Opacity,
                  }}
                >
                  {premiumJourneyStyle ? (
                    <PremiumFramedMedia
                      width={HERO_VISUAL_WIDTH}
                      height={HERO_VISUAL_HEIGHT}
                      borderRadius={24}
                    >
                      <CinematicImage
                        src={sceneVisual.images[0]}
                        effect={sceneVisual.effect}
                        progress={stillProgress}
                        width={HERO_VISUAL_WIDTH}
                        height={HERO_VISUAL_HEIGHT}
                        borderRadius={0}
                        overlay={sceneVisual.overlay ?? "gradient-bottom"}
                      />
                    </PremiumFramedMedia>
                  ) : (
                    <CinematicImage
                      src={sceneVisual.images[0]}
                      effect={sceneVisual.effect}
                      progress={stillProgress}
                      width={HERO_VISUAL_WIDTH}
                      height={HERO_VISUAL_HEIGHT}
                      borderRadius={24}
                      overlay={sceneVisual.overlay ?? "gradient-bottom"}
                    />
                  )}
                </div>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    opacity: stillImg1Opacity,
                  }}
                >
                  {premiumJourneyStyle ? (
                    <PremiumFramedMedia
                      width={HERO_VISUAL_WIDTH}
                      height={HERO_VISUAL_HEIGHT}
                      borderRadius={24}
                    >
                      <CinematicImage
                        src={sceneVisual.images[1]}
                        effect="ken-burns-out"
                        progress={stillProgress}
                        width={HERO_VISUAL_WIDTH}
                        height={HERO_VISUAL_HEIGHT}
                        borderRadius={0}
                        overlay={sceneVisual.overlay ?? "gradient-bottom"}
                      />
                    </PremiumFramedMedia>
                  ) : (
                    <CinematicImage
                      src={sceneVisual.images[1]}
                      effect="ken-burns-out"
                      progress={stillProgress}
                      width={HERO_VISUAL_WIDTH}
                      height={HERO_VISUAL_HEIGHT}
                      borderRadius={24}
                      overlay={sceneVisual.overlay ?? "gradient-bottom"}
                    />
                  )}
                </div>
              </div>
            </div>
          ) : dentalVideoClips ? (
            <DentalVideoClip
              clips={dentalVideoClips}
              width={HERO_VISUAL_WIDTH}
              height={HERO_VISUAL_HEIGHT}
              borderRadius={24}
              accentColor={COLORS.healthyGreen}
              progress={visualProgress}
            />
          ) : hasBeforeAfter ? (
            /* Before/After comparison: best visual — always preferred when
               either patient photos or stock photos are available */
            <BeforeAfterComparison
              beforePhotoUrl={
                resolvedBeforeUrl.startsWith("http")
                  ? resolvedBeforeUrl
                  : staticFile(resolvedBeforeUrl)
              }
              afterPhotoUrl={
                resolvedAfterUrl.startsWith("http")
                  ? resolvedAfterUrl
                  : staticFile(resolvedAfterUrl)
              }
              progress={beforeAfterProgress}
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
                <OutcomeVisual progress={visualProgress} />
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
                background: "#f8f9fa",
                borderRadius: 24,
                border: "1px solid #e5e7eb",
                padding: 30,
                overflow: "visible",
              }}
            >
              <OutcomeVisual progress={visualProgress} />
            </div>
          )}
        </div>
      </div>

    </AbsoluteFill>
  );
};
