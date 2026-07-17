"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CALENDLY_URL } from "@/lib/concepts/shared";

/**
 * No bar. Three floating glass buttons, one per third of the screen,
 * big enough to actually read. Hidden over the opening wall.
 */
export default function Nav() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const pill =
    "pointer-events-auto cf-body flex min-w-[190px] items-center justify-center rounded-full border border-white/30 bg-[#141412]/60 px-10 py-3.5 text-[16.5px] font-medium tracking-[0.01em] text-white shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all duration-300 hover:border-[#a78bfa]/80 hover:shadow-[0_8px_36px_rgba(124,58,237,0.4)]";

  return (
    <motion.nav
      initial={false}
      animate={{ y: shown ? 0 : -90, opacity: shown ? 1 : 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none fixed inset-x-0 top-5 z-50 grid grid-cols-3 px-6 md:px-14"
    >
      <div className="flex justify-center">
        <a href="#top" className={pill}>
          Opera<span className="text-[#a78bfa]">AI</span>
        </a>
      </div>
      <div className="flex justify-center">
        <a href="#product" className={pill}>
          Product
        </a>
      </div>
      <div className="flex justify-center">
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`${pill} shadow-[0_8px_32px_rgba(124,58,237,0.35)]`}
        >
          Book a demo
        </a>
      </div>
    </motion.nav>
  );
}
