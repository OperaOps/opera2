import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../../../lib/colors";

interface RootCanalVisualProps {
  progress: number;
}

export const RootCanalVisual: React.FC<RootCanalVisualProps> = ({
  progress,
}) => {
  const frame = useCurrentFrame();

  const reveal = interpolate(progress, [0, 0.1], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Phase 1: Infected tooth with inflamed pulp (0 - 0.2)
  const infectionVisible = interpolate(progress, [0.05, 0.18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 2: Pulp removal / cleaning (0.2 - 0.5)
  const cleaningProgress = interpolate(progress, [0.2, 0.48], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 3: Canal filling with gutta-percha (0.5 - 0.7)
  const fillingProgress = interpolate(progress, [0.5, 0.68], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 4: Tooth sealed and crowned (0.7 - 1.0)
  const crownDescent = interpolate(progress, [0.7, 0.88], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const crownY = interpolate(crownDescent, [0, 1], [-80, 0]);

  const labelOpacity = interpolate(progress, [0.85, 0.98], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Infection color intensity (fades during cleaning)
  const infectionIntensity = interpolate(
    cleaningProgress,
    [0, 0.5, 1],
    [1, 0.5, 0]
  );

  // Infection pulsing glow
  const infectionPulse =
    infectionVisible > 0 && cleaningProgress < 0.5
      ? (0.5 + Math.sin(frame * 0.08) * 0.3) * (1 - cleaningProgress * 2)
      : 0;

  // Cleaning instrument depth
  const instrumentDepth = interpolate(cleaningProgress, [0, 0.4, 0.8, 1], [0, 120, 120, 0]);

  // File instrument visibility
  const fileVisible = cleaningProgress > 0.05 && cleaningProgress < 0.95;

  return (
    <svg viewBox="0 0 300 400" overflow="visible" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="rcEnamelGrad" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#f5f2fa" />
          <stop offset="40%" stopColor={COLORS.toothWhite} />
          <stop offset="80%" stopColor={COLORS.enamel} />
          <stop offset="100%" stopColor={COLORS.toothShadow} />
        </linearGradient>
        <linearGradient id="rcDentinGrad" x1="0.3" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="#f7ecd0" />
          <stop offset="100%" stopColor={COLORS.dentin} />
        </linearGradient>
        <radialGradient id="rcInfectedPulp" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#ff3040" />
          <stop offset="50%" stopColor="#d02030" />
          <stop offset="100%" stopColor="#a01820" />
        </radialGradient>
        <radialGradient id="rcHealthyPulp" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#e86070" />
          <stop offset="100%" stopColor={COLORS.pulp} />
        </radialGradient>
        <radialGradient id="rcInfectionGlow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor={COLORS.problemRed} stopOpacity="0.5" />
          <stop offset="60%" stopColor={COLORS.problemRed} stopOpacity="0.15" />
          <stop offset="100%" stopColor={COLORS.problemRed} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="rcGumGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.gumPink} />
          <stop offset="100%" stopColor="#c08090" />
        </linearGradient>
        <linearGradient id="rcBoneGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.bone} />
          <stop offset="100%" stopColor={COLORS.jawbone} />
        </linearGradient>
        <linearGradient id="rcGuttaPercha" x1="0.3" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="#e8a060" />
          <stop offset="50%" stopColor="#d08848" />
          <stop offset="100%" stopColor="#b87038" />
        </linearGradient>
        <linearGradient id="rcCrownGrad" x1="0.15" y1="0" x2="0.85" y2="1">
          <stop offset="0%" stopColor="#fcf8f4" />
          <stop offset="30%" stopColor={COLORS.toothWhite} />
          <stop offset="70%" stopColor={COLORS.enamel} />
          <stop offset="100%" stopColor={COLORS.toothShadow} />
        </linearGradient>
        <filter id="rcShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.25" />
        </filter>
        <filter id="rcRedGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="rcShine" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id="rcReveal">
          <rect x="0" y={interpolate(reveal, [0, 1], [400, 0])} width="300" height="400" />
        </clipPath>
        <clipPath id="rcFillClipL">
          <rect x="125" y={340 - fillingProgress * 180} width="25" height={fillingProgress * 180 + 5} />
        </clipPath>
        <clipPath id="rcFillClipR">
          <rect x="150" y={340 - fillingProgress * 180} width="25" height={fillingProgress * 180 + 5} />
        </clipPath>
      </defs>

      <g clipPath="url(#rcReveal)">
        {/* Bone */}
        <rect x="40" y="170" width="220" height="215" rx="18" fill="url(#rcBoneGrad)" opacity={0.5} />

        {/* Gum */}
        <ellipse cx="150" cy="165" rx="115" ry="28" fill="url(#rcGumGrad)" opacity={0.85} />

        <g filter="url(#rcShadow)">
          {/* Roots */}
          <path d="M115,165 L110,258 C107,292 114,332 126,350 C130,357 136,357 138,350 L148,282 L150,165 Z" fill={COLORS.root} />
          <path d="M150,165 L153,282 L163,350 C165,357 171,357 175,350 C187,332 194,292 191,258 L186,165 Z" fill={COLORS.root} />

          {/* Pulp canals - infected (red) fading to cleaned */}
          <g opacity={1 - fillingProgress}>
            <path
              d="M135,162 L132,258 C131,282 133,318 136,332 C137,337 139,337 140,332 L144,272 L146,162 Z"
              fill={infectionIntensity > 0.1 ? "url(#rcInfectedPulp)" : "url(#rcHealthyPulp)"}
              opacity={infectionIntensity > 0.1 ? infectionIntensity : 0.3}
            />
            <path
              d="M154,162 L157,272 L161,332 C162,337 164,337 165,332 C168,318 169,282 168,258 L164,162 Z"
              fill={infectionIntensity > 0.1 ? "url(#rcInfectedPulp)" : "url(#rcHealthyPulp)"}
              opacity={infectionIntensity > 0.1 ? infectionIntensity : 0.3}
            />
          </g>

          {/* Nerve fiber detail inside pulp */}
          {infectionIntensity > 0.2 && (
            <g opacity={infectionIntensity * 0.4}>
              <path d="M140,130 Q136,150 135,180 Q134,210 133,240" fill="none" stroke="#c04050" strokeWidth={0.5} />
              <path d="M160,130 Q164,150 165,180 Q166,210 167,240" fill="none" stroke="#c04050" strokeWidth={0.5} />
            </g>
          )}

          {/* Canal filling material (gutta-percha) - fills from bottom up */}
          {fillingProgress > 0 && (
            <g>
              <path
                d="M135,162 L132,258 C131,282 133,318 136,332 C137,337 139,337 140,332 L144,272 L146,162 Z"
                fill="url(#rcGuttaPercha)"
                clipPath="url(#rcFillClipL)"
              />
              <path
                d="M154,162 L157,272 L161,332 C162,337 164,337 165,332 C168,318 169,282 168,258 L164,162 Z"
                fill="url(#rcGuttaPercha)"
                clipPath="url(#rcFillClipR)"
              />
            </g>
          )}

          {/* Enamel */}
          <path
            d="M85,148 C85,116 95,84 112,66 C126,52 142,44 150,44 C158,44 174,52 188,66 C205,84 215,116 215,148 L213,165 L87,165 Z"
            fill="url(#rcEnamelGrad)"
            stroke={COLORS.toothDark}
            strokeWidth={0.5}
          />

          {/* Dentin */}
          <path
            d="M95,146 C95,120 103,92 116,76 C128,62 142,54 150,54 C158,54 172,62 184,76 C197,92 205,120 205,146 L203,163 L97,163 Z"
            fill="url(#rcDentinGrad)"
          />

          {/* Pulp chamber - infected or cleaned */}
          <path
            d="M132,106 C132,92 138,82 150,82 C162,82 168,92 168,106 L168,163 L132,163 Z"
            fill={infectionIntensity > 0.1 ? "url(#rcInfectedPulp)" : "#e8d0c0"}
            opacity={1 - fillingProgress * 0.7}
          />

          {/* Filling in pulp chamber */}
          {fillingProgress > 0.6 && (
            <path
              d="M132,106 C132,92 138,82 150,82 C162,82 168,92 168,106 L168,163 L132,163 Z"
              fill="url(#rcGuttaPercha)"
              opacity={interpolate(fillingProgress, [0.6, 1], [0, 0.9], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            />
          )}

          {/* Access hole in crown (during procedure) */}
          {cleaningProgress > 0 && crownDescent < 0.5 && (
            <ellipse
              cx="150"
              cy="62"
              rx="10"
              ry="8"
              fill="#1a1020"
              opacity={0.6 * (1 - crownDescent * 2)}
            />
          )}

          {/* Enamel highlight */}
          <ellipse cx="128" cy="85" rx="10" ry="20" fill="white" opacity={0.1} />
        </g>

        {/* Infection glow (pulsing red) */}
        {infectionPulse > 0 && (
          <g filter="url(#rcRedGlow)" opacity={infectionPulse * 0.5}>
            <ellipse
              cx="150"
              cy="110"
              rx={30 + Math.sin(frame * 0.04) * 3}
              ry={40 + Math.sin(frame * 0.04) * 3}
              fill="url(#rcInfectionGlow)"
            />
            {/* Periapical lesion at root tips */}
            <circle cx="136" cy="350" r="10" fill={COLORS.problemRed} opacity={0.25} />
            <circle cx="165" cy="350" r="10" fill={COLORS.problemRed} opacity={0.25} />
          </g>
        )}

        {/* Periapical lesions (visible without glow too) */}
        {infectionVisible > 0 && cleaningProgress < 0.8 && (
          <g opacity={(1 - cleaningProgress) * 0.35}>
            <ellipse cx="134" cy="352" rx="9" ry="7" fill={COLORS.problemRed} opacity={0.3} />
            <ellipse cx="166" cy="352" rx="9" ry="7" fill={COLORS.problemRed} opacity={0.3} />
          </g>
        )}

        {/* Endodontic file instrument */}
        {fileVisible && (
          <g opacity={0.7}>
            {/* File handle */}
            <rect x="144" y={20} width="12" height="18" rx="2" fill="#4080c0" opacity={0.8} />
            <rect x="146" y={22} width="8" height="5" rx="1" fill="#5090d0" />
            {/* File shaft */}
            <line x1="150" y1={38} x2="150" y2={60 + instrumentDepth} stroke="#808890" strokeWidth={1.5} />
            {/* Spiral flutes on file */}
            {Array.from({ length: Math.floor(instrumentDepth / 15) }).map((_, i) => {
              const fy = 70 + i * 15;
              if (fy > 60 + instrumentDepth) return null;
              return (
                <path
                  key={`file-${i}`}
                  d={`M148,${fy} L152,${fy + 5}`}
                  stroke="#909aa0"
                  strokeWidth={0.6}
                  opacity={0.5}
                />
              );
            })}
          </g>
        )}

        {/* Removal particles floating up */}
        {cleaningProgress > 0.2 && cleaningProgress < 0.9 && (
          <g opacity={0.5}>
            {[
              { x: 145, baseY: 130, speed: 0.05, delay: 0 },
              { x: 155, baseY: 140, speed: 0.04, delay: 1.5 },
              { x: 148, baseY: 120, speed: 0.06, delay: 0.8 },
              { x: 152, baseY: 150, speed: 0.045, delay: 2.0 },
            ].map((p, i) => {
              const floatY = p.baseY - ((frame * p.speed + p.delay * 20) % 50);
              const particleOpacity = floatY > 80 ? 0.6 : 0;
              return (
                <circle
                  key={`particle-${i}`}
                  cx={p.x + Math.sin(frame * 0.03 + p.delay) * 3}
                  cy={floatY}
                  r={1.5}
                  fill={COLORS.pulp}
                  opacity={particleOpacity}
                />
              );
            })}
          </g>
        )}

        {/* Crown (sealed restoration) */}
        <g
          transform={`translate(0, ${crownY})`}
          opacity={interpolate(crownDescent, [0, 0.1, 1], [0, 1, 1])}
          filter="url(#rcShadow)"
        >
          <path
            d="M88,146 C88,114 98,82 114,64 C128,50 142,42 150,42 C158,42 172,50 186,64 C202,82 212,114 212,146 L210,165 L90,165 Z"
            fill="url(#rcCrownGrad)"
            stroke={COLORS.toothDark}
            strokeWidth={0.5}
          />
          {/* Crown cusps */}
          <path
            d="M125,62 Q138,52 150,54 Q162,52 175,62"
            fill="none"
            stroke={COLORS.toothDark}
            strokeWidth={0.3}
            opacity={0.2}
          />
          <ellipse cx="132" cy="82" rx="10" ry="18" fill="white" opacity={0.15} />
        </g>

        {/* Checkmark on completed treatment */}
        {crownDescent > 0.9 && (
          <g
            opacity={interpolate(crownDescent, [0.9, 1.0], [0, 0.7], { extrapolateRight: "clamp" })}
            filter="url(#rcShine)"
          >
            <circle cx="200" cy="50" r="12" fill={COLORS.healthyGreen} opacity={0.2} />
            <path
              d="M194,50 L198,54 L206,46"
              fill="none"
              stroke={COLORS.healthyGreen}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.8}
            />
          </g>
        )}

        {/* Step progress indicators */}
        {(() => {
          const currentStep =
            crownDescent > 0.3 ? 4 :
            fillingProgress > 0.3 ? 3 :
            cleaningProgress > 0.3 ? 2 : 1;

          return (
            <g opacity={0.85}>
              {[1, 2, 3, 4].map((step) => {
                const labels = ["Infected", "Cleaning", "Filling", "Crown"];
                return (
                  <g key={step} transform={`translate(${48 + (step - 1) * 56}, 370)`}>
                    <circle
                      cx="0"
                      cy="0"
                      r="10"
                      fill={step <= currentStep ? COLORS.purple : "transparent"}
                      stroke={COLORS.purple}
                      strokeWidth={1.5}
                      opacity={step <= currentStep ? 0.9 : 0.3}
                    />
                    <text
                      x="0"
                      y="4"
                      textAnchor="middle"
                      fill={step <= currentStep ? "white" : COLORS.textMuted}
                      fontSize="8"
                      fontFamily="Inter, sans-serif"
                      fontWeight="700"
                    >
                      {step}
                    </text>
                    <text
                      x="0"
                      y="22"
                      textAnchor="middle"
                      fill={step === currentStep ? COLORS.textSecondary : COLORS.textMuted}
                      fontSize="7"
                      fontFamily="Inter, sans-serif"
                    >
                      {labels[step - 1]}
                    </text>
                  </g>
                );
              })}
              <line
                x1="58"
                y1="370"
                x2={58 + (currentStep - 1) * 56}
                y2="370"
                stroke={COLORS.purple}
                strokeWidth={2}
                opacity={0.4}
              />
            </g>
          );
        })()}

        {/* Labels */}
        <g opacity={labelOpacity}>
          <line x1="105" y1="130" x2="35" y2="110" stroke={COLORS.textMuted} strokeWidth={0.7} />
          <text x="5" y="106" fill={COLORS.textSecondary} fontSize="10" fontFamily="Inter, sans-serif" fontWeight="500">
            Root Canal
          </text>
          <text x="5" y="119" fill={COLORS.textSecondary} fontSize="10" fontFamily="Inter, sans-serif" fontWeight="500">
            Treatment
          </text>

          {fillingProgress > 0.3 && (
            <>
              <line x1="172" y1="250" x2="240" y2="268" stroke={COLORS.textMuted} strokeWidth={0.7} />
              <text x="243" y="266" fill={COLORS.textSecondary} fontSize="9" fontFamily="Inter, sans-serif">
                Gutta-percha fill
              </text>
            </>
          )}
        </g>
      </g>
    </svg>
  );
};
