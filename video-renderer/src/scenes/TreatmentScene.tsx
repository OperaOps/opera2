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

const treatmentComponents: Record<string, React.FC<{ progress: number }>> = {
  crown: CrownVisual,
  filling: FillingVisual,
  braces: BracesVisual,
  invisalign: InvisalignVisual,
  implant: ImplantVisual,
  root_canal: RootCanalVisual,
  whitening: WhiteningVisual,
  veneers: VeneersVisual,
  extraction: RootCanalVisual, // both involve working inside/removing tooth structure
  bridge: CrownVisual, // both are prosthetic caps/structures
  gum_treatment: FillingVisual, // reasonable generic for gum work
  ceramic_braces: BracesVisual, // they ARE braces
  expander: BracesVisual, // orthodontic appliance
  jaw_surgery: BracesVisual, // orthodontic context
  lingual_braces: BracesVisual, // they ARE braces
  dentures: CrownVisual, // prosthetic
  retainer: InvisalignVisual, // clear removable appliance
};

export const TreatmentScene: React.FC<{
  treatment: TreatmentType;
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

  const TreatmentVisual = treatmentComponents[treatment];

  // Look up cinematic image config for this treatment
  const sceneVisual = getSceneVisualConfig(treatment, "treatment");
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

  // Step indicator animation
  const stepCount = bullets.length || 3;
  const activeStep = Math.min(
    Math.floor(visualProgress * stepCount),
    stepCount - 1
  );

  return (
    <AbsoluteFill>
      <Background accentColor={accentColor} variant="cool" />

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
              overlay={sceneVisual.overlay ?? "dark"}
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
            opacity: contentOpacity,
            paddingLeft: 40,
          }}
        >
          {/* Treatment badge */}
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
              {/* Step indicators */}
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
      </div>
    </AbsoluteFill>
  );
};
