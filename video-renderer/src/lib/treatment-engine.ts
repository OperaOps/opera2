/**
 * Treatment Engine — Reusable structure system for video generation.
 *
 * For each treatment, this defines:
 *   - stages (the clinical phases)
 *   - asset mappings (which clips/images map to which scenes)
 *   - fallback hierarchy (video → image → SVG → gradient)
 *   - synthetic visual components for gaps
 *
 * This engine is the single source of truth for how treatments
 * map to the premium 8-scene video composition.
 *
 * Scene mapping for PremiumOrthoVideo:
 *   intro     → greeting
 *   problem   → condition/diagnosis (what's wrong)
 *   deepDive  → why it matters / surgery details
 *   treatment → the procedure itself
 *   journey   → timeline / implant placement / ongoing process
 *   outcome   → final result
 *   whatToExpect → aftercare / restoration phase
 *   cta       → call to action
 */

export interface TreatmentStage {
  /** Scene in the PremiumOrthoVideo composition */
  scene: "intro" | "problem" | "deepDive" | "treatment" | "journey" | "outcome" | "whatToExpect" | "cta";
  /** Clinical phase name */
  label: string;
  /** Asset categories to pull from (in priority order) */
  assetCategories: string[];
  /** SVG fallback component name */
  svgFallback: string;
  /** Whether this stage requires synthetic visuals (no strong real asset) */
  needsSynthetic: boolean;
}

export interface TreatmentDefinition {
  id: string;
  name: string;
  specialty: "dental" | "orthodontic";
  /** Default diagnosis type for this treatment */
  defaultDiagnosis: string;
  /** Clinical stages mapped to video scenes */
  stages: TreatmentStage[];
  /** Typical video duration target in seconds */
  targetDurationSeconds: number;
}

// ---------------------------------------------------------------------------
// Treatment Registry
// ---------------------------------------------------------------------------

