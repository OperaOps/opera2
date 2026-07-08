import React from "react";
import {
  AbsoluteFill,
  Audio,
  Freeze,
  OffthreadVideo,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";
import type { CalculateMetadataFunction } from "remotion";
import {
  FLAGSHIP_FPS,
  FLAGSHIP_BG,
  FLAGSHIP_INK,
  FLAGSHIP_MUTED,
  FLAGSHIP_TEAL,
  FLAGSHIP_TEAL_INK,
  chunkCaption,
  flagshipTotalSeconds,
  type FlagshipClipSegment,
  type FlagshipIntroCardSegment,
  type FlagshipSegment,
  type FlagshipTimelineCardSegment,
  type FlagshipVideoProps,
} from "../lib/flagship";
import { VIDEO_WIDTH, VIDEO_HEIGHT } from "../lib/schema";
import { standardBgmVolume, DEFAULT_BGM_PUBLIC_PATH } from "../lib/video-bgm";
import type { VideoClipInfo } from "../lib/dental-video-assets";

/**
 * FlagshipVideo — the standard patient-video composition.
 *
 * Clean white presentation: intro card → journey timeline card → clip beats laid
 * out as slides (framed clip left, STEP + heading + bullets right) → warm close
 * frozen on the final frame. One synced subtitle line at the bottom throughout.
 * Narration is per-segment audio; the opera-bgm bed sits under it at 0.14.
 */

const FONT_STACK =
  "'Inter', -apple-system, 'Segoe UI', 'Helvetica Neue', Helvetica, Arial, sans-serif";

export const calculateFlagshipMetadata: CalculateMetadataFunction<
  FlagshipVideoProps
> = ({ props }) => ({
  durationInFrames: Math.ceil((flagshipTotalSeconds(props.segments) + 0.5) * FLAGSHIP_FPS),
  fps: FLAGSHIP_FPS,
  width: VIDEO_WIDTH,
  height: VIDEO_HEIGHT,
});

// ---------------------------------------------------------------------------
// Composition
// ---------------------------------------------------------------------------

export const FlagshipVideo: React.FC<FlagshipVideoProps> = (props) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const { segments, accentColor = FLAGSHIP_TEAL, bgmUrl } = props;

  // Cumulative segment frame ranges
  let cursor = 0;
  const ranges = segments.map((seg) => {
    const frames = Math.ceil(seg.durationSeconds * fps);
    const range = { from: cursor, frames };
    cursor += frames;
    return range;
  });

  const bedPath = bgmUrl ?? DEFAULT_BGM_PUBLIC_PATH;
  const bedSrc = bedPath.startsWith("http") ? bedPath : staticFile(bedPath);

  return (
    <AbsoluteFill style={{ backgroundColor: FLAGSHIP_BG, fontFamily: FONT_STACK }}>
      {/* Instrumental bed — 0.14 base, 2s fade-in, 6s fade-out (video-bgm.ts) */}
      <Audio src={bedSrc} volume={(f) => standardBgmVolume(f, fps, durationInFrames)} loop />

      {segments.map((seg, i) => (
        <Sequence key={i} from={ranges[i].from} durationInFrames={ranges[i].frames}>
          <SegmentAudio seg={seg} />
          {seg.kind === "intro-card" ? (
            <IntroCard seg={seg} accent={accentColor} />
          ) : seg.kind === "timeline-card" ? (
            <TimelineCard seg={seg} accent={accentColor} />
          ) : (
            <ClipScene seg={seg} />
          )}
          <SubtitlePill narration={seg.narration} frames={ranges[i].frames} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// Audio
// ---------------------------------------------------------------------------

const SegmentAudio: React.FC<{ seg: FlagshipSegment }> = ({ seg }) => {
  const src = seg.audioUrl
    ? seg.audioUrl
    : seg.audioFile
      ? staticFile(seg.audioFile)
      : undefined;
  if (!src) return null;
  return <Audio src={src} />;
};

// ---------------------------------------------------------------------------
// Cards
// ---------------------------------------------------------------------------

/** Gentle fade-up for card content. */
function useCardReveal(): React.CSSProperties {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(frame, [0, 14], [24, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return { opacity, transform: `translateY(${y}px)` };
}

const IntroCard: React.FC<{ seg: FlagshipIntroCardSegment; accent: string }> = ({
  seg,
  accent,
}) => {
  const reveal = useCardReveal();
  return (
    <AbsoluteFill
      style={{
        backgroundColor: FLAGSHIP_BG,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ ...reveal, textAlign: "center", maxWidth: 1500, padding: "0 60px" }}>
        <div
          style={{
            color: accent,
            fontSize: 30,
            fontWeight: 700,
            letterSpacing: "0.18em",
          }}
        >
          {seg.eyebrow}
        </div>
        <div
          style={{
            color: FLAGSHIP_INK,
            fontSize: 86,
            fontWeight: 800,
            marginTop: 26,
            lineHeight: 1.08,
          }}
        >
          {seg.title}
        </div>
        <div style={{ color: FLAGSHIP_MUTED, fontSize: 37, fontWeight: 400, marginTop: 30 }}>
          {seg.subtitle}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const TimelineCard: React.FC<{ seg: FlagshipTimelineCardSegment; accent: string }> = ({
  seg,
  accent,
}) => {
  const reveal = useCardReveal();
  const frame = useCurrentFrame();
  const xs = [330, 750, 1170, 1590];
  const yLine = 540;
  // The teal line draws across, then each node pops in as the line reaches it.
  const lineProgress = interpolate(frame, [8, 46], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ backgroundColor: FLAGSHIP_BG }}>
      <div style={reveal}>
        <div
          style={{
            position: "absolute",
            top: 208,
            width: VIDEO_WIDTH,
            textAlign: "center",
            color: accent,
            fontSize: 34,
            fontWeight: 700,
            letterSpacing: "0.22em",
          }}
        >
          {seg.heading}
        </div>

        {/* connecting line */}
        <div
          style={{
            position: "absolute",
            left: xs[0],
            top: yLine - 2,
            width: (xs[3] - xs[0]) * lineProgress,
            height: 4,
            backgroundColor: `${accent}99`,
            borderRadius: 2,
          }}
        />

        {xs.map((cx, i) => {
          const reached = lineProgress >= i / 3 - 0.001;
          const nodeOpacity = reached ? 1 : 0.25;
          return (
            <React.Fragment key={i}>
              <div
                style={{
                  position: "absolute",
                  left: cx - 20,
                  top: yLine - 20,
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  backgroundColor: accent,
                  opacity: nodeOpacity,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: cx - 120,
                  top: yLine - 130,
                  width: 240,
                  textAlign: "center",
                  color: FLAGSHIP_INK,
                  fontSize: 44,
                  fontWeight: 700,
                  opacity: nodeOpacity,
                }}
              >
                {i + 1}
              </div>
              <div
                style={{
                  position: "absolute",
                  left: cx - 170,
                  top: yLine + 58,
                  width: 340,
                  textAlign: "center",
                  color: FLAGSHIP_MUTED,
                  fontSize: 38,
                  lineHeight: 1.3,
                  opacity: nodeOpacity,
                }}
              >
                {seg.steps[i]}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// Clip scene — full-bleed footage fitted to the narration length
// ---------------------------------------------------------------------------

function clipStyle(clip: VideoClipInfo): React.CSSProperties {
  const c = clip.crop;
  if (!c) return { width: "100%", height: "100%", objectFit: "cover" };
  const left = c.left ?? 0;
  const right = c.right ?? 0;
  const top = c.top ?? 0;
  const bottom = c.bottom ?? 0;
  const wFrac = Math.max(0.01, 1 - left - right);
  const hFrac = Math.max(0.01, 1 - top - bottom);
  let objectPosition = "center center";
  if (right > 0 && left === 0) objectPosition = "left center";
  if (left > 0 && right === 0) objectPosition = "right center";
  if (bottom > 0 && top === 0) objectPosition = "center top";
  if (top > 0 && bottom === 0) objectPosition = "center bottom";
  return {
    width: `${100 / wFrac}%`,
    height: `${100 / hFrac}%`,
    maxWidth: "none",
    maxHeight: "none",
    objectFit: "cover",
    objectPosition,
  };
}

const resolveClipSrc = (src: string) => (src.startsWith("http") ? src : staticFile(src));

const ClipScene: React.FC<{ seg: FlagshipClipSegment }> = ({ seg }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const clip = seg.clip;
  const segFrames = Math.ceil(seg.durationSeconds * fps);
  const trimStartFrames =
    clip.trimStartSeconds && clip.trimStartSeconds > 0
      ? Math.round(clip.trimStartSeconds * fps)
      : undefined;
  const clipSeconds = Math.max(1, clip.durationSeconds - (clip.trimStartSeconds ?? 0));

  // Fit the clip to the narration:
  //  - close in length → gently stretch/squeeze to fill exactly
  //  - clip much shorter → play near-natural speed, then FREEZE on the last frame
  //    for the rest of the beat (clips never loop).
  const rawRate = clipSeconds / seg.durationSeconds;
  const stretchable = rawRate >= 0.55 && rawRate <= 1.3 && !seg.freeze;
  const playbackRate = stretchable ? rawRate : Math.min(1, Math.max(0.85, rawRate));
  const videoFrames = stretchable
    ? segFrames
    : Math.min(segFrames, Math.floor((clipSeconds / playbackRate) * fps));

  const makeVideo = () => (
    <OffthreadVideo
      src={resolveClipSrc(clip.src)}
      style={clipStyle(clip)}
      playbackRate={playbackRate}
      {...(trimStartFrames != null ? { startFrom: trimStartFrames } : {})}
      muted
    />
  );

  const body: React.ReactNode =
    frame < videoFrames ? (
      makeVideo()
    ) : (
      <Freeze frame={Math.max(0, videoFrames - 1)}>{makeVideo()}</Freeze>
    );

  // Presentation layout — the clip sits in a framed panel on the left, with the
  // beat's heading + key points on the right (never full-bleed).
  const PANEL_X = 96;
  const PANEL_Y = 132;
  const PANEL_W = 1056;
  const PANEL_H = 700;
  const TEXT_X = PANEL_X + PANEL_W + 88;
  const TEXT_W = VIDEO_WIDTH - TEXT_X - 96;

  const panelReveal = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const bullets = (seg.bullets ?? []).slice(0, 4);
  const segF = Math.max(1, segFrames);
  // Bullets stagger in across the first ~55% of the beat, in step with narration.
  const bulletAt = (i: number) =>
    Math.round(segF * (0.16 + (i * 0.42) / Math.max(1, bullets.length)));

  return (
    <AbsoluteFill style={{ backgroundColor: FLAGSHIP_BG, overflow: "hidden" }}>
      {/* Framed clip panel */}
      <div
        style={{
          position: "absolute",
          left: PANEL_X,
          top: PANEL_Y,
          width: PANEL_W,
          height: PANEL_H,
          borderRadius: 28,
          overflow: "hidden",
          border: "1px solid rgba(11,18,32,0.12)",
          boxShadow: "0 26px 64px rgba(11,18,32,0.18)",
          opacity: panelReveal,
          transform: `translateY(${(1 - panelReveal) * 18}px)`,
          backgroundColor: "#f1f5f9",
        }}
      >
        <div style={{ position: "absolute", inset: 0 }}>{body}</div>
        {/* soft inner bottom scrim to seat the clip in the frame */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: "18%",
            background: "linear-gradient(to top, rgba(0,0,0,0.35), transparent)",
          }}
        />
      </div>

      {/* Right text column */}
      <div
        style={{
          position: "absolute",
          left: TEXT_X,
          top: PANEL_Y + 34,
          width: TEXT_W,
        }}
      >
        {seg.stepNumber != null && (
          <div
            style={{
              color: FLAGSHIP_TEAL_INK,
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: "0.22em",
              opacity: panelReveal,
            }}
          >
            {`STEP ${String(seg.stepNumber).padStart(2, "0")}`}
          </div>
        )}
        {seg.heading && (
          <div
            style={{
              color: FLAGSHIP_INK,
              fontSize: 52,
              fontWeight: 800,
              lineHeight: 1.12,
              marginTop: 18,
              opacity: panelReveal,
              transform: `translateY(${(1 - panelReveal) * 14}px)`,
            }}
          >
            {seg.heading}
          </div>
        )}
        <div style={{ marginTop: 34 }}>
          {bullets.map((b, i) => {
            const o = interpolate(frame, [bulletAt(i), bulletAt(i) + 10], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 18,
                  alignItems: "flex-start",
                  marginBottom: 26,
                  opacity: o,
                  transform: `translateY(${(1 - o) * 10}px)`,
                }}
              >
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor: FLAGSHIP_TEAL,
                    marginTop: 12,
                    flexShrink: 0,
                  }}
                />
                <div
                  style={{
                    color: FLAGSHIP_MUTED,
                    fontSize: 30,
                    lineHeight: 1.4,
                    fontWeight: 400,
                  }}
                >
                  {b}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// Subtitle — one short line, advanced with segment progress (Truveta player style)
// ---------------------------------------------------------------------------

const SubtitlePill: React.FC<{ narration: string; frames: number }> = ({
  narration,
  frames,
}) => {
  const frame = useCurrentFrame();
  const lines = React.useMemo(() => chunkCaption(narration), [narration]);
  if (!lines.length) return null;
  const idx = Math.min(lines.length - 1, Math.floor((frame / frames) * lines.length));
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 52,
        display: "flex",
        justifyContent: "center",
        zIndex: 30,
      }}
    >
      <div
        style={{
          maxWidth: "88%",
          backgroundColor: "rgba(15,23,42,0.85)",
          borderRadius: 14,
          padding: "16px 30px",
          color: "rgba(255,255,255,0.96)",
          fontSize: 42,
          fontWeight: 500,
          lineHeight: 1.25,
          textAlign: "center",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          fontFamily: FONT_STACK,
        }}
      >
        {lines[idx]}
      </div>
    </div>
  );
};
