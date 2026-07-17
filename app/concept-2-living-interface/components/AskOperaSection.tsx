"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  LayoutGroup,
  useInView,
} from "framer-motion";
import { ArrowUp, Film, Sparkles } from "lucide-react";
import { ASK_OPERA_QA, CLIPS, type Clip } from "@/lib/concepts/shared";
import ClipVideo from "./ClipVideo";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** which real clip stands in for each cited visual module */
const MODULE_CLIP: Record<string, string> = {
  "crowding-progression": "/videos/bracesproblem.mp4",
  "what-to-expect": "/videos/implant-step1-placement.mp4",
  "fracture-progression": "/videos/crownproblem.mp4",
  "recovery-timeline": "/videos/implant-step2-abutment.mp4",
  "options-comparison": "/videos/bridgeunit.mp4",
};

const clipFor = (module: string): Clip =>
  CLIPS.find((c) => c.src === MODULE_CLIP[module]) ?? CLIPS[0];

/** hand-placed offsets so the chip cloud feels floated, not stacked */
const CHIP_DRIFT = [
  { mt: "mt-0", float: "c2-float-a", delay: "0s" },
  { mt: "mt-6", float: "c2-float-b", delay: "0.8s" },
  { mt: "mt-2", float: "c2-float-a", delay: "1.6s" },
  { mt: "mt-8", float: "c2-float-b", delay: "0.4s" },
  { mt: "mt-3", float: "c2-float-a", delay: "2.2s" },
];

type Phase = "thinking" | "typing" | "done";

