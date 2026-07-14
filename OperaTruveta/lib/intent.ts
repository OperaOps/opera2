/**
 * Opera Intent — the layer before the first yes.
 *
 * Data for the third flagship: the decision window between a recommendation
 * and the patient's action (or silent inaction). Synthetic patient, real
 * mechanism — this is the instrumented version of what Opera already runs
 * in production dentistry.
 */

export interface IntentBeat {
  id: string;
  day: number;
  headline: string;
  /** What the patient actually does — the behavioral signal. */
  patientDoes: string;
  /** Optional raw telemetry line, rendered mono. */
  telemetry?: string;
  /** What the practice system records. The joke is that it never changes. */
  recordSees: string;
  /** The decision record: intent score + what Opera reads from the signal. */
  intent: number;
  barrier?: { code: string; label: string };
  read: string;
  isIntervention?: boolean;
  isFlip?: boolean;
}

export const mayaWindow: IntentBeat[] = [
  {
    id: 'day0',
    day: 0,
    headline: 'The consult ends with the six words every clinic fears',
    patientDoes:
      '“I need to think about it.” Maya, 34 — recommended an implant for #19, $4,850. She leaves with a folded treatment plan and a personalized plan link on her phone.',
    recordSees: 'status: PENDING',
    intent: 55,
    read:
      'The decision window opens. From this moment the practice system is blind — and this is exactly where 42% of recommended treatment quietly dies.',
  },
  {
    id: 'day1',
    day: 1,
    headline: 'She opens it at 9:40pm',
    patientDoes:
      'Watches her condition explained in plain words. Rewinds the bone-loss section — twice.',
    telemetry: 'open · 9:41pm · problem section 2× · surgery section rewatched',
    recordSees: 'status: PENDING',
    intent: 62,
    read:
      'Understanding is forming — and so is anxiety. Rewatching the surgical section is not curiosity; it is a question she hasn’t asked anyone yet.',
  },
  {
    id: 'day2',
    day: 2,
    headline: 'She stops at the fee',
    patientDoes:
      'Reaches the investment section. Opens the payment calculator. Tries $150 a month — the plan needs $260. Closes the tab.',
    telemetry: 'calculator: $150/mo attempted · plan requires $260/mo · session ends',
    recordSees: 'status: PENDING',
    intent: 41,
    barrier: { code: 'F1', label: 'Financing shock' },
    read:
      'She just told the practice exactly what she can afford — with her fingers, not her mouth. No system on earth recorded it. Opera did.',
  },
  {
    id: 'day4',
    day: 4,
    headline: 'A second device, 9:15pm',
    patientDoes:
      'The link opens on a new device and goes straight to the fee section. Someone else is reading.',
    telemetry: 'new device · direct to investment section · 4 min dwell',
    recordSees: 'status: PENDING',
    intent: 44,
    barrier: { code: 'D2', label: 'Shared decision — partner reviewing' },
    read:
      'Maya is not deciding alone. Every follow-up script the clinic owns is written for one person. The actual decision unit is two.',
  },
  {
    id: 'day6',
    day: 6,
    headline: 'Silence',
    patientDoes: 'Nothing. No opens for 48 hours.',
    recordSees: 'status: PENDING',
    intent: 33,
    read:
      'Silence has a shape. Engaged-then-stopped-at-the-fee is recoverable this week. Never-opened is a different code entirely. The record sees both as the same word: pending.',
  },
  {
    id: 'day7',
    day: 7,
    headline: 'The intervention — one tap for the coordinator',
    patientDoes:
      'Maya receives a short follow-up from her clinic: the fee restructured at $210/mo, framed for two readers, with a pre-qualified financing option she can open herself.',
    telemetry: 'queued action: partner-framed fee walkthrough + soft-pull financing',
    recordSees: 'status: PENDING',
    intent: 48,
    isIntervention: true,
    read:
      'Not a reminder. A barrier-matched counter-move, sent at the moment the window was closing — the coordinator tapped once. Nobody guessed.',
  },
  {
    id: 'day8',
    day: 8,
    headline: 'The calculator again — this time it works',
    patientDoes:
      'Both devices open the new plan. The calculator lands on $210 a month. The financing pre-qualification gets tapped.',
    telemetry: 'devices: 2 · calculator: $210/mo accepted · financing: pre-qualified',
    recordSees: 'status: PENDING',
    intent: 74,
    read: 'F1 is resolving in real time. The barrier wasn’t the treatment. It was $50 a month and a conversation at home.',
  },
  {
    id: 'day9',
    day: 9,
    headline: 'Maya books',
    patientDoes: 'She schedules from inside the plan. Tuesday, 8:30am.',
    recordSees: 'status: SCHEDULED ✓',
    intent: 91,
    isFlip: true,
    read:
      'The window closes with a ground-truth label from the practice system: started. What stalled, what was sent, what worked — one complete, outcome-labeled decision record.',
  },
];

