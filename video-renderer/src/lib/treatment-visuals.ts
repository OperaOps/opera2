// ---------------------------------------------------------------------------
// Treatment Visual Config
// Maps each treatment to stock imagery + cinematic effects for each scene.
// When real images exist, they override the SVG visuals in ProblemScene,
// TreatmentScene, OutcomeScene, DeepDiveScene, and WhatToExpectScene.
// ---------------------------------------------------------------------------

/** Effect names match the CinematicImage component's Effect type */
export type VisualEffect =
  | "ken-burns-in"
  | "ken-burns-out"
  | "pan-left"
  | "pan-right"
  | "zoom-pulse"
  | "fade-zoom"
  | "parallax"
  | "reveal-left"
  | "reveal-right";

export interface SceneVisualConfig {
  /** Paths relative to public/ — consumed by staticFile() */
  images: string[];
  /** Cinematic motion effect to apply */
  effect: VisualEffect;
  /** SVG component name to fall back to when no images are available */
  fallbackComponent: string;
  /** Overlay style for the CinematicImage */
  overlay?: "dark" | "gradient-bottom" | "gradient-top" | "none";
}

export interface TreatmentVisualConfig {
  treatmentId: string;
  problem: SceneVisualConfig;
  treatment: SceneVisualConfig;
  outcome: SceneVisualConfig;
  /** Optional — used by DeepDiveScene; falls back to problem config */
  deepDive?: SceneVisualConfig;
  /** Optional — used by WhatToExpectScene; falls back to outcome config */
  whatToExpect?: SceneVisualConfig;
}

// ---------------------------------------------------------------------------
// 3D dental render assets (high-quality, treatment-specific)
// ---------------------------------------------------------------------------

const D3 = {
  crowdingMisaligned: "dental-3d/crowding-misaligned.png",
  alignedModel: "dental-3d/aligned-teeth-model.png",
  jawBracesProfile: "dental-3d/jaw-braces-profile.png",
  jawBracesFront: "dental-3d/jaw-braces-front.png",
  invisalignOnTeeth: "dental-3d/invisalign-on-teeth.png",
  invisalignAttach: "dental-3d/invisalign-attachments.png",
  clearAlignerOpen: "dental-3d/clear-aligner-open.png",
  veneerPrepDrill: "dental-3d/veneer-prep-drill.png",
  veneerPrepDetail: "dental-3d/veneer-prep-detail.png",
  crownPlacement: "dental-3d/crown-placement.png",
  perfectResult: "dental-3d/perfect-teeth-result.png",
  crowdingAligners: "dental-3d/crowding-with-aligners.png",
  implantScrewCrown: "dental-3d/implant-screw-crown.png",
  implantDecayed: "dental-3d/implant-decayed-tooth.png",
  toothExtraction: "dental-3d/tooth-extraction.png",
} as const;

// Stock photos (supplementary / lifestyle shots)
const STOCK = {
  happyPatient: "stock/happy-dental-patient.jpg",
  perfectSmile: "stock/perfect-smile.jpg",
  smileAfter: "stock/smile-after.jpg",
  smileAfter2: "stock/smile-after-2.jpg",
  whiteningProc: "stock/whitening-procedure.jpg",
  smileCloseup: "stock/smile-closeup.jpg",
} as const;

// ---------------------------------------------------------------------------
// Configs for ALL treatments — using real 3D dental renders
// ---------------------------------------------------------------------------

