"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Play,
  Send,
  Link2,
  Check,
  Users,
  Clock,
  MessageSquare,
} from "lucide-react";
import { Badge, Card, CardTitle, FadeIn, PageHeader, Rise } from "@/components/ui";
import { StoryFooter } from "@/components/nav";

const chapters = [
  { t: "0:00", title: "Hi Sarah — your journey at a glance" },
  { t: "0:18", title: "What Invisalign is (and why no one will notice)" },
  { t: "0:40", title: "What's happening with your lower teeth" },
  { t: "1:08", title: "How your treatment works" },
  { t: "1:55", title: "Your timeline — done before Emily's wedding" },
  { t: "2:18", title: "A patient just like you, finished in 11 months" },
  { t: "2:48", title: "Next steps — records visit & recap for Mark" },
];

const recap = [
  "You're a strong candidate for Invisalign — moderate lower crowding, mild overbite.",
  "Treatment runs 10–12 months. Starting by late August finishes comfortably before the wedding.",
  "Your plan includes every aligner, refinements if needed, and retainers. No surprise costs.",
  "Next step: a 30-minute records appointment (3D scan + photos).",
];

const journey = [
  { label: "Records visit", when: "Within 2 weeks", state: "next" },
  { label: "Start treatment", when: "Late August", state: "future" },
  { label: "Final aligners", when: "April–May 2027", state: "future" },
  { label: "The wedding", when: "June 2027", state: "goal" },
];

const questions = [
  {
    q: "Will people notice the aligners?",
    a: "Almost never. You saw them on teeth during your visit — clear, thin plastic. Most of Dr. Park's adult patients tell no one and are never asked.",
  },
  {
    q: "What if I need refinements?",
    a: "About 40% of cases get a few extra aligners at the end to perfect the result. Yours are already included in the fee — no added cost or decisions.",
  },
  {
    q: "What exactly does it cost?",
    a: "$5,800 all-in. After your $1,500 Delta Dental benefit and a $500 down payment, that's $189/month for 24 months.",
  },
];

const cadence = [
  { day: "Tonight", what: "This page + your video, sent by text and email", state: "done" },
  { day: "Saturday", what: "Gentle reminder if the recap hasn't been opened", state: "scheduled" },
  { day: "Monday", what: "Maya calls — after your weekend conversation with Mark", state: "scheduled" },
  { day: "Day 10", what: "Wedding-timeline check-in if you're still deciding", state: "scheduled" },
];

type Msg = { role: "user" | "assistant"; text: string };

const suggested = [
  "What will this cost per month?",
  "Will I be done before the wedding?",
  "What are refinements again?",
  "Can my husband see this plan?",
];

function answerFor(q: string): string {
  const s = q.toLowerCase();
  if (/(cost|price|pay|month|afford|insurance|delta)/.test(s))
    return "Dr. Park quoted $5,800 for comprehensive Invisalign. With your $1,500 Delta Dental benefit and $500 down, you'd pay $189/month for 24 months — refinements and retainers included.";
  if (/(long|time|when|wedding|done|finish|start)/.test(s))
    return "Your plan is 10–12 months. If you start by late August, you'd finish around April–May 2027 — a comfortable one-to-two-month buffer before the wedding in June.";
  if (/(refine)/.test(s))
    return "Refinements are a small set of extra aligners some patients need at the end to perfect the result — about 40% of cases. Dr. Park confirmed yours are included at no extra cost.";
  if (/(husband|mark|share|family|spouse)/.test(s))
    return "Yes — use the family sharing link on this page. Mark will see the same plan, timeline, and payment details you discussed with Dr. Park, plus this assistant to ask his own questions.";
  if (/(notice|visible|see|tell|clear)/.test(s))
    return "They're very hard to spot. During your consult you saw them on teeth and said “you really can't see them.” They're clear, thin, and removable for meetings if you ever want.";
  if (/(hurt|pain|uncomfortable|eat|food)/.test(s))
    return "Expect mild pressure for a day or two with each new aligner — most patients call it noticeable, not painful. You'll remove them to eat, so nothing is off the menu.";
  return "That's a great question — I'm grounded in your consult with Dr. Park, so I can answer anything you discussed: your plan, timeline, pricing, or next steps. For anything new, Maya can help on Monday's call.";
}