const treatments: TreatmentDefinition[] = [
  // ── DENTAL ────────────────────────────────────────────────────────────

  {
    id: "full_mouth_rehab",
    name: "Full Mouth Rehabilitation",
    specialty: "dental",
    defaultDiagnosis: "missing_tooth",
    targetDurationSeconds: 120,
    stages: [
      { scene: "problem",      label: "Severe Decay / Compromised Teeth",  assetCategories: ["root_canal/problem", "gum_treatment/problem", "crown/problem"], svgFallback: "RootCanalVisual", needsSynthetic: false },
      { scene: "treatment",    label: "Extractions",                       assetCategories: ["extraction"], svgFallback: "ImplantVisual", needsSynthetic: false },
      { scene: "deepDive",     label: "Oral Surgery / Ridge Augmentation", assetCategories: ["jaw_surgery", "bridge"], svgFallback: "RidgeAugmentationVisual", needsSynthetic: true },
      { scene: "journey",      label: "Implant Placement",                 assetCategories: ["implant"], svgFallback: "HealingOsseointegrationVisual", needsSynthetic: false },
      { scene: "whatToExpect",  label: "Crown / Full Arch Restoration",    assetCategories: ["crown"], svgFallback: "FullArchRestorationVisual", needsSynthetic: true },
      { scene: "outcome",      label: "Final Smile",                       assetCategories: ["crown/outcome", "shared/smile-result"], svgFallback: "HealthyToothVisual", needsSynthetic: false },
    ],
  },

  {
    id: "crown",
    name: "Porcelain Crown",
    specialty: "dental",
    defaultDiagnosis: "cracked_tooth",
    targetDurationSeconds: 90,
    stages: [
      { scene: "problem",      label: "Damaged Tooth",         assetCategories: ["crown/problem"],   svgFallback: "CrackedToothVisual", needsSynthetic: false },
      { scene: "treatment",    label: "Crown Preparation",     assetCategories: ["crown"],           svgFallback: "CrownVisual", needsSynthetic: false },
      { scene: "deepDive",     label: "Why Crowns Work",       assetCategories: ["crown"],           svgFallback: "CrownVisual", needsSynthetic: false },
      { scene: "journey",      label: "Your Appointments",     assetCategories: [],                  svgFallback: "CrownVisual", needsSynthetic: false },
      { scene: "whatToExpect",  label: "Aftercare",             assetCategories: [],                  svgFallback: "HealthyToothVisual", needsSynthetic: false },
      { scene: "outcome",      label: "Restored Tooth",        assetCategories: ["crown/outcome"],   svgFallback: "HealthyToothVisual", needsSynthetic: false },
    ],
  },

  {
    id: "filling",
    name: "Composite Filling",
    specialty: "dental",
    defaultDiagnosis: "cavity",
    targetDurationSeconds: 80,
    stages: [
      { scene: "problem",      label: "Tooth Decay",           assetCategories: ["filling/problem"],  svgFallback: "CavityVisual", needsSynthetic: false },
      { scene: "treatment",    label: "Filling Procedure",     assetCategories: ["filling"],          svgFallback: "FillingVisual", needsSynthetic: false },
      { scene: "outcome",      label: "Restored Tooth",        assetCategories: ["shared/smile-result"], svgFallback: "HealthyToothVisual", needsSynthetic: false },
    ],
  },

  {
    id: "root_canal",
    name: "Root Canal Therapy",
    specialty: "dental",
    defaultDiagnosis: "cavity",
    targetDurationSeconds: 100,
    stages: [
      { scene: "problem",      label: "Infected Tooth",        assetCategories: ["root_canal/problem"], svgFallback: "CavityVisual", needsSynthetic: false },
      { scene: "treatment",    label: "Root Canal Procedure",  assetCategories: ["root_canal"],        svgFallback: "RootCanalVisual", needsSynthetic: false },
      { scene: "deepDive",     label: "Inside the Tooth",      assetCategories: ["root_canal/problem"], svgFallback: "RootCanalVisual", needsSynthetic: false },
      { scene: "outcome",      label: "Saved Tooth",           assetCategories: ["shared/smile-result"], svgFallback: "HealthyToothVisual", needsSynthetic: false },
    ],
  },

  {
    id: "implant",
    name: "Dental Implant",
    specialty: "dental",
    defaultDiagnosis: "missing_tooth",
    targetDurationSeconds: 100,
    stages: [
      { scene: "problem",      label: "Missing Tooth",         assetCategories: ["implant/problem"],  svgFallback: "ImplantVisual", needsSynthetic: false },
      { scene: "treatment",    label: "Implant Placement",     assetCategories: ["implant"],          svgFallback: "ImplantVisual", needsSynthetic: false },
      { scene: "deepDive",     label: "Osseointegration",      assetCategories: ["implant"],          svgFallback: "HealingOsseointegrationVisual", needsSynthetic: false },
      { scene: "journey",      label: "Healing Timeline",      assetCategories: [],                   svgFallback: "ImplantVisual", needsSynthetic: false },
      { scene: "outcome",      label: "Permanent Tooth",       assetCategories: ["shared/smile-result"], svgFallback: "HealthyToothVisual", needsSynthetic: false },
    ],
  },

  {
    id: "extraction",
    name: "Tooth Extraction",
    specialty: "dental",
    defaultDiagnosis: "cracked_tooth",
    targetDurationSeconds: 80,
    stages: [
      { scene: "problem",      label: "Compromised Tooth",     assetCategories: ["extraction/problem"], svgFallback: "CrackedToothVisual", needsSynthetic: false },
      { scene: "treatment",    label: "Extraction Procedure",  assetCategories: ["extraction"],        svgFallback: "RootCanalVisual", needsSynthetic: false },
      { scene: "outcome",      label: "Healing",               assetCategories: ["shared/smile-result"], svgFallback: "HealthyToothVisual", needsSynthetic: false },
    ],
  },

  {
    id: "bridge",
    name: "Dental Bridge",
    specialty: "dental",
    defaultDiagnosis: "missing_tooth",
    targetDurationSeconds: 90,
    stages: [
      { scene: "problem",      label: "Missing Tooth",         assetCategories: ["bridge/problem"],   svgFallback: "ImplantVisual", needsSynthetic: false },
      { scene: "treatment",    label: "Bridge Placement",      assetCategories: ["bridge"],           svgFallback: "CrownVisual", needsSynthetic: false },
      { scene: "outcome",      label: "Complete Smile",        assetCategories: ["shared/smile-result"], svgFallback: "HealthyToothVisual", needsSynthetic: false },
    ],
  },

  {
    id: "veneers",
    name: "Porcelain Veneers",
    specialty: "dental",
    defaultDiagnosis: "spacing",
    targetDurationSeconds: 90,
    stages: [
      { scene: "problem",      label: "Current Smile",         assetCategories: ["veneers/problem"],  svgFallback: "SpacingVisual", needsSynthetic: false },
      { scene: "treatment",    label: "Veneer Preparation",    assetCategories: ["veneers"],          svgFallback: "VeneersVisual", needsSynthetic: false },
      { scene: "outcome",      label: "New Smile",             assetCategories: ["shared/smile-result"], svgFallback: "HealthyToothVisual", needsSynthetic: false },
    ],
  },

  {
    id: "whitening",
    name: "Professional Whitening",
    specialty: "dental",
    defaultDiagnosis: "cavity",
    targetDurationSeconds: 80,
    stages: [
      { scene: "problem",      label: "Discoloration",         assetCategories: ["whitening/problem"], svgFallback: "WhiteningVisual", needsSynthetic: false },
      { scene: "treatment",    label: "Whitening Process",     assetCategories: ["whitening"],         svgFallback: "WhiteningVisual", needsSynthetic: false },
      { scene: "outcome",      label: "Brighter Smile",        assetCategories: ["shared/smile-result"], svgFallback: "HealthyToothVisual", needsSynthetic: false },
    ],
  },

  {
    id: "gum_treatment",
    name: "Gum Disease Treatment",
    specialty: "dental",
    defaultDiagnosis: "gum_disease",
    targetDurationSeconds: 90,
    stages: [
      { scene: "problem",      label: "Gum Disease",           assetCategories: ["gum_treatment/problem"], svgFallback: "FillingVisual", needsSynthetic: false },
      { scene: "treatment",    label: "Deep Cleaning",         assetCategories: ["gum_treatment"],        svgFallback: "FillingVisual", needsSynthetic: false },
      { scene: "deepDive",     label: "Why Gum Health Matters", assetCategories: ["gum_treatment/problem"], svgFallback: "FillingVisual", needsSynthetic: false },
      { scene: "outcome",      label: "Healthy Gums",          assetCategories: ["shared/smile-result"],   svgFallback: "HealthyToothVisual", needsSynthetic: false },
    ],
  },

  {
    id: "dentures",
    name: "Dentures",
    specialty: "dental",
    defaultDiagnosis: "missing_tooth",
    targetDurationSeconds: 90,
    stages: [
      { scene: "problem",      label: "Missing Teeth",         assetCategories: ["dentures/problem"], svgFallback: "ImplantVisual", needsSynthetic: false },
      { scene: "treatment",    label: "Denture Fitting",       assetCategories: ["dentures"],         svgFallback: "CrownVisual", needsSynthetic: false },
      { scene: "outcome",      label: "Complete Smile",        assetCategories: ["shared/smile-result"], svgFallback: "HealthyToothVisual", needsSynthetic: false },
    ],
  },

  // ── ORTHODONTIC ───────────────────────────────────────────────────────

  {
    id: "braces",
    name: "Metal Braces",
    specialty: "orthodontic",
    defaultDiagnosis: "crowding",
    targetDurationSeconds: 100,
    stages: [
      { scene: "problem",      label: "Misalignment",          assetCategories: ["braces/problem"],   svgFallback: "CrowdingVisual", needsSynthetic: false },
      { scene: "treatment",    label: "Braces Application",    assetCategories: ["braces"],           svgFallback: "BracesVisual", needsSynthetic: false },
      { scene: "deepDive",     label: "How Braces Move Teeth", assetCategories: ["braces"],           svgFallback: "PremiumCrowdingVisual", needsSynthetic: false },
      { scene: "journey",      label: "Month-by-Month",        assetCategories: [],                   svgFallback: "BracesVisual", needsSynthetic: false },
      { scene: "outcome",      label: "Straight Smile",        assetCategories: ["shared/smile-result"], svgFallback: "HealthyToothVisual", needsSynthetic: false },
    ],
  },

  {
    id: "invisalign",
    name: "Invisalign Clear Aligners",
    specialty: "orthodontic",
    defaultDiagnosis: "crowding",
    targetDurationSeconds: 100,
    stages: [
      { scene: "problem",      label: "Misalignment",          assetCategories: ["invisalign/problem"], svgFallback: "CrowdingVisual", needsSynthetic: false },
      { scene: "treatment",    label: "Aligner Fitting",       assetCategories: ["invisalign"],         svgFallback: "InvisalignVisual", needsSynthetic: false },
      { scene: "deepDive",     label: "How Aligners Work",     assetCategories: ["invisalign"],         svgFallback: "PremiumCrowdingVisual", needsSynthetic: false },
      { scene: "journey",      label: "Tray-by-Tray",          assetCategories: [],                    svgFallback: "InvisalignVisual", needsSynthetic: false },
      { scene: "outcome",      label: "Perfect Alignment",     assetCategories: ["shared/smile-result"], svgFallback: "HealthyToothVisual", needsSynthetic: false },
    ],
  },

  {
    id: "ceramic_braces",
    name: "Ceramic Braces",
    specialty: "orthodontic",
    defaultDiagnosis: "crowding",
    targetDurationSeconds: 90,
    stages: [
      { scene: "problem",      label: "Misalignment",          assetCategories: ["ceramic_braces/problem"], svgFallback: "CrowdingVisual", needsSynthetic: false },
      { scene: "treatment",    label: "Ceramic Braces",        assetCategories: ["ceramic_braces"],         svgFallback: "BracesVisual", needsSynthetic: false },
      { scene: "outcome",      label: "Straight Smile",        assetCategories: ["shared/smile-result"],    svgFallback: "HealthyToothVisual", needsSynthetic: false },
    ],
  },

  {
    id: "lingual_braces",
    name: "Lingual Braces",
    specialty: "orthodontic",
    defaultDiagnosis: "crowding",
    targetDurationSeconds: 90,
    stages: [
      { scene: "problem",      label: "Misalignment",          assetCategories: ["lingual_braces/problem"], svgFallback: "CrowdingVisual", needsSynthetic: false },
      { scene: "treatment",    label: "Lingual Braces",        assetCategories: ["lingual_braces"],         svgFallback: "BracesVisual", needsSynthetic: false },
      { scene: "outcome",      label: "Straight Smile",        assetCategories: ["shared/smile-result"],    svgFallback: "HealthyToothVisual", needsSynthetic: false },
    ],
  },

  {
    id: "expander",
    name: "Palatal Expander",
    specialty: "orthodontic",
    defaultDiagnosis: "crowding",
    targetDurationSeconds: 90,
    stages: [
      { scene: "problem",      label: "Narrow Palate",         assetCategories: ["expander/problem"], svgFallback: "CrowdingVisual", needsSynthetic: false },
      { scene: "treatment",    label: "Expander Placement",    assetCategories: ["expander"],         svgFallback: "BracesVisual", needsSynthetic: false },
      { scene: "outcome",      label: "Wider Arch",            assetCategories: ["shared/smile-result"], svgFallback: "HealthyToothVisual", needsSynthetic: false },
    ],
  },

  {
    id: "retainer",
    name: "Retainers",
    specialty: "orthodontic",
    defaultDiagnosis: "crowding",
    targetDurationSeconds: 80,
    stages: [
      { scene: "problem",      label: "Post-Treatment",        assetCategories: ["retainer/problem"], svgFallback: "InvisalignVisual", needsSynthetic: false },
      { scene: "treatment",    label: "Retainer Fitting",      assetCategories: ["retainer"],         svgFallback: "InvisalignVisual", needsSynthetic: false },
      { scene: "outcome",      label: "Maintained Results",    assetCategories: ["shared/smile-result"], svgFallback: "HealthyToothVisual", needsSynthetic: false },
    ],
  },

  {
    id: "jaw_surgery",
    name: "Jaw Surgery",
    specialty: "orthodontic",
    defaultDiagnosis: "underbite",
    targetDurationSeconds: 100,
    stages: [
      { scene: "problem",      label: "Jaw Misalignment",      assetCategories: ["jaw_surgery/problem"], svgFallback: "UnderbiteVisual", needsSynthetic: false },
      { scene: "treatment",    label: "Surgical Correction",   assetCategories: ["jaw_surgery"],         svgFallback: "BracesVisual", needsSynthetic: false },
      { scene: "deepDive",     label: "How Surgery Works",     assetCategories: ["jaw_surgery"],         svgFallback: "PremiumUnderbiteVisual", needsSynthetic: false },
      { scene: "journey",      label: "Recovery Timeline",     assetCategories: [],                      svgFallback: "BracesVisual", needsSynthetic: false },
      { scene: "outcome",      label: "Corrected Bite",        assetCategories: ["shared/smile-result"], svgFallback: "HealthyToothVisual", needsSynthetic: false },
    ],
  },
];

// ---------------------------------------------------------------------------
// Registry & Accessors
// ---------------------------------------------------------------------------

const registry = new Map<string, TreatmentDefinition>();
for (const t of treatments) {
  registry.set(t.id, t);
}

/** Get a treatment definition by ID */
export function getTreatmentDefinition(id: string): TreatmentDefinition | undefined {
  return registry.get(id);
}

/** Get all treatments for a specialty */
export function getTreatmentsBySpecialty(specialty: "dental" | "orthodontic"): TreatmentDefinition[] {
  return treatments.filter((t) => t.specialty === specialty);
}

/** Get all treatment IDs */
export function getAllTreatmentIds(): string[] {
  return treatments.map((t) => t.id);
}

/** Check if a treatment needs any synthetic visuals */
export function needsSyntheticVisuals(treatmentId: string): boolean {
  const def = registry.get(treatmentId);
  if (!def) return false;
  return def.stages.some((s) => s.needsSynthetic);
}

/** Get the stages that need synthetic visuals for a treatment */
export function getSyntheticGaps(treatmentId: string): TreatmentStage[] {
  const def = registry.get(treatmentId);
  if (!def) return [];
  return def.stages.filter((s) => s.needsSynthetic);
}
