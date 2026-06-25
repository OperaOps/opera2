import React from "react";

export const PremiumJourneyTextPanel: React.FC<{
  accentBarColor: string;
  children: React.ReactNode;
  opacity?: number;
  maxWidth?: number;
}> = ({
  accentBarColor,
  children,
  opacity = 1,
  maxWidth = 720,
}) => (
  <div
    style={{
      opacity,
      width: "100%",
      maxWidth,
      alignSelf: "center",
      background: "rgba(255, 255, 255, 0.92)",
      backdropFilter: "blur(12px)",
      borderRadius: 22,
      border: "1px solid #e5e7eb",
      borderLeft: `4px solid ${accentBarColor}`,
      boxShadow: "0 4px 24px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.03)",
      padding: "34px 38px 40px",
      boxSizing: "border-box",
    }}
  >
    {children}
  </div>
);
