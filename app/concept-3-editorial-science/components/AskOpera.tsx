"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ASK_OPERA_QA, CLIPS, type Clip } from "@/lib/concepts/shared";
import { AutoVideo } from "./media";
import SectionHead from "./SectionHead";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const DWELL_MS = 9000;

const bySrc = (src: string): Clip => CLIPS.find((c) => c.src === src)!;

// The cited figure for each exchange, by module id.
const MODULE_CLIPS: Record<string, Clip> = {
  "crowding-progression": bySrc("/videos/bracesproblem.mp4"),
  "what-to-expect": bySrc("/videos/implant-step1-placement.mp4"),
  "fracture-progression": bySrc("/videos/crownproblem.mp4"),
  "recovery-timeline": bySrc("/videos/implant-step2-abutment.mp4"),
  "options-comparison": bySrc("/videos/bridgeunit.mp4"),
};

const ANNOTATIONS: { k: string; v: (module: string) => string }[] = [
  { k: "Grounded in", v: () => "the patient’s own treatment plan" },
  { k: "Linked module", v: (m) => m },
  { k: "Reviewed against", v: () => "Dr. Chen’s consult notes" },
  { k: "Escalation", v: () => "clinical questions route to the practice" },
];

export default function AskOpera() {
  const [active, setActive] = useState(0);

  // Idle auto-advance; any selection restarts the dwell.
  useEffect(() => {
    const t = setTimeout(
      () => setActive((a) => (a + 1) % ASK_OPERA_QA.length),
      DWELL_MS
    );
    return () => clearTimeout(t);
  }, [active]);

  const qa = ASK_OPERA_QA[active];
  const clip = MODULE_CLIPS[qa.module] ?? CLIPS[0];
  const qIndex = `Q.0${active + 1}`;

  return (
    <section id="ask" className="scroll-mt-14">
      <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-36">
        <SectionHead
          index="02"
          label="Ask Opera"
          note="A study in patient dialogue · n = 2,300 consults"
          title={
            <>
              Every patient leaves with questions.
              <br />
              Opera answers them — <em className="italic">visually</em>.
            </>
          }
        />

        <div className="mt-16 grid grid-cols-1 gap-x-14 gap-y-14 md:mt-24 lg:grid-cols-12">
          {/* The questions, set as numbered pull-quotes */}
          <div className="lg:col-span-5">
            <p className="c3-mono mb-7 text-[10px] uppercase tracking-[0.2em] text-[#8a8578]">
              Recorded questions — select to read the response
            </p>
            <ol className="border-t border-[#1a1a17]/20">
              {ASK_OPERA_QA.map((item, i) => {
                const isActive = i === active;
                return (
                  <li key={item.q} className="relative border-b border-[#1a1a17]/20">
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      className="group flex w-full items-baseline gap-5 py-5 text-left"
                    >
                      <span
                        className={`c3-mono shrink-0 text-[11px] tracking-[0.16em] transition-colors duration-300 ${
                          isActive ? "text-[#c2410c]" : "text-[#8a8578]"
                        }`}
                      >
                        Q.0{i + 1}
                      </span>
                      <span
                        className={`c3-display text-[clamp(1.25rem,2vw,1.7rem)] italic leading-snug tracking-[-0.01em] transition-all duration-500 ${
                          isActive
                            ? "translate-x-1 text-[#1a1a17]"
                            : "text-[#8a8578] group-hover:text-[#1a1a17]/70"
                        }`}
                      >
                        “{item.q}”
                      </span>
                    </button>
                    {isActive && (
                      <motion.span
                        key={`bar-${active}`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: DWELL_MS / 1000, ease: "linear" }}
                        className="absolute bottom-[-1px] left-0 h-px w-full origin-left bg-[#c2410c]"
                      />
                    )}
                  </li>
                );
              })}
            </ol>
          </div>

          {/* The response, set as an annotated manuscript page */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.55, ease: EASE }}
                className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-12"
              >
                <div className="sm:col-span-7">
                  <p className="c3-mono text-[10px] uppercase tracking-[0.2em] text-[#c2410c]">
                    Response — {qIndex}
                  </p>
                  <p className="c3-body mt-5 text-[16px] leading-[1.75] text-[#1a1a17]/90">
                    {qa.a}
                  </p>

                  <div className="mt-9 border-t border-[#1a1a17]/20 pt-5">
                    {ANNOTATIONS.map((a) => (
                      <div
                        key={a.k}
                        className="flex items-baseline gap-3 py-1.5"
                      >
                        <span className="h-px w-4 shrink-0 translate-y-[-3px] bg-[#c2410c]" />
                        <span className="c3-mono w-32 shrink-0 text-[9px] uppercase tracking-[0.16em] text-[#8a8578]">
                          {a.k}
                        </span>
                        <span className="c3-mono text-[10px] tracking-[0.04em] text-[#1a1a17]">
                          {a.v(qa.module)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* The cited figure */}
                <figure className="sm:col-span-5">
                  <div className="border border-[#1a1a17]/25 bg-[#fdfcfa]">
                    <div className="aspect-[4/3] overflow-hidden">
                      <AutoVideo
                        key={clip.src}
                        src={clip.src}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <figcaption className="border-t border-[#1a1a17]/25 px-3 py-2">
                      <span className="c3-mono text-[9px] tracking-[0.14em] text-[#c2410c]">
                        FIG. {qIndex}
                      </span>
                      <span className="c3-mono ml-2 text-[9px] uppercase tracking-[0.12em] text-[#1a1a17]">
                        {qa.module}
                      </span>
                    </figcaption>
                  </div>
                  <p className="c3-mono mt-3 text-[9px] uppercase leading-relaxed tracking-[0.14em] text-[#8a8578]">
                    Cited automatically — the answer arrives with the visual
                    already attached.
                  </p>
                </figure>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
