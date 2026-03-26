import React from "react";

/**
 * Premium Overbite Visual — Side profile cross-section showing deep bite.
 * Shows upper and lower jaws with bone, DETAILED tooth cross-sections
 * (enamel shell, dentin, pulp chamber, root canals, PDL, alveolar bone),
 * animated overbite measurement, and palatal trauma zone.
 */

const lerp = (a: number, b: number, t: number) => a + (b - a) * Math.min(1, Math.max(0, t));
const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
const sub = (p: number, s: number, e: number) => clamp((p - s) / (e - s), 0, 1);

// Upper teeth cross-section definitions
interface XSectionTooth {
  x: number;
  label: string;
  crownW: number;
  crownH: number;
  rootLen: number;
  rootW: number;
}

const UPPER: XSectionTooth[] = [
  { x: 95,  label: "molar",    crownW: 22, crownH: 20, rootLen: 40, rootW: 8 },
  { x: 145, label: "premolar", crownW: 18, crownH: 22, rootLen: 45, rootW: 7 },
  { x: 195, label: "canine",   crownW: 16, crownH: 28, rootLen: 55, rootW: 6 },
  { x: 245, label: "lateral",  crownW: 16, crownH: 30, rootLen: 50, rootW: 5.5 },
  { x: 300, label: "central",  crownW: 18, crownH: 34, rootLen: 52, rootW: 6 },
];

const LOWER: XSectionTooth[] = [
  { x: 105, label: "molar",    crownW: 20, crownH: 18, rootLen: 36, rootW: 7 },
  { x: 155, label: "premolar", crownW: 16, crownH: 20, rootLen: 40, rootW: 6 },
  { x: 205, label: "canine",   crownW: 14, crownH: 24, rootLen: 46, rootW: 5 },
  { x: 255, label: "lateral",  crownW: 14, crownH: 26, rootLen: 42, rootW: 4.5 },
  { x: 305, label: "central",  crownW: 16, crownH: 28, rootLen: 44, rootW: 5 },
];

const upperJawY = 155;
const lowerJawBaseY = 235;
const OVERBITE_MM = 5;

// Render a detailed cross-section tooth
const CrossSectionTooth: React.FC<{
  tooth: XSectionTooth;
  isUpper: boolean;
  baseY: number;
  opacity: number;
  prefix: string;
}> = ({ tooth, isUpper, baseY, opacity, prefix }) => {
  const { crownW, crownH, rootLen, rootW } = tooth;
  const hw = crownW / 2;
  const dir = isUpper ? -1 : 1; // roots go up for upper, down for lower
  const crownTop = isUpper ? -crownH : 0;
  const crownBot = isUpper ? 0 : crownH;

  return (
    <g transform={`translate(${tooth.x}, ${baseY})`} opacity={opacity}>
      {/* ---- Periodontal ligament space (thin halo around root) ---- */}
      <ellipse
        cx={0} cy={dir * (crownH / 2 + rootLen * 0.5)}
        rx={rootW + 2} ry={rootLen * 0.55}
        fill="none" stroke="#c8b080" strokeWidth={0.5} opacity={0.2}
      />

      {/* ---- Root (cementum) ---- */}
      <path
        d={`
          M${-rootW},${isUpper ? crownTop : crownBot}
          L${-rootW * 0.7},${dir * (crownH / 2 + rootLen * 0.6)}
          Q0,${dir * (crownH / 2 + rootLen)} ${rootW * 0.7},${dir * (crownH / 2 + rootLen * 0.6)}
          L${rootW},${isUpper ? crownTop : crownBot}
          Z
        `}
        fill={`url(#${prefix}-rootGrad)`}
        stroke="#c8b898"
        strokeWidth={0.4}
        opacity={0.85}
      />

      {/* ---- Root canal (pulp) ---- */}
      <path
        d={`
          M${-1.2},${isUpper ? crownTop + 2 : crownBot - 2}
          L${-0.6},${dir * (crownH / 2 + rootLen * 0.55)}
          Q0,${dir * (crownH / 2 + rootLen * 0.7)} ${0.6},${dir * (crownH / 2 + rootLen * 0.55)}
          L${1.2},${isUpper ? crownTop + 2 : crownBot - 2}
          Z
        `}
        fill="#d94f5c"
        opacity={0.55}
      />

      {/* ---- Crown: Enamel shell ---- */}
      <rect
        x={-hw} y={Math.min(crownTop, crownBot) - (isUpper ? 0 : crownH)}
        width={crownW} height={crownH}
        rx={3}
        fill={`url(#${prefix}-enamelGrad)`}
        stroke="#b8a888"
        strokeWidth={0.6}
      />

      {/* ---- Dentin layer inside crown ---- */}
      <rect
        x={-hw + 3} y={Math.min(crownTop, crownBot) - (isUpper ? 0 : crownH) + 3}
        width={crownW - 6} height={crownH - 6}
        rx={2}
        fill={`url(#${prefix}-dentinGrad)`}
        stroke="#d0c0a0"
        strokeWidth={0.3}
        opacity={0.75}
      />

      {/* ---- Pulp chamber (inside dentin) ---- */}
      <ellipse
        cx={0}
        cy={isUpper ? -crownH * 0.35 : crownH * 0.35}
        rx={crownW * 0.15}
        ry={crownH * 0.2}
        fill="#d94f5c"
        opacity={0.45}
      />

      {/* ---- Specular highlight on enamel ---- */}
      <ellipse
        cx={-hw * 0.2} cy={isUpper ? -crownH * 0.55 : crownH * 0.55}
        rx={crownW * 0.12} ry={crownH * 0.15}
        fill="white" opacity={0.18}
      />

      {/* ---- Cervical line ---- */}
      <line
        x1={-hw + 1} y1={isUpper ? crownTop + 1 : crownBot - 1}
        x2={hw - 1} y2={isUpper ? crownTop + 1 : crownBot - 1}
        stroke="#c8b898" strokeWidth={0.7} opacity={0.35}
      />

      {/* ---- Enamel edge highlight ---- */}
      <line
        x1={-hw + 2} y1={isUpper ? crownBot - 1 : crownTop + 1}
        x2={hw - 2} y2={isUpper ? crownBot - 1 : crownTop + 1}
        stroke="white" strokeWidth={0.4} opacity={0.2}
      />
    </g>
  );
};

