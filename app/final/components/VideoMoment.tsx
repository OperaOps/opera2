"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAutoplayInView } from "./media";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Viewfinder corner ticks. */
function Ticks() {
  return (
    <>
      <span className="pointer-events-none absolute left-5 top-5 h-5 w-5 border-l border-t border-[#f7f5f0]/60 md:left-8 md:top-8" />
      <span className="pointer-events-none absolute right-5 top-5 h-5 w-5 border-r border-t border-[#f7f5f0]/60 md:right-8 md:top-8" />
      <span className="pointer-events-none absolute bottom-5 left-5 h-5 w-5 border-b border-l border-[#f7f5f0]/60 md:bottom-8 md:left-8" />
      <span className="pointer-events-none absolute bottom-5 right-5 h-5 w-5 border-b border-r border-[#f7f5f0]/60 md:bottom-8 md:right-8" />
    </>
  );
}

export default function VideoMoment() {
  const videoRef = useAutoplayInView("0px");
  const [progress, setProgress] = useState(0);

  return (
    <section id="video" className="scroll-mt-14">
      {/* ——— Entering headline, on ivory ——— */}
      <div className="mx-auto max-w-[1480px] px-6 pb-14 pt-24 md:px-10 md:pt-32">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex items-baseline justify-between border-b border-[#1a1a17]/25 pb-3"
        >
          <span className="cf-mono text-[10px] uppercase tracking-[0.24em] text-[#c2410c]">
            02 — One patient, one video
          </span>
          <span className="cf-mono hidden text-[10px] uppercase tracking-[0.2em] text-[#8a8578] sm:inline">
            Plate III — The product, at full frame
          </span>
        </motion.div>

        <div className="mt-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: EASE }}
            className="cf-display max-w-3xl text-[clamp(2.2rem,4.6vw,3.9rem)] font-light leading-[1.0] tracking-[-0.025em]"
          >
            One patient. One video.{" "}
            <em className="italic text-[#c2410c]">Made in minutes.</em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, delay: 0.12, ease: EASE }}
            className="cf-body max-w-sm text-[14px] leading-relaxed text-[#1a1a17]/80"
          >
            Not a template — James&rsquo;s own screening, explained in his own
            plan&rsquo;s terms.
          </motion.p>
        </div>
      </div>

      {/* ——— The full-frame video ——— */}
      <div className="cf-vignette relative h-[100svh] min-h-[560px] overflow-hidden bg-[#1a1a17]">
        <video
          ref={videoRef}
          src="/videos/library/colonoscopy-patient-video.mp4"
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          onTimeUpdate={(e) => {
            const v = e.currentTarget;
            if (v.duration > 0) setProgress(v.currentTime / v.duration);
          }}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* edge scrims so the plates read over the footage */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/55 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/60 to-transparent" />

        <Ticks />

        {/* top-left mono plates */}
        <div className="absolute left-5 top-12 space-y-2 md:left-14 md:top-16">
          <motion.p
            initial={{ opacity: 0, x: -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="cf-mono inline-block bg-[#1a1a17]/70 px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-[#f7f5f0] backdrop-blur-sm"
          >
            For James · Colon cancer screening
          </motion.p>
          <motion.p
            initial={{ opacity: 0, x: -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.7, delay: 0.42, ease: EASE }}
            className="cf-mono block"
          >
            <span className="inline-block bg-[#1a1a17]/70 px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-[#f7f5f0]/85 backdrop-blur-sm">
              Rendered from his own chart · <span className="text-[#f7f5f0]">92 seconds</span>
            </span>
          </motion.p>
        </div>

        {/* bottom-right engagement readout */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7, delay: 0.64, ease: EASE }}
          className="absolute bottom-12 right-5 md:bottom-16 md:right-14"
        >
          <p className="cf-mono border-l-2 border-[#c2410c] bg-[#1a1a17]/70 px-3 py-2 text-right text-[10px] uppercase leading-loose tracking-[0.2em] text-[#f7f5f0]/90 backdrop-blur-sm">
            Opened same evening
            <br />
            Watched 2× · Shared with daughter
          </p>
        </motion.div>

        {/* thin red progress hairline */}
        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-[#f7f5f0]/15">
          <div
            className="h-full origin-left bg-[#c2410c]"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>
      </div>
    </section>
  );
}
