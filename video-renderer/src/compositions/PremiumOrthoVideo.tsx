import React from "react";
import {
  Sequence,
  Audio,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  AbsoluteFill,
} from "remotion";
import { secondsToFrames } from "../lib/timing";
import type { DiagnosisType, TreatmentType, PremiumPatientVideoProps } from "../lib/schema";
import { IntroScene } from "../scenes/IntroScene";
import { ProblemScene } from "../scenes/ProblemScene";
import { DeepDiveScene } from "../scenes/DeepDiveScene";
import { TreatmentScene } from "../scenes/TreatmentScene";
import { JourneyScene } from "../scenes/JourneyScene";
import { OutcomeScene } from "../scenes/OutcomeScene";
import { WhatToExpectScene } from "../scenes/WhatToExpectScene";
import { CTAScene } from "../scenes/CTAScene";
import { Captions } from "../components/Captions";
import { ProgressDots } from "../components/ProgressDots";
import { CinematicBackdrop } from "../components/CinematicBackdrop";
import { SceneEnterFade } from "../components/SceneEnterFade";
import { premiumBgmVolume } from "../lib/premium-bgm";
import { DEFAULT_BGM_PUBLIC_PATH } from "../lib/video-bgm";
/** Uses the shared PremiumPatientVideoProps from schema.ts */

const PREMIUM_SCENE_LABELS = [
  "Welcome",
  "Diagnosis",
  "Deep Dive",
  "Treatment",
  "Journey",
  "Results",
  "Aftercare",
  "Next Steps",
];

