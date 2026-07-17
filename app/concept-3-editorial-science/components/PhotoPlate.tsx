"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SITE_PHOTOS } from "@/lib/concepts/shared";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function PhotoPlate() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);

  return (
    <section
      ref={ref}
      className="relative h-[92vh] min-h-[560px] overflow-hidden"
    >
      {/* Oversized photograph, drifting slower than the scroll */}
      <motion.img
        src={SITE_PHOTOS.mayoClinic}
        alt="Mayo Clinic, Rochester, Minnesota"
        style={{ y }}
        className="absolute inset-x-0 top-[-10%] h-[120%] w-full object-cover"
      />
      {/* Scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

      <div className="relative mx-auto flex h-full max-w-[1400px] flex-col justify-between px-6 py-14 md:px-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE }}
          className="flex items-baseline justify-between border-b border-[#f7f5f0]/25 pb-3"
        >
          <span className="c3-mono text-[10px] uppercase tracking-[0.24em] text-[#f7f5f0]/80">
            Plate VI — Fieldwork
          </span>
          <span className="c3-mono text-[10px] uppercase tracking-[0.24em] text-[#f7f5f0]/60">
            Mayo Clinic · Rochester, MN
          </span>
        </motion.div>

        <div className="max-w-3xl pb-4">
          <motion.p
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.1, ease: EASE }}
            className="c3-display text-[clamp(2.4rem,5.4vw,4.8rem)] font-light italic leading-[1.06] tracking-[-0.02em] text-[#f7f5f0]"
          >
            Built for institutions that take understanding seriously.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            className="c3-mono mt-8 text-[10px] uppercase leading-loose tracking-[0.22em] text-[#f7f5f0]/75"
          >
            From single-chair practices to academic medicine —
            <br className="hidden sm:block" /> the standard of explanation
            should be the same.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
