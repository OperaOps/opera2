"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { CALENDLY_URL, SITE_PHOTOS } from "@/lib/concepts/shared";
import { AutoVideo, useIsMobile } from "./media";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ————————————————————————————————————————————————————————————————
   The specimen wall — a dense, medicine-wide plate.
   Desktop: 12 columns × 6 rows, ~51 tiles, 16 mounted videos.
   Mobile: 4 columns, 8 mounted videos.
   ———————————————————————————————————————————————————————————————— */

type Tile =
  | { kind: "video"; src: string; fig: string; label: string; tag: string; span: 1 | 2; row: number; pos?: string }
  | { kind: "image"; src: string; fig: string; label: string; tag: string; span: 1; row: number; pos?: string }
  | { kind: "phase"; word: string; span: 1; row: number }
  | { kind: "q"; text: string; span: 1; row: number }
  | { kind: "counter"; t: string; note: string; span: 1; row: number }
  | { kind: "spec"; idx: string; name: string; span: 1; row: number }
  | { kind: "ink"; variant: "modules" | "count" | "standard"; span: 1 | 2; row: number }
  | { kind: "record"; span: 2; row: number }
  | { kind: "hesitation"; span: 2; row: number }
  | { kind: "intent"; span: 2; row: number }
  | { kind: "diagram"; variant: "heart" | "knee"; span: 2; row: number };