export const PremiumOrthoVideo: React.FC<PremiumPatientVideoProps> = (props) => {
  const frame = useCurrentFrame();
  const { durationInFrames: compositionDuration, fps } = useVideoConfig();

  const {
    patientName,
    doctorName,
    clinicName,
    diagnosis,
    treatment,
    scenes,
    captions = [],
    audioUrl,
    bgmUrl,
    accentColor = "#7c3aed",
    beforePhotoUrl,
    afterPhotoUrl,
  } = props;

  // Calculate frame durations and offsets for each scene
  const introDuration = secondsToFrames(scenes.intro.durationSeconds);
  const problemDuration = secondsToFrames(scenes.problem.durationSeconds);
  const deepDiveDuration = secondsToFrames(scenes.deepDive.durationSeconds);
  const treatmentDuration = secondsToFrames(scenes.treatment.durationSeconds);
  const journeyDuration = secondsToFrames(scenes.journey.durationSeconds);
  const outcomeDuration = secondsToFrames(scenes.outcome.durationSeconds);
  const whatToExpectDuration = secondsToFrames(
    scenes.whatToExpect.durationSeconds
  );
  const baseCTADuration = secondsToFrames(scenes.cta.durationSeconds);

  const introStart = 0;
  const problemStart = introDuration;
  const deepDiveStart = problemStart + problemDuration;
  const treatmentStart = deepDiveStart + deepDiveDuration;
  const journeyStart = treatmentStart + treatmentDuration;
  const outcomeStart = journeyStart + journeyDuration;
  const whatToExpectStart = outcomeStart + outcomeDuration;
  const ctaStart = whatToExpectStart + whatToExpectDuration;

  // CTA extends to fill remaining composition duration — ensures no black frames at end
  const ctaDuration = Math.max(baseCTADuration, compositionDuration - ctaStart);

  // Determine active scene for progress dots
  let activeScene = 0;
  if (frame >= ctaStart) activeScene = 7;
  else if (frame >= whatToExpectStart) activeScene = 6;
  else if (frame >= outcomeStart) activeScene = 5;
  else if (frame >= journeyStart) activeScene = 4;
  else if (frame >= treatmentStart) activeScene = 3;
  else if (frame >= deepDiveStart) activeScene = 2;
  else if (frame >= problemStart) activeScene = 1;

  const whatToExpectEndFrame = whatToExpectStart + whatToExpectDuration;
  const bedPath = bgmUrl ?? DEFAULT_BGM_PUBLIC_PATH;
  const bedSrc = bedPath.startsWith("http") ? bedPath : staticFile(bedPath);
  const bgmVolume = premiumBgmVolume(frame, fps, {
    journeyStartFrame: journeyStart,
    outcomeStartFrame: outcomeStart,
    whatToExpectEndFrame,
    totalFrames: compositionDuration,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#050508" }}>
      <CinematicBackdrop accentColor={accentColor} />

      <AbsoluteFill style={{ zIndex: 1 }}>
      {/* Narration — primary */}
      {audioUrl && (
        <Audio
          src={
            audioUrl.startsWith("http") ? audioUrl : staticFile(audioUrl)
          }
        />
      )}
      {/* Instrumental bed — under voice (see premium-bgm); default public/audio/opera-bgm.m4a */}
      <Audio src={bedSrc} volume={bgmVolume} loop />

      {/* Scene 1: Intro */}
      <Sequence from={introStart} durationInFrames={introDuration}>
        <IntroScene
          clinicName={clinicName}
          doctorName={doctorName}
          patientName={patientName}
          heading={scenes.intro.heading}
          durationFrames={introDuration}
          accentColor={accentColor}
        />
      </Sequence>

      {/* Scene 2: Problem / Diagnosis */}
      <Sequence from={problemStart} durationInFrames={problemDuration}>
        <ProblemScene
          diagnosis={diagnosis as DiagnosisType}
          treatment={treatment as TreatmentType}
          heading={scenes.problem.heading ?? "What We Found"}
          bullets={scenes.problem.bullets}
          clinicName={clinicName}
          doctorName={doctorName}
          durationFrames={problemDuration}
          accentColor={accentColor}
          premiumJourneyStyle
        />
      </Sequence>

      {/* Scene 3: Deep Dive */}
      <Sequence from={deepDiveStart} durationInFrames={deepDiveDuration}>
        <DeepDiveScene
          diagnosis={diagnosis as DiagnosisType}
          treatment={treatment as TreatmentType}
          heading={scenes.deepDive.heading ?? "Understanding Your Condition"}
          bullets={scenes.deepDive.bullets}
          clinicName={clinicName}
          doctorName={doctorName}
          durationFrames={deepDiveDuration}
          accentColor={accentColor}
          premiumJourneyStyle
        />
      </Sequence>

      {/* Scene 4: Treatment */}
      <Sequence from={treatmentStart} durationInFrames={treatmentDuration}>
        <TreatmentScene
          treatment={treatment as TreatmentType}
          heading={scenes.treatment.heading ?? "Your Treatment Plan"}
          bullets={scenes.treatment.bullets}
          clinicName={clinicName}
          doctorName={doctorName}
          durationFrames={treatmentDuration}
          accentColor={accentColor}
          premiumJourneyStyle
        />
      </Sequence>

      {/* Scene 5: Journey */}
      <Sequence from={journeyStart} durationInFrames={journeyDuration}>
        <JourneyScene
          heading={scenes.journey.heading ?? "Your Treatment Journey"}
          bullets={scenes.journey.bullets}
          treatment={treatment}
          clinicName={clinicName}
          doctorName={doctorName}
          durationFrames={journeyDuration}
          accentColor={accentColor}
          premiumJourneyStyle
        />
      </Sequence>

      {/* Scene 6: Outcome */}
      <Sequence from={outcomeStart} durationInFrames={outcomeDuration}>
        <OutcomeScene
          treatment={treatment as TreatmentType}
          heading={scenes.outcome.heading ?? "Your Expected Results"}
          bullets={scenes.outcome.bullets}
          clinicName={clinicName}
          doctorName={doctorName}
          durationFrames={outcomeDuration}
          accentColor={accentColor}
          beforePhotoUrl={beforePhotoUrl}
          afterPhotoUrl={afterPhotoUrl}
          premiumJourneyStyle
        />
      </Sequence>

      {/* Scene 7: What to Expect / Aftercare */}
      <Sequence
        from={whatToExpectStart}
        durationInFrames={whatToExpectDuration}
      >
        <WhatToExpectScene
          treatment={treatment as TreatmentType}
          heading={scenes.whatToExpect.heading ?? "After Treatment"}
          bullets={scenes.whatToExpect.bullets}
          clinicName={clinicName}
          doctorName={doctorName}
          durationFrames={whatToExpectDuration}
          accentColor={accentColor}
          premiumJourneyStyle
        />
      </Sequence>

      {/* Scene 8: CTA */}
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
        <ProgressDots
          activeScene={activeScene}
          totalScenes={8}
          accentColor={accentColor}
          sceneLabels={PREMIUM_SCENE_LABELS}
        />
      )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
