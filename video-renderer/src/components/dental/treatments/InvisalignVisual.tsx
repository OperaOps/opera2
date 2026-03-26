import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../../../lib/colors";

interface InvisalignVisualProps {
  progress: number;
}

const TOOTH_PATH =
  "M-13,-24 C-14,-12 -13,8 -11,20 C-9,25 -4,28 0,28 C4,28 9,25 11,20 C13,8 14,-12 13,-24 C9,-28 -9,-28 -13,-24 Z";

// Three stages of alignment
const STAGES = [
  // Stage 1: Crooked
  [
    { x: 72, rot: -5, y: 210 },
    { x: 124, rot: 10, y: 205 },
    { x: 172, rot: -6, y: 213 },
    { x: 220, rot: 12, y: 204 },
    { x: 268, rot: -8, y: 212 },
    { x: 316, rot: -10, y: 207 },
    { x: 364, rot: 5, y: 211 },
    { x: 412, rot: 3, y: 209 },
  ],
  // Stage 2: Partially aligned
  [
    { x: 72, rot: -2, y: 210 },
    { x: 124, rot: 5, y: 208 },
    { x: 172, rot: -3, y: 211 },
    { x: 220, rot: 6, y: 207 },
    { x: 268, rot: -4, y: 211 },
    { x: 316, rot: -5, y: 209 },
    { x: 364, rot: 2, y: 210 },
    { x: 412, rot: 1, y: 210 },
  ],
  // Stage 3: Aligned
  [
    { x: 72, rot: 0, y: 210 },
    { x: 124, rot: 0, y: 210 },
    { x: 172, rot: 0, y: 210 },
    { x: 220, rot: 0, y: 210 },
    { x: 268, rot: 0, y: 210 },
    { x: 316, rot: 0, y: 210 },
    { x: 364, rot: 0, y: 210 },
    { x: 412, rot: 0, y: 210 },
  ],
];

