"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CALENDLY_URL } from "@/lib/concepts/shared";
import ClipVideo from "./ClipVideo";

const EASE = [0.22, 1, 0.36, 1];

/* ————————————————————————————————————————————————
   Tile system: 10 live clips mixed with designed
   non-video plates so the wall reads as 25+ moments.
   ———————————————————————————————————————————————— */

type Tile =
  | { kind: "video"; src: string; label: string; phase: string; w: string }
  | { kind: "case"; id: string; sub: string; w: string }
  | { kind: "phase"; big: string; sub: string; w: string }
  | { kind: "ekg"; tag: string; slow?: boolean; w: string }
  | { kind: "data"; rows: [string, string][]; w: string }
  | { kind: "reticle"; tag: string; w: string };

const ROWS: { drift: string; tiles: Tile[] }[] = [
  {
    drift: "c1-row-a",
    tiles: [
      { kind: "case", id: "CASE 4821", sub: "CROWDING · UPPER ARCH", w: "w-[15vw] min-w-[130px]" },
      { kind: "video", src: "/videos/bracesproblem.mp4", label: "Crowding — upper arch", phase: "PROBLEM", w: "w-[24vw] min-w-[210px]" },
      { kind: "ekg", tag: "ENGAGEMENT · LIVE", w: "w-[12vw] min-w-[110px]" },
      { kind: "video", src: "/videos/crown-outcome.mp4", label: "Ceramic crown seated", phase: "OUTCOME", w: "w-[22vw] min-w-[190px]" },
      { kind: "phase", big: "T+06", sub: "MONTHS IN TREATMENT", w: "w-[11vw] min-w-[100px]" },
      { kind: "video", src: "/videos/knee-anatomy-acl.mp4", label: "ACL anatomy", phase: "ANATOMY", w: "w-[23vw] min-w-[200px]" },
      { kind: "data", rows: [["MODULE", "acl-graft"], ["VIEWS", "02"], ["DWELL", "01:16"], ["SIGNAL", "● HIGH"]], w: "w-[13vw] min-w-[120px]" },
    ],
  },
  {
    drift: "c1-row-b",
    tiles: [
      { kind: "video", src: "/videos/invisalignseries.mp4", label: "Tray series — 22 stages", phase: "TIMELINE", w: "w-[26vw] min-w-[220px]" },
      { kind: "reticle", tag: "SCAN 04 · MOLAR #30", w: "w-[12vw] min-w-[110px]" },
      { kind: "video", src: "/videos/fillingcavity.mp4", label: "Caries progression", phase: "PROBLEM", w: "w-[22vw] min-w-[190px]" },
      { kind: "case", id: "CASE 2856", sub: "PHASE I · AGE 9", w: "w-[12vw] min-w-[110px]" },
      { kind: "video", src: "/videos/ceramic-smile.mp4", label: "Smile design", phase: "OUTCOME", w: "w-[24vw] min-w-[210px]" },
      { kind: "ekg", tag: "VITALS · TRACE", slow: true, w: "w-[11vw] min-w-[100px]" },
      { kind: "data", rows: [["MODULE", "smile-design"], ["VIEWS", "05"], ["SHARED", "SPOUSE"], ["SIGNAL", "● HIGH"]], w: "w-[13vw] min-w-[120px]" },
    ],
  },
  {
    drift: "c1-row-c",
    tiles: [
      { kind: "phase", big: "T+14", sub: "MONTHS · RETENTION", w: "w-[12vw] min-w-[110px]" },
      { kind: "video", src: "/videos/rootcanalnerve.mp4", label: "Canal anatomy", phase: "ANATOMY", w: "w-[24vw] min-w-[210px]" },
      { kind: "data", rows: [["MODULE", "canal-anatomy"], ["VIEWS", "03"], ["DWELL", "00:42"], ["SIGNAL", "◐ BUILDING"]], w: "w-[13vw] min-w-[120px]" },
      { kind: "video", src: "/videos/invisalignonteeth.mp4", label: "Aligner on dentition", phase: "TREATMENT", w: "w-[26vw] min-w-[220px]" },
      { kind: "case", id: "CASE 7719", sub: "ROOT CANAL · #14", w: "w-[13vw] min-w-[120px]" },
      { kind: "reticle", tag: "SEC 12 · SAGITTAL", w: "w-[11vw] min-w-[100px]" },
      { kind: "ekg", tag: "REPLAY · 3×", w: "w-[12vw] min-w-[110px]" },
    ],
  },
  {
    drift: "c1-row-d",
    tiles: [
      { kind: "video", src: "/videos/expander-wide.mp4", label: "Expansion complete", phase: "OUTCOME", w: "w-[22vw] min-w-[190px]" },
      { kind: "ekg", tag: "INTENT · SIGNAL", slow: true, w: "w-[12vw] min-w-[110px]" },
      { kind: "case", id: "CASE 1204", sub: "VENEERS · 8 UNIT", w: "w-[14vw] min-w-[120px]" },
      { kind: "video", src: "/videos/shared-smile-outcome.mp4", label: "Final smile", phase: "OUTCOME", w: "w-[24vw] min-w-[210px]" },
      { kind: "phase", big: "T+00", sub: "MOMENT OF CONSULT", w: "w-[12vw] min-w-[110px]" },
      { kind: "data", rows: [["MODULE", "before-after"], ["VIEWS", "04"], ["DWELL", "02:03"], ["SIGNAL", "● HIGH"]], w: "w-[13vw] min-w-[120px]" },
      { kind: "reticle", tag: "FRAME 0224", w: "w-[11vw] min-w-[100px]" },
    ],
  },
];

