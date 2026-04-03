import React from "react";

// =============================================================================
// PREMIUM COLOR PALETTE
// =============================================================================

export const PREMIUM_COLORS = {
  enamelLight: "#fffef8",
  enamelMid: "#f0ead8",
  enamelShadow: "#d8d0b8",
  dentinColor: "#f8ecd0",
  gumHealthy: "#e8a0a0",
  gumLight: "#f0b8b8",
  gumDark: "#c07878",
  gumPapilla: "#d89090",
  boneColor: "#e8dcc8",
  bracketColor: "#c8c8d4",
  wireColor: "#b0b0bc",
  alignerFill: "rgba(200, 215, 255, 0.15)",
  alignerStroke: "rgba(180, 195, 240, 0.35)",
} as const;

// =============================================================================
// TOOTH TYPE DEFINITIONS
// =============================================================================

export type ToothType =
  | "central_incisor"
  | "lateral_incisor"
  | "canine"
  | "premolar"
  | "molar";

export type ArchType = "upper" | "lower";

export type OrthoCondition = "crowding" | "spacing" | "overbite" | "underbite";

export type ApplianceType = "braces" | "invisalign";

// =============================================================================
// ANATOMICALLY CORRECT SVG PATH DATA
// =============================================================================

/**
 * Each tooth definition contains SVG paths for:
 * - crown: the visible portion above the gumline with anatomical contours
 * - cervicalLine: the CEJ (cemento-enamel junction) boundary
 * - roots: one or more root paths (single, bifurcated, or trifurcated)
 * - cusps: optional cusp detail paths for occlusal surface
 * - fissures: optional fissure lines for premolars/molars
 *
 * All paths are defined in a local coordinate system centered at (0, 0)
 * at the CEJ. Crown extends upward (negative Y), roots extend downward.
 * Buccal (labial) face is the "front" view.
 */

interface ToothPathData {
  crown: string;
  crownOutline: string;
  cervicalLine: string;
  roots: string[];
  pulpChamber: string;
  pulpCanals: string[];
  cusps?: string[];
  fissures?: string[];
  /** Approximate width of the crown at its widest */
  crownWidth: number;
  /** Approximate height from cusp tip to CEJ */
  crownHeight: number;
  /** Approximate length from CEJ to root apex */
  rootLength: number;
}

