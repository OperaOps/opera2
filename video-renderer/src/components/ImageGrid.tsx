import React from "react";
import { Img, staticFile } from "remotion";
import { interpolate } from "remotion";
import { COLORS } from "../lib/colors";

interface ImageGridImage {
  src: string;
  label?: string;
}

interface ImageGridProps {
  images: ImageGridImage[];
  progress: number; // 0-1
  columns?: 2 | 3;
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

export const ImageGrid: React.FC<ImageGridProps> = ({
  images,
  progress,
  columns = 2,
  width = 900,
  height = 560,
}) => {
  const p = Math.max(0, Math.min(1, progress));

  // Global container fade envelope
  const containerOpacity = interpolate(p, [0, 0.06, 0.92, 1], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const gap = 12;
  const rows = Math.ceil(images.length / columns);
  const cellWidth = (width - gap * (columns - 1)) / columns;
  const cellHeight = (height - gap * (rows - 1)) / rows;

  // Stagger: each image appears 0.15 progress apart
  const staggerStep = 0.15;

  return (
    <div
      style={{
        width,
        height,
        opacity: containerOpacity,
        display: "flex",
        flexWrap: "wrap",
        gap,
        position: "relative",
      }}
    >
      {images.map((image, index) => {
        const staggerStart = index * staggerStep;
        const staggerEnd = Math.min(staggerStart + 0.25, 1);

        // Individual image reveal
        const imageOpacity = interpolate(
          p,
          [staggerStart, staggerStart + 0.1],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        // Scale-in entrance
        const imageScale = interpolate(
          p,
          [staggerStart, staggerStart + 0.12],
          [0.9, 1.0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        // Slide up entrance
        const imageSlideY = interpolate(
          p,
          [staggerStart, staggerStart + 0.12],
          [20, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        // Ken Burns effect per image once visible
        const kenBurnsProgress = interpolate(
          p,
          [staggerStart, 1],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        // Alternate direction per image for visual variety
        const kbScale =
          index % 2 === 0
            ? interpolate(kenBurnsProgress, [0, 1], [1.0, 1.1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })
            : interpolate(kenBurnsProgress, [0, 1], [1.1, 1.0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
        const kbTx =
          index % 2 === 0
            ? interpolate(kenBurnsProgress, [0, 1], [0, -2], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })
            : interpolate(kenBurnsProgress, [0, 1], [-2, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });

        // Label appears slightly after its image
        const labelDelay = staggerStart + 0.1;
        const labelOpacity = interpolate(
          p,
          [labelDelay, labelDelay + 0.08],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        const labelSlideY = interpolate(
          p,
          [labelDelay, labelDelay + 0.08],
          [8, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        const resolvedSrc = resolveSrc(image.src);

        return (
          <div
            key={index}
            style={{
              width: cellWidth,
              height: cellHeight,
              borderRadius: 16,
              overflow: "hidden",
              position: "relative",
              opacity: imageOpacity,
              transform: `scale(${imageScale}) translateY(${imageSlideY}px)`,
              boxShadow:
                "0 8px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(124, 58, 237, 0.06)",
            }}
          >
            {/* Image with Ken Burns */}
            <Img
              src={resolvedSrc}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: `scale(${kbScale}) translateX(${kbTx}%)`,
                display: "block",
              }}
            />

            {/* Bottom gradient for label legibility */}
            {image.label && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, transparent 50%)",
                  pointerEvents: "none",
                  zIndex: 1,
                }}
              />
            )}

            {/* Label */}
            {image.label && (
              <div
                style={{
                  position: "absolute",
                  bottom: 14,
                  left: 14,
                  right: 14,
                  zIndex: 2,
                  opacity: labelOpacity,
                  transform: `translateY(${labelSlideY}px)`,
                }}
              >
                <div
                  style={{
                    background: "rgba(0, 0, 0, 0.45)",
                    
                    
                    borderRadius: 12,
                    padding: "6px 14px",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    display: "inline-block",
                  }}
                >
                  <span
                    style={{
                      color: COLORS.textPrimary,
                      fontSize: 13,
                      fontWeight: 500,
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      letterSpacing: "0.04em",
                    }}
                  >
                    {image.label}
                  </span>
                </div>
              </div>
            )}

            {/* Step number badge (top-left) */}
            <div
              style={{
                position: "absolute",
                top: 12,
                left: 12,
                width: 28,
                height: 28,
                borderRadius: 14,
                background: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.purpleMuted})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: imageOpacity,
                boxShadow: `0 2px 12px ${COLORS.purpleGlow}`,
                zIndex: 3,
              }}
            >
              <span
                style={{
                  color: "white",
                  fontSize: 13,
                  fontWeight: 700,
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                {index + 1}
              </span>
            </div>

            {/* Inner border for polish */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 16,
                border: "1px solid rgba(255, 255, 255, 0.08)",
                pointerEvents: "none",
                zIndex: 4,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
