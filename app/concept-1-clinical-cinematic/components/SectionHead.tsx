"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

export default function SectionHead({
  index,
  label,
  title,
  dim,
  sub,
}: {
  index: string;
  label: string;
  title: string;
  /** optional second, dimmed line of the headline */
  dim?: string;
  sub?: string;
}) {
  return (
    <div className="mb-14 md:mb-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: EASE }}
        className="mb-6 flex items-center gap-4"
      >
        <span className="[font-family:var(--c1-mono)] text-[11px] font-medium tracking-[0.3em] text-[#67e8f9]">
          {index}
        </span>
        <span className="[font-family:var(--c1-mono)] text-[11px] uppercase tracking-[0.35em] text-white/40">
          {label}
        </span>
        <span className="h-px flex-1 bg-white/10" />
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.1, delay: 0.08, ease: EASE }}
        className="max-w-4xl text-[clamp(2rem,4.6vw,3.9rem)] font-medium leading-[1.04] tracking-[-0.025em] text-[#f2f0eb]"
      >
        {title}
        {dim ? <span className="block text-white/35">{dim}</span> : null}
      </motion.h2>
      {sub ? (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, delay: 0.18, ease: EASE }}
          className="mt-6 max-w-xl text-[15px] font-light leading-relaxed text-white/55"
        >
          {sub}
        </motion.p>
      ) : null}
    </div>
  );
}
