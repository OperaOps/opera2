import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../../../lib/colors";

interface WhiteningVisualProps {
  progress: number;
}

const TOOTH_POSITIONS = [
  { x: 80, w: 26 },
  { x: 120, w: 30 },
  { x: 162, w: 28 },
  { x: 200, w: 32 },
  { x: 240, w: 32 },
  { x: 280, w: 32 },
  { x: 320, w: 30 },
  { x: 358, w: 28 },
  { x: 396, w: 26 },
];

export const WhiteningVisual: React.FC<WhiteningVisualProps> = ({
  progress,
}) => {
  const frame = useCurrentFrame();

  const teethReveal = interpolate(progress, [0, 0.12], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Phase 1: Stained teeth (0 - 0.3)
  // Phase 2: Whitening gel + light (0.3 - 0.6)
  const gelApplication = interpolate(progress, [0.28, 0.4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const lightActive = interpolate(progress, [0.38, 0.58], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 3: Color transition (0.15 - 0.7)
  const whiteningProgress = interpolate(progress, [0.15, 0.7], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Sparkle effect at the end
  const sparkleOpacity = interpolate(progress, [0.65, 0.85], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Stain spots fade out
  const stainOpacity = interpolate(whiteningProgress, [0, 0.6], [0.4, 0], {
    extrapolateRight: "clamp",
  });

  // Light pulsing
  const lightPulse = lightActive > 0 && lightActive < 1
    ? 0.5 + Math.sin(frame * 0.1) * 0.3
    : 0;

  // Progress bar
  const progressBarFill = interpolate(progress, [0.3, 0.9], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <svg viewBox="0 0 500 400" overflow="visible" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="whGumGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c07080" />
          <stop offset="50%" stopColor={COLORS.gumPink} />
          <stop offset="100%" stopColor="#d4909c" />
        </linearGradient>
        <linearGradient id="whGelGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(120, 180, 255, 0.3)" />
          <stop offset="100%" stopColor="rgba(100, 160, 240, 0.12)" />
        </linearGradient>
        <radialGradient id="whLightGrad" cx="50%" cy="0%" r="80%">
          <stop offset="0%" stopColor="rgba(120, 160, 255, 0.5)" />
          <stop offset="40%" stopColor="rgba(100, 140, 240, 0.2)" />
          <stop offset="100%" stopColor="rgba(80, 120, 220, 0)" />
        </radialGradient>
        <filter id="whShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0.5" dy="1" stdDeviation="1" floodColor="#000" floodOpacity="0.2" />
        </filter>
        <filter id="whSparkle" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="whGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Gum tissue */}
      <g opacity={teethReveal}>
        <path
          d="M30,160 Q55,130 120,118 Q200,105 250,102 Q300,105 380,118 Q445,130 470,160
             L470,90 Q445,78 250,68 Q55,78 30,90 Z"
          fill="url(#whGumGrad)"
        />
      </g>

      {/* Whitening glow behind teeth */}
      {whiteningProgress > 0.3 && (
        <ellipse
          cx="240"
          cy="200"
          rx={180}
          ry={60}
          fill="white"
          opacity={whiteningProgress * 0.08}
          filter="url(#whGlow)"
        />
      )}

      {/* UV/LED Light effect */}
      {lightPulse > 0 && (
        <g opacity={lightPulse}>
          {/* Light source device */}
          <rect x="200" y="50" width="100" height="18" rx="5" fill="#404858" stroke="#555" strokeWidth={0.5} />
          <rect x="215" y="66" width="70" height="6" rx="2" fill={COLORS.infoBlue} opacity={0.7} />

          {/* Light beam */}
          <path
            d="M215,72 L160,145 L340,145 L285,72 Z"
            fill="url(#whLightGrad)"
            opacity={0.35 + Math.sin(frame * 0.1) * 0.12}
          />

          {/* Light rays */}
          {[225, 240, 255, 270].map((x, i) => (
            <line
              key={`ray-${i}`}
              x1={x}
              y1="72"
              x2={x + (x < 250 ? -20 : 20)}
              y2="145"
              stroke={COLORS.infoBlue}
              strokeWidth={0.5}
              opacity={0.15 + Math.sin(frame * 0.08 + i * 0.5) * 0.08}
            />
          ))}
        </g>
      )}

      {/* Teeth */}
      {TOOTH_POSITIONS.map((tooth, i) => {
        const stagger = i * 0.01;
        const appear = interpolate(
          teethReveal,
          [stagger, stagger + 0.1],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        const ySlide = interpolate(appear, [0, 1], [20, 0]);
        const opacity = interpolate(appear, [0, 0.5, 1], [0, 0.8, 1]);

        // Each tooth whitens with a slight stagger from center outward
        const toothWhitenDelay = Math.abs(i - 4) * 0.04;
        const localWhiten = interpolate(
          whiteningProgress,
          [toothWhitenDelay, toothWhitenDelay + 0.5],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        const localR = Math.round(interpolate(localWhiten, [0, 1], [0xe0, 0xf0]));
        const localG = Math.round(interpolate(localWhiten, [0, 1], [0xcc, 0xee]));
        const localB = Math.round(interpolate(localWhiten, [0, 1], [0x90, 0xf5]));
        const localColor = `rgb(${localR}, ${localG}, ${localB})`;

        const localR2 = Math.round(interpolate(localWhiten, [0, 1], [0xd0, 0xe8]));
        const localG2 = Math.round(interpolate(localWhiten, [0, 1], [0xb8, 0xe4]));
        const localB2 = Math.round(interpolate(localWhiten, [0, 1], [0x78, 0xf0]));
        const localShadow = `rgb(${localR2}, ${localG2}, ${localB2})`;

        const h = 55;

        return (
          <g
            key={i}
            transform={`translate(0, ${ySlide})`}
            opacity={opacity}
            filter="url(#whShadow)"
          >
            {/* Tooth body */}
            <rect
              x={tooth.x - tooth.w / 2}
              y={148}
              width={tooth.w}
              height={h}
              rx={5}
              fill={localColor}
              stroke={localShadow}
              strokeWidth={0.5}
            />

            {/* Tooth gradient overlay for depth */}
            <rect
              x={tooth.x - tooth.w / 2 + 3}
              y={152}
              width={tooth.w - 6}
              height={h - 8}
              rx={3}
              fill="white"
              opacity={localWhiten * 0.1}
            />

            {/* Shine streak */}
            <rect
              x={tooth.x - tooth.w / 2 + 4}
              y={152}
              width={5}
              height={h - 12}
              rx={2.5}
              fill="white"
              opacity={0.08 + localWhiten * 0.1}
            />

            {/* Stain spots (fade out) */}
            {stainOpacity > 0 && (
              <>
                <ellipse
                  cx={tooth.x - 2 + (i % 3) * 3}
                  cy={170 + (i % 2) * 10}
                  rx={3}
                  ry={2}
                  fill="#b09040"
                  opacity={stainOpacity * (1 - localWhiten)}
                />
                {i % 2 === 0 && (
                  <ellipse
                    cx={tooth.x + 4}
                    cy={185}
                    rx={2}
                    ry={2.5}
                    fill="#a88838"
                    opacity={stainOpacity * 0.6 * (1 - localWhiten)}
                  />
                )}
              </>
            )}

            {/* Whitening gel overlay on each tooth */}
            {gelApplication > 0 && lightActive < 1 && (
              <rect
                x={tooth.x - tooth.w / 2 + 1}
                y={149}
                width={tooth.w - 2}
                height={h - 2}
                rx={4}
                fill="url(#whGelGrad)"
                opacity={gelApplication * (1 - interpolate(progress, [0.7, 0.85], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }))}
              />
            )}
          </g>
        );
      })}

      {/* Sparkle effects */}
      {sparkleOpacity > 0 && (
        <g opacity={sparkleOpacity} filter="url(#whSparkle)">
          {[
            { x: 160, y: 160, size: 6 },
            { x: 240, y: 155, size: 8 },
            { x: 310, y: 162, size: 5 },
            { x: 200, y: 190, size: 4 },
            { x: 280, y: 185, size: 5 },
            { x: 130, y: 175, size: 3 },
            { x: 350, y: 170, size: 4 },
            { x: 185, y: 150, size: 3 },
            { x: 110, y: 168, size: 3 },
            { x: 380, y: 165, size: 3 },
          ].map((spark, i) => {
            const sOpacity =
              0.4 + Math.sin(frame * 0.06 + i * 1.3) * 0.4;
            const sScale =
              0.7 + Math.sin(frame * 0.08 + i * 0.9) * 0.3;
            return (
              <g
                key={`spark-${i}`}
                transform={`translate(${spark.x}, ${spark.y}) scale(${sScale})`}
                opacity={sOpacity}
              >
                <line
                  x1={-spark.size}
                  y1={0}
                  x2={spark.size}
                  y2={0}
                  stroke="white"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                />
                <line
                  x1={0}
                  y1={-spark.size}
                  x2={0}
                  y2={spark.size}
                  stroke="white"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                />
                {spark.size > 4 && (
                  <>
                    <line
                      x1={-spark.size * 0.5}
                      y1={-spark.size * 0.5}
                      x2={spark.size * 0.5}
                      y2={spark.size * 0.5}
                      stroke="white"
                      strokeWidth={0.8}
                      strokeLinecap="round"
                    />
                    <line
                      x1={spark.size * 0.5}
                      y1={-spark.size * 0.5}
                      x2={-spark.size * 0.5}
                      y2={spark.size * 0.5}
                      stroke="white"
                      strokeWidth={0.8}
                      strokeLinecap="round"
                    />
                  </>
                )}
              </g>
            );
          })}
        </g>
      )}

      {/* Whitening progress bar */}
      {progressBarFill > 0 && (
        <g opacity={0.6}>
          <rect x="120" y="260" width="260" height="6" rx="3" fill="#2a2030" />
          <rect
            x="120"
            y="260"
            width={260 * progressBarFill}
            height="6"
            rx="3"
            fill={COLORS.healthyTeal}
            opacity={0.7}
          />
          <text x="120" y="280" fill={COLORS.textMuted} fontSize="7" fontFamily="Inter, sans-serif">
            A3 (Before)
          </text>
          <text x="340" y="280" fill={COLORS.textMuted} fontSize="7" fontFamily="Inter, sans-serif" textAnchor="end">
            B1 (After)
          </text>
        </g>
      )}

      {/* Before/After divider text */}
      <g
        opacity={interpolate(progress, [0.1, 0.25, 0.6, 0.75], [0, 0.7, 0.7, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })}
      >
        <text
          x="100"
          y="300"
          textAnchor="middle"
          fill={COLORS.warningYellow}
          fontSize="11"
          fontFamily="Inter, sans-serif"
          fontWeight="500"
          opacity={0.7}
        >
          Before
        </text>
        <text
          x="380"
          y="300"
          textAnchor="middle"
          fill={COLORS.toothWhite}
          fontSize="11"
          fontFamily="Inter, sans-serif"
          fontWeight="500"
          opacity={0.7}
        >
          After
        </text>
      </g>

      {/* Before/After color swatches */}
      {whiteningProgress > 0.5 && (
        <g opacity={interpolate(whiteningProgress, [0.5, 0.8], [0, 0.5], { extrapolateRight: "clamp" })}>
          <rect x="105" y="310" width="14" height="14" rx="2" fill="rgb(224, 204, 144)" stroke="#555" strokeWidth={0.5} />
          <text x="123" y="320" fill={COLORS.textMuted} fontSize="7" fontFamily="Inter, sans-serif">Before</text>
          <line x1="158" y1="317" x2="175" y2="317" stroke={COLORS.textMuted} strokeWidth={0.6} />
          <path d="M173,314 L178,317 L173,320" fill={COLORS.textMuted} />
          <rect x="182" y="310" width="14" height="14" rx="2" fill={COLORS.toothWhite} stroke="#555" strokeWidth={0.5} />
          <text x="200" y="320" fill={COLORS.textMuted} fontSize="7" fontFamily="Inter, sans-serif">After</text>
        </g>
      )}

      {/* Final label */}
      <g
        opacity={interpolate(progress, [0.8, 0.95], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })}
      >
        <text
          x="250"
          y="348"
          textAnchor="middle"
          fill={COLORS.toothWhite}
          fontSize="14"
          fontFamily="Inter, sans-serif"
          fontWeight="600"
        >
          Professional Whitening
        </text>
        <text
          x="250"
          y="368"
          textAnchor="middle"
          fill={COLORS.textMuted}
          fontSize="10"
          fontFamily="Inter, sans-serif"
        >
          Up to 8 shades brighter
        </text>
      </g>
    </svg>
  );
};
