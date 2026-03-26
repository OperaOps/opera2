import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../../../lib/colors";

interface AlignedTeethVisualProps {
  progress: number;
}

export const AlignedTeethVisual: React.FC<AlignedTeethVisualProps> = ({
  progress,
}) => {
  const frame = useCurrentFrame();

  // Phase 1: Slightly crooked teeth appear (0 - 0.3)
  const teethReveal = interpolate(progress, [0, 0.25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 2: Teeth shift into alignment (0.3 - 0.7)
  const alignProgress = interpolate(progress, [0.3, 0.7], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 3: Perfect alignment, bright smile, sparkles (0.7 - 1.0)
  const celebrationPhase = interpolate(progress, [0.7, 0.9], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const labelOpacity = interpolate(progress, [0.75, 0.92], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 8 front teeth: crooked offsets (x, y, rotation) that interpolate to 0
  const teethData = [
    { id: 0, cx: 65, w: 22, h: 55, crookX: -3, crookY: 4, crookR: -6 },
    { id: 1, cx: 88, w: 23, h: 58, crookX: 2, crookY: -3, crookR: 4 },
    { id: 2, cx: 112, w: 26, h: 62, crookX: -4, crookY: 2, crookR: -8 },
    { id: 3, cx: 138, w: 28, h: 65, crookX: 3, crookY: -2, crookR: 5 },
    { id: 4, cx: 163, w: 28, h: 65, crookX: -2, crookY: -3, crookR: -4 },
    { id: 5, cx: 188, w: 26, h: 62, crookX: 4, crookY: 3, crookR: 7 },
    { id: 6, cx: 212, w: 23, h: 58, crookX: -3, crookY: -2, crookR: -5 },
    { id: 7, cx: 235, w: 22, h: 55, crookX: 2, crookY: 4, crookR: 6 },
  ];

  // Arch curve: teeth follow a gentle arc
  const archCenterY = 160;
  const archRadius = 130;

  // Sparkle data
  const sparkles = [
    { x: 100, y: 115, delay: 0, size: 5 },
    { x: 200, y: 110, delay: 0.6, size: 4 },
    { x: 150, y: 100, delay: 1.2, size: 5.5 },
    { x: 70, y: 130, delay: 1.8, size: 3.5 },
    { x: 230, y: 125, delay: 2.4, size: 4 },
    { x: 130, y: 90, delay: 0.3, size: 3 },
    { x: 175, y: 95, delay: 0.9, size: 4.5 },
    { x: 115, y: 140, delay: 1.5, size: 3 },
    { x: 185, y: 138, delay: 2.1, size: 3.5 },
  ];

  return (
    <svg viewBox="0 0 300 400" overflow="visible" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Tooth gradient */}
        <linearGradient id="at-toothGrad" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#f8f6ff" />
          <stop offset="40%" stopColor={COLORS.toothWhite} />
          <stop offset="100%" stopColor={COLORS.toothShadow} />
        </linearGradient>
        {/* Brighter tooth for celebration */}
        <linearGradient id="at-toothBright" x1="0.15" y1="0" x2="0.85" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="30%" stopColor="#f8f6ff" />
          <stop offset="70%" stopColor={COLORS.toothWhite} />
          <stop offset="100%" stopColor={COLORS.enamel} />
        </linearGradient>
        {/* Gum gradient */}
        <linearGradient id="at-gumGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.gumHealthy} />
          <stop offset="100%" stopColor={COLORS.gumPink} />
        </linearGradient>
        {/* Healthy glow aura */}
        <radialGradient id="at-auraGrad" cx="50%" cy="45%" r="50%">
          <stop offset="0%" stopColor={COLORS.healthyGreen} stopOpacity={0.15} />
          <stop offset="50%" stopColor={COLORS.healthyTeal} stopOpacity={0.06} />
          <stop offset="100%" stopColor={COLORS.healthyGreen} stopOpacity={0} />
        </radialGradient>
        {/* Smile glow */}
        <radialGradient id="at-smileGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="white" stopOpacity={0.12} />
          <stop offset="100%" stopColor="white" stopOpacity={0} />
        </radialGradient>

        {/* Filters */}
        <filter id="at-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0.5" dy="1.5" stdDeviation="1.5" floodColor="#000" floodOpacity="0.2" />
        </filter>
        <filter id="at-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="at-sparkleGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Reveal clip */}
        <clipPath id="at-reveal">
          <rect
            x="0"
            y={interpolate(teethReveal, [0, 1], [400, 0])}
            width="300"
            height="400"
          />
        </clipPath>
      </defs>

      {/* Background aura (Phase 3) */}
      {celebrationPhase > 0 && (
        <ellipse
          cx="150"
          cy="170"
          rx={140 * (1 + Math.sin(frame * 0.03) * 0.05)}
          ry={90 * (1 + Math.sin(frame * 0.03) * 0.05)}
          fill="url(#at-auraGrad)"
          opacity={celebrationPhase * 0.6}
        />
      )}

      <g clipPath="url(#at-reveal)">
        {/* Gum arch - upper gumline */}
        <path
          d="M30,195 Q60,165 100,155 Q150,148 200,155 Q240,165 270,195 L270,250 Q150,235 30,250 Z"
          fill="url(#at-gumGrad)"
          opacity={0.85}
        />

        {/* Gum scallops between teeth */}
        {teethData.map((tooth, i) => {
          if (i >= teethData.length - 1) return null;
          const midX = (tooth.cx + teethData[i + 1].cx) / 2;
          const offsetX = interpolate(alignProgress, [0, 1], [tooth.crookX * 0.3, 0]);
          return (
            <ellipse
              key={`gum-scallop-${i}`}
              cx={midX + offsetX}
              cy={155}
              rx={5}
              ry={8}
              fill={COLORS.gumHealthy}
              opacity={0.6}
            />
          );
        })}

        {/* Teeth */}
        <g filter="url(#at-shadow)">
          {teethData.map((tooth) => {
            // Interpolate from crooked to aligned
            const dx = interpolate(alignProgress, [0, 1], [tooth.crookX, 0]);
            const dy = interpolate(alignProgress, [0, 1], [tooth.crookY, 0]);
            const dr = interpolate(alignProgress, [0, 1], [tooth.crookR, 0]);

            // Arch position: slight y offset based on position from center
            const distFromCenter = Math.abs(tooth.cx - 150);
            const archY = (distFromCenter * distFromCenter) / (archRadius * 2);

            // Use brighter gradient when celebration is active
            const gradientId =
              celebrationPhase > 0.5 ? "at-toothBright" : "at-toothGrad";

            const halfW = tooth.w / 2;
            const x = tooth.cx + dx;
            const y = archCenterY + archY + dy;
            const topRound = 6;
            const bottomRound = 3;

            return (
              <g
                key={`tooth-${tooth.id}`}
                transform={`translate(${x}, ${y}) rotate(${dr})`}
              >
                {/* Tooth body - rounded rectangle shape */}
                <path
                  d={`M${-halfW + topRound},${-tooth.h / 2}
                      Q${-halfW},${-tooth.h / 2} ${-halfW},${-tooth.h / 2 + topRound}
                      L${-halfW},${tooth.h / 2 - bottomRound}
                      Q${-halfW},${tooth.h / 2} ${-halfW + bottomRound},${tooth.h / 2}
                      L${halfW - bottomRound},${tooth.h / 2}
                      Q${halfW},${tooth.h / 2} ${halfW},${tooth.h / 2 - bottomRound}
                      L${halfW},${-tooth.h / 2 + topRound}
                      Q${halfW},${-tooth.h / 2} ${halfW - topRound},${-tooth.h / 2}
                      Z`}
                  fill={`url(#${gradientId})`}
                  stroke={COLORS.toothDark}
                  strokeWidth={0.4}
                />

                {/* Incisal edge highlight */}
                <rect
                  x={-halfW + 3}
                  y={-tooth.h / 2 + 1}
                  width={tooth.w - 6}
                  height={4}
                  rx={2}
                  fill="white"
                  opacity={0.15 + celebrationPhase * 0.1}
                />

                {/* Center line (subtle anatomy) */}
                <line
                  x1={0}
                  y1={-tooth.h / 2 + 8}
                  x2={0}
                  y2={tooth.h / 2 - 5}
                  stroke={COLORS.toothDark}
                  strokeWidth={0.2}
                  opacity={0.15}
                />

                {/* Surface sheen */}
                <ellipse
                  cx={-halfW * 0.25}
                  cy={-tooth.h * 0.1}
                  rx={halfW * 0.4}
                  ry={tooth.h * 0.3}
                  fill="white"
                  opacity={0.08 + celebrationPhase * 0.06}
                />
              </g>
            );
          })}
        </g>

        {/* Smile glow arc (Phase 3) */}
        {celebrationPhase > 0 && (
          <ellipse
            cx="150"
            cy="165"
            rx="110"
            ry="40"
            fill="url(#at-smileGlow)"
            opacity={celebrationPhase * 0.6}
          />
        )}

        {/* ===== SPARKLES (Phase 3) ===== */}
        {celebrationPhase > 0 &&
          sparkles.map((sp, i) => {
            const cycle = ((frame * 0.05 + sp.delay) % 3.5) / 3.5;
            const sparkOpacity =
              celebrationPhase *
              interpolate(cycle, [0, 0.15, 0.5, 1], [0, 0.85, 0.25, 0]);
            const yFloat = Math.sin(frame * 0.03 + sp.delay) * 5;
            const sparkSize = sp.size * (0.6 + cycle * 0.7);

            return (
              <g
                key={`sparkle-${i}`}
                transform={`translate(${sp.x}, ${sp.y + yFloat})`}
                opacity={sparkOpacity}
                filter="url(#at-sparkleGlow)"
              >
                {/* 4-pointed star */}
                <line
                  x1={-sparkSize}
                  y1="0"
                  x2={sparkSize}
                  y2="0"
                  stroke="white"
                  strokeWidth={1.3}
                />
                <line
                  x1="0"
                  y1={-sparkSize}
                  x2="0"
                  y2={sparkSize}
                  stroke="white"
                  strokeWidth={1.3}
                />
                <line
                  x1={-sparkSize * 0.55}
                  y1={-sparkSize * 0.55}
                  x2={sparkSize * 0.55}
                  y2={sparkSize * 0.55}
                  stroke="white"
                  strokeWidth={0.8}
                />
                <line
                  x1={sparkSize * 0.55}
                  y1={-sparkSize * 0.55}
                  x2={-sparkSize * 0.55}
                  y2={sparkSize * 0.55}
                  stroke="white"
                  strokeWidth={0.8}
                />
              </g>
            );
          })}

        {/* Alignment guide lines (Phase 2, fade out) */}
        {alignProgress > 0.05 && alignProgress < 0.95 && (
          <g opacity={0.2 * (1 - alignProgress)}>
            {/* Horizontal alignment reference */}
            <line
              x1="55"
              y1="160"
              x2="245"
              y2="160"
              stroke={COLORS.healthyTeal}
              strokeWidth={0.5}
              strokeDasharray="4,4"
            />
            {/* Vertical center */}
            <line
              x1="150"
              y1="120"
              x2="150"
              y2="210"
              stroke={COLORS.healthyTeal}
              strokeWidth={0.4}
              strokeDasharray="3,5"
            />
          </g>
        )}

        {/* ===== LABEL ===== */}
        <g opacity={labelOpacity}>
          <line
            x1="210"
            y1="130"
            x2="255"
            y2="110"
            stroke={COLORS.healthyGreen}
            strokeWidth={0.8}
          />
          <circle cx="210" cy="130" r="2" fill={COLORS.healthyGreen} opacity={0.6} />
          <text
            x="258"
            y="108"
            fill={COLORS.healthyGreen}
            fontSize="12"
            fontFamily="Inter, sans-serif"
            fontWeight="600"
          >
            Perfectly Aligned
          </text>
          <text
            x="258"
            y="123"
            fill={COLORS.textMuted}
            fontSize="9"
            fontFamily="Inter, sans-serif"
          >
            Ideal arch form achieved
          </text>
          <text
            x="258"
            y="136"
            fill={COLORS.textMuted}
            fontSize="9"
            fontFamily="Inter, sans-serif"
          >
            Balanced bite &amp; spacing
          </text>
        </g>
      </g>
    </svg>
  );
};
