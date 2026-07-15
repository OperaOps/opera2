"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const STORY = [
  { href: "/", label: "Treatment Videos", step: "The product" },
  { href: "/consult-intelligence", label: "Consult Intelligence", step: "Where it goes" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface-page/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-ink text-[11px] font-semibold text-white">
            O
          </span>
          <span className="text-[14px] font-semibold tracking-tight text-ink">
            Opera
          </span>
          <span className="h-3.5 w-px bg-line-strong" />
          <span className="text-[13px] font-medium text-ink-secondary">
            Periodontics · Prepared for Bola
          </span>
        </Link>

        <nav className="flex items-center gap-0.5">
          {STORY.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-md px-3 py-1.5 text-[13px] transition-colors ${
                  active
                    ? "font-medium text-ink"
                    : "font-normal text-ink-muted hover:text-ink-secondary"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-md bg-surface-sunken"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

/** Quiet next-step footer used at the bottom of each page. */
export function StoryFooter({ current }: { current: string }) {
  const idx = STORY.findIndex((s) => s.href === current);
  const next = STORY[(idx + 1) % STORY.length];
  return (
    <div className="mx-auto mt-20 max-w-6xl px-6 pb-16">
      <Link
        href={next.href}
        className="group flex items-center justify-between rounded-xl border border-line bg-surface px-6 py-5 shadow-card transition-shadow hover:shadow-raised"
      >
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-muted">
            {next.step}
          </p>
          <p className="mt-1 text-[15px] font-semibold text-ink">{next.label}</p>
        </div>
        <ArrowRight className="h-4 w-4 text-ink-muted transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
