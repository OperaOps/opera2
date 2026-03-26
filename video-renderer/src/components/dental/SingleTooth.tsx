import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../../lib/colors";

interface SingleToothProps {
  variant?: "molar" | "incisor" | "canine";
  showLayers?: boolean;
  highlightArea?: "crown" | "root" | "pulp" | "enamel";
  progress: number;
}

export const SingleTooth: React.FC<SingleToothProps> = ({
  variant = "molar",
  showLayers = true,
  highlightArea,
  progress,
}) => {
  const frame = useCurrentFrame();

  const revealClip = interpolate(progress, [0, 0.6], [400, 0], {
    extrapolateRight: "clamp",
  });

  const layerLabelOpacity = interpolate(progress, [0.5, 0.8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const highlightPulse =
    0.6 + 0.4 * Math.sin(frame * 0.08);

  const getHighlightOpacity = (area: string) => {
    if (highlightArea === area) return highlightPulse * 0.4;
    return 0;
  };

  // Paths vary by variant
  const toothShapes = {
    molar: {
      enamelOuter:
        "M105,130 C105,100 115,75 130,60 C145,48 165,42 185,42 C205,42 225,50 238,65 C250,80 255,100 255,130 L250,145 L110,145 Z",
      dentinOuter:
        "M112,130 C112,105 120,85 133,72 C146,60 167,54 185,54 C203,54 222,62 234,76 C244,88 248,105 248,130 L245,142 L115,142 Z",
      pulpChamber:
        "M160,100 C160,88 168,78 185,78 C202,78 210,88 210,100 L210,140 L160,140 Z",
      rootLeft:
        "M130,145 L125,240 C123,270 130,310 140,330 C144,338 148,340 150,335 L158,280 L160,145 Z",
      rootRight:
        "M200,145 L202,280 L210,335 C212,340 216,338 220,330 C230,310 237,270 235,240 L230,145 Z",
      pulpCanalLeft:
        "M155,140 L150,240 C149,265 150,290 152,310 C153,316 155,316 156,310 L158,260 L160,140 Z",
      pulpCanalRight:
        "M200,140 L202,260 L204,310 C205,316 207,316 208,310 C210,290 211,265 210,240 L205,140 Z",
    },
    incisor: {
      enamelOuter:
        "M140,140 C138,110 142,75 155,52 C165,38 180,32 190,32 C200,32 215,38 225,52 C238,75 242,110 240,140 L238,150 L142,150 Z",
      dentinOuter:
        "M148,138 C147,112 150,82 160,62 C168,48 180,42 190,42 C200,42 212,48 220,62 C230,82 233,112 232,138 L230,148 L150,148 Z",
      pulpChamber:
        "M175,85 C175,72 180,65 190,65 C200,65 205,72 205,85 L205,148 L175,148 Z",
      rootLeft:
        "M165,150 L162,260 C160,300 165,340 175,360 C178,366 182,366 184,360 L188,300 L190,150 Z",
      rootRight: "",
      pulpCanalLeft:
        "M182,148 L180,260 C179,300 181,335 183,348 C184,352 186,352 187,348 L189,335 L190,260 L188,148 Z",
      pulpCanalRight: "",
    },
    canine: {
      enamelOuter:
        "M135,145 C133,115 140,80 155,55 C168,38 182,30 190,30 C198,30 212,38 225,55 C240,80 247,115 245,145 L242,155 L138,155 Z",
      dentinOuter:
        "M143,143 C142,118 147,87 160,65 C170,50 182,42 190,42 C198,42 210,50 220,65 C233,87 238,118 237,143 L235,153 L145,153 Z",
      pulpChamber:
        "M175,80 C175,65 180,56 190,56 C200,56 205,65 205,80 L205,153 L175,153 Z",
      rootLeft:
        "M163,155 L158,275 C155,315 162,355 175,375 C179,382 184,382 186,375 L192,310 L195,155 Z",
      rootRight: "",
      pulpCanalLeft:
        "M180,153 L177,275 C175,315 178,350 182,365 C183,370 186,370 187,365 L190,350 L192,275 L190,153 Z",
      pulpCanalRight: "",
    },
  };

  const shapes = toothShapes[variant];
  const isSingleRoot = variant !== "molar";
  const viewBoxH = variant === "molar" ? 400 : 430;

  return (
    <svg viewBox={`0 0 360 ${viewBoxH}`} overflow="visible" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="enamelGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={COLORS.toothWhite} />
          <stop offset="50%" stopColor={COLORS.enamel} />
          <stop offset="100%" stopColor={COLORS.toothShadow} />
        </linearGradient>
        <linearGradient id="dentinGrad" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#f7ecd0" />
          <stop offset="100%" stopColor={COLORS.dentin} />
        </linearGradient>
        <radialGradient id="pulpGrad" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#e86070" />
          <stop offset="100%" stopColor={COLORS.pulp} />
        </radialGradient>
        <linearGradient id="rootGrad" x1="0.3" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor={COLORS.root} />
          <stop offset="100%" stopColor="#d4c4a0" />
        </linearGradient>
        <linearGradient id="gumGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.gumPink} />
          <stop offset="100%" stopColor="#d48898" />
        </linearGradient>
        <linearGradient id="boneGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.bone} />
          <stop offset="100%" stopColor={COLORS.jawbone} />
        </linearGradient>
        <filter id="innerGlow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="subtleShadow" x="-5%" y="-5%" width="110%" height="110%">
          <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.2" />
        </filter>
        <clipPath id="revealClip">
          <rect x="0" y={revealClip} width="360" height={viewBoxH} />
        </clipPath>
      </defs>

      <g clipPath="url(#revealClip)">
        {/* Bone background */}
        <rect
          x="60"
          y={variant === "molar" ? 160 : 170}
          width="240"
          height={variant === "molar" ? 240 : 260}
          rx="20"
          fill="url(#boneGrad)"
          opacity={0.5}
        />

        {/* Gum tissue */}
        <ellipse
          cx="190"
          cy={variant === "molar" ? 155 : 165}
          rx="130"
          ry="30"
          fill="url(#gumGrad)"
          opacity={0.85}
        />

        <g filter="url(#subtleShadow)">
          {/* Root(s) */}
          {showLayers ? (
            <>
              <path d={shapes.rootLeft} fill="url(#rootGrad)" />
              {shapes.rootRight && (
                <path d={shapes.rootRight} fill="url(#rootGrad)" />
              )}
              {/* Root highlight overlay */}
              <path
                d={shapes.rootLeft}
                fill={COLORS.problemRed}
                opacity={getHighlightOpacity("root")}
              />
              {shapes.rootRight && (
                <path
                  d={shapes.rootRight}
                  fill={COLORS.problemRed}
                  opacity={getHighlightOpacity("root")}
                />
              )}

              {/* Pulp canals */}
              <path d={shapes.pulpCanalLeft} fill="url(#pulpGrad)" opacity={0.85} />
              {shapes.pulpCanalRight && (
                <path d={shapes.pulpCanalRight} fill="url(#pulpGrad)" opacity={0.85} />
              )}
            </>
          ) : (
            <>
              <path d={shapes.rootLeft} fill="url(#enamelGrad)" />
              {shapes.rootRight && (
                <path d={shapes.rootRight} fill="url(#enamelGrad)" />
              )}
            </>
          )}

          {/* Enamel (outer crown) */}
          <path
            d={shapes.enamelOuter}
            fill="url(#enamelGrad)"
            stroke={COLORS.toothDark}
            strokeWidth={0.5}
          />
          {/* Enamel highlight */}
          <path
            d={shapes.enamelOuter}
            fill={COLORS.purpleLight}
            opacity={getHighlightOpacity("enamel")}
          />

          {showLayers && (
            <>
              {/* Dentin */}
              <path d={shapes.dentinOuter} fill="url(#dentinGrad)" />
              <path
                d={shapes.dentinOuter}
                fill={COLORS.problemOrange}
                opacity={getHighlightOpacity("crown")}
              />

              {/* Pulp chamber */}
              <path
                d={shapes.pulpChamber}
                fill="url(#pulpGrad)"
                filter="url(#innerGlow)"
              />
              <path
                d={shapes.pulpChamber}
                fill={COLORS.problemRed}
                opacity={getHighlightOpacity("pulp")}
              />
            </>
          )}

          {/* Crown highlight overlay */}
          {!showLayers && (
            <path
              d={shapes.enamelOuter}
              fill={COLORS.problemOrange}
              opacity={getHighlightOpacity("crown")}
            />
          )}

          {/* Enamel shine */}
          <ellipse
            cx={variant === "molar" ? 170 : 180}
            cy={variant === "molar" ? 85 : 70}
            rx={12}
            ry={18}
            fill="white"
            opacity={0.15}
          />
        </g>

        {/* Layer labels */}
        {showLayers && (
          <g opacity={layerLabelOpacity}>
            <line x1="270" y1="90" x2="305" y2="70" stroke={COLORS.textMuted} strokeWidth={0.7} />
            <text x="308" y="74" fill={COLORS.textSecondary} fontSize="10" fontFamily="Inter, sans-serif">
              Enamel
            </text>

            <line x1="255" y1="120" x2="305" y2="110" stroke={COLORS.textMuted} strokeWidth={0.7} />
            <text x="308" y="114" fill={COLORS.textSecondary} fontSize="10" fontFamily="Inter, sans-serif">
              Dentin
            </text>

            <line x1="215" y1="110" x2="305" y2="145" stroke={COLORS.textMuted} strokeWidth={0.7} />
            <text x="308" y="149" fill={COLORS.textSecondary} fontSize="10" fontFamily="Inter, sans-serif">
              Pulp
            </text>

            <line x1="240" y1="260" x2="305" y2="230" stroke={COLORS.textMuted} strokeWidth={0.7} />
            <text x="308" y="234" fill={COLORS.textSecondary} fontSize="10" fontFamily="Inter, sans-serif">
              Root
            </text>

            <line x1="100" y1={variant === "molar" ? 155 : 165} x2="55" y2={variant === "molar" ? 155 : 165} stroke={COLORS.textMuted} strokeWidth={0.7} />
            <text x="10" y={variant === "molar" ? 159 : 169} fill={COLORS.textSecondary} fontSize="10" fontFamily="Inter, sans-serif">
              Gum
            </text>

            <line x1="120" y1="250" x2="55" y2="280" stroke={COLORS.textMuted} strokeWidth={0.7} />
            <text x="10" y="284" fill={COLORS.textSecondary} fontSize="10" fontFamily="Inter, sans-serif">
              Bone
            </text>
          </g>
        )}
      </g>
    </svg>
  );
};
