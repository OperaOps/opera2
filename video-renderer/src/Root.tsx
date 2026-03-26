import React from "react";
import { Composition } from "remotion";
import { PatientVideo } from "./compositions/PatientVideo";
import { PremiumOrthoVideo } from "./compositions/PremiumOrthoVideo";
import type { PatientVideoProps, PremiumPatientVideoProps } from "./lib/schema";
import { DEFAULT_FPS, VIDEO_WIDTH, VIDEO_HEIGHT } from "./lib/schema";
import { totalDurationFramesWithBuffer, secondsToFrames } from "./lib/timing";

const demoScenes = {
  intro: {
    id: "intro",
    narration:
      "Hi Sarah, this is a message from Dr. Martinez at Bright Smiles Dental. We wanted to take a moment to walk you through what we discussed during your recent visit.",
    durationSeconds: 8,
    heading: "Welcome",
  },
  problem: {
    id: "problem",
    narration:
      "During your examination, we found a small cavity forming on your upper right molar. While it's still in its early stages, we want to address it now before it has a chance to grow deeper into the tooth and potentially cause more discomfort down the road.",
    durationSeconds: 18,
    heading: "What We Found",
    bullets: [
      "Small cavity detected on upper right molar",
      "Currently in the early stages",
      "Best to treat now before it progresses",
      "Left untreated, it could reach the nerve",
    ],
  },
  treatment: {
    id: "treatment",
    narration:
      "We recommend placing a porcelain crown to protect and restore the tooth. The process is straightforward and comfortable. First, we gently prepare the tooth. Then we take a precise digital impression. Finally, your custom crown is placed, and your tooth is fully protected.",
    durationSeconds: 22,
    heading: "Porcelain Crown",
    bullets: [
      "Gentle preparation of the tooth surface",
      "Precise digital impression for a perfect fit",
      "Custom crown crafted to match your smile",
      "Final placement — strong and natural-looking",
    ],
  },
  outcome: {
    id: "outcome",
    narration:
      "After your crown is placed, you can expect a fully restored tooth that looks and feels completely natural. Your crown will protect the tooth for years to come, giving you confidence in your smile and comfort while eating.",
    durationSeconds: 15,
    heading: "A Stronger, Healthier Smile",
    bullets: [
      "Natural look and feel",
      "Long-lasting protection",
      "Full confidence in your smile",
    ],
  },
  cta: {
    id: "cta",
    narration:
      "We're here to help you every step of the way. When you're ready, just give us a call or book online. We look forward to seeing you, Sarah.",
    durationSeconds: 8,
    heading: "We're Here for You",
  },
};

const demoCaptions = [
  { text: "Hi Sarah, this is a message from Dr. Martinez", startFrame: 0, endFrame: secondsToFrames(3) },
  { text: "at Bright Smiles Dental.", startFrame: secondsToFrames(3), endFrame: secondsToFrames(5) },
  { text: "We wanted to walk you through your recent visit.", startFrame: secondsToFrames(5), endFrame: secondsToFrames(8) },
  { text: "During your examination, we found a small cavity", startFrame: secondsToFrames(8), endFrame: secondsToFrames(12) },
  { text: "on your upper right molar.", startFrame: secondsToFrames(12), endFrame: secondsToFrames(14) },
  { text: "It's still in its early stages,", startFrame: secondsToFrames(14), endFrame: secondsToFrames(16.5) },
  { text: "and we want to address it now before it grows.", startFrame: secondsToFrames(16.5), endFrame: secondsToFrames(20) },
  { text: "Left untreated, it could reach the nerve.", startFrame: secondsToFrames(20), endFrame: secondsToFrames(23) },
  { text: "We recommend a porcelain crown", startFrame: secondsToFrames(26), endFrame: secondsToFrames(29) },
  { text: "to protect and restore the tooth.", startFrame: secondsToFrames(29), endFrame: secondsToFrames(32) },
  { text: "First, we gently prepare the tooth.", startFrame: secondsToFrames(32), endFrame: secondsToFrames(35) },
  { text: "Then we take a precise digital impression.", startFrame: secondsToFrames(35), endFrame: secondsToFrames(38) },
  { text: "Your custom crown is crafted to match your smile.", startFrame: secondsToFrames(38), endFrame: secondsToFrames(42) },
  { text: "Finally, it's placed — strong and natural-looking.", startFrame: secondsToFrames(42), endFrame: secondsToFrames(46) },
  { text: "After your crown is placed,", startFrame: secondsToFrames(48), endFrame: secondsToFrames(50) },
  { text: "you'll have a fully restored, natural-feeling tooth.", startFrame: secondsToFrames(50), endFrame: secondsToFrames(54) },
  { text: "Long-lasting protection for years to come.", startFrame: secondsToFrames(54), endFrame: secondsToFrames(57) },
  { text: "Full confidence in your smile.", startFrame: secondsToFrames(57), endFrame: secondsToFrames(60) },
  { text: "We're here for you every step of the way.", startFrame: secondsToFrames(63), endFrame: secondsToFrames(66) },
  { text: "We look forward to seeing you, Sarah.", startFrame: secondsToFrames(66), endFrame: secondsToFrames(70) },
];

