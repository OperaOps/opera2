import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../../../lib/colors";
import { DiagramLabelFooter } from "../DiagramLabelFooter";

interface RidgeAugmentationVisualProps {
  progress: number;
}

export const RidgeAugmentationVisual: React.FC<RidgeAugmentationVisualProps> = ({ progress }) => {
  const frame = useCurrentFrame();

  const reveal = interpolate(progress, [0, 0.08], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Phase 1: Show deficient ridge with extraction sockets (0 - 0.15)
  const defectReveal = interpolate(progress, [0, 0.15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 2: Bone graft material placement (0.15 - 0.45)
  const graftFill = interpolate(progress, [0.15, 0.45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 3: Membrane placement over graft (0.45 - 0.65)
  const membraneDescent = interpolate(progress, [0.45, 0.65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const membraneY = interpolate(membraneDescent, [0, 1], [-40, 0]);

  // Phase 4: Healing / integration (0.65 - 0.85)
  const healingProgress = interpolate(progress, [0.65, 0.85], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 5: Restored ridge profile (0.85 - 1.0)
  const finalReveal = interpolate(progress, [0.85, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const labelOpacity = interpolate(progress, [0.88, 0.98], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Healing pulse animation
  const healPulse =
    healingProgress > 0 && healingProgress < 1
      ? 0.2 + Math.sin(frame * 0.05) * 0.15
      : 0;

  // Graft particle positions (deterministic)
  const graftParticles = [
    { x: 125, y: 200, r: 4 },
    { x: 140, y: 210, r: 3.5 },
    { x: 155, y: 195, r: 4.5 },
    { x: 135, y: 225, r: 3 },
    { x: 150, y: 220, r: 4 },
    { x: 165, y: 215, r: 3.5 },
    { x: 145, y: 240, r: 3 },
    { x: 160, y: 235, r: 4 },
    { x: 130, y: 245, r: 3.5 },
    { x: 170, y: 230, r: 3 },
    { x: 148, y: 205, r: 2.5 },
    { x: 138, y: 235, r: 3 },
    { x: 162, y: 245, r: 2.5 },
    { x: 155, y: 250, r: 3 },
    { x: 142, y: 255, r: 2.5 },
  ];

  return (
    <svg viewBox="0 0 360 400" overflow="hidden" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ridgeBoneGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.bone} />
          <stop offset="60%" stopColor={COLORS.jawbone} />
          <stop offset="100%" stopColor="#b0a880" />
        </linearGradient>
        <linearGradient id="ridgeGumGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.gumPink} />
          <stop offset="100%" stopColor="#c08090" />
        </linearGradient>
        <linearGradient id="graftGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f0e8d0" />
          <stop offset="50%" stopColor="#e0d4b0" />
          <stop offset="100%" stopColor="#d0c4a0" />
        </linearGradient>
        <linearGradient id="membraneGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e0e8f4" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#c0d0e8" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="healedBoneGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dcd0b0" />
          <stop offset="50%" stopColor={COLORS.bone} />
          <stop offset="100%" stopColor={COLORS.jawbone} />
        </linearGradient>
        <linearGradient id="ridgeToothGrad" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#f8f5ff" />
          <stop offset="40%" stopColor={COLORS.toothWhite} />
          <stop offset="80%" stopColor={COLORS.enamel} />
          <stop offset="100%" stopColor={COLORS.toothShadow} />
        </linearGradient>
        <radialGradient id="healGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={COLORS.healthyTeal} stopOpacity="0.4" />
          <stop offset="100%" stopColor={COLORS.healthyTeal} stopOpacity="0" />
        </radialGradient>
        <filter id="ridgeShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.3" />
        </filter>
        <pattern id="graftTexture" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.2" fill="#c8b888" opacity="0.4" />
        </pattern>
        <clipPath id="ridgeReveal">
          <rect
            x="0"
            y={interpolate(reveal, [0, 1], [400, 0])}
            width="360"
            height="400"
          />
        </clipPath>
        <clipPath id="defectClip">
          <path d="M100,170 L100,280 Q150,300 200,280 L200,170 Z" />
        </clipPath>
      </defs>

      <rect width="360" height="400" fill="#0a0810" />
      <g clipPath="url(#ridgeReveal)" transform="translate(30, 4)">
        {/* Jawbone cross-section — with defect */}
        <path
          d="M15,170 L15,370 Q150,400 285,370 L285,170 Z"
          fill="url(#ridgeBoneGrad)"
          opacity={0.5}
        />
        {/* Bone texture */}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <circle
            key={`bt-${i}`}
            cx={45 + i * 35 + Math.sin(i * 2.5) * 8}
            cy={260 + Math.cos(i * 3.1) * 35}
            r={7 + (i % 3) * 2.5}
            fill={COLORS.bone}
            opacity={0.1}
          />
        ))}

        {/* Ridge defect (concavity in the bone) */}
        <path
          d="M100,170 Q110,190 120,210 Q135,250 150,265 Q165,250 180,210 Q190,190 200,170"
          fill={COLORS.bgDark}
          opacity={defectReveal * (1 - healingProgress * 0.8)}
        />
        {/* Defect red highlight */}
        {defectReveal > 0 && graftFill < 0.3 && (
          <path
            d="M100,170 Q110,190 120,210 Q135,250 150,265 Q165,250 180,210 Q190,190 200,170"
            fill="none"
            stroke={COLORS.problemRed}
            strokeWidth={1.2}
            strokeDasharray="4,3"
            opacity={defectReveal * 0.6 * (1 - graftFill * 3)}
          />
        )}

        {/* Graft particles filling the defect */}
        {graftFill > 0 && (
          <g clipPath="url(#defectClip)">
            {graftParticles.map((p, i) => {
              const particleProgress = interpolate(
                graftFill,
                [i / graftParticles.length, Math.min((i + 2) / graftParticles.length, 1)],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );
              const particleScale = interpolate(particleProgress, [0, 0.5, 1], [0, 1.2, 1]);
              return (
                <g key={`graft-${i}`} opacity={particleProgress}>
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={p.r * particleScale}
                    fill="url(#graftGrad)"
                    stroke="#c0b498"
                    strokeWidth={0.3}
                  />
                  <circle
                    cx={p.x - p.r * 0.3}
                    cy={p.y - p.r * 0.3}
                    r={p.r * 0.3}
                    fill="white"
                    opacity={0.15}
                  />
                </g>
              );
            })}
            {/* Graft texture overlay */}
            <path
              d="M100,170 Q110,190 120,210 Q135,250 150,265 Q165,250 180,210 Q190,190 200,170"
              fill="url(#graftTexture)"
              opacity={graftFill * 0.5}
            />
          </g>
        )}

        {/* Collagen membrane */}
        {membraneDescent > 0 && (
          <g
            transform={`translate(0, ${membraneY})`}
            opacity={interpolate(membraneDescent, [0, 0.15, 1], [0, 1, 1])}
          >
            <path
              d="M92,165 Q110,160 150,158 Q190,160 208,165 L205,178 Q190,174 150,172 Q110,174 95,178 Z"
              fill="url(#membraneGrad)"
              stroke="#a0b0c8"
              strokeWidth={0.6}
              filter="url(#ridgeShadow)"
            />
            {/* Membrane texture lines */}
            {[0, 1, 2, 3].map((i) => (
              <line
                key={`mem-${i}`}
                x1={105 + i * 25}
                y1={166}
                x2={108 + i * 25}
                y2={175}
                stroke="#b0c0d8"
                strokeWidth={0.3}
                opacity={0.4}
              />
            ))}
          </g>
        )}

        {/* Healing glow */}
        {healPulse > 0 && (
          <ellipse
            cx="150"
            cy="215"
            rx="55"
            ry="45"
            fill="url(#healGlow)"
            opacity={healPulse}
          />
        )}

        {/* Healed bone (new ridge profile) */}
        {healingProgress > 0 && (
          <path
            d="M100,170 Q115,172 130,170 Q140,168 150,167 Q160,168 170,170 Q185,172 200,170"
            fill="url(#healedBoneGrad)"
            opacity={healingProgress * 0.8}
            stroke={COLORS.bone}
            strokeWidth={0.5}
          />
        )}

        {/* Gum tissue (covers everything on top) */}
        <path
          d="M5,135 Q80,120 150,117 Q220,120 295,135 L295,175 Q220,155 150,152 Q80,155 5,175 Z"
          fill="url(#ridgeGumGrad)"
          opacity={0.85}
        />

        {/* Adjacent teeth */}
        <g filter="url(#ridgeShadow)">
          {/* Left tooth */}
          <path
            d="M25,128 C25,100 35,70 48,56 C56,46 62,42 68,42 C74,42 80,46 88,56 C93,64 96,78 96,92 L96,160 L25,160 Z"
            fill="url(#ridgeToothGrad)"
            stroke={COLORS.toothDark}
            strokeWidth={0.4}
          />
          <path
            d="M38,160 L36,235 C34,265 40,295 50,310 C54,315 58,315 60,310 L66,255 L68,160 Z"
            fill={COLORS.root}
          />
          <ellipse cx="52" cy="86" rx="7" ry="14" fill="white" opacity={0.1} />
        </g>

        <g filter="url(#ridgeShadow)">
          {/* Right tooth */}
          <path
            d="M204,128 C204,100 214,70 226,56 C234,46 240,42 246,42 C252,42 258,46 266,56 C271,64 274,78 274,92 L274,160 L204,160 Z"
            fill="url(#ridgeToothGrad)"
            stroke={COLORS.toothDark}
            strokeWidth={0.4}
          />
          <path
            d="M216,160 L214,235 C212,265 218,295 228,310 C232,315 236,315 238,310 L244,255 L246,160 Z"
            fill={COLORS.root}
          />
          <ellipse cx="232" cy="86" rx="7" ry="14" fill="white" opacity={0.1} />
        </g>

        {/* Final ridge profile indicator (green check) */}
        {finalReveal > 0 && (
          <g opacity={finalReveal}>
            {/* Restored ridge outline */}
            <path
              d="M95,168 Q150,162 205,168"
              fill="none"
              stroke={COLORS.healthyGreen}
              strokeWidth={1.5}
              strokeDasharray={`${finalReveal * 120},120`}
            />
            {/* Sparkle */}
            <g transform="translate(150, 155)" opacity={0.6 + Math.sin(frame * 0.07) * 0.3}>
              <line x1="-5" y1="0" x2="5" y2="0" stroke="white" strokeWidth={1} />
              <line x1="0" y1="-5" x2="0" y2="5" stroke="white" strokeWidth={1} />
            </g>
          </g>
        )}

      </g>
      <DiagramLabelFooter
        opacity={labelOpacity}
        vbWidth={360}
        y={308}
        items={[
          { title: "Bone graft", subtitle: "Ridge volume" },
          { title: "Membrane", subtitle: "Guided healing" },
          { title: "Jawbone", subtitle: "Foundation" },
        ]}
      />
    </svg>
  );
};
