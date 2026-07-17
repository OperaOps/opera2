"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ASK_THREADS, moduleById, patientById } from "./data";
import { AutoVideo } from "../media";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Six real questions on the left. Choosing one drops it into the console
 * on the right, Opera thinks for a beat, then answers from that patient's
 * plan with the cited visual playing beside it.
 */
export default function AskOperaPanel() {
  const [sel, setSel] = useState(0);
  const [phase, setPhase] = useState<"thinking" | "answered">("answered");

  const pick = (i: number) => {
    if (i === sel && phase === "answered") return;
    setSel(i);
    setPhase("thinking");
  };

  useEffect(() => {
    if (phase !== "thinking") return;
    const t = setTimeout(() => setPhase("answered"), 950);
    return () => clearTimeout(t);
  }, [phase, sel]);

  const thread = ASK_THREADS[sel];
  const patient = patientById(thread.patientId);
  const module = moduleById(thread.citedModule);

  return (
    <div className="grid h-full md:grid-cols-[1fr_1.45fr]">
      {/* ——— the questions ——— */}
      <div className="overflow-y-auto border-b border-[#1a1a17]/10 p-5 md:border-b-0 md:border-r md:p-6">
        <p className="cf-mono text-[12px] uppercase tracking-[0.18em] text-[#5e6a60]">
          Choose a question
        </p>
        <div className="mt-4 space-y-2.5">
          {ASK_THREADS.map((t, i) => {
            const p = patientById(t.patientId);
            const active = i === sel;
            return (
              <button
                key={i}
                onClick={() => pick(i)}
                className={`w-full rounded-xl border px-4 py-3 text-left transition-all duration-300 ${
                  active
                    ? "border-[#5f7a61]/60 bg-[#5f7a61]/[0.06]"
                    : "border-[#1a1a17]/10 bg-white hover:border-[#5f7a61]/40"
                }`}
              >
                <span className="block text-[15px] font-medium leading-snug text-[#1a1a17]">
                  {t.question}
                </span>
                <span className="cf-mono mt-1 block text-[11.5px] uppercase tracking-[0.1em] text-[#5e6a60]">
                  {p.name} · {p.specialty}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ——— the console ——— */}
      <div className="flex min-h-[380px] flex-col">
        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-5 md:p-6">
          {/* the question, dropped in */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={`q-${sel}`}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-[#1a1a17] px-5 py-3 text-[15px] text-white"
            >
              {thread.question}
            </motion.p>
          </AnimatePresence>

          {/* thinking, then the grounded answer */}
          <AnimatePresence mode="wait" initial={false}>
            {phase === "thinking" ? (
              <motion.div
                key={`t-${sel}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="flex w-fit items-center gap-1.5 rounded-2xl rounded-tl-md border border-[#1a1a17]/10 bg-white px-5 py-4"
              >
                {[0, 1, 2].map((d) => (
                  <motion.span
                    key={d}
                    animate={{ opacity: [0.25, 1, 0.25] }}
                    transition={{ duration: 1, repeat: Infinity, delay: d * 0.18 }}
                    className="h-2 w-2 rounded-full bg-[#5f7a61]"
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key={`a-${sel}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="w-fit max-w-[94%] rounded-2xl rounded-tl-md border border-[#5f7a61]/20 bg-[#5f7a61]/[0.04] p-5"
              >
                <p className="cf-mono flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[#5f7a61]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#5f7a61]" />
                  Grounded in {patient.name.split(" ")[0]}&rsquo;s treatment plan
                </p>
                <p className="cf-body mt-3 text-[15px] leading-relaxed text-[#1a1a17]/90">
                  {thread.answer}
                </p>
                <div className="mt-4 flex items-center gap-4 rounded-xl border border-[#1a1a17]/10 bg-white p-3">
                  <div className="relative w-[150px] shrink-0 overflow-hidden rounded-lg md:w-[180px]">
                    {module.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={module.src} alt="" className="aspect-video w-full object-cover" />
                    ) : (
                      <AutoVideo src={module.src} className="aspect-video w-full object-cover" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[15px] font-medium text-[#1a1a17]">{module.title}</p>
                    <p className="mt-1 text-[13.5px] text-[#5e6a60]">
                      From the visuals shown at {patient.name.split(" ")[0]}&rsquo;s consult
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
