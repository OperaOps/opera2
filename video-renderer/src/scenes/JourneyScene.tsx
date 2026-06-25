import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";
import { Background } from "../components/Background";
import { ClinicBranding } from "../components/ClinicBranding";
import { SceneHeading, BulletList } from "../components/SceneHeading";
import { COLORS } from "../lib/colors";
import { DentalVideoClip } from "../components/DentalVideoClip";
import { getDentalVideoClips } from "../lib/dental-video-assets";
import { HealingOsseointegrationVisual } from "../components/dental/treatments/HealingOsseointegrationVisual";
import { PremiumVisualFrame } from "../components/PremiumVisualFrame";
import { getFocusSettleExplain } from "../lib/focus-settle-motion";
import { HERO_VISUAL_HEIGHT, HERO_VISUAL_WIDTH } from "../lib/visual-layout";
import { PremiumJourneyTextPanel } from "../components/PremiumJourneyTextPanel";

/** Cyan/teal color for the Journey badge */
const BADGE_COLOR = "#06b6d4";

const DEFAULT_MILESTONES = [
  "Month 1",
  "Month 3",
  "Month 6",
  "Month 9",
  "Month 12",
];

function shortenMilestone(label: string, total: number): string {
  const colonIdx = label.indexOf(":");
  if (colonIdx > 0 && colonIdx < 30) return label.slice(0, colonIdx).trim();
  const dashIdx = label.indexOf(" — ");
  if (dashIdx > 0 && dashIdx < 30) return label.slice(0, dashIdx).trim();
  const maxLen = total <= 3 ? 30 : total <= 5 ? 24 : 18;
  if (label.length > maxLen + 2) return label.slice(0, maxLen).trim() + "…";
  return label;
}

