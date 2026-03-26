import React from "react";

/**
 * Premium Crowding Visual — Bird's-eye (occlusal) view of the UPPER ARCH.
 * Shows 14 teeth from above with anatomically correct occlusal surfaces,
 * realistic overlap patterns, gum tissue around the periphery, and animated
 * force-concentration indicators.
 */

const lerp = (a: number, b: number, t: number) => a + (b - a) * Math.min(1, Math.max(0, t));
const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
const sub = (p: number, s: number, e: number) => clamp((p - s) / (e - s), 0, 1);

// Each tooth positioned along an arch curve (occlusal / bird's-eye view)
// Teeth numbered 1-14: R7 R6 R5 R4 R3 R2 R1 | L1 L2 L3 L4 L5 L6 L7
interface OcclusalTooth {
  cx: number;
  cy: number;
  angle: number; // rotation to follow arch
  w: number;     // mesio-distal width
  h: number;     // bucco-lingual depth
  type: "molar" | "premolar" | "canine" | "lateral" | "central";
  crowdRot: number;
  crowdX: number;
  crowdY: number;
  zOrder: number;
  isProblem: boolean;
}

const TEETH: OcclusalTooth[] = [
  // Right side (viewer's left) — molars to central
  { cx: 108, cy: 285, angle: -55, w: 22, h: 20, type: "molar",    crowdRot: 0,   crowdX: 0,  crowdY: 0,  zOrder: 1, isProblem: false },
  { cx: 128, cy: 255, angle: -45, w: 20, h: 18, type: "molar",    crowdRot: -3,  crowdX: 2,  crowdY: 0,  zOrder: 1, isProblem: false },
  { cx: 148, cy: 225, angle: -35, w: 16, h: 16, type: "premolar", crowdRot: -5,  crowdX: 3,  crowdY: 2,  zOrder: 2, isProblem: false },
  { cx: 164, cy: 198, angle: -25, w: 15, h: 15, type: "premolar", crowdRot: -8,  crowdX: 4,  crowdY: 3,  zOrder: 2, isProblem: true },
  { cx: 178, cy: 170, angle: -15, w: 14, h: 17, type: "canine",   crowdRot: -15, crowdX: 8,  crowdY: 6,  zOrder: 4, isProblem: true },
  { cx: 196, cy: 148, angle: -8,  w: 12, h: 14, type: "lateral",  crowdRot: 18,  crowdX: -5, crowdY: -3, zOrder: 5, isProblem: true },
  { cx: 220, cy: 135, angle: -2,  w: 16, h: 14, type: "central",  crowdRot: 10,  crowdX: 5,  crowdY: 3,  zOrder: 3, isProblem: true },
  // Left side
  { cx: 250, cy: 132, angle: 2,   w: 16, h: 14, type: "central",  crowdRot: -8,  crowdX: -4, crowdY: 2,  zOrder: 3, isProblem: true },
  { cx: 276, cy: 146, angle: 8,   w: 12, h: 14, type: "lateral",  crowdRot: -16, crowdX: 6,  crowdY: -4, zOrder: 5, isProblem: true },
  { cx: 296, cy: 168, angle: 15,  w: 14, h: 17, type: "canine",   crowdRot: 14,  crowdX: -7, crowdY: 5,  zOrder: 4, isProblem: true },
  { cx: 310, cy: 196, angle: 25,  w: 15, h: 15, type: "premolar", crowdRot: 7,   crowdX: -4, crowdY: 3,  zOrder: 2, isProblem: true },
  { cx: 324, cy: 224, angle: 35,  w: 16, h: 16, type: "premolar", crowdRot: 4,   crowdX: -2, crowdY: 1,  zOrder: 2, isProblem: false },
  { cx: 344, cy: 253, angle: 45,  w: 20, h: 18, type: "molar",    crowdRot: 2,   crowdX: -1, crowdY: 0,  zOrder: 1, isProblem: false },
  { cx: 362, cy: 283, angle: 55,  w: 22, h: 20, type: "molar",    crowdRot: 0,   crowdX: 0,  crowdY: 0,  zOrder: 1, isProblem: false },
];

