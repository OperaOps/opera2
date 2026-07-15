"use client";

import { motion } from "framer-motion";
import {
  MessageSquare,
  Sparkles,
  UserRound,
  Video,
  Send,
  ShieldCheck,
} from "lucide-react";
import { Badge, Card, Eyebrow, FadeIn } from "@/components/ui";
import { StoryFooter } from "@/components/nav";

const treatments = [
  {
    id: "srp",
    src: "/videos/srp.mp4",
    poster: "/videos/srp-poster.jpg",
    tag: "Deep Cleaning",
    title: "Scaling & Root Planing",
    length: "1:32",
    patientLine:
      "From the pocket-depth exam to tartar below the gumline, why brushing can't fix it, the cleaning itself, and the gum healing snugly back — one continuous story.",
    personalization: [
      "Greets the patient by name over the opening exam",
      "Narrates their own pocket depths, in plain words",
      "Ends with their hygienist's name and recall date",
    ],
  },
  {
    id: "laser",
    src: "/videos/laser.mp4",
    poster: "/videos/laser-poster.jpg",
    tag: "Laser Therapy",
    title: "Laser Periodontal Treatment",
    length: "1:38",
    patientLine:
      "The fiber slipping below the gumline, diseased tissue cleared without a scalpel, the clot that seals the pocket, and the tissue maturing back to healthy pink.",
    personalization: [
      "Frames laser vs. traditional surgery for their case",
      "Explains their same-day, no-suture recovery plan",
      "Names the doctor performing their procedure",
    ],
  },
  {
    id: "pocket",
    src: "/videos/pocket-reduction.mp4",
    poster: "/videos/pocket-reduction-poster.jpg",
    tag: "Osseous Surgery",
    title: "Pocket Reduction Surgery",
    length: "0:38",
    patientLine:
      "Why deep pockets can't be cleaned from outside, the gum lifted back, the root and bone reshaped, sutures placed — and the healthy result it's all for.",
    personalization: [
      "References the exact teeth on their treatment plan",
      "Walks their week-by-week healing expectations",
      "Includes their post-op instructions as a recap page",
    ],
  },
];

const delivery = [
  {
    icon: MessageSquare,
    title: "Consult ends, text goes out",
    body: "The patient gets a secure link minutes after diagnosis — while the conversation is still fresh at home.",
  },
  {
    icon: UserRound,
    title: "Personalized per patient",
    body: "Same reviewed footage, personalized voiceover: their name, their pocket depths, their doctor, their next step.",
  },
  {
    icon: Sparkles,
    title: "Built for case acceptance",
    body: "Patients who understand periodontal disease say yes to treating it. The video does the explaining; your team does the scheduling.",
  },
];

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 pt-14">
      {/* Hero */}
      <FadeIn className="max-w-3xl">
        <Eyebrow>Opera × Bola · Periodontal patient education</Eyebrow>
        <h1 className="text-[34px] font-semibold leading-[1.12] tracking-display text-ink sm:text-[40px]">
          The treatment your patients say yes to is the one they understand.
        </h1>
        <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-ink-secondary">
          Opera turns every periodontal diagnosis into a personalized treatment video —
          delivered by text after the consult, narrated for that patient, reviewed by your
          doctors. These are the three flagship perio stories, ready to personalize.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Badge tone="accent">
            <Video className="h-3 w-3" /> 3 treatments below
          </Badge>
          <Badge>
            <Send className="h-3 w-3" /> Delivered by SMS · no app, no portal
          </Badge>
          <Badge>
            <ShieldCheck className="h-3 w-3" /> Doctor-reviewed · education only
          </Badge>
        </div>
      </FadeIn>

      {/* The three treatment videos */}
      <div className="mt-16 space-y-14">
        {treatments.map((t, i) => (
          <motion.section
            key={t.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="grid items-center gap-8 lg:grid-cols-[1.25fr_0.75fr]"
          >
            <div
              className={`overflow-hidden rounded-xl border border-line bg-surface shadow-frame ${
                i % 2 === 1 ? "lg:order-2" : ""
              }`}
            >
              <video
                className="aspect-video w-full bg-black object-cover"
                src={t.src}
                poster={t.poster}
                controls
                preload="metadata"
                playsInline
              />
            </div>

            <div className={i % 2 === 1 ? "lg:order-1" : ""}>
              <div className="flex items-center gap-2">
                <Badge tone="accent">{t.tag}</Badge>
                <span className="text-[12px] font-medium tabular text-ink-muted">
                  {t.length}
                </span>
              </div>
              <h2 className="mt-3 text-[24px] font-semibold tracking-display text-ink">
                {t.title}
              </h2>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-secondary">
                {t.patientLine}
              </p>
              <div className="mt-5 rounded-xl border border-line bg-surface p-4 shadow-card">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-muted">
                  Personalized for each patient
                </p>
                <ul className="mt-2.5 space-y-1.5">
                  {t.personalization.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-2 text-[13px] leading-relaxed text-ink-secondary"
                    >
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.section>
        ))}
      </div>

      {/* How it lands with patients */}
      <section className="mt-20">
        <FadeIn>
          <Eyebrow>How it reaches the patient</Eyebrow>
          <h2 className="text-[24px] font-semibold tracking-display text-ink">
            No app. No portal. No homework.
          </h2>
        </FadeIn>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {delivery.map((d, i) => (
            <FadeIn key={d.title} delay={i * 0.08}>
              <Card className="h-full">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-accent-border bg-accent-wash text-accent-deep">
                  <d.icon className="h-4 w-4" />
                </span>
                <h3 className="mt-3.5 text-[14px] font-semibold text-ink">{d.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-ink-secondary">
                  {d.body}
                </p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </section>

      <StoryFooter current="/" />
    </main>
  );
}
