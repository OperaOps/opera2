"use client";

import { useEffect, useRef } from "react";
import type { Clip } from "@/lib/concepts/shared";

/**
 * Autoplaying muted loop that pauses itself when scrolled offscreen.
 * Optional label plate keeps the medical context legible on light UI.
 */
export default function ClipVideo({
  clip,
  className = "",
  videoClassName = "",
  showLabel = false,
}: {
  clip: Clip;
  className?: string;
  videoClassName?: string;
  showLabel?: boolean;
}) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <video
        ref={ref}
        src={clip.src}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        className={`h-full w-full object-cover ${videoClassName}`}
      />
      {showLabel && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-[#101418]/55 to-transparent px-3 pb-2.5 pt-8">
          <span className="text-[11px] font-medium leading-tight text-white/95">
            {clip.label}
          </span>
          {clip.phase && (
            <span className="rounded-full bg-white/15 px-2 py-0.5 text-[9px] uppercase tracking-[0.14em] text-white/85 backdrop-blur-sm [font-family:var(--c2-font-mono)]">
              {clip.phase}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
