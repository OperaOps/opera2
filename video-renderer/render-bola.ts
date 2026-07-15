/**
 * render-bola.ts — renders the three Bola periodontics flagship videos.
 *
 * Same pipeline as every patient video (renderPatientVideo → FlagshipVideo),
 * with preset scripts so the narration carries each synthetic patient's
 * story exactly. Renders locally (OPERA_FORCE_LOCAL_RENDER=1) because the
 * perio clips are not in the deployed Lambda serve bundle.
 *
 * Usage:
 *   cd video-renderer
 *   OPERA_FORCE_LOCAL_RENDER=1 ELEVENLABS_API_KEY=... npx tsx render-bola.ts
 */

import { promises as fs } from "fs";
import path from "path";
import { renderPatientVideo } from "./src/lib/render-pipeline";

const est = (narration: string) =>
  Math.max(4, (narration.trim().split(/\s+/).length / 155) * 60 + 1);

const scene = (narration: string, heading: string, bullets?: string[]) => ({
  narration,
  durationSeconds: est(narration),
  heading,
  ...(bullets ? { bullets } : {}),
});

function preset(scenes: Record<string, unknown>): Record<string, unknown> {
  return {
    videoType: "dental",
    title: "Your treatment, step by step",
    scenes,
    totalDurationSeconds: 110,
    disclaimer: "This video is educational and does not replace advice from your care team.",
  };
}