function Assistant() {
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "assistant",
      text: "Hi Sarah — I'm your consult assistant. I was in the room (digitally) for your visit with Dr. Park, so ask me anything you two discussed.",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const scroll = () =>
    setTimeout(
      () => boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight, behavior: "smooth" }),
      50
    );

  const ask = (q: string) => {
    if (!q.trim() || typing) return;
    setMsgs((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setTyping(true);
    scroll();
    setTimeout(() => {
      setMsgs((m) => [...m, { role: "assistant", text: answerFor(q) }]);
      setTyping(false);
      scroll();
    }, 900);
  };

  return (
    <Card pad={false} className="flex h-[520px] flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b border-line bg-surface-page px-4 py-3">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-ink-secondary" strokeWidth={1.75} />
          <h3 className="text-[13px] font-semibold text-ink">Ask about your consult</h3>
        </div>
        <Badge tone="accent">Grounded in your visit</Badge>
      </div>
      <div ref={boxRef} className="thin-scroll flex-1 space-y-3 overflow-y-auto p-4">
        {msgs.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                m.role === "user"
                  ? "bg-ink text-white"
                  : "border border-line bg-surface-page text-ink"
              }`}
            >
              {m.text}
            </div>
          </motion.div>
        ))}
        {typing && (
          <div className="flex justify-start">
            <div className="flex gap-1 rounded-xl border border-line bg-surface-page px-3.5 py-3">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-ink-faint"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1, delay: i * 0.18 }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="border-t border-line p-3">
        <div className="mb-2.5 flex flex-wrap gap-1.5">
          {suggested.map((s) => (
            <button
              key={s}
              onClick={() => ask(s)}
              className="rounded-full border border-line bg-surface px-2.5 py-1 text-[11.5px] text-ink-secondary transition-colors hover:border-accent-border hover:bg-accent-wash hover:text-accent-deep"
            >
              {s}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            ask(input);
          }}
          className="flex gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything from your consult…"
            className="flex-1 rounded-lg border border-line bg-surface px-3 py-2 text-[13px] text-ink outline-none placeholder:text-ink-faint focus:border-accent-border"
          />
          <button
            type="submit"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink text-white transition-colors hover:bg-black"
            aria-label="Send"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </form>
      </div>
    </Card>
  );
}

export default function FollowUp() {
  const [copied, setCopied] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoStarted, setVideoStarted] = useState(false);

  return (
    <main className="mx-auto max-w-6xl px-6 pt-14">
      <PageHeader
        eyebrow="After the consult · sent tonight at 6 PM"
        title="Sarah's follow-up, generated automatically"
        description="This is what Sarah receives by text and email two hours after leaving — a page built entirely from her own consultation. Nothing here was written by staff."
        right={
          <Link
            href="/organization"
            className="rounded-lg bg-ink px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-black"
          >
            What the org learns →
          </Link>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Patient-facing column */}
        <div className="space-y-6 lg:col-span-2">
          {/* Personalized video */}
          <FadeIn delay={0.05}>
            <Card pad={false} className="overflow-hidden">
              <div className="relative aspect-video bg-surface-sunken">
                <video
                  ref={videoRef}
                  src="/videos/sarah-followup.mp4"
                  poster="/videos/sarah-followup-poster.jpg"
                  controls={videoStarted}
                  playsInline
                  className="h-full w-full object-cover"
                  onPlay={() => setVideoStarted(true)}
                />
                {!videoStarted && (
                  <button
                    onClick={() => videoRef.current?.play()}
                    className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black/50 via-black/10 to-transparent"
                    aria-label="Play personalized video"
                  >
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-raised transition-transform hover:scale-105">
                      <Play className="ml-1 h-6 w-6 text-ink" />
                    </span>
                    <p className="mt-4 text-[15px] font-medium text-white">
                      Sarah, here's your Invisalign plan
                    </p>
                    <p className="text-[13px] text-white/80">
                      Personal video from Dr. Park · 3:08
                    </p>
                  </button>
                )}
              </div>
              <div className="p-5">
                <CardTitle right={<Badge tone="accent">Generated from her consult</Badge>}>
                  Personalized video
                </CardTitle>
                <div className="grid gap-1.5 sm:grid-cols-2">
                  {chapters.map((c) => (
                    <div
                      key={c.t}
                      className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-surface-page"
                    >
                      <span className="text-[11px] font-semibold text-accent-deep tabular">
                        {c.t}
                      </span>
                      <span className="text-[12.5px] text-ink">{c.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </FadeIn>

          {/* Recap + timeline */}
          <Rise>
            <Card>
              <CardTitle>Your consult, in plain words</CardTitle>
              <ul className="space-y-2.5">
                {recap.map((r) => (
                  <li key={r} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#f0f9f0]">
                      <Check className="h-2.5 w-2.5 text-goodtext" strokeWidth={3} />
                    </span>
                    <p className="text-[13.5px] leading-relaxed text-ink">{r}</p>
                  </li>
                ))}
              </ul>
            </Card>
          </Rise>

          <Rise>
            <Card>
              <CardTitle right={<Badge tone="neutral">Built around June 2027</Badge>}>
                Your treatment timeline
              </CardTitle>
              <div className="flex items-start">
                {journey.map((j, i) => (
                  <div key={j.label} className="flex flex-1 flex-col items-center text-center">
                    <div className="flex w-full items-center">
                      <span className={`h-px flex-1 ${i === 0 ? "bg-transparent" : "bg-line-strong"}`} />
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold tabular ${
                          j.state === "next"
                            ? "border-accent bg-accent text-white"
                            : j.state === "goal"
                              ? "border-[#cdeacd] bg-[#f0f9f0] text-goodtext"
                              : "border-line bg-surface text-ink-muted"
                        }`}
                      >
                        {j.state === "goal" ? "♥" : i + 1}
                      </span>
                      <span className={`h-px flex-1 ${i === journey.length - 1 ? "bg-transparent" : "bg-line-strong"}`} />
                    </div>
                    <p className="mt-2.5 text-[12.5px] font-medium text-ink">{j.label}</p>
                    <p className="text-[11.5px] text-ink-muted">{j.when}</p>
                  </div>
                ))}
              </div>
            </Card>
          </Rise>

          {/* Questions + financing */}
          <div className="grid gap-6 md:grid-cols-2">
            <Rise>
              <Card className="h-full">
                <CardTitle>Questions you asked</CardTitle>
                <div className="space-y-4">
                  {questions.map((q) => (
                    <div key={q.q}>
                      <p className="text-[13px] font-medium text-ink">“{q.q}”</p>
                      <p className="mt-1 text-[12.5px] leading-relaxed text-ink-secondary">
                        {q.a}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </Rise>
            <Rise delay={0.06}>
              <Card className="h-full">
                <CardTitle>Your investment</CardTitle>
                <div className="rounded-lg border border-accent-border bg-accent-wash p-4">
                  <p className="text-[28px] font-semibold tracking-display text-ink tabular">
                    $189<span className="text-[15px] font-medium text-ink-secondary">/month</span>
                  </p>
                  <p className="mt-1 text-[12.5px] text-ink-secondary">
                    24 months · $500 down · after your $1,500 Delta Dental benefit
                  </p>
                </div>
                <ul className="mt-4 space-y-2">
                  {[
                    "Every aligner, start to finish",
                    "Refinements included if needed",
                    "Retainers included at completion",
                    "0% interest — no financing fees",
                  ].map((t) => (
                    <li key={t} className="flex items-center gap-2.5">
                      <Check className="h-3.5 w-3.5 shrink-0 text-goodtext" strokeWidth={2.5} />
                      <p className="text-[13px] text-ink">{t}</p>
                    </li>
                  ))}
                </ul>
              </Card>
            </Rise>
          </div>
        </div>

        {/* Right rail */}
        <div className="space-y-6">
          {/* Family sharing */}
          <Rise delay={0.05}>
            <Card>
              <CardTitle
                right={<Users className="h-4 w-4 text-ink-faint" strokeWidth={1.75} />}
              >
                Family sharing
              </CardTitle>
              <p className="text-[13px] leading-relaxed text-ink-secondary">
                Sarah said she'd talk it over with Mark. Instead of a
                secondhand summary, he gets the same page — plan, pricing,
                timeline, and his own assistant.
              </p>
              <button
                onClick={() => {
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="mt-4 flex w-full items-center justify-between rounded-lg border border-line bg-surface-page px-3.5 py-2.5 text-left transition-colors hover:border-line-strong"
              >
                <span className="flex items-center gap-2 text-[12.5px] text-ink-secondary">
                  <Link2 className="h-3.5 w-3.5" />
                  opera.care/s/sarah-m-x7k2
                </span>
                <span className={`text-[12px] font-semibold ${copied ? "text-goodtext" : "text-accent-deep"}`}>
                  {copied ? "Copied ✓" : "Copy link"}
                </span>
              </button>
              <div className="mt-3 rounded-lg border border-line bg-surface-page p-3">
                <p className="text-[11.5px] leading-snug text-ink-muted">
                  Opera tracks link opens. Patients matching Sarah's pattern who
                  shared with a spouse decided <span className="font-semibold text-ink">6 days later</span> —
                  but accepted at the same rate. Monday's call is timed for that.
                </p>
              </div>
            </Card>
          </Rise>

          {/* AI assistant */}
          <Rise delay={0.1}>
            <Assistant />
          </Rise>

          {/* Cadence */}
          <Rise delay={0.15}>
            <Card>
              <CardTitle
                right={<Clock className="h-4 w-4 text-ink-faint" strokeWidth={1.75} />}
              >
                Follow-up cadence
              </CardTitle>
              <div className="space-y-0">
                {cadence.map((c, i) => (
                  <div key={c.day} className="flex gap-3 pb-4 last:pb-0">
                    <div className="flex flex-col items-center">
                      <span
                        className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                          c.state === "done" ? "bg-good" : "bg-ink-faint"
                        }`}
                      />
                      {i < cadence.length - 1 && <span className="mt-1 w-px flex-1 bg-line" />}
                    </div>
                    <div className="pb-1">
                      <div className="flex items-center gap-2">
                        <p className="text-[12px] font-semibold uppercase tracking-wider text-ink-muted">
                          {c.day}
                        </p>
                        {c.state === "done" && <Badge tone="good">Sent</Badge>}
                      </div>
                      <p className="mt-0.5 text-[13px] leading-snug text-ink">{c.what}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 border-t border-line pt-3 text-[11.5px] leading-snug text-ink-muted">
                Cadence adapts automatically — if Mark opens the sharing link
                Saturday, Monday's call prep updates for Maya.
              </p>
            </Card>
          </Rise>
        </div>
      </div>

      <StoryFooter current="/follow-up" />
    </main>
  );
}