// Videos: 5 library (cardio/GI/general) + 6 knee + gum-treatment, hero-tooth,
// invisalignseries (the only dental) + 2 re-crops of cardio + scope = 16 mounted.
const DESKTOP_TILES: Tile[] = [
  // ——— Row 1 (12 cols) ———
  { kind: "video", src: "/videos/library/cardio-stent.mp4", fig: "FIG. 01", label: "Colon anatomy — overview", tag: "GI", span: 2, row: 0 },
  { kind: "phase", word: "Problem.", span: 1, row: 0 },
  { kind: "video", src: "/videos/knee-anatomy-acl.mp4", fig: "FIG. 02", label: "ACL anatomy", tag: "ORTHO", span: 2, row: 0 },
  { kind: "spec", idx: "01", name: "Cardiology", span: 1, row: 0 },
  { kind: "video", src: "/videos/library/scope-device.mp4", fig: "FIG. 03", label: "Endoscope — soft tip", tag: "GI", span: 2, row: 0 },
  { kind: "image", src: SITE_PHOTOS.anatomyHeart, fig: "FIG. 21", label: "Cardiac model", tag: "ANATOMY", span: 1, row: 0 },
  { kind: "q", text: "Will this hurt?", span: 1, row: 0 },
  { kind: "counter", t: "T+02", note: "Video opened", span: 1, row: 0 },
  { kind: "image", src: SITE_PHOTOS.anatomyHeartAlt, fig: "FIG. 22", label: "Heart — close study", tag: "ANATOMY", span: 1, row: 0 },
  // ——— Row 2 (12 cols) ———
  { kind: "ink", variant: "modules", span: 2, row: 1 },
  { kind: "video", src: "/videos/library/medication-routine.mp4", fig: "FIG. 04", label: "Medication routine", tag: "GENERAL", span: 2, row: 1 },
  { kind: "spec", idx: "02", name: "GI", span: 1, row: 1 },
  { kind: "video", src: "/videos/knee2.mp4", fig: "FIG. 05", label: "Knee — medial view", tag: "ORTHO", span: 2, row: 1 },
  { kind: "hesitation", span: 2, row: 1 },
  { kind: "video", src: "/videos/testing/gum-treatment.mp4", fig: "FIG. 06", label: "Perio therapy", tag: "DENTAL", span: 2, row: 1 },
  { kind: "phase", word: "Before / After.", span: 1, row: 1 },
  // ——— Row 3 (12 cols) ———
  { kind: "diagram", variant: "heart", span: 2, row: 2 },
  { kind: "video", src: "/videos/library/colonoscopy-patient-video.mp4", fig: "FIG. 07", label: "Colon screening — patient cut", tag: "GI", span: 2, row: 2 },
  { kind: "counter", t: "T+06", note: "Question asked", span: 1, row: 2 },
  { kind: "video", src: "/videos/knee3.mp4", fig: "FIG. 08", label: "Ligament mechanics", tag: "ORTHO", span: 2, row: 2 },
  { kind: "spec", idx: "03", name: "Orthopedics", span: 1, row: 2 },
  { kind: "video", src: "/videos/library/patient-watching-home.mp4", fig: "FIG. 09", label: "Watched at home — 9:41 pm", tag: "OUTCOME", span: 2, row: 2 },
  { kind: "q", text: "What if I wait?", span: 1, row: 2 },
  { kind: "phase", word: "Outcome.", span: 1, row: 2 },
  // ——— Row 4 (12 cols) ———
  { kind: "video", src: "/videos/hero-tooth.mp4", fig: "FIG. 10", label: "Tooth study", tag: "DENTAL", span: 2, row: 3 },
  { kind: "spec", idx: "04", name: "OB", span: 1, row: 3 },
  { kind: "video", src: "/videos/knee4.mp4", fig: "FIG. 11", label: "Reconstruction graft", tag: "ORTHO", span: 2, row: 3 },
  { kind: "record", span: 2, row: 3 },
  { kind: "image", src: SITE_PHOTOS.xrayOk, fig: "FIG. 23", label: "Radiograph — OK", tag: "IMAGING", span: 1, row: 3 },
  { kind: "video", src: "/videos/invisalignseries.mp4", fig: "FIG. 12", label: "Tray series — 22 stages", tag: "DENTAL", span: 2, row: 3 },
  { kind: "counter", t: "T+14", note: "Shared with spouse", span: 1, row: 3 },
  { kind: "video", src: "/videos/library/cardio-stent.mp4", fig: "FIG. 13", label: "Colonic stent — detail", tag: "GI", span: 1, row: 3, pos: "object-[80%_50%]" },
  // ——— Row 5 (12 cols) ———
  { kind: "video", src: "/videos/library/scope-device.mp4", fig: "FIG. 14", label: "Scope — detail", tag: "GI", span: 1, row: 4, pos: "object-[15%_50%]" },
  { kind: "spec", idx: "05", name: "Dental", span: 1, row: 4 },
  { kind: "video", src: "/videos/knee5.mp4", fig: "FIG. 15", label: "Post-op range of motion", tag: "ORTHO", span: 2, row: 4 },
  { kind: "diagram", variant: "knee", span: 2, row: 4 },
  { kind: "phase", word: "After.", span: 1, row: 4 },
  { kind: "q", text: "Is 9 too young to start?", span: 1, row: 4 },
  { kind: "counter", t: "T+21", note: "Decision made", span: 1, row: 4 },
  { kind: "spec", idx: "06", name: "Derm", span: 1, row: 4 },
  { kind: "image", src: SITE_PHOTOS.neurons, fig: "FIG. 24", label: "Synapse render", tag: "NEURO", span: 1, row: 4 },
  { kind: "counter", t: "T+45", note: "Treatment begins", span: 1, row: 4 },
  // ——— Row 6 (12 cols) ———
  { kind: "video", src: "/videos/knee6.mp4", fig: "FIG. 16", label: "Recovery timeline", tag: "ORTHO", span: 2, row: 5 },
  { kind: "q", text: "How long is recovery?", span: 1, row: 5 },
  { kind: "counter", t: "T+90", note: "Outcome filmed", span: 1, row: 5 },
  { kind: "phase", word: "Timeline.", span: 1, row: 5 },
  { kind: "intent", span: 2, row: 5 },
  { kind: "q", text: "Will it look natural?", span: 1, row: 5 },
  { kind: "ink", variant: "count", span: 1, row: 5 },
  { kind: "phase", word: "Anatomy.", span: 1, row: 5 },
  { kind: "ink", variant: "standard", span: 2, row: 5 },
];

