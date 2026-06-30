'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, CheckCircle2, CircleDashed, Film } from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import { TreatmentAssetSlot } from '@/components/treatment-visuals';
import { treatmentVisualAssetPlan, expectedAssetPath } from '@/lib/treatmentVisualAssetPlan';
import { getMedicalAsset } from '@/lib/medicalAssetManifest';
import { demoUseCases } from '@/lib/demoData';
import { cn } from '@/lib/utils';

const useCaseLabel = (id: string) => {
  const u = demoUseCases.find((x) => x.id === id);
  return u ? `${u.patient.name} · ${u.title}` : id;
};

const PRIORITIES = ['All', 'high', 'medium', 'low'] as const;
const CLOSEUPS = ['All', 'wide', 'medium', 'close-up', 'macro'] as const;

export default function AssetSlotsPage() {
  const [query, setQuery] = useState('');
  const [useCase, setUseCase] = useState('All');
  const [priority, setPriority] = useState<(typeof PRIORITIES)[number]>('All');
  const [closeup, setCloseup] = useState<(typeof CLOSEUPS)[number]>('All');

  const useCaseOptions = useMemo(
    () => ['All', ...Array.from(new Set(treatmentVisualAssetPlan.map((a) => a.useCaseId)))],
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return treatmentVisualAssetPlan.filter((a) => {
      if (useCase !== 'All' && a.useCaseId !== useCase) return false;
      if (priority !== 'All' && a.priority !== priority) return false;
      if (closeup !== 'All' && a.closeupLevel !== closeup) return false;
      if (
        q &&
        !(
          a.visualDescription.toLowerCase().includes(q) ||
          a.whatPatientLearns.toLowerCase().includes(q) ||
          a.recommendedFileName.toLowerCase().includes(q) ||
          a.assetId.toLowerCase().includes(q) ||
          useCaseLabel(a.useCaseId).toLowerCase().includes(q)
        )
      )
        return false;
      return true;
    });
  }, [query, useCase, priority, closeup]);

  const total = treatmentVisualAssetPlan.length;
  const uploaded = treatmentVisualAssetPlan.filter((a) => getMedicalAsset(a.assetId)).length;

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Asset Slots"
        title="Every treatment visual the videos need"
        description="The full production list of clinical/treatment assets across all demo videos. Generate or source each one with the exact prompt, drop it into /public/medical-assets/, and register it in the manifest — the slot becomes a real, animated scene."
      />

      {/* status summary */}
      <div className="flex flex-wrap items-center gap-3">
        <StatusPill icon={CheckCircle2} tone="teal" label={`${uploaded} uploaded`} />
        <StatusPill icon={CircleDashed} tone="slate" label={`${total - uploaded} needed`} />
        <span className="text-sm text-slate-400">{total} total assets · 12 videos</span>
      </div>

      {/* controls */}
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200/70 bg-white/70 p-4 shadow-soft backdrop-blur-xl lg:flex-row lg:items-end lg:justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search assets, filenames, patients…"
            className="w-full rounded-full border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-navy-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-teal-300 focus:ring-2 focus:ring-teal-100"
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <Select label="Video" value={useCase} onChange={setUseCase}
            options={useCaseOptions.map((id) => ({ value: id, label: id === 'All' ? 'All videos' : useCaseLabel(id) }))} />
          <Select label="Priority" value={priority} onChange={(v) => setPriority(v as any)}
            options={PRIORITIES.map((p) => ({ value: p, label: p === 'All' ? 'All priorities' : p }))} />
          <Select label="Close-up" value={closeup} onChange={(v) => setCloseup(v as any)}
            options={CLOSEUPS.map((c) => ({ value: c, label: c === 'All' ? 'All levels' : c }))} />
        </div>
      </div>

      <p className="text-sm text-slate-400">
        Showing <span className="font-semibold text-navy-700">{filtered.length}</span> of {total} assets
      </p>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white/50 py-20 text-center text-sm text-slate-400">
          No assets match these filters.
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((entry) => {
            const src = getMedicalAsset(entry.assetId);
            return (
              <motion.div
                key={entry.assetId}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4 }}
              >
                <p className="mb-2 flex items-center gap-2 text-[11px] font-medium text-slate-400">
                  <span className="truncate">{useCaseLabel(entry.useCaseId)}</span>
                </p>
                {src ? (
                  <UploadedCard entry={entry} src={src} />
                ) : (
                  <TreatmentAssetSlot entry={entry} variant="detailed" />
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function UploadedCard({ entry, src }: { entry: { assetType: string; visualDescription: string }; src: string }) {
  const isVideo = /\.(mp4|webm|mov)$/i.test(src) || entry.assetType.includes('video');
  return (
    <div className="overflow-hidden rounded-2xl border border-teal-200 bg-white shadow-soft">
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-navy-950">
        {isVideo ? (
          <video src={src} autoPlay muted loop playsInline className="h-full w-full object-cover" />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={entry.visualDescription} className="h-full w-full object-cover" />
        )}
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-teal-500 px-2.5 py-1 text-[10px] font-semibold text-white shadow">
          <CheckCircle2 className="h-3 w-3" /> Uploaded
        </span>
      </div>
      <div className="flex items-center gap-2 px-4 py-3">
        <Film className="h-4 w-4 text-slate-400" />
        <p className="truncate text-sm font-medium text-navy-900">{entry.visualDescription}</p>
      </div>
    </div>
  );
}

function StatusPill({
  icon: Icon,
  tone,
  label,
}: {
  icon: typeof CheckCircle2;
  tone: 'teal' | 'slate';
  label: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium ring-1',
        tone === 'teal' ? 'bg-teal-50 text-teal-700 ring-teal-100' : 'bg-slate-100 text-slate-600 ring-slate-200',
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </span>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-navy-900 outline-none focus:border-teal-300 focus:ring-2 focus:ring-teal-100"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
