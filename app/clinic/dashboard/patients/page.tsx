"use client";

/**
 * Patients — month-grouped cards. Clicking a card opens a detail drawer
 * with organized engagement analysis: what they asked, what they care
 * about, when they were last active, and their permanent video links.
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Check,
  ChevronRight,
  Clock,
  Copy,
  ExternalLink,
  Film,
  MessageCircle,
  Plus,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import AddPatientModal from "@/Components/clinic-portal/AddPatientModal";

interface PatientRow {
  id: string;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null;
  treatment_type: string | null;
  consulting_provider: string | null;
  video_url: string | null;
  video_watched?: number;
  created_at: string;
  video_jobs?: string[];
}

interface Activity {
  shareIds: string[];
  questionCount: number;
  lastActiveAt: string | null;
  events: { role: "patient" | "opera"; text: string; ts: string; shareId: string }[];
}

const fmtWhen = (iso: string | null) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const monthKey = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { month: "long", year: "numeric" });
};

/** Bucket patient questions into the concerns clinics actually care about. */
function topics(events: Activity["events"]): string[] {
  const qs = events.filter((e) => e.role === "patient").map((e) => e.text.toLowerCase());
  const out = new Set<string>();
  for (const q of qs) {
    if (/cost|insur|price|cover|pay|afford|delta/.test(q)) out.add("Cost & insurance");
    if (/hurt|pain|numb|anesthes|comfort|scare/.test(q)) out.add("Pain & comfort");
    if (/how long|recover|heal|chew|eat|after|timeline|until/.test(q)) out.add("Recovery & timeline");
    if (/natural|look|match|white|photo|smile|notice/.test(q)) out.add("Appearance");
    if (/schedule|appointment|book|lose|replace|wedding/.test(q)) out.add("Logistics");
  }
  return Array.from(out);
}

