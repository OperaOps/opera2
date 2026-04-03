import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { COLORS } from "../lib/colors";

export const Background: React.FC<{
  accentColor?: string;
  variant?: "default" | "warm" | "cool" | "journey";
}> = ({ accentColor = COLORS.purple, variant = "default" }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Slow-moving gradient orbs for depth
  const orb1X = interpolate(frame, [0, 900], [0.15, 0.35], {
    extrapolateRight: "clamp",
  });
  const orb1Y = interpolate(frame, [0, 900], [0.2, 0.4], {
    extrapolateRight: "clamp",
  });
  const orb2X = interpolate(frame, [0, 900], [0.75, 0.55], {
    extrapolateRight: "clamp",
  });
  const orb2Y = interpolate(frame, [0, 900], [0.7, 0.5], {
    extrapolateRight: "clamp",
  });
  const orb3X = interpolate(frame, [0, 900], [0.5, 0.6], {
    extrapolateRight: "clamp",
  });

  const orbColors =
    variant === "warm"
      ? ["rgba(139, 92, 246, 0.08)", "rgba(168, 85, 247, 0.06)", "rgba(124, 58, 237, 0.04)"]
      : variant === "cool"
        ? ["rgba(59, 130, 246, 0.08)", "rgba(6, 182, 212, 0.06)", "rgba(124, 58, 237, 0.04)"]
        : ["rgba(124, 58, 237, 0.08)", "rgba(109, 40, 217, 0.05)", "rgba(88, 28, 135, 0.04)"];

  // Floating particles
  const particles = Array.from({ length: 20 }, (_, i) => {
    const speed = 0.3 + (i % 5) * 0.15;
    const baseX = ((i * 137.5) % width);
    const baseY = ((i * 89.3) % height);
    const x = baseX + Math.sin((frame * speed * 0.01) + i) * 30;
    const y = baseY - (frame * speed * 0.3) % (height + 40) + 20;
    const opacity = interpolate(
      (y + 40) % (height + 40),
      [0, height * 0.3, height * 0.7, height],
      [0, 0.15, 0.15, 0]
    );
    const size = 1.5 + (i % 4);
    return { x, y: ((y % (height + 40)) + height + 40) % (height + 40) - 20, opacity, size };
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width,
        height,
        overflow: "hidden",
      }}
    >
      {/* Base gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(160deg, ${COLORS.bgDark} 0%, ${COLORS.bgMid} 40%, ${COLORS.bgCard} 100%)`,
        }}
      />

      {/* Gradient orbs */}
      <div
        style={{
          position: "absolute",
          left: `${orb1X * 100}%`,
          top: `${orb1Y * 100}%`,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${orbColors[0]} 0%, transparent 70%)`,
          transform: "translate(-50%, -50%)",
          filter: "blur(60px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: `${orb2X * 100}%`,
          top: `${orb2Y * 100}%`,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${orbColors[1]} 0%, transparent 70%)`,
          transform: "translate(-50%, -50%)",
          filter: "blur(50px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: `${orb3X * 100}%`,
          top: "30%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${orbColors[2]} 0%, transparent 70%)`,
          transform: "translate(-50%, -50%)",
          filter: "blur(40px)",
        }}
      />

      {/* Floating particles */}
      <svg
        style={{ position: "absolute", inset: 0 }}
        width={width}
        height={height}
      >
        {particles.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={p.size}
            fill={accentColor}
            opacity={p.opacity}
          />
        ))}
      </svg>

      {/* Vignette — slightly stronger on "journey" for a more cinematic frame */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            variant === "journey"
              ? "radial-gradient(ellipse at 70% 30%, transparent 35%, rgba(0,0,0,0.55) 100%)"
              : "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)",
        }}
      />

      {/* Top subtle line accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${accentColor}33, transparent)`,
        }}
      />
    </div>
  );
};
