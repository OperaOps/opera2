"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  FileText,
  AudioLines,
  Sparkles,
  Send,
  TrendingUp,
} from "lucide-react";
import { Badge, Card, FadeIn, Rise } from "@/components/ui";
import { StoryFooter } from "@/components/nav";

const journey = [
  {
    icon: CalendarCheck,
    step: "01",
    title: "Patient books a consult",
    body: "Smart intake captures goals, concerns, and budget signals before anyone picks up the phone.",
    href: "/pre-consult",
  },
  {
    icon: FileText,
    step: "02",
    title: "Opera prepares the clinician",
    body: "A one-page brief: readiness score, likely objections, and a recommended consult strategy.",
    href: "/pre-consult",
  },
  {
    icon: AudioLines,
    step: "03",
    title: "Opera assists during the consult",
    body: "Ambient listening surfaces objections, buying signals, and the right visual at the right moment.",
    href: "/live",
  },
  {
    icon: Sparkles,
    step: "04",
    title: "Opera analyzes the consult",
    body: "Structured intelligence in seconds: decision drivers, conversion likelihood, clinician coaching.",
    href: "/intelligence",
  },
  {
    icon: Send,
    step: "05",
    title: "Personalized follow-up, automatically",
    body: "A recap video, financing summary, family sharing page, and an assistant grounded in the consult.",
    href: "/follow-up",
  },
  {
    icon: TrendingUp,
    step: "06",
    title: "The organization learns",
    body: "Thousands of consults become playbooks: what to say, in what order, to whom.",
    href: "/organization",
  },
];

function BrowserFrame({
  children,
  url,
  className = "",
}: {
  children: React.ReactNode;
  url: string;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-line bg-surface shadow-frame ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-line bg-surface-page px-3.5 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#e5e4e0]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#e5e4e0]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#e5e4e0]" />
        </div>
        <div className="mx-auto rounded-md bg-surface-sunken px-3 py-0.5 text-[10px] text-ink-muted">
          {url}
        </div>
      </div>
      {children}
    </div>
  );
}

function ShotLive() {
  return (
    <div className="grid grid-cols-5 gap-3 p-4">
      <div className="col-span-3 space-y-2.5">
        <div className="flex items-center gap-2">
          <span className="flex h-1.5 w-1.5 rounded-full bg-good" />
          <span className="text-[9px] font-semibold uppercase tracking-wider text-ink-muted">
            Live transcript · 1:29
          </span>
        </div>
        {[
          ["Dr. Park", "…most patients pay around one eighty-nine a month."],
          ["Sarah M.", "Oh — monthly, that's… actually manageable."],
          ["Dr. Park", "And that includes every aligner and your retainers."],
        ].map(([who, text], i) => (
          <div key={i} className="rounded-lg border border-line bg-surface p-2.5">
            <p className="text-[9px] font-semibold text-ink-muted">{who}</p>
            <p className="mt-0.5 text-[10.5px] leading-snug text-ink">{text}</p>
          </div>
        ))}
      </div>
      <div className="col-span-2 space-y-2.5">
        <div className="rounded-lg border border-accent-border bg-accent-wash p-2.5">
          <p className="text-[9px] font-semibold uppercase tracking-wider text-accent-deep">
            Buying signal
          </p>
          <p className="mt-1 text-[10.5px] leading-snug text-ink">
            “Actually manageable” — financing frame accepted
          </p>
        </div>
        <div className="rounded-lg border border-line bg-surface p-2.5">
          <p className="text-[9px] font-semibold uppercase tracking-wider text-ink-muted">
            Recommended visual
          </p>
          <p className="mt-1 text-[10.5px] leading-snug text-ink">
            Aligners on teeth — close up
          </p>
        </div>
        <div className="rounded-lg border border-line bg-surface p-2.5">
          <p className="text-[9px] font-semibold uppercase tracking-wider text-ink-muted">
            Emotion
          </p>
          <p className="mt-1 text-[10.5px] font-medium text-goodtext">Relieved ↗</p>
        </div>
      </div>
    </div>
  );
}

function ShotBrief() {
  return (
    <div className="space-y-3 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-surface-sunken text-[9px] font-semibold text-ink">
            SM
          </span>
          <div>
            <p className="text-[11px] font-semibold text-ink">Sarah Mitchell, 34</p>
            <p className="text-[9px] text-ink-muted">Invisalign consult · 2:30 PM</p>
          </div>
        </div>
        <span className="rounded-full border border-accent-border bg-accent-wash px-2 py-0.5 text-[9px] font-semibold text-accent-deep">
          Readiness 72
        </span>
      </div>
      {[
        ["Primary motivator", "Sister's wedding — June 2027"],
        ["Likely objection", "Cost anchored at $4,000 by referring GP"],
        ["Strategy", "Show monthly payment before total fee"],
      ].map(([k, v], i) => (
        <div key={i} className="rounded-lg border border-line bg-surface p-2.5">
          <p className="text-[9px] font-semibold uppercase tracking-wider text-ink-muted">{k}</p>
          <p className="mt-0.5 text-[10.5px] leading-snug text-ink">{v}</p>
        </div>
      ))}
    </div>
  );
}