export const TOOTH_ANATOMY: Record<ToothType, ToothPathData> = {
  // ---------------------------------------------------------------------------
  // CENTRAL INCISOR
  // Flat incisal edge with slight mamelons, wide labial surface, single root
  // ---------------------------------------------------------------------------
  central_incisor: {
    crown:
      // Labial view: wide flat incisal edge with 3 subtle mamelons
      "M-16,-48 " +
      // Incisal edge with mamelon undulations
      "C-14,-50 -8,-51 -5,-50 C-3,-51 -1,-52 0,-51 C1,-52 3,-51 5,-50 C8,-51 14,-50 16,-48 " +
      // Right mesial surface
      "C18,-44 19,-36 19,-28 C19,-18 18,-8 17,0 " +
      // CEJ right
      "C12,2 6,3 0,3 C-6,3 -12,2 -17,0 " +
      // Left distal surface
      "C-18,-8 -19,-18 -19,-28 C-19,-36 -18,-44 -16,-48 Z",
    crownOutline:
      "M-16,-48 C-14,-50 -8,-51 -5,-50 C-3,-51 -1,-52 0,-51 C1,-52 3,-51 5,-50 C8,-51 14,-50 16,-48 " +
      "C18,-44 19,-36 19,-28 C19,-18 18,-8 17,0 " +
      "C12,2 6,3 0,3 C-6,3 -12,2 -17,0 " +
      "C-18,-8 -19,-18 -19,-28 C-19,-36 -18,-44 -16,-48 Z",
    cervicalLine:
      "M-17,0 C-12,2 -6,3 0,3 C6,3 12,2 17,0",
    roots: [
      // Single conical root with slight distal curvature
      "M-8,0 C-9,10 -10,25 -9,40 C-8,55 -7,70 -5,82 " +
      "C-3,90 -1,94 0,95 C1,94 3,90 5,82 " +
      "C7,70 8,55 9,40 C10,25 9,10 8,0 Z",
    ],
    pulpChamber:
      "M-6,-35 C-6,-28 -5,-15 -5,-5 L5,-5 C5,-15 6,-28 6,-35 " +
      "C6,-40 4,-44 0,-44 C-4,-44 -6,-40 -6,-35 Z",
    pulpCanals: [
      "M-3,-5 C-3,15 -2,40 -1,65 C0,78 0,88 0,92 " +
      "C0,88 0,78 1,65 C2,40 3,15 3,-5 Z",
    ],
    crownWidth: 38,
    crownHeight: 55,
    rootLength: 95,
  },

  // ---------------------------------------------------------------------------
  // LATERAL INCISOR
  // Slightly smaller and more rounded than central, single root
  // ---------------------------------------------------------------------------
  lateral_incisor: {
    crown:
      "M-13,-42 " +
      // Rounded incisal edge
      "C-11,-45 -6,-47 -3,-46 C-1,-47 1,-47 3,-46 C6,-47 11,-45 13,-42 " +
      // Right surface (more rounded contour)
      "C15,-37 16,-30 16,-22 C16,-14 15,-6 14,0 " +
      // CEJ
      "C10,2 5,2.5 0,2.5 C-5,2.5 -10,2 -14,0 " +
      // Left surface
      "C-15,-6 -16,-14 -16,-22 C-16,-30 -15,-37 -13,-42 Z",
    crownOutline:
      "M-13,-42 C-11,-45 -6,-47 -3,-46 C-1,-47 1,-47 3,-46 C6,-47 11,-45 13,-42 " +
      "C15,-37 16,-30 16,-22 C16,-14 15,-6 14,0 " +
      "C10,2 5,2.5 0,2.5 C-5,2.5 -10,2 -14,0 " +
      "C-15,-6 -16,-14 -16,-22 C-16,-30 -15,-37 -13,-42 Z",
    cervicalLine:
      "M-14,0 C-10,2 -5,2.5 0,2.5 C5,2.5 10,2 14,0",
    roots: [
      "M-6,0 C-7,8 -7,22 -6,36 C-5,50 -4,62 -3,72 " +
      "C-2,78 -1,82 0,83 C1,82 2,78 3,72 " +
      "C4,62 5,50 6,36 C7,22 7,8 6,0 Z",
    ],
    pulpChamber:
      "M-5,-30 C-5,-24 -4,-12 -4,-4 L4,-4 C4,-12 5,-24 5,-30 " +
      "C5,-36 3,-40 0,-40 C-3,-40 -5,-36 -5,-30 Z",
    pulpCanals: [
      "M-2.5,-4 C-2.5,12 -2,34 -1,56 C-0.5,70 0,78 0,80 " +
      "C0,78 0.5,70 1,56 C2,34 2.5,12 2.5,-4 Z",
    ],
    crownWidth: 32,
    crownHeight: 49,
    rootLength: 83,
  },

  // ---------------------------------------------------------------------------
  // CANINE
  // Prominent pointed cusp, longer root, diamond-shaped cross section
  // ---------------------------------------------------------------------------
  canine: {
    crown:
      "M-14,-50 " +
      // Pointed cusp tip
      "C-10,-54 -4,-58 0,-60 C4,-58 10,-54 14,-50 " +
      // Right mesial surface — prominent labial ridge
      "C17,-42 18,-32 18,-22 C18,-12 17,-4 16,0 " +
      // CEJ
      "C11,2 5,3 0,3 C-5,3 -11,2 -16,0 " +
      // Left distal surface
      "C-17,-4 -18,-12 -18,-22 C-18,-32 -17,-42 -14,-50 Z",
    crownOutline:
      "M-14,-50 C-10,-54 -4,-58 0,-60 C4,-58 10,-54 14,-50 " +
      "C17,-42 18,-32 18,-22 C18,-12 17,-4 16,0 " +
      "C11,2 5,3 0,3 C-5,3 -11,2 -16,0 " +
      "C-17,-4 -18,-12 -18,-22 C-18,-32 -17,-42 -14,-50 Z",
    cervicalLine:
      "M-16,0 C-11,2 -5,3 0,3 C5,3 11,2 16,0",
    roots: [
      // Long single root — longest of all teeth
      "M-8,0 C-9,12 -10,30 -9,48 C-8,66 -6,84 -5,98 " +
      "C-3,108 -1,114 0,116 C1,114 3,108 5,98 " +
      "C6,84 8,66 9,48 C10,30 9,12 8,0 Z",
    ],
    pulpChamber:
      "M-6,-40 C-5,-32 -5,-18 -5,-5 L5,-5 C5,-18 5,-32 6,-40 " +
      "C5,-48 3,-54 0,-56 C-3,-54 -5,-48 -6,-40 Z",
    pulpCanals: [
      "M-3,-5 C-3,18 -2,46 -1,74 C-0.5,92 0,108 0,113 " +
      "C0,108 0.5,92 1,74 C2,46 3,18 3,-5 Z",
    ],
    crownWidth: 36,
    crownHeight: 63,
    rootLength: 116,
  },

  // ---------------------------------------------------------------------------
  // PREMOLAR (BICUSPID)
  // Two cusps — buccal (taller) and lingual, single or bifurcated root
  // ---------------------------------------------------------------------------
  premolar: {
    crown:
      "M-15,-40 " +
      // Buccal cusp (taller)
      "C-12,-44 -7,-47 -5,-46 " +
      // Central fissure dip
      "C-3,-44 -1,-42 0,-43 C1,-42 3,-44 5,-46 " +
      // Lingual cusp
      "C7,-47 12,-44 15,-40 " +
      // Right surface
      "C17,-34 18,-24 18,-16 C18,-8 17,-2 16,0 " +
      // CEJ
      "C11,2 5,2.5 0,2.5 C-5,2.5 -11,2 -16,0 " +
      // Left surface
      "C-17,-2 -18,-8 -18,-16 C-18,-24 -17,-34 -15,-40 Z",
    crownOutline:
      "M-15,-40 C-12,-44 -7,-47 -5,-46 " +
      "C-3,-44 -1,-42 0,-43 C1,-42 3,-44 5,-46 " +
      "C7,-47 12,-44 15,-40 " +
      "C17,-34 18,-24 18,-16 C18,-8 17,-2 16,0 " +
      "C11,2 5,2.5 0,2.5 C-5,2.5 -11,2 -16,0 " +
      "C-17,-2 -18,-8 -18,-16 C-18,-24 -17,-34 -15,-40 Z",
    cervicalLine:
      "M-16,0 C-11,2 -5,2.5 0,2.5 C5,2.5 11,2 16,0",
    roots: [
      // Buccal root
      "M-7,0 C-8,8 -9,20 -9,34 C-9,48 -8,60 -6,70 " +
      "C-5,76 -3,80 -2,81 C-1,80 0,76 0,70 " +
      "C0,60 -1,48 -1,34 C-1,20 0,8 0,0 Z",
      // Lingual root (slightly shorter)
      "M0,0 C0,8 1,20 1,32 C1,44 2,55 3,64 " +
      "C4,70 5,74 6,75 C7,74 8,70 8,64 " +
      "C9,55 9,44 9,32 C9,20 8,8 7,0 Z",
    ],
    pulpChamber:
      "M-7,-32 C-7,-26 -6,-16 -6,-4 L6,-4 C6,-16 7,-26 7,-32 " +
      "C7,-38 4,-42 0,-42 C-4,-42 -7,-38 -7,-32 Z",
    pulpCanals: [
      // Buccal canal
      "M-4,-4 C-4,10 -5,26 -5,44 C-5,58 -4,70 -3,78 " +
      "C-3,70 -2,58 -2,44 C-2,26 -1,10 -1,-4 Z",
      // Lingual canal
      "M1,-4 C1,10 2,24 2,40 C2,52 3,62 4,70 " +
      "C5,62 5,52 5,40 C5,24 4,10 4,-4 Z",
    ],
    cusps: [
      // Buccal cusp highlight
      "M-12,-42 C-9,-46 -5,-46 -5,-46 L-3,-42 C-3,-42 -8,-42 -12,-42 Z",
      // Lingual cusp highlight
      "M5,-46 C8,-46 12,-42 12,-42 L3,-42 C3,-42 5,-46 5,-46 Z",
    ],
    fissures: [
      "M-3,-43 C-2,-41 -1,-42 0,-43 C1,-42 2,-41 3,-43",
    ],
    crownWidth: 36,
    crownHeight: 49,
    rootLength: 81,
  },

  // ---------------------------------------------------------------------------
  // MOLAR
  // 4-5 cusps with fissure pattern, wide crown, bifurcated/trifurcated roots
  // ---------------------------------------------------------------------------
  molar: {
    crown:
      "M-20,-38 " +
      // Mesio-buccal cusp
      "C-17,-42 -12,-45 -10,-44 " +
      // Buccal groove
      "C-8,-42 -5,-40 -3,-41 " +
      // Disto-buccal cusp
      "C-1,-40 3,-42 5,-44 C8,-45 12,-44 14,-42 " +
      // Distal surface
      "C18,-40 20,-38 22,-32 C23,-26 23,-18 22,-10 C22,-4 21,-1 20,0 " +
      // Disto-lingual cusp area
      "C16,2 10,3 5,3 " +
      // Lingual groove
      "C2,3 0,2.5 -2,3 " +
      // Mesio-lingual cusp area
      "C-8,3 -14,2 -20,0 " +
      // Mesial surface
      "C-21,-1 -22,-4 -22,-10 C-23,-18 -23,-26 -22,-32 C-21,-36 -20,-38 -20,-38 Z",
    crownOutline:
      "M-20,-38 C-17,-42 -12,-45 -10,-44 " +
      "C-8,-42 -5,-40 -3,-41 C-1,-40 3,-42 5,-44 C8,-45 12,-44 14,-42 " +
      "C18,-40 20,-38 22,-32 C23,-26 23,-18 22,-10 C22,-4 21,-1 20,0 " +
      "C16,2 10,3 5,3 C2,3 0,2.5 -2,3 C-8,3 -14,2 -20,0 " +
      "C-21,-1 -22,-4 -22,-10 C-23,-18 -23,-26 -22,-32 C-21,-36 -20,-38 -20,-38 Z",
    cervicalLine:
      "M-20,0 C-14,2 -8,3 -2,3 C0,2.5 2,3 5,3 C10,3 16,2 20,0",
    roots: [
      // Mesio-buccal root
      "M-16,0 C-17,8 -18,20 -18,34 C-18,48 -17,60 -15,72 " +
      "C-14,80 -12,86 -11,88 C-10,86 -9,80 -9,72 " +
      "C-8,60 -8,48 -8,34 C-8,20 -9,8 -9,0 Z",
      // Disto-buccal root
      "M8,0 C8,8 8,20 8,32 C8,44 9,54 10,64 " +
      "C11,70 12,74 13,76 C14,74 15,70 16,64 " +
      "C17,54 17,44 17,32 C17,20 16,8 16,0 Z",
      // Palatal/lingual root (longest, diverges lingually)
      "M-4,0 C-5,10 -6,24 -5,40 C-4,56 -2,72 -1,84 " +
      "C0,92 1,96 2,98 C3,96 4,92 4,84 " +
      "C5,72 5,56 5,40 C5,24 4,10 4,0 Z",
    ],
    pulpChamber:
      "M-12,-28 C-12,-22 -11,-12 -10,-3 L10,-3 C11,-12 12,-22 12,-28 " +
      "C12,-34 8,-40 0,-40 C-8,-40 -12,-34 -12,-28 Z",
    pulpCanals: [
      // Mesio-buccal canal
      "M-12,-3 C-12,10 -13,24 -14,42 C-14,58 -13,72 -12,82 " +
      "C-12,72 -11,58 -11,42 C-10,24 -10,10 -9,-3 Z",
      // Disto-buccal canal
      "M9,-3 C9,10 9,22 10,36 C10,48 11,58 12,66 " +
      "C13,58 13,48 13,36 C13,22 12,10 12,-3 Z",
      // Palatal canal
      "M-2,-3 C-2,12 -3,28 -3,46 C-2,64 -1,78 0,90 " +
      "C1,78 2,64 2,46 C3,28 2,12 2,-3 Z",
    ],
    cusps: [
      // Mesio-buccal cusp
      "M-18,-36 C-15,-42 -11,-44 -10,-44 L-8,-40 L-12,-36 Z",
      // Disto-buccal cusp
      "M3,-40 C5,-44 9,-44 10,-42 L12,-38 L6,-38 Z",
      // Mesio-lingual cusp
      "M-16,-34 C-14,-36 -10,-38 -8,-37 L-10,-33 Z",
      // Disto-lingual cusp
      "M6,-37 C9,-38 13,-36 14,-34 L10,-33 Z",
    ],
    fissures: [
      // Central pit and fissure pattern
      "M-10,-40 C-7,-38 -4,-39 -2,-38 C0,-37 2,-38 5,-40",
      "M-3,-40 C-3,-36 -2,-33 -2,-30",
    ],
    crownWidth: 45,
    crownHeight: 48,
    rootLength: 98,
  },
};

