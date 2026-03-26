import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../../../lib/colors";

interface GumDiseaseVisualProps {
  progress: number;
}

export const GumDiseaseVisual: React.FC<GumDiseaseVisualProps> = ({ progress }) => {
  const frame = useCurrentFrame();

  const reveal = interpolate(progress, [0, 0.15], [0, 1], {
    extrapolateRight: "clamp",
  });

  const inflammationProgress = interpolate(progress, [0.15, 0.55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const bacteriaOpacity = interpolate(progress, [0.35, 0.65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const recessionProgress = interpolate(progress, [0.4, 0.7], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const labelOpacity = interpolate(progress, [0.7, 0.9], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Gum color transitions from healthy to inflamed
  const gumR = Math.round(interpolate(inflammationProgress, [0, 1], [0xe8, 0xe0]));
  const gumG = Math.round(interpolate(inflammationProgress, [0, 1], [0xa0, 0x45]));
  const gumB = Math.round(interpolate(inflammationProgress, [0, 1], [0xa8, 0x45]));
  const inflamedGumColor = `rgb(${gumR}, ${gumG}, ${gumB})`;

  // Gum recession offset
  const recessionOffset = recessionProgress * 15;

  // Swelling amount
  const swellAmount = inflammationProgress * 8;

  return (
    <svg viewBox="0 0 500 400" overflow="visible" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gdToothGrad" x1="0.3" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor={COLORS.toothWhite} />
          <stop offset="50%" stopColor={COLORS.enamel} />
          <stop offset="100%" stopColor={COLORS.toothShadow} />
        </linearGradient>
        <linearGradient id="gdBoneGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.bone} />
          <stop offset="100%" stopColor={COLORS.jawbone} />
        </linearGradient>
        <radialGradient id="inflamGrad" cx="50%" cy="60%" r="50%">
          <stop offset="0%" stopColor={COLORS.gumInflamed} />
          <stop offset="100%" stopColor="#c83838" />
        </radialGradient>
        <filter id="gdShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#000" floodOpacity="0.25" />
        </filter>
        <filter id="bacteriaGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="swellFilter" x="-5%" y="-5%" width="110%" height="110%">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="bloodSpotGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d42020" stopOpacity={0.6} />
          <stop offset="100%" stopColor="#d42020" stopOpacity={0} />
        </radialGradient>
      </defs>

      <g opacity={reveal}>
        {/* Bone (showing recession) */}
        <path
          d={`M40,${190 + recessionOffset} Q100,${185 + recessionOffset} 250,${182 + recessionOffset} Q400,${185 + recessionOffset} 460,${190 + recessionOffset} L460,380 L40,380 Z`}
          fill="url(#gdBoneGrad)"
          opacity={0.4}
        />

        {/* Tooth roots (more exposed as gums recede) */}
        {[0, 1, 2, 3, 4].map((i) => {
          const x = 100 + i * 75;
          return (
            <g key={`root-${i}`}>
              <path
                d={`M${x - 8},${170} L${x - 5},${260} Q${x},${280} ${x + 5},${260} L${x + 8},${170} Z`}
                fill={COLORS.root}
                opacity={0.7}
              />
            </g>
          );
        })}

        {/* Gum tissue (inflamed and receding) */}
        <path
          d={`M30,${130 + recessionOffset}
            Q65,${120 + recessionOffset - swellAmount} 100,${135 + recessionOffset + swellAmount}
            Q120,${125 + recessionOffset - swellAmount} 140,${130 + recessionOffset + swellAmount}
            Q165,${118 + recessionOffset - swellAmount} 175,${132 + recessionOffset + swellAmount}
            Q200,${120 + recessionOffset - swellAmount} 215,${128 + recessionOffset + swellAmount}
            Q240,${116 + recessionOffset - swellAmount} 250,${130 + recessionOffset + swellAmount}
            Q275,${120 + recessionOffset - swellAmount} 290,${135 + recessionOffset + swellAmount}
            Q320,${122 + recessionOffset - swellAmount} 325,${128 + recessionOffset + swellAmount}
            Q355,${118 + recessionOffset - swellAmount} 400,${132 + recessionOffset + swellAmount}
            Q430,${125 + recessionOffset - swellAmount} 470,${130 + recessionOffset}
            L470,${85} Q430,${75} 250,${70} Q70,${75} 30,${85} Z`}
          fill={inflamedGumColor}
          filter="url(#swellFilter)"
          opacity={0.9}
        />

        {/* Swollen bumps along gum line */}
        {inflammationProgress > 0.3 &&
          [0, 1, 2, 3, 4].map((i) => {
            const x = 100 + i * 75;
            const bumpSize = swellAmount * 0.6;
            return (
              <ellipse
                key={`swell-${i}`}
                cx={x}
                cy={130 + recessionOffset + bumpSize}
                rx={12}
                ry={bumpSize + 2}
                fill={COLORS.gumInflamed}
                opacity={0.5 + Math.sin(frame * 0.03 + i) * 0.1}
              />
            );
          })}

        {/* Bleeding spots */}
        {inflammationProgress > 0.5 &&
          [75, 175, 310, 420].map((x, i) => {
            const bleedY = 135 + recessionOffset + swellAmount;
            return (
              <g key={`bleed-${i}`}>
                <circle
                  cx={x}
                  cy={bleedY + Math.sin(frame * 0.05 + i * 2) * 2}
                  r={3 + Math.sin(frame * 0.04 + i) * 1}
                  fill="url(#bloodSpotGrad)"
                  opacity={inflammationProgress * 0.6}
                />
              </g>
            );
          })}

        {/* Teeth (front view) */}
        {[0, 1, 2, 3, 4].map((i) => {
          const x = 100 + i * 75;
          const toothH = 55;
          const toothW = 26;

          return (
            <g key={`tooth-${i}`} filter="url(#gdShadow)">
              <rect
                x={x - toothW / 2}
                y={130 + recessionOffset - 5}
                width={toothW}
                height={toothH}
                rx={4}
                fill="url(#gdToothGrad)"
                stroke={COLORS.toothDark}
                strokeWidth={0.4}
              />
              {/* Shine */}
              <rect
                x={x - toothW / 2 + 4}
                y={135 + recessionOffset}
                width={5}
                height={toothH - 15}
                rx={2.5}
                fill="white"
                opacity={0.1}
              />
              {/* Tartar/calculus at gum line */}
              {inflammationProgress > 0.4 && (
                <ellipse
                  cx={x}
                  cy={132 + recessionOffset}
                  rx={toothW / 2 - 2}
                  ry={3}
                  fill="#c8b870"
                  opacity={inflammationProgress * 0.4}
                />
              )}
            </g>
          );
        })}

        {/* Bacteria particles floating near gum line */}
        <g opacity={bacteriaOpacity} filter="url(#bacteriaGlow)">
          {Array.from({ length: 18 }).map((_, i) => {
            const baseX = 60 + (i * 25) % 380;
            const period = 0.02 + (i % 5) * 0.005;
            const phaseX = frame * period + i * 1.8;
            const phaseY = frame * (period * 0.7) + i * 2.3;
            const bx = baseX + Math.sin(phaseX) * 15;
            const by =
              115 +
              recessionOffset +
              Math.cos(phaseY) * 12 +
              swellAmount;
            const size = 1.2 + (i % 3) * 0.5;

            return (
              <g key={`bact-${i}`}>
                <circle
                  cx={bx}
                  cy={by}
                  r={size}
                  fill={i % 3 === 0 ? "#c8d040" : i % 3 === 1 ? "#90d060" : "#e0d050"}
                  opacity={0.5 + Math.sin(frame * 0.03 + i * 0.7) * 0.25}
                />
                {/* Tiny flagella / tail */}
                {i % 4 === 0 && (
                  <path
                    d={`M${bx + size},${by} Q${bx + size + 3},${by - 2} ${bx + size + 5},${by + 1}`}
                    stroke="#c8d040"
                    strokeWidth={0.4}
                    fill="none"
                    opacity={0.4}
                  />
                )}
              </g>
            );
          })}
        </g>

        {/* Pocket depth indicators */}
        <g opacity={labelOpacity}>
          {[1, 3].map((i) => {
            const x = 100 + i * 75;
            return (
              <g key={`pocket-${i}`}>
                <line
                  x1={x + 18}
                  y1={125 + recessionOffset}
                  x2={x + 18}
                  y2={145 + recessionOffset + swellAmount}
                  stroke={COLORS.problemRed}
                  strokeWidth={1}
                />
                <line
                  x1={x + 14}
                  y1={125 + recessionOffset}
                  x2={x + 22}
                  y2={125 + recessionOffset}
                  stroke={COLORS.problemRed}
                  strokeWidth={0.8}
                />
                <line
                  x1={x + 14}
                  y1={145 + recessionOffset + swellAmount}
                  x2={x + 22}
                  y2={145 + recessionOffset + swellAmount}
                  stroke={COLORS.problemRed}
                  strokeWidth={0.8}
                />
                <text
                  x={x + 26}
                  y={136 + recessionOffset}
                  fill={COLORS.problemRed}
                  fontSize="7"
                  fontFamily="Inter, sans-serif"
                >
                  deep
                </text>
              </g>
            );
          })}
        </g>

        {/* Labels */}
        <g opacity={labelOpacity}>
          <text
            x="250"
            y="320"
            textAnchor="middle"
            fill={COLORS.gumInflamed}
            fontSize="14"
            fontFamily="Inter, sans-serif"
            fontWeight="600"
          >
            Gum Disease (Periodontitis)
          </text>
          <text
            x="250"
            y="340"
            textAnchor="middle"
            fill={COLORS.textMuted}
            fontSize="10"
            fontFamily="Inter, sans-serif"
          >
            Inflammation, recession, and bacterial buildup
          </text>
        </g>
      </g>
    </svg>
  );
};
