import React from "react";

/**
 * Premium Braces Visual — Frontal view with DETAILED metal bracket system.
 * Each bracket is a mini masterpiece: pad, slot, tie wings, rivet detail.
 * Archwire with metallic sheen, colored elastic ligatures, and smooth
 * alignment animation as the star feature.
 */

const lerp = (a: number, b: number, t: number) => a + (b - a) * Math.min(1, Math.max(0, t));
const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
const sub = (p: number, s: number, e: number) => clamp((p - s) / (e - s), 0, 1);
const smoothstep = (t: number) => t * t * (3 - 2 * t);

interface BracesTooth {
  type: "premolar" | "canine" | "lateral" | "central";
  baseX: number;
  scale: number;
  initRot: number;
  initY: number;
  initX: number;
  crownW: number;
  crownH: number;
}

const TEETH: BracesTooth[] = [
  { type: "premolar",       baseX: 78,  scale: 0.78, initRot: -9,  initY: 6,  initX: -5,  crownW: 24, crownH: 38 },
  { type: "canine",         baseX: 122, scale: 0.84, initRot: 14,  initY: -7, initX: 4,   crownW: 22, crownH: 46 },
  { type: "lateral",        baseX: 170, scale: 0.90, initRot: -12, initY: 8,  initX: -3,  crownW: 22, crownH: 42 },
  { type: "central",        baseX: 218, scale: 1.0,  initRot: 7,   initY: -5, initX: 5,   crownW: 28, crownH: 46 },
  { type: "central",        baseX: 270, scale: 1.0,  initRot: -8,  initY: -4, initX: -4,  crownW: 28, crownH: 46 },
  { type: "lateral",        baseX: 318, scale: 0.90, initRot: 10,  initY: 6,  initX: 3,   crownW: 22, crownH: 42 },
  { type: "canine",         baseX: 365, scale: 0.84, initRot: -13, initY: -6, initX: -4,  crownW: 22, crownH: 46 },
  { type: "premolar",       baseX: 410, scale: 0.78, initRot: 8,   initY: 5,  initX: 4,   crownW: 24, crownH: 38 },
];

const BASE_Y = 210;

// Ligature colors — alternating purple and blue
const LIG_COLORS = ["#7c3aed", "#3b82f6", "#7c3aed", "#3b82f6", "#7c3aed", "#3b82f6", "#7c3aed", "#3b82f6"];

// Build a natural tooth crown path
const crownPath = (w: number, h: number, type: string): string => {
  const hw = w / 2;
  const hh = h / 2;
  if (type === "canine") {
    return `M${-hw},${-hh} C${-hw - 1},${-hh * 0.5} ${-hw - 1},${hh * 0.2} ${-hw},${hh * 0.6} C${-hw + 2},${hh * 0.85} ${-2},${hh + 3} 0,${hh + 4} C2,${hh + 3} ${hw - 2},${hh * 0.85} ${hw},${hh * 0.6} C${hw + 1},${hh * 0.2} ${hw + 1},${-hh * 0.5} ${hw},${-hh} C${hw * 0.6},${-hh - 2} ${-hw * 0.6},${-hh - 2} ${-hw},${-hh} Z`;
  }
  if (type === "premolar") {
    return `M${-hw},${-hh} C${-hw - 0.5},${-hh * 0.4} ${-hw},${hh * 0.2} ${-hw + 0.5},${hh * 0.6} C${-hw + 2},${hh * 0.85} ${-1},${hh} 0,${hh} C1,${hh} ${hw - 2},${hh * 0.85} ${hw - 0.5},${hh * 0.6} C${hw},${hh * 0.2} ${hw + 0.5},${-hh * 0.4} ${hw},${-hh} C${hw * 0.5},${-hh - 1} ${-hw * 0.5},${-hh - 1} ${-hw},${-hh} Z`;
  }
  // Central and lateral incisors
  return `M${-hw},${-hh} C${-hw - 1},${-hh * 0.5} ${-hw - 1},${hh * 0.3} ${-hw},${hh * 0.7} C${-hw + 2},${hh * 0.95} ${-2},${hh + 1} 0,${hh + 1} C2,${hh + 1} ${hw - 2},${hh * 0.95} ${hw},${hh * 0.7} C${hw + 1},${hh * 0.3} ${hw + 1},${-hh * 0.5} ${hw},${-hh} C${hw * 0.6},${-hh - 2} ${-hw * 0.6},${-hh - 2} ${-hw},${-hh} Z`;
};

