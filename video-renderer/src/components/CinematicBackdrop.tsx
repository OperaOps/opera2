import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

/**
 * Subtle drifting gradient behind premium scenes — reduces hard "slide" cuts between sequences.
 */
export const CinematicBackdrop: React.FC<{ accentColor?: string }> = ({
  accentColor = "#4c1d95",
}) => {
  const frame = useCurrentFrame();
  const drift = frame * 0.015;
  const pulse = interpolate(Math.sin(frame * 0.02), [-1, 1], [0.85, 1]);

  return (
    <AbsoluteFill style={{ zIndex: 0, pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          inset: -40,
          background: `
            radial-gradient(ellipse 80% 60% at ${50 + Math.sin(drift) * 8}% ${45 + Math.cos(drift * 0.7) * 6}%,
              ${accentColor}14 0%,
              transparent 50%),
            radial-gradient(ellipse 70% 50% at ${30 + Math.cos(drift * 0.9) * 10}% 70%,
              rgba(6, 182, 212, 0.06) 0%,
              transparent 45%),
            linear-gradient(180deg, #050508 0%, #0a0812 40%, #06040c 100%)
          `,
          opacity: pulse,
        }}
      />
    </AbsoluteFill>
  );
};
