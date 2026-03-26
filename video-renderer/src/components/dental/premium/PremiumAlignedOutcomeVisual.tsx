import React from "react";

/**
 * Premium Aligned Outcome Visual — BEAUTIFUL frontal smile.
 * 10 upper teeth in perfect arch form, healthy gum tissue with perfect papillae,
 * morph animation from misaligned to aligned, sweep highlight, sparkle effects,
 * and warm background glow. This is the "money shot."
 */

const lerp = (a: number, b: number, t: number) => a + (b - a) * Math.min(1, Math.max(0, t));
const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
const sub = (p: number, s: number, e: number) => clamp((p - s) / (e - s), 0, 1);
const smoothstep = (t: number) => t * t * (3 - 2 * t);

interface OutcomeTooth {
  type: string;
  baseX: number;
  scale: number;
  misRot: number;
  misY: number;
  misX: number;
  crownW: number;
  crownH: number;
}

const TEETH: OutcomeTooth[] = [
  { type: "secondPremolar", baseX: 56,  scale: 0.68, misRot: -10, misY: 7,  misX: -5, crownW: 22, crownH: 36 },
  { type: "premolar",       baseX: 92,  scale: 0.72, misRot: 8,   misY: -5, misX: 4,  crownW: 24, crownH: 38 },
  { type: "canine",         baseX: 132, scale: 0.82, misRot: -13, misY: 9,  misX: -4, crownW: 22, crownH: 46 },
  { type: "lateral",        baseX: 174, scale: 0.92, misRot: 11,  misY: -6, misX: 5,  crownW: 22, crownH: 44 },
  { type: "central",        baseX: 218, scale: 1.0,  misRot: -7,  misY: 5,  misX: -3, crownW: 28, crownH: 48 },
  { type: "central",        baseX: 266, scale: 1.0,  misRot: 6,   misY: -4, misX: 4,  crownW: 28, crownH: 48 },
  { type: "lateral",        baseX: 310, scale: 0.92, misRot: -9,  misY: 7,  misX: -5, crownW: 22, crownH: 44 },
  { type: "canine",         baseX: 352, scale: 0.82, misRot: 12,  misY: -7, misX: 4,  crownW: 22, crownH: 46 },
  { type: "premolar",       baseX: 392, scale: 0.72, misRot: -8,  misY: 6,  misX: -3, crownW: 24, crownH: 38 },
  { type: "secondPremolar", baseX: 428, scale: 0.68, misRot: 9,   misY: -5, misX: 5,  crownW: 22, crownH: 36 },
];

const BASE_Y = 212;

// Crown path builder
const mkCrown = (w: number, h: number, type: string): string => {
  const hw = w / 2;
  const hh = h / 2;
  if (type === "canine") {
    return `M${-hw},${-hh} C${-hw - 1},${-hh * 0.5} ${-hw - 1},${hh * 0.2} ${-hw},${hh * 0.6} C${-hw + 2},${hh * 0.85} ${-2},${hh + 3} 0,${hh + 4} C2,${hh + 3} ${hw - 2},${hh * 0.85} ${hw},${hh * 0.6} C${hw + 1},${hh * 0.2} ${hw + 1},${-hh * 0.5} ${hw},${-hh} C${hw * 0.6},${-hh - 2} ${-hw * 0.6},${-hh - 2} ${-hw},${-hh} Z`;
  }
  if (type === "premolar" || type === "secondPremolar") {
    return `M${-hw},${-hh} C${-hw - 0.5},${-hh * 0.4} ${-hw},${hh * 0.2} ${-hw + 0.5},${hh * 0.6} C${-hw + 2},${hh * 0.85} ${-1},${hh} 0,${hh} C1,${hh} ${hw - 2},${hh * 0.85} ${hw - 0.5},${hh * 0.6} C${hw},${hh * 0.2} ${hw + 0.5},${-hh * 0.4} ${hw},${-hh} C${hw * 0.5},${-hh - 1} ${-hw * 0.5},${-hh - 1} ${-hw},${-hh} Z`;
  }
  return `M${-hw},${-hh} C${-hw - 1},${-hh * 0.5} ${-hw - 1},${hh * 0.3} ${-hw},${hh * 0.7} C${-hw + 2},${hh * 0.95} ${-2},${hh + 1} 0,${hh + 1} C2,${hh + 1} ${hw - 2},${hh * 0.95} ${hw},${hh * 0.7} C${hw + 1},${hh * 0.3} ${hw + 1},${-hh * 0.5} ${hw},${-hh} C${hw * 0.6},${-hh - 2} ${-hw * 0.6},${-hh - 2} ${-hw},${-hh} Z`;
};

