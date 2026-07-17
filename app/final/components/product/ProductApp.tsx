"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Check,
  ChevronDown,
  Film,
  LayoutGrid,
  MessageCircle,
  Phone,
  Send,
  Users,
} from "lucide-react";
import {
  ASK_THREADS,
  MODULES,
  PATIENTS,
  SIGNAL_COLOR,
  SIGNAL_LABEL,
  moduleById,
  patientById,
  type Patient,
  type Signal,
} from "./data";
import AskOperaPanel from "./AskOperaPanel";
import { AutoVideo, WallVideo } from "../media";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export type ProductView = "overview" | "patients" | "education" | "ask" | "intent";

export const PRODUCT_VIEWS: { key: ProductView; label: string; icon: typeof LayoutGrid; hint: string }[] = [
  { key: "education", label: "Education", icon: Film, hint: "The visual library, assembled into plans" },
  { key: "ask", label: "Ask Opera", icon: MessageCircle, hint: "Questions answered from the patient's own plan" },
  { key: "intent", label: "Intent", icon: Activity, hint: "Signals read from real engagement, with an action" },
];

/* ————————————————————— atoms ————————————————————— */

function SignalBadge({ signal }: { signal: Signal }) {
  return (
    <span
      className="cf-mono inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11.5px] uppercase tracking-[0.12em]"
      style={{ color: SIGNAL_COLOR[signal], background: `${SIGNAL_COLOR[signal]}14` }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: SIGNAL_COLOR[signal] }} />
      {SIGNAL_LABEL[signal]}
    </span>
  );
}

function EngagementBar({ value, signal }: { value: number; signal: Signal }) {
  return (
    <span className="flex items-center gap-2">
      <span className="cf-mono w-6 shrink-0 text-right text-[13px] tabular-nums text-[#1a1a17]">
        {value}
      </span>
      <span className="h-[3px] w-16 shrink-0 rounded-full bg-[#1a1a17]/10">
        <motion.span
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="block h-full rounded-full"
          style={{ background: SIGNAL_COLOR[signal] }}
        />
      </span>
    </span>
  );
}

function Avatar({ p, size = 8 }: { p: Patient; size?: 7 | 8 }) {
  return (
    <span
      className={`flex ${size === 8 ? "h-8 w-8 text-[13px]" : "h-7 w-7 text-[12px]"} shrink-0 items-center justify-center rounded-full bg-[#5f7a61]/10 font-semibold text-[#5f7a61]`}
    >
      {p.initials}
    </span>
  );
}

/* ————————————————————— overview ————————————————————— */

function StatTile({ label, value, unit, note }: { label: string; value: string; unit?: string; note: string }) {
  return (
    <div className="rounded-lg border border-[#1a1a17]/10 bg-white p-4">
      <p className="cf-mono text-[11.5px] uppercase tracking-[0.16em] text-[#6d6858]">{label}</p>
      <p className="cf-display mt-2 text-[26px] font-light leading-none text-[#1a1a17]">
        {value}
        {unit && <span className="text-[14px] text-[#6d6858]"> {unit}</span>}
      </p>
      <p className="mt-2 text-[13px] text-[#15803d]">{note}</p>
    </div>
  );
}

