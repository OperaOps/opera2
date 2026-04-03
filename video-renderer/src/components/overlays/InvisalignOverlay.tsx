import React from "react";
import {
  OverlayProps,
  OverlayContainer,
  GlowFilters,
  ToothRow,
  AlignerTray,
  SparkleGroup,
  AnimatedLabel,
  AnimatedArrow,
  ProgressDots,
  DrawingPath,
  ShieldIcon,
} from "./shared";
import { interpolate, spring } from "remotion";

// =====================================================
// HELPER: Clamped interpolate shorthand
// =====================================================
const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

// =====================================================
// INVISALIGN PROBLEM OVERLAY
// =====================================================
// Shows crowded/misaligned teeth with red arrows and pulsing highlights

export const InvisalignProblemOverlay: React.FC<OverlayProps> = ({
  frame,
  durationFrames,
  fps,
}) => {
  // --- Timeline ---
  // Frames 0-20: nothing
  // Frames 20-60: ToothRow fades in (crookedness=0.8)
  // Frames 50-90: Red arrows showing crowding pressure
  // Frames 70-100: Additional arrows for rotated teeth
  // Frames 80-110: Label "Crowding & Misalignment"
  // Frames 90-130: Pulsing red highlights at worst crowding
  // Frames 130+: Hold with subtle pulsing

  const toothOpacity = interpolate(frame, [20, 45], [0, 1], clamp);

  // Arrow progress (inward compression arrows)
  const crowdArrowProgress = interpolate(frame, [50, 85], [0, 1], clamp);

  // Rotation arrows
  const rotArrowProgress = interpolate(frame, [70, 100], [0, 1], clamp);

  // Label
  const labelVisible = frame >= 80;

  // Pulsing highlights
  const highlightOpacity = interpolate(frame, [90, 115], [0, 0.8], clamp);

  // Pulse cycle for holding phase
  const pulsePhase = Math.sin(frame * 0.12) * 0.5 + 0.5;
  const pulseScale = 0.7 + pulsePhase * 0.6;
  const pulseAlpha = highlightOpacity * (0.4 + pulsePhase * 0.6);

  return (
    <OverlayContainer>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Tooth row layer */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "5%",
            width: "90%",
            height: "55%",
            opacity: toothOpacity,
          }}
        >
          <ToothRow crookedness={0.8} />
        </div>

        {/* Annotation SVG layer on top */}
        <svg
          viewBox="0 0 500 300"
          width="100%"
          height="100%"
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          <GlowFilters />

          {/* --- Red arrows showing inward crowding pressure --- */}
          {/* Between teeth 2-3 (left side crowding) */}
          <AnimatedArrow
            from={{ x: 80, y: 80 }}
            to={{ x: 120, y: 90 }}
            progress={crowdArrowProgress}
            color="#ef4444"
            strokeWidth={2.5}
          />
          <AnimatedArrow
            from={{ x: 160, y: 80 }}
            to={{ x: 130, y: 88 }}
            progress={crowdArrowProgress}
            color="#ef4444"
            strokeWidth={2.5}
          />

          {/* Between teeth 5-6 (right side crowding) */}
          <AnimatedArrow
            from={{ x: 310, y: 78 }}
            to={{ x: 350, y: 88 }}
            progress={crowdArrowProgress}
            color="#ef4444"
            strokeWidth={2.5}
          />
          <AnimatedArrow
            from={{ x: 410, y: 82 }}
            to={{ x: 375, y: 90 }}
            progress={crowdArrowProgress}
            color="#ef4444"
            strokeWidth={2.5}
          />

          {/* --- Rotation arrows (curved indicators) --- */}
          {/* Tooth 2: rotated clockwise */}
          <AnimatedArrow
            from={{ x: 140, y: 55 }}
            to={{ x: 155, y: 70 }}
            progress={rotArrowProgress}
            color="#f97316"
            strokeWidth={2}
          />
          {/* Tooth 6: rotated counter-clockwise */}
          <AnimatedArrow
            from={{ x: 360, y: 55 }}
            to={{ x: 345, y: 70 }}
            progress={rotArrowProgress}
            color="#f97316"
            strokeWidth={2}
          />
          {/* Tooth 4: slight tilt */}
          <AnimatedArrow
            from={{ x: 245, y: 50 }}
            to={{ x: 238, y: 68 }}
            progress={rotArrowProgress}
            color="#f97316"
            strokeWidth={2}
          />

          {/* --- Pulsing red highlights at worst crowding points --- */}
          {/* Left crowding zone */}
          <circle
            cx={125}
            cy={88}
            r={12 * pulseScale}
            fill="none"
            stroke="#ef4444"
            strokeWidth={2}
            opacity={pulseAlpha * 0.7}
            filter="url(#glow-red)"
          />
          <circle
            cx={125}
            cy={88}
            r={5}
            fill="#ef4444"
            opacity={pulseAlpha * 0.5}
          />

          {/* Center overlap zone */}
          <circle
            cx={240}
            cy={82}
            r={12 * pulseScale}
            fill="none"
            stroke="#ef4444"
            strokeWidth={2}
            opacity={pulseAlpha * 0.7}
            filter="url(#glow-red)"
          />
          <circle
            cx={240}
            cy={82}
            r={5}
            fill="#ef4444"
            opacity={pulseAlpha * 0.5}
          />

          {/* Right crowding zone */}
          <circle
            cx={365}
            cy={88}
            r={12 * pulseScale}
            fill="none"
            stroke="#ef4444"
            strokeWidth={2}
            opacity={pulseAlpha * 0.7}
            filter="url(#glow-red)"
          />
          <circle
            cx={365}
            cy={88}
            r={5}
            fill="#ef4444"
            opacity={pulseAlpha * 0.5}
          />

          {/* Expanding ring effect on hold */}
          {frame > 130 && (
            <>
              {[125, 240, 365].map((cx, i) => {
                const ringPhase = ((frame - 130 + i * 8) % 30) / 30;
                const ringR = 8 + ringPhase * 20;
                const ringOp = (1 - ringPhase) * 0.4;
                return (
                  <circle
                    key={i}
                    cx={cx}
                    cy={i === 1 ? 82 : 88}
                    r={ringR}
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth={1.5}
                    opacity={ringOp}
                  />
                );
              })}
            </>
          )}

          {/* --- Label --- */}
          {labelVisible && (
            <AnimatedLabel
              text="Crowding & Misalignment"
              frame={frame}
              startFrame={80}
              x={250}
              y={195}
              color="#f87171"
              fontSize={20}
            />
          )}
        </svg>
      </div>
    </OverlayContainer>
  );
};