export interface QueueCase {
  id: string;
  initials: string;
  caseLabel: string;
  value: string;
  intent: number;
  trend: 'down' | 'flat' | 'up';
  barrier?: { code: string; label: string };
  action: string;
  onTrack?: boolean;
}

export const mondayQueue: QueueCase[] = [
  {
    id: 'q1',
    initials: 'M.C.',
    caseLabel: 'Implant · #19',
    value: '$4,850',
    intent: 33,
    trend: 'down',
    barrier: { code: 'F1', label: 'Financing shock · partner reviewing' },
    action: 'Send partner-framed fee walkthrough with $210/mo option',
  },
  {
    id: 'q2',
    initials: 'J.R.',
    caseLabel: 'Invisalign · full',
    value: '$5,900',
    intent: 38,
    trend: 'down',
    barrier: { code: 'C2', label: 'Comparing providers' },
    action: 'Doctor call today — she is deciding this week, not this month',
  },
  {
    id: 'q3',
    initials: 'S.W.',
    caseLabel: 'Oral surgery',
    value: '$8,200',
    intent: 22,
    trend: 'down',
    barrier: { code: 'T1', label: 'Anxiety — rewatched procedure 3×' },
    action: 'Offer the sedation-options walkthrough, not a price sheet',
  },
  {
    id: 'q4',
    initials: 'A.K.',
    caseLabel: 'Crown · #30',
    value: '$1,450',
    intent: 46,
    trend: 'flat',
    barrier: { code: 'U1', label: 'Doubts it’s necessary' },
    action: 'Send “what waiting costs” — hers, not a brochure',
  },
  {
    id: 'q5',
    initials: 'D.P.',
    caseLabel: 'Implant · #14',
    value: '$4,200',
    intent: 71,
    trend: 'up',
    action: 'Nothing. On track — silence is a feature.',
    onTrack: true,
  },
];

export const queueSummary = {
  recoverable: '$20,400',
  actions: 4,
  staffMinutes: '~11 minutes',
};

/** The denominator: what every clinical dataset is conditioned on. */
export const denominatorFunnel = {
  recommended: 1000,
  started: 580,
  invisible: 420,
};

export interface BarrierShare {
  code: string;
  label: string;
  pct: number;
  playbook: string;
}

export const nonStartReasons: BarrierShare[] = [
  {
    code: 'F1',
    label: 'Cost & financing',
    pct: 34,
    playbook: 'restructured plans + point-of-hesitation financing',
  },
  {
    code: 'T1',
    label: 'Fear of the procedure',
    pct: 22,
    playbook: 'sedation & experience walkthroughs, sent to the fear — not the inbox',
  },
  {
    code: 'U1',
    label: 'Doubts it’s necessary',
    pct: 18,
    playbook: '“what waiting costs” — personalized consequence, not urgency copy',
  },
  {
    code: 'C2',
    label: 'Seeking another opinion',
    pct: 14,
    playbook: 'doctor call at the comparison moment, not after it',
  },
  {
    code: 'L1',
    label: 'Logistics & life',
    pct: 12,
    playbook: 'scheduling that bends — early slots, one-visit options',
  },
];