// =============================================================================
// ARCH GEOMETRY — tooth positions along the dental arch
// =============================================================================

/**
 * Standard arch layout: 16 teeth per arch (including wisdom teeth).
 * Indices 0-15 go from patient's right third molar (#1 upper / #32 lower)
 * around to the left third molar (#16 upper / #17 lower).
 *
 * For 14-tooth arches (no wisdom teeth), indices 1-14.
 */
interface ArchToothPosition {
  /** Tooth type */
  type: ToothType;
  /** X position along the arch (in SVG user units) */
  x: number;
  /** Y position along the arch */
  y: number;
  /** Rotation in degrees (labial face direction) */
  angle: number;
  /** Scale factor (molars bigger, laterals smaller) */
  scale: number;
  /** Mirror on X axis for right-side teeth */
  mirror: boolean;
}

function generateArchPositions(arch: ArchType): ArchToothPosition[] {
  // Parabolic/catenary arch — based on Bonwill-Hawley arch form
  // Center of arch at x=250, apex of arch at y depends on upper/lower
  const centerX = 250;
  const ySign = arch === "upper" ? 1 : -1;
  const baseY = arch === "upper" ? 180 : 120;

  // Tooth order from right to left (patient perspective):
  // R-M3, R-M2, R-M1, R-PM2, R-PM1, R-C, R-LI, R-CI, L-CI, L-LI, L-C, L-PM1, L-PM2, L-M1, L-M2, L-M3
  const types: ToothType[] = [
    "molar", "molar", "molar",
    "premolar", "premolar",
    "canine",
    "lateral_incisor", "central_incisor",
    "central_incisor", "lateral_incisor",
    "canine",
    "premolar", "premolar",
    "molar", "molar", "molar",
  ];

  // Parametric arch curve: x = centerX + spread * sin(t), y = baseY + depth * cos(t)
  // where t goes from -PI/2 (right posterior) to +PI/2 (left posterior)
  const spread = 195; // half-width of arch
  const depth = 110 * ySign; // front-to-back depth

  // Parameter values for each tooth position — NOT evenly spaced
  // Anterior teeth are closer together, posterior teeth spaced wider
  const tValues = [
    -1.45, -1.28, -1.10, // right molars
    -0.92, -0.76,        // right premolars
    -0.58,               // right canine
    -0.38, -0.18,        // right incisors
    0.18, 0.38,          // left incisors
    0.58,                // left canine
    0.76, 0.92,          // left premolars
    1.10, 1.28, 1.45,    // left molars
  ];

  const scales: number[] = [
    0.85, 0.95, 1.0,     // R molars (wisdom smaller)
    0.82, 0.82,          // R premolars
    0.85,                // R canine
    0.72, 0.8,           // R lateral, central incisor
    0.8, 0.72,           // L central, lateral incisor
    0.85,                // L canine
    0.82, 0.82,          // L premolars
    1.0, 0.95, 0.85,     // L molars
  ];

  return tValues.map((t, i) => {
    const x = centerX + spread * Math.sin(t);
    const y = baseY - depth * Math.cos(t);
    // Tooth faces outward from the arch curve (perpendicular to tangent)
    const angleDeg = (t * 180) / Math.PI;
    const isRightSide = i < 8;

    return {
      type: types[i],
      x,
      y,
      angle: arch === "upper" ? angleDeg : -angleDeg,
      scale: scales[i],
      mirror: isRightSide,
    };
  });
}

