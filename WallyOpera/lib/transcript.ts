// Timed script for the live consultation demo.
// All timestamps in seconds. Total runtime ~182s.

export type Line = {
  t: number;
  speaker: "dr" | "pt";
  text: string;
};

export type InsightEvent =
  | { t: number; kind: "goal"; text: string; note?: string }
  | { t: number; kind: "concern"; text: string; note?: string }
  | { t: number; kind: "objection"; text: string; note: string; severity: "high" | "medium" }
  | { t: number; kind: "signal"; text: string; strength: "strong" | "moderate" }
  | { t: number; kind: "emotion"; state: string; tone: "positive" | "neutral" | "caution" }
  | { t: number; kind: "talkingPoint"; text: string; note?: string }
  | { t: number; kind: "visual"; title: string; video: string; note: string }
  | { t: number; kind: "financing"; title: string; detail: string }
  | { t: number; kind: "case"; title: string; detail: string; video: string };

export const DURATION = 184;

export const lines: Line[] = [
  { t: 0, speaker: "dr", text: "Sarah! Great to meet you. I read through your notes — I hear there's a wedding coming up?" },
  { t: 5, speaker: "pt", text: "Yes! My sister's, next June. I'm the maid of honor, so… lots of photos." },
  { t: 11, speaker: "dr", text: "Perfect timing to talk, then. Tell me what's been bothering you about your smile." },
  { t: 15, speaker: "pt", text: "Mostly my bottom front teeth. They've gotten so crowded over the last few years. It's harder to floss, and I feel like it's getting worse." },
  { t: 24, speaker: "dr", text: "That's really common in your thirties — teeth keep drifting. We took your scan earlier; let me show you what's actually happening." },
  { t: 32, speaker: "pt", text: "Wow, okay. Yeah… that's exactly what I see in the mirror." },
  { t: 36, speaker: "dr", text: "The good news is this is very treatable. Based on your scan, you're a strong candidate for Invisalign." },
  { t: 42, speaker: "pt", text: "That's what I was hoping. Honestly, I can't do metal braces — I'm in front of clients every week." },
  { t: 49, speaker: "dr", text: "Completely understood. These are clear aligners — most people won't notice them even up close. Here's what they look like on." },
  { t: 58, speaker: "pt", text: "Oh, that's much better than I expected. You really can't see them." },
  { t: 63, speaker: "dr", text: "Right. Now — for crowding like yours, treatment usually runs ten to twelve months." },
  { t: 69, speaker: "pt", text: "So if I started soon… that would be done before the wedding?" },
  { t: 74, speaker: "dr", text: "If we start within the next six weeks, you'd finish around April or May. A comfortable buffer before June." },
  { t: 82, speaker: "pt", text: "Okay. And… what does something like this cost? My dentist thought around four thousand?" },
  { t: 89, speaker: "dr", text: "Comprehensive treatment here is fifty-eight hundred. But before that number scares you — with your Delta Dental benefit and our payment plans, most patients pay around one eighty-nine a month." },
  { t: 100, speaker: "pt", text: "Oh — monthly, that's… actually manageable. I expected worse, honestly." },
  { t: 106, speaker: "dr", text: "And that includes everything — every aligner, refinements if we need them, and your retainers at the end." },
  { t: 113, speaker: "pt", text: "Refinements?" },
  { t: 116, speaker: "dr", text: "About forty percent of cases need a few extra aligners at the end to perfect the result. Those are included, not extra." },
  { t: 124, speaker: "pt", text: "Good to know. Um — I'd want to talk it over with my husband before signing anything." },
  { t: 130, speaker: "dr", text: "Of course. We'll send you a full recap tonight — your scan, the plan, timeline, and payment options — so Mark can see exactly what we talked about." },
  { t: 139, speaker: "pt", text: "That would be really helpful. He's going to ask about all the numbers anyway." },
  { t: 144, speaker: "dr", text: "One more thing — I want to show you a case similar to yours. Thirty-four years old, same crowding pattern, finished in eleven months." },
  { t: 152, speaker: "pt", text: "Oh wow — her before looks just like my scan. That's amazing." },
  { t: 157, speaker: "dr", text: "That could be you by the wedding. If you're comfortable, let's get your records appointment booked so the six-week window stays open." },
  { t: 166, speaker: "pt", text: "Yeah… let's do it. I'll book the records appointment, and I'll talk to Mark this weekend." },
  { t: 173, speaker: "dr", text: "Perfect — Maya will get you set up on the way out. You're going to look fantastic in those photos, Sarah." },
  { t: 179, speaker: "pt", text: "Thank you, Dr. Park. This was so much less scary than I expected." },
];

