"use client";

import { motion } from "framer-motion";
import { CLIPS, type Clip } from "@/lib/concepts/shared";
import { AutoVideo } from "./media";
import SectionHead from "./SectionHead";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const trayClip: Clip = CLIPS.find((c) => c.src === "/videos/invisaligntray.mp4")!;

const NAV_ITEMS = [
  { label: "Consults", active: true },
  { label: "Module library", active: false },
  { label: "Ask Opera", active: false },
  { label: "Intent signals", active: false },
  { label: "Reports", active: false },
];

const PLAN_STEPS = [
  { n: "01", step: "Records + iTero scan", status: "complete" },
  { n: "02", step: "Aligner series — 22 trays", status: "in plan" },
  { n: "03", step: "Attachments, visit 2", status: "in plan" },
  { n: "04", step: "Fixed retention", status: "in plan" },
];

const TIMELINE = [
  { t: "Tue 6:41 pm", e: "Plan + visuals sent" },
  { t: "Tue 8:14 pm", e: "Module watched 2×" },
  { t: "Wed 9:03 am", e: "Asked: “what if I wait?”" },
  { t: "Wed 9:03 am", e: "Answered — progression module cited" },
  { t: "Wed 7:52 pm", e: "Shared with spouse" },
  { t: "Thu 10:20 am", e: "Booked records visit" },
];

const INBOX = [
  {
    q: "What happens if I wait 6 months?",
    meta: "Answered by Opera · grounded in plan · cited crowding-progression",
  },
  {
    q: "Is the scan appointment long?",
    meta: "Answered by Opera · scheduling handed to front desk",
  },
];