// =============================================================================
// PREMIUM DEFS — Reusable SVG gradient and filter definitions
// =============================================================================

export const PremiumDefs: React.FC = () => (
  <defs>
    {/* Enamel gradient — 3D depth with buccal highlight */}
    <linearGradient id="premiumEnamelGrad" x1="0.15" y1="0.1" x2="0.85" y2="0.9">
      <stop offset="0%" stopColor={PREMIUM_COLORS.enamelLight} />
      <stop offset="35%" stopColor={PREMIUM_COLORS.enamelLight} stopOpacity={0.95} />
      <stop offset="60%" stopColor={PREMIUM_COLORS.enamelMid} />
      <stop offset="100%" stopColor={PREMIUM_COLORS.enamelShadow} />
    </linearGradient>

    {/* Enamel radial for more realistic light falloff */}
    <radialGradient id="premiumEnamelRadial" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stopColor={PREMIUM_COLORS.enamelLight} />
      <stop offset="50%" stopColor={PREMIUM_COLORS.enamelMid} />
      <stop offset="100%" stopColor={PREMIUM_COLORS.enamelShadow} />
    </radialGradient>

    {/* Dentin layer */}
    <linearGradient id="premiumDentinGrad" x1="0.2" y1="0.1" x2="0.8" y2="0.9">
      <stop offset="0%" stopColor="#faf0d8" />
      <stop offset="100%" stopColor={PREMIUM_COLORS.dentinColor} />
    </linearGradient>

    {/* Gum tissue — healthy pink with depth */}
    <linearGradient id="premiumGumGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor={PREMIUM_COLORS.gumLight} />
      <stop offset="40%" stopColor={PREMIUM_COLORS.gumHealthy} />
      <stop offset="100%" stopColor={PREMIUM_COLORS.gumDark} />
    </linearGradient>

    <radialGradient id="premiumGumRadial" cx="50%" cy="30%" r="60%">
      <stop offset="0%" stopColor={PREMIUM_COLORS.gumLight} />
      <stop offset="60%" stopColor={PREMIUM_COLORS.gumHealthy} />
      <stop offset="100%" stopColor={PREMIUM_COLORS.gumDark} />
    </radialGradient>

    {/* Interdental papilla */}
    <radialGradient id="premiumPapillaGrad" cx="50%" cy="30%" r="60%">
      <stop offset="0%" stopColor={PREMIUM_COLORS.gumPapilla} />
      <stop offset="100%" stopColor={PREMIUM_COLORS.gumDark} />
    </radialGradient>

    {/* Bone gradient */}
    <linearGradient id="premiumBoneGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor={PREMIUM_COLORS.boneColor} />
      <stop offset="100%" stopColor="#d8ccb0" />
    </linearGradient>

    {/* Root gradient */}
    <linearGradient id="premiumRootGrad" x1="0.3" y1="0" x2="0.7" y2="1">
      <stop offset="0%" stopColor="#f0e4cc" />
      <stop offset="50%" stopColor={PREMIUM_COLORS.dentinColor} />
      <stop offset="100%" stopColor="#e0d4b8" />
    </linearGradient>

    {/* Pulp gradient */}
    <radialGradient id="premiumPulpGrad" cx="50%" cy="40%" r="50%">
      <stop offset="0%" stopColor="#e86070" />
      <stop offset="100%" stopColor="#c04050" />
    </radialGradient>

    {/* Metal bracket gradient — brushed metal effect */}
    <linearGradient id="premiumBracketGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#e0e0e8" />
      <stop offset="20%" stopColor={PREMIUM_COLORS.bracketColor} />
      <stop offset="50%" stopColor="#d8d8e0" />
      <stop offset="80%" stopColor={PREMIUM_COLORS.bracketColor} />
      <stop offset="100%" stopColor="#b8b8c4" />
    </linearGradient>

    {/* Wire gradient — metallic sheen */}
    <linearGradient id="premiumWireGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#d0d0d8" />
      <stop offset="50%" stopColor={PREMIUM_COLORS.wireColor} />
      <stop offset="100%" stopColor="#9898a8" />
    </linearGradient>

    {/* Aligner fill — semi-transparent plastic */}
    <linearGradient id="premiumAlignerGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="rgba(210, 225, 255, 0.2)" />
      <stop offset="100%" stopColor="rgba(180, 200, 240, 0.1)" />
    </linearGradient>

    {/* Drop shadow for teeth */}
    <filter id="premiumToothShadow" x="-15%" y="-15%" width="130%" height="130%">
      <feDropShadow dx="0.5" dy="1.5" stdDeviation="1.5" floodColor="#000" floodOpacity="0.25" />
    </filter>

    {/* Soft inner glow */}
    <filter id="premiumInnerGlow" x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur stdDeviation="1.5" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    {/* Specular highlight for enamel */}
    <filter id="premiumSpecular" x="-5%" y="-5%" width="110%" height="110%">
      <feSpecularLighting surfaceScale="3" specularConstant="0.8" specularExponent="25" result="spec">
        <fePointLight x="100" y="-50" z="200" />
      </feSpecularLighting>
      <feComposite in="SourceGraphic" in2="spec" operator="arithmetic" k1="0" k2="1" k3="0.15" k4="0" />
    </filter>

    {/* Gum tissue soft edge */}
    <filter id="premiumGumSoft" x="-3%" y="-3%" width="106%" height="106%">
      <feGaussianBlur stdDeviation="0.6" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
);

// =============================================================================
// REALISTIC TOOTH COMPONENT
// =============================================================================

interface RealisticToothProps {
  /** Which tooth to render */
  type: ToothType;
  /** X position */
  x?: number;
  /** Y position (CEJ level) */
  y?: number;
  /** Rotation in degrees */
  rotation?: number;
  /** Uniform scale */
  scale?: number;
  /** Mirror horizontally (for right-side teeth) */
  mirror?: boolean;
  /** Show internal anatomy (dentin, pulp) — cross section mode */
  showInternal?: boolean;
  /** Show root structure below gumline */
  showRoots?: boolean;
  /** Gum tissue overlay */
  showGum?: boolean;
  /** Opacity override */
  opacity?: number;
  /** Unique ID prefix for gradients scoping */
  idPrefix?: string;
}

