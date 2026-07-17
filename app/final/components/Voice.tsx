"use client";

import { motion } from "framer-motion";
import { SITE_PHOTOS } from "@/lib/concepts/shared";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * The doctor's word — half-plate B&W spread, one sentence that earned
 * the hero. Deliberately video-free.
 */
export default function Voice() {
  return (
    <section className="mt-24 border-t border-[#1a1a17]/25 md:mt-32">
      <div className="grid md:min-h-[640px] md:grid-cols-[55fr_45fr]">
        {/* ── Photo half — OR team under the lights ─────────────────── */}
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
          <div className="absolute inset-0 bg-[#1a1a17]/25" />
          <div className="absolute inset-0 hidden bg-gradient-to-l from-[#1a1a17]/50 via-transparent to-transparent md:block" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#1a1a17]/65 to-transparent" />
          {/* hairline frame */}
          <div className="pointer-events-none absolute inset-4 border border-[#f7f5f0]/25 md:inset-6" />
          <p className="cf-mono absolute bottom-8 left-8 right-8 text-[8px] uppercase leading-relaxed tracking-[0.3em] text-[#f7f5f0]/70 md:bottom-10 md:left-10">
            In the operatory
            <span className="mx-2 text-[#f7f5f0]/35">—</span>
            where every yes becomes care
          </p>
        </motion.div>

        {/* ── Quote half — ivory, Fraunces italic ───────────────────── */}
        <div className="flex items-center px-6 py-16 md:py-24 md:pl-14 md:pr-[max(3rem,calc((100vw-1480px)/2+3rem))]">
          <div className="w-full max-w-[560px]">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="cf-mono text-[10px] uppercase tracking-[0.26em] text-[#c2410c]"
            >
              04 — From the lighthouse practice
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
                className="cf-display block text-[56px] leading-[0.6] text-[#c2410c]/30"
              >
                &ldquo;
              </span>
              <p className="cf-display mt-4 text-[clamp(1.55rem,2.8vw,2.4rem)] italic leading-[1.3] tracking-[-0.01em] text-[#1a1a17]">
                I can explain a case for twenty minutes — or my patient can
                watch their own treatment in ninety seconds.{" "}
                <em className="text-[#c2410c]">
                  They say yes to what they see.
                </em>
                &rdquo;
              </p>
            </motion.blockquote>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, delay: 0.18, ease: EASE }}
              className="cf-mono mt-8 text-[10px] uppercase tracking-[0.22em] text-[#8a8578]"
            >
              <span className="text-[#1a1a17]">Dr. Jacob Zitterkopf</span>
              <span className="mx-2 text-[#1a1a17]/25">·</span>
              Orthodontist
              <span className="mx-2 text-[#1a1a17]/25">·</span>
              Opera lighthouse practice
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, delay: 0.26, ease: EASE }}
              className="cf-mono mt-10 flex gap-12 border-t border-[#1a1a17]/20 pt-6"
            >
              <div>
                <p className="text-[9px] uppercase tracking-[0.22em] text-[#8a8578]">
                  Case acceptance
                </p>
                <p className="mt-1.5 text-[16px] font-medium tracking-[0.02em] text-[#1a1a17]">
                  +14{" "}
                  <span className="text-[10px] uppercase text-[#8a8578]">pts</span>
                </p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-[0.22em] text-[#8a8578]">
                  Time-to-yes
                </p>
                <p className="mt-1.5 text-[16px] font-medium tracking-[0.02em] text-[#1a1a17]">
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