// Render occlusal surface pattern for each tooth type
const OcclusalSurface: React.FC<{ type: string; w: number; h: number }> = ({ type, w, h }) => {
  const hw = w / 2;
  const hh = h / 2;

  if (type === "molar") {
    // 4-5 cusps with central fissure pattern (cross shape)
    return (
      <g>
        {/* Fissure pattern — central pit + grooves */}
        <line x1={-hw * 0.1} y1={-hh * 0.6} x2={-hw * 0.1} y2={hh * 0.6} stroke="#c8b898" strokeWidth={0.6} opacity={0.35} />
        <line x1={-hw * 0.6} y1={0} x2={hw * 0.6} y2={0} stroke="#c8b898" strokeWidth={0.6} opacity={0.35} />
        {/* Cusp tips — small highlights */}
        {[[-hw * 0.35, -hh * 0.35], [hw * 0.3, -hh * 0.35], [-hw * 0.35, hh * 0.35], [hw * 0.3, hh * 0.35], [0, 0]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={1.8} fill="white" opacity={0.12} />
        ))}
        {/* Marginal ridges */}
        <ellipse cx={0} cy={0} rx={hw * 0.75} ry={hh * 0.75} fill="none" stroke="#d0c4a0" strokeWidth={0.4} opacity={0.2} />
      </g>
    );
  }
  if (type === "premolar") {
    // 2 cusps — buccal and lingual
    return (
      <g>
        <line x1={0} y1={-hh * 0.5} x2={0} y2={hh * 0.5} stroke="#c8b898" strokeWidth={0.5} opacity={0.3} />
        <circle cx={-hw * 0.25} cy={0} r={1.5} fill="white" opacity={0.12} />
        <circle cx={hw * 0.25} cy={0} r={1.5} fill="white" opacity={0.12} />
        <ellipse cx={0} cy={0} rx={hw * 0.7} ry={hh * 0.65} fill="none" stroke="#d0c4a0" strokeWidth={0.35} opacity={0.2} />
      </g>
    );
  }
  if (type === "canine") {
    // Single pointed cusp
    return (
      <g>
        <circle cx={0} cy={0} r={2} fill="white" opacity={0.15} />
        {/* Cingulum ridge */}
        <path d={`M${-hw * 0.4},${hh * 0.3} Q0,${hh * 0.5} ${hw * 0.4},${hh * 0.3}`} fill="none" stroke="#c8b898" strokeWidth={0.4} opacity={0.25} />
        {/* Marginal ridges */}
        <path d={`M${-hw * 0.5},${-hh * 0.2} Q0,${-hh * 0.5} ${hw * 0.5},${-hh * 0.2}`} fill="none" stroke="#d0c4a0" strokeWidth={0.35} opacity={0.2} />
      </g>
    );
  }
  // Incisors (central and lateral) — shovel-shaped with cingulum
  return (
    <g>
      {/* Incisal edge */}
      <line x1={-hw * 0.6} y1={-hh * 0.35} x2={hw * 0.6} y2={-hh * 0.35} stroke="#d0c8b0" strokeWidth={0.5} opacity={0.25} />
      {/* Cingulum */}
      <ellipse cx={0} cy={hh * 0.25} rx={hw * 0.3} ry={hh * 0.2} fill="white" opacity={0.08} />
      {/* Marginal ridges */}
      <path d={`M${-hw * 0.55},${-hh * 0.2} L${-hw * 0.55},${hh * 0.3}`} stroke="#d0c4a0" strokeWidth={0.3} opacity={0.18} fill="none" />
      <path d={`M${hw * 0.55},${-hh * 0.2} L${hw * 0.55},${hh * 0.3}`} stroke="#d0c4a0" strokeWidth={0.3} opacity={0.18} fill="none" />
    </g>
  );
};

