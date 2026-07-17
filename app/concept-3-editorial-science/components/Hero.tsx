"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { CALENDLY_URL, CLIPS, type Clip } from "@/lib/concepts/shared";
import { AutoVideo } from "./media";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const bySrc = (src: string): Clip => CLIPS.find((c) => c.src === src)!;

type Tile =
  | { kind: "clip"; src: string; fig: string; row: number; span: string }
  | { kind: "phase"; word: string; note: string; row: number; span: string }
  | { kind: "record"; row: number; span: string }
  | { kind: "hesitation"; row: number; span: string }
  | { kind: "ink"; row: number; span: string }
  | { kind: "quote"; row: number; span: string }
  | { kind: "svg"; variant: "tooth" | "arch"; row: number; span: string };

// 21 plates, 12 live clips — arranged like a printed specimen sheet.
const TILES: Tile[] = [
  // Row 1
  { kind: "clip", src: "/videos/hero-tooth.mp4", fig: "FIG. 01", row: 0, span: "col-span-2 md:col-span-2" },
  { kind: "phase", word: "Problem.", note: "Every plan has three acts", row: 0, span: "col-span-2 md:col-span-2" },
  { kind: "clip", src: "/videos/bracesproblem.mp4", fig: "FIG. 02", row: 0, span: "col-span-2 md:col-span-2" },
  { kind: "clip", src: "/videos/rootcanalnerve.mp4", fig: "FIG. 03", row: 0, span: "col-span-2 md:col-span-2" },
  { kind: "svg", variant: "tooth", row: 0, span: "col-span-2 md:col-span-2" },
  { kind: "clip", src: "/videos/fillingcavity.mp4", fig: "FIG. 04", row: 0, span: "col-span-2 md:col-span-2" },
  // Row 2
  { kind: "record", row: 1, span: "col-span-2 md:col-span-2" },
  { kind: "clip", src: "/videos/invisalignonteeth.mp4", fig: "FIG. 05", row: 1, span: "col-span-2 md:col-span-3" },
  { kind: "clip", src: "/videos/expander-device.mp4", fig: "FIG. 06", row: 1, span: "col-span-2 md:col-span-2" },
  { kind: "clip", src: "/videos/knee-anatomy-acl.mp4", fig: "FIG. 07", row: 1, span: "col-span-2 md:col-span-3" },
  { kind: "ink", row: 1, span: "col-span-4 md:col-span-2" },
  // Row 3
  { kind: "clip", src: "/videos/ceramic-smile.mp4", fig: "FIG. 08", row: 2, span: "col-span-2 md:col-span-2" },
  { kind: "phase", word: "Outcome.", note: "The act patients say yes to", row: 2, span: "col-span-2 md:col-span-2" },
  { kind: "clip", src: "/videos/invisalignseries.mp4", fig: "FIG. 09", row: 2, span: "col-span-2 md:col-span-3" },
  { kind: "clip", src: "/videos/crown-outcome.mp4", fig: "FIG. 10", row: 2, span: "col-span-2 md:col-span-2" },
  { kind: "svg", variant: "arch", row: 2, span: "col-span-4 md:col-span-3" },
  // Row 4
  { kind: "clip", src: "/videos/implant-step1-placement.mp4", fig: "FIG. 11", row: 3, span: "col-span-2 md:col-span-3" },
  { kind: "quote", row: 3, span: "col-span-2 md:col-span-2" },
  { kind: "hesitation", row: 3, span: "col-span-2 md:col-span-2" },
  { kind: "clip", src: "/videos/bracesoutcome.mp4", fig: "FIG. 12", row: 3, span: "col-span-2 md:col-span-2" },
  { kind: "phase", word: "Before / After.", note: "Shown, not described", row: 3, span: "col-span-4 md:col-span-3" },
];

function ToothLineArt() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center bg-[#f7f5f0] p-4">
      <svg viewBox="0 0 100 100" className="h-[70%] w-auto" fill="none">
        <path
          d="M22 16 C30 5 45 6 50 18 C55 6 70 5 78 16 C87 26 83 40 77 51 C73 61 71 77 67 87 C65 93 60 93 59 87 C57 77 55 65 50 65 C45 65 43 77 41 87 C40 93 35 93 33 87 C29 77 27 61 23 51 C17 40 13 26 22 16 Z"
          stroke="#1a1a17"
          strokeWidth="1.1"
        />
        <line x1="77" y1="30" x2="96" y2="30" stroke="#c2410c" strokeWidth="0.7" />
        <line x1="64" y1="80" x2="96" y2="80" stroke="#c2410c" strokeWidth="0.7" />
      </svg>
      <span className="c3-mono absolute right-2 top-[24%] text-[8px] uppercase tracking-[0.14em] text-[#c2410c]">
        enamel
      </span>
      <span className="c3-mono absolute bottom-[14%] right-2 text-[8px] uppercase tracking-[0.14em] text-[#c2410c]">
        root
      </span>
      <span className="c3-mono absolute bottom-2 left-2.5 text-[9px] uppercase tracking-[0.16em] text-[#8a8578]">
        Diagram i — molar, sectional
      </span>
    </div>
  );
}

