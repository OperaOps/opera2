"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CALENDLY_URL } from "@/lib/concepts/shared";

/**
 * No bar. Three floating buttons, centered, each in its own translucent
 * glass pill. Hidden over the opening wall; present everywhere after.
 */
export default function Nav() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.35);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const pill =
    "pointer-events-auto cf-body rounded-full border border-white/25 bg-[#141412]/50 px-6 py-2.5 text-[14px] tracking-[0.02em] text-white shadow-[0_6px_28px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all duration-300 hover:border-[#a78bfa]/70 hover:shadow-[0_6px_32px_rgba(124,58,237,0.35)]";

  return (
    <motion.nav
      initial={false}
      animate={{ y: shown ? 0 : -80, opacity: shown ? 1 : 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none fixed inset-x-0 top-5 z-50 flex justify-center gap-3"
    >
      <a href="#top" className={pill}>
        Opera<span className="text-[#a78bfa]">AI</span>
      </a>
      <a href="#product" className={pill}>
        Product
      </a>
      <a
        href={CALENDLY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`${pill} shadow-[0_6px_28px_rgba(124,58,237,0.3)]`}
      >
        Book a demo
      </a>
    </motion.nav>
  );
}
