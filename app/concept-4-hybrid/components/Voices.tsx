"use client";

import { motion } from "framer-motion";
import { SITE_PHOTOS } from "@/lib/concepts/shared";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Photographic interlude — the doctor's voice. A half-page B&W spread
 * between the platform and the finale. Deliberately unnumbered and
 * video-free: one photograph, one sentence that earned the hero.
 */
export default function Voices() {
  return (
    <section className="mt-32 md:mt-44">
      <div className="grid md:min-h-[640px] md:grid-cols-[55fr_45fr]">
        {/* ── Photo half — OR team under the lights, cinematic scrim ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 1.2, ease: EASE }}
          className="relative h-[52vh] min-h-[360px] md:h-auto md:min-h-full"
        >
          <img
            src={SITE_PHOTOS.surgeryBW}
            alt="A surgical team at work under operating-room lights — black and white"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* cinematic scrims — darken overall, pool toward the quote side */}
          <div className="absolute inset-0 bg-[#08090a]/25" />
          <div className="absolute inset-0 hidden bg-gradient-to-l from-[#08090a]/50 via-transparent to-transparent md:block" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#08090a]/65 to-transparent" />
          {/* hairline frame */}
          <div className="pointer-events-none absolute inset-4 border border-white/25 md:inset-6" />
          <p className="absolute bottom-8 left-8 right-8 text-[8px] uppercase leading-relaxed tracking-[0.3em] text-white/65 md:bottom-10 md:left-10 [font-family:var(--c4-font-mono)]">
            In the operatory
            <span className="mx-2 text-white/35">—</span>
            where every yes becomes care
          </p>
        </motion.div>

        {/* ── Quote half — warm white, serif italic ─────────────────── */}
        <div className="flex items-center px-6 py-16 md:py-24 md:pl-14 md:pr-[max(3rem,calc((100vw-1480px)/2+3rem))]">
          <div className="w-full max-w-[560px]">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="text-[10px] font-medium uppercase tracking-[0.26em] text-[#5b4fe8] [font-family:var(--c4-font-mono)]"
            >
              From the lighthouse practice
            </motion.p>

            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: 0.08, ease: EASE }}
              className="mt-8"
            >
              <span
                aria-hidden
                className="block text-[56px] leading-[0.6] text-[#5b4fe8]/30 [font-family:var(--c4-font-serif)]"
              >
                &ldquo;
              </span>
              <p className="mt-4 text-[clamp(1.55rem,2.8vw,2.4rem)] italic leading-[1.3] tracking-[-0.01em] text-[#14161a] [font-family:var(--c4-font-serif)]">
                I can explain a case for twenty minutes — or my patient can
                watch their own treatment in ninety seconds.{" "}
                <span className="text-[#5b4fe8]">
                  They say yes to what they see.
                </span>
                &rdquo;
              </p>
            </motion.blockquote>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, delay: 0.18, ease: EASE }}
              className="mt-8 text-[10px] uppercase tracking-[0.22em] text-[#8a867b] [font-family:var(--c4-font-mono)]"
            >
              <span className="text-[#14161a]">Dr. Jacob Zitterkopf</span>
              <span className="mx-2 text-[#c9c5b8]">·</span>
              Orthodontist
              <span className="mx-2 text-[#c9c5b8]">·</span>
              Opera lighthouse practice
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, delay: 0.26, ease: EASE }}
              className="mt-10 flex gap-12 border-t border-[#e4e1d6] pt-6 [font-family:var(--c4-font-mono)]"
            >
              <div>
                <p className="text-[9px] uppercase tracking-[0.22em] text-[#a8a396]">
                  Case acceptance
                </p>
                <p className="mt-1.5 text-[16px] font-medium tracking-[0.02em] text-[#14161a]">
                  +14{" "}
                  <span className="text-[10px] uppercase text-[#8a867b]">
                    pts
                  </span>
                </p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-[0.22em] text-[#a8a396]">
                  Time-to-yes
                </p>
                <p className="mt-1.5 text-[16px] font-medium tracking-[0.02em] text-[#14161a]">
                  &minus;38%
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