function OverviewView({
  queued,
  onQueue,
  onOpenPatient,
}: {
  queued: boolean;
  onQueue: () => void;
  onOpenPatient: (id: string) => void;
}) {
  const attention = [...PATIENTS].sort((a, b) => a.engagement - b.engagement);
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatTile label="Case acceptance" value="68" unit="%" note="+6.2 pts this quarter" />
        <StatTile label="Watch rate" value="3.2" unit="per plan" note="+0.8 vs last quarter" />
        <StatTile label="Time to yes" value="4.2" unit="days" note="1.8 days faster with visuals" />
      </div>

      <div className="rounded-lg border border-[#1a1a17]/10 bg-white p-5">
        <div className="flex items-center justify-between">
          <p className="cf-mono text-[12px] uppercase tracking-[0.16em] text-[#6d6858]">
            Needs attention
          </p>
          <span className="cf-mono rounded-full bg-[#b91c1c]/10 px-2.5 py-1 text-[12px] uppercase tracking-[0.12em] text-[#b91c1c]">
            1 at risk
          </span>
        </div>
        <div className="mt-2 divide-y divide-[#1a1a17]/[0.05]">
          {attention.slice(0, 4).map((p) => (
            <button
              key={p.id}
              onClick={() => onOpenPatient(p.id)}
              className="flex w-full items-center gap-4 py-3.5 text-left transition-colors hover:bg-[#1a1a17]/[0.02]"
            >
              <Avatar p={p} />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[15.5px] font-medium text-[#1a1a17]/90">
                  {p.name} · {p.treatment}
                </span>
                <span className="block truncate text-[14px] text-[#6d6858]">
                  {p.question ? `asked: ${p.question}` : "no engagement since the visit"}
                </span>
              </span>
              <SignalBadge signal={p.signal} />
            </button>
          ))}
        </div>
        <button
          onClick={onQueue}
          disabled={queued}
          className={`cf-mono mt-3 w-full rounded-md border py-2.5 text-[12.5px] uppercase tracking-[0.16em] transition-colors ${
            queued
              ? "border-[#15803d]/25 text-[#15803d]"
              : "border-[#5f7a61]/30 text-[#5f7a61] hover:bg-[#5f7a61]/[0.05]"
          }`}
        >
          {queued ? "Queued for Priya and Rosa" : "Queue re-engagement visuals"}
        </button>
      </div>
    </div>
  );
}

/* ————————————————————— patients ————————————————————— */

const EVENT_DOT: Record<string, string> = {
  sent: "#5f7a61",
  watch: "#15803d",
  question: "#b45309",
  share: "#5f7a61",
  flag: "#b91c1c",
  action: "#1a1a17",
};