function ArchLineArt() {
  return (
    <div className="relative flex h-full items-center justify-center bg-[#f7f5f0] p-4">
      <svg viewBox="0 0 200 100" className="h-[72%] w-auto" fill="none">
        <path
          d="M30 88 C30 30 70 12 100 12 C130 12 170 30 170 88"
          stroke="#1a1a17"
          strokeWidth="1.1"
        />
        <path
          d="M46 84 C46 42 76 28 100 28 C124 28 154 42 154 84"
          stroke="#1a1a17"
          strokeWidth="0.7"
          strokeDasharray="3 3"
        />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
          const t = i / 8;
          const x = 30 + t * 140;
          const y = 88 - Math.sin(t * Math.PI) * 74;
          return <circle key={i} cx={x} cy={y} r="2.2" stroke="#c2410c" strokeWidth="0.8" />;
        })}
      </svg>
      <span className="c3-mono absolute bottom-2 left-2.5 text-[9px] uppercase tracking-[0.16em] text-[#8a8578]">
        Diagram ii — arch form, expansion path
      </span>
    </div>
  );
}

function TileBody({ tile }: { tile: Tile }) {
  switch (tile.kind) {
    case "clip": {
      const clip = bySrc(tile.src);
      return (
        <div className="flex h-full flex-col bg-[#fdfcfa]">
          <div className="min-h-0 flex-1 overflow-hidden">
            <AutoVideo src={clip.src} className="h-full w-full object-cover" />
          </div>
          <div className="flex items-baseline gap-2 border-t border-[#1a1a17]/20 bg-[#f7f5f0] px-2.5 py-1.5">
            <span className="c3-mono shrink-0 text-[9px] tracking-[0.16em] text-[#c2410c]">
              {tile.fig}
            </span>
            <span className="c3-mono min-w-0 flex-1 truncate text-[9px] uppercase tracking-[0.13em] text-[#1a1a17]">
              {clip.label}
            </span>
            {clip.phase && (
              <span className="c3-mono hidden shrink-0 text-[9px] uppercase tracking-[0.13em] text-[#8a8578] xl:inline">
                {clip.phase}
              </span>
            )}
          </div>
        </div>
      );
    }
    case "phase":
      return (
        <div className="flex h-full flex-col justify-between bg-[#f7f5f0] p-4">
          <span className="c3-mono text-[9px] uppercase tracking-[0.18em] text-[#c2410c]">
            Phase
          </span>
          <span className="c3-display text-[clamp(1.6rem,2.4vw,2.4rem)] italic leading-none tracking-[-0.01em]">
            {tile.word}
          </span>
          <span className="c3-mono text-[9px] uppercase tracking-[0.14em] text-[#8a8578]">
            {tile.note}
          </span>
        </div>
      );
    case "record":
      return (
        <div className="flex h-full flex-col justify-between bg-[#f7f5f0] p-4">
          <span className="c3-mono text-[9px] uppercase tracking-[0.18em] text-[#8a8578]">
            Consult record — PT-4821
          </span>
          <div className="c3-mono space-y-1.5 text-[10px] leading-relaxed text-[#1a1a17]">
            <div className="flex justify-between gap-2">
              <span className="text-[#8a8578]">question</span>
              <span className="text-right">“What if I wait?”</span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-[#8a8578]">engagement</span>
              <span>87</span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-[#8a8578]">intent</span>
              <span className="text-[#c2410c]">HIGH ●</span>
            </div>
          </div>
          <span className="c3-mono text-[9px] uppercase tracking-[0.14em] text-[#8a8578]">
            Outcome — booked records visit
          </span>
        </div>
      );
    case "hesitation":
      return (
        <div className="flex h-full flex-col justify-between bg-[#f7f5f0] p-4">
          <span className="c3-mono text-[9px] uppercase tracking-[0.18em] text-[#8a8578]">
            hesitation_reason
          </span>
          <span className="c3-display text-[15px] italic leading-snug">
            “cost vs. urgency unclear”
          </span>
          <div className="c3-mono text-[9px] uppercase leading-relaxed tracking-[0.13em] text-[#8a8578]">
            likely_barrier —<br />
            <span className="text-[#1a1a17]">financing not yet discussed</span>
          </div>
        </div>
      );
    case "ink":
      return (
        <div className="flex h-full flex-col justify-between bg-[#1a1a17] p-4 text-[#f7f5f0]">
          <span className="c3-mono text-[9px] uppercase tracking-[0.18em] text-[#f7f5f0]/60">
            The library
          </span>
          <span className="c3-display text-[clamp(2.6rem,4vw,4rem)] font-light leading-none">
            44
          </span>
          <span className="c3-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-[#f7f5f0]/70">
            Visual treatment modules
            <br />
            across 5 specialties
          </span>
        </div>
      );
    case "quote":
      return (
        <div className="flex h-full flex-col justify-between bg-[#f7f5f0] p-4">
          <span className="c3-mono text-[9px] tracking-[0.18em] text-[#c2410c]">Q.</span>
          <span className="c3-display text-[clamp(1.1rem,1.6vw,1.5rem)] italic leading-snug">
            “Will this hurt?”
          </span>
          <span className="c3-mono text-[9px] uppercase tracking-[0.14em] text-[#8a8578]">
            Asked in 31% of consults
          </span>
        </div>
      );
    case "svg":
      return tile.variant === "tooth" ? <ToothLineArt /> : <ArchLineArt />;
  }
}

export default function Hero() {
  return (
    <section id="top" className="pt-14">
      {/* ——— Masthead ——— */}
      <div className="mx-auto max-w-[1400px] px-6 pb-12 pt-14 md:px-10 md:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="flex items-baseline justify-between border-b border-[#1a1a17]/25 pb-3"
        >
          <span className="c3-mono text-[10px] uppercase tracking-[0.22em] text-[#1a1a17]">
            Opera — A visual system for patient understanding
          </span>
          <span className="c3-mono hidden text-[10px] uppercase tracking-[0.22em] text-[#8a8578] md:inline">
            Est. 2024 · Vol. I
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.12, ease: EASE }}
          className="c3-display mt-12 max-w-5xl text-[clamp(3.1rem,8vw,7rem)] font-light leading-[0.98] tracking-[-0.03em]"
        >
          Understanding is a{" "}
          <em className="italic text-[#c2410c]">visual</em> act.
        </motion.h1>

        <div className="mt-10 flex flex-col gap-8 md:mt-12 md:flex-row md:items-end md:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
            className="c3-body max-w-md text-[15px] leading-relaxed text-[#1a1a17]/80"
          >
            Patients forget 80% of what their doctor says. They remember what
            they see. Opera turns every treatment plan into moving,
            medically-true images — and works the interval between the consult
            and the yes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.42, ease: EASE }}
            className="flex items-baseline gap-10"
          >
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="c3-link group c3-mono gap-2 text-[12px] uppercase tracking-[0.22em] text-[#c2410c]"
            >
              Book a demo
              <ArrowRight
                size={13}
                strokeWidth={1.75}
                className="translate-y-[1.5px] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5"
              />
            </a>
            <a
              href="#why"
              className="c3-link group c3-mono gap-2 text-[12px] uppercase tracking-[0.22em] text-[#1a1a17]/70 hover:text-[#1a1a17]"
            >
              Read the argument
              <ArrowDown
                size={13}
                strokeWidth={1.75}
                className="translate-y-[1.5px] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-[5px]"
              />
            </a>
          </motion.div>
        </div>
      </div>

      {/* ——— The specimen wall ——— */}
      <div className="w-full">
        <div className="mx-auto flex max-w-[1400px] items-baseline justify-between px-6 pb-2 md:px-10">
          <span className="c3-mono text-[10px] uppercase tracking-[0.2em] text-[#8a8578]">
            Plate I — The specimen wall
          </span>
          <span className="c3-mono hidden text-[10px] uppercase tracking-[0.2em] text-[#8a8578] sm:inline">
            Fig. 01–12 · 3D medical animation · actual platform assets
          </span>
        </div>
        <div className="grid auto-rows-[168px] grid-cols-4 gap-px border-y border-[#1a1a17]/25 bg-[#1a1a17]/20 md:auto-rows-[186px] md:grid-cols-12">
          {TILES.map((tile, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.85,
                delay: 0.5 + tile.row * 0.22 + (i % 6) * 0.05,
                ease: EASE,
              }}
              className={`${tile.span} overflow-hidden bg-[#f7f5f0]`}
            >
              <TileBody tile={tile} />
            </motion.div>
          ))}
        </div>
        <div className="mx-auto flex max-w-[1400px] items-baseline justify-between px-6 pt-2.5 md:px-10">
          <span className="c3-mono text-[10px] uppercase tracking-[0.2em] text-[#8a8578]">
            Orthodontic · restorative · cosmetic · periodontal · orthopedic
          </span>
          <span className="c3-mono text-[10px] uppercase tracking-[0.2em] text-[#c2410c]">
            Every clip renders from the patient’s own plan
          </span>
        </div>
      </div>
    </section>
  );
}
