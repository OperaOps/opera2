// Shared constants + asset manifest for the getopera.ai redesign concepts.
// Swap CALENDLY_URL once and every concept CTA updates.

export const CALENDLY_URL = "https://calendly.com/opera-ai/demo"; // ← placeholder, swap before launch

export type ClipCategory =
  | "ortho"
  | "restorative"
  | "cosmetic"
  | "perio"
  | "orthopedic"
  | "cardio"
  | "gi"
  | "general";

export type Clip = {
  src: string;
  label: string;
  category: ClipCategory;
  /** short phase tag used for overlays, e.g. "Problem", "Treatment", "Outcome" */
  phase?: "Problem" | "Treatment" | "Outcome" | "Anatomy" | "Device" | "Timeline";
};

// All clips are small (~1–5 MB) H.264 MP4s safe for muted autoplay loops.
// Do NOT reference the large master files (laserperio.mp4, periolaser.mp4,
// pocketreduction.mp4, periodontic1.mov, periodonticlaser1.mov, demo-veneers.mp4).
export const CLIPS: Clip[] = [
  // Orthodontics
  { src: "/videos/bracesproblem.mp4", label: "Crowding — upper arch", category: "ortho", phase: "Problem" },
  { src: "/videos/bracestreatment.mp4", label: "Bracket placement", category: "ortho", phase: "Treatment" },
  { src: "/videos/bracesoutcome.mp4", label: "Post-treatment alignment", category: "ortho", phase: "Outcome" },
  { src: "/videos/bracesdeep-dive.mp4", label: "How braces move teeth", category: "ortho", phase: "Anatomy" },
  { src: "/videos/invisalignproblem.mp4", label: "Spacing — anterior", category: "ortho", phase: "Problem" },
  { src: "/videos/invisaligntray.mp4", label: "Aligner tray seat", category: "ortho", phase: "Device" },
  { src: "/videos/invisalignonteeth.mp4", label: "Aligner on dentition", category: "ortho", phase: "Treatment" },
  { src: "/videos/invisalignseries.mp4", label: "Tray series — 22 stages", category: "ortho", phase: "Timeline" },
  { src: "/videos/invisaligncase.mp4", label: "Aligner case", category: "ortho", phase: "Device" },
  { src: "/videos/expander-narrow.mp4", label: "Narrow palate", category: "ortho", phase: "Problem" },
  { src: "/videos/expander-device.mp4", label: "Palatal expander", category: "ortho", phase: "Device" },
  { src: "/videos/expander-in-place.mp4", label: "Expander seated", category: "ortho", phase: "Treatment" },
  { src: "/videos/expander-wide.mp4", label: "Expansion complete", category: "ortho", phase: "Outcome" },
  { src: "/videos/retainer-hawley.mp4", label: "Hawley retainer", category: "ortho", phase: "Device" },
  { src: "/videos/retainer-on-teeth.mp4", label: "Retention phase", category: "ortho", phase: "Treatment" },
  { src: "/videos/retainer-morning.mp4", label: "Daily wear protocol", category: "ortho", phase: "Timeline" },

  // Restorative
  { src: "/videos/crownproblem.mp4", label: "Fractured molar", category: "restorative", phase: "Problem" },
  { src: "/videos/crown-step1-treatment.mp4", label: "Crown preparation", category: "restorative", phase: "Treatment" },
  { src: "/videos/crown-step2-prep-detail.mp4", label: "Margin detail", category: "restorative", phase: "Treatment" },
  { src: "/videos/crown-outcome.mp4", label: "Ceramic crown seated", category: "restorative", phase: "Outcome" },
  { src: "/videos/bridge-step1-treatment.mp4", label: "Bridge preparation", category: "restorative", phase: "Treatment" },
  { src: "/videos/bridgeunit.mp4", label: "Three-unit bridge", category: "restorative", phase: "Device" },
  { src: "/videos/fillingcavity.mp4", label: "Caries progression", category: "restorative", phase: "Problem" },
  { src: "/videos/filling-step1-treatment.mp4", label: "Decay removal", category: "restorative", phase: "Treatment" },
  { src: "/videos/filling-step2-composite.mp4", label: "Composite placement", category: "restorative", phase: "Treatment" },
  { src: "/videos/fillingcure.mp4", label: "Light cure", category: "restorative", phase: "Treatment" },
  { src: "/videos/rootcanal-problem.mp4", label: "Pulpal inflammation", category: "restorative", phase: "Problem" },
  { src: "/videos/rootcanalnerve.mp4", label: "Canal anatomy", category: "restorative", phase: "Anatomy" },
  { src: "/videos/rootcanal-treatment.mp4", label: "Canal cleaning + seal", category: "restorative", phase: "Treatment" },
  { src: "/videos/extraction-step1-treatment.mp4", label: "Extraction", category: "restorative", phase: "Treatment" },
  { src: "/videos/implant-step1-placement.mp4", label: "Implant placement", category: "restorative", phase: "Treatment" },
  { src: "/videos/implant-step2-abutment.mp4", label: "Abutment + crown", category: "restorative", phase: "Outcome" },

  // Cosmetic
  { src: "/videos/ceramic-comparison.mp4", label: "Ceramic shade match", category: "cosmetic", phase: "Treatment" },
  { src: "/videos/ceramic-smile.mp4", label: "Smile design", category: "cosmetic", phase: "Outcome" },
  { src: "/videos/whitening-step1-treatment.mp4", label: "Whitening application", category: "cosmetic", phase: "Treatment" },
  { src: "/videos/whitening-step2-detail.mp4", label: "Shade lift detail", category: "cosmetic", phase: "Outcome" },
  { src: "/videos/shared-smile-outcome.mp4", label: "Final smile", category: "cosmetic", phase: "Outcome" },
  { src: "/videos/hero-tooth.mp4", label: "Tooth study", category: "cosmetic", phase: "Anatomy" },

  // Periodontics
  { src: "/videos/testing/gum-problem.mp4", label: "Gingival recession", category: "perio", phase: "Problem" },
  { src: "/videos/testing/gum-treatment.mp4", label: "Perio therapy", category: "perio", phase: "Treatment" },

  // Orthopedics (breadth beyond dental)
  { src: "/videos/knee-anatomy-acl.mp4", label: "ACL anatomy", category: "orthopedic", phase: "Anatomy" },
  { src: "/videos/knee2.mp4", label: "Knee — medial view", category: "orthopedic", phase: "Anatomy" },
  { src: "/videos/knee3.mp4", label: "Ligament mechanics", category: "orthopedic", phase: "Anatomy" },
  { src: "/videos/knee4.mp4", label: "Reconstruction graft", category: "orthopedic", phase: "Treatment" },
  { src: "/videos/knee5.mp4", label: "Post-op range of motion", category: "orthopedic", phase: "Outcome" },
  { src: "/videos/knee6.mp4", label: "Recovery timeline", category: "orthopedic", phase: "Timeline" },
];

