"use client";

import { useEffect, useRef, useState } from "react";

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
