"use client";

/**
 * Patients — the portal home. Every patient row expands into their full
 * record: permanent video links, and everything they asked Opera with
 * timestamps (so the clinic can see what they cared about and when they
 * went quiet).
 */

import { useCallback, useEffect, useState } from "react";
import {
  ChevronDown,
  Copy,
  Check,
  ExternalLink,
  Plus,
  Search,
  MessageCircle,
  Clock,
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
  if (!iso) return "no activity yet";
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

export default function PatientsPage() {
  const [patients, setPatients] = useState<PatientRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState<string | null>(null);
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

  const toggle = async (id: string) => {
    const next = open === id ? null : id;
    setOpen(next);
    if (next && !activity[next]) {
      setActivity((a) => ({ ...a, [next]: "loading" }));
      try {
        const res = await fetch(`/api/clinic/patients/${next}/activity`);
        const data = await res.json();
        setActivity((a) => ({ ...a, [next]: data }));
      } catch {
        setActivity((a) => ({
          ...a,
          [next]: { shareIds: [], questionCount: 0, lastActiveAt: null, events: [] },
        }));
      }
    }
  };

  const copyLink = async (shareId: string) => {
    await navigator.clipboard.writeText(`${window.location.origin}/v/${shareId}`);
    setCopied(shareId);
    setTimeout(() => setCopied(null), 1800);
  };

  const shown = patients.filter((p) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      `${p.first_name} ${p.last_name}`.toLowerCase().includes(q) ||
      (p.treatment_type ?? "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="mx-auto max-w-[1080px]">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="cf-display text-[clamp(1.8rem,3vw,2.4rem)] font-light tracking-[-0.02em] text-[#1a1a17]">
            Patients
          </h1>
          <p className="cf-body mt-1.5 text-[15px] text-[#5e6a60]">
            Every video link is permanent. Open a patient to see what they asked.
          </p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="cf-body inline-flex items-center gap-2 rounded-full bg-[#5f7a61] px-5 py-2.5 text-[14.5px] font-medium text-white transition-colors hover:bg-[#4e6650]"
        >
          <Plus size={15} /> Add patient
        </button>
      </div>

      <div className="relative mt-7 max-w-md">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6e7a71]" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or treatment"
          className="cf-body w-full rounded-xl border border-[#1a1a17]/12 bg-white py-2.5 pl-10 pr-4 text-[14.5px] outline-none transition-colors focus:border-[#5f7a61]/60"
        />
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-[#1a1a17]/10 bg-white">
        {loading ? (
          <p className="cf-body px-6 py-10 text-[15px] text-[#5e6a60]">Loading patients…</p>
        ) : shown.length === 0 ? (
          <p className="cf-body px-6 py-10 text-[15px] text-[#5e6a60]">
            No patients yet. Generate a video and the patient appears here automatically.
          </p>
        ) : (
          shown.map((p, i) => {
            const isOpen = open === p.id;
            const act = activity[p.id];
            const shareIds = new Set<string>([
              ...(p.video_jobs ?? []),
              ...(act && act !== "loading" ? act.shareIds : []),
            ]);
            return (
              <div key={p.id} className={i > 0 ? "border-t border-[#1a1a17]/[0.07]" : ""}>
                <button
                  onClick={() => toggle(p.id)}
                  className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-[#5f7a61]/[0.03] md:px-6"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#5f7a61]/10 text-[14px] font-semibold text-[#5f7a61]">
                    {p.first_name?.[0]}
                    {p.last_name?.[0] ?? ""}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[15.5px] font-medium text-[#1a1a17]">
                      {p.first_name} {p.last_name}
                    </span>
                    <span className="cf-mono block truncate text-[11px] uppercase tracking-[0.1em] text-[#6e7a71]">
                      {(p.treatment_type ?? "no treatment yet").replace(/_/g, " ")}
                      {p.consulting_provider ? ` · ${p.consulting_provider}` : ""}
                    </span>
                  </span>
                  {p.video_url || (p.video_jobs?.length ?? 0) > 0 ? (
                    <span className="cf-mono hidden rounded-full bg-[#5f7a61]/10 px-2.5 py-1 text-[10.5px] uppercase tracking-[0.1em] text-[#3e5540] sm:inline">
                      video ready
                    </span>
                  ) : null}
                  <ChevronDown
                    size={16}
                    className={`shrink-0 text-[#6e7a71] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-[#1a1a17]/[0.06] bg-[#f5f8f5]/60 px-5 py-5 md:px-6">
                    <div className="grid gap-6 lg:grid-cols-2">
                      {/* links + contact */}
                      <div>
                        <p className="cf-mono text-[11px] uppercase tracking-[0.16em] text-[#5f7a61]">
                          Patient video links
                        </p>
                        {shareIds.size === 0 && !p.video_url ? (
                          <p className="cf-body mt-2 text-[14px] text-[#5e6a60]">
                            No video yet. Generate one from the Generate tab.
                          </p>
                        ) : (
                          <div className="mt-2.5 space-y-2">
                            {Array.from(shareIds).map((sid) => (
                              <div
                                key={sid}
                                className="flex items-center gap-2 rounded-xl border border-[#1a1a17]/10 bg-white px-3.5 py-2.5"
                              >
                                <span className="cf-mono min-w-0 flex-1 truncate text-[12.5px] text-[#1a1a17]/80">
                                  /v/{sid}
                                </span>
                                <button
                                  onClick={() => copyLink(sid)}
                                  className="cf-mono inline-flex items-center gap-1.5 rounded-full border border-[#5f7a61]/30 px-3 py-1 text-[11px] uppercase tracking-[0.08em] text-[#3e5540] transition-colors hover:bg-[#5f7a61]/[0.07]"
                                >
                                  {copied === sid ? <Check size={11} /> : <Copy size={11} />}
                                  {copied === sid ? "Copied" : "Copy link"}
                                </button>
                                <a
                                  href={`/v/${sid}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="cf-mono inline-flex items-center gap-1.5 rounded-full bg-[#1a1a17] px-3 py-1 text-[11px] uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#5f7a61]"
                                >
                                  <ExternalLink size={11} /> Open
                                </a>
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="cf-body mt-4 space-y-1 text-[13.5px] text-[#5e6a60]">
                          {p.email && <p>Email · {p.email}</p>}
                          {p.phone && <p>Phone · {p.phone}</p>}
                          <p>Added · {new Date(p.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>

                      {/* session activity */}
                      <div>
                        <div className="flex items-center justify-between">
                          <p className="cf-mono text-[11px] uppercase tracking-[0.16em] text-[#5f7a61]">
                            Ask Opera activity
                          </p>
                          {act && act !== "loading" && (
                            <span className="cf-mono flex items-center gap-3 text-[11px] text-[#6e7a71]">
                              <span className="flex items-center gap-1">
                                <MessageCircle size={11} /> {act.questionCount} asked
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock size={11} /> last {fmtWhen(act.lastActiveAt)}
                              </span>
                            </span>
                          )}
                        </div>
                        {act === "loading" || !act ? (
                          <p className="cf-body mt-2 text-[14px] text-[#5e6a60]">Loading activity…</p>
                        ) : act.events.length === 0 ? (
                          <p className="cf-body mt-2 text-[14px] text-[#5e6a60]">
                            They haven&rsquo;t asked Opera anything yet.
                          </p>
                        ) : (
                          <div className="mt-2.5 max-h-[260px] space-y-2 overflow-y-auto pr-1">
                            {act.events
                              .filter((e) => e.role === "patient")
                              .map((e, j) => (
                                <div
                                  key={j}
                                  className="rounded-xl border border-[#1a1a17]/10 bg-white px-3.5 py-2.5"
                                >
                                  <p className="text-[13.5px] font-medium leading-snug text-[#1a1a17]">
                                    {e.text}
                                  </p>
                                  <p className="cf-mono mt-1 text-[10.5px] uppercase tracking-[0.08em] text-[#6e7a71]">
                                    {fmtWhen(e.ts)}
                                  </p>
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

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
