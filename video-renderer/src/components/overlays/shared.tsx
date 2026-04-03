import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

// =====================================================
// TYPES
// =====================================================

export interface OverlayProps {
  frame: number;
  durationFrames: number;
  fps: number;
}

// =====================================================
// OVERLAY CONTAINER
// =====================================================
// Positions the overlay SVG centered in the frame, filling the upper 70%

export const OverlayContainer: React.FC<{
  children: React.ReactNode;
  opacity?: number;
}> = ({ children, opacity = 1 }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: "8%",
        opacity,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          width: "80%",
          height: "70%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
};

// =====================================================
// GLOW FILTERS
// =====================================================
// Reusable SVG filter definitions for glow effects

export const GlowFilters: React.FC = () => (
  <defs>
    {/* White glow */}
    <filter id="glow-white" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="4" result="blur" />
      <feFlood floodColor="#ffffff" floodOpacity="0.6" result="color" />
      <feComposite in="color" in2="blur" operator="in" result="shadow" />
      <feMerge>
        <feMergeNode in="shadow" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    {/* Blue glow */}
    <filter id="glow-blue" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="5" result="blur" />
      <feFlood floodColor="#60a5fa" floodOpacity="0.7" result="color" />
      <feComposite in="color" in2="blur" operator="in" result="shadow" />
      <feMerge>
        <feMergeNode in="shadow" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    {/* Red glow (infection) */}
    <filter id="glow-red" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feFlood floodColor="#ef4444" floodOpacity="0.7" result="color" />
      <feComposite in="color" in2="blur" operator="in" result="shadow" />
      <feMerge>
        <feMergeNode in="shadow" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    {/* Green glow (healthy) */}
    <filter id="glow-green" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="5" result="blur" />
      <feFlood floodColor="#34d399" floodOpacity="0.7" result="color" />
      <feComposite in="color" in2="blur" operator="in" result="shadow" />
      <feMerge>
        <feMergeNode in="shadow" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    {/* Purple glow (accent) */}
    <filter id="glow-purple" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="5" result="blur" />
      <feFlood floodColor="#a78bfa" floodOpacity="0.7" result="color" />
      <feComposite in="color" in2="blur" operator="in" result="shadow" />
      <feMerge>
        <feMergeNode in="shadow" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    {/* Gold glow (crown) */}
    <filter id="glow-gold" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="5" result="blur" />
      <feFlood floodColor="#fbbf24" floodOpacity="0.6" result="color" />
      <feComposite in="color" in2="blur" operator="in" result="shadow" />
      <feMerge>
        <feMergeNode in="shadow" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    {/* Soft inner glow for dentin */}
    <filter id="inner-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
);

// =====================================================
// MOLAR TOOTH (side cross-section view)
// =====================================================
// Clean stylized molar cross-section with enamel, dentin, cusps, two roots, pulp chamber, root canals

