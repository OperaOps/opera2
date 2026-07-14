"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Play, Pause, RotateCcw, ArrowRight } from "lucide-react";
import { Badge, FadeIn } from "@/components/ui";
import { StoryFooter } from "@/components/nav";
import { DURATION, events, fmtTime, lines, type InsightEvent } from "@/lib/transcript";

const SPEEDS = [1, 1.5, 2];

function useConsultClock() {
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setTime((t) => {
        const next = t + 0.1 * speed;
        if (next >= DURATION) {
          setPlaying(false);
          return DURATION;
        }
        return next;
      });
    }, 100);
    return () => clearInterval(id);
  }, [playing, speed]);

  return {
    time,
    playing,
    speed,
    setSpeed,
    toggle: () => setPlaying((p) => (time >= DURATION ? p : !p)),
    restart: () => {
      setTime(0);
      setPlaying(true);
    },
    seek: (t: number) => setTime(t),
    start: () => setPlaying(true),
    done: time >= DURATION,
  };
}

function itemEnter(i = 0) {
  return {
    initial: { opacity: 0, y: 10, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, scale: 0.98 },
    transition: { duration: 0.35, delay: i * 0.02, ease: [0.21, 0.47, 0.32, 0.98] as const },
  };
}

function RailSection({
  title,
  count,
  children,
  empty,
}: {
  title: string;
  count: number;
  children: React.ReactNode;
  empty: string;
}) {
  return (
    <section className="border-b border-line px-4 py-3.5 last:border-b-0">
      <div className="mb-2.5 flex items-center justify-between">
        <h4 className="text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-muted">
          {title}
        </h4>
        {count > 0 && (
          <span className="rounded-full bg-surface-sunken px-1.5 py-0.5 text-[10px] font-semibold text-ink-secondary tabular">
            {count}
          </span>
        )}
      </div>
      {count === 0 ? (
        <p className="text-[12px] italic text-ink-faint">{empty}</p>
      ) : (
        <div className="space-y-2">{children}</div>
      )}
    </section>
  );
}

const toneStyles = {
  positive: "border-[#cdeacd] bg-[#f0f9f0] text-goodtext",
  caution: "border-[#f6d8ca] bg-[#fdf3ee] text-[#b34515]",
  neutral: "border-line bg-surface-sunken text-ink-secondary",
};