export const clipsByCategory = (c: ClipCategory) => CLIPS.filter((x) => x.category === c);
export const clipsByPhase = (p: NonNullable<Clip["phase"]>) => CLIPS.filter((x) => x.phase === p);

// Cross-specialty library clips (beyond dental) — for walls that must read
// "all of medicine", not "a dental company". colonoscopy-patient-video is a
// full produced patient video (with captions/voiceover) — also suitable as a
// full-screen product moment.
export const LIBRARY_CLIPS: Clip[] = [
  { src: "/videos/library/cardio-stent.mp4", label: "Colon anatomy + stent placement", category: "gi", phase: "Treatment" },
  { src: "/videos/library/scope-device.mp4", label: "Endoscope — soft-tip camera", category: "gi", phase: "Device" },
  { src: "/videos/library/colonoscopy-patient-video.mp4", label: "Colon screening — patient video", category: "gi", phase: "Timeline" },
  { src: "/videos/library/medication-routine.mp4", label: "Medication routine", category: "general", phase: "Timeline" },
  { src: "/videos/library/patient-watching-home.mp4", label: "Watched at home — 9:41 PM", category: "general", phase: "Outcome" },
];

// Cinematic Veo clip: a patient at home watching her own cardiac video on a
// tablet. High quality. Use as the full-frame product moment.
export const PATIENT_WATCH_VIDEO = "/videos/sitepics/patient-watching-veo.mp4";

// Poster stills extracted from every clip (two per clip, variants a/b),
// generated into /public/videos/posters/<basename>-{a,b}.jpg at 320px wide.
export const posterOf = (src: string, variant: "a" | "b" = "a") =>
  `/videos/posters/${src.split("/").pop()!.replace(/\.mp4$/, "")}-${variant}.jpg`;

