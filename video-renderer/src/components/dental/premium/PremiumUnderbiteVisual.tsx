import React from "react";

/**
 * Premium Underbite Visual — Sagittal cross-section with mandibular prognathism.
 * Lower teeth in front of upper, facial profile silhouette showing concave midface,
 * TMJ stress area, wear facets, and negative overjet measurement.
 */

const lerp = (a: number, b: number, t: number) => a + (b - a) * Math.min(1, Math.max(0, t));
const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
const sub = (p: number, s: number, e: number) => clamp((p - s) / (e - s), 0, 1);

interface XTooth {
  x: number;
  label: string;
  crownW: number;
  crownH: number;
  rootLen: number;
  rootW: number;
}

const UPPER: XTooth[] = [
  { x: 150, label: "premolar", crownW: 18, crownH: 22, rootLen: 44, rootW: 7 },
  { x: 200, label: "canine",   crownW: 16, crownH: 28, rootLen: 52, rootW: 6 },
  { x: 248, label: "lateral",  crownW: 16, crownH: 30, rootLen: 48, rootW: 5.5 },
  { x: 300, label: "central",  crownW: 18, crownH: 34, rootLen: 50, rootW: 6 },
];

const LOWER_FORWARD = 24; // mandibular prognathism offset
const LOWER: XTooth[] = [
  { x: 155 + LOWER_FORWARD, label: "premolar", crownW: 16, crownH: 20, rootLen: 38, rootW: 6 },
  { x: 208 + LOWER_FORWARD, label: "canine",   crownW: 14, crownH: 24, rootLen: 44, rootW: 5 },
  { x: 258 + LOWER_FORWARD, label: "lateral",  crownW: 14, crownH: 26, rootLen: 40, rootW: 4.5 },
  { x: 310 + LOWER_FORWARD, label: "central",  crownW: 16, crownH: 28, rootLen: 42, rootW: 5 },
];

const upperJawY = 155;
const lowerJawY = 230;

