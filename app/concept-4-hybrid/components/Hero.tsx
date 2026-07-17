"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CALENDLY_URL } from "@/lib/concepts/shared";
import ClipVideo from "./ClipVideo";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ── Wall tiles ──────────────────────────────────────────────────── */

function WallClip({
  src,
  label,
  phase,
  w,
}: {
  src: string;
  label: string;
  phase?: string;
  w: string;
}) {
  return (
    <div
      className={`relative h-full flex-none overflow-hidden rounded-lg bg-[#0c0d10] ${w}`}
    >
      <ClipVideo src={src} className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
      {phase && (
        <span className="absolute left-3 top-3 rounded-[3px] border border-white/20 bg-black/40 px-1.5 py-0.5 text-[8px] font-medium uppercase tracking-[0.2em] text-white/70 backdrop-blur-sm [font-family:var(--c4-font-mono)]">
          {phase}
        </span>
      )}
      <span className="absolute bottom-3 left-3 right-3 truncate text-[10px] tracking-[0.06em] text-white/60 [font-family:var(--c4-font-mono)]">
        {label}
      </span>
    </div>
  );
}

function PlateTile({
  id,
  title,
  meta,
  w,
}: {
  id: string;
  title: string;
  meta: string;
  w: string;
}) {
  return (
    <div
      className={`relative flex h-full flex-none flex-col justify-between overflow-hidden rounded-lg border border-white/[0.07] bg-[#0c0d10] p-4 max-md:opacity-35 ${w}`}
    >
      <div className="flex items-center justify-between text-[8px] uppercase tracking-[0.24em] text-white/35 [font-family:var(--c4-font-mono)]">
        <span>Case file</span>
        <span className="text-[#8d83f2]">{id}</span>
      </div>
      <p className="text-[13px] font-medium leading-snug tracking-[-0.01em] text-[#e9e6dd] [font-family:var(--c4-font-display)]">
        {title}
      </p>
      <div className="flex items-center gap-2 text-[8px] uppercase tracking-[0.18em] text-white/30 [font-family:var(--c4-font-mono)]">
        <span className="h-1 w-1 rounded-full bg-[#5b4fe8]" />
        {meta}
      </div>
    </div>
  );
}

function AskTile({ w }: { w: string }) {
  return (
    <div
      className={`relative hidden h-full flex-none flex-col justify-between overflow-hidden rounded-lg border border-[#5b4fe8]/30 bg-[#0c0d14] p-4 md:flex ${w}`}
    >
      <div className="flex items-center gap-2 text-[8px] uppercase tracking-[0.24em] text-[#8d83f2] [font-family:var(--c4-font-mono)]">
        <span className="c4-pulse h-1.5 w-1.5 rounded-full bg-[#5b4fe8]" />
        Ask Opera
      </div>
      <p className="text-[17px] italic leading-snug text-[#e9e6dd] [font-family:var(--c4-font-serif)]">
        &ldquo;Will this hurt?&rdquo;
        <span className="c4-caret ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] bg-[#8d83f2]" />
      </p>
      <p className="text-[9px] tracking-[0.08em] text-white/40 [font-family:var(--c4-font-mono)]">
        answer grounded in the treatment plan →
      </p>
    </div>
  );
}