export const MolarTooth: React.FC<{
  showPulp?: boolean;
  showCanals?: boolean;
  fillColor?: string;
  strokeColor?: string;
  rootColor?: string;
}> = ({
  showPulp = true,
  showCanals = true,
  fillColor = "#f0e6d3",
  strokeColor = "#e0e7ff",
  rootColor = "#d4c4a8",
}) => {
  return (
    <svg viewBox="0 0 200 260" width="100%" height="100%">
      <GlowFilters />

      {/* ── Roots ── */}
      {/* Left root */}
      <path
        d="M 62 155 C 62 155, 58 185, 52 210 C 48 228, 44 248, 50 255 C 54 258, 58 252, 60 240 C 64 218, 68 190, 72 165"
        fill={rootColor}
        stroke={strokeColor}
        strokeWidth="1.5"
        opacity="0.95"
      />
      {/* Right root */}
      <path
        d="M 128 155 C 128 155, 132 185, 138 210 C 142 228, 146 248, 140 255 C 136 258, 132 252, 130 240 C 126 218, 122 190, 118 165"
        fill={rootColor}
        stroke={strokeColor}
        strokeWidth="1.5"
        opacity="0.95"
      />

      {/* ── Root canals (inside roots) ── */}
      {showCanals && (
        <>
          {/* Left canal */}
          <path
            d="M 66 148 C 64 165, 58 195, 52 225 C 51 230, 53 235, 54 230 C 58 210, 62 180, 64 155"
            fill="none"
            stroke="#dc2626"
            strokeWidth="2"
            opacity="0.7"
          />
          {/* Right canal */}
          <path
            d="M 124 148 C 126 165, 132 195, 138 225 C 139 230, 137 235, 136 230 C 132 210, 128 180, 126 155"
            fill="none"
            stroke="#dc2626"
            strokeWidth="2"
            opacity="0.7"
          />
        </>
      )}

      {/* ── Dentin body ── */}
      <path
        d="M 40 70 C 38 85, 36 110, 40 135 C 44 152, 55 160, 65 162 L 65 155 C 68 155, 72 160, 75 158 L 80 148 C 85 145, 90 145, 95 145 L 100 145 C 105 145, 110 145, 115 148 L 120 158 C 123 160, 127 155, 130 155 L 130 162 C 140 160, 150 152, 154 135 C 158 110, 156 85, 154 70 Z"
        fill={fillColor}
        stroke="none"
        opacity="0.9"
      />

      {/* ── Enamel outer shell ── */}
      <path
        d="M 40 70 C 32 60, 30 45, 35 32 C 38 24, 48 16, 55 14 C 60 12, 68 10, 75 14 C 80 17, 84 28, 88 32 C 92 28, 96 22, 100 20 C 104 22, 108 28, 112 32 C 116 28, 120 17, 125 14 C 132 10, 140 12, 145 14 C 152 16, 162 24, 165 32 C 170 45, 168 60, 160 70 C 156 85, 158 110, 154 135 C 150 152, 140 160, 130 162 C 120 165, 110 163, 100 163 C 90 163, 80 165, 70 162 C 60 160, 50 152, 46 135 C 42 110, 44 85, 40 70 Z"
        fill="none"
        stroke={strokeColor}
        strokeWidth="2.5"
        opacity="0.95"
      />

      {/* ── Enamel layer (translucent top cap) ── */}
      <path
        d="M 40 70 C 32 60, 30 45, 35 32 C 38 24, 48 16, 55 14 C 60 12, 68 10, 75 14 C 80 17, 84 28, 88 32 C 92 28, 96 22, 100 20 C 104 22, 108 28, 112 32 C 116 28, 120 17, 125 14 C 132 10, 140 12, 145 14 C 152 16, 162 24, 165 32 C 170 45, 168 60, 160 70 C 154 80, 46 80, 40 70 Z"
        fill="rgba(224, 231, 255, 0.2)"
        stroke="none"
      />

      {/* ── Dentin-enamel junction line ── */}
      <path
        d="M 46 72 C 50 80, 60 84, 75 82 C 85 80, 92 76, 100 74 C 108 76, 115 80, 125 82 C 140 84, 150 80, 154 72"
        fill="none"
        stroke={strokeColor}
        strokeWidth="1"
        strokeDasharray="4 3"
        opacity="0.4"
      />

      {/* ── Pulp chamber ── */}
      {showPulp && (
        <path
          d="M 78 85 C 76 95, 74 110, 76 130 C 78 140, 85 145, 95 145 L 100 145 C 110 145, 117 140, 119 130 C 121 110, 119 95, 117 85 C 112 78, 104 75, 100 75 C 96 75, 88 78, 78 85 Z"
          fill="rgba(220, 38, 38, 0.5)"
          stroke="#dc2626"
          strokeWidth="1.2"
          opacity="0.8"
        />
      )}

      {/* ── Cusp highlights (small specular arcs) ── */}
      <path
        d="M 56 28 C 60 20, 68 18, 72 22"
        fill="none"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M 108 26 C 112 18, 120 16, 124 20"
        fill="none"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* ── Root outline ── */}
      <path
        d="M 62 155 C 62 155, 58 185, 52 210 C 48 228, 44 248, 50 255 C 54 258, 58 252, 60 240 C 64 218, 68 190, 72 165"
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
        opacity="0.9"
      />
      <path
        d="M 128 155 C 128 155, 132 185, 138 210 C 142 228, 146 248, 140 255 C 136 258, 132 252, 130 240 C 126 218, 122 190, 118 165"
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
        opacity="0.9"
      />
    </svg>
  );
};