export const RealisticTooth: React.FC<RealisticToothProps> = ({
  type,
  x = 0,
  y = 0,
  rotation = 0,
  scale = 1,
  mirror = false,
  showInternal = false,
  showRoots = true,
  showGum = true,
  opacity = 1,
  idPrefix = "rt",
}) => {
  const anatomy = TOOTH_ANATOMY[type];
  const sx = mirror ? -scale : scale;

  return (
    <g
      transform={`translate(${x}, ${y}) rotate(${rotation}) scale(${sx}, ${scale})`}
      opacity={opacity}
    >
      {/* Roots */}
      {showRoots &&
        anatomy.roots.map((rootPath, i) => (
          <path
            key={`${idPrefix}-root-${i}`}
            d={rootPath}
            fill="url(#premiumRootGrad)"
            stroke={PREMIUM_COLORS.enamelShadow}
            strokeWidth={0.3}
            opacity={0.9}
          />
        ))}

      {/* Pulp canals (if showing internal) */}
      {showInternal &&
        anatomy.pulpCanals.map((canalPath, i) => (
          <path
            key={`${idPrefix}-canal-${i}`}
            d={canalPath}
            fill="url(#premiumPulpGrad)"
            opacity={0.7}
          />
        ))}

      {/* Gum tissue scalloped overlay */}
      {showGum && (
        <GumScallop
          toothType={type}
          crownWidth={anatomy.crownWidth}
          idPrefix={idPrefix}
        />
      )}

      {/* Crown — enamel layer */}
      <path
        d={anatomy.crown}
        fill="url(#premiumEnamelRadial)"
        stroke={PREMIUM_COLORS.enamelShadow}
        strokeWidth={0.4}
        filter="url(#premiumToothShadow)"
      />

      {/* Internal layers (cross section) */}
      {showInternal && (
        <>
          {/* Dentin */}
          <path
            d={anatomy.crown}
            fill="url(#premiumDentinGrad)"
            opacity={0.85}
            transform="scale(0.78)"
          />
          {/* Pulp chamber */}
          <path
            d={anatomy.pulpChamber}
            fill="url(#premiumPulpGrad)"
            filter="url(#premiumInnerGlow)"
          />
        </>
      )}

      {/* Crown contour line — subtle anatomical detail */}
      <path
        d={anatomy.crownOutline}
        fill="none"
        stroke={PREMIUM_COLORS.enamelShadow}
        strokeWidth={0.3}
        opacity={0.4}
      />

      {/* Cusp details for premolars/molars */}
      {anatomy.cusps?.map((cuspPath, i) => (
        <path
          key={`${idPrefix}-cusp-${i}`}
          d={cuspPath}
          fill={PREMIUM_COLORS.enamelLight}
          opacity={0.3}
        />
      ))}

      {/* Fissure lines for premolars/molars */}
      {anatomy.fissures?.map((fissurePath, i) => (
        <path
          key={`${idPrefix}-fissure-${i}`}
          d={fissurePath}
          fill="none"
          stroke={PREMIUM_COLORS.enamelShadow}
          strokeWidth={0.6}
          opacity={0.35}
          strokeLinecap="round"
        />
      ))}

      {/* Enamel specular highlight — buccal surface shine */}
      <ellipse
        cx={-anatomy.crownWidth * 0.12}
        cy={-anatomy.crownHeight * 0.55}
        rx={anatomy.crownWidth * 0.15}
        ry={anatomy.crownHeight * 0.25}
        fill="white"
        opacity={0.18}
      />

      {/* Secondary highlight for depth */}
      <ellipse
        cx={anatomy.crownWidth * 0.08}
        cy={-anatomy.crownHeight * 0.35}
        rx={anatomy.crownWidth * 0.08}
        ry={anatomy.crownHeight * 0.12}
        fill="white"
        opacity={0.08}
      />

      {/* CEJ line accent */}
      <path
        d={anatomy.cervicalLine}
        fill="none"
        stroke={PREMIUM_COLORS.enamelShadow}
        strokeWidth={0.5}
        opacity={0.5}
        strokeLinecap="round"
      />
    </g>
  );
};

// =============================================================================
// GUM SCALLOP — realistic gingival contour around individual teeth
// =============================================================================

interface GumScallopProps {
  toothType: ToothType;
  crownWidth: number;
  idPrefix: string;
}

const GumScallop: React.FC<GumScallopProps> = ({ toothType, crownWidth }) => {
  // Gum tissue follows a scalloped pattern: dips between teeth (papillae)
  // and rises over the labial surface of each tooth
  const hw = crownWidth * 0.55;
  // The gum margin height varies by tooth type
  const gumMarginY = toothType === "molar" ? -10 : toothType === "canine" ? -15 : -12;
  const papillaHeight = -25;

  // Scalloped gum margin path
  const gumPath =
    `M${-hw - 8},${papillaHeight} ` +
    `C${-hw - 4},${papillaHeight + 4} ${-hw},${gumMarginY} ${-hw * 0.5},${gumMarginY + 2} ` +
    `C${-hw * 0.2},${gumMarginY + 3} ${hw * 0.2},${gumMarginY + 3} ${hw * 0.5},${gumMarginY + 2} ` +
    `C${hw},${gumMarginY} ${hw + 4},${papillaHeight + 4} ${hw + 8},${papillaHeight} ` +
    // Extend upward to cover root area
    `L${hw + 8},${papillaHeight - 20} ` +
    `C${hw + 4},${papillaHeight - 30} ${-hw - 4},${papillaHeight - 30} ${-hw - 8},${papillaHeight - 20} Z`;

  return (
    <g>
      {/* Main gum body — covers roots */}
      <rect
        x={-hw - 10}
        y={0}
        width={(hw + 10) * 2}
        height={120}
        fill="url(#premiumGumGrad)"
        opacity={0.85}
      />

      {/* Scalloped gum margin */}
      <path
        d={
          `M${-hw - 10},${gumMarginY - 5} ` +
          `L${-hw - 10},30 L${hw + 10},30 L${hw + 10},${gumMarginY - 5} ` +
          // Scalloped edge
          `C${hw + 4},${gumMarginY + 3} ${hw},${gumMarginY + 6} ${hw * 0.6},${gumMarginY + 4} ` +
          `C${hw * 0.3},${gumMarginY + 2} 0,${gumMarginY} ${-hw * 0.3},${gumMarginY + 2} ` +
          `C${-hw * 0.6},${gumMarginY + 4} ${-hw},${gumMarginY + 6} ${-hw - 4},${gumMarginY + 3} Z`
        }
        fill="url(#premiumGumRadial)"
        filter="url(#premiumGumSoft)"
        opacity={0.9}
      />

      {/* Left papilla */}
      <path
        d={
          `M${-hw - 6},${gumMarginY} ` +
          `C${-hw - 5},${papillaHeight + 6} ${-hw - 3},${papillaHeight + 2} ${-hw - 2},${papillaHeight} ` +
          `C${-hw - 1},${papillaHeight + 2} ${-hw},${papillaHeight + 6} ${-hw + 2},${gumMarginY} Z`
        }
        fill="url(#premiumPapillaGrad)"
        opacity={0.8}
      />

      {/* Right papilla */}
      <path
        d={
          `M${hw - 2},${gumMarginY} ` +
          `C${hw - 1},${papillaHeight + 6} ${hw + 1},${papillaHeight + 2} ${hw + 2},${papillaHeight} ` +
          `C${hw + 3},${papillaHeight + 2} ${hw + 5},${papillaHeight + 6} ${hw + 6},${gumMarginY} Z`
        }
        fill="url(#premiumPapillaGrad)"
        opacity={0.8}
      />
    </g>
  );
};

