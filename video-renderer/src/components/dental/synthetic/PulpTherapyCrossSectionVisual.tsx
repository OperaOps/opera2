import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../../../lib/colors";
import { DiagramLabelFooter } from "../DiagramLabelFooter";

/** Root canal deep dive — pulp inflammation → cleaned canals → sealed obturation (cross-section). */
export const PulpTherapyCrossSectionVisual: React.FC<{ progress: number }> = ({ progress }) => {
  const frame = useCurrentFrame();

  const reveal = interpolate(progress, [0, 0.08], [0, 1], { extrapolateRight: "clamp" });
  const inflame = interpolate(progress, [0, 0.22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const instrument = interpolate(progress, [0.18, 0.48], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cleaned = interpolate(progress, [0.42, 0.72], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fill = interpolate(progress, [0.65, 0.98], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const labelOpacity = interpolate(progress, [0.86, 0.98], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pulse =
    inflame > 0.2 && cleaned < 0.5
      ? 0.35 + Math.sin(frame * 0.06) * 0.12
      : 0.2;

  const fileY = interpolate(instrument, [0, 1], [40, 118]);

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
        <linearGradient id="pptEnamel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f4f2fa" />
          <stop offset="45%" stopColor={COLORS.toothWhite} />
          <stop offset="100%" stopColor={COLORS.enamel} />
        </linearGradient>
        <linearGradient id="pptDentin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={COLORS.dentin} />
          <stop offset="100%" stopColor="#c9a882" />
        </linearGradient>
        <linearGradient id="pptGum" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.gumPink} />
          <stop offset="100%" stopColor="#c08090" />
        </linearGradient>
        <radialGradient id="pptPulpGlow" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor={COLORS.problemRed} stopOpacity="0.75" />
          <stop offset="70%" stopColor={COLORS.pulp} stopOpacity="0.25" />
          <stop offset="100%" stopColor={COLORS.pulp} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pptFillMat" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f8f6f0" />
          <stop offset="100%" stopColor="#e8e4dc" />
        </linearGradient>
        <filter id="pptSh" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="2" floodColor="#000" floodOpacity="0.35" />
        </filter>
        <clipPath id="pptReveal">
          <rect
            x="0"
            y={interpolate(reveal, [0, 1], [400, 0])}
            width="360"
            height="400"
          />
        </clipPath>
      </defs>

      <rect width="360" height="400" fill="#0a0810" />
      <g clipPath="url(#pptReveal)" transform="translate(0, 6)">
        <text
          x="180"
          y="22"
          textAnchor="middle"
          fill={COLORS.textMuted}
          fontSize="10"
          fontFamily="system-ui, sans-serif"
          opacity={0.55}
        >
          Tooth cross-section
        </text>

        {/* Crown / coronal tooth */}
        <path
          d="M120,95 L120,175 Q120,188 132,195 L228,195 Q240,188 240,175 L240,95 Q180,78 120,95 Z"
          fill="url(#pptEnamel)"
          stroke={COLORS.toothDark}
          strokeWidth={0.6}
          filter="url(#pptSh)"
        />
        <path
          d="M135,175 L135,250 Q135,268 150,278 L210,278 Q225,268 225,250 L225,175 Z"
          fill="url(#pptDentin)"
          stroke={COLORS.toothDark}
          strokeWidth={0.4}
          opacity={0.95}
        />

        {/* Pulp chamber + canals */}
        <path
          d="M158,120 Q180,108 202,120 L198,165 Q180,172 162,165 Z"
          fill={cleaned > 0.4 ? "#3a3848" : `url(#pptPulpGlow)`}
          opacity={cleaned > 0.4 ? 0.85 : pulse}
        />
        <path
          d="M168,165 L168,285 Q180,295 192,285 L192,165"
          fill="none"
          stroke={cleaned > 0.35 ? "#4a4858" : COLORS.problemRed}
          strokeWidth={cleaned > 0.35 ? 5 : 6}
          strokeLinecap="round"
          opacity={cleaned > 0.2 ? 0.9 : 0.85}
        />
        <path
          d="M188,165 L188,282 Q180,292 172,282 L172,165"
          fill="none"
          stroke={cleaned > 0.35 ? "#4a4858" : COLORS.problemRed}
          strokeWidth={cleaned > 0.35 ? 5 : 6}
          strokeLinecap="round"
          opacity={cleaned > 0.2 ? 0.9 : 0.85}
        />

        {inflame > 0.15 && cleaned < 0.35 && (
          <ellipse cx="180" cy="138" rx="22" ry="16" fill={COLORS.problemRed} opacity={inflame * 0.18} />
        )}

        {/* Rotary file */}
        {instrument > 0.05 && (
          <g opacity={interpolate(instrument, [0, 0.12, 1], [0, 1, 1])}>
            <line
              x1="255"
              y1={fileY}
              x2="255"
              y2={fileY + 95}
              stroke="#b8c0d0"
              strokeWidth={3}
              strokeLinecap="round"
            />
            <line
              x1="252"
              y1={fileY + 8}
              x2="258"
              y2={fileY + 88}
              stroke="#9098a8"
              strokeWidth={1.2}
              opacity={0.6}
            />
            <path
              d={`M248,${fileY + 95} L262,${fileY + 95} L259,${fileY + 108} L251,${fileY + 108} Z`}
              fill={COLORS.implantTitanium}
            />
          </g>
        )}

        {/* Obturation */}
        {fill > 0 && (
          <g opacity={fill}>
            <path
              d="M168,168 L168,283 Q180,290 192,283 L192,168"
              fill="none"
              stroke="url(#pptFillMat)"
              strokeWidth={interpolate(fill, [0, 0.4], [0, 5.5], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })}
              strokeLinecap="round"
            />
            <path
              d="M172,168 L172,280 Q180,286 188,280 L188,168"
              fill="none"
              stroke="url(#pptFillMat)"
              strokeWidth={interpolate(fill, [0.15, 0.55], [0, 4.5], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })}
              strokeLinecap="round"
            />
            <path
              d="M158,118 Q180,106 202,118 L199,158 Q180,166 161,158 Z"
              fill="#e8e6e0"
              opacity={0.85}
              stroke="#c8c4bc"
              strokeWidth={0.5}
            />
          </g>
        )}

        {fill > 0.75 && (
          <g
            transform="translate(268, 118)"
            opacity={interpolate(fill, [0.75, 1], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
          >
            <circle cx="0" cy="0" r="10" fill={COLORS.healthyGreen} opacity={0.2} />
            <path
              d="M-5,0 L-1,4 L7,-5"
              fill="none"
              stroke={COLORS.healthyGreen}
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        )}

        {/* Gingiva */}
        <path
          d="M95,188 Q180,172 265,188 L265,212 Q180,198 95,212 Z"
          fill="url(#pptGum)"
          opacity={0.88}
        />
      </g>

      <DiagramLabelFooter
        opacity={labelOpacity}
        vbWidth={360}
        y={308}
        items={[
          { title: "Infection", subtitle: "Inside the tooth" },
          { title: "Clean + shape", subtitle: "Canal therapy" },
          { title: "Sealed", subtitle: "Protects the tooth" },
        ]}
      />
    </svg>
  );
};