// Mobile wall: 4 columns, 8 mounted videos, rows of 4.
const MOBILE_TILES: Tile[] = [
  { kind: "video", src: "/videos/library/cardio-stent.mp4", fig: "FIG. 01", label: "Colon anatomy — overview", tag: "GI", span: 2, row: 0 },
  { kind: "phase", word: "Problem.", span: 1, row: 0 },
  { kind: "spec", idx: "01", name: "Cardiology", span: 1, row: 0 },
  { kind: "q", text: "Will this hurt?", span: 1, row: 1 },
  { kind: "video", src: "/videos/knee-anatomy-acl.mp4", fig: "FIG. 02", label: "ACL anatomy", tag: "ORTHO", span: 2, row: 1 },
  { kind: "counter", t: "T+02", note: "Video opened", span: 1, row: 1 },
  { kind: "video", src: "/videos/library/scope-device.mp4", fig: "FIG. 03", label: "Endoscope — soft tip", tag: "GI", span: 2, row: 2 },
  { kind: "ink", variant: "modules", span: 2, row: 2 },
  { kind: "spec", idx: "02", name: "GI", span: 1, row: 3 },
  { kind: "video", src: "/videos/library/colonoscopy-patient-video.mp4", fig: "FIG. 07", label: "Colon screening — patient cut", tag: "GI", span: 2, row: 3 },
  { kind: "phase", word: "Outcome.", span: 1, row: 3 },
  { kind: "video", src: "/videos/library/medication-routine.mp4", fig: "FIG. 04", label: "Medication routine", tag: "GENERAL", span: 2, row: 4 },
  { kind: "hesitation", span: 2, row: 4 },
  { kind: "counter", t: "T+14", note: "Shared with spouse", span: 1, row: 5 },
  { kind: "video", src: "/videos/library/patient-watching-home.mp4", fig: "FIG. 09", label: "Watched at home — 9:41 pm", tag: "OUTCOME", span: 2, row: 5 },
  { kind: "spec", idx: "03", name: "Orthopedics", span: 1, row: 5 },
  { kind: "video", src: "/videos/knee5.mp4", fig: "FIG. 15", label: "Post-op range of motion", tag: "ORTHO", span: 2, row: 6 },
  { kind: "q", text: "What if I wait?", span: 1, row: 6 },
  { kind: "phase", word: "After.", span: 1, row: 6 },
  { kind: "record", span: 2, row: 7 },
  { kind: "video", src: "/videos/testing/gum-treatment.mp4", fig: "FIG. 06", label: "Perio therapy", tag: "DENTAL", span: 2, row: 7 },
];

/* ——— Hand-drawn annotated diagrams ——— */

function HeartDiagram() {
  return (
    <div className="relative flex h-full items-center justify-center bg-[#f7f5f0] p-3">
      <svg viewBox="0 0 120 100" className="h-[76%] w-auto" fill="none">
        {/* heart outline */}
        <path
          d="M38 14 C24 10 12 22 14 38 C16 58 30 78 52 90 C58 93 64 93 70 89 C90 76 104 56 106 38 C108 22 96 10 82 14 C72 17 66 24 60 32 C54 24 48 17 38 14 Z"
          stroke="#1a1a17"
          strokeWidth="1.1"
        />
        {/* septum + atrioventricular divider */}
        <path d="M60 32 C60 52 59 70 58 86" stroke="#1a1a17" strokeWidth="0.7" strokeDasharray="3 3" />
        <path d="M26 46 C40 52 78 52 98 44" stroke="#1a1a17" strokeWidth="0.7" strokeDasharray="3 3" />
        {/* aorta stub */}
        <path d="M64 16 C66 8 74 4 82 6" stroke="#1a1a17" strokeWidth="0.9" />
        {/* red annotation leaders */}
        <line x1="40" y1="34" x2="6" y2="24" stroke="#c2410c" strokeWidth="0.7" />
        <line x1="80" y1="34" x2="114" y2="24" stroke="#c2410c" strokeWidth="0.7" />
        <line x1="42" y1="66" x2="6" y2="76" stroke="#c2410c" strokeWidth="0.7" />
        <line x1="78" y1="66" x2="114" y2="76" stroke="#c2410c" strokeWidth="0.7" />
      </svg>
      <span className="cf-mono absolute left-1.5 top-[14%] text-[7px] uppercase tracking-[0.12em] text-[#c2410c]">RA</span>
      <span className="cf-mono absolute right-1.5 top-[14%] text-[7px] uppercase tracking-[0.12em] text-[#c2410c]">LA</span>
      <span className="cf-mono absolute bottom-[22%] left-1.5 text-[7px] uppercase tracking-[0.12em] text-[#c2410c]">RV</span>
      <span className="cf-mono absolute bottom-[22%] right-1.5 text-[7px] uppercase tracking-[0.12em] text-[#c2410c]">LV</span>
      <span className="cf-mono absolute bottom-1.5 left-2 text-[8px] uppercase tracking-[0.14em] text-[#8a8578]">
        Diagram i — heart, chambers
      </span>
    </div>
  );
}

