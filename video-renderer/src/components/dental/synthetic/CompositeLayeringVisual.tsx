import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../../../lib/colors";
import { DiagramLabelFooter } from "../DiagramLabelFooter";

/** Filling deep dive — prepared cavity → layered composite → polished surface. */
export const CompositeLayeringVisual: React.FC<{ progress: number }> = ({ progress }) => {
  const frame = useCurrentFrame();

  const reveal = interpolate(progress, [0, 0.08], [0, 1], { extrapolateRight: "clamp" });
  const prepShow = interpolate(progress, [0, 0.22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const baseLayer = interpolate(progress, [0.2, 0.45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bodyLayer = interpolate(progress, [0.4, 0.68], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const polish = interpolate(progress, [0.62, 0.96], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const labelOpacity = interpolate(progress, [0.86, 0.98], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cureFlash = Math.sin(frame * 0.12) * 0.5 + 0.5;

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
        <linearGradient id="clvEnamel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f6f4fc" />
          <stop offset="100%" stopColor={COLORS.enamel} />
        </linearGradient>
        <linearGradient id="clvBase" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c8a878" />
          <stop offset="100%" stopColor="#a08058" />
        </linearGradient>
        <linearGradient id="clvBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.compositeFill} />
          <stop offset="100%" stopColor="#d0c8b8" />
        </linearGradient>
        <radialGradient id="clvCure" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={COLORS.healthyTeal} stopOpacity="0.5" />
          <stop offset="100%" stopColor={COLORS.healthyTeal} stopOpacity="0" />
        </radialGradient>
        <filter id="clvSh" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="2" floodColor="#000" floodOpacity={0.32} />
        </filter>
        <clipPath id="clvReveal">
          <rect
            x="0"
            y={interpolate(reveal, [0, 1], [400, 0])}
            width="360"
            height="400"
          />
        </clipPath>
      </defs>

      <rect width="360" height="400" fill="#0a0810" />
      <g clipPath="url(#clvReveal)" transform="translate(0, 6)">
        <text
          x="180"
          y="22"
          textAnchor="middle"
          fill={COLORS.textMuted}
          fontSize="10"
          fontFamily="system-ui, sans-serif"
          opacity={0.55}
        >
          Occlusal view
        </text>

        {/* Tooth occlusal table */}
        <ellipse
          cx="180"
          cy="175"
          rx="88"
          ry="62"
          fill="url(#clvEnamel)"
          stroke={COLORS.toothDark}
          strokeWidth={0.6}
          filter="url(#clvSh)"
        />

        {/* Cavity prep */}
        <path
          d="M148,155 Q180,138 212,155 Q218,175 210,195 Q180,212 150,195 Q142,175 148,155 Z"
          fill={prepShow > 0.3 ? "#2a2420" : "url(#clvEnamel)"}
          opacity={prepShow > 0.15 ? 1 : 0}
          stroke={prepShow > 0.2 ? "#4a4038" : "none"}
          strokeWidth={0.8}
        />

        {/* Base layer */}
        {baseLayer > 0 && (
          <path
            d="M152,158 Q180,145 208,158 Q214,175 206,190 Q180,205 154,190 Q146,175 152,158 Z"
            fill="url(#clvBase)"
            opacity={baseLayer * 0.92}
          />
        )}

        {/* Body composite */}
        {bodyLayer > 0 && (
          <path
            d="M156,162 Q180,152 204,162 Q210,176 202,188 Q180,198 158,188 Q150,176 156,162 Z"
            fill="url(#clvBody)"
            opacity={bodyLayer * 0.95}
            stroke="#b8b0a0"
            strokeWidth={0.35}
          />
        )}

        {/* Polish / anatomy */}
        {polish > 0 && (
          <g opacity={polish}>
            <ellipse cx="180" cy="175" rx="54" ry="38" fill="none" stroke="white" strokeWidth={0.6} opacity={0.2} />
            <path
              d="M165,172 Q180,168 195,172"
              fill="none"
              stroke="white"
              strokeWidth={0.9}
              opacity={0.18}
            />
            <path
              d="M170,182 Q180,178 190,182"
              fill="none"
              stroke="white"
              strokeWidth={0.7}
              opacity={0.14}
            />
          </g>
        )}

        {/* Cure light hint */}
        {baseLayer > 0.4 && bodyLayer < 0.9 && (
          <ellipse
            cx="255"
            cy="120"
            rx="28"
            ry="28"
            fill="url(#clvCure)"
            opacity={0.25 + cureFlash * 0.15}
          />
        )}
      </g>

      <DiagramLabelFooter
        opacity={labelOpacity}
        vbWidth={360}
        y={308}
        items={[
          { title: "Remove decay", subtitle: "Clean prep" },
          { title: "Layers", subtitle: "Strong repair" },
          { title: "Polish", subtitle: "Natural bite" },
        ]}
      />
    </svg>
  );
};
