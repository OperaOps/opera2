"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export function Card({
  children,
  className = "",
  pad = true,
}: {
  children: ReactNode;
  className?: string;
  pad?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border border-line bg-surface shadow-card ${
        pad ? "p-5" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  right,
}: {
  children: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h3 className="text-[13px] font-semibold text-ink">{children}</h3>
      {right}
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-accent">
      {children}
    </p>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  right,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  right?: ReactNode;
}) {
  return (
    <FadeIn className="mb-10 flex flex-wrap items-end justify-between gap-6">
      <div className="max-w-2xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="text-[28px] font-semibold leading-tight tracking-display text-ink">
          {title}
        </h1>
        {description && (
          <p className="mt-2 text-[15px] leading-relaxed text-ink-secondary">
            {description}
          </p>
        )}
      </div>
      {right}
    </FadeIn>
  );
}

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "accent" | "good" | "warm";
}) {
  const tones = {
    neutral: "border-line bg-surface-sunken text-ink-secondary",
    accent: "border-accent-border bg-accent-wash text-accent-deep",
    good: "border-[#cdeacd] bg-[#f0f9f0] text-goodtext",
    warm: "border-[#f6d8ca] bg-[#fdf3ee] text-[#b34515]",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function DemoTag() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-2.5 py-1 text-[11px] font-medium text-ink-muted">
      <span className="h-1.5 w-1.5 rounded-full bg-ink-faint" />
      Demo data
    </span>
  );
}

export function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Rise({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Stat({
  label,
  value,
  sub,
  delta,
}: {
  label: string;
  value: string;
  sub?: string;
  delta?: string;
}) {
  return (
    <div>
      <p className="text-[12px] font-medium text-ink-muted">{label}</p>
      <p className="mt-1 text-[26px] font-semibold tracking-display text-ink tabular">
        {value}
        {delta && (
          <span className="ml-2 align-middle text-[13px] font-medium text-goodtext">
            {delta}
          </span>
        )}
      </p>
      {sub && <p className="mt-0.5 text-[12px] text-ink-muted">{sub}</p>}
    </div>
  );
}

export function Meter({
  value,
  color = "var(--series-1)",
}: {
  value: number;
  color?: string;
}) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-sunken">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="h-full rounded-full"
        style={{ background: color }}
      />
    </div>
  );
}