/** The same structure, translated out of dentistry. */
export const medicalTranslations = [
  { from: 'Implant recommended, never scheduled', to: 'Positive FIT test, colonoscopy never booked' },
  { from: 'Aligner case pending', to: 'GLP-1 prescribed, never filled' },
  { from: 'Oral surgery deferred', to: 'Cardiac rehab referred, never enrolled' },
  { from: 'Crown postponed', to: 'Specialty referral, never completed' },
];

/** How a deployment actually works — the anti-integration pitch. */
export interface DeployStep {
  step: string;
  title: string;
  detail: string;
  mono?: string;
}

export const deploySteps: DeployStep[] = [
  {
    step: '01',
    title: 'A worklist, not an integration',
    detail:
      'The site sends a weekly flat file — who was recommended what. In dentistry it flows straight from the practice system. No EHR project, no new software for staff, live in days.',
    mono: 'sftp://weekly.csv → {patient, recommendation, provider, date}',
  },
  {
    step: '02',
    title: 'Delivery patients already accept',
    detail:
      'A text from their own provider with a personalized explanation of their care. No app, no portal login, no survey. The channel already exists — Opera rides it.',
    mono: 'sms → plan link · provider-branded · literacy-matched',
  },
  {
    step: '03',
    title: 'The page is the sensor',
    detail:
      'Sections watched and rewatched, where the session died, calculator behavior, a second device at 9pm, the question typed at midnight, silence itself. Behavioral — plus at most one tap.',
    mono: 'events: {case_id, section, dwell, replay, device, question}',
  },
  {
    step: '04',
    title: 'The queue closes the loop',
    detail:
      'Signals become a ranked, barrier-coded worklist for the coordinator or navigator — each case with the reason and a drafted counter-move. Outcomes return from the practice system on their own.',
    mono: 'queue → action → outcome label: started / didn’t',
  },
  {
    step: '05',
    title: 'Tokenized decision records out',
    detail:
      'Consented and de-identified, each window becomes one record — joinable to the clinical spine by privacy-preserving token, without identity ever moving.',
    mono: '{token, recommendation, trajectory, barrier_codes[], outcome}',
  },
];

/** Truveta's actual customer segments — and what this layer gives each one. */
export interface DataConsumer {
  audience: string;
  question: string;
  detail: string;
  example: string;
}

export const dataConsumers: DataConsumer[] = [
  {
    audience: 'Life sciences & pharma',
    question: 'Why do eligible patients never start — and why do they leave?',
    detail:
      'Non-initiation and discontinuation reason codes attached to real prescribing events: launch intelligence, RWE denominators, and trial design — including why eligible patients decline consent, per site.',
    example: 'e.g. GLP-1 never-fills, reason-coded by segment, weeks after launch',
  },
  {
    audience: 'Health systems',
    question: 'Which recommended care is dying in the window — and what recovers it?',
    detail:
      'Completion lift the member system feels operationally (screenings, referrals, procedures), plus barrier mix and communication benchmarks across sites.',
    example: 'e.g. colonoscopy completion after positive FIT, by barrier and by site',
  },
  {
    audience: 'Public health & government',
    question: 'Where is hesitancy actually coming from, right now?',
    detail:
      'Screening and vaccination barriers measured behaviorally at the point of care — near-real-time surveillance instead of lagging self-report surveys, stratifiable for equity work.',
    example: 'e.g. why FIT follow-up fails by county — cost vs. fear vs. logistics',
  },
  {
    audience: 'Academic institutions',
    question: 'How do patients actually decide?',
    detail:
      'The first large-n behavioral corpus for shared decision-making, health-literacy, and disparities research — outcome-labeled decision windows instead of 40-person interview studies.',
    example: 'e.g. validation studies that make Barrier Codes a citable standard',
  },
];

export const dentalProof = [
  { value: '130,000+', label: 'instrumented patient experiences delivered' },
  { value: '$2.5M+', label: 'previously unscheduled treatment recovered' },
  { value: '25', label: 'paying clinics, zero apps installed' },
  { value: '100%', label: 'outcome-labeled — ground truth from the practice system' },
];
