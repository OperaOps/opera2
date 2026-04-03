import React from "react";
import { Img } from "remotion";
import { COLORS } from "../lib/colors";
import { VisualStandardTreatment } from "./VisualStandardTreatment";
import {
  BEFORE_AFTER_HEIGHT,
  BEFORE_AFTER_WIDTH,
} from "../lib/visual-layout";

interface BeforeAfterComparisonProps {
  beforePhotoUrl: string;
  afterPhotoUrl: string;
  progress: number; // 0-1, controls the reveal animation
}

export const BeforeAfterComparison: React.FC<BeforeAfterComparisonProps> = ({
  beforePhotoUrl,
  afterPhotoUrl,
  progress,
}) => {
  // Clamp progress to 0-1
  const p = Math.max(0, Math.min(1, progress));

  // The divider position: starts at 100% (far right, Before fully visible)
  // and sweeps left to reveal After underneath.
  // At progress=0, divider is at 100% (Before fully shown).
  // At progress=1, divider is at 0% (After fully shown).
  const dividerPercent = 100 - p * 100;

  const containerWidth = BEFORE_AFTER_WIDTH;
  const containerHeight = BEFORE_AFTER_HEIGHT;

  // After-side green glow opacity scales with reveal progress
  const afterGlowOpacity = p * 0.35;

  return (
    <div
      style={{
        position: "relative",
        width: containerWidth,
        height: containerHeight,
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: `0 10px 48px rgba(0, 0, 0, 0.45), 0 0 48px ${COLORS.purpleGlow}`,
      }}
    >
      {/* After image (base layer, revealed as divider sweeps left) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
        }}
      >
        <VisualStandardTreatment>
          <Img
            src={afterPhotoUrl}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </VisualStandardTreatment>
      </div>

      {/* Green glow overlay on the After (revealed) side */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(90deg, transparent ${dividerPercent}%, rgba(16, 185, 129, ${afterGlowOpacity}) 100%)`,
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* Before image (top layer, clipped from the left up to the divider) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          clipPath: `inset(0 ${100 - dividerPercent}% 0 0)`,
        }}
      >
        <VisualStandardTreatment>
          <Img
            src={beforePhotoUrl}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </VisualStandardTreatment>
      </div>

      {/* Divider line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: `${dividerPercent}%`,
          transform: "translateX(-50%)",
          width: 3,
          background: "rgba(255, 255, 255, 0.9)",
          boxShadow:
            "0 0 12px rgba(255, 255, 255, 0.6), 0 0 30px rgba(255, 255, 255, 0.2)",
          zIndex: 5,
          // Hide divider when fully at edges
          opacity: p > 0.01 && p < 0.99 ? 1 : 0,
        }}
      />

      {/* Divider handle (circular) */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: `${dividerPercent}%`,
          transform: "translate(-50%, -50%)",
          width: 24,
          height: 24,
          borderRadius: 12,
          background: "white",
          boxShadow:
            "0 0 16px rgba(255, 255, 255, 0.5), 0 2px 8px rgba(0, 0, 0, 0.4)",
          zIndex: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: p > 0.01 && p < 0.99 ? 1 : 0,
        }}
      >
        {/* Arrow indicators inside the handle */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <div
            style={{
              width: 0,
              height: 0,
              borderTop: "4px solid transparent",
              borderBottom: "4px solid transparent",
              borderRight: "5px solid #333",
            }}
          />
          <div
            style={{
              width: 0,
              height: 0,
              borderTop: "4px solid transparent",
              borderBottom: "4px solid transparent",
              borderLeft: "5px solid #333",
            }}
          />
        </div>
      </div>

      {/* BEFORE label */}
      <div
        style={{
          position: "absolute",
          top: 24,
          left: 24,
          zIndex: 10,
          opacity: dividerPercent > 15 ? 1 : 0,
        }}
      >
        <div
          style={{
            background: "rgba(0, 0, 0, 0.55)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderRadius: 20,
            padding: "6px 18px",
            border: "1px solid rgba(255, 255, 255, 0.12)",
          }}
        >
          <span
            style={{
              color: "white",
              fontSize: 14,
              fontWeight: 600,
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              letterSpacing: "0.12em",
              textTransform: "uppercase" as const,
            }}
          >
            Before
          </span>
        </div>
      </div>

      {/* AFTER label */}
      <div
        style={{
          position: "absolute",
          top: 24,
          right: 24,
          zIndex: 10,
          opacity: dividerPercent < 85 ? 1 : 0,
        }}
      >
        <div
          style={{
            background: "rgba(0, 0, 0, 0.55)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderRadius: 20,
            padding: "6px 18px",
            border: `1px solid rgba(16, 185, 129, ${0.15 + p * 0.25})`,
          }}
        >
          <span
            style={{
              color: COLORS.healthyGreen,
              fontSize: 14,
              fontWeight: 600,
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              letterSpacing: "0.12em",
              textTransform: "uppercase" as const,
            }}
          >
            After
          </span>
        </div>
      </div>

      {/* Subtle inner border for polish */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 20,
          border: "1px solid rgba(255, 255, 255, 0.08)",
          pointerEvents: "none",
          zIndex: 8,
        }}
      />
    </div>
  );
};
