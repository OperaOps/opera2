"use client";

import type { IntentRow } from "@/lib/concepts/shared";

const STYLES: Record<IntentRow["intent_signal"], string> = {
  high: "bg-[#5b4fe8] text-white border-[#5b4fe8]",
  building: "bg-[#5b4fe8]/[0.07] text-[#5b4fe8] border-[#5b4fe8]/40",
  stalled: "bg-transparent text-[#6b7280] border-[#c9c5b9]",
  "at-risk": "bg-[#b4532a]/[0.08] text-[#b4532a] border-[#b4532a]/40",
};

export default function SignalBadge({
  signal,
}: {
  signal: IntentRow["intent_signal"];
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-[3px] text-[9px] font-medium uppercase tracking-[0.16em] [font-family:var(--c4-font-mono)] ${STYLES[signal]}`}
    >
      {signal}
    </span>
  );
}
