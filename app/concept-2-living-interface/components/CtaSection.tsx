"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CALENDLY_URL, CLIPS, type Clip } from "@/lib/concepts/shared";
import ClipVideo from "./ClipVideo";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const clip = (src: string): Clip => CLIPS.find((c) => c.src === src) ?? CLIPS[0];

const BACKDROP: (Clip | { plate: string[] })[] = [
  clip("/videos/shared-smile-outcome.mp4"),
  { plate: ["outcome", "module 41 / 44"] },
  clip("/videos/expander-wide.mp4"),
  { plate: ["case accepted", "day 2"] },
  clip("/videos/knee5.mp4"),
  { plate: ["watched 3×", "shared with spouse"] },
];

export default function CtaSection() {
  return (
    <section className="relative overflow-hidden py-32 lg:py-44">
      {/* soft living backdrop — the hero grid, dissolved */}
      <div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center opacity-60 blur-[6px]"
        style={{
          maskImage:
            "radial-gradient(70% 70% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(70% 70% at 50% 50%, black 30%, transparent 100%)",
        }}
      >
        <div className="grid w-[1300px] max-w-none shrink-0 grid-cols-3 gap-5 [transform:rotate(-3deg)_scale(1.12)]">
          {BACKDROP.map((item, i) =>
            "plate" in item ? (
              <div
                key={i}
                className={`flex flex-col justify-center rounded-2xl border border-[#4f46e5]/10 bg-[#4f46e5]/[0.05] p-6 ${
                  i % 2 ? "translate-y-8" : ""
                }`}
              >
                {item.plate.map((l) => (
                  <p
                    key={l}
                    className="text-[11px] uppercase leading-[2] tracking-[0.2em] text-[#4f46e5] [font-family:var(--c2-font-mono)]"
                  >
                    {l}
                  </p>
                ))}
              </div>
            ) : (
              <ClipVideo
                key={i}
                clip={item}
                className={`aspect-[4/3] rounded-2xl ${i % 2 ? "translate-y-8" : ""}`}
              />
            )
          )}
        </div>
      </div>

      {/* panel */}
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mx-auto max-w-[640px] rounded-[32px] border border-[#101418]/[0.06] bg-white/85 px-8 py-14 text-center shadow-[0_60px_140px_-40px_rgba(16,20,24,0.35)] backdrop-blur-2xl sm:px-14"
        >
          <p className="flex items-center justify-center gap-2.5 text-[11px] uppercase tracking-[0.22em] text-[#101418]/45 [font-family:var(--c2-font-mono)]">
            <span className="c2-live-dot" />
            05 — see it live
          </p>
          <h2 className="mt-6 text-[42px] font-medium leading-[1.02] tracking-[-0.025em] text-[#101418] sm:text-[56px] [font-family:var(--c2-font-display)]">
            Show the treatment.
            <br />
            <span className="text-[#4f46e5]">Win the case.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[400px] text-[15.5px] font-light leading-relaxed text-[#101418]/60">
            A 20-minute walkthrough — your treatments, visualized, and the
            intent signals behind every consult.
          </p>
          <div className="mt-9 flex justify-center">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#4f46e5] py-4 pl-9 pr-8 text-[15px] font-medium tracking-wide text-white shadow-[0_20px_50px_-16px_rgba(79,70,229,0.55)]"
            >
              <span className="absolute inset-0 translate-y-full bg-[#6366f1] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
              <span className="relative">Book a demo</span>
              <ArrowRight
                size={16}
                className="relative transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>
          <p className="mt-5 text-[11px] uppercase tracking-[0.18em] text-[#101418]/35 [font-family:var(--c2-font-mono)]">
            your cases, visualized · no setup required
          </p>
        </motion.div>
      </div>
    </section>
  );
}
