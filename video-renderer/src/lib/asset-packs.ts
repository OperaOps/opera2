// ---------------------------------------------------------------------------
// Treatment Asset Pack System
// Manages visual assets (MP4 clips, images, before/after photos) for each
// treatment type, organized by specialty. Assets are resolved at render time
// with SVG fallbacks when real files haven't been placed yet.
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type AssetType = "mp4" | "image" | "before_after_pair";

export interface Asset {
  id: string;
  type: AssetType;
  path: string; // Relative path from video-renderer/public/assets/
  description: string;
  scene:
    | "problem"
    | "treatment"
    | "outcome"
    | "process"
    | "comparison"
    | "general";
  priority: number; // 1 = primary, 2 = secondary, 3 = supplementary
  duration?: number; // For MP4 clips, in seconds
}

export interface BeforeAfterPair {
  id: string;
  beforePath: string;
  afterPath: string;
  description: string;
  isStock: boolean; // vs. patient-uploaded
}

export interface AssetPack {
  treatmentId: string;
  specialty: "dental" | "orthodontic";
  displayName: string;
  assets: Asset[];
  beforeAfterPairs: BeforeAfterPair[];
  fallbackVisual: "svg" | "stock_photo";
  metadata: {
    hasMP4: boolean;
    hasImages: boolean;
    hasBeforeAfter: boolean;
    sceneOrder: string[];
    availableVisualTypes: AssetType[];
  };
}

export interface AssetPackRegistry {
  dental: Record<string, AssetPack>;
  orthodontic: Record<string, AssetPack>;
}

// ---------------------------------------------------------------------------
// Stock photo mapping
// Maps stock photos from video-renderer/public/stock/ to treatments
// intelligently based on content relevance.
// ---------------------------------------------------------------------------

interface StockPhotoMapping {
  before: string;
  after: string;
}

const STOCK_PHOTO_MAP: Record<string, StockPhotoMapping> = {
  // --- Dental ---
  crown: {
    before: "stock/dental-exam-before.jpg",
    after: "stock/dental-restoration.jpg",
  },
  filling: {
    before: "stock/dental-checkup.jpg",
    after: "stock/dental-restoration.jpg",
  },
  root_canal: {
    before: "stock/dental-tools-mouth.jpg",
    after: "stock/happy-dental-patient.jpg",
  },
  implant: {
    before: "stock/implant-model.jpg",
    after: "stock/perfect-smile.jpg",
  },
  extraction: {
    before: "stock/dental-tools-mouth.jpg",
    after: "stock/dental-patient.jpg",
  },
  bridge: {
    before: "stock/dental-exam-before.jpg",
    after: "stock/smile-after.jpg",
  },
  veneers: {
    before: "stock/smile-closeup.jpg",
    after: "stock/perfect-smile.jpg",
  },
  whitening: {
    before: "stock/whitening-procedure.jpg",
    after: "stock/smile-after-2.jpg",
  },
  gum_treatment: {
    before: "stock/dental-checkup.jpg",
    after: "stock/happy-dental-patient.jpg",
  },
  dentures: {
    before: "stock/dental-patient.jpg",
    after: "stock/smile-after.jpg",
  },

  // --- Orthodontic ---
  braces: {
    before: "stock/braces-before.jpg",
    after: "stock/perfect-smile.jpg",
  },
  invisalign: {
    before: "stock/smile-closeup.jpg",
    after: "stock/smile-after-2.jpg",
  },
  ceramic_braces: {
    before: "stock/braces-before.jpg",
    after: "stock/smile-after.jpg",
  },
  lingual_braces: {
    before: "stock/braces-before.jpg",
    after: "stock/smile-after-2.jpg",
  },
  expander: {
    before: "stock/dental-exam-before.jpg",
    after: "stock/happy-dental-patient.jpg",
  },
  jaw_surgery: {
    before: "stock/dental-patient.jpg",
    after: "stock/happy-dental-patient.jpg",
  },
  retainer: {
    before: "stock/smile-closeup.jpg",
    after: "stock/perfect-smile.jpg",
  },
};