export default function Live() {
  const clock = useConsultClock();
  const { time, playing, done } = clock;
  const scrollRef = useRef<HTMLDivElement>(null);

  const visibleLines = useMemo(
    () => (time > 0 ? lines.filter((l) => l.t <= time) : []),
    [time]
  );
  const fired = useMemo(() => events.filter((e) => e.t <= time), [time]);

  const pick = <K extends InsightEvent["kind"]>(kind: K) =>
    fired.filter((e) => e.kind === kind) as Extract<InsightEvent, { kind: K }>[];

  const goals = pick("goal");
  const concerns = pick("concern");
  const objections = pick("objection");
  const signals = pick("signal");
  const emotions = pick("emotion");
  const talkingPoints = pick("talkingPoint");
  const visuals = pick("visual");
  const financing = pick("financing");
  const cases = pick("case");
  const emotion = emotions[emotions.length - 1];

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [visibleLines.length]);

  const started = time > 0;

  return (
    <main className="mx-auto max-w-[1400px] px-6 pt-10">
      <FadeIn className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-accent">
            During the consult
          </p>
          <h1 className="text-[26px] font-semibold tracking-display text-ink">
            Live Consultation
          </h1>
          <p className="mt-1 text-[14px] text-ink-secondary">
            Sarah Mitchell · Dr. Lauren Park · Consult Room 2 — Opera listens
            ambiently and updates both panels as the conversation happens.
          </p>
        </div>
        <Badge tone="neutral">Simulated consult · 3 min compressed</Badge>
      </FadeIn>

      {/* Controls */}
      <FadeIn delay={0.05}>
        <div className="mb-4 flex items-center gap-4 rounded-xl border border-line bg-surface p-3 shadow-card">
          <div className="flex items-center gap-1.5">
            <button
              onClick={done ? clock.restart : clock.toggle}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink text-white transition-colors hover:bg-black"
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? (
                <Pause className="h-4 w-4" strokeWidth={2} />
              ) : (
                <Play className="ml-0.5 h-4 w-4" strokeWidth={2} />
              )}
            </button>
            <button
              onClick={clock.restart}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-ink-secondary transition-colors hover:border-line-strong hover:text-ink"
              aria-label="Restart"
            >
              <RotateCcw className="h-3.5 w-3.5" strokeWidth={2} />
            </button>
          </div>

          <span className="w-12 text-[13px] font-medium text-ink tabular">
            {fmtTime(time)}
          </span>

          <input
            type="range"
            min={0}
            max={DURATION}
            step={0.1}
            value={time}
            onChange={(e) => clock.seek(Number(e.target.value))}
            className="h-1 flex-1 cursor-pointer appearance-none rounded-full accent-[#2a78d6]"
            style={{
              background: `linear-gradient(to right, #2a78d6 ${(time / DURATION) * 100}%, #ececea ${(time / DURATION) * 100}%)`,
            }}
            aria-label="Seek"
          />

          <span className="text-[13px] text-ink-muted tabular">
            {fmtTime(DURATION)}
          </span>

          <div className="flex items-center gap-0.5 rounded-lg border border-line p-0.5">
            {SPEEDS.map((s) => (
              <button
                key={s}
                onClick={() => clock.setSpeed(s)}
                className={`rounded-md px-2 py-1 text-[12px] font-medium tabular transition-colors ${
                  clock.speed === s
                    ? "bg-ink text-white"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {s}×
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <span
              className={`h-2 w-2 rounded-full ${
                playing ? "animate-pulse bg-good" : done ? "bg-accent" : "bg-ink-faint"
              }`}
            />
            <span className="text-[12px] font-medium text-ink-secondary">
              {playing ? "Listening" : done ? "Complete" : started ? "Paused" : "Ready"}
            </span>
          </div>
        </div>
      </FadeIn>

      {/* Done banner */}
      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mb-4 flex items-center justify-between rounded-xl border border-accent-border bg-accent-wash px-5 py-4">
              <div>
                <p className="text-[14px] font-semibold text-ink">
                  Consult complete — intelligence generated.
                </p>
                <p className="text-[13px] text-ink-secondary">
                  Opera structured the full conversation in 9 seconds: 3 goals, 3
                  objections, 6 buying signals, 78% conversion likelihood.
                </p>
              </div>
              <Link
                href="/intelligence"
                className="flex shrink-0 items-center gap-2 rounded-lg bg-ink px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-black"
              >
                View Consult Intelligence
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-4 lg:grid-cols-12">
        {/* Transcript */}
        <div className="lg:col-span-5">
          <div className="flex h-[640px] flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-card">
            <div className="flex items-center justify-between border-b border-line bg-surface-page px-4 py-2.5">
              <h3 className="text-[12px] font-semibold uppercase tracking-[0.07em] text-ink-muted">
                Transcript
              </h3>
              <div className="flex items-center gap-1.5">
                <span className={`h-1.5 w-1.5 rounded-full ${playing ? "animate-pulse bg-good" : "bg-ink-faint"}`} />
                <span className="text-[11px] text-ink-muted">
                  {playing ? "Transcribing live" : "Idle"}
                </span>
              </div>
            </div>
            <div ref={scrollRef} className="thin-scroll flex-1 space-y-3 overflow-y-auto p-4">
              {!started && (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <button
                    onClick={clock.start}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-ink text-white shadow-raised transition-transform hover:scale-105"
                    aria-label="Play consult"
                  >
                    <Play className="ml-1 h-5 w-5" />
                  </button>
                  <p className="mt-4 text-[14px] font-medium text-ink">
                    Press play to start the consult
                  </p>
                  <p className="mt-1 max-w-[260px] text-[12.5px] text-ink-muted">
                    The transcript streams in and Opera's analysis builds in
                    real time on the right.
                  </p>
                </div>
              )}
              <AnimatePresence initial={false}>
                {visibleLines.map((line, i) => {
                  const isLast = i === visibleLines.length - 1;
                  const dr = line.speaker === "dr";
                  return (
                    <motion.div key={line.t} {...itemEnter()} layout="position">
                      <div
                        className={`rounded-lg border p-3 transition-colors ${
                          isLast && playing
                            ? "border-accent-border bg-accent-wash"
                            : "border-line bg-surface"
                        }`}
                      >
                        <div className="mb-1 flex items-center justify-between">
                          <span
                            className={`text-[11px] font-semibold ${
                              dr ? "text-accent-deep" : "text-ink"
                            }`}
                          >
                            {dr ? "Dr. Park" : "Sarah M."}
                          </span>
                          <span className="text-[10.5px] text-ink-faint tabular">
                            {fmtTime(line.t)}
                          </span>
                        </div>
                        <p className="text-[13.5px] leading-relaxed text-ink">
                          {line.text}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Understanding rail */}
        <div className="lg:col-span-3">
          <div className="flex h-[640px] flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-card">
            <div className="border-b border-line bg-surface-page px-4 py-2.5">
              <h3 className="text-[12px] font-semibold uppercase tracking-[0.07em] text-ink-muted">
                Patient understanding
              </h3>
            </div>
            <div className="thin-scroll flex-1 overflow-y-auto">
              {/* Emotion */}
              <section className="border-b border-line px-4 py-3.5">
                <h4 className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-muted">
                  Emotion
                </h4>
                {emotion ? (
                  <div className="flex items-center justify-between">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={emotion.state}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className={`rounded-full border px-2.5 py-1 text-[12px] font-semibold ${toneStyles[emotion.tone]}`}
                      >
                        {emotion.state}
                      </motion.span>
                    </AnimatePresence>
                    <div className="flex gap-1">
                      {emotions.map((e, i) => (
                        <span
                          key={i}
                          title={e.state}
                          className={`h-1.5 w-1.5 rounded-full ${
                            e.tone === "positive"
                              ? "bg-good"
                              : e.tone === "caution"
                                ? "bg-warm"
                                : "bg-ink-faint"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-[12px] italic text-ink-faint">Listening…</p>
                )}
              </section>

              <RailSection title="Patient goals" count={goals.length} empty="No goals detected yet">
                <AnimatePresence initial={false}>
                  {[...goals].reverse().map((g) => (
                    <motion.div key={g.text} {...itemEnter()} layout="position"
                      className="rounded-lg border border-line bg-surface-page p-2.5">
                      <p className="text-[12.5px] font-medium leading-snug text-ink">{g.text}</p>
                      {g.note && <p className="mt-0.5 text-[11.5px] text-ink-muted">{g.note}</p>}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </RailSection>

              <RailSection title="Current concerns" count={concerns.length} empty="No concerns yet">
                <AnimatePresence initial={false}>
                  {[...concerns].reverse().map((c) => (
                    <motion.div key={c.text} {...itemEnter()} layout="position"
                      className="rounded-lg border border-line bg-surface-page p-2.5">
                      <p className="text-[12.5px] leading-snug text-ink">{c.text}</p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </RailSection>

              <RailSection title="Detected objections" count={objections.length} empty="No objections yet">
                <AnimatePresence initial={false}>
                  {[...objections].reverse().map((o) => (
                    <motion.div key={o.text} {...itemEnter()} layout="position"
                      className="rounded-lg border border-[#f6d8ca] bg-[#fdf3ee] p-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-[12.5px] font-medium leading-snug text-ink">{o.text}</p>
                        <span className={`shrink-0 rounded-full px-1.5 py-0.5 text-[9.5px] font-bold uppercase tracking-wide ${
                          o.severity === "high" ? "bg-[#f4c9b4] text-[#8a3410]" : "bg-surface text-ink-muted"
                        }`}>
                          {o.severity}
                        </span>
                      </div>
                      <p className="mt-1 text-[11.5px] leading-snug text-[#b34515]">{o.note}</p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </RailSection>

              <RailSection title="Buying signals" count={signals.length} empty="No signals yet">
                <AnimatePresence initial={false}>
                  {[...signals].reverse().map((s) => (
                    <motion.div key={s.text} {...itemEnter()} layout="position"
                      className="rounded-lg border border-[#cdeacd] bg-[#f0f9f0] p-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-[12.5px] leading-snug text-ink">{s.text}</p>
                        {s.strength === "strong" && (
                          <span className="shrink-0 rounded-full bg-[#c4e8c4] px-1.5 py-0.5 text-[9.5px] font-bold uppercase tracking-wide text-goodtext">
                            Strong
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </RailSection>
            </div>
          </div>
        </div>

        {/* Copilot rail */}
        <div className="lg:col-span-4">
          <div className="flex h-[640px] flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-card">
            <div className="flex items-center justify-between border-b border-line bg-surface-page px-4 py-2.5">
              <h3 className="text-[12px] font-semibold uppercase tracking-[0.07em] text-ink-muted">
                Copilot recommendations
              </h3>
              <Badge tone="accent">For Dr. Park</Badge>
            </div>
            <div className="thin-scroll flex-1 overflow-y-auto">
              <RailSection title="Talking points" count={talkingPoints.length} empty="Recommendations appear as the conversation develops">
                <AnimatePresence initial={false}>
                  {[...talkingPoints].reverse().map((t) => (
                    <motion.div key={t.text} {...itemEnter()} layout="position"
                      className="flex items-start gap-2.5 rounded-lg border border-line bg-surface-page p-2.5">
                      <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <div>
                        <p className="text-[12.5px] font-medium leading-snug text-ink">{t.text}</p>
                        {t.note && <p className="mt-0.5 text-[11.5px] text-ink-muted">{t.note}</p>}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </RailSection>

              <RailSection title="Recommended visuals" count={visuals.length} empty="Opera suggests the right visual at the right moment">
                <AnimatePresence initial={false}>
                  {[...visuals].reverse().map((v) => (
                    <motion.div key={v.title} {...itemEnter()} layout="position"
                      className="overflow-hidden rounded-lg border border-line">
                      <video
                        src={v.video}
                        muted
                        loop
                        autoPlay
                        playsInline
                        className="aspect-video w-full bg-surface-sunken object-cover"
                      />
                      <div className="bg-surface p-2.5">
                        <p className="text-[12.5px] font-medium text-ink">{v.title}</p>
                        <p className="mt-0.5 text-[11.5px] text-ink-muted">{v.note}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </RailSection>

              <RailSection title="Recommended financing" count={financing.length} empty="Financing guidance appears when cost enters the conversation">
                <AnimatePresence initial={false}>
                  {[...financing].reverse().map((f) => (
                    <motion.div key={f.title} {...itemEnter()} layout="position"
                      className="rounded-lg border border-accent-border bg-accent-wash p-3">
                      <p className="text-[12.5px] font-semibold text-ink">{f.title}</p>
                      <p className="mt-1 text-[12px] leading-relaxed text-ink-secondary">{f.detail}</p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </RailSection>

              <RailSection title="Before / after cases" count={cases.length} empty="Matched cases surface when outcome proof would help">
                <AnimatePresence initial={false}>
                  {[...cases].reverse().map((c) => (
                    <motion.div key={c.title} {...itemEnter()} layout="position"
                      className="overflow-hidden rounded-lg border border-line">
                      <video
                        src={c.video}
                        muted
                        loop
                        autoPlay
                        playsInline
                        className="aspect-video w-full bg-surface-sunken object-cover"
                      />
                      <div className="bg-surface p-2.5">
                        <p className="text-[12.5px] font-medium text-ink">{c.title}</p>
                        <p className="mt-0.5 text-[11.5px] text-ink-muted">{c.detail}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </RailSection>
            </div>
          </div>
        </div>
      </div>

      <StoryFooter current="/live" />
    </main>
  );
}
