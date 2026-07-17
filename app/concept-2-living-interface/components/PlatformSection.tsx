"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Bell,
  Check,
  Film,
  LayoutGrid,
  MessageCircle,
  Mic,
  Plus,
  Search,
  Send,
  Settings,
  Sparkles,
  Users,
} from "lucide-react";
import { CLIPS, INTENT_ROWS, type Clip } from "@/lib/concepts/shared";
import ClipVideo from "./ClipVideo";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type Tab = "analytics" | "flow" | "inbox";

const TABS: { key: Tab; label: string }[] = [
  { key: "analytics", label: "Engagement analytics" },
  { key: "flow", label: "Education flow" },
  { key: "inbox", label: "Ask Opera inbox" },
];

const clip = (src: string): Clip => CLIPS.find((c) => c.src === src) ?? CLIPS[0];

/* ------------------------------ atoms ------------------------------ */

function Spark({ points, color }: { points: number[]; color: string }) {
  const w = 116;
  const h = 34;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const coords = points.map((p, i) => [
    (i / (points.length - 1)) * w,
    h - 4 - ((p - min) / range) * (h - 10),
  ]);
  const line = coords.map(([x, y]) => `${x},${y}`).join(" ");
  const area = `0,${h} ${line} ${w},${h}`;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <polygon points={area} fill={color} opacity={0.08} />
      <polyline
        points={line}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={coords[coords.length - 1][0]}
        cy={coords[coords.length - 1][1]}
        r={2.5}
        fill={color}
      />
    </svg>
  );
}

function StatCard({
  label,
  value,
  unit,
  delta,
  good,
  points,
}: {
  label: string;
  value: string;
  unit?: string;
  delta: string;
  good: boolean;
  points: number[];
}) {
  return (
    <div className="rounded-xl border border-[#101418]/[0.06] bg-white p-4">
      <p className="text-[9.5px] uppercase tracking-[0.16em] text-[#101418]/40 [font-family:var(--c2-font-mono)]">
        {label}
      </p>
      <div className="mt-2 flex items-end justify-between gap-2">
        <p className="text-[26px] font-medium leading-none tracking-tight text-[#101418] [font-family:var(--c2-font-display)]">
          {value}
          {unit && <span className="text-[14px] text-[#101418]/40">{unit}</span>}
        </p>
        <Spark points={points} color={good ? "#4f46e5" : "#f59e0b"} />
      </div>
      <p
        className={`mt-2 text-[11px] font-medium ${
          good ? "text-[#10b981]" : "text-[#f59e0b]"
        }`}
      >
        {delta}
      </p>
    </div>
  );
}

const SIG_COLOR: Record<string, string> = {
  high: "#10b981",
  building: "#6366f1",
  stalled: "#f59e0b",
  "at-risk": "#ef4444",
};

/* ------------------------------ views ------------------------------ */

function AnalyticsView() {
  const bars = [
    { label: "Invisalign", v: 92 },
    { label: "Implants", v: 84 },
    { label: "Perio", v: 78 },
    { label: "Crowns", v: 61 },
    { label: "Whitening", v: 55 },
  ];
  return (
    <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard
            label="case acceptance"
            value="68"
            unit="%"
            delta="+6.2 pts this quarter"
            good
            points={[48, 52, 50, 56, 58, 61, 64, 68]}
          />
          <StatCard
            label="avg watch rate"
            value="3.2"
            unit="× / plan"
            delta="+0.8 vs. last quarter"
            good
            points={[1.8, 2.1, 2.0, 2.4, 2.6, 2.9, 3.0, 3.2]}
          />
          <StatCard
            label="time to yes"
            value="4.2"
            unit=" days"
            delta="−1.8 days with visuals"
            good
            points={[8.4, 7.9, 7.1, 6.6, 5.8, 5.1, 4.6, 4.2]}
          />
        </div>
        <div className="rounded-xl border border-[#101418]/[0.06] bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-[9.5px] uppercase tracking-[0.16em] text-[#101418]/40 [font-family:var(--c2-font-mono)]">
              module engagement by treatment
            </p>
            <span className="text-[10px] text-[#101418]/35 [font-family:var(--c2-font-mono)]">
              last 30 days
            </span>
          </div>
          <div className="mt-4 space-y-3">
            {bars.map((b, i) => (
              <div key={b.label} className="flex items-center gap-3">
                <span className="w-20 shrink-0 text-[12px] text-[#101418]/60">
                  {b.label}
                </span>
                <div className="h-[18px] flex-1 overflow-hidden rounded-md bg-[#101418]/[0.04]">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${b.v}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: i * 0.08, ease: EASE }}
                    className="flex h-full items-center justify-end rounded-md bg-gradient-to-r from-[#4f46e5] to-[#6366f1] pr-2"
                  >
                    <span className="text-[9px] font-medium text-white [font-family:var(--c2-font-mono)]">
                      {b.v}
                    </span>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-[#101418]/[0.06] bg-white p-5">
        <div className="flex items-center justify-between">
          <p className="text-[9.5px] uppercase tracking-[0.16em] text-[#101418]/40 [font-family:var(--c2-font-mono)]">
            needs attention
          </p>
          <span className="rounded-full bg-[#ef4444]/10 px-2 py-0.5 text-[10px] font-medium text-[#ef4444] [font-family:var(--c2-font-mono)]">
            2 at-risk
          </span>
        </div>
        <div className="mt-3 divide-y divide-[#101418]/[0.05]">
          {[7, 2, 4, 1, 5].map((idx) => {
            const r = INTENT_ROWS[idx];
            return (
              <div key={r.patient_id} className="flex items-center gap-3 py-3">
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: SIG_COLOR[r.intent_signal] }}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12.5px] font-medium text-[#101418]/85">
                    {r.treatment_type}
                  </p>
                  <p className="truncate text-[11px] text-[#101418]/45">
                    {r.primary_question === "(no questions asked)"
                      ? "no engagement since consult"
                      : `asked: ${r.primary_question}`}
                  </p>
                </div>
                <span className="text-[10px] text-[#101418]/40 [font-family:var(--c2-font-mono)]">
                  {r.patient_id}
                </span>
              </div>
            );
          })}
        </div>
        <button className="mt-3 w-full rounded-lg border border-[#4f46e5]/20 py-2 text-[11.5px] font-medium text-[#4f46e5] transition-colors hover:bg-[#4f46e5]/[0.04]">
          Re-engage all with progression visuals
        </button>
      </div>
    </div>
  );
}

