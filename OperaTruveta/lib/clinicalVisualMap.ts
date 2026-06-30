import type { ClinicalVisualKey } from './types';

/** Maps a demo use case id to its dedicated condition-specific clinical explainer. */
export const clinicalVisualKeyByUseCase: Record<string, ClinicalVisualKey> = {
  'preventive-screening': 'colon-screening',
  'chronic-care-followup': 'a1c',
  'language-access': 'blood-pressure',
  'clinical-trial-education': 'clinical-trial',
  'post-discharge-recovery': 'discharge-recovery',
  'medication-journey': 'medication-journey',
  'lab-result-explanation': 'lab-process',
  'prenatal-visit-prep': 'prenatal',
  'procedure-prep': 'colonoscopy-prep',
  'genomics-consent': 'genomics-consent',
};

export function clinicalVisualKeyForUseCase(id: string): ClinicalVisualKey | undefined {
  return clinicalVisualKeyByUseCase[id];
}
