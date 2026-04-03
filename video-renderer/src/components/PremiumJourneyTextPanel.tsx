import React from "react";

/**
 * Glass text module for premium split layouts — keeps copy aligned, bounded width,
 * and visually consistent across FMR / journey beats (not floating in a corner).
 */
export const PremiumJourneyTextPanel: React.FC<{
  accentBarColor: string;
  children: React.ReactNode;
  /** Multiply opacity for focus-settle / scene fades */
  opacity?: number;
  maxWidth?: number;
}> = ({
  accentBarColor,
  children,
  opacity = 1,
  maxWidth = 580,
}) => (
  <div
    style={{
      opacity,
      width: "100%",
      maxWidth,
      alignSelf: "center",
      background: "rgba(0,0,0,0.46)",
      backdropFilter: "blur(22px)",
      WebkitBackdropFilter: "blur(22px)",
      borderRadius: 22,
      border: "1px solid rgba(255,255,255,0.11)",
      borderLeft: `4px solid ${accentBarColor}`,
      boxShadow:
        "0 28px 100px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)",
      padding: "34px 38px 40px",
      boxSizing: "border-box",
    }}
  >
    {children}
  </div>
);