// ---------------------------------------------------------------------------
// Helper to build an asset pack for a treatment
// ---------------------------------------------------------------------------

function buildAssetPack(
  treatmentId: string,
  specialty: "dental" | "orthodontic",
  displayName: string,
  processSteps: string[],
  outcomeDescriptions: string[],
  beforeAfterDesc: string,
  mp4Desc?: string
): AssetPack {
  const basePath = `assets/${specialty}/${treatmentId}`;

  const assets: Asset[] = [];

  // Process images (2-3 per treatment)
  processSteps.forEach((desc, i) => {
    assets.push({
      id: `${treatmentId}-process-${i + 1}`,
      type: "image",
      path: `${basePath}/process-${i + 1}.jpg`,
      description: desc,
      scene: i === 0 ? "problem" : "process",
      priority: i === 0 ? 1 : 2,
    });
  });

  // Outcome images (1-2 per treatment)
  outcomeDescriptions.forEach((desc, i) => {
    assets.push({
      id: `${treatmentId}-outcome-${i + 1}`,
      type: "image",
      path: `${basePath}/outcome-${i + 1}.jpg`,
      description: desc,
      scene: "outcome",
      priority: i === 0 ? 1 : 2,
    });
  });

  // Optional MP4 clip
  if (mp4Desc) {
    assets.push({
      id: `${treatmentId}-clip`,
      type: "mp4",
      path: `${basePath}/${treatmentId}-overview.mp4`,
      description: mp4Desc,
      scene: "treatment",
      priority: 1,
      duration: 8,
    });
  }

  // Stock-based before/after pair
  const stock = STOCK_PHOTO_MAP[treatmentId];
  const beforeAfterPairs: BeforeAfterPair[] = [
    {
      id: `${treatmentId}-ba-stock`,
      beforePath: stock?.before ?? "stock/dental-exam-before.jpg",
      afterPath: stock?.after ?? "stock/smile-after.jpg",
      description: beforeAfterDesc,
      isStock: true,
    },
  ];

  const hasMP4 = assets.some((a) => a.type === "mp4");
  const availableVisualTypes: AssetType[] = ["image"];
  if (hasMP4) availableVisualTypes.push("mp4");
  availableVisualTypes.push("before_after_pair");

  return {
    treatmentId,
    specialty,
    displayName,
    assets,
    beforeAfterPairs,
    fallbackVisual: "svg",
    metadata: {
      hasMP4,
      hasImages: true,
      hasBeforeAfter: true,
      sceneOrder: ["problem", "process", "treatment", "outcome", "comparison"],
      availableVisualTypes,
    },
  };
}

// ---------------------------------------------------------------------------
// Dental Asset Packs
// ---------------------------------------------------------------------------

