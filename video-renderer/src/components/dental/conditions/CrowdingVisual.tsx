import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../../../lib/colors";

interface CrowdingVisualProps {
  progress: number;
}

// Crowded tooth configurations: offset, rotation, z-order, scale
const CROWDED_TEETH = [
  { x: 72, y: 210, rot: -6, zIndex: 1, scaleX: 1, pushed: false },
  { x: 122, y: 205, rot: 12, zIndex: 3, scaleX: 0.95, pushed: true },
  { x: 162, y: 215, rot: -8, zIndex: 2, scaleX: 1, pushed: false },
  { x: 205, y: 200, rot: 15, zIndex: 4, scaleX: 0.9, pushed: true },
  { x: 242, y: 208, rot: -10, zIndex: 2, scaleX: 1, pushed: false },
  { x: 280, y: 202, rot: -14, zIndex: 3, scaleX: 0.95, pushed: true },
  { x: 325, y: 212, rot: 7, zIndex: 1, scaleX: 1, pushed: false },
  { x: 375, y: 208, rot: 5, zIndex: 1, scaleX: 1, pushed: false },
];

const TOOTH_PATH =
  "M-14,-24 C-15,-12 -14,8 -12,20 C-10,25 -4,28 0,28 C4,28 10,25 12,20 C14,8 15,-12 14,-24 C10,-28 -10,-28 -14,-24 Z";

export const CrowdingVisual: React.FC<CrowdingVisualProps> = ({ progress }) => {
  const frame = useCurrentFrame();

  const gumReveal = interpolate(progress, [0, 0.15], [0, 1], {
    extrapolateRight: "clamp",
  });

  const stressOpacity = interpolate(progress, [0.6, 0.9], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Sort by z-index for rendering order
  const sortedTeeth = [...CROWDED_TEETH]
    .map((t, i) => ({ ...t, originalIndex: i }))
    .sort((a, b) => a.zIndex - b.zIndex);

  return (
    <svg viewBox="0 0 500 400" overflow="visible" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="crowdToothGrad" x1="0.3" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor={COLORS.toothWhite} />
          <stop offset="60%" stopColor={COLORS.enamel} />
          <stop offset="100%" stopColor={COLORS.toothShadow} />
        </linearGradient>
        <linearGradient id="crowdPushedGrad" x1="0.3" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor={COLORS.toothWhite} />
          <stop offset="50%" stopColor="#e8e2ef" />
          <stop offset="100%" stopColor={COLORS.toothDark} />
        </linearGradient>
        <linearGradient id="crowdGumGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c07080" />
          <stop offset="50%" stopColor={COLORS.gumPink} />
          <stop offset="100%" stopColor="#d4909c" />
        </linearGradient>
        <filter id="crowdShadow" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="1" dy="1.5" stdDeviation="2" floodColor="#000" floodOpacity="0.3" />
        </filter>
        <filter id="crowdOverlapShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.4" />
        </filter>
        <filter id="stressGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Gum tissue */}
      <g opacity={gumReveal}>
        <path
          d="M25,170 Q50,140 100,128 Q150,115 250,110 Q350,115 400,128 Q450,140 475,170
             L475,100 Q450,88 250,80 Q50,88 25,100 Z"
          fill="url(#crowdGumGrad)"
        />
        {/* Stressed gum line - slightly irregular due to crowding */}
        <path
          d="M40,158 Q80,145 120,140 Q145,136 165,142 Q190,134 215,138 Q245,130 275,136 Q310,140 340,135 Q370,140 400,145 Q440,152 465,162"
          fill="none"
          stroke="#d07080"
          strokeWidth={1.5}
          opacity={0.5}
        />
      </g>

      {/* Pressure/stress indicators between teeth */}
      <g opacity={stressOpacity}>
        {CROWDED_TEETH.slice(0, -1).map((t, i) => {
          const next = CROWDED_TEETH[i + 1];
          const midX = (t.x + next.x) / 2;
          const midY = (t.y + next.y) / 2 - 5;
          const dist = Math.abs(next.x - t.x);
          // Show stress where teeth are closest together
          if (dist < 55) {
            return (
              <g key={`stress-${i}`} filter="url(#stressGlow)">
                <line
                  x1={midX}
                  y1={midY - 8}
                  x2={midX - 4}
                  y2={midY - 15}
                  stroke={COLORS.problemOrange}
                  strokeWidth={1.2}
                  opacity={0.6 + Math.sin(frame * 0.04 + i) * 0.2}
                />
                <line
                  x1={midX}
                  y1={midY - 8}
                  x2={midX + 4}
                  y2={midY - 15}
                  stroke={COLORS.problemOrange}
                  strokeWidth={1.2}
                  opacity={0.6 + Math.sin(frame * 0.04 + i) * 0.2}
                />
                <circle
                  cx={midX}
                  cy={midY - 2}
                  r={2}
                  fill={COLORS.problemRed}
                  opacity={0.4 + Math.sin(frame * 0.06 + i) * 0.2}
                />
              </g>
            );
          }
          return null;
        })}
      </g>

      {/* Teeth - rendered in z-order */}
      {sortedTeeth.map((tooth) => {
        const i = tooth.originalIndex;
        const stagger = i * 0.06;
        const toothProg = interpolate(
          progress,
          [stagger + 0.05, stagger + 0.3],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        const ySlide = interpolate(toothProg, [0, 1], [40, 0]);
        const opacity = interpolate(toothProg, [0, 0.5, 1], [0, 0.7, 1]);
        const rotAnim = interpolate(toothProg, [0, 1], [0, tooth.rot]);

        return (
          <g
            key={i}
            transform={`translate(${tooth.x}, ${tooth.y + ySlide}) rotate(${rotAnim}) scale(${tooth.scaleX}, 1)`}
            opacity={opacity}
            filter={tooth.pushed ? "url(#crowdOverlapShadow)" : "url(#crowdShadow)"}
          >
            <path
              d={TOOTH_PATH}
              fill={tooth.pushed ? "url(#crowdPushedGrad)" : "url(#crowdToothGrad)"}
              stroke={COLORS.toothDark}
              strokeWidth={0.5}
            />
            {/* Shine */}
            <ellipse cx={-2} cy={-10} rx={3.5} ry={7} fill="white" opacity={0.12} />

            {/* Overlap indicator for pushed teeth */}
            {tooth.pushed && (
              <path
                d={TOOTH_PATH}
                fill={COLORS.problemRed}
                opacity={0.06 + Math.sin(frame * 0.04) * 0.03}
              />
            )}
          </g>
        );
      })}

      {/* Label */}
      <g
        opacity={interpolate(progress, [0.7, 0.9], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })}
      >
        <text
          x="250"
          y="320"
          textAnchor="middle"
          fill={COLORS.problemOrange}
          fontSize="14"
          fontFamily="Inter, sans-serif"
          fontWeight="600"
        >
          Dental Crowding
        </text>
        <text
          x="250"
          y="340"
          textAnchor="middle"
          fill={COLORS.textMuted}
          fontSize="10"
          fontFamily="Inter, sans-serif"
        >
          Teeth overlapping due to insufficient space
        </text>
      </g>
    </svg>
  );
};
