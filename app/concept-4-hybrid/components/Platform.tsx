"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  GripVertical,
  Plus,
  Send,
  ArrowRight,
  MessageSquare,
} from "lucide-react";
import { INTENT_ROWS } from "@/lib/concepts/shared";
import ClipVideo from "./ClipVideo";
import SignalBadge from "./SignalBadge";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type TabId = "education" | "consult" | "intelligence";

const TABS: { id: TabId; label: string }[] = [
  { id: "education", label: "Education flow" },
  { id: "consult", label: "Consult summary" },
  { id: "intelligence", label: "Intelligence" },
];

const PHASE_STYLES: Record<string, string> = {
  Problem: "border-[#b4532a]/40 text-[#b4532a]",
  Treatment: "border-[#5b4fe8]/40 text-[#5b4fe8]",
  Outcome: "border-[#2a7d4f]/40 text-[#2a7d4f]",
};

function MicroLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[9px] uppercase tracking-[0.2em] text-[#a8a396] [font-family:var(--c4-font-mono)]">
      {children}
    </p>
  );
}

/* ── Tab 1 — Education flow ──────────────────────────────────────── */

const MODULES = [
  { src: "/videos/invisalignproblem.mp4", phase: "Problem", label: "Maya's spacing today", dur: "0:38" },
  { src: "/videos/invisaligntray.mp4", phase: "Treatment", label: "How her aligners work", dur: "0:44" },
  { src: "/videos/shared-smile-outcome.mp4", phase: "Outcome", label: "Her projected outcome", dur: "0:42" },
];