const FLOW_STEPS: { phase: string; src: string; dur: string }[] = [
  { phase: "Problem", src: "/videos/bracesproblem.mp4", dur: "0:19" },
  { phase: "Treatment", src: "/videos/invisaligntray.mp4", dur: "0:24" },
  { phase: "Outcome", src: "/videos/bracesoutcome.mp4", dur: "0:16" },
];

function FlowView() {
  return (
    <div className="rounded-xl border border-[#101418]/[0.06] bg-white p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4f46e5]/10 text-[12px] font-semibold text-[#4f46e5]">
            MR
          </span>
          <div>
            <p className="text-[13px] font-medium text-[#101418]">
              Maya R. — Invisalign comprehensive
            </p>
            <p className="text-[10.5px] text-[#101418]/45 [font-family:var(--c2-font-mono)]">
              consult · dr. chen · today 2:10 pm
            </p>
          </div>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-[#10b981]/10 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-[#10b981] [font-family:var(--c2-font-mono)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#10b981]" />
          auto-assembled from consult
        </span>
      </div>

      {/* scene strip */}
      <div className="mt-5 flex items-stretch gap-3 overflow-x-auto pb-2">
        {FLOW_STEPS.map((s, i) => (
          <div key={s.phase} className="flex items-center gap-3">
            <div className="w-[210px] shrink-0 rounded-lg border border-[#101418]/[0.07] bg-[#fafaf8] p-2.5 transition-shadow hover:shadow-[0_14px_36px_-16px_rgba(16,20,24,0.25)]">
              <ClipVideo clip={clip(s.src)} className="aspect-video rounded-md" />
              <div className="mt-2 flex items-center justify-between">
                <span className="rounded bg-[#4f46e5]/[0.08] px-1.5 py-0.5 text-[9px] uppercase tracking-[0.14em] text-[#4f46e5] [font-family:var(--c2-font-mono)]">
                  {i + 1} · {s.phase}
                </span>
                <span className="text-[10px] text-[#101418]/40 [font-family:var(--c2-font-mono)]">
                  {s.dur}
                </span>
              </div>
            </div>
            <span className="h-px w-5 shrink-0 bg-[#101418]/15" />
          </div>
        ))}
        <button className="flex w-[110px] shrink-0 flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-[#101418]/15 text-[#101418]/35 transition-colors hover:border-[#4f46e5]/40 hover:text-[#4f46e5]">
          <Plus size={16} />
          <span className="text-[10px] uppercase tracking-[0.14em] [font-family:var(--c2-font-mono)]">
            add scene
          </span>
        </button>
      </div>

      {/* delivery bar */}
      <div className="mt-4 flex flex-wrap items-center gap-2.5 border-t border-[#101418]/[0.06] pt-4">
        <span className="flex items-center gap-1.5 rounded-full bg-[#f1f4f6] px-3 py-1.5 text-[11px] text-[#101418]/65">
          <Mic size={11} className="text-[#4f46e5]" />
          voiceover · Dr. Chen
        </span>
        <span className="rounded-full bg-[#f1f4f6] px-3 py-1.5 text-[11px] text-[#101418]/65">
          captions · EN + ES
        </span>
        <span className="rounded-full bg-[#f1f4f6] px-3 py-1.5 text-[11px] text-[#101418]/65">
          0:59 total
        </span>
        <button className="group ml-auto inline-flex items-center gap-2 rounded-full bg-[#4f46e5] px-5 py-2.5 text-[12px] font-medium text-white transition-colors hover:bg-[#6366f1]">
          <Send size={12} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          Send to patient
        </button>
      </div>
    </div>
  );
}

const THREADS = [
  {
    patient: "Maya R.",
    q: "What happens if I wait 6 months?",
    time: "2m",
    status: "answered",
    module: "crowding-progression",
  },
  {
    patient: "Daniel O.",
    q: "Will this hurt?",
    time: "18m",
    status: "answered",
    module: "what-to-expect",
  },
  {
    patient: "Priya S.",
    q: "Why do I need this now? It doesn't hurt.",
    time: "1h",
    status: "review",
    module: "fracture-progression",
  },
  {
    patient: "Tom B.",
    q: "How long is recovery?",
    time: "3h",
    status: "answered",
    module: "recovery-timeline",
  },
];

function InboxView() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_1.4fr]">
      <div className="rounded-xl border border-[#101418]/[0.06] bg-white p-2">
        {THREADS.map((t, i) => (
          <div
            key={t.patient}
            className={`flex items-start gap-3 rounded-lg px-3.5 py-3 ${
              i === 2 ? "bg-[#4f46e5]/[0.05]" : "hover:bg-[#fafaf8]"
            }`}
          >
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f1f4f6] text-[10px] font-semibold text-[#101418]/60">
              {t.patient.split(" ").map((p) => p[0]).join("")}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-[12.5px] font-medium text-[#101418]/85">
                  {t.patient}
                </p>
                <span className="text-[10px] text-[#101418]/35 [font-family:var(--c2-font-mono)]">
                  {t.time}
                </span>
              </div>
              <p className="mt-0.5 truncate text-[12px] text-[#101418]/55">
                &ldquo;{t.q}&rdquo;
              </p>
              <span
                className={`mt-1.5 inline-flex items-center gap-1 text-[9.5px] uppercase tracking-[0.12em] [font-family:var(--c2-font-mono)] ${
                  t.status === "answered" ? "text-[#10b981]" : "text-[#f59e0b]"
                }`}
              >
                {t.status === "answered" ? <Check size={9} /> : <Sparkles size={9} />}
                {t.status === "answered" ? "answered · grounded" : "draft — needs review"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* selected thread */}
      <div className="rounded-xl border border-[#101418]/[0.06] bg-white p-5">
        <div className="flex items-center justify-between">
          <p className="text-[13px] font-medium text-[#101418]">
            Priya S. · Crown — #30
          </p>
          <span className="rounded-full bg-[#f59e0b]/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-[#f59e0b] [font-family:var(--c2-font-mono)]">
            awaiting your approval
          </span>
        </div>
        <p className="mt-4 inline-block rounded-2xl rounded-bl-md bg-[#101418] px-4 py-2.5 text-[13px] text-white">
          Why do I need this now? It doesn&rsquo;t hurt.
        </p>
        <div className="mt-4 rounded-2xl rounded-tl-md border border-[#4f46e5]/15 bg-[#4f46e5]/[0.03] p-4">
          <p className="flex items-center gap-1.5 text-[9.5px] uppercase tracking-[0.16em] text-[#4f46e5] [font-family:var(--c2-font-mono)]">
            <Sparkles size={10} />
            opera draft · grounded in consult notes
          </p>
          <p className="mt-2.5 text-[13px] leading-relaxed text-[#101418]/75">
            Your scan shows the crack reaching the dentin layer. Cracks like
            this deepen toward the nerve even without pain — a crown now
            protects the tooth before a root canal becomes necessary.
          </p>
          <span className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#4f46e5]/20 bg-white px-3 py-1.5">
            <Film size={10} className="text-[#4f46e5]" />
            <span className="text-[10px] text-[#4f46e5] [font-family:var(--c2-font-mono)]">
              attaches: fracture-progression module
            </span>
          </span>
        </div>
        <div className="mt-4 flex items-center gap-2.5">
          <button className="rounded-full bg-[#101418] px-5 py-2 text-[12px] font-medium text-white transition-colors hover:bg-[#4f46e5]">
            Approve &amp; send
          </button>
          <button className="rounded-full border border-[#101418]/15 px-5 py-2 text-[12px] font-medium text-[#101418]/60 transition-colors hover:border-[#101418]/30">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- section ----------------------------- */

const NAV_ITEMS = [
  { icon: LayoutGrid, label: "Overview", tab: "analytics" as Tab },
  { icon: Film, label: "Education", tab: "flow" as Tab },
  { icon: MessageCircle, label: "Ask Opera", tab: "inbox" as Tab },
  { icon: Activity, label: "Intelligence", tab: null },
  { icon: Users, label: "Patients", tab: null },
  { icon: Settings, label: "Settings", tab: null },
];

export default function PlatformSection() {
  const [tab, setTab] = useState<Tab>("analytics");

  return (
    <section id="platform" className="relative overflow-hidden bg-[#f1f4f6]/70 py-28 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#101418]/40 [font-family:var(--c2-font-mono)]">
              04 — the platform
            </p>
            <h2 className="mt-4 text-[38px] font-medium leading-[1.05] tracking-[-0.02em] text-[#101418] sm:text-[52px] [font-family:var(--c2-font-display)]">
              Calm, light,
              <br />
              <span className="text-[#101418]/40">instrument-grade.</span>
            </h2>
          </div>
          <p className="max-w-[340px] pb-2 text-[15px] leading-relaxed text-[#101418]/55">
            One surface for the whole loop: assemble the visual plan, answer
            the follow-up questions, watch intent build.
          </p>
        </div>

        {/* view tabs */}
        <div className="mt-12 flex flex-wrap gap-1.5 rounded-full bg-[#eceef0] p-1.5 sm:inline-flex">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`relative rounded-full px-5 py-2 text-[12.5px] font-medium tracking-wide transition-colors duration-300 ${
                tab === t.key ? "text-[#101418]" : "text-[#101418]/45 hover:text-[#101418]/70"
              }`}
            >
              {tab === t.key && (
                <motion.span
                  layoutId="c2-ptab"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  className="absolute inset-0 rounded-full bg-white shadow-[0_6px_20px_-6px_rgba(16,20,24,0.2)]"
                />
              )}
              <span className="relative">{t.label}</span>
            </button>
          ))}
        </div>

        {/* product frame */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mt-8 overflow-hidden rounded-[20px] border border-[#101418]/[0.07] bg-[#fafaf8] shadow-[0_60px_140px_-50px_rgba(16,20,24,0.35)]"
        >
          {/* chrome */}
          <div className="flex items-center gap-4 border-b border-[#101418]/[0.06] bg-white px-5 py-3">
            <span className="flex gap-1.5">
              {["#fca5a5", "#fcd34d", "#86efac"].map((c) => (
                <span key={c} className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />
              ))}
            </span>
            <span className="hidden flex-1 justify-center sm:flex">
              <span className="flex items-center gap-2 rounded-full bg-[#f1f4f6] px-4 py-1.5 text-[11px] text-[#101418]/50 [font-family:var(--c2-font-mono)]">
                <Search size={10} />
                app.getopera.ai · lakeside orthodontics
              </span>
            </span>
            <span className="ml-auto flex items-center gap-3 sm:ml-0">
              <Bell size={13} className="text-[#101418]/35" />
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#4f46e5] text-[9px] font-semibold text-white">
                JC
              </span>
            </span>
          </div>

          <div className="grid md:grid-cols-[200px_1fr]">
            {/* sidebar */}
            <aside className="hidden border-r border-[#101418]/[0.06] bg-white px-3 py-5 md:block">
              <p className="px-3 text-[15px] font-semibold tracking-tight text-[#101418] [font-family:var(--c2-font-display)]">
                Opera
              </p>
              <nav className="mt-5 space-y-0.5">
                {NAV_ITEMS.map((n) => {
                  const isActive = n.tab === tab;
                  return (
                    <button
                      key={n.label}
                      onClick={() => n.tab && setTab(n.tab)}
                      className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[12.5px] transition-colors ${
                        isActive
                          ? "bg-[#4f46e5]/[0.07] font-medium text-[#4f46e5]"
                          : "text-[#101418]/50 hover:bg-[#fafaf8] hover:text-[#101418]/80"
                      }`}
                    >
                      <n.icon size={14} />
                      {n.label}
                      {n.label === "Ask Opera" && (
                        <span className="ml-auto rounded-full bg-[#f59e0b]/15 px-1.5 text-[9.5px] font-medium text-[#f59e0b] [font-family:var(--c2-font-mono)]">
                          1
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
              <div className="mt-8 rounded-lg bg-[#fafaf8] px-3 py-2.5">
                <p className="text-[9px] uppercase tracking-[0.16em] text-[#101418]/35 [font-family:var(--c2-font-mono)]">
                  this week
                </p>
                <p className="mt-1 text-[11.5px] text-[#101418]/65">
                  14 plans sent · 11 watched
                </p>
              </div>
            </aside>

            {/* main */}
            <div className="min-h-[460px] bg-[#fafaf8] p-4 sm:p-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  {tab === "analytics" && <AnalyticsView />}
                  {tab === "flow" && <FlowView />}
                  {tab === "inbox" && <InboxView />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
