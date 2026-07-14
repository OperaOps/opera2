"use client";

import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

// Palette per the validated reference instance (light mode).
const BLUE = "#2a78d6";
const AQUA = "#1baf7a";
const GRID = "#e8e7e3";
const AXIS = "#c3c2b7";
const MUTED = "#8a8984";
const INK = "#111110";

// Sequential blue ramp, steps 100→700.
const RAMP = ["#cde2fb", "#9ec5f4", "#6da7ec", "#3987e5", "#256abf", "#184f95", "#0d366b"];

/* ---------------- Trend line: two series, crosshair + tooltip ---------------- */

export function TrendChart({
  months,
  assisted,
  baseline,
}: {
  months: string[];
  assisted: number[];
  baseline: number[];
}) {
  const W = 660;
  const H = 240;
  const P = { l: 34, r: 138, t: 12, b: 26 };
  const yMin = 45;
  const yMax = 70;
  const [hover, setHover] = useState<number | null>(null);
  const ref = useRef<SVGSVGElement>(null);

  const x = (i: number) => P.l + (i / (months.length - 1)) * (W - P.l - P.r);
  const y = (v: number) => P.t + (1 - (v - yMin) / (yMax - yMin)) * (H - P.t - P.b);

  const path = (data: number[]) =>
    data.map((v, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(v)}`).join(" ");

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = ((e.clientX - rect.left) / rect.width) * W;
    const i = Math.round(((px - P.l) / (W - P.l - P.r)) * (months.length - 1));
    setHover(Math.max(0, Math.min(months.length - 1, i)));
  };

  const ticks = [50, 55, 60, 65, 70];

  return (
    <div className="relative">
      <div className="mb-3 flex items-center gap-5">
        {[
          ["Opera-assisted consults", BLUE],
          ["Unassisted consults", AQUA],
        ].map(([label, color]) => (
          <span key={label} className="flex items-center gap-1.5 text-[12px] text-ink-secondary">
            <span className="h-[3px] w-4 rounded-full" style={{ background: color }} />
            {label}
          </span>
        ))}
      </div>
      <svg
        ref={ref}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full cursor-crosshair"
        onMouseMove={onMove}
        onMouseLeave={() => setHover(null)}
        role="img"
        aria-label="Case acceptance rate over 12 months, Opera-assisted vs unassisted consults"
      >
        {ticks.map((t) => (
          <g key={t}>
            <line x1={P.l} x2={W - P.r} y1={y(t)} y2={y(t)} stroke={GRID} strokeWidth="1" />
            <text x={P.l - 6} y={y(t) + 3.5} textAnchor="end" fontSize="10" fill={MUTED}>
              {t}%
            </text>
          </g>
        ))}
        <line x1={P.l} x2={W - P.r} y1={y(yMin)} y2={y(yMin)} stroke={AXIS} strokeWidth="1" />
        {months.map((m, i) =>
          i % 2 === 0 ? (
            <text key={m} x={x(i)} y={H - 8} textAnchor="middle" fontSize="10" fill={MUTED}>
              {m}
            </text>
          ) : null
        )}

        {hover !== null && (
          <line x1={x(hover)} x2={x(hover)} y1={P.t} y2={H - P.b} stroke={AXIS} strokeWidth="1" strokeDasharray="3 3" />
        )}

        {[
          { data: baseline, color: AQUA, label: "Unassisted" },
          { data: assisted, color: BLUE, label: "Opera-assisted" },
        ].map((s) => (
          <g key={s.label}>
            <motion.path
              d={path(s.data)}
              fill="none"
              stroke={s.color}
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: "easeOut" }}
            />
            {/* direct label at line end */}
            <text
              x={x(s.data.length - 1) + 8}
              y={y(s.data[s.data.length - 1]) + 3.5}
              fontSize="11"
              fontWeight="600"
              fill={INK}
            >
              {s.label} {s.data[s.data.length - 1].toFixed(1)}%
            </text>
            {hover !== null && (
              <circle
                cx={x(hover)}
                cy={y(s.data[hover])}
                r="4"
                fill={s.color}
                stroke="#ffffff"
                strokeWidth="2"
              />
            )}
          </g>
        ))}
      </svg>

      {hover !== null && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 rounded-lg border border-line bg-surface px-3 py-2 shadow-raised"
          style={{ left: `${(x(hover) / W) * 100}%`, top: -8 }}
        >
          <p className="text-[11px] font-semibold text-ink">{months[hover]}</p>
          <p className="text-[11px] text-ink-secondary tabular">
            <span className="mr-1 inline-block h-2 w-2 rounded-full align-middle" style={{ background: BLUE }} />
            Assisted {assisted[hover].toFixed(1)}%
          </p>
          <p className="text-[11px] text-ink-secondary tabular">
            <span className="mr-1 inline-block h-2 w-2 rounded-full align-middle" style={{ background: AQUA }} />
            Unassisted {baseline[hover].toFixed(1)}%
          </p>
        </div>
      )}
    </div>
  );
}

/* ---------------- Heatmap: sequential blue ramp, per-cell hover ---------------- */

export function ObjectionHeatmap({
  stages,
  objections,
  values,
}: {
  stages: string[];
  objections: string[];
  values: number[][];
}) {
  const max = useMemo(() => Math.max(...values.flat()), [values]);
  const [hover, setHover] = useState<{ r: number; c: number } | null>(null);

  const cellStyle = (v: number) => {
    const idx = Math.min(RAMP.length - 1, Math.floor((v / max) * RAMP.length));
    return { bg: RAMP[idx], light: idx >= 3 };
  };

  return (
    <div>
      <div
        className="grid gap-[2px]"
        style={{ gridTemplateColumns: `140px repeat(${stages.length}, 1fr)` }}
      >
        <span />
        {stages.map((s) => (
          <span key={s} className="pb-1 text-center text-[11px] font-medium text-ink-muted">
            {s}
          </span>
        ))}
        {objections.map((o, r) => (
          <FragmentRow
            key={o}
            label={o}
            row={values[r]}
            r={r}
            cellStyle={cellStyle}
            hover={hover}
            setHover={setHover}
            stages={stages}
          />
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between">
        <p className="text-[11px] text-ink-muted">
          % of consults where the objection surfaced at that stage
        </p>
        <div className="flex items-center gap-1.5">
          <span className="text-[10.5px] text-ink-muted">0%</span>
          {RAMP.map((c) => (
            <span key={c} className="h-2.5 w-5 rounded-sm" style={{ background: c }} />
          ))}
          <span className="text-[10.5px] text-ink-muted">{max}%</span>
        </div>
      </div>
    </div>
  );
}

function FragmentRow({
  label,
  row,
  r,
  cellStyle,
  hover,
  setHover,
  stages,
}: {
  label: string;
  row: number[];
  r: number;
  cellStyle: (v: number) => { bg: string; light: boolean };
  hover: { r: number; c: number } | null;
  setHover: (h: { r: number; c: number } | null) => void;
  stages: string[];
}) {
  return (
    <>
      <span className="flex items-center pr-3 text-[12px] text-ink-secondary">{label}</span>
      {row.map((v, c) => {
        const { bg, light } = cellStyle(v);
        const isHover = hover?.r === r && hover?.c === c;
        return (
          <motion.div
            key={c}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: (r * stages.length + c) * 0.012 }}
            onMouseEnter={() => setHover({ r, c })}
            onMouseLeave={() => setHover(null)}
            title={`${label} at ${stages[c]}: ${v}% of consults`}
            className={`flex h-10 cursor-default items-center justify-center rounded-md text-[11.5px] font-semibold tabular transition-transform ${
              isHover ? "scale-[1.04] ring-2 ring-ink/20" : ""
            }`}
            style={{ background: bg, color: light ? "#ffffff" : INK }}
          >
            {v}%
          </motion.div>
        );
      })}
    </>
  );
}

/* ---------------- Paired bars: with vs without behavior ---------------- */

export function PairedBars({
  rows,
}: {
  rows: { label: string; with: number; without: number }[];
}) {
  return (
    <div>
      <div className="mb-4 flex items-center gap-5">
        {[
          ["Consults with the behavior", BLUE],
          ["Without", "#b3b2ac"],
        ].map(([label, color]) => (
          <span key={label} className="flex items-center gap-1.5 text-[12px] text-ink-secondary">
            <span className="h-2.5 w-2.5 rounded-sm" style={{ background: color }} />
            {label}
          </span>
        ))}
      </div>
      <div className="space-y-5">
        {rows.map((row) => (
          <div key={row.label}>
            <p className="mb-1.5 text-[12.5px] font-medium text-ink">{row.label}</p>
            {[
              { v: row.with, color: BLUE },
              { v: row.without, color: "#b3b2ac" },
            ].map((b, i) => (
              <div key={i} className="mb-[3px] flex items-center gap-2">
                <div className="h-[14px] flex-1 rounded-r-[4px] bg-transparent">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(b.v / 75) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="flex h-full items-center rounded-r-[4px]"
                    style={{ background: b.color }}
                  />
                </div>
                <span className="w-12 text-right text-[12px] font-semibold text-ink tabular">
                  {b.v.toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