export const PremiumOverbiteVisual: React.FC<{ progress: number }> = ({ progress }) => {
  const jawReveal    = sub(progress, 0, 0.15);
  const biteClose    = sub(progress, 0.15, 0.50);
  const indicators   = sub(progress, 0.45, 0.70);
  const calloutPhase = sub(progress, 0.55, 0.90);

  const lowerJawOffset = lerp(50, 0, biteClose);
  const lowerY = lowerJawBaseY + lowerJawOffset;

  return (
    <svg viewBox="0 0 500 400" overflow="visible" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Bone gradients */}
        <linearGradient id="pob2-boneUpper" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ece0c4" />
          <stop offset="30%" stopColor="#e0d4b4" />
          <stop offset="60%" stopColor="#d4c8a4" />
          <stop offset="100%" stopColor="#c8bc98" />
        </linearGradient>
        <linearGradient id="pob2-boneLower" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#ece0c4" />
          <stop offset="30%" stopColor="#e0d4b4" />
          <stop offset="60%" stopColor="#d4c8a4" />
          <stop offset="100%" stopColor="#c8bc98" />
        </linearGradient>

        {/* Enamel */}
        <linearGradient id="pob2-enamelGrad" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#fffef5" />
          <stop offset="25%" stopColor="#f5f0e4" />
          <stop offset="55%" stopColor="#e8e0d0" />
          <stop offset="80%" stopColor="#dcd4c0" />
          <stop offset="100%" stopColor="#d4ccb4" />
        </linearGradient>

        {/* Dentin */}
        <linearGradient id="pob2-dentinGrad" x1="0.3" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="#f5e6c8" />
          <stop offset="50%" stopColor="#eed8b8" />
          <stop offset="100%" stopColor="#e0cca8" />
        </linearGradient>

        {/* Root */}
        <linearGradient id="pob2-rootGrad" x1="0.3" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="#ead8b8" />
          <stop offset="50%" stopColor="#dcc8a0" />
          <stop offset="100%" stopColor="#d0bc90" />
        </linearGradient>

        {/* Gum tissue */}
        <linearGradient id="pob2-gumUpper" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d08888" />
          <stop offset="40%" stopColor="#e0a0a0" />
          <stop offset="100%" stopColor="#c88080" />
        </linearGradient>
        <linearGradient id="pob2-gumLower" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#d08888" />
          <stop offset="40%" stopColor="#e0a0a0" />
          <stop offset="100%" stopColor="#c88080" />
        </linearGradient>

        {/* Palatal tissue */}
        <linearGradient id="pob2-palate" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d8a0a0" />
          <stop offset="100%" stopColor="#e0b0b0" />
        </linearGradient>

        {/* Trauma glow */}
        <radialGradient id="pob2-trauma" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="rgba(239,68,68,0.45)" />
          <stop offset="55%" stopColor="rgba(239,68,68,0.12)" />
          <stop offset="100%" stopColor="rgba(239,68,68,0)" />
        </radialGradient>

        {/* Filters */}
        <filter id="pob2-boneShadow" x="-5%" y="-5%" width="110%" height="110%">
          <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#1a1508" floodOpacity="0.2" />
        </filter>
        <filter id="pob2-toothShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0.5" dy="1" stdDeviation="1.5" floodColor="#2a2015" floodOpacity="0.3" />
        </filter>
      </defs>

      <g opacity={lerp(0, 1, jawReveal)}>
        {/* ====== UPPER JAW BONE ====== */}
        <g>
          <path
            d={`
              M50,${upperJawY - 85}
              L50,${upperJawY + 8}
              Q100,${upperJawY + 12} 200,${upperJawY + 16}
              Q250,${upperJawY + 18} 320,${upperJawY + 14}
              Q360,${upperJawY + 8} 380,${upperJawY}
              L380,${upperJawY - 85}
              Z
            `}
            fill="url(#pob2-boneUpper)"
            filter="url(#pob2-boneShadow)"
            opacity={0.6}
          />

          {/* Trabecular bone texture — small dots suggesting internal structure */}
          {Array.from({ length: 50 }, (_, i) => {
            const x = 65 + (i % 10) * 30 + Math.sin(i * 2.3) * 8;
            const y = upperJawY - 70 + Math.floor(i / 10) * 14 + Math.cos(i * 1.7) * 4;
            return <circle key={`trab-u-${i}`} cx={x} cy={y} r={0.6 + Math.sin(i) * 0.3} fill="#c4b898" opacity={0.2} />;
          })}

          {/* Cortical bone outline */}
          <path
            d={`
              M50,${upperJawY - 85}
              L50,${upperJawY + 8}
              Q100,${upperJawY + 12} 200,${upperJawY + 16}
              Q250,${upperJawY + 18} 320,${upperJawY + 14}
              Q360,${upperJawY + 8} 380,${upperJawY}
            `}
            fill="none" stroke="#b8ac90" strokeWidth={1.5} opacity={0.5}
          />

          {/* Alveolar crest — scalloped bone around roots */}
          <path
            d={`
              M60,${upperJawY + 4}
              Q78,${upperJawY - 8} 95,${upperJawY + 4}
              Q120,${upperJawY - 10} 145,${upperJawY + 4}
              Q170,${upperJawY - 14} 195,${upperJawY + 4}
              Q220,${upperJawY - 16} 245,${upperJawY + 4}
              Q272,${upperJawY - 16} 300,${upperJawY + 4}
              Q330,${upperJawY - 10} 360,${upperJawY + 2}
            `}
            fill="none" stroke="#c0b498" strokeWidth={0.8} opacity={0.35}
          />

          {/* Palatal tissue */}
          <path
            d={`
              M55,${upperJawY - 80}
              Q200,${upperJawY - 55} 375,${upperJawY - 80}
              L375,${upperJawY - 20}
              Q250,${upperJawY - 10} 55,${upperJawY - 20}
              Z
            `}
            fill="url(#pob2-palate)" opacity={0.25}
          />

          {/* Upper gum tissue */}
          <path
            d={`
              M55,${upperJawY}
              Q100,${upperJawY + 8} 200,${upperJawY + 14}
              Q250,${upperJawY + 16} 320,${upperJawY + 12}
              Q360,${upperJawY + 6} 375,${upperJawY}
              L375,${upperJawY + 20}
              Q320,${upperJawY + 24} 200,${upperJawY + 28}
              Q100,${upperJawY + 24} 55,${upperJawY + 20}
              Z
            `}
            fill="url(#pob2-gumUpper)" opacity={0.7}
          />

          {/* Upper teeth */}
          {UPPER.map((tooth, i) => {
            const tProg = sub(jawReveal, i * 0.05, i * 0.05 + 0.5);
            return (
              <CrossSectionTooth
                key={`upper-${i}`}
                tooth={tooth}
                isUpper={true}
                baseY={upperJawY}
                opacity={lerp(0, 1, tProg)}
                prefix="pob2"
              />
            );
          })}
        </g>

        {/* ====== LOWER JAW BONE ====== */}
        <g transform={`translate(0, ${lowerJawOffset})`}>
          <path
            d={`
              M60,${lowerJawBaseY + 85}
              L60,${lowerJawBaseY - 8}
              Q110,${lowerJawBaseY - 12} 200,${lowerJawBaseY - 16}
              Q250,${lowerJawBaseY - 18} 320,${lowerJawBaseY - 14}
              Q360,${lowerJawBaseY - 8} 390,${lowerJawBaseY}
              L390,${lowerJawBaseY + 85}
              Z
            `}
            fill="url(#pob2-boneLower)"
            filter="url(#pob2-boneShadow)"
            opacity={0.55}
          />

          {/* Trabecular texture — lower jaw */}
          {Array.from({ length: 40 }, (_, i) => {
            const x = 75 + (i % 9) * 32 + Math.sin(i * 1.9) * 7;
            const y = lowerJawBaseY + 10 + Math.floor(i / 9) * 15 + Math.cos(i * 2.1) * 4;
            return <circle key={`trab-l-${i}`} cx={x} cy={y} r={0.5 + Math.sin(i * 1.3) * 0.3} fill="#c4b898" opacity={0.18} />;
          })}

          {/* Cortical outline */}
          <path
            d={`
              M60,${lowerJawBaseY + 85}
              L60,${lowerJawBaseY - 8}
              Q110,${lowerJawBaseY - 12} 200,${lowerJawBaseY - 16}
              Q250,${lowerJawBaseY - 18} 320,${lowerJawBaseY - 14}
              Q360,${lowerJawBaseY - 8} 390,${lowerJawBaseY}
            `}
            fill="none" stroke="#b8ac90" strokeWidth={1.5} opacity={0.45}
          />

          {/* Lower gum tissue */}
          <path
            d={`
              M55,${lowerJawBaseY}
              Q110,${lowerJawBaseY - 8} 200,${lowerJawBaseY - 14}
              Q250,${lowerJawBaseY - 16} 320,${lowerJawBaseY - 12}
              Q360,${lowerJawBaseY - 6} 385,${lowerJawBaseY}
              L385,${lowerJawBaseY - 20}
              Q320,${lowerJawBaseY - 24} 200,${lowerJawBaseY - 28}
              Q110,${lowerJawBaseY - 24} 55,${lowerJawBaseY - 20}
              Z
            `}
            fill="url(#pob2-gumLower)" opacity={0.7}
          />

          {/* Lower teeth */}
          {LOWER.map((tooth, i) => {
            const tProg = sub(jawReveal, i * 0.05 + 0.15, i * 0.05 + 0.55);
            return (
              <CrossSectionTooth
                key={`lower-${i}`}
                tooth={tooth}
                isUpper={false}
                baseY={lowerJawBaseY}
                opacity={lerp(0, 1, tProg)}
                prefix="pob2"
              />
            );
          })}
        </g>

        {/* ====== TRAUMA ZONE ====== */}
        <g opacity={lerp(0, 1, indicators)}>
          <ellipse
            cx={285} cy={upperJawY - 12}
            rx={40} ry={18}
            fill="url(#pob2-trauma)"
            opacity={lerp(0, 0.8, indicators)}
          />
          {/* Trauma marks */}
          {[265, 285, 305].map((tx, i) => (
            <line
              key={`trauma-${i}`}
              x1={tx} y1={upperJawY - 16}
              x2={tx + 4} y2={upperJawY - 10}
              stroke="#ef4444" strokeWidth={1.5}
              opacity={lerp(0, 0.6, sub(indicators, i * 0.15, i * 0.15 + 0.4))}
              strokeLinecap="round"
            />
          ))}
        </g>

        {/* ====== OVERBITE MEASUREMENT ====== */}
        <g opacity={lerp(0, 1, indicators)}>
          {(() => {
            const upperEdge = upperJawY + 34;
            const normalLine = lowerY - 28;
            const measureX = 390;

            return (
              <g>
                {/* Normal reference */}
                <line
                  x1={measureX - 25} y1={normalLine} x2={measureX + 8} y2={normalLine}
                  stroke="rgba(16,185,129,0.5)" strokeWidth={0.8} strokeDasharray="3,3"
                />
                <text x={measureX + 14} y={normalLine + 4} fill="#10b981" fontSize="7" fontFamily="system-ui, sans-serif" fontWeight="500" opacity={0.7}>
                  Normal
                </text>

                {/* Overbite bracket */}
                <line x1={measureX} y1={upperEdge} x2={measureX} y2={normalLine} stroke="#ef4444" strokeWidth={1.8} opacity={0.7} />
                <line x1={measureX - 6} y1={upperEdge} x2={measureX + 6} y2={upperEdge} stroke="#ef4444" strokeWidth={1} opacity={0.6} />
                <line x1={measureX - 6} y1={normalLine} x2={measureX + 6} y2={normalLine} stroke="#ef4444" strokeWidth={1} opacity={0.6} />

                {/* Measurement label */}
                <text
                  x={measureX + 16} y={(upperEdge + normalLine) / 2 + 4}
                  fill="#ef4444" fontSize="11" fontFamily="system-ui, sans-serif" fontWeight="700"
                >
                  {OVERBITE_MM}mm
                </text>
                <text
                  x={measureX + 16} y={(upperEdge + normalLine) / 2 + 16}
                  fill="#ef4444" fontSize="8" fontFamily="system-ui, sans-serif" fontWeight="400" opacity={0.7}
                >
                  overbite
                </text>

                {/* Overlap zone highlight */}
                <rect
                  x={80} y={upperEdge - 3}
                  width={290} height={normalLine - upperEdge + 6}
                  rx={4}
                  fill="rgba(239,68,68,0.05)"
                />
              </g>
            );
          })()}
        </g>

        {/* ====== CALLOUT LABELS ====== */}
        {[
          { text: "Deep vertical overlap", x: 415, y: 180, lx: 330, ly: 195, start: 0.55 },
          { text: "Palatal tissue trauma", x: 405, y: 80, lx: 300, ly: upperJawY - 8, start: 0.62 },
          { text: "Excessive overbite", x: 420, y: 280, lx: 370, ly: lowerY - 15, start: 0.72 },
        ].map((c, i) => {
          const cp = sub(calloutPhase, (c.start - 0.55) / 0.35, (c.start - 0.55) / 0.35 + 0.35);
          const tw = c.text.length * 6.8 + 22;
          return (
            <g key={`call-${i}`} opacity={lerp(0, 1, cp)}>
              <line
                x1={c.x} y1={c.ly > c.y ? c.y + 12 : c.y - 12}
                x2={c.lx} y2={c.ly}
                stroke="rgba(239,68,68,0.4)" strokeWidth={0.8} strokeDasharray="4,3"
              />
              <circle cx={c.lx} cy={c.ly} r={2.5} fill="rgba(239,68,68,0.6)" />
              <rect
                x={c.x - tw / 2} y={c.y - 11 + lerp(5, 0, cp)}
                width={tw} height={22} rx={11}
                fill="rgba(15,6,6,0.9)" stroke="rgba(239,68,68,0.4)" strokeWidth={0.7}
              />
              <text
                x={c.x} y={c.y + 3 + lerp(5, 0, cp)}
                textAnchor="middle" fill="white" fontSize="11" fontFamily="system-ui, sans-serif" fontWeight="500"
              >
                {c.text}
              </text>
            </g>
          );
        })}
      </g>

      {/* ====== BOTTOM LABEL ====== */}
      <g opacity={lerp(0, 1, sub(progress, 0.85, 0.96))}>
        <text x="235" y="378" textAnchor="middle" fill="#ef4444" fontSize="13" fontFamily="system-ui, sans-serif" fontWeight="600" letterSpacing="0.04em">
          DEEP OVERBITE
        </text>
        <text x="235" y="394" textAnchor="middle" fill="#8b7fad" fontSize="10" fontFamily="system-ui, sans-serif" fontWeight="400">
          Upper teeth excessively overlap lower, causing palatal tissue damage
        </text>
      </g>
    </svg>
  );
};

export default PremiumOverbiteVisual;
