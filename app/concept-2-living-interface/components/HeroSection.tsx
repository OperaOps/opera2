"use client";

import { useEffect, useRef, useState } from "react";
import { motion, animate, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowDown, Sparkles } from "lucide-react";
import { CALENDLY_URL, CLIPS, type Clip } from "@/lib/concepts/shared";
import ClipVideo from "./ClipVideo";

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */

const clip = (src: string): Clip => CLIPS.find((c) => c.src === src) ?? CLIPS[0];

function Counter({ from, to }: { from: number; to: number }) {
  const [v, setV] = useState(from);
  useEffect(() => {
    const controls = animate(from, to, {
      duration: 2.4,
      delay: 0.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (x) => setV(Math.round(x)),
    });
    return () => controls.stop();
  }, [from, to]);
  return <>{v}</>;
}

/* ------------------------------------------------------------------ */
/* designed (non-video) tiles                                          */
/* ------------------------------------------------------------------ */

function MetricTile() {
  return (
    <div className="rounded-2xl border border-[#101418]/[0.06] bg-white p-5 shadow-[0_18px_50px_-24px_rgba(16,20,24,0.18)]">
      <p className="text-[10px] uppercase tracking-[0.2em] text-[#101418]/45 [font-family:var(--c2-font-mono)]">
        case acceptance
      </p>
      <p className="mt-2 text-[42px] font-medium leading-none tracking-tight text-[#101418] [font-family:var(--c2-font-display)]">
        <Counter from={54} to={68} />
        <span className="text-[22px] text-[#101418]/40">%</span>
      </p>
      <p className="mt-2 flex items-center gap-1.5 text-[11px] text-[#10b981]">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#10b981]" />
        +14 pts since visual plans
      </p>
    </div>
  );
}

