"use client";

import Link from "next/link";
import {
  Card,
  CardTitle,
  PageHeader,
  Badge,
  FadeIn,
  Rise,
  Meter,
} from "@/components/ui";
import { StoryFooter } from "@/components/nav";
import { patient } from "@/lib/patient";
import {
  Target,
  AlertCircle,
  Wallet,
  MessageCircleQuestion,
  Route,
  Clock,
} from "lucide-react";

export default function PreConsult() {
  return (
    <main className="mx-auto max-w-6xl px-6 pt-14">
      <PageHeader
        eyebrow="Before the consult"
        title="Pre-Consult Intelligence"
        description="Fifteen minutes before Sarah walks in, Dr. Park reads this. Everything below was assembled automatically from intake, records, and portal questions — zero staff time."
        right={
          <Link
            href="/live"
            className="rounded-lg bg-ink px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-black"
          >
            Start the consult →
          </Link>
        }
      />

      {/* Patient banner */}
      <FadeIn delay={0.05}>
        <Card pad={false} className="mb-6 overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-4 p-5">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-sunken text-[15px] font-semibold text-ink">
                {patient.initials}
              </span>
              <div>
                <div className="flex items-center gap-2.5">
                  <h2 className="text-[18px] font-semibold tracking-display text-ink">
                    {patient.name}
                  </h2>
                  <Badge tone="neutral">New patient</Badge>
                </div>
                <p className="mt-0.5 text-[13px] text-ink-secondary">
                  {patient.age} · {patient.occupation} · {patient.location}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div>
                <p className="text-[11px] font-medium text-ink-muted">Consult</p>
                <p className="text-[13px] font-medium text-ink">
                  {patient.appointment.date}, {patient.appointment.time}
                </p>
                <p className="text-[12px] text-ink-muted">
                  {patient.appointment.provider} · {patient.appointment.operatory}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[11px] font-medium text-ink-muted">
                  Consult readiness
                </p>
                <p className="text-[26px] font-semibold tracking-display text-accent-deep tabular">
                  {patient.readiness.score}
                  <span className="text-[14px] text-ink-muted">/100</span>
                </p>
                <p className="text-[12px] font-medium text-goodtext">
                  {patient.readiness.label}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-1 border-t border-line bg-surface-page px-5 py-2.5 text-[12px] text-ink-muted">
            <span>{patient.referral}</span>
            <span>{patient.insurance}</span>
            <span>{patient.clinicalSummary.records}</span>
          </div>
        </Card>
      </FadeIn>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column */}
        <div className="space-y-6 lg:col-span-2">
          {/* Treatment */}
          <Rise>
            <Card>
              <CardTitle right={<Badge tone="accent">From records + scan request</Badge>}>
                Treatment picture
              </CardTitle>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-line bg-surface-page p-4">
                  <p className="text-[11px] font-medium uppercase tracking-wider text-ink-muted">
                    Working diagnosis
                  </p>
                  <p className="mt-1.5 text-[14px] font-medium text-ink">
                    {patient.clinicalSummary.diagnosis}
                  </p>
                </div>
                <div className="rounded-lg border border-line bg-surface-page p-4">
                  <p className="text-[11px] font-medium uppercase tracking-wider text-ink-muted">
                    Primary candidate
                  </p>
                  <p className="mt-1.5 text-[14px] font-medium text-ink">
                    {patient.clinicalSummary.candidate}
                  </p>
                  <p className="mt-1 text-[12.5px] text-ink-secondary">
                    Est. {patient.clinicalSummary.estLength}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-[12.5px] text-ink-muted">
                Alternative: {patient.clinicalSummary.alternative}
              </p>
            </Card>
          </Rise>

          {/* Goals + concerns */}
          <div className="grid gap-6 md:grid-cols-2">
            <Rise delay={0.05}>
              <Card className="h-full">
                <CardTitle
                  right={<Target className="h-4 w-4 text-ink-faint" strokeWidth={1.75} />}
                >
                  Goals
                </CardTitle>
                <div className="space-y-4">
                  {patient.goals.map((g) => (
                    <div key={g.title}>
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-[13.5px] font-medium text-ink">{g.title}</p>
                        <Badge tone="accent">{g.weight}</Badge>
                      </div>
                      <p className="mt-1 text-[12.5px] leading-relaxed text-ink-secondary">
                        {g.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </Rise>
            <Rise delay={0.1}>
              <Card className="h-full">
                <CardTitle
                  right={<AlertCircle className="h-4 w-4 text-ink-faint" strokeWidth={1.75} />}
                >
                  Primary concerns
                </CardTitle>
                <div className="space-y-4">
                  {patient.concerns.map((c) => (
                    <div key={c.title}>
                      <p className="text-[13.5px] font-medium text-ink">{c.title}</p>
                      <p className="mt-1 text-[12.5px] leading-relaxed text-ink-secondary">
                        {c.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </Rise>
          </div>

          {/* Objections */}
          <Rise delay={0.05}>
            <Card>
              <CardTitle right={<Badge tone="warm">Handle these live</Badge>}>
                Likely objections
              </CardTitle>
              <div className="space-y-3">
                {patient.objections.map((o) => (
                  <div
                    key={o.objection}
                    className="rounded-lg border border-line bg-surface-page p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-[13.5px] font-medium italic text-ink">
                        {o.objection}
                      </p>
                      <span className="shrink-0 text-[12px] font-semibold text-ink-secondary tabular">
                        {o.likelihood}% likely
                      </span>
                    </div>
                    <div className="mt-2 w-24">
                      <Meter value={o.likelihood} color="#eb6834" />
                    </div>
                    <p className="mt-2.5 text-[12.5px] leading-relaxed text-ink-secondary">
                      <span className="font-medium text-ink">Counter: </span>
                      {o.counter}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </Rise>

          {/* Strategy */}
          <Rise delay={0.05}>
            <Card>
              <CardTitle
                right={<Route className="h-4 w-4 text-ink-faint" strokeWidth={1.75} />}
              >
                Recommended consult strategy
              </CardTitle>
              <div className="space-y-0">
                {patient.strategy.map((s, i) => (
                  <div key={s.step} className="flex gap-4 pb-5 last:pb-0">
                    <div className="flex flex-col items-center">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-accent-border bg-accent-wash text-[11px] font-semibold text-accent-deep tabular">
                        {i + 1}
                      </span>
                      {i < patient.strategy.length - 1 && (
                        <span className="mt-1 w-px flex-1 bg-line" />
                      )}
                    </div>
                    <div className="pb-1">
                      <p className="text-[13.5px] font-medium text-ink">{s.step}</p>
                      <p className="mt-1 text-[12.5px] leading-relaxed text-ink-secondary">
                        {s.why}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Rise>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Readiness */}
          <Rise delay={0.05}>
            <Card>
              <CardTitle>Readiness breakdown</CardTitle>
              <div className="space-y-4">
                {patient.readiness.factors.map((f) => (
                  <div key={f.name}>
                    <div className="mb-1.5 flex justify-between text-[12.5px]">
                      <span className="font-medium text-ink">{f.name}</span>
                      <span className="font-semibold text-ink-secondary tabular">
                        {f.value}
                      </span>
                    </div>
                    <Meter value={f.value} />
                    <p className="mt-1.5 text-[11.5px] leading-snug text-ink-muted">
                      {f.note}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </Rise>

          {/* Budget */}
          <Rise delay={0.1}>
            <Card>
              <CardTitle
                right={<Wallet className="h-4 w-4 text-ink-faint" strokeWidth={1.75} />}
              >
                Budget signals
              </CardTitle>
              <Badge tone="good">{patient.budget.signal}</Badge>
              <p className="mt-3 text-[13px] leading-relaxed text-ink-secondary">
                {patient.budget.detail}
              </p>
              <div className="mt-3 rounded-lg border border-line bg-surface-page p-3">
                <p className="text-[12px] leading-snug text-ink-secondary">
                  <span className="font-medium text-ink">Insurance: </span>
                  {patient.budget.insuranceNote}
                </p>
              </div>
            </Card>
          </Rise>

          {/* Timeline */}
          <Rise delay={0.15}>
            <Card>
              <CardTitle
                right={<Clock className="h-4 w-4 text-ink-faint" strokeWidth={1.75} />}
              >
                Journey so far
              </CardTitle>
              <div className="space-y-0">
                {patient.timeline.map((t, i) => (
                  <div key={t.event} className="flex gap-3 pb-4 last:pb-0">
                    <div className="flex flex-col items-center">
                      <span
                        className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                          i === patient.timeline.length - 1
                            ? "bg-accent"
                            : "bg-ink-faint"
                        }`}
                      />
                      {i < patient.timeline.length - 1 && (
                        <span className="mt-1 w-px flex-1 bg-line" />
                      )}
                    </div>
                    <div className="pb-1">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted tabular">
                        {t.date}
                      </p>
                      <p className="mt-0.5 text-[13px] font-medium text-ink">
                        {t.event}
                      </p>
                      <p className="text-[12px] text-ink-muted">{t.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Rise>

          {/* Pre-answered questions */}
          <Rise delay={0.2}>
            <Card>
              <CardTitle
                right={
                  <MessageCircleQuestion
                    className="h-4 w-4 text-ink-faint"
                    strokeWidth={1.75}
                  />
                }
              >
                Answered before the visit
              </CardTitle>
              <p className="mb-4 text-[12px] leading-snug text-ink-muted">
                Sarah asked these in the patient portal. Opera answered
                instantly; staff reviewed each one.
              </p>
              <div className="space-y-4">
                {patient.preAnswered.map((qa) => (
                  <div key={qa.q}>
                    <p className="text-[13px] font-medium text-ink">“{qa.q}”</p>
                    <p className="mt-1.5 rounded-lg border border-line bg-surface-page p-3 text-[12.5px] leading-relaxed text-ink-secondary">
                      {qa.a}
                    </p>
                    <p className="mt-1 text-[11px] text-ink-faint">{qa.when}</p>
                  </div>
                ))}
              </div>
            </Card>
          </Rise>
        </div>
      </div>

      <StoryFooter current="/pre-consult" />
    </main>
  );
}