export const PremiumUnderbiteVisual: React.FC<{ progress: number }> = ({ progress }) => {
  const profileReveal = sub(progress, 0, 0.25);
  const jawReveal     = sub(progress, 0.05, 0.20);
  const indicators    = sub(progress, 0.45, 0.70);
  const wearReveal    = sub(progress, 0.55, 0.80);
  const calloutPhase  = sub(progress, 0.55, 0.92);

  return (
    <svg viewBox="0 0 500 400" overflow="visible" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Bone gradients */}
        <linearGradient id="pub2-boneU" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ece0c4" />
          <stop offset="40%" stopColor="#ddd0b0" />
          <stop offset="100%" stopColor="#c8bc98" />
        </linearGradient>
        <linearGradient id="pub2-boneL" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#ece0c4" />
          <stop offset="40%" stopColor="#ddd0b0" />
          <stop offset="100%" stopColor="#c8bc98" />
        </linearGradient>

        {/* Enamel */}
        <linearGradient id="pub2-enamel" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#fffef5" />
          <stop offset="30%" stopColor="#f4efe6" />
          <stop offset="60%" stopColor="#e8e0d4" />
          <stop offset="100%" stopColor="#dcd4c0" />
        </linearGradient>

        {/* Dentin */}
        <linearGradient id="pub2-dentin" x1="0.3" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="#f5e6c8" />
          <stop offset="100%" stopColor="#e0cca8" />
        </linearGradient>

        {/* Root */}
        <linearGradient id="pub2-root" x1="0.3" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="#ead8b8" />
          <stop offset="100%" stopColor="#d0bc90" />
        </linearGradient>

        {/* Gum */}
        <linearGradient id="pub2-gumU" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d08888" />
          <stop offset="100%" stopColor="#c88080" />
        </linearGradient>
        <linearGradient id="pub2-gumL" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#d08888" />
          <stop offset="100%" stopColor="#c88080" />
        </linearGradient>

        {/* Skin gradient for profile */}
        <linearGradient id="pub2-skin" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(210,185,160,0.3)" />
          <stop offset="100%" stopColor="rgba(210,185,160,0.02)" />
        </linearGradient>

        {/* TMJ glow */}
        <radialGradient id="pub2-tmj" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="rgba(249,115,22,0.5)" />
          <stop offset="50%" stopColor="rgba(249,115,22,0.15)" />
          <stop offset="100%" stopColor="rgba(249,115,22,0)" />
        </radialGradient>

        {/* Wear pattern */}
        <linearGradient id="pub2-wear" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d0bc90" />
          <stop offset="100%" stopColor="#c4a878" />
        </linearGradient>

        {/* Filters */}
        <filter id="pub2-boneShadow" x="-5%" y="-5%" width="110%" height="110%">
          <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#1a1508" floodOpacity="0.18" />
        </filter>
        <filter id="pub2-toothShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0.5" dy="1" stdDeviation="1.5" floodColor="#2a2015" floodOpacity="0.28" />
        </filter>
      </defs>

      {/* ======== FACIAL PROFILE SILHOUETTE ======== */}
      <g opacity={lerp(0, 0.6, profileReveal)}>
        {/* Concave midface profile */}
        <path
          d={`
            M35,25
            Q42,28 44,38
            L46,55
            Q48,68 45,80
            L42,95
            Q38,108 36,120
            L34,140
            Q32,150 30,160
            Q28,170 27,178
            Q26,186 28,194
            Q32,208 36,218
            Q42,232 50,242
            Q58,255 62,264
            Q64,272 60,284
            Q54,298 48,308
            Q42,320 40,335
          `}
          fill="none"
          stroke="rgba(200,180,160,0.45)"
          strokeWidth={1.8}
          strokeLinecap="round"
        />

        {/* Filled profile area */}
        <path
          d={`
            M35,25
            Q42,28 44,38
            L46,55 Q48,68 45,80 L42,95 Q38,108 36,120
            L34,140 Q32,150 30,160 Q28,170 27,178
            Q26,186 28,194 Q32,208 36,218
            Q42,232 50,242 Q58,255 62,264
            Q64,272 60,284 Q54,298 48,308 Q42,320 40,335
            L8,335 L8,25 Z
          `}
          fill="url(#pub2-skin)"
          opacity={0.3}
        />

        {/* Concavity annotations */}
        <g opacity={lerp(0, 0.5, indicators)}>
          {/* Reference vertical from forehead */}
          <line x1={44} y1={38} x2={44} y2={300} stroke="rgba(200,180,160,0.3)" strokeWidth={0.6} strokeDasharray="4,6" />

          {/* Midface recession arrow */}
          <line x1={44} y1={160} x2={28} y2={160} stroke="#f97316" strokeWidth={1} opacity={0.5} />
          <polygon points="28,160 32,158 32,162" fill="#f97316" opacity={0.5} />

          {/* Chin protrusion arrow */}
          <line x1={44} y1={260} x2={62} y2={260} stroke="#f97316" strokeWidth={1} opacity={0.5} />
          <polygon points="62,260 58,258 58,262" fill="#f97316" opacity={0.5} />
        </g>

        {/* Profile labels */}
        <g opacity={lerp(0, 0.4, sub(progress, 0.2, 0.4))}>
          <text x={12} y={115} fill="rgba(200,180,160,0.55)" fontSize="7" fontFamily="system-ui, sans-serif" fontWeight="400" transform="rotate(-90, 12, 115)">
            Recessed midface
          </text>
          <text x={12} y={275} fill="rgba(200,180,160,0.55)" fontSize="7" fontFamily="system-ui, sans-serif" fontWeight="400" transform="rotate(-90, 12, 275)">
            Protruding chin
          </text>
        </g>
      </g>

      <g opacity={lerp(0, 1, jawReveal)}>
        {/* ======== UPPER JAW ======== */}
        <g>
          <path
            d={`
              M90,${upperJawY - 78}
              L90,${upperJawY + 5}
              Q150,${upperJawY + 10} 240,${upperJawY + 14}
              Q290,${upperJawY + 15} 340,${upperJawY + 10}
              Q365,${upperJawY + 5} 380,${upperJawY}
              L380,${upperJawY - 78}
              Z
            `}
            fill="url(#pub2-boneU)" filter="url(#pub2-boneShadow)" opacity={0.55}
          />

          {/* Trabecular texture */}
          {Array.from({ length: 35 }, (_, i) => {
            const x = 100 + (i % 8) * 33 + Math.sin(i * 2.1) * 6;
            const y = upperJawY - 65 + Math.floor(i / 8) * 14 + Math.cos(i * 1.5) * 3;
            return <circle key={`tu-${i}`} cx={x} cy={y} r={0.5} fill="#c4b898" opacity={0.18} />;
          })}

          {/* Cortical outline */}
          <path
            d={`M90,${upperJawY - 78} L90,${upperJawY + 5} Q150,${upperJawY + 10} 240,${upperJawY + 14} Q290,${upperJawY + 15} 340,${upperJawY + 10} Q365,${upperJawY + 5} 380,${upperJawY}`}
            fill="none" stroke="#b8ac90" strokeWidth={1.3} opacity={0.45}
          />

          {/* Upper gum */}
          <path
            d={`
              M95,${upperJawY - 2}
              Q150,${upperJawY + 6} 240,${upperJawY + 12}
              Q290,${upperJawY + 13} 340,${upperJawY + 8}
              Q365,${upperJawY + 3} 375,${upperJawY - 2}
              L375,${upperJawY + 18}
              Q340,${upperJawY + 22} 240,${upperJawY + 24}
              Q150,${upperJawY + 22} 95,${upperJawY + 18}
              Z
            `}
            fill="url(#pub2-gumU)" opacity={0.65}
          />

          {/* Upper teeth */}
          {UPPER.map((t, i) => {
            const tProg = sub(jawReveal, i * 0.05, i * 0.05 + 0.5);
            const op = lerp(0, 1, sub(tProg, 0, 0.5));
            return (
              <g key={`ut-${i}`} transform={`translate(${t.x}, ${upperJawY})`} opacity={op}>
                {/* Root */}
                <path
                  d={`M${-t.rootW},0 L${-t.rootW * 0.7},${-t.rootLen * 0.6} Q0,${-t.rootLen} ${t.rootW * 0.7},${-t.rootLen * 0.6} L${t.rootW},0 Z`}
                  fill="url(#pub2-root)" stroke="#c8b898" strokeWidth={0.4} opacity={0.85}
                />
                {/* Root canal */}
                <path
                  d={`M${-1},0 L${-0.5},${-t.rootLen * 0.55} Q0,${-t.rootLen * 0.7} ${0.5},${-t.rootLen * 0.55} L${1},0 Z`}
                  fill="#d94f5c" opacity={0.5}
                />
                {/* Crown enamel */}
                <g filter="url(#pub2-toothShadow)">
                  <rect x={-t.crownW / 2} y={0} width={t.crownW} height={t.crownH} rx={3} fill="url(#pub2-enamel)" stroke="#b8a888" strokeWidth={0.5} />
                  {/* Dentin */}
                  <rect x={-t.crownW / 2 + 3} y={3} width={t.crownW - 6} height={t.crownH - 6} rx={2} fill="url(#pub2-dentin)" stroke="#d0c0a0" strokeWidth={0.3} opacity={0.7} />
                  {/* Pulp chamber */}
                  <ellipse cx={0} cy={t.crownH * 0.35} rx={t.crownW * 0.12} ry={t.crownH * 0.18} fill="#d94f5c" opacity={0.4} />
                  {/* Highlight */}
                  <ellipse cx={-t.crownW * 0.1} cy={t.crownH * 0.5} rx={t.crownW * 0.1} ry={t.crownH * 0.12} fill="white" opacity={0.15} />
                </g>
                {/* Cervical line */}
                <line x1={-t.crownW / 2 + 1} y1={1} x2={t.crownW / 2 - 1} y2={1} stroke="#c8b898" strokeWidth={0.6} opacity={0.3} />

                {/* Wear facet on incisal edges of anterior teeth */}
                {(t.label === "central" || t.label === "lateral") && (
                  <g opacity={lerp(0, 0.7, wearReveal)}>
                    <ellipse cx={3} cy={t.crownH - 2} rx={4} ry={2} fill="url(#pub2-wear)" opacity={0.6} />
                    <ellipse cx={3} cy={t.crownH - 2} rx={4} ry={2} fill="none" stroke="#b8a060" strokeWidth={0.4} opacity={0.5} />
                  </g>
                )}
              </g>
            );
          })}
        </g>

        {/* ======== LOWER JAW (shifted forward) ======== */}
        <g>
          <path
            d={`
              M90,${lowerJawY + 82}
              L90,${lowerJawY - 5}
              Q150,${lowerJawY - 10} 240,${lowerJawY - 14}
              Q300,${lowerJawY - 16} 370,${lowerJawY - 10}
              Q395,${lowerJawY - 5} 410,${lowerJawY}
              L410,${lowerJawY + 82}
              Z
            `}
            fill="url(#pub2-boneL)" filter="url(#pub2-boneShadow)" opacity={0.55}
          />

          {/* Trabecular texture */}
          {Array.from({ length: 30 }, (_, i) => {
            const x = 105 + (i % 8) * 35 + Math.sin(i * 1.8) * 5;
            const y = lowerJawY + 10 + Math.floor(i / 8) * 15 + Math.cos(i * 2.0) * 3;
            return <circle key={`tl-${i}`} cx={x} cy={y} r={0.5} fill="#c4b898" opacity={0.16} />;
          })}

          {/* Cortical outline */}
          <path
            d={`M90,${lowerJawY + 82} L90,${lowerJawY - 5} Q150,${lowerJawY - 10} 240,${lowerJawY - 14} Q300,${lowerJawY - 16} 370,${lowerJawY - 10} Q395,${lowerJawY - 5} 410,${lowerJawY}`}
            fill="none" stroke="#b8ac90" strokeWidth={1.3} opacity={0.45}
          />

          {/* Lower gum */}
          <path
            d={`
              M95,${lowerJawY + 2}
              Q150,${lowerJawY - 6} 240,${lowerJawY - 12}
              Q300,${lowerJawY - 14} 370,${lowerJawY - 8}
              Q395,${lowerJawY - 3} 405,${lowerJawY + 2}
              L405,${lowerJawY - 18}
              Q370,${lowerJawY - 22} 240,${lowerJawY - 24}
              Q150,${lowerJawY - 22} 95,${lowerJawY - 18}
              Z
            `}
            fill="url(#pub2-gumL)" opacity={0.65}
          />

          {/* Lower teeth */}
          {LOWER.map((t, i) => {
            const tProg = sub(jawReveal, i * 0.05 + 0.1, i * 0.05 + 0.55);
            const op = lerp(0, 1, sub(tProg, 0, 0.5));
            return (
              <g key={`lt-${i}`} transform={`translate(${t.x}, ${lowerJawY})`} opacity={op}>
                {/* Root */}
                <path
                  d={`M${-t.rootW},0 L${-t.rootW * 0.7},${t.rootLen * 0.6} Q0,${t.rootLen} ${t.rootW * 0.7},${t.rootLen * 0.6} L${t.rootW},0 Z`}
                  fill="url(#pub2-root)" stroke="#c8b898" strokeWidth={0.4} opacity={0.85}
                />
                {/* Root canal */}
                <path
                  d={`M${-1},0 L${-0.5},${t.rootLen * 0.55} Q0,${t.rootLen * 0.7} ${0.5},${t.rootLen * 0.55} L${1},0 Z`}
                  fill="#d94f5c" opacity={0.5}
                />
                {/* Crown */}
                <g filter="url(#pub2-toothShadow)">
                  <rect x={-t.crownW / 2} y={-t.crownH} width={t.crownW} height={t.crownH} rx={3} fill="url(#pub2-enamel)" stroke="#b8a888" strokeWidth={0.5} />
                  <rect x={-t.crownW / 2 + 3} y={-t.crownH + 3} width={t.crownW - 6} height={t.crownH - 6} rx={2} fill="url(#pub2-dentin)" stroke="#d0c0a0" strokeWidth={0.3} opacity={0.7} />
                  <ellipse cx={0} cy={-t.crownH * 0.35} rx={t.crownW * 0.12} ry={t.crownH * 0.18} fill="#d94f5c" opacity={0.4} />
                  <ellipse cx={-t.crownW * 0.1} cy={-t.crownH * 0.5} rx={t.crownW * 0.1} ry={t.crownH * 0.12} fill="white" opacity={0.13} />
                </g>
                {/* Cervical line */}
                <line x1={-t.crownW / 2 + 1} y1={-1} x2={t.crownW / 2 - 1} y2={-1} stroke="#c8b898" strokeWidth={0.6} opacity={0.3} />

                {/* Wear facets */}
                {(t.label === "central" || t.label === "lateral") && (
                  <g opacity={lerp(0, 0.7, wearReveal)}>
                    <ellipse cx={-2} cy={-t.crownH + 2} rx={4} ry={2} fill="url(#pub2-wear)" opacity={0.6} />
                    <ellipse cx={-2} cy={-t.crownH + 2} rx={4} ry={2} fill="none" stroke="#b8a060" strokeWidth={0.4} opacity={0.5} />
                  </g>
                )}
              </g>
            );
          })}
        </g>

        {/* ======== TMJ STRESS INDICATOR ======== */}
        <g opacity={lerp(0, 1, indicators)}>
          <ellipse cx={78} cy={162} rx={24} ry={20} fill="url(#pub2-tmj)" opacity={lerp(0, 0.8, indicators)} />
          {/* Stress rays */}
          {[0, 35, 70, 105, 140, 175].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            return (
              <line
                key={`tmj-${i}`}
                x1={78 + Math.cos(rad) * 10} y1={162 + Math.sin(rad) * 8}
                x2={78 + Math.cos(rad) * 22} y2={162 + Math.sin(rad) * 18}
                stroke="#f97316" strokeWidth={0.9}
                opacity={lerp(0, 0.45, sub(indicators, i * 0.08, i * 0.08 + 0.4))}
                strokeLinecap="round"
              />
            );
          })}
          {/* Joint outline */}
          <ellipse cx={78} cy={162} rx={8} ry={6} fill="none" stroke="#f97316" strokeWidth={1.2} opacity={0.5} strokeDasharray="2,2" />
        </g>

        {/* ======== NEGATIVE OVERJET MEASUREMENT ======== */}
        <g opacity={lerp(0, 1, indicators)}>
          {(() => {
            const upperTipX = 300;
            const upperTipY = upperJawY + UPPER[3].crownH;
            const lowerTipX = 310 + LOWER_FORWARD;
            const lowerTipY = lowerJawY - LOWER[3].crownH;
            const mY = (upperTipY + lowerTipY) / 2;

            return (
              <g>
                {/* Measurement line */}
                <line x1={upperTipX} y1={mY} x2={lowerTipX} y2={mY} stroke="#ef4444" strokeWidth={1.8} opacity={0.7} />
                <line x1={upperTipX} y1={mY - 5} x2={upperTipX} y2={mY + 5} stroke="#ef4444" strokeWidth={1} opacity={0.6} />
                <line x1={lowerTipX} y1={mY - 5} x2={lowerTipX} y2={mY + 5} stroke="#ef4444" strokeWidth={1} opacity={0.6} />

                {/* Dashed reference lines */}
                <line x1={upperTipX} y1={upperTipY} x2={upperTipX} y2={mY} stroke="rgba(239,68,68,0.3)" strokeWidth={0.6} strokeDasharray="3,3" />
                <line x1={lowerTipX} y1={lowerTipY} x2={lowerTipX} y2={mY} stroke="rgba(239,68,68,0.3)" strokeWidth={0.6} strokeDasharray="3,3" />

                {/* Label */}
                <text
                  x={(upperTipX + lowerTipX) / 2} y={mY - 10}
                  textAnchor="middle" fill="#ef4444" fontSize="10" fontFamily="system-ui, sans-serif" fontWeight="700"
                >
                  -{Math.round(LOWER_FORWARD * 0.15)}mm overjet
                </text>

                {/* Overlap zone */}
                <rect x={upperTipX} y={upperTipY - 3} width={lowerTipX - upperTipX} height={lowerTipY - upperTipY + 6} rx={3} fill="rgba(239,68,68,0.05)" />
              </g>
            );
          })()}
        </g>

        {/* ======== WEAR PATTERN INDICATORS ======== */}
        <g opacity={lerp(0, 0.7, wearReveal)}>
          {[
            { x: 303, y: upperJawY + UPPER[3].crownH - 2 },
            { x: 251, y: upperJawY + UPPER[2].crownH - 2 },
            { x: 337, y: lowerJawY - LOWER[3].crownH + 2 },
            { x: 285, y: lowerJawY - LOWER[2].crownH + 2 },
          ].map((w, i) => (
            <g key={`wear-${i}`} opacity={lerp(0, 0.55, sub(wearReveal, i * 0.12, i * 0.12 + 0.4))}>
              <line x1={w.x - 3} y1={w.y - 1} x2={w.x + 3} y2={w.y + 1} stroke="#c8a060" strokeWidth={0.7} />
              <line x1={w.x - 2} y1={w.y + 2} x2={w.x + 2} y2={w.y - 2} stroke="#c8a060" strokeWidth={0.7} />
            </g>
          ))}
        </g>
      </g>

      {/* ======== CALLOUT LABELS ======== */}
      {[
        { text: "Negative overjet", x: 410, y: 185, lx: 345, ly: 200, start: 0.55 },
        { text: "TMJ stress zone", x: 90, y: 85, lx: 78, ly: 145, start: 0.62 },
        { text: "Abnormal tooth wear", x: 400, y: 285, lx: 325, ly: lowerJawY - 15, start: 0.72 },
      ].map((c, i) => {
        const cp = sub(calloutPhase, (c.start - 0.55) / 0.37, (c.start - 0.55) / 0.37 + 0.38);
        const tw = c.text.length * 6.8 + 22;
        return (
          <g key={`call-${i}`} opacity={lerp(0, 1, cp)}>
            <line x1={c.x} y1={c.ly > c.y ? c.y + 12 : c.y - 12} x2={c.lx} y2={c.ly} stroke="rgba(249,115,22,0.4)" strokeWidth={0.8} strokeDasharray="4,3" />
            <circle cx={c.lx} cy={c.ly} r={2.5} fill="rgba(249,115,22,0.6)" />
            <rect x={c.x - tw / 2} y={c.y - 11 + lerp(5, 0, cp)} width={tw} height={22} rx={11} fill="rgba(15,8,5,0.9)" stroke="rgba(249,115,22,0.4)" strokeWidth={0.7} />
            <text x={c.x} y={c.y + 3 + lerp(5, 0, cp)} textAnchor="middle" fill="white" fontSize="11" fontFamily="system-ui, sans-serif" fontWeight="500">{c.text}</text>
          </g>
        );
      })}

      {/* ======== BOTTOM LABEL ======== */}
      <g opacity={lerp(0, 1, sub(progress, 0.85, 0.96))}>
        <text x="250" y="378" textAnchor="middle" fill="#f97316" fontSize="13" fontFamily="system-ui, sans-serif" fontWeight="600" letterSpacing="0.04em">
          UNDERBITE
        </text>
        <text x="250" y="394" textAnchor="middle" fill="#8b7fad" fontSize="10" fontFamily="system-ui, sans-serif" fontWeight="400">
          Lower jaw protrudes forward, causing reversed bite and TMJ strain
        </text>
      </g>
    </svg>
  );
};

export default PremiumUnderbiteVisual;