function EkgTrace({ slow }: { slow?: boolean }) {
  return (
    <svg
      viewBox="0 0 240 80"
      preserveAspectRatio="none"
      className="h-full w-full"
      aria-hidden
    >
      <polyline
        className={slow ? "c1-ekg-slow" : "c1-ekg"}
        fill="none"
        stroke="#22d3ee"
        strokeWidth="1.4"
        strokeLinejoin="round"
        points="0,44 28,44 38,44 44,20 52,64 58,44 90,44 98,38 106,44 138,44 146,14 154,68 160,44 198,44 210,40 240,44"
      />
      <polyline
        fill="none"
        stroke="rgba(34,211,238,0.14)"
        strokeWidth="1"
        points="0,44 28,44 38,44 44,20 52,64 58,44 90,44 98,38 106,44 138,44 146,14 154,68 160,44 198,44 210,40 240,44"
      />
    </svg>
  );
}

function WallTile({ tile }: { tile: Tile }) {
  const base = `relative h-full flex-none overflow-hidden border border-white/[0.07] bg-[#0a0c0e] ${tile.w}`;

  if (tile.kind === "video") {
    return (
      <div className={base}>
        <ClipVideo
          src={tile.src}
          className="absolute inset-0 h-full w-full object-cover brightness-[0.88] saturate-[0.9]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25" />
        <span className="absolute right-2.5 top-2.5 [font-family:var(--c1-mono)] text-[9px] tracking-[0.25em] text-[#67e8f9]/70">
          {tile.phase}
        </span>
        <span className="absolute bottom-2.5 left-2.5 [font-family:var(--c1-mono)] text-[9px] uppercase tracking-[0.2em] text-white/60">
          {tile.label}
        </span>
      </div>
    );
  }

  if (tile.kind === "case") {
    return (
      <div className={`${base} flex flex-col justify-between p-3.5`}>
        <span className="h-3 w-3 border-l border-t border-white/25" />
        <div>
          <div className="[font-family:var(--c1-mono)] text-[13px] font-medium tracking-[0.2em] text-white/75">
            {tile.id}
          </div>
          <div className="mt-1.5 [font-family:var(--c1-mono)] text-[8px] tracking-[0.22em] text-white/35">
            {tile.sub}
          </div>
        </div>
        <span className="h-3 w-3 self-end border-b border-r border-white/25" />
      </div>
    );
  }

  if (tile.kind === "phase") {
    return (
      <div className={`${base} flex flex-col items-center justify-center gap-2 p-3`}>
        <span className="[font-family:var(--c1-mono)] text-[26px] font-medium tracking-[0.12em] text-[#67e8f9]/80">
          {tile.big}
        </span>
        <span className="text-center [font-family:var(--c1-mono)] text-[7.5px] tracking-[0.28em] text-white/30">
          {tile.sub}
        </span>
      </div>
    );
  }

  if (tile.kind === "ekg") {
    return (
      <div className={`${base} flex flex-col`}>
        <div className="flex-1 px-2 py-3 opacity-80">
          <EkgTrace slow={tile.slow} />
        </div>
        <span className="px-2.5 pb-2.5 [font-family:var(--c1-mono)] text-[8px] tracking-[0.25em] text-white/30">
          {tile.tag}
        </span>
      </div>
    );
  }

  if (tile.kind === "data") {
    return (
      <div className={`${base} flex flex-col justify-center gap-2 p-3.5`}>
        {tile.rows.map(([k, v]) => (
          <div key={k} className="flex items-baseline justify-between gap-2">
            <span className="[font-family:var(--c1-mono)] text-[8px] tracking-[0.2em] text-white/30">
              {k}
            </span>
            <span
              className={`truncate [font-family:var(--c1-mono)] text-[9px] tracking-[0.08em] ${
                v.includes("●") || v.includes("◐")
                  ? "text-[#67e8f9]/80"
                  : "text-white/60"
              }`}
            >
              {v}
            </span>
          </div>
        ))}
      </div>
    );
  }

  // reticle
  return (
    <div className={`${base} flex items-center justify-center`}>
      <svg viewBox="0 0 100 100" className="h-[68%] w-auto opacity-50" aria-hidden>
        <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(242,240,235,0.35)" strokeWidth="0.8" />
        <circle cx="50" cy="50" r="14" fill="none" stroke="rgba(103,232,249,0.5)" strokeWidth="0.8" />
        <line x1="50" y1="6" x2="50" y2="30" stroke="rgba(242,240,235,0.4)" strokeWidth="0.8" />
        <line x1="50" y1="70" x2="50" y2="94" stroke="rgba(242,240,235,0.4)" strokeWidth="0.8" />
        <line x1="6" y1="50" x2="30" y2="50" stroke="rgba(242,240,235,0.4)" strokeWidth="0.8" />
        <line x1="70" y1="50" x2="94" y2="50" stroke="rgba(242,240,235,0.4)" strokeWidth="0.8" />
      </svg>
      <span className="absolute bottom-2.5 left-2.5 [font-family:var(--c1-mono)] text-[8px] tracking-[0.25em] text-white/30">
        {tile.tag}
      </span>
    </div>
  );
}

