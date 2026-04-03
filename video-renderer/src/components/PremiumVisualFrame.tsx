import React from "react";
import { VisualStandardTreatment } from "./VisualStandardTreatment";

/**
 * Apple-style visual container: consistent frame for video, stills, and SVG diagrams.
 * Prevents full-bleed "random rectangle" feel; pairs with subtle inner motion in parents.
 */
export const PremiumVisualFrame: React.FC<{
  children: React.ReactNode;
  width: number;
  height: number;
  borderRadius?: number;
  className?: string;
  /** Disable shared grade/vignette (rare escape hatch). */
  standardTreatment?: boolean;
}> = ({
  children,
  width,
  height,
  borderRadius = 22,
  className,
  standardTreatment = true,
}) => {
  return (
    <div
      className={className}
      style={{
        width,
        height,
        borderRadius,
        overflow: "hidden",
        position: "relative",
        background:
          "linear-gradient(165deg, rgba(18, 16, 28, 0.98) 0%, rgba(8, 7, 14, 1) 55%, rgba(12, 10, 20, 1) 100%)",
        boxShadow:
          "0 28px 72px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.07)",
        border: "1px solid rgba(255, 255, 255, 0.09)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius,
          pointerEvents: "none",
          background:
            "radial-gradient(120% 80% at 50% 0%, rgba(124, 58, 237, 0.06), transparent 55%)",
        }}
      />
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          borderRadius,
        }}
      >
        <VisualStandardTreatment enabled={standardTreatment}>
          {children}
        </VisualStandardTreatment>
      </div>
    </div>
  );
};
