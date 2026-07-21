"use client";

/**
 * Opera admin — internal console. Gate: admin key (stored in
 * sessionStorage after first entry). Roster of every clinic with usage,
 * login creation, and the pending tour-video review queue.
 */

import { useCallback, useEffect, useState } from "react";
import Shell from "@/app/final/components/Shell";
import { Check, Copy, ExternalLink, Plus, RefreshCw, ShieldCheck } from "lucide-react";

interface AdminClinic {
  clinicId: string;
  clinicName: string;
  contactName: string;
  email: string;
  status: string;
  plan: string;
  videosGenerated: number;
  lastUsedAt: string | null;
  createdAt: string;
  hasSubscription: boolean;
  preconsultVideoUrl: string | null;
  pendingTourUrl: string | null;
  liveNote: string | null;
  pendingNote: string | null;
}

const fmt = (iso: string | null) =>
  iso
    ? new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })
    : "—";

export default function AdminPage() {
  const [key, setKey] = useState("");
  const [authed, setAuthed] = useState(false);
  const [clinics, setClinics] = useState<AdminClinic[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [created, setCreated] = useState<{ email: string; password: string; apiKey: string | null } | null>(null);
  const [form, setForm] = useState({ clinicName: "", contactName: "", email: "", password: "" });
  const [copied, setCopied] = useState(false);

  const load = useCallback(async (k: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/clinics", { headers: { "x-admin-key": k } });
      if (res.status === 401) {
        setError("Wrong key.");
        setAuthed(false);
        return;
      }
      const data = await res.json();
      setClinics(data.clinics ?? []);
      setAuthed(true);
      sessionStorage.setItem("opera-admin-key", k);
    } catch {
      setError("Couldn't load clinics.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const saved = sessionStorage.getItem("opera-admin-key");
    if (saved) {
      setKey(saved);
      load(saved);
    }
  }, [load]);

  const createClinic = async () => {
    setError("");
    const res = await fetch("/api/admin/clinics", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-key": key },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error === "email_exists" ? "That email already has a login." : data.error ?? "Failed.");
      return;
    }
    setCreated({ email: form.email, password: form.password, apiKey: data.apiKey });
    setShowCreate(false);
    setForm({ clinicName: "", contactName: "", email: "", password: "" });
    load(key);
  };

  const approveNote = async (clinicId: string, note?: string) => {
    await fetch("/api/admin/promote-note", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-key": key },
      body: JSON.stringify({ clinicId, note }),
    });
    load(key);
  };

  const promote = async (clinicId: string, videoUrl?: string) => {
    await fetch("/api/admin/promote-tour", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-key": key },
      body: JSON.stringify({ clinicId, videoUrl, audioBaked: false }),
    });
    load(key);
  };

  const input =
    "cf-body w-full rounded-xl border border-[#1a1a17]/12 bg-white px-4 py-2.5 text-[14.5px] outline-none transition-colors focus:border-[#5f7a61]/60";

  if (!authed) {
    return (
      <Shell>
        <main className="flex min-h-screen items-center justify-center bg-white px-6">
          <div className="w-full max-w-[380px] text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#5f7a61]/10">
              <ShieldCheck size={20} className="text-[#5f7a61]" />
            </span>
            <h1 className="cf-display mt-4 text-[26px] font-light text-[#1a1a17]">Opera admin</h1>
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && load(key)}
              placeholder="Admin key"
              className={input + " mt-5 text-center"}
            />
            {error && <p className="cf-body mt-3 text-[13.5px] text-[#b91c1c]">{error}</p>}
            <button
              onClick={() => load(key)}
              disabled={loading || !key.trim()}
              className="cf-body mt-4 w-full rounded-full bg-[#1a1a17] py-3 text-[15px] font-medium text-white transition-colors hover:bg-[#5f7a61] disabled:opacity-50"
            >
              {loading ? "Checking…" : "Enter"}
            </button>
          </div>
        </main>
      </Shell>
    );
  }

  const pending = clinics.filter((c) => c.pendingTourUrl);
  const pendingNotes = clinics.filter((c) => c.pendingNote);

  return (
    <Shell>
      <main className="min-h-screen bg-white px-5 py-10 md:px-10">
        <div className="mx-auto max-w-[1160px]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="cf-display text-[clamp(1.8rem,3vw,2.4rem)] font-light tracking-[-0.02em] text-[#1a1a17]">
                Clinics
              </h1>
              <p className="cf-body mt-1.5 text-[15px] text-[#5e6a60]">
                {clinics.length} accounts · {pending.length} tour upload{pending.length === 1 ? "" : "s"} · {pendingNotes.length} note{pendingNotes.length === 1 ? "" : "s"} awaiting review
              </p>
            </div>
            <div className="flex gap-2.5">
              <button
                onClick={() => load(key)}
                className="cf-mono inline-flex items-center gap-1.5 rounded-full border border-[#1a1a17]/12 px-4 py-2 text-[11.5px] uppercase tracking-[0.08em] text-[#1a1a17]/65 transition-colors hover:border-[#5f7a61]/40"
              >
                <RefreshCw size={12} className={loading ? "animate-spin" : ""} /> Refresh
              </button>
              <button
                onClick={() => setShowCreate((v) => !v)}
                className="cf-body inline-flex items-center gap-2 rounded-full bg-[#5f7a61] px-5 py-2.5 text-[14.5px] font-medium text-white transition-colors hover:bg-[#4e6650]"
              >
                <Plus size={15} /> New clinic login
              </button>
            </div>
          </div>

          {created && (
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#5f7a61]/25 bg-[#5f7a61]/[0.05] px-5 py-4">
              <p className="cf-body text-[14.5px] text-[#3e5540]">
                Login created — <span className="cf-mono">{created.email}</span> ·{" "}
                <span className="cf-mono">{created.password}</span>
                {created.apiKey && (
                  <>
                    {" "}· API key <span className="cf-mono">{created.apiKey.slice(0, 12)}…</span>
                  </>
                )}
              </p>
              <button
                onClick={async () => {
                  await navigator.clipboard.writeText(
                    `getopera.ai login\nEmail: ${created.email}\nPassword: ${created.password}`
                  );
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1800);
                }}
                className="cf-mono inline-flex items-center gap-1.5 rounded-full border border-[#5f7a61]/30 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.08em] text-[#3e5540]"
              >
                {copied ? <Check size={11} /> : <Copy size={11} />}
                {copied ? "Copied" : "Copy creds"}
              </button>
            </div>
          )}

          {showCreate && (
            <div className="mt-6 grid gap-4 rounded-2xl border border-[#1a1a17]/10 bg-white p-6 sm:grid-cols-2">
              <input placeholder="Clinic name" value={form.clinicName} onChange={(e) => setForm({ ...form, clinicName: e.target.value })} className={input} />
              <input placeholder="Contact name" value={form.contactName} onChange={(e) => setForm({ ...form, contactName: e.target.value })} className={input} />
              <input placeholder="Login email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={input} />
              <input placeholder="Password (8+ chars)" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className={input} />
              <button
                onClick={createClinic}
                className="cf-body rounded-full bg-[#1a1a17] py-2.5 text-[14.5px] font-medium text-white transition-colors hover:bg-[#5f7a61] sm:col-span-2"
              >
                Create login
              </button>
            </div>
          )}

          {error && authed && <p className="cf-body mt-4 text-[14px] text-[#b91c1c]">{error}</p>}

          {/* pending tour reviews */}
          {pending.length > 0 && (
            <div className="mt-8 rounded-2xl border border-[#b45309]/25 bg-[#b45309]/[0.04] p-6">
              <p className="cf-mono text-[11px] uppercase tracking-[0.16em] text-[#b45309]">
                Tour uploads awaiting review
              </p>
              <div className="mt-3 space-y-3">
                {pending.map((c) => (
                  <div key={c.clinicId} className="flex flex-wrap items-center gap-3 rounded-xl border border-[#1a1a17]/10 bg-white px-4 py-3">
                    <span className="cf-body min-w-0 flex-1 truncate text-[14.5px] font-medium text-[#1a1a17]">
                      {c.clinicName}
                    </span>
                    <a
                      href={c.pendingTourUrl!}
                      target="_blank"
                      rel="noreferrer"
                      className="cf-mono inline-flex items-center gap-1.5 rounded-full border border-[#1a1a17]/12 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.08em] text-[#1a1a17]/70"
                    >
                      <ExternalLink size={11} /> Raw upload
                    </a>
                    <button
                      onClick={() => promote(c.clinicId)}
                      className="cf-mono rounded-full bg-[#5f7a61] px-3.5 py-1.5 text-[11px] uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#4e6650]"
                    >
                      Promote as-is
                    </button>
                    <button
                      onClick={() => {
                        const url = prompt("Processed video URL (with music baked in):");
                        if (url) promote(c.clinicId, url);
                      }}
                      className="cf-mono rounded-full bg-[#1a1a17] px-3.5 py-1.5 text-[11px] uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#5f7a61]"
                    >
                      Promote processed…
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* pending note reviews */}
          {pendingNotes.length > 0 && (
            <div className="mt-8 rounded-2xl border border-[#5f7a61]/25 bg-[#5f7a61]/[0.04] p-6">
              <p className="cf-mono text-[11px] uppercase tracking-[0.16em] text-[#3e5540]">
                Welcome notes awaiting review
              </p>
              <div className="mt-3 space-y-3">
                {pendingNotes.map((c) => (
                  <div key={c.clinicId} className="flex flex-wrap items-center gap-3 rounded-xl border border-[#1a1a17]/10 bg-white px-4 py-3">
                    <div className="min-w-0 flex-1">
                      <p className="cf-body text-[14px] font-medium text-[#1a1a17]">{c.clinicName}</p>
                      <p className="cf-display mt-0.5 text-[14.5px] italic text-[#1a1a17]/85">&ldquo;{c.pendingNote}&rdquo;</p>
                    </div>
                    <button
                      onClick={() => approveNote(c.clinicId)}
                      className="cf-mono rounded-full bg-[#5f7a61] px-3.5 py-1.5 text-[11px] uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#4e6650]"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => {
                        const edited = prompt("Edit before approving:", c.pendingNote ?? "");
                        if (edited) approveNote(c.clinicId, edited);
                      }}
                      className="cf-mono rounded-full bg-[#1a1a17] px-3.5 py-1.5 text-[11px] uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#5f7a61]"
                    >
                      Edit &amp; approve
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* roster */}
          <div className="mt-8 overflow-x-auto rounded-2xl border border-[#1a1a17]/10 bg-white">
            <table className="w-full min-w-[860px] text-left">
              <thead>
                <tr className="cf-mono border-b border-[#1a1a17]/10 text-[10.5px] uppercase tracking-[0.14em] text-[#6e7a71]">
                  <th className="px-5 py-3 font-medium">Clinic</th>
                  <th className="px-4 py-3 font-medium">Login</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Videos</th>
                  <th className="px-4 py-3 font-medium">Last used</th>
                  <th className="px-4 py-3 font-medium">Joined</th>
                  <th className="px-4 py-3 font-medium">Tour</th>
                </tr>
              </thead>
              <tbody>
                {clinics.map((c) => (
                  <tr key={c.clinicId} className="border-b border-[#1a1a17]/[0.05] last:border-b-0">
                    <td className="px-5 py-3.5">
                      <p className="cf-body text-[14.5px] font-medium text-[#1a1a17]">{c.clinicName}</p>
                      <p className="cf-body text-[12.5px] text-[#5e6a60]">{c.contactName}</p>
                    </td>
                    <td className="cf-mono px-4 py-3.5 text-[12px] text-[#1a1a17]/75">{c.email}</td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`cf-mono rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.08em] ${
                          c.status === "active"
                            ? "bg-[#15803d]/10 text-[#15803d]"
                            : c.status === "trialing"
                              ? "bg-[#5f7a61]/10 text-[#3e5540]"
                              : "bg-[#b91c1c]/10 text-[#b91c1c]"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="cf-mono px-4 py-3.5 text-[13px] tabular-nums text-[#1a1a17]">{c.videosGenerated}</td>
                    <td className="cf-body px-4 py-3.5 text-[13px] text-[#5e6a60]">{fmt(c.lastUsedAt)}</td>
                    <td className="cf-body px-4 py-3.5 text-[13px] text-[#5e6a60]">{fmt(c.createdAt)}</td>
                    <td className="px-4 py-3.5">
                      {c.preconsultVideoUrl ? (
                        <span className="cf-mono text-[10px] uppercase tracking-[0.08em] text-[#15803d]">live</span>
                      ) : c.pendingTourUrl ? (
                        <span className="cf-mono text-[10px] uppercase tracking-[0.08em] text-[#b45309]">pending</span>
                      ) : (
                        <span className="cf-mono text-[10px] uppercase tracking-[0.08em] text-[#6e7a71]">default</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </Shell>
  );
}
