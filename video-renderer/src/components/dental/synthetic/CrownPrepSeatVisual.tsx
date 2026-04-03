import React from "react";
import { interpolate } from "remotion";
import { COLORS } from "../../../lib/colors";
import { DiagramLabelFooter } from "../DiagramLabelFooter";

/** Crown deep dive — compromised tooth → prep → crown seats. */
export const CrownPrepSeatVisual: React.FC<{ progress: number }> = ({ progress }) => {
  const reveal = interpolate(progress, [0, 0.08], [0, 1], { extrapolateRight: "clamp" });
  const damageFade = interpolate(progress, [0.22, 0.42], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const prepMorph = interpolate(progress, [0.2, 0.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const crownDrop = interpolate(progress, [0.48, 0.78], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const crownY = interpolate(crownDrop, [0, 1], [-72, 0]);
  const shine = interpolate(progress, [0.78, 0.96], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const labelOpacity = interpolate(progress, [0.86, 0.98], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <svg
      viewBox="0 0 360 400"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      overflow="hidden"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="cpsEnamel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f5f3fa" />
          <stop offset="100%" stopColor={COLORS.enamel} />
        </linearGradient>
        <linearGradient id="cpsCrown" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#f2eeff" />
          <stop offset="35%" stopColor={COLORS.toothWhite} />
          <stop offset="100%" stopColor="#c8c0d8" />
        </linearGradient>
        <linearGradient id="cpsGum" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.gumPink} />
          <stop offset="100%" stopColor="#c08090" />
        </linearGradient>
        <filter id="cpsSh" x="-12%" y="-12%" width="124%" height="124%">
          <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#000" floodOpacity="0.35" />
        </filter>
        <clipPath id="cpsReveal">
          <rect
            x="0"
            y={interpolate(reveal, [0, 1], [400, 0])}
            width="360"
            height="400"
          />
        </clipPath>
      </defs>

      <rect width="360" height="400" fill="#0a0810" />
      <g clipPath="url(#cpsReveal)" transform="translate(0, 8)">
        <text
          x="180"
          y="20"
          textAnchor="middle"
          fill={COLORS.textMuted}
          fontSize="10"
          fontFamily="system-ui, sans-serif"
          opacity={0.55}
        >
          Crown restoration
        </text>

        {/* Root */}
        <path
          d="M155,198 L152,310 Q180,328 208,310 L205,198 Z"
          fill={COLORS.root}
          opacity={0.9}
          stroke={COLORS.toothDark}
          strokeWidth={0.4}
        />

        {/* Prep core (morphs from full crown height) */}
        <path
          d={`M${interpolate(prepMorph, [0, 1], [118, 128])},${interpolate(prepMorph, [0, 1], [88, 102])}
             Q180,${interpolate(prepMorph, [0, 1], [72, 78])} ${interpolate(prepMorph, [0, 1], [242, 232])},${interpolate(prepMorph, [0, 1], [88, 102])}
             L${interpolate(prepMorph, [0, 1], [242, 232])},198
             Q180,208 ${interpolate(prepMorph, [0, 1], [118, 128])},198 Z`}
          fill="url(#cpsEnamel)"
          stroke={COLORS.toothDark}
          strokeWidth={0.55}
          filter="url(#cpsSh)"
        />

        {/* Damage / crack */}
        <g opacity={damageFade * (1 - prepMorph * 0.85)}>
          <path
            d="M160,100 L175,145 L168,150 L153,105 Z"
            fill={COLORS.problemRed}
            opacity={0.35}
          />
          <path
            d="M160,100 L175,145"
            fill="none"
            stroke="#5a3040"
            strokeWidth={1.2}
            strokeLinecap="round"
          />
        </g>

        {/* Margin line */}
        {prepMorph > 0.25 && (
          <ellipse
            cx="180"
            cy="198"
            rx={interpolate(prepMorph, [0.25, 1], [0, 52], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
            ry="6"
            fill="none"
            stroke={COLORS.healthyTeal}
            strokeWidth={0.8}
            opacity={0.45}
          />
        )}

        {/* Crown shell */}
        <g transform={`translate(0, ${crownY})`} opacity={interpolate(crownDrop, [0, 0.1, 1], [0, 1, 1])}>
          <path
            d="M118,82 Q180,64 242,82 L238,118 Q180,108 122,118 Z"
            fill="url(#cpsCrown)"
            stroke={COLORS.toothDark}
            strokeWidth={0.5}
            filter="url(#cpsSh)"
          />
          <path
            d="M125,88 Q180,76 235,88"
            fill="none"
            stroke="white"
            strokeWidth={1}
            opacity={0.15}
          />
          <rect x="168" y="72" width="24" height="38" rx="3" fill="white" opacity={0.08} />
        </g>

        {shine > 0 && (
          <g opacity={shine * 0.65}>
            <line x1="150" y1="92" x2="210" y2="92" stroke="white" strokeWidth={0.8} />
            <line x1="180" y1="78" x2="180" y2="108" stroke="white" strokeWidth={0.8} />
          </g>
        )}

        <path
          d="M88,200 Q180,182 272,200 L272,224 Q180,208 88,224 Z"
          fill="url(#cpsGum)"
          opacity={0.9}
        />
      </g>

      <DiagramLabelFooter
        opacity={labelOpacity}
        vbWidth={360}
        y={308}
        items={[
          { title: "Damage", subtitle: "Weakened tooth" },
          { title: "Prep", subtitle: "Ideal shape" },
          { title: "Crown", subtitle: "Custom fit" },
        ]}
      />
    </svg>
  );
};
