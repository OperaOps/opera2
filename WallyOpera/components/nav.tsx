"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export const STORY = [
  { href: "/", label: "Overview", step: "Platform" },
  { href: "/pre-consult", label: "Pre-Consult", step: "Before" },
  { href: "/live", label: "Live Consultation", step: "During" },
  { href: "/intelligence", label: "Consult Intelligence", step: "After" },
  { href: "/follow-up", label: "Patient Follow-up", step: "Follow-up" },
  { href: "/organization", label: "Organization", step: "Learn" },
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
            Consult Intelligence
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex">
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

        <span className="hidden rounded-full border border-line bg-surface px-2.5 py-1 text-[11px] font-medium text-ink-muted lg:block">
          Interactive demo
        </span>
      </div>
    </header>
  );
}

export function StoryFooter({ current }: { current: string }) {
  const idx = STORY.findIndex((s) => s.href === current);
  const prev = idx > 0 ? STORY[idx - 1] : null;
  const next = idx < STORY.length - 1 ? STORY[idx + 1] : null;

  return (
    <div className="mx-auto mt-20 max-w-6xl px-6 pb-16">
      <div className="flex items-center justify-between border-t border-line pt-6">
        {prev ? (
          <Link
            href={prev.href}
            className="group text-[13px] text-ink-muted transition-colors hover:text-ink"
          >
            <span className="mr-1.5 inline-block transition-transform group-hover:-translate-x-0.5">
              ←
            </span>
            {prev.label}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            href={next.href}
            className="group flex items-center gap-2 rounded-lg bg-ink px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-black"
          >
            Next: {next.label}
            <span className="inline-block transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}
