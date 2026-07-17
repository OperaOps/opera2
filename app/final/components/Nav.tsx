"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CALENDLY_URL } from "@/lib/concepts/shared";

/**
 * One quiet bar: wordmark on the left, Product and Book a demo on the
 * right. Hidden over the opening wall, slides in once the reader moves.
 */
export default function Nav() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={false}
      animate={{ y: shown ? 0 : -80, opacity: shown ? 1 : 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 border-b border-[#1a1a17]/10 bg-white/90 backdrop-blur-md"
    >
      <div className="mx-auto flex h-[64px] max-w-[1560px] items-center justify-between px-6 md:px-10">
        <a href="#top" className="cf-display text-[24px] leading-none tracking-[-0.01em] text-[#1a1a17]">
          Opera<span className="text-[#5f7a61]">AI</span>
        </a>

        <div className="flex items-center gap-8">
          <a
            href="#product"
            className="cf-body text-[15.5px] font-medium text-[#1a1a17]/70 transition-colors hover:text-[#1a1a17]"
          >
            Product
          </a>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cf-body rounded-full bg-[#1a1a17] px-6 py-2.5 text-[15px] font-medium text-white transition-colors duration-300 hover:bg-[#5f7a61]"
          >
            Book a demo
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
