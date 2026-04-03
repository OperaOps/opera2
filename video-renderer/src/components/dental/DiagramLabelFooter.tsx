import React from "react";
import { COLORS } from "../../lib/colors";

/** Centered label strip for medical SVG diagrams — safe margins, no edge clipping. */
export const DiagramLabelFooter: React.FC<{
  items: { title: string; subtitle: string }[];
  /** viewBox width (default 360) */
  vbWidth?: number;
  y?: number;
  opacity?: number;
}> = ({ items, vbWidth = 360, y = 312, opacity = 1 }) => {
  const n = items.length;
  const col = vbWidth / n;
  const pad = 14;
  return (
    <g opacity={opacity}>
      <rect
        x={pad}
        y={y}
        width={vbWidth - pad * 2}
        height={72}
        rx={10}
        fill="rgba(255,255,255,0.045)"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth={0.8}
      />
      {items.map((item, i) => {
        const cx = pad + col * i + col / 2;
        return (
          <g key={i}>
            <text
              x={cx}
              y={y + 28}
              textAnchor="middle"
              fill={COLORS.textSecondary}
              fontSize={11}
              fontFamily='system-ui, -apple-system, "Segoe UI", sans-serif'
              fontWeight={600}
            >
              {item.title}
            </text>
            <text
              x={cx}
              y={y + 46}
              textAnchor="middle"
              fill={COLORS.textMuted}
              fontSize={9}
              fontFamily='system-ui, -apple-system, "Segoe UI", sans-serif'
            >
              {item.subtitle}
            </text>
          </g>
        );
      })}
    </g>
  );
};
