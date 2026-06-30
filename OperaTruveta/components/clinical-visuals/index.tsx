'use client';

/**
 * Condition-specific clinical explainer visuals — the high-fidelity "real-world"
 * scenes that make the output feel like a true medical explainer video generator.
 *
 * Each visual is animated (React + Framer Motion + SVG), 16:9-friendly, and accepts the
 * standard ClinicalVisualProps. Education only — non-graphic, no clinical claims.
 */

import type { ClinicalVisualKey } from '@/lib/types';
import type { ClinicalVisualProps } from './shell';

import { ColonScreeningVisual } from './ColonScreeningVisual';
import { A1CExplainerVisual } from './A1CExplainerVisual';
import { BloodPressureCuffVisual } from './BloodPressureCuffVisual';
import { ClinicalTrialJourneyVisual } from './ClinicalTrialJourneyVisual';
import { DischargeRecoveryVisual } from './DischargeRecoveryVisual';
import { MedicationJourneyVisual } from './MedicationJourneyVisual';
import { LabProcessVisual } from './LabProcessVisual';
import { PrenatalVisitVisual } from './PrenatalVisitVisual';
import { ColonoscopyPrepVisual } from './ColonoscopyPrepVisual';
import { GenomicsConsentVisual } from './GenomicsConsentVisual';

export type { ClinicalVisualProps } from './shell';

export {
  ColonScreeningVisual,
  A1CExplainerVisual,
  BloodPressureCuffVisual,
  ClinicalTrialJourneyVisual,
  DischargeRecoveryVisual,
  MedicationJourneyVisual,
  LabProcessVisual,
  PrenatalVisitVisual,
  ColonoscopyPrepVisual,
  GenomicsConsentVisual,
};

const COMPONENTS: Record<ClinicalVisualKey, (p: ClinicalVisualProps) => JSX.Element> = {
  'colon-screening': ColonScreeningVisual,
  a1c: A1CExplainerVisual,
  'blood-pressure': BloodPressureCuffVisual,
  'clinical-trial': ClinicalTrialJourneyVisual,
  'discharge-recovery': DischargeRecoveryVisual,
  'medication-journey': MedicationJourneyVisual,
  'lab-process': LabProcessVisual,
  prenatal: PrenatalVisitVisual,
  'colonoscopy-prep': ColonoscopyPrepVisual,
  'genomics-consent': GenomicsConsentVisual,
};

/** Render a condition-specific clinical visual by key. */
export function ClinicalVisualRenderer({
  visualKey,
  ...props
}: ClinicalVisualProps & { visualKey: ClinicalVisualKey }) {
  const Comp = COMPONENTS[visualKey] ?? ColonScreeningVisual;
  return <Comp {...props} />;
}

export { clinicalVisualKeyForUseCase } from '@/lib/clinicalVisualMap';

export interface ClinicalVisualCatalogEntry {
  name: string;
  visualKey: ClinicalVisualKey;
  blurb: string;
  Component: (p: ClinicalVisualProps) => JSX.Element;
}

export const clinicalVisualCatalog: ClinicalVisualCatalogEntry[] = [
  { name: 'ColonScreeningVisual', visualKey: 'colon-screening', blurb: 'Simplified colon + gentle camera path', Component: ColonScreeningVisual },
  { name: 'A1CExplainerVisual', visualKey: 'a1c', blurb: 'Vial, cells, glucose & a 3-month view', Component: A1CExplainerVisual },
  { name: 'BloodPressureCuffVisual', visualKey: 'blood-pressure', blurb: 'Cuff, pulse waves & a calm gauge', Component: BloodPressureCuffVisual },
  { name: 'ClinicalTrialJourneyVisual', visualKey: 'clinical-trial', blurb: 'Learn → ask → consent → decide', Component: ClinicalTrialJourneyVisual },
  { name: 'DischargeRecoveryVisual', visualKey: 'discharge-recovery', blurb: 'Hospital → home recovery timeline', Component: DischargeRecoveryVisual },
  { name: 'MedicationJourneyVisual', visualKey: 'medication-journey', blurb: 'Pill pathway + safety banner', Component: MedicationJourneyVisual },
  { name: 'LabProcessVisual', visualKey: 'lab-process', blurb: 'Sample → lab → report → questions', Component: LabProcessVisual },
  { name: 'PrenatalVisitVisual', visualKey: 'prenatal', blurb: 'Visit timeline + ultrasound concept', Component: PrenatalVisitVisual },
  { name: 'ColonoscopyPrepVisual', visualKey: 'colonoscopy-prep', blurb: 'Prep timeline + ride/support', Component: ColonoscopyPrepVisual },
  { name: 'GenomicsConsentVisual', visualKey: 'genomics-consent', blurb: 'DNA, consent & de-identification', Component: GenomicsConsentVisual },
];
