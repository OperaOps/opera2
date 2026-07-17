"use client";

import { useEffect, useRef, useState } from "react";
import { posterOf } from "@/lib/concepts/shared";

/** Plays the video only while it is near the viewport. */
export function useAutoplayInView(rootMargin = "160px") {
  const ref = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);
  return ref;
}

export function AutoVideo({
  src,
  className,
  poster,
}: {
  src: string;
  className?: string;
  poster?: string;
}) {
  const ref = useAutoplayInView();
  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
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
 * Wall tile media. `live` tiles run an ambient loop; the rest show a poster
 * frame and start playing the moment the cursor enters, so every tile in the
 * wall is a working video without asking the browser to decode 100+ streams
 * at once.
 */
export function WallVideo({
  src,
  posterVariant,
  live,
  position,
  mediaClassName = "",
}: {
  src: string;
  posterVariant: "a" | "b";
  live: boolean;
  position?: string;
  mediaClassName?: string;
}) {
  const [active, setActive] = useState(live);
  const [playing, setPlaying] = useState(false);
  const poster = posterOf(src, posterVariant);

  if (live) {
    return (
      <AutoVideo
        src={src}
        poster={poster}
        className={`h-full w-full object-cover ${position ?? ""} ${mediaClassName}`}
      />
    );
  }

  return (
    <div
      className="relative h-full w-full"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => {
        setActive(false);
        setPlaying(false);
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt=""
        loading="lazy"
        draggable={false}
        className={`absolute inset-0 h-full w-full object-cover ${position ?? ""} ${mediaClassName}`}
      />
      {active && (
        <video
          src={src}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          onPlaying={() => setPlaying(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
            playing ? "opacity-100" : "opacity-0"
          } ${position ?? ""} ${mediaClassName}`}
        />
      )}
    </div>
  );
}

/** True below the md breakpoint. First paint assumes desktop; corrects on mount. */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isMobile;
}
