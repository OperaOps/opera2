import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import type { CaptionEntry } from "../lib/schema";
import { COLORS } from "../lib/colors";

export const Captions: React.FC<{
  captions: CaptionEntry[];
  style?: React.CSSProperties;
}> = ({ captions, style }) => {
  const frame = useCurrentFrame();

  const activeCaption = captions.find(
    (c) => frame >= c.startFrame && frame < c.endFrame
  );

  if (!activeCaption) return null;

  const fadeIn = interpolate(
    frame,
    [activeCaption.startFrame, activeCaption.startFrame + 6],
    [0, 1],
    { extrapolateRight: "clamp" }
  );
  const fadeOut = interpolate(
    frame,
    [activeCaption.endFrame - 6, activeCaption.endFrame],
    [1, 0],
    { extrapolateRight: "clamp" }
  );
  const opacity = Math.min(fadeIn, fadeOut);

  const slideUp = interpolate(
    frame,
    [activeCaption.startFrame, activeCaption.startFrame + 8],
    [8, 0],
    { extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        position: "absolute",
        bottom: 80,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        zIndex: 100,
        ...style,
      }}
    >
      <div
        style={{
          opacity,
          transform: `translateY(${slideUp}px)`,
          background: "rgba(0, 0, 0, 0.65)",
          
          borderRadius: 12,
          padding: "14px 32px",
          maxWidth: "75%",
          border: `1px solid rgba(255,255,255,0.08)`,
        }}
      >
        <span
          style={{
            color: COLORS.textPrimary,
            fontSize: 32,
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontWeight: 400,
            lineHeight: 1.4,
            letterSpacing: "0.01em",
            textAlign: "center",
            display: "block",
          }}
        >
          {activeCaption.text}
        </span>
      </div>
    </div>
  );
};
