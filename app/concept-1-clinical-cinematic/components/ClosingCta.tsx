"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CALENDLY_URL } from "@/lib/concepts/shared";
import ClipVideo from "./ClipVideo";

const EASE = [0.22, 1, 0.36, 1];

const STRIP_CLIPS = [
  { src: "/videos/bracesoutcome.mp4", label: "Post-treatment alignment" },
  { src: "/videos/whitening-step2-detail.mp4", label: "Shade lift detail" },
  { src: "/videos/knee5.mp4", label: "Post-op range of motion" },
];

export default function ClosingCta() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#050607] py-36 md:py-48">
        {/* return to the wall — a narrow strip, heavily vignetted */}
        <div className="absolute inset-x-0 top-1/2 flex h-[290px] -translate-y-1/2 gap-[3px] opacity-45">
          {STRIP_CLIPS.map((c) => (
            <div key={c.src} className="relative min-w-0 flex-1 overflow-hidden">
              <ClipVideo
                src={c.src}
                className="h-full w-full object-cover brightness-[0.8] saturate-[0.85]"
              />
              <span className="absolute bottom-3 left-3 [font-family:var(--c1-mono)] text-[8.5px] uppercase tracking-[0.22em] text-white/40">
                {c.label}
              </span>
            </div>
          ))}
        </div>
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 62% 85% at 50% 50%, rgba(5,6,7,0.94) 0%, rgba(5,6,7,0.55) 55%, rgba(5,6,7,0.15) 80%)",
          }}
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#050607] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050607] to-transparent" />

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: EASE }}
            className="[font-family:var(--c1-mono)] text-[10px] tracking-[0.42em] text-white/40"
          >
            06 · THE FUTURE OF PATIENT EDUCATION IS VISUAL
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.3, delay: 0.1, ease: EASE }}
            className="mt-7 text-[clamp(2.6rem,6vw,5.4rem)] font-medium leading-[1.0] tracking-[-0.03em] text-[#f2f0eb]"
          >
            Show the treatment.
            <span className="block text-[#a5f3fc]">Win the case.</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, delay: 0.25, ease: EASE }}
            className="mt-10 flex flex-col items-center gap-5"
          >
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-[#f2f0eb] px-10 py-4 [font-family:var(--c1-mono)] text-[11px] uppercase tracking-[0.25em] text-[#050607] transition-colors duration-300 hover:bg-white"
            >
              Book a demo
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
            </a>
            <span className="[font-family:var(--c1-mono)] text-[9px] tracking-[0.3em] text-white/30">
              25+ CLINICS · $420M+ CLINICAL REVENUE ANALYZED
            </span>
          </motion.div>
        </div>
      </section>

      {/* footer */}
      <footer className="border-t border-white/10 bg-[#050607]">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 px-6 py-10 md:flex-row md:px-12">
          <span className="text-[13px] font-semibold uppercase tracking-[0.45em] text-[#f2f0eb]">
            Opera
          </span>
          <a
            href="mailto:opera@getopera.ai"
            className="[font-family:var(--c1-mono)] text-[10px] tracking-[0.25em] text-white/40 transition-colors hover:text-[#a5f3fc]"
          >
            OPERA@GETOPERA.AI
          </a>
          <span className="[font-family:var(--c1-mono)] text-[10px] tracking-[0.25em] text-white/30">
            © 2026 OPERA AI
          </span>
        </div>
      </footer>
    </>
  );
}
