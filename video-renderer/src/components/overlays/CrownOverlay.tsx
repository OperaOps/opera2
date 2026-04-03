import React from "react";
import {
  OverlayProps,
  OverlayContainer,
  GlowFilters,
  MolarTooth,
  CrownCap,
  CrackLines,
  SparkleGroup,
  ShieldIcon,
  AnimatedLabel,
  DrawingPath,
  AnimatedArrow,
  InfectionPulse,
} from "./shared";
import { interpolate, spring } from "remotion";

// =====================================================
// HELPERS
// =====================================================

const clampInterpolate = (
  frame: number,
  inputRange: number[],
  outputRange: number[]
) =>
  interpolate(frame, inputRange, outputRange, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

// =====================================================
// CROWN PROBLEM OVERLAY
// =====================================================
// Shows a cracked/damaged molar that needs a crown.
// Timeline (~200 frames at 20fps = 10s):
//   0-20    nothing (background establishes)
//   20-50   MolarTooth fades in (large, centered)
//   50-90   CrackLines animate across the crown area
//   60-120  InfectionPulse near the cracks
//   80-100  "Structural Damage" label (red)
//   100-150 Arrows pointing to crack area
//   150+    hold with subtle pulsing

export const CrownProblemOverlay: React.FC<OverlayProps> = ({
  frame,
  durationFrames,
  fps,
}) => {
  // --- master opacity (fade in 20-30) ---
  const masterOpacity = clampInterpolate(frame, [20, 30], [0, 1]);

  // --- tooth fade in (20-50) ---
  const toothOpacity = clampInterpolate(frame, [20, 50], [0, 0.9]);

  // --- crack progress (50-90) ---
  const crackProgress = clampInterpolate(frame, [50, 90], [0, 1]);

  // --- infection visibility (60-120 ramp in, then hold) ---
  const infectionOpacity = clampInterpolate(frame, [60, 80], [0, 1]);

  // --- label appears at frame 80 ---
  const labelVisible = frame >= 80;

  // --- arrow progress (100-140) ---
  const arrowProgress = clampInterpolate(frame, [100, 140], [0, 1]);

  // --- subtle pulsing for hold phase (150+) ---
  const holdPulse =
    frame >= 150
      ? 0.85 + 0.15 * Math.sin((frame - 150) * 0.08)
      : 1;

  return (
    <OverlayContainer opacity={masterOpacity}>
      <svg
        viewBox="0 0 500 400"
        width="100%"
        height="100%"
        style={{ overflow: "visible" }}
      >
        <GlowFilters />

        {/* ── Large molar tooth (centered, dominant) ── */}
        <g
          transform="translate(150, 50) scale(1.5)"
          opacity={toothOpacity * holdPulse}
        >
          <MolarTooth
            showPulp={true}
            showCanals={false}
            fillColor="#f0e6d3"
            strokeColor="#e0e7ff"
          />
        </g>

        {/* ── Crack lines on the crown area ── */}
        {crackProgress > 0 && (
          <g opacity={holdPulse}>
            {/* Primary crack — across the top cusps */}
            <CrackLines
              progress={crackProgress}
              color="rgba(255, 255, 255, 0.85)"
              x={210}
              y={70}
            />
            {/* Secondary crack — slightly lower and offset */}
            <CrackLines
              progress={Math.max(0, crackProgress - 0.15)}
              color="rgba(255, 200, 200, 0.75)"
              x={260}
              y={90}
            />
            {/* Third crack — smaller, branching */}
            <CrackLines
              progress={Math.max(0, crackProgress - 0.3)}
              color="rgba(255, 255, 255, 0.65)"
              x={235}
              y={60}
            />
          </g>
        )}

        {/* ── Infection / inflammation pulse near cracks ── */}
        {infectionOpacity > 0 && (
          <g opacity={infectionOpacity * holdPulse}>
            <InfectionPulse
              frame={frame}
              fps={fps}
              centers={[
                { x: 240, y: 78 },
                { x: 275, y: 95 },
                { x: 218, y: 100 },
              ]}
              color="#ef4444"
            />
          </g>
        )}

        {/* ── Animated arrows pointing to crack damage ── */}
        {arrowProgress > 0 && (
          <g opacity={holdPulse}>
            {/* Arrow from left */}
            <AnimatedArrow
              from={{ x: 100, y: 60 }}
              to={{ x: 195, y: 75 }}
              progress={arrowProgress}
              color="#f87171"
              strokeWidth={2.5}
            />
            {/* Arrow from right */}
            <AnimatedArrow
              from={{ x: 400, y: 80 }}
              to={{ x: 295, y: 90 }}
              progress={Math.max(0, arrowProgress - 0.15)}
              color="#f87171"
              strokeWidth={2.5}
            />
            {/* Arrow from top-right */}
            <AnimatedArrow
              from={{ x: 370, y: 30 }}
              to={{ x: 270, y: 68 }}
              progress={Math.max(0, arrowProgress - 0.3)}
              color="#fca5a5"
              strokeWidth={2}
            />
          </g>
        )}

        {/* ── "Structural Damage" label ── */}
        {labelVisible && (
          <AnimatedLabel
            text="Structural Damage"
            frame={frame}
            startFrame={80}
            x={250}
            y={345}
            color="#f87171"
            fontSize={22}
          />
        )}

        {/* ── Danger indicator ring (subtle) ── */}
        {frame >= 90 && (
          <circle
            cx={250}
            cy={110}
            r={clampInterpolate(frame, [90, 120], [0, 100])}
            fill="none"
            stroke="#ef4444"
            strokeWidth="1.5"
            strokeDasharray="8 6"
            opacity={
              clampInterpolate(frame, [90, 110], [0, 0.4]) *
              holdPulse
            }
          />
        )}
      </svg>
    </OverlayContainer>
  );
};

// =====================================================
// CROWN TREATMENT OVERLAY
// =====================================================
// Shows a crown being placed onto a prepared (ground-down) tooth.
// Timeline (~200 frames at 20fps = 10s):
//   0-20    nothing
//   20-50   Prepared tooth (shorter crown) fades in
//   40-70   Dashed guide lines draw in
//   60-120  CrownCap descends via spring (-150 → 0)
//   120-140 Flash/glow when crown seats
//   130-160 "Precision Fit" label (blue)
//   140-180 Sparkles around seated crown
//   160+    hold with subtle glow

export const CrownTreatmentOverlay: React.FC<OverlayProps> = ({
  frame,
  durationFrames,
  fps,
}) => {
  // --- master opacity (fade in 20-30) ---
  const masterOpacity = clampInterpolate(frame, [20, 30], [0, 1]);

  // --- prepared tooth fade in (20-50) ---
  const toothOpacity = clampInterpolate(frame, [20, 50], [0, 0.9]);

  // --- guide lines draw progress (40-70) ---
  const guideProgress = clampInterpolate(frame, [40, 70], [0, 1]);

  // --- crown descent via spring (60-120) ---
  const crownSpringValue =
    frame >= 60
      ? spring({
          frame: frame - 60,
          fps,
          config: {
            damping: 14,
            stiffness: 80,
            mass: 0.8,
          },
        })
      : 0;
  const crownYOffset = interpolate(crownSpringValue, [0, 1], [-150, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const crownOpacity = clampInterpolate(frame, [60, 75], [0, 1]);

  // --- flash/glow on seat (120-140) ---
  const seatFlash =
    frame >= 118 && frame <= 142
      ? clampInterpolate(
          frame,
          [118, 126, 134, 142],
          [0, 0.7, 0.3, 0]
        )
      : 0;

  // --- label appears at 130 ---
  const labelVisible = frame >= 130;

  // --- sparkle positions ---
  const sparklePositions = [
    { x: 190, y: 55 },
    { x: 310, y: 60 },
    { x: 230, y: 40 },
    { x: 280, y: 45 },
    { x: 210, y: 80 },
    { x: 295, y: 85 },
  ];

  // --- hold glow (160+) ---
  const holdGlow =
    frame >= 160
      ? 0.7 + 0.3 * Math.sin((frame - 160) * 0.06)
      : 1;

  // Prepared tooth: shorter crown, flat top (ground down for crown)
  const preparedToothPath = `
    M 165 100
    C 157 108, 155 130, 159 155
    C 163 170, 174 178, 184 180
    L 184 173 C 187 173, 191 178, 194 176
    L 199 166 C 204 163, 209 163, 214 163
    L 219 163 C 224 163, 229 163, 234 166
    L 239 176 C 242 178, 246 173, 249 173
    L 249 180 C 259 178, 269 170, 273 155
    C 277 130, 275 108, 273 100
    Z
  `;

  // Flat top surface (prepared/ground down)
  const flatTopPath = `
    M 165 100 L 273 100
  `;

  // Crown cap outline for guide lines
  const crownGuideOuter = `
    M 155 105
    C 147 95, 145 75, 150 60
    C 153 50, 163 42, 173 38
    C 181 35, 189 34, 219 34
    C 249 34, 257 35, 265 38
    C 275 42, 285 50, 288 60
    C 293 75, 291 95, 283 105
  `;

  return (
    <OverlayContainer opacity={masterOpacity}>
      <svg
        viewBox="0 0 500 400"
        width="100%"
        height="100%"
        style={{ overflow: "visible" }}
      >
        <GlowFilters />

        {/* Additional gold glow filter for seated crown */}
        <defs>
          <radialGradient id="seat-flash" cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#fde68a" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ── Prepared tooth stump (ground down, shorter) ── */}
        <g opacity={toothOpacity}>
          {/* Roots (same as MolarTooth but manually placed) */}
          <path
            d="M 181 173 C 181 173, 177 203, 171 228 C 167 246, 163 266, 169 273 C 173 276, 177 270, 179 258 C 183 236, 187 208, 191 183"
            fill="#d4c4a8"
            stroke="#e0e7ff"
            strokeWidth="1.5"
            opacity="0.9"
          />
          <path
            d="M 247 173 C 247 173, 251 203, 257 228 C 261 246, 265 266, 259 273 C 255 276, 251 270, 249 258 C 245 236, 241 208, 237 183"
            fill="#d4c4a8"
            stroke="#e0e7ff"
            strokeWidth="1.5"
            opacity="0.9"
          />

          {/* Root outlines */}
          <path
            d="M 181 173 C 181 173, 177 203, 171 228 C 167 246, 163 266, 169 273 C 173 276, 177 270, 179 258 C 183 236, 187 208, 191 183"
            fill="none"
            stroke="#e0e7ff"
            strokeWidth="2"
            opacity="0.8"
          />
          <path
            d="M 247 173 C 247 173, 251 203, 257 228 C 261 246, 265 266, 259 273 C 255 276, 251 270, 249 258 C 245 236, 241 208, 237 183"
            fill="none"
            stroke="#e0e7ff"
            strokeWidth="2"
            opacity="0.8"
          />

          {/* Prepared dentin body */}
          <path
            d={preparedToothPath}
            fill="#f0e6d3"
            fillOpacity="0.85"
            stroke="#e0e7ff"
            strokeWidth="2.5"
            opacity="0.95"
          />

          {/* Flat ground top surface */}
          <path
            d={flatTopPath}
            fill="none"
            stroke="#e0e7ff"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.9"
          />

          {/* Ground surface cross-hatch texture */}
          <line x1={180} y1={100} x2={185} y2={97} stroke="#cbd5e1" strokeWidth="0.8" opacity="0.4" />
          <line x1={200} y1={100} x2={205} y2={97} stroke="#cbd5e1" strokeWidth="0.8" opacity="0.4" />
          <line x1={220} y1={100} x2={225} y2={97} stroke="#cbd5e1" strokeWidth="0.8" opacity="0.4" />
          <line x1={240} y1={100} x2={245} y2={97} stroke="#cbd5e1" strokeWidth="0.8" opacity="0.4" />
          <line x1={260} y1={100} x2={265} y2={97} stroke="#cbd5e1" strokeWidth="0.8" opacity="0.4" />
        </g>

        {/* ── Dashed guide lines showing crown placement ── */}
        {guideProgress > 0 && (
          <g opacity={clampInterpolate(frame, [40, 55], [0, 0.7])}>
            <DrawingPath
              d={crownGuideOuter}
              progress={guideProgress}
              color="#60a5fa"
              strokeWidth={2}
            />
            {/* Vertical guide lines on each side */}
            <DrawingPath
              d="M 155 105 L 155 30"
              progress={Math.max(0, guideProgress - 0.2)}
              color="#60a5fa"
              strokeWidth={1.5}
            />
            <DrawingPath
              d="M 283 105 L 283 30"
              progress={Math.max(0, guideProgress - 0.2)}
              color="#60a5fa"
              strokeWidth={1.5}
            />
            {/* Top connection dashed */}
            <line
              x1={155}
              y1={34}
              x2={283}
              y2={34}
              stroke="#60a5fa"
              strokeWidth={1}
              strokeDasharray="6 4"
              opacity={clampInterpolate(guideProgress, [0.5, 1], [0, 0.5])}
            />
          </g>
        )}

        {/* ── Descending crown cap ── */}
        {frame >= 60 && (
          <g
            transform={`translate(159, ${28 + crownYOffset})`}
            opacity={crownOpacity * holdGlow}
          >
            <svg viewBox="0 0 120 80" width="120" height="80" overflow="visible">
              <GlowFilters />
              <g opacity={1}>
                {/* Crown body */}
                <path
                  d="M 16 68 C 16 68, 12 45, 18 30 C 22 20, 32 12, 42 8 C 50 5, 58 4, 60 4 C 62 4, 70 5, 78 8 C 88 12, 98 20, 102 30 C 108 45, 104 68, 104 68 Z"
                  fill="#fde68a"
                  fillOpacity="0.88"
                  stroke="#fbbf24"
                  strokeWidth="2.5"
                  filter="url(#glow-gold)"
                />
                {/* Inner contour */}
                <path
                  d="M 24 62 C 24 62, 20 44, 26 32 C 30 24, 38 18, 48 14 C 54 12, 60 11, 60 11 C 60 11, 66 12, 72 14 C 82 18, 90 24, 94 32 C 100 44, 96 62, 96 62"
                  fill="none"
                  stroke="rgba(255,255,255,0.35)"
                  strokeWidth="1"
                />
                {/* Specular highlight */}
                <path
                  d="M 40 18 C 46 12, 56 10, 62 12"
                  fill="none"
                  stroke="rgba(255,255,255,0.55)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                {/* Bottom rim */}
                <path
                  d="M 16 68 C 30 74, 50 76, 60 76 C 70 76, 90 74, 104 68"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="2.5"
                  strokeOpacity="0.85"
                />
              </g>
            </svg>
          </g>
        )}

        {/* ── Seat flash / glow on contact ── */}
        {seatFlash > 0 && (
          <g opacity={seatFlash}>
            <ellipse
              cx={219}
              cy={75}
              rx={90}
              ry={60}
              fill="url(#seat-flash)"
            />
            {/* Bright rim line */}
            <path
              d="M 165 100 L 273 100"
              stroke="#fde68a"
              strokeWidth="4"
              strokeLinecap="round"
              opacity={seatFlash * 0.8}
              filter="url(#glow-gold)"
            />
          </g>
        )}

        {/* ── Sparkles around seated crown ── */}
        {frame >= 140 && (
          <SparkleGroup
            frame={frame}
            fps={fps}
            startFrame={140}
            positions={sparklePositions}
          />
        )}

        {/* ── "Precision Fit" label ── */}
        {labelVisible && (
          <AnimatedLabel
            text="Precision Fit"
            frame={frame}
            startFrame={130}
            x={250}
            y={345}
            color="#60a5fa"
            fontSize={22}
          />
        )}

        {/* ── Subtle gold aura (hold phase) ── */}
        {frame >= 160 && (
          <ellipse
            cx={219}
            cy={70}
            rx={80}
            ry={50}
            fill="none"
            stroke="#fbbf24"
            strokeWidth="1"
            opacity={0.15 * holdGlow}
            filter="url(#glow-gold)"
          />
        )}
      </svg>
    </OverlayContainer>
  );
};

// =====================================================
// CROWN OUTCOME OVERLAY
// =====================================================
// Shows the fully restored tooth with protective crown.
// Timeline (~200 frames at 20fps = 10s):
//   0-20    nothing
//   20-60   Complete restored tooth + crown draws in (DrawingPath)
//   50-100  SparkleGroup appears
//   80-130  ShieldIcon materializes
//   100-140 "Fully Protected" label (green)
//   120+    Gentle pulsing healthy glow

export const CrownOutcomeOverlay: React.FC<OverlayProps> = ({
  frame,
  durationFrames,
  fps,
}) => {
  // --- master opacity (fade in 20-30) ---
  const masterOpacity = clampInterpolate(frame, [20, 30], [0, 1]);

  // --- drawing progress for restored tooth outline (20-60) ---
  const drawProgress = clampInterpolate(frame, [20, 60], [0, 1]);

  // --- fill-in after outline is drawn ---
  const fillOpacity = clampInterpolate(frame, [45, 65], [0, 0.85]);

  // --- shield progress (80-130, mapped 0→1) ---
  const shieldProgress = clampInterpolate(frame, [80, 130], [0, 1]);

  // --- label visible at 100 ---
  const labelVisible = frame >= 100;

  // --- healthy glow pulsing (120+) ---
  const healthyGlow =
    frame >= 120
      ? 0.3 + 0.2 * Math.sin((frame - 120) * 0.07)
      : 0;

  const healthyGlowOpacity = clampInterpolate(frame, [120, 140], [0, 1]);

  // Sparkle positions around the restored tooth
  const sparklePositions = [
    { x: 170, y: 45 },
    { x: 310, y: 50 },
    { x: 195, y: 30 },
    { x: 285, y: 35 },
    { x: 160, y: 90 },
    { x: 320, y: 95 },
  ];

  // Full restored tooth + crown outline path (one continuous drawing path)
  const restoredToothOutline = `
    M 219 30
    C 200 28, 180 35, 170 48
    C 158 65, 155 85, 160 105
    C 155 120, 155 145, 160 165
    C 165 178, 178 186, 190 188
    C 190 188, 188 210, 180 235
    C 175 250, 172 268, 178 273
    C 182 276, 186 270, 188 258
    C 192 236, 196 210, 200 190
    L 238 190
    C 242 210, 246 236, 250 258
    C 252 270, 256 276, 260 273
    C 266 268, 263 250, 258 235
    C 250 210, 248 188, 248 188
    C 260 186, 273 178, 278 165
    C 283 145, 283 120, 278 105
    C 283 85, 280 65, 268 48
    C 258 35, 238 28, 219 30
    Z
  `;

  // Crown portion highlight path
  const crownPortionPath = `
    M 219 30
    C 200 28, 180 35, 170 48
    C 158 65, 155 85, 160 105
    L 278 105
    C 283 85, 280 65, 268 48
    C 258 35, 238 28, 219 30
    Z
  `;

  // Junction line between crown and tooth
  const junctionLine = `M 160 105 L 278 105`;

  return (
    <OverlayContainer opacity={masterOpacity}>
      <svg
        viewBox="0 0 500 400"
        width="100%"
        height="100%"
        style={{ overflow: "visible" }}
      >
        <GlowFilters />

        {/* ── Healthy green glow aura ── */}
        {healthyGlowOpacity > 0 && (
          <ellipse
            cx={219}
            cy={140}
            rx={100}
            ry={120}
            fill="none"
            stroke="#34d399"
            strokeWidth="2"
            opacity={healthyGlow * healthyGlowOpacity}
            filter="url(#glow-green)"
          />
        )}
        {healthyGlowOpacity > 0 && (
          <ellipse
            cx={219}
            cy={140}
            rx={70}
            ry={90}
            fill="none"
            stroke="#34d399"
            strokeWidth="1.5"
            opacity={healthyGlow * healthyGlowOpacity * 0.6}
            filter="url(#glow-green)"
          />
        )}

        {/* ── Filled tooth body (appears after outline draws) ── */}
        {fillOpacity > 0 && (
          <g opacity={fillOpacity}>
            {/* Roots */}
            <path
              d="M 190 188 C 190 188, 188 210, 180 235 C 175 250, 172 268, 178 273 C 182 276, 186 270, 188 258 C 192 236, 196 210, 200 190"
              fill="#d4c4a8"
              stroke="none"
              opacity="0.85"
            />
            <path
              d="M 248 188 C 248 188, 250 210, 258 235 C 263 250, 266 268, 260 273 C 256 276, 252 270, 250 258 C 246 236, 242 210, 238 190"
              fill="#d4c4a8"
              stroke="none"
              opacity="0.85"
            />

            {/* Tooth dentin body */}
            <path
              d="M 160 105 C 155 120, 155 145, 160 165 C 165 178, 178 186, 190 188 L 248 188 C 260 186, 273 178, 278 165 C 283 145, 283 120, 278 105 Z"
              fill="#f0e6d3"
              fillOpacity="0.85"
              stroke="none"
            />

            {/* Crown portion (golden) */}
            <path
              d={crownPortionPath}
              fill="#fde68a"
              fillOpacity="0.8"
              stroke="none"
            />

            {/* Crown specular highlight */}
            <path
              d="M 195 48 C 205 38, 225 32, 240 38"
              fill="none"
              stroke="rgba(255,255,255,0.45)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Junction line */}
            <path
              d={junctionLine}
              fill="none"
              stroke="#fbbf24"
              strokeWidth="2"
              opacity="0.7"
            />

            {/* Crown golden stroke */}
            <path
              d={crownPortionPath}
              fill="none"
              stroke="#fbbf24"
              strokeWidth="2"
              opacity="0.8"
              filter="url(#glow-gold)"
            />
          </g>
        )}

        {/* ── Drawing outline (animated draw-in) ── */}
        <DrawingPath
          d={restoredToothOutline}
          progress={drawProgress}
          color="#e0e7ff"
          strokeWidth={3}
        />

        {/* ── Sparkle group ── */}
        {frame >= 50 && (
          <SparkleGroup
            frame={frame}
            fps={fps}
            startFrame={50}
            positions={sparklePositions}
          />
        )}

        {/* ── Shield icon (protection) ── */}
        {shieldProgress > 0 && (
          <ShieldIcon
            progress={shieldProgress}
            x={375}
            y={100}
            size={70}
            color="#34d399"
          />
        )}

        {/* ── "Fully Protected" label ── */}
        {labelVisible && (
          <AnimatedLabel
            text="Fully Protected"
            frame={frame}
            startFrame={100}
            x={250}
            y={345}
            color="#34d399"
            fontSize={22}
          />
        )}

        {/* ── Secondary label near shield ── */}
        {frame >= 120 && (
          <AnimatedLabel
            text="Long-Lasting Restoration"
            frame={frame}
            startFrame={120}
            x={375}
            y={155}
            color="rgba(52, 211, 153, 0.7)"
            fontSize={12}
          />
        )}
      </svg>
    </OverlayContainer>
  );
};
