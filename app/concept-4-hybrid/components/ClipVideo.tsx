"use client";

import { useEffect, useRef } from "react";

type ClipVideoProps = {
  src: string;
  className?: string;
};

/**
 * Muted looping clip that plays only while (near) the viewport.
 * Keeps the long page at 60fps: offscreen videos are paused.
 */
export default function ClipVideo({ src, className }: ClipVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) el.play().catch(() => {});
          else el.pause();
        });
      },
      { rootMargin: "160px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      autoPlay
      preload="metadata"
      className={className}
    />
  );
}
