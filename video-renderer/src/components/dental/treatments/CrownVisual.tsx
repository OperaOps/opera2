import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../../../lib/colors";

interface CrownVisualProps {
  progress: number;
}

export const CrownVisual: React.FC<CrownVisualProps> = ({ progress }) => {
  const frame = useCurrentFrame();

  const toothReveal = interpolate(progress, [0, 0.15], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Crown descends from above
  const crownDescent = interpolate(progress, [0.3, 0.7], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const crownY = interpolate(crownDescent, [0, 1], [-100, 0]);
  const crownOpacity = interpolate(crownDescent, [0, 0.2, 1], [0, 1, 1]);

  // Cement line appears after crown seats
  const cementOpacity = interpolate(progress, [0.7, 0.85], [0, 0.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Shine effect after placement
  const shineOpacity = interpolate(progress, [0.8, 0.95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const labelOpacity = interpolate(progress, [0.75, 0.9], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <svg viewBox="0 0 300 400" overflow="visible" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="crwPrepGrad" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor={COLORS.dentin} />
          <stop offset="100%" stopColor="#d8c8a0" />
        </linearGradient>
        <linearGradient id="crwCrownGrad" x1="0.15" y1="0" x2="0.85" y2="1">
          <stop offset="0%" stopColor="#f8f4f0" />
          <stop offset="30%" stopColor={COLORS.toothWhite} />
          <stop offset="70%" stopColor={COLORS.enamel} />
          <stop offset="100%" stopColor={COLORS.toothShadow} />
        </linearGradient>
        <linearGradient id="crwGoldRim" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e8c860" />
          <stop offset="50%" stopColor={COLORS.crownGold} />
          <stop offset="100%" stopColor="#b89040" />
        </linearGradient>
        <linearGradient id="crwGumGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.gumPink} />
          <stop offset="100%" stopColor="#c88898" />
        </linearGradient>
        <linearGradient id="crwBoneGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.bone} />
          <stop offset="100%" stopColor={COLORS.jawbone} />
        </linearGradient>
        <radialGradient id="crwPulpGrad" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#e86070" />
          <stop offset="100%" stopColor={COLORS.pulp} />
        </radialGradient>
        <filter id="crwShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.25" />
        </filter>
        <filter id="crwShine" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id="crwReveal">
          <rect x="0" y={interpolate(toothReveal, [0, 1], [400, 0])} width="300" height="400" />
        </clipPath>
      </defs>

      <g clipPath="url(#crwReveal)">
        {/* Bone */}
        <rect x="40" y="175" width="220" height="210" rx="18" fill="url(#crwBoneGrad)" opacity={0.45} />

        {/* Gum */}
        <ellipse cx="150" cy="170" rx="115" ry="28" fill="url(#crwGumGrad)" opacity={0.85} />

        <g filter="url(#crwShadow)">
          {/* Roots */}
          <path
            d="M115,165 L110,260 C107,295 114,335 126,353 C130,360 136,360 138,353 L148,285 L150,165 Z"
            fill={COLORS.root}
          />
          <path
            d="M150,165 L153,285 L163,353 C165,360 171,360 175,353 C187,335 194,295 191,260 L186,165 Z"
            fill={COLORS.root}
          />

          {/* Pulp canals */}
          <path
            d="M135,163 L132,260 C131,285 133,320 136,335 C137,340 139,340 140,335 L144,275 L146,163 Z"
            fill="url(#crwPulpGrad)"
            opacity={0.7}
          />
          <path
            d="M154,163 L157,275 L161,335 C162,340 164,340 165,335 C168,320 169,285 168,260 L164,163 Z"
            fill="url(#crwPulpGrad)"
            opacity={0.7}
          />

          {/* Prepared (shaved down) tooth stump */}
          <path
            d="M100,155 C100,135 108,110 120,98 C130,88 140,84 150,84 C160,84 170,88 180,98 C192,110 200,135 200,155 L198,168 L102,168 Z"
            fill="url(#crwPrepGrad)"
            stroke="#c0b898"
            strokeWidth={0.8}
          />
          {/* Preparation margin line */}
          <path
            d="M102,168 L198,168"
            stroke="#b0a080"
            strokeWidth={1}
            strokeDasharray="3,3"
            opacity={0.5}
          />
          {/* Stump top is flat/tapered (prepared) */}
          <ellipse cx="150" cy="86" rx="28" ry="6" fill="#e8d8b8" opacity={0.5} />
        </g>

        {/* ===== CROWN (descending) ===== */}
        <g transform={`translate(0, ${crownY})`} opacity={crownOpacity}>
          <g filter="url(#crwShadow)">
            {/* Crown outer shape - slightly larger than stump */}
            <path
              d="M88,148 C88,115 98,82 114,64 C128,50 142,42 150,42 C158,42 172,50 186,64 C202,82 212,115 212,148 L210,168 L90,168 Z"
              fill="url(#crwCrownGrad)"
              stroke={COLORS.toothDark}
              strokeWidth={0.5}
            />

            {/* Crown inner cavity (fits over stump) */}
            <path
              d="M102,158 C102,140 108,118 120,106 C130,96 140,92 150,92 C160,92 170,96 180,106 C192,118 198,140 198,158 L196,168 L104,168 Z"
              fill="url(#crwPrepGrad)"
              opacity={crownDescent < 0.95 ? 0.4 : 0}
            />

            {/* Gold margin at the base */}
            <path
              d="M90,162 Q90,170 150,172 Q210,170 210,162 Q210,166 150,168 Q90,166 90,162 Z"
              fill="url(#crwGoldRim)"
              opacity={0.6}
            />

            {/* Crown surface details - cusps */}
            <path
              d="M120,55 Q135,45 150,48 Q165,45 180,55"
              fill="none"
              stroke={COLORS.toothDark}
              strokeWidth={0.4}
              opacity={0.3}
            />
            {/* Fissure lines */}
            <line x1="150" y1="48" x2="150" y2="72" stroke={COLORS.toothDark} strokeWidth={0.3} opacity={0.2} />

            {/* Crown shine */}
            <ellipse cx="130" cy="85" rx="12" ry="22" fill="white" opacity={0.15} />
          </g>
        </g>

        {/* Cement line when crown is seated */}
        {crownDescent > 0.95 && (
          <path
            d="M92,166 Q150,170 208,166"
            fill="none"
            stroke={COLORS.crownGold}
            strokeWidth={1}
            opacity={cementOpacity}
          />
        )}

        {/* Sparkle/shine effect after placement */}
        {shineOpacity > 0 && (
          <g opacity={shineOpacity} filter="url(#crwShine)">
            {/* Star sparkle */}
            <g transform="translate(170, 70)">
              <line x1="-6" y1="0" x2="6" y2="0" stroke="white" strokeWidth={1.5} opacity={0.7 + Math.sin(frame * 0.08) * 0.3} />
              <line x1="0" y1="-6" x2="0" y2="6" stroke="white" strokeWidth={1.5} opacity={0.7 + Math.sin(frame * 0.08) * 0.3} />
              <line x1="-4" y1="-4" x2="4" y2="4" stroke="white" strokeWidth={1} opacity={0.5 + Math.sin(frame * 0.08) * 0.2} />
              <line x1="4" y1="-4" x2="-4" y2="4" stroke="white" strokeWidth={1} opacity={0.5 + Math.sin(frame * 0.08) * 0.2} />
            </g>
            <g transform="translate(125, 100)">
              <line x1="-4" y1="0" x2="4" y2="0" stroke="white" strokeWidth={1} opacity={0.5 + Math.sin(frame * 0.06 + 1) * 0.3} />
              <line x1="0" y1="-4" x2="0" y2="4" stroke="white" strokeWidth={1} opacity={0.5 + Math.sin(frame * 0.06 + 1) * 0.3} />
            </g>
          </g>
        )}

        {/* Guide arrows during descent */}
        {crownDescent < 0.9 && crownDescent > 0.1 && (
          <g opacity={0.4}>
            <path
              d="M70,100 L70,140"
              stroke={COLORS.purple}
              strokeWidth={1}
              strokeDasharray="3,4"
            />
            <path d="M66,136 L70,145 L74,136" fill={COLORS.purple} opacity={0.6} />
            <path
              d="M230,100 L230,140"
              stroke={COLORS.purple}
              strokeWidth={1}
              strokeDasharray="3,4"
            />
            <path d="M226,136 L230,145 L234,136" fill={COLORS.purple} opacity={0.6} />
          </g>
        )}

        {/* Labels */}
        <g opacity={labelOpacity}>
          <line x1="215" y1="85" x2="255" y2="70" stroke={COLORS.textMuted} strokeWidth={0.7} />
          <text x="258" y="68" fill={COLORS.textSecondary} fontSize="10" fontFamily="Inter, sans-serif" fontWeight="500">
            Porcelain Crown
          </text>
          <text x="258" y="82" fill={COLORS.textMuted} fontSize="8" fontFamily="Inter, sans-serif">
            Custom-fitted cap
          </text>

          <line x1="100" y1="130" x2="55" y2="120" stroke={COLORS.textMuted} strokeWidth={0.7} />
          <text x="10" y="118" fill={COLORS.textSecondary} fontSize="9" fontFamily="Inter, sans-serif">
            Prepared tooth
          </text>
        </g>
      </g>
    </svg>
  );
};