export default function PlatformPlate() {
  return (
    <section id="platform" className="scroll-mt-14">
      <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-36">
        <SectionHead
          index="04"
          label="The platform"
          note="Product study — consult record view"
          title={
            <>
              The instrument.
            </>
          }
        />
        <p className="c3-body mt-10 max-w-xl text-[15px] leading-relaxed text-[#1a1a17]/80">
          One console for the practice: every consult becomes a visual plan,
          every patient question becomes an answered — and recorded — signal.
          What follows is the actual working surface, not an illustration.
        </p>

        {/* The console, printed like a catalogued device */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: EASE }}
          className="mt-14"
        >
          <div className="overflow-x-auto">
            <div className="min-w-[900px] border border-[#1a1a17]/35 bg-[#fbfaf7] shadow-[10px_12px_0_rgba(26,26,23,0.05)]">
              {/* Chrome */}
              <div className="flex items-center justify-between border-b border-[#1a1a17]/25 px-4 py-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="h-[7px] w-[7px] border border-[#1a1a17]/40" />
                  <span className="h-[7px] w-[7px] border border-[#1a1a17]/40" />
                  <span className="h-[7px] w-[7px] bg-[#c2410c]" />
                </div>
                <span className="c3-mono text-[10px] uppercase tracking-[0.24em] text-[#1a1a17]">
                  Opera console — consult record
                </span>
                <span className="c3-mono text-[10px] tracking-[0.16em] text-[#8a8578]">
                  v2.4
                </span>
              </div>

              <div className="grid grid-cols-[172px_1fr_240px]">
                {/* Sidebar */}
                <aside className="flex flex-col justify-between border-r border-[#1a1a17]/20 p-5">
                  <div>
                    <span className="c3-display text-[19px]">
                      Opera<span className="text-[#c2410c]">.</span>
                    </span>
                    <nav className="mt-8 space-y-3.5">
                      {NAV_ITEMS.map((n) => (
                        <div key={n.label} className="flex items-center gap-2.5">
                          <span
                            className={`h-px w-3 ${
                              n.active ? "bg-[#c2410c]" : "bg-transparent"
                            }`}
                          />
                          <span
                            className={`c3-mono text-[10px] uppercase tracking-[0.16em] ${
                              n.active ? "text-[#1a1a17]" : "text-[#8a8578]"
                            }`}
                          >
                            {n.label}
                          </span>
                        </div>
                      ))}
                    </nav>
                  </div>
                  <div className="c3-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-[#8a8578]">
                    Willow Creek
                    <br />
                    Orthodontics
                  </div>
                </aside>

                {/* Consult summary */}
                <main className="border-r border-[#1a1a17]/20 p-6">
                  <div className="flex items-baseline justify-between">
                    <h3 className="c3-display text-[30px] font-light tracking-[-0.01em]">
                      Margaret Ellison
                    </h3>
                    <span className="c3-mono text-[10px] uppercase tracking-[0.14em] text-[#c2410c]">
                      Intent — high ●
                    </span>
                  </div>
                  <p className="c3-mono mt-1.5 text-[10px] uppercase tracking-[0.16em] text-[#8a8578]">
                    PT-4821 · Invisalign, comprehensive · Dr. Chen · consult 03/12
                  </p>

                  <div className="mt-6 grid grid-cols-[1fr_220px] gap-6">
                    <div>
                      <p className="c3-mono border-b border-[#1a1a17]/25 pb-2 text-[9px] uppercase tracking-[0.2em] text-[#8a8578]">
                        Treatment plan
                      </p>
                      {PLAN_STEPS.map((s) => (
                        <div
                          key={s.n}
                          className="flex items-baseline gap-4 border-b border-[#1a1a17]/10 py-2.5"
                        >
                          <span className="c3-mono text-[10px] text-[#c2410c]">
                            {s.n}
                          </span>
                          <span className="c3-body flex-1 text-[13px] text-[#1a1a17]">
                            {s.step}
                          </span>
                          <span className="c3-mono text-[9px] uppercase tracking-[0.12em] text-[#8a8578]">
                            {s.status}
                          </span>
                        </div>
                      ))}

                      {/* Ask Opera inbox as correspondence */}
                      <p className="c3-mono mt-7 border-b border-[#1a1a17]/25 pb-2 text-[9px] uppercase tracking-[0.2em] text-[#8a8578]">
                        Correspondence — Ask Opera
                      </p>
                      {INBOX.map((m) => (
                        <div
                          key={m.q}
                          className="border-b border-[#1a1a17]/10 py-3"
                        >
                          <div className="flex items-baseline justify-between gap-4">
                            <span className="c3-display text-[14px] italic leading-snug">
                              “{m.q}”
                            </span>
                            <span className="c3-mono shrink-0 border border-[#c2410c]/70 px-1.5 py-0.5 text-[8px] uppercase tracking-[0.18em] text-[#c2410c]">
                              Answered
                            </span>
                          </div>
                          <p className="c3-mono mt-1.5 text-[9px] uppercase tracking-[0.1em] text-[#8a8578]">
                            {m.meta}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Embedded module plate */}
                    <figure>
                      <div className="border border-[#1a1a17]/25">
                        <div className="aspect-[4/3] overflow-hidden">
                          <AutoVideo
                            src={trayClip.src}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <figcaption className="border-t border-[#1a1a17]/25 px-2.5 py-1.5">
                          <span className="c3-mono text-[8px] uppercase tracking-[0.12em] text-[#1a1a17]">
                            Module — aligner tray seat
                          </span>
                        </figcaption>
                      </div>
                      <p className="c3-mono mt-2 text-[8px] uppercase leading-relaxed tracking-[0.12em] text-[#8a8578]">
                        Sent 03/12, 6:41 pm
                        <br />
                        Watched 2× · shared 1×
                      </p>
                    </figure>
                  </div>
                </main>

                {/* Engagement marginalia */}
                <aside className="p-5">
                  <p className="c3-mono border-b border-[#1a1a17]/25 pb-2 text-[9px] uppercase tracking-[0.2em] text-[#8a8578]">
                    Engagement record
                  </p>
                  <div className="mt-4 space-y-4">
                    {TIMELINE.map((t, i) => (
                      <div key={i} className="flex gap-3">
                        <span className="mt-[5px] h-[5px] w-[5px] shrink-0 rounded-full bg-[#c2410c]" />
                        <div>
                          <p className="c3-mono text-[9px] uppercase tracking-[0.12em] text-[#8a8578]">
                            {t.t}
                          </p>
                          <p className="c3-body mt-0.5 text-[11.5px] leading-snug text-[#1a1a17]">
                            {t.e}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 border-t border-[#1a1a17]/25 pt-4">
                    <p className="c3-mono text-[9px] uppercase tracking-[0.16em] text-[#8a8578]">
                      Engagement score
                    </p>
                    <div className="mt-2 flex items-baseline gap-3">
                      <span className="c3-display text-[28px] leading-none">87</span>
                      <span className="h-px flex-1 self-center bg-[#1a1a17]/15">
                        <span className="block h-px w-[87%] bg-[#c2410c]" />
                      </span>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>

          <p className="c3-mono mt-5 text-center text-[10px] uppercase tracking-[0.24em] text-[#8a8578]">
            Plate VII — The Opera console, 2026
          </p>
        </motion.div>
      </div>
    </section>
  );
}
