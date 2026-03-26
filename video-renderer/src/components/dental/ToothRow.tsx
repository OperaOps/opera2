import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../../lib/colors";

interface ToothConfig {
  offset?: number;
  rotation?: number;
  color?: string;
  missing?: boolean;
}

interface ToothRowProps {
  teeth?: ToothConfig[];
  showGums?: boolean;
  progress: number;
}

const DEFAULT_TEETH: ToothConfig[] = [
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
];

// Front-facing tooth SVG shapes (viewed as if smiling)
// Each tooth is wider at the biting edge and narrower toward the gum
const FRONT_TOOTH_PATHS = [
  // Lateral incisor (left)
  "M-12,-22 C-13,-10 -13,8 -11,20 C-9,24 -3,26 0,26 C3,26 9,24 11,20 C13,8 13,-10 12,-22 C8,-26 -8,-26 -12,-22 Z",
  // Canine (left)
  "M-11,-24 C-12,-12 -12,6 -10,18 C-8,24 -3,27 0,27 C3,27 8,24 10,18 C12,6 12,-12 11,-24 C7,-28 -7,-28 -11,-24 Z",
  // Premolar (left)
  "M-13,-22 C-14,-10 -13,8 -11,20 C-9,24 -4,26 0,26 C4,26 9,24 11,20 C13,8 14,-10 13,-22 C9,-26 -9,-26 -13,-22 Z",
  // Central incisor (left)
  "M-14,-22 C-15,-10 -14,10 -12,22 C-10,26 -4,28 0,28 C4,28 10,26 12,22 C14,10 15,-10 14,-22 C10,-26 -10,-26 -14,-22 Z",
  // Central incisor (right)
  "M-14,-22 C-15,-10 -14,10 -12,22 C-10,26 -4,28 0,28 C4,28 10,26 12,22 C14,10 15,-10 14,-22 C10,-26 -10,-26 -14,-22 Z",
  // Premolar (right)
  "M-13,-22 C-14,-10 -13,8 -11,20 C-9,24 -4,26 0,26 C4,26 9,24 11,20 C13,8 14,-10 13,-22 C9,-26 -9,-26 -13,-22 Z",
  // Canine (right)
  "M-11,-24 C-12,-12 -12,6 -10,18 C-8,24 -3,27 0,27 C3,27 8,24 10,18 C12,6 12,-12 11,-24 C7,-28 -7,-28 -11,-24 Z",
  // Lateral incisor (right)
  "M-12,-22 C-13,-10 -13,8 -11,20 C-9,24 -3,26 0,26 C3,26 9,24 11,20 C13,8 13,-10 12,-22 C8,-26 -8,-26 -12,-22 Z",
];

export const ToothRow: React.FC<ToothRowProps> = ({
  teeth = DEFAULT_TEETH,
  showGums = true,
  progress,
}) => {
  const frame = useCurrentFrame();
  const toothCount = teeth.length;
  const spacing = 420 / toothCount;
  const startX = 40 + spacing / 2;

  return (
    <svg viewBox="0 0 500 400" overflow="visible" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="rowToothGrad" x1="0.3" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor={COLORS.toothWhite} />
          <stop offset="60%" stopColor={COLORS.enamel} />
          <stop offset="100%" stopColor={COLORS.toothShadow} />
        </linearGradient>
        <linearGradient id="rowGumGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c47888" />
          <stop offset="40%" stopColor={COLORS.gumPink} />
          <stop offset="100%" stopColor="#d4909c" />
        </linearGradient>
        <filter id="rowToothShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0.5" dy="1" stdDeviation="1" floodColor="#000" floodOpacity="0.2" />
        </filter>
        <filter id="rowGumSoft" x="-5%" y="-5%" width="110%" height="110%">
          <feGaussianBlur stdDeviation="0.8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id="gumMask">
          <rect x="0" y="100" width="500" height="300" />
        </clipPath>
      </defs>

      {/* Gum tissue */}
      {showGums && (
        <g opacity={interpolate(progress, [0, 0.2], [0, 1], { extrapolateRight: "clamp" })}>
          {/* Main gum body */}
          <path
            d={`M20,155
              ${teeth
                .map((t, i) => {
                  const x = startX + i * spacing;
                  const gumDip = t.missing ? 0 : 12;
                  return `Q${x - spacing * 0.3},${140 - gumDip} ${x},${148 - gumDip * 0.5} Q${x + spacing * 0.3},${140 - gumDip} ${x + spacing * 0.5},155`;
                })
                .join(" ")}
              L480,155 L480,100 Q450,90 250,85 Q50,90 20,100 Z`}
            fill="url(#rowGumGrad)"
            filter="url(#rowGumSoft)"
          />
          {/* Gum line highlight */}
          <path
            d={`M30,145
              ${teeth
                .map((t, i) => {
                  const x = startX + i * spacing;
                  const gumDip = t.missing ? 0 : 10;
                  return `Q${x},${138 - gumDip} ${x + spacing * 0.5},145`;
                })
                .join(" ")}
              L470,145`}
            fill="none"
            stroke="#d9808c"
            strokeWidth={1.5}
            opacity={0.4}
          />
        </g>
      )}

      {/* Teeth */}
      {teeth.map((tooth, i) => {
        if (tooth.missing) {
          // Render empty socket area
          const x = startX + i * spacing;
          const socketOpacity = interpolate(progress, [0.3, 0.6], [0, 0.5], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <g key={i}>
              <ellipse
                cx={x}
                cy={190}
                rx={spacing * 0.3}
                ry={12}
                fill="#1a1020"
                opacity={socketOpacity}
              />
              <ellipse
                cx={x}
                cy={190}
                rx={spacing * 0.22}
                ry={8}
                fill="#0d0815"
                opacity={socketOpacity * 0.7}
              />
            </g>
          );
        }

        const x = startX + i * spacing + (tooth.offset || 0);
        const rotation = tooth.rotation || 0;
        const color = tooth.color || undefined;
        const pathIndex = i % FRONT_TOOTH_PATHS.length;

        // Stagger reveal
        const staggerDelay = i * 0.05;
        const toothProg = interpolate(
          progress,
          [staggerDelay + 0.05, staggerDelay + 0.25],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        const yOffset = interpolate(toothProg, [0, 1], [30, 0]);
        const opacity = interpolate(toothProg, [0, 0.6, 1], [0, 0.7, 1]);

        return (
          <g
            key={i}
            transform={`translate(${x}, ${210 + yOffset}) rotate(${rotation})`}
            opacity={opacity}
            filter="url(#rowToothShadow)"
          >
            <path
              d={FRONT_TOOTH_PATHS[pathIndex]}
              fill={color || "url(#rowToothGrad)"}
              stroke={COLORS.toothDark}
              strokeWidth={0.4}
            />
            {/* Shine effect */}
            <ellipse
              cx={-2}
              cy={-8}
              rx={4}
              ry={8}
              fill="white"
              opacity={0.12}
            />
            {/* Subtle vertical line detail */}
            <line
              x1={0}
              y1={-18}
              x2={0}
              y2={18}
              stroke={COLORS.toothDark}
              strokeWidth={0.2}
              opacity={0.15}
            />
          </g>
        );
      })}
    </svg>
  );
};