function ShotOrg() {
  const bars = [
    ["Financing before total fee", 66, "53"],
    ["Timeline before pricing", 68, "59"],
    ["Goals before mechanics", 65, "55"],
  ];
  return (
    <div className="space-y-3 p-4">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-semibold text-ink">What drives acceptance</p>
        <span className="text-[8.5px] font-medium text-ink-muted">Demo data · n = 12,847</span>
      </div>
      {bars.map(([label, w, base], i) => (
        <div key={i}>
          <div className="mb-1 flex justify-between text-[9.5px]">
            <span className="text-ink-secondary">{label}</span>
            <span className="font-semibold text-ink tabular">{w}% vs {base}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-surface-sunken">
            <div
              className="h-full rounded-full bg-accent"
              style={{ width: `${w}%` }}
            />
          </div>
        </div>
      ))}
      <div className="rounded-lg border border-line bg-surface-page p-2.5">
        <p className="text-[9.5px] leading-snug text-ink-secondary">
          Patients discussing financing before treatment cost converted{" "}
          <span className="font-semibold text-ink">13% more often</span> across
          4,212 consults.
        </p>
      </div>
    </div>
  );
}

export default function Overview() {
  return (
    <main>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-24 pb-16 text-center">
        <FadeIn>
          <Badge tone="accent">Consult Intelligence for orthodontics & dentistry</Badge>
          <h1 className="mx-auto mt-6 max-w-3xl text-[52px] font-semibold leading-[1.05] tracking-display text-ink">
            AI that understands every consultation.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-ink-secondary">
            Opera listens to patient consultations, assists clinicians in real
            time, automatically generates personalized follow-up, and learns
            what actually drives treatment acceptance across your organization.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link
              href="/pre-consult"
              className="rounded-lg bg-ink px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-black"
            >
              Walk through a consult →
            </Link>
            <Link
              href="/live"
              className="rounded-lg border border-line bg-surface px-5 py-2.5 text-[14px] font-medium text-ink transition-colors hover:border-line-strong"
            >
              Jump to the live demo
            </Link>
          </div>
        </FadeIn>

        {/* Product screenshots */}
        <div className="relative mt-20">
          <div className="pointer-events-none absolute inset-x-0 -top-24 h-64 bg-[radial-gradient(ellipse_at_center,rgba(42,120,214,0.06),transparent_65%)]" />
          <div className="grid items-start gap-6 md:grid-cols-[1fr_1.5fr_1fr]">
            <Rise delay={0.15}>
              <BrowserFrame url="opera.ai/consults/brief" className="md:mt-10">
                <ShotBrief />
              </BrowserFrame>
              <p className="mt-3 text-[12px] text-ink-muted">Pre-consult brief</p>
            </Rise>
            <Rise delay={0}>
              <BrowserFrame url="opera.ai/consults/live">
                <ShotLive />
              </BrowserFrame>
              <p className="mt-3 text-[12px] text-ink-muted">Live consultation copilot</p>
            </Rise>
            <Rise delay={0.25}>
              <BrowserFrame url="opera.ai/organization" className="md:mt-10">
                <ShotOrg />
              </BrowserFrame>
              <p className="mt-3 text-[12px] text-ink-muted">Organization intelligence</p>
            </Rise>
          </div>
        </div>
      </section>

      {/* The story */}
      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Rise>
            <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-accent">
              One continuous story
            </p>
            <h2 className="mt-3 max-w-xl text-[32px] font-semibold leading-tight tracking-display text-ink">
              From booking to organizational learning — every consult makes the
              next one better.
            </h2>
          </Rise>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {journey.map((item, i) => (
              <Rise key={item.step} delay={i * 0.06}>
                <Link href={item.href} className="group block h-full">
                  <Card className="h-full transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-raised">
                    <div className="flex items-center justify-between">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface-page">
                        <item.icon className="h-4 w-4 text-ink-secondary" strokeWidth={1.75} />
                      </span>
                      <span className="text-[12px] font-semibold text-ink-faint tabular">
                        {item.step}
                      </span>
                    </div>
                    <h3 className="mt-4 text-[15px] font-semibold text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-secondary">
                      {item.body}
                    </p>
                  </Card>
                </Link>
              </Rise>
            ))}
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <Rise>
            <h2 className="text-[32px] font-semibold leading-tight tracking-display text-ink">
              The consult is where treatment is won or lost.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-secondary">
              A typical ortho practice runs thousands of consultations a year,
              and what happens in that room — what was said, in what order, and
              what the patient actually worried about — disappears the moment
              it ends. Opera keeps it, structures it, and turns it into the
              organization's most valuable dataset.
            </p>
            <div className="mt-6 space-y-3">
              {[
                "Every consult produces structured intelligence, not a memory.",
                "Every patient gets follow-up built from their own conversation.",
                "Every doctor learns from the entire organization's consults.",
              ].map((t, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <p className="text-[14px] text-ink">{t}</p>
                </div>
              ))}
            </div>
          </Rise>
          <Rise delay={0.1}>
            <Card pad={false} className="overflow-hidden">
              <div className="border-b border-line bg-surface-page px-5 py-3">
                <p className="text-[12px] font-semibold text-ink">
                  Measured across pilot organizations
                </p>
              </div>
              <div className="grid grid-cols-2 divide-x divide-line">
                {[
                  ["+8.2 pts", "case acceptance"],
                  ["−3.6 days", "time to decision"],
                  ["84%", "follow-up engagement"],
                  ["12,847", "consults analyzed"],
                ].map(([v, l], i) => (
                  <div
                    key={i}
                    className={`p-5 ${i >= 2 ? "border-t border-line" : ""}`}
                  >
                    <p className="text-[24px] font-semibold tracking-display text-ink tabular">
                      {v}
                    </p>
                    <p className="mt-0.5 text-[12px] text-ink-muted">{l}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-line bg-surface-page px-5 py-2.5">
                <p className="text-[11px] text-ink-muted">
                  Demo data — illustrative of pilot results
                </p>
              </div>
            </Card>
          </Rise>
        </div>
      </section>

      <StoryFooter current="/" />
    </main>
  );
}