function IntentTile({ w }: { w: string }) {
  return (
    <div
      className={`relative flex h-full flex-none flex-col justify-between overflow-hidden rounded-lg border border-white/[0.07] bg-[#0c0d10] p-4 max-md:opacity-35 ${w}`}
    >
      <div className="flex items-center justify-between text-[8px] uppercase tracking-[0.24em] text-white/35 [font-family:var(--c4-font-mono)]">
        <span>Intent signal</span>
        <span className="rounded-full bg-[#5b4fe8] px-1.5 py-px text-[7px] font-medium tracking-[0.16em] text-white">
          HIGH
        </span>
      </div>
      <div className="flex items-baseline gap-1 [font-family:var(--c4-font-mono)]">
        <span className="text-[30px] font-medium leading-none text-[#e9e6dd]">
          87
        </span>
        <span className="text-[9px] text-white/35">/100 engagement</span>
      </div>
      <div>
        <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-[87%] rounded-full bg-[#5b4fe8]" />
        </div>
        <p className="mt-2 text-[8px] uppercase tracking-[0.16em] text-white/30 [font-family:var(--c4-font-mono)]">
          booked records visit
        </p>
      </div>
    </div>
  );
}

function PhaseTile({ w }: { w: string }) {
  return (
    <div
      className={`relative flex h-full flex-none flex-col justify-center gap-2.5 overflow-hidden rounded-lg border border-white/[0.07] bg-[#0c0d10] px-4 max-md:opacity-35 ${w}`}
    >
      {(["Problem", "Treatment", "Outcome"] as const).map((p, i) => (
        <div
          key={p}
          className="flex items-center gap-2.5 [font-family:var(--c4-font-mono)]"
        >
          <span
            className={`text-[8px] ${i === 1 ? "text-[#8d83f2]" : "text-white/25"}`}
          >
            0{i + 1}
          </span>
          <span
            className={`text-[10px] uppercase tracking-[0.22em] ${
              i === 1 ? "text-[#e9e6dd]" : "text-white/30"
            }`}
          >
            {p}
          </span>
          {i === 1 && (
            <span className="h-px flex-1 bg-gradient-to-r from-[#5b4fe8]/70 to-transparent" />
          )}
        </div>
      ))}
    </div>
  );
}

function FigTile({ w }: { w: string }) {
  return (
    <div
      className={`relative flex h-full flex-none flex-col justify-between overflow-hidden rounded-lg border border-white/[0.07] bg-[#0c0d10] p-4 max-md:opacity-35 ${w}`}
    >
      <svg
        viewBox="0 0 120 100"
        className="mx-auto h-[68%] w-auto text-white/30"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        {/* stylized molar with canal lines */}
        <path d="M28 34c0-16 12-24 32-24s32 8 32 24c0 10-5 14-6 24-1 11-3 32-10 32-6 0-6-16-16-16s-10 16-16 16c-7 0-9-21-10-32-1-10-6-14-6-24Z" />
        <path d="M52 26c2 8 1 20-2 30M68 26c-2 8-1 20 2 30" strokeDasharray="3 3" className="text-[#8d83f2]" />
        <path d="M8 50h12M100 50h12" strokeWidth="1" />
        <circle cx="60" cy="18" r="1.6" fill="currentColor" stroke="none" />
      </svg>
      <div className="flex items-center justify-between text-[8px] uppercase tracking-[0.2em] text-white/30 [font-family:var(--c4-font-mono)]">
        <span>Fig. 03</span>
        <span>canal anatomy</span>
      </div>
    </div>
  );
}

/* ── Hero ────────────────────────────────────────────────────────── */

export default function Hero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end start"],
  });

  const copyOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);
  const copyY = useTransform(scrollYProgress, [0, 0.22], [0, -36]);
  const wallScale = useTransform(scrollYProgress, [0, 0.6], [1, 1.07]);
  const wallOpacity = useTransform(scrollYProgress, [0.2, 0.65], [1, 0.35]);

  return (
    <div id="c4-top" ref={wrapRef} className="relative h-[172vh]">
      <section className="sticky top-0 h-screen overflow-hidden bg-[#08090a]">
        {/* The wall */}
        <motion.div
          style={{ scale: wallScale, opacity: wallOpacity }}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: EASE }}
          className="absolute inset-0 flex flex-col gap-3 p-3"
        >
          <div className="c4-row-a -ml-[4vw] flex h-1/3 w-[130vw] min-w-[1400px] gap-3">
            <WallClip src="/videos/bracesproblem.mp4" label="Crowding — upper arch" phase="Problem" w="w-[24rem]" />
            <PlateTile id="PT-4821" title="Crowding, upper arch — Invisalign comprehensive" meta="post-consult · day 2" w="w-[15rem]" />
            <WallClip src="/videos/invisalignonteeth.mp4" label="Aligner on dentition" phase="Treatment" w="w-[20rem]" />
            <PhaseTile w="w-[13rem]" />
            <WallClip src="/videos/crown-outcome.mp4" label="Ceramic crown seated" phase="Outcome" w="w-[22rem]" />
            <WallClip src="/videos/knee-anatomy-acl.mp4" label="ACL anatomy" phase="Anatomy" w="w-[20rem]" />
            <PlateTile id="PT-7719" title="Root canal #14 — emergency visit" meta="booked next-day slot" w="w-[15rem]" />
          </div>
          <div className="c4-row-b -ml-[7vw] flex h-1/3 w-[130vw] min-w-[1400px] gap-3">
            <WallClip src="/videos/fillingcavity.mp4" label="Caries progression" phase="Problem" w="w-[19rem]" />
            <AskTile w="w-[17rem]" />
            <WallClip src="/videos/expander-wide.mp4" label="Expansion complete" phase="Outcome" w="w-[23rem]" />
            <WallClip src="/videos/ceramic-smile.mp4" label="Smile design" phase="Outcome" w="w-[20rem]" />
            <PlateTile id="PT-6034" title="Perio — scaling + laser therapy" meta="accepted same week" w="w-[15rem]" />
            <WallClip src="/videos/implant-step1-placement.mp4" label="Implant placement" phase="Treatment" w="w-[22rem]" />
          </div>
          <div className="c4-row-c -ml-[2vw] flex h-1/3 w-[130vw] min-w-[1400px] gap-3">
            <WallClip src="/videos/bracesoutcome.mp4" label="Post-treatment alignment" phase="Outcome" w="w-[21rem]" />
            <IntentTile w="w-[15rem]" />
            <WallClip src="/videos/invisalignseries.mp4" label="Tray series — 22 stages" phase="Timeline" w="w-[24rem]" />
            <FigTile w="w-[12rem]" />
            <WallClip src="/videos/whitening-step2-detail.mp4" label="Shade lift detail" phase="Outcome" w="w-[19rem]" />
            <WallClip src="/videos/testing/gum-treatment.mp4" label="Perio therapy" phase="Treatment" w="w-[20rem]" />
            <PlateTile id="PT-1204" title="Veneers, 8-unit — deposit placed" meta="engagement 95/100" w="w-[15rem]" />
          </div>
        </motion.div>

        {/* Vignettes — theater darkness pooling at the edges */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#08090a]/85 via-transparent to-[#08090a]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#08090a]/60 via-transparent to-[#08090a]/60" />
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_58%_52%_at_50%_54%,rgba(8,9,10,0.88)_0%,rgba(8,9,10,0.45)_55%,transparent_100%)]" />
        {/* mobile-only reinforcement — the wall drifts under narrow copy, so pool more darkness behind it */}
        <div className="pointer-events-none absolute inset-0 md:hidden [background:radial-gradient(ellipse_95%_64%_at_50%_52%,rgba(8,9,10,0.94)_0%,rgba(8,9,10,0.72)_58%,rgba(8,9,10,0.3)_100%)]" />

        {/* Copy */}
        <motion.div
          style={{ opacity: copyOpacity, y: copyY }}
          className="absolute inset-0 z-10 flex items-center justify-center px-6"
        >
          <div className="flex max-w-[880px] flex-col items-center text-center">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
              className="mb-7 text-[10px] font-medium uppercase tracking-[0.32em] text-[#8d83f2] [font-family:var(--c4-font-mono)]"
            >
              Visual patient education
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.65, ease: EASE }}
              className="text-[clamp(2.7rem,6.4vw,5.4rem)] font-medium leading-[1.03] tracking-[-0.035em] text-[#f2efe8] [font-family:var(--c4-font-display)]"
            >
              Patients say{" "}
              <em className="font-normal not-italic">
                <span className="italic text-[#b3a7ff] [font-family:var(--c4-font-serif)]">
                  yes
                </span>
              </em>{" "}
              to what they see.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.85, ease: EASE }}
              className="mt-6 max-w-[560px] text-[16px] font-light leading-relaxed text-[#b9b5aa]"
            >
              Opera turns every treatment plan into a personalized visual
              experience — and every consult into intelligence.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.0, ease: EASE }}
              className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
            >
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full bg-[#f2efe8] px-8 py-[15px] text-[13px] font-semibold tracking-[-0.01em] text-[#0b0c0e] transition-colors duration-300 hover:bg-white [font-family:var(--c4-font-display)]"
              >
                Book a demo
                <ArrowRight
                  size={14}
                  strokeWidth={2.4}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
              <a
                href="#c4-platform"
                className="group/ghost inline-flex items-center gap-3 rounded-[4px] border border-white/[0.16] px-7 py-[16px] text-[10px] font-medium uppercase tracking-[0.24em] text-[#e9e6dd] transition-colors duration-300 hover:border-white/40 [font-family:var(--c4-font-mono)]"
              >
                <span className="relative">
                  See the platform
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[#8d83f2] transition-transform duration-300 ease-out group-hover/ghost:scale-x-100" />
                </span>
                <ArrowRight
                  size={12}
                  strokeWidth={2.2}
                  className="text-white/50 transition-all duration-300 group-hover/ghost:translate-x-1 group-hover/ghost:text-[#b3a7ff]"
                />
              </a>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 1.25, ease: EASE }}
              className="mt-12 text-[9px] uppercase tracking-[0.26em] text-white/35 [font-family:var(--c4-font-mono)]"
            >
              25+ clinics&ensp;·&ensp;$420M+ clinical revenue analyzed
              &ensp;·&ensp;40+ visual modules
            </motion.p>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          style={{ opacity: copyOpacity }}
          className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2.5"
        >
          <span className="text-[8px] uppercase tracking-[0.3em] text-white/30 [font-family:var(--c4-font-mono)]">
            Scroll
          </span>
          <span className="c4-cue block h-8 w-px bg-white/40" />
        </motion.div>
      </section>
    </div>
  );
}
