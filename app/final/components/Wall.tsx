"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { WALL_POOL } from "./wallAssets";
import { useIsMobile } from "./media";

/* ————————————————————————————————————————————————————————————————
   The wall. Opens as a black field. A randomizer keeps roughly half
   of the cells alive at any moment; every visual in the library
   appears in at most one cell at a time, lives for 5 to 8 seconds,
   fades out, and resurfaces later somewhere else. One sentence sits
   at the bottom. Nothing else.
   ———————————————————————————————————————————————————————————————— */

type Placement = {
  id: number;
  visual: number; // index into WALL_POOL
  cell: number;
  dies: number;
};

const TTL_MIN = 5000;
const TTL_MAX = 8000;
const TICK_MS = 450;
const SPAWNS_PER_TICK = 4;

function WallMedia({ visual }: { visual: number }) {
  const v = WALL_POOL[visual];
  if (v.kind === "video") {
    return (
      <video
        src={v.src}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        className="cf-bw h-full w-full object-cover"
      />
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={v.src}
      alt=""
      draggable={false}
      className="cf-bw h-full w-full object-cover"
    />
  );
}

export default function Wall() {
  const isMobile = useIsMobile();
  const cols = isMobile ? 6 : 30;
  const rows = isMobile ? 15 : 17;
  const cellCount = cols * rows;
  // Roughly a third of the field alive at once: calmer, and with the pool
  // larger than the target there is always a resting reserve rotating in.
  const target = Math.min(WALL_POOL.length, Math.floor(cellCount / 3));

  const [placements, setPlacements] = useState<Placement[]>([]);
  const nextId = useRef(1);
  // Visuals whose exit fade is still playing. They stay reserved until the
  // fade completes so one visual can never be on screen in two cells.
  const cooling = useRef(new Map<number, number>());

  // reset when the grid geometry changes
  useEffect(() => setPlacements([]), [cellCount]);

  useEffect(() => {
    const tick = () => {
      setPlacements((prev) => {
        const now = Date.now();
        for (const p of prev)
          if (p.dies <= now && !cooling.current.has(p.visual))
            cooling.current.set(p.visual, now + 1600);
        cooling.current.forEach((t, v) => {
          if (t <= now) cooling.current.delete(v);
        });
        let out = prev.filter((p) => p.dies > now);

        const usedVisuals = new Set(out.map((p) => p.visual));
        cooling.current.forEach((_, v) => usedVisuals.add(v));
        const usedCells = new Set(out.map((p) => p.cell));
        const freeVisuals: number[] = [];
        for (let i = 0; i < WALL_POOL.length; i++)
          if (!usedVisuals.has(i)) freeVisuals.push(i);
        const freeCells: number[] = [];
        for (let i = 0; i < cellCount; i++)
          if (!usedCells.has(i)) freeCells.push(i);

        let spawns = Math.min(
          SPAWNS_PER_TICK,
          target - out.length,
          freeVisuals.length,
          freeCells.length
        );
        while (spawns-- > 0) {
          const vi = Math.floor(Math.random() * freeVisuals.length);
          const ci = Math.floor(Math.random() * freeCells.length);
          out = [
            ...out,
            {
              id: nextId.current++,
              visual: freeVisuals.splice(vi, 1)[0],
              cell: freeCells.splice(ci, 1)[0],
              dies: now + TTL_MIN + Math.random() * (TTL_MAX - TTL_MIN),
            },
          ];
        }
        return out;
      });
    };
    tick();
    const h = setInterval(tick, TICK_MS);
    return () => clearInterval(h);
  }, [cellCount, target]);

  const byCell = new Map<number, Placement>();
  for (const p of placements) byCell.set(p.cell, p);

  const wrapRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });
  const sentenceOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const sentenceY = useTransform(scrollYProgress, [0, 0.3], [0, -24]);
  const brandOpacity = useTransform(scrollYProgress, [0.25, 0.55], [0, 1]);
  const brandY = useTransform(scrollYProgress, [0.25, 0.55], [24, 0]);

  return (
    <section ref={wrapRef} id="top" className="relative h-[200vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-[#070707]">
      {/* ——— the field ——— */}
      <div
        className="grid h-full w-full gap-[2px]"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: cellCount }, (_, i) => {
          const p = byCell.get(i);
          return (
            <div key={i} className="relative overflow-hidden">
              <AnimatePresence>
                {p && (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.1, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <WallMedia visual={p.visual} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* ——— soft shadow toward the sentence ——— */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

      {/* ——— the sentence, then the name ——— */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center pb-14 md:pb-16">
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ opacity: sentenceOpacity, y: sentenceY }}
          className="cf-display px-6 text-center text-[clamp(2rem,4.6vw,3.8rem)] font-light leading-[1.08] tracking-[-0.02em] text-[#f7f5f0]"
        >
          Understanding is a{" "}
          <em className="italic text-[#a9c0aa]">visual</em> act.
        </motion.p>
      </div>
      <motion.div
        style={{ opacity: brandOpacity, y: brandY }}
        className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center pb-14 md:pb-16"
      >
        <p className="cf-display px-6 text-center text-[clamp(2.6rem,7vw,6rem)] font-light leading-none tracking-[-0.02em] text-[#f7f5f0]">
          Opera<span className="text-[#a9c0aa]">AI</span>
        </p>
      </motion.div>
      </div>
    </section>
  );
}
