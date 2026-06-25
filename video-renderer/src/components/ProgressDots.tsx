import React from "react";
import { COLORS } from "../lib/colors";

const DEFAULT_5_LABELS = ["Welcome", "Diagnosis", "Treatment", "Results", "Next Steps"];
const DEFAULT_8_LABELS = ["Welcome", "Diagnosis", "Deep Dive", "Treatment", "Journey", "Results", "Aftercare", "Next Steps"];

export const ProgressDots: React.FC<{
  activeScene: number;
  totalScenes?: number;
  accentColor?: string;
  sceneLabels?: string[];
}> = ({ activeScene, totalScenes = 5, accentColor = COLORS.purple, sceneLabels }) => {
  const labels = sceneLabels ?? (totalScenes === 8 ? DEFAULT_8_LABELS : DEFAULT_5_LABELS);
  return (
    <div
      style={{
        position: "absolute",
        bottom: 32,
        right: 48,
        display: "flex",
        alignItems: "center",
        gap: 8,
        zIndex: 50,
      }}
    >
      {Array.from({ length: totalScenes }, (_, i) => {
        const isActive = i === activeScene;
        const isPast = i < activeScene;
        return (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <div
              style={{
                width: isActive ? 24 : 8,
                height: 8,
                borderRadius: 4,
                background: isActive
                  ? accentColor
                  : isPast
                    ? `${accentColor}60`
                    : "#d1d5db",
                transition: "width 0.3s ease, background 0.3s ease",
                boxShadow: isActive
                  ? `0 0 8px ${accentColor}40`
                  : "none",
              }}
            />
            {isActive && (
              <span
                style={{
                  color: COLORS.textSecondary,
                  fontSize: 12,
                  fontFamily: "system-ui, sans-serif",
                  fontWeight: 500,
                  marginLeft: 4,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                {labels[i] ?? `${i + 1}`}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};
