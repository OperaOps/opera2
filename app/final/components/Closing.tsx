"use client";

import { CALENDLY_URL, SITE_PHOTOS } from "@/lib/concepts/shared";

export default function Closing() {
  return (
    <section className="border-t border-[#1a1a17]/15">
      {/* ——— One button. That's the section. ——— */}
      <div className="flex justify-center py-24 md:py-32">
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="cf-button-solid cf-mono px-10 py-4 text-[12px] uppercase tracking-[0.26em]"
        >
          Book a demo
        </a>
      </div>

      {/* ——— Trusted by ——— */}
      <div className="bg-black py-10 md:py-14">
        <p className="cf-mono mb-7 text-center text-[9px] uppercase tracking-[0.3em] text-white/45">
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
      <footer className="border-t border-[#1a1a17]/10">
        <div className="mx-auto flex max-w-[1480px] flex-col items-center justify-between gap-2 px-6 py-5 md:flex-row md:px-10">
          <span className="cf-display text-[16px] text-[#1a1a17]">
            Opera<span className="text-[#7c3aed]">.</span>
          </span>
          <span className="cf-mono text-center text-[9px] uppercase tracking-[0.2em] text-[#8a8578]">
            opera@getopera.ai · © 2026 Opera AI
          </span>
        </div>
      </footer>
    </section>
  );
}