// Full-bleed photography (user-provided). Use as shadowed full-viewport or
// half-page background plates, not as small inline images.
export const SITE_PHOTOS = {
  mayoClinic: "/videos/sitepics/Mayo-Clinic-Rochester-Minnesota-2020.webp",
  /** Two-row partner/backer logo strip, white logos on pure black. Show on a black band. */
  trustedByStrip: "/videos/sitepics/trusted-by-strip.png",
  /** B&W surgical team under OR lights — dramatic, cinematic. Quote spreads. */
  surgeryBW: "/videos/sitepics/jonathan-borba-Ld50KjnPSzM-unsplash.jpg",
  /** Desaturated teal OR team at instrument table. */
  surgeryTeal: "/videos/sitepics/piron-guillaume-U4FyCp3-KzY-unsplash.jpg",
  /** Dark OR, three surgical lights overhead — vertical, moody. */
  surgeryLights: "/videos/sitepics/stefanie-belinda-tHSLU1CMc7g-unsplash.jpg",
  /** B&W newborn moment — the human stakes of care. Story sections. */
  newborn: "/videos/sitepics/patricia-prudente--P2djqAwM8U-unsplash.jpg",
  /** Anatomical heart models, warm light, shallow DOF — light editorial plates. */
  anatomyHeart: "/videos/sitepics/jesse-orrico-Us3AQvyOP-o-unsplash.jpg",
  /** Vivid anatomical heart model close-up, vertical. */
  anatomyHeartAlt: "/videos/sitepics/robina-weermeijer-NIuGLCC7q54-unsplash.jpg",
  /** Hand X-ray flashing an OK sign on a radiology monitor — light, human. */
  xrayOk: "/videos/sitepics/owen-beard-DK8jXx1B-1c-unsplash.jpg",
  /** 3D neuron network render, glowing synapses on gray — intelligence backdrops. */
  neurons: "/videos/sitepics/bhautik-patel-NVprB2Xt1bA-unsplash.jpg",
};

// Sample rows for the consult-intelligence dataset section (Section 4).
export type IntentRow = {
  patient_id: string;
  treatment_type: string;
  consultation_stage: string;
  primary_question: string;
  hesitation_reason: string;
  viewed_visual_modules: string[];
  engagement_score: number;
  intent_signal: "high" | "building" | "stalled" | "at-risk";
  likely_barrier: string;
  follow_up_outcome: string;
};

