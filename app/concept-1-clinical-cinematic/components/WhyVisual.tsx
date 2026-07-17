"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ClipVideo from "./ClipVideo";
import SectionHead from "./SectionHead";

/* deterministic widths for the fake PDF body text */
const PDF_LINES_A = [96, 88, 93, 78, 91, 84, 62];
const PDF_LINES_B = [90, 95, 82, 88, 71];
const PDF_LINES_C = [93, 86, 90, 58];

export default function WhyVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end center"],
  });

  // the PDF sinks into darkness; the module comes alive
  const pdfY = useTransform(scrollYProgress, [0.15, 0.75], [0, 56]);
  const pdfOpacity = useTransform(scrollYProgress, [0.15, 0.75], [0.95, 0.35]);
  const pdfRotate = useTransform(scrollYProgress, [0.15, 0.75], [-2, -5]);
  const modOpacity = useTransform(scrollYProgress, [0.15, 0.6], [0.45, 1]);
  const modScale = useTransform(scrollYProgress, [0.15, 0.6], [0.965, 1]);

  return (
    <section className="relative bg-[#050607] py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12" ref={ref}>
        <SectionHead
          index="02"
          label="Why visual"
          title="Patients forget 80% of what they hear."
          dim="They remember what they see."
        />

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-10">
          {/* THE DEAD ARTIFACT */}
          <div className="flex flex-col">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
              <span className="[font-family:var(--c1-mono)] text-[10px] uppercase tracking-[0.32em] text-white/35">
                What patients get today
              </span>
            </div>

            <div className="relative flex-1" style={{ perspective: "1200px" }}>
              <motion.div
                style={{ y: pdfY, opacity: pdfOpacity, rotate: pdfRotate }}
                className="relative mx-auto max-w-[430px] bg-[#c9c7c1] p-7 text-[#4a4a46] shadow-[0_40px_80px_rgba(0,0,0,0.6)] grayscale"
              >
                <div className="flex items-center justify-between border-b border-[#9a9892] pb-2.5">
                  <span className="[font-family:var(--c1-mono)] text-[8px] tracking-[0.18em] text-[#7a7872]">
                    POST-CONSULT SUMMARY
                  </span>
                  <span className="[font-family:var(--c1-mono)] text-[8px] tracking-[0.18em] text-[#7a7872]">
                    PAGE 1 / 6
                  </span>
                </div>

                <p className="mt-4 text-[13px] font-semibold leading-snug text-[#3c3c38]">
                  Recommended Treatment: Comprehensive Orthodontic Therapy
                </p>

                <div className="mt-4 space-y-[7px]">
                  {PDF_LINES_A.map((w, i) => (
                    <div
                      key={i}
                      className="h-[5px] rounded-sm bg-[#8f8d87]/55"
                      style={{ width: `${w}%` }}
                    />
                  ))}
                </div>

                <div className="mt-5 flex h-[104px] items-center justify-center border border-dashed border-[#8f8d87]">
                  <span className="[font-family:var(--c1-mono)] text-[8.5px] tracking-[0.16em] text-[#8a8882]">
                    [ FIG. 1 — DIAGRAM NOT AVAILABLE ]
                  </span>
                </div>

                <div className="mt-5 space-y-[7px]">
                  {PDF_LINES_B.map((w, i) => (
                    <div
                      key={i}
                      className="h-[5px] rounded-sm bg-[#8f8d87]/55"
                      style={{ width: `${w}%` }}
                    />
                  ))}
                </div>

                <div className="mt-4 space-y-[7px]">
                  {PDF_LINES_C.map((w, i) => (
                    <div
                      key={i}
                      className="h-[5px] rounded-sm bg-[#8f8d87]/45"
                      style={{ width: `${w}%` }}
                    />
                  ))}
                </div>

                <p className="mt-5 text-[10px] italic text-[#7a7872]">
                  Please call the office with any questions.
                </p>

                {/* sinking into darkness */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050607]/80 via-transparent to-transparent" />
              </motion.div>
            </div>

            <p className="mt-8 [font-family:var(--c1-mono)] text-[9.5px] leading-relaxed tracking-[0.22em] text-white/30">
              READ ONCE. FILED. FORGOTTEN BY DINNER.
            </p>
          </div>

          {/* THE LIVING MODULE */}
          <div className="flex flex-col">
            <div className="mb-6 flex items-center gap-3">
              <span className="c1-pulse h-1.5 w-1.5 rounded-full bg-[#22d3ee]" />
              <span className="[font-family:var(--c1-mono)] text-[10px] uppercase tracking-[0.32em] text-[#a5f3fc]/80">
                What Opera sends
              </span>
            </div>

            <motion.div
              style={{ opacity: modOpacity, scale: modScale }}
              className="relative flex-1 border border-[#67e8f9]/25 bg-[#0a0c0e] shadow-[0_0_90px_rgba(34,211,238,0.09)]"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
                <span className="[font-family:var(--c1-mono)] text-[10px] tracking-[0.22em] text-white/70">
                  PT-4821 · INVISALIGN — COMPREHENSIVE
                </span>
                <span className="flex items-center gap-2 [font-family:var(--c1-mono)] text-[9px] tracking-[0.22em] text-[#67e8f9]/80">
                  <span className="c1-pulse h-1 w-1 rounded-full bg-[#22d3ee]" />
                  LIVE
                </span>
              </div>

              <div className="relative aspect-video w-full overflow-hidden">
                <ClipVideo
                  src="/videos/bracesproblem.mp4"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-4 [font-family:var(--c1-mono)] text-[9px] uppercase tracking-[0.22em] text-white/70">
                  Your crowding — and where it goes untreated
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2 px-5 pt-4">
                {(["PROBLEM", "TREATMENT", "OUTCOME"] as const).map((p, i) => (
                  <span
                    key={p}
                    className={`border px-3 py-1.5 [font-family:var(--c1-mono)] text-[8.5px] tracking-[0.25em] ${
                      i === 0
                        ? "border-[#67e8f9]/50 text-[#a5f3fc]"
                        : "border-white/12 text-white/40"
                    }`}
                  >
                    {p}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 px-5 py-5">
                {[
                  ["SENT", "2H AFTER CONSULT"],
                  ["NARRATED BY", "DR. CHEN"],
                  ["VIEWED", "3× · SHARED WITH SPOUSE"],
                  ["QUESTIONS", "2 ANSWERED BY ASK OPERA"],
                ].map(([k, v]) => (
                  <div key={k} className="flex flex-col gap-1">
                    <span className="[font-family:var(--c1-mono)] text-[8px] tracking-[0.25em] text-white/30">
                      {k}
                    </span>
                    <span className="[font-family:var(--c1-mono)] text-[9.5px] tracking-[0.12em] text-white/65">
                      {v}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <p className="mt-8 [font-family:var(--c1-mono)] text-[9.5px] leading-relaxed tracking-[0.22em] text-[#a5f3fc]/60">
              WATCHED. REWATCHED. SHARED WITH THE DECISION-MAKER AT HOME.
            </p>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 text-center [font-family:var(--c1-mono)] text-[10px] tracking-[0.3em] text-white/35"
        >
          3× MORE ENGAGEMENT THAN PDF HANDOUTS · MEASURED ACROSS 25+ CLINICS
        </motion.p>
      </div>
    </section>
  );
}
