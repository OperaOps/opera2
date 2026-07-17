"use client";

import { motion } from "framer-motion";
import { CLIPS, type Clip } from "@/lib/concepts/shared";
import { ClipPlate } from "./media";
import SectionHead from "./SectionHead";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const braceClip: Clip = CLIPS.find((c) => c.src === "/videos/bracesdeep-dive.mp4")!;

// What the patient hears — decaying verbatim transcript.
const TRANSCRIPT: { text: string; opacity: number; struck?: boolean }[] = [
  { text: "Your lower arch shows moderate crowding, ", opacity: 1 },
  { text: "which we’d address with a staged aligner series — ", opacity: 0.8 },
  { text: "roughly fourteen months, checkups every six weeks, ", opacity: 0.58 },
  { text: "composite attachments on the premolars, ", opacity: 0.4 },
  { text: "interproximal reduction where contacts are tight, ", opacity: 0.26, struck: true },
  { text: "and fixed retention afterward to hold the result…", opacity: 0.14, struck: true },
];

const ENGAGEMENT_MARGINALIA = [
  { k: "Plays", v: "3.2 avg per patient" },
  { k: "Watched to end", v: "84%" },
  { k: "Shared", v: "with spouse, day 2" },
  { k: "Question asked", v: "“how long?” — answered" },
];

function FigLabel({ fig, caption }: { fig: string; caption: string }) {
  return (
    <div className="mt-3 flex items-baseline gap-2.5">
      <span className="c3-mono shrink-0 text-[10px] tracking-[0.16em] text-[#c2410c]">
        {fig}
      </span>
      <span className="c3-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-[#1a1a17]/80">
        {caption}
      </span>
    </div>
  );
}

const rise = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
};

export default function WhyVisual() {
  return (
    <section id="why" className="scroll-mt-14">
      <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-36">
        <SectionHead
          index="01"
          label="Why visual"
          note="Three exhibits, one conclusion"
          title={
            <>
              What survives the drive home
              <br />
              from the consult?
            </>
          }
        />

        {/* The three exhibits, set asymmetrically on the 12-col grid */}
        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-16 md:mt-24 md:grid-cols-12">
          {/* FIG. A — what the patient hears */}
          <motion.figure
            {...rise}
            transition={{ duration: 0.9, ease: EASE }}
            className="md:col-span-4"
          >
            <div className="border-t border-[#1a1a17]/25 pt-5">
              <p className="c3-display text-[19px] leading-[1.55]">
                {TRANSCRIPT.map((s, i) => (
                  <span
                    key={i}
                    style={{ opacity: s.opacity }}
                    className={s.struck ? "line-through decoration-[0.5px]" : ""}
                  >
                    {s.text}
                  </span>
                ))}
              </p>
            </div>
            <FigLabel
              fig="FIG. A"
              caption="Verbal explanation — patient recall at 72 hours"
            />
            <p className="c3-mono mt-5 max-w-[220px] border-l border-[#c2410c]/60 pl-3 text-[10px] leading-relaxed text-[#8a8578]">
              Patients forget 40–80% of medical information within days of the
              consult. Half of what they retain, they retain incorrectly.
            </p>
          </motion.figure>

          {/* FIG. B — what the patient receives */}
          <motion.figure
            {...rise}
            transition={{ duration: 0.9, delay: 0.12, ease: EASE }}
            className="md:col-span-4 md:mt-16"
          >
            <div className="relative mx-auto max-w-[300px] -rotate-2">
              <div className="border border-[#1a1a17]/20 bg-white p-5 shadow-[6px_8px_0_rgba(26,26,23,0.06)]">
                <div className="c3-mono flex items-center justify-between border-b border-[#1a1a17]/15 pb-2 text-[8px] uppercase tracking-[0.12em] text-[#1a1a17]/50">
                  <span>treatment_plan_FINAL_v3.pdf</span>
                  <span>1 / 9</span>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="h-2 w-3/5 bg-[#1a1a17]/25" />
                  <div className="h-1.5 w-full bg-[#1a1a17]/10" />
                  <div className="h-1.5 w-full bg-[#1a1a17]/10" />
                  <div className="h-1.5 w-4/5 bg-[#1a1a17]/10" />
                </div>
                <div className="relative mt-4 h-24 border border-[#1a1a17]/15">
                  <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
                    <line x1="0" y1="0" x2="100%" y2="100%" stroke="#1a1a17" strokeOpacity="0.15" strokeWidth="1" />
                    <line x1="100%" y1="0" x2="0" y2="100%" stroke="#1a1a17" strokeOpacity="0.15" strokeWidth="1" />
                  </svg>
                  <span className="c3-mono absolute bottom-1 left-1.5 text-[7px] uppercase tracking-[0.12em] text-[#1a1a17]/40">
                    fig: “tooth diagram”
                  </span>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="h-1.5 w-full bg-[#1a1a17]/10" />
                  <div className="h-1.5 w-11/12 bg-[#1a1a17]/10" />
                  <div className="h-1.5 w-2/3 bg-[#1a1a17]/10" />
                </div>
              </div>
              <span className="c3-stamp c3-mono absolute -right-4 top-8 bg-[#f7f5f0]/0 px-3.5 py-1.5 text-[13px]">
                UNREAD
              </span>
            </div>
            <div className="mx-auto max-w-[300px]">
              <FigLabel
                fig="FIG. B"
                caption="Post-consult handout — opened: never"
              />
            </div>
          </motion.figure>

          {/* FIG. C — what Opera shows */}
          <motion.figure
            {...rise}
            transition={{ duration: 0.9, delay: 0.24, ease: EASE }}
            className="md:col-span-4"
          >
            <ClipPlate
              clip={braceClip}
              fig="FIG. C"
              aspect="aspect-[4/3]"
              captionOverride="Opera module 07 — how braces move teeth"
            />
            <div className="mt-5 space-y-2.5">
              {ENGAGEMENT_MARGINALIA.map((m) => (
                <div key={m.k} className="flex items-baseline gap-3">
                  <span className="mt-[1px] h-[5px] w-[5px] shrink-0 rounded-full bg-[#c2410c]" />
                  <span className="c3-mono w-28 shrink-0 text-[10px] uppercase tracking-[0.14em] text-[#8a8578]">
                    {m.k}
                  </span>
                  <span className="c3-mono text-[10px] tracking-[0.06em] text-[#1a1a17]">
                    {m.v}
                  </span>
                </div>
              ))}
            </div>
          </motion.figure>
        </div>

        {/* Pull-quote across the spread */}
        <motion.blockquote
          {...rise}
          transition={{ duration: 1, ease: EASE }}
          className="mt-28 border-y border-[#1a1a17]/25 py-14 md:mt-36"
        >
          <p className="c3-display mx-auto max-w-4xl text-center text-[clamp(2rem,4.6vw,3.9rem)] font-light italic leading-[1.12] tracking-[-0.015em]">
            The consult ends.
            <br />
            Understanding shouldn’t.
          </p>
          <p className="c3-mono mt-8 text-center text-[10px] uppercase tracking-[0.24em] text-[#8a8578]">
            — The Opera thesis
          </p>
        </motion.blockquote>
      </div>
    </section>
  );
}
