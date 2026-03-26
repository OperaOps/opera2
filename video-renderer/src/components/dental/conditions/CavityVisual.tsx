import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../../../lib/colors";

interface CavityVisualProps {
  progress: number;
}

export const CavityVisual: React.FC<CavityVisualProps> = ({ progress }) => {
  const frame = useCurrentFrame();

  // Cavity growth animation
  const cavitySize = interpolate(progress, [0.2, 0.7], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const toothReveal = interpolate(progress, [0, 0.2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const labelOpacity = interpolate(progress, [0.6, 0.85], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtle pulsing of the cavity edge
  const cavityPulse = 1 + Math.sin(frame * 0.05) * 0.03;

  return (
    <svg viewBox="0 0 300 400" overflow="visible" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cavEnamelGrad" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor={COLORS.toothWhite} />
          <stop offset="100%" stopColor={COLORS.enamel} />
        </linearGradient>
        <linearGradient id="cavDentinGrad" x1="0.3" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="#f7ecd0" />
          <stop offset="100%" stopColor={COLORS.dentin} />
        </linearGradient>
        <radialGradient id="cavPulpGrad" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#e86070" />
          <stop offset="100%" stopColor={COLORS.pulp} />
        </radialGradient>
        <radialGradient id="cavityGrad" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#1a0d00" />
          <stop offset="40%" stopColor="#3d2010" />
          <stop offset="100%" stopColor="#5c3518" />
        </radialGradient>
        <linearGradient id="cavGumGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.gumPink} />
          <stop offset="100%" stopColor="#c88898" />
        </linearGradient>
        <linearGradient id="cavBoneGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.bone} />
          <stop offset="100%" stopColor={COLORS.jawbone} />
        </linearGradient>
        <filter id="cavShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.25" />
        </filter>
        <filter id="cavityEdgeGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id="cavRevealClip">
          <rect x="0" y={interpolate(toothReveal, [0, 1], [400, 0])} width="300" height="400" />
        </clipPath>
      </defs>

      <g clipPath="url(#cavRevealClip)">
        {/* Bone */}
        <rect x="40" y="165" width="220" height="220" rx="18" fill="url(#cavBoneGrad)" opacity={0.5} />

        {/* Gum tissue */}
        <ellipse cx="150" cy="160" rx="120" ry="28" fill="url(#cavGumGrad)" opacity={0.85} />

        <g filter="url(#cavShadow)">
          {/* Root */}
          <path
            d="M110,155 L105,250 C102,285 108,325 120,345 C124,352 130,352 132,345 L140,280 L145,155 Z"
            fill={COLORS.root}
          />
          <path
            d="M155,155 L158,280 L166,345 C168,352 174,352 178,345 C190,325 196,285 193,250 L188,155 Z"
            fill={COLORS.root}
          />

          {/* Pulp canals */}
          <path
            d="M130,150 L127,250 C126,275 128,310 131,325 C132,330 134,330 135,325 L138,270 L140,150 Z"
            fill="url(#cavPulpGrad)"
            opacity={0.8}
          />
          <path
            d="M160,150 L162,270 L165,325 C166,330 168,330 169,325 C172,310 173,275 172,250 L168,150 Z"
            fill="url(#cavPulpGrad)"
            opacity={0.8}
          />

          {/* Enamel outer */}
          <path
            d="M80,140 C80,108 90,78 108,60 C122,46 140,40 150,40 C160,40 178,46 192,60 C210,78 220,108 220,140 L218,155 L82,155 Z"
            fill="url(#cavEnamelGrad)"
            stroke={COLORS.toothDark}
            strokeWidth={0.5}
          />

          {/* Dentin layer */}
          <path
            d="M90,138 C90,112 98,86 112,70 C124,58 140,50 150,50 C160,50 176,58 188,70 C202,86 210,112 210,138 L208,152 L92,152 Z"
            fill="url(#cavDentinGrad)"
          />

          {/* Pulp chamber */}
          <path
            d="M132,100 C132,86 138,78 150,78 C162,78 168,86 168,100 L168,152 L132,152 Z"
            fill="url(#cavPulpGrad)"
          />

          {/* Enamel shine */}
          <ellipse cx="135" cy="80" rx="10" ry="16" fill="white" opacity={0.15} />
        </g>

        {/* Cavity - dark irregular shape eating into the tooth */}
        <g
          transform={`translate(170, 65) scale(${cavitySize * cavityPulse})`}
          filter="url(#cavityEdgeGlow)"
        >
          {/* Cavity main body */}
          <path
            d="M0,-5 C8,-8 15,-4 18,2 C22,10 20,22 16,30 C13,36 8,40 2,42 C-4,40 -8,34 -10,28 C-14,20 -12,8 -8,0 C-5,-4 -3,-6 0,-5 Z"
            fill="url(#cavityGrad)"
          />
          {/* Cavity darker center */}
          <path
            d="M2,2 C7,0 12,4 13,10 C14,18 12,26 8,30 C4,28 2,22 1,16 C0,10 -1,5 2,2 Z"
            fill="#0d0500"
            opacity={0.7}
          />
          {/* Rough/irregular edges of decay */}
          <path
            d="M-6,5 C-9,8 -11,14 -8,12 C-5,10 -4,6 -6,5 Z"
            fill="#4a2810"
            opacity={0.6}
          />
          <path
            d="M14,6 C18,9 19,15 16,13 C13,11 12,7 14,6 Z"
            fill="#4a2810"
            opacity={0.6}
          />
          {/* Brown discoloration around cavity */}
          <ellipse cx="4" cy="18" rx="18" ry="22" fill="#6b4020" opacity={0.15} />
        </g>

        {/* Bacteria particles */}
        {cavitySize > 0.3 &&
          Array.from({ length: 6 }).map((_, i) => {
            const angle = (frame * 0.02 + i * 1.05) % (Math.PI * 2);
            const radius = 25 + Math.sin(frame * 0.03 + i * 2) * 8;
            const bx = 175 + Math.cos(angle) * radius;
            const by = 80 + Math.sin(angle) * radius;
            const bOpacity = interpolate(
              cavitySize,
              [0.3, 0.6],
              [0, 0.5],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            return (
              <circle
                key={i}
                cx={bx}
                cy={by}
                r={1.5 + Math.sin(i) * 0.5}
                fill={COLORS.warningYellow}
                opacity={bOpacity * (0.5 + Math.sin(frame * 0.04 + i) * 0.3)}
              />
            );
          })}

        {/* Label */}
        <g opacity={labelOpacity}>
          <line x1="178" y1="85" x2="248" y2="60" stroke={COLORS.problemRed} strokeWidth={0.8} />
          <text x="250" y="58" fill={COLORS.problemRed} fontSize="11" fontFamily="Inter, sans-serif" fontWeight="600">
            Cavity
          </text>
          <text x="250" y="72" fill={COLORS.textMuted} fontSize="9" fontFamily="Inter, sans-serif">
            Tooth decay
          </text>
        </g>
      </g>
    </svg>
  );
};
