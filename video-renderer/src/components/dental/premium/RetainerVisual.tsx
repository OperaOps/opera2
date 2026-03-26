import React from "react";

/**
 * Premium Retainer Visual — Frontal view of perfectly aligned teeth with
 * clear Essix retainer. Retainer descends from above and seats with a
 * visual "click", shield icon, and wear schedule transition (24/7 -> Nights Only).
 */

const lerp = (a: number, b: number, t: number) => a + (b - a) * Math.min(1, Math.max(0, t));
const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
const sub = (p: number, s: number, e: number) => clamp((p - s) / (e - s), 0, 1);
const smoothstep = (t: number) => t * t * (3 - 2 * t);

interface RetainerTooth {
  type: string;
  baseX: number;
  scale: number;
  crownW: number;
  crownH: number;
}

const TEETH: RetainerTooth[] = [
  { type: "premolar",       baseX: 80,  scale: 0.78, crownW: 24, crownH: 38 },
  { type: "canine",         baseX: 125, scale: 0.84, crownW: 22, crownH: 46 },
  { type: "lateralIncisor", baseX: 172, scale: 0.90, crownW: 22, crownH: 42 },
  { type: "centralIncisor", baseX: 220, scale: 1.0,  crownW: 28, crownH: 46 },
  { type: "centralIncisor", baseX: 272, scale: 1.0,  crownW: 28, crownH: 46 },
  { type: "lateralIncisor", baseX: 320, scale: 0.90, crownW: 22, crownH: 42 },
  { type: "canine",         baseX: 367, scale: 0.84, crownW: 22, crownH: 46 },
  { type: "premolar",       baseX: 412, scale: 0.78, crownW: 24, crownH: 38 },
];

const BASE_Y = 210;

// Crown builder
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

