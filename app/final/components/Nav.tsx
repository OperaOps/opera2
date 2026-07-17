"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CALENDLY_URL } from "@/lib/concepts/shared";

const LINKS = [
  { href: "#top", label: "The wall" },
  { href: "#specialties", label: "Specialties" },
  { href: "#product", label: "The product" },
  { href: "#dataset", label: "The data" },
];

/** Hidden over the opening wall. Slides in once the reader starts scrolling. */
export default function Nav() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.25);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={false}
      animate={{ y: shown ? 0 : -64, opacity: shown ? 1 : 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 border-b border-[#1a1a17]/15 bg-[#f7f5f0]/90 backdrop-blur-sm"
    >
      <div className="mx-auto flex h-14 max-w-[1480px] items-center justify-between px-6 md:px-10">
        <a href="#top" className="cf-display text-[22px] leading-none tracking-[-0.01em]">
          Opera<span className="text-[#7c3aed]">.</span>
        </a>

        <div className="flex items-center gap-8">
          <div className="hidden items-center gap-7 md:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="cf-link cf-mono text-[11px] uppercase tracking-[0.2em] text-[#1a1a17]/80 hover:text-[#1a1a17]"
              >
                {l.label}
              </a>
            ))}
          </div>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cf-button-solid cf-mono px-5 py-2.5 text-[11px] uppercase tracking-[0.24em]"
          >
            Book a demo
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
