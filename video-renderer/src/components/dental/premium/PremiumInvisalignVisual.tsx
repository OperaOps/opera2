import React from "react";

/**
 * Premium Invisalign Visual — Frontal view with semi-transparent aligner shell.
 * Clear plastic effect with refraction, composite attachments, smooth tray
 * on/off animation, and multi-stage alignment progression.
 */

const lerp = (a: number, b: number, t: number) => a + (b - a) * Math.min(1, Math.max(0, t));
const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
const sub = (p: number, s: number, e: number) => clamp((p - s) / (e - s), 0, 1);
const smoothstep = (t: number) => t * t * (3 - 2 * t);

interface AlignerTooth {
  type: string;
  baseX: number;
  scale: number;
  rotations: [number, number, number];
  yOffsets: [number, number, number];
  xOffsets: [number, number, number];
  hasAttachment: boolean;
  crownW: number;
  crownH: number;
}

const TEETH: AlignerTooth[] = [
  { type: "premolar",       baseX: 80,  scale: 0.78, rotations: [-8, -3, 0], yOffsets: [6, 2, 0],    xOffsets: [-4, -1.5, 0], hasAttachment: false, crownW: 24, crownH: 38 },
  { type: "canine",         baseX: 125, scale: 0.84, rotations: [12, 5, 0],  yOffsets: [-7, -2, 0],  xOffsets: [4, 1, 0],     hasAttachment: true,  crownW: 22, crownH: 46 },
  { type: "lateralIncisor", baseX: 172, scale: 0.90, rotations: [-10, -4, 0], yOffsets: [7, 2, 0],   xOffsets: [-3, -0.5, 0], hasAttachment: false, crownW: 22, crownH: 42 },
  { type: "centralIncisor", baseX: 220, scale: 1.0,  rotations: [6, 2, 0],   yOffsets: [-4, -1, 0],  xOffsets: [5, 1.5, 0],   hasAttachment: true,  crownW: 28, crownH: 46 },
  { type: "centralIncisor", baseX: 272, scale: 1.0,  rotations: [-7, -2, 0], yOffsets: [-5, -1.5, 0], xOffsets: [-4, -1, 0],  hasAttachment: true,  crownW: 28, crownH: 46 },
  { type: "lateralIncisor", baseX: 320, scale: 0.90, rotations: [9, 3, 0],   yOffsets: [6, 2, 0],    xOffsets: [3, 0.5, 0],   hasAttachment: false, crownW: 22, crownH: 42 },
  { type: "canine",         baseX: 367, scale: 0.84, rotations: [-11, -4, 0], yOffsets: [-6, -2, 0], xOffsets: [-3, -1, 0],   hasAttachment: true,  crownW: 22, crownH: 46 },
  { type: "premolar",       baseX: 412, scale: 0.78, rotations: [7, 2, 0],   yOffsets: [5, 1, 0],    xOffsets: [4, 1, 0],     hasAttachment: false, crownW: 24, crownH: 38 },
];

const BASE_Y = 210;

// Crown path builder
const mkCrown = (w: number, h: number, type: string): string => {
  const hw = w / 2;
  const hh = h / 2;
  if (type === "canine") {
    return `M${-hw},${-hh} C${-hw - 1},${-hh * 0.5} ${-hw - 1},${hh * 0.2} ${-hw},${hh * 0.6} C${-hw + 2},${hh * 0.85} ${-2},${hh + 3} 0,${hh + 4} C2,${hh + 3} ${hw - 2},${hh * 0.85} ${hw},${hh * 0.6} C${hw + 1},${hh * 0.2} ${hw + 1},${-hh * 0.5} ${hw},${-hh} C${hw * 0.6},${-hh - 2} ${-hw * 0.6},${-hh - 2} ${-hw},${-hh} Z`;
  }
  if (type === "premolar") {
    return `M${-hw},${-hh} C${-hw - 0.5},${-hh * 0.4} ${-hw},${hh * 0.2} ${-hw + 0.5},${hh * 0.6} C${-hw + 2},${hh * 0.85} ${-1},${hh} 0,${hh} C1,${hh} ${hw - 2},${hh * 0.85} ${hw - 0.5},${hh * 0.6} C${hw},${hh * 0.2} ${hw + 0.5},${-hh * 0.4} ${hw},${-hh} C${hw * 0.5},${-hh - 1} ${-hw * 0.5},${-hh - 1} ${-hw},${-hh} Z`;
  }
  return `M${-hw},${-hh} C${-hw - 1},${-hh * 0.5} ${-hw - 1},${hh * 0.3} ${-hw},${hh * 0.7} C${-hw + 2},${hh * 0.95} ${-2},${hh + 1} 0,${hh + 1} C2,${hh + 1} ${hw - 2},${hh * 0.95} ${hw},${hh * 0.7} C${hw + 1},${hh * 0.3} ${hw + 1},${-hh * 0.5} ${hw},${-hh} C${hw * 0.6},${-hh - 2} ${-hw * 0.6},${-hh - 2} ${-hw},${-hh} Z`;
};

