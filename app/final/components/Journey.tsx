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
    note: "“Will this hurt?” — asked at 9:41 pm, answered from her own plan.",
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
      <span className="absolute left-0 top-[4px] h-[7px] w-[7px] rounded-full border border-[#1a1a17]/30 bg-[#f7f5f0]" />
      <motion.span
        style={{ opacity: nodeOn }}
        className="absolute left-0 top-[4px] h-[7px] w-[7px] rounded-full bg-[#c2410c]"
      />
      <p className="cf-mono flex items-baseline gap-3">
        <span className="text-[9px] tracking-[0.1em] text-[#c2410c]">
          0{index + 1}
        </span>
        <span className="text-[11px] font-medium uppercase tracking-[0.26em] text-[#1a1a17]">
          {label}
        </span>
      </p>
      <p className="cf-body mt-1.5 max-w-[440px] text-[13px] font-light leading-relaxed text-[#8a8578]">
        {note}
      </p>
    </motion.div>
  );
}

/**
 * The human journey — half-plate photograph, six-stop rail with a
 * scroll-linked red progress line. Deliberately video-free.
 */
export default function Journey() {
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 0.82", "end 0.55"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="journey" className="mt-24 scroll-mt-14 border-t border-[#1a1a17]/25 md:mt-32">
      <div className="grid md:min-h-[720px] md:grid-cols-[45fr_55fr]">
        {/* ── Text half ───────────────────────────────────────────── */}
        <div className="order-2 flex items-center px-6 py-16 md:order-1 md:py-24 md:pl-[max(3rem,calc((100vw-1480px)/2+3rem))] md:pr-14">
          <div className="w-full max-w-[560px]">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="cf-mono text-[10px] uppercase tracking-[0.26em] text-[#c2410c]"
            >
              03 — The patient journey
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: 0.08, ease: EASE }}
              className="cf-display mt-6 text-[clamp(2rem,3.6vw,3.1rem)] font-light leading-[1.06] tracking-[-0.025em] text-[#1a1a17]"
            >
              Every video tells{" "}
              <em className="italic text-[#c2410c]">a story</em>.
              <span className="mt-1 block text-[#8a8578]">
                The data tells the whole journey.
              </span>
            </motion.h2>

            {/* Journey rail — red progress line draws in on scroll */}
            <div ref={railRef} className="relative mt-12">
              <span className="absolute bottom-[6px] left-[3px] top-[6px] w-px bg-[#1a1a17]/15" />
              <motion.span
                style={{ scaleY: lineScale }}
                className="absolute bottom-[6px] left-[3px] top-[6px] w-px origin-top bg-[#c2410c]"
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
              className="cf-body mt-14 border-t border-[#1a1a17]/20 pt-6 text-[15px] font-light leading-relaxed text-[#1a1a17]"
            >
              One record of understanding — built for patients{" "}
              <em className="cf-display italic text-[#c2410c]">and</em> the
              providers who care for them.
            </motion.p>
          </div>
        </div>

        {/* ── Photo half — treated with reverence, no video ─────────── */}
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
          <div className="absolute inset-0 hidden bg-gradient-to-r from-[#1a1a17]/45 via-transparent to-transparent md:block" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#1a1a17]/65 to-transparent" />
          {/* hairline frame */}
          <div className="pointer-events-none absolute inset-4 border border-[#f7f5f0]/25 md:inset-6" />
          <p className="cf-mono absolute bottom-8 left-8 right-8 text-[8px] uppercase leading-relaxed tracking-[0.3em] text-[#f7f5f0]/70 md:bottom-10 md:left-10">
            The first patient story
            <span className="mx-2 text-[#f7f5f0]/35">—</span>
            every life starts with care
          </p>
        </motion.div>
      </div>
    </section>
  );
}