// =====================================================
// INVISALIGN TREATMENT OVERLAY
// =====================================================
// Shows aligner tray sliding onto teeth, teeth beginning to move

export const InvisalignTreatmentOverlay: React.FC<OverlayProps> = ({
  frame,
  durationFrames,
  fps,
}) => {
  // --- Timeline ---
  // Frames 0-20: nothing
  // Frames 20-50: ToothRow fades in (crookedness=0.6 initially)
  // Frames 40-90: AlignerTray descends from above via spring
  // Frames 80-120: Blue arrows showing movement direction
  // Frames 100-140: ProgressDots appear
  // Frames 120-160: Label "Gentle, Precise Movement"
  // Frames 140-180: Teeth animate crookedness from 0.6 → 0.4
  // Frames 160+: Hold

  const toothFadeIn = interpolate(frame, [20, 45], [0, 1], clamp);

  // Animate crookedness: starts at 0.6, then at frame 140 begins moving to 0.4
  const crookedness = interpolate(frame, [20, 50, 140, 180], [0.6, 0.6, 0.6, 0.4], clamp);

  // Aligner tray spring animation
  const alignerSpring = spring({
    frame: Math.max(0, frame - 40),
    fps,
    config: {
      damping: 14,
      stiffness: 60,
      mass: 0.8,
    },
  });
  const alignerYOffset = interpolate(alignerSpring, [0, 1], [-80, 0]);
  const alignerOpacity = interpolate(frame, [40, 55], [0, 0.9], clamp);

  // Blue arrows showing force direction
  const arrowProgress = interpolate(frame, [80, 115], [0, 1], clamp);

  // Progress dots
  const dotsOpacity = interpolate(frame, [100, 120], [0, 1], clamp);
  const filledDots = frame < 100 ? 0 : Math.min(3, Math.floor(interpolate(frame, [100, 140], [0, 3.5], clamp)));

  // Label
  const labelVisible = frame >= 120;

  // Overall visibility
  const mainOpacity = interpolate(frame, [20, 35], [0, 1], clamp);

  return (
    <OverlayContainer>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Tooth row layer — animated crookedness */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "5%",
            width: "90%",
            height: "55%",
            opacity: mainOpacity,
          }}
        >
          <ToothRow crookedness={crookedness} />
        </div>

        {/* Aligner tray layer — descends onto teeth */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "5%",
            width: "90%",
            height: "55%",
            opacity: alignerOpacity,
          }}
        >
          <AlignerTray yOffset={alignerYOffset} opacity={1} />
        </div>

        {/* Annotation SVG layer */}
        <svg
          viewBox="0 0 500 300"
          width="100%"
          height="100%"
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          <GlowFilters />

          {/* --- Blue arrows showing each tooth's movement direction --- */}
          {/* These arrows sit on/near the teeth showing alignment force */}

          {/* Tooth 1 (left outer) — push right */}
          <AnimatedArrow
            from={{ x: 70, y: 95 }}
            to={{ x: 82, y: 90 }}
            progress={arrowProgress}
            color="#60a5fa"
            strokeWidth={2}
          />

          {/* Tooth 2 — push right and down */}
          <AnimatedArrow
            from={{ x: 115, y: 80 }}
            to={{ x: 128, y: 88 }}
            progress={arrowProgress}
            color="#60a5fa"
            strokeWidth={2}
          />

          {/* Tooth 3 — push left */}
          <AnimatedArrow
            from={{ x: 180, y: 85 }}
            to={{ x: 168, y: 82 }}
            progress={arrowProgress}
            color="#60a5fa"
            strokeWidth={2}
          />

          {/* Tooth 4 — push down/center */}
          <AnimatedArrow
            from={{ x: 225, y: 78 }}
            to={{ x: 228, y: 88 }}
            progress={arrowProgress}
            color="#60a5fa"
            strokeWidth={2}
          />

          {/* Tooth 5 — push up/center */}
          <AnimatedArrow
            from={{ x: 275, y: 92 }}
            to={{ x: 272, y: 82 }}
            progress={arrowProgress}
            color="#60a5fa"
            strokeWidth={2}
          />

          {/* Tooth 6 — push right */}
          <AnimatedArrow
            from={{ x: 320, y: 80 }}
            to={{ x: 332, y: 85 }}
            progress={arrowProgress}
            color="#60a5fa"
            strokeWidth={2}
          />

          {/* Tooth 7 — push left and down */}
          <AnimatedArrow
            from={{ x: 385, y: 82 }}
            to={{ x: 372, y: 88 }}
            progress={arrowProgress}
            color="#60a5fa"
            strokeWidth={2}
          />

          {/* Tooth 8 (right outer) — push left */}
          <AnimatedArrow
            from={{ x: 430, y: 95 }}
            to={{ x: 418, y: 90 }}
            progress={arrowProgress}
            color="#60a5fa"
            strokeWidth={2}
          />

          {/* --- Progress dots --- */}
          <g opacity={dotsOpacity}>
            <ProgressDots
              count={6}
              filledCount={filledDots}
              x={250}
              y={225}
              color="#60a5fa"
            />
            {/* Stage labels */}
            {dotsOpacity > 0.5 && (
              <>
                <text
                  x={250 - 60}
                  y={245}
                  fill="rgba(255,255,255,0.4)"
                  fontSize={9}
                  fontFamily="system-ui, -apple-system, sans-serif"
                  fontWeight="300"
                  textAnchor="middle"
                >
                  Start
                </text>
                <text
                  x={250 + 60}
                  y={245}
                  fill="rgba(255,255,255,0.4)"
                  fontSize={9}
                  fontFamily="system-ui, -apple-system, sans-serif"
                  fontWeight="300"
                  textAnchor="middle"
                >
                  Complete
                </text>
              </>
            )}
          </g>

          {/* --- Label --- */}
          {labelVisible && (
            <AnimatedLabel
              text="Gentle, Precise Movement"
              frame={frame}
              startFrame={120}
              x={250}
              y={270}
              color="#67e8f9"
              fontSize={20}
            />
          )}
        </svg>
      </div>
    </OverlayContainer>
  );
};

