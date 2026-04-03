import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../../../lib/colors";
import { DiagramLabelFooter } from "../DiagramLabelFooter";

interface HealingOsseointegrationVisualProps {
  progress: number;
}

export const HealingOsseointegrationVisual: React.FC<HealingOsseointegrationVisualProps> = ({ progress }) => {
  const frame = useCurrentFrame();

  const reveal = interpolate(progress, [0, 0.08], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Phase 1: Show implant seated in bone (0 - 0.15)
  const implantReveal = interpolate(progress, [0, 0.15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 2: Bone cells begin growing toward implant (0.15 - 0.4)
  const cellGrowth1 = interpolate(progress, [0.15, 0.4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 3: Dense bone integration (0.4 - 0.7)
  const cellGrowth2 = interpolate(progress, [0.4, 0.7], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 4: Full osseointegration + healed gum (0.7 - 1.0)
  const fullIntegration = interpolate(progress, [0.7, 0.95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const labelOpacity = interpolate(progress, [0.85, 0.98], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pulsing glow during healing
  const healPulse = interpolate(progress, [0.15, 0.7], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pulseIntensity = healPulse > 0 && healPulse < 1
    ? 0.25 + Math.sin(frame * 0.04) * 0.15
    : 0;

  // Bone cell positions — grow from bone toward implant surface
  // Left side cells
  const leftCells = [
    { bx: 105, by: 195, tx: 127, ty: 195, phase: 0.0 },
    { bx: 100, by: 215, tx: 125, ty: 215, phase: 0.05 },
    { bx: 95, by: 235, tx: 123, ty: 235, phase: 0.1 },
    { bx: 98, by: 255, tx: 125, ty: 255, phase: 0.15 },
    { bx: 102, by: 275, tx: 127, ty: 275, phase: 0.08 },
    { bx: 100, by: 295, tx: 126, ty: 295, phase: 0.12 },
    { bx: 108, by: 205, tx: 128, ty: 205, phase: 0.18 },
    { bx: 103, by: 245, tx: 126, ty: 245, phase: 0.07 },
    { bx: 97, by: 265, tx: 124, ty: 265, phase: 0.14 },
    { bx: 106, by: 285, tx: 128, ty: 285, phase: 0.03 },
  ];

  // Right side cells
  const rightCells = [
    { bx: 195, by: 195, tx: 173, ty: 195, phase: 0.02 },
    { bx: 200, by: 215, tx: 175, ty: 215, phase: 0.08 },
    { bx: 205, by: 235, tx: 177, ty: 235, phase: 0.13 },
    { bx: 202, by: 255, tx: 175, ty: 255, phase: 0.06 },
    { bx: 198, by: 275, tx: 173, ty: 275, phase: 0.1 },
    { bx: 200, by: 295, tx: 174, ty: 295, phase: 0.16 },
    { bx: 192, by: 205, tx: 172, ty: 205, phase: 0.11 },
    { bx: 197, by: 245, tx: 174, ty: 245, phase: 0.04 },
    { bx: 203, by: 265, tx: 176, ty: 265, phase: 0.09 },
    { bx: 194, by: 285, tx: 172, ty: 285, phase: 0.15 },
  ];

  const renderCells = (cells: typeof leftCells, growthProgress: number) => {
    return cells.map((cell, i) => {
      const cellProgress = interpolate(
        growthProgress,
        [cell.phase, Math.min(cell.phase + 0.4, 1)],
        [0, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      );

      if (cellProgress <= 0) return null;

      // Cell moves from bone (bx,by) toward implant (tx,ty)
      const cx = interpolate(cellProgress, [0, 1], [cell.bx, cell.tx]);
      const cy = cell.by;
      const cellSize = interpolate(cellProgress, [0, 0.5, 1], [1, 3.5, 3]);
      const cellOpacity = interpolate(cellProgress, [0, 0.3, 1], [0, 0.6, 0.8]);

      return (
        <g key={`cell-${i}`}>
          {/* Bone cell body */}
          <circle
            cx={cx}
            cy={cy}
            r={cellSize}
            fill={COLORS.bone}
            opacity={cellOpacity}
          />
          {/* Cell highlight */}
          <circle
            cx={cx - cellSize * 0.2}
            cy={cy - cellSize * 0.2}
            r={cellSize * 0.3}
            fill="white"
            opacity={cellOpacity * 0.2}
          />
          {/* Trailing connector to bone */}
          {cellProgress > 0.3 && (
            <line
              x1={cell.bx}
              y1={cell.by}
              x2={cx}
              y2={cy}
              stroke={COLORS.bone}
              strokeWidth={0.8}
              opacity={cellOpacity * 0.4}
            />
          )}
        </g>
      );
    });
  };

  return (
    <svg viewBox="0 0 360 400" overflow="hidden" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="hoBoneGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.bone} />
          <stop offset="60%" stopColor={COLORS.jawbone} />
          <stop offset="100%" stopColor="#b0a880" />
        </linearGradient>
        <linearGradient id="hoGumGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.gumPink} />
          <stop offset="100%" stopColor="#c08090" />
        </linearGradient>
        <linearGradient id="hoTitaniumGrad" x1="0.15" y1="0" x2="0.85" y2="1">
          <stop offset="0%" stopColor="#c8d0dc" />
          <stop offset="30%" stopColor={COLORS.implantTitanium} />
          <stop offset="70%" stopColor="#909cac" />
          <stop offset="100%" stopColor="#788090" />
        </linearGradient>
        <radialGradient id="hoHealGlow" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor={COLORS.healthyTeal} stopOpacity="0.5" />
          <stop offset="60%" stopColor={COLORS.healthyTeal} stopOpacity="0.15" />
          <stop offset="100%" stopColor={COLORS.healthyTeal} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hoIntegGlow" cx="50%" cy="50%" r="40%">
          <stop offset="0%" stopColor={COLORS.healthyGreen} stopOpacity="0.3" />
          <stop offset="100%" stopColor={COLORS.healthyGreen} stopOpacity="0" />
        </radialGradient>
        <filter id="hoShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.3" />
        </filter>
        <pattern id="hoBoneTexture" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.8" fill="#b8a888" opacity="0.3" />
          <circle cx="6" cy="6" r="0.6" fill="#c0b090" opacity="0.2" />
        </pattern>
        <clipPath id="hoReveal">
          <rect
            x="0"
            y={interpolate(reveal, [0, 1], [400, 0])}
            width="360"
            height="400"
          />
        </clipPath>
      </defs>

      <rect width="360" height="400" fill="#0a0810" />
      <g clipPath="url(#hoReveal)" transform="translate(30, 8)">
        <text x="150" y="22" fill={COLORS.textMuted} fontSize="10" fontFamily="system-ui, sans-serif" textAnchor="middle" opacity={0.55}>
          Cross-section
        </text>

        {/* Jawbone cross-section */}
        <path
          d="M40,170 L40,370 Q150,395 260,370 L260,170 Z"
          fill="url(#hoBoneGrad)"
          opacity={0.5}
        />
        <path
          d="M40,170 L40,370 Q150,395 260,370 L260,170 Z"
          fill="url(#hoBoneTexture)"
          opacity={0.3}
        />
        {/* Cortical bone (dense outer layer) */}
        <path
          d="M40,170 L40,185 Q150,198 260,185 L260,170 Z"
          fill={COLORS.bone}
          opacity={0.6}
        />

        {/* Cancellous bone internal texture */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <circle
            key={`hbt-${i}`}
            cx={65 + i * 35 + Math.sin(i * 2) * 8}
            cy={250 + Math.cos(i * 3) * 35}
            r={8 + (i % 3) * 2.5}
            fill={COLORS.bone}
            opacity={0.12}
          />
        ))}

        {/* Implant screw (cross-section) — centered */}
        <g
          opacity={interpolate(implantReveal, [0, 0.3, 1], [0, 1, 1])}
          filter="url(#hoShadow)"
        >
          {/* Screw body */}
          <rect x="130" y="175" width="40" height="140" rx="3" fill="url(#hoTitaniumGrad)" />

          {/* Thread grooves */}
          {Array.from({ length: 8 }).map((_, i) => {
            const ty = 185 + i * 16;
            return (
              <g key={`hoth-${i}`}>
                <line x1="126" y1={ty} x2="130" y2={ty + 4} stroke="#788090" strokeWidth={0.8} opacity={0.5} />
                <line x1="170" y1={ty + 4} x2="174" y2={ty} stroke="#788090" strokeWidth={0.8} opacity={0.5} />
              </g>
            );
          })}

          {/* Surface texture (microthread / roughened surface for osseointegration) */}
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={`surf-${i}`}
              x1={132}
              y1={180 + i * 11}
              x2={168}
              y2={180 + i * 11}
              stroke="#8898a8"
              strokeWidth={0.3}
              opacity={0.3}
            />
          ))}

          {/* Metal shine */}
          <rect x="140" y="178" width="4" height="132" rx="2" fill="white" opacity={0.1} />

          {/* Screw tip */}
          <path d="M133,315 L150,330 L167,315" fill="url(#hoTitaniumGrad)" />

          {/* Hex socket */}
          <path d="M140,175 L150,170 L160,175 L160,180 L150,185 L140,180 Z" fill="#707888" stroke="#606870" strokeWidth={0.4} />
        </g>

        {/* Phase 2: Early bone cell growth */}
        {cellGrowth1 > 0 && (
          <g>
            {renderCells(leftCells.slice(0, 5), cellGrowth1)}
            {renderCells(rightCells.slice(0, 5), cellGrowth1)}
          </g>
        )}

        {/* Phase 3: Dense integration */}
        {cellGrowth2 > 0 && (
          <g>
            {renderCells(leftCells.slice(5), cellGrowth2)}
            {renderCells(rightCells.slice(5), cellGrowth2)}

            {/* Dense bone formation at interface */}
            <rect
              x={125}
              y={190}
              width={5}
              height={interpolate(cellGrowth2, [0, 1], [0, 120])}
              rx={2}
              fill={COLORS.bone}
              opacity={cellGrowth2 * 0.5}
            />
            <rect
              x={170}
              y={190}
              width={5}
              height={interpolate(cellGrowth2, [0, 1], [0, 120])}
              rx={2}
              fill={COLORS.bone}
              opacity={cellGrowth2 * 0.5}
            />
          </g>
        )}

        {/* Healing glow during active integration */}
        {pulseIntensity > 0 && (
          <ellipse
            cx="150"
            cy="250"
            rx="50"
            ry="70"
            fill="url(#hoHealGlow)"
            opacity={pulseIntensity}
          />
        )}

        {/* Full integration glow */}
        {fullIntegration > 0 && (
          <g>
            {/* Solid bone-implant interface */}
            <rect x={124} y={185} width={6} height={130} rx={2} fill={COLORS.bone} opacity={fullIntegration * 0.7} />
            <rect x={170} y={185} width={6} height={130} rx={2} fill={COLORS.bone} opacity={fullIntegration * 0.7} />

            {/* Green success glow */}
            <ellipse
              cx="150"
              cy="250"
              rx="45"
              ry="65"
              fill="url(#hoIntegGlow)"
              opacity={fullIntegration * 0.6}
            />

            {/* Checkmark */}
            <g
              transform="translate(150, 355)"
              opacity={interpolate(fullIntegration, [0.5, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            >
              <circle cx="0" cy="0" r="12" fill={COLORS.healthyGreen} opacity={0.2} />
              <path
                d="M-6,0 L-2,4 L6,-4"
                fill="none"
                stroke={COLORS.healthyGreen}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </g>
        )}

        {/* Gum tissue on top */}
        <path
          d="M25,140 Q90,125 150,122 Q210,125 275,140 L275,178 Q210,162 150,158 Q90,162 25,178 Z"
          fill="url(#hoGumGrad)"
          opacity={0.85}
        />
        {/* Healing cap (visible through gum) */}
        <circle cx="150" cy="155" r="8" fill="#a0a8b8" opacity={implantReveal * 0.6} stroke="#808898" strokeWidth={0.5} />

      </g>
      <DiagramLabelFooter
        opacity={labelOpacity}
        vbWidth={360}
        y={308}
        items={[
          { title: "New bone", subtitle: "At the interface" },
          { title: "Osseointegration", subtitle: "Bone + titanium" },
          { title: "Healing cap", subtitle: "Protects the site" },
        ]}
      />
    </svg>
  );
};