// =============================================================================
// DENTAL ARCH COMPONENT
// =============================================================================

export interface ArchModifications {
  condition?: OrthoCondition;
  /** Severity from 0 (none) to 1 (extreme) */
  severity?: number;
  /** Specific teeth to highlight (0-indexed) */
  highlightTeeth?: number[];
  highlightColor?: string;
  /** Teeth to hide (e.g., wisdom teeth not present) */
  missingTeeth?: number[];
}

interface DentalArchProps {
  /** Upper or lower arch */
  arch: ArchType;
  /** Orthodontic condition modifications */
  modifications?: ArchModifications;
  /** Animation progress 0 (condition) to 1 (corrected) */
  progress?: number;
  /** Show root structure */
  showRoots?: boolean;
  /** Show gum tissue */
  showGums?: boolean;
  /** Include wisdom teeth (16 vs 14 teeth) */
  includeWisdom?: boolean;
  /** Overall scale */
  scale?: number;
}

/**
 * Compute per-tooth modifications for orthodontic conditions.
 * Returns displacement and rotation offsets for each tooth.
 */
function computeConditionOffsets(
  condition: OrthoCondition,
  severity: number,
  toothCount: number
): Array<{ dx: number; dy: number; dAngle: number }> {
  const offsets: Array<{ dx: number; dy: number; dAngle: number }> = [];
  const s = severity;

  for (let i = 0; i < toothCount; i++) {
    let dx = 0;
    let dy = 0;
    let dAngle = 0;

    switch (condition) {
      case "crowding": {
        // Anterior teeth (indices 5-10) are most affected — overlap and rotate
        const isAnterior = i >= 5 && i <= 10;
        const isLateral = i === 6 || i === 9;
        if (isAnterior) {
          // Alternating labial/lingual displacement
          const labialDir = i % 2 === 0 ? 1 : -1;
          dx = labialDir * s * (isLateral ? 8 : 5);
          dy = s * (isLateral ? -6 : -3);
          dAngle = labialDir * s * (isLateral ? 18 : 10);
        }
        // Slight crowding effect on premolars
        if (i === 4 || i === 11) {
          dx = (i < 8 ? -1 : 1) * s * 3;
          dAngle = (i < 8 ? -1 : 1) * s * 6;
        }
        break;
      }
      case "spacing": {
        // Gaps between anterior teeth — shift teeth outward from center
        const distFromCenter = Math.abs(i - 7.5);
        if (i < 8) {
          dx = -s * (3 + distFromCenter * 0.8);
        } else {
          dx = s * (3 + distFromCenter * 0.8);
        }
        break;
      }
      case "overbite": {
        // Upper anterior teeth extend further down (deeper bite)
        if (i >= 5 && i <= 10) {
          dy = s * 12;
          // Slight labial flare
          dx = (i < 8 ? -1 : 1) * s * 2;
        }
        break;
      }
      case "underbite": {
        // Lower anterior teeth are forward of upper
        if (i >= 5 && i <= 10) {
          dy = -s * 8;
          dx = (i < 8 ? 1 : -1) * s * 3;
          dAngle = (i < 8 ? 1 : -1) * s * 5;
        }
        break;
      }
    }

    offsets.push({ dx, dy, dAngle });
  }

  return offsets;
}

export const DentalArch: React.FC<DentalArchProps> = ({
  arch,
  modifications,
  progress = 0,
  showRoots = false,
  showGums = true,
  includeWisdom = false,
  scale = 1,
}) => {
  const allPositions = generateArchPositions(arch);
  // Optionally remove wisdom teeth (indices 0 and 15)
  const positions = includeWisdom
    ? allPositions
    : allPositions.slice(1, 15);

  const toothCount = positions.length;

  // Compute condition offsets
  const conditionOffsets = modifications?.condition
    ? computeConditionOffsets(
        modifications.condition,
        modifications.severity ?? 0.6,
        toothCount
      )
    : Array.from({ length: toothCount }, () => ({ dx: 0, dy: 0, dAngle: 0 }));

  // Interpolate between condition and corrected based on progress
  const missingSet = new Set(modifications?.missingTeeth ?? []);
  const highlightSet = new Set(modifications?.highlightTeeth ?? []);

  // Build gum tissue path that follows the arch
  const gumPath = buildGumPath(positions, arch, conditionOffsets, progress);

  return (
    <svg
      viewBox="0 0 500 300"
      overflow="visible"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `scale(${scale})` }}
    >
      <PremiumDefs />

      {/* Gum tissue base */}
      {showGums && (
        <path
          d={gumPath}
          fill="url(#premiumGumGrad)"
          filter="url(#premiumGumSoft)"
          opacity={0.9}
        />
      )}

      {/* Interdental papillae */}
      {showGums &&
        positions.map((pos, i) => {
          if (i === 0 || missingSet.has(i)) return null;
          const prev = positions[i - 1];
          const midX = (prev.x + pos.x) / 2;
          const midY = (prev.y + pos.y) / 2;
          const papillaSize = 4 * pos.scale;

          return (
            <ellipse
              key={`papilla-${i}`}
              cx={midX}
              cy={midY + (arch === "upper" ? -6 : 6)}
              rx={papillaSize}
              ry={papillaSize * 1.5}
              fill="url(#premiumPapillaGrad)"
              opacity={0.7}
            />
          );
        })}

      {/* Render each tooth */}
      {positions.map((pos, i) => {
        if (missingSet.has(i)) return null;

        const offset = conditionOffsets[i];
        // Animate from displaced (condition) to corrected (0 offset) based on progress
        const currentDx = offset.dx * (1 - progress);
        const currentDy = offset.dy * (1 - progress);
        const currentDAngle = offset.dAngle * (1 - progress);

        const isHighlighted = highlightSet.has(i);

        return (
          <g key={`tooth-${i}`}>
            <RealisticTooth
              type={pos.type}
              x={pos.x + currentDx}
              y={pos.y + currentDy}
              rotation={pos.angle + currentDAngle}
              scale={pos.scale}
              mirror={pos.mirror}
              showRoots={showRoots}
              showGum={false}
              showInternal={false}
              idPrefix={`arch-${arch}-${i}`}
              opacity={isHighlighted ? 1 : 0.95}
            />

            {/* Highlight overlay */}
            {isHighlighted && (
              <circle
                cx={pos.x + currentDx}
                cy={pos.y + currentDy - 20}
                r={18 * pos.scale}
                fill={modifications?.highlightColor ?? "#ef4444"}
                opacity={0.2}
              />
            )}
          </g>
        );
      })}

      {/* Arch midline reference */}
      <line
        x1={250}
        y1={arch === "upper" ? 60 : 30}
        x2={250}
        y2={arch === "upper" ? 200 : 170}
        stroke="#7c3aed"
        strokeWidth={0.4}
        strokeDasharray="3,6"
        opacity={0.12}
      />
    </svg>
  );
};