export const events: InsightEvent[] = [
  { t: 7, kind: "goal", text: "Straight smile before sister's wedding — June 2027", note: "Hard deadline, 11 months out" },
  { t: 8, kind: "emotion", state: "Engaged", tone: "positive" },
  { t: 9, kind: "talkingPoint", text: "Anchor treatment length to the June wedding date", note: "Matches pre-consult strategy" },
  { t: 18, kind: "concern", text: "Lower anterior crowding, worsening over ~3 years" },
  { t: 20, kind: "concern", text: "Flossing difficulty — functional, not just cosmetic" },
  { t: 21, kind: "emotion", state: "Concerned", tone: "caution" },
  { t: 26, kind: "visual", title: "Crowding progression animation", video: "/videos/invisalignproblem.mp4", note: "Show why drifting continues untreated" },
  { t: 27, kind: "goal", text: "Resolve lower crowding — functional and aesthetic" },
  { t: 45, kind: "objection", text: "Cannot wear visible braces at work", note: "Confirms intake flag — client-facing role", severity: "high" },
  { t: 46, kind: "talkingPoint", text: "Show aligners on teeth now — don't describe, demonstrate" },
  { t: 51, kind: "visual", title: "Aligners on teeth — close up", video: "/videos/invisalignonteeth.mp4", note: "Visibility objection counter" },
  { t: 60, kind: "signal", text: "Visibility objection resolved on visual proof", strength: "moderate" },
  { t: 61, kind: "emotion", state: "Reassured", tone: "positive" },
  { t: 71, kind: "signal", text: "Doing timeline math against the wedding — projecting ownership", strength: "strong" },
  { t: 76, kind: "talkingPoint", text: "Commit to the 6-week start window explicitly" },
  { t: 84, kind: "objection", text: "Cost anchored at ~$4,000 by referring dentist", note: "Quote is $5,800 — frame the gap before it lands", severity: "high" },
  { t: 85, kind: "emotion", state: "Anxious", tone: "caution" },
  { t: 91, kind: "financing", title: "Lead with monthly payment", detail: "$189/mo · 24 months · $500 down, after $1,500 Delta Dental lifetime ortho benefit" },
  { t: 102, kind: "signal", text: "“Actually manageable” — financing frame accepted", strength: "strong" },
  { t: 103, kind: "emotion", state: "Relieved", tone: "positive" },
  { t: 115, kind: "concern", text: "New concept for patient: refinements — explain simply" },
  { t: 127, kind: "objection", text: "Wants spouse (Mark) involved before committing", note: "Predicted pre-consult · equip, don't resist", severity: "medium" },
  { t: 132, kind: "talkingPoint", text: "Offer the shareable recap for Mark tonight" },
  { t: 141, kind: "signal", text: "Accepted the recap — invites spouse into the decision loop", strength: "moderate" },
  { t: 147, kind: "case", title: "Case match: F, 34 — moderate lower crowding", video: "/videos/bracesoutcome.mp4", detail: "Finished in 11 months with 29 aligners · similar arch form" },
  { t: 154, kind: "signal", text: "Strong reaction to matched before/after case", strength: "strong" },
  { t: 155, kind: "emotion", state: "Excited", tone: "positive" },
  { t: 168, kind: "signal", text: "Committed to records appointment — verbal yes", strength: "strong" },
];

export function fmtTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}
