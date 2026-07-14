"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, CircleDashed, Quote, Sparkles, ThumbsUp, Lightbulb } from "lucide-react";
import { Badge, Card, CardTitle, FadeIn, PageHeader, Rise } from "@/components/ui";
import { StoryFooter } from "@/components/nav";
import { report } from "@/lib/report";

function LikelihoodRing({ score }: { score: number }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative h-[132px] w-[132px]">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" stroke="#eeede9" strokeWidth="8" />
        <motion.circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="#2a78d6"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c * (1 - score / 100) }}
          transition={{ duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.3 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[30px] font-semibold tracking-display text-ink tabular">
          {score}%
        </span>
      </div>
    </div>
  );
}

export default function Intelligence() {
  return (
    <main className="mx-auto max-w-6xl px-6 pt-14">
      <PageHeader
        eyebrow="After the consult"
        title="Consult Intelligence"
        description={`Generated ${report.generatedIn} after the consult ended. No dictation, no chart notes, no TC writeup — the conversation itself became the record.`}
        right={
          <Link
            href="/follow-up"
            className="rounded-lg bg-ink px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-black"
          >
            See the patient follow-up →
          </Link>
        }
      />

      {/* Meta strip */}
      <FadeIn delay={0.05}>
        <div className="mb-6 flex flex-wrap items-center gap-x-8 gap-y-2 rounded-xl border border-line bg-surface px-5 py-3.5 shadow-card">
          {[
            ["Patient", report.consult.patient],
            ["Provider", report.consult.provider],
            ["When", report.consult.date],
            ["Duration", report.consult.duration],
            ["Type", report.consult.type],
          ].map(([k, v]) => (
            <div key={k}>
              <p className="text-[10.5px] font-semibold uppercase tracking-wider text-ink-faint">
                {k}
              </p>
              <p className="text-[13px] font-medium text-ink">{v}</p>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* Likelihood + summary */}
      <div className="mb-6 grid gap-6 lg:grid-cols-5">
        <Rise className="lg:col-span-2">
          <Card className="h-full">
            <CardTitle right={<Badge tone="good">{report.likelihood.band}</Badge>}>
              Likelihood to convert
            </CardTitle>
            <div className="flex items-center gap-6">
              <LikelihoodRing score={report.likelihood.score} />
              <div className="flex-1 space-y-2">
                {report.likelihood.factors.map((f) => (
                  <div key={f.label} className="flex items-center justify-between gap-3">
                    <p className="text-[12px] leading-snug text-ink-secondary">{f.label}</p>
                    <span
                      className={`shrink-0 text-[12px] font-semibold tabular ${
                        f.positive ? "text-goodtext" : "text-[#b34515]"
                      }`}
                    >
                      {f.impact}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </Rise>
        <Rise delay={0.08} className="lg:col-span-3">
          <Card className="h-full">
            <CardTitle
              right={<Sparkles className="h-4 w-4 text-ink-faint" strokeWidth={1.75} />}
            >
              Summary
            </CardTitle>
            <p className="text-[14.5px] leading-[1.75] text-ink">{report.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge tone="accent">Records appointment: verbal yes</Badge>
              <Badge tone="warm">Open risk: spouse approval</Badge>
              <Badge tone="neutral">Deadline: June 2027</Badge>
            </div>
          </Card>
        </Rise>
      </div>

      {/* Goals / questions / drivers */}
      <div className="mb-6 grid gap-6 md:grid-cols-3">
        <Rise>
          <Card className="h-full">
            <CardTitle>Goals</CardTitle>
            <ul className="space-y-3">
              {report.goals.map((g) => (
                <li key={g} className="flex items-start gap-2.5">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <p className="text-[13px] leading-relaxed text-ink">{g}</p>
                </li>
              ))}
            </ul>
          </Card>
        </Rise>
        <Rise delay={0.06}>
          <Card className="h-full">
            <CardTitle>Questions asked</CardTitle>
            <ul className="space-y-3">
              {report.questions.map((q) => (
                <li key={q.q} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#f0f9f0]">
                    <Check className="h-2.5 w-2.5 text-goodtext" strokeWidth={3} />
                  </span>
                  <p className="text-[13px] leading-relaxed text-ink">{q.q}</p>
                </li>
              ))}
            </ul>
          </Card>
        </Rise>
        <Rise delay={0.12}>
          <Card className="h-full">
            <CardTitle>Decision drivers</CardTitle>
            <div className="space-y-3">
              {report.drivers.map((d) => (
                <div key={d.label}>
                  <p className="text-[13px] font-medium text-ink">{d.label}</p>
                  <p className="text-[12px] leading-relaxed text-ink-secondary">
                    {d.detail}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </Rise>
      </div>

      {/* Objections */}
      <Rise className="mb-6">
        <Card>
          <CardTitle right={<Badge tone="neutral">2 resolved · 1 open</Badge>}>
            Objections
          </CardTitle>
          <div className="grid gap-3 md:grid-cols-3">
            {report.objections.map((o) => (
              <div
                key={o.text}
                className={`rounded-lg border p-4 ${
                  o.status === "Open"
                    ? "border-[#f6d8ca] bg-[#fdf3ee]"
                    : "border-line bg-surface-page"
                }`}
              >
                <div className="mb-2 flex items-center gap-2">
                  {o.status === "Open" ? (
                    <CircleDashed className="h-3.5 w-3.5 text-[#b34515]" strokeWidth={2} />
                  ) : (
                    <Check className="h-3.5 w-3.5 text-goodtext" strokeWidth={2.5} />
                  )}
                  <span
                    className={`text-[11px] font-bold uppercase tracking-wide ${
                      o.status === "Open" ? "text-[#b34515]" : "text-goodtext"
                    }`}
                  >
                    {o.status}
                  </span>
                </div>
                <p className="text-[13.5px] font-medium leading-snug text-ink">{o.text}</p>
                <p className="mt-2 text-[12px] leading-relaxed text-ink-secondary">{o.how}</p>
              </div>
            ))}
          </div>
        </Card>
      </Rise>

      {/* Treatment / financing / timeline */}
      <div className="mb-6 grid gap-6 md:grid-cols-3">
        <Rise>
          <Card className="h-full">
            <CardTitle>Treatment discussed</CardTitle>
            <p className="text-[13.5px] font-medium text-ink">{report.treatment.primary}</p>
            <ul className="mt-3 space-y-2">
              {report.treatment.discussed.map((t) => (
                <li key={t} className="flex items-start gap-2.5">
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-ink-faint" />
                  <p className="text-[12.5px] leading-relaxed text-ink-secondary">{t}</p>
                </li>
              ))}
            </ul>
          </Card>
        </Rise>
        <Rise delay={0.06}>
          <Card className="h-full">
            <CardTitle>Financing discussed</CardTitle>
            <div className="space-y-2.5">
              <div className="rounded-lg border border-accent-border bg-accent-wash p-3">
                <p className="text-[16px] font-semibold tracking-display text-ink tabular">
                  {report.financing.presented}
                </p>
                <p className="mt-0.5 text-[12px] text-ink-secondary">
                  {report.financing.quoted} · {report.financing.insurance}
                </p>
              </div>
              <p className="text-[12.5px] leading-relaxed text-ink-secondary">
                {report.financing.note}
              </p>
            </div>
          </Card>
        </Rise>
        <Rise delay={0.12}>
          <Card className="h-full">
            <CardTitle>Timeline</CardTitle>
            <div className="space-y-3">
              {report.timeline.map((t, i) => (
                <div key={t.label} className="flex items-start gap-3">
                  <span
                    className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                      i === report.timeline.length - 1 ? "bg-accent" : "bg-ink-faint"
                    }`}
                  />
                  <div>
                    <p className="text-[13px] font-medium text-ink">{t.label}</p>
                    <p className="text-[12px] text-ink-secondary">{t.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Rise>
      </div>

      {/* Highlights */}
      <Rise className="mb-6">
        <Card>
          <CardTitle right={<Quote className="h-4 w-4 text-ink-faint" strokeWidth={1.75} />}>
            Conversation highlights
          </CardTitle>
          <div className="grid gap-3 md:grid-cols-2">
            {report.highlights.map((h) => (
              <div key={h.t} className="rounded-lg border border-line bg-surface-page p-4">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-[14px] font-medium leading-relaxed text-ink">
                    “{h.quote}”
                  </p>
                  <span className="shrink-0 rounded-md bg-surface px-1.5 py-0.5 text-[11px] font-semibold text-accent-deep tabular">
                    {h.t}
                  </span>
                </div>
                <p className="mt-2 text-[12px] leading-relaxed text-ink-muted">{h.why}</p>
              </div>
            ))}
          </div>
        </Card>
      </Rise>

      {/* Follow-up + coaching */}
      <div className="grid gap-6 md:grid-cols-2">
        <Rise>
          <Card className="h-full">
            <CardTitle right={<Badge tone="accent">3 automated · 1 human</Badge>}>
              Suggested follow-up
            </CardTitle>
            <div className="space-y-3">
              {report.followUp.map((f) => (
                <div
                  key={f.what}
                  className="flex items-start justify-between gap-3 rounded-lg border border-line bg-surface-page p-3"
                >
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
                      {f.when}
                    </p>
                    <p className="mt-0.5 text-[13px] leading-snug text-ink">{f.what}</p>
                  </div>
                  <Badge tone={f.auto ? "neutral" : "warm"}>
                    {f.auto ? "Auto" : "Maya (TC)"}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </Rise>
        <Rise delay={0.08}>
          <Card className="h-full">
            <CardTitle>Clinician coaching</CardTitle>
            <div className="space-y-4">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <ThumbsUp className="h-3.5 w-3.5 text-goodtext" strokeWidth={2} />
                  <p className="text-[12px] font-semibold text-goodtext">What worked</p>
                </div>
                <ul className="space-y-2">
                  {report.coaching.wins.map((w) => (
                    <li key={w} className="flex items-start gap-2.5">
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-good" />
                      <p className="text-[12.5px] leading-relaxed text-ink">{w}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-line pt-4">
                <div className="mb-2 flex items-center gap-2">
                  <Lightbulb className="h-3.5 w-3.5 text-[#b34515]" strokeWidth={2} />
                  <p className="text-[12px] font-semibold text-[#b34515]">
                    Opportunities
                  </p>
                </div>
                <ul className="space-y-2">
                  {report.coaching.opportunities.map((o) => (
                    <li key={o} className="flex items-start gap-2.5">
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-warm" />
                      <p className="text-[12.5px] leading-relaxed text-ink">{o}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </Rise>
      </div>

      <StoryFooter current="/intelligence" />
    </main>
  );
}
