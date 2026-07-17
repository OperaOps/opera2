"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CALENDLY_URL, SITE_PHOTOS } from "@/lib/concepts/shared";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Closing() {
  return (
    <section className="mt-24 md:mt-32">
      {/* ——— Full-bleed plate: three surgical lights, heavy scrim ——— */}
      <div className="relative flex h-[92vh] min-h-[560px] items-center overflow-hidden">
        <img
          src={SITE_PHOTOS.surgeryLights}
          alt="Three surgical lights overhead in a dark operating room"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#1a1a17]/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a17]/85 via-transparent to-[#1a1a17]/45" />

        <div className="relative mx-auto w-full max-w-[1480px] px-6 md:px-10">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="cf-mono text-[10px] uppercase tracking-[0.26em] text-[#f7f5f0]/70"
          >
            Plate IV — In closing
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: EASE }}
            className="cf-display mt-8 max-w-3xl text-[clamp(2.8rem,6.5vw,5.5rem)] font-light leading-[1.0] tracking-[-0.025em] text-[#f7f5f0]"
          >
            Show the treatment.
            <br />
            <em className="italic">Win the case.</em>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
            className="mt-12"
          >
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cf-link group cf-mono gap-2.5 text-[14px] uppercase tracking-[0.24em] text-[#c2410c]"
            >
              Book a demo
              <ArrowUpRight
                size={15}
                strokeWidth={1.75}
                className="translate-y-[2px] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
            <p className="cf-mono mt-6 text-[10px] uppercase tracking-[0.2em] text-[#f7f5f0]/60">
              20 minutes · your cases, visualized
            </p>
          </motion.div>
        </div>
      </div>

      {/* ——— Colophon, one line on ink ——— */}
      <footer className="bg-[#1a1a17]">
        <div className="mx-auto flex max-w-[1480px] flex-col items-center justify-between gap-2 border-t border-[#f7f5f0]/15 px-6 py-5 md:flex-row md:px-10">
          <span className="cf-display text-[16px] text-[#f7f5f0]">
            Opera<span className="text-[#c2410c]">.</span>
          </span>
          <span className="cf-mono text-center text-[9px] uppercase tracking-[0.2em] text-[#f7f5f0]/55">
            opera@getopera.ai · © 2026 Opera AI · Set in Fraunces, Archivo &amp; IBM Plex Mono
          </span>
        </div>
      </footer>
    </section>
  );
}