const dentalPacks: Record<string, AssetPack> = {
  crown: buildAssetPack(
    "crown",
    "dental",
    "Dental Crown",
    [
      "3D render of damaged/decayed tooth requiring crown",
      "Tooth preparation and shaping for crown placement",
      "Crown being fitted over prepared tooth",
    ],
    [
      "Completed crown restoration — natural-looking tooth",
      "Cross-section showing crown seated on prepared tooth",
    ],
    "Damaged tooth before vs. restored crown after",
    "3D animation of crown placement procedure"
  ),

  filling: buildAssetPack(
    "filling",
    "dental",
    "Dental Filling",
    [
      "Tooth cross-section showing cavity and decay area",
      "Decay removal and tooth preparation",
      "Composite filling material being placed and shaped",
    ],
    [
      "Restored tooth with color-matched filling",
      "Comparison of filled tooth vs. healthy tooth structure",
    ],
    "Decayed tooth before vs. filled and restored after"
  ),

  root_canal: buildAssetPack(
    "root_canal",
    "dental",
    "Root Canal Treatment",
    [
      "Cross-section showing infected pulp and inflamed nerve",
      "Pulp removal and canal cleaning with endodontic files",
      "Canal filling with gutta-percha and crown placement",
    ],
    [
      "Completed root canal with permanent restoration",
      "X-ray style view showing properly sealed canals",
    ],
    "Infected tooth with abscess before vs. treated and crowned after",
    "3D animation of root canal procedure start to finish"
  ),

  implant: buildAssetPack(
    "implant",
    "dental",
    "Dental Implant",
    [
      "Missing tooth site with visible bone and gum tissue",
      "Titanium implant post being placed into jawbone",
      "Abutment attachment and crown fitting on implant",
    ],
    [
      "Final implant with crown — indistinguishable from natural teeth",
      "Cross-section showing osseointegrated implant in jawbone",
    ],
    "Missing tooth gap before vs. completed implant restoration after",
    "3D animation of full implant placement process"
  ),

  extraction: buildAssetPack(
    "extraction",
    "dental",
    "Tooth Extraction",
    [
      "Damaged/impacted tooth requiring extraction",
      "Extraction procedure showing tooth being loosened",
      "Clean extraction site with initial healing",
    ],
    [
      "Healed extraction site",
      "Post-extraction options: implant, bridge, or natural closure",
    ],
    "Problematic tooth before vs. healed extraction site after"
  ),

  bridge: buildAssetPack(
    "bridge",
    "dental",
    "Dental Bridge",
    [
      "Missing tooth with adjacent teeth that will serve as abutments",
      "Abutment teeth prepared and shaped for bridge anchors",
      "Three-unit bridge being seated over prepared teeth",
    ],
    [
      "Completed bridge restoring smile continuity",
      "Underside view showing pontic spanning the gap",
    ],
    "Missing tooth gap before vs. bridged restoration after"
  ),

  veneers: buildAssetPack(
    "veneers",
    "dental",
    "Porcelain Veneers",
    [
      "Teeth with discoloration, chips, or uneven alignment",
      "Minimal tooth preparation — thin layer of enamel removed",
      "Custom veneers being bonded to tooth surfaces",
    ],
    [
      "Completed veneer set — bright, uniform, natural-looking smile",
    ],
    "Stained/chipped teeth before vs. flawless veneer smile after",
    "3D animation of veneer bonding process"
  ),

  whitening: buildAssetPack(
    "whitening",
    "dental",
    "Teeth Whitening",
    [
      "Teeth showing staining and discoloration",
      "Professional whitening gel application with protective barriers",
    ],
    [
      "Brightened smile showing multiple shades of improvement",
      "Shade guide comparison demonstrating whitening results",
    ],
    "Stained teeth before vs. whitened smile after"
  ),

  gum_treatment: buildAssetPack(
    "gum_treatment",
    "dental",
    "Gum Treatment",
    [
      "Inflamed, receding gums with visible plaque and tartar",
      "Scaling and root planing procedure below the gumline",
      "Deep cleaning of periodontal pockets",
    ],
    [
      "Healthy, pink gum tissue after treatment",
      "Reduced pocket depth and reattached gum tissue",
    ],
    "Inflamed, bleeding gums before vs. healthy pink tissue after"
  ),

  dentures: buildAssetPack(
    "dentures",
    "dental",
    "Dentures",
    [
      "Multiple missing teeth or failing dentition",
      "Impressions and custom denture fabrication",
      "Denture fitting and bite adjustment",
    ],
    [
      "Complete denture restoring full smile and function",
      "Natural-looking denture with proper gum contouring",
    ],
    "Missing/failing teeth before vs. complete denture smile after"
  ),
};

// ---------------------------------------------------------------------------
// Orthodontic Asset Packs
// ---------------------------------------------------------------------------