export const RetainerVisual: React.FC<{ progress: number }> = ({ progress }) => {
  const reveal          = sub(progress, 0, 0.10);
  const retainerDescend = smoothstep(sub(progress, 0.05, 0.35));
  const clickFlash      = sub(progress, 0.34, 0.40);
  const clickFade       = sub(progress, 0.40, 0.46);
  const shieldAppear    = sub(progress, 0.42, 0.55);
  const schedulePhase1  = sub(progress, 0.58, 0.72);
  const phase1Fade      = sub(progress, 0.76, 0.82);
  const schedulePhase2  = sub(progress, 0.82, 0.95);
  const healthGlow      = sub(progress, 0.70, 1.0);

  const retainerY = lerp(-55, 0, retainerDescend);
  const retainerOpacity = sub(progress, 0.05, 0.15) * 0.9;
  const clickOpacity = clickFlash * (1 - clickFade);

  // Tooth positions (all perfectly aligned)
  const positions = TEETH.map(t => ({
    x: t.baseX,
    y: BASE_Y,
    scale: t.scale,
    type: t.type,
    w: t.crownW * t.scale,
    h: t.crownH * t.scale,
    crown: mkCrown(t.crownW * t.scale, t.crownH * t.scale, t.type),
  }));

  // Gum contour
  const gumPath = (() => {
    const pts = positions;
    let d = `M ${pts[0].x - 30},${pts[0].y - 18}`;
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      const yMargin = p.y - p.h * 0.45;
      if (i === 0) {
        d += ` Q ${p.x - 8},${yMargin - 6} ${p.x},${yMargin}`;
      } else {
        const prev = pts[i - 1];
        const midX = (prev.x + p.x) / 2;
        const papY = Math.min(prev.y, p.y) - 24 * Math.min(prev.scale, p.scale);
        d += ` Q ${midX},${papY} ${p.x},${yMargin}`;
      }
    }
    const last = pts[pts.length - 1];
    d += ` Q ${last.x + 18},${last.y - 22} ${last.x + 32},${last.y - 14}`;
    d += ` L ${last.x + 32},${BASE_Y - 85}`;
    d += ` L ${pts[0].x - 30},${BASE_Y - 85} Z`;
    return d;
  })();

  // Retainer shell path
  const retainerPath = (() => {
    const pts = positions;
    const m = 5;
    let d = `M ${pts[0].x - 20},${pts[0].y + pts[0].h / 2 + m}`;
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
    d += ` L ${last.x + 20},${last.y + last.h / 2 + m}`;
    d += ` L ${last.x + 20},${last.y - last.h * 0.45 - m}`;
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
    d += ` L ${pts[0].x - 20},${pts[0].y - pts[0].h * 0.45 - m} Z`;
    return d;
  })();

  return (
    <svg viewBox="0 0 500 400" overflow="visible" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Tooth enamel — bright, healthy */}
        <radialGradient id="rv2-enamel" cx="0.4" cy="0.3" r="0.55">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="20%" stopColor="#fcfaf5" />
          <stop offset="50%" stopColor="#f5f0e8" />
          <stop offset="80%" stopColor="#ece4d8" />
          <stop offset="100%" stopColor="#e4dcd0" />
        </radialGradient>

        {/* Healthy gum gradient */}
        <linearGradient id="rv2-gum" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b86878" />
          <stop offset="30%" stopColor="#d08090" />
          <stop offset="60%" stopColor="#dda0ac" />
          <stop offset="100%" stopColor="#e8b0b8" />
        </linearGradient>

        {/* Retainer fill — clear plastic, slightly thicker than aligner */}
        <linearGradient id="rv2-retainerFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(185,200,240,0.20)" />
          <stop offset="50%" stopColor="rgba(185,200,240,0.13)" />
          <stop offset="100%" stopColor="rgba(185,200,240,0.20)" />
        </linearGradient>

        {/* Click flash */}
        <radialGradient id="rv2-flash" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="white" stopOpacity="0.5" />
          <stop offset="40%" stopColor="white" stopOpacity="0.2" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>

        {/* Shield glow */}
        <radialGradient id="rv2-shieldGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
        </radialGradient>

        {/* Health glow */}
        <radialGradient id="rv2-healthGlow" cx="50%" cy="48%" r="45%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
        </radialGradient>

        {/* Filters */}
        <filter id="rv2-shadow" x="-12%" y="-12%" width="124%" height="124%">
          <feDropShadow dx="0.5" dy="1.5" stdDeviation="2" floodColor="#000" floodOpacity="0.2" />
        </filter>
        <filter id="rv2-retainerGlow" x="-5%" y="-5%" width="110%" height="110%">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="rv2-iconGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ======== HEALTH GLOW (final phase) ======== */}
      {healthGlow > 0 && (
        <ellipse cx="246" cy="200" rx="180" ry="100" fill="url(#rv2-healthGlow)" opacity={healthGlow} />
      )}

      {/* ======== GUM TISSUE ======== */}
      <g opacity={lerp(0, 1, reveal)}>
        <path d={gumPath} fill="url(#rv2-gum)" />
      </g>

      {/* ======== TEETH (perfectly aligned) ======== */}
      <g filter="url(#rv2-shadow)">
        {positions.map((pos, i) => {
          const appear = sub(reveal, i * 0.05, i * 0.05 + 0.25);
          const ySlide = lerp(16, 0, appear);

          return (
            <g
              key={`tooth-${i}`}
              transform={`translate(${pos.x}, ${pos.y + ySlide}) scale(1)`}
              opacity={lerp(0, 1, appear)}
            >
              {/* Root hint */}
              <ellipse cx={0} cy={-pos.h / 2 - 4} rx={pos.w * 0.2} ry={5} fill="#e0d4b8" opacity={0.1} />

              {/* Tooth body */}
              <path d={pos.crown} fill="url(#rv2-enamel)" stroke="#b8a888" strokeWidth={0.4} />

              {/* Cervical line */}
              <line x1={-pos.w / 2 + 2} y1={-pos.h / 2 + 2} x2={pos.w / 2 - 2} y2={-pos.h / 2 + 2} stroke="#c8b898" strokeWidth={0.5} opacity={0.2} />

              {/* Specular highlights */}
              <ellipse cx={-pos.w * 0.1} cy={-pos.h * 0.06} rx={pos.w * 0.12} ry={pos.h * 0.2} fill="white" opacity={0.22} />
              <ellipse cx={-pos.w * 0.06} cy={-pos.h * 0.22} rx={pos.w * 0.05} ry={pos.h * 0.06} fill="white" opacity={0.12} />

              {/* Surface details */}
              {(pos.type === "centralIncisor" || pos.type === "lateralIncisor") && (
                <g opacity={0.1}>
                  <line x1={-4} y1={pos.h / 2} x2={-4} y2={pos.h / 2 - 5} stroke="#c8b898" strokeWidth={0.4} />
                  <line x1={4} y1={pos.h / 2} x2={4} y2={pos.h / 2 - 5} stroke="#c8b898" strokeWidth={0.4} />
                </g>
              )}
              {pos.type === "canine" && (
                <line x1={0} y1={pos.h * 0.2} x2={0} y2={-pos.h * 0.1} stroke="#d0c4a0" strokeWidth={0.3} opacity={0.12} />
              )}

              {/* Health glow on each tooth */}
              {healthGlow > 0 && (
                <ellipse cx={0} cy={-2} rx={pos.w * 0.35} ry={pos.h * 0.3} fill="white" opacity={healthGlow * 0.05} />
              )}
            </g>
          );
        })}
      </g>

      {/* ======== RETAINER SHELL ======== */}
      <g
        opacity={retainerOpacity}
        transform={`translate(0, ${retainerY})`}
        filter="url(#rv2-retainerGlow)"
      >
        {/* Main retainer body */}
        <path d={retainerPath} fill="url(#rv2-retainerFill)" stroke="rgba(170,185,230,0.50)" strokeWidth={2.2} />

        {/* Inner border for thickness */}
        <path d={retainerPath} fill="none" stroke="rgba(180,195,240,0.18)" strokeWidth={0.8} />

        {/* Tooth scallops within retainer */}
        {positions.map((pos, i) => (
          <g key={`scallop-${i}`} transform={`translate(${pos.x}, ${pos.y})`}>
            <path
              d={mkCrown(pos.w * 1.08, pos.h * 1.08, pos.type)}
              fill="none" stroke="rgba(170,185,230,0.2)" strokeWidth={0.8}
            />
          </g>
        ))}

        {/* Edge trim highlights */}
        <line x1={positions[0].x - 20} y1={positions[0].y - 28} x2={positions[0].x - 20} y2={positions[0].y + 28} stroke="rgba(190,210,255,0.3)" strokeWidth={1.8} />
        <line x1={positions[7].x + 20} y1={positions[7].y - 28} x2={positions[7].x + 20} y2={positions[7].y + 28} stroke="rgba(190,210,255,0.3)" strokeWidth={1.8} />

        {/* Horizontal specular streaks */}
        <rect x={positions[0].x - 14} y={BASE_Y - 6} width={positions[7].x - positions[0].x + 28} height={3} rx={1.5} fill="white" opacity={0.1} />
        <rect x={positions[0].x - 10} y={BASE_Y + 16} width={positions[7].x - positions[0].x + 20} height={2} rx={1} fill="white" opacity={0.06} />
      </g>

      {/* ======== CLICK FLASH (seating moment) ======== */}
      {clickOpacity > 0 && (
        <g opacity={clickOpacity}>
          {/* Flash at retainer edge contacts */}
          <ellipse cx={positions[0].x - 15} cy={BASE_Y} rx={12} ry={8} fill="url(#rv2-flash)" />
          <ellipse cx={positions[7].x + 15} cy={BASE_Y} rx={12} ry={8} fill="url(#rv2-flash)" />
          {/* Center flash */}
          <ellipse cx={246} cy={BASE_Y} rx={30} ry={15} fill="url(#rv2-flash)" opacity={0.5} />
        </g>
      )}

      {/* ======== SHIELD / PROTECTION ICON ======== */}
      {shieldAppear > 0 && (
        <g transform="translate(246, 138)" opacity={shieldAppear} filter="url(#rv2-iconGlow)">
          {/* Glow behind */}
          <circle cx={0} cy={0} r={20} fill="url(#rv2-shieldGlow)" opacity={0.7} />

          {/* Shield shape */}
          <path
            d="M0,-14 L-12,-8 L-12,2 C-12,10 -4,16 0,18 C4,16 12,10 12,2 L12,-8 Z"
            fill="#10b981" opacity={0.75}
            stroke="#059669" strokeWidth={0.8}
          />
          {/* Shield highlight */}
          <path
            d="M0,-12 L-9,-7 L-9,0 C-9,6 -3,11 0,13"
            fill="white" opacity={0.1}
          />
          {/* Checkmark inside shield */}
          <path d="M-4,2 L-1,5 L5,-2" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />

          {/* Label */}
          <text x={0} y={30} textAnchor="middle" fill="#10b981" fontSize="11" fontFamily="system-ui, sans-serif" fontWeight="600">
            Teeth Protected
          </text>
        </g>
      )}

      {/* ======== WEAR SCHEDULE — Phase 1: 24/7 ======== */}
      {schedulePhase1 > 0 && (
        <g opacity={schedulePhase1 * (1 - phase1Fade)}>
          <rect x="168" y="296" width="156" height="38" rx={19} fill="#1a1030" stroke="#7c3aed" strokeWidth={1} opacity={0.6} />
          {/* Clock icon */}
          <g transform="translate(192, 315)">
            <circle cx={0} cy={0} r={8.5} fill="none" stroke="#a855f7" strokeWidth={1.3} />
            <line x1={0} y1={0} x2={0} y2={-5.5} stroke="#a855f7" strokeWidth={1.3} strokeLinecap="round" />
            <line x1={0} y1={0} x2={4} y2={1} stroke="#a855f7" strokeWidth={1.3} strokeLinecap="round" />
            <circle cx={0} cy={0} r={1} fill="#a855f7" />
          </g>
          <text x="218" y="310" fill="white" fontSize="12" fontFamily="system-ui, sans-serif" fontWeight="600">First 3-6 months</text>
          <text x="218" y="325" fill="#a855f7" fontSize="11" fontFamily="system-ui, sans-serif" fontWeight="500">Wear 24/7</text>
        </g>
      )}

      {/* ======== WEAR SCHEDULE — Phase 2: Nights Only ======== */}
      {schedulePhase2 > 0 && (
        <g opacity={schedulePhase2}>
          <rect x="168" y="296" width="156" height="38" rx={19} fill="#1a1030" stroke="#7c3aed" strokeWidth={1} opacity={0.6} />
          {/* Moon icon */}
          <g transform="translate(192, 315)">
            <path
              d="M-5,-7 C-2,-7 3,-4 3,2 C3,7 0,9 -5,9 C0,8 2,5 2,1.5 C2,-3 -1,-6 -5,-7 Z"
              fill="#a855f7" opacity={0.9}
            />
            <circle cx={5} cy={-5} r={0.9} fill="#a855f7" opacity={0.6} />
            <circle cx={7.5} cy={-2} r={0.6} fill="#a855f7" opacity={0.4} />
            <circle cx={6} cy={-7} r={0.4} fill="#a855f7" opacity={0.3} />
          </g>
          <text x="218" y="310" fill="white" fontSize="12" fontFamily="system-ui, sans-serif" fontWeight="600">Then ongoing</text>
          <text x="218" y="325" fill="#a855f7" fontSize="11" fontFamily="system-ui, sans-serif" fontWeight="500">Nights only</text>
        </g>
      )}

      {/* ======== BOTTOM LABEL ======== */}
      <g opacity={sub(progress, 0.12, 0.25)}>
        <text x="246" y="358" textAnchor="middle" fill="white" fontSize="13" fontFamily="system-ui, sans-serif" fontWeight="600">
          Clear Retainer
        </text>
        <text x="246" y="376" textAnchor="middle" fill="#8b7fad" fontSize="11" fontFamily="system-ui, sans-serif" fontWeight="400">
          Keeps your teeth in their new position
        </text>
      </g>

      {/* ======== PROTECTION ARROWS (after shield) ======== */}
      {shieldAppear > 0.8 && (
        <g opacity={(shieldAppear - 0.8) * 5 * 0.3}>
          <path d={`M${positions[0].x - 38},${BASE_Y} L${positions[0].x - 24},${BASE_Y}`} fill="none" stroke="#10b981" strokeWidth={1.3} strokeLinecap="round" />
          <path d={`M${positions[7].x + 38},${BASE_Y} L${positions[7].x + 24},${BASE_Y}`} fill="none" stroke="#10b981" strokeWidth={1.3} strokeLinecap="round" />
          <path d={`M${positions[0].x - 28},${BASE_Y - 3} L${positions[0].x - 22},${BASE_Y} L${positions[0].x - 28},${BASE_Y + 3}`} fill="none" stroke="#10b981" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" />
          <path d={`M${positions[7].x + 28},${BASE_Y - 3} L${positions[7].x + 22},${BASE_Y} L${positions[7].x + 28},${BASE_Y + 3}`} fill="none" stroke="#10b981" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}
    </svg>
  );
};

export default RetainerVisual;
