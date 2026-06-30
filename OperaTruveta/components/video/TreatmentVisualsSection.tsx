'use client';

import type { DemoUseCase } from '@/lib/types';
import { treatmentScenesForUseCase } from '@/lib/videoTimeline';
import { TreatmentVisualRenderer, TreatmentAssetSlot } from '@/components/treatment-visuals';

/**
 * The asset-backed real-world treatment visuals for a use case: a featured scene
 * (real asset or polished slot) plus the production cards listing exactly what to
 * generate/upload for each scene.
 */
export function TreatmentVisualsSection({ useCase }: { useCase: DemoUseCase }) {
  const entries = treatmentScenesForUseCase(useCase);
  if (!entries.length) return null;
  const first = useCase.patient.name.split(' ')[0];

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-3xl border border-slate-200/70 bg-navy-950 shadow-soft-lg">
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <TreatmentVisualRenderer
            entry={entries[0]}
            patientName={first}
            language={useCase.patient.language}
          />
        </div>
      </div>

      <div>
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
          Asset plan · what to generate or upload ({entries.length} scenes)
        </p>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {entries.map((e) => (
            <TreatmentAssetSlot key={e.assetId} entry={e} variant="detailed" />
          ))}
        </div>
      </div>
    </div>
  );
}
