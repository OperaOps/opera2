"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Check, Paperclip } from "lucide-react";
import ClipVideo from "./ClipVideo";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ── Visual states (right panel) ─────────────────────────────────── */

const TRANSCRIPT_LINES: { who: string; text: string; o: number }[] = [
  { who: "DR. CHEN", text: "So the crack here runs into the dentin layer…", o: 0.95 },
  { who: "DR. CHEN", text: "…a crown now protects the tooth before the nerve is involved.", o: 0.75 },
  { who: "PATIENT", text: "Okay — and if I wait a few months?", o: 0.55 },
  { who: "DR. CHEN", text: "Cracks like this tend to deepen, so ideally we…", o: 0.36 },
  { who: "DR. CHEN", text: "The lab fabricates the ceramic to match the shade of…", o: 0.2 },
  { who: "PATIENT", text: "Right, that makes sense, I think…", o: 0.1 },
];

function VisualTranscript() {
  return (
    <div className="relative w-full max-w-[420px]">
      <div className="relative overflow-hidden rounded-xl border border-[#e4e1d6] bg-white p-6 shadow-[0_16px_48px_-24px_rgba(20,22,26,0.18)]">
        <div className="mb-5 flex items-center justify-between text-[9px] uppercase tracking-[0.2em] text-[#9a958a] [font-family:var(--c4-font-mono)]">
          <span>Consult — operatory 3</span>
          <span>18 min</span>
        </div>
        <div className="space-y-4">
          {TRANSCRIPT_LINES.map((l, i) => (
            <div key={i} style={{ opacity: l.o }}>
              <p className="text-[8px] uppercase tracking-[0.2em] text-[#9a958a] [font-family:var(--c4-font-mono)]">
                {l.who}
              </p>
              <p className="mt-0.5 text-[13px] leading-snug text-[#14161a]">
                {l.text}
              </p>
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </div>
      <motion.div
        initial={{ opacity: 0, rotate: -6, scale: 0.9 }}
        animate={{ opacity: 1, rotate: -4, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
        className="absolute -bottom-5 right-4 rounded-[4px] border-[1.5px] border-[#14161a]/70 bg-[#faf9f6] px-3.5 py-2 text-center"
      >
        <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#14161a] [font-family:var(--c4-font-mono)]">
          48 hours later
        </p>
        <p className="text-[9px] uppercase tracking-[0.14em] text-[#b4532a] [font-family:var(--c4-font-mono)]">
          ~20% retained
        </p>
      </motion.div>
    </div>
  );
}

function VisualPdfVsModule() {
  return (
    <div className="flex w-full max-w-[460px] flex-col items-center gap-5">
      {/* the dead PDF */}
      <div className="relative w-[78%] -rotate-2 rounded-lg border border-[#dcd8cc] bg-white p-5 opacity-75 shadow-sm">
        <div className="mb-4 flex items-center gap-2 text-[#9a958a]">
          <Paperclip size={12} strokeWidth={1.8} />
          <span className="text-[10px] tracking-[0.04em] [font-family:var(--c4-font-mono)]">
            TreatmentInfo_v2_FINAL.pdf
          </span>
        </div>
        <div className="space-y-2">
          {[92, 100, 96, 88, 100, 64].map((w, i) => (
            <div
              key={i}
              className="h-[7px] rounded-sm bg-[#e8e5db]"
              style={{ width: `${w}%` }}
            />
          ))}
        </div>
        <p className="mt-4 text-[9px] uppercase tracking-[0.18em] text-[#b4532a] [font-family:var(--c4-font-mono)]">
          14 pages · opened 0 times
        </p>
      </div>

      <span className="text-[9px] uppercase tracking-[0.3em] text-[#9a958a] [font-family:var(--c4-font-mono)]">
        vs
      </span>

      {/* the living module */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#5b4fe8]/30 shadow-[0_20px_56px_-24px_rgba(91,79,232,0.35)]">
        <ClipVideo
          src="/videos/bracesdeep-dive.mp4"
          className="aspect-[16/9] w-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/70 to-transparent px-4 pb-3 pt-8">
          <span className="rounded-[3px] bg-[#5b4fe8] px-1.5 py-0.5 text-[8px] font-medium uppercase tracking-[0.18em] text-white [font-family:var(--c4-font-mono)]">
            Living module
          </span>
          <span className="text-[9px] tracking-[0.08em] text-white/80 [font-family:var(--c4-font-mono)]">
            replayed 3× · shared 1×
          </span>
        </div>
      </div>
    </div>
  );
}

const PHONE_TICKS = [
  "Viewed 3× — Tue 9:42 PM",
  "Shared with spouse — Wed",
  "Asked Opera: “Is 9 too young to start?”",
];

function VisualPhone() {
  return (
    <div className="flex w-full max-w-[420px] flex-col items-center gap-6">
      <div className="w-[218px] rounded-[2.4rem] border border-[#d8d4c8] bg-[#0b0c0e] p-[7px] shadow-[0_28px_64px_-28px_rgba(20,22,26,0.45)]">
        <div className="relative aspect-[9/17] w-full overflow-hidden rounded-[1.95rem]">
          <ClipVideo
            src="/videos/expander-in-place.mp4"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-x-0 top-0 flex justify-center pt-2">
            <div className="h-[18px] w-[74px] rounded-full bg-black" />
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-4 pb-4 pt-10">
            <p className="text-[8px] uppercase tracking-[0.2em] text-[#b3a7ff] [font-family:var(--c4-font-mono)]">
              For Ethan · from Dr. Chen
            </p>
            <p className="mt-1 text-[12px] font-medium leading-snug text-white [font-family:var(--c4-font-display)]">
              Why we expand first — Ethan&apos;s plan, step by step
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-2.5">
        {PHONE_TICKS.map((t, i) => (
          <motion.div
            key={t}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.18, ease: EASE }}
            className="flex items-center gap-2.5"
          >
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#5b4fe8]/10">
              <Check size={9} strokeWidth={3} className="text-[#5b4fe8]" />
            </span>
            <span className="text-[11px] tracking-[0.02em] text-[#5c5952] [font-family:var(--c4-font-mono)]">
              {t}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const VISUALS = [VisualTranscript, VisualPdfVsModule, VisualPhone];

/* ── Claims ──────────────────────────────────────────────────────── */

const CLAIMS = [
  {
    n: "01",
    line: "The consult ends. Understanding doesn't survive it.",
    sub: "Patients retain roughly 20% of what they hear in the chair. The other 80% is where cases die.",
  },
  {
    n: "02",
    line: "Nobody watches a PDF.",
    sub: "Post-consult packets get filed, not read. A living visual module gets opened, replayed, and shared.",
  },
  {
    n: "03",
    line: "The decision happens at home.",
    sub: "Kitchen-table conversations decide cases. Opera makes sure the treatment is in the room.",
  },
];

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return mobile;
}

export default function Why() {
  const isMobile = useIsMobile();
  const r0 = useRef<HTMLDivElement>(null);
  const r1 = useRef<HTMLDivElement>(null);
  const r2 = useRef<HTMLDivElement>(null);
  const in0 = useInView(r0, { margin: "-42% 0px -52% 0px" });
  const in1 = useInView(r1, { margin: "-42% 0px -52% 0px" });
  const in2 = useInView(r2, { margin: "-42% 0px -52% 0px" });
  const active = in2 ? 2 : in1 ? 1 : in0 ? 0 : 0;
  const refs = [r0, r1, r2];
  const ActiveVisual = VISUALS[active];

  return (
    <section className="mx-auto max-w-[1480px] px-6 pt-28 md:px-12 md:pt-36">
      {/* Section header */}
      <div className="mb-6 flex items-center gap-4">
        <span className="text-[10px] font-medium uppercase tracking-[0.26em] text-[#5b4fe8] [font-family:var(--c4-font-mono)]">
          01 / Why visual
        </span>
        <span className="h-px flex-1 bg-[#e4e1d6]" />
      </div>
      <h2 className="max-w-[720px] text-[clamp(1.9rem,3.4vw,2.9rem)] font-medium leading-[1.08] tracking-[-0.03em] text-[#14161a] [font-family:var(--c4-font-display)]">
        Patients forget 80% of what their doctor says.
        <br />
        <span className="text-[#8a867b]">
          They remember what they{" "}
          <em className="italic text-[#5b4fe8] [font-family:var(--c4-font-serif)]">
            see
          </em>
          .
        </span>
      </h2>

      {/* Scrollytelling */}
      <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-16">
        <div>
          {CLAIMS.map((c, i) => {
            const Visual = VISUALS[i];
            return (
              <div
                key={c.n}
                ref={refs[i]}
                className="flex flex-col justify-center py-16 md:min-h-[72vh] md:py-0"
              >
                <span
                  className={`text-[11px] tracking-[0.24em] transition-colors duration-500 [font-family:var(--c4-font-mono)] ${
                    active === i ? "text-[#5b4fe8]" : "text-[#b6b1a4]"
                  }`}
                >
                  {c.n}
                </span>
                <p
                  className={`mt-4 max-w-[440px] text-[clamp(1.5rem,2.5vw,2.1rem)] font-medium leading-[1.15] tracking-[-0.025em] transition-colors duration-500 [font-family:var(--c4-font-display)] ${
                    active === i ? "text-[#14161a]" : "text-[#c3beb1]"
                  }`}
                >
                  {c.line}
                </p>
                <p
                  className={`mt-4 max-w-[400px] text-[14px] font-light leading-relaxed transition-colors duration-500 ${
                    active === i ? "text-[#5c5952]" : "text-[#cfcabd]"
                  }`}
                >
                  {c.sub}
                </p>
                {/* Mobile: visual inline under its claim */}
                {isMobile && (
                  <div className="mt-10 flex justify-center">
                    <Visual />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Desktop: sticky swapping panel */}
        {!isMobile && (
          <div className="relative hidden md:block">
            <div className="sticky top-[14vh] flex h-[72vh] items-center justify-center rounded-2xl border border-[#e9e6dc] bg-[#f3f1ea] px-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 24, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -16, scale: 0.99 }}
                  transition={{ duration: 0.55, ease: EASE }}
                  className="flex w-full justify-center"
                >
                  <ActiveVisual />
                </motion.div>
              </AnimatePresence>
              <span className="absolute bottom-5 left-6 text-[9px] uppercase tracking-[0.22em] text-[#a8a396] [font-family:var(--c4-font-mono)]">
                Exhibit {String(active + 1).padStart(2, "0")} / 03
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
