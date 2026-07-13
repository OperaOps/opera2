/**
 * Opera Loop — seeded data for the second flagship experience.
 *
 * The product thesis, in one line: healthcare records what happened;
 * it never learns WHY. The Loop keeps one living plan per patient between
 * visits, catches the moment a journey deviates (from structured events,
 * not surveys), captures the patient's one-tap reason, closes it with one
 * routed action — and, de-identified at scale, turns stated-reason-at-
 * deviation into a new variable for real-world evidence.
 *
 * Everything below is SYNTHETIC. Sarah is the same synthetic patient as
 * the chronic-care education demo — the Loop is what happens to her
 * BETWEEN the moments the Studio explains.
 */

export type BeatTone = 'calm' | 'quiet' | 'alert' | 'good';

export interface LoopBeat {
  id: string;
  /** Weeks since the journey began. */
  week: number;
  /** Short timeline label. */
  label: string;
  /** One-line story headline for the beat. */
  headline: string;
  /** The structured event that triggered this beat (null = silence detected). */
  eventIn: { code: string; detail: string } | null;
  /** What Sarah sees on her phone (null = the Loop deliberately stays silent). */
  patientSees: {
    kind: 'sms' | 'plan';
    text: string;
    clip?: string;
    clipCaption?: string;
  } | null;
  /** What the Loop did / why this beat matters — the demo voiceover line. */
  loop: string;
  tone: BeatTone;
  /** Marks the interactive deviation beat. */
  isCatch?: boolean;
}

export const sarahLoop: LoopBeat[] = [
  {
    id: 'begin',
    week: 0,
    label: 'Visit',
    headline: 'The plan begins',
    eventIn: { code: 'MedicationRequest · new', detail: 'metformin 500 mg · A1C recheck in 12 weeks' },
    patientSees: {
      kind: 'sms',
      text: 'Hi Sarah — everything from today’s visit, in plain words. Your plan lives at this link and stays current: opera.care/s/sarah',
    },
    loop:
      'One link, sent through the texts she already gets. It is her plan, kept alive — not a portal she has to remember to check.',
    tone: 'calm',
  },
  {
    id: 'quiet',
    week: 1,
    label: 'First fill',
    headline: 'A quiet confirmation',
    eventIn: { code: 'MedicationDispense · fill #1', detail: 'picked up 3 days after the visit' },
    patientSees: null,
    loop:
      'The journey is on track, so the Loop sends nothing. Silence is a feature — the product only speaks when it changes what happens next.',
    tone: 'quiet',
  },
  {
    id: 'change',
    week: 3,
    label: 'Dose change',
    headline: 'The plan changes — and says why',
    eventIn: { code: 'MedicationRequest · amended', detail: 'step-up to 1000 mg, per plan' },
    patientSees: {
      kind: 'plan',
      text: 'Your dose steps up today — that was always the plan. Forty seconds on why, from your care team.',
      clip: '/medical-assets/medication/taking-pill-with-water.mp4',
      clipCaption: 'From the reviewed library — not generated per patient',
    },
    loop:
      'Every plan change arrives already translated, with a medically reviewed clip from the Studio library. Scalable because the library is the asset.',
    tone: 'calm',
  },
  {
    id: 'catch',
    week: 6,
    label: 'The catch',
    headline: 'The refill that didn’t happen',
    eventIn: { code: 'Deviation · fill gap', detail: 'refill due 5 days ago · no dispense event' },
    patientSees: {
      kind: 'sms',
      text: 'Sarah — your refill hasn’t gone through. One tap tells your care team why, and they’ll take it from there.',
    },
    loop:
      'This is the moment every other system misses. Claims data would record this months later as “discontinued — reason unknown.”',
    tone: 'alert',
    isCatch: true,
  },
  {
    id: 'resolve',
    week: 7,
    label: 'Resolved',
    headline: 'Back on track in six days',
    eventIn: { code: 'MedicationDispense · fill #2', detail: 'metformin XR — switched after nurse callback' },
    patientSees: {
      kind: 'plan',
      text: 'New version of the same medicine — much gentler on your stomach. Same plan, same goal.',
    },
    loop:
      'Deviation → reason → one routed task → resolved in six days. The physician was never interrupted; the journey never broke.',
    tone: 'good',
  },
  {
    id: 'lab',
    week: 12,
    label: 'Lab due',
    headline: 'The lab, without the dread',
    eventIn: { code: 'ServiceRequest · due', detail: 'A1C recheck · Thursday 7:40am (post-shift)' },
    patientSees: {
      kind: 'plan',
      text: 'Your 3-month check is Thursday. What A1C actually measures — in plain words, in under a minute.',
      clip: '/medical-assets/diabetes-a1c/a1c-three-month-average.mp4',
      clipCaption: 'Reviewed clip · timed after her night shift',
    },
    loop:
      'The reminder and the understanding arrive in the same breath — scheduled around a night-shift life the EHR knows nothing about.',
    tone: 'calm',
  },
  {
    id: 'result',
    week: 14,
    label: 'Result',
    headline: 'Results, translated — never interpreted',
    eventIn: { code: 'Observation · resulted', detail: 'care-team note approved for release' },
    patientSees: {
      kind: 'plan',
      text: 'Your care team reviewed your result: moving in the right direction. Here’s what they want you to know, in their words.',
    },
    loop:
      'The hard line holds: Opera restates the care team’s approved note. It never reads a lab on its own. Education, not interpretation.',
    tone: 'good',
  },
  {
    id: 'visit',
    week: 16,
    label: 'Follow-up',
    headline: 'The visit that starts ahead',
    eventIn: { code: 'Encounter · follow-up', detail: 'the journey, attached to the chart' },
    patientSees: {
      kind: 'plan',
      text: 'Before Thursday: your whole 16 weeks in one place — what changed, what you asked, what got fixed.',
    },
    loop:
      'The appointment starts from a shared story instead of “so… how did it go?” — and the story is structured data, not prose.',
    tone: 'good',
  },
];

/** The one-tap reason options shown at the catch beat. */
export const catchReasons = [
  { id: 'sides', label: 'The side effects are rough', route: 'Nurse callback · same week' },
  { id: 'cost', label: 'It costs too much', route: 'Pharmacy tech · copay program' },
  { id: 'fine', label: 'I feel fine without it', route: '“Why it still matters” moment' },
  { id: 'access', label: 'I can’t get to the pharmacy', route: '90-day mail fill · care navigator' },
] as const;

/** What actually resolves Sarah's catch in the seeded story. */
export const sarahReasonId = 'sides';
export const sarahResolution = {
  task: 'Callback task → endocrine nurse',
  reason: 'Reason: GI side effects',
  outcome: 'Switched to metformin XR · fill confirmed day 6',
};

/* ------------------------------------------------------------------ evidence */

/** Six-month persistence curve — the view claims data already has. */
export const persistenceCurve = [100, 84, 71, 63, 58, 54, 52];

/** What the Reason Layer adds underneath the same curve. */
export const reasonBreakdown = [
  { label: 'Side effects', pct: 38, playbook: 'Formulation switch · take-with-food guidance' },
  { label: 'Cost', pct: 22, playbook: 'Copay programs · generic alternatives' },
  { label: 'Felt fine', pct: 18, playbook: 'A “why it still matters” moment' },
  { label: 'Access', pct: 14, playbook: '90-day mail fills · transport support' },
  { label: 'Other', pct: 8, playbook: 'Routed to a human, always' },
];
