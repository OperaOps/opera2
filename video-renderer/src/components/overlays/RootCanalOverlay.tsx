import React from "react";
import {
  OverlayProps,
  OverlayContainer,
  GlowFilters,
  MolarTooth,
  DentalTool,
  InfectionPulse,
  SparkleGroup,
  ShieldIcon,
  AnimatedLabel,
  DrawingPath,
  AnimatedArrow,
} from "./shared";
import { interpolate, spring } from "remotion";

// =====================================================
// ROOT CANAL — PROBLEM OVERLAY
// =====================================================
// Shows an infected tooth with pulsing red infection spreading
// from the pulp chamber down through the root canals.

export const RootCanalProblemOverlay: React.FC<OverlayProps> = ({
  frame,
  durationFrames,
  fps,
}) => {
  // --- Tooth fade-in ---
  const toothOpacity = interpolate(frame, [20, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const toothScale = spring({
    frame: Math.max(0, frame - 20),
    fps,
    config: { damping: 18, stiffness: 50 },
  });

  // --- Infection pulp pulses (frames 40-80+) ---
  const pulpInfectionOpacity = interpolate(frame, [40, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // --- Root tip infection (frames 60-100) ---
  const rootInfectionOpacity = interpolate(frame, [60, 95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // --- Arrow progress (frames 70-90) ---
  const arrowProgress = interpolate(frame, [70, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // --- Label (frames 80-110) ---
  const labelFrame = frame;

  // --- Pulsing intensification (frames 100-150+) ---
  const intensePulse = interpolate(frame, [100, 150], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pulseGlow =
    0.4 + Math.sin(frame * 0.18) * 0.3 * (0.5 + intensePulse * 0.5);

  // --- Red overlay on pulp chamber that intensifies ---
  const pulpRedIntensity = interpolate(frame, [40, 100, 150], [0, 0.6, 0.9], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Infection pulse centers inside the pulp chamber
  const pulpInfectionCenters = [
    { x: 208, y: 130 }, // upper pulp
    { x: 205, y: 155 }, // mid pulp
    { x: 200, y: 175 }, // lower pulp
    { x: 212, y: 145 }, // right side pulp
  ];

  // Infection pulse centers at root tips
  const rootTipCenters = [
    { x: 178, y: 290 }, // left root tip
    { x: 232, y: 290 }, // right root tip
    { x: 175, y: 270 }, // left root mid
    { x: 235, y: 270 }, // right root mid
  ];

  return (
    <OverlayContainer>
      <svg
        viewBox="0 0 500 400"
        width="100%"
        height="100%"
        style={{ overflow: "visible" }}
      >
        <GlowFilters />

        {/* Additional red glow filter for intense infection */}
        <defs>
          <filter
            id="intense-red-glow"
            x="-60%"
            y="-60%"
            width="220%"
            height="220%"
          >
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feFlood floodColor="#ef4444" floodOpacity="0.5" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="shadow" />
            <feMerge>
              <feMergeNode in="shadow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="infection-spread" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#dc2626" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#b91c1c" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* LARGE molar tooth — centered and dominant */}
        <g
          transform={`translate(100, 20) scale(${toothScale * 2})`}
          opacity={toothOpacity}
        >
          <MolarTooth
            showPulp={true}
            showCanals={true}
            fillColor="rgba(240, 230, 211, 0.75)"
            strokeColor="rgba(224, 231, 255, 0.85)"
            rootColor="rgba(212, 196, 168, 0.7)"
          />
        </g>

        {/* Pulsing red overlay on pulp chamber — grows more intense */}
        {pulpRedIntensity > 0 && (
          <g opacity={pulpRedIntensity * pulseGlow}>
            {/* Pulp chamber red glow */}
            <ellipse
              cx={207}
              cy={150}
              rx={22 + Math.sin(frame * 0.12) * 4}
              ry={35 + Math.sin(frame * 0.12) * 5}
              fill="url(#infection-spread)"
              filter="url(#glow-red)"
            />
            {/* Canal glow — left */}
            <ellipse
              cx={183}
              cy={240}
              rx={8 + Math.sin(frame * 0.1) * 2}
              ry={40 + Math.sin(frame * 0.1) * 3}
              fill="rgba(239, 68, 68, 0.25)"
              filter="url(#glow-red)"
            />
            {/* Canal glow — right */}
            <ellipse
              cx={228}
              cy={240}
              rx={8 + Math.sin(frame * 0.1 + 1) * 2}
              ry={40 + Math.sin(frame * 0.1 + 1) * 3}
              fill="rgba(239, 68, 68, 0.25)"
              filter="url(#glow-red)"
            />
          </g>
        )}

        {/* Infection pulses at pulp chamber */}
        {pulpInfectionOpacity > 0 && (
          <g opacity={pulpInfectionOpacity}>
            <InfectionPulse
              frame={frame}
              fps={fps}
              centers={pulpInfectionCenters}
              color="#ef4444"
            />
          </g>
        )}

        {/* Infection pulses at root tips — larger, more intense */}
        {rootInfectionOpacity > 0 && (
          <g opacity={rootInfectionOpacity}>
            <InfectionPulse
              frame={frame}
              fps={fps}
              centers={rootTipCenters}
              color="#dc2626"
            />
            {/* Extra large pulsing circles at root apexes */}
            {rootTipCenters.slice(0, 2).map((center, i) => {
              const pulseR =
                14 + Math.sin(frame * 0.15 + i * 2) * 6 * intensePulse;
              return (
                <circle
                  key={`root-glow-${i}`}
                  cx={center.x}
                  cy={center.y}
                  r={pulseR}
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth={2.5}
                  opacity={0.4 + intensePulse * 0.3}
                  filter="url(#glow-red)"
                />
              );
            })}
          </g>
        )}

        {/* Arrows pointing inward to infected areas */}
        {arrowProgress > 0 && (
          <g>
            <AnimatedArrow
              from={{ x: 310, y: 100 }}
              to={{ x: 230, y: 140 }}
              progress={arrowProgress}
              color="#ef4444"
              strokeWidth={2.5}
            />
            <AnimatedArrow
              from={{ x: 100, y: 120 }}
              to={{ x: 180, y: 155 }}
              progress={arrowProgress}
              color="#ef4444"
              strokeWidth={2.5}
            />
            <AnimatedArrow
              from={{ x: 310, y: 280 }}
              to={{ x: 245, y: 285 }}
              progress={interpolate(arrowProgress, [0.2, 1], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })}
              color="#dc2626"
              strokeWidth={2}
            />
          </g>
        )}

        {/* "Deep Infection" label */}
        <AnimatedLabel
          text="Deep Infection"
          frame={labelFrame}
          startFrame={85}
          x={250}
          y={355}
          color="#ef4444"
          fontSize={22}
        />

        {/* Intensified whole-tooth red glow at late frames */}
        {intensePulse > 0 && (
          <ellipse
            cx={207}
            cy={200}
            rx={80 + Math.sin(frame * 0.08) * 10}
            ry={120 + Math.sin(frame * 0.08) * 10}
            fill="none"
            stroke="#ef4444"
            strokeWidth={1.5}
            opacity={intensePulse * 0.15 * pulseGlow}
            filter="url(#intense-red-glow)"
          />
        )}
      </svg>
    </OverlayContainer>
  );
};

// =====================================================
// ROOT CANAL — TREATMENT OVERLAY
// =====================================================
// Multi-step sequential animation showing the root canal procedure:
// access hole → tool enters → cleaning wipe → filling rises → seal cap

export const RootCanalTreatmentOverlay: React.FC<OverlayProps> = ({
  frame,
  durationFrames,
  fps,
}) => {
  // --- Phase 1: Tooth with infected internals and access hole (frames 20-50) ---
  const toothOpacity = interpolate(frame, [20, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const toothScale = spring({
    frame: Math.max(0, frame - 20),
    fps,
    config: { damping: 18, stiffness: 50 },
  });

  // Access hole visibility
  const accessHoleOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // --- Phase 2: Tool descends into the access hole (frames 50-100) ---
  const toolEntryProgress = interpolate(frame, [50, 95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const toolY = interpolate(
    spring({
      frame: Math.max(0, frame - 50),
      fps,
      config: { damping: 14, stiffness: 40 },
    }),
    [0, 1],
    [-100, 90]
  );
  const toolOpacity = interpolate(frame, [50, 60, 120, 135], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // --- Phase 3: Cleaning animation — red fades to clean top-to-bottom (frames 80-130) ---
  const cleanProgress = interpolate(frame, [80, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // --- Phase 4: Tool withdraws, filling rises from bottom (frames 120-160) ---
  const toolWithdrawY = interpolate(frame, [120, 155], [90, -100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fillProgress = interpolate(frame, [125, 160], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // --- Phase 5: Seal cap appears (frames 150-180) ---
  const sealProgress = spring({
    frame: Math.max(0, frame - 150),
    fps,
    config: { damping: 12, stiffness: 60 },
  });
  const sealOpacity = interpolate(frame, [150, 165], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // --- Label (frames 170-200) ---
  const labelFrame = frame;

  // Computed values for the tool position
  const effectiveToolY = frame < 120 ? toolY : toolWithdrawY;

  // Infection red intensity (fades as cleaning progresses)
  const infectionRed = interpolate(cleanProgress, [0, 0.6, 1], [1, 0.3, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Canal cleaning wipe — the height of "cleaned" area from top of pulp
  // Pulp area spans roughly y=110 to y=300 in our scaled coordinate space
  const pulpTop = 110;
  const pulpBottom = 300;
  const cleanWipeY = interpolate(
    cleanProgress,
    [0, 1],
    [pulpTop, pulpBottom],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Fill material height — rises from bottom of canals upward
  const fillTop = interpolate(fillProgress, [0, 1], [pulpBottom, pulpTop], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fillHeight = pulpBottom - fillTop;

  return (
    <OverlayContainer>
      <svg
        viewBox="0 0 500 400"
        width="100%"
        height="100%"
        style={{ overflow: "visible" }}
      >
        <GlowFilters />

        <defs>
          {/* Clip path for cleaning wipe — reveals clean area top-to-bottom */}
          <clipPath id="rc-clean-wipe">
            <rect
              x="0"
              y={pulpTop}
              width="500"
              height={cleanWipeY - pulpTop}
            />
          </clipPath>
          {/* Clip path for filling — reveals from bottom up */}
          <clipPath id="rc-fill-rise">
            <rect x="0" y={fillTop} width="500" height={fillHeight} />
          </clipPath>
          {/* Clean canal color gradient */}
          <linearGradient
            id="clean-canal"
            x1="0.5"
            y1="0"
            x2="0.5"
            y2="1"
          >
            <stop offset="0%" stopColor="rgba(224, 231, 255, 0.6)" />
            <stop offset="100%" stopColor="rgba(186, 230, 253, 0.4)" />
          </linearGradient>
          {/* Fill material gradient (gutta-percha — warm orange/tan) */}
          <linearGradient id="fill-material" x1="0.5" y1="1" x2="0.5" y2="0">
            <stop offset="0%" stopColor="rgba(232, 160, 96, 0.85)" />
            <stop offset="50%" stopColor="rgba(208, 136, 72, 0.8)" />
            <stop offset="100%" stopColor="rgba(184, 112, 56, 0.75)" />
          </linearGradient>
        </defs>

        {/* LARGE molar tooth — centered */}
        <g
          transform={`translate(100, 20) scale(${toothScale * 2})`}
          opacity={toothOpacity}
        >
          <MolarTooth
            showPulp={true}
            showCanals={true}
            fillColor="rgba(240, 230, 211, 0.75)"
            strokeColor="rgba(224, 231, 255, 0.85)"
            rootColor="rgba(212, 196, 168, 0.7)"
          />
        </g>

        {/* Infected red overlay on canals (fades out as cleaning progresses) */}
        {infectionRed > 0.01 && (
          <g opacity={infectionRed * 0.6}>
            {/* Pulp chamber red */}
            <ellipse
              cx={207}
              cy={150}
              rx={18}
              ry={30}
              fill="rgba(220, 38, 38, 0.5)"
            />
            {/* Left canal red */}
            <ellipse
              cx={183}
              cy={235}
              rx={6}
              ry={35}
              fill="rgba(220, 38, 38, 0.4)"
            />
            {/* Right canal red */}
            <ellipse
              cx={228}
              cy={235}
              rx={6}
              ry={35}
              fill="rgba(220, 38, 38, 0.4)"
            />
          </g>
        )}

        {/* Cleaned area (white/light blue) — revealed top-to-bottom by wipe */}
        {cleanProgress > 0 && (
          <g clipPath="url(#rc-clean-wipe)" opacity={0.6}>
            {/* Cleaned pulp chamber */}
            <ellipse cx={207} cy={150} rx={18} ry={30} fill="url(#clean-canal)" />
            {/* Cleaned left canal */}
            <ellipse cx={183} cy={235} rx={6} ry={35} fill="url(#clean-canal)" />
            {/* Cleaned right canal */}
            <ellipse cx={228} cy={235} rx={6} ry={35} fill="url(#clean-canal)" />
          </g>
        )}

        {/* Fill material rising from bottom */}
        {fillProgress > 0 && (
          <g clipPath="url(#rc-fill-rise)" opacity={0.8}>
            {/* Filled pulp chamber */}
            <ellipse
              cx={207}
              cy={150}
              rx={16}
              ry={28}
              fill="url(#fill-material)"
            />
            {/* Filled left canal */}
            <ellipse
              cx={183}
              cy={235}
              rx={5}
              ry={33}
              fill="url(#fill-material)"
            />
            {/* Filled right canal */}
            <ellipse
              cx={228}
              cy={235}
              rx={5}
              ry={33}
              fill="url(#fill-material)"
            />
            {/* Glow on filling material */}
            <ellipse
              cx={207}
              cy={200}
              rx={30}
              ry={70}
              fill="none"
              stroke="rgba(232, 160, 96, 0.3)"
              strokeWidth={2}
              filter="url(#glow-blue)"
            />
          </g>
        )}

        {/* Access hole — dark oval at top of tooth crown */}
        {accessHoleOpacity > 0 && sealOpacity < 0.8 && (
          <ellipse
            cx={207}
            cy={68}
            rx={12}
            ry={8}
            fill="rgba(10, 5, 20, 0.7)"
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth={1}
            opacity={accessHoleOpacity * (1 - sealOpacity)}
          />
        )}

        {/* Dental tool entering from above */}
        {toolOpacity > 0 && (
          <DentalTool
            yOffset={effectiveToolY}
            rotation={0}
            opacity={toolOpacity}
            x={207}
          />
        )}

        {/* Cleaning sparkle particles moving upward */}
        {cleanProgress > 0.1 && cleanProgress < 0.95 && (
          <g opacity={0.6}>
            {[
              { x: 200, baseY: 160, speed: 0.07, delay: 0 },
              { x: 214, baseY: 145, speed: 0.05, delay: 1 },
              { x: 195, baseY: 170, speed: 0.06, delay: 2 },
              { x: 210, baseY: 155, speed: 0.08, delay: 1.5 },
              { x: 203, baseY: 180, speed: 0.045, delay: 3 },
            ].map((p, i) => {
              const floatY =
                p.baseY - ((frame * p.speed + p.delay * 15) % 80);
              const particleOpacity = floatY > 60 && floatY < p.baseY ? 0.7 : 0;
              return (
                <circle
                  key={`clean-particle-${i}`}
                  cx={p.x + Math.sin(frame * 0.04 + p.delay) * 4}
                  cy={floatY}
                  r={2}
                  fill="#93c5fd"
                  opacity={particleOpacity * cleanProgress}
                />
              );
            })}
          </g>
        )}

        {/* Seal cap at the top of the tooth */}
        {sealOpacity > 0 && (
          <g opacity={sealOpacity}>
            {/* Seal shape — a rounded cap over the access hole */}
            <ellipse
              cx={207}
              cy={68}
              rx={interpolate(sealProgress, [0, 1], [4, 14], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })}
              ry={interpolate(sealProgress, [0, 1], [3, 9], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })}
              fill="rgba(224, 231, 255, 0.8)"
              stroke="rgba(255, 255, 255, 0.5)"
              strokeWidth={1.5}
            />
            {/* Highlight on seal */}
            <ellipse
              cx={204}
              cy={65}
              rx={5 * sealProgress}
              ry={3 * sealProgress}
              fill="rgba(255, 255, 255, 0.3)"
            />
          </g>
        )}

        {/* "Cleaned & Sealed" label */}
        <AnimatedLabel
          text="Cleaned & Sealed"
          frame={labelFrame}
          startFrame={170}
          x={250}
          y={355}
          color="#38bdf8"
          fontSize={22}
        />

        {/* Step progress indicators at the bottom */}
        {frame > 30 && (
          <g opacity={0.7}>
            {["Access", "Clean", "Fill", "Seal"].map((label, i) => {
              const stepActive =
                i === 0
                  ? frame >= 30
                  : i === 1
                    ? frame >= 80
                    : i === 2
                      ? frame >= 125
                      : frame >= 150;
              const stepX = 140 + i * 75;
              return (
                <g key={label}>
                  <circle
                    cx={stepX}
                    cy={380}
                    r={8}
                    fill={stepActive ? "rgba(56, 189, 248, 0.8)" : "transparent"}
                    stroke={
                      stepActive
                        ? "rgba(56, 189, 248, 0.9)"
                        : "rgba(255, 255, 255, 0.2)"
                    }
                    strokeWidth={1.5}
                  />
                  <text
                    x={stepX}
                    y={384}
                    fill={stepActive ? "#ffffff" : "rgba(255,255,255,0.3)"}
                    fontSize={8}
                    fontFamily="system-ui, -apple-system, sans-serif"
                    fontWeight="600"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    {i + 1}
                  </text>
                  <text
                    x={stepX}
                    y={398}
                    fill={
                      stepActive
                        ? "rgba(255,255,255,0.7)"
                        : "rgba(255,255,255,0.2)"
                    }
                    fontSize={9}
                    fontFamily="system-ui, -apple-system, sans-serif"
                    fontWeight="300"
                    textAnchor="middle"
                  >
                    {label}
                  </text>
                  {/* Connecting line to next step */}
                  {i < 3 && (
                    <line
                      x1={stepX + 10}
                      y1={380}
                      x2={stepX + 65}
                      y2={380}
                      stroke={
                        stepActive && frame >= [30, 80, 125, 150][i + 1]
                          ? "rgba(56, 189, 248, 0.5)"
                          : "rgba(255, 255, 255, 0.1)"
                      }
                      strokeWidth={1.5}
                    />
                  )}
                </g>
              );
            })}
          </g>
        )}
      </svg>
    </OverlayContainer>
  );
};

// =====================================================
// ROOT CANAL — OUTCOME OVERLAY
// =====================================================
// Shows the restored, healthy tooth with clean fills,
// sparkles, shield icon, and a protective aura.

export const RootCanalOutcomeOverlay: React.FC<OverlayProps> = ({
  frame,
  durationFrames,
  fps,
}) => {
  // --- Tooth fade-in (frames 20-60) ---
  const toothOpacity = interpolate(frame, [20, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const toothScale = spring({
    frame: Math.max(0, frame - 20),
    fps,
    config: { damping: 16, stiffness: 45 },
  });

  // --- Healthy green glow (frames 40-80) ---
  const healthyGlowOpacity = interpolate(frame, [40, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // --- Sparkles (frames 60-110) ---
  const sparklePositions = [
    { x: 145, y: 80 },
    { x: 270, y: 95 },
    { x: 160, y: 300 },
    { x: 255, y: 285 },
    { x: 135, y: 190 },
    { x: 280, y: 175 },
  ];

  // --- Shield (frames 80-130) ---
  const shieldProgress = interpolate(frame, [80, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // --- Label (frames 100-140) ---
  const labelFrame = frame;

  // --- Protection aura ring (frames 120-160) ---
  const auraProgress = interpolate(frame, [120, 160], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Gentle green glow pulsing
  const gentlePulse = 0.6 + Math.sin(frame * 0.08) * 0.15;

  return (
    <OverlayContainer>
      <svg
        viewBox="0 0 500 400"
        width="100%"
        height="100%"
        style={{ overflow: "visible" }}
      >
        <GlowFilters />

        <defs>
          {/* Clean fill gradient for canals */}
          <linearGradient
            id="outcome-canal-fill"
            x1="0.5"
            y1="0"
            x2="0.5"
            y2="1"
          >
            <stop offset="0%" stopColor="rgba(186, 230, 253, 0.7)" />
            <stop offset="50%" stopColor="rgba(147, 197, 253, 0.6)" />
            <stop offset="100%" stopColor="rgba(186, 230, 253, 0.5)" />
          </linearGradient>
          <radialGradient id="healthy-radial" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#34d399" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* LARGE molar tooth — clean and healthy version */}
        <g
          transform={`translate(100, 20) scale(${toothScale * 2})`}
          opacity={toothOpacity}
        >
          {/* We render MolarTooth but with showPulp/showCanals to show internal structure */}
          <MolarTooth
            showPulp={false}
            showCanals={false}
            fillColor="rgba(240, 230, 211, 0.8)"
            strokeColor="rgba(224, 231, 255, 0.9)"
            rootColor="rgba(212, 196, 168, 0.75)"
          />
        </g>

        {/* Clean fill material visible inside the tooth (light blue/white fills) */}
        <g opacity={toothOpacity * 0.7}>
          {/* Pulp chamber fill (clean material) */}
          <ellipse
            cx={207}
            cy={150}
            rx={16}
            ry={28}
            fill="url(#outcome-canal-fill)"
          />
          {/* Left canal fill */}
          <ellipse
            cx={183}
            cy={235}
            rx={5}
            ry={33}
            fill="url(#outcome-canal-fill)"
          />
          {/* Right canal fill */}
          <ellipse
            cx={228}
            cy={235}
            rx={5}
            ry={33}
            fill="url(#outcome-canal-fill)"
          />
          {/* Seal cap on top */}
          <ellipse
            cx={207}
            cy={68}
            rx={14}
            ry={9}
            fill="rgba(224, 231, 255, 0.75)"
            stroke="rgba(255, 255, 255, 0.4)"
            strokeWidth={1.2}
          />
          {/* Seal highlight */}
          <ellipse
            cx={204}
            cy={65}
            rx={5}
            ry={3}
            fill="rgba(255, 255, 255, 0.25)"
          />
        </g>

        {/* Healthy green glow emanating from the tooth */}
        {healthyGlowOpacity > 0 && (
          <g opacity={healthyGlowOpacity * gentlePulse}>
            <ellipse
              cx={207}
              cy={185}
              rx={65}
              ry={100}
              fill="url(#healthy-radial)"
              filter="url(#glow-green)"
            />
            {/* Subtle inner green ring */}
            <ellipse
              cx={207}
              cy={185}
              rx={45}
              ry={70}
              fill="none"
              stroke="rgba(52, 211, 153, 0.15)"
              strokeWidth={2}
            />
          </g>
        )}

        {/* Sparkle group */}
        <SparkleGroup
          frame={frame}
          fps={fps}
          startFrame={60}
          positions={sparklePositions}
        />

        {/* Shield icon */}
        {shieldProgress > 0 && (
          <ShieldIcon
            progress={shieldProgress}
            x={360}
            y={120}
            size={55}
            color="#34d399"
          />
        )}

        {/* "Saved & Protected" label */}
        <AnimatedLabel
          text="Saved & Protected"
          frame={labelFrame}
          startFrame={105}
          x={250}
          y={355}
          color="#34d399"
          fontSize={22}
        />

        {/* Protection aura ring — circular drawing path around the tooth */}
        {auraProgress > 0 && (
          <DrawingPath
            d="M 207 50 C 290 50, 330 110, 330 185 C 330 260, 290 330, 207 330 C 124 330, 84 260, 84 185 C 84 110, 124 50, 207 50 Z"
            progress={auraProgress}
            color="rgba(52, 211, 153, 0.35)"
            strokeWidth={2.5}
          />
        )}

        {/* Gentle pulsing green outer glow on hold */}
        {frame > 140 && (
          <ellipse
            cx={207}
            cy={185}
            rx={90 + Math.sin(frame * 0.06) * 5}
            ry={130 + Math.sin(frame * 0.06) * 5}
            fill="none"
            stroke="rgba(52, 211, 153, 0.1)"
            strokeWidth={3}
            opacity={gentlePulse * 0.6}
          />
        )}
      </svg>
    </OverlayContainer>
  );
};
