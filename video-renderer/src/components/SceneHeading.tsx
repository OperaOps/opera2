import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../lib/colors";

export const SceneHeading: React.FC<{
  heading: string;
  subtitle?: string;
  accentColor?: string;
  align?: "left" | "center";
}> = ({ heading, subtitle, accentColor = COLORS.purple, align = "left" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headingOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });
  const headingSlide = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 90 },
  });
  const headingY = interpolate(headingSlide, [0, 1], [30, 0]);

  const subtitleOpacity = interpolate(frame, [12, 25], [0, 1], {
    extrapolateRight: "clamp",
  });
  const subtitleY = interpolate(frame, [12, 25], [15, 0], {
    extrapolateRight: "clamp",
  });

  const lineWidth = interpolate(frame, [8, 30], [0, 60], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: align === "center" ? "center" : "flex-start",
        gap: 12,
      }}
    >
      <h2
        style={{
          opacity: headingOpacity,
          transform: `translateY(${headingY}px)`,
          color: COLORS.textPrimary,
          fontSize: 52,
          fontWeight: 200,
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          letterSpacing: "0.02em",
          margin: 0,
          lineHeight: 1.2,
          textAlign: align,
        }}
      >
        {heading}
      </h2>

      <div
        style={{
          width: `${lineWidth}px`,
          height: 2,
          background: accentColor,
          borderRadius: 1,
          opacity: 0.7,
        }}
      />

      {subtitle && (
        <p
          style={{
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
            color: COLORS.textSecondary,
            fontSize: 24,
            fontWeight: 300,
            fontFamily: "system-ui, sans-serif",
            margin: 0,
            lineHeight: 1.5,
            maxWidth: 700,
            textAlign: align,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export const BulletList: React.FC<{
  items: string[];
  accentColor?: string;
}> = ({ items, accentColor = COLORS.purple }) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        marginTop: 16,
      }}
    >
      {items.map((item, i) => {
        const delay = 15 + i * 8;
        const opacity = interpolate(frame, [delay, delay + 12], [0, 1], {
          extrapolateRight: "clamp",
        });
        const slideX = interpolate(frame, [delay, delay + 12], [20, 0], {
          extrapolateRight: "clamp",
        });

        return (
          <div
            key={i}
            style={{
              opacity,
              transform: `translateX(${slideX}px)`,
              display: "flex",
              alignItems: "flex-start",
              gap: 16,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                background: accentColor,
                marginTop: 10,
                flexShrink: 0,
                boxShadow: `0 0 8px ${accentColor}50`,
              }}
            />
            <span
              style={{
                color: COLORS.textSecondary,
                fontSize: 26,
                fontWeight: 300,
                fontFamily: "system-ui, sans-serif",
                lineHeight: 1.5,
              }}
            >
              {item}
            </span>
          </div>
        );
      })}
    </div>
  );
};