export default function PatientsPage() {
  const [patients, setPatients] = useState<PatientRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "video" | "active">("all");
  const [selected, setSelected] = useState<PatientRow | null>(null);
  const [activity, setActivity] = useState<Record<string, Activity | "loading">>({});
  const [copied, setCopied] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/clinic/patients?limit=200`);
      const data = await res.json();
      setPatients(data.patients ?? []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const openPatient = async (p: PatientRow) => {
    setSelected(p);
    if (!activity[p.id]) {
      setActivity((a) => ({ ...a, [p.id]: "loading" }));
      try {
        const res = await fetch(`/api/clinic/patients/${p.id}/activity`);
        const data = await res.json();
        setActivity((a) => ({ ...a, [p.id]: data }));
      } catch {
        setActivity((a) => ({
          ...a,
          [p.id]: { shareIds: [], questionCount: 0, lastActiveAt: null, events: [] },
        }));
      }
    }
  };

  const copyLink = async (shareId: string) => {
    await navigator.clipboard.writeText(`${window.location.origin}/v/${shareId}`);
    setCopied(shareId);
    setTimeout(() => setCopied(null), 1800);
  };

  const filtered = useMemo(() => {
    return patients.filter((p) => {
      if (search.trim()) {
        const q = search.toLowerCase();
        if (
          !`${p.first_name} ${p.last_name}`.toLowerCase().includes(q) &&
          !(p.treatment_type ?? "").toLowerCase().includes(q)
        )
          return false;
      }
      if (filter === "video" && !p.video_url && !(p.video_jobs?.length ?? 0)) return false;
      return true;
    });
  }, [patients, search, filter]);

  const groups = useMemo(() => {
    const map = new Map<string, PatientRow[]>();
    for (const p of filtered) {
      const k = monthKey(p.created_at);
      if (!map.has(k)) map.set(k, []);
      map.get(k)!.push(p);
    }
    return Array.from(map.entries());
  }, [filtered]);

  const act = selected ? activity[selected.id] : undefined;
  const actData = act && act !== "loading" ? act : null;
  const selShareIds = selected
    ? Array.from(new Set([...(selected.video_jobs ?? []), ...(actData?.shareIds ?? [])]))
    : [];
  // Pre-consult welcome links aren't rendered treatment videos — list them
  // separately so the counts here line up with the Videos page.
  const selVideoIds = selShareIds.filter((s) => !s.startsWith("pre-"));
  const selWelcomeIds = selShareIds.filter((s) => s.startsWith("pre-"));

  return (
    <div className="mx-auto max-w-[1160px]">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="cf-display text-[clamp(1.8rem,3vw,2.4rem)] font-light tracking-[-0.02em] text-[#1a1a17]">
            Patients
          </h1>
          <p className="cf-body mt-1.5 text-[15px] text-[#5e6a60]">
            Grouped by month. Click a patient for their full record and analysis.
          </p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="cf-body inline-flex items-center gap-2 rounded-full bg-[#5f7a61] px-5 py-2.5 text-[14.5px] font-medium text-white transition-colors hover:bg-[#4e6650]"
        >
          <Plus size={15} /> Add patient
        </button>
      </div>

      {/* toolbar */}
      <div className="mt-7 flex flex-wrap items-center gap-3">
        <div className="relative w-full max-w-sm">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6e7a71]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or treatment"
            className="cf-body w-full rounded-xl border border-[#1a1a17]/12 bg-white py-2.5 pl-10 pr-4 text-[14.5px] outline-none transition-colors focus:border-[#5f7a61]/60"
          />
        </div>
        {(
          [
            ["all", "All"],
            ["video", "Video ready"],
          ] as const
        ).map(([k, label]) => (
          <button
            key={k}
            onClick={() => setFilter(k)}
            className={`cf-mono rounded-full border px-4 py-2 text-[11.5px] uppercase tracking-[0.08em] transition-colors ${
              filter === k
                ? "border-[#5f7a61]/50 bg-[#5f7a61]/[0.08] text-[#3e5540]"
                : "border-[#1a1a17]/12 text-[#1a1a17]/55 hover:border-[#5f7a61]/40"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="cf-body mt-10 text-[15px] text-[#5e6a60]">Loading patients…</p>
      ) : groups.length === 0 ? (
        <p className="cf-body mt-10 text-[15px] text-[#5e6a60]">No patients match.</p>
      ) : (
        groups.map(([month, rows]) => (
          <section key={month} className="mt-9">
            <div className="flex items-baseline gap-3 border-b border-[#1a1a17]/10 pb-2">
              <h2 className="cf-mono text-[12px] uppercase tracking-[0.18em] text-[#5f7a61]">
                {month}
              </h2>
              <span className="cf-mono text-[11px] text-[#6e7a71]">{rows.length}</span>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {rows.map((p) => (
                <button
                  key={p.id}
                  onClick={() => openPatient(p)}
                  className="group rounded-2xl border border-[#1a1a17]/10 bg-white p-5 text-left transition-all hover:-translate-y-0.5 hover:border-[#5f7a61]/40 hover:shadow-[0_16px_40px_-24px_rgba(63,85,64,0.4)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#5f7a61]/10 text-[15px] font-semibold text-[#5f7a61]">
                      {p.first_name?.[0]}
                      {p.last_name?.[0] ?? ""}
                    </span>
                    <ChevronRight
                      size={16}
                      className="mt-1 text-[#6e7a71] transition-transform group-hover:translate-x-0.5"
                    />
                  </div>
                  <p className="mt-3 text-[16px] font-medium text-[#1a1a17]">
                    {p.first_name} {p.last_name}
                  </p>
                  <p className="cf-mono mt-1 text-[11px] uppercase tracking-[0.1em] text-[#6e7a71]">
                    {(p.treatment_type ?? "no treatment yet").replace(/_/g, " ")}
                    {p.consulting_provider ? ` · ${p.consulting_provider}` : ""}
                  </p>
                  <div className="mt-3.5 flex items-center gap-2">
                    {(p.video_url || (p.video_jobs?.length ?? 0) > 0) && (
                      <span className="cf-mono inline-flex items-center gap-1.5 rounded-full bg-[#5f7a61]/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.08em] text-[#3e5540]">
                        <Film size={10} /> video
                      </span>
                    )}
                    {p.video_watched ? (
                      <span className="cf-mono inline-flex items-center gap-1.5 rounded-full bg-[#15803d]/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.08em] text-[#15803d]">
                        <Check size={10} /> watched
                      </span>
                    ) : null}
                    <span className="cf-mono ml-auto text-[10.5px] text-[#6e7a71]">
                      {new Date(p.created_at).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        ))
      )}

      {/* ——— detail drawer ——— */}
      {selected && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-[#1a1a17]/30" onClick={() => setSelected(null)} />
          <div className="absolute inset-y-0 right-0 flex w-full max-w-[520px] flex-col overflow-y-auto bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#1a1a17]/10 bg-white px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5f7a61]/10 text-[14px] font-semibold text-[#5f7a61]">
                  {selected.first_name?.[0]}
                  {selected.last_name?.[0] ?? ""}
                </span>
                <div>
                  <p className="text-[16.5px] font-medium text-[#1a1a17]">
                    {selected.first_name} {selected.last_name}
                  </p>
                  <p className="cf-mono text-[10.5px] uppercase tracking-[0.1em] text-[#6e7a71]">
                    {(selected.treatment_type ?? "").replace(/_/g, " ")}
                    {selected.consulting_provider ? ` · ${selected.consulting_provider}` : ""}
                  </p>
                </div>
              </div>
              <button
                aria-label="Close"
                onClick={() => setSelected(null)}
                className="rounded-full p-2 text-[#6e7a71] transition-colors hover:bg-[#1a1a17]/[0.05] hover:text-[#1a1a17]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 space-y-7 px-6 py-6">
              {/* analysis */}
              <section>
                <p className="cf-mono text-[11px] uppercase tracking-[0.16em] text-[#5f7a61]">
                  Engagement analysis
                </p>
                <div className="mt-3 grid grid-cols-3 gap-3">
                  <div className="rounded-xl border border-[#1a1a17]/10 p-3.5">
                    <p className="cf-display text-[24px] font-light leading-none text-[#1a1a17]">
                      {actData ? actData.questionCount : "…"}
                    </p>
                    <p className="cf-mono mt-1.5 text-[9.5px] uppercase tracking-[0.1em] text-[#6e7a71]">
                      Questions
                    </p>
                  </div>
                  <div className="rounded-xl border border-[#1a1a17]/10 p-3.5">
                    <p className="text-[13px] font-medium leading-tight text-[#1a1a17]">
                      {actData ? fmtWhen(actData.lastActiveAt) : "…"}
                    </p>
                    <p className="cf-mono mt-1.5 text-[9.5px] uppercase tracking-[0.1em] text-[#6e7a71]">
                      Last active
                    </p>
                  </div>
                  <div className="rounded-xl border border-[#1a1a17]/10 p-3.5">
                    <p className="text-[13px] font-medium leading-tight text-[#1a1a17]">
                      {selected.video_watched ? "Watched" : "Not yet"}
                    </p>
                    <p className="cf-mono mt-1.5 text-[9.5px] uppercase tracking-[0.1em] text-[#6e7a71]">
                      Video
                    </p>
                  </div>
                </div>
                {actData && topics(actData.events).length > 0 && (
                  <div className="mt-4">
                    <p className="cf-mono text-[10px] uppercase tracking-[0.14em] text-[#6e7a71]">
                      What they care about
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {topics(actData.events).map((t) => (
                        <span
                          key={t}
                          className="cf-body rounded-full bg-[#5f7a61]/[0.08] px-3 py-1.5 text-[12.5px] font-medium text-[#3e5540]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </section>

              {/* questions timeline */}
              <section>
                <p className="cf-mono flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[#5f7a61]">
                  <MessageCircle size={12} /> Questions asked
                </p>
                {act === "loading" || !actData ? (
                  <p className="cf-body mt-2 text-[14px] text-[#5e6a60]">Loading…</p>
                ) : actData.events.filter((e) => e.role === "patient").length === 0 ? (
                  <p className="cf-body mt-2 text-[14px] text-[#5e6a60]">
                    Nothing yet. Their questions appear here the moment they ask.
                  </p>
                ) : (
                  <div className="mt-3 space-y-2.5">
                    {actData.events
                      .filter((e) => e.role === "patient")
                      .map((e, i) => (
                        <div key={i} className="rounded-xl border border-[#1a1a17]/10 bg-[#f5f8f5]/60 px-4 py-3">
                          <p className="text-[14px] font-medium leading-snug text-[#1a1a17]">
                            {e.text}
                          </p>
                          <p className="cf-mono mt-1.5 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.08em] text-[#6e7a71]">
                            <Clock size={10} /> {fmtWhen(e.ts)}
                          </p>
                        </div>
                      ))}
                  </div>
                )}
              </section>

              {/* links */}
              <section>
                <p className="cf-mono flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[#5f7a61]">
                  <Film size={12} /> Video links
                </p>
                {selShareIds.length === 0 ? (
                  <p className="cf-body mt-2 text-[14px] text-[#5e6a60]">
                    No video yet — generate one from the Generate tab.
                  </p>
                ) : (
                  <div className="mt-3 space-y-2">
                    {selVideoIds.length === 0 && (
                      <p className="cf-body text-[14px] text-[#5e6a60]">
                        No treatment video yet — only welcome links below.
                      </p>
                    )}
                    {selVideoIds.map((sid) => (
                      <div
                        key={sid}
                        className="flex items-center gap-2 rounded-xl border border-[#1a1a17]/10 px-3.5 py-2.5"
                      >
                        <span className="cf-mono min-w-0 flex-1 truncate text-[12px] text-[#1a1a17]/80">
                          /v/{sid}
                        </span>
                        <button
                          onClick={() => copyLink(sid)}
                          className="cf-mono inline-flex items-center gap-1.5 rounded-full border border-[#5f7a61]/30 px-3 py-1 text-[10.5px] uppercase tracking-[0.06em] text-[#3e5540] transition-colors hover:bg-[#5f7a61]/[0.07]"
                        >
                          {copied === sid ? <Check size={11} /> : <Copy size={11} />}
                          {copied === sid ? "Copied" : "Copy"}
                        </button>
                        <a
                          href={`/v/${sid}`}
                          target="_blank"
                          rel="noreferrer"
                          className="cf-mono inline-flex items-center gap-1.5 rounded-full bg-[#1a1a17] px-3 py-1 text-[10.5px] uppercase tracking-[0.06em] text-white transition-colors hover:bg-[#5f7a61]"
                        >
                          <ExternalLink size={11} /> Open
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              {/* pre-consult welcome links */}
              {selWelcomeIds.length > 0 && (
                <section>
                  <p className="cf-mono flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[#5f7a61]">
                    <Film size={12} /> Pre-consult welcome links
                  </p>
                  <div className="mt-3 space-y-2">
                    {selWelcomeIds.map((sid) => (
                      <div
                        key={sid}
                        className="flex items-center gap-2 rounded-xl border border-[#1a1a17]/10 px-3.5 py-2.5"
                      >
                        <span className="cf-mono min-w-0 flex-1 truncate text-[12px] text-[#1a1a17]/80">
                          /v/{sid}
                        </span>
                        <button
                          onClick={() => copyLink(sid)}
                          className="cf-mono inline-flex items-center gap-1.5 rounded-full border border-[#5f7a61]/30 px-3 py-1 text-[10.5px] uppercase tracking-[0.06em] text-[#3e5540] transition-colors hover:bg-[#5f7a61]/[0.07]"
                        >
                          {copied === sid ? <Check size={11} /> : <Copy size={11} />}
                          {copied === sid ? "Copied" : "Copy"}
                        </button>
                        <a
                          href={`/v/${sid}`}
                          target="_blank"
                          rel="noreferrer"
                          className="cf-mono inline-flex items-center gap-1.5 rounded-full bg-[#1a1a17] px-3 py-1 text-[10.5px] uppercase tracking-[0.06em] text-white transition-colors hover:bg-[#5f7a61]"
                        >
                          <ExternalLink size={11} /> Open
                        </a>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* generate */}
              <section>
                <a
                  href={`/clinic/dashboard/pipeline?patient=${selected.id}`}
                  className="cf-body inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#5f7a61] py-3 text-[15px] font-medium text-white transition-colors hover:bg-[#4e6650]"
                >
                  <Sparkles size={16} />
                  Generate a video for {selected.first_name}
                </a>
              </section>

              {/* contact */}
              <section className="cf-body space-y-1 border-t border-[#1a1a17]/[0.07] pt-5 text-[13.5px] text-[#5e6a60]">
                {selected.email && <p>Email · {selected.email}</p>}
                {selected.phone && <p>Phone · {selected.phone}</p>}
                <p>Added · {new Date(selected.created_at).toLocaleDateString()}</p>
              </section>
            </div>
          </div>
        </div>
      )}

      <AddPatientModal
        open={showAdd}
        onClose={() => setShowAdd(false)}
        onCreated={() => {
          setShowAdd(false);
          load();
        }}
      />
    </div>
  );
}
