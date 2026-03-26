import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../../../lib/colors";

interface HealthyToothVisualProps {
  progress: number;
}

export const HealthyToothVisual: React.FC<HealthyToothVisualProps> = ({
  progress,
}) => {
  const frame = useCurrentFrame();

  // Phase 1: Tooth appears with gentle glow (0 - 0.3)
  const toothReveal = interpolate(progress, [0, 0.3], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 2: Green checkmark/shield + sparkle particles (0.3 - 0.6)
  const shieldAppear = interpolate(progress, [0.3, 0.55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const sparklePhase = interpolate(progress, [0.4, 0.6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 3: Full healthy glow, aura, floating health indicators (0.6 - 1.0)
  const healthyGlow = interpolate(progress, [0.6, 0.85], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const labelOpacity = interpolate(progress, [0.7, 0.9], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pulsing aura
  const auraPulse = 1 + Math.sin(frame * 0.04) * 0.08;
  const auraOpacity = healthyGlow * (0.15 + Math.sin(frame * 0.03) * 0.05);

  // Sparkle positions (distributed around the tooth)
  const sparkles = [
    { x: 110, y: 60, delay: 0, size: 5 },
    { x: 195, y: 75, delay: 0.8, size: 4 },
    { x: 85, y: 110, delay: 1.6, size: 3.5 },
    { x: 210, y: 120, delay: 2.4, size: 4.5 },
    { x: 130, y: 40, delay: 3.2, size: 3 },
    { x: 175, y: 45, delay: 0.4, size: 3.5 },
    { x: 95, y: 145, delay: 1.2, size: 3 },
    { x: 205, y: 148, delay: 2.0, size: 3.5 },
  ];

  return (
    <svg viewBox="0 0 300 400" overflow="visible" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Tooth gradients */}
        <linearGradient id="ht-enamelGrad" x1="0.15" y1="0" x2="0.85" y2="1">
          <stop offset="0%" stopColor="#f8f6ff" />
          <stop offset="35%" stopColor={COLORS.toothWhite} />
          <stop offset="70%" stopColor={COLORS.enamel} />
          <stop offset="100%" stopColor={COLORS.toothShadow} />
        </linearGradient>
        <linearGradient id="ht-dentinGrad" x1="0.3" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="#f9f0d8" />
          <stop offset="100%" stopColor={COLORS.dentin} />
        </linearGradient>
        <radialGradient id="ht-pulpGrad" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#e88090" />
          <stop offset="100%" stopColor={COLORS.pulp} />
        </radialGradient>
        <linearGradient id="ht-gumGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.gumHealthy} />
          <stop offset="100%" stopColor="#c8909a" />
        </linearGradient>
        <linearGradient id="ht-boneGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.bone} />
          <stop offset="100%" stopColor={COLORS.jawbone} />
        </linearGradient>
        <linearGradient id="ht-rootGrad" x1="0.3" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor={COLORS.root} />
          <stop offset="100%" stopColor="#d6c8a4" />
        </linearGradient>

        {/* Healthy glow aura */}
        <radialGradient id="ht-auraGrad" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor={COLORS.healthyGreen} stopOpacity={0.3} />
          <stop offset="40%" stopColor={COLORS.healthyTeal} stopOpacity={0.12} />
          <stop offset="100%" stopColor={COLORS.healthyGreen} stopOpacity={0} />
        </radialGradient>

        {/* Shield gradient */}
        <linearGradient id="ht-shieldGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.healthyGreen} stopOpacity={0.3} />
          <stop offset="50%" stopColor={COLORS.healthyTeal} stopOpacity={0.15} />
          <stop offset="100%" stopColor={COLORS.healthyGreen} stopOpacity={0.25} />
        </linearGradient>
        <linearGradient id="ht-shieldStroke" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.healthyGreen} />
          <stop offset="100%" stopColor={COLORS.healthyTeal} />
        </linearGradient>

        {/* Filters */}
        <filter id="ht-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.2" />
        </filter>
        <filter id="ht-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="ht-softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="ht-sparkle" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Reveal clip */}
        <clipPath id="ht-reveal">
          <rect
            x="0"
            y={interpolate(toothReveal, [0, 1], [400, 0])}
            width="300"
            height="400"
          />
        </clipPath>
      </defs>

      {/* Healthy aura (Phase 3) */}
      {healthyGlow > 0 && (
        <ellipse
          cx="150"
          cy="130"
          rx={100 * auraPulse}
          ry={120 * auraPulse}
          fill="url(#ht-auraGrad)"
          opacity={auraOpacity}
        />
      )}

      <g clipPath="url(#ht-reveal)">
        {/* Bone */}
        <rect
          x="40"
          y="175"
          width="220"
          height="210"
          rx="18"
          fill="url(#ht-boneGrad)"
          opacity={0.45}
        />

        {/* Healthy gum tissue */}
        <ellipse
          cx="150"
          cy="170"
          rx="115"
          ry="28"
          fill="url(#ht-gumGrad)"
          opacity={0.85}
        />

        {/* Tooth structure */}
        <g filter="url(#ht-shadow)">
          {/* Roots */}
          <path
            d="M115,168 L110,265 C107,300 114,340 126,358 C130,365 136,365 138,358 L148,290 L150,168 Z"
            fill="url(#ht-rootGrad)"
          />
          <path
            d="M150,168 L153,290 L163,358 C165,365 171,365 175,358 C187,340 194,300 191,265 L186,168 Z"
            fill="url(#ht-rootGrad)"
          />

          {/* Pulp canals */}
          <path
            d="M135,166 L132,265 C131,290 133,325 136,340 C137,345 139,345 140,340 L144,280 L146,166 Z"
            fill="url(#ht-pulpGrad)"
            opacity={0.7}
          />
          <path
            d="M154,166 L157,280 L161,340 C162,345 164,345 165,340 C168,325 169,290 168,265 L164,166 Z"
            fill="url(#ht-pulpGrad)"
            opacity={0.7}
          />

          {/* Enamel outer shell */}
          <path
            d="M85,150 C85,118 95,85 112,65 C126,50 142,42 150,42 C158,42 174,50 188,65 C205,85 215,118 215,150 L213,168 L87,168 Z"
            fill="url(#ht-enamelGrad)"
            stroke={COLORS.toothDark}
            strokeWidth={0.5}
          />

          {/* Dentin layer */}
          <path
            d="M95,148 C95,122 103,95 116,77 C128,63 142,55 150,55 C158,55 172,63 184,77 C197,95 205,122 205,148 L203,166 L97,166 Z"
            fill="url(#ht-dentinGrad)"
          />

          {/* Pulp chamber */}
          <path
            d="M132,108 C132,93 138,84 150,84 C162,84 168,93 168,108 L168,166 L132,166 Z"
            fill="url(#ht-pulpGrad)"
          />

          {/* Enamel highlights */}
          <ellipse cx="130" cy="80" rx="12" ry="20" fill="white" opacity={0.18} />
          <ellipse cx="168" cy="95" rx="7" ry="14" fill="white" opacity={0.08} />
          {/* Top surface sheen */}
          <path
            d="M120,55 Q135,48 150,50 Q165,48 180,55"
            fill="none"
            stroke="white"
            strokeWidth={0.6}
            opacity={0.2}
          />
        </g>

        {/* ===== GREEN SHIELD (Phase 2) ===== */}
        {shieldAppear > 0 && (
          <g
            opacity={shieldAppear}
            transform={`translate(150, 95) scale(${0.6 + shieldAppear * 0.4})`}
          >
            {/* Shield shape */}
            <path
              d="M0,-38 L-28,-22 L-28,8 C-28,28 -10,42 0,48 C10,42 28,28 28,8 L28,-22 Z"
              fill="url(#ht-shieldGrad)"
              stroke="url(#ht-shieldStroke)"
              strokeWidth={1.5}
              filter="url(#ht-glow)"
            />
            {/* Checkmark inside shield */}
            <path
              d="M-10,4 L-3,12 L12,-6"
              fill="none"
              stroke={COLORS.healthyGreen}
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={interpolate(shieldAppear, [0.4, 1], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })}
            />
          </g>
        )}

        {/* ===== SPARKLE PARTICLES (Phase 2 & 3) ===== */}
        {sparklePhase > 0 &&
          sparkles.map((sp, i) => {
            const cycle = ((frame * 0.04 + sp.delay) % 4) / 4;
            const sparkOpacity =
              sparklePhase *
              interpolate(
                cycle,
                [0, 0.15, 0.5, 1],
                [0, 0.9, 0.3, 0],
              );
            const yOffset = Math.sin(frame * 0.03 + sp.delay) * 6;
            const sparkSize = sp.size * (0.7 + cycle * 0.6);

            return (
              <g
                key={`sparkle-${i}`}
                transform={`translate(${sp.x}, ${sp.y + yOffset})`}
                opacity={sparkOpacity}
                filter="url(#ht-sparkle)"
              >
                {/* 4-pointed star */}
                <line
                  x1={-sparkSize}
                  y1="0"
                  x2={sparkSize}
                  y2="0"
                  stroke="white"
                  strokeWidth={1.2}
                />
                <line
                  x1="0"
                  y1={-sparkSize}
                  x2="0"
                  y2={sparkSize}
                  stroke="white"
                  strokeWidth={1.2}
                />
                {/* Diagonal arms (smaller) */}
                <line
                  x1={-sparkSize * 0.6}
                  y1={-sparkSize * 0.6}
                  x2={sparkSize * 0.6}
                  y2={sparkSize * 0.6}
                  stroke="white"
                  strokeWidth={0.7}
                />
                <line
                  x1={sparkSize * 0.6}
                  y1={-sparkSize * 0.6}
                  x2={-sparkSize * 0.6}
                  y2={sparkSize * 0.6}
                  stroke="white"
                  strokeWidth={0.7}
                />
              </g>
            );
          })}

        {/* ===== FLOATING HEALTH INDICATORS (Phase 3) ===== */}
        {healthyGlow > 0 && (
          <g opacity={healthyGlow * 0.7}>
            {/* Floating "100%" indicator */}
            <g
              transform={`translate(${62 + Math.sin(frame * 0.025) * 3}, ${80 + Math.cos(frame * 0.02) * 4})`}
            >
              <rect
                x="-18"
                y="-10"
                width="36"
                height="20"
                rx="10"
                fill={COLORS.healthyGreen}
                opacity={0.15}
              />
              <text
                x="0"
                y="4"
                fill={COLORS.healthyGreen}
                fontSize="9"
                fontFamily="Inter, sans-serif"
                fontWeight="600"
                textAnchor="middle"
              >
                100%
              </text>
            </g>

            {/* Floating heart */}
            <g
              transform={`translate(${235 + Math.sin(frame * 0.03 + 1) * 3}, ${95 + Math.cos(frame * 0.025 + 1) * 4})`}
            >
              <path
                d="M0,-4 C-2,-7 -6,-7 -6,-4 C-6,-1 0,4 0,6 C0,4 6,-1 6,-4 C6,-7 2,-7 0,-4 Z"
                fill={COLORS.healthyGreen}
                opacity={0.5}
              />
            </g>

            {/* Floating star */}
            <g
              transform={`translate(${70 + Math.sin(frame * 0.02 + 2) * 4}, ${150 + Math.cos(frame * 0.03 + 2) * 3})`}
            >
              <path
                d="M0,-5 L1.5,-1.5 L5,0 L1.5,1.5 L0,5 L-1.5,1.5 L-5,0 L-1.5,-1.5 Z"
                fill={COLORS.healthyTeal}
                opacity={0.45}
              />
            </g>
          </g>
        )}

        {/* ===== LABEL ===== */}
        <g opacity={labelOpacity}>
          <line
            x1="175"
            y1="100"
            x2="244"
            y2="78"
            stroke={COLORS.healthyGreen}
            strokeWidth={0.8}
          />
          <circle cx="175" cy="100" r="2" fill={COLORS.healthyGreen} opacity={0.6} />
          <text
            x="248"
            y="76"
            fill={COLORS.healthyGreen}
            fontSize="12"
            fontFamily="Inter, sans-serif"
            fontWeight="600"
          >
            Healthy &amp; Protected
          </text>
          <text
            x="248"
            y="91"
            fill={COLORS.textMuted}
            fontSize="9"
            fontFamily="Inter, sans-serif"
          >
            Strong enamel, healthy pulp
          </text>
          <text
            x="248"
            y="104"
            fill={COLORS.textMuted}
            fontSize="9"
            fontFamily="Inter, sans-serif"
          >
            No signs of decay or damage
          </text>
        </g>
      </g>
    </svg>
  );
};
