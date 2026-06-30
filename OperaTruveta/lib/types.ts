/**
 * Opera Patient Education Studio — domain types.
 *
 * These types model the synthetic data that powers the concept demo:
 * personalized, evidence-informed, human patient EDUCATION assets.
 *
 * Hard product boundary encoded throughout: this is education and
 * communication only. Never diagnosis, treatment recommendation,
 * medication guidance, independent result interpretation, or
 * patient-specific risk prediction.
 */

export type Department =
  | 'Primary Care / Population Health'
  | 'Primary Care / Endocrinology'
  | 'Oncology / Clinical Research'
  | 'Hospital Medicine / Care Transitions'
  | 'Cardiology / Medication Education'
  | 'Primary Care / Lab Follow-Up'
  | 'Maternal Health / OB-GYN'
  | 'Primary Care / Health Equity'
  | 'Gastroenterology'
  | 'Caregiver Support / Primary Care'
  | 'Population Health / Care Navigation'
  | 'Research / Genomics Education'
  | 'Cardiology / Interventional';

export type UseCaseCategory =
  | 'Preventive Screening'
  | 'Chronic Care'
  | 'Clinical Research'
  | 'Care Transitions'
  | 'Medication Education'
  | 'Lab Follow-Up'
  | 'Maternal Health'
  | 'Language Access'
  | 'Procedure Preparation'
  | 'Caregiver Support'
  | 'Health Equity'
  | 'Consent & Privacy'
  | 'Cardiac Procedure';

export type HealthLiteracyLevel = 'basic' | 'intermediate' | 'advanced';

export type Language =
  | 'English'
  | 'Spanish'
  | 'English + Spanish captions'
  | 'Spanish + simple captions';

export type EmotionalState =
  | 'anxious'
  | 'overwhelmed'
  | 'curious'
  | 'guarded'
  | 'hopeful'
  | 'frustrated'
  | 'reassured-seeking'
  | 'embarrassed'
  | 'motivated';

export type OutputFormat = 'video' | 'portal' | 'sms' | 'email' | 'caregiver-summary';

/** A single personalization input we are explicitly allowed to use. */
export interface PersonalizationSignal {
  /** Short label, e.g. "Night-shift schedule". */
  label: string;
  /** The actual value/context, e.g. "Works overnight at a warehouse". */
  value: string;
  /** Where this came from — establishes it is approved/synthetic, not invented. */
  source:
    | 'patient-provided'
    | 'care-team-provided'
    | 'synthetic-demo'
    | 'approved-content'
    | 'journey-context';
  /** How it changes the education asset. */
  appliedAs: string;
}

export interface PatientLifeContext {
  occupation?: string;
  livingSituation?: string;
  schedule?: string;
  familyHistoryMentioned?: string;
  preferences?: string[];
  /** Free-form, human notes that make the person feel real. */
  notes?: string;
}

export interface PatientConcern {
  /** The worry in the patient's own framing. */
  quote: string;
  /** Calm, educational way the video acknowledges it (never clinical advice). */
  acknowledgedAs: string;
}

export interface CaregiverContext {
  name: string;
  relationship: string;
  involvement: string;
}

export interface SyntheticPatient {
  name: string;
  age: number;
  pronouns?: string;
  language: Language;
  healthLiteracy: HealthLiteracyLevel;
  emotionalState: EmotionalState;
  lifeContext: PatientLifeContext;
  concerns: PatientConcern[];
  goals: string[];
  barriers: string[];
  caregiver?: CaregiverContext;
  /** Synthetic — never a real person. Surfaced as a badge in the UI. */
  synthetic: true;
}

/** Care/clinical context — descriptive only, no decision support. */
export interface ClinicalContext {
  /** Plain-language reason this education was triggered. */
  trigger: string;
  /** Care-stage on the journey, e.g. "Pre-visit", "Post-discharge". */
  journeyStage: string;
  /** Approved care-team framing the video can reflect. */
  careTeamContext: string;
  appointmentHistory?: string[];
}

export interface ApprovedContent {
  /** Title of the approved source material. */
  title: string;
  /** Owning body that approved it (synthetic for demo). */
  owner: string;
  /** Summary of what the approved content covers. */
  summary: string;
  /** Version / review stamp for transparency. */
  version: string;
  lastReviewed: string;
}

