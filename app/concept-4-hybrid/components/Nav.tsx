"use client";

import { ArrowUpRight } from "lucide-react";
import { CALENDLY_URL } from "@/lib/concepts/shared";

/**
 * One nav for two worlds: mix-blend-difference keeps the wordmark legible
 * over the dark hero AND the warm-white body without a color swap.
 */
export default function Nav() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 mix-blend-difference">
      <div className="mx-auto flex max-w-[1480px] items-center justify-between px-6 py-6 text-white md:px-12">
        <a
          href="#c4-top"
          className="pointer-events-auto text-[18px] font-semibold tracking-[-0.02em] [font-family:var(--c4-font-display)]"
        >
          Opera
        </a>
        <nav className="pointer-events-auto flex items-center gap-8">
          <a
            href="#c4-platform"
            className="hidden text-[10px] font-medium uppercase tracking-[0.22em] opacity-60 transition-opacity duration-300 hover:opacity-100 sm:block [font-family:var(--c4-font-mono)]"
          >
            The platform
          </a>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 border-b border-white/30 pb-1 text-[13px] font-medium tracking-[-0.01em] transition-colors duration-300 hover:border-white [font-family:var(--c4-font-display)]"
          >
            Book a demo
            <ArrowUpRight
              size={13}
              strokeWidth={2}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </nav>
      </div>
    </header>
  );
}
