"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { CALENDLY_URL } from "@/lib/concepts/shared";

const LINKS = [
  { label: "Why visual", href: "#why" },
  { label: "Ask Opera", href: "#ask" },
  { label: "Intelligence", href: "#intelligence" },
  { label: "Platform", href: "#platform" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#fafaf8]/80 shadow-[0_1px_0_rgba(16,20,24,0.06)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 lg:px-10">
        <a
          href="#top"
          className="flex items-baseline gap-2 [font-family:var(--c2-font-display)]"
        >
          <span className="text-[22px] font-semibold tracking-tight text-[#101418]">
            Opera
          </span>
          <span className="hidden text-[10px] uppercase tracking-[0.22em] text-[#101418]/45 sm:inline [font-family:var(--c2-font-mono)]">
            visual patient education
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-[11px] uppercase tracking-[0.18em] text-[#101418]/55 transition-colors hover:text-[#101418] [font-family:var(--c2-font-mono)]"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#4f46e5] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-full bg-[#101418] py-2.5 pl-5 pr-4 text-[13px] font-medium tracking-wide text-white"
        >
          <span className="absolute inset-0 translate-y-full bg-[#4f46e5] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
          <span className="relative">Book a demo</span>
          <ArrowUpRight
            size={14}
            className="relative transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
      </div>
    </header>
  );
}
