import React from "react";
import {
  OffthreadVideo,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
  staticFile,
} from "remotion";
import type { VideoClipInfo } from "../lib/dental-video-assets";
import { PremiumVisualFrame } from "./PremiumVisualFrame";
import { HERO_VISUAL_HEIGHT, HERO_VISUAL_WIDTH } from "../lib/visual-layout";

/**
 * DentalVideoClip — embeds cleaned MP4 dental animations inside the scene layout.
 *
 * Features:
 * - Animated container with scale-in, subtle zoom, fade in/out
 * - Supports single clip or multi-clip sequencing with crossfade
 * - Rounded corners, border glow, gradient overlay at bottom
 * - Never plays raw full-screen — always contained in the layout
 */

interface DentalVideoClipProps {
  clips: VideoClipInfo[];
  width?: number;
  height?: number;
  borderRadius?: number;
  accentColor?: string;
  /** 0-1 progress through the scene */
  progress?: number;
}

export const DentalVideoClip: React.FC<DentalVideoClipProps> = ({
  clips,
  width = HERO_VISUAL_WIDTH,
  height = HERO_VISUAL_HEIGHT,
  borderRadius = 24,
  accentColor = "#7c3aed",
  progress = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scale-in animation
  const scaleIn = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 50 },
  });

  // Subtle continuous zoom — same language as CinematicImage (slow, consistent)
  const slowZoom = interpolate(progress, [0, 1], [1.0, 1.028], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade in
  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  const glowIntensity = interpolate(
    Math.sin(frame * 0.04),
    [-1, 1],
    [0.12, 0.32]
  );

  const driftX = Math.sin(frame * 0.01) * 2;
  const driftY = Math.cos(frame * 0.008) * 1.5;

  return (
    <PremiumVisualFrame width={width} height={height} borderRadius={borderRadius}>
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transform: `scale(${scaleIn * slowZoom}) translate(${driftX}px, ${driftY}px)`,
          opacity,
          boxShadow: `0 0 36px ${accentColor}${Math.round(glowIntensity * 255)
            .toString(16)
            .padStart(2, "0")}40`,
        }}
      >
        <div style={{ position: "absolute", inset: 0 }}>
          {clips.length === 1 ? (
            <SingleClip clip={clips[0]} width={width} height={height} />
          ) : (
            <MultiClipSequence clips={clips} width={width} height={height} />
          )}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "20%",
            background:
              "linear-gradient(to top, rgba(0,0,0,0.26) 0%, transparent 100%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center, transparent 62%, rgba(0,0,0,0.12) 100%)",
            pointerEvents: "none",
          }}
        />
      </div>
    </PremiumVisualFrame>
  );
};

/** Resolve clip src: HTTPS URLs pass through; relative paths use staticFile() */
function resolveClipSrc(src: string): string {
  return src.startsWith("http") ? src : staticFile(src);
}

function clipVideoStyle(clip: VideoClipInfo): React.CSSProperties {
  const c = clip.crop;
  if (!c) {
    return { width: "100%", height: "100%", objectFit: "cover" };
  }
  const left = c.left ?? 0;
  const right = c.right ?? 0;
  const top = c.top ?? 0;
  const bottom = c.bottom ?? 0;
  const wFrac = 1 - left - right;
  const hFrac = 1 - top - bottom;
  const widthPct = wFrac > 0 ? 100 / wFrac : 100;
  const heightPct = hFrac > 0 ? 100 / hFrac : 100;
  let objectPosition = "center center";
  if (right > 0 && left === 0) objectPosition = "left center";
  if (left > 0 && right === 0) objectPosition = "right center";
  if (bottom > 0 && top === 0) objectPosition = "center top";
  if (top > 0 && bottom === 0) objectPosition = "center bottom";
  return {
    width: `${widthPct}%`,
    height: `${heightPct}%`,
    maxWidth: "none",
    maxHeight: "none",
    objectFit: "cover",
    objectPosition,
  };
}

/** Single clip playback (optional per-clip crop for watermarks / UI) */
const SingleClip: React.FC<{
  clip: VideoClipInfo;
  width: number;
  height: number;
}> = ({ clip, width, height }) => {
  const { fps } = useVideoConfig();
  const trimStartFrames =
    clip.trimStartSeconds != null && clip.trimStartSeconds > 0
      ? Math.round(clip.trimStartSeconds * fps)
      : undefined;

  const inner = (
    <OffthreadVideo
      src={resolveClipSrc(clip.src)}
      style={clipVideoStyle(clip)}
      {...(trimStartFrames != null ? { startFrom: trimStartFrames } : {})}
      muted
    />
  );
  if (!clip.crop) {
    return inner;
  }
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {inner}
    </div>
  );
};

/**
 * Multi-clip sequencing with crossfade transitions.
 * Lays out clips sequentially using Remotion Sequences,
 * with a brief overlap for crossfading.
 */
const MultiClipSequence: React.FC<{
  clips: VideoClipInfo[];
  width: number;
  height: number;
}> = ({ clips, width, height }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const trimStartFramesForClip = (clip: VideoClipInfo) =>
    clip.trimStartSeconds != null && clip.trimStartSeconds > 0
      ? Math.round(clip.trimStartSeconds * fps)
      : undefined;

  // Crossfade duration in frames (0.5 second)
  const crossfadeFrames = Math.round(fps * 0.5);

  // Calculate start frames for each clip
  let offset = 0;
  const clipStarts: number[] = [];

  for (let i = 0; i < clips.length; i++) {
    clipStarts.push(offset);
    const clipFrames = Math.round(clips[i].durationSeconds * fps);
    // Overlap by crossfadeFrames for transition (except last clip)
    offset += clipFrames - (i < clips.length - 1 ? crossfadeFrames : 0);
  }

  return (
    <>
      {clips.map((clip, i) => {
        const clipFrames = Math.round(clip.durationSeconds * fps);
        const startFrame = clipStarts[i];

        // Calculate opacity for crossfade
        const localFrame = frame - startFrame;
        const isLast = i === clips.length - 1;

        // Fade in (except first clip)
        const fadeIn =
          i === 0
            ? 1
            : interpolate(localFrame, [0, crossfadeFrames], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });

        // Fade out (except last clip)
        const fadeOut = isLast
          ? 1
          : interpolate(
              localFrame,
              [clipFrames - crossfadeFrames, clipFrames],
              [1, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

        const clipOpacity = Math.min(fadeIn, fadeOut);

        const trimStartFrames = trimStartFramesForClip(clip);
        return (
          <Sequence
            key={i}
            from={startFrame}
            durationInFrames={clipFrames}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                opacity: clipOpacity,
                overflow: clip.crop ? "hidden" : undefined,
              }}
            >
              <OffthreadVideo
                src={resolveClipSrc(clip.src)}
                style={clipVideoStyle(clip)}
                {...(trimStartFrames != null ? { startFrom: trimStartFrames } : {})}
                muted
              />
            </div>
          </Sequence>
        );
      })}
    </>
  );
};