const configs: TreatmentVisualConfig[] = [
  // ===== DENTAL =====
  {
    treatmentId: "crown",
    problem: {
      images: [D3.veneerPrepDrill],
      effect: "ken-burns-in",
      fallbackComponent: "CrackedToothVisual",
      overlay: "gradient-bottom",
    },
    treatment: {
      images: [D3.crownPlacement],
      effect: "pan-left",
      fallbackComponent: "CrownVisual",
      overlay: "dark",
    },
    outcome: {
      images: [D3.perfectResult],
      effect: "ken-burns-out",
      fallbackComponent: "HealthyToothVisual",
      overlay: "gradient-bottom",
    },
    deepDive: {
      images: [D3.veneerPrepDetail],
      effect: "zoom-pulse",
      fallbackComponent: "CrackedToothVisual",
      overlay: "dark",
    },
    whatToExpect: {
      images: [D3.perfectResult, STOCK.happyPatient],
      effect: "fade-zoom",
      fallbackComponent: "HealthyToothVisual",
      overlay: "gradient-bottom",
    },
  },

  {
    treatmentId: "filling",
    problem: {
      images: [D3.veneerPrepDrill],
      effect: "ken-burns-in",
      fallbackComponent: "CavityVisual",
      overlay: "gradient-bottom",
    },
    treatment: {
      images: [D3.veneerPrepDetail, D3.crownPlacement],
      effect: "pan-right",
      fallbackComponent: "FillingVisual",
      overlay: "dark",
    },
    outcome: {
      images: [D3.perfectResult],
      effect: "ken-burns-out",
      fallbackComponent: "HealthyToothVisual",
      overlay: "gradient-bottom",
    },
    deepDive: {
      images: [D3.veneerPrepDrill],
      effect: "zoom-pulse",
      fallbackComponent: "CavityVisual",
      overlay: "dark",
    },
    whatToExpect: {
      images: [D3.perfectResult, STOCK.happyPatient],
      effect: "fade-zoom",
      fallbackComponent: "HealthyToothVisual",
      overlay: "gradient-bottom",
    },
  },

  {
    treatmentId: "root_canal",
    problem: {
      images: [D3.implantDecayed],
      effect: "ken-burns-in",
      fallbackComponent: "CavityVisual",
      overlay: "dark",
    },
    treatment: {
      images: [D3.veneerPrepDrill, D3.veneerPrepDetail],
      effect: "pan-left",
      fallbackComponent: "RootCanalVisual",
      overlay: "dark",
    },
    outcome: {
      images: [D3.crownPlacement, D3.perfectResult],
      effect: "ken-burns-out",
      fallbackComponent: "HealthyToothVisual",
      overlay: "gradient-bottom",
    },
    deepDive: {
      images: [D3.implantDecayed],
      effect: "zoom-pulse",
      fallbackComponent: "CavityVisual",
      overlay: "dark",
    },
    whatToExpect: {
      images: [D3.perfectResult, STOCK.happyPatient],
      effect: "fade-zoom",
      fallbackComponent: "HealthyToothVisual",
      overlay: "gradient-bottom",
    },
  },

  {
    treatmentId: "implant",
    problem: {
      images: [D3.implantDecayed],
      effect: "ken-burns-in",
      fallbackComponent: "MissingToothVisual",
      overlay: "gradient-bottom",
    },
    treatment: {
      images: [D3.implantScrewCrown],
      effect: "pan-right",
      fallbackComponent: "ImplantVisual",
      overlay: "dark",
    },
    outcome: {
      images: [D3.perfectResult],
      effect: "ken-burns-out",
      fallbackComponent: "HealthyToothVisual",
      overlay: "gradient-bottom",
    },
    deepDive: {
      images: [D3.implantScrewCrown, D3.implantDecayed],
      effect: "zoom-pulse",
      fallbackComponent: "MissingToothVisual",
      overlay: "dark",
    },
    whatToExpect: {
      images: [D3.perfectResult, STOCK.happyPatient],
      effect: "fade-zoom",
      fallbackComponent: "HealthyToothVisual",
      overlay: "gradient-bottom",
    },
  },

  {
    treatmentId: "extraction",
    problem: {
      images: [D3.implantDecayed],
      effect: "ken-burns-in",
      fallbackComponent: "CrackedToothVisual",
      overlay: "dark",
    },
    treatment: {
      images: [D3.toothExtraction],
      effect: "pan-left",
      fallbackComponent: "RootCanalVisual",
      overlay: "dark",
    },
    outcome: {
      images: [D3.perfectResult, STOCK.happyPatient],
      effect: "ken-burns-out",
      fallbackComponent: "HealthyToothVisual",
      overlay: "gradient-bottom",
    },
    deepDive: {
      images: [D3.toothExtraction, D3.implantDecayed],
      effect: "zoom-pulse",
      fallbackComponent: "CrackedToothVisual",
      overlay: "dark",
    },
    whatToExpect: {
      images: [STOCK.happyPatient, STOCK.smileAfter],
      effect: "fade-zoom",
      fallbackComponent: "HealthyToothVisual",
      overlay: "gradient-bottom",
    },
  },

  {
    treatmentId: "bridge",
    problem: {
      images: [D3.implantDecayed],
      effect: "ken-burns-in",
      fallbackComponent: "MissingToothVisual",
      overlay: "gradient-bottom",
    },
    treatment: {
      images: [D3.crownPlacement],
      effect: "pan-right",
      fallbackComponent: "CrownVisual",
      overlay: "dark",
    },
    outcome: {
      images: [D3.perfectResult],
      effect: "ken-burns-out",
      fallbackComponent: "HealthyToothVisual",
      overlay: "gradient-bottom",
    },
    deepDive: {
      images: [D3.implantDecayed, D3.crownPlacement],
      effect: "zoom-pulse",
      fallbackComponent: "MissingToothVisual",
      overlay: "dark",
    },
    whatToExpect: {
      images: [D3.perfectResult, STOCK.happyPatient],
      effect: "fade-zoom",
      fallbackComponent: "HealthyToothVisual",
      overlay: "gradient-bottom",
    },
  },

  {
    treatmentId: "veneers",
    problem: {
      images: [D3.veneerPrepDrill],
      effect: "ken-burns-in",
      fallbackComponent: "CrackedToothVisual",
      overlay: "gradient-bottom",
    },
    treatment: {
      images: [D3.veneerPrepDetail, D3.crownPlacement],
      effect: "pan-left",
      fallbackComponent: "VeneersVisual",
      overlay: "dark",
    },
    outcome: {
      images: [D3.perfectResult],
      effect: "ken-burns-out",
      fallbackComponent: "BrightSmileVisual",
      overlay: "gradient-bottom",
    },
    deepDive: {
      images: [D3.veneerPrepDrill, D3.veneerPrepDetail],
      effect: "zoom-pulse",
      fallbackComponent: "CrackedToothVisual",
      overlay: "dark",
    },
    whatToExpect: {
      images: [D3.perfectResult, STOCK.perfectSmile],
      effect: "fade-zoom",
      fallbackComponent: "BrightSmileVisual",
      overlay: "gradient-bottom",
    },
  },

  {
    treatmentId: "whitening",
    problem: {
      images: [STOCK.smileCloseup],
      effect: "ken-burns-in",
      fallbackComponent: "CrackedToothVisual",
      overlay: "gradient-bottom",
    },
    treatment: {
      images: [STOCK.whiteningProc],
      effect: "pan-right",
      fallbackComponent: "WhiteningVisual",
      overlay: "dark",
    },
    outcome: {
      images: [D3.perfectResult, STOCK.perfectSmile],
      effect: "ken-burns-out",
      fallbackComponent: "BrightSmileVisual",
      overlay: "gradient-bottom",
    },
    deepDive: {
      images: [STOCK.smileCloseup],
      effect: "zoom-pulse",
      fallbackComponent: "CrackedToothVisual",
      overlay: "dark",
    },
    whatToExpect: {
      images: [STOCK.perfectSmile, STOCK.happyPatient],
      effect: "fade-zoom",
      fallbackComponent: "BrightSmileVisual",
      overlay: "gradient-bottom",
    },
  },

  {
    treatmentId: "gum_treatment",
    problem: {
      images: [D3.veneerPrepDetail],
      effect: "ken-burns-in",
      fallbackComponent: "GumDiseaseVisual",
      overlay: "dark",
    },
    treatment: {
      images: [D3.veneerPrepDrill],
      effect: "pan-left",
      fallbackComponent: "FillingVisual",
      overlay: "dark",
    },
    outcome: {
      images: [D3.perfectResult, STOCK.happyPatient],
      effect: "ken-burns-out",
      fallbackComponent: "HealthyToothVisual",
      overlay: "gradient-bottom",
    },
    whatToExpect: {
      images: [STOCK.happyPatient, STOCK.perfectSmile],
      effect: "fade-zoom",
      fallbackComponent: "HealthyToothVisual",
      overlay: "gradient-bottom",
    },
  },

  // ===== ORTHODONTIC =====
  {
    treatmentId: "braces",
    problem: {
      images: [D3.crowdingMisaligned],
      effect: "ken-burns-in",
      fallbackComponent: "CrowdingVisual",
      overlay: "gradient-bottom",
    },
    treatment: {
      images: [D3.jawBracesFront, D3.jawBracesProfile],
      effect: "pan-right",
      fallbackComponent: "BracesVisual",
      overlay: "dark",
    },
    outcome: {
      images: [D3.alignedModel, D3.perfectResult],
      effect: "ken-burns-out",
      fallbackComponent: "AlignedTeethVisual",
      overlay: "gradient-bottom",
    },
    deepDive: {
      images: [D3.crowdingMisaligned, D3.jawBracesProfile],
      effect: "zoom-pulse",
      fallbackComponent: "PremiumCrowdingVisual",
      overlay: "dark",
    },
    whatToExpect: {
      images: [D3.alignedModel, STOCK.happyPatient],
      effect: "fade-zoom",
      fallbackComponent: "RetainerVisual",
      overlay: "gradient-bottom",
    },
  },

  {
    treatmentId: "invisalign",
    problem: {
      images: [D3.crowdingMisaligned, D3.crowdingAligners],
      effect: "ken-burns-in",
      fallbackComponent: "CrowdingVisual",
      overlay: "gradient-bottom",
    },
    treatment: {
      images: [D3.invisalignOnTeeth, D3.invisalignAttach],
      effect: "pan-left",
      fallbackComponent: "InvisalignVisual",
      overlay: "dark",
    },
    outcome: {
      images: [D3.alignedModel, D3.perfectResult],
      effect: "ken-burns-out",
      fallbackComponent: "AlignedTeethVisual",
      overlay: "gradient-bottom",
    },
    deepDive: {
      images: [D3.invisalignAttach, D3.clearAlignerOpen],
      effect: "zoom-pulse",
      fallbackComponent: "PremiumCrowdingVisual",
      overlay: "dark",
    },
    whatToExpect: {
      images: [D3.clearAlignerOpen, D3.alignedModel],
      effect: "fade-zoom",
      fallbackComponent: "RetainerVisual",
      overlay: "gradient-bottom",
    },
  },

  {
    treatmentId: "ceramic_braces",
    problem: {
      images: [D3.crowdingMisaligned],
      effect: "ken-burns-in",
      fallbackComponent: "CrowdingVisual",
      overlay: "gradient-bottom",
    },
    treatment: {
      images: [D3.jawBracesFront],
      effect: "pan-right",
      fallbackComponent: "BracesVisual",
      overlay: "dark",
    },
    outcome: {
      images: [D3.alignedModel, D3.perfectResult],
      effect: "ken-burns-out",
      fallbackComponent: "AlignedTeethVisual",
      overlay: "gradient-bottom",
    },
    whatToExpect: {
      images: [D3.alignedModel, STOCK.happyPatient],
      effect: "fade-zoom",
      fallbackComponent: "RetainerVisual",
      overlay: "gradient-bottom",
    },
  },

  {
    treatmentId: "expander",
    problem: {
      images: [D3.crowdingMisaligned],
      effect: "ken-burns-in",
      fallbackComponent: "CrowdingVisual",
      overlay: "dark",
    },
    treatment: {
      images: [D3.jawBracesProfile, D3.jawBracesFront],
      effect: "pan-left",
      fallbackComponent: "BracesVisual",
      overlay: "dark",
    },
    outcome: {
      images: [D3.alignedModel],
      effect: "ken-burns-out",
      fallbackComponent: "AlignedTeethVisual",
      overlay: "gradient-bottom",
    },
    whatToExpect: {
      images: [D3.alignedModel, STOCK.happyPatient],
      effect: "fade-zoom",
      fallbackComponent: "RetainerVisual",
      overlay: "gradient-bottom",
    },
  },

  {
    treatmentId: "jaw_surgery",
    problem: {
      images: [D3.jawBracesProfile],
      effect: "ken-burns-in",
      fallbackComponent: "UnderbiteVisual",
      overlay: "dark",
    },
    treatment: {
      images: [D3.jawBracesFront, D3.jawBracesProfile],
      effect: "pan-right",
      fallbackComponent: "BracesVisual",
      overlay: "dark",
    },
    outcome: {
      images: [D3.alignedModel, D3.perfectResult],
      effect: "ken-burns-out",
      fallbackComponent: "AlignedTeethVisual",
      overlay: "gradient-bottom",
    },
    deepDive: {
      images: [D3.jawBracesProfile, D3.jawBracesFront],
      effect: "zoom-pulse",
      fallbackComponent: "UnderbiteVisual",
      overlay: "dark",
    },
    whatToExpect: {
      images: [D3.alignedModel, STOCK.happyPatient],
      effect: "fade-zoom",
      fallbackComponent: "RetainerVisual",
      overlay: "gradient-bottom",
    },
  },

  {
    treatmentId: "retainer",
    problem: {
      images: [D3.crowdingAligners],
      effect: "ken-burns-in",
      fallbackComponent: "CrowdingVisual",
      overlay: "gradient-bottom",
    },
    treatment: {
      images: [D3.clearAlignerOpen, D3.invisalignOnTeeth],
      effect: "pan-left",
      fallbackComponent: "InvisalignVisual",
      overlay: "dark",
    },
    outcome: {
      images: [D3.alignedModel, D3.perfectResult],
      effect: "ken-burns-out",
      fallbackComponent: "AlignedTeethVisual",
      overlay: "gradient-bottom",
    },
    whatToExpect: {
      images: [D3.clearAlignerOpen, D3.alignedModel],
      effect: "fade-zoom",
      fallbackComponent: "RetainerVisual",
      overlay: "gradient-bottom",
    },
  },

  {
    treatmentId: "lingual_braces",
    problem: {
      images: [D3.crowdingMisaligned],
      effect: "ken-burns-in",
      fallbackComponent: "CrowdingVisual",
      overlay: "gradient-bottom",
    },
    treatment: {
      images: [D3.jawBracesFront, D3.jawBracesProfile],
      effect: "pan-right",
      fallbackComponent: "BracesVisual",
      overlay: "dark",
    },
    outcome: {
      images: [D3.alignedModel, D3.perfectResult],
      effect: "ken-burns-out",
      fallbackComponent: "AlignedTeethVisual",
      overlay: "gradient-bottom",
    },
    whatToExpect: {
      images: [D3.alignedModel, STOCK.happyPatient],
      effect: "fade-zoom",
      fallbackComponent: "RetainerVisual",
      overlay: "gradient-bottom",
    },
  },

  {
    treatmentId: "dentures",
    problem: {
      images: [D3.implantDecayed, D3.toothExtraction],
      effect: "ken-burns-in",
      fallbackComponent: "MissingToothVisual",
      overlay: "dark",
    },
    treatment: {
      images: [D3.implantScrewCrown, D3.crownPlacement],
      effect: "pan-left",
      fallbackComponent: "ImplantVisual",
      overlay: "dark",
    },
    outcome: {
      images: [D3.perfectResult],
      effect: "ken-burns-out",
      fallbackComponent: "HealthyToothVisual",
      overlay: "gradient-bottom",
    },
    whatToExpect: {
      images: [D3.perfectResult, STOCK.happyPatient],
      effect: "fade-zoom",
      fallbackComponent: "HealthyToothVisual",
      overlay: "gradient-bottom",
    },
  },
];

