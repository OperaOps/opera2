"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ASK_OPERA_QA } from "@/lib/concepts/shared";
import ClipVideo from "./ClipVideo";
import SectionHead from "./SectionHead";

const EASE = [0.22, 1, 0.36, 1];

/** map each answer's visual module to a real clip in CLIPS */
const MODULE_CLIPS: Record<string, { src: string; label: string; phase: string }> = {
  "crowding-progression": { src: "/videos/bracesproblem.mp4", label: "Crowding progression", phase: "PROBLEM" },
  "what-to-expect": { src: "/videos/implant-step1-placement.mp4", label: "What to expect — placement", phase: "TREATMENT" },
  "fracture-progression": { src: "/videos/crownproblem.mp4", label: "Fracture progression", phase: "PROBLEM" },
  "recovery-timeline": { src: "/videos/rootcanal-treatment.mp4", label: "Recovery timeline", phase: "TIMELINE" },
  "options-comparison": { src: "/videos/bridgeunit.mp4", label: "Options — three-unit bridge", phase: "DEVICE" },
};

export default function AskOperaConsole() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [typed, setTyped] = useState("");

  const qa = ASK_OPERA_QA[active];
  const clip = MODULE_CLIPS[qa.module] ?? MODULE_CLIPS["crowding-progression"];

  // typewriter
  useEffect(() => {
    setTyped("");
    let i = 0;
    const id = setInterval(() => {
      i += 2;
      setTyped(qa.a.slice(0, i));
      if (i >= qa.a.length) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [active, qa.a]);

  // auto-cycle until the visitor takes over
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % ASK_OPERA_QA.length);
    }, 8000);
    return () => clearInterval(id);
  }, [paused]);

  const done = typed.length >= qa.a.length;

  return (
    <section className="relative bg-[#050607] py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <SectionHead
          index="03"
          label="Ask Opera"
          title="Every patient leaves with questions."
          dim="Opera answers them — visually."
          sub="Not a chatbot. An answer engine grounded in the patient's own treatment plan, their doctor's notes, and the visuals from their consult."
        />

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: EASE }}
          className="relative overflow-hidden border border-white/10 bg-[#07090b]"
        >
          {/* cyan status hairline */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#22d3ee]/70 to-transparent" />
          <div className="c1-scan" />

          {/* console header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-3.5 md:px-8">
            <span className="[font-family:var(--c1-mono)] text-[10px] tracking-[0.28em] text-white/60">
              ASK OPERA · GROUNDED IN THE PATIENT&apos;S OWN PLAN
            </span>
            <span className="flex items-center gap-2 [font-family:var(--c1-mono)] text-[9px] tracking-[0.25em] text-white/35">
              PT-4821 · PLAN v2
              <span className="c1-pulse ml-1 h-1 w-1 rounded-full bg-[#22d3ee]" />
              <span className="text-[#67e8f9]/80">LIVE</span>
            </span>
          </div>

          <div className="grid lg:grid-cols-[1.05fr_1.55fr]">
            {/* cue list */}
            <div className="border-b border-white/10 lg:border-b-0 lg:border-r">
              <div className="px-5 pb-2 pt-5 [font-family:var(--c1-mono)] text-[9px] tracking-[0.3em] text-white/30 md:px-8">
                PATIENT QUESTIONS — CUE LIST
              </div>
              {ASK_OPERA_QA.map((item, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={item.q}
                    type="button"
                    onClick={() => {
                      setActive(i);
                      setPaused(true);
                    }}
                    className={`group relative flex w-full items-baseline gap-4 px-5 py-4 text-left transition-colors duration-300 md:px-8 ${
                      isActive ? "bg-white/[0.045]" : "hover:bg-white/[0.025]"
                    }`}
                  >
                    <span
                      className={`absolute bottom-0 left-0 top-0 w-[2px] transition-colors duration-300 ${
                        isActive ? "bg-[#22d3ee]" : "bg-transparent"
                      }`}
                    />
                    <span
                      className={`[font-family:var(--c1-mono)] text-[10px] tracking-[0.2em] ${
                        isActive ? "text-[#67e8f9]" : "text-white/30"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1">
                      <span
                        className={`block text-[15px] font-light leading-snug transition-colors duration-300 ${
                          isActive ? "text-[#f2f0eb]" : "text-white/45 group-hover:text-white/70"
                        }`}
                      >
                        &ldquo;{item.q}&rdquo;
                      </span>
                      <span className="mt-1.5 block [font-family:var(--c1-mono)] text-[8.5px] tracking-[0.2em] text-white/25">
                        MODULE · {item.module.toUpperCase()}
                      </span>
                    </span>
                  </button>
                );
              })}
              <div className="px-5 pb-5 pt-3 [font-family:var(--c1-mono)] text-[8.5px] tracking-[0.25em] text-white/20 md:px-8">
                {paused ? "MANUAL CONTROL" : "AUTO-CYCLING · SELECT TO TAKE OVER"}
              </div>
            </div>

            {/* response */}
            <div className="flex flex-col px-5 py-6 md:px-8 md:py-8">
              <span className="[font-family:var(--c1-mono)] text-[9px] tracking-[0.3em] text-white/30">
                RESPONSE · CITES PLAN + CONSULT VISUALS
              </span>

              <div className="mt-5 min-h-[10.5rem] md:min-h-[9rem]">
                <p className="max-w-2xl text-[17px] font-light leading-relaxed text-[#e9e7e0] md:text-[19px]">
                  {typed}
                  <span
                    className={`c1-caret ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[0.18em] bg-[#22d3ee] ${
                      done ? "opacity-40" : ""
                    }`}
                  />
                </p>
              </div>

              <div className="mt-auto border-t border-white/10 pt-6">
                <span className="[font-family:var(--c1-mono)] text-[9px] tracking-[0.3em] text-white/30">
                  LINKED VISUAL MODULE
                </span>
                <div className="mt-4 flex items-center gap-5">
                  <div className="relative h-24 w-40 flex-none overflow-hidden border border-white/12">
                    <ClipVideo
                      key={clip.src}
                      src={clip.src}
                      className="h-full w-full object-cover brightness-[0.92]"
                    />
                    <span className="absolute right-1.5 top-1.5 [font-family:var(--c1-mono)] text-[7.5px] tracking-[0.2em] text-[#67e8f9]/80">
                      {clip.phase}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="[font-family:var(--c1-mono)] text-[11px] tracking-[0.12em] text-[#a5f3fc]">
                      {qa.module}
                    </span>
                    <span className="text-[13px] font-light text-white/55">
                      {clip.label}
                    </span>
                    <span className="[font-family:var(--c1-mono)] text-[8.5px] tracking-[0.22em] text-white/25">
                      ATTACHED FROM THE PATIENT&apos;S PLAN
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