export const JourneyScene: React.FC<{
  heading: string;
  bullets?: string[];
  milestones?: string[];
  treatment?: string;
  clinicName: string;
  doctorName: string;
  durationFrames: number;
  accentColor?: string;
  premiumJourneyStyle?: boolean;
}> = ({
  heading,
  bullets = [],
  milestones = DEFAULT_MILESTONES,
  treatment,
  clinicName,
  doctorName,
  durationFrames,
  accentColor = COLORS.purple,
  premiumJourneyStyle = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Journey can show dental video clips (e.g. implant placement for full_mouth_rehab)
  const dentalVideoClips = treatment
    ? getDentalVideoClips(treatment, "journey")
    : undefined;

  const hasVideoClips = !!(dentalVideoClips && dentalVideoClips.length > 0);
  const isFmr = treatment === "full_mouth_rehab";
  const useFse = premiumJourneyStyle && hasVideoClips;
  const fse = getFocusSettleExplain(frame, fps, "left", useFse);

  const timelineScale = spring({
    frame: Math.max(0, frame - 8),
    fps,
    config: { damping: 20, stiffness: 60 },
  });

  // Fade out at end
  const fadeOut = interpolate(
    frame,
    [durationFrames - 15, durationFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Progress along the timeline (0 to 1 over the scene)
  const timelineProgress = interpolate(
    frame,
    [30, Math.max(31, durationFrames - 40)],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Badge glow
  const badgeGlow = interpolate(
    Math.sin(frame * 0.05),
    [-1, 1],
    [0.5, 0.9]
  );

  // Timeline layout — generous side margins so edge labels never clip.
  // Edge labels are also anchored start/end (below) so they can never run
  // off the canvas regardless of how long the milestone text is.
  const TIMELINE_LEFT = 210;
  const TIMELINE_RIGHT = 1710;
  const TIMELINE_Y = 610;
  const totalWidth = TIMELINE_RIGHT - TIMELINE_LEFT;

  const hasFmrJourney = !!(isFmr && hasVideoClips);
  const journeySplit =
    hasFmrJourney && durationFrames > 40 ? Math.floor(durationFrames * 0.52) : Number.POSITIVE_INFINITY;
  const journeyVideoOpacity = hasFmrJourney
    ? interpolate(
        frame,
        [Math.max(0, journeySplit - 22), journeySplit],
        [1, 0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      )
    : 1;
  const healingMomentOpacity = hasFmrJourney
    ? interpolate(
        frame,
        [Math.max(0, journeySplit - 14), journeySplit + 14],
        [0, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      )
    : 0;
  const healingProgress = hasFmrJourney
    ? interpolate(
        frame,
        [journeySplit, Math.max(journeySplit + 1, durationFrames - 24)],
        [0, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      )
    : 0;

  const journeyBgVariant = premiumJourneyStyle ? "journey" : "cool";

  return (
    <AbsoluteFill>
      <Background accentColor={BADGE_COLOR} variant={journeyBgVariant} />

      {/* Minimal branding */}
      <ClinicBranding
        clinicName={clinicName}
        doctorName={doctorName}
        variant="minimal"
        accentColor={accentColor}
      />

      {/* Split layout (video | copy) matches Treatment / WhatToExpect — copy is vertically centered */}
      {hasVideoClips ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "row",
            alignItems: "stretch",
            opacity: fadeOut,
            padding: "90px 72px 120px",
            gap: 0,
          }}
        >
          <div
            style={{
              flex: "0 0 55%",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: 0,
            }}
          >
            <div
              style={{
                position: "relative",
                width: HERO_VISUAL_WIDTH,
                height: HERO_VISUAL_HEIGHT,
                transform: useFse
                  ? `translateX(${fse.translateXPercent}%) scale(${fse.scaleMul})`
                  : undefined,
                transformOrigin: "center center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: journeyVideoOpacity,
                }}
              >
                <DentalVideoClip
                  clips={dentalVideoClips!}
                  width={HERO_VISUAL_WIDTH}
                  height={HERO_VISUAL_HEIGHT}
                />
              </div>
              {hasFmrJourney && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    opacity: healingMomentOpacity,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <PremiumVisualFrame
                    width={HERO_VISUAL_WIDTH}
                    height={HERO_VISUAL_HEIGHT}
                    borderRadius={20}
                  >
                    <div
                      style={{
                        padding: "10px 14px",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxSizing: "border-box",
                      }}
                    >
                      <HealingOsseointegrationVisual progress={healingProgress} />
                    </div>
                  </PremiumVisualFrame>
                </div>
              )}
            </div>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(105deg, transparent 0%, transparent 50%, rgba(255,255,255,0.6) 80%, rgba(255,255,255,0.85) 100%)",
                pointerEvents: "none",
              }}
            />
          </div>

          <div
            style={{
              flex: "0 0 45%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "stretch",
              minWidth: 0,
              paddingLeft: 24,
              paddingRight: 16,
            }}
          >
            <PremiumJourneyTextPanel
              accentBarColor={BADGE_COLOR}
              opacity={fse.textColumnOpacity}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 18,
                  opacity: badgeGlow,
                }}
              >
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    background: BADGE_COLOR,
                    boxShadow: `0 0 6px ${BADGE_COLOR}40`,
                  }}
                />
                <span
                  style={{
                    color: BADGE_COLOR,
                    fontSize: 15,
                    fontWeight: 500,
                    fontFamily: "system-ui, sans-serif",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Your Treatment Journey
                </span>
              </div>

              <SceneHeading heading={heading} accentColor={accentColor} />

              {bullets.length > 0 && (
                <BulletList items={bullets} accentColor={accentColor} />
              )}
            </PremiumJourneyTextPanel>
          </div>
        </div>
      ) : (
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          opacity: fadeOut,
          padding: "90px 80px 60px",
        }}
      >
        <div
          style={{
            flex: "0 0 auto",
            marginBottom: 40,
          }}
        >
          {premiumJourneyStyle ? (
            <PremiumJourneyTextPanel
              accentBarColor={BADGE_COLOR}
              opacity={interpolate(frame, [0, 12], [0, 1], {
                extrapolateRight: "clamp",
              })}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 18,
                  opacity: badgeGlow,
                }}
              >
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    background: BADGE_COLOR,
                    boxShadow: `0 0 6px ${BADGE_COLOR}40`,
                  }}
                />
                <span
                  style={{
                    color: BADGE_COLOR,
                    fontSize: 15,
                    fontWeight: 500,
                    fontFamily: "system-ui, sans-serif",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Your Treatment Journey
                </span>
              </div>

              <SceneHeading heading={heading} accentColor={accentColor} />

              {bullets.length > 0 && (
                <BulletList items={bullets} accentColor={accentColor} />
              )}
            </PremiumJourneyTextPanel>
          ) : (
            <>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 20,
                  opacity: badgeGlow,
                }}
              >
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    background: BADGE_COLOR,
                    boxShadow: `0 0 6px ${BADGE_COLOR}40`,
                  }}
                />
                <span
                  style={{
                    color: BADGE_COLOR,
                    fontSize: 16,
                    fontWeight: 500,
                    fontFamily: "system-ui, sans-serif",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  Your Treatment Journey
                </span>
              </div>

              <SceneHeading heading={heading} accentColor={accentColor} />

              {bullets.length > 0 && (
                <BulletList items={bullets} accentColor={accentColor} />
              )}
            </>
          )}
        </div>

        {/* Timeline section — only when no video clips */}
        {!hasVideoClips && (
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scaleX(${timelineScale})`,
            transformOrigin: "left center",
          }}
        >
          <svg
            viewBox={`0 520 1920 260`}
            style={{ width: "100%", height: 240, overflow: "visible" }}
          >
            <defs>
              <linearGradient id="journeyTrackGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#e5e7eb" />
                <stop offset="50%" stopColor="#d1d5db" />
                <stop offset="100%" stopColor="#e5e7eb" />
              </linearGradient>
              <linearGradient id="journeyProgressGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={accentColor} />
                <stop offset="100%" stopColor={BADGE_COLOR} />
              </linearGradient>
              <filter id="journeyGlow" x="-10%" y="-50%" width="120%" height="200%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Track background */}
            <rect
              x={TIMELINE_LEFT}
              y={TIMELINE_Y - 2}
              width={totalWidth}
              height={4}
              rx={2}
              fill="url(#journeyTrackGrad)"
            />

            {/* Progress fill */}
            <rect
              x={TIMELINE_LEFT}
              y={TIMELINE_Y - 2}
              width={totalWidth * timelineProgress}
              height={4}
              rx={2}
              fill="url(#journeyProgressGrad)"
              filter="url(#journeyGlow)"
            />

            {/* Progress indicator head */}
            <circle
              cx={TIMELINE_LEFT + totalWidth * timelineProgress}
              cy={TIMELINE_Y}
              r={8}
              fill={BADGE_COLOR}
              opacity={timelineProgress > 0.01 ? 1 : 0}
              filter="url(#journeyGlow)"
            />
            <circle
              cx={TIMELINE_LEFT + totalWidth * timelineProgress}
              cy={TIMELINE_Y}
              r={4}
              fill="white"
              opacity={timelineProgress > 0.01 ? 0.9 : 0}
            />

            {/* Milestones */}
            {milestones.map((label, i) => {
              const fraction = i / (milestones.length - 1);
              const cx = TIMELINE_LEFT + totalWidth * fraction;
              // First/last labels anchor inward so they grow toward the center
              // and can never clip off the left/right edge of the canvas.
              const isFirst = i === 0;
              const isLast = i === milestones.length - 1;
              const labelAnchor = isFirst ? "start" : isLast ? "end" : "middle";
              const isLit = timelineProgress >= fraction;
              const justLit = timelineProgress >= fraction && timelineProgress < fraction + 0.08;

              // Staggered appearance
              const milestoneOpacity = interpolate(
                frame,
                [15 + i * 6, 25 + i * 6],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );

              return (
                <g key={i} opacity={milestoneOpacity}>
                  {/* Outer ring */}
                  <circle
                    cx={cx}
                    cy={TIMELINE_Y}
                    r={14}
                    fill={isLit ? "#ffffff" : "#f3f4f6"}
                    stroke={isLit ? BADGE_COLOR : "#d1d5db"}
                    strokeWidth={isLit ? 2 : 1}
                  />

                  {/* Inner dot */}
                  <circle
                    cx={cx}
                    cy={TIMELINE_Y}
                    r={5}
                    fill={isLit ? BADGE_COLOR : "#d1d5db"}
                    opacity={isLit ? 1 : 0.6}
                  />

                  {/* Glow when just activated */}
                  {justLit && (
                    <circle
                      cx={cx}
                      cy={TIMELINE_Y}
                      r={20}
                      fill={BADGE_COLOR}
                      opacity={0.15}
                      filter="url(#journeyGlow)"
                    />
                  )}

                  {/* Checkmark for completed milestones */}
                  {isLit && !justLit && (
                    <path
                      d={`M${cx - 4},${TIMELINE_Y} L${cx - 1},${TIMELINE_Y + 3} L${cx + 4},${TIMELINE_Y - 3}`}
                      fill="none"
                      stroke={BADGE_COLOR}
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity={0.9}
                    />
                  )}

                  {/* Milestone label */}
                  <text
                    x={cx}
                    y={TIMELINE_Y + 36}
                    textAnchor={labelAnchor}
                    fill={isLit ? COLORS.textPrimary : COLORS.textMuted}
                    fontSize={milestones.length <= 4 ? 16 : 14}
                    fontFamily="system-ui, sans-serif"
                    fontWeight={isLit ? 500 : 300}
                    letterSpacing="0.02em"
                  >
                    {shortenMilestone(label, milestones.length)}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
        )}
      </div>
      )}
    </AbsoluteFill>
  );
};
