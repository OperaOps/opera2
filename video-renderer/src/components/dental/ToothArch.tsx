import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../../lib/colors";

interface ToothArchProps {
  highlightTeeth?: number[];
  highlightColor?: string;
  progress: number;
}

const TOOTH_PATHS: string[] = [
  // Upper-left molars to upper-right molars, arranged in a U-shape (16 teeth)
  // Left third molar (wisdom)
  "M0,-4 C3,-6 6,-6 8,-4 L9,4 C7,7 2,7 0,4 Z",
  // Left second molar
  "M0,-4 C3,-6 7,-6 9,-4 L10,4 C7,7 2,7 0,4 Z",
  // Left first molar
  "M0,-5 C3,-7 7,-7 10,-5 L10,4 C7,7 2,7 0,4 Z",
  // Left second premolar
  "M0,-4 C2,-6 6,-6 8,-4 L8,4 C6,6 2,6 0,4 Z",
  // Left first premolar
  "M0,-4 C2,-6 6,-6 8,-4 L7,4 C5,6 2,6 0,4 Z",
  // Left canine
  "M0,-3 C2,-6 5,-6 7,-3 L6,5 C4,7 2,7 0,5 Z",
  // Left lateral incisor
  "M0,-3 C2,-5 5,-5 6,-3 L6,4 C4,6 2,6 0,4 Z",
  // Left central incisor
  "M0,-3 C2,-5 5,-5 7,-3 L6,4 C4,6 2,6 0,4 Z",
  // Right central incisor
  "M0,-3 C2,-5 5,-5 7,-3 L6,4 C4,6 2,6 0,4 Z",
  // Right lateral incisor
  "M0,-3 C2,-5 4,-5 6,-3 L6,4 C4,6 2,6 0,4 Z",
  // Right canine
  "M0,-3 C2,-6 5,-6 7,-3 L6,5 C4,7 2,7 0,5 Z",
  // Right first premolar
  "M0,-4 C2,-6 6,-6 8,-4 L7,4 C5,6 2,6 0,4 Z",
  // Right second premolar
  "M0,-4 C2,-6 6,-6 8,-4 L8,4 C6,6 2,6 0,4 Z",
  // Right first molar
  "M0,-5 C3,-7 7,-7 10,-5 L10,4 C7,7 2,7 0,4 Z",
  // Right second molar
  "M0,-4 C3,-6 7,-6 9,-4 L10,4 C7,7 2,7 0,4 Z",
  // Right third molar (wisdom)
  "M0,-4 C3,-6 6,-6 8,-4 L9,4 C7,7 2,7 0,4 Z",
];

// Positions along a U-shaped arch
const ARCH_POSITIONS: Array<{ x: number; y: number; angle: number }> = [
  { x: 68, y: 220, angle: -55 },
  { x: 82, y: 185, angle: -45 },
  { x: 100, y: 155, angle: -35 },
  { x: 120, y: 130, angle: -25 },
  { x: 144, y: 110, angle: -15 },
  { x: 172, y: 95, angle: -8 },
  { x: 202, y: 86, angle: -3 },
  { x: 234, y: 84, angle: 0 },
  { x: 266, y: 84, angle: 0 },
  { x: 298, y: 86, angle: 3 },
  { x: 328, y: 95, angle: 8 },
  { x: 356, y: 110, angle: 15 },
  { x: 380, y: 130, angle: 25 },
  { x: 400, y: 155, angle: 35 },
  { x: 418, y: 185, angle: 45 },
  { x: 432, y: 220, angle: 55 },
];

export const ToothArch: React.FC<ToothArchProps> = ({
  highlightTeeth = [],
  highlightColor = COLORS.problemRed,
  progress,
}) => {
  const frame = useCurrentFrame();

  return (
    <svg viewBox="0 0 500 400" overflow="visible" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="toothGrad" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor={COLORS.toothWhite} />
          <stop offset="100%" stopColor={COLORS.toothShadow} />
        </radialGradient>
        <radialGradient id="highlightGrad" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor={highlightColor} stopOpacity={0.9} />
          <stop offset="100%" stopColor={highlightColor} stopOpacity={0.6} />
        </radialGradient>
        <filter id="toothShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#000" floodOpacity="0.3" />
        </filter>
        <filter id="highlightGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Gum arch shape gradient */}
        <linearGradient id="gumGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.gumPink} stopOpacity={0.3} />
          <stop offset="100%" stopColor={COLORS.gumPink} stopOpacity={0.1} />
        </linearGradient>
      </defs>

      {/* Gum arch background */}
      <path
        d="M55,240 Q60,170 100,130 Q150,80 250,70 Q350,80 400,130 Q440,170 445,240
           Q440,250 400,200 Q350,150 250,140 Q150,150 100,200 Q60,250 55,240 Z"
        fill="url(#gumGrad)"
        opacity={interpolate(progress, [0, 0.2], [0, 1], { extrapolateRight: "clamp" })}
      />

      {/* Render each tooth */}
      {TOOTH_PATHS.map((path, i) => {
        const pos = ARCH_POSITIONS[i];
        const isHighlighted = highlightTeeth.includes(i);

        // Stagger animation: each tooth appears slightly after the previous
        const staggerDelay = i * 0.04;
        const toothProgress = interpolate(
          progress,
          [staggerDelay, staggerDelay + 0.15],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        const scale = interpolate(toothProgress, [0, 1], [0.3, 1.8]);
        const opacity = interpolate(toothProgress, [0, 0.5, 1], [0, 0.8, 1]);

        // Subtle floating animation for highlighted teeth
        const floatOffset = isHighlighted
          ? Math.sin(frame * 0.06 + i) * 1.5
          : 0;

        return (
          <g
            key={i}
            transform={`translate(${pos.x}, ${pos.y + floatOffset}) rotate(${pos.angle}) scale(${scale})`}
            opacity={opacity}
            filter={isHighlighted ? "url(#highlightGlow)" : "url(#toothShadow)"}
          >
            <path
              d={path}
              fill={isHighlighted ? "url(#highlightGrad)" : "url(#toothGrad)"}
              stroke={isHighlighted ? highlightColor : COLORS.toothDark}
              strokeWidth={isHighlighted ? 0.6 : 0.3}
            />
            {/* Enamel shine highlight */}
            {!isHighlighted && (
              <ellipse
                cx={4}
                cy={-2}
                rx={2}
                ry={1.5}
                fill="white"
                opacity={0.25}
              />
            )}
          </g>
        );
      })}

      {/* Center reference line (subtle) */}
      <line
        x1={250}
        y1={70}
        x2={250}
        y2={250}
        stroke={COLORS.purple}
        strokeWidth={0.5}
        strokeDasharray="3,6"
        opacity={interpolate(progress, [0.5, 0.8], [0, 0.15], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })}
      />
    </svg>
  );
};