/** A theme derived from real-world evidence at population scale (Truveta-style). */
export interface EvidenceTheme {
  /** The population-level theme, never patient-specific prediction. */
  theme: string;
  /** How it informs the EDUCATION (not the patient's care decisions). */
  educationalRelevance: string;
  /** Transparency about provenance. */
  provenance: string;
}

export type VisualType =
  | 'title-card'
  | 'journey-timeline'
  | 'checklist'
  | 'lab-card'
  | 'comparison'
  | 'icon-grid'
  | 'quote-card'
  | 'source-panel'
  | 'question-list'
  | 'portal-mockup'
  | 'caregiver-card'
  | 'map-route'
  | 'consent-panel'
  | 'closing-card';

/**
 * The real-world clinical / treatment visual layer. These are the calm, non-graphic
 * medical explainer visuals (anatomy, procedure flow, devices, scans, recovery) that
 * sit alongside the personalized UI visuals. Educational only — never graphic, never
 * a clinical claim about this specific patient.
 */
export type ClinicalVisualCategory =
  | 'anatomy'
  | 'procedure-walkthrough'
  | 'medical-device'
  | 'care-setting'
  | 'patient-experience'
  | 'mechanism-of-action'
  | 'sample-collection'
  | 'imaging-scan'
  | 'recovery-home-care'
  | 'research-visit'
  | 'cellular-flow'
  | 'dna-genomics';

/** Keys for the condition-specific, high-fidelity clinical explainer visuals. */
export type ClinicalVisualKey =
  | 'colon-screening'
  | 'a1c'
  | 'blood-pressure'
  | 'clinical-trial'
  | 'discharge-recovery'
  | 'medication-journey'
  | 'lab-process'
  | 'prenatal'
  | 'colonoscopy-prep'
  | 'genomics-consent';

/* ----------------------------------- Asset-backed treatment visual system ---------- */

export type TreatmentAssetType =
  | 'still-image'
  | 'short-motion-video'
  | 'medical-render'
  | 'stock-video'
  | 'lottie';

export type CloseupLevel = 'wide' | 'medium' | 'close-up' | 'macro';

/** An animated label/callout anchored to a point on the asset (x/y as 0–100 %). */
export interface OverlayLabel {
  text: string;
  x: number;
  y: number;
  /** Optional one-line patient-friendly explanation shown under the label. */
  explanation?: string;
}

/**
 * A plan for ONE real clinical/treatment visual asset in a video scene. If the asset is
 * missing, the app renders a polished asset slot showing the exact generation prompt —
 * never fake abstract medical art.
 */
export interface TreatmentAssetEntry {
  assetId: string;
  useCaseId: string;
  sceneNumber: number;
  recommendedFileName: string;
  assetType: TreatmentAssetType;
  closeupLevel: CloseupLevel;
  visualDescription: string;
  whatPatientLearns: string;
  exactImageGenerationPrompt: string;
  exactVideoGenerationPrompt: string;
  stockSearchTerms: string[];
  overlayLabels: OverlayLabel[];
  animationTreatment: string;
  personalizationOverlay: string;
  /** Spoken narration for this scene — the line the patient hears and reads as a subtitle. */
  voiceover?: string;
  priority: 'high' | 'medium' | 'low';
  fallbackIfMissing: 'asset-slot-only';
}

/** A plan for one real-world clinical visual within a video. */
export interface ClinicalVisualPlan {
  visualCategory: ClinicalVisualCategory;
  /** The real-world concept the visual conveys, e.g. "Flexible camera path through a simplified colon". */
  realWorldConceptShown: string;
  /** How it should look, e.g. "Clean 2.5D anatomy, soft gradients, labeled". */
  recommendedVisualStyle: string;
  /** The safety boundary for this specific visual. */
  safeVisualBoundary: string;
  /** The coded animation idea. */
  animationIdea: string;
  /** A still-frame fallback if motion isn't available. */
  staticFallback: string;
  /** Search terms to source a matching stock animation/asset later. */
  assetSearchTerms: string[];
  /** Where in the video this visual belongs, e.g. "after-intro", "mid", "before-cta". */
  scenePlacement: string;
  /** The plain-language line a patient hears/reads with this visual. */
  patientFriendlyExplanation: string;
  /** What this visual must NOT show. */
  avoidShowing: string[];
}

