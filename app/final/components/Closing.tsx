"use client";

import { CALENDLY_URL, SITE_PHOTOS } from "@/lib/concepts/shared";

/** Everything after the newborn photograph lives on black. */
export default function Closing() {
  return (
    <section className="bg-black">
      {/* ——— One button. That's the section. ——— */}
      <div className="flex justify-center py-24 md:py-32">
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="cf-mono bg-[#f7f5f0] px-11 py-4 text-[13.5px] uppercase tracking-[0.26em] text-[#1a1a17] transition-colors duration-300 hover:bg-[#7c3aed] hover:text-white"
        >
          Book a demo
        </a>
      </div>

      {/* ——— Trusted by ——— */}
      <div className="pb-12 md:pb-16">
        <p className="cf-mono mb-8 text-center text-[12.5px] uppercase tracking-[0.3em] text-white/50">
          Trusted by
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={SITE_PHOTOS.trustedByStrip}
          alt="Cedars Sinai, Greyfinch, Dartmouth Health, Confido Health, PwC, YSecurity, SV Angel, Stanford, Opendental, Pareto, Curve Dental, Falcon Orthodontics, Truveta, Harvard Medical School"
          loading="lazy"
          className="mx-auto w-full max-w-[1080px] px-6"
        />
      </div>

      {/* ——— Colophon ——— */}
      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1480px] flex-col items-center justify-between gap-2 px-6 py-6 md:flex-row md:px-10">
          <span className="cf-display text-[17px] text-[#f7f5f0]">
            Opera<span className="text-[#a78bfa]">.</span>
          </span>
          <span className="cf-mono text-center text-[12px] uppercase tracking-[0.2em] text-white/55">
            opera@getopera.ai · © 2026 Opera AI
          </span>
        </div>
      </footer>
    </section>
  );
}
