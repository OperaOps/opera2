"use client";

import { useEffect, useRef } from "react";
import type { Clip } from "@/lib/concepts/shared";

/** Plays the video only while it is near the viewport. */
export function useAutoplayInView() {
  const ref = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { rootMargin: "160px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

export function AutoVideo({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  const ref = useAutoplayInView();
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

/**
 * A framed specimen plate: thin ink border, the clip, and a mono caption
 * rail beneath — `FIG. 03 — CANAL ANATOMY · TREATMENT`.
 */
export function ClipPlate({
  clip,
  fig,
  aspect = "aspect-[4/3]",
  className = "",
  captionOverride,
}: {
  clip: Clip;
  fig: string;
  aspect?: string;
  className?: string;
  captionOverride?: string;
}) {
  return (
    <figure className={`border border-[#1a1a17]/25 bg-[#fdfcfa] ${className}`}>
      <div className={`${aspect} overflow-hidden`}>
        <AutoVideo src={clip.src} className="h-full w-full object-cover" />
      </div>
      <figcaption className="flex items-baseline gap-2.5 border-t border-[#1a1a17]/25 px-3 py-2">
        <span className="c3-mono shrink-0 text-[10px] tracking-[0.16em] text-[#c2410c]">
          {fig}
        </span>
        <span className="c3-mono min-w-0 flex-1 truncate text-[10px] uppercase tracking-[0.14em] text-[#1a1a17]">
          {captionOverride ?? clip.label}
        </span>
        {clip.phase && (
          <span className="c3-mono hidden shrink-0 text-[10px] uppercase tracking-[0.14em] text-[#8a8578] sm:inline">
            {clip.phase}
          </span>
        )}
      </figcaption>
    </figure>
  );
}
