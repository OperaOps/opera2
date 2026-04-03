import React from "react";
import {
  VISUAL_STANDARD_FILTER,
  VISUAL_STANDARD_INSET_SHADOW,
  VISUAL_STANDARD_TONE_OVERLAY,
} from "../lib/visual-standard";

type Props = {
  children: React.ReactNode;
  /** When false, only pass children through (escape hatch). */
  enabled?: boolean;
};

/**
 * Wraps raw visual media so grading + light vignette match across clips.
 * Does not change layout size — final frame matches the container.
 */
export const VisualStandardTreatment: React.FC<Props> = ({
  children,
  enabled = true,
}) => {
  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        borderRadius: "inherit",
        zIndex: 1,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          filter: VISUAL_STANDARD_FILTER,
        }}
      >
        {children}
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          borderRadius: "inherit",
          background: VISUAL_STANDARD_TONE_OVERLAY,
          mixBlendMode: "soft-light",
          opacity: 0.9,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          borderRadius: "inherit",
          boxShadow: VISUAL_STANDARD_INSET_SHADOW,
        }}
      />
    </div>
  );
};
