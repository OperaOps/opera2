import React from "react";
import { Img, staticFile } from "remotion";
import { interpolate } from "remotion";
import { VisualStandardTreatment } from "./VisualStandardTreatment";
import {
  MOTION_KEN_BURNS_IN,
  MOTION_KEN_BURNS_OUT,
  MOTION_PAN_BASE_SCALE,
  MOTION_PAN_TX_RANGE,
} from "../lib/visual-standard";
import { HERO_VISUAL_HEIGHT, HERO_VISUAL_WIDTH } from "../lib/visual-layout";

type Effect =
  | "ken-burns-in"
  | "ken-burns-out"
  | "pan-left"
  | "pan-right"
  | "zoom-pulse"
  | "parallax"
  | "reveal-left"
  | "reveal-right"
  | "fade-zoom";

type Overlay =
  | "dark"
  | "light"
  | "gradient-bottom"
  | "gradient-top"
  | "none";

interface CinematicImageProps {
  src: string; // Path relative to public/ (used with staticFile)
  alt?: string;
  effect?: Effect;
  progress: number; // 0-1 over scene duration
  width?: number;
  height?: number;
  borderRadius?: number;
  overlay?: Overlay;
  overlayOpacity?: number;
  className?: string;
}

/**
 * Computes the base fade opacity envelope: fade in over the first 10% of
 * progress and fade out over the last 10%.
 */
