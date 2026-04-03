import React from "react";
import { interpolate } from "remotion";
import { COLORS } from "../../../lib/colors";
import { DiagramLabelFooter } from "../DiagramLabelFooter";

/** Periodontal deep dive — inflamed pocket → therapy → shallower healthy sulcus. */
export const GumPocketHealingVisual: React.FC<{ progress: number }> = ({ progress }) => {
  const reveal = interpolate(progress, [0, 0.08], [0, 1], { extrapolateRight: "clamp" });
  const disease = interpolate(progress, [0, 0.28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const therapy = interpolate(progress, [0.26, 0.58], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const heal = interpolate(progress, [0.52, 0.95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const labelOpacity = interpolate(progress, [0.86, 0.98], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pocketDepth = interpolate(heal, [0, 1], [48, 18]);
  const scalerX = interpolate(therapy, [0, 1], [268, 210]);

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
        <linearGradient id="gphTooth" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f4f2fa" />
          <stop offset="100%" stopColor={COLORS.enamel} />
        </linearGradient>
        <linearGradient id="gphGumH" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.gumInflamed} />
          <stop offset="100%" stopColor="#b84848" />
        </linearGradient>
        <linearGradient id="gphGumOk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.gumHealthy} />
          <stop offset="100%" stopColor={COLORS.gumPink} />
        </linearGradient>
        <filter id="gphSh" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#000" floodOpacity={0.3} />
        </filter>
        <clipPath id="gphReveal">
          <rect
            x="0"
            y={interpolate(reveal, [0, 1], [400, 0])}
            width="360"
            height="400"
          />
        </clipPath>
      </defs>

      <rect width="360" height="400" fill="#0a0810" />
      <g clipPath="url(#gphReveal)" transform="translate(0, 10)">
        <text
          x="180"
          y="20"
          textAnchor="middle"
          fill={COLORS.textMuted}
          fontSize="10"
          fontFamily="system-ui, sans-serif"
          opacity={0.55}
        >
          Gum profile
        </text>

        {/* Tooth body */}
        <path
          d="M150,88 L150,268 Q180,288 210,268 L210,88 Q180,72 150,88 Z"
          fill="url(#gphTooth)"
          stroke={COLORS.toothDark}
          strokeWidth={0.55}
          filter="url(#gphSh)"
        />
        <path
          d="M165,100 Q180,94 195,100 L193,130 Q180,125 167,130 Z"
          fill="white"
          opacity={0.12}
        />

        {/* Pocket space (widens with disease, tightens with heal) */}
        <path
          d={`M210,118 Q235,${118 + pocketDepth * 0.35} 248,${118 + pocketDepth}
             L248,${118 + pocketDepth + 40}
             Q230,${138 + pocketDepth * 0.5} 210,148 Z`}
          fill={disease > 0.2 && heal < 0.3 ? "url(#gphGumH)" : "#2a2030"}
          opacity={disease > 0.15 ? 0.55 : 0.2}
        />

        {/* Outer gingiva */}
        <path
          d="M95,125 Q180,108 265,125 L265,155 Q180,138 95,155 Z"
          fill={
            heal > 0.48 ? "url(#gphGumOk)" : disease > 0.18 ? "url(#gphGumH)" : "url(#gphGumOk)"
          }
          opacity={0.92}
        />

        {/* Calculus chips */}
        {therapy > 0.15 && therapy < 0.85 && (
          <g opacity={interpolate(therapy, [0.15, 0.35, 0.7, 0.85], [0, 1, 1, 0])}>
            {[0, 1, 2].map((i) => (
              <rect
                key={i}
                x={228 + i * 8}
                y={135 + i * 12 + Math.sin(therapy * Math.PI * 2 + i) * 2}
                width={5 + i}
                height={4}
                rx={1}
                fill="#c8b090"
                opacity={0.7}
                transform={`rotate(${15 + i * 8} ${230 + i * 8} ${140 + i * 12})`}
              />
            ))}
          </g>
        )}

        {/* Scaler tip */}
        {therapy > 0.08 && (
          <g opacity={interpolate(therapy, [0, 0.12, 0.92, 1], [0, 1, 1, 0.4])}>
            <line
              x1={scalerX}
              y1="52"
              x2={scalerX - 8}
              y2="128"
              stroke="#d0d8e8"
              strokeWidth={2.5}
              strokeLinecap="round"
            />
            <path
              d={`M${scalerX - 14},128 L${scalerX + 2},128 L${scalerX - 4},138 Z`}
              fill="#a8b0c0"
            />
          </g>
        )}

        {heal > 0.65 && (
          <text
            x="272"
            y="168"
            fill={COLORS.healthyTeal}
            fontSize="11"
            fontFamily="system-ui, sans-serif"
            fontWeight={600}
            opacity={interpolate(heal, [0.65, 0.85], [0, 1])}
          >
            Healthier attachment
          </text>
        )}
      </g>

      <DiagramLabelFooter
        opacity={labelOpacity}
        vbWidth={360}
        y={308}
        items={[
          { title: "Inflammation", subtitle: "Deeper pocket" },
          { title: "Debridement", subtitle: "Remove buildup" },
          { title: "Healing", subtitle: "Tighter gum seal" },
        ]}
      />
    </svg>
  );
};
