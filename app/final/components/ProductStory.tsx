"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import ProductApp, { type ProductView } from "./product/ProductApp";
import { useIsMobile } from "./media";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ————————————————————————————————————————————————————————————————
   The product IS the story. One live interface, pinned. Scrolling
   walks it through the five chapters of a working day; the strip
   above the frame says where you are and what is happening. All of
   it stays clickable the whole way through.
   ———————————————————————————————————————————————————————————————— */

const CHAPTERS: { view: ProductView; label: string; line: string }[] = [
  {
    view: "overview",
    label: "Overview",
    line: "The morning read. Three numbers, and who needs attention today.",
  },
  {
    view: "patients",
    label: "Patients",
    line: "Open a patient. The plan, the timeline, the barrier.",
  },
  {
    view: "education",
    label: "Education",
    line: "Plans are assembled from a visual library that spans medicine.",
  },
  {
    view: "ask",
    label: "Ask Opera",
    line: "Questions arrive at night. Answers come from the patient's own plan.",
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
  const [view, setView] = useState<ProductView>("overview");

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    if (isMobile) return;
    return scrollYProgress.on("change", (v) => {
      const idx = Math.min(
        CHAPTERS.length - 1,
        Math.max(0, Math.floor(v * CHAPTERS.length * 1.02))
      );
      setView((cur) => (cur === CHAPTERS[idx].view ? cur : CHAPTERS[idx].view));
    });
  }, [scrollYProgress, isMobile]);

  const active = CHAPTERS.find((c) => c.view === view) ?? CHAPTERS[0];
  const activeIdx = CHAPTERS.indexOf(active);

  return (
    <section id="product" className="scroll-mt-14 border-t border-[#1a1a17]/15 bg-[#f2f0e9]">
      <div ref={wrapRef} className="relative lg:h-[420vh]">
        <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center">
          <div className="mx-auto w-full max-w-[1480px] px-6 py-14 md:px-10 lg:py-0">
            {/* chapter strip: where you are, what is happening */}
            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 border-b border-[#1a1a17]/15 pb-3">
              {CHAPTERS.map((c, i) => {
                const on = c.view === view;
                return (
                  <button
                    key={c.view}
                    onClick={() => setView(c.view)}
                    className="group relative flex items-baseline gap-2 pb-1 text-left"
                  >
                    <span
                      className={`cf-mono text-[9px] tracking-[0.12em] transition-colors ${
                        on ? "text-[#7c3aed]" : "text-[#8a8578]"
                      }`}
                    >
                      0{i + 1}
                    </span>
                    <span
                      className={`cf-mono text-[10px] uppercase tracking-[0.18em] transition-colors ${
                        on ? "text-[#1a1a17]" : "text-[#1a1a17]/45 group-hover:text-[#1a1a17]/75"
                      }`}
                    >
                      {c.label}
                    </span>
                    {on && (
                      <motion.span
                        layoutId="cf-chapter"
                        transition={{ type: "spring", stiffness: 400, damping: 36 }}
                        className="absolute -bottom-[13px] left-0 right-0 h-[2px] bg-[#7c3aed]"
                      />
                    )}
                  </button>
                );
              })}
              {/* progress dots, desktop */}
              <span className="ml-auto hidden items-center gap-1.5 lg:flex">
                {CHAPTERS.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      i === activeIdx ? "w-5 bg-[#7c3aed]" : "w-2 bg-[#1a1a17]/15"
                    }`}
                  />
                ))}
              </span>
            </div>

            {/* the one sentence of narration */}
            <div className="flex h-12 items-center md:h-11">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={active.view}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="cf-display text-[15px] italic leading-snug text-[#1a1a17]/80 md:text-[17px]"
                >
                  {active.line}
                </motion.p>
              </AnimatePresence>
            </div>

            <ProductApp view={view} onViewChange={setView} />
          </div>
        </div>
      </div>
    </section>
  );
}
