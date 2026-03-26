import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../../../lib/colors";

interface ImplantVisualProps {
  progress: number;
}

export const ImplantVisual: React.FC<ImplantVisualProps> = ({ progress }) => {
  const frame = useCurrentFrame();

  const reveal = interpolate(progress, [0, 0.1], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Phase 1: Show gap in teeth with empty socket (0 - 0.2)
  const gapHighlight = interpolate(progress, [0.05, 0.18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 2: Titanium screw placement (0.2 - 0.5)
  const screwDescent = interpolate(progress, [0.2, 0.48], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const screwY = interpolate(screwDescent, [0, 1], [-110, 0]);

  // Phase 3: Abutment added (0.5 - 0.7)
  const abutmentDescent = interpolate(progress, [0.5, 0.68], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const abutmentY = interpolate(abutmentDescent, [0, 1], [-55, 0]);

  // Phase 4: Crown placed (0.7 - 1.0)
  const crownDescent = interpolate(progress, [0.7, 0.9], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const crownY = interpolate(crownDescent, [0, 1], [-75, 0]);

  // Final shine
  const shineOpacity = interpolate(progress, [0.9, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const labelOpacity = interpolate(progress, [0.85, 0.98], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Osseointegration glow (pulsing teal glow when screw seated, before abutment)
  const integrationPulse =
    screwDescent >= 1 && abutmentDescent < 0.5
      ? 0.3 + Math.sin(frame * 0.06) * 0.15
      : 0;

  return (
    <svg viewBox="0 0 300 400" overflow="visible" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="impToothGrad" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#f8f5ff" />
          <stop offset="40%" stopColor={COLORS.toothWhite} />
          <stop offset="80%" stopColor={COLORS.enamel} />
          <stop offset="100%" stopColor={COLORS.toothShadow} />
        </linearGradient>
        <linearGradient id="impBoneGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.bone} />
          <stop offset="60%" stopColor={COLORS.jawbone} />
          <stop offset="100%" stopColor="#b0a880" />
        </linearGradient>
        <linearGradient id="impGumGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.gumPink} />
          <stop offset="100%" stopColor="#c08090" />
        </linearGradient>
        <linearGradient id="impTitaniumGrad" x1="0.15" y1="0" x2="0.85" y2="1">
          <stop offset="0%" stopColor="#c8d0dc" />
          <stop offset="30%" stopColor={COLORS.implantTitanium} />
          <stop offset="70%" stopColor="#909cac" />
          <stop offset="100%" stopColor="#788090" />
        </linearGradient>
        <linearGradient id="impAbutmentGrad" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#d0d4dc" />
          <stop offset="50%" stopColor="#b0b8c4" />
          <stop offset="100%" stopColor="#8890a0" />
        </linearGradient>
        <linearGradient id="impCrownGrad" x1="0.15" y1="0" x2="0.85" y2="1">
          <stop offset="0%" stopColor="#f8f4f0" />
          <stop offset="30%" stopColor={COLORS.toothWhite} />
          <stop offset="70%" stopColor={COLORS.enamel} />
          <stop offset="100%" stopColor={COLORS.toothShadow} />
        </linearGradient>
        <radialGradient id="impSocketGrad" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#080310" />
          <stop offset="100%" stopColor="#1a1025" />
        </radialGradient>
        <radialGradient id="impIntegrationGlow" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor={COLORS.healthyTeal} stopOpacity="0.4" />
          <stop offset="100%" stopColor={COLORS.healthyTeal} stopOpacity="0" />
        </radialGradient>
        <pattern id="impBoneTexture" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.8" fill="#b8a888" opacity="0.3" />
          <circle cx="6" cy="6" r="0.6" fill="#c0b090" opacity="0.2" />
        </pattern>
        <filter id="impShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.3" />
        </filter>
        <filter id="impSparkle" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id="impReveal">
          <rect
            x="0"
            y={interpolate(reveal, [0, 1], [400, 0])}
            width="300"
            height="400"
          />
        </clipPath>
      </defs>

      <g clipPath="url(#impReveal)">
        {/* Jawbone cross-section */}
        <path
          d="M20,170 L20,370 Q150,395 280,370 L280,170 Z"
          fill="url(#impBoneGrad)"
          opacity={0.5}
        />
        {/* Bone texture overlay */}
        <path
          d="M20,170 L20,370 Q150,395 280,370 L280,170 Z"
          fill="url(#impBoneTexture)"
          opacity={0.4}
        />
        {/* Cortical bone layer (dense outer) */}
        <path
          d="M20,170 L20,185 Q150,200 280,185 L280,170 Z"
          fill={COLORS.bone}
          opacity={0.7}
        />
        {/* Bone internal texture circles */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <circle
            key={`bone-${i}`}
            cx={55 + i * 40 + Math.sin(i * 2) * 10}
            cy={250 + Math.cos(i * 3) * 40}
            r={8 + (i % 3) * 3}
            fill={COLORS.bone}
            opacity={0.12}
          />
        ))}

        {/* Gum tissue */}
        <path
          d="M10,140 Q80,125 150,122 Q220,125 290,140 L290,175 Q220,160 150,158 Q80,160 10,175 Z"
          fill="url(#impGumGrad)"
          opacity={0.9}
        />

        {/* Adjacent tooth LEFT */}
        <g filter="url(#impShadow)">
          <path
            d="M30,130 C30,105 38,75 50,60 C58,50 64,46 70,46 C76,46 82,50 90,60 C95,68 98,80 98,95 L98,165 L30,165 Z"
            fill="url(#impToothGrad)"
            stroke={COLORS.toothDark}
            strokeWidth={0.4}
          />
          <path
            d="M42,165 L40,240 C38,270 44,300 54,315 C58,320 62,320 64,315 L70,260 L72,165 Z"
            fill={COLORS.root}
          />
          <ellipse cx="55" cy="90" rx="7" ry="16" fill="white" opacity={0.1} />
        </g>

        {/* Adjacent tooth RIGHT */}
        <g filter="url(#impShadow)">
          <path
            d="M202,130 C202,105 210,75 222,60 C230,50 236,46 242,46 C248,46 254,50 262,60 C267,68 270,80 270,95 L270,165 L202,165 Z"
            fill="url(#impToothGrad)"
            stroke={COLORS.toothDark}
            strokeWidth={0.4}
          />
          <path
            d="M214,165 L212,240 C210,270 216,300 226,315 C230,320 234,320 236,315 L242,260 L244,165 Z"
            fill={COLORS.root}
          />
          <ellipse cx="230" cy="90" rx="7" ry="16" fill="white" opacity={0.1} />
        </g>

        {/* Gap highlight (empty socket) */}
        {gapHighlight > 0 && screwDescent < 0.5 && (
          <g opacity={gapHighlight * (1 - screwDescent * 2)}>
            <ellipse cx="150" cy="165" rx="20" ry="10" fill="url(#impSocketGrad)" />
            <rect x="130" y="165" width="40" height="100" rx="2" fill="#0d0815" opacity={0.3} />
            {/* Dashed outline showing missing tooth */}
            <path
              d="M110,155 C110,128 118,95 130,78 C138,66 144,60 150,60 C156,60 162,66 170,78 C182,95 190,128 190,155"
              fill="none"
              stroke={COLORS.problemRed}
              strokeWidth={1}
              strokeDasharray="4,4"
              opacity={0.5}
            />
            {/* X mark */}
            <g opacity={0.3}>
              <line x1="138" y1="100" x2="162" y2="125" stroke={COLORS.problemRed} strokeWidth={1.5} />
              <line x1="162" y1="100" x2="138" y2="125" stroke={COLORS.problemRed} strokeWidth={1.5} />
            </g>
          </g>
        )}

        {/* ===== TITANIUM IMPLANT SCREW ===== */}
        <g
          transform={`translate(0, ${screwY})`}
          opacity={interpolate(screwDescent, [0, 0.1, 1], [0, 1, 1])}
          filter="url(#impShadow)"
        >
          {/* Screw body */}
          <path
            d="M138,168 L138,290 Q138,310 150,315 Q162,310 162,290 L162,168 Z"
            fill="url(#impTitaniumGrad)"
          />
          {/* Thread grooves */}
          {Array.from({ length: 9 }).map((_, i) => {
            const ty = 175 + i * 16;
            return (
              <path
                key={`thread-${i}`}
                d={`M134,${ty} L138,${ty + 4} L162,${ty + 4} L166,${ty}`}
                fill="none"
                stroke="#788090"
                strokeWidth={1}
                opacity={0.6}
              />
            );
          })}
          {/* Metal shine line */}
          <rect x="143" y="172" width="3" height="135" rx="1.5" fill="white" opacity={0.12} />
          {/* Screw tip */}
          <path
            d="M140,305 L150,320 L160,305"
            fill="url(#impTitaniumGrad)"
            stroke="#788090"
            strokeWidth={0.5}
          />
          {/* Top hex socket */}
          <path
            d="M144,168 L150,164 L156,168 L156,172 L150,176 L144,172 Z"
            fill="#707888"
            stroke="#606870"
            strokeWidth={0.5}
          />
        </g>

        {/* Osseointegration glow (pulsing teal around screw) */}
        {integrationPulse > 0 && (
          <ellipse
            cx="150"
            cy="240"
            rx="35"
            ry="60"
            fill="url(#impIntegrationGlow)"
            opacity={integrationPulse}
          />
        )}

        {/* Bone integration lines (tiny connectors from bone to screw) */}
        {screwDescent >= 1 && (
          <g opacity={interpolate(progress, [0.5, 0.65], [0, 0.4], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}>
            {[195, 215, 235, 255, 275].map((y, i) => (
              <g key={`integ-${i}`}>
                <line
                  x1={132}
                  y1={y}
                  x2={137}
                  y2={y}
                  stroke={COLORS.healthyTeal}
                  strokeWidth={0.6}
                  opacity={0.5 + Math.sin(frame * 0.03 + i) * 0.2}
                />
                <line
                  x1={163}
                  y1={y}
                  x2={168}
                  y2={y}
                  stroke={COLORS.healthyTeal}
                  strokeWidth={0.6}
                  opacity={0.5 + Math.sin(frame * 0.03 + i + 2) * 0.2}
                />
              </g>
            ))}
          </g>
        )}

        {/* ===== ABUTMENT ===== */}
        <g
          transform={`translate(0, ${abutmentY})`}
          opacity={interpolate(abutmentDescent, [0, 0.1, 1], [0, 1, 1])}
          filter="url(#impShadow)"
        >
          <path
            d="M142,140 L140,160 L138,168 L162,168 L160,160 L158,140 Z"
            fill="url(#impAbutmentGrad)"
            stroke="#808898"
            strokeWidth={0.5}
          />
          <path
            d="M143,130 L142,140 L158,140 L157,130 Z"
            fill="url(#impAbutmentGrad)"
            stroke="#808898"
            strokeWidth={0.5}
          />
          {/* Screw hole at top */}
          <circle cx="150" cy="133" r="3" fill="#707888" opacity={0.5} />
          {/* Metal highlight */}
          <rect x="146" y="132" width="2.5" height="32" rx="1" fill="white" opacity={0.15} />
          {/* Shoulder margin */}
          <line x1="138" y1="168" x2="162" y2="168" stroke="#9098a8" strokeWidth={0.8} />
        </g>

        {/* ===== CROWN ===== */}
        <g
          transform={`translate(0, ${crownY})`}
          opacity={interpolate(crownDescent, [0, 0.1, 1], [0, 1, 1])}
          filter="url(#impShadow)"
        >
          <path
            d="M108,118 C108,92 118,68 130,56 C138,48 145,44 150,44 C155,44 162,48 170,56 C182,68 192,92 192,118 L190,132 L110,132 Z"
            fill="url(#impCrownGrad)"
            stroke={COLORS.toothDark}
            strokeWidth={0.5}
          />
          {/* Crown cusps */}
          <path
            d="M128,58 Q138,50 150,52 Q162,50 172,58"
            fill="none"
            stroke={COLORS.toothDark}
            strokeWidth={0.4}
            opacity={0.3}
          />
          {/* Fissure */}
          <line x1="150" y1="52" x2="150" y2="70" stroke={COLORS.toothDark} strokeWidth={0.3} opacity={0.2} />
          {/* Crown shine */}
          <ellipse cx="135" cy="82" rx="10" ry="18" fill="white" opacity={0.15} />
        </g>

        {/* Guide arrows during screw placement */}
        {screwDescent > 0.05 && screwDescent < 0.9 && (
          <g opacity={0.35}>
            <line x1="115" y1="160" x2="115" y2="200" stroke={COLORS.purple} strokeWidth={1} strokeDasharray="3,4" />
            <path d="M111,196 L115,205 L119,196" fill={COLORS.purple} opacity={0.6} />
            <line x1="185" y1="160" x2="185" y2="200" stroke={COLORS.purple} strokeWidth={1} strokeDasharray="3,4" />
            <path d="M181,196 L185,205 L189,196" fill={COLORS.purple} opacity={0.6} />
          </g>
        )}

        {/* Final sparkle */}
        {shineOpacity > 0 && (
          <g opacity={shineOpacity} filter="url(#impSparkle)">
            <g transform="translate(170, 68)">
              <line x1="-5" y1="0" x2="5" y2="0" stroke="white" strokeWidth={1.2} opacity={0.7 + Math.sin(frame * 0.08) * 0.3} />
              <line x1="0" y1="-5" x2="0" y2="5" stroke="white" strokeWidth={1.2} opacity={0.7 + Math.sin(frame * 0.08) * 0.3} />
              <line x1="-3" y1="-3" x2="3" y2="3" stroke="white" strokeWidth={0.8} opacity={0.4 + Math.sin(frame * 0.08) * 0.2} />
              <line x1="3" y1="-3" x2="-3" y2="3" stroke="white" strokeWidth={0.8} opacity={0.4 + Math.sin(frame * 0.08) * 0.2} />
            </g>
            <g transform="translate(128, 95)">
              <line x1="-3" y1="0" x2="3" y2="0" stroke="white" strokeWidth={0.8} opacity={0.5 + Math.sin(frame * 0.06 + 1) * 0.3} />
              <line x1="0" y1="-3" x2="0" y2="3" stroke="white" strokeWidth={0.8} opacity={0.5 + Math.sin(frame * 0.06 + 1) * 0.3} />
            </g>
          </g>
        )}

        {/* Labels */}
        <g opacity={labelOpacity}>
          <line x1="195" y1="85" x2="255" y2="65" stroke={COLORS.textMuted} strokeWidth={0.7} />
          <text x="258" y="63" fill={COLORS.textSecondary} fontSize="10" fontFamily="Inter, sans-serif" fontWeight="500">
            Dental Implant
          </text>
          <text x="258" y="77" fill={COLORS.textMuted} fontSize="8" fontFamily="Inter, sans-serif">
            Titanium post + crown
          </text>

          <line x1="168" y1="240" x2="238" y2="260" stroke={COLORS.textMuted} strokeWidth={0.7} />
          <text x="240" y="258" fill={COLORS.textSecondary} fontSize="9" fontFamily="Inter, sans-serif">
            Titanium screw
          </text>
          <text x="240" y="270" fill={COLORS.textMuted} fontSize="7" fontFamily="Inter, sans-serif">
            Osseointegrated
          </text>

          <line x1="108" y1="155" x2="45" y2="150" stroke={COLORS.textMuted} strokeWidth={0.7} />
          <text x="8" y="148" fill={COLORS.textSecondary} fontSize="9" fontFamily="Inter, sans-serif">
            Abutment
          </text>

          <line x1="50" y1="220" x2="25" y2="310" stroke={COLORS.textMuted} strokeWidth={0.7} />
          <text x="8" y="323" fill={COLORS.textSecondary} fontSize="9" fontFamily="Inter, sans-serif">
            Jawbone
          </text>
        </g>
      </g>
    </svg>
  );
};
