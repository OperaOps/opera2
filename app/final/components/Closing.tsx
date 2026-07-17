"use client";

import { CALENDLY_URL } from "@/lib/concepts/shared";

/** After the newborn photograph: one button on black, one line of footer. */
export default function Closing() {
  return (
    <section className="bg-black">
      <div className="flex justify-center py-28 md:py-36">
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="cf-body bg-[#ffffff] px-12 py-4 text-[16px] font-medium text-[#1a1a17] transition-colors duration-300 hover:bg-[#5f7a61] hover:text-white"
        >
          Book a demo
        </a>
      </div>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1480px] items-center justify-between px-6 py-6 md:px-10">
          <span className="cf-display text-[17px] text-[#ffffff]">
            Opera<span className="text-[#a9c0aa]">AI</span>
          </span>
          <span className="cf-body text-[14px] text-white/60">OperaAI Inc. · 2026</span>
        </div>
      </footer>
    </section>
  );
}