// =====================================================
// INVISALIGN OUTCOME OVERLAY
// =====================================================
// Shows perfectly aligned teeth — the beautiful result

export const InvisalignOutcomeOverlay: React.FC<OverlayProps> = ({
  frame,
  durationFrames,
  fps,
}) => {
  // --- Timeline ---
  // Frames 0-20: nothing
  // Frames 20-70: ToothRow animates crookedness 0.3 → 0
  // Frames 50-90: DrawingPath traces smile curve
  // Frames 70-120: SparkleGroup appears
  // Frames 90-130: Label "Your Perfect Smile"
  // Frames 110-150: ShieldIcon appears
  // Frames 130+: Hold with sparkles and glow

  const mainOpacity = interpolate(frame, [20, 35], [0, 1], clamp);

  // Teeth alignment: smoothly animate from 0.3 to 0
  const crookedness = interpolate(frame, [20, 70], [0.3, 0], clamp);

  // Smile curve drawing progress
  const smileCurveProgress = interpolate(frame, [50, 90], [0, 1], clamp);

  // Sparkle positions along the tooth row
  const sparklePositions = [
    { x: 75, y: 80 },
    { x: 130, y: 70 },
    { x: 185, y: 65 },
    { x: 240, y: 63 },
    { x: 295, y: 65 },
    { x: 345, y: 70 },
    { x: 395, y: 78 },
    { x: 440, y: 85 },
  ];

  // Shield progress
  const shieldProgress = interpolate(frame, [110, 150], [0, 1], clamp);

  // Label
  const labelVisible = frame >= 90;

  // Gentle glow pulse on hold
  const glowPulse = frame > 130 ? 0.15 + Math.sin(frame * 0.08) * 0.1 : 0;

  return (
    <OverlayContainer>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Background glow effect when holding */}
        {glowPulse > 0 && (
          <div
            style={{
              position: "absolute",
              top: "5%",
              left: "10%",
              width: "80%",
              height: "50%",
              background: `radial-gradient(ellipse at center, rgba(52, 211, 153, ${glowPulse}) 0%, transparent 70%)`,
              pointerEvents: "none",
            }}
          />
        )}

        {/* Tooth row layer — animating to perfect alignment */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "5%",
            width: "90%",
            height: "55%",
            opacity: mainOpacity,
          }}
        >
          <ToothRow crookedness={crookedness} />
        </div>

        {/* Annotation SVG layer */}
        <svg
          viewBox="0 0 500 300"
          width="100%"
          height="100%"
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          <GlowFilters />

          {/* --- Smile curve line --- */}
          {/* Gentle upward arc below the perfectly aligned teeth */}
          <DrawingPath
            d="M 60 160 C 120 145, 200 135, 250 132 C 300 135, 380 145, 440 160"
            progress={smileCurveProgress}
            color="#34d399"
            strokeWidth={2.5}
          />

          {/* Second thinner smile line for depth */}
          <DrawingPath
            d="M 80 168 C 140 155, 210 146, 250 143 C 290 146, 360 155, 420 168"
            progress={interpolate(frame, [55, 92], [0, 1], clamp)}
            color="rgba(52, 211, 153, 0.3)"
            strokeWidth={1.5}
          />

          {/* --- Sparkles --- */}
          <SparkleGroup
            frame={frame}
            fps={fps}
            startFrame={70}
            positions={sparklePositions}
          />

          {/* --- Label --- */}
          {labelVisible && (
            <AnimatedLabel
              text="Your Perfect Smile"
              frame={frame}
              startFrame={90}
              x={250}
              y={210}
              color="#34d399"
              fontSize={22}
            />
          )}

          {/* --- Shield icon (retainer protection) --- */}
          <g opacity={interpolate(frame, [110, 125], [0, 1], clamp)}>
            <ShieldIcon
              progress={shieldProgress}
              x={250}
              y={260}
              size={40}
              color="#34d399"
            />
            {/* Small label under shield */}
            {frame >= 140 && (
              <AnimatedLabel
                text="Protected by Retainer"
                frame={frame}
                startFrame={140}
                x={250}
                y={290}
                color="rgba(255,255,255,0.5)"
                fontSize={11}
              />
            )}
          </g>
        </svg>
      </div>
    </OverlayContainer>
  );
};