const defaultProps: PatientVideoProps = {
  patientName: "Sarah",
  doctorName: "Martinez",
  clinicName: "Bright Smiles Dental",
  category: "dental",
  diagnosis: "cavity",
  treatment: "crown",
  scenes: demoScenes,
  captions: demoCaptions,
  clinicBrand: {
    primaryColor: "#7c3aed",
    accentColor: "#a855f7",
  },
};

const sceneDurations = [
  demoScenes.intro.durationSeconds,
  demoScenes.problem.durationSeconds,
  demoScenes.treatment.durationSeconds,
  demoScenes.outcome.durationSeconds,
  demoScenes.cta.durationSeconds,
];

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="PatientVideo"
        component={PatientVideo}
        durationInFrames={totalDurationFramesWithBuffer(sceneDurations)}
        fps={DEFAULT_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={defaultProps}
        schema={undefined}
      />
      {/* Additional compositions for testing specific scenes */}
      <Composition
        id="PatientVideo-Ortho"
        component={PatientVideo}
        durationInFrames={totalDurationFramesWithBuffer([8, 20, 25, 15, 8])}
        fps={DEFAULT_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={{
          ...defaultProps,
          patientName: "James",
          doctorName: "Zitterkopf",
          clinicName: "Zitterkopf Orthodontics",
          category: "orthodontic",
          diagnosis: "crowding",
          treatment: "invisalign",
          scenes: {
            intro: {
              id: "intro",
              narration: "Hi James, this is a message from Dr. Zitterkopf at Zitterkopf Orthodontics.",
              durationSeconds: 8,
              heading: "Welcome",
            },
            problem: {
              id: "problem",
              narration: "During your consultation, we noticed that your teeth have some crowding, particularly in the lower front area. This is actually one of the most common orthodontic concerns we see, and the great news is it's very treatable.",
              durationSeconds: 20,
              heading: "Understanding Your Smile",
              bullets: [
                "Crowding detected in lower front teeth",
                "Very common and highly treatable",
                "Can affect bite alignment over time",
                "Best addressed sooner for optimal results",
              ],
            },
            treatment: {
              id: "treatment",
              narration: "We recommend Invisalign clear aligners to gradually and comfortably straighten your teeth. You'll wear a series of custom-made, nearly invisible aligners that gently shift your teeth into their ideal position. Most patients complete treatment in twelve to eighteen months.",
              durationSeconds: 25,
              heading: "Invisalign Clear Aligners",
              bullets: [
                "Custom-made, nearly invisible aligners",
                "Removable for eating and brushing",
                "Gentle, gradual tooth movement",
                "Treatment typically 12-18 months",
              ],
            },
            outcome: {
              id: "outcome",
              narration: "Imagine your smile twelve months from now — perfectly aligned, confident, and healthy. Straight teeth are also easier to clean, which means better long-term oral health.",
              durationSeconds: 15,
              heading: "Your Future Smile",
              bullets: [
                "Beautifully aligned teeth",
                "Improved oral health",
                "Lasting confidence",
              ],
            },
            cta: {
              id: "cta",
              narration: "We're excited to start this journey with you, James. Reach out when you're ready to take the next step.",
              durationSeconds: 8,
              heading: "Let's Get Started",
            },
          },
          captions: [],
        }}
      />
      {/* Premium 8-scene orthodontic composition */}
      <Composition
        id="PremiumOrthoVideo"
        component={PremiumOrthoVideo}
        durationInFrames={totalDurationFramesWithBuffer([9, 18, 25, 21, 22, 14, 16, 9])}
        fps={DEFAULT_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={{
          patientName: "James",
          doctorName: "Zitterkopf",
          clinicName: "Zitterkopf Orthodontics",
          diagnosis: "crowding",
          treatment: "invisalign",
          accentColor: "#7c3aed",
          captions: [],
          scenes: {
            intro: {
              narration: "Hi James, Dr. Zitterkopf and the team at Zitterkopf Orthodontics prepared this detailed overview just for you. Let's walk through everything together.",
              durationSeconds: 9,
              heading: "Your Personal Overview",
            },
            problem: {
              narration: "During your consultation, we identified crowding in your dental arch. You may have noticed that some of your teeth overlap or twist, making certain areas nearly impossible to clean properly. Over time, this misalignment puts uneven stress on your teeth and jaw.",
              durationSeconds: 18,
              heading: "Understanding Your Smile",
              bullets: [
                "Crowding detected during your examination",
                "Certain areas are difficult to clean effectively",
                "Uneven stress can cause premature enamel wear",
              ],
            },
            deepDive: {
              narration: "Here's why this matters, James. Your teeth are anchored in bone by a network of tiny ligaments. When teeth are crowded, the forces from chewing don't distribute evenly — think of it like a bridge where some supports carry far more weight than others. This uneven pressure can gradually affect the bone around those overloaded teeth.",
              durationSeconds: 25,
              heading: "Why This Matters",
              bullets: [
                "Uneven bite forces stress specific teeth and bone",
                "Overlapping areas harbor bacteria and inflammation",
                "Early treatment preserves long-term dental health",
              ],
            },
            treatment: {
              narration: "For your treatment, Dr. Zitterkopf recommends Invisalign clear aligners. These are custom-engineered using advanced 3D digital planning — each tray is precisely calibrated to apply gentle, controlled force that guides your teeth into their ideal positions. Small tooth-colored attachments may be placed for enhanced control.",
              durationSeconds: 21,
              heading: "Your Invisalign Plan",
              bullets: [
                "Custom 3D-planned trays for precise tooth movement",
                "Tooth-colored attachments for enhanced control",
                "Sequential progression targeting specific teeth",
                "Gentle, continuous force for comfortable treatment",
              ],
            },
            journey: {
              narration: "In the first few weeks, James, you'll feel some gentle pressure as your teeth begin to respond. By month two or three, you'll start noticing visible changes in your alignment. Around the midpoint, the more complex movements begin. In the final months, we focus on perfecting the details.",
              durationSeconds: 22,
              heading: "Your Treatment Timeline",
              bullets: [
                "Weeks 1-3: Initial adaptation and first movements",
                "Months 2-4: Visible alignment improvements",
                "Final phase: Bite perfection and detail refinement",
              ],
            },
            outcome: {
              narration: "When treatment is complete, you'll have a beautifully aligned smile that's not just cosmetically stunning — it's healthier. Properly aligned teeth distribute bite forces evenly and are far easier to keep clean.",
              durationSeconds: 14,
              heading: "Your Transformation",
              bullets: [
                "Beautifully aligned, confident smile",
                "Even bite force distribution",
                "Easier cleaning and better long-term oral health",
              ],
            },
            whatToExpect: {
              narration: "After treatment, you'll transition to retainers — these are essential for maintaining your results while the bone fully stabilizes. Typically full-time for the first few months, then nighttime wear. Dr. Zitterkopf's team will monitor everything.",
              durationSeconds: 16,
              heading: "Maintaining Your Results",
              bullets: [
                "Retainers lock in your new smile as bone stabilizes",
                "Full-time wear initially, then nighttime only",
                "Regular follow-ups to ensure lasting results",
              ],
            },
            cta: {
              narration: "We're genuinely excited to start this journey with you, James. Reach out to us at Zitterkopf Orthodontics whenever you're ready.",
              durationSeconds: 9,
              heading: "Let's Get Started",
            },
          },
          beforePhotoUrl: "stock/smile-closeup.jpg",
          afterPhotoUrl: "stock/smile-after-2.jpg",
        } as PremiumPatientVideoProps}
        schema={undefined}
      />
    </>
  );
};
