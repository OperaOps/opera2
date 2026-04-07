import React from "react";
import { Img, staticFile } from "remotion";
import { interpolate } from "remotion";
import { COLORS } from "../lib/colors";

type SplitMode = "slider" | "fade" | "split";

interface CinematicSplitScreenProps {
  beforeSrc: string;
  afterSrc: string;
  progress: number; // 0-1
  mode?: SplitMode;
  width?: number;
  height?: number;
}

/**
 * Resolves a public/ relative path via staticFile, falling back gracefully.
 */
function resolveSrc(path: string): string {
  try {
    return staticFile(path);
  } catch {
    return path;
  }
}

export const CinematicSplitScreen: React.FC<CinematicSplitScreenProps> = ({
  beforeSrc,
  afterSrc,
  progress,
  mode = "slider",
  width = 900,
  height = 560,
}) => {
  const p = Math.max(0, Math.min(1, progress));

  // Global fade envelope
  const containerOpacity = interpolate(
    p,
    [0, 0.08, 0.92, 1],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const beforeUrl = resolveSrc(beforeSrc);
  const afterUrl = resolveSrc(afterSrc);

  if (mode === "slider") {
    return (
      <SliderMode
        beforeUrl={beforeUrl}
        afterUrl={afterUrl}
        progress={p}
        containerOpacity={containerOpacity}
        width={width}
        height={height}
      />
    );
  }

  if (mode === "fade") {
    return (
      <FadeMode
        beforeUrl={beforeUrl}
        afterUrl={afterUrl}
        progress={p}
        containerOpacity={containerOpacity}
        width={width}
        height={height}
      />
    );
  }

  // mode === "split"
  return (
    <SplitSideBySide
      beforeUrl={beforeUrl}
      afterUrl={afterUrl}
      progress={p}
      containerOpacity={containerOpacity}
      width={width}
      height={height}
    />
  );
};

// ---------- Slider Mode ----------

const SliderMode: React.FC<{
  beforeUrl: string;
  afterUrl: string;
  progress: number;
  containerOpacity: number;
  width: number;
  height: number;
}> = ({ beforeUrl, afterUrl, progress, containerOpacity, width, height }) => {
  // Slider sweeps from left (before visible) to right (after visible)
  // Map 0.1-0.9 range so it doesn't rush at the extremes
  const dividerPercent = interpolate(progress, [0.1, 0.85], [95, 5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const afterGlowOpacity = interpolate(progress, [0.2, 0.8], [0, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const dividerVisible = progress > 0.05 && progress < 0.95;

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        borderRadius: 20,
        overflow: "hidden",
        opacity: containerOpacity,
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      }}
    >
      {/* After image (base layer) */}
      <div style={{ position: "absolute", inset: 0 }}>
        <Img
          src={afterUrl}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Green glow on the revealed (after) side */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(90deg, transparent ${dividerPercent}%, rgba(16, 185, 129, ${afterGlowOpacity}) 100%)`,
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* Before image (clipped) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          clipPath: `inset(0 ${100 - dividerPercent}% 0 0)`,
        }}
      >
        <Img
          src={beforeUrl}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
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
          opacity: dividerVisible ? 1 : 0,
        }}
      />

      {/* Divider handle */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: `${dividerPercent}%`,
          transform: "translate(-50%, -50%)",
          width: 28,
          height: 28,
          borderRadius: 14,
          background: "white",
          boxShadow:
            "0 0 16px rgba(255, 255, 255, 0.5), 0 2px 8px rgba(0, 0, 0, 0.4)",
          zIndex: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: dividerVisible ? 1 : 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
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
            
            
            borderRadius: 20,
            padding: "6px 18px",
            border: `1px solid rgba(16, 185, 129, ${0.15 + progress * 0.25})`,
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

      {/* Inner border */}
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

// ---------- Fade/Crossfade Mode ----------

const FadeMode: React.FC<{
  beforeUrl: string;
  afterUrl: string;
  progress: number;
  containerOpacity: number;
  width: number;
  height: number;
}> = ({ beforeUrl, afterUrl, progress, containerOpacity, width, height }) => {
  // Crossfade: before is fully visible until 0.3, then fades out by 0.7
  const beforeOpacity = interpolate(progress, [0.25, 0.65], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const afterOpacity = interpolate(progress, [0.35, 0.75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtle Ken Burns on both images
  const beforeScale = interpolate(progress, [0, 1], [1.0, 1.08], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const afterScale = interpolate(progress, [0, 1], [1.08, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Label visibility
  const beforeLabelOpacity = interpolate(progress, [0.05, 0.15, 0.5, 0.6], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const afterLabelOpacity = interpolate(progress, [0.5, 0.6, 0.9, 0.95], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        borderRadius: 20,
        overflow: "hidden",
        opacity: containerOpacity,
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      }}
    >
      {/* Before image */}
      <div style={{ position: "absolute", inset: 0, opacity: beforeOpacity }}>
        <Img
          src={beforeUrl}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${beforeScale})`,
          }}
        />
      </div>

      {/* After image */}
      <div style={{ position: "absolute", inset: 0, opacity: afterOpacity }}>
        <Img
          src={afterUrl}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${afterScale})`,
          }}
        />
      </div>

      {/* BEFORE label */}
      <div
        style={{
          position: "absolute",
          bottom: 24,
          left: 24,
          zIndex: 10,
          opacity: beforeLabelOpacity,
        }}
      >
        <div
          style={{
            background: "rgba(0, 0, 0, 0.55)",
            
            
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
          bottom: 24,
          right: 24,
          zIndex: 10,
          opacity: afterLabelOpacity,
        }}
      >
        <div
          style={{
            background: "rgba(0, 0, 0, 0.55)",
            
            
            borderRadius: 20,
            padding: "6px 18px",
            border: `1px solid rgba(16, 185, 129, 0.35)`,
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

      {/* Gradient overlay at bottom for label legibility */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0, 0, 0, 0.45) 0%, transparent 40%)",
          pointerEvents: "none",
          zIndex: 3,
        }}
      />

      {/* Inner border */}
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

// ---------- Split Side-by-Side Mode ----------

const SplitSideBySide: React.FC<{
  beforeUrl: string;
  afterUrl: string;
  progress: number;
  containerOpacity: number;
  width: number;
  height: number;
}> = ({ beforeUrl, afterUrl, progress, containerOpacity, width, height }) => {
  // Transition from 70/30 to 30/70 split
  const beforeWidthPct = interpolate(progress, [0.15, 0.85], [70, 30], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const afterWidthPct = 100 - beforeWidthPct;

  const gap = 6;
  const halfGap = gap / 2;
  const innerHeight = height;

  // Subtle Ken Burns on each side
  const beforeScale = interpolate(progress, [0, 1], [1.02, 1.08], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const afterScale = interpolate(progress, [0, 1], [1.08, 1.02], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        borderRadius: 20,
        overflow: "hidden",
        opacity: containerOpacity,
        display: "flex",
        gap,
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      }}
    >
      {/* Before panel */}
      <div
        style={{
          position: "relative",
          width: `calc(${beforeWidthPct}% - ${halfGap}px)`,
          height: innerHeight,
          borderRadius: "20px 0 0 20px",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <Img
          src={beforeUrl}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${beforeScale})`,
          }}
        />
        {/* Before label */}
        <div
          style={{
            position: "absolute",
            bottom: 16,
            left: 16,
            zIndex: 10,
          }}
        >
          <div
            style={{
              background: "rgba(0, 0, 0, 0.55)",
              
              
              borderRadius: 16,
              padding: "5px 14px",
              border: "1px solid rgba(255, 255, 255, 0.12)",
            }}
          >
            <span
              style={{
                color: "white",
                fontSize: 12,
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
        {/* Gradient for label legibility */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 35%)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* After panel */}
      <div
        style={{
          position: "relative",
          width: `calc(${afterWidthPct}% - ${halfGap}px)`,
          height: innerHeight,
          borderRadius: "0 20px 20px 0",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <Img
          src={afterUrl}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${afterScale})`,
          }}
        />
        {/* After label */}
        <div
          style={{
            position: "absolute",
            bottom: 16,
            right: 16,
            zIndex: 10,
          }}
        >
          <div
            style={{
              background: "rgba(0, 0, 0, 0.55)",
              
              
              borderRadius: 16,
              padding: "5px 14px",
              border: `1px solid rgba(16, 185, 129, 0.35)`,
            }}
          >
            <span
              style={{
                color: COLORS.healthyGreen,
                fontSize: 12,
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
        {/* Gradient for label legibility */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 35%)",
            pointerEvents: "none",
          }}
        />
        {/* Subtle green glow on after side */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse at bottom right, rgba(16, 185, 129, ${interpolate(progress, [0.3, 0.8], [0, 0.12], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}) 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Inner border */}
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
