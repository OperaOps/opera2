import React from "react";

/**
 * Premium Spacing Visual — Frontal smile view with realistic lip outline framing.
 * Shows 8 upper teeth with clear gaps/diastema, deflated papillae in gap areas,
 * measurement lines, and animated drift indicators.
 */

const lerp = (a: number, b: number, t: number) => a + (b - a) * Math.min(1, Math.max(0, t));
const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
const sub = (p: number, s: number, e: number) => clamp((p - s) / (e - s), 0, 1);

// Tooth definitions with gaps — positioned to show spacing
interface SpacedTooth {
  cx: number;
  type: "premolar" | "canine" | "lateral" | "central";
  width: number;
  height: number;
  // Crown outline (frontal)
  crown: string;
}

const mkTooth = (cx: number, type: SpacedTooth["type"], w: number, h: number): SpacedTooth => {
  const hw = w / 2;
  const hh = h / 2;
  let crown: string;
  switch (type) {
    case "central":
      crown = `M${-hw},-${hh} C${-hw - 1},-${hh * 0.6} ${-hw - 1},${hh * 0.2} ${-hw},${hh * 0.7} C${-hw + 2},${hh} ${-2},${hh + 2} 0,${hh + 2} C2,${hh + 2} ${hw - 2},${hh} ${hw},${hh * 0.7} C${hw + 1},${hh * 0.2} ${hw + 1},-${hh * 0.6} ${hw},-${hh} C${hw * 0.6},-${hh + 2} ${-hw * 0.6},-${hh + 2} ${-hw},-${hh} Z`;
      break;
    case "lateral":
      crown = `M${-hw},-${hh} C${-hw - 0.5},-${hh * 0.5} ${-hw - 0.5},${hh * 0.3} ${-hw},${hh * 0.65} C${-hw + 2},${hh * 0.9} ${-1},${hh + 1} 0,${hh + 1} C1,${hh + 1} ${hw - 2},${hh * 0.9} ${hw},${hh * 0.65} C${hw + 0.5},${hh * 0.3} ${hw + 0.5},-${hh * 0.5} ${hw},-${hh} C${hw * 0.5},-${hh + 1.5} ${-hw * 0.5},-${hh + 1.5} ${-hw},-${hh} Z`;
      break;
    case "canine":
      crown = `M${-hw},-${hh} C${-hw - 0.5},-${hh * 0.5} ${-hw},${hh * 0.2} ${-hw + 1},${hh * 0.6} C${-hw + 3},${hh * 0.85} ${-2},${hh + 3} 0,${hh + 4} C2,${hh + 3} ${hw - 3},${hh * 0.85} ${hw - 1},${hh * 0.6} C${hw},${hh * 0.2} ${hw + 0.5},-${hh * 0.5} ${hw},-${hh} C${hw * 0.5},-${hh + 1.5} ${-hw * 0.5},-${hh + 1.5} ${-hw},-${hh} Z`;
      break;
    default: // premolar
      crown = `M${-hw},-${hh} C${-hw - 0.5},-${hh * 0.5} ${-hw},${hh * 0.2} ${-hw + 0.5},${hh * 0.6} C${-hw + 2},${hh * 0.85} ${-1},${hh} 0,${hh} C1,${hh} ${hw - 2},${hh * 0.85} ${hw - 0.5},${hh * 0.6} C${hw},${hh * 0.2} ${hw + 0.5},-${hh * 0.5} ${hw},-${hh} C${hw * 0.5},-${hh + 1} ${-hw * 0.5},-${hh + 1} ${-hw},-${hh} Z`;
      break;
  }
  return { cx, type, width: w, height: h, crown };
};

// 8 upper teeth — centrals have a wide gap (diastema)
const baseY = 210;
const TEETH: SpacedTooth[] = [
  mkTooth(72,  "premolar", 24, 40),
  mkTooth(116, "canine",   22, 48),
  mkTooth(162, "lateral",  22, 44),
  mkTooth(208, "central",  28, 48),
  // -- DIASTEMA GAP --
  mkTooth(268, "central",  28, 48),
  mkTooth(316, "lateral",  22, 44),
  mkTooth(362, "canine",   22, 48),
  mkTooth(408, "premolar", 24, 40),
];