export default function HeroWall() {
  return (
    <section id="top" className="relative h-[100svh] overflow-hidden bg-[#050607]">
      {/* the wall */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: EASE }}
        className="absolute -inset-x-[5vw] -bottom-[3%] -top-[3%]"
      >
        <div className="c1-breathe flex h-full flex-col gap-[3px]">
          {ROWS.map((row, i) => (
            <div key={i} className={`${row.drift} flex flex-1 gap-[3px]`}>
              {row.tiles.map((tile, j) => (
                <WallTile key={j} tile={tile} />
              ))}
            </div>
          ))}
        </div>
      </motion.div>

      {/* vignettes — copy sits in darkness */}
      <div className="pointer-events-none absolute inset-0 bg-[#050607]/30" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 85% 75% at 50% 92%, rgba(5,6,7,0.96) 0%, rgba(5,6,7,0.55) 42%, rgba(5,6,7,0) 72%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_180px_60px_rgba(5,6,7,0.9)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#050607] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#050607] to-transparent" />

      {/* overlay copy */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-end px-6 pb-[9vh] text-center">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: EASE }}
          className="mb-7 [font-family:var(--c1-mono)] text-[10px] tracking-[0.45em] text-white/45"
        >
          OPERA — VISUAL PATIENT EDUCATION
        </motion.span>

        <h1 className="max-w-5xl text-[clamp(2.7rem,6.8vw,6.3rem)] font-medium leading-[0.99] tracking-[-0.035em] text-[#f2f0eb]">
          <motion.span
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 0.65, ease: EASE }}
            className="block"
          >
            Patients say yes
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 0.82, ease: EASE }}
            className="block"
          >
            to what they can <em className="not-italic text-[#a5f3fc]">see</em>.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 1.05, ease: EASE }}
          className="mt-6 max-w-xl text-[15px] font-light leading-relaxed text-white/60"
        >
          Opera turns every treatment plan into a personal, visual explanation —
          delivered the moment the patient leaves the chair.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 1.2, ease: EASE }}
          className="mt-9 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-[#f2f0eb] px-8 py-4 [font-family:var(--c1-mono)] text-[11px] uppercase tracking-[0.25em] text-[#050607] transition-colors duration-300 hover:bg-white"
          >
            Book a demo
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
          </a>
          <a
            href="#platform"
            className="inline-flex items-center gap-3 border border-white/25 px-8 py-4 [font-family:var(--c1-mono)] text-[11px] uppercase tracking-[0.25em] text-[#f2f0eb] transition-colors duration-300 hover:border-[#67e8f9]/60 hover:text-[#a5f3fc]"
          >
            See the platform
          </a>
        </motion.div>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.5, ease: EASE }}
          className="mt-8 [font-family:var(--c1-mono)] text-[9.5px] tracking-[0.3em] text-white/30"
        >
          44 VISUAL MODULES · 6 SPECIALTIES · RENDERED PER PATIENT
        </motion.span>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2">
        <div className="c1-cue h-8 w-px bg-white/35" />
      </div>
    </section>
  );
}