export const PremiumInvisalignVisual: React.FC<{ progress: number }> = ({ progress }) => {
  const gumReveal   = sub(progress, 0, 0.06);
  const teethReveal = sub(progress, 0.02, 0.15);

  // Overall alignment
  const overallAlign = sub(progress, 0.1, 0.95);
  const stage = overallAlign < 0.4 ? 0 : overallAlign < 0.7 ? 1 : 2;
  const stageT = stage === 0
    ? sub(overallAlign, 0, 0.4)
    : stage === 1
      ? sub(overallAlign, 0.4, 0.7)
      : sub(overallAlign, 0.7, 1);

  // Aligner removal / swap animations
  const removePhase1 = sub(progress, 0.28, 0.38);
  const returnPhase1 = sub(progress, 0.38, 0.48);
  const removePhase2 = sub(progress, 0.72, 0.82);
  const isRemoving = removePhase1 > 0 && returnPhase1 < 1;
  const isRemoving2 = removePhase2 > 0 && progress < 0.88;

  let alignerSlideY = 0;
  let alignerOpacity = sub(progress, 0.08, 0.15) * 0.85;

  if (isRemoving) {
    const rT = smoothstep(removePhase1);
    const retT = smoothstep(returnPhase1);
    alignerSlideY = lerp(0, -40, rT) + lerp(0, 40, retT);
    alignerOpacity = lerp(0.85, 0.15, rT) + lerp(0, 0.7, retT);
  }
  if (isRemoving2) {
    const rT = smoothstep(removePhase2);
    alignerSlideY = lerp(0, -40, rT);
    alignerOpacity = lerp(0.85, 0.15, rT);
  }
  if (progress > 0.88) {
    alignerOpacity = sub(progress, 0.88, 0.93) * 0.85;
    alignerSlideY = lerp(-40, 0, sub(progress, 0.88, 0.93));
  }

  // Compute tooth positions
  const positions = TEETH.map(t => {
    const eased = smoothstep(stageT);
    const from = stage;
    const to = Math.min(stage + 1, 2);
    const w = t.crownW * t.scale;
    const h = t.crownH * t.scale;
    return {
      x: t.baseX + lerp(t.xOffsets[from], t.xOffsets[to], eased),
      y: BASE_Y + lerp(t.yOffsets[from], t.yOffsets[to], eased),
      rot: lerp(t.rotations[from], t.rotations[to], eased),
      scale: t.scale,
      type: t.type,
      hasAttachment: t.hasAttachment,
      w, h,
      crown: mkCrown(w, h, t.type),
    };
  });

  // Gum contour
  const gumPath = (() => {
    const pts = positions;
    let d = `M ${pts[0].x - 30},${pts[0].y - 18}`;
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      const yMargin = p.y - p.h * 0.45;
      if (i === 0) {
        d += ` Q ${p.x - 10},${yMargin - 5} ${p.x},${yMargin}`;
      } else {
        const prev = pts[i - 1];
        const midX = (prev.x + p.x) / 2;
        const papY = Math.min(prev.y, p.y) - 20 * Math.min(prev.scale, p.scale);
        d += ` Q ${midX},${papY} ${p.x},${yMargin}`;
      }
    }
    const last = pts[pts.length - 1];
    d += ` Q ${last.x + 20},${last.y - 22} ${last.x + 32},${last.y - 14}`;
    d += ` L ${last.x + 32},${BASE_Y - 85}`;
    d += ` L ${pts[0].x - 30},${BASE_Y - 85} Z`;
    return d;
  })();

  // Aligner shell path
  const alignerPath = (() => {
    const pts = positions;
    const m = 4;
    let d = `M ${pts[0].x - 18},${pts[0].y + pts[0].h / 2 + m}`;
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      const bot = p.y + p.h / 2 + m;
      if (i > 0) {
        const prev = pts[i - 1];
        const midX = (prev.x + p.x) / 2;
        d += ` Q ${midX},${(prev.y + p.y) / 2 + (prev.h + p.h) / 4 + m + 2} ${p.x},${bot}`;
      } else {
        d += ` L ${p.x},${bot}`;
      }
    }
    const last = pts[pts.length - 1];
    d += ` L ${last.x + 18},${last.y + last.h / 2 + m}`;
    d += ` L ${last.x + 18},${last.y - last.h * 0.45 - m}`;
    for (let i = pts.length - 1; i >= 0; i--) {
      const p = pts[i];
      const top = p.y - p.h * 0.45 - m;
      if (i < pts.length - 1) {
        const next = pts[i + 1];
        const midX = (next.x + p.x) / 2;
        d += ` Q ${midX},${(next.y + p.y) / 2 - (next.h + p.h) * 0.225 - m - 2} ${p.x},${top}`;
      } else {
        d += ` L ${p.x},${top}`;
      }
    }
    d += ` L ${pts[0].x - 18},${pts[0].y - pts[0].h * 0.45 - m} Z`;
    return d;
  })();

  const stageLabel = stage === 0 ? "Aligner 1 of 3" : stage === 1 ? "Aligner 2 of 3" : "Aligner 3 of 3";

  return (
    <svg viewBox="0 0 500 400" overflow="visible" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Tooth enamel */}
        <radialGradient id="pi2-enamel" cx="0.4" cy="0.3" r="0.6">
          <stop offset="0%" stopColor="#fffef5" />
          <stop offset="25%" stopColor="#f5f0e4" />
          <stop offset="55%" stopColor="#ece4d4" />
          <stop offset="80%" stopColor="#e0d8c4" />
          <stop offset="100%" stopColor="#d4ccb4" />
        </radialGradient>

        {/* Gum */}
        <linearGradient id="pi2-gum" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a85868" />
          <stop offset="30%" stopColor="#c07080" />
          <stop offset="100%" stopColor="#e0a0a8" />
        </linearGradient>

        {/* Aligner fill — clear plastic with slight blue tint */}
        <linearGradient id="pi2-alignerFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(195,210,250,0.16)" />
          <stop offset="50%" stopColor="rgba(195,210,250,0.10)" />
          <stop offset="100%" stopColor="rgba(195,210,250,0.16)" />
        </linearGradient>

        {/* Aligner refraction — offset teeth slightly */}
        <linearGradient id="pi2-refractionHL" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(200,215,255,0.08)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.06)" />
          <stop offset="100%" stopColor="rgba(200,215,255,0.08)" />
        </linearGradient>

        {/* Attachment gradient */}
        <radialGradient id="pi2-attach" cx="0.4" cy="0.3" r="0.6">
          <stop offset="0%" stopColor="#f0e8d8" />
          <stop offset="100%" stopColor="#e0d4c0" />
        </radialGradient>

        {/* Filters */}
        <filter id="pi2-toothShadow" x="-12%" y="-12%" width="124%" height="124%">
          <feDropShadow dx="0.5" dy="1.5" stdDeviation="2" floodColor="#000" floodOpacity="0.22" />
        </filter>
        <filter id="pi2-alignerGlow" x="-5%" y="-5%" width="110%" height="110%">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ======== GUM TISSUE ======== */}
      <g opacity={lerp(0, 1, gumReveal)}>
        <path d={gumPath} fill="url(#pi2-gum)" />
      </g>

      {/* ======== TEETH ======== */}
      <g filter="url(#pi2-toothShadow)">
        {positions.map((pos, i) => {
          const appear = sub(teethReveal, i * 0.05, i * 0.05 + 0.25);
          const ySlide = lerp(22, 0, appear);

          return (
            <g
              key={`tooth-${i}`}
              transform={`translate(${pos.x}, ${pos.y + ySlide}) rotate(${pos.rot})`}
              opacity={lerp(0, 1, appear)}
            >
              {/* Tooth body */}
              <path d={pos.crown} fill="url(#pi2-enamel)" stroke="#b8a888" strokeWidth={0.5} />

              {/* Cervical line */}
              <line x1={-pos.w / 2 + 2} y1={-pos.h / 2 + 2} x2={pos.w / 2 - 2} y2={-pos.h / 2 + 2} stroke="#c8b898" strokeWidth={0.6} opacity={0.2} />

              {/* Highlights */}
              <ellipse cx={-pos.w * 0.1} cy={-pos.h * 0.06} rx={pos.w * 0.1} ry={pos.h * 0.18} fill="white" opacity={0.18} />

              {/* Mamelon / cusp detail */}
              {(pos.type === "centralIncisor" || pos.type === "lateralIncisor") && (
                <g opacity={0.1}>
                  <line x1={-4} y1={pos.h / 2} x2={-4} y2={pos.h / 2 - 5} stroke="#c8b898" strokeWidth={0.4} />
                  <line x1={4} y1={pos.h / 2} x2={4} y2={pos.h / 2 - 5} stroke="#c8b898" strokeWidth={0.4} />
                </g>
              )}
              {pos.type === "canine" && (
                <line x1={0} y1={pos.h * 0.2} x2={0} y2={-pos.h * 0.1} stroke="#d0c4a0" strokeWidth={0.3} opacity={0.12} />
              )}

              {/* Composite attachments */}
              {pos.hasAttachment && (
                <g>
                  <ellipse cx={0} cy={2} rx={5.5} ry={3.8} fill="url(#pi2-attach)" stroke="#d0c8b8" strokeWidth={0.4} />
                  <ellipse cx={-1} cy={0.5} rx={2.5} ry={1.5} fill="white" opacity={0.12} />
                </g>
              )}
            </g>
          );
        })}
      </g>

      {/* ======== CLEAR ALIGNER SHELL ======== */}
      <g
        opacity={alignerOpacity}
        transform={`translate(0, ${alignerSlideY})`}
        filter="url(#pi2-alignerGlow)"
      >
        {/* Main shell */}
        <path d={alignerPath} fill="url(#pi2-alignerFill)" stroke="rgba(180,195,240,0.35)" strokeWidth={1.8} />

        {/* Refraction effect — subtle horizontal highlight band */}
        <rect
          x={positions[0].x - 14}
          y={BASE_Y - 5}
          width={positions[7].x - positions[0].x + 28}
          height={3}
          rx={1.5}
          fill="white"
          opacity={0.08}
        />

        {/* Individual tooth scallop outlines within aligner */}
        {positions.map((pos, i) => (
          <g key={`scallop-${i}`} transform={`translate(${pos.x}, ${pos.y}) rotate(${pos.rot})`}>
            <path
              d={mkCrown(pos.w * 1.06, pos.h * 1.06, pos.type)}
              fill="none"
              stroke="rgba(180,195,240,0.18)"
              strokeWidth={0.7}
            />
          </g>
        ))}

        {/* Edge trim highlights */}
        <line
          x1={positions[0].x - 18} y1={positions[0].y - 25}
          x2={positions[0].x - 18} y2={positions[0].y + 25}
          stroke="rgba(200,220,255,0.25)" strokeWidth={1.2}
        />
        <line
          x1={positions[7].x + 18} y1={positions[7].y - 25}
          x2={positions[7].x + 18} y2={positions[7].y + 25}
          stroke="rgba(200,220,255,0.25)" strokeWidth={1.2}
        />

        {/* Bottom edge specular */}
        <rect
          x={positions[0].x - 10}
          y={BASE_Y + 18}
          width={positions[7].x - positions[0].x + 20}
          height={2}
          rx={1}
          fill="white"
          opacity={0.06}
        />
      </g>

      {/* ======== STAGE INDICATORS ======== */}
      <g opacity={sub(progress, 0.15, 0.25)}>
        {[0, 1, 2].map(s => {
          const isActive = s <= stage;
          const isCurrent = s === stage;
          return (
            <g key={`stage-${s}`}>
              <circle
                cx={215 + s * 38} cy={318}
                r={isCurrent ? 9 : 6.5}
                fill={isActive ? "#7c3aed" : "transparent"}
                stroke="#7c3aed"
                strokeWidth={isCurrent ? 2 : 1.2}
                opacity={isActive ? 1 : 0.3}
              />
              <text
                x={215 + s * 38} y={isCurrent ? 322 : 321}
                textAnchor="middle"
                fill={isActive ? "white" : "#8b7fad"}
                fontSize={isCurrent ? "10" : "9"}
                fontFamily="system-ui, sans-serif"
                fontWeight="600"
              >
                {s + 1}
              </text>
            </g>
          );
        })}

        <text x="253" y="348" textAnchor="middle" fill="#a855f7" fontSize="12" fontFamily="system-ui, sans-serif" fontWeight="500">
          {stageLabel}
        </text>
        <text x="253" y="365" textAnchor="middle" fill="#8b7fad" fontSize="11" fontFamily="system-ui, sans-serif" fontWeight="400">
          Clear aligner therapy
        </text>
      </g>

      {/* Removal annotation */}
      {(isRemoving || isRemoving2) && (
        <g opacity={0.7}>
          <text x="246" y="155" textAnchor="middle" fill="white" fontSize="11" fontFamily="system-ui, sans-serif" fontWeight="500">
            Switching to next aligner...
          </text>
        </g>
      )}
    </svg>
  );
};

export default PremiumInvisalignVisual;
