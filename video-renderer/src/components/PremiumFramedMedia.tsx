import React from "react";
import { PremiumVisualFrame } from "./PremiumVisualFrame";

/**
 * Same outer frame as {@link DentalVideoClip} — use for premium stills (CinematicImage)
 * so hero media matches clip treatment. Outer grading is off; CinematicImage applies
 * VisualStandardTreatment internally.
 */
export const PremiumFramedMedia: React.FC<{
  width: number;
  height: number;
  borderRadius?: number;
  children: React.ReactNode;
}> = ({ width, height, borderRadius = 24, children }) => (
  <PremiumVisualFrame
    width={width}
    height={height}
    borderRadius={borderRadius}
    standardTreatment={false}
  >
    <div
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        borderRadius: Math.max(0, borderRadius - 2),
        position: "relative",
      }}
    >
      {children}
    </div>
  </PremiumVisualFrame>
);
