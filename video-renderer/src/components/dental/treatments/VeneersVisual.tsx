import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../../../lib/colors";

interface VeneersVisualProps {
  progress: number;
}

export const VeneersVisual: React.FC<VeneersVisualProps> = ({ progress }) => {
  const frame = useCurrentFrame();

  const reveal = interpolate(progress, [0, 0.12], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Phase 1: Show imperfect tooth (0 - 0.3)
  const beforePhase = interpolate(progress, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Phase 2: Veneer shell approaches (0.3 - 0.6)
  const veneerApproach = interpolate(progress, [0.3, 0.58], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const veneerX = interpolate(veneerApproach, [0, 1], [-80, 0]);

  // Phase 3: Veneer bonds (0.6 - 0.8)
  const bondProgress = interpolate(progress, [0.6, 0.78], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 4: Final result (0.8 - 1)
  const finalGlow = interpolate(progress, [0.8, 0.95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const labelOpacity = interpolate(progress, [0.78, 0.92], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Gap closes during bonding
  const gapWidth = interpolate(bondProgress, [0, 1], [3, 0]);

  // Bond flash (UV cure light)
  const bondFlash = interpolate(bondProgress, [0.3, 0.5, 0.7], [0, 0.6, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <svg viewBox="0 0 500 400" overflow="visible" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="vnGumGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c07080" />
          <stop offset="50%" stopColor={COLORS.gumPink} />
          <stop offset="100%" stopColor="#d4909c" />
        </linearGradient>
        <linearGradient id="vnOriginalTooth" x1="0.3" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="#e0d4b0" />
          <stop offset="50%" stopColor="#d8c8a0" />
          <stop offset="100%" stopColor="#c8b890" />
        </linearGradient>
        <linearGradient id="vnVeneerGrad" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#fcfaf8" />
          <stop offset="25%" stopColor={COLORS.toothWhite} />
          <stop offset="75%" stopColor={COLORS.enamel} />
          <stop offset="100%" stopColor={COLORS.toothShadow} />
        </linearGradient>
        <linearGradient id="vnVeneerEdge" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.1)" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        <filter id="vnShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0.5" dy="1.5" stdDeviation="1.5" floodColor="#000" floodOpacity="0.25" />
        </filter>
        <filter id="vnGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="vnSparkle" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g opacity={reveal}>
        {/* Gum tissue */}
        <path
          d="M40,155 Q80,130 250,120 Q420,130 460,155
             L460,100 Q420,85 250,78 Q80,85 40,100 Z"
          fill="url(#vnGumGrad)"
        />

        {/* Original tooth (discolored, chipped, imperfect) */}
        <g filter="url(#vnShadow)">
          <path
            d="M200,148 C198,128 204,100 218,85 C228,75 240,70 250,70 C260,70 272,75 282,85 C296,100 302,128 300,148 L300,218 C298,225 292,230 280,232 Q250,235 220,232 C208,230 202,225 200,218 Z"
            fill="url(#vnOriginalTooth)"
            stroke="#b8a880"
            strokeWidth={0.5}
          />

          {/* Imperfection: stain/discoloration marks */}
          <ellipse cx="235" cy="145" rx="8" ry="5" fill="#b89860" opacity={0.3 * (1 - bondProgress)} />
          <ellipse cx="270" cy="170" rx="6" ry="4" fill="#a88850" opacity={0.25 * (1 - bondProgress)} />
          <ellipse cx="248" cy="195" rx="10" ry="6" fill="#c0a870" opacity={0.2 * (1 - bondProgress)} />

          {/* Imperfection: chip on incisal edge */}
          <path
            d="M218,220 Q215,225 218,230"
            fill="none"
            stroke="#a89870"
            strokeWidth={1}
            opacity={0.4 * (1 - bondProgress)}
          />

          {/* Imperfection: crack line */}
          <path
            d="M260,90 Q264,115 266,150 Q267,170 264,195"
            fill="none"
            stroke="#a09878"
            strokeWidth={0.5}
            opacity={0.35 * (1 - bondProgress)}
          />

          {/* Worn surface texture */}
          <path
            d="M225,105 Q232,102 240,105 Q248,108 255,105"
            fill="none"
            stroke="#b0a088"
            strokeWidth={0.3}
            opacity={0.35 * (1 - bondProgress)}
          />

          {/* Slight edge irregularity */}
          <path
            d="M284,85 Q290,82 296,90"
            fill="url(#vnOriginalTooth)"
            stroke="#b8a880"
            strokeWidth={0.3}
            opacity={1 - bondProgress}
          />
        </g>

        {/* Prep margin line (visible when veneer is approaching) */}
        {veneerApproach > 0.3 && bondProgress < 0.8 && (
          <path
            d="M202,148 C200,128 206,102 220,87 C230,77 242,72 250,72 C258,72 270,77 280,87 C294,102 300,128 298,148"
            fill="none"
            stroke={COLORS.textMuted}
            strokeWidth={0.5}
            strokeDasharray="3,3"
            opacity={0.3 * (1 - bondProgress)}
          />
        )}

        {/* ===== VENEER SHELL ===== */}
        <g
          transform={`translate(${veneerX - gapWidth}, 0)`}
          opacity={interpolate(veneerApproach, [0, 0.15, 1], [0, 1, 1])}
        >
          <g filter="url(#vnShadow)">
            {/* Veneer - thin porcelain shell */}
            <path
              d="M198,150 C196,130 202,102 216,87 C226,77 238,72 250,72 C262,72 274,77 284,87 C298,102 304,130 302,150 L302,216 C300,224 294,228 282,230 Q250,233 218,230 C206,228 200,224 198,216 Z"
              fill="url(#vnVeneerGrad)"
              stroke={COLORS.toothDark}
              strokeWidth={0.4}
            />

            {/* Veneer thinness indicator - translucent edge */}
            <path
              d="M198,150 C196,130 202,102 216,87 C226,77 238,72 250,72 C262,72 274,77 284,87 C298,102 304,130 302,150"
              fill="none"
              stroke="white"
              strokeWidth={0.8}
              opacity={0.2}
            />

            {/* Inner surface visible while approaching (shows thinness) */}
            {bondProgress < 0.7 && (
              <path
                d="M204,148 C202,130 208,106 220,92 C228,82 240,78 250,78 C260,78 272,82 280,92 C292,106 298,130 296,148"
                fill="url(#vnVeneerEdge)"
                opacity={0.25}
              />
            )}

            {/* Surface reflection */}
            <ellipse cx="230" cy="130" rx="12" ry="30" fill="white" opacity={0.12} />
            <ellipse cx="265" cy="160" rx="8" ry="18" fill="white" opacity={0.06} />

            {/* Natural-looking surface texture */}
            <line x1="250" y1="85" x2="250" y2="180" stroke={COLORS.toothDark} strokeWidth={0.15} opacity={0.15} />

            {/* Translucency at incisal edge */}
            <path
              d="M205,212 Q250,222 295,212 L295,228 Q250,233 205,228 Z"
              fill="white"
              opacity={0.05}
            />
          </g>

          {/* Thickness measurement (during approach) */}
          {veneerApproach > 0.4 && bondProgress < 0.3 && (
            <g opacity={0.5}>
              <line x1="193" y1="150" x2="200" y2="150" stroke={COLORS.purple} strokeWidth={0.6} />
              <line x1="190" y1="147" x2="190" y2="153" stroke={COLORS.purple} strokeWidth={0.5} />
              <line x1="203" y1="147" x2="203" y2="153" stroke={COLORS.purple} strokeWidth={0.5} />
              <text x="180" y="145" fill={COLORS.textMuted} fontSize="7" fontFamily="Inter, sans-serif" textAnchor="middle">
                0.5mm
              </text>
            </g>
          )}
        </g>

        {/* Bond line flash (UV cure) */}
        {bondFlash > 0 && (
          <g opacity={bondFlash}>
            <path
              d="M200,148 C198,128 204,102 218,87 C228,77 240,72 250,72 C260,72 272,77 282,87 C296,102 302,128 300,148"
              fill="none"
              stroke={COLORS.infoBlue}
              strokeWidth={2.5}
              filter="url(#vnGlow)"
            />
          </g>
        )}

        {/* Bonding adhesive indicator */}
        {bondProgress > 0.1 && bondProgress < 0.9 && (
          <rect
            x={198 + veneerX - gapWidth}
            y={130}
            width={gapWidth + 2}
            height={100}
            fill={COLORS.infoBlue}
            opacity={0.12}
          />
        )}

        {/* Approach arrows */}
        {veneerApproach > 0.05 && veneerApproach < 0.8 && (
          <g opacity={0.4 * (1 - veneerApproach)}>
            <path d={`M${170 + veneerX},140 L${190 + veneerX},140`} stroke={COLORS.purple} strokeWidth={1.5} />
            <path d={`M${186 + veneerX},135 L${192 + veneerX},140 L${186 + veneerX},145`} fill={COLORS.purple} />
            <path d={`M${170 + veneerX},180 L${190 + veneerX},180`} stroke={COLORS.purple} strokeWidth={1.5} />
            <path d={`M${186 + veneerX},175 L${192 + veneerX},180 L${186 + veneerX},185`} fill={COLORS.purple} />
          </g>
        )}

        {/* Final glow effect */}
        {finalGlow > 0 && (
          <g filter="url(#vnGlow)" opacity={finalGlow}>
            <ellipse
              cx="250"
              cy="160"
              rx="60"
              ry="50"
              fill="white"
              opacity={0.08 + Math.sin(frame * 0.04) * 0.02}
            />
          </g>
        )}

        {/* Sparkles */}
        {finalGlow > 0.3 && (
          <g opacity={(finalGlow - 0.3) * 1.4} filter="url(#vnSparkle)">
            {[
              { x: 225, y: 115, s: 6 },
              { x: 275, y: 140, s: 5 },
              { x: 240, y: 200, s: 4 },
              { x: 260, y: 100, s: 4 },
              { x: 250, y: 165, s: 3 },
            ].map((sp, i) => {
              const sOp = 0.5 + Math.sin(frame * 0.07 + i * 1.5) * 0.4;
              return (
                <g key={`sp-${i}`} transform={`translate(${sp.x}, ${sp.y})`} opacity={sOp}>
                  <line x1={-sp.s} y1="0" x2={sp.s} y2="0" stroke="white" strokeWidth={1.2} strokeLinecap="round" />
                  <line x1="0" y1={-sp.s} x2="0" y2={sp.s} stroke="white" strokeWidth={1.2} strokeLinecap="round" />
                  {sp.s > 4 && (
                    <>
                      <line x1={-sp.s * 0.5} y1={-sp.s * 0.5} x2={sp.s * 0.5} y2={sp.s * 0.5} stroke="white" strokeWidth={0.7} strokeLinecap="round" />
                      <line x1={sp.s * 0.5} y1={-sp.s * 0.5} x2={-sp.s * 0.5} y2={sp.s * 0.5} stroke="white" strokeWidth={0.7} strokeLinecap="round" />
                    </>
                  )}
                </g>
              );
            })}
          </g>
        )}

        {/* Before/After comparison swatches */}
        {bondProgress > 0.7 && (
          <g opacity={interpolate(bondProgress, [0.7, 1.0], [0, 0.6], { extrapolateRight: "clamp" })}>
            <rect x="375" y="120" width="24" height="32" rx="3" fill="url(#vnOriginalTooth)" stroke="#888" strokeWidth={0.5} />
            <line x1="379" y1="128" x2="395" y2="135" stroke="#a09878" strokeWidth={0.5} opacity={0.5} />
            <text x="387" y="162" textAnchor="middle" fill={COLORS.textMuted} fontSize="7" fontFamily="Inter, sans-serif">
              Before
            </text>

            <path d="M387,168 L387,176" stroke={COLORS.textMuted} strokeWidth={0.5} />
            <path d="M384,174 L387,179 L390,174" fill={COLORS.textMuted} />

            <rect x="375" y="182" width="24" height="32" rx="3" fill="url(#vnVeneerGrad)" stroke="#888" strokeWidth={0.5} />
            <rect x="378" y="185" width="4" height="12" rx="2" fill="white" opacity={0.15} />
            <text x="387" y="224" textAnchor="middle" fill={COLORS.textMuted} fontSize="7" fontFamily="Inter, sans-serif">
              After
            </text>
          </g>
        )}

        {/* Before / After text phases */}
        <g opacity={interpolate(progress, [0.05, 0.15, 0.25, 0.35], [0, 0.8, 0.8, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })}>
          <text x="250" y="275" textAnchor="middle" fill={COLORS.textMuted} fontSize="11" fontFamily="Inter, sans-serif">
            Before
          </text>
        </g>
        <g opacity={interpolate(progress, [0.8, 0.9], [0, 0.8], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })}>
          <text x="250" y="275" textAnchor="middle" fill={COLORS.toothWhite} fontSize="11" fontFamily="Inter, sans-serif" fontWeight="500">
            After
          </text>
        </g>

        {/* Labels */}
        <g opacity={labelOpacity}>
          <line x1="310" y1="155" x2="360" y2="135" stroke={COLORS.textMuted} strokeWidth={0.7} />
          <text x="365" y="133" fill={COLORS.textSecondary} fontSize="10" fontFamily="Inter, sans-serif" fontWeight="500">
            Porcelain Veneer
          </text>
          <text x="365" y="148" fill={COLORS.textMuted} fontSize="8" fontFamily="Inter, sans-serif">
            Ultra-thin shell (0.5mm)
          </text>

          <line x1="195" y1="175" x2="140" y2="190" stroke={COLORS.textMuted} strokeWidth={0.7} />
          <text x="60" y="188" fill={COLORS.textSecondary} fontSize="9" fontFamily="Inter, sans-serif">
            Natural tooth beneath
          </text>
          <text x="60" y="200" fill={COLORS.textMuted} fontSize="7" fontFamily="Inter, sans-serif">
            Minimally prepared
          </text>
        </g>
      </g>
    </svg>
  );
};
