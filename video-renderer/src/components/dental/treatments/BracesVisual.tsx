import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../../../lib/colors";

interface BracesVisualProps {
  progress: number;
}

const TOOTH_PATH =
  "M-13,-24 C-14,-12 -13,8 -11,20 C-9,25 -4,28 0,28 C4,28 9,25 11,20 C13,8 14,-12 13,-24 C9,-28 -9,-28 -13,-24 Z";

// Initial (crooked) positions and target (aligned) positions
const TEETH_CONFIG = [
  { x: 68, initRot: -5, initY: 212, targetRot: 0, targetY: 210 },
  { x: 120, initRot: 10, initY: 206, targetRot: 0, targetY: 210 },
  { x: 168, initRot: -7, initY: 215, targetRot: 0, targetY: 210 },
  { x: 216, initRot: 12, initY: 204, targetRot: 0, targetY: 210 },
  { x: 264, initRot: -8, initY: 213, targetRot: 0, targetY: 210 },
  { x: 312, initRot: -10, initY: 208, targetRot: 0, targetY: 210 },
  { x: 360, initRot: 6, initY: 211, targetRot: 0, targetY: 210 },
  { x: 408, initRot: 4, initY: 209, targetRot: 0, targetY: 210 },
];

export const BracesVisual: React.FC<BracesVisualProps> = ({ progress }) => {
  const frame = useCurrentFrame();

  const gumReveal = interpolate(progress, [0, 0.1], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Phase 1: Teeth appear in crooked positions
  const teethAppear = interpolate(progress, [0.05, 0.25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 2: Brackets appear
  const bracketsAppear = interpolate(progress, [0.25, 0.45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 3: Wire threads through
  const wireProgress = interpolate(progress, [0.4, 0.55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 4: Teeth move to aligned positions
  const alignProgress = interpolate(progress, [0.6, 0.95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <svg viewBox="0 0 500 400" overflow="visible" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="brToothGrad" x1="0.3" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor={COLORS.toothWhite} />
          <stop offset="60%" stopColor={COLORS.enamel} />
          <stop offset="100%" stopColor={COLORS.toothShadow} />
        </linearGradient>
        <linearGradient id="brGumGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c07080" />
          <stop offset="50%" stopColor={COLORS.gumPink} />
          <stop offset="100%" stopColor="#d4909c" />
        </linearGradient>
        <linearGradient id="bracketGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d8d8e0" />
          <stop offset="40%" stopColor={COLORS.metalBracket} />
          <stop offset="100%" stopColor="#9898a0" />
        </linearGradient>
        <linearGradient id="wireGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#b0b0b8" />
          <stop offset="50%" stopColor={COLORS.wire} />
          <stop offset="100%" stopColor="#909098" />
        </linearGradient>
        <filter id="brShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0.5" dy="1" stdDeviation="1" floodColor="#000" floodOpacity="0.2" />
        </filter>
        <filter id="metalShine" x="-10%" y="-10%" width="120%" height="120%">
          <feSpecularLighting surfaceScale="2" specularConstant="0.8" specularExponent="20" result="spec">
            <fePointLight x="250" y="100" z="200" />
          </feSpecularLighting>
          <feComposite in="SourceGraphic" in2="spec" operator="arithmetic" k1="0" k2="1" k3="0.2" k4="0" />
        </filter>
      </defs>

      {/* Gum tissue */}
      <g opacity={gumReveal}>
        <path
          d="M20,170 Q50,140 120,128 Q200,115 250,112 Q300,115 380,128 Q450,140 480,170
             L480,98 Q450,86 250,78 Q50,86 20,98 Z"
          fill="url(#brGumGrad)"
        />
      </g>

      {/* Teeth */}
      {TEETH_CONFIG.map((tooth, i) => {
        const stagger = i * 0.02;
        const appear = interpolate(
          teethAppear,
          [stagger, stagger + 0.15],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        // Interpolate from crooked to aligned
        const currentRot = interpolate(
          alignProgress,
          [0, 1],
          [tooth.initRot, tooth.targetRot]
        );
        const currentY = interpolate(
          alignProgress,
          [0, 1],
          [tooth.initY, tooth.targetY]
        );

        const ySlide = interpolate(appear, [0, 1], [30, 0]);
        const opacity = interpolate(appear, [0, 0.5, 1], [0, 0.8, 1]);

        return (
          <g key={i}>
            {/* Tooth */}
            <g
              transform={`translate(${tooth.x}, ${currentY + ySlide}) rotate(${currentRot})`}
              opacity={opacity}
              filter="url(#brShadow)"
            >
              <path
                d={TOOTH_PATH}
                fill="url(#brToothGrad)"
                stroke={COLORS.toothDark}
                strokeWidth={0.4}
              />
              <ellipse cx={-2} cy={-10} rx={3.5} ry={7} fill="white" opacity={0.12} />

              {/* Bracket */}
              <g opacity={interpolate(bracketsAppear, [i * 0.08, i * 0.08 + 0.2], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}>
                {/* Bracket base */}
                <rect
                  x={-6}
                  y={-5}
                  width={12}
                  height={10}
                  rx={1.5}
                  fill="url(#bracketGrad)"
                  stroke="#808088"
                  strokeWidth={0.5}
                />
                {/* Bracket slot (horizontal groove) */}
                <rect
                  x={-5}
                  y={-1}
                  width={10}
                  height={2}
                  rx={0.5}
                  fill="#888890"
                />
                {/* Bracket wings */}
                <rect x={-7} y={-3} width={3} height={6} rx={0.8} fill="url(#bracketGrad)" stroke="#808088" strokeWidth={0.3} />
                <rect x={4} y={-3} width={3} height={6} rx={0.8} fill="url(#bracketGrad)" stroke="#808088" strokeWidth={0.3} />
                {/* Metal highlight */}
                <rect x={-4} y={-4} width={3} height={2} rx={1} fill="white" opacity={0.25} />
              </g>
            </g>
          </g>
        );
      })}

      {/* Archwire */}
      {wireProgress > 0 && (
        <g opacity={wireProgress}>
          <path
            d={(() => {
              // Generate wire path through bracket centers
              const points = TEETH_CONFIG.map((tooth) => {
                const y = interpolate(
                  alignProgress,
                  [0, 1],
                  [tooth.initY, tooth.targetY]
                );
                return `${tooth.x},${y}`;
              });
              return `M${points[0]} C${points.map((p) => p).join(" ")}`;
            })()}
            fill="none"
            stroke="url(#wireGrad)"
            strokeWidth={2}
            strokeLinecap="round"
            strokeDasharray={wireProgress < 1 ? `${wireProgress * 500},500` : "none"}
          />
          {/* Wire shine */}
          <path
            d={(() => {
              const points = TEETH_CONFIG.map((tooth) => {
                const y = interpolate(
                  alignProgress,
                  [0, 1],
                  [tooth.initY - 0.8, tooth.targetY - 0.8]
                );
                return `${tooth.x},${y}`;
              });
              return `M${points[0]} C${points.map((p) => p).join(" ")}`;
            })()}
            fill="none"
            stroke="white"
            strokeWidth={0.5}
            opacity={0.2}
            strokeDasharray={wireProgress < 1 ? `${wireProgress * 500},500` : "none"}
          />
        </g>
      )}

      {/* Elastic ties (colored) on some brackets */}
      {bracketsAppear > 0.8 &&
        TEETH_CONFIG.map((tooth, i) => {
          const currentY = interpolate(
            alignProgress,
            [0, 1],
            [tooth.initY, tooth.targetY]
          );
          return (
            <circle
              key={`tie-${i}`}
              cx={tooth.x}
              cy={currentY}
              r={7}
              fill="none"
              stroke={COLORS.purple}
              strokeWidth={1.2}
              opacity={0.25}
            />
          );
        })}

      {/* Progress indicators */}
      <g
        opacity={interpolate(progress, [0.7, 0.85], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })}
      >
        {/* Movement arrows */}
        {alignProgress < 0.8 &&
          TEETH_CONFIG.filter((t) => Math.abs(t.initRot) > 5).map((tooth, i) => {
            const direction = tooth.initRot > 0 ? -1 : 1;
            return (
              <path
                key={`arrow-${i}`}
                d={`M${tooth.x + direction * 15},${tooth.targetY - 38} L${tooth.x},${tooth.targetY - 32} L${tooth.x + direction * 15},${tooth.targetY - 26}`}
                fill="none"
                stroke={COLORS.healthyGreen}
                strokeWidth={1}
                opacity={0.5 + Math.sin(frame * 0.05 + i) * 0.2}
              />
            );
          })}
      </g>

      {/* Label */}
      <g
        opacity={interpolate(progress, [0.5, 0.7], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })}
      >
        <text
          x="250"
          y="310"
          textAnchor="middle"
          fill={COLORS.metalBracket}
          fontSize="14"
          fontFamily="Inter, sans-serif"
          fontWeight="600"
        >
          Metal Braces
        </text>
        <text
          x="250"
          y="330"
          textAnchor="middle"
          fill={COLORS.textMuted}
          fontSize="10"
          fontFamily="Inter, sans-serif"
        >
          Brackets and archwire gradually align teeth
        </text>
      </g>
    </svg>
  );
};