/**
 * Build a smooth gum tissue outline path following the arch shape.
 */
function buildGumPath(
  positions: ArchToothPosition[],
  arch: ArchType,
  offsets: Array<{ dx: number; dy: number; dAngle: number }>,
  progress: number
): string {
  if (positions.length === 0) return "";

  const gumOffset = arch === "upper" ? 15 : -15;
  const gumDepth = arch === "upper" ? 40 : -40;

  // Outer edge (away from teeth)
  const outerPoints = positions.map((pos, i) => {
    const dx = offsets[i].dx * (1 - progress);
    const dy = offsets[i].dy * (1 - progress);
    return {
      x: pos.x + dx,
      y: pos.y + dy + gumOffset + gumDepth,
    };
  });

  // Inner edge (gum margin near crown)
  const innerPoints = positions.map((pos, i) => {
    const dx = offsets[i].dx * (1 - progress);
    const dy = offsets[i].dy * (1 - progress);
    return {
      x: pos.x + dx,
      y: pos.y + dy + gumOffset,
    };
  });

  // Build smooth path using the outer and inner edges
  let d = `M${outerPoints[0].x - 15},${outerPoints[0].y} `;

  // Outer edge (goes left to right)
  outerPoints.forEach((pt, i) => {
    if (i === 0) {
      d += `L${pt.x},${pt.y} `;
    } else {
      const prev = outerPoints[i - 1];
      const cpx = (prev.x + pt.x) / 2;
      d += `Q${cpx},${(prev.y + pt.y) / 2} ${pt.x},${pt.y} `;
    }
  });

  // Connect to inner edge right end
  const lastOuter = outerPoints[outerPoints.length - 1];
  const lastInner = innerPoints[innerPoints.length - 1];
  d += `L${lastOuter.x + 15},${lastOuter.y} `;
  d += `L${lastInner.x + 15},${lastInner.y} `;

  // Inner edge (right to left) — scalloped
  for (let i = innerPoints.length - 1; i >= 0; i--) {
    const pt = innerPoints[i];
    if (i === innerPoints.length - 1) {
      d += `L${pt.x},${pt.y} `;
    } else {
      const next = innerPoints[i + 1];
      const cpx = (next.x + pt.x) / 2;
      // Add scalloping: dip between teeth
      const scallopY = pt.y + (arch === "upper" ? -5 : 5);
      d += `Q${cpx},${scallopY} ${pt.x},${pt.y} `;
    }
  }

  d += `L${outerPoints[0].x - 15},${innerPoints[0].y} Z`;

  return d;
}

// =============================================================================
// ORTHO APPLIANCE COMPONENT
// =============================================================================

interface OrthoApplianceProps {
  /** Type of orthodontic appliance */
  appliance: ApplianceType;
  /** Arch to render appliance on */
  arch: ArchType;
  /** Include wisdom teeth */
  includeWisdom?: boolean;
  /** Treatment progress 0-1 (affects wire tension visualization) */
  progress?: number;
}

export const OrthoAppliance: React.FC<OrthoApplianceProps> = ({
  appliance,
  arch,
  includeWisdom = false,
  progress = 0,
}) => {
  const allPositions = generateArchPositions(arch);
  const positions = includeWisdom
    ? allPositions
    : allPositions.slice(1, 15);

  if (appliance === "braces") {
    return (
      <g>
        {/* Archwire — threads through all bracket slots */}
        <BracesWire positions={positions} arch={arch} progress={progress} />

        {/* Individual brackets */}
        {positions.map((pos, i) => (
          <Bracket
            key={`bracket-${i}`}
            x={pos.x}
            y={pos.y}
            angle={pos.angle}
            scale={pos.scale}
            mirror={pos.mirror}
            toothType={pos.type}
          />
        ))}
      </g>
    );
  }

  // Invisalign / clear aligner
  return (
    <g>
      <AlignerShell positions={positions} arch={arch} />
      {/* Attachment bumps on select teeth */}
      {[3, 5, 8, 10].map((idx) => {
        if (idx >= positions.length) return null;
        const pos = positions[idx];
        return (
          <AlignerAttachment
            key={`attach-${idx}`}
            x={pos.x}
            y={pos.y - 15 * pos.scale}
            scale={pos.scale}
          />
        );
      })}
    </g>
  );
};

// =============================================================================
// BRACES SUBCOMPONENTS
// =============================================================================

interface BracketProps {
  x: number;
  y: number;
  angle: number;
  scale: number;
  mirror: boolean;
  toothType: ToothType;
}

/**
 * Realistic twin bracket with slot, tie wings, and base pad.
 */
const Bracket: React.FC<BracketProps> = ({
  x,
  y,
  angle,
  scale,
  mirror,
  toothType,
}) => {
  const sx = mirror ? -scale : scale;
  // Bracket positioned on the labial surface of the crown, partway up
  const bracketY = -20; // offset from CEJ upward onto the crown
  const bw = toothType === "molar" ? 5 : 4; // bracket half-width
  const bh = 3; // bracket half-height

  return (
    <g transform={`translate(${x}, ${y}) rotate(${angle}) scale(${sx}, ${scale})`}>
      <g transform={`translate(0, ${bracketY})`}>
        {/* Bracket base pad */}
        <rect
          x={-bw - 1}
          y={-bh - 1}
          width={(bw + 1) * 2}
          height={(bh + 1) * 2}
          rx={0.8}
          fill="url(#premiumBracketGrad)"
          stroke="#a0a0ac"
          strokeWidth={0.3}
        />

        {/* Bracket body — raised twin bracket */}
        <rect
          x={-bw}
          y={-bh}
          width={bw * 2}
          height={bh * 2}
          rx={0.5}
          fill="url(#premiumBracketGrad)"
          stroke="#9898a4"
          strokeWidth={0.4}
        />

        {/* Archwire slot — horizontal groove through center */}
        <rect
          x={-bw + 0.5}
          y={-0.6}
          width={bw * 2 - 1}
          height={1.2}
          rx={0.2}
          fill="#888898"
        />

        {/* Tie wings — mesial and distal (4 small projections) */}
        {/* Upper mesial */}
        <rect x={-bw - 0.5} y={-bh + 0.3} width={1.2} height={1.5} rx={0.3} fill="#b8b8c4" />
        {/* Lower mesial */}
        <rect x={-bw - 0.5} y={bh - 1.8} width={1.2} height={1.5} rx={0.3} fill="#b8b8c4" />
        {/* Upper distal */}
        <rect x={bw - 0.7} y={-bh + 0.3} width={1.2} height={1.5} rx={0.3} fill="#b8b8c4" />
        {/* Lower distal */}
        <rect x={bw - 0.7} y={bh - 1.8} width={1.2} height={1.5} rx={0.3} fill="#b8b8c4" />

        {/* Metallic highlight */}
        <rect
          x={-bw + 1}
          y={-bh + 0.5}
          width={bw - 1}
          height={1}
          rx={0.3}
          fill="white"
          opacity={0.2}
        />
      </g>
    </g>
  );
};

