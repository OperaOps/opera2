import React from "react";
import { Sequence, Audio, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import type { PatientVideoProps } from "../lib/schema";
import { DEFAULT_FPS } from "../lib/schema";
import { secondsToFrames } from "../lib/timing";
import { IntroScene } from "../scenes/IntroScene";
import { ProblemScene } from "../scenes/ProblemScene";
import { TreatmentScene } from "../scenes/TreatmentScene";
import { OutcomeScene } from "../scenes/OutcomeScene";
import { CTAScene } from "../scenes/CTAScene";
import { Captions } from "../components/Captions";
import { ProgressDots } from "../components/ProgressDots";

export const PatientVideo: React.FC<PatientVideoProps> = (props) => {
  const frame = useCurrentFrame();
  const { durationInFrames: compositionDuration, fps } = useVideoConfig();

  const {
    patientName,
    doctorName,
    clinicName,
    category,
    diagnosis,
    treatment,
    scenes,
    captions,
    audioUrl,
    clinicBrand,
  } = props;

  const accentColor = clinicBrand.primaryColor;

  // Calculate frame offsets for each scene
  const introDuration = secondsToFrames(scenes.intro.durationSeconds);
  const problemDuration = secondsToFrames(scenes.problem.durationSeconds);
  const treatmentDuration = secondsToFrames(scenes.treatment.durationSeconds);
  const outcomeDuration = secondsToFrames(scenes.outcome.durationSeconds);
  const baseCTADuration = secondsToFrames(scenes.cta.durationSeconds);

  const introStart = 0;
  const problemStart = introDuration;
  const treatmentStart = problemStart + problemDuration;
  const outcomeStart = treatmentStart + treatmentDuration;
  const ctaStart = outcomeStart + outcomeDuration;

  // Cap CTA extension to at most 2 extra seconds — prevents long dead air at end
  const maxCTAExtension = baseCTADuration + secondsToFrames(2, fps);
  const ctaDuration = Math.min(maxCTAExtension, Math.max(baseCTADuration, compositionDuration - ctaStart));

  // Determine active scene for progress dots
  let activeScene = 0;
  if (frame >= ctaStart) activeScene = 4;
  else if (frame >= outcomeStart) activeScene = 3;
  else if (frame >= treatmentStart) activeScene = 2;
  else if (frame >= problemStart) activeScene = 1;

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* Audio track */}
      {audioUrl && (
        <Audio
          src={
            audioUrl.startsWith("http")
              ? audioUrl
              : staticFile(audioUrl)
          }
        />
      )}

      {/* Scene 1: Intro */}
      <Sequence from={introStart} durationInFrames={introDuration}>
        <IntroScene
          clinicName={clinicName}
          doctorName={doctorName}
          patientName={patientName}
          accentColor={accentColor}
        />
      </Sequence>

      {/* Scene 2: Problem / Diagnosis */}
      <Sequence from={problemStart} durationInFrames={problemDuration}>
        <ProblemScene
          diagnosis={diagnosis}
          treatment={treatment}
          heading={scenes.problem.heading ?? "What We Found"}
          bullets={scenes.problem.bullets}
          clinicName={clinicName}
          doctorName={doctorName}
          durationFrames={problemDuration}
          accentColor={accentColor}
        />
      </Sequence>

      {/* Scene 3: Treatment */}
      <Sequence from={treatmentStart} durationInFrames={treatmentDuration}>
        <TreatmentScene
          treatment={treatment}
          heading={scenes.treatment.heading ?? "Your Treatment Plan"}
          bullets={scenes.treatment.bullets}
          clinicName={clinicName}
          doctorName={doctorName}
          durationFrames={treatmentDuration}
          accentColor={accentColor}
        />
      </Sequence>

      {/* Scene 4: Outcome */}
      <Sequence from={outcomeStart} durationInFrames={outcomeDuration}>
        <OutcomeScene
          treatment={treatment}
          heading={scenes.outcome.heading ?? "Your Expected Results"}
          bullets={scenes.outcome.bullets}
          clinicName={clinicName}
          doctorName={doctorName}
          durationFrames={outcomeDuration}
          accentColor={accentColor}
        />
      </Sequence>

      {/* Scene 5: CTA */}
      <Sequence from={ctaStart} durationInFrames={ctaDuration}>
        <CTAScene
          clinicName={clinicName}
          doctorName={doctorName}
          heading={scenes.cta.heading}
          accentColor={accentColor}
          durationFrames={ctaDuration}
        />
      </Sequence>

      {/* Captions overlay (persistent across all scenes) */}
      {captions.length > 0 && <Captions captions={captions} />}

      {/* Progress dots (visible after intro) */}
      {frame >= problemStart && (
        <ProgressDots activeScene={activeScene} accentColor={accentColor} />
      )}
    </div>
  );
};
