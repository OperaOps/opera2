"use client";

import { motion } from "framer-motion";
import { SITE_PHOTOS } from "@/lib/concepts/shared";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * The human close: Jacob's sentence on the left, the first patient
 * story on the right. Deliberately spacious and video free.
 */
export default function Voice() {
  return (
    <section className="border-t border-[#1a1a17]/15">
      <div className="grid md:min-h-[88vh] md:grid-cols-[52fr_48fr]">
        {/* ── Quote half ─────────────────────────────────────────────── */}
        <div className="flex items-center px-6 py-24 md:py-32 md:pl-[max(3rem,calc((100vw-1480px)/2+3rem))] md:pr-20">
          <div className="w-full max-w-[600px]">
            <motion.blockquote
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, ease: EASE }}
            >
              <span
                aria-hidden
                className="cf-display block text-[64px] leading-[0.6] text-[#5f7a61]/25"
              >
                &ldquo;
              </span>
              <p className="cf-display mt-5 text-[clamp(1.7rem,3vw,2.6rem)] font-light italic leading-[1.28] tracking-[-0.01em] text-[#1a1a17]">
                I can explain a case for twenty minutes, or my patient can
                watch their own treatment in ninety seconds.{" "}
                <em className="text-[#5f7a61]">They say yes to what they see.</em>
                &rdquo;
              </p>
            </motion.blockquote>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: 0.18, ease: EASE }}
              className="cf-mono mt-10 text-[13px] uppercase tracking-[0.22em] text-[#6e7a71]"
            >
              <span className="text-[#1a1a17]">Dr. Umesh Kodu</span>
              <span className="mx-2 text-[#1a1a17]/25">·</span>
              Pediatrician
              <span className="mx-2 text-[#1a1a17]/25">·</span>
              Penguin Pediatrics
            </motion.p>
          </div>
        </div>

        {/* ── Photo half: where understanding ends up ─────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 1.3, ease: EASE }}
          className="relative h-[60vh] min-h-[420px] md:h-auto md:min-h-full"
        >
          <img
            src="/videos/sitepics/newborn-hero.jpg"
            alt="A newborn's first moments, black and white"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#1a1a17]/55 to-transparent" />
          <p className="cf-mono absolute bottom-8 left-8 right-8 text-[11.5px] uppercase leading-relaxed tracking-[0.3em] text-white/70 md:bottom-10 md:left-10">
            Every patient story starts with care
          </p>
        </motion.div>
      </div>
    </section>
  );
}
