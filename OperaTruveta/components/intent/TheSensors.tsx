'use client';

import { SectionHeader } from '@/components/SectionHeader';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion';
import { sensorGroups } from '@/lib/intent';

/**
 * The sensor suite: where every signal in the decision record comes from,
 * grouped by how much it asks of the patient. The design rule is stated
 * plainly — every sensor gives value before it takes signal.
 */
export function TheSensors() {
  return (
    <section>
      <Reveal>
        <SectionHeader
          eyebrow="Where the signal comes from"
          title="The video earns her attention. The experience around it is the instrument."
          description="None of this is a survey and none of it is surveillance — every sensor is a tool built to help the patient decide, on the clinic’s own page, and the signal is the exhaust. Two rules govern all of it: at most one explicit ask per stall, and every sensor gives value before it takes signal."
        />
      </Reveal>

      <RevealGroup className="mt-12 grid gap-5 md:grid-cols-2">
        {sensorGroups.map((g) => (
          <RevealItem key={g.group}>
            <div className="flex h-full flex-col rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-soft backdrop-blur-xl sm:p-7">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-lg font-semibold tracking-tight text-navy-900">{g.group}</h3>
              </div>
              <p className="mt-1 text-[12px] font-medium italic text-teal-700">
                asks of the patient: {g.asksOfPatient}
              </p>
              <ul className="mt-5 flex-1 space-y-3.5">
                {g.sensors.map((s) => (
                  <li key={s.name} className="flex gap-3">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400" />
                    <div>
                      <p className="text-[13.5px] font-semibold text-navy-900">{s.name}</p>
                      <p className="mt-0.5 text-[12.5px] leading-relaxed text-slate-500">
                        {s.reveals}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal delay={0.1}>
        <p className="mt-6 text-[13px] leading-relaxed text-slate-400">
          Any one signal is noise. The composite — fee-section dwell, a $110/month calculator
          gap, a question about cheaper options, a second device, then 48 hours of silence —
          is a barrier diagnosis with a confidence level. And once the outcome label returns,
          it’s training data no one else can produce.
        </p>
      </Reveal>
    </section>
  );
}
