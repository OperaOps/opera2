"use client";

/**
 * Post-consult intro — the same full-screen personalized landing the
 * pre-consult welcome uses, with summary framing instead of "welcome".
 * One tap opens the standard video page underneath.
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function PostConsultIntro({
  firstName,
  clinicName,
  provider,
}: {
  firstName: string;
  clinicName: string;
  provider?: string;
}) {
  const [open, setOpen] = useState(true);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white px-6"
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            className="cf-display text-center text-[clamp(1.4rem,3.2vw,2.2rem)] font-light tracking-[-0.01em] text-[#5f7a61]"
          >
            {clinicName}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.45, ease: EASE }}
            className="cf-display mt-4 text-center text-[clamp(2.2rem,6vw,4rem)] font-light leading-[1.05] tracking-[-0.02em] text-[#1a1a17]"
          >
            Your visit, explained — {firstName}.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.8, ease: EASE }}
            className="cf-body mt-4 text-center text-[15.5px] text-[#5e6a60]"
          >
            {provider ?? "Your doctor"} and the {clinicName} team put together a
            short summary of everything you talked about.
          </motion.p>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1, ease: EASE }}
            onClick={() => setOpen(false)}
            className="cf-body mt-9 rounded-full bg-[#5f7a61] px-8 py-3 text-[15.5px] font-medium text-white transition-colors hover:bg-[#4e6650]"
          >
            Watch your summary
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
