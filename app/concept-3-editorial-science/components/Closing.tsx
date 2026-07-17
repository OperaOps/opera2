"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CALENDLY_URL, CLIPS, type Clip } from "@/lib/concepts/shared";
import { ClipPlate } from "./media";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const STRIP: { clip: Clip; fig: string }[] = [
  { clip: CLIPS.find((c) => c.src === "/videos/whitening-step1-treatment.mp4")!, fig: "FIG. 38" },
  { clip: CLIPS.find((c) => c.src === "/videos/retainer-on-teeth.mp4")!, fig: "FIG. 41" },
  { clip: CLIPS.find((c) => c.src === "/videos/knee5.mp4")!, fig: "FIG. 44" },
];

export default function Closing() {
  return (
    <section className="border-t border-[#1a1a17]/25">
      <div className="mx-auto max-w-[1400px] px-6 pb-16 pt-28 text-center md:px-10 md:pt-36">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="c3-mono text-[10px] uppercase tracking-[0.26em] text-[#8a8578]"
        >
          Colophon — In closing
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: EASE }}
          className="c3-display mx-auto mt-8 max-w-3xl text-[clamp(2.8rem,6.5vw,5.5rem)] font-light leading-[1.0] tracking-[-0.025em]"
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
            className="c3-link group c3-mono gap-2.5 text-[14px] uppercase tracking-[0.24em] text-[#c2410c]"
          >
            See Opera in action
            <ArrowUpRight
              size={15}
              strokeWidth={1.75}
              className="translate-y-[2px] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
          <p className="c3-mono mt-6 text-[10px] uppercase tracking-[0.2em] text-[#8a8578]">
            20 minutes · your cases, rendered live
          </p>
        </motion.div>

        {/* Final specimen strip */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
          className="mx-auto mt-20 grid max-w-2xl grid-cols-3 gap-4"
        >
          {STRIP.map((s) => (
            <ClipPlate
              key={s.clip.src}
              clip={s.clip}
              fig={s.fig}
              aspect="aspect-[4/3]"
            />
          ))}
        </motion.div>
      </div>

      {/* Footer colophon */}
      <footer className="border-t border-[#1a1a17]/25">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 px-6 py-6 md:flex-row md:px-10">
          <span className="c3-display text-[16px]">
            Opera<span className="text-[#c2410c]">.</span>
          </span>
          <span className="c3-mono text-center text-[9px] uppercase tracking-[0.2em] text-[#8a8578]">
            The future of patient education is visual · opera@getopera.ai
          </span>
          <span className="c3-mono text-[9px] uppercase tracking-[0.2em] text-[#8a8578]">
            © 2026 Opera AI · Set in Fraunces, Archivo &amp; IBM Plex Mono
          </span>
        </div>
      </footer>
    </section>
  );
}