// Sparkle data
const SPARKLES = [
  { x: 120, y: 178, delay: 0,    size: 6 },
  { x: 242, y: 170, delay: 0.3,  size: 7.5 },
  { x: 180, y: 164, delay: 0.7,  size: 5.5 },
  { x: 320, y: 175, delay: 1.1,  size: 6 },
  { x: 95,  y: 192, delay: 1.5,  size: 4.5 },
  { x: 380, y: 188, delay: 0.2,  size: 5 },
  { x: 205, y: 158, delay: 0.5,  size: 4.5 },
  { x: 290, y: 162, delay: 0.9,  size: 5.5 },
  { x: 155, y: 198, delay: 1.3,  size: 4 },
  { x: 350, y: 166, delay: 0.35, size: 5 },
  { x: 265, y: 155, delay: 0.85, size: 4 },
  { x: 140, y: 155, delay: 1.15, size: 3.5 },
];

export const PremiumAlignedOutcomeVisual: React.FC<{ progress: number }> = ({ progress }) => {
  const reveal      = sub(progress, 0, 0.15);
  const morphT      = smoothstep(sub(progress, 0.25, 0.55));
  const celebrationT = sub(progress, 0.55, 0.75);
  const sparkleT    = sub(progress, 0.6, 0.85);
  const glowT       = sub(progress, 0.55, 1.0);
  const sweepT      = sub(progress, 0.58, 0.78);

  const pseudoFrame = progress * 120;

  // Tooth positions
  const positions = TEETH.map(t => {
    const w = t.crownW * t.scale;
    const h = t.crownH * t.scale;
    return {
      x: t.baseX + lerp(t.misX, 0, morphT),
      y: BASE_Y + lerp(t.misY, 0, morphT),
      rot: lerp(t.misRot, 0, morphT),
      scale: t.scale,
      type: t.type,
      w, h,
      crown: mkCrown(w, h, t.type),
    };
  });

  // Gum contour with healthy pointed papillae
  const gumPath = (() => {
    const pts = positions;
    let d = `M ${pts[0].x - 28},${pts[0].y - 16}`;
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      const yMargin = p.y - p.h * 0.45;
      if (i === 0) {
        d += ` Q ${p.x - 8},${yMargin - 5} ${p.x},${yMargin}`;
      } else {
        const prev = pts[i - 1];
        const midX = (prev.x + p.x) / 2;
        // Papillae get more pointed as alignment improves
        const papH = (18 + 6 * morphT) * Math.min(prev.scale, p.scale);
        d += ` Q ${midX},${Math.min(prev.y, p.y) - papH} ${p.x},${yMargin}`;
      }
    }
    const last = pts[pts.length - 1];
    d += ` Q ${last.x + 18},${last.y - 20} ${last.x + 30},${last.y - 12}`;
    d += ` L ${last.x + 30},${BASE_Y - 85}`;
    d += ` L ${pts[0].x - 28},${BASE_Y - 85} Z`;
    return d;
  })();

  const beforeOpacity = sub(progress, 0.08, 0.18) * (1 - sub(progress, 0.22, 0.3));
  const afterOpacity = sub(progress, 0.60, 0.75);

  const useBright = celebrationT > 0.3;

  return (
    <svg viewBox="0 0 500 400" overflow="visible" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Normal tooth enamel */}
        <radialGradient id="pao2-enamel" cx="0.4" cy="0.3" r="0.6">
          <stop offset="0%" stopColor="#fffef5" />
          <stop offset="25%" stopColor="#f5f0e4" />
          <stop offset="55%" stopColor="#ece4d4" />
          <stop offset="80%" stopColor="#e0d8c4" />
          <stop offset="100%" stopColor="#d4ccb4" />
        </radialGradient>

        {/* Bright celebration enamel — whiter, more lustrous */}
        <radialGradient id="pao2-enamelBright" cx="0.4" cy="0.3" r="0.55">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="20%" stopColor="#fcfaf5" />
          <stop offset="45%" stopColor="#f8f5ef" />
          <stop offset="70%" stopColor="#f0ece4" />
          <stop offset="100%" stopColor="#e8e2d8" />
        </radialGradient>

        {/* Healthy gum — becomes rosier with alignment */}
        <linearGradient id="pao2-gum" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={morphT > 0.5 ? "#b86878" : "#a85868"} />
          <stop offset="30%" stopColor={morphT > 0.5 ? "#d08090" : "#c07080"} />
          <stop offset="60%" stopColor={morphT > 0.5 ? "#dda0ac" : "#d4909c"} />
          <stop offset="100%" stopColor={morphT > 0.5 ? "#e8b0b8" : "#e0a0a8"} />
        </linearGradient>

        {/* Celebration aura */}
        <radialGradient id="pao2-aura" cx="50%" cy="48%" r="42%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.15" />
          <stop offset="40%" stopColor="#06b6d4" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
        </radialGradient>

        {/* Warm glow behind smile */}
        <radialGradient id="pao2-warmGlow" cx="50%" cy="50%" r="48%">
          <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#fde68a" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#fef3c7" stopOpacity="0" />
        </radialGradient>

        {/* Filters */}
        <filter id="pao2-shadow" x="-12%" y="-12%" width="124%" height="124%">
          <feDropShadow dx="0.5" dy="1.5" stdDeviation="2" floodColor="#000" floodOpacity="0.2" />
        </filter>
        <filter id="pao2-sparkleGlow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ======== BACKGROUND AURA (celebration) ======== */}
      {celebrationT > 0 && (
        <g opacity={celebrationT * 0.7}>
          <ellipse
            cx="242" cy="200"
            rx={185 + Math.sin(pseudoFrame * 0.04) * 8}
            ry={100 + Math.sin(pseudoFrame * 0.04) * 5}
            fill="url(#pao2-aura)"
          />
          <ellipse cx="242" cy="200" rx="145" ry="75" fill="url(#pao2-warmGlow)" opacity={celebrationT * 0.5} />
        </g>
      )}

      {/* ======== BEFORE LABEL ======== */}
      <g opacity={beforeOpacity}>
        <text x="242" y="142" textAnchor="middle" fill="#8b7fad" fontSize="12" fontFamily="system-ui, sans-serif" fontWeight="400">
          Before Treatment
        </text>
      </g>

      {/* ======== GUM TISSUE ======== */}
      <g opacity={lerp(0, 1, reveal)}>
        <path d={gumPath} fill="url(#pao2-gum)" />
      </g>

      {/* ======== TEETH ======== */}
      <g filter="url(#pao2-shadow)">
        {positions.map((pos, i) => {
          const appear = sub(reveal, i * 0.04, i * 0.04 + 0.3);
          const ySlide = lerp(18, 0, appear);
          const gradId = useBright ? "pao2-enamelBright" : "pao2-enamel";

          return (
            <g
              key={`tooth-${i}`}
              transform={`translate(${pos.x}, ${pos.y + ySlide}) rotate(${pos.rot})`}
              opacity={lerp(0, 1, appear)}
            >
              {/* Root hint */}
              <ellipse cx={0} cy={-pos.h / 2 - 4} rx={pos.w * 0.2} ry={5} fill="#e0d4b8" opacity={0.1} />

              {/* Tooth body */}
              <path d={pos.crown} fill={`url(#${gradId})`} stroke="#b8a888" strokeWidth={0.4} />

              {/* Cervical line */}
              <line x1={-pos.w / 2 + 2} y1={-pos.h / 2 + 2} x2={pos.w / 2 - 2} y2={-pos.h / 2 + 2} stroke="#c8b898" strokeWidth={0.5} opacity={0.2} />

              {/* Specular highlights */}
              <ellipse cx={-pos.w * 0.1} cy={-pos.h * 0.08} rx={pos.w * 0.12} ry={pos.h * 0.2} fill="white" opacity={useBright ? 0.28 : 0.18} />
              <ellipse cx={-pos.w * 0.06} cy={-pos.h * 0.25} rx={pos.w * 0.05} ry={pos.h * 0.06} fill="white" opacity={0.12} />

              {/* Surface detail */}
              {(pos.type === "central" || pos.type === "lateral") && (
                <g opacity={0.1}>
                  <line x1={-4} y1={pos.h / 2} x2={-4} y2={pos.h / 2 - 5} stroke="#c8b898" strokeWidth={0.4} />
                  <line x1={4} y1={pos.h / 2} x2={4} y2={pos.h / 2 - 5} stroke="#c8b898" strokeWidth={0.4} />
                </g>
              )}
              {pos.type === "canine" && (
                <line x1={0} y1={pos.h * 0.2} x2={0} y2={-pos.h * 0.1} stroke="#d0c4a0" strokeWidth={0.3} opacity={0.12} />
              )}

              {/* Celebration glow per tooth */}
              {glowT > 0 && (
                <ellipse cx={0} cy={-3} rx={pos.w * 0.4} ry={pos.h * 0.35} fill="white" opacity={glowT * 0.06} />
              )}
            </g>
          );
        })}
      </g>

      {/* ======== SWEEP HIGHLIGHT ======== */}
      {sweepT > 0 && (
        <g opacity={sweepT * (1 - sweepT) * 4 * 0.4}>
          <rect
            x={lerp(40, 440, sweepT)}
            y={BASE_Y - 28}
            width={28}
            height={56}
            rx={14}
            fill="white"
            opacity={0.15}
          />
        </g>
      )}

      {/* ======== SPARKLES ======== */}
      {sparkleT > 0 && SPARKLES.map((sp, i) => {
        const cycle = ((pseudoFrame * 0.05 + sp.delay * 2) % 4) / 4;
        const sparkOpacity = sparkleT * (
          cycle < 0.15 ? cycle / 0.15 :
          cycle < 0.4 ? 1 :
          cycle < 0.6 ? 1 - (cycle - 0.4) / 0.2 : 0
        );
        const yFloat = Math.sin(pseudoFrame * 0.03 + sp.delay * 3) * 4;
        const sizeAnim = sp.size * (0.7 + cycle * 0.5);

        return (
          <g
            key={`sparkle-${i}`}
            transform={`translate(${sp.x}, ${sp.y + yFloat})`}
            opacity={sparkOpacity * 0.85}
            filter="url(#pao2-sparkleGlow)"
          >
            {/* 4-pointed star */}
            <line x1={-sizeAnim} y1={0} x2={sizeAnim} y2={0} stroke="white" strokeWidth={1.2} />
            <line x1={0} y1={-sizeAnim} x2={0} y2={sizeAnim} stroke="white" strokeWidth={1.2} />
            <line x1={-sizeAnim * 0.5} y1={-sizeAnim * 0.5} x2={sizeAnim * 0.5} y2={sizeAnim * 0.5} stroke="white" strokeWidth={0.7} />
            <line x1={sizeAnim * 0.5} y1={-sizeAnim * 0.5} x2={-sizeAnim * 0.5} y2={sizeAnim * 0.5} stroke="white" strokeWidth={0.7} />
            <circle cx={0} cy={0} r={1} fill="white" opacity={0.8} />
          </g>
        );
      })}

      {/* ======== AFTER LABELS ======== */}
      <g opacity={afterOpacity}>
        <text x="242" y="310" textAnchor="middle" fill="white" fontSize="13" fontFamily="system-ui, sans-serif" fontWeight="600">
          Your Perfect Smile
        </text>
        <text x="242" y="328" textAnchor="middle" fill="#10b981" fontSize="11" fontFamily="system-ui, sans-serif" fontWeight="500">
          Beautifully aligned, balanced proportions
        </text>
        <text x="242" y="346" textAnchor="middle" fill="#8b7fad" fontSize="11" fontFamily="system-ui, sans-serif" fontWeight="400">
          Treatment complete
        </text>
      </g>

      {/* ======== CHECKMARK ======== */}
      {celebrationT > 0.7 && (
        <g opacity={sub(celebrationT, 0.7, 1)} transform="translate(242, 372)">
          <circle cx={0} cy={0} r={11} fill="#10b981" opacity={0.2} />
          <path d="M-6,0 L-2,4 L6,-4" fill="none" stroke="#10b981" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}
    </svg>
  );
};

export default PremiumAlignedOutcomeVisual;
