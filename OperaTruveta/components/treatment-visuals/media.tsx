'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * A still clinical image with a slow Ken Burns move (gentle zoom + drift), so a single
 * high-quality medical still becomes cinematic motion in a video scene.
 */
export function KenBurnsTreatmentImage({
  src,
  alt,
  focusX = 50,
  focusY = 50,
}: {
  src: string;
  alt: string;
  focusX?: number;
  focusY?: number;
}) {
  return (
    <motion.img
      src={src}
      alt={alt}
      className="absolute inset-0 h-full w-full object-cover"
      style={{ transformOrigin: `${focusX}% ${focusY}%` }}
      initial={{ scale: 1.06 }}
      animate={{ scale: 1.18 }}
      transition={{ duration: 16, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
    />
  );
}

/**
 * A short clinical motion clip. Plays once, then holds (freezes on) its last frame.
 * When `targetSec` is given, the clip is gently slowed to fill roughly that long (clamped
 * to 0.5–1×, never sped up), so a short clip glides for most of the scene instead of going
 * static early — and anything left over freezes on the last frame.
 */
export function TreatmentVideoAssetPlayer({
  src,
  poster,
  targetSec,
}: {
  src: string;
  poster?: string;
  targetSec?: number;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  const fitToScene = () => {
    const v = ref.current;
    if (!v || !targetSec || !v.duration || !Number.isFinite(v.duration)) return;
    v.playbackRate = Math.min(1, Math.max(0.5, v.duration / targetSec));
  };

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      autoPlay
      muted
      playsInline
      onLoadedMetadata={fitToScene}
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}