function PatientsView({
  selectedId,
  onSelect,
  resent,
  onResend,
  alerted,
  onAlert,
  extraModules,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
  resent: Record<string, boolean>;
  onResend: (id: string) => void;
  alerted: Record<string, boolean>;
  onAlert: (id: string) => void;
  extraModules: Record<string, string[]>;
}) {
  const p = patientById(selectedId);
  const planIds = [...p.plan, ...(extraModules[p.id] ?? [])];
  const [playing, setPlaying] = useState<string>(planIds[0]);
  const playingModule = moduleById(planIds.includes(playing) ? playing : planIds[0]);

  return (
    <div className="grid gap-4 lg:grid-cols-[240px_1fr]">
      {/* roster */}
      <div className="rounded-lg border border-[#1a1a17]/10 bg-white p-1.5">
        {PATIENTS.map((x) => (
          <button
            key={x.id}
            onClick={() => onSelect(x.id)}
            className={`flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left transition-colors ${
              x.id === selectedId ? "bg-[#5f7a61]/[0.07]" : "hover:bg-[#1a1a17]/[0.03]"
            }`}
          >
            <Avatar p={x} size={7} />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13.5px] font-medium text-[#1a1a17]/90">{x.name}</span>
              <span className="cf-mono block truncate text-[11.5px] uppercase tracking-[0.1em] text-[#6d6858]">
                {x.specialty}
              </span>
            </span>
            <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: SIGNAL_COLOR[x.signal] }} />
          </button>
        ))}
      </div>

      {/* detail */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="min-w-0 rounded-lg border border-[#1a1a17]/10 bg-white p-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Avatar p={p} />
              <div>
                <p className="text-[14px] font-medium text-[#1a1a17]">
                  {p.name} <span className="text-[#6d6858]">· {p.age}</span>
                </p>
                <p className="cf-mono text-[12px] uppercase tracking-[0.12em] text-[#6d6858]">
                  {p.treatment} · {p.doctor}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <EngagementBar value={p.engagement} signal={p.signal} />
              <SignalBadge signal={p.signal} />
            </div>
          </div>

          <div className="mt-4 grid gap-4 xl:grid-cols-[1.2fr_1fr]">
            {/* plan player */}
            <div>
              <p className="cf-mono text-[11.5px] uppercase tracking-[0.16em] text-[#6d6858]">
                Visual plan · {planIds.length} modules
              </p>
              <div className="mt-2 overflow-hidden rounded-md border border-[#1a1a17]/10">
                <AutoVideo
                  key={playingModule.id}
                  src={playingModule.src}
                  className="aspect-video w-full object-cover"
                />
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {planIds.map((id) => {
                  const m = moduleById(id);
                  const active = m.id === playingModule.id;
                  return (
                    <button
                      key={id}
                      onClick={() => setPlaying(id)}
                      className={`cf-mono rounded-full border px-2.5 py-1 text-[11.5px] uppercase tracking-[0.1em] transition-colors ${
                        active
                          ? "border-[#5f7a61]/40 bg-[#5f7a61]/[0.07] text-[#5f7a61]"
                          : "border-[#1a1a17]/10 text-[#1a1a17]/90 hover:border-[#5f7a61]/30 hover:text-[#5f7a61]"
                      }`}
                    >
                      {m.title}
                    </button>
                  );
                })}
              </div>

              {/* actions */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <button
                  onClick={() => onResend(p.id)}
                  disabled={resent[p.id]}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors ${
                    resent[p.id]
                      ? "bg-[#15803d]/10 text-[#15803d]"
                      : "bg-[#1a1a17] text-white hover:bg-[#5f7a61]"
                  }`}
                >
                  {resent[p.id] ? <Check size={11} /> : <Send size={11} />}
                  {resent[p.id] ? "Plan sent just now" : "Send plan"}
                </button>
                <button
                  onClick={() => onAlert(p.id)}
                  disabled={alerted[p.id]}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-[13px] font-medium transition-colors ${
                    alerted[p.id]
                      ? "border-[#15803d]/25 text-[#15803d]"
                      : "border-[#1a1a17]/15 text-[#1a1a17]/90 hover:border-[#5f7a61]/40 hover:text-[#5f7a61]"
                  }`}
                >
                  {alerted[p.id] ? <Check size={11} /> : <Phone size={11} />}
                  {alerted[p.id] ? "TC alerted" : "Alert the TC"}
                </button>
              </div>
            </div>

            {/* timeline + read */}
            <div className="min-w-0">
              <p className="cf-mono text-[11.5px] uppercase tracking-[0.16em] text-[#6d6858]">
                Engagement timeline
              </p>
              <div className="mt-2 space-y-2.5">
                {p.timeline.map((e, i) => (
                  <div key={i} className="flex items-baseline gap-2.5">
                    <span
                      className="relative top-[-1px] h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: EVENT_DOT[e.kind] }}
                    />
                    <span className="cf-mono w-14 shrink-0 text-[12px] uppercase tracking-[0.06em] text-[#6d6858]">
                      {e.time}
                    </span>
                    <span className="text-[13.5px] leading-snug text-[#1a1a17]/90">{e.text}</span>
                  </div>
                ))}
                {resent[p.id] && (
                  <motion.div
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-baseline gap-2.5"
                  >
                    <span className="relative top-[-1px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#5f7a61]" />
                    <span className="cf-mono w-14 shrink-0 text-[12px] uppercase tracking-[0.06em] text-[#6d6858]">
                      now
                    </span>
                    <span className="text-[13.5px] leading-snug text-[#1a1a17]/90">
                      Plan re-sent to {p.name.split(" ")[0]}
                    </span>
                  </motion.div>
                )}
              </div>

              <div className="mt-4 rounded-md border border-[#5f7a61]/20 bg-[#5f7a61]/[0.04] p-3">
                <p className="cf-mono text-[11.5px] uppercase tracking-[0.18em] text-[#5f7a61]">
                  Opera reads
                </p>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#1a1a17]/90">
                  {p.barrier}. Next: {p.nextAction.toLowerCase()}.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ————————————————————— education ————————————————————— */

function EducationView({
  selectedPatient,
  added,
  onAdd,
}: {
  selectedPatient: string;
  added: Record<string, string[]>;
  onAdd: (patientId: string, moduleId: string) => void;
}) {
  // A curated six. The full library stays in data; the panel never
  // grows taller than the screen.
  const featured = [
    "colon-tool",
    "medication-routine",
    "lasik-eye",
    "acl-anatomy",
    "smile-outcome",
  ].map(moduleById);
  const [preview, setPreview] = useState("colon-tool");
  const previewModule = moduleById(preview);
  const p = patientById(selectedPatient);
  const inPlan = p.plan.includes(preview) || (added[p.id] ?? []).includes(preview);

  return (
    <div className="grid gap-4 lg:grid-cols-[1.35fr_1fr]">
      <div>
        <div className="flex items-baseline justify-between gap-3">
          <p className="cf-mono text-[12px] uppercase tracking-[0.16em] text-[#6d6858]">
            Visual library
          </p>
          <p className="text-[13.5px] text-[#6d6858]">
            {featured.length} of {MODULES.length} modules shown
          </p>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {featured.map((m) => (
            <button
              key={m.id}
              onClick={() => setPreview(m.id)}
              className={`group overflow-hidden rounded-md border text-left transition-colors ${
                preview === m.id ? "border-[#5f7a61]/50" : "border-[#1a1a17]/10 hover:border-[#5f7a61]/30"
              }`}
            >
              <div className="relative aspect-video overflow-hidden bg-[#e9e6df]">
                {m.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={m.src} alt="" className="h-full w-full object-cover" />
                ) : (
                  <WallVideo src={m.src} posterVariant="a" live={false} />
                )}
              </div>
              <div className="bg-white px-2 py-1.5">
                <p className="truncate text-[13px] font-medium text-[#1a1a17]/90">{m.title}</p>
                <p className="cf-mono text-[11.5px] uppercase tracking-[0.1em] text-[#6d6858]">
                  {m.specialty} · {m.duration}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* preview + add to plan */}
      <div className="rounded-lg border border-[#1a1a17]/10 bg-white p-4">
        <p className="cf-mono text-[11.5px] uppercase tracking-[0.16em] text-[#6d6858]">Preview</p>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={preview}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mt-2 overflow-hidden rounded-md border border-[#1a1a17]/10">
              {previewModule.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={previewModule.src} alt="" className="aspect-video w-full object-cover" />
              ) : (
                <AutoVideo src={previewModule.src} className="aspect-video w-full object-cover" />
              )}
            </div>
            <p className="mt-2.5 text-[14.5px] font-medium text-[#1a1a17]">{previewModule.title}</p>
            <p className="cf-mono mt-0.5 text-[11.5px] uppercase tracking-[0.12em] text-[#6d6858]">
              {previewModule.specialty} · {previewModule.duration} · medically reviewed
            </p>
            <button
              onClick={() => onAdd(p.id, preview)}
              disabled={inPlan}
              className={`mt-3.5 w-full rounded-full py-2 text-[13px] font-medium transition-colors ${
                inPlan
                  ? "bg-[#15803d]/10 text-[#15803d]"
                  : "bg-[#1a1a17] text-white hover:bg-[#5f7a61]"
              }`}
            >
              {inPlan ? `In ${p.name.split(" ")[0]}'s plan` : `Add to ${p.name.split(" ")[0]}'s plan`}
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ————————————————————— intent ————————————————————— */

function IntentView({
  assigned,
  onAssign,
  onOpenPatient,
}: {
  assigned: Record<string, boolean>;
  onAssign: (id: string) => void;
  onOpenPatient: (id: string) => void;
}) {
  const [filter, setFilter] = useState<"all" | Signal>("all");
  const [open, setOpen] = useState<string | null>(PATIENTS[0].id);
  const shown = PATIENTS.filter((p) => filter === "all" || p.signal === filter);

  return (
    <div className="rounded-lg border border-[#1a1a17]/10 bg-white">
      <div className="flex items-center justify-between gap-3 border-b border-[#1a1a17]/10 px-4 py-2.5">
        <p className="cf-mono text-[11.5px] uppercase tracking-[0.16em] text-[#6d6858]">
          Intent signals · read from engagement, not guessed
        </p>
        <div className="relative">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as "all" | Signal)}
            className="cf-mono appearance-none rounded-md border border-[#1a1a17]/10 bg-white py-1.5 pl-3 pr-8 text-[12px] uppercase tracking-[0.1em] text-[#1a1a17]/90 outline-none transition-colors hover:border-[#5f7a61]/40 focus:border-[#5f7a61]/50"
          >
            <option value="all">All signals</option>
            <option value="high">High</option>
            <option value="building">Building</option>
            <option value="stalled">Stalled</option>
            <option value="at-risk">At risk</option>
          </select>
          <ChevronDown
            size={11}
            className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6d6858]"
          />
        </div>
      </div>

      <div className="divide-y divide-[#1a1a17]/[0.05]">
        {shown.map((p) => {
          const isOpen = open === p.id;
          return (
            <div key={p.id}>
              <button
                onClick={() => setOpen(isOpen ? null : p.id)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-[#1a1a17]/[0.02]"
              >
                <Avatar p={p} size={7} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[14px] font-medium text-[#1a1a17]/90">
                    {p.name} · {p.treatment}
                  </span>
                  <span className="cf-mono block text-[11.5px] uppercase tracking-[0.1em] text-[#6d6858]">
                    {p.specialty}
                  </span>
                </span>
                <EngagementBar value={p.engagement} signal={p.signal} />
                <SignalBadge signal={p.signal} />
                <ChevronDown
                  size={13}
                  className={`shrink-0 text-[#6d6858] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-3 bg-[#1a1a17]/[0.03] px-4 pb-4 pt-1 sm:grid-cols-3">
                      <div>
                        <p className="cf-mono text-[11.5px] uppercase tracking-[0.16em] text-[#6d6858]">
                          They asked
                        </p>
                        <p className="cf-display mt-1 text-[14.5px] italic leading-snug text-[#1a1a17]">
                          {p.question ? `"${p.question}"` : "No questions yet"}
                        </p>
                      </div>
                      <div>
                        <p className="cf-mono text-[11.5px] uppercase tracking-[0.16em] text-[#6d6858]">
                          Likely barrier
                        </p>
                        <p className="mt-1 text-[13.5px] leading-snug text-[#1a1a17]/90">{p.barrier}</p>
                      </div>
                      <div className="flex flex-col items-start gap-2">
                        <p className="cf-mono text-[11.5px] uppercase tracking-[0.16em] text-[#6d6858]">
                          Recommended
                        </p>
                        <p className="text-[13.5px] leading-snug text-[#1a1a17]/90">{p.nextAction}</p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => onAssign(p.id)}
                            disabled={assigned[p.id]}
                            className={`cf-mono rounded-full px-3 py-1 text-[12px] uppercase tracking-[0.12em] transition-colors ${
                              assigned[p.id]
                                ? "bg-[#15803d]/10 text-[#15803d]"
                                : "bg-[#1a1a17] text-white hover:bg-[#5f7a61]"
                            }`}
                          >
                            {assigned[p.id] ? "Assigned to TC" : "Assign to TC"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ————————————————————— the app ————————————————————— */

export default function ProductApp({
  view,
  onViewChange,
}: {
  view: ProductView;
  onViewChange: (v: ProductView) => void;
}) {
  const [selectedPatient, setSelectedPatient] = useState(PATIENTS[0].id);
  const [resent, setResent] = useState<Record<string, boolean>>({});
  const [alerted, setAlerted] = useState<Record<string, boolean>>({});
  const [assigned, setAssigned] = useState<Record<string, boolean>>({});
  const [added, setAdded] = useState<Record<string, string[]>>({});
  const [queued, setQueued] = useState(false);

  const openPatient = (id: string) => {
    setSelectedPatient(id);
    onViewChange("patients");
  };

  return (
    <div className="overflow-hidden rounded-xl border border-[#1a1a17]/15 bg-white shadow-[0_40px_90px_-40px_rgba(26,26,23,0.25)]">
      <div className="bg-white p-4 sm:p-6 lg:h-[580px] lg:overflow-y-auto">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              {view === "overview" && (
                <OverviewView queued={queued} onQueue={() => setQueued(true)} onOpenPatient={openPatient} />
              )}
              {view === "patients" && (
                <PatientsView
                  selectedId={selectedPatient}
                  onSelect={setSelectedPatient}
                  resent={resent}
                  onResend={(id) => setResent((s) => ({ ...s, [id]: true }))}
                  alerted={alerted}
                  onAlert={(id) => setAlerted((s) => ({ ...s, [id]: true }))}
                  extraModules={added}
                />
              )}
              {view === "education" && (
                <EducationView
                  selectedPatient={selectedPatient}
                  added={added}
                  onAdd={(pid, mid) =>
                    setAdded((s) => ({ ...s, [pid]: [...(s[pid] ?? []), mid] }))
                  }
                />
              )}
              {view === "ask" && (
                <div className="overflow-hidden rounded-lg border border-[#1a1a17]/10">
                  <AskOperaPanel />
                </div>
              )}
              {view === "intent" && (
                <IntentView
                  assigned={assigned}
                  onAssign={(id) => setAssigned((s) => ({ ...s, [id]: true }))}
                  onOpenPatient={openPatient}
                />
              )}
            </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