// Gap definitions between consecutive teeth
interface GapDef {
  leftIdx: number;
  rightIdx: number;
  width: number;
  label: string;
  isPrimary: boolean;
}

const GAPS: GapDef[] = [
  { leftIdx: 0, rightIdx: 1, width: 12, label: "2mm",   isPrimary: false },
  { leftIdx: 1, rightIdx: 2, width: 14, label: "2.5mm", isPrimary: false },
  { leftIdx: 2, rightIdx: 3, width: 14, label: "2mm",   isPrimary: false },
  { leftIdx: 3, rightIdx: 4, width: 32, label: "4.5mm", isPrimary: true },
  { leftIdx: 4, rightIdx: 5, width: 14, label: "2mm",   isPrimary: false },
  { leftIdx: 5, rightIdx: 6, width: 14, label: "2.5mm", isPrimary: false },
  { leftIdx: 6, rightIdx: 7, width: 12, label: "2mm",   isPrimary: false },
];

export const PremiumSpacingVisual: React.FC<{ progress: number }> = ({ progress }) => {
  const lipReveal    = sub(progress, 0, 0.15);
  const teethReveal  = sub(progress, 0.05, 0.35);
  const gapHighlight = sub(progress, 0.30, 0.55);
  const measurePhase = sub(progress, 0.45, 0.75);
  const driftPhase   = sub(progress, 0.65, 0.95);

  return (
    <svg viewBox="0 0 500 400" overflow="visible" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Enamel gradient — warm ivory tones */}
        <radialGradient id="psp2-enamel" cx="0.4" cy="0.3" r="0.6">
          <stop offset="0%" stopColor="#fffef5" />
          <stop offset="25%" stopColor="#f5f0e4" />
          <stop offset="55%" stopColor="#e8e0d0" />
          <stop offset="80%" stopColor="#dcd4c0" />
          <stop offset="100%" stopColor="#d0c8b0" />
        </radialGradient>

        {/* Gum tissue gradient */}
        <linearGradient id="psp2-gum" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#cc7878" />
          <stop offset="25%" stopColor="#e09898" />
          <stop offset="50%" stopColor="#d89090" />
          <stop offset="80%" stopColor="#c88080" />
          <stop offset="100%" stopColor="#b87070" />
        </linearGradient>

        {/* Healthy papilla */}
        <linearGradient id="psp2-papillaHealthy" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e0a0a0" />
          <stop offset="100%" stopColor="#cc8888" />
        </linearGradient>

        {/* Deflated papilla */}
        <linearGradient id="psp2-papillaDeflated" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c07070" />
          <stop offset="100%" stopColor="#a85858" />
        </linearGradient>

        {/* Lip gradient — soft pink/red */}
        <linearGradient id="psp2-lip" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c06060" />
          <stop offset="30%" stopColor="#d87878" />
          <stop offset="50%" stopColor="#cc7070" />
          <stop offset="100%" stopColor="#b85858" />
        </linearGradient>

        {/* Lip highlight */}
        <linearGradient id="psp2-lipHighlight" x1="0.3" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>

        {/* Gap glow */}
        <radialGradient id="psp2-gapGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="rgba(249,115,22,0.35)" />
          <stop offset="60%" stopColor="rgba(249,115,22,0.1)" />
          <stop offset="100%" stopColor="rgba(249,115,22,0)" />
        </radialGradient>

        {/* Diastema pulse */}
        <radialGradient id="psp2-diastemaPulse" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="rgba(239,68,68,0.3)" />
          <stop offset="50%" stopColor="rgba(239,68,68,0.1)" />
          <stop offset="100%" stopColor="rgba(239,68,68,0)" />
        </radialGradient>

        {/* Tooth shadow */}
        <filter id="psp2-toothShadow" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0.8" dy="1.5" stdDeviation="2" floodColor="#1a1008" floodOpacity="0.35" />
        </filter>

        {/* Drift arrow marker */}
        <marker id="psp2-driftArrow" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto">
          <polygon points="0 0, 7 2.5, 0 5" fill="#f97316" opacity="0.7" />
        </marker>
      </defs>

      {/* ======== LIP OUTLINE (framing the smile) ======== */}
      <g opacity={lerp(0, 1, lipReveal)}>
        {/* Upper lip inner curve */}
        <path
          d="M40,158 Q100,142 180,135 Q240,130 250,130 Q260,130 320,135 Q400,142 460,158"
          fill="none"
          stroke="url(#psp2-lip)"
          strokeWidth={5}
          strokeLinecap="round"
          opacity={0.6}
        />
        {/* Upper lip highlight */}
        <path
          d="M60,155 Q120,140 200,134 Q240,131 250,131 Q260,131 300,134 Q380,140 440,155"
          fill="none"
          stroke="url(#psp2-lipHighlight)"
          strokeWidth={2}
          strokeLinecap="round"
        />

        {/* Lower lip inner curve */}
        <path
          d="M50,282 Q120,298 200,305 Q240,308 250,308 Q260,308 300,305 Q380,298 450,282"
          fill="none"
          stroke="url(#psp2-lip)"
          strokeWidth={5}
          strokeLinecap="round"
          opacity={0.5}
        />
        {/* Lower lip highlight */}
        <path
          d="M70,280 Q140,296 210,303 Q240,306 250,306 Q260,306 290,303 Q360,296 430,280"
          fill="none"
          stroke="url(#psp2-lipHighlight)"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
      </g>

      {/* ======== GUM TISSUE ======== */}
      <g opacity={lerp(0, 1, sub(teethReveal, 0, 0.4))}>
        {/* Main gum body */}
        <path
          d={`
            M30,130
            L30,${baseY - 10}
            Q72,${baseY - 30} 116,${baseY - 32}
            Q162,${baseY - 34} 208,${baseY - 36}
            Q238,${baseY - 37} 268,${baseY - 36}
            Q316,${baseY - 34} 362,${baseY - 32}
            Q408,${baseY - 30} 470,${baseY - 10}
            L470,130
            Z
          `}
          fill="url(#psp2-gum)"
          opacity={0.8}
        />

        {/* Scalloped gum margin */}
        <path
          d={`
            M42,${baseY - 14}
            Q57,${baseY - 28} 72,${baseY - 22}
            Q86,${baseY - 34} 98,${baseY - 32}
            Q106,${baseY - 36} 116,${baseY - 28}
            Q130,${baseY - 38} 140,${baseY - 36}
            Q150,${baseY - 40} 162,${baseY - 30}
            Q175,${baseY - 42} 188,${baseY - 40}
            Q198,${baseY - 44} 208,${baseY - 32}
            Q220,${baseY - 36} 238,${baseY - 34}
            Q250,${baseY - 36} 268,${baseY - 32}
            Q280,${baseY - 44} 295,${baseY - 40}
            Q305,${baseY - 42} 316,${baseY - 30}
            Q330,${baseY - 40} 348,${baseY - 36}
            Q355,${baseY - 38} 362,${baseY - 28}
            Q375,${baseY - 36} 390,${baseY - 32}
            Q400,${baseY - 28} 408,${baseY - 22}
            Q425,${baseY - 28} 445,${baseY - 16}
          `}
          fill="none"
          stroke="#b87070"
          strokeWidth={1}
          opacity={0.45}
        />

        {/* Interdental papillae */}
        {GAPS.map((gap, i) => {
          const lt = TEETH[gap.leftIdx];
          const rt = TEETH[gap.rightIdx];
          const midX = (lt.cx + rt.cx) / 2;
          const papBase = baseY - 26;

          if (gap.isPrimary || gap.width > 12) {
            // Deflated / absent papilla — flat, receded
            return (
              <g key={`pap-${i}`}>
                <path
                  d={`M${midX - 10},${papBase + 4} Q${midX},${papBase + 1} ${midX + 10},${papBase + 4}`}
                  fill="url(#psp2-papillaDeflated)"
                  opacity={0.5}
                />
                {/* Recession line */}
                <path
                  d={`M${midX - 5},${papBase + 3} Q${midX},${papBase + 6} ${midX + 5},${papBase + 3}`}
                  fill="none" stroke="#a06060" strokeWidth={0.4} opacity={0.4}
                />
              </g>
            );
          }
          // Slightly blunted papilla for smaller gaps
          return (
            <path
              key={`pap-${i}`}
              d={`M${midX - 8},${papBase + 3} Q${midX},${papBase - 8} ${midX + 8},${papBase + 3}`}
              fill="url(#psp2-papillaHealthy)"
              opacity={0.6}
            />
          );
        })}
      </g>

      {/* ======== TEETH ======== */}
      {TEETH.map((tooth, i) => {
        const stagger = i * 0.07;
        const tProg = sub(teethReveal, stagger, stagger + 0.45);
        const slideY = lerp(40, 0, tProg);
        const opacity = lerp(0, 1, sub(tProg, 0, 0.5));

        return (
          <g
            key={`tooth-${i}`}
            transform={`translate(${tooth.cx}, ${baseY + slideY})`}
            opacity={opacity}
            filter="url(#psp2-toothShadow)"
          >
            {/* Root hint (slightly visible behind gum) */}
            <ellipse
              cx={0} cy={-tooth.height / 2 - 5}
              rx={tooth.width * 0.25} ry={8}
              fill="#e0d4b8" opacity={0.15}
            />

            {/* Tooth crown body */}
            <path
              d={tooth.crown}
              fill="url(#psp2-enamel)"
              stroke="#b8a888"
              strokeWidth={0.5}
            />

            {/* Enamel gradient overlay for depth */}
            <path
              d={tooth.crown}
              fill="none"
              stroke="#f5f0e4"
              strokeWidth={0.3}
              opacity={0.3}
            />

            {/* Cervical line — darker band at gum junction */}
            <line
              x1={-tooth.width / 2 + 2} y1={-tooth.height / 2 + 3}
              x2={tooth.width / 2 - 2} y2={-tooth.height / 2 + 3}
              stroke="#c8b898" strokeWidth={0.8} opacity={0.2}
            />

            {/* Specular highlights */}
            <ellipse
              cx={-tooth.width * 0.1} cy={-tooth.height * 0.1}
              rx={tooth.width * 0.12} ry={tooth.height * 0.2}
              fill="white" opacity={0.2}
            />
            <ellipse
              cx={-tooth.width * 0.08} cy={-tooth.height * 0.25}
              rx={tooth.width * 0.06} ry={tooth.height * 0.08}
              fill="white" opacity={0.12}
            />

            {/* Surface detail per type */}
            {tooth.type === "central" && (
              <g opacity={0.15}>
                {/* Mamelon ridges */}
                <line x1={-5} y1={tooth.height / 2} x2={-5} y2={tooth.height / 2 - 6} stroke="#c8b898" strokeWidth={0.4} />
                <line x1={0} y1={tooth.height / 2 + 1} x2={0} y2={tooth.height / 2 - 5} stroke="#c8b898" strokeWidth={0.4} />
                <line x1={5} y1={tooth.height / 2} x2={5} y2={tooth.height / 2 - 6} stroke="#c8b898" strokeWidth={0.4} />
                {/* Developmental grooves */}
                <path d={`M${-tooth.width * 0.3},-${tooth.height * 0.1} L${-tooth.width * 0.3},${tooth.height * 0.2}`} stroke="#d0c4a0" strokeWidth={0.3} fill="none" />
                <path d={`M${tooth.width * 0.3},-${tooth.height * 0.1} L${tooth.width * 0.3},${tooth.height * 0.2}`} stroke="#d0c4a0" strokeWidth={0.3} fill="none" />
              </g>
            )}
            {tooth.type === "canine" && (
              <g opacity={0.18}>
                <path d={`M${-3},${tooth.height * 0.3} L0,${tooth.height / 2 + 3} L3,${tooth.height * 0.3}`} fill="none" stroke="#c8b898" strokeWidth={0.4} />
                {/* Labial ridge */}
                <line x1={0} y1={-tooth.height * 0.2} x2={0} y2={tooth.height * 0.2} stroke="#d0c4a0" strokeWidth={0.3} />
              </g>
            )}
            {tooth.type === "premolar" && (
              <g opacity={0.15}>
                <line x1={-3} y1={tooth.height / 2 - 2} x2={-3} y2={tooth.height / 2 - 8} stroke="#c8b898" strokeWidth={0.4} />
                <line x1={3} y1={tooth.height / 2 - 2} x2={3} y2={tooth.height / 2 - 8} stroke="#c8b898" strokeWidth={0.4} />
              </g>
            )}
          </g>
        );
      })}

      {/* ======== GAP HIGHLIGHTS + MEASUREMENTS ======== */}
      <g opacity={lerp(0, 1, gapHighlight)}>
        {GAPS.map((gap, i) => {
          const lt = TEETH[gap.leftIdx];
          const rt = TEETH[gap.rightIdx];
          const midX = (lt.cx + rt.cx) / 2;
          const gp = sub(gapHighlight, i * 0.06, i * 0.06 + 0.5);

          return (
            <g key={`gap-hl-${i}`} opacity={lerp(0, 1, gp)}>
              {/* Vertical glow stripe */}
              <rect
                x={midX - gap.width / 2 - 2}
                y={baseY - 30}
                width={gap.width + 4}
                height={60}
                rx={3}
                fill={gap.isPrimary ? "url(#psp2-diastemaPulse)" : "url(#psp2-gapGlow)"}
                opacity={0.7}
              />
            </g>
          );
        })}
      </g>

      {/* Measurement brackets */}
      <g opacity={lerp(0, 1, measurePhase)}>
        {GAPS.map((gap, i) => {
          const lt = TEETH[gap.leftIdx];
          const rt = TEETH[gap.rightIdx];
          const leftEdge = lt.cx + lt.width / 2;
          const rightEdge = rt.cx - rt.width / 2;
          const my = baseY + 38;
          const mp = sub(measurePhase, i * 0.06, i * 0.06 + 0.5);
          const color = gap.isPrimary ? "#ef4444" : "#f97316";

          return (
            <g key={`measure-${i}`} opacity={lerp(0, 1, mp)}>
              {/* Bracket lines */}
              <line x1={leftEdge} y1={my - 5} x2={leftEdge} y2={my + 2} stroke={color} strokeWidth={0.8} opacity={0.7} />
              <line x1={rightEdge} y1={my - 5} x2={rightEdge} y2={my + 2} stroke={color} strokeWidth={0.8} opacity={0.7} />
              <line x1={leftEdge} y1={my - 1} x2={rightEdge} y2={my - 1} stroke={color} strokeWidth={0.8} opacity={0.6} />
              {/* Arrow tips */}
              <polygon points={`${leftEdge},${my - 1} ${leftEdge + 3},${my - 3} ${leftEdge + 3},${my + 1}`} fill={color} opacity={0.6} />
              <polygon points={`${rightEdge},${my - 1} ${rightEdge - 3},${my - 3} ${rightEdge - 3},${my + 1}`} fill={color} opacity={0.6} />
              {/* Label */}
              <text
                x={(leftEdge + rightEdge) / 2} y={my + 14}
                textAnchor="middle"
                fill={color}
                fontSize={gap.isPrimary ? "11" : "9"}
                fontFamily="system-ui, sans-serif"
                fontWeight={gap.isPrimary ? "600" : "500"}
              >
                {gap.label}
              </text>
            </g>
          );
        })}
      </g>

      {/* ======== DRIFT DIRECTION ARROWS ======== */}
      <g opacity={lerp(0, 0.7, driftPhase)}>
        {/* Arrows showing teeth could drift into gaps */}
        {[
          { x1: 195, y1: baseY, x2: 215, y2: baseY },   // right central drifting right
          { x1: 280, y1: baseY, x2: 260, y2: baseY },   // left central drifting left
          { x1: 148, y1: baseY - 5, x2: 158, y2: baseY - 5 },
          { x1: 330, y1: baseY - 5, x2: 320, y2: baseY - 5 },
        ].map((a, i) => (
          <line
            key={`drift-${i}`}
            x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2}
            stroke="#f97316"
            strokeWidth={1.5}
            markerEnd="url(#psp2-driftArrow)"
            opacity={lerp(0, 0.7, sub(driftPhase, i * 0.12, i * 0.12 + 0.5))}
          />
        ))}

        {/* "Diastema" label */}
        {driftPhase > 0.3 && (
          <g opacity={lerp(0, 1, sub(driftPhase, 0.3, 0.6))}>
            <rect x={210} y={baseY - 60} width={60} height={22} rx={11} fill="rgba(15,5,5,0.9)" stroke="rgba(239,68,68,0.5)" strokeWidth={0.8} />
            <text x={240} y={baseY - 45} textAnchor="middle" fill="#ef4444" fontSize="10" fontFamily="system-ui, sans-serif" fontWeight="600">
              Diastema
            </text>
            {/* Leader line */}
            <line x1={240} y1={baseY - 38} x2={240} y2={baseY - 28} stroke="rgba(239,68,68,0.4)" strokeWidth={0.8} strokeDasharray="3,2" />
          </g>
        )}
      </g>

      {/* ======== CALLOUT LABELS ======== */}
      {[
        { text: "Food trapping risk", x: 120, y: 340, lx: 135, ly: baseY + 15, start: 0.6 },
        { text: "Bone loss risk", x: 370, y: 340, lx: 365, ly: baseY + 15, start: 0.7 },
        { text: "Missing papilla", x: 240, y: 120, lx: 240, ly: baseY - 32, start: 0.65 },
      ].map((c, i) => {
        const cp = sub(progress, c.start, c.start + 0.12);
        const tw = c.text.length * 6.8 + 22;
        return (
          <g key={`call-${i}`} opacity={lerp(0, 1, cp)}>
            <line x1={c.x} y1={c.y + (c.ly > c.y ? 12 : -12)} x2={c.lx} y2={c.ly} stroke="rgba(249,115,22,0.4)" strokeWidth={0.8} strokeDasharray="4,3" />
            <circle cx={c.lx} cy={c.ly} r={2.5} fill="rgba(249,115,22,0.6)" />
            <rect x={c.x - tw / 2} y={c.y - 11 + lerp(5, 0, cp)} width={tw} height={22} rx={11} fill="rgba(15,8,5,0.9)" stroke="rgba(249,115,22,0.4)" strokeWidth={0.7} />
            <text x={c.x} y={c.y + 3 + lerp(5, 0, cp)} textAnchor="middle" fill="white" fontSize="11" fontFamily="system-ui, sans-serif" fontWeight="500">{c.text}</text>
          </g>
        );
      })}

      {/* ======== BOTTOM LABEL ======== */}
      <g opacity={lerp(0, 1, sub(progress, 0.85, 0.95))}>
        <text x="240" y="378" textAnchor="middle" fill="#f97316" fontSize="13" fontFamily="system-ui, sans-serif" fontWeight="600" letterSpacing="0.04em">
          DENTAL SPACING
        </text>
        <text x="240" y="394" textAnchor="middle" fill="#8b7fad" fontSize="10" fontFamily="system-ui, sans-serif" fontWeight="400">
          Gaps between teeth allow food impaction and bone loss
        </text>
      </g>
    </svg>
  );
};

export default PremiumSpacingVisual;
