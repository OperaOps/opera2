import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../../../lib/colors";

interface MissingToothVisualProps {
  progress: number;
}

const TOOTH_PATH =
  "M-13,-24 C-14,-12 -13,8 -11,20 C-9,25 -4,28 0,28 C4,28 9,25 11,20 C13,8 14,-12 13,-24 C9,-28 -9,-28 -13,-24 Z";

// 7 tooth positions, index 3 is missing
const TEETH = [
  { x: 80, tilt: 0, present: true },
  { x: 132, tilt: 0, present: true },
  { x: 184, tilt: 0, present: true },
  { x: 250, tilt: 0, present: false }, // Missing
  { x: 316, tilt: 0, present: true },
  { x: 368, tilt: 0, present: true },
  { x: 420, tilt: 0, present: true },
];

export const MissingToothVisual: React.FC<MissingToothVisualProps> = ({
  progress,
}) => {
  const frame = useCurrentFrame();

  const reveal = interpolate(progress, [0, 0.15], [0, 1], {
    extrapolateRight: "clamp",
  });

  const gapAppear = interpolate(progress, [0.2, 0.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Adjacent teeth tilt toward the gap over time
  const tiltProgress = interpolate(progress, [0.5, 0.85], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const labelOpacity = interpolate(progress, [0.65, 0.85], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Calculate tilt for adjacent teeth
  const getTilt = (index: number) => {
    if (index === 2) return tiltProgress * 6; // Left neighbor tilts right
    if (index === 4) return tiltProgress * -6; // Right neighbor tilts left
    return 0;
  };

  return (
    <svg viewBox="0 0 500 400" overflow="visible" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="mtToothGrad" x1="0.3" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor={COLORS.toothWhite} />
          <stop offset="60%" stopColor={COLORS.enamel} />
          <stop offset="100%" stopColor={COLORS.toothShadow} />
        </linearGradient>
        <linearGradient id="mtGumGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c07080" />
          <stop offset="50%" stopColor={COLORS.gumPink} />
          <stop offset="100%" stopColor="#d4909c" />
        </linearGradient>
        <radialGradient id="socketGrad" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#0a0510" />
          <stop offset="60%" stopColor="#1a0d20" />
          <stop offset="100%" stopColor="#2a1530" />
        </radialGradient>
        <linearGradient id="mtBoneGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.bone} />
          <stop offset="100%" stopColor={COLORS.jawbone} />
        </linearGradient>
        <filter id="mtShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0.5" dy="1.5" stdDeviation="1.5" floodColor="#000" floodOpacity="0.25" />
        </filter>
        <filter id="socketShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="gapHighlight" x="-30%" y="-20%" width="160%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g opacity={reveal}>
        {/* Bone background */}
        <path
          d="M30,185 Q100,175 250,172 Q400,175 470,185 L470,360 L30,360 Z"
          fill="url(#mtBoneGrad)"
          opacity={0.35}
        />

        {/* Bone loss in gap area */}
        <ellipse
          cx={250}
          cy={195}
          rx={30}
          ry={12}
          fill={COLORS.bgDark}
          opacity={gapAppear * 0.3}
        />

        {/* Gum tissue */}
        <path
          d={`M20,155
            Q50,140 80,148 Q100,138 132,148
            Q155,138 184,148
            Q210,${140 + gapAppear * 10} 250,${155 + gapAppear * 8}
            Q290,${140 + gapAppear * 10} 316,148
            Q345,138 368,148 Q395,138 420,148
            Q450,140 480,155
            L480,100 Q450,88 250,80 Q50,88 20,100 Z`}
          fill="url(#mtGumGrad)"
          opacity={0.85}
        />

        {/* Empty socket area */}
        <g opacity={gapAppear}>
          <ellipse
            cx={250}
            cy={185}
            rx={22}
            ry={15}
            fill="url(#socketGrad)"
            filter="url(#socketShadow)"
          />
          {/* Socket inner detail */}
          <ellipse
            cx={250}
            cy={183}
            rx={14}
            ry={10}
            fill="#080310"
            opacity={0.6}
          />
          {/* Socket rim highlight */}
          <ellipse
            cx={250}
            cy={180}
            rx={20}
            ry={8}
            fill="none"
            stroke={COLORS.gumPink}
            strokeWidth={1}
            opacity={0.3}
          />
        </g>

        {/* Teeth */}
        {TEETH.map((tooth, i) => {
          if (!tooth.present) return null;

          const stagger = i * 0.04;
          const toothProg = interpolate(
            progress,
            [stagger + 0.05, stagger + 0.2],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          const ySlide = interpolate(toothProg, [0, 1], [30, 0]);
          const opacity = interpolate(toothProg, [0, 0.5, 1], [0, 0.8, 1]);
          const tilt = getTilt(i);

          return (
            <g
              key={i}
              transform={`translate(${tooth.x}, ${210 + ySlide}) rotate(${tilt})`}
              opacity={opacity}
              filter="url(#mtShadow)"
            >
              <path
                d={TOOTH_PATH}
                fill="url(#mtToothGrad)"
                stroke={COLORS.toothDark}
                strokeWidth={0.4}
              />
              <ellipse cx={-2} cy={-10} rx={3.5} ry={7} fill="white" opacity={0.12} />
            </g>
          );
        })}

        {/* Tilt direction arrows */}
        <g opacity={tiltProgress * labelOpacity}>
          {/* Left neighbor arrow */}
          <path
            d="M195,170 L210,175 L198,178 Z"
            fill={COLORS.problemOrange}
            opacity={0.6 + Math.sin(frame * 0.05) * 0.2}
          />
          {/* Right neighbor arrow */}
          <path
            d="M305,170 L290,175 L302,178 Z"
            fill={COLORS.problemOrange}
            opacity={0.6 + Math.sin(frame * 0.05 + 1) * 0.2}
          />
        </g>

        {/* Gap highlight indicator */}
        <g opacity={gapAppear * 0.6} filter="url(#gapHighlight)">
          <rect
            x={220}
            y={160}
            width={60}
            height={80}
            rx={6}
            fill="none"
            stroke={COLORS.problemRed}
            strokeWidth={1.5}
            strokeDasharray="5,5"
            opacity={0.5 + Math.sin(frame * 0.04) * 0.15}
          />
        </g>

        {/* Downward arrow indicating missing tooth */}
        <g opacity={labelOpacity}>
          <line
            x1={250}
            y1={130}
            x2={250}
            y2={160}
            stroke={COLORS.problemRed}
            strokeWidth={1.5}
          />
          <path d="M244,155 L250,165 L256,155" fill={COLORS.problemRed} />
          <text
            x={250}
            y={125}
            textAnchor="middle"
            fill={COLORS.problemRed}
            fontSize="11"
            fontFamily="Inter, sans-serif"
            fontWeight="600"
          >
            Missing Tooth
          </text>
        </g>

        {/* Bottom labels */}
        <g opacity={labelOpacity}>
          <text
            x="250"
            y="330"
            textAnchor="middle"
            fill={COLORS.textMuted}
            fontSize="10"
            fontFamily="Inter, sans-serif"
          >
            Adjacent teeth drifting toward the gap
          </text>
        </g>
      </g>
    </svg>
  );
};
