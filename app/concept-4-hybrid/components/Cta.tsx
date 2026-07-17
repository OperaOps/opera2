"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CALENDLY_URL, SITE_PHOTOS } from "@/lib/concepts/shared";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Cta() {
  return (
    <section className="relative z-20 -mt-10 overflow-hidden rounded-t-[2.5rem] bg-[#08090a]">
      {/* photographic beat — the cinematic world returns for the ending */}
      <img
        src={SITE_PHOTOS.mayoClinic}
        alt="Mayo Clinic, Rochester"
        className="absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#08090a] via-[#08090a]/55 to-[#08090a]" />
      <div className="absolute inset-0 [background:radial-gradient(ellipse_60%_60%_at_50%_45%,transparent_0%,rgba(8,9,10,0.6)_100%)]" />

      <div className="relative mx-auto flex max-w-[880px] flex-col items-center px-6 pb-16 pt-32 text-center md:pt-44">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-7 text-[10px] font-medium uppercase tracking-[0.32em] text-[#8d83f2] [font-family:var(--c4-font-mono)]"
        >
          The future of patient education is visual
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, delay: 0.1, ease: EASE }}
          className="text-[clamp(2.5rem,6vw,4.9rem)] font-medium leading-[1.04] tracking-[-0.035em] text-[#f2efe8] [font-family:var(--c4-font-display)]"
        >
          See Opera{" "}
          <em className="italic text-[#b3a7ff] [font-family:var(--c4-font-serif)]">
            in action
          </em>
          .
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, delay: 0.22, ease: EASE }}
          className="mt-6 max-w-[480px] text-[15px] font-light leading-relaxed text-[#b9b5aa]"
        >
          A 20-minute demo — your treatment plans, visualized live.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, delay: 0.32, ease: EASE }}
          className="mt-10 flex flex-col items-center gap-5"
        >
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-full bg-[#f2efe8] px-9 py-4 text-[13px] font-semibold tracking-[-0.01em] text-[#0b0c0e] transition-colors duration-300 hover:bg-white [font-family:var(--c4-font-display)]"
          >
            Book a demo
            <ArrowRight
              size={14}
              strokeWidth={2.4}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
          <p className="text-[9px] uppercase tracking-[0.24em] text-white/35 [font-family:var(--c4-font-mono)]">
            25+ clinics live · no PMS migration required
          </p>
        </motion.div>
      </div>

      {/* footer */}
      <footer className="relative border-t border-white/[0.08]">
        <div className="mx-auto flex max-w-[1480px] flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row md:px-12">
          <span className="text-[15px] font-semibold tracking-[-0.02em] text-[#f2efe8] [font-family:var(--c4-font-display)]">
            Opera
          </span>
          <a
            href="mailto:opera@getopera.ai"
            className="text-[11px] tracking-[0.08em] text-white/45 transition-colors duration-300 hover:text-white/80 [font-family:var(--c4-font-mono)]"
          >
            opera@getopera.ai
          </a>
          <span className="text-[10px] tracking-[0.08em] text-white/30 [font-family:var(--c4-font-mono)]">
            © 2026 Opera AI
          </span>
        </div>
      </footer>
    </section>
  );
}