function KneeDiagram() {
  return (
    <div className="relative flex h-full items-center justify-center bg-[#f7f5f0] p-3">
      <svg viewBox="0 0 120 100" className="h-[76%] w-auto" fill="none">
        {/* femur */}
        <path d="M42 4 L42 30 C42 38 48 42 60 42 C72 42 78 38 78 30 L78 4" stroke="#1a1a17" strokeWidth="1.1" />
        {/* tibia */}
        <path d="M46 96 L46 70 C46 62 52 58 60 58 C68 58 74 62 74 70 L74 96" stroke="#1a1a17" strokeWidth="1.1" />
        {/* menisci */}
        <path d="M44 50 C52 47 68 47 76 50" stroke="#1a1a17" strokeWidth="0.7" strokeDasharray="3 3" />
        {/* ACL band */}
        <path d="M52 40 C56 46 62 52 68 58" stroke="#c2410c" strokeWidth="1.6" />
        {/* PCL faint */}
        <path d="M68 40 C64 46 58 52 52 58" stroke="#1a1a17" strokeWidth="0.7" strokeDasharray="2 3" />
        {/* red annotation leaders */}
        <line x1="60" y1="49" x2="104" y2="30" stroke="#c2410c" strokeWidth="0.7" />
        <line x1="48" y1="50" x2="10" y2="66" stroke="#c2410c" strokeWidth="0.7" />
      </svg>
      <span className="cf-mono absolute right-1.5 top-[20%] text-[7px] uppercase tracking-[0.12em] text-[#c2410c]">ACL</span>
      <span className="cf-mono absolute bottom-[26%] left-1.5 text-[7px] uppercase tracking-[0.12em] text-[#c2410c]">Meniscus</span>
      <span className="cf-mono absolute bottom-1.5 left-2 text-[8px] uppercase tracking-[0.14em] text-[#8a8578]">
        Diagram ii — knee, anterior
      </span>
    </div>
  );
}

/* ——— Tile renderer ——— */