const JOBS = [
  {
    outName: "bola-maria-srp.mp4",
    patientName: "Maria",
    treatment: "perio_srp",
    presetScript: preset({
      intro: scene(
        "Hi Maria — Dr. Bola and the team prepared this short walkthrough of your deep cleaning, so you can see exactly what next week looks like.",
        "A message from Dr. Bola"
      ),
      problem: scene(
        "Your gums have been bleeding when you brush because tartar has settled below the gumline, and the gum around it is inflamed — especially on your lower left.",
        "What We Found",
        ["Gums inflamed around the lower left", "Bleeding when you brush", "Tartar hiding below the gumline"]
      ),
      deepDive: scene(
        "At your exam we measured the small pockets around each tooth. Most were healthy twos and threes — but a few spots came back as fours and fives.",
        "Your Pocket Numbers",
        ["Healthy spots measure twos and threes", "A few fours and fives on the lower left", "Deeper pockets need a deeper clean"]
      ),
      treatment: scene(
        "Dana, your hygienist, uses a gentle ultrasonic tip that washes the buildup away with tiny vibrations and warm water. You'll be comfortably numb the entire time.",
        "The Deep Cleaning",
        ["Gentle ultrasonic tip", "Buildup washed away with water", "Comfortably numb throughout"]
      ),
      journey: scene(
        "Then she fine-tunes by hand, tooth by tooth, smoothing each root below the gumline so your gums have something clean and healthy to reattach to.",
        "Tooth by Tooth",
        ["Fine hand instruments", "Every surface left smooth", "Roots planed below the gumline"]
      ),
      whatToExpect: scene(
        "We'll do your left side first, then the right about a week later. Expect a little tenderness for a day or two — warm salt-water rinses help.",
        "What to Expect",
        ["Two easy visits — left, then right", "A little tenderness for a day or two", "Warm salt-water rinses help"]
      ),
      outcome: scene(
        "Over the next few weeks those pockets tighten back up and the bleeding fades. This is the goal, Maria — calm, healthy gums again.",
        "Where This Is Headed",
        ["Pockets tighten back up", "Bleeding fades within weeks", "Healthy gums at your recheck"]
      ),
      cta: scene(
        "Dana and Dr. Bola will see you next week — and if anything feels unclear before then, just call the front desk. We've got you.",
        "See You Next Week"
      ),
    }),
  },
  {
    outName: "bola-david-laser.mp4",
    patientName: "David",
    treatment: "perio_laser",
    presetScript: preset({
      intro: scene(
        "Hi David — I know the word surgery had you worried, so Dr. Bola made you this. Here's exactly how your laser treatment works — no scalpel anywhere.",
        "A message from Dr. Bola"
      ),
      problem: scene(
        "Around a few of your teeth, infection sits deep in the gum pockets — deeper than any regular cleaning can reach, and too important to leave alone.",
        "Why We're Treating This",
        ["Infection deep in the gum pockets", "Too deep for a regular cleaning", "Left alone, it costs bone"]
      ),
      deepDive: scene(
        "A laser fiber thinner than a hair slips gently between tooth and gum and clears out only the infected tissue — the healthy gum is left completely alone.",
        "The Laser, Up Close",
        ["A fiber thinner than a hair", "Clears only infected tissue", "Healthy gum left untouched"]
      ),
      treatment: scene(
        "Next, the tartar clinging to your roots is washed away with a gentle ultrasonic tip, leaving every surface under the gum clean and smooth.",
        "Cleaning the Roots",
        ["Ultrasonic tip washes tartar away", "Root surfaces left smooth", "Comfortable and quick"]
      ),
      journey: scene(
        "Then a second pass of the laser warms the area and seals it — this is why there's so little bleeding or swelling afterward.",
        "Sealing It In",
        ["A second, gentler laser pass", "Warms and seals the pocket", "Minimal bleeding and swelling"]
      ),
      whatToExpect: scene(
        "That seal works like a tiny internal band-aid while your body heals. No stitches, mild soreness at most — most patients are back to normal the next day.",
        "What to Expect",
        ["No stitches to remove", "Mild soreness, a day or so", "Back to normal the next day"]
      ),
      outcome: scene(
        "Underneath, new tissue rebuilds right away, maturing into firm, healthy pink gum — and the teeth the infection was threatening stay yours.",
        "Where This Is Headed",
        ["New tissue rebuilds underneath", "Firm, healthy pink gum", "Your natural teeth, protected"]
      ),
      cta: scene(
        "So no, David — no scalpels, and nothing keeping you off the field with your grandkids. Dr. Bola will see you Thursday.",
        "See You Thursday"
      ),
    }),
  },
  {
    outName: "bola-susan-pocket-reduction.mp4",
    patientName: "Susan",
    treatment: "pocket_reduction",
    presetScript: preset({
      intro: scene(
        "Hi Susan — Dr. Bola put this together so you can see your surgery start to finish, and exactly why it's the right next step.",
        "A message from Dr. Bola"
      ),
      problem: scene(
        "The pockets around your back molars stayed deep after your deep cleaning — too deep to keep clean from the outside, and that puts the bone at risk.",
        "Why Surgery Now",
        ["Back molar pockets stayed deep", "Deep cleaning alone wasn't enough", "Bone support is at stake"]
      ),
      deepDive: scene(
        "So Dr. Bola gently folds the gum back — just enough to see everything — giving direct access to the roots that have been out of reach.",
        "Reaching Everything",
        ["Gum gently folded back", "Full view of the roots", "Nothing left hidden"]
      ),
      treatment: scene(
        "With everything visible, every trace of tartar and infected tissue comes off the roots — a level of clean we simply can't get any other way.",
        "The Clean-Out",
        ["Every trace of tartar removed", "Infected tissue cleared", "A clean nothing else matches"]
      ),
      journey: scene(
        "Where the infection wore the bone uneven, it's smoothed into a healthy shape — so when the gum comes back, the pocket is shallow.",
        "Reshaping the Foundation",
        ["Uneven bone gently smoothed", "A healthy shape to heal against", "Pockets made shallow"]
      ),
      whatToExpect: scene(
        "The gum is settled snugly back and closed with a few tiny stitches — they come out in about a week, and soft foods carry you through the first days.",
        "What to Expect",
        ["A few tiny stitches", "Out in about a week", "Soft foods the first few days"]
      ),
      outcome: scene(
        "Two weeks from now you're back in the garden — and these molars finally sit on a healthy, cleanable foundation.",
        "Where This Is Headed",
        ["A healthy foundation for your molars", "Easy to keep clean at home", "Back in the garden in two weeks"]
      ),
      cta: scene(
        "Dr. Bola's team will check on you at every step, Susan. Any questions before your visit, just call — we're here.",
        "We're With You"
      ),
    }),
  },
];

async function main() {
  for (const job of JOBS) {
    console.log(`\n=== Rendering ${job.outName} ===`);
    const result = await renderPatientVideo(
      {
        patientName: job.patientName,
        doctorName: "Bola",
        clinicName: "Bola Periodontics",
        category: "dental",
        diagnosis: "gum_disease",
        treatment: job.treatment,
        mode: "premium",
        presetScript: job.presetScript,
      },
      (step, progress) => {
        process.stdout.write(`\r  [${Math.round(progress * 100)}%] ${step}          `);
      }
    );
    const dest = path.join("out", job.outName);
    await fs.copyFile(result.videoPath, dest);
    console.log(`\n  -> ${dest} (${result.durationSeconds.toFixed(1)}s)`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
