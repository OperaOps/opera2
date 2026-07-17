"use client";

import { CALENDLY_URL } from "@/lib/concepts/shared";

const LINKS = [
  { href: "#wall", label: "The wall" },
  { href: "#dataset", label: "The dataset" },
  { href: "#video", label: "The video" },
  { href: "#journey", label: "The journey" },
];

export default function Nav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-[#1a1a17]/15 bg-[#f7f5f0]/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-[1480px] items-center justify-between px-6 md:px-10">
        <a href="#top" className="flex items-baseline gap-2.5">
          <span className="cf-display text-[22px] leading-none tracking-[-0.01em]">
            Opera<span className="text-[#c2410c]">.</span>
          </span>
          <span className="cf-mono hidden text-[9px] uppercase tracking-[0.24em] text-[#8a8578] lg:inline">
            A visual system for patient understanding
          </span>
        </a>

        <div className="flex items-center gap-8">
          <div className="hidden items-center gap-7 md:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="cf-link cf-mono text-[10px] uppercase tracking-[0.2em] text-[#1a1a17]/80 hover:text-[#1a1a17]"
              >
                {l.label}
              </a>
            ))}
          </div>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cf-button-solid cf-mono px-5 py-2.5 text-[10px] uppercase tracking-[0.24em]"
          >
            Book a demo
          </a>
        </div>
      </div>
    </nav>
  );
}
