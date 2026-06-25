import React from "react";
import { VisualStandardTreatment } from "./VisualStandardTreatment";

export const PremiumVisualFrame: React.FC<{
  children: React.ReactNode;
  width: number;
  height: number;
  borderRadius?: number;
  className?: string;
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
        background: "#f8f9fa",
        boxShadow:
          "0 8px 32px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)",
        border: "1px solid #e5e7eb",
      }}
    >
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
