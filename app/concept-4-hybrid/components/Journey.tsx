"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { SITE_PHOTOS } from "@/lib/concepts/shared";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const STOPS: { label: string; note: string }[] = [
  {
    label: "First visit",
    note: "Her personalized treatment video is sent before she's home.",
  },
  {
    label: "Diagnosis",
    note: "The plan becomes a Problem → Treatment → Outcome visual story.",
  },
  {
    label: "Understanding",
    note: "“Will this hurt?” — asked at 9:41pm, answered from her own plan.",
  },
  {
    label: "Decision",
    note: "Hesitation detected: financing never came up. The TC is alerted.",
  },
  {
    label: "Treatment",
    note: "Case accepted. Stage-by-stage visuals at every visit.",
  },
  {
    label: "Outcome",
    note: "Her before-and-after, shared — proof for the next patient story.",
  },
];

function Stop({
  progress,
  index,
  label,
  note,
}: {
  progress: MotionValue<number>;
  index: number;
  label: string;
  note: string;
}) {
  const start = index / STOPS.length;
  const nodeOn = useTransform(
    progress,
    [Math.max(0, start - 0.03), Math.min(1, start + 0.08)],
    [0, 1]
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 14 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: EASE }}
      className="relative pl-9 md:pl-11"
    >
      {/* node on the rail */}
      <span className="absolute left-0 top-[4px] h-[7px] w-[7px] rounded-full border border-[#c9c5b8] bg-[#faf9f6]" />
      <motion.span
        style={{ opacity: nodeOn }}
        className="absolute left-0 top-[4px] h-[7px] w-[7px] rounded-full bg-[#5b4fe8]"
      />
      <p className="flex items-baseline gap-3 [font-family:var(--c4-font-mono)]">
        <span className="text-[9px] tracking-[0.1em] text-[#b7b2a4]">
          0{index + 1}
        </span>
        <span className="text-[11px] font-medium uppercase tracking-[0.26em] text-[#14161a]">
          {label}
        </span>
      </p>
      <p className="mt-1.5 max-w-[440px] text-[13px] font-light leading-relaxed text-[#5c5952]">
        {note}
      </p>
    </motion.div>
  );
}

/**
 * Photographic interlude — the emotional story beat between Ask Opera
 * and the intelligence layer. Deliberately unnumbered and video-free:
 * one still photograph, one journey.
 */
export default function Journey() {
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 0.82", "end 0.55"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="mt-32 md:mt-44">
      <div className="grid md:min-h-[720px] md:grid-cols-[45fr_55fr]">
        {/* ── Text half (left on desktop, below photo on mobile) ───── */}
        <div className="order-2 flex items-center px-6 py-16 md:order-1 md:py-24 md:pl-[max(3rem,calc((100vw-1480px)/2+3rem))] md:pr-14">
          <div className="w-full max-w-[560px]">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="text-[10px] font-medium uppercase tracking-[0.26em] text-[#5b4fe8] [font-family:var(--c4-font-mono)]"
            >
              The patient journey
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: 0.08, ease: EASE }}
              className="mt-6 text-[clamp(2rem,3.6vw,3.1rem)] font-medium leading-[1.08] tracking-[-0.03em] text-[#14161a] [font-family:var(--c4-font-display)]"
            >
              Every video tells{" "}
              <em className="italic font-normal text-[#5b4fe8] [font-family:var(--c4-font-serif)]">
                a story
              </em>
              .
              <span className="mt-1 block text-[#9a958a]">
                The data tells the whole journey.
              </span>
            </motion.h2>

            {/* Journey rail — progress line draws in on scroll */}
            <div ref={railRef} className="relative mt-12">
              <span className="absolute bottom-[6px] left-[3px] top-[6px] w-px bg-[#e0ddd0]" />
              <motion.span
                style={{ scaleY: lineScale }}
                className="absolute bottom-[6px] left-[3px] top-[6px] w-px origin-top bg-[#5b4fe8]"
              />
              <div className="space-y-8">
                {STOPS.map((s, i) => (
                  <Stop
                    key={s.label}
                    progress={scrollYProgress}
                    index={i}
                    label={s.label}
                    note={s.note}
                  />
                ))}
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, ease: EASE }}
              className="mt-14 border-t border-[#e4e1d6] pt-6 text-[15px] font-light leading-relaxed text-[#14161a]"
            >
              One record of understanding — built for patients{" "}
              <em className="italic text-[#5b4fe8] [font-family:var(--c4-font-serif)]">
                and
              </em>{" "}
              the providers who care for them.
            </motion.p>
          </div>
        </div>

        {/* ── Photo half — treated with reverence, no video, no radius ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 1.2, ease: EASE }}
          className="relative order-1 h-[56vh] min-h-[380px] md:order-2 md:h-auto md:min-h-full"
        >
          <img
            src={SITE_PHOTOS.newborn}
            alt="A newborn's first moments — black and white"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* scrim from the text side (left on desktop, below on mobile) */}
          <div className="absolute inset-0 hidden bg-gradient-to-r from-[#08090a]/45 via-transparent to-transparent md:block" />
          {/* grounding gradient for the caption */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#08090a]/65 to-transparent" />
          {/* hairline frame */}
          <div className="pointer-events-none absolute inset-4 border border-white/25 md:inset-6" />
          <p className="absolute bottom-8 left-8 right-8 text-[8px] uppercase leading-relaxed tracking-[0.3em] text-white/65 md:bottom-10 md:left-10 [font-family:var(--c4-font-mono)]">
            The first patient story
            <span className="mx-2 text-white/35">—</span>
            every life starts with care
          </p>
        </motion.div>
      </div>
    </section>
  );
}
