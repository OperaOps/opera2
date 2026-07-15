"use client";

import {
  AudioLines,
  FileText,
  Send,
  TrendingUp,
  ArrowRight,
  CalendarClock,
} from "lucide-react";
import { Badge, Card, Eyebrow, FadeIn, PageHeader } from "@/components/ui";
import { StoryFooter } from "@/components/nav";

const pieces = [
  {
    icon: AudioLines,
    title: "The consult, captured",
    body: "Opera listens ambiently during the periodontal consult. No typing, no scribe cost — the conversation itself becomes structured notes your team can act on.",
  },
  {
    icon: FileText,
    title: "A brief, not a recording",
    body: "Seconds after the patient leaves: what was diagnosed, what was recommended, what the patient worried about — insurance, pain, time off work — and what they responded to.",
  },
  {
    icon: Send,
    title: "Follow-up that sends itself",
    body: "The right treatment video from this site, personalized with everything the consult surfaced, texted the same afternoon. The patient re-hears the plan in their own terms.",
  },
  {
    icon: TrendingUp,
    title: "Case acceptance, explained",
    body: "Across every consult: which objections stall perio treatment, which explanations convert SRP to surgery when indicated, and where unscheduled treatment is sitting.",
  },
];

export default function ConsultIntelligencePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 pt-14">
      <PageHeader
        eyebrow="Beyond the videos"
        title="Consult Intelligence — the part that learns"
        description="The videos win the patient. This is what wins the practice: every consultation becomes structured intelligence about why patients accept periodontal treatment — or don't."
        right={<Badge>Concept preview · full demo on request</Badge>}
      />

      <div className="grid gap-4 md:grid-cols-2">
        {pieces.map((p, i) => (
          <FadeIn key={p.title} delay={i * 0.07}>
            <Card className="h-full">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-accent-border bg-accent-wash text-accent-deep">
                <p.icon className="h-4 w-4" />
              </span>
              <h3 className="mt-3.5 text-[15px] font-semibold text-ink">{p.title}</h3>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-secondary">
                {p.body}
              </p>
            </Card>
          </FadeIn>
        ))}
      </div>

      {/* The one number that matters */}
      <FadeIn delay={0.1}>
        <Card className="mt-10 border-accent-border bg-accent-wash/40">
          <div className="flex flex-wrap items-center justify-between gap-6 px-1 py-2">
            <div className="max-w-xl">
              <Eyebrow>Why perio practices run this</Eyebrow>
              <p className="text-[17px] font-semibold leading-snug tracking-display text-ink">
                Periodontal treatment is the most postponed dentistry there is. The gap
                between diagnosed and scheduled is where production disappears — and it is
                measurable, recoverable, and mostly about understanding.
              </p>
            </div>
            <a
              href="mailto:opera@getopera.ai?subject=Opera%20for%20Bola%20%E2%80%94%20walkthrough"
              className="group inline-flex items-center gap-2 rounded-lg bg-ink px-5 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-black"
            >
              <CalendarClock className="h-4 w-4" />
              Book a 15-minute walkthrough
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </Card>
      </FadeIn>

      <StoryFooter current="/consult-intelligence" />
    </main>
  );
}
