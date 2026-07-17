// Demo data for the embedded product walkthrough and the intent story.
// One coherent cast of patients across specialties, reused everywhere.

export type Signal = "high" | "building" | "stalled" | "at-risk";

export type PlanModule = {
  id: string;
  title: string;
  src: string;
  duration: string;
  specialty: string;
  /** still image module rather than a clip */
  image?: boolean;
};

export type TimelineEvent = {
  time: string;
  text: string;
  kind: "sent" | "watch" | "question" | "share" | "flag" | "action";
};

export type Patient = {
  id: string;
  name: string;
  initials: string;
  age: number;
  treatment: string;
  specialty: string;
  doctor: string;
  signal: Signal;
  engagement: number;
  question: string;
  hesitation: string;
  barrier: string;
  nextAction: string;
  sentiment: string;
  behavior: string;
  plan: string[]; // module ids
  timeline: TimelineEvent[];
};

export const MODULES: PlanModule[] = [
  { id: "crowding-progression", title: "Crowding progression", src: "/videos/bracesproblem.mp4", duration: "0:19", specialty: "Orthodontics" },
  { id: "aligner-fit", title: "Aligner tray seat", src: "/videos/invisaligntray.mp4", duration: "0:14", specialty: "Orthodontics" },
  { id: "aligner-timeline", title: "Tray series, 22 stages", src: "/videos/invisalignseries.mp4", duration: "0:21", specialty: "Orthodontics" },
  { id: "alignment-outcome", title: "Post treatment alignment", src: "/videos/bracesoutcome.mp4", duration: "0:12", specialty: "Orthodontics" },
  { id: "screening-walkthrough", title: "Colon screening walkthrough", src: "/videos/library/colonoscopy-patient-video.mp4", duration: "1:32", specialty: "GI" },
  { id: "scope-camera", title: "The camera, up close", src: "/videos/library/scope-device.mp4", duration: "0:16", specialty: "GI" },
  { id: "acl-anatomy", title: "ACL", src: "/videos/knee-anatomy-acl.mp4", duration: "0:18", specialty: "Orthopedics" },
  { id: "recovery-timeline", title: "Recovery, first 12 weeks", src: "/videos/knee6.mp4", duration: "0:22", specialty: "Orthopedics" },
  { id: "graft-reconstruction", title: "Reconstruction graft", src: "/videos/knee4.mp4", duration: "0:17", specialty: "Orthopedics" },
  { id: "crown-prep", title: "Crown preparation", src: "/videos/crown-step1-treatment.mp4", duration: "0:15", specialty: "Dental" },
  { id: "fracture-progression", title: "Fracture progression", src: "/videos/crownproblem.mp4", duration: "0:13", specialty: "Dental" },
  { id: "implant-placement", title: "Implant placement", src: "/videos/implant-step1-placement.mp4", duration: "0:19", specialty: "Dental" },
  { id: "medication-routine", title: "Medication", src: "/videos/library/medication-routine.mp4", duration: "0:24", specialty: "General Medicine" },
  { id: "colon-tool", title: "Colonoscopy", src: "/videos/library/colonoscope-tip-closeup.mp4", duration: "0:08", specialty: "GI" },
  { id: "lasik-eye", title: "Lasik", src: "/videos/sitepics/sitepic-16.jpeg", duration: "0:12", specialty: "Ophthalmology", image: true },
  { id: "smile-outcome", title: "Smile", src: "/videos/shared-smile-outcome.mp4", duration: "0:11", specialty: "Dental" },
];

export const moduleById = (id: string) => MODULES.find((m) => m.id === id)!;