export const PremiumCrowdingVisual: React.FC<{ progress: number }> = ({ progress }) => {
  const archReveal = sub(progress, 0, 0.3);
  const problemGlow = sub(progress, 0.3, 0.6);
  const forceArrows = sub(progress, 0.6, 1.0);

  const sorted = [...TEETH].map((t, i) => ({ ...t, idx: i })).sort((a, b) => a.zOrder - b.zOrder);

  return (
    <svg viewBox="0 0 500 400" overflow="visible" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Enamel radial gradient — top-down view with center highlight */}
        <radialGradient id="pcr2-enamel" cx="0.45" cy="0.4" r="0.55">
          <stop offset="0%" stopColor="#fffef5" />
          <stop offset="30%" stopColor="#f5f0e4" />
          <stop offset="60%" stopColor="#e8e0d0" />
          <stop offset="85%" stopColor="#dcd4c0" />
          <stop offset="100%" stopColor="#d0c8b0" />
        </radialGradient>

        {/* Problem tooth — slightly warmer */}
        <radialGradient id="pcr2-enamelWarm" cx="0.45" cy="0.4" r="0.55">
          <stop offset="0%" stopColor="#fffcf0" />
          <stop offset="30%" stopColor="#f2ece0" />
          <stop offset="60%" stopColor="#e4dcd0" />
          <stop offset="85%" stopColor="#d8d0c0" />
          <stop offset="100%" stopColor="#ccc4b0" />
        </radialGradient>

        {/* Gum tissue — pink viewed from above */}
        <radialGradient id="pcr2-gum" cx="0.5" cy="0.45" r="0.55">
          <stop offset="0%" stopColor="#e8a0a0" />
          <stop offset="40%" stopColor="#d89090" />
          <stop offset="70%" stopColor="#c87878" />
          <stop offset="100%" stopColor="#b06868" />
        </radialGradient>

        {/* Palatal tissue — center of arch */}
        <radialGradient id="pcr2-palate" cx="0.5" cy="0.35" r="0.6">
          <stop offset="0%" stopColor="#e8b0b0" />
          <stop offset="50%" stopColor="#d8a0a0" />
          <stop offset="100%" stopColor="#c89090" />
        </radialGradient>

        {/* Problem glow */}
        <radialGradient id="pcr2-problemGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="rgba(255,80,40,0.4)" />
          <stop offset="60%" stopColor="rgba(255,80,40,0.1)" />
          <stop offset="100%" stopColor="rgba(255,80,40,0)" />
        </radialGradient>

        {/* Filters */}
        <filter id="pcr2-toothShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0.5" dy="1" stdDeviation="2" floodColor="#1a1008" floodOpacity="0.4" />
        </filter>
        <filter id="pcr2-overlapShadow" x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="1" dy="2" stdDeviation="3" floodColor="#0a0804" floodOpacity="0.55" />
        </filter>
        <filter id="pcr2-softGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" />
        </filter>

        {/* Arrow marker */}
        <marker id="pcr2-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#ff5030" opacity="0.8" />
        </marker>
      </defs>

      {/* ========== PALATAL TISSUE (center of arch) ========== */}
      <g opacity={lerp(0, 1, sub(archReveal, 0, 0.5))}>
        <ellipse cx={235} cy={230} rx={95} ry={75} fill="url(#pcr2-palate)" opacity={0.5} />
        {/* Palatal rugae — wrinkle lines on the palate */}
        {[
          "M190,195 Q220,188 260,195",
          "M195,210 Q225,202 265,208",
          "M200,225 Q230,218 260,224",
          "M205,240 Q232,234 258,239",
        ].map((d, i) => (
          <path key={`rugae-${i}`} d={d} fill="none" stroke="#c89090" strokeWidth={0.6} opacity={0.25} />
        ))}
      </g>

      {/* ========== GUM TISSUE (outer arch border) ========== */}
      <g opacity={lerp(0, 1, sub(archReveal, 0, 0.4))}>
        {/* Outer gum band */}
        <path
          d={`
            M80,305
            Q70,280 80,250
            Q90,210 110,180
            Q135,150 165,130
            Q200,112 235,108
            Q270,112 305,130
            Q335,150 360,180
            Q380,210 390,250
            Q400,280 390,305
            Q370,320 340,310
            Q310,295 280,275
            Q255,260 235,258
            Q215,260 190,275
            Q160,295 130,310
            Q100,320 80,305
            Z
          `}
          fill="url(#pcr2-gum)"
          opacity={0.7}
        />

        {/* Stippled texture on gums */}
        {Array.from({ length: 30 }, (_, i) => {
          const angle = (i / 30) * Math.PI * 1.6 - Math.PI * 0.8;
          const r = 140 + (i % 3) * 8;
          const x = 235 + Math.cos(angle) * r * 0.75;
          const y = 210 + Math.sin(angle) * r * 0.55 + 20;
          return <circle key={`stip-${i}`} cx={x} cy={y} r={0.6} fill="#b07070" opacity={0.2} />;
        })}
      </g>

      {/* ========== TEETH (occlusal view) ========== */}
      {sorted.map(tooth => {
        const i = tooth.idx;
        const stagger = i * 0.04;
        const tProg = sub(archReveal, stagger, stagger + 0.5);
        const opacity = lerp(0, 1, sub(tProg, 0, 0.6));

        const crowdT = sub(tProg, 0.3, 1);
        const cx = tooth.cx + lerp(0, tooth.crowdX, crowdT);
        const cy = tooth.cy + lerp(0, tooth.crowdY, crowdT);
        const rot = tooth.angle + lerp(0, tooth.crowdRot, crowdT);

        const isGlowing = tooth.isProblem && problemGlow > 0;
        const glowOpacity = tooth.isProblem ? problemGlow * 0.6 : 0;
        const filterUrl = tooth.zOrder >= 4 ? "url(#pcr2-overlapShadow)" : "url(#pcr2-toothShadow)";

        return (
          <g
            key={`tooth-${i}`}
            transform={`translate(${cx}, ${cy}) rotate(${rot})`}
            opacity={opacity}
            filter={filterUrl}
          >
            {/* Problem glow behind tooth */}
            {isGlowing && (
              <ellipse
                cx={0} cy={0}
                rx={tooth.w * 0.8} ry={tooth.h * 0.8}
                fill="url(#pcr2-problemGlow)"
                opacity={glowOpacity}
              />
            )}

            {/* Tooth outline — anatomical rounded rectangle */}
            <ellipse
              cx={0} cy={0}
              rx={tooth.w / 2} ry={tooth.h / 2}
              fill={tooth.isProblem ? "url(#pcr2-enamelWarm)" : "url(#pcr2-enamel)"}
              stroke="#b8a888"
              strokeWidth={0.6}
            />

            {/* Inner enamel ring — CEJ visible from above */}
            <ellipse
              cx={0} cy={0}
              rx={tooth.w / 2 - 1.5} ry={tooth.h / 2 - 1.5}
              fill="none"
              stroke="#d0c8b0"
              strokeWidth={0.3}
              opacity={0.3}
            />

            {/* Specular highlight — off-center bright spot */}
            <ellipse
              cx={-tooth.w * 0.12} cy={-tooth.h * 0.15}
              rx={tooth.w * 0.18} ry={tooth.h * 0.22}
              fill="white"
              opacity={0.18}
            />

            {/* Second subtle highlight */}
            <ellipse
              cx={-tooth.w * 0.08} cy={-tooth.h * 0.25}
              rx={tooth.w * 0.08} ry={tooth.h * 0.1}
              fill="white"
              opacity={0.1}
            />

            {/* Occlusal surface anatomy */}
            <OcclusalSurface type={tooth.type} w={tooth.w} h={tooth.h} />

            {/* Problem tint overlay */}
            {isGlowing && (
              <ellipse
                cx={0} cy={0}
                rx={tooth.w / 2} ry={tooth.h / 2}
                fill="rgba(255,60,30,0.06)"
                opacity={problemGlow}
              />
            )}
          </g>
        );
      })}

      {/* ========== PROBLEM ZONE HIGHLIGHTS ========== */}
      <g opacity={lerp(0, 1, problemGlow)}>
        {/* Warm glow zones over crowded areas */}
        {[
          { x: 187, y: 160, rx: 22, ry: 18 },
          { x: 235, y: 138, rx: 25, ry: 16 },
          { x: 286, y: 158, rx: 22, ry: 18 },
        ].map((zone, i) => (
          <ellipse
            key={`zone-${i}`}
            cx={zone.x} cy={zone.y}
            rx={zone.rx} ry={zone.ry}
            fill="rgba(255,80,30,0.12)"
            filter="url(#pcr2-softGlow)"
            opacity={lerp(0, 0.8, sub(problemGlow, i * 0.15, i * 0.15 + 0.6))}
          />
        ))}

        {/* Dashed circles around problem areas */}
        {[
          { x: 187, y: 160, r: 16 },
          { x: 235, y: 138, r: 18 },
          { x: 286, y: 158, r: 16 },
        ].map((c, i) => (
          <circle
            key={`dash-${i}`}
            cx={c.x} cy={c.y} r={c.r}
            fill="none"
            stroke="rgba(255,80,40,0.5)"
            strokeWidth={1}
            strokeDasharray="3,2"
            opacity={lerp(0, 0.7, sub(problemGlow, i * 0.1, i * 0.1 + 0.5))}
          />
        ))}
      </g>

      {/* ========== FORCE CONCENTRATION ARROWS ========== */}
      <g opacity={lerp(0, 1, forceArrows)}>
        {/* Inward-pointing arrows showing compression forces */}
        {[
          { x1: 155, y1: 200, x2: 175, y2: 180 },
          { x1: 170, y1: 135, x2: 190, y2: 148 },
          { x1: 215, y1: 115, x2: 225, y2: 130 },
          { x1: 260, y1: 115, x2: 250, y2: 130 },
          { x1: 305, y1: 135, x2: 285, y2: 148 },
          { x1: 320, y1: 200, x2: 300, y2: 180 },
        ].map((a, i) => (
          <g key={`force-${i}`} opacity={lerp(0, 0.7, sub(forceArrows, i * 0.08, i * 0.08 + 0.5))}>
            <line
              x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2}
              stroke="#ff5030"
              strokeWidth={1.8}
              markerEnd="url(#pcr2-arrow)"
            />
            {/* Pulsing origin dot */}
            <circle cx={a.x1} cy={a.y1} r={2.5} fill="#ff5030" opacity={0.5} />
          </g>
        ))}

        {/* Force label callouts */}
        {[
          { text: "Arch compression", x: 130, y: 115 },
          { text: "Root pressure", x: 340, y: 115 },
          { text: "Overlap zone", x: 235, y: 92 },
        ].map((label, i) => {
          const lp = sub(forceArrows, 0.3 + i * 0.1, 0.6 + i * 0.1);
          const tw = label.text.length * 6.5 + 20;
          return (
            <g key={`label-${i}`} opacity={lerp(0, 1, lp)}>
              <rect
                x={label.x - tw / 2} y={label.y - 12 + lerp(6, 0, lp)}
                width={tw} height={22}
                rx={11}
                fill="rgba(15,8,5,0.88)"
                stroke="rgba(255,80,40,0.4)"
                strokeWidth={0.8}
              />
              <text
                x={label.x} y={label.y + 3 + lerp(6, 0, lp)}
                textAnchor="middle"
                fill="white"
                fontSize="11"
                fontFamily="system-ui, sans-serif"
                fontWeight="500"
              >
                {label.text}
              </text>
            </g>
          );
        })}
      </g>

      {/* ========== BOTTOM LABEL ========== */}
      <g opacity={lerp(0, 1, sub(progress, 0.85, 0.95))}>
        <text
          x="235" y="370"
          textAnchor="middle"
          fill="#ff6040"
          fontSize="13"
          fontFamily="system-ui, sans-serif"
          fontWeight="600"
          letterSpacing="0.05em"
        >
          DENTAL CROWDING — OCCLUSAL VIEW
        </text>
        <text
          x="235" y="388"
          textAnchor="middle"
          fill="#8b7fad"
          fontSize="10"
          fontFamily="system-ui, sans-serif"
          fontWeight="400"
        >
          Insufficient arch space causes teeth to overlap and rotate
        </text>
      </g>
    </svg>
  );
};

export default PremiumCrowdingVisual;
