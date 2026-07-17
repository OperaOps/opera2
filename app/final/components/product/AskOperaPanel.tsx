"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import {
  ASK_THREADS,
  moduleById,
  patientById,
} from "./data";
import { AutoVideo } from "../media";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * The Ask Opera console. Question list on the left, the grounded answer and
 * its cited visual on the right. One dental question, the rest from GI,
 * orthopedics, and general medicine, so the panel reads as medicine wide.
 * Fully clickable; the review thread can be approved.
 */
export default function AskOperaPanel({
  activeIndex,
  onSelect,
}: {
  activeIndex?: number;
  onSelect?: (i: number) => void;
}) {
  const [internal, setInternal] = useState(0);
  const [approved, setApproved] = useState(false);
  const index = activeIndex ?? internal;
  const select = (i: number) => {
    setInternal(i);
    onSelect?.(i);
  };

  const thread = ASK_THREADS[index];
  const patient = patientById(thread.patientId);
  const module = moduleById(thread.citedModule);
  const needsReview = thread.status === "review" && !approved;

  return (
    <div className="flex h-full flex-col bg-[#fdfcfa]">
      {/* header */}
      <div className="flex items-center justify-between gap-3 border-b border-[#1a1a17]/10 px-4 py-2.5 md:px-5">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#5f7a61] text-[12px] font-semibold text-white">
            O
          </span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={patient.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="cf-mono truncate text-[12px] uppercase tracking-[0.18em] text-[#1a1a17]/70"
            >
              Ask Opera · {patient.name} · {patient.treatment}
            </motion.span>
          </AnimatePresence>
        </div>
        <span className="cf-mono hidden shrink-0 text-[12px] uppercase tracking-[0.18em] text-[#8a8578] sm:inline">
          Plan grounded · {patient.doctor}
        </span>
      </div>

      <div className="grid min-h-0 flex-1 md:grid-cols-[1fr_1.35fr]">
        {/* question list */}
        <div className="border-b border-[#1a1a17]/10 p-3 md:border-b-0 md:border-r md:p-4">
          <p className="cf-mono px-2 text-[11.5px] uppercase tracking-[0.2em] text-[#8a8578]">
            What patients actually ask
          </p>
          <div className="mt-2 space-y-0.5">
            {ASK_THREADS.map((t, i) => {
              const p = patientById(t.patientId);
              const active = i === index;
              return (
                <button
                  key={t.patientId}
                  onClick={() => select(i)}
                  className={`relative flex w-full items-baseline gap-2.5 rounded-md px-2 py-2 text-left transition-colors duration-300 ${
                    active ? "bg-[#5f7a61]/[0.06]" : "hover:bg-[#1a1a17]/[0.03]"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="cf-askbar"
                      transition={{ type: "spring", stiffness: 420, damping: 36 }}
                      className="absolute bottom-1.5 left-0 top-1.5 w-[2px] bg-[#5f7a61]"
                    />
                  )}
                  <span
                    className={`cf-mono shrink-0 text-[11.5px] tracking-[0.12em] ${
                      active ? "text-[#5f7a61]" : "text-[#8a8578]"
                    }`}
                  >
                    Q-{String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">
                    <span
                      className={`block text-[14px] leading-snug ${
                        active ? "text-[#1a1a17]" : "text-[#1a1a17]/65"
                      }`}
                    >
                      {t.question}
                    </span>
                    <span className="cf-mono mt-0.5 block text-[11.5px] uppercase tracking-[0.14em] text-[#8a8578]">
                      {p.name} · {p.specialty}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* grounded answer */}
        <div className="flex min-h-[300px] flex-col p-4 md:p-5">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={thread.patientId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="flex min-h-0 flex-1 flex-col"
            >
              <p className="cf-mono flex items-center gap-2 text-[11.5px] uppercase tracking-[0.2em] text-[#5f7a61]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#5f7a61]" />
                Grounded in {patient.name.split(" ")[0]}&rsquo;s treatment plan
              </p>

              <p className="cf-body mt-3.5 max-w-xl text-[14.5px] leading-relaxed text-[#1a1a17]/85">
                {thread.answer}
              </p>

              {/* cited visual */}
              <div className="mt-5 flex items-center gap-4 rounded-lg border border-[#1a1a17]/10 bg-white p-3">
                <div className="relative w-[132px] shrink-0 overflow-hidden rounded-md md:w-[152px]">
                  <AutoVideo
                    src={module.src}
                    className="aspect-video w-full object-cover"
                  />
                  <span className="cf-mono absolute bottom-1 right-1 rounded-sm bg-[#1a1a17]/75 px-1 py-0.5 text-[11.5px] text-white">
                    {module.duration}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="cf-mono text-[11.5px] uppercase tracking-[0.18em] text-[#5f7a61]">
                    Cited visual · {module.id}
                  </p>
                  <p className="mt-1 text-[14.5px] font-medium text-[#1a1a17]">
                    {module.title}
                  </p>
                  <p className="mt-0.5 text-[13px] text-[#8a8578]">
                    From the visuals shown at {patient.name.split(" ")[0]}&rsquo;s consult
                  </p>
                </div>
              </div>

              {/* approval state for the drafted thread */}
              {thread.status === "review" && (
                <div className="mt-4 flex items-center gap-3">
                  {needsReview ? (
                    <>
                      <span className="cf-mono rounded-full bg-[#b45309]/10 px-2.5 py-1 text-[11.5px] uppercase tracking-[0.14em] text-[#b45309]">
                        Draft, awaiting {patient.doctor}
                      </span>
                      <button
                        onClick={() => setApproved(true)}
                        className="rounded-full bg-[#1a1a17] px-4 py-1.5 text-[13px] font-medium text-white transition-colors hover:bg-[#5f7a61]"
                      >
                        Approve and send
                      </button>
                    </>
                  ) : (
                    <span className="cf-mono flex items-center gap-1.5 rounded-full bg-[#15803d]/10 px-2.5 py-1 text-[11.5px] uppercase tracking-[0.14em] text-[#15803d]">
                      <Check size={9} />
                      Sent to {patient.name.split(" ")[0]}
                    </span>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