const orthodonticPacks: Record<string, AssetPack> = {
  braces: buildAssetPack(
    "braces",
    "orthodontic",
    "Traditional Braces",
    [
      "Misaligned teeth — crowding, spacing, or bite issues",
      "Metal brackets bonded to teeth with archwire threaded through",
      "Progressive tooth movement stages over treatment",
    ],
    [
      "Straight, properly aligned teeth after braces removal",
      "Balanced bite and improved jaw alignment",
    ],
    "Crowded/misaligned teeth before vs. straight smile after braces",
    "3D animation showing teeth gradually moving into alignment"
  ),

  invisalign: buildAssetPack(
    "invisalign",
    "orthodontic",
    "Invisalign Clear Aligners",
    [
      "Misaligned teeth scanned for custom aligner fabrication",
      "Clear aligner tray seated over teeth — nearly invisible",
      "Sequential aligner stages showing progressive correction",
    ],
    [
      "Perfectly aligned smile after final aligner stage",
    ],
    "Misaligned teeth before vs. aligned smile after Invisalign",
    "3D animation of teeth moving through aligner stages"
  ),

  ceramic_braces: buildAssetPack(
    "ceramic_braces",
    "orthodontic",
    "Ceramic Braces",
    [
      "Misaligned teeth requiring orthodontic correction",
      "Tooth-colored ceramic brackets bonded with aesthetic archwire",
      "Close-up showing discreet bracket appearance vs. metal",
    ],
    [
      "Straight teeth after ceramic braces — no bracket staining",
      "Final aligned result with retainer recommendation",
    ],
    "Crooked teeth before vs. aligned smile after ceramic braces"
  ),

  lingual_braces: buildAssetPack(
    "lingual_braces",
    "orthodontic",
    "Lingual Braces",
    [
      "Teeth requiring alignment correction from a hidden approach",
      "Custom brackets bonded to the tongue-side (lingual) surface",
      "Inside view showing lingual bracket and wire system",
    ],
    [
      "Aligned teeth with no visible brackets from the front",
    ],
    "Misaligned teeth before vs. invisibly corrected smile after"
  ),

  expander: buildAssetPack(
    "expander",
    "orthodontic",
    "Palatal Expander",
    [
      "Narrow upper jaw causing crossbite or crowding",
      "Expander appliance fitted to upper molars spanning the palate",
      "Gradual palatal expansion — midline suture widening",
    ],
    [
      "Widened upper arch with corrected crossbite",
      "Properly aligned upper and lower jaw relationship",
    ],
    "Narrow arch with crossbite before vs. expanded arch after"
  ),

  jaw_surgery: buildAssetPack(
    "jaw_surgery",
    "orthodontic",
    "Orthognathic (Jaw) Surgery",
    [
      "Skeletal jaw imbalance — Class II or Class III malocclusion",
      "Surgical plan showing osteotomy cuts and repositioning",
      "Jaw fixation with titanium plates and screws",
    ],
    [
      "Balanced facial profile with corrected jaw alignment",
      "Functional bite restoration and improved airway",
    ],
    "Jaw misalignment before vs. corrected profile after surgery",
    "3D animation of jaw repositioning and fixation"
  ),

  retainer: buildAssetPack(
    "retainer",
    "orthodontic",
    "Retainer",
    [
      "Recently straightened teeth at risk of relapse",
      "Custom retainer (clear or Hawley) fitted to maintain alignment",
    ],
    [
      "Maintained straight teeth with long-term retainer use",
      "Comparison: retained teeth vs. relapse without retainer",
    ],
    "Straight teeth maintained with retainer vs. relapse risk without"
  ),
};

// ---------------------------------------------------------------------------
// Asset Pack Registry
// ---------------------------------------------------------------------------

export const assetPackRegistry: AssetPackRegistry = {
  dental: dentalPacks,
  orthodontic: orthodonticPacks,
};

// ---------------------------------------------------------------------------
// Lookup helpers
// ---------------------------------------------------------------------------

/**
 * Get asset pack for a treatment by searching both specialties.
 */
export function getAssetPack(treatmentId: string): AssetPack | undefined {
  return (
    assetPackRegistry.dental[treatmentId] ??
    assetPackRegistry.orthodontic[treatmentId]
  );
}

