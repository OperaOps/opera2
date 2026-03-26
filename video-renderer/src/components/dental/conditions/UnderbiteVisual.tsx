import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../../../lib/colors";

interface UnderbiteVisualProps {
  progress: number;
}

export const UnderbiteVisual: React.FC<UnderbiteVisualProps> = ({ progress }) => {
  const frame = useCurrentFrame();

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

  // Lower jaw moves up and forward (underbite = lower protrudes)
  const lowerY = interpolate(biteClose, [0, 1], [55, 0]);
  const lowerX = interpolate(biteClose, [0, 1], [-15, 20]); // Protrudes forward

  return (
    <svg viewBox="0 0 500 400" overflow="visible" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ubToothGrad" x1="0.3" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor={COLORS.toothWhite} />
          <stop offset="50%" stopColor={COLORS.enamel} />
          <stop offset="100%" stopColor={COLORS.toothShadow} />
        </linearGradient>
        <linearGradient id="ubGumGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b8687a" />
          <stop offset="100%" stopColor={COLORS.gumPink} />
        </linearGradient>
        <linearGradient id="ubLowerGumGrad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#b8687a" />
          <stop offset="100%" stopColor={COLORS.gumPink} />
        </linearGradient>
        <linearGradient id="ubBoneGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.bone} />
          <stop offset="100%" stopColor={COLORS.jawbone} />
        </linearGradient>
        <filter id="ubShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#000" floodOpacity="0.25" />
        </filter>
        <filter id="ubGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g opacity={jawReveal}>
        {/* Profile silhouette for context */}
        <path
          d="M60,20 Q55,60 58,100 Q60,130 65,155 Q60,170 55,190"
          fill="none"
          stroke={COLORS.textMuted}
          strokeWidth={0.8}
          strokeDasharray="4,6"
          opacity={indicatorOpacity * 0.25}
        />

        {/* ===== UPPER JAW ===== */}
        <g>
          {/* Upper jawbone */}
          <path
            d="M80,40 L80,120 Q140,128 220,132 Q310,134 380,130 L420,40 Z"
            fill="url(#ubBoneGrad)"
            opacity={0.35}
          />

          {/* Upper gum */}
          <path
            d="M95,108 Q140,98 220,102 Q310,104 390,100 L395,125 Q310,140 220,142 Q140,140 90,130 Z"
            fill="url(#ubGumGrad)"
            opacity={0.85}
          />

          {/* Upper teeth (normal length) */}
          {[0, 1, 2, 3, 4].map((i) => {
            const x = 130 + i * 50;
            const height = i < 2 ? 36 : i < 4 ? 40 : 42;
            const width = i < 2 ? 22 : 17;
            const rootH = 28;

            return (
              <g key={`upper-${i}`} filter="url(#ubShadow)">
                <path
                  d={`M${x - width * 0.3},${130} L${x - width * 0.15},${130 - rootH} Q${x},${130 - rootH - 8} ${x + width * 0.15},${130 - rootH} L${x + width * 0.3},${130} Z`}
                  fill={COLORS.root}
                  opacity={0.7}
                />
                <rect
                  x={x - width / 2}
                  y={130}
                  width={width}
                  height={height}
                  rx={3}
                  fill="url(#ubToothGrad)"
                  stroke={COLORS.toothDark}
                  strokeWidth={0.4}
                />
                <rect
                  x={x - width / 2 + 3}
                  y={133}
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

        {/* ===== LOWER JAW (protrudes forward) ===== */}
        <g transform={`translate(${lowerX}, ${165 + lowerY})`}>
          {/* Lower jawbone - shifted forward */}
          <path
            d="M70,140 L70,60 Q130,52 210,48 Q300,46 370,50 L410,140 Z"
            fill="url(#ubBoneGrad)"
            opacity={0.35}
          />

          {/* Lower gum */}
          <path
            d="M85,72 Q130,82 210,78 Q300,76 380,80 L385,58 Q300,42 210,40 Q130,42 80,52 Z"
            fill="url(#ubLowerGumGrad)"
            opacity={0.85}
          />

          {/* Lower teeth - extend past upper */}
          {[0, 1, 2, 3, 4].map((i) => {
            const x = 130 + i * 50;
            const height = i < 2 ? 36 : i < 4 ? 42 : 46;
            const width = i < 2 ? 21 : 17;
            const rootH = 28;

            return (
              <g key={`lower-${i}`} filter="url(#ubShadow)">
                <path
                  d={`M${x - width * 0.3},${52} L${x - width * 0.15},${52 + rootH} Q${x},${52 + rootH + 8} ${x + width * 0.15},${52 + rootH} L${x + width * 0.3},${52} Z`}
                  fill={COLORS.root}
                  opacity={0.7}
                />
                <rect
                  x={x - width / 2}
                  y={52 - height}
                  width={width}
                  height={height}
                  rx={3}
                  fill="url(#ubToothGrad)"
                  stroke={COLORS.toothDark}
                  strokeWidth={0.4}
                />
                <rect
                  x={x - width / 2 + 3}
                  y={52 - height + 4}
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

        {/* Underbite indicators */}
        <g opacity={indicatorOpacity} filter="url(#ubGlow)">
          {/* Horizontal measurement showing protrusion */}
          {(() => {
            const upperFrontX = 330 + 9;
            const lowerFrontX = 330 + 9 + lowerX;
            const measureY = 175 + lowerY * 0.3;

            return (
              <>
                {/* Horizontal arrow showing protrusion distance */}
                <line
                  x1={upperFrontX}
                  y1={measureY}
                  x2={lowerFrontX}
                  y2={measureY}
                  stroke={COLORS.problemRed}
                  strokeWidth={1.5}
                  strokeDasharray="3,3"
                />

                {/* Vertical reference lines */}
                <line
                  x1={upperFrontX}
                  y1={measureY - 15}
                  x2={upperFrontX}
                  y2={measureY + 15}
                  stroke={COLORS.problemRed}
                  strokeWidth={0.8}
                  opacity={0.5}
                />
                <line
                  x1={lowerFrontX}
                  y1={measureY - 15}
                  x2={lowerFrontX}
                  y2={measureY + 15}
                  stroke={COLORS.problemRed}
                  strokeWidth={0.8}
                  opacity={0.5}
                />

                {/* Arrow pointing to protrusion */}
                <path
                  d={`M${lowerFrontX + 15},${measureY - 20} L${lowerFrontX + 5},${measureY - 5}`}
                  stroke={COLORS.problemRed}
                  strokeWidth={1}
                  fill="none"
                  markerEnd="none"
                />
              </>
            );
          })()}

          {/* Pulsing highlight on the conflict area */}
          <rect
            x={320}
            y={155}
            width={60 + lowerX}
            height={40}
            rx={4}
            fill={COLORS.problemRed}
            opacity={0.05 + Math.sin(frame * 0.05) * 0.03}
          />
        </g>

        {/* Label */}
        <g
          opacity={interpolate(progress, [0.7, 0.9], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
        >
          <text
            x="250"
            y="345"
            textAnchor="middle"
            fill={COLORS.problemRed}
            fontSize="14"
            fontFamily="Inter, sans-serif"
            fontWeight="600"
          >
            Underbite
          </text>
          <text
            x="250"
            y="365"
            textAnchor="middle"
            fill={COLORS.textMuted}
            fontSize="10"
            fontFamily="Inter, sans-serif"
          >
            Lower jaw extends past upper jaw
          </text>
        </g>
      </g>
    </svg>
  );
};