function AskMiniTile() {
  return (
    <div className="rounded-2xl border border-[#4f46e5]/15 bg-white p-5 shadow-[0_18px_50px_-24px_rgba(79,70,229,0.25)]">
      <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-[#4f46e5] [font-family:var(--c2-font-mono)]">
        <Sparkles size={11} />
        ask opera
      </p>
      <p className="mt-3 text-[15px] font-medium leading-snug text-[#101418]">
        &ldquo;What happens if I wait 6&nbsp;months?&rdquo;
      </p>
      <div className="mt-3 flex items-center gap-2 rounded-lg bg-[#f1f4f6] px-3 py-2">
        <span className="text-[11px] text-[#101418]/60">
          answering from your plan
        </span>
        <span className="c2-caret" />
      </div>
    </div>
  );
}

function IntentTile() {
  return (
    <div className="rounded-2xl border border-[#101418]/[0.06] bg-white p-5 shadow-[0_18px_50px_-24px_rgba(16,20,24,0.18)]">
      <p className="text-[10px] uppercase tracking-[0.2em] text-[#101418]/45 [font-family:var(--c2-font-mono)]">
        intent signal · PT-4821
      </p>
      <div className="mt-3 flex items-end gap-1">
        {[10, 16, 22, 28].map((h, i) => (
          <span
            key={h}
            className={`w-[7px] rounded-sm ${i < 3 ? "bg-[#6366f1]" : "bg-[#10b981]"}`}
            style={{ height: h }}
          />
        ))}
        <span className="ml-2 pb-0.5 text-[12px] font-medium text-[#10b981]">
          building → high
        </span>
      </div>
      <p className="mt-2.5 text-[11px] leading-snug text-[#101418]/55">
        watched aligner-timeline 3× · shared with spouse
      </p>
    </div>
  );
}

function RenderTile() {
  return (
    <div className="rounded-2xl bg-[#101418] p-5 shadow-[0_18px_50px_-24px_rgba(16,20,24,0.45)]">
      <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#10b981] [font-family:var(--c2-font-mono)]">
        <span className="c2-live-dot" />
        rendering
      </p>
      <p className="mt-2.5 text-[12px] leading-relaxed text-white/80 [font-family:var(--c2-font-mono)]">
        PT-2856 · expander-explainer
        <br />
        voiceover · dr. chen
      </p>
      <div className="mt-3 h-[3px] overflow-hidden rounded-full bg-white/15">
        <div className="c2-render-bar h-full w-1/2 rounded-full bg-[#10b981]" />
      </div>
    </div>
  );
}

function PlateTile({
  lines,
  tint = "iris",
}: {
  lines: string[];
  tint?: "iris" | "cool" | "ink";
}) {
  const styles =
    tint === "iris"
      ? "border-[#4f46e5]/10 bg-[#4f46e5]/[0.05] text-[#4f46e5]"
      : tint === "ink"
      ? "border-[#101418]/[0.06] bg-white text-[#101418]/70"
      : "border-[#101418]/[0.05] bg-[#f1f4f6] text-[#101418]/55";
  return (
    <div className={`rounded-2xl border p-5 ${styles}`}>
      {lines.map((l) => (
        <p
          key={l}
          className="text-[10.5px] uppercase leading-[1.9] tracking-[0.2em] [font-family:var(--c2-font-mono)]"
        >
          {l}
        </p>
      ))}
    </div>
  );
}

function Tile({ c }: { c: Clip }) {
  return (
    <ClipVideo
      clip={c}
      showLabel
      className="aspect-[4/3] rounded-2xl shadow-[0_18px_50px_-24px_rgba(16,20,24,0.22)]"
    />
  );
}

/* ------------------------------------------------------------------ */
/* the living grid columns                                             */
/* ------------------------------------------------------------------ */

type Col = { dir: "up" | "down"; duration: number; items: React.ReactNode[] };

function buildColumns(): Col[] {
  return [
    {
      dir: "up",
      duration: 52,
      items: [
        <Tile key="v1" c={clip("/videos/invisalignonteeth.mp4")} />,
        <MetricTile key="m" />,
        <Tile key="v2" c={clip("/videos/crown-outcome.mp4")} />,
        <PlateTile key="p" lines={["problem", "treatment", "outcome"]} tint="iris" />,
      ],
    },
    {
      dir: "down",
      duration: 66,
      items: [
        <AskMiniTile key="a" />,
        <Tile key="v1" c={clip("/videos/bracesproblem.mp4")} />,
        <IntentTile key="i" />,
        <Tile key="v2" c={clip("/videos/ceramic-smile.mp4")} />,
        <PlateTile key="p" lines={["module 07 / 44", "aligner-timeline"]} tint="cool" />,
      ],
    },
    {
      dir: "up",
      duration: 58,
      items: [
        <Tile key="v1" c={clip("/videos/knee-anatomy-acl.mp4")} />,
        <PlateTile key="p1" lines={["44 visual modules", "5 specialties"]} tint="ink" />,
        <Tile key="v2" c={clip("/videos/expander-device.mp4")} />,
        <RenderTile key="r" />,
      ],
    },
    {
      dir: "down",
      duration: 72,
      items: [
        <Tile key="v1" c={clip("/videos/rootcanalnerve.mp4")} />,
        <PlateTile
          key="p1"
          lines={["ortho", "restorative", "cosmetic", "perio", "orthopedic"]}
          tint="cool"
        />,
        <Tile key="v2" c={clip("/videos/fillingcure.mp4")} />,
        <PlateTile key="p2" lines={["watched 3.2×", "avg per plan"]} tint="iris" />,
      ],
    },
  ];
}

function MarqueeColumn({ col, className = "" }: { col: Col; className?: string }) {
  return (
    <div className={`h-full w-[240px] shrink-0 overflow-hidden lg:w-[268px] ${className}`}>
      <div
        className={col.dir === "up" ? "c2-col-up" : "c2-col-down"}
        style={{ animationDuration: `${col.duration}s` }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1}>
            {col.items.map((item, i) => (
              <div key={i} className="mb-4">
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* hero                                                                */
/* ------------------------------------------------------------------ */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function HeroSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const columns = buildColumns();

  return (
    <section
      id="top"
      ref={ref}
      className="c2-tint relative min-h-[100svh] overflow-hidden"
    >
      {/* living grid */}
      <motion.div
        style={{ y: gridY }}
        className="absolute inset-y-[-8%] right-[-16%] flex gap-4 sm:right-[-8%] lg:right-[-3%]"
      >
        <div
          className="flex h-full gap-4"
          style={{
            transform:
              "perspective(1600px) rotateX(4deg) rotateY(-7deg) rotateZ(1deg) scale(1.05)",
            transformOrigin: "75% 40%",
          }}
        >
          <MarqueeColumn col={columns[0]} className="hidden md:block" />
          <MarqueeColumn col={columns[1]} />
          <MarqueeColumn col={columns[2]} className="hidden sm:block" />
          <MarqueeColumn col={columns[3]} className="hidden xl:block" />
        </div>
      </motion.div>

      {/* legibility gradients */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#fafaf8] from-[28%] via-[#fafaf8]/85 via-[46%] to-transparent to-[78%]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#fafaf8] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#fafaf8] to-transparent" />

      {/* copy */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1400px] items-center px-6 lg:px-10">
        <div className="max-w-[640px] pb-16 pt-28">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.22em] text-[#101418]/50 [font-family:var(--c2-font-mono)]"
          >
            <span className="c2-live-dot" />
            live — rendering patient videos now
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
            className="mt-6 text-[52px] font-medium leading-[1.02] tracking-[-0.03em] text-[#101418] sm:text-[68px] lg:text-[82px] [font-family:var(--c2-font-display)]"
          >
            Every treatment,
            <br />
            explained{" "}
            <span className="relative inline-block text-[#4f46e5]">
              visually.
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1, ease: EASE }}
                className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded-full bg-[#4f46e5]/30"
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
            className="mt-7 max-w-[480px] text-[17px] font-light leading-relaxed text-[#101418]/65"
          >
            Personalized treatment videos, an AI that answers each patient from
            their own plan, and the signal layer behind every yes. Patients
            forget 80% of what their doctor says — they remember what they see.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#4f46e5] py-4 pl-8 pr-7 text-[15px] font-medium tracking-wide text-white shadow-[0_20px_50px_-16px_rgba(79,70,229,0.55)]"
            >
              <span className="absolute inset-0 translate-y-full bg-[#6366f1] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
              <span className="relative">Book a demo</span>
              <ArrowRight
                size={16}
                className="relative transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
            <a
              href="#why"
              className="group inline-flex items-center gap-2 py-4 text-[14px] font-medium text-[#101418]/60 transition-colors hover:text-[#101418]"
            >
              Explore the platform
              <ArrowDown
                size={15}
                className="transition-transform duration-300 group-hover:translate-y-0.5"
              />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-14 flex flex-wrap gap-x-8 gap-y-2 text-[11px] uppercase tracking-[0.18em] text-[#101418]/40 [font-family:var(--c2-font-mono)]"
          >
            <span>25+ clinics</span>
            <span>$420M+ clinical revenue analyzed</span>
            <span>40+ visual modules</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