export interface StoryboardScene {
  sceneTitle: string;
  /** Spoken voiceover for this scene. Warm, specific, human. */
  narration: string;
  /** Large on-screen caption text. */
  onScreenText: string;
  visualType: VisualType;
  /** Camera / element movement direction. */
  motionDirection: string;
  /** Transition INTO the next scene. */
  transition: string;
  /** lucide-react icon name. */
  iconName: string;
  /** Search keyword to source a matching Lottie animation later. */
  lottieSearchKeyword: string;
  /** A bespoke animation idea for this scene (Remotion/Framer). */
  customAnimationIdea: string;
  /** Background treatment for the scene. */
  backgroundStyle: string;
  /** Which boundary this scene respects (education-only guardrail). */
  safetyBoundary: string;
  /** Why this scene is personalized to THIS patient. */
  personalizationReason: string;
  /** Approximate scene length in seconds. */
  durationSec: number;

  /* ---- Optional dual-layer visual direction (UI + real-world clinical) ---- */
  /** Direction for the personalized UI visual layer. */
  uiVisualDirection?: string;
  /** Direction for the real-world clinical visual layer. */
  clinicalVisualDirection?: string;
  /** Which clinical visual category pairs with this scene. */
  clinicalVisualCategory?: ClinicalVisualCategory;
  /** A condition-specific high-fidelity clinical explainer to render for this scene. */
  clinicalVisualKey?: ClinicalVisualKey;
  /** The real-world concept shown alongside the UI. */
  realWorldConceptShown?: string;
  /** A treatment/procedure-specific visual note. */
  treatmentSpecificVisual?: string;
  /** The safe medical visual style for this scene. */
  safeMedicalVisualStyle?: string;
  /** Asset search terms for sourcing matching clinical visuals. */
  assetSearchTerms?: string[];
  /** Visuals to avoid for this scene. */
  avoidVisuals?: string[];
  /** Plain note on how THIS scene is personalized to the patient. */
  patientPersonalization?: string;
  /** The concrete coded (Framer Motion / SVG) animation idea for this scene. */
  codedAnimationIdea?: string;
  /** What this scene must never show (safety). */
  avoidShowing?: string[];
}

export interface VideoScript {
  /** Hook line — opens warm and personal. */
  opening: string;
  /** Full narration body, scene by scene, read end to end (60–90s). */
  fullNarration: string;
  /** Warm close. */
  closing: string;
  /** Required educational disclaimer (always present). */
  disclaimer: string;
}

export type ComplianceStatus = 'pass' | 'review' | 'n/a';

export interface ComplianceItem {
  label: string;
  status: ComplianceStatus;
  detail: string;
}

export interface SafetyBoundary {
  /** What this asset explicitly does NOT do. */
  doesNotDo: string[];
  /** What it DOES do. */
  does: string[];
  /** Plain-language explanation for reviewers. */
  explanation: string;
}

export interface CTAContent {
  sms: string;
  email: { subject: string; body: string };
  portal: string;
  caregiverSummary?: string;
}

export interface VisualAssetPlan {
  /** Palette anchor for this use case. */
  palette: string;
  /** Key reusable visual components this storyboard needs. */
  keyVisuals: string[];
  /** Title-card treatment. */
  titleCard: string;
  /** Iconography direction. */
  iconStyle: string;
}

export interface MotionPlan {
  /** Overall pacing word, e.g. "calm", "reassuring". */
  pacing: string;
  /** Signature transition used throughout. */
  signatureTransition: string;
  /** Notes on entrance/emphasis motion. */
  motionNotes: string;
  /** Tools this could render with. */
  renderTargets: ('Remotion' | 'Framer Motion' | 'Lottie' | 'Screen Recording')[];
}

export interface DemoUseCase {
  id: string;
  category: UseCaseCategory;
  title: string;
  department: Department;
  /** One-line summary for cards. */
  summary: string;
  /** Accent color token, e.g. "teal" | "navy". */
  accent: 'teal' | 'navy' | 'blue' | 'slate';
  patient: SyntheticPatient;
  clinicalContext: ClinicalContext;
  approvedContent: ApprovedContent;
  evidenceTheme: EvidenceTheme;
  personalizationSignals: PersonalizationSignal[];
  script: VideoScript;
  storyboard: StoryboardScene[];
  visualAssetPlan: VisualAssetPlan;
  motionPlan: MotionPlan;
  cta: CTAContent;
  compliance: ComplianceItem[];
  safetyBoundary: SafetyBoundary;
  outputs: OutputFormat[];
  /** Real-world clinical/treatment visuals blended into this video. */
  clinicalVisuals?: ClinicalVisualPlan[];
  /** Estimated finished runtime in seconds. */
  estimatedRuntimeSec: number;
}
