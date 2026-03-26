import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../../../lib/colors";

interface SpacingVisualProps {
  progress: number;
}

const SPACED_TEETH = [
  { x: 55, gap: 0 },
  { x: 115, gap: 18 },
  { x: 180, gap: 22 },
  { x: 250, gap: 15 },
  { x: 315, gap: 20 },
  { x: 380, gap: 18 },
  { x: 445, gap: 0 },
];

const TOOTH_PATH =
  "M-13,-24 C-14,-12 -13,8 -11,20 C-9,25 -4,28 0,28 C4,28 9,25 11,20 C13,8 14,-12 13,-24 C9,-28 -9,-28 -13,-24 Z";

export const SpacingVisual: React.FC<SpacingVisualProps> = ({ progress }) => {
  const frame = useCurrentFrame();

  const gumReveal = interpolate(progress, [0, 0.15], [0, 1], {
    extrapolateRight: "clamp",
  });

  const gapIndicatorOpacity = interpolate(progress, [0.5, 0.8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <svg viewBox="0 0 500 400" overflow="visible" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="spaceToothGrad" x1="0.3" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor={COLORS.toothWhite} />
          <stop offset="60%" stopColor={COLORS.enamel} />
          <stop offset="100%" stopColor={COLORS.toothShadow} />
        </linearGradient>
        <linearGradient id="spaceGumGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c07080" />
          <stop offset="50%" stopColor={COLORS.gumPink} />
          <stop offset="100%" stopColor="#d4909c" />
        </linearGradient>
        <linearGradient id="gapGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.problemOrange} stopOpacity={0.15} />
          <stop offset="50%" stopColor={COLORS.problemOrange} stopOpacity={0.08} />
          <stop offset="100%" stopColor={COLORS.problemOrange} stopOpacity={0.02} />
        </linearGradient>
        <filter id="spaceShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0.5" dy="1.5" stdDeviation="1.5" floodColor="#000" floodOpacity="0.25" />
        </filter>
        <filter id="gapGlow" x="-30%" y="-10%" width="160%" height="120%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Gum tissue */}
      <g opacity={gumReveal}>
        <path
          d="M15,175 Q40,140 100,125 Q175,108 250,105 Q325,108 400,125 Q460,140 485,175
             L485,95 Q460,82 250,72 Q40,82 15,95 Z"
          fill="url(#spaceGumGrad)"
        />
        {/* Gum line with papilla dipping between teeth */}
        <path
          d={`M25,165 ${SPACED_TEETH.map((t, i) => {
            if (i === SPACED_TEETH.length - 1) return `Q${t.x},155 ${t.x + 20},165`;
            const next = SPACED_TEETH[i + 1];
            const mid = (t.x + next.x) / 2;
            // Papilla is absent or reduced in gaps - gum dips less
            return `Q${t.x},148 ${t.x + 15},158 Q${mid},168 ${next.x - 15},158`;
          }).join(" ")}`}
          fill="none"
          stroke="#d07080"
          strokeWidth={1.2}
          opacity={0.5}
        />
      </g>

      {/* Teeth with spacing */}
      {SPACED_TEETH.map((tooth, i) => {
        const stagger = i * 0.06;
        const toothProg = interpolate(
          progress,
          [stagger + 0.05, stagger + 0.25],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        // Teeth slide apart to reveal gaps
        const spreadOffset = interpolate(
          progress,
          [0.1, 0.4],
          [0, (i - 3) * 3],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        const ySlide = interpolate(toothProg, [0, 1], [35, 0]);
        const opacity = interpolate(toothProg, [0, 0.5, 1], [0, 0.8, 1]);

        return (
          <g
            key={i}
            transform={`translate(${tooth.x + spreadOffset}, ${210 + ySlide})`}
            opacity={opacity}
            filter="url(#spaceShadow)"
          >
            <path
              d={TOOTH_PATH}
              fill="url(#spaceToothGrad)"
              stroke={COLORS.toothDark}
              strokeWidth={0.4}
            />
            {/* Shine */}
            <ellipse cx={-2} cy={-10} rx={3.5} ry={7} fill="white" opacity={0.12} />
          </g>
        );
      })}

      {/* Gap indicators */}
      <g opacity={gapIndicatorOpacity}>
        {SPACED_TEETH.slice(0, -1).map((tooth, i) => {
          const next = SPACED_TEETH[i + 1];
          const spreadA = (i - 3) * 3;
          const spreadB = (i + 1 - 3) * 3;
          const leftEdge = tooth.x + spreadA + 14;
          const rightEdge = next.x + spreadB - 14;
          const gapWidth = rightEdge - leftEdge;

          if (tooth.gap < 10) return null;

          const midX = (leftEdge + rightEdge) / 2;
          const pulseW = gapWidth + Math.sin(frame * 0.04 + i) * 2;

          return (
            <g key={`gap-${i}`}>
              {/* Gap highlight zone */}
              <rect
                x={midX - pulseW / 2}
                y={175}
                width={pulseW}
                height={70}
                rx={4}
                fill="url(#gapGrad)"
                filter="url(#gapGlow)"
              />

              {/* Double-headed arrow */}
              <line
                x1={leftEdge + 2}
                y1={260}
                x2={rightEdge - 2}
                y2={260}
                stroke={COLORS.problemOrange}
                strokeWidth={1}
                opacity={0.7}
              />
              {/* Left arrowhead */}
              <path
                d={`M${leftEdge + 2},260 L${leftEdge + 7},256 L${leftEdge + 7},264 Z`}
                fill={COLORS.problemOrange}
                opacity={0.7}
              />
              {/* Right arrowhead */}
              <path
                d={`M${rightEdge - 2},260 L${rightEdge - 7},256 L${rightEdge - 7},264 Z`}
                fill={COLORS.problemOrange}
                opacity={0.7}
              />

              {/* Gap measurement */}
              <text
                x={midX}
                y={277}
                textAnchor="middle"
                fill={COLORS.problemOrange}
                fontSize="8"
                fontFamily="Inter, sans-serif"
                opacity={0.8}
              >
                {tooth.gap > 18 ? "wide" : "gap"}
              </text>
            </g>
          );
        })}
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
          y="330"
          textAnchor="middle"
          fill={COLORS.problemOrange}
          fontSize="14"
          fontFamily="Inter, sans-serif"
          fontWeight="600"
        >
          Dental Spacing
        </text>
        <text
          x="250"
          y="350"
          textAnchor="middle"
          fill={COLORS.textMuted}
          fontSize="10"
          fontFamily="Inter, sans-serif"
        >
          Gaps between teeth (diastema)
        </text>
      </g>
    </svg>
  );
};
