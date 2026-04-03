import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../../../lib/colors";
import { DiagramLabelFooter } from "../DiagramLabelFooter";

interface FullArchRestorationVisualProps {
  progress: number;
}

export const FullArchRestorationVisual: React.FC<FullArchRestorationVisualProps> = ({ progress }) => {
  const frame = useCurrentFrame();

  const reveal = interpolate(progress, [0, 0.08], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Phase 1: Show implant posts in jawbone (0 - 0.2)
  const postsReveal = interpolate(progress, [0, 0.2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 2: Abutments attach (0.2 - 0.4)
  const abutmentsReveal = interpolate(progress, [0.2, 0.4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 3: Full arch prosthesis descends (0.4 - 0.7)
  const archDescent = interpolate(progress, [0.4, 0.7], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const archY = interpolate(archDescent, [0, 1], [-80, 0]);

  // Phase 4: Final click + shine (0.7 - 1.0)
  const finalShine = interpolate(progress, [0.75, 0.95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const labelOpacity = interpolate(progress, [0.88, 0.98], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Implant post positions (4 posts for All-on-4)
  const implantPosts = [
    { x: 80, angle: -15 },
    { x: 130, angle: -5 },
    { x: 170, angle: 5 },
    { x: 220, angle: 15 },
  ];

  // Teeth positions on the arch
  const teethPositions = [
    { x: 52, w: 16 },
    { x: 70, w: 15 },
    { x: 87, w: 16 },
    { x: 105, w: 17 },
    { x: 124, w: 16 },
    { x: 142, w: 15 },
    { x: 158, w: 15 },
    { x: 176, w: 16 },
    { x: 195, w: 17 },
    { x: 213, w: 16 },
    { x: 230, w: 15 },
    { x: 248, w: 16 },
  ];

  return (
    <svg viewBox="0 0 360 400" overflow="hidden" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="faBoneGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.bone} />
          <stop offset="60%" stopColor={COLORS.jawbone} />
          <stop offset="100%" stopColor="#b0a880" />
        </linearGradient>
        <linearGradient id="faGumGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.gumPink} />
          <stop offset="100%" stopColor="#c08090" />
        </linearGradient>
        <linearGradient id="faTitaniumGrad" x1="0.15" y1="0" x2="0.85" y2="1">
          <stop offset="0%" stopColor="#c8d0dc" />
          <stop offset="30%" stopColor={COLORS.implantTitanium} />
          <stop offset="70%" stopColor="#909cac" />
          <stop offset="100%" stopColor="#788090" />
        </linearGradient>
        <linearGradient id="faArchGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f8f5ff" />
          <stop offset="30%" stopColor={COLORS.toothWhite} />
          <stop offset="70%" stopColor={COLORS.enamel} />
          <stop offset="100%" stopColor={COLORS.toothShadow} />
        </linearGradient>
        <linearGradient id="faFrameGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b0b8c8" />
          <stop offset="100%" stopColor="#808898" />
        </linearGradient>
        <linearGradient id="faAbutGrad" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#d0d4dc" />
          <stop offset="50%" stopColor="#b0b8c4" />
          <stop offset="100%" stopColor="#8890a0" />
        </linearGradient>
        <filter id="faShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.3" />
        </filter>
        <filter id="faSparkle" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id="faReveal">
          <rect
            x="0"
            y={interpolate(reveal, [0, 1], [400, 0])}
            width="360"
            height="400"
          />
        </clipPath>
      </defs>

      <rect width="360" height="400" fill="#0a0810" />
      <g clipPath="url(#faReveal)" transform="translate(30, 4)">
        {/* Jawbone */}
        <path
          d="M10,175 L10,370 Q150,400 290,370 L290,175 Q240,160 150,155 Q60,160 10,175 Z"
          fill="url(#faBoneGrad)"
          opacity={0.5}
        />
        {/* Bone texture */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <circle
            key={`fbt-${i}`}
            cx={35 + i * 33 + Math.sin(i * 2.3) * 6}
            cy={255 + Math.cos(i * 2.8) * 30}
            r={6 + (i % 3) * 2}
            fill={COLORS.bone}
            opacity={0.1}
          />
        ))}

        {/* Implant posts */}
        {implantPosts.map((post, i) => {
          const postProgress = interpolate(
            postsReveal,
            [i * 0.2, Math.min(i * 0.2 + 0.4, 1)],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const postY = interpolate(postProgress, [0, 1], [-60, 0]);

          return (
            <g
              key={`post-${i}`}
              transform={`translate(${post.x}, 0) rotate(${post.angle}, 0, 240)`}
              opacity={interpolate(postProgress, [0, 0.15, 1], [0, 1, 1])}
            >
              {/* Screw body */}
              <rect
                x={-7}
                y={175 + postY}
                width={14}
                height={85}
                rx={2}
                fill="url(#faTitaniumGrad)"
                filter="url(#faShadow)"
              />
              {/* Thread grooves */}
              {Array.from({ length: 5 }).map((_, j) => (
                <line
                  key={`th-${i}-${j}`}
                  x1={-9}
                  y1={185 + j * 15 + postY}
                  x2={9}
                  y2={185 + j * 15 + postY}
                  stroke="#788090"
                  strokeWidth={0.6}
                  opacity={0.5}
                />
              ))}
              {/* Screw tip */}
              <path
                d={`M-5,${260 + postY} L0,${270 + postY} L5,${260 + postY}`}
                fill="url(#faTitaniumGrad)"
              />
              {/* Shine */}
              <rect
                x={-2}
                y={180 + postY}
                width={2}
                height={75}
                rx={1}
                fill="white"
                opacity={0.12}
              />
            </g>
          );
        })}

        {/* Abutments on each post */}
        {implantPosts.map((post, i) => {
          const abutProgress = interpolate(
            abutmentsReveal,
            [i * 0.15, Math.min(i * 0.15 + 0.4, 1)],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const abutY = interpolate(abutProgress, [0, 1], [-30, 0]);

          return (
            <g
              key={`abut-${i}`}
              transform={`translate(${post.x}, ${abutY})`}
              opacity={interpolate(abutProgress, [0, 0.15, 1], [0, 1, 1])}
            >
              <path
                d={`M-5,155 L-8,170 L-9,175 L9,175 L8,170 L5,155 Z`}
                fill="url(#faAbutGrad)"
                stroke="#808898"
                strokeWidth={0.4}
              />
              <circle cx={0} cy={158} r={2} fill="#707888" opacity={0.4} />
            </g>
          );
        })}

        {/* Full arch prosthesis */}
        <g
          transform={`translate(0, ${archY})`}
          opacity={interpolate(archDescent, [0, 0.1, 1], [0, 1, 1])}
          filter="url(#faShadow)"
        >
          {/* Metal framework bar */}
          <path
            d="M42,148 Q150,138 258,148 L256,155 Q150,145 44,155 Z"
            fill="url(#faFrameGrad)"
            opacity={0.8}
          />

          {/* Gum-colored acrylic base */}
          <path
            d="M38,125 Q150,112 262,125 L258,155 Q150,142 42,155 Z"
            fill="url(#faGumGrad)"
            opacity={0.7}
          />

          {/* Individual teeth */}
          {teethPositions.map((tooth, i) => {
            const toothH = 38 + (i >= 4 && i <= 7 ? 6 : 0); // front teeth taller
            return (
              <g key={`tooth-${i}`}>
                <rect
                  x={tooth.x - tooth.w / 2}
                  y={125 - toothH + 15}
                  width={tooth.w - 1}
                  height={toothH}
                  rx={3}
                  fill="url(#faArchGrad)"
                  stroke={COLORS.toothDark}
                  strokeWidth={0.3}
                />
                {/* Tooth shine */}
                <rect
                  x={tooth.x - tooth.w / 2 + 2}
                  y={125 - toothH + 18}
                  width={3}
                  height={toothH * 0.6}
                  rx={1.5}
                  fill="white"
                  opacity={0.12}
                />
              </g>
            );
          })}
        </g>

        {/* Click/snap indicators when arch seats */}
        {archDescent > 0.9 && (
          <g>
            {implantPosts.map((post, i) => (
              <g key={`snap-${i}`} opacity={finalShine * 0.6}>
                <circle
                  cx={post.x}
                  cy={155}
                  r={4 + Math.sin(frame * 0.08 + i) * 1}
                  fill="none"
                  stroke={COLORS.healthyTeal}
                  strokeWidth={1}
                  opacity={0.5}
                />
              </g>
            ))}
          </g>
        )}

        {/* Final sparkle */}
        {finalShine > 0 && (
          <g opacity={finalShine} filter="url(#faSparkle)">
            {[
              { x: 105, y: 95 },
              { x: 155, y: 90 },
              { x: 200, y: 95 },
            ].map((sp, i) => (
              <g key={`sp-${i}`} transform={`translate(${sp.x}, ${sp.y + archY})`}>
                <line
                  x1="-4"
                  y1="0"
                  x2="4"
                  y2="0"
                  stroke="white"
                  strokeWidth={1}
                  opacity={0.6 + Math.sin(frame * 0.07 + i * 1.5) * 0.3}
                />
                <line
                  x1="0"
                  y1="-4"
                  x2="0"
                  y2="4"
                  stroke="white"
                  strokeWidth={1}
                  opacity={0.6 + Math.sin(frame * 0.07 + i * 1.5) * 0.3}
                />
              </g>
            ))}
          </g>
        )}

      </g>
      <DiagramLabelFooter
        opacity={labelOpacity}
        vbWidth={360}
        y={308}
        items={[
          { title: "Titanium implants", subtitle: "Anchors in bone" },
          { title: "Full arch", subtitle: "Prosthesis seats" },
          { title: "Framework", subtitle: "Even distribution" },
        ]}
      />
    </svg>
  );
};
