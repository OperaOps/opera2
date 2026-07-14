"use client";

import { motion } from "framer-motion";
import { TrendingDown, TrendingUp, Minus } from "lucide-react";
import {
  Badge,
  Card,
  CardTitle,
  DemoTag,
  FadeIn,
  PageHeader,
  Rise,
  Stat,
} from "@/components/ui";
import { StoryFooter } from "@/components/nav";
import { ObjectionHeatmap, PairedBars, TrendChart } from "@/components/charts";
import {
  coachingThemes,
  heatmap,
  insights,
  leaderboard,
  orderExperiments,
  orgStats,
  trend,
} from "@/lib/org-data";

export default function Organization() {
  return (
    <main className="mx-auto max-w-6xl px-6 pt-14">
      <PageHeader
        eyebrow="The organization learns"
        title="Organization Intelligence"
        description="Every consultation across all 43 locations feeds one intelligence layer. Opera doesn't just report what happened — it learns what to say, in what order, to whom."
        right={<DemoTag />}
      />

      {/* Headline stats */}
      <FadeIn delay={0.05}>
        <Card pad={false} className="mb-6">
          <div className="grid divide-line sm:grid-cols-2 sm:divide-x lg:grid-cols-4">
            {orgStats.map((s, i) => (
              <div key={s.label} className={`p-5 ${i > 0 ? "border-t border-line sm:border-t-0" : ""}`}>
                <Stat label={s.label} value={s.value} sub={s.sub} delta={s.delta || undefined} />
              </div>
            ))}
          </div>
        </Card>
      </FadeIn>

      {/* Learned insights */}
      <Rise className="mb-6">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="text-[18px] font-semibold tracking-display text-ink">
              What 12,847 consults taught us
            </h2>
            <p className="mt-0.5 text-[13.5px] text-ink-secondary">
              Patterns mined from real conversations — each one becomes a live
              recommendation in the consult copilot.
            </p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {insights.map((ins, i) => (
            <Rise key={ins.title} delay={i * 0.05}>
              <Card className="flex h-full flex-col">
                <div className="mb-3 flex items-center justify-between">
                  <Badge tone="neutral">{ins.tag}</Badge>
                  <span className="text-[18px] font-semibold tracking-display text-accent-deep tabular">
                    {ins.stat}
                  </span>
                </div>
                <h3 className="text-[14.5px] font-semibold leading-snug text-ink">
                  {ins.title}
                </h3>
                <p className="mt-2 flex-1 text-[13px] leading-relaxed text-ink-secondary">
                  {ins.body}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
                  <span className="text-[11.5px] text-ink-muted tabular">{ins.n}</span>
                  <span className="text-[11.5px] font-medium text-ink-muted">
                    {ins.confidence}
                  </span>
                </div>
              </Card>
            </Rise>
          ))}
        </div>
      </Rise>

      {/* Trend + order experiments */}
      <div className="mb-6 grid gap-6 lg:grid-cols-5">
        <Rise className="lg:col-span-3">
          <Card className="h-full">
            <CardTitle right={<DemoTag />}>
              Case acceptance — trailing 12 months
            </CardTitle>
            <TrendChart months={trend.months} assisted={trend.assisted} baseline={trend.baseline} />
            <p className="mt-3 border-t border-line pt-3 text-[12px] leading-relaxed text-ink-muted">
              Consults where clinicians used Opera's live guidance pulled ahead
              by <span className="font-semibold text-ink">9.9 points</span> over
              twelve months. Unassisted consults stayed flat — the gap is the
              playbook, not the market.
            </p>
          </Card>
        </Rise>
        <Rise delay={0.08} className="lg:col-span-2">
          <Card className="h-full">
            <CardTitle right={<DemoTag />}>
              Conversation order → acceptance
            </CardTitle>
            <PairedBars rows={orderExperiments} />
          </Card>
        </Rise>
      </div>

      {/* Heatmap */}
      <Rise className="mb-6">
        <Card>
          <CardTitle right={<DemoTag />}>
            Where objections surface in the consult
          </CardTitle>
          <ObjectionHeatmap
            stages={heatmap.stages}
            objections={heatmap.objections}
            values={heatmap.values}
          />
          <div className="mt-4 rounded-lg border border-line bg-surface-page p-3.5">
            <p className="text-[12.5px] leading-relaxed text-ink-secondary">
              <span className="font-semibold text-ink">The pattern that matters:</span>{" "}
              cost objections spike at the pricing stage (38%) but barely exist
              when financing is introduced earlier — which is exactly what the
              copilot now recommends. Spouse objections cluster at treatment
              plan and close: surface the family sharing page before the close,
              not after.
            </p>
          </div>
        </Card>
      </Rise>

      {/* Leaderboard + coaching themes */}
      <div className="grid gap-6 lg:grid-cols-5">
        <Rise className="lg:col-span-3">
          <Card>
            <CardTitle right={<DemoTag />}>
              Provider leaderboard — acceptance rate
            </CardTitle>
            <div className="space-y-1">
              <div className="grid grid-cols-[24px_1fr_72px_64px_88px] gap-3 px-2 pb-2 text-[10.5px] font-semibold uppercase tracking-wider text-ink-faint">
                <span>#</span>
                <span>Provider</span>
                <span className="text-right">Consults</span>
                <span className="text-right">Decision</span>
                <span className="text-right">Acceptance</span>
              </div>
              {leaderboard.map((p, i) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className={`grid grid-cols-[24px_1fr_72px_64px_88px] items-center gap-3 rounded-lg px-2 py-2.5 ${
                    i === 0 ? "bg-accent-wash" : "hover:bg-surface-page"
                  }`}
                >
                  <span className="text-[12px] font-semibold text-ink-muted tabular">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-medium text-ink">{p.name}</p>
                    <p className="truncate text-[11.5px] text-ink-muted">{p.location}</p>
                  </div>
                  <span className="text-right text-[12.5px] text-ink-secondary tabular">
                    {p.consults}
                  </span>
                  <span className="text-right text-[12.5px] text-ink-secondary tabular">
                    {p.decisionDays}d
                  </span>
                  <div className="flex items-center justify-end gap-2">
                    <div className="h-[6px] w-10 overflow-hidden rounded-full bg-surface-sunken">
                      <div
                        className="h-full rounded-full bg-[#2a78d6]"
                        style={{ width: `${p.acceptance}%` }}
                      />
                    </div>
                    <span className="w-11 text-right text-[12.5px] font-semibold text-ink tabular">
                      {p.acceptance}%
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="mt-3 border-t border-line pt-3 text-[12px] leading-relaxed text-ink-muted">
              Every provider improved year-over-year (deltas +2.1 to +7.1 pts).
              The gap between #1 and #6 is mostly conversation order — Dr.
              Park's consults follow the learned playbook 91% of the time; Dr.
              O'Leary's, 44%.
            </p>
          </Card>
        </Rise>
        <Rise delay={0.08} className="lg:col-span-2">
          <Card className="h-full">
            <CardTitle right={<DemoTag />}>
              Coaching themes this quarter
            </CardTitle>
            <p className="mb-4 text-[12.5px] leading-relaxed text-ink-secondary">
              The most common improvement opportunities Opera flagged across
              all providers — each links to real consult moments for review.
            </p>
            <div className="space-y-3">
              {coachingThemes.map((c) => (
                <div
                  key={c.theme}
                  className="flex items-center justify-between gap-3 rounded-lg border border-line bg-surface-page p-3"
                >
                  <p className="text-[13px] leading-snug text-ink">{c.theme}</p>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="text-[12.5px] font-semibold text-ink tabular">
                      {c.count}
                    </span>
                    {c.trend === "down" ? (
                      <TrendingDown className="h-3.5 w-3.5 text-goodtext" strokeWidth={2} />
                    ) : c.trend === "up" ? (
                      <TrendingUp className="h-3.5 w-3.5 text-[#b34515]" strokeWidth={2} />
                    ) : (
                      <Minus className="h-3.5 w-3.5 text-ink-faint" strokeWidth={2} />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-lg border border-accent-border bg-accent-wash p-3.5">
              <p className="text-[12.5px] leading-relaxed text-ink-secondary">
                <span className="font-semibold text-ink">Flywheel:</span> these
                themes feed next quarter's live copilot prompts. Three of four
                are already trending down since guidance went live.
              </p>
            </div>
          </Card>
        </Rise>
      </div>

      {/* Closing framing */}
      <Rise className="mt-10">
        <div className="rounded-xl border border-line bg-surface p-8 text-center shadow-card">
          <h2 className="mx-auto max-w-2xl text-[24px] font-semibold leading-snug tracking-display text-ink">
            One consult made Sarah a patient. Twelve thousand made every consult
            better.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[14px] leading-relaxed text-ink-secondary">
            This is the compounding asset: a DSO-wide record of what actually
            happens in the room, and what actually works — impossible to build
            by hand, automatic with Opera.
          </p>
        </div>
      </Rise>

      <StoryFooter current="/organization" />
    </main>
  );
}
