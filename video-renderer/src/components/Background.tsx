import React from "react";
import { useVideoConfig } from "remotion";
import { COLORS } from "../lib/colors";

export const Background: React.FC<{
  accentColor?: string;
  variant?: "default" | "warm" | "cool" | "journey";
}> = ({ accentColor = COLORS.purple, variant = "default" }) => {
  const { width, height } = useVideoConfig();

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

      {/* Static accent glow */}
      <div
        style={{
          position: "absolute",
          left: "30%",
          top: "25%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${accentColor}14 0%, transparent 70%)`,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Vignette */}
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
