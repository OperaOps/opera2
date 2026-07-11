"use client";

/**
 * Ask Opera — the patient assistant bar that lives under the video.
 * Tap-first (suggested question chips + action tiles), typing supported.
 * Answers render inline as calm cards — deliberately NOT a chat window.
 */

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUp,
  Sparkles,
  FileText,
  ShieldCheck,
  CalendarDays,
  Share2,
  CalendarPlus,
  MessageCircle,
  Loader2,
} from "lucide-react";

interface Exchange {
  q: string;
  a: string;
  followUps?: string[];
}

export function AskOpera({
  shareId,
  patientFirstName,
  clinicName,
  provider,
  suggestions,
}: {
  shareId: string;
  patientFirstName: string;
  clinicName: string;
  provider?: string;
  suggestions: string[];
}) {
  const [input, setInput] = useState("");
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const [pending, setPending] = useState<string | null>(null);
  const [shared, setShared] = useState(false);
  const answersRef = useRef<HTMLDivElement>(null);

  const ask = async (question: string) => {
    const q = question.trim();
    if (!q || pending) return;
    setInput("");
    setPending(q);
    // small delay lets the pending card mount before we scroll to it
    setTimeout(() => answersRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 80);
    try {
      // exchanges are stored newest-first for display; the model needs them oldest-first
      const history = [...exchanges].reverse().flatMap((e) => [
        { role: "user" as const, content: e.q },
        { role: "assistant" as const, content: e.a },
      ]);
      const res = await fetch("/api/v/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: shareId, question: q, history }),
      });
      const data = await res.json();
      const a: string = res.ok && data.answer
        ? data.answer
        : `I couldn't answer that just now — the team at ${clinicName} is always happy to help if it's urgent.`;
      const followUps: string[] = res.ok && Array.isArray(data.followUps) ? data.followUps : [];
      setExchanges((prev) => [{ q, a, followUps }, ...prev]);
    } catch {
      setExchanges((prev) => [
        { q, a: `I couldn't answer that just now — please try again in a moment.` },
        ...prev,
      ]);
    } finally {
      setPending(null);
    }
  };

  const shareLink = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: `${patientFirstName}'s treatment video`, url });
      } else {
        await navigator.clipboard.writeText(url);
        setShared(true);
        setTimeout(() => setShared(false), 2200);
      }
    } catch {
      /* user dismissed share sheet */
    }
  };

  const tiles = [
    {
      icon: FileText,
      label: "Treatment Summary",
      onClick: () => ask("Give me a short, simple summary of my treatment plan and what happens next."),
    },
    {
      icon: ShieldCheck,
      label: "Insurance Estimate",
      onClick: () => ask("How does insurance usually work for my treatment, and what should I ask my office about coverage?"),
    },
    {
      icon: CalendarDays,
      label: "Next Appointment",
      onClick: () => ask("What happens at my next appointment, and how should I prepare?"),
    },
    {
      icon: Share2,
      label: shared ? "Link copied!" : "Share with Family",
      onClick: shareLink,
    },
    {
      icon: CalendarPlus,
      label: "Schedule Treatment",
      onClick: () => ask(`How do I schedule my treatment with ${clinicName}, and how soon should I book?`),
    },
    {
      icon: MessageCircle,
      label: "Message Office",
      onClick: () => ask(`What's the best way to reach ${provider ? provider + "'s" : "my"} office with a question?`),
    },
  ];

  return (
    <div className="mx-auto w-full max-w-3xl">
      {/* Need anything else? */}
      <h2 className="text-center text-[17px] font-semibold text-gray-900">
        Need anything else, {patientFirstName}?
      </h2>

      {/* Input bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          ask(input);
        }}
        className="mx-auto mt-4 flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-2.5 shadow-[0_6px_28px_rgba(88,28,135,0.08)] transition-shadow focus-within:border-purple-300 focus-within:shadow-[0_6px_32px_rgba(88,28,135,0.14)]"
      >
        <Sparkles className="h-4 w-4 shrink-0 text-purple-500" />
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about my treatment..."
          maxLength={600}
          className="min-w-0 flex-1 bg-transparent text-[15px] text-gray-900 outline-none placeholder:text-gray-400"
        />
        <button
          type="submit"
          disabled={!input.trim() || !!pending}
          aria-label="Ask"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-violet-500 text-white transition-opacity disabled:opacity-30"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      </form>

      {/* Suggested questions — tap-first */}
      <p className="mt-5 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-400">
        Suggested questions
      </p>
      <div className="mt-2.5 flex flex-wrap justify-center gap-2">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => ask(s)}
            disabled={!!pending}
            className="rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-[13px] text-gray-600 transition-colors hover:border-purple-300 hover:bg-purple-50 hover:text-purple-800 disabled:opacity-50"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Inline answers — calm cards, newest on top */}
      <div ref={answersRef} className="mt-6 space-y-3">
        <AnimatePresence initial={false}>
          {pending && (
            <motion.div
              key="pending"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-purple-100 bg-purple-50/50 px-5 py-4"
            >
              <p className="text-[12.5px] font-semibold text-purple-800">{pending}</p>
              <p className="mt-2 inline-flex items-center gap-2 text-[13.5px] text-gray-400">
                <Loader2 className="h-3.5 w-3.5 animate-spin text-purple-500" />
                Opera is thinking…
              </p>
            </motion.div>
          )}
          {exchanges.map((e, i) => (
            <motion.div
              key={exchanges.length - i}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-purple-100 bg-purple-50/50 px-5 py-4"
            >
              <p className="text-[12.5px] font-semibold text-purple-800">{e.q}</p>
              <p className="mt-1.5 whitespace-pre-line text-[14.5px] leading-relaxed text-gray-700">
                {e.a}
              </p>
              {e.followUps && e.followUps.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {e.followUps.map((f) => (
                    <button
                      key={f}
                      onClick={() => ask(f)}
                      disabled={!!pending}
                      className="rounded-full border border-purple-200 bg-white px-3 py-1 text-[12px] text-purple-700 transition-colors hover:border-purple-400 hover:bg-purple-50 disabled:opacity-50"
                    >
                      {f}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Action tiles */}
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {tiles.map((t) => (
          <button
            key={t.label}
            onClick={t.onClick}
            disabled={!!pending && t.label !== "Share with Family" && t.label !== "Link copied!"}
            className="group flex flex-col items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-4 text-center transition-all hover:-translate-y-0.5 hover:border-purple-300 hover:shadow-[0_10px_30px_rgba(88,28,135,0.10)] disabled:opacity-60"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-600 transition-colors group-hover:bg-purple-100">
              <t.icon className="h-[18px] w-[18px]" />
            </span>
            <span className="text-[12.5px] font-medium leading-tight text-gray-700">{t.label}</span>
          </button>
        ))}
      </div>

      <p className="mt-6 text-center text-[11px] leading-relaxed text-gray-400">
        Opera answers general questions about your treatment for education only — for medical
        advice, {provider ? `${provider}'s` : "your"} team at {clinicName} is always the right call.
      </p>
    </div>
  );
}