interface BracesWireProps {
  positions: ArchToothPosition[];
  arch: ArchType;
  progress: number;
}

/**
 * Archwire that threads through bracket slots along the arch.
 * Wire tension changes with treatment progress.
 */
const BracesWire: React.FC<BracesWireProps> = ({ positions, progress }) => {
  if (positions.length < 2) return null;

  // Build a smooth curve through the bracket slot positions
  const wireY = -20; // same as bracket offset

  const points = positions.map((pos) => {
    const rad = (pos.angle * Math.PI) / 180;
    const sx = pos.mirror ? -1 : 1;
    return {
      x: pos.x + Math.sin(rad) * wireY * pos.scale * sx * -1,
      y: pos.y + Math.cos(rad) * wireY * pos.scale * -1,
    };
  });

  // Smooth curve via SVG cubic bezier
  let d = `M${points[0].x},${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cpx1 = prev.x + (curr.x - prev.x) * 0.4;
    const cpy1 = prev.y + (curr.y - prev.y) * 0.2;
    const cpx2 = prev.x + (curr.x - prev.x) * 0.6;
    const cpy2 = prev.y + (curr.y - prev.y) * 0.8;
    d += ` C${cpx1},${cpy1} ${cpx2},${cpy2} ${curr.x},${curr.y}`;
  }

  // Wire becomes straighter (more ideal arch form) as progress increases
  const wireThickness = 1.0 + (1 - progress) * 0.3; // thicker early, thinner later

  return (
    <g>
      {/* Wire shadow */}
      <path
        d={d}
        fill="none"
        stroke="#60606c"
        strokeWidth={wireThickness + 0.8}
        strokeLinecap="round"
        opacity={0.3}
      />
      {/* Main wire */}
      <path
        d={d}
        fill="none"
        stroke="url(#premiumWireGrad)"
        strokeWidth={wireThickness}
        strokeLinecap="round"
      />
      {/* Wire highlight */}
      <path
        d={d}
        fill="none"
        stroke="white"
        strokeWidth={wireThickness * 0.3}
        strokeLinecap="round"
        opacity={0.25}
      />
    </g>
  );
};

// =============================================================================
// INVISALIGN / ALIGNER SUBCOMPONENTS
// =============================================================================

interface AlignerShellProps {
  positions: ArchToothPosition[];
  arch: ArchType;
}

/**
 * Semi-transparent aligner shell conforming to tooth contours.
 */
const AlignerShell: React.FC<AlignerShellProps> = ({ positions, arch }) => {
  if (positions.length < 2) return null;

  // Build two paths: outer contour and inner contour of the aligner
  const outerOffset = arch === "upper" ? -8 : 8;
  const innerOffset = arch === "upper" ? 8 : -8;
  const crownTopOffset = -35;

  const outerPoints = positions.map((pos) => ({
    x: pos.x,
    y: pos.y + crownTopOffset * pos.scale + outerOffset,
  }));

  const innerPoints = positions.map((pos) => ({
    x: pos.x,
    y: pos.y + innerOffset,
  }));

  // Outer contour (over the incisal/occlusal edges)
  let outerD = `M${outerPoints[0].x - 5},${outerPoints[0].y}`;
  for (let i = 1; i < outerPoints.length; i++) {
    const prev = outerPoints[i - 1];
    const curr = outerPoints[i];
    const cpx = (prev.x + curr.x) / 2;
    outerD += ` Q${cpx},${(prev.y + curr.y) / 2 - 2} ${curr.x},${curr.y}`;
  }

  // Connect to inner contour
  const lastOuter = outerPoints[outerPoints.length - 1];
  const lastInner = innerPoints[innerPoints.length - 1];
  outerD += ` L${lastOuter.x + 5},${lastOuter.y}`;
  outerD += ` L${lastInner.x + 5},${lastInner.y}`;

  // Inner contour (gum margin side)
  for (let i = innerPoints.length - 1; i >= 0; i--) {
    const pt = innerPoints[i];
    if (i === innerPoints.length - 1) {
      outerD += ` L${pt.x},${pt.y}`;
    } else {
      const next = innerPoints[i + 1];
      const cpx = (next.x + pt.x) / 2;
      outerD += ` Q${cpx},${(next.y + pt.y) / 2 + 1} ${pt.x},${pt.y}`;
    }
  }

  outerD += ` L${outerPoints[0].x - 5},${innerPoints[0].y} Z`;

  return (
    <g>
      {/* Aligner body — semi-transparent */}
      <path
        d={outerD}
        fill={PREMIUM_COLORS.alignerFill}
        stroke={PREMIUM_COLORS.alignerStroke}
        strokeWidth={0.8}
      />
      {/* Edge highlight to show thickness */}
      <path
        d={outerD}
        fill="none"
        stroke="rgba(220, 230, 255, 0.2)"
        strokeWidth={0.4}
      />
      {/* Specular edge at the top of the aligner */}
      {outerPoints.map((pt, i) => {
        if (i % 3 !== 0) return null;
        return (
          <ellipse
            key={`aligner-spec-${i}`}
            cx={pt.x}
            cy={pt.y - 2}
            rx={6}
            ry={2}
            fill="white"
            opacity={0.08}
          />
        );
      })}
    </g>
  );
};

interface AlignerAttachmentProps {
  x: number;
  y: number;
  scale: number;
}

/**
 * Small tooth-colored composite bumps that help the aligner grip specific teeth.
 */
const AlignerAttachment: React.FC<AlignerAttachmentProps> = ({ x, y, scale }) => {
  const w = 5 * scale;
  const h = 3 * scale;

  return (
    <g transform={`translate(${x}, ${y})`}>
      <ellipse
        cx={0}
        cy={0}
        rx={w}
        ry={h}
        fill={PREMIUM_COLORS.enamelMid}
        stroke={PREMIUM_COLORS.enamelShadow}
        strokeWidth={0.3}
      />
      {/* Tiny highlight */}
      <ellipse
        cx={-w * 0.2}
        cy={-h * 0.3}
        rx={w * 0.4}
        ry={h * 0.35}
        fill="white"
        opacity={0.2}
      />
    </g>
  );
};

// =============================================================================
// CONVENIENCE EXPORTS
// =============================================================================

export {
  generateArchPositions,
  computeConditionOffsets,
};

export type {
  ToothPathData,
  ArchToothPosition,
  RealisticToothProps,
  DentalArchProps,
  OrthoApplianceProps,
};