/**
 * Get the best visual asset for a specific scene within a treatment.
 * Returns the highest-priority (lowest number) asset matching the scene.
 * Falls back to "general" scene assets if no exact match.
 */
export function getBestAsset(
  treatmentId: string,
  scene: string
): Asset | undefined {
  const pack = getAssetPack(treatmentId);
  if (!pack) return undefined;

  // Exact scene match, sorted by priority ascending
  const sceneAssets = pack.assets
    .filter((a) => a.scene === scene)
    .sort((a, b) => a.priority - b.priority);

  if (sceneAssets.length > 0) return sceneAssets[0];

  // Fallback: "general" scene assets
  const generalAssets = pack.assets
    .filter((a) => a.scene === "general")
    .sort((a, b) => a.priority - b.priority);

  return generalAssets[0];
}

/**
 * Get before/after pair for a treatment.
 * If patient-uploaded photos are provided, they take priority over stock.
 */
export function getBeforeAfterPair(
  treatmentId: string,
  patientBefore?: string,
  patientAfter?: string
): BeforeAfterPair {
  // Patient uploads always override stock
  if (patientBefore && patientAfter) {
    return {
      id: `${treatmentId}-ba-patient`,
      beforePath: patientBefore,
      afterPath: patientAfter,
      description: "Patient-provided before and after photos",
      isStock: false,
    };
  }

  // Look for stock pair in the asset pack
  const pack = getAssetPack(treatmentId);
  if (pack && pack.beforeAfterPairs.length > 0) {
    return pack.beforeAfterPairs[0];
  }

  // Ultimate fallback using stock photo map
  const stock = STOCK_PHOTO_MAP[treatmentId] ?? {
    before: "stock/dental-exam-before.jpg",
    after: "stock/smile-after.jpg",
  };

  return {
    id: `${treatmentId}-ba-fallback`,
    beforePath: stock.before,
    afterPath: stock.after,
    description: "Stock before and after comparison",
    isStock: true,
  };
}

/**
 * Check if real (non-placeholder) assets exist for a treatment.
 * Currently returns false for all treatments since we're bootstrapping
 * with placeholder paths. This should check the filesystem at build time
 * or use a manifest once real assets are placed.
 */
export function hasRealAssets(_treatmentId: string): boolean {
  // All asset packs currently use placeholder paths.
  // When real assets are placed in public/assets/{specialty}/{treatment}/,
  // this function should verify file existence via a build-time manifest
  // or runtime check.
  return false;
}

/**
 * Get stock photo paths for a treatment (fallback when no real assets exist).
 * These reference actual files in video-renderer/public/stock/.
 */
export function getStockPhotos(treatmentId: string): {
  before: string;
  after: string;
} {
  const mapping = STOCK_PHOTO_MAP[treatmentId];
  if (mapping) return { ...mapping };

  // Default fallback for unknown treatments
  return {
    before: "stock/dental-exam-before.jpg",
    after: "stock/smile-after.jpg",
  };
}

// ---------------------------------------------------------------------------
// Utility: get all treatments for a specialty
// ---------------------------------------------------------------------------

export function getTreatmentsBySpecialty(
  specialty: "dental" | "orthodontic"
): AssetPack[] {
  return Object.values(assetPackRegistry[specialty]);
}

/**
 * Get all treatment IDs across both specialties.
 */
export function getAllTreatmentIds(): string[] {
  return [
    ...Object.keys(assetPackRegistry.dental),
    ...Object.keys(assetPackRegistry.orthodontic),
  ];
}

/**
 * Resolve the best visual strategy for a given treatment.
 * Returns "asset_pack" if real assets exist, "stock_photo" if stock photos
 * are mapped, or "svg" as the final fallback.
 */
export function resolveVisualStrategy(
  treatmentId: string
): "asset_pack" | "stock_photo" | "svg" {
  if (hasRealAssets(treatmentId)) return "asset_pack";

  const stock = STOCK_PHOTO_MAP[treatmentId];
  if (stock) return "stock_photo";

  return "svg";
}
