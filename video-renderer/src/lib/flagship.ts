/**
 * flagship.ts — the Flagship patient-video format (the new standard).
 *
 * Mirrors the Opera×Truveta / veneers flagship look: a deep-navy intro card,
 * a "your journey" timeline card, then full-bleed treatment clips with one
 * clean synced subtitle line, ending on a warm-close freeze frame. Narration
 * is per-segment ElevenLabs audio; a subtle instrumental bed sits underneath.
 *
 * This module is pure data/mapping — no Remotion imports — so the render
 * pipeline (Node) and the composition (browser) can both use it.
 */

import type { DentalSceneType, VideoClipInfo } from "./dental-video-assets";
import { getDentalVideoClips } from "./dental-video-assets";
import type { GeneratedScript, PremiumGeneratedScript } from "./script-generator";

// ---------------------------------------------------------------------------
// Palette — clean white presentation with teal accents (black ink text).
// ---------------------------------------------------------------------------
export const FLAGSHIP_BG = "#ffffff";
export const FLAGSHIP_INK = "#0b1220"; // near-black headings/text
export const FLAGSHIP_MUTED = "#475569"; // slate body text
export const FLAGSHIP_TEAL = "#14b8a6"; // accent (dots, lines, glows)
export const FLAGSHIP_TEAL_INK = "#0d9488"; // teal used AS text on white
/** @deprecated kept for compatibility — the pres background is white now. */
export const FLAGSHIP_NAVY = "#0a1220";
export const FLAGSHIP_GRAY = FLAGSHIP_MUTED;

/** Flagship renders at 24fps — clips read smoothly (old text-panel format used 15). */
export const FLAGSHIP_FPS = 24;

// ---------------------------------------------------------------------------
// Segment types
// ---------------------------------------------------------------------------

export interface FlagshipSegmentBase {
  /** Spoken line — also the source of the on-screen subtitle chunks. */
  narration: string;
  /** Segment length in seconds (sized to the narration audio by the pipeline). */
  durationSeconds: number;
  /** staticFile() name of this segment's narration mp3 (bundle/public). */
  audioFile?: string;
  /** Absolute https URL for the narration mp3 (Lambda presigned). Wins over audioFile. */
  audioUrl?: string;
}

export interface FlagshipIntroCardSegment extends FlagshipSegmentBase {
  kind: "intro-card";
  eyebrow: string;
  title: string;
  subtitle: string;
}

export interface FlagshipTimelineCardSegment extends FlagshipSegmentBase {
  kind: "timeline-card";
  heading: string;
  steps: [string, string, string, string];
}

export interface FlagshipClipSegment extends FlagshipSegmentBase {
  kind: "clip";
  clip: VideoClipInfo;
  /** Freeze the clip's last frame once it ends (used for the warm close). */
  freeze?: boolean;
  /** Right-panel presentation content (from the generated script). */
  heading?: string;
  bullets?: string[];
  /** 1-based step number shown in the right panel's eyebrow. */
  stepNumber?: number;
}

export type FlagshipSegment =
  | FlagshipIntroCardSegment
  | FlagshipTimelineCardSegment
  | FlagshipClipSegment;

export interface FlagshipVideoProps {
  patientName: string;
  doctorName: string;
  clinicName: string;
  accentColor?: string;
  /** Instrumental bed; public/ path (staticFile) or https. Defaults to audio/opera-bgm.m4a. */
  bgmUrl?: string;
  segments: FlagshipSegment[];
  [key: string]: unknown;
}

// ---------------------------------------------------------------------------
// Subtitle chunking — one short line at a time, same as the Truveta player.
// ---------------------------------------------------------------------------