export const PremiumBracesVisual: React.FC<{ progress: number }> = ({ progress }) => {
  const gumReveal      = sub(progress, 0, 0.08);
  const teethReveal    = sub(progress, 0.03, 0.20);
  const bracketsReveal = sub(progress, 0.18, 0.38);
  const wireReveal     = sub(progress, 0.32, 0.48);
  const ligReveal      = sub(progress, 0.42, 0.52);
  const alignProgress  = smoothstep(sub(progress, 0.52, 0.92));
  const gleamSweep     = sub(progress, 0.88, 1.0);

  // Current tooth positions
  const positions = TEETH.map(t => ({
    x: t.baseX + lerp(t.initX, 0, alignProgress),
    y: BASE_Y + lerp(t.initY, 0, alignProgress),
    rot: lerp(t.initRot, 0, alignProgress),
    scale: t.scale,
    type: t.type,
    crownW: t.crownW,
    crownH: t.crownH,
  }));

  // Gum contour
  const gumPath = (() => {
    const pts = positions;
    let d = `M ${pts[0].x - 32},${pts[0].y - 18}`;
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      const yMargin = p.y - p.crownH * p.scale * 0.45;
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
    d += ` Q ${last.x + 20},${last.y - 22} ${last.x + 34},${last.y - 14}`;
    d += ` L ${last.x + 34},${BASE_Y - 85}`;
    d += ` L ${pts[0].x - 32},${BASE_Y - 85} Z`;
    return d;
  })();

  // Archwire path
  const wirePath = (() => {
    const pts = positions.map(p => ({ x: p.x, y: p.y }));
    if (pts.length < 2) return "";
    let d = `M${pts[0].x},${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(0, i - 1)];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[Math.min(pts.length - 1, i + 2)];
      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;
      d += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
    }
    return d;
  })();

  const pseudoFrame = progress * 120;

  return (
    <svg viewBox="0 0 500 400" overflow="visible" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Tooth enamel — warm ivory */}
        <radialGradient id="pb2-enamel" cx="0.4" cy="0.3" r="0.6">
          <stop offset="0%" stopColor="#fffef5" />
          <stop offset="25%" stopColor="#f5f0e4" />
          <stop offset="55%" stopColor="#ece4d4" />
          <stop offset="80%" stopColor="#e0d8c4" />
          <stop offset="100%" stopColor="#d4ccb4" />
        </radialGradient>

        {/* Gum gradient */}
        <linearGradient id="pb2-gum" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a85868" />
          <stop offset="30%" stopColor="#c07080" />
          <stop offset="60%" stopColor="#d4909c" />
          <stop offset="100%" stopColor="#e0a0a8" />
        </linearGradient>

        {/* Steel bracket — realistic metallic gradient */}
        <linearGradient id="pb2-bracket" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e8e8f0" />
          <stop offset="15%" stopColor="#d8d8e0" />
          <stop offset="35%" stopColor="#c8c8d4" />
          <stop offset="55%" stopColor="#b8b8c4" />
          <stop offset="75%" stopColor="#a8a8b4" />
          <stop offset="100%" stopColor="#9898a4" />
        </linearGradient>

        {/* Bracket highlight — top edge */}
        <linearGradient id="pb2-bracketHL" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.45" />
          <stop offset="30%" stopColor="white" stopOpacity="0.1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>

        {/* Bracket side shade */}
        <linearGradient id="pb2-bracketShade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(0,0,0,0.1)" />
          <stop offset="30%" stopColor="rgba(0,0,0,0)" />
          <stop offset="70%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.08)" />
        </linearGradient>

        {/* Archwire gradient */}
        <linearGradient id="pb2-wire" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#a0a0ac" />
          <stop offset="25%" stopColor="#c4c4d0" />
          <stop offset="50%" stopColor="#b4b4c0" />
          <stop offset="75%" stopColor="#c8c8d4" />
          <stop offset="100%" stopColor="#a0a0ac" />
        </linearGradient>

        {/* Filters */}
        <filter id="pb2-toothShadow" x="-12%" y="-12%" width="124%" height="124%">
          <feDropShadow dx="0.5" dy="1.5" stdDeviation="2" floodColor="#000" floodOpacity="0.25" />
        </filter>
        <filter id="pb2-bracketShadow" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0.3" dy="0.8" stdDeviation="1" floodColor="#000" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* ======== GUM TISSUE ======== */}
      <g opacity={lerp(0, 1, gumReveal)}>
        <path d={gumPath} fill="url(#pb2-gum)" />
        {/* Stipple texture */}
        {positions.map((p, i) => (
          <g key={`stip-${i}`}>
            <circle cx={p.x + (i % 2 === 0 ? -6 : 6)} cy={p.y - 38 * p.scale} r={0.7} fill="#b06070" opacity={0.25} />
            <circle cx={p.x + (i % 2 === 0 ? 4 : -4)} cy={p.y - 42 * p.scale} r={0.5} fill="#b06070" opacity={0.2} />
          </g>
        ))}
      </g>

      {/* ======== TEETH ======== */}
      <g filter="url(#pb2-toothShadow)">
        {positions.map((pos, i) => {
          const tooth = TEETH[i];
          const appear = sub(teethReveal, i * 0.06, i * 0.06 + 0.25);
          const ySlide = lerp(22, 0, appear);
          const w = pos.crownW * pos.scale;
          const h = pos.crownH * pos.scale;
          const path = crownPath(w, h, pos.type);

          return (
            <g
              key={`tooth-${i}`}
              transform={`translate(${pos.x}, ${pos.y + ySlide}) rotate(${pos.rot})`}
              opacity={lerp(0, 1, appear)}
            >
              {/* Root hint */}
              <ellipse cx={0} cy={-h / 2 - 4} rx={w * 0.22} ry={6} fill="#e0d4b8" opacity={0.12} />

              {/* Tooth body */}
              <path d={path} fill="url(#pb2-enamel)" stroke="#b8a888" strokeWidth={0.5} />

              {/* Cervical line */}
              <line x1={-w / 2 + 2} y1={-h / 2 + 2} x2={w / 2 - 2} y2={-h / 2 + 2} stroke="#c8b898" strokeWidth={0.6} opacity={0.2} />

              {/* Specular highlights */}
              <ellipse cx={-w * 0.12} cy={-h * 0.08} rx={w * 0.1} ry={h * 0.18} fill="white" opacity={0.2} />
              <ellipse cx={-w * 0.08} cy={-h * 0.22} rx={w * 0.05} ry={h * 0.06} fill="white" opacity={0.12} />

              {/* Surface detail */}
              {(pos.type === "central" || pos.type === "lateral") && (
                <g opacity={0.12}>
                  <line x1={-4} y1={h / 2} x2={-4} y2={h / 2 - 6} stroke="#c8b898" strokeWidth={0.4} />
                  <line x1={4} y1={h / 2} x2={4} y2={h / 2 - 6} stroke="#c8b898" strokeWidth={0.4} />
                </g>
              )}
              {pos.type === "canine" && (
                <line x1={0} y1={h * 0.2} x2={0} y2={-h * 0.15} stroke="#d0c4a0" strokeWidth={0.3} opacity={0.15} />
              )}

              {/* ======== BRACKET ASSEMBLY ======== */}
              <g opacity={sub(bracketsReveal, i * 0.04, i * 0.04 + 0.2)} filter="url(#pb2-bracketShadow)">
                {/* Bracket pad (bonded to tooth) */}
                <rect x={-9} y={-3} width={18} height={14} rx={1.5} fill="#b0b0bc" stroke="#909098" strokeWidth={0.3} opacity={0.45} />

                {/* Bracket body — twin bracket */}
                <rect x={-8} y={-2} width={16} height={12} rx={1.2} fill="url(#pb2-bracket)" stroke="#808090" strokeWidth={0.5} />

                {/* Metallic highlight across top */}
                <rect x={-7} y={-1.5} width={14} height={3} rx={1} fill="url(#pb2-bracketHL)" />

                {/* Side shade for 3D depth */}
                <rect x={-8} y={-2} width={16} height={12} rx={1.2} fill="url(#pb2-bracketShade)" />

                {/* Archwire slot */}
                <rect x={-7} y={2.5} width={14} height={2.8} rx={0.6} fill="#8888a0" />
                <rect x={-7} y={2.5} width={14} height={1.2} rx={0.4} fill="#707088" />

                {/* Left tie wings */}
                <rect x={-11} y={-2} width={4} height={5} rx={0.8} fill="url(#pb2-bracket)" stroke="#808090" strokeWidth={0.3} />
                <rect x={-11} y={5.5} width={4} height={4.5} rx={0.8} fill="url(#pb2-bracket)" stroke="#808090" strokeWidth={0.3} />
                {/* Right tie wings */}
                <rect x={7} y={-2} width={4} height={5} rx={0.8} fill="url(#pb2-bracket)" stroke="#808090" strokeWidth={0.3} />
                <rect x={7} y={5.5} width={4} height={4.5} rx={0.8} fill="url(#pb2-bracket)" stroke="#808090" strokeWidth={0.3} />

                {/* Wing highlights */}
                <rect x={-10.5} y={-1.5} width={3} height={2} rx={0.5} fill="white" opacity={0.15} />
                <rect x={7.5} y={-1.5} width={3} height={2} rx={0.5} fill="white" opacity={0.15} />

                {/* Center rivet */}
                <circle cx={0} cy={3.8} r={1.2} fill="#a0a0ac" stroke="#707080" strokeWidth={0.4} />
                <circle cx={-0.3} cy={3.4} r={0.4} fill="white" opacity={0.25} />

                {/* Elastic ligature ring */}
                <g opacity={sub(ligReveal, i * 0.04, i * 0.04 + 0.15)}>
                  <ellipse cx={0} cy={3.8} rx={9.5} ry={7} fill="none" stroke={LIG_COLORS[i]} strokeWidth={2} opacity={0.5} />
                  <ellipse cx={0} cy={3.8} rx={8.5} ry={6} fill="none" stroke={LIG_COLORS[i]} strokeWidth={0.8} opacity={0.3} />
                  {/* Ligature highlight */}
                  <ellipse cx={-4} cy={1} rx={3} ry={1.5} fill={LIG_COLORS[i]} opacity={0.15} />
                </g>
              </g>
            </g>
          );
        })}
      </g>

      {/* ======== ARCHWIRE ======== */}
      {wireReveal > 0 && (
        <g opacity={wireReveal}>
          {/* Wire shadow */}
          <path d={wirePath} fill="none" stroke="#505060" strokeWidth={0.8} opacity={0.15} transform="translate(0, 1.5)" strokeLinecap="round" strokeDasharray={wireReveal < 1 ? `${wireReveal * 600},600` : "none"} />
          {/* Main wire */}
          <path d={wirePath} fill="none" stroke="url(#pb2-wire)" strokeWidth={2.4} strokeLinecap="round" strokeDasharray={wireReveal < 1 ? `${wireReveal * 600},600` : "none"} />
          {/* Specular highlight */}
          <path d={wirePath} fill="none" stroke="white" strokeWidth={0.7} opacity={0.2} transform="translate(0, -0.8)" strokeLinecap="round" strokeDasharray={wireReveal < 1 ? `${wireReveal * 600},600` : "none"} />
        </g>
      )}

      {/* ======== GLEAM SWEEP (final phase) ======== */}
      {gleamSweep > 0 && (
        <g opacity={gleamSweep * 0.5}>
          <rect
            x={lerp(50, 440, gleamSweep)}
            y={BASE_Y - 30}
            width={25}
            height={60}
            rx={12}
            fill="white"
            opacity={0.12}
          />
        </g>
      )}

      {/* ======== LABELS ======== */}
      <g opacity={sub(progress, 0.48, 0.6)}>
        <text x="244" y="316" textAnchor="middle" fill="white" fontSize="13" fontFamily="system-ui, sans-serif" fontWeight="600">
          Metal Braces Treatment
        </text>
        <text x="244" y="334" textAnchor="middle" fill="#8b7fad" fontSize="11" fontFamily="system-ui, sans-serif" fontWeight="400">
          Brackets and archwire gradually align your teeth
        </text>
      </g>

      {/* Progress indicator during alignment */}
      {alignProgress > 0 && alignProgress < 1 && (
        <g opacity={sub(progress, 0.55, 0.65)}>
          <rect x="172" y="356" width="150" height="3" rx={1.5} fill="#1a1030" stroke="#333" strokeWidth={0.3} />
          <rect x="172" y="356" width={150 * alignProgress} height="3" rx={1.5} fill="#7c3aed" />
          <text x="247" y="374" textAnchor="middle" fill="#8b7fad" fontSize="9" fontFamily="system-ui, sans-serif">
            {Math.round(alignProgress * 100)}% aligned
          </text>
        </g>
      )}
    </svg>
  );
};

export default PremiumBracesVisual;