export const INTENT_ROWS: IntentRow[] = [
  {
    patient_id: "PT-4821",
    treatment_type: "Invisalign, comprehensive",
    consultation_stage: "post-consult · day 2",
    primary_question: "What happens if I wait 6 months?",
    hesitation_reason: "cost vs. urgency unclear",
    viewed_visual_modules: ["crowding-progression", "aligner-timeline"],
    engagement_score: 87,
    intent_signal: "high",
    likely_barrier: "financing not yet discussed",
    follow_up_outcome: "booked records visit",
  },
  {
    patient_id: "PT-3390",
    treatment_type: "Implant, tooth 19",
    consultation_stage: "treatment presented",
    primary_question: "Will this hurt?",
    hesitation_reason: "procedure anxiety",
    viewed_visual_modules: ["implant-placement", "sedation-options"],
    engagement_score: 74,
    intent_signal: "building",
    likely_barrier: "fear of surgery",
    follow_up_outcome: "requested sedation consult",
  },
  {
    patient_id: "PT-5177",
    treatment_type: "Crown, tooth 30",
    consultation_stage: "post-consult · day 6",
    primary_question: "Why do I need this now?",
    hesitation_reason: "asymptomatic tooth",
    viewed_visual_modules: ["fracture-progression"],
    engagement_score: 41,
    intent_signal: "stalled",
    likely_barrier: "doesn't feel urgency",
    follow_up_outcome: "re-engaged via progression visual",
  },
  {
    patient_id: "PT-6034",
    treatment_type: "Perio, scaling + laser",
    consultation_stage: "hygiene referral",
    primary_question: "What are my options?",
    hesitation_reason: "comparing to extraction",
    viewed_visual_modules: ["pocket-depth", "laser-therapy", "bone-loss-timeline"],
    engagement_score: 92,
    intent_signal: "high",
    likely_barrier: "none detected",
    follow_up_outcome: "accepted same week",
  },
  {
    patient_id: "PT-2856",
    treatment_type: "Braces, phase I",
    consultation_stage: "parent consult",
    primary_question: "Is 9 too young to start?",
    hesitation_reason: "second-opinion seeking",
    viewed_visual_modules: ["growth-window", "expander-explainer"],
    engagement_score: 68,
    intent_signal: "building",
    likely_barrier: "spouse not present at consult",
    follow_up_outcome: "shared video with spouse",
  },
  {
    patient_id: "PT-7719",
    treatment_type: "Root canal, tooth 14",
    consultation_stage: "emergency visit",
    primary_question: "How long is recovery?",
    hesitation_reason: "work schedule",
    viewed_visual_modules: ["canal-anatomy", "recovery-timeline"],
    engagement_score: 79,
    intent_signal: "high",
    likely_barrier: "scheduling",
    follow_up_outcome: "booked next-day slot",
  },
  {
    patient_id: "PT-1204",
    treatment_type: "Veneers, 8 unit",
    consultation_stage: "cosmetic consult",
    primary_question: "Will they look natural?",
    hesitation_reason: "outcome uncertainty",
    viewed_visual_modules: ["shade-match", "smile-design", "before-after"],
    engagement_score: 95,
    intent_signal: "high",
    likely_barrier: "none detected",
    follow_up_outcome: "deposit placed",
  },
  {
    patient_id: "PT-8862",
    treatment_type: "Extraction + bridge",
    consultation_stage: "post-consult · day 14",
    primary_question: "(no questions asked)",
    hesitation_reason: "disengaged after consult",
    viewed_visual_modules: [],
    engagement_score: 12,
    intent_signal: "at-risk",
    likely_barrier: "never opened materials",
    follow_up_outcome: "flagged for TC call",
  },
];

// Ask Opera example exchanges (Section 3).
export const ASK_OPERA_QA = [
  {
    q: "What happens if I wait 6 months?",
    a: "For your lower crowding, waiting typically means the rotation on your front teeth continues — Dr. Chen flagged tooth #25 specifically. Your plan stays valid, but treatment time can extend from 14 to roughly 18 months. Here's the progression visual from your consult.",
    module: "crowding-progression",
  },
  {
    q: "Will this hurt?",
    a: "You'll be numb for the whole procedure — most patients feel pressure, not pain. Soreness afterward usually peaks the first evening and fades within 48 hours. Dr. Chen recommends ibuprofen before the anesthetic wears off.",
    module: "what-to-expect",
  },
  {
    q: "Why do I need this treatment?",
    a: "Your consult scan shows the crack on your lower molar reaching the dentin layer. Left alone, cracks like this tend to deepen toward the nerve — a crown now protects the tooth before a root canal becomes necessary.",
    module: "fracture-progression",
  },
  {
    q: "How long is recovery?",
    a: "Most patients are back to normal eating in 2–3 days. Your video covers the first-week timeline — soft foods for 48 hours, then progress as comfort allows. Full integration takes about 3 months, but you won't feel that part.",
    module: "recovery-timeline",
  },
  {
    q: "What are my options?",
    a: "You have three: the bridge Dr. Chen presented, an implant (single tooth, no impact on neighbors), or monitoring. Each has a visual in your plan — the implant module covers why she recommended it for your case.",
    module: "options-comparison",
  },
];

export const CONCEPTS = [
  {
    slug: "/concept-1-clinical-cinematic",
    name: "Clinical Cinematic",
    number: "01",
    tagline: "Dark, immersive, biotech-film energy. The visual wall as a living organism.",
  },
  {
    slug: "/concept-2-living-interface",
    name: "Living Interface",
    number: "02",
    tagline: "Bright, fluid, product-forward. The interface itself is the story.",
  },
  {
    slug: "/concept-3-editorial-science",
    name: "Editorial Science",
    number: "03",
    tagline: "Art-directed, typographic, journal-grade restraint with striking visuals.",
  },
  {
    slug: "/concept-4-hybrid",
    name: "Hybrid",
    number: "04",
    tagline: "Cinematic hero, interactive product core, editorial typography.",
  },
];
