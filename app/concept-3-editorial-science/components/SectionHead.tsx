"use client";

import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function SectionHead({
  index,
  label,
  title,
  note,
}: {
  index: string;
  label: string;
  title: React.ReactNode;
  note?: string;
}) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease: EASE }}
      className="border-t border-[#1a1a17]/30 pt-4"
    >
      <div className="flex items-baseline justify-between gap-6">
        <div className="flex items-baseline gap-4">
          <span className="c3-mono text-[11px] tracking-[0.2em] text-[#c2410c]">
            {index}
          </span>
          <span className="c3-mono text-[11px] uppercase tracking-[0.24em] text-[#1a1a17]">
            {label}
          </span>
        </div>
        {note && (
          <span className="c3-mono hidden text-[10px] uppercase tracking-[0.18em] text-[#8a8578] md:block">
            {note}
          </span>
        )}
      </div>
      <h2 className="c3-display mt-8 max-w-4xl text-[clamp(2.4rem,5vw,4.5rem)] font-light leading-[1.02] tracking-[-0.02em]">
        {title}
      </h2>
    </motion.header>
  );
}