function TileBody({ tile }: { tile: Tile }) {
  switch (tile.kind) {
    case "video":
      if (tile.span === 1) {
        // micro specimen — re-cropped clip, fig chip overlaid
        return (
          <div className="relative h-full bg-[#fdfcfa]">
            <AutoVideo src={tile.src} className={`h-full w-full object-cover ${tile.pos ?? ""}`} />
            <span className="cf-mono absolute bottom-1 left-1.5 bg-[#f7f5f0]/90 px-1 py-0.5 text-[7px] tracking-[0.14em] text-[#c2410c]">
              {tile.fig}
            </span>
          </div>
        );
      }
      return (
        <div className="flex h-full flex-col bg-[#fdfcfa]">
          <div className="min-h-0 flex-1 overflow-hidden">
            <AutoVideo src={tile.src} className={`h-full w-full object-cover ${tile.pos ?? ""}`} />
          </div>
          <div className="flex items-baseline gap-1.5 border-t border-[#1a1a17]/20 bg-[#f7f5f0] px-2 py-1">
            <span className="cf-mono shrink-0 text-[8px] tracking-[0.14em] text-[#c2410c]">{tile.fig}</span>
            <span className="cf-mono min-w-0 flex-1 truncate text-[8px] uppercase tracking-[0.12em] text-[#1a1a17]">
              {tile.label}
            </span>
            <span className="cf-mono hidden shrink-0 text-[8px] uppercase tracking-[0.12em] text-[#8a8578] xl:inline">
              {tile.tag}
            </span>
          </div>
        </div>
      );
    case "image":
      return (
        <div className="flex h-full flex-col bg-[#fdfcfa]">
          <div className="min-h-0 flex-1 overflow-hidden">
            <img
              src={tile.src}
              alt={tile.label}
              className={`h-full w-full object-cover ${tile.pos ?? ""}`}
            />
          </div>
          <div className="flex items-baseline gap-1.5 border-t border-[#1a1a17]/20 bg-[#f7f5f0] px-2 py-1">
            <span className="cf-mono shrink-0 text-[8px] tracking-[0.14em] text-[#c2410c]">{tile.fig}</span>
            <span className="cf-mono min-w-0 flex-1 truncate text-[8px] uppercase tracking-[0.12em] text-[#1a1a17]">
              {tile.label}
            </span>
          </div>
        </div>
      );
    case "phase":
      return (
        <div className="flex h-full flex-col justify-between bg-[#f7f5f0] p-2.5">
          <span className="cf-mono text-[7px] uppercase tracking-[0.18em] text-[#c2410c]">Phase</span>
          <span className="cf-display text-[clamp(0.95rem,1.15vw,1.3rem)] italic leading-[1.05] tracking-[-0.01em]">
            {tile.word}
          </span>
          <span className="h-px w-6 bg-[#1a1a17]/25" />
        </div>
      );
    case "q":
      return (
        <div className="flex h-full flex-col justify-between bg-[#f7f5f0] p-2.5">
          <span className="cf-mono text-[7px] tracking-[0.18em] text-[#c2410c]">Q.</span>
          <span className="cf-display text-[11px] italic leading-snug">&ldquo;{tile.text}&rdquo;</span>
          <span className="cf-mono text-[7px] uppercase tracking-[0.12em] text-[#8a8578]">Asked in consult</span>
        </div>
      );
    case "counter":
      return (
        <div className="flex h-full flex-col justify-between bg-[#f7f5f0] p-2.5">
          <span className="cf-mono text-[7px] uppercase tracking-[0.18em] text-[#8a8578]">Timeline</span>
          <span className="cf-mono text-[17px] font-medium tracking-[0.04em] text-[#1a1a17]">{tile.t}</span>
          <span className="cf-mono text-[7px] uppercase leading-tight tracking-[0.12em] text-[#c2410c]">
            {tile.note}
          </span>
        </div>
      );
    case "spec":
      return (
        <div className="flex h-full flex-col justify-between bg-[#f7f5f0] p-2.5">
          <span className="cf-mono text-[7px] uppercase tracking-[0.18em] text-[#c2410c]">
            Spec {tile.idx}
          </span>
          <span className="cf-mono text-[9px] uppercase tracking-[0.2em] text-[#1a1a17]">{tile.name}</span>
        </div>
      );
    case "ink":
      if (tile.variant === "modules") {
        return (
          <div className="flex h-full flex-col justify-between bg-[#1a1a17] p-3 text-[#f7f5f0]">
            <span className="cf-mono text-[7px] uppercase tracking-[0.18em] text-[#f7f5f0]/60">The library</span>
            <span className="cf-display text-[clamp(1.8rem,2.6vw,2.6rem)] font-light leading-none">60+</span>
            <span className="cf-mono text-[7px] uppercase leading-relaxed tracking-[0.14em] text-[#f7f5f0]/70">
              Visual modules
              <br />
              across medicine
            </span>
          </div>
        );
      }
      if (tile.variant === "count") {
        return (
          <div className="flex h-full flex-col justify-between bg-[#1a1a17] p-2.5 text-[#f7f5f0]">
            <span className="cf-mono text-[7px] uppercase tracking-[0.16em] text-[#f7f5f0]/60">Corpus</span>
            <span className="cf-mono text-[13px] tracking-[0.02em]">12,406</span>
            <span className="cf-mono text-[7px] uppercase leading-tight tracking-[0.12em] text-[#f7f5f0]/70">
              Consult questions captured
            </span>
          </div>
        );
      }
      return (
        <div className="flex h-full flex-col justify-between bg-[#1a1a17] p-3 text-[#f7f5f0]">
          <span className="cf-mono text-[7px] uppercase tracking-[0.18em] text-[#c2410c]">The standard</span>
          <span className="cf-display text-[13px] italic leading-snug">
            Rendered from the chart —<br />
            not stock footage.
          </span>
          <span className="h-px w-6 bg-[#f7f5f0]/30" />
        </div>
      );
    case "record":
      return (
        <div className="flex h-full flex-col justify-between bg-[#f7f5f0] p-3">
          <span className="cf-mono text-[7px] uppercase tracking-[0.16em] text-[#8a8578]">
            Consult record — PT-4821
          </span>
          <div className="cf-mono space-y-1 text-[9px] leading-snug text-[#1a1a17]">
            <div className="flex justify-between gap-2">
              <span className="text-[#8a8578]">question</span>
              <span className="text-right">&ldquo;What if I wait?&rdquo;</span>
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
          <span className="cf-mono text-[7px] uppercase tracking-[0.12em] text-[#8a8578]">
            Outcome — booked records visit
          </span>
        </div>
      );
    case "hesitation":
      return (
        <div className="flex h-full flex-col justify-between bg-[#f7f5f0] p-3">
          <span className="cf-mono text-[7px] uppercase tracking-[0.16em] text-[#c2410c]">hesitation_reason</span>
          <span className="cf-display text-[12px] italic leading-snug">&ldquo;cost vs. urgency unclear&rdquo;</span>
          <span className="cf-mono text-[7px] uppercase leading-tight tracking-[0.11em] text-[#8a8578]">
            likely_barrier — <span className="text-[#1a1a17]">financing not yet discussed</span>
          </span>
        </div>
      );
    case "intent":
      return (
        <div className="flex h-full flex-col justify-between bg-[#f7f5f0] p-3">
          <span className="cf-mono text-[7px] uppercase tracking-[0.16em] text-[#8a8578]">engagement_score</span>
          <div>
            <span className="cf-mono text-[17px] tracking-[0.02em] text-[#1a1a17]">87</span>
            <div className="mt-1.5 h-[2px] w-full bg-[#1a1a17]/10">
              <div className="h-full w-[87%] bg-[#c2410c]" />
            </div>
          </div>
          <span className="cf-mono text-[7px] uppercase tracking-[0.12em] text-[#c2410c]">
            intent_signal — HIGH ● · Accept likely ≤ 14 days
          </span>
        </div>
      );
    case "diagram":
      return tile.variant === "heart" ? <HeartDiagram /> : <KneeDiagram />;
  }
}