function EducationFlow() {
  return (
    <div className="grid md:grid-cols-[250px_1fr_270px]">
      {/* patient rail */}
      <div className="border-b border-[#eceadf] p-5 md:border-b-0 md:border-r">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5b4fe8]/10 text-[13px] font-semibold text-[#5b4fe8] [font-family:var(--c4-font-display)]">
            MR
          </span>
          <div>
            <p className="text-[14px] font-semibold tracking-[-0.01em] text-[#14161a] [font-family:var(--c4-font-display)]">
              Maya Reyes
            </p>
            <p className="text-[10px] tracking-[0.08em] text-[#a8a396] [font-family:var(--c4-font-mono)]">
              PT-4821 · 26F
            </p>
          </div>
        </div>
        <div className="mt-6 space-y-4">
          <div>
            <MicroLabel>Treatment</MicroLabel>
            <p className="mt-1 text-[13px] font-medium text-[#14161a]">
              Invisalign — comprehensive
            </p>
          </div>
          <div>
            <MicroLabel>Provider</MicroLabel>
            <p className="mt-1 text-[13px] text-[#14161a]">Dr. Chen</p>
          </div>
          <div>
            <MicroLabel>Stage</MicroLabel>
            <p className="mt-1 text-[13px] text-[#14161a]">
              post-consult · day 2
            </p>
          </div>
          <div>
            <MicroLabel>Intent signal</MicroLabel>
            <div className="mt-1.5 flex items-center gap-2.5">
              <SignalBadge signal="high" />
              <span className="text-[10px] text-[#6b7280] [font-family:var(--c4-font-mono)]">
                87/100
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* module strip */}
      <div className="border-b border-[#eceadf] p-5 md:border-b-0">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-[13px] font-semibold tracking-[-0.01em] text-[#14161a] [font-family:var(--c4-font-display)]">
            Visual treatment plan
          </p>
          <span className="text-[9px] uppercase tracking-[0.18em] text-[#a8a396] [font-family:var(--c4-font-mono)]">
            3 modules · 2:04 total
          </span>
        </div>
        <div className="space-y-2.5">
          {MODULES.map((m) => (
            <div
              key={m.src}
              className="group flex items-center gap-3 rounded-xl border border-[#eceadf] bg-[#fbfaf6] p-2.5 transition-colors duration-300 hover:border-[#5b4fe8]/30"
            >
              <GripVertical
                size={14}
                className="flex-none text-[#c9c5b9]"
                strokeWidth={1.8}
              />
              <div className="relative w-28 flex-none overflow-hidden rounded-lg md:w-32">
                <ClipVideo
                  src={m.src}
                  className="aspect-video w-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <span
                  className={`inline-block rounded-[3px] border px-1.5 py-px text-[8px] font-medium uppercase tracking-[0.16em] [font-family:var(--c4-font-mono)] ${PHASE_STYLES[m.phase]}`}
                >
                  {m.phase}
                </span>
                <p className="mt-1.5 truncate text-[13px] font-medium tracking-[-0.01em] text-[#14161a] [font-family:var(--c4-font-display)]">
                  {m.label}
                </p>
              </div>
              <span className="flex-none text-[10px] text-[#a8a396] [font-family:var(--c4-font-mono)]">
                {m.dur}
              </span>
              <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[#5b4fe8]">
                <Check size={10} strokeWidth={3} className="text-white" />
              </span>
            </div>
          ))}
          <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#d5d1c4] py-3.5 text-[11px] font-medium tracking-[0.04em] text-[#8a867b] transition-colors duration-300 hover:border-[#5b4fe8]/50 hover:text-[#5b4fe8] [font-family:var(--c4-font-mono)]">
            <Plus size={13} strokeWidth={2.2} />
            Add from library — 40+ modules
          </button>
        </div>
      </div>

      {/* send rail */}
      <div className="bg-[#fafaf6] p-5 md:border-l md:border-[#eceadf]">
        <p className="text-[13px] font-semibold tracking-[-0.01em] text-[#14161a] [font-family:var(--c4-font-display)]">
          Send to patient
        </p>
        <div className="mt-4 space-y-2.5">
          {[
            "Greeting uses her name",
            "Dr. Chen's plan specifics",
            "Financing module attached",
          ].map((t) => (
            <div key={t} className="flex items-center gap-2.5">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#5b4fe8]/10">
                <Check size={9} strokeWidth={3} className="text-[#5b4fe8]" />
              </span>
              <span className="text-[12px] text-[#5c5952]">{t}</span>
            </div>
          ))}
        </div>
        <div className="mt-5 rounded-2xl rounded-bl-md border border-[#e4e1d6] bg-white p-4">
          <p className="text-[12px] leading-relaxed text-[#14161a]">
            Hi Maya — Dr. Chen made a short video walking through your aligner
            plan. Watch when you have 3 minutes:{" "}
            <span className="font-medium text-[#5b4fe8] underline decoration-[#5b4fe8]/30 underline-offset-2">
              opera.ai/v/maya
            </span>
          </p>
        </div>
        <button className="group mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#5b4fe8] py-3 text-[12px] font-semibold tracking-[-0.01em] text-white transition-colors duration-300 hover:bg-[#4a3fd4] [font-family:var(--c4-font-display)]">
          <Send size={13} strokeWidth={2.2} />
          Send via SMS
        </button>
        <p className="mt-3 text-center text-[9px] uppercase tracking-[0.14em] text-[#a8a396] [font-family:var(--c4-font-mono)]">
          delivers 2h post-consult · reminder day 3
        </p>
      </div>
    </div>
  );
}

/* ── Tab 2 — Consult summary ─────────────────────────────────────── */

const LINE_ITEMS = [
  { name: "Invisalign — comprehensive", code: "D8090", fee: "$5,400" },
  { name: "Records + iTero scan", code: "D0350", fee: "$180" },
  { name: "Retention — Vivera", code: "D8680", fee: "$600" },
];

const QUESTION_LOG = [
  { t: "9:42 PM", q: "What happens if I wait 6 months?", flag: true },
  { t: "9:47 PM", q: "Will insurance cover any of this?", flag: false },
  { t: "9:51 PM", q: "How often do I change trays?", flag: false },
];

function ConsultSummary() {
  return (
    <div>
      <div className="flex flex-col justify-between gap-3 border-b border-[#eceadf] p-5 sm:flex-row sm:items-center">
        <div>
          <p className="text-[15px] font-semibold tracking-[-0.01em] text-[#14161a] [font-family:var(--c4-font-display)]">
            Maya Reyes — consult summary
          </p>
          <p className="mt-1 text-[10px] tracking-[0.1em] text-[#a8a396] [font-family:var(--c4-font-mono)]">
            PT-4821 · CONSULT JUL 12 · DR. CHEN · TC: ALYSSA
          </p>
        </div>
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#14161a]/20 px-3 py-1 text-[9px] font-medium uppercase tracking-[0.16em] text-[#14161a] [font-family:var(--c4-font-mono)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#d9a13b]" />
          Presented — pending decision
        </span>
      </div>

      <div className="grid md:grid-cols-[1fr_310px]">
        <div className="border-b border-[#eceadf] p-5 md:border-b-0 md:border-r">
          <MicroLabel>Treatment presented</MicroLabel>
          <div className="mt-3 overflow-hidden rounded-xl border border-[#eceadf]">
            {LINE_ITEMS.map((li, i) => (
              <div
                key={li.code}
                className={`flex items-center justify-between px-4 py-3 ${i > 0 ? "border-t border-[#eceadf]" : ""}`}
              >
                <div className="flex items-baseline gap-3">
                  <span className="text-[10px] text-[#a8a396] [font-family:var(--c4-font-mono)]">
                    {li.code}
                  </span>
                  <span className="text-[13px] font-medium text-[#14161a]">
                    {li.name}
                  </span>
                </div>
                <span className="text-[12px] text-[#14161a] [font-family:var(--c4-font-mono)]">
                  {li.fee}
                </span>
              </div>
            ))}
            <div className="flex items-center justify-between border-t border-[#eceadf] bg-[#faf9f4] px-4 py-3">
              <span className="text-[9px] uppercase tracking-[0.18em] text-[#a8a396] [font-family:var(--c4-font-mono)]">
                Total
              </span>
              <span className="text-[13px] font-semibold text-[#14161a] [font-family:var(--c4-font-mono)]">
                $6,180
              </span>
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between">
              <MicroLabel>Patient video</MicroLabel>
              <span className="text-[9px] uppercase tracking-[0.14em] text-[#5b4fe8] [font-family:var(--c4-font-mono)]">
                Sent Jul 12 · watched 3×
              </span>
            </div>
            <div className="relative overflow-hidden rounded-xl border border-[#eceadf]">
              <ClipVideo
                src="/videos/invisalignseries.mp4"
                className="aspect-[16/7] w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-4 pb-2.5 pt-8">
                <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/25">
                  <div className="h-full w-[92%] rounded-full bg-[#8d83f2]" />
                </div>
                <p className="mt-1.5 text-[9px] tracking-[0.1em] text-white/70 [font-family:var(--c4-font-mono)]">
                  92% completion — replays the timeline segment
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#fafaf6] p-5">
          <div className="flex items-center gap-2">
            <MessageSquare size={13} strokeWidth={2} className="text-[#5b4fe8]" />
            <p className="text-[13px] font-semibold tracking-[-0.01em] text-[#14161a] [font-family:var(--c4-font-display)]">
              Ask Opera — session log
            </p>
          </div>
          <div className="mt-4 space-y-3">
            {QUESTION_LOG.map((e) => (
              <div
                key={e.q}
                className={`rounded-xl border p-3.5 ${
                  e.flag
                    ? "border-[#5b4fe8]/35 bg-[#5b4fe8]/[0.04]"
                    : "border-[#e4e1d6] bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[9px] tracking-[0.12em] text-[#a8a396] [font-family:var(--c4-font-mono)]">
                    {e.t}
                  </span>
                  {e.flag && (
                    <span className="text-[8px] font-medium uppercase tracking-[0.16em] text-[#5b4fe8] [font-family:var(--c4-font-mono)]">
                      surfaced to TC
                    </span>
                  )}
                </div>
                <p className="mt-1.5 text-[12px] italic leading-snug text-[#14161a] [font-family:var(--c4-font-serif)]">
                  &ldquo;{e.q}&rdquo;
                </p>
                <p className="mt-1.5 text-[9px] uppercase tracking-[0.14em] text-[#8a867b] [font-family:var(--c4-font-mono)]">
                  answered · grounded in plan
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-[#ddd8f8] bg-[#f3f1fd] p-4">
            <MicroLabel>Suggested next step</MicroLabel>
            <p className="mt-2 text-[12px] leading-relaxed text-[#14161a]">
              Maya replayed the timeline module twice and asked about waiting.
              Likely barrier: <span className="font-semibold">financing</span>.
              Send the payment-options module.
            </p>
            <button className="group mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#5b4fe8] [font-family:var(--c4-font-display)]">
              Send module
              <ArrowRight
                size={12}
                strokeWidth={2.4}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Tab 3 — Intelligence ────────────────────────────────────────── */

const STATS = [
  { label: "Case acceptance", value: "71%", delta: "+9 pts since Opera" },
  { label: "Median time-to-yes", value: "4.2d", delta: "−2.1 days" },
  { label: "Module engagement", value: "3.4×", delta: "vs PDF handouts" },
];

const SPARK = "0,70 25,66 50,68 75,58 100,60 125,50 150,54 175,42 200,46 225,34 250,30 275,24 300,20";

const BARRIERS = [
  { label: "Cost / financing", v: 34 },
  { label: "Fear of procedure", v: 22 },
  { label: "Urgency unclear", v: 19 },
  { label: "Second opinion", v: 14 },
  { label: "Scheduling", v: 11 },
];

function IntelligenceView() {
  const queue = [INTENT_ROWS[0], INTENT_ROWS[4], INTENT_ROWS[7]];
  return (
    <div className="p-5">
      <div className="grid gap-3 sm:grid-cols-3">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-[#eceadf] bg-[#fbfaf6] p-4"
          >
            <MicroLabel>{s.label}</MicroLabel>
            <p className="mt-2 text-[28px] font-semibold leading-none tracking-[-0.02em] text-[#14161a] [font-family:var(--c4-font-display)]">
              {s.value}
            </p>
            <p className="mt-2 text-[9px] uppercase tracking-[0.14em] text-[#5b4fe8] [font-family:var(--c4-font-mono)]">
              {s.delta}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-[1.4fr_1fr]">
        <div className="rounded-xl border border-[#eceadf] p-4">
          <div className="flex items-center justify-between">
            <MicroLabel>Case acceptance — last 12 weeks</MicroLabel>
            <span className="text-[10px] font-medium text-[#5b4fe8] [font-family:var(--c4-font-mono)]">
              71%
            </span>
          </div>
          <svg viewBox="0 0 300 96" className="mt-3 w-full" preserveAspectRatio="none">
            {[24, 48, 72].map((y) => (
              <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="#eceadf" strokeWidth="1" />
            ))}
            <polygon points={`0,96 ${SPARK} 300,96`} fill="#5b4fe8" opacity="0.07" />
            <polyline
              points={SPARK}
              fill="none"
              stroke="#5b4fe8"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <circle cx="300" cy="20" r="3" fill="#5b4fe8" />
          </svg>
          <div className="mt-2 flex justify-between text-[8px] uppercase tracking-[0.16em] text-[#c0bbae] [font-family:var(--c4-font-mono)]">
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
          </div>
        </div>

        <div className="rounded-xl border border-[#eceadf] p-4">
          <MicroLabel>Where patients hesitate</MicroLabel>
          <div className="mt-4 space-y-3.5">
            {BARRIERS.map((b) => (
              <div key={b.label}>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-[11px] text-[#5c5952]">{b.label}</span>
                  <span className="text-[10px] text-[#6b7280] [font-family:var(--c4-font-mono)]">
                    {b.v}%
                  </span>
                </div>
                <div className="h-[4px] w-full overflow-hidden rounded-full bg-[#ece9de]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(b.v / 34) * 100}%` }}
                    transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
                    className="h-full rounded-full bg-[#5b4fe8]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-[#eceadf]">
        <div className="flex items-center justify-between border-b border-[#eceadf] bg-[#fbfaf6] px-4 py-2.5">
          <MicroLabel>Live intent queue</MicroLabel>
          <span className="text-[9px] uppercase tracking-[0.14em] text-[#a8a396] [font-family:var(--c4-font-mono)]">
            today
          </span>
        </div>
        {queue.map((row, i) => (
          <div
            key={row.patient_id}
            className={`flex items-center gap-4 px-4 py-3 ${i > 0 ? "border-t border-[#eceadf]" : ""}`}
          >
            <span className="w-16 flex-none text-[10px] tracking-[0.06em] text-[#5b4fe8] [font-family:var(--c4-font-mono)]">
              {row.patient_id}
            </span>
            <span className="min-w-0 flex-1 truncate text-[12px] italic text-[#5c5952] [font-family:var(--c4-font-serif)]">
              {row.primary_question === "(no questions asked)"
                ? "no questions asked — disengaged"
                : `“${row.primary_question}”`}
            </span>
            <SignalBadge signal={row.intent_signal} />
            <button className="hidden flex-none text-[10px] font-medium text-[#5b4fe8] underline-offset-2 hover:underline sm:block [font-family:var(--c4-font-mono)]">
              open →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── The frame ───────────────────────────────────────────────────── */

export default function Platform() {
  const [tab, setTab] = useState<TabId>("education");

  return (
    <section
      id="c4-platform"
      className="mx-auto max-w-[1480px] scroll-mt-16 px-6 pt-32 md:px-12 md:pt-44"
    >
      <div className="mb-6 flex items-center gap-4">
        <span className="text-[10px] font-medium uppercase tracking-[0.26em] text-[#5b4fe8] [font-family:var(--c4-font-mono)]">
          04 / The platform
        </span>
        <span className="h-px flex-1 bg-[#e4e1d6]" />
      </div>
      <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <h2 className="max-w-[620px] text-[clamp(1.9rem,3.4vw,2.9rem)] font-medium leading-[1.08] tracking-[-0.03em] text-[#14161a] [font-family:var(--c4-font-display)]">
          Show the treatment.{" "}
          <em className="italic text-[#5b4fe8] [font-family:var(--c4-font-serif)]">
            Win
          </em>{" "}
          the case.
        </h2>
        <p className="max-w-[320px] text-[13px] font-light leading-relaxed text-[#5c5952]">
          One workspace between the consult and the yes: build the visual
          plan, send it, and watch intent form in real time.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: EASE }}
        className="overflow-hidden rounded-2xl border border-[#e4e1d6] bg-white shadow-[0_48px_120px_-48px_rgba(20,22,26,0.35)]"
      >
        {/* chrome */}
        <div className="flex h-14 items-center justify-between border-b border-[#eceadf] px-5">
          <div className="flex items-center gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-[7px] bg-[#5b4fe8] text-[13px] font-semibold text-white [font-family:var(--c4-font-display)]">
              O
            </span>
            <span className="text-[14px] font-semibold tracking-[-0.01em] text-[#14161a] [font-family:var(--c4-font-display)]">
              Opera
            </span>
            <span className="text-[#d5d1c4]">/</span>
            <span className="text-[12px] text-[#8a867b]">
              Lakeview Orthodontics
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-[9px] uppercase tracking-[0.18em] text-[#a8a396] sm:block [font-family:var(--c4-font-mono)]">
              Tue · Jul 14 · 9:42 AM
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#14161a] text-[10px] font-medium text-white [font-family:var(--c4-font-display)]">
              DC
            </span>
          </div>
        </div>

        {/* tabs */}
        <div className="flex gap-7 border-b border-[#eceadf] px-5">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`relative py-3.5 text-[13px] font-medium tracking-[-0.01em] transition-colors duration-300 [font-family:var(--c4-font-display)] ${
                tab === t.id ? "text-[#14161a]" : "text-[#a8a396] hover:text-[#5c5952]"
              }`}
            >
              {t.label}
              {tab === t.id && (
                <motion.span
                  layoutId="c4-tab-underline"
                  className="absolute inset-x-0 -bottom-px h-[2px] rounded-full bg-[#5b4fe8]"
                  transition={{ duration: 0.4, ease: EASE }}
                />
              )}
            </button>
          ))}
        </div>

        {/* content */}
        <div className="md:min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              {tab === "education" && <EducationFlow />}
              {tab === "consult" && <ConsultSummary />}
              {tab === "intelligence" && <IntelligenceView />}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      <p className="mt-6 text-center text-[9px] uppercase tracking-[0.22em] text-[#a8a396] [font-family:var(--c4-font-mono)]">
        Live product direction — patient data shown is synthetic
      </p>
    </section>
  );
}
