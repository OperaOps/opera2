'use client';

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

/** A short clinical motion clip, autoplaying muted on loop (treatment walkthroughs etc). */
export function TreatmentVideoAssetPlayer({ src, poster }: { src: string; poster?: string }) {
  return (
    <video
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}
