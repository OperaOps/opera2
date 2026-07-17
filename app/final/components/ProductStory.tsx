"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import ProductApp, { type ProductView } from "./product/ProductApp";
import { useIsMobile } from "./media";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const CHAPTERS: { view: ProductView; label: string; line: string }[] = [
  {
    view: "education",
    label: "Education",
    line: "The visual library. Every plan starts here.",
  },
  {
    view: "ask",
    label: "Ask Opera",
    line: "Questions answered from the patient's own plan.",
  },
  {
    view: "intent",
    label: "Intent",
    line: "Engagement becomes a signal. The signal becomes one clear task.",
  },
];

export default function ProductStory() {
  const isMobile = useIsMobile();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [view, setView] = useState<ProductView>("education");
  // once the reader clicks, scrolling stops driving the view
  const manual = useRef(false);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    if (isMobile) return;
    return scrollYProgress.on("change", (v) => {
      if (manual.current) return;
      const idx = Math.min(
        CHAPTERS.length - 1,
        Math.max(0, Math.floor(v * CHAPTERS.length * 1.02))
      );
      setView((cur) => (cur === CHAPTERS[idx].view ? cur : CHAPTERS[idx].view));
    });
  }, [scrollYProgress, isMobile]);

  const active = CHAPTERS.find((c) => c.view === view) ?? CHAPTERS[0];
  const activeIdx = CHAPTERS.indexOf(active);

  const pick = (v: ProductView) => {
    manual.current = true;
    setView(v);
  };

  return (
    <section id="product" className="scroll-mt-20 border-t border-[#1a1a17]/10 bg-white">
      <div ref={wrapRef} className="relative lg:h-[300vh]">
        <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center">
          <div className="w-full px-5 py-14 md:px-10 lg:py-0">
            {/* chapter picker: three big clear choices */}
            <div className="flex flex-wrap items-baseline gap-x-10 gap-y-3 border-b border-[#1a1a17]/15 pb-4">
              {CHAPTERS.map((c, i) => {
                const on = c.view === view;
                return (
                  <button
                    key={c.view}
                    onClick={() => pick(c.view)}
                    className="group relative pb-1 text-left"
                  >
                    <span
                      className={`cf-body text-[19px] font-semibold tracking-[0.01em] transition-colors md:text-[21px] ${
                        on ? "text-[#1a1a17]" : "text-[#1a1a17]/35 group-hover:text-[#1a1a17]/65"
                      }`}
                    >
                      {c.label}
                    </span>
                    {on && (
                      <motion.span
                        layoutId="cf-chapter"
                        transition={{ type: "spring", stiffness: 400, damping: 36 }}
                        className="absolute -bottom-[17px] left-0 right-0 h-[3px] bg-[#5f7a61]"
                      />
                    )}
                  </button>
                );
              })}
              <span className="ml-auto hidden items-center gap-2 lg:flex">
                {CHAPTERS.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === activeIdx ? "w-7 bg-[#5f7a61]" : "w-2.5 bg-[#1a1a17]/15"
                    }`}
                  />
                ))}
              </span>
            </div>

            {/* the one line of narration */}
            <div className="flex h-16 items-center md:h-[4.5rem]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={active.view}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="cf-display text-[clamp(1.4rem,2.5vw,2.1rem)] italic leading-snug text-[#1a1a17]"
                >
                  {active.line}
                </motion.p>
              </AnimatePresence>
            </div>

            <ProductApp view={view} onViewChange={pick} />
          </div>
        </div>
      </div>
    </section>
  );
}