// ---------------------------------------------------------------------------
// Registry: treatmentId → config
// ---------------------------------------------------------------------------

const registry = new Map<string, TreatmentVisualConfig>();
for (const cfg of configs) {
  registry.set(cfg.treatmentId, cfg);
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Get the visual config for a treatment. Returns undefined if no config
 * exists (scene should fall back to SVG-only rendering).
 */
export function getTreatmentVisualConfig(
  treatmentId: string
): TreatmentVisualConfig | undefined {
  return registry.get(treatmentId);
}

/**
 * Get the scene-specific visual config. Handles deepDive/whatToExpect
 * fallbacks automatically.
 */
export function getSceneVisualConfig(
  treatmentId: string,
  scene: "problem" | "treatment" | "outcome" | "deepDive" | "whatToExpect"
): SceneVisualConfig | undefined {
  const config = registry.get(treatmentId);
  if (!config) return undefined;

  switch (scene) {
    case "problem":
      return config.problem;
    case "treatment":
      return config.treatment;
    case "outcome":
      return config.outcome;
    case "deepDive":
      return config.deepDive ?? config.problem;
    case "whatToExpect":
      return config.whatToExpect ?? config.outcome;
    default:
      return undefined;
  }
}

/**
 * Get the primary image path for a scene. Returns the first image in
 * the config's image array, or undefined if none exist.
 */
export function getPrimaryImage(
  treatmentId: string,
  scene: "problem" | "treatment" | "outcome" | "deepDive" | "whatToExpect"
): string | undefined {
  const sceneConfig = getSceneVisualConfig(treatmentId, scene);
  return sceneConfig?.images[0];
}

/**
 * Check if a treatment has image assets configured for a given scene.
 */
export function hasImageAssets(
  treatmentId: string,
  scene: "problem" | "treatment" | "outcome" | "deepDive" | "whatToExpect"
): boolean {
  const sceneConfig = getSceneVisualConfig(treatmentId, scene);
  return (sceneConfig?.images.length ?? 0) > 0;
}

/**
 * Get all configured treatment IDs.
 */
export function getAllConfiguredTreatments(): string[] {
  return Array.from(registry.keys());
}
