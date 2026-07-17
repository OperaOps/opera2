"use client";

import { useEffect, useRef } from "react";

/**
 * A trail of small sage particles behind the cursor. Lives inside the
 * landing wall only; fills its parent and spawns nothing once the wall
 * is scrolled away. No glow, no lag. Desktop pointers only.
 */
export default function CursorGlow() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = window.devicePixelRatio || 1;
    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      const r = canvas.getBoundingClientRect();
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
    };
    resize();
    window.addEventListener("resize", resize);

    type Particle = {
      x: number; y: number; vx: number; vy: number;
      born: number; life: number; size: number;
    };
    const parts: Particle[] = [];
    let last = { x: -100, y: -100 };

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      if (
        e.clientX < r.left || e.clientX > r.right ||
        e.clientY < r.top || e.clientY > r.bottom
      )
        return;
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const now = performance.now();
      const dx = x - last.x;
      const dy = y - last.y;
      if (Math.hypot(dx, dy) > 3) {
        const n = 2 + Math.floor(Math.min(6, Math.hypot(dx, dy) / 9));
        for (let i = 0; i < n; i++) {
          parts.push({
            x: x + (Math.random() - 0.5) * 16,
            y: y + (Math.random() - 0.5) * 16,
            vx: (Math.random() - 0.5) * 1.4 - dx * 0.012,
            vy: (Math.random() - 0.5) * 1.4 - dy * 0.012,
            born: now,
            life: 650 + Math.random() * 650,
            size: 1.2 + Math.random() * 3,
          });
        }
        last = { x, y };
      }
      if (parts.length > 260) parts.splice(0, parts.length - 260);
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let raf = 0;
    const loop = () => {
      const now = performance.now();
      const r = canvas.getBoundingClientRect();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, r.width, r.height);

      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        const age = now - p.born;
        if (age > p.life) {
          parts.splice(i, 1);
          continue;
        }
        const k = 1 - age / p.life;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.985;
        p.vy *= 0.985;
        const bright = p.size > 3.2;
        ctx.shadowColor = "rgba(190,214,192,0.8)";
        ctx.shadowBlur = bright ? 10 * k : 4 * k;
        ctx.fillStyle = bright
          ? `rgba(226,240,227,${0.9 * k})`
          : `rgba(190,214,192,${0.8 * k})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.2, p.size * k), 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-20 h-full w-full"
    />
  );
}
