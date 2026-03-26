import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../../../lib/colors";

interface OverbiteVisualProps {
  progress: number;
}

export const OverbiteVisual: React.FC<OverbiteVisualProps> = ({ progress }) => {
  const frame = useCurrentFrame();

  // Bite closing animation
  const biteClose = interpolate(progress, [0.15, 0.55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const jawReveal = interpolate(progress, [0, 0.15], [0, 1], {
    extrapolateRight: "clamp",
  });

  const indicatorOpacity = interpolate(progress, [0.6, 0.85], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Upper jaw position (fixed)
  const upperY = 0;
  // Lower jaw moves up to close bite
  const lowerY = interpolate(biteClose, [0, 1], [60, 0]);

  // Overbite amount - upper teeth extend past lower
  const overbiteAmount = 28;

  return (
    <svg viewBox="0 0 500 400" overflow="visible" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="obToothGrad" x1="0.3" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor={COLORS.toothWhite} />
          <stop offset="50%" stopColor={COLORS.enamel} />
          <stop offset="100%" stopColor={COLORS.toothShadow} />
        </linearGradient>
        <linearGradient id="obGumGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b8687a" />
          <stop offset="100%" stopColor={COLORS.gumPink} />
        </linearGradient>
        <linearGradient id="obLowerGumGrad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#b8687a" />
          <stop offset="100%" stopColor={COLORS.gumPink} />
        </linearGradient>
        <linearGradient id="obBoneGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.bone} />
          <stop offset="100%" stopColor={COLORS.jawbone} />
        </linearGradient>
        <filter id="obShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#000" floodOpacity="0.25" />
        </filter>
        <filter id="obIndicatorGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g opacity={jawReveal}>
        {/* ===== UPPER JAW (side profile) ===== */}
        <g transform={`translate(0, ${upperY})`}>
          {/* Upper jawbone */}
          <path
            d="M80,40 L80,120 Q120,125 200,130 Q300,132 380,128 L420,40 Z"
            fill="url(#obBoneGrad)"
            opacity={0.35}
          />

          {/* Upper gum */}
          <path
            d="M95,105 Q120,95 200,100 Q300,102 390,98 L395,120 Q300,135 200,138 Q120,135 90,125 Z"
            fill="url(#obGumGrad)"
            opacity={0.85}
          />

          {/* Upper teeth (side profile) - 5 visible teeth */}
          {[0, 1, 2, 3, 4].map((i) => {
            const x = 130 + i * 50;
            // Molars in back, incisors in front - front teeth are longer, extending down more
            const height = i < 2 ? 38 : i < 4 ? 45 : 50 + overbiteAmount * 0.3;
            const width = i < 2 ? 22 : 18;
            const rootH = 30;

            return (
              <g key={`upper-${i}`} filter="url(#obShadow)">
                {/* Root */}
                <path
                  d={`M${x - width * 0.3},${125} L${x - width * 0.15},${125 - rootH} Q${x},${125 - rootH - 8} ${x + width * 0.15},${125 - rootH} L${x + width * 0.3},${125} Z`}
                  fill={COLORS.root}
                  opacity={0.7}
                />
                {/* Crown */}
                <rect
                  x={x - width / 2}
                  y={125}
                  width={width}
                  height={height}
                  rx={3}
                  fill="url(#obToothGrad)"
                  stroke={COLORS.toothDark}
                  strokeWidth={0.4}
                />
                {/* Shine */}
                <rect
                  x={x - width / 2 + 3}
                  y={128}
                  width={4}
                  height={height - 10}
                  rx={2}
                  fill="white"
                  opacity={0.1}
                />
              </g>
            );
          })}
        </g>

        {/* ===== LOWER JAW ===== */}
        <g transform={`translate(0, ${165 + lowerY})`}>
          {/* Lower jawbone */}
          <path
            d="M80,140 L80,60 Q120,55 200,50 Q300,48 380,52 L420,140 Z"
            fill="url(#obBoneGrad)"
            opacity={0.35}
          />

          {/* Lower gum */}
          <path
            d="M95,75 Q120,85 200,80 Q300,78 390,82 L395,60 Q300,45 200,42 Q120,45 90,55 Z"
            fill="url(#obLowerGumGrad)"
            opacity={0.85}
          />

          {/* Lower teeth (side profile) - shorter than upper */}
          {[0, 1, 2, 3, 4].map((i) => {
            const x = 130 + i * 50;
            const height = i < 2 ? 34 : i < 4 ? 38 : 40;
            const width = i < 2 ? 20 : 16;
            const rootH = 28;

            return (
              <g key={`lower-${i}`} filter="url(#obShadow)">
                {/* Root */}
                <path
                  d={`M${x - width * 0.3},${55} L${x - width * 0.15},${55 + rootH} Q${x},${55 + rootH + 8} ${x + width * 0.15},${55 + rootH} L${x + width * 0.3},${55} Z`}
                  fill={COLORS.root}
                  opacity={0.7}
                />
                {/* Crown */}
                <rect
                  x={x - width / 2}
                  y={55 - height}
                  width={width}
                  height={height}
                  rx={3}
                  fill="url(#obToothGrad)"
                  stroke={COLORS.toothDark}
                  strokeWidth={0.4}
                />
                {/* Shine */}
                <rect
                  x={x - width / 2 + 3}
                  y={55 - height + 4}
                  width={4}
                  height={height - 10}
                  rx={2}
                  fill="white"
                  opacity={0.1}
                />
              </g>
            );
          })}
        </g>

        {/* Overbite indicator */}
        <g opacity={indicatorOpacity} filter="url(#obIndicatorGlow)">
          {/* Vertical measurement showing overlap */}
          <line
            x1={400}
            y1={125 + 45}
            x2={400}
            y2={165 + lowerY + 55 - 40}
            stroke={COLORS.problemRed}
            strokeWidth={1.5}
            strokeDasharray="3,3"
          />

          {/* Upper reference line */}
          <line
            x1={365}
            y1={125 + 50}
            x2={415}
            y2={125 + 50}
            stroke={COLORS.problemRed}
            strokeWidth={0.8}
            opacity={0.6}
          />

          {/* Lower reference line */}
          <line
            x1={365}
            y1={165 + lowerY + 55 - 40}
            x2={415}
            y2={165 + lowerY + 55 - 40}
            stroke={COLORS.problemRed}
            strokeWidth={0.8}
            opacity={0.6}
          />

          {/* Overbite label with arrow */}
          <text
            x={438}
            y={(125 + 50 + 165 + lowerY + 15) / 2 + 4}
            fill={COLORS.problemRed}
            fontSize="11"
            fontFamily="Inter, sans-serif"
            fontWeight="600"
          >
            Overbite
          </text>

          {/* Pulsing highlight on the overlap area */}
          <rect
            x={120}
            y={125 + 45}
            width={260}
            height={Math.max(0, 165 + lowerY + 15 - (125 + 45))}
            rx={4}
            fill={COLORS.problemRed}
            opacity={0.04 + Math.sin(frame * 0.05) * 0.02}
          />
        </g>

        {/* Side profile indicator - nose/chin line */}
        <g opacity={indicatorOpacity * 0.5}>
          <path
            d="M55,30 L55,350"
            stroke={COLORS.textMuted}
            strokeWidth={0.5}
            strokeDasharray="4,8"
            opacity={0.3}
          />
        </g>
      </g>
    </svg>
  );
};
