import React from "react";
import { useCurrentFrame, interpolate, useVideoConfig } from "remotion";

/** Soft fade-in for incoming scene — reduces slideshow pop. */
export const SceneEnterFade: React.FC<{
  children: React.ReactNode;
  fadeInFrames?: number;
}> = ({ children, fadeInFrames = 18 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const safeFade = Math.min(fadeInFrames, Math.max(8, Math.round(fps * 0.85)));
  const opacity = interpolate(frame, [0, safeFade], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div style={{ width: "100%", height: "100%", opacity }}>
      {children}
    </div>
  );
};