// =====================================================
// TOOTH ROW (front view, for orthodontic treatments)
// =====================================================
// 8 front teeth in a gentle dental arch

export const ToothRow: React.FC<{
  crookedness: number;
  color?: string;
  strokeColor?: string;
}> = ({ crookedness, color = "#f0e6d3", strokeColor = "#e0e7ff" }) => {
  // Define 8 teeth positions along a gentle arch
  // Each tooth: { cx, cy, width, height, rotation }
  const baseTeeth = [
    { cx: 50, cy: 80, w: 28, h: 58 },   // left lateral incisor (outer)
    { cx: 82, cy: 72, w: 26, h: 62 },   // left lateral incisor
    { cx: 118, cy: 66, w: 30, h: 66 },  // left central incisor
    { cx: 155, cy: 64, w: 32, h: 68 },  // left central incisor (center-left)
    { cx: 193, cy: 64, w: 32, h: 68 },  // right central incisor (center-right)
    { cx: 230, cy: 66, w: 30, h: 66 },  // right central incisor
    { cx: 266, cy: 72, w: 26, h: 62 },  // right lateral incisor
    { cx: 298, cy: 80, w: 28, h: 58 },  // right lateral incisor (outer)
  ];

  // Crooked offsets: overlap, vertical shift, rotation
  const crookedOffsets = [
    { dx: 6, dy: 4, rot: -8 },
    { dx: 4, dy: -6, rot: 12 },
    { dx: -3, dy: 5, rot: -6 },
    { dx: 2, dy: -3, rot: 4 },
    { dx: -4, dy: 6, rot: -10 },
    { dx: 5, dy: -4, rot: 8 },
    { dx: -2, dy: 7, rot: -5 },
    { dx: -5, dy: 3, rot: 7 },
  ];

  const c = Math.max(0, Math.min(1, crookedness));

  return (
    <svg viewBox="0 0 400 160" width="100%" height="100%">
      <GlowFilters />

      {baseTeeth.map((tooth, i) => {
        const offset = crookedOffsets[i];
        const dx = offset.dx * c;
        const dy = offset.dy * c;
        const rot = offset.rot * c;
        const cx = tooth.cx + dx;
        const cy = tooth.cy + dy;
        const halfW = tooth.w / 2;
        const halfH = tooth.h / 2;

        // Rounded-rectangle-like tooth shape using a path for smoother look
        const r = 6; // corner radius
        const topR = 4; // top corners slightly sharper (incisal edge)

        return (
          <g
            key={i}
            transform={`rotate(${rot}, ${cx}, ${cy})`}
          >
            {/* Tooth body */}
            <path
              d={`
                M ${cx - halfW + topR} ${cy - halfH}
                L ${cx + halfW - topR} ${cy - halfH}
                Q ${cx + halfW} ${cy - halfH}, ${cx + halfW} ${cy - halfH + topR}
                L ${cx + halfW} ${cy + halfH - r}
                Q ${cx + halfW} ${cy + halfH}, ${cx + halfW - r} ${cy + halfH}
                L ${cx - halfW + r} ${cy + halfH}
                Q ${cx - halfW} ${cy + halfH}, ${cx - halfW} ${cy + halfH - r}
                L ${cx - halfW} ${cy - halfH + topR}
                Q ${cx - halfW} ${cy - halfH}, ${cx - halfW + topR} ${cy - halfH}
                Z
              `}
              fill={color}
              fillOpacity="0.85"
              stroke={strokeColor}
              strokeWidth="2"
              strokeOpacity="0.9"
            />

            {/* Subtle incisal edge highlight */}
            <line
              x1={cx - halfW + 5}
              y1={cy - halfH + 2}
              x2={cx + halfW - 5}
              y2={cy - halfH + 2}
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            {/* Faint midline on central incisors */}
            {(i === 3 || i === 4) && (
              <line
                x1={cx}
                y1={cy - halfH + 8}
                x2={cx}
                y2={cy + halfH - 8}
                stroke={strokeColor}
                strokeWidth="0.5"
                strokeOpacity="0.2"
              />
            )}
          </g>
        );
      })}

      {/* Gum line (subtle arc behind teeth) */}
      <path
        d="M 20 110 C 80 130, 160 140, 200 142 C 240 140, 320 130, 380 110"
        fill="none"
        stroke="rgba(244, 114, 114, 0.25)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

// =====================================================
// CROWN CAP
// =====================================================
// Bell/dome shape that descends onto a prepared tooth stump

export const CrownCap: React.FC<{
  yOffset: number;
  opacity: number;
  color?: string;
  glowColor?: string;
}> = ({ yOffset, opacity, color = "#fde68a", glowColor = "#fbbf24" }) => {
  return (
    <svg viewBox="0 0 120 80" width="100%" height="100%">
      <GlowFilters />

      <g
        transform={`translate(0, ${yOffset})`}
        opacity={opacity}
      >
        {/* Crown body */}
        <path
          d="M 16 68 C 16 68, 12 45, 18 30 C 22 20, 32 12, 42 8 C 50 5, 58 4, 60 4 C 62 4, 70 5, 78 8 C 88 12, 98 20, 102 30 C 108 45, 104 68, 104 68 Z"
          fill={color}
          fillOpacity="0.85"
          stroke={glowColor}
          strokeWidth="2"
          filter="url(#glow-gold)"
        />

        {/* Inner contour line showing the cap shape */}
        <path
          d="M 24 62 C 24 62, 20 44, 26 32 C 30 24, 38 18, 48 14 C 54 12, 60 11, 60 11 C 60 11, 66 12, 72 14 C 82 18, 90 24, 94 32 C 100 44, 96 62, 96 62"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1"
        />

        {/* Specular highlight */}
        <path
          d="M 40 18 C 46 12, 56 10, 62 12"
          fill="none"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Bottom rim */}
        <path
          d="M 16 68 C 30 74, 50 76, 60 76 C 70 76, 90 74, 104 68"
          fill="none"
          stroke={glowColor}
          strokeWidth="2.5"
          strokeOpacity="0.8"
        />
      </g>
    </svg>
  );
};

// =====================================================
// ALIGNER TRAY (Invisalign)
// =====================================================
// U-shaped clear aligner tray that slides onto tooth row

export const AlignerTray: React.FC<{
  yOffset: number;
  opacity: number;
}> = ({ yOffset, opacity }) => {
  return (
    <svg viewBox="0 0 400 160" width="100%" height="100%">
      <GlowFilters />

      <g
        transform={`translate(0, ${yOffset})`}
        opacity={opacity}
      >
        {/* Outer tray edge */}
        <path
          d="M 30 50 C 30 30, 60 10, 120 6 C 160 3, 200 2, 200 2 C 200 2, 240 3, 280 6 C 340 10, 370 30, 370 50 L 370 100 C 370 120, 340 135, 280 138 C 240 140, 200 140, 200 140 C 200 140, 160 140, 120 138 C 60 135, 30 120, 30 100 Z"
          fill="rgba(147, 197, 253, 0.12)"
          stroke="rgba(147, 197, 253, 0.6)"
          strokeWidth="2.5"
        />

        {/* Inner tray edge (showing thickness) */}
        <path
          d="M 44 52 C 44 36, 70 18, 124 14 C 160 11, 200 10, 200 10 C 200 10, 240 11, 276 14 C 330 18, 356 36, 356 52 L 356 96 C 356 112, 330 124, 276 127 C 240 129, 200 130, 200 130 C 200 130, 160 129, 124 127 C 70 124, 44 112, 44 96 Z"
          fill="none"
          stroke="rgba(147, 197, 253, 0.3)"
          strokeWidth="1.5"
        />

        {/* Scalloped tooth indentations along the bottom */}
        {[70, 108, 146, 178, 214, 246, 284, 322].map((x, i) => (
          <path
            key={i}
            d={`M ${x - 14} 96 C ${x - 14} 110, ${x - 6} 118, ${x} 118 C ${x + 6} 118, ${x + 14} 110, ${x + 14} 96`}
            fill="none"
            stroke="rgba(147, 197, 253, 0.35)"
            strokeWidth="1"
          />
        ))}

        {/* Specular reflection line */}
        <path
          d="M 80 24 C 120 14, 180 8, 240 10"
          fill="none"
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Second subtle reflection */}
        <path
          d="M 100 40 C 140 32, 200 28, 260 30"
          fill="none"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};

// =====================================================
// CRACK LINES
// =====================================================
// Crack lines that grow across a surface using strokeDashoffset

export const CrackLines: React.FC<{
  progress: number;
  color?: string;
  x?: number;
  y?: number;
}> = ({ progress, color = "rgba(255, 255, 255, 0.7)", x = 0, y = 0 }) => {
  const p = Math.max(0, Math.min(1, progress));

  // Three branching crack paths
  const cracks = [
    {
      d: "M 0 0 L 12 -8 L 28 -4 L 40 -14 L 52 -10",
      length: 70,
    },
    {
      d: "M 0 0 L 8 6 L 22 4 L 35 12 L 44 8",
      length: 60,
    },
    {
      d: "M 12 -8 L 18 -18 L 28 -22",
      length: 30,
    },
  ];

  return (
    <g transform={`translate(${x}, ${y})`}>
      {cracks.map((crack, i) => {
        const crackProgress = Math.max(0, Math.min(1, (p * 1.5) - (i * 0.2)));
        const dashOffset = crack.length * (1 - crackProgress);

        return (
          <path
            key={i}
            d={crack.d}
            fill="none"
            stroke={color}
            strokeWidth={i === 2 ? 1 : 1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={crack.length}
            strokeDashoffset={dashOffset}
            opacity={crackProgress > 0 ? 0.9 : 0}
          />
        );
      })}
    </g>
  );
};

// =====================================================
// INFECTION PULSE
// =====================================================
// Red pulsing circles showing infection/inflammation

export const InfectionPulse: React.FC<{
  frame: number;
  fps: number;
  centers: { x: number; y: number }[];
  color?: string;
}> = ({ frame, fps, centers, color = "#ef4444" }) => {
  return (
    <g>
      {centers.map((center, i) => {
        // Stagger pulse timing per center
        const phaseOffset = i * 8;
        const cycleLength = fps * 1.2; // 1.2 second cycle
        const t = ((frame + phaseOffset) % cycleLength) / cycleLength;

        // Expanding ring
        const ringRadius = interpolate(t, [0, 1], [4, 24]);
        const ringOpacity = interpolate(t, [0, 0.3, 1], [0.8, 0.6, 0]);

        // Core pulse
        const coreScale = interpolate(
          Math.sin((frame + phaseOffset) * 0.15),
          [-1, 1],
          [0.7, 1.0]
        );
        const coreRadius = 6 * coreScale;

        return (
          <g key={i}>
            {/* Expanding ring */}
            <circle
              cx={center.x}
              cy={center.y}
              r={ringRadius}
              fill="none"
              stroke={color}
              strokeWidth="2"
              opacity={ringOpacity}
            />

            {/* Second ring (delayed) */}
            <circle
              cx={center.x}
              cy={center.y}
              r={interpolate(((t + 0.5) % 1), [0, 1], [4, 24])}
              fill="none"
              stroke={color}
              strokeWidth="1.5"
              opacity={interpolate(((t + 0.5) % 1), [0, 0.3, 1], [0.6, 0.4, 0])}
            />

            {/* Core glow */}
            <circle
              cx={center.x}
              cy={center.y}
              r={coreRadius}
              fill={color}
              opacity="0.6"
              filter="url(#glow-red)"
            />

            {/* Bright center dot */}
            <circle
              cx={center.x}
              cy={center.y}
              r={3}
              fill={color}
              opacity="0.9"
            />
          </g>
        );
      })}
    </g>
  );
};

// =====================================================
// SPARKLE GROUP
// =====================================================
// Multiple sparkle stars that appear in sequence

export const SparkleGroup: React.FC<{
  frame: number;
  fps: number;
  startFrame: number;
  positions: { x: number; y: number }[];
}> = ({ frame, fps, startFrame, positions }) => {
  return (
    <g>
      {positions.map((pos, i) => {
        const sparkleStart = startFrame + i * 4; // stagger by 4 frames
        const localFrame = frame - sparkleStart;
        const cycleDuration = fps * 0.8; // 0.8 seconds per sparkle cycle

        if (localFrame < 0) return null;

        const cycleFrame = localFrame % cycleDuration;
        const t = cycleFrame / cycleDuration;

        // Scale: grow in, hold, shrink out
        const scale = interpolate(
          t,
          [0, 0.15, 0.5, 0.85, 1],
          [0, 1.2, 1, 1.2, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        // Rotation
        const rotation = interpolate(t, [0, 1], [0, 45]);

        // Opacity
        const opacity = interpolate(
          t,
          [0, 0.1, 0.85, 1],
          [0, 1, 1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        // 4-pointed star path
        const s = 8; // arm length
        const inner = 2.5;
        const starPath = `
          M 0 ${-s}
          L ${inner} ${-inner}
          L ${s} 0
          L ${inner} ${inner}
          L 0 ${s}
          L ${-inner} ${inner}
          L ${-s} 0
          L ${-inner} ${-inner}
          Z
        `;

        return (
          <g
            key={i}
            transform={`translate(${pos.x}, ${pos.y}) scale(${scale}) rotate(${rotation})`}
            opacity={opacity}
          >
            <path
              d={starPath}
              fill="#ffffff"
              opacity="0.95"
            />
            {/* Glow behind */}
            <circle
              r={5}
              fill="#ffffff"
              opacity="0.3"
              filter="url(#glow-white)"
            />
          </g>
        );
      })}
    </g>
  );
};

// =====================================================
// DRAWING PATH
// =====================================================
// SVG path that draws itself using strokeDasharray/strokeDashoffset

export const DrawingPath: React.FC<{
  d: string;
  progress: number;
  color?: string;
  strokeWidth?: number;
}> = ({ d, progress, color = "#e0e7ff", strokeWidth = 2.5 }) => {
  // Use a large dasharray value that should cover most paths
  const totalLength = 1000;
  const p = Math.max(0, Math.min(1, progress));
  const dashOffset = totalLength * (1 - p);

  return (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={totalLength}
      strokeDashoffset={dashOffset}
      opacity={p > 0 ? 1 : 0}
    />
  );
};

// =====================================================
// ANIMATED ARROW
// =====================================================
// Arrow that grows from start to end point

export const AnimatedArrow: React.FC<{
  from: { x: number; y: number };
  to: { x: number; y: number };
  progress: number;
  color?: string;
  strokeWidth?: number;
}> = ({ from, to, progress, color = "#a78bfa", strokeWidth = 2.5 }) => {
  const p = Math.max(0, Math.min(1, progress));

  // Current tip position
  const tipX = interpolate(p, [0, 1], [from.x, to.x]);
  const tipY = interpolate(p, [0, 1], [from.y, to.y]);

  // Arrow angle
  const angle = Math.atan2(to.y - from.y, to.x - from.x);
  const angleDeg = (angle * 180) / Math.PI;

  // Arrowhead size
  const headLength = 10;
  const headAngle = 25 * (Math.PI / 180);

  // Arrowhead points
  const head1X = tipX - headLength * Math.cos(angle - headAngle);
  const head1Y = tipY - headLength * Math.sin(angle - headAngle);
  const head2X = tipX - headLength * Math.cos(angle + headAngle);
  const head2Y = tipY - headLength * Math.sin(angle + headAngle);

  if (p <= 0) return null;

  return (
    <g opacity={p > 0.05 ? 1 : 0}>
      {/* Arrow line */}
      <line
        x1={from.x}
        y1={from.y}
        x2={tipX}
        y2={tipY}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      {/* Arrowhead (show when progress > 30%) */}
      {p > 0.3 && (
        <path
          d={`M ${head1X} ${head1Y} L ${tipX} ${tipY} L ${head2X} ${head2Y}`}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={interpolate(p, [0.3, 0.5], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
        />
      )}
    </g>
  );
};

// =====================================================
// SHIELD ICON
// =====================================================
// Protection shield with checkmark that draws itself

export const ShieldIcon: React.FC<{
  progress: number;
  x?: number;
  y?: number;
  size?: number;
  color?: string;
}> = ({ progress, x = 0, y = 0, size = 60, color = "#34d399" }) => {
  const p = Math.max(0, Math.min(1, progress));

  // Shield draws from 0-0.6, checkmark from 0.5-1.0
  const shieldProgress = interpolate(p, [0, 0.6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const checkProgress = interpolate(p, [0.5, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const half = size / 2;

  // Shield path (scaled to size)
  const shieldD = `
    M ${x} ${y - half * 0.9}
    C ${x - half * 0.8} ${y - half * 0.7}, ${x - half} ${y - half * 0.3}, ${x - half} ${y}
    C ${x - half} ${y + half * 0.4}, ${x - half * 0.6} ${y + half * 0.75}, ${x} ${y + half}
    C ${x + half * 0.6} ${y + half * 0.75}, ${x + half} ${y + half * 0.4}, ${x + half} ${y}
    C ${x + half} ${y - half * 0.3}, ${x + half * 0.8} ${y - half * 0.7}, ${x} ${y - half * 0.9}
    Z
  `;
  const shieldLength = 400;
  const shieldDashOffset = shieldLength * (1 - shieldProgress);

  // Checkmark path
  const checkD = `
    M ${x - half * 0.3} ${y}
    L ${x - half * 0.05} ${y + half * 0.25}
    L ${x + half * 0.35} ${y - half * 0.2}
  `;
  const checkLength = 100;
  const checkDashOffset = checkLength * (1 - checkProgress);

  return (
    <g>
      {/* Shield outline */}
      <path
        d={shieldD}
        fill={shieldProgress > 0.5 ? `${color}15` : "none"}
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={shieldLength}
        strokeDashoffset={shieldDashOffset}
        opacity={p > 0 ? 1 : 0}
        filter="url(#glow-green)"
      />

      {/* Checkmark */}
      <path
        d={checkD}
        fill="none"
        stroke="#ffffff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={checkLength}
        strokeDashoffset={checkDashOffset}
        opacity={checkProgress > 0 ? 1 : 0}
      />
    </g>
  );
};

// =====================================================
// PROGRESS DOTS
// =====================================================
// Row of dots that fill in sequentially

export const ProgressDots: React.FC<{
  count: number;
  filledCount: number;
  x?: number;
  y?: number;
  color?: string;
}> = ({ count, filledCount, x = 0, y = 0, color = "#a78bfa" }) => {
  const spacing = 24;
  const totalWidth = (count - 1) * spacing;
  const startX = x - totalWidth / 2;

  return (
    <g>
      {/* Connecting line */}
      <line
        x1={startX}
        y1={y}
        x2={startX + totalWidth}
        y2={y}
        stroke="rgba(255, 255, 255, 0.15)"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Filled portion of connecting line */}
      {filledCount > 1 && (
        <line
          x1={startX}
          y1={y}
          x2={startX + (filledCount - 1) * spacing}
          y2={y}
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.6"
        />
      )}

      {/* Dots */}
      {Array.from({ length: count }).map((_, i) => {
        const dotX = startX + i * spacing;
        const filled = i < filledCount;

        return (
          <g key={i}>
            {/* Outer ring (always visible) */}
            <circle
              cx={dotX}
              cy={y}
              r={6}
              fill={filled ? color : "transparent"}
              fillOpacity={filled ? 0.9 : 0}
              stroke={filled ? color : "rgba(255, 255, 255, 0.3)"}
              strokeWidth="2"
            />

            {/* Inner bright dot when filled */}
            {filled && (
              <circle
                cx={dotX}
                cy={y}
                r={3}
                fill="#ffffff"
                opacity="0.8"
              />
            )}
          </g>
        );
      })}
    </g>
  );
};

// =====================================================
// ANIMATED LABEL
// =====================================================
// Text label that fades in and slides up

export const AnimatedLabel: React.FC<{
  text: string;
  frame: number;
  startFrame: number;
  x?: number;
  y?: number;
  color?: string;
  fontSize?: number;
}> = ({
  text,
  frame,
  startFrame,
  x = 0,
  y = 0,
  color = "#ffffff",
  fontSize = 16,
}) => {
  const localFrame = frame - startFrame;

  if (localFrame < 0) return null;

  // Animate over 12 frames
  const animDuration = 12;
  const t = Math.min(1, localFrame / animDuration);

  // Ease out cubic
  const eased = 1 - Math.pow(1 - t, 3);

  const offsetY = interpolate(eased, [0, 1], [10, 0]);
  const opacity = interpolate(eased, [0, 1], [0, 1]);

  return (
    <text
      x={x}
      y={y + offsetY}
      fill={color}
      fontSize={fontSize}
      fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
      fontWeight="300"
      textAnchor="middle"
      dominantBaseline="middle"
      opacity={opacity}
      style={{ letterSpacing: "0.02em" }}
    >
      {text}
    </text>
  );
};

// =====================================================
// DENTAL TOOL (for root canal)
// =====================================================
// Dental file/tool shape that animates entering a tooth

export const DentalTool: React.FC<{
  yOffset: number;
  rotation?: number;
  opacity: number;
  x?: number;
}> = ({ yOffset, rotation = 0, opacity, x = 100 }) => {
  return (
    <g
      transform={`translate(${x}, ${yOffset}) rotate(${rotation}, 0, 0)`}
      opacity={opacity}
    >
      {/* Handle (top) */}
      <rect
        x={-4}
        y={-50}
        width={8}
        height={22}
        rx={3}
        fill="#94a3b8"
        stroke="#cbd5e1"
        strokeWidth="1"
      />

      {/* Grip texture lines */}
      <line x1={-2} y1={-44} x2={2} y2={-44} stroke="#64748b" strokeWidth="0.8" />
      <line x1={-2} y1={-40} x2={2} y2={-40} stroke="#64748b" strokeWidth="0.8" />
      <line x1={-2} y1={-36} x2={2} y2={-36} stroke="#64748b" strokeWidth="0.8" />

      {/* Shaft */}
      <rect
        x={-1.5}
        y={-28}
        width={3}
        height={40}
        fill="#cbd5e1"
        stroke="#e2e8f0"
        strokeWidth="0.5"
      />

      {/* Tapered working end */}
      <path
        d="M -1.5 12 L 1.5 12 L 0.5 38 L -0.5 38 Z"
        fill="#e2e8f0"
        stroke="#f1f5f9"
        strokeWidth="0.5"
      />

      {/* Tip */}
      <circle
        cx={0}
        cy={39}
        r={0.8}
        fill="#f1f5f9"
      />

      {/* Subtle metallic highlight */}
      <line
        x1={0.5}
        y1={-26}
        x2={0.3}
        y2={36}
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="0.5"
      />
    </g>
  );
};
