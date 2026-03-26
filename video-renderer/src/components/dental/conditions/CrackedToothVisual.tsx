import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../../../lib/colors";

interface CrackedToothVisualProps {
  progress: number;
}

export const CrackedToothVisual: React.FC<CrackedToothVisualProps> = ({
  progress,
}) => {
  const frame = useCurrentFrame();

  // Phase 1: Healthy tooth reveals (0 - 0.2)
  const toothReveal = interpolate(progress, [0, 0.2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 2: Crack appears and grows (0.2 - 0.6)
  const crackGrow = interpolate(progress, [0.2, 0.6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 3: Crack widens, stress lines, danger zone (0.6 - 1.0)
  const dangerPhase = interpolate(progress, [0.6, 1.0], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const labelOpacity = interpolate(progress, [0.65, 0.85], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Crack width widens in phase 3
  const crackWidth = interpolate(dangerPhase, [0, 1], [1.2, 2.4]);

  // Jagged crack path through enamel and dentin
  const crackPathMain =
    "M148,46 L152,58 L146,68 L154,80 L147,92 L153,104 L145,118 L151,132 L144,148 L150,162 L146,178";

  // Slightly offset path for the refraction highlight
  const crackPathHighlight =
    "M149,48 L153,60 L147,70 L155,82 L148,94 L154,106 L146,120 L152,134 L145,150 L151,164 L147,180";

  // Animated crack length via stroke-dashoffset
  const totalCrackLength = 220;
  const dashOffset = interpolate(crackGrow, [0, 1], [totalCrackLength, 0]);

  // Subtle vibration during crack growth
  const isGrowing = crackGrow > 0.05 && crackGrow < 0.95;
  const vibX = isGrowing ? Math.sin(frame * 0.35) * (1 - crackGrow) * 1.8 : 0;

  // Pulsing red glow at crack tip
  const tipPulse = 0.4 + Math.sin(frame * 0.07) * 0.2;

  // Stress line animation
  const stressOpacity = interpolate(dangerPhase, [0, 0.5], [0, 0.25], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Danger zone glow intensity
  const dangerGlow = interpolate(dangerPhase, [0, 1], [0, 0.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <svg viewBox="0 0 300 400" overflow="visible" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Tooth gradients */}
        <linearGradient id="crk-enamelGrad" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor={COLORS.toothWhite} />
          <stop offset="40%" stopColor={COLORS.enamel} />
          <stop offset="100%" stopColor={COLORS.toothShadow} />
        </linearGradient>
        <linearGradient id="crk-dentinGrad" x1="0.3" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="#f7ecd0" />
          <stop offset="100%" stopColor={COLORS.dentin} />
        </linearGradient>
        <radialGradient id="crk-pulpGrad" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#e86070" />
          <stop offset="100%" stopColor={COLORS.pulp} />
        </radialGradient>
        <linearGradient id="crk-gumGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.gumPink} />
          <stop offset="100%" stopColor="#c88898" />
        </linearGradient>
        <linearGradient id="crk-boneGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.bone} />
          <stop offset="100%" stopColor={COLORS.jawbone} />
        </linearGradient>
        <linearGradient id="crk-rootGrad" x1="0.3" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor={COLORS.root} />
          <stop offset="100%" stopColor="#d4c4a0" />
        </linearGradient>

        {/* Danger zone radial gradient */}
        <radialGradient id="crk-dangerZone" cx="50%" cy="45%" r="45%">
          <stop offset="0%" stopColor={COLORS.problemRed} stopOpacity={0.25} />
          <stop offset="60%" stopColor={COLORS.problemRed} stopOpacity={0.08} />
          <stop offset="100%" stopColor={COLORS.problemRed} stopOpacity={0} />
        </radialGradient>

        {/* Filters */}
        <filter id="crk-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.25" />
        </filter>
        <filter id="crk-crackGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="crk-crackGlowOuter" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="crk-tipGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Reveal clip */}
        <clipPath id="crk-reveal">
          <rect
            x="0"
            y={interpolate(toothReveal, [0, 1], [400, 0])}
            width="300"
            height="400"
          />
        </clipPath>
      </defs>

      <g clipPath="url(#crk-reveal)">
        {/* Bone background */}
        <rect
          x="40"
          y="175"
          width="220"
          height="210"
          rx="18"
          fill="url(#crk-boneGrad)"
          opacity={0.45}
        />

        {/* Gum tissue */}
        <ellipse
          cx="150"
          cy="170"
          rx="115"
          ry="28"
          fill="url(#crk-gumGrad)"
          opacity={0.85}
        />

        {/* Tooth structure */}
        <g filter="url(#crk-shadow)" transform={`translate(${vibX}, 0)`}>
          {/* Roots */}
          <path
            d="M115,168 L110,265 C107,300 114,340 126,358 C130,365 136,365 138,358 L148,290 L150,168 Z"
            fill="url(#crk-rootGrad)"
          />
          <path
            d="M150,168 L153,290 L163,358 C165,365 171,365 175,358 C187,340 194,300 191,265 L186,168 Z"
            fill="url(#crk-rootGrad)"
          />

          {/* Pulp canals */}
          <path
            d="M135,166 L132,265 C131,290 133,325 136,340 C137,345 139,345 140,340 L144,280 L146,166 Z"
            fill="url(#crk-pulpGrad)"
            opacity={0.75}
          />
          <path
            d="M154,166 L157,280 L161,340 C162,345 164,345 165,340 C168,325 169,290 168,265 L164,166 Z"
            fill="url(#crk-pulpGrad)"
            opacity={0.75}
          />

          {/* Enamel outer shell */}
          <path
            d="M85,150 C85,118 95,85 112,65 C126,50 142,42 150,42 C158,42 174,50 188,65 C205,85 215,118 215,150 L213,168 L87,168 Z"
            fill="url(#crk-enamelGrad)"
            stroke={COLORS.toothDark}
            strokeWidth={0.5}
          />

          {/* Dentin layer */}
          <path
            d="M95,148 C95,122 103,95 116,77 C128,63 142,55 150,55 C158,55 172,63 184,77 C197,95 205,122 205,148 L203,166 L97,166 Z"
            fill="url(#crk-dentinGrad)"
          />

          {/* Pulp chamber */}
          <path
            d="M132,108 C132,93 138,84 150,84 C162,84 168,93 168,108 L168,166 L132,166 Z"
            fill="url(#crk-pulpGrad)"
          />

          {/* Enamel surface highlight */}
          <ellipse cx="132" cy="82" rx="11" ry="18" fill="white" opacity={0.13} />
          <ellipse cx="165" cy="95" rx="6" ry="12" fill="white" opacity={0.06} />
        </g>

        {/* ===== DANGER ZONE HIGHLIGHT (Phase 3) ===== */}
        {dangerPhase > 0 && (
          <ellipse
            cx="150"
            cy="115"
            rx={55 + Math.sin(frame * 0.04) * 3}
            ry={70 + Math.sin(frame * 0.04) * 3}
            fill="url(#crk-dangerZone)"
            opacity={dangerGlow}
            transform={`translate(${vibX}, 0)`}
          />
        )}

        {/* ===== CRACK SYSTEM ===== */}
        <g transform={`translate(${vibX}, 0)`}>
          {/* Outer red glow around crack */}
          <path
            d={crackPathMain}
            fill="none"
            stroke={COLORS.problemRed}
            strokeWidth={6}
            strokeDasharray={totalCrackLength}
            strokeDashoffset={dashOffset}
            opacity={dangerGlow * 0.15}
            filter="url(#crk-crackGlowOuter)"
            strokeLinecap="round"
          />

          {/* Inner orange glow */}
          <path
            d={crackPathMain}
            fill="none"
            stroke={COLORS.problemOrange}
            strokeWidth={3}
            strokeDasharray={totalCrackLength}
            strokeDashoffset={dashOffset}
            opacity={interpolate(crackGrow, [0.3, 1], [0, 0.35], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
            filter="url(#crk-crackGlow)"
            strokeLinecap="round"
          />

          {/* Main jagged crack line */}
          <path
            d={crackPathMain}
            fill="none"
            stroke="#1a0e08"
            strokeWidth={crackWidth}
            strokeDasharray={totalCrackLength}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Light refraction highlight along crack edge */}
          <path
            d={crackPathHighlight}
            fill="none"
            stroke="white"
            strokeWidth={0.4}
            strokeDasharray={totalCrackLength}
            strokeDashoffset={dashOffset}
            opacity={interpolate(crackGrow, [0.2, 1], [0, 0.25], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
            strokeLinecap="round"
          />

          {/* Branching micro-cracks (appear mid-growth) */}
          {crackGrow > 0.4 && (
            <g
              opacity={interpolate(crackGrow, [0.4, 0.8], [0, 0.55], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })}
            >
              <path
                d="M154,80 L164,74 L172,70"
                fill="none"
                stroke="#1a0e08"
                strokeWidth={0.7}
                strokeLinecap="round"
              />
              <path
                d="M147,92 L137,87 L130,83"
                fill="none"
                stroke="#1a0e08"
                strokeWidth={0.6}
                strokeLinecap="round"
              />
              <path
                d="M153,104 L163,99 L170,95"
                fill="none"
                stroke="#1a0e08"
                strokeWidth={0.55}
                strokeLinecap="round"
              />
              <path
                d="M145,118 L136,114 L130,111"
                fill="none"
                stroke="#1a0e08"
                strokeWidth={0.5}
                strokeLinecap="round"
              />
              <path
                d="M151,132 L160,127 L166,124"
                fill="none"
                stroke="#1a0e08"
                strokeWidth={0.45}
                strokeLinecap="round"
              />
              {/* Glow on micro-cracks */}
              <path
                d="M154,80 L164,74 L172,70"
                fill="none"
                stroke={COLORS.problemRed}
                strokeWidth={2.5}
                opacity={dangerGlow * 0.15}
                filter="url(#crk-crackGlow)"
                strokeLinecap="round"
              />
              <path
                d="M147,92 L137,87 L130,83"
                fill="none"
                stroke={COLORS.problemRed}
                strokeWidth={2}
                opacity={dangerGlow * 0.12}
                filter="url(#crk-crackGlow)"
                strokeLinecap="round"
              />
            </g>
          )}

          {/* Red glow at crack tip (stress concentration) */}
          {crackGrow > 0.15 && (
            <circle
              cx={interpolate(crackGrow, [0, 1], [148, 146])}
              cy={interpolate(crackGrow, [0, 1], [46, 178])}
              r={4 + Math.sin(frame * 0.08) * 1}
              fill={COLORS.problemRed}
              opacity={tipPulse * crackGrow}
              filter="url(#crk-tipGlow)"
            />
          )}

          {/* Impact origin point at top */}
          {crackGrow > 0.05 && (
            <circle
              cx={148}
              cy={46}
              r={2.5 + Math.sin(frame * 0.06) * 0.5}
              fill={COLORS.problemOrange}
              opacity={0.4 * crackGrow}
              filter="url(#crk-crackGlow)"
            />
          )}
        </g>

        {/* ===== STRESS LINES (Phase 3) ===== */}
        {dangerPhase > 0 && (
          <g opacity={stressOpacity} transform={`translate(${vibX}, 0)`}>
            {[30, 65, 100, 135, 170, 205, 240, 275, 310, 345].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const cx = 150;
              const cy = 112;
              const innerR = 48 + (i % 2) * 4;
              const outerR = 60 + Math.sin(frame * 0.04 + i * 0.7) * 4;
              return (
                <line
                  key={`stress-${i}`}
                  x1={cx + Math.cos(rad) * innerR}
                  y1={cy + Math.sin(rad) * innerR}
                  x2={cx + Math.cos(rad) * outerR}
                  y2={cy + Math.sin(rad) * outerR}
                  stroke={COLORS.problemRed}
                  strokeWidth={0.5}
                  opacity={0.3 + Math.sin(frame * 0.03 + i) * 0.15}
                />
              );
            })}
          </g>
        )}

        {/* ===== LABEL ===== */}
        <g opacity={labelOpacity}>
          {/* Leader line */}
          <line
            x1="178"
            y1="100"
            x2="242"
            y2="78"
            stroke={COLORS.problemRed}
            strokeWidth={0.8}
          />
          <circle cx="178" cy="100" r="2" fill={COLORS.problemRed} opacity={0.6} />
          <text
            x="246"
            y="76"
            fill={COLORS.problemRed}
            fontSize="12"
            fontFamily="Inter, sans-serif"
            fontWeight="600"
          >
            Cracked Tooth
          </text>
          <text
            x="246"
            y="91"
            fill={COLORS.textMuted}
            fontSize="9"
            fontFamily="Inter, sans-serif"
          >
            Fracture through enamel
          </text>
          <text
            x="246"
            y="104"
            fill={COLORS.textMuted}
            fontSize="9"
            fontFamily="Inter, sans-serif"
          >
            and dentin layers
          </text>
        </g>
      </g>
    </svg>
  );
};