/* ——— Hero ——— */

export default function Hero() {
  const isMobile = useIsMobile();
  const tiles = isMobile ? MOBILE_TILES : DESKTOP_TILES;

  return (
    <section id="top" className="pt-14">
      {/* ——— Compact masthead ——— */}
      <div className="mx-auto max-w-[1480px] px-6 pb-8 pt-10 md:px-10 md:pt-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex items-baseline justify-between border-b border-[#1a1a17]/25 pb-3"
        >
          <span className="cf-mono text-[10px] uppercase tracking-[0.22em] text-[#1a1a17]">
            Opera — A visual system for patient understanding
          </span>
          <span className="cf-mono hidden text-[10px] uppercase tracking-[0.22em] text-[#8a8578] md:inline">
            Composed edition · Vol. II
          </span>
        </motion.div>

        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: EASE }}
            className="cf-display max-w-3xl text-[clamp(2.7rem,5.6vw,4.8rem)] font-light leading-[0.98] tracking-[-0.03em]"
          >
            Understanding is a <em className="italic text-[#c2410c]">visual</em> act.
          </motion.h1>

          <div className="max-w-md">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.24, ease: EASE }}
              className="cf-body text-[14px] leading-relaxed text-[#1a1a17]/80"
            >
              Patients forget 80% of what their doctor says — they remember what
              they see. Opera renders every treatment plan, in every specialty,
              as moving medically-true images.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.36, ease: EASE }}
              className="mt-6 flex items-baseline gap-9"
            >
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="cf-link group cf-mono gap-2 text-[12px] uppercase tracking-[0.22em] text-[#c2410c]"
              >
                Book a demo
                <ArrowRight
                  size={13}
                  strokeWidth={1.75}
                  className="translate-y-[1.5px] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5"
                />
              </a>
              <a
                href="#dataset"
                className="cf-link group cf-mono gap-2 text-[12px] uppercase tracking-[0.22em] text-[#1a1a17]/70 hover:text-[#1a1a17]"
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
      </div>

      {/* ——— The specimen wall ——— */}
      <div id="wall" className="w-full scroll-mt-14">
        <div className="mx-auto flex max-w-[1480px] items-baseline justify-between px-6 pb-2 md:px-10">
          <span className="cf-mono text-[10px] uppercase tracking-[0.2em] text-[#8a8578]">
            Plate I — The specimen wall
          </span>
          <span className="cf-mono hidden text-[10px] uppercase tracking-[0.2em] text-[#8a8578] sm:inline">
            Fig. 01–24 · 3D medical animation · actual platform assets
          </span>
        </div>
        <div className="grid auto-rows-[104px] grid-cols-4 gap-px border-y border-[#1a1a17]/25 bg-[#1a1a17]/20 md:auto-rows-[112px] md:grid-cols-12">
          {tiles.map((tile, i) => (
            <motion.div
              key={`${tile.kind}-${i}-${"src" in tile ? tile.src : "x"}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.4 + tile.row * 0.13 + (i % 9) * 0.035,
                ease: EASE,
              }}
              className={`${tile.span === 2 ? "col-span-2" : "col-span-1"} overflow-hidden bg-[#f7f5f0]`}
            >
              <TileBody tile={tile} />
            </motion.div>
          ))}
        </div>
        <div className="mx-auto flex max-w-[1480px] flex-col gap-1 px-6 pt-2.5 sm:flex-row sm:items-baseline sm:justify-between md:px-10">
          <span className="cf-mono text-[10px] uppercase tracking-[0.2em] text-[#8a8578]">
            Cardiology · GI · Orthopedics · OB · Dental · Derm
          </span>
          <span className="cf-mono text-[10px] uppercase tracking-[0.2em] text-[#c2410c]">
            Every clip renders from the patient&rsquo;s own plan
          </span>
        </div>
      </div>
    </section>
  );
}
