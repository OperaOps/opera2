"use client";

import { ArrowUpRight } from "lucide-react";
import { CALENDLY_URL } from "@/lib/concepts/shared";

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="bg-gradient-to-b from-[#050607]/95 via-[#050607]/50 to-transparent pb-6">
        <div className="mx-auto flex max-w-[1680px] items-center justify-between px-6 pt-5 md:px-12">
          <a
            href="#top"
            className="text-[15px] font-semibold uppercase tracking-[0.45em] text-[#f2f0eb]"
          >
            Opera
          </a>
          <div className="flex items-center gap-8">
            <span className="hidden [font-family:var(--c1-mono)] text-[10px] uppercase tracking-[0.3em] text-white/35 md:block">
              Visual patient education
            </span>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 border border-white/20 px-5 py-2.5 [font-family:var(--c1-mono)] text-[10px] uppercase tracking-[0.25em] text-[#f2f0eb] transition-colors duration-300 hover:border-[#67e8f9]/60 hover:text-[#a5f3fc]"
            >
              Book a demo
              <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
