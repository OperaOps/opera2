import React from "react";
import { Composition } from "remotion";
import { FlagshipVideo, calculateFlagshipMetadata } from "./compositions/FlagshipVideo";
import {
  buildFlagshipSegments,
  flagshipTotalSeconds,
  FLAGSHIP_FPS,
  type FlagshipVideoProps,
} from "./lib/flagship";
import { VIDEO_WIDTH, VIDEO_HEIGHT } from "./lib/schema";

/**
 * FlagshipVideo is THE patient-video composition — navy intro card, journey
 * timeline, full-bleed treatment clips with a synced subtitle line, warm-close
 * freeze, per-segment narration and the opera-bgm bed. The old text-panel
 * compositions (PatientVideo / PremiumOrthoVideo) are retired.
 */

// Studio preview props — a crown walkthrough without narration audio
// (segment lengths fall back to spoken-pace estimates).
const demoProps: FlagshipVideoProps = {
  patientName: "Sarah",
  doctorName: "Martinez",
  clinicName: "Bright Smiles Dental",
  segments: buildFlagshipSegments({
    patientName: "Sarah",
    doctorName: "Martinez",
    clinicName: "Bright Smiles Dental",
    category: "dental",
    treatment: "crown",
    script: {
      videoType: "dental",
      title: "Your Crown, Step by Step",
      scenes: {
        intro: {
          narration:
            "Hi Sarah, Dr. Martinez and the team at Bright Smiles Dental prepared this walkthrough just for you.",
          durationSeconds: 8,
          heading: "Welcome",
        },
        problem: {
          narration:
            "During your visit we found a small cavity on your upper right molar. It's early, and treating it now keeps the tooth strong before anything can spread deeper.",
          durationSeconds: 12,
          heading: "What We Found",
          bullets: [],
        },
        treatment: {
          narration:
            "We'll place a porcelain crown — the tooth is gently prepared, a precise digital impression is taken, and your custom crown is fitted to match your smile exactly.",
          durationSeconds: 13,
          heading: "Your Crown",
          bullets: [],
        },
        outcome: {
          narration:
            "When it's done, the tooth looks and feels completely natural — protected for years to come.",
          durationSeconds: 8,
          heading: "The Result",
          bullets: [],
        },
        cta: {
          narration:
            "We're here for you every step of the way, Sarah. We look forward to seeing you.",
          durationSeconds: 6,
          heading: "Next Steps",
        },
      },
      totalDurationSeconds: 47,
      disclaimer: "",
    },
  }),
};

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="FlagshipVideo"
      component={FlagshipVideo}
      durationInFrames={Math.ceil(
        (flagshipTotalSeconds(demoProps.segments) + 0.5) * FLAGSHIP_FPS
      )}
      fps={FLAGSHIP_FPS}
      width={VIDEO_WIDTH}
      height={VIDEO_HEIGHT}
      defaultProps={demoProps}
      calculateMetadata={calculateFlagshipMetadata}
    />
  );
};