export const InvisalignVisual: React.FC<InvisalignVisualProps> = ({
  progress,
}) => {
  const frame = useCurrentFrame();

  const teethReveal = interpolate(progress, [0, 0.12], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Three aligner stages
  const stageFloat = interpolate(progress, [0.1, 0.9], [0, 2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const currentStage = Math.min(Math.floor(stageFloat), 2);
  const stageProgress = stageFloat - currentStage;

  // Aligner visibility pulses between stages
  const alignerOpacity = (() => {
    if (stageFloat < 0.1) return interpolate(stageFloat, [0, 0.1], [0, 0.6]);
    if (stageProgress < 0.15) return interpolate(stageProgress, [0, 0.15], [0, 0.6]);
    if (stageProgress > 0.85) return interpolate(stageProgress, [0.85, 1], [0.6, 0]);
    return 0.6;
  })();

  // Interpolate tooth positions between stages
  const getToothPos = (toothIndex: number) => {
    const from = STAGES[currentStage][toothIndex];
    const to = STAGES[Math.min(currentStage + 1, 2)][toothIndex];
    const t = Math.min(stageProgress * 1.5, 1);
    return {
      x: interpolate(t, [0, 1], [from.x, to.x]),
      rot: interpolate(t, [0, 1], [from.rot, to.rot]),
      y: interpolate(t, [0, 1], [from.y, to.y]),
    };
  };

  const stageLabel = ["Aligner 1", "Aligner 2", "Aligner 3"][currentStage];

  return (
    <svg viewBox="0 0 500 400" overflow="visible" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="iaToothGrad" x1="0.3" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor={COLORS.toothWhite} />
          <stop offset="60%" stopColor={COLORS.enamel} />
          <stop offset="100%" stopColor={COLORS.toothShadow} />
        </linearGradient>
        <linearGradient id="iaGumGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c07080" />
          <stop offset="50%" stopColor={COLORS.gumPink} />
          <stop offset="100%" stopColor="#d4909c" />
        </linearGradient>
        <linearGradient id="alignerEdgeGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(160,180,240,0.5)" />
          <stop offset="100%" stopColor="rgba(160,180,240,0.2)" />
        </linearGradient>
        <filter id="iaShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0.5" dy="1" stdDeviation="1" floodColor="#000" floodOpacity="0.2" />
        </filter>
        <filter id="alignerGlow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Gum tissue */}
      <g opacity={teethReveal}>
        <path
          d="M20,170 Q50,140 120,128 Q200,115 250,112 Q300,115 380,128 Q450,140 480,170
             L480,98 Q450,86 250,78 Q50,86 20,98 Z"
          fill="url(#iaGumGrad)"
        />
      </g>

      {/* Teeth */}
      {STAGES[0].map((_, i) => {
        const pos = getToothPos(i);
        const stagger = i * 0.015;
        const appear = interpolate(
          teethReveal,
          [stagger, stagger + 0.15],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        const ySlide = interpolate(appear, [0, 1], [25, 0]);
        const opacity = interpolate(appear, [0, 0.5, 1], [0, 0.8, 1]);

        return (
          <g
            key={i}
            transform={`translate(${pos.x}, ${pos.y + ySlide}) rotate(${pos.rot})`}
            opacity={opacity}
            filter="url(#iaShadow)"
          >
            <path
              d={TOOTH_PATH}
              fill="url(#iaToothGrad)"
              stroke={COLORS.toothDark}
              strokeWidth={0.4}
            />
            <ellipse cx={-2} cy={-10} rx={3.5} ry={7} fill="white" opacity={0.12} />
          </g>
        );
      })}

      {/* Clear aligner overlay */}
      <g opacity={alignerOpacity} filter="url(#alignerGlow)">
        {/* Aligner shell - follows current tooth positions */}
        <path
          d={(() => {
            const positions = STAGES[0].map((_, i) => getToothPos(i));
            const first = positions[0];
            const last = positions[positions.length - 1];

            // Outer contour of aligner (slightly larger than teeth)
            let d = `M${first.x - 20},${first.y + 32}`;
            positions.forEach((p) => {
              d += ` Q${p.x},${p.y + 34} ${p.x + 10},${p.y + 30}`;
            });
            d += ` L${last.x + 20},${last.y + 32}`;
            // Top edge
            d += ` L${last.x + 18},${last.y - 30}`;
            positions
              .slice()
              .reverse()
              .forEach((p) => {
                d += ` Q${p.x},${p.y - 34} ${p.x - 10},${p.y - 30}`;
              });
            d += ` L${first.x - 20},${first.y - 30} Z`;

            return d;
          })()}
          fill={COLORS.alignerClear}
          stroke={COLORS.alignerEdge}
          strokeWidth={1.5}
        />

        {/* Individual tooth scallops on the aligner */}
        {STAGES[0].map((_, i) => {
          const pos = getToothPos(i);
          return (
            <path
              key={`scallop-${i}`}
              d={`M${pos.x - 14},${pos.y - 26} C${pos.x - 15},${pos.y - 8} ${pos.x - 14},${pos.y + 12} ${pos.x - 12},${pos.y + 22}
                  C${pos.x - 10},${pos.y + 27} ${pos.x - 5},${pos.y + 30} ${pos.x},${pos.y + 30}
                  C${pos.x + 5},${pos.y + 30} ${pos.x + 10},${pos.y + 27} ${pos.x + 12},${pos.y + 22}
                  C${pos.x + 14},${pos.y + 12} ${pos.x + 15},${pos.y - 8} ${pos.x + 14},${pos.y - 26}`}
              fill="none"
              stroke="rgba(180,190,230,0.25)"
              strokeWidth={0.8}
            />
          );
        })}

        {/* Attachment bumps on select teeth */}
        {[1, 3, 5].map((i) => {
          const pos = getToothPos(i);
          return (
            <ellipse
              key={`attach-${i}`}
              cx={pos.x}
              cy={pos.y}
              rx={4}
              ry={3}
              fill="rgba(200,210,240,0.3)"
              stroke="rgba(180,190,230,0.4)"
              strokeWidth={0.5}
            />
          );
        })}
      </g>

      {/* Stage indicator */}
      <g
        opacity={interpolate(progress, [0.15, 0.3], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })}
      >
        {/* Stage dots */}
        {[0, 1, 2].map((s) => (
          <g key={`dot-${s}`}>
            <circle
              cx={220 + s * 30}
              cy={310}
              r={6}
              fill={s <= currentStage ? COLORS.purple : "transparent"}
              stroke={COLORS.purple}
              strokeWidth={1.5}
              opacity={s <= currentStage ? 1 : 0.3}
            />
            <text
              x={220 + s * 30}
              y={313}
              textAnchor="middle"
              fill={s <= currentStage ? "white" : COLORS.textMuted}
              fontSize="8"
              fontFamily="Inter, sans-serif"
              fontWeight="600"
            >
              {s + 1}
            </text>
          </g>
        ))}

        {/* Current stage label */}
        <text
          x="250"
          y="340"
          textAnchor="middle"
          fill={COLORS.purpleLight}
          fontSize="12"
          fontFamily="Inter, sans-serif"
          fontWeight="500"
        >
          {stageLabel}
        </text>
        <text
          x="250"
          y="358"
          textAnchor="middle"
          fill={COLORS.textMuted}
          fontSize="10"
          fontFamily="Inter, sans-serif"
        >
          Clear aligner therapy
        </text>
      </g>
    </svg>
  );
};
