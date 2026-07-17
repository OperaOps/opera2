"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CALENDLY_URL } from "@/lib/concepts/shared";

/**
 * A floating rounded bar: wordmark left, Product, Login, and the demo
 * button right. Hidden over the opening wall.
 */
export default function Nav() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.3);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={false}
      animate={{ y: shown ? 0 : -110, opacity: shown ? 1 : 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-4 z-50 px-4 md:px-8"
    >
      <div className="mx-auto flex h-[62px] max-w-[1240px] items-center justify-between rounded-full border border-[#1a1a17]/10 bg-white px-7 shadow-[0_14px_44px_-18px_rgba(26,26,23,0.28)]">
        <a href="#top" className="cf-display text-[23px] leading-none tracking-[-0.01em] text-[#1a1a17]">
          Opera<span className="text-[#5f7a61]">AI</span>
        </a>

        <div className="flex items-center gap-7">
          <a
            href="#product"
            className="cf-body hidden text-[15.5px] font-medium text-[#1a1a17]/70 transition-colors hover:text-[#1a1a17] sm:block"
          >
            Product
          </a>
          <a
            href="/final/login"
            className="cf-body text-[15.5px] font-medium text-[#1a1a17]/70 transition-colors hover:text-[#1a1a17]"
          >
            Login
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
