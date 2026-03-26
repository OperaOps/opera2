import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../../../lib/colors";

interface BrightSmileVisualProps {
  progress: number;
}

export const BrightSmileVisual: React.FC<BrightSmileVisualProps> = ({
  progress,
}) => {
  const frame = useCurrentFrame();

  // Phase 1: Teeth with slight discoloration (0 - 0.3)
  const teethReveal = interpolate(progress, [0, 0.25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 2: Whitening wave effect (0.3 - 0.7)
  const whiteningProgress = interpolate(progress, [0.3, 0.7], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 3: Brilliant white, starburst, floating sparkles (0.7 - 1.0)
  const brilliantPhase = interpolate(progress, [0.7, 0.92], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const labelOpacity = interpolate(progress, [0.78, 0.95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 10 teeth in a wider smile arch
  const teethData = [
    { id: 0, cx: 48, w: 18, h: 46 },
    { id: 1, cx: 68, w: 20, h: 50 },
    { id: 2, cx: 90, w: 22, h: 56 },
    { id: 3, cx: 114, w: 25, h: 60 },
    { id: 4, cx: 138, w: 27, h: 63 },
    { id: 5, cx: 163, w: 27, h: 63 },
    { id: 6, cx: 187, w: 25, h: 60 },
    { id: 7, cx: 210, w: 22, h: 56 },
    { id: 8, cx: 232, w: 20, h: 50 },
    { id: 9, cx: 252, w: 18, h: 46 },
  ];

  const archCenterY = 165;
  const archRadius = 160;

  // Whitening wave sweeps left-to-right
  const wavePosition = interpolate(whiteningProgress, [0, 1], [-0.2, 1.2]);

  // Sparkle/starburst data
  const sparkles = [
    { x: 90, y: 120, delay: 0, size: 6 },
    { x: 210, y: 118, delay: 0.5, size: 5.5 },
    { x: 150, y: 105, delay: 1.0, size: 7 },
    { x: 60, y: 140, delay: 1.5, size: 4 },
    { x: 245, y: 135, delay: 2.0, size: 4.5 },
    { x: 120, y: 95, delay: 0.3, size: 4 },
    { x: 180, y: 98, delay: 0.8, size: 5 },
    { x: 75, y: 155, delay: 1.3, size: 3.5 },
    { x: 225, y: 150, delay: 1.8, size: 3.5 },
    { x: 150, y: 140, delay: 2.3, size: 4 },
    { x: 105, y: 108, delay: 0.7, size: 3 },
    { x: 195, y: 110, delay: 1.1, size: 3 },
  ];

  return (
    <svg viewBox="0 0 300 400" overflow="visible" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Discolored tooth */}
        <linearGradient id="bs-toothDull" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#e8e0d0" />
          <stop offset="40%" stopColor="#ddd5c4" />
          <stop offset="100%" stopColor="#ccc4b0" />
        </linearGradient>
        {/* Bright white tooth */}
        <linearGradient id="bs-toothBright" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="25%" stopColor="#faf8ff" />
          <stop offset="60%" stopColor={COLORS.toothWhite} />
          <stop offset="100%" stopColor="#e8e4f0" />
        </linearGradient>
        {/* Brilliant white (Phase 3) */}
        <linearGradient id="bs-toothBrilliant" x1="0.05" y1="0" x2="0.95" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="20%" stopColor="#fefeff" />
          <stop offset="50%" stopColor="#f8f6ff" />
          <stop offset="80%" stopColor={COLORS.toothWhite} />
          <stop offset="100%" stopColor="#ece8f4" />
        </linearGradient>
        {/* Gum gradient */}
        <linearGradient id="bs-gumGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.gumHealthy} />
          <stop offset="100%" stopColor={COLORS.gumPink} />
        </linearGradient>
        {/* Whitening wave gradient */}
        <linearGradient id="bs-waveGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="white" stopOpacity={0} />
          <stop offset="30%" stopColor="white" stopOpacity={0.4} />
          <stop offset="50%" stopColor="white" stopOpacity={0.7} />
          <stop offset="70%" stopColor="white" stopOpacity={0.4} />
          <stop offset="100%" stopColor="white" stopOpacity={0} />
        </linearGradient>
        {/* Starburst center glow */}
        <radialGradient id="bs-starburstGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="white" stopOpacity={0.25} />
          <stop offset="30%" stopColor="white" stopOpacity={0.1} />
          <stop offset="100%" stopColor="white" stopOpacity={0} />
        </radialGradient>
        {/* Smile glow */}
        <radialGradient id="bs-smileGlow" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="white" stopOpacity={0.2} />
          <stop offset="40%" stopColor="white" stopOpacity={0.08} />
          <stop offset="100%" stopColor="white" stopOpacity={0} />
        </radialGradient>

        {/* Filters */}
        <filter id="bs-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0.5" dy="1.5" stdDeviation="1.5" floodColor="#000" floodOpacity="0.18" />
        </filter>
        <filter id="bs-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="bs-brightGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="bs-sparkleFilter" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Whitening wave clip region (only over teeth area) */}
        <clipPath id="bs-teethRegion">
          <rect x="30" y="100" width="240" height="130" />
        </clipPath>

        {/* Reveal clip */}
        <clipPath id="bs-reveal">
          <rect
            x="0"
            y={interpolate(teethReveal, [0, 1], [400, 0])}
            width="300"
            height="400"
          />
        </clipPath>
      </defs>

      {/* Background smile glow (Phase 3) */}
      {brilliantPhase > 0 && (
        <ellipse
          cx="150"
          cy="155"
          rx={150 * (1 + Math.sin(frame * 0.025) * 0.04)}
          ry={85 * (1 + Math.sin(frame * 0.025) * 0.04)}
          fill="url(#bs-smileGlow)"
          opacity={brilliantPhase * 0.7}
        />
      )}

      <g clipPath="url(#bs-reveal)">
        {/* Upper gum arch */}
        <path
          d="M20,200 Q45,170 80,158 Q110,150 150,147 Q190,150 220,158 Q255,170 280,200 L280,260 Q150,245 20,260 Z"
          fill="url(#bs-gumGrad)"
          opacity={0.85}
        />

        {/* Gum scallops */}
        {teethData.slice(0, -1).map((tooth, i) => {
          const nextTooth = teethData[i + 1];
          const midX = (tooth.cx + nextTooth.cx) / 2;
          return (
            <ellipse
              key={`gum-${i}`}
              cx={midX}
              cy={152}
              rx={4}
              ry={7}
              fill={COLORS.gumHealthy}
              opacity={0.55}
            />
          );
        })}

        {/* Teeth */}
        <g filter="url(#bs-shadow)">
          {teethData.map((tooth) => {
            const distFromCenter = Math.abs(tooth.cx - 150);
            const archY =
              (distFromCenter * distFromCenter) / (archRadius * 2.5);

            // Determine whitening state for this tooth based on wave position
            const toothNorm = (tooth.cx - 30) / 240; // 0 to 1 across mouth
            const whiteAmount = interpolate(
              wavePosition,
              [toothNorm - 0.25, toothNorm + 0.05],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            // Pick gradient based on whitening state
            let gradientId: string;
            if (brilliantPhase > 0.5) {
              gradientId = "bs-toothBrilliant";
            } else if (whiteAmount > 0.8) {
              gradientId = "bs-toothBright";
            } else {
              gradientId = "bs-toothDull";
            }

            // Slight brightness boost as whitening passes
            const extraWhite =
              whiteAmount > 0 && whiteAmount < 1 ? whiteAmount * 0.15 : 0;

            const halfW = tooth.w / 2;
            const x = tooth.cx;
            const y = archCenterY + archY;
            const topR = 5;
            const botR = 2.5;

            return (
              <g key={`tooth-${tooth.id}`} transform={`translate(${x}, ${y})`}>
                {/* Tooth body */}
                <path
                  d={`M${-halfW + topR},${-tooth.h / 2}
                      Q${-halfW},${-tooth.h / 2} ${-halfW},${-tooth.h / 2 + topR}
                      L${-halfW},${tooth.h / 2 - botR}
                      Q${-halfW},${tooth.h / 2} ${-halfW + botR},${tooth.h / 2}
                      L${halfW - botR},${tooth.h / 2}
                      Q${halfW},${tooth.h / 2} ${halfW},${tooth.h / 2 - botR}
                      L${halfW},${-tooth.h / 2 + topR}
                      Q${halfW},${-tooth.h / 2} ${halfW - topR},${-tooth.h / 2}
                      Z`}
                  fill={`url(#${gradientId})`}
                  stroke={COLORS.toothDark}
                  strokeWidth={0.35}
                />

                {/* Whitening flash overlay */}
                {extraWhite > 0 && (
                  <rect
                    x={-halfW + 1}
                    y={-tooth.h / 2 + 1}
                    width={tooth.w - 2}
                    height={tooth.h - 2}
                    rx={topR}
                    fill="white"
                    opacity={extraWhite}
                  />
                )}

                {/* Incisal edge highlight */}
                <rect
                  x={-halfW + 2}
                  y={-tooth.h / 2 + 1}
                  width={tooth.w - 4}
                  height={3.5}
                  rx={1.5}
                  fill="white"
                  opacity={0.12 + brilliantPhase * 0.15}
                />

                {/* Surface reflection */}
                <ellipse
                  cx={-halfW * 0.2}
                  cy={-tooth.h * 0.08}
                  rx={halfW * 0.35}
                  ry={tooth.h * 0.25}
                  fill="white"
                  opacity={0.06 + brilliantPhase * 0.1}
                />

                {/* Subtle vertical line */}
                <line
                  x1={0}
                  y1={-tooth.h / 2 + 6}
                  x2={0}
                  y2={tooth.h / 2 - 4}
                  stroke={COLORS.toothDark}
                  strokeWidth={0.15}
                  opacity={0.12}
                />
              </g>
            );
          })}
        </g>

        {/* ===== WHITENING WAVE (Phase 2) ===== */}
        {whiteningProgress > 0 && whiteningProgress < 1 && (
          <g clipPath="url(#bs-teethRegion)">
            <rect
              x={interpolate(wavePosition, [0, 1], [-60, 300])}
              y="100"
              width="60"
              height="130"
              fill="url(#bs-waveGrad)"
              opacity={0.6}
            />
            {/* Secondary trailing glow */}
            <rect
              x={interpolate(wavePosition, [0, 1], [-90, 270])}
              y="105"
              width="40"
              height="120"
              fill="url(#bs-waveGrad)"
              opacity={0.25}
            />
          </g>
        )}

        {/* ===== STARBURST (Phase 3) ===== */}
        {brilliantPhase > 0 && (
          <g opacity={brilliantPhase}>
            {/* Central starburst */}
            <ellipse
              cx="150"
              cy="150"
              rx={80 + Math.sin(frame * 0.03) * 5}
              ry={50 + Math.sin(frame * 0.03) * 3}
              fill="url(#bs-starburstGrad)"
              filter="url(#bs-brightGlow)"
            />

            {/* Radiating light rays */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30 * Math.PI) / 180;
              const innerR = 35;
              const outerR =
                65 + Math.sin(frame * 0.04 + i * 0.5) * 8;
              const rayOpacity =
                0.08 + Math.sin(frame * 0.035 + i * 0.8) * 0.04;
              return (
                <line
                  key={`ray-${i}`}
                  x1={150 + Math.cos(angle) * innerR}
                  y1={150 + Math.sin(angle) * innerR * 0.6}
                  x2={150 + Math.cos(angle) * outerR}
                  y2={150 + Math.sin(angle) * outerR * 0.6}
                  stroke="white"
                  strokeWidth={1.5}
                  opacity={rayOpacity * brilliantPhase}
                  strokeLinecap="round"
                />
              );
            })}
          </g>
        )}

        {/* ===== SPARKLES (Phase 2 late + Phase 3) ===== */}
        {(whiteningProgress > 0.5 || brilliantPhase > 0) &&
          sparkles.map((sp, i) => {
            const baseOpacity = brilliantPhase > 0 ? brilliantPhase : (whiteningProgress - 0.5) * 2;
            const cycle = ((frame * 0.045 + sp.delay) % 3) / 3;
            const sparkOpacity =
              baseOpacity *
              interpolate(cycle, [0, 0.12, 0.45, 1], [0, 0.9, 0.2, 0]);
            const yFloat = Math.sin(frame * 0.03 + sp.delay) * 4;
            const sparkSize = sp.size * (0.5 + cycle * 0.8);

            return (
              <g
                key={`sparkle-${i}`}
                transform={`translate(${sp.x}, ${sp.y + yFloat})`}
                opacity={sparkOpacity}
                filter="url(#bs-sparkleFilter)"
              >
                {/* 4-pointed star sparkle */}
                <line
                  x1={-sparkSize}
                  y1="0"
                  x2={sparkSize}
                  y2="0"
                  stroke="white"
                  strokeWidth={1.4}
                />
                <line
                  x1="0"
                  y1={-sparkSize}
                  x2="0"
                  y2={sparkSize}
                  stroke="white"
                  strokeWidth={1.4}
                />
                {/* Diagonal arms */}
                <line
                  x1={-sparkSize * 0.5}
                  y1={-sparkSize * 0.5}
                  x2={sparkSize * 0.5}
                  y2={sparkSize * 0.5}
                  stroke="white"
                  strokeWidth={0.8}
                />
                <line
                  x1={sparkSize * 0.5}
                  y1={-sparkSize * 0.5}
                  x2={-sparkSize * 0.5}
                  y2={sparkSize * 0.5}
                  stroke="white"
                  strokeWidth={0.8}
                />
                {/* Center dot */}
                <circle
                  cx="0"
                  cy="0"
                  r={sparkSize * 0.15}
                  fill="white"
                  opacity={0.9}
                />
              </g>
            );
          })}

        {/* ===== LABEL ===== */}
        <g opacity={labelOpacity}>
          <line
            x1="210"
            y1="125"
            x2="258"
            y2="100"
            stroke="white"
            strokeWidth={0.8}
            opacity={0.7}
          />
          <circle cx="210" cy="125" r="2" fill="white" opacity={0.6} />
          <text
            x="262"
            y="98"
            fill="white"
            fontSize="12"
            fontFamily="Inter, sans-serif"
            fontWeight="600"
          >
            Brilliant Smile
          </text>
          <text
            x="262"
            y="113"
            fill={COLORS.textSecondary}
            fontSize="9"
            fontFamily="Inter, sans-serif"
          >
            Professional whitening result
          </text>
          <text
            x="262"
            y="126"
            fill={COLORS.textMuted}
            fontSize="9"
            fontFamily="Inter, sans-serif"
          >
            Bright, confident, radiant
          </text>
        </g>
      </g>
    </svg>
  );
};