export const PATIENTS: Patient[] = [
  {
    id: "PT-4821",
    name: "Maya R.",
    initials: "MR",
    age: 26,
    treatment: "Invisalign comprehensive",
    specialty: "Orthodontics",
    doctor: "Dr. Chen",
    signal: "high",
    engagement: 87,
    question: "What happens if I wait 6 months?",
    hesitation: "cost vs urgency unclear",
    barrier: "Financing never came up in the consult",
    nextAction: "TC call about financing, today",
    sentiment: "Positive, price sensitive",
    behavior: "Watched her plan twice, shared it with her mom",
    plan: ["crowding-progression", "aligner-timeline", "alignment-outcome"],
    timeline: [
      { time: "2:10 pm", text: "Consult with Dr. Chen ends, plan assembled", kind: "action" },
      { time: "2:14 pm", text: "Visual plan sent to Maya's phone", kind: "sent" },
      { time: "9:41 pm", text: "Watched her plan at home, full view", kind: "watch" },
      { time: "9:48 pm", text: "Asked: What happens if I wait 6 months?", kind: "question" },
      { time: "9:52 pm", text: "Watched crowding progression twice", kind: "watch" },
      { time: "10:04 pm", text: "Shared the plan with her mom", kind: "share" },
    ],
  },
  {
    id: "PT-5177",
    name: "James T.",
    initials: "JT",
    age: 58,
    treatment: "Colon cancer screening",
    specialty: "GI",
    doctor: "Dr. Okafor",
    signal: "building",
    engagement: 74,
    question: "What actually happens during the screening?",
    hesitation: "procedure anxiety",
    barrier: "Fear of the procedure itself",
    nextAction: "Send sedation explainer",
    sentiment: "Willing, anxious about the procedure",
    behavior: "Watched the walkthrough to the end",
    plan: ["screening-walkthrough", "scope-camera"],
    timeline: [
      { time: "Mon", text: "Screening recommended at annual physical", kind: "action" },
      { time: "Mon", text: "Walkthrough video sent", kind: "sent" },
      { time: "Tue", text: "Watched the walkthrough to the end", kind: "watch" },
      { time: "Tue", text: "Asked: What actually happens during the screening?", kind: "question" },
    ],
  },
  {
    id: "PT-6034",
    name: "Linda P.",
    initials: "LP",
    age: 61,
    treatment: "ACL reconstruction",
    specialty: "Orthopedics",
    doctor: "Dr. Reyes",
    signal: "building",
    engagement: 68,
    question: "How long until I can walk on it?",
    hesitation: "recovery worries",
    barrier: "Unsure she can manage the recovery alone",
    nextAction: "Share the 12 week recovery visual",
    sentiment: "Motivated, worried about recovery",
    behavior: "Rewatched the recovery timeline",
    plan: ["acl-anatomy", "graft-reconstruction", "recovery-timeline"],
    timeline: [
      { time: "Thu", text: "Surgical consult with Dr. Reyes", kind: "action" },
      { time: "Thu", text: "Anatomy and recovery visuals sent", kind: "sent" },
      { time: "Fri", text: "Watched ACL anatomy", kind: "watch" },
      { time: "Sat", text: "Asked: How long until I can walk on it?", kind: "question" },
    ],
  },
  {
    id: "PT-3390",
    name: "Priya S.",
    initials: "PS",
    age: 41,
    treatment: "Crown, tooth 30",
    specialty: "Dental",
    doctor: "Dr. Chen",
    signal: "stalled",
    engagement: 41,
    question: "Why do I need this now? It doesn't hurt.",
    hesitation: "asymptomatic tooth",
    barrier: "Doesn't feel any urgency",
    nextAction: "Re-engage with the fracture progression visual",
    sentiment: "Skeptical, feels no urgency",
    behavior: "Opened the plan, stopped after 20 seconds",
    plan: ["fracture-progression", "crown-prep"],
    timeline: [
      { time: "Day 1", text: "Crown recommended, plan sent", kind: "sent" },
      { time: "Day 2", text: "Opened the plan, stopped after 20 seconds", kind: "watch" },
      { time: "Day 6", text: "Asked: Why do I need this now?", kind: "question" },
    ],
  },
  {
    id: "PT-8862",
    name: "Rosa M.",
    initials: "RM",
    age: 47,
    treatment: "Hypertension care plan",
    specialty: "General Medicine",
    doctor: "Dr. Idris",
    signal: "at-risk",
    engagement: 12,
    question: "",
    hesitation: "disengaged after visit",
    barrier: "Never opened her materials",
    nextAction: "Flag for a personal call",
    sentiment: "Disengaged since the visit",
    behavior: "Never opened her materials",
    plan: ["medication-routine"],
    timeline: [
      { time: "Day 1", text: "Care plan and routine video sent", kind: "sent" },
      { time: "Day 14", text: "Still unopened, flagged at risk", kind: "flag" },
    ],
  },
];

export const patientById = (id: string) => PATIENTS.find((p) => p.id === id)!;

/* Ask Opera: one question per patient, one dental, the rest across
   medicine, each grounded in that patient's own plan with a cited visual. */
export type AskThread = {
  patientId: string;
  question: string;
  answer: string;
  citedModule: string;
  status: "answered" | "review";
};

export const ASK_THREADS: AskThread[] = [
  {
    patientId: "PT-4821",
    question: "What happens if I wait 6 months?",
    answer:
      "For your lower crowding, waiting usually means the rotation on your front teeth continues. Dr. Chen flagged tooth 25 specifically. Your plan stays valid, but treatment time can stretch from 14 to roughly 18 months.",
    citedModule: "crowding-progression",
    status: "answered",
  },
  {
    patientId: "PT-5177",
    question: "What actually happens during the screening?",
    answer:
      "You'll be comfortably sedated the whole time. Dr. Okafor guides a soft camera through the colon and looks for polyps, which can be removed on the spot. The exam itself takes about 30 minutes and most people are home by lunch.",
    citedModule: "screening-walkthrough",
    status: "answered",
  },
  {
    patientId: "PT-6034",
    question: "How long until I can walk on it?",
    answer:
      "Most patients walk with crutches within a week and without them around week four. Your visual covers the full 12 week arc: range of motion first, then strength, then a return to normal walking. Dr. Reyes will progress you at each visit.",
    citedModule: "recovery-timeline",
    status: "answered",
  },
  {
    patientId: "PT-3390",
    question: "Why do I need this now? It doesn't hurt.",
    answer:
      "Your scan shows the crack reaching the dentin layer. Cracks like this deepen toward the nerve even without pain. A crown now protects the tooth before a root canal becomes necessary.",
    citedModule: "fracture-progression",
    status: "review",
  },
  {
    patientId: "PT-4821",
    question: "Will people notice the aligners?",
    answer:
      "Up close, sometimes. In conversation, almost never. The trays are cut to your gumline and polished clear. Your visual shows exactly how they sit on your teeth, so you can judge for yourself.",
    citedModule: "aligner-fit",
    status: "answered",
  },
  {
    patientId: "PT-8862",
    question: "Do I really have to take this every day?",
    answer:
      "Yes, and the routine matters more than the dose. Your video walks through the morning routine Dr. Idris set up for you, and what to do if you miss a day. Consistency is what brings the numbers down.",
    citedModule: "medication-routine",
    status: "answered",
  },
];

export const SIGNAL_LABEL: Record<Signal, string> = {
  high: "High",
  building: "Building",
  stalled: "Stalled",
  "at-risk": "At risk",
};

export const SIGNAL_COLOR: Record<Signal, string> = {
  high: "#15803d",
  building: "#5f7a61",
  stalled: "#b45309",
  "at-risk": "#b91c1c",
};
