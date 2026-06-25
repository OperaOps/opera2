import React from "react";
import { useVideoConfig } from "remotion";
import { COLORS } from "../lib/colors";

export const Background: React.FC<{
  accentColor?: string;
  variant?: "default" | "warm" | "cool" | "journey" | "light";
}> = ({ accentColor = COLORS.purple, variant = "light" }) => {
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
      {/* Clean white base */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: COLORS.bgPrimary,
        }}
      />

      {/* Very subtle accent radial — barely visible warmth */}
      <div
        style={{
          position: "absolute",
          left: "40%",
          top: "30%",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${accentColor}06 0%, transparent 70%)`,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Subtle bottom-right warmth */}
      <div
        style={{
          position: "absolute",
          right: "10%",
          bottom: "10%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${accentColor}04 0%, transparent 70%)`,
        }}
      />

      {/* Top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${accentColor}20, transparent)`,
        }}
      />
    </div>
  );
};