function fadeEnvelope(progress: number): number {
  const fadeIn = interpolate(progress, [0, 0.1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(progress, [0.9, 1], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return fadeIn * fadeOut;
}

/**
 * Returns { scale, translateX (%), translateY (%) } for the requested effect.
 */
function computeTransform(
  effect: Effect,
  progress: number
): { scale: number; translateX: number; translateY: number } {
  switch (effect) {
    case "ken-burns-in": {
      const scale = interpolate(
        progress,
        [0, 1],
        [MOTION_KEN_BURNS_IN.scaleFrom, MOTION_KEN_BURNS_IN.scaleTo],
        {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }
      );
      const tx = interpolate(progress, [0, 1], [0, -2.5], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
      const ty = interpolate(progress, [0, 1], [0, -1.5], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
      return { scale, translateX: tx, translateY: ty };
    }

    case "ken-burns-out": {
      const scale = interpolate(
        progress,
        [0, 1],
        [MOTION_KEN_BURNS_OUT.scaleFrom, MOTION_KEN_BURNS_OUT.scaleTo],
        {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }
      );
      const tx = interpolate(progress, [0, 1], [-2.5, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
      const ty = interpolate(progress, [0, 1], [-1.5, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
      return { scale, translateX: tx, translateY: ty };
    }

    case "pan-left": {
      const tx = interpolate(progress, [0, 1], [MOTION_PAN_TX_RANGE, -MOTION_PAN_TX_RANGE], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
      return { scale: MOTION_PAN_BASE_SCALE, translateX: tx, translateY: 0 };
    }

    case "pan-right": {
      const tx = interpolate(progress, [0, 1], [-MOTION_PAN_TX_RANGE, MOTION_PAN_TX_RANGE], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
      return { scale: MOTION_PAN_BASE_SCALE, translateX: tx, translateY: 0 };
    }

    case "zoom-pulse": {
      const breath = interpolate(
        Math.sin(progress * Math.PI * 2),
        [-1, 1],
        [1.0, 1.035]
      );
      return { scale: breath, translateX: 0, translateY: 0 };
    }

    case "parallax": {
      const tx = interpolate(progress, [0, 1], [-1.5, 1.5], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
      const ty = interpolate(progress, [0, 1], [0.8, -0.8], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
      return { scale: 1.04, translateX: tx, translateY: ty };
    }

    case "reveal-left": {
      // Image starts offset to the right and slides into frame
      const tx = interpolate(progress, [0, 0.4], [30, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
      return { scale: 1.0, translateX: tx, translateY: 0 };
    }

    case "reveal-right": {
      const tx = interpolate(progress, [0, 0.4], [-30, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
      return { scale: 1.0, translateX: tx, translateY: 0 };
    }

    case "fade-zoom": {
      const scale = interpolate(progress, [0, 0.3], [0.95, 1.0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
      return { scale, translateX: 0, translateY: 0 };
    }

    default:
      return { scale: 1, translateX: 0, translateY: 0 };
  }
}

/**
 * Builds the overlay style for the dimming/gradient layer on top of the image.
 */
function buildOverlayStyle(
  overlay: Overlay,
  overlayOpacity: number
): React.CSSProperties | null {
  const base: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
  };

  switch (overlay) {
    case "dark":
      return { ...base, background: `rgba(0, 0, 0, ${overlayOpacity})` };
    case "light":
      return {
        ...base,
        background: `rgba(255, 255, 255, ${overlayOpacity * 0.5})`,
      };
    case "gradient-bottom":
      return {
        ...base,
        background: `linear-gradient(to top, rgba(0, 0, 0, ${overlayOpacity}) 0%, transparent 60%)`,
      };
    case "gradient-top":
      return {
        ...base,
        background: `linear-gradient(to bottom, rgba(0, 0, 0, ${overlayOpacity}) 0%, transparent 60%)`,
      };
    case "none":
    default:
      return null;
  }
}

export const CinematicImage: React.FC<CinematicImageProps> = ({
  src,
  alt = "",
  effect = "ken-burns-in",
  progress,
  width = HERO_VISUAL_WIDTH,
  height = HERO_VISUAL_HEIGHT,
  borderRadius = 20,
  overlay = "gradient-bottom",
  overlayOpacity = 0.5,
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const opacity = fadeEnvelope(p);
  const { scale, translateX, translateY } = computeTransform(effect, p);

  const transform = `scale(${scale}) translate(${translateX}%, ${translateY}%)`;

  // For reveal effects, clip the container to create the slide-in look
  let clipPath: string | undefined;
  if (effect === "reveal-left") {
    const revealPct = interpolate(p, [0, 0.4], [0, 100], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    clipPath = `inset(0 ${100 - revealPct}% 0 0)`;
  } else if (effect === "reveal-right") {
    const revealPct = interpolate(p, [0, 0.4], [0, 100], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    clipPath = `inset(0 0 0 ${100 - revealPct}%)`;
  }

  const overlayStyle = buildOverlayStyle(overlay, overlayOpacity);

  // Resolve the file path — staticFile expects a path relative to public/
  // Do NOT silently swallow errors — if the asset doesn't resolve, we need to know.
  const resolvedSrc = src.startsWith("http") ? src : staticFile(src);

  return (
    <div
      style={{
        width,
        height,
        borderRadius,
        overflow: "hidden",
        position: "relative",
        opacity,
        ...(clipPath ? { clipPath } : {}),
      }}
    >
      {/* Fallback gradient if image fails to load */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(124,58,237,0.3) 0%, rgba(0,0,0,0.8) 100%)",
          zIndex: 0,
        }}
      />

      {/* Cinematic box shadow — kept soft so it doesn’t read as a heavy “effect” */}
      <div
        style={{
          position: "absolute",
          inset: -2,
          borderRadius: borderRadius + 2,
          boxShadow:
            "0 10px 48px rgba(0, 0, 0, 0.45), 0 0 28px rgba(124, 58, 237, 0.05)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <VisualStandardTreatment>
        <Img
          src={resolvedSrc}
          alt={alt}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
          style={{
            transform,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </VisualStandardTreatment>

      {/* Overlay */}
      {overlayStyle && <div style={overlayStyle} />}

      {/* Subtle inner border for polish */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius,
          border: "1px solid rgba(255, 255, 255, 0.08)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />
    </div>
  );
};
