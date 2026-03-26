import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../../../lib/colors";

interface FillingVisualProps {
  progress: number;
}

export const FillingVisual: React.FC<FillingVisualProps> = ({ progress }) => {
  const frame = useCurrentFrame();

  const toothReveal = interpolate(progress, [0, 0.15], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Phase 1: Show cavity
  const cavityVisible = interpolate(progress, [0.1, 0.3], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 2: Filling flows in
  const fillProgress = interpolate(progress, [0.4, 0.75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 3: Curing/hardening glow
  const cureGlow = interpolate(progress, [0.75, 0.9], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const labelOpacity = interpolate(progress, [0.8, 0.95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fill level rises from bottom of cavity
  const fillHeight = fillProgress * 42;

  return (
    <svg viewBox="0 0 300 400" overflow="visible" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="flEnamelGrad" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor={COLORS.toothWhite} />
          <stop offset="100%" stopColor={COLORS.enamel} />
        </linearGradient>
        <linearGradient id="flDentinGrad" x1="0.3" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="#f7ecd0" />
          <stop offset="100%" stopColor={COLORS.dentin} />
        </linearGradient>
        <radialGradient id="flPulpGrad" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#e86070" />
          <stop offset="100%" stopColor={COLORS.pulp} />
        </radialGradient>
        <radialGradient id="flCavityGrad" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#1a0d00" />
          <stop offset="100%" stopColor="#3d2010" />
        </radialGradient>
        <linearGradient id="flFillGrad" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#f0e8d8" />
          <stop offset="50%" stopColor={COLORS.compositeFill} />
          <stop offset="100%" stopColor="#d8d0c0" />
        </linearGradient>
        <linearGradient id="flGumGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.gumPink} />
          <stop offset="100%" stopColor="#c88898" />
        </linearGradient>
        <linearGradient id="flBoneGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.bone} />
          <stop offset="100%" stopColor={COLORS.jawbone} />
        </linearGradient>
        <filter id="flShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.25" />
        </filter>
        <filter id="cureLight" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id="flReveal">
          <rect x="0" y={interpolate(toothReveal, [0, 1], [400, 0])} width="300" height="400" />
        </clipPath>
        {/* Clip for filling level */}
        <clipPath id="fillClip">
          <rect x="145" y={110 - fillHeight + 42} width="55" height={fillHeight} />
        </clipPath>
      </defs>

      <g clipPath="url(#flReveal)">
        {/* Bone */}
        <rect x="40" y="175" width="220" height="210" rx="18" fill="url(#flBoneGrad)" opacity={0.45} />

        {/* Gum */}
        <ellipse cx="150" cy="170" rx="115" ry="28" fill="url(#flGumGrad)" opacity={0.85} />

        <g filter="url(#flShadow)">
          {/* Roots */}
          <path d="M115,165 L110,260 C107,295 114,335 126,353 C130,360 136,360 138,353 L148,285 L150,165 Z" fill={COLORS.root} />
          <path d="M150,165 L153,285 L163,353 C165,360 171,360 175,353 C187,335 194,295 191,260 L186,165 Z" fill={COLORS.root} />

          {/* Pulp canals */}
          <path d="M135,163 L132,260 C131,285 133,320 136,335 C137,340 139,340 140,335 L144,275 L146,163 Z" fill="url(#flPulpGrad)" opacity={0.7} />
          <path d="M154,163 L157,275 L161,335 C162,340 164,340 165,335 C168,320 169,285 168,260 L164,163 Z" fill="url(#flPulpGrad)" opacity={0.7} />

          {/* Enamel */}
          <path
            d="M85,148 C85,116 95,84 112,66 C126,52 142,44 150,44 C158,44 174,52 188,66 C205,84 215,116 215,148 L213,168 L87,168 Z"
            fill="url(#flEnamelGrad)"
            stroke={COLORS.toothDark}
            strokeWidth={0.5}
          />

          {/* Dentin */}
          <path
            d="M95,146 C95,120 103,92 116,76 C128,62 142,54 150,54 C158,54 172,62 184,76 C197,92 205,120 205,146 L203,166 L97,166 Z"
            fill="url(#flDentinGrad)"
          />

          {/* Pulp chamber */}
          <path d="M132,108 C132,93 138,84 150,84 C162,84 168,93 168,108 L168,166 L132,166 Z" fill="url(#flPulpGrad)" />

          {/* Enamel shine */}
          <ellipse cx="128" cy="85" rx="10" ry="18" fill="white" opacity={0.12} />
        </g>

        {/* Cavity hole (cleaned out) */}
        <g opacity={cavityVisible}>
          <path
            d="M148,58 C155,55 170,56 180,60 C188,65 192,78 190,92 C188,105 180,110 172,110 C164,110 155,108 150,100 C146,92 144,75 148,58 Z"
            fill="url(#flCavityGrad)"
          />
          {/* Clean cavity walls */}
          <path
            d="M150,62 C156,58 168,60 176,64 C182,70 186,80 185,92 C184,102 178,107 170,107 C162,107 156,104 153,96 C149,88 148,74 150,62 Z"
            fill="#0d0500"
            opacity={0.5}
          />
        </g>

        {/* Composite filling flowing in */}
        {fillProgress > 0 && (
          <g>
            <clipPath id="dynamicFillClip">
              <rect
                x="145"
                y={110 - fillHeight}
                width="50"
                height={fillHeight + 5}
              />
            </clipPath>
            <g clipPath="url(#dynamicFillClip)">
              <path
                d="M150,62 C156,58 168,60 176,64 C182,70 186,80 185,92 C184,102 178,107 170,107 C162,107 156,104 153,96 C149,88 148,74 150,62 Z"
                fill="url(#flFillGrad)"
              />
            </g>

            {/* Filling surface (top of filled area) */}
            {fillProgress > 0.9 && (
              <path
                d="M150,62 C156,58 168,60 176,64 C182,70 186,80 185,92 C184,102 178,107 170,107 C162,107 156,104 153,96 C149,88 148,74 150,62 Z"
                fill="url(#flFillGrad)"
                stroke={COLORS.toothDark}
                strokeWidth={0.3}
              />
            )}
          </g>
        )}

        {/* Curing light effect */}
        {cureGlow > 0 && (
          <g opacity={cureGlow}>
            {/* Blue curing light beam */}
            <path
              d="M165,20 L145,55 L190,55 Z"
              fill={COLORS.infoBlue}
              opacity={0.12 + Math.sin(frame * 0.1) * 0.05}
            />
            <ellipse
              cx="168"
              cy="80"
              rx="25"
              ry="30"
              fill={COLORS.infoBlue}
              opacity={0.08 + Math.sin(frame * 0.08) * 0.03}
              filter="url(#cureLight)"
            />
            {/* Light source */}
            <rect x="155" y="12" width="25" height="12" rx="3" fill="#555" opacity={0.6} />
            <rect x="158" y="22" width="19" height="4" rx="2" fill={COLORS.infoBlue} opacity={0.8} />
          </g>
        )}

        {/* Composite applicator during fill */}
        {fillProgress > 0.1 && fillProgress < 0.85 && (
          <g opacity={0.7}>
            <path
              d="M172,55 L220,20 L225,20 L225,25 L177,60 Z"
              fill="#888"
              stroke="#666"
              strokeWidth={0.5}
            />
            {/* Composite at tip */}
            <circle cx="174" cy="58" r="3" fill={COLORS.compositeFill} opacity={0.8} />
          </g>
        )}

        {/* Labels */}
        <g opacity={labelOpacity}>
          <line x1="190" y1="80" x2="245" y2="65" stroke={COLORS.textMuted} strokeWidth={0.7} />
          <text x="248" y="63" fill={COLORS.textSecondary} fontSize="10" fontFamily="Inter, sans-serif" fontWeight="500">
            Composite Filling
          </text>
          <text x="248" y="77" fill={COLORS.textMuted} fontSize="8" fontFamily="Inter, sans-serif">
            Tooth-colored restoration
          </text>
        </g>
      </g>
    </svg>
  );
};