export function chunkCaption(text: string, max = 44): string[] {
  const words = (text || "").replace(/\s+/g, " ").trim().split(" ").filter(Boolean);
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    const next = cur ? `${cur} ${w}` : w;
    if (next.length > max && cur) {
      lines.push(cur);
      cur = w;
    } else {
      cur = next;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

/** Spoken-pace fallback when no audio file exists (~2.3 words/sec + a beat). */
export function estimateNarrationSeconds(text: string): number {
  const words = (text || "").trim().split(/\s+/).filter(Boolean).length;
  return Math.min(30, Math.max(4, words / 2.3 + 1.2));
}

// ---------------------------------------------------------------------------
// Journey timeline steps
// ---------------------------------------------------------------------------

function timelineSteps(
  category: "dental" | "orthodontic" | "financial",
  treatment: string
): [string, string, string, string] {
  if (category === "financial") {
    return ["Review plan", "Your options", "Coverage & costs", "Next steps"];
  }
  if (category === "orthodontic") {
    const start = /invisalign|aligner/i.test(treatment) ? "Aligners on" : "Braces on";
    return ["Consult & scan", "Custom plan", start, "Your reveal"];
  }
  return ["Exam & plan", "Gentle prep", "Treatment day", "Your new smile"];
}

function timelineNarration(steps: [string, string, string, string]): string {
  const [a, b, c, d] = steps.map((s) => s.toLowerCase());
  return `Here's the whole journey at a glance — ${a}, ${b}, then ${c}, and finally ${d}. Simple, comfortable, and step by step.`;
}

// ---------------------------------------------------------------------------
// Beat builder — maps a generated script onto flagship segments.
// ---------------------------------------------------------------------------

export interface FlagshipBeatInput {
  patientName: string;
  doctorName: string;
  clinicName: string;
  category: "dental" | "orthodontic" | "financial";
  treatment: string;
  script?: GeneratedScript;
  premiumScript?: PremiumGeneratedScript;
}

/** Last-resort clip when a treatment has no footage at all (e.g. financial). */
const FALLBACK_CLIP: VideoClipInfo = {
  src: "dental-videos/shared/smile-result.mp4",
  durationSeconds: 9,
};

/** Picks a clip for a narration beat: role pool first, then unused treatment clips, then any. */
function makeClipPicker(treatment: string) {
  const pool = (role: DentalSceneType): VideoClipInfo[] =>
    getDentalVideoClips(treatment, role) ?? [];
  const roles: DentalSceneType[] = [
    "problem",
    "treatment",
    "deepDive",
    "journey",
    "whatToExpect",
    "outcome",
  ];
  const all: VideoClipInfo[] = [];
  const seen = new Set<string>();
  for (const role of roles) {
    for (const c of pool(role)) {
      if (!seen.has(c.src)) {
        seen.add(c.src);
        all.push(c);
      }
    }
  }
  const outcomeSrcs = new Set(pool("outcome").map((c) => c.src));
  const used = new Set<string>();
  /**
   * Returns a FRESH (never-shown) clip for the beat, or undefined when the
   * treatment has run out of unique footage — the caller then merges that
   * beat's narration into the previous slide instead of repeating a clip.
   * Outcome footage is the payoff and is never spent on a mid-story beat.
   */
  return (role: DentalSceneType): VideoClipInfo | undefined => {
    const fresh = (list: VideoClipInfo[]) => list.find((c) => !used.has(c.src));
    const isMidBeat = role !== "outcome";
    const nonOutcome = (list: VideoClipInfo[]) =>
      isMidBeat ? list.filter((c) => !outcomeSrcs.has(c.src)) : list;
    const pick =
      fresh(nonOutcome(pool(role))) ??
      fresh(nonOutcome(pool("treatment"))) ??
      fresh(nonOutcome(all)) ??
      (isMidBeat ? undefined : (fresh(pool(role)) ?? pool(role)[0])) ??
      (used.size === 0 ? FALLBACK_CLIP : undefined);
    if (pick) used.add(pick.src);
    return pick;
  };
}

/**
 * Builds the ordered flagship segments (narration set; durations are estimates
 * until the pipeline replaces them with real per-segment audio durations).
 */
export function buildFlagshipSegments(input: FlagshipBeatInput): FlagshipSegment[] {
  const { patientName, doctorName, clinicName, category, treatment } = input;
  const first = patientName.trim().split(/\s+/)[0] || patientName;
  const steps = timelineSteps(category, treatment);
  const pickClip = makeClipPicker(treatment);

  const title =
    category === "financial" ? "Your plan, step by step" : "Your new smile, step by step";

  const seg = (s: FlagshipSegment): FlagshipSegment => ({
    ...s,
    durationSeconds: estimateNarrationSeconds(s.narration),
  });

  const cards: FlagshipSegment[] = [];
  const clips: FlagshipSegment[] = [];

  const introNarration = input.premiumScript?.scenes.intro.narration ??
    input.script?.scenes.intro.narration ??
    `Hi ${first}, Dr. ${doctorName} and the team at ${clinicName} prepared this walkthrough just for you.`;

  cards.push(
    seg({
      kind: "intro-card",
      eyebrow: `FOR ${first.toUpperCase()}  ·  ${clinicName.toUpperCase()}`,
      title,
      subtitle: `A short, personal walkthrough from Dr. ${doctorName} and the ${clinicName} team`,
      narration: introNarration,
      durationSeconds: 0,
    }),
    seg({
      kind: "timeline-card",
      heading: "YOUR JOURNEY",
      steps,
      narration: timelineNarration(steps),
      durationSeconds: 0,
    })
  );

  type Beat = {
    role: DentalSceneType;
    narration: string;
    heading?: string;
    bullets?: string[];
    freeze?: boolean;
  };

  // A beat with no FRESH clip never repeats footage — its narration merges into
  // the previous slide instead (the slide simply runs longer). So a treatment
  // with 4 unique clips renders 4 clean slides, not 6 with duplicates.
  const pushBeats = (beats: Beat[]) => {
    for (const b of beats) {
      const clip = pickClip(b.role);
      const last = clips[clips.length - 1] as FlagshipClipSegment | undefined;
      if (!clip && last) {
        last.narration = `${last.narration} ${b.narration}`;
        last.durationSeconds = estimateNarrationSeconds(last.narration);
        if (b.freeze) last.freeze = true;
        continue;
      }
      clips.push(
        seg({
          kind: "clip",
          clip: clip ?? FALLBACK_CLIP,
          narration: b.narration,
          heading: b.heading,
          bullets: b.bullets,
          stepNumber: clips.length + 1,
          freeze: b.freeze,
          durationSeconds: 0,
        })
      );
    }
  };

  if (input.premiumScript) {
    const s = input.premiumScript.scenes;
    pushBeats([
      { role: "problem", narration: s.problem.narration, heading: s.problem.heading, bullets: s.problem.bullets },
      { role: "deepDive", narration: s.deepDive.narration, heading: s.deepDive.heading, bullets: s.deepDive.bullets },
      { role: "treatment", narration: s.treatment.narration, heading: s.treatment.heading, bullets: s.treatment.bullets },
      { role: "journey", narration: s.journey.narration, heading: s.journey.heading, bullets: s.journey.bullets },
      { role: "whatToExpect", narration: s.whatToExpect.narration, heading: s.whatToExpect.heading, bullets: s.whatToExpect.bullets },
      {
        role: "outcome",
        narration: `${s.outcome.narration} ${s.cta.narration}`,
        heading: s.outcome.heading,
        bullets: s.outcome.bullets,
        freeze: true,
      },
    ]);
  } else if (input.script) {
    const s = input.script.scenes;
    pushBeats([
      { role: "problem", narration: s.problem.narration, heading: s.problem.heading, bullets: s.problem.bullets },
      { role: "treatment", narration: s.treatment.narration, heading: s.treatment.heading, bullets: s.treatment.bullets },
      {
        role: "outcome",
        narration: `${s.outcome.narration} ${s.cta.narration}`,
        heading: s.outcome.heading,
        bullets: s.outcome.bullets,
        freeze: true,
      },
    ]);
  }

  return [...cards, ...clips];
}

/** Total flagship duration in seconds (sum of segment durations). */
export function flagshipTotalSeconds(segments: FlagshipSegment[]): number {
  return segments.reduce((a, s) => a + s.durationSeconds, 0);
}