export default function AskOperaSection() {
  const [active, setActive] = useState(0);
  const [phase, setPhase] = useState<Phase>("thinking");
  const [typed, setTyped] = useState("");
  const [auto, setAuto] = useState(true);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(sectionRef, { amount: 0.35 });

  const qa = ASK_OPERA_QA[active];

  // thinking → typing
  useEffect(() => {
    setPhase("thinking");
    setTyped("");
    const t = setTimeout(() => setPhase("typing"), 950);
    return () => clearTimeout(t);
  }, [active]);

  // typewriter
  useEffect(() => {
    if (phase !== "typing") return;
    const full = qa.a;
    let i = 0;
    const id = setInterval(() => {
      i += 2;
      setTyped(full.slice(0, i));
      if (i >= full.length) {
        clearInterval(id);
        setPhase("done");
      }
    }, 18);
    return () => clearInterval(id);
  }, [phase, qa.a]);

  // idle autoplay through questions until the visitor takes over
  useEffect(() => {
    if (!auto || !inView || phase !== "done") return;
    const t = setTimeout(
      () => setActive((a) => (a + 1) % ASK_OPERA_QA.length),
      4200
    );
    return () => clearTimeout(t);
  }, [auto, inView, phase]);

  const ask = (i: number) => {
    if (i === active) return;
    setAuto(false);
    setActive(i);
  };

  return (
    <section
      id="ask"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f1f4f6]/70 py-28 lg:py-36"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#101418]/40 [font-family:var(--c2-font-mono)]">
              02 — ask opera
            </p>
            <h2 className="mt-4 max-w-[640px] text-[38px] font-medium leading-[1.05] tracking-[-0.02em] text-[#101418] sm:text-[52px] [font-family:var(--c2-font-display)]">
              Every patient leaves
              <br />
              with questions.
            </h2>
          </div>
          <p className="max-w-[340px] pb-2 text-[15px] leading-relaxed text-[#101418]/55">
            Opera answers them at 9 PM on the couch — grounded in that
            patient&rsquo;s own plan, citing the visual that proves it.
          </p>
        </div>

        <LayoutGroup>
          {/* floating question cloud */}
          <div className="mt-16 flex flex-wrap items-start justify-center gap-x-4 gap-y-3 px-2">
            {ASK_OPERA_QA.map((item, i) => {
              if (i === active) return null;
              const drift = CHIP_DRIFT[i];
              return (
                <span
                  key={item.q}
                  className={`${drift.mt} ${drift.float} inline-block`}
                  style={{ animationDelay: drift.delay }}
                >
                  <motion.button
                    layoutId={`c2-chip-${i}`}
                    layout
                    onClick={() => ask(i)}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    className="rounded-full border border-[#101418]/[0.08] bg-white px-5 py-2.5 text-[13.5px] font-medium text-[#101418]/70 shadow-[0_10px_30px_-14px_rgba(16,20,24,0.25)] transition-colors hover:border-[#4f46e5]/30 hover:text-[#101418]"
                  >
                    <span className="mr-2 text-[10px] text-[#4f46e5] [font-family:var(--c2-font-mono)]">
                      0{i + 1}
                    </span>
                    {item.q}
                  </motion.button>
                </span>
              );
            })}
          </div>

          {/* answer surface */}
          <div className="relative mx-auto mt-10 max-w-[980px] rounded-[28px]">
            {phase === "thinking" && (
              <div className="c2-ring rounded-[28px]" aria-hidden />
            )}
            <div className="relative m-[1.5px] rounded-[26.5px] border border-[#101418]/[0.05] bg-white shadow-[0_50px_120px_-50px_rgba(16,20,24,0.28)]">
              <div className="grid gap-0 lg:grid-cols-[1.45fr_1fr]">
                {/* left — the exchange */}
                <div className="flex flex-col p-8 sm:p-10">
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-[#4f46e5] [font-family:var(--c2-font-mono)]">
                      <Sparkles size={11} />
                      grounded in maya&rsquo;s plan
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.18em] text-[#101418]/35 [font-family:var(--c2-font-mono)]">
                      {phase === "thinking" ? "reading consult…" : "answered"}
                    </span>
                  </div>

                  <motion.div
                    layoutId={`c2-chip-${active}`}
                    layout
                    transition={{ type: "spring", stiffness: 350, damping: 32 }}
                    className="mt-6 self-start rounded-2xl rounded-bl-md bg-[#101418] px-5 py-3 text-[15px] font-medium text-white"
                  >
                    <span className="mr-2 text-[10px] text-[#a5b4fc] [font-family:var(--c2-font-mono)]">
                      0{active + 1}
                    </span>
                    {qa.q}
                  </motion.div>

                  <div className="mt-6 min-h-[150px] text-[15.5px] font-light leading-[1.75] text-[#101418]/80">
                    {phase === "thinking" ? (
                      <div className="space-y-2.5 pt-1">
                        {[88, 96, 64].map((w) => (
                          <div
                            key={w}
                            className="h-3 animate-pulse rounded-full bg-[#4f46e5]/[0.07]"
                            style={{ width: `${w}%` }}
                          />
                        ))}
                      </div>
                    ) : (
                      <p>
                        {typed}
                        {phase === "typing" && <span className="c2-caret" />}
                      </p>
                    )}
                  </div>

                  {/* instrument footer, not a chat box */}
                  <div className="mt-auto flex items-center gap-3 border-t border-[#101418]/[0.06] pt-5">
                    <span className="flex-1 text-[13px] text-[#101418]/35">
                      Ask anything about your treatment…
                    </span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4f46e5]/10 text-[#4f46e5]">
                      <ArrowUp size={14} />
                    </span>
                  </div>
                </div>

                {/* right — cited visual module */}
                <div className="relative border-t border-[#101418]/[0.06] bg-[#fafaf8] p-6 lg:border-l lg:border-t-0">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#101418]/40 [font-family:var(--c2-font-mono)]">
                    cited visual
                  </p>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={qa.module + String(phase === "thinking")}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="mt-4"
                    >
                      {phase === "thinking" ? (
                        <div className="flex aspect-video items-center justify-center rounded-xl border border-dashed border-[#101418]/15 bg-white">
                          <Film size={18} className="text-[#101418]/25" />
                        </div>
                      ) : (
                        <>
                          <ClipVideo
                            clip={clipFor(qa.module)}
                            showLabel
                            className="aspect-video rounded-xl shadow-[0_20px_50px_-24px_rgba(16,20,24,0.3)]"
                          />
                          <div className="mt-3.5 inline-flex items-center gap-2 rounded-full border border-[#4f46e5]/20 bg-[#4f46e5]/[0.06] px-3 py-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#4f46e5]" />
                            <span className="text-[10.5px] tracking-wide text-[#4f46e5] [font-family:var(--c2-font-mono)]">
                              grounded in: {qa.module} module
                            </span>
                          </div>
                        </>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </LayoutGroup>

        <p className="mt-8 text-center text-[11px] uppercase tracking-[0.2em] text-[#101418]/35 [font-family:var(--c2-font-mono)]">
          every answer reviewed against the doctor&rsquo;s consult notes — never generic
        </p>
      </div>
    </section>
  );
}
