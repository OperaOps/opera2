/**
 * Manifest of REAL clinical assets that have been uploaded to /public/medical-assets/.
 *
 * Keyed by `assetId` (from treatmentVisualAssetPlan.ts) → public path. Empty by default:
 * with no real assets present, every treatment scene renders a polished asset slot that
 * shows the exact generation prompt. As you add a file under /public/medical-assets/...,
 * register it here and the scene swaps from slot to the real asset automatically.
 *
 * Example:
 *   'colon-screening-1': '/medical-assets/colon-screening/colon-anatomy.jpg',
 *   'diabetes-a1c-2':    '/medical-assets/diabetes-a1c/red-cells-glucose.mp4',
 */

export const medicalAssetManifest: Record<string, string> = {
  // ── Colon cancer screening (James, 52) — real ElevenLabs-generated clips ──
  'preventive-screening-1': '/medical-assets/colon-screening/colon-anatomy-overview.mp4',
  'preventive-screening-2': '/medical-assets/colon-screening/colonoscope-tip-closeup.mp4',
  'preventive-screening-3': '/medical-assets/colon-screening/scope-pathway-through-colon.mp4',
  'preventive-screening-3b': '/medical-assets/colon-screening/colon-pov-glide.mp4',
  'preventive-screening-4': '/medical-assets/colon-screening/polyp-detection-realistic.mp4',
  'preventive-screening-4b': '/medical-assets/colon-screening/polyp-removal-snare.mp4',
  'preventive-screening-6': '/medical-assets/colon-screening/outpatient-room-calm.mp4',
  // ps-5 (at-home kit) and ps-7 (doctor discussion) remain polished slots until generated.

  // ── Diabetes A1C follow-up (Sarah, 47) — real ElevenLabs-generated clips ──
  'chronic-care-followup-1': '/medical-assets/diabetes-a1c/a1c-blood-sample-vial.mp4',
  'chronic-care-followup-2': '/medical-assets/diabetes-a1c/lab-analyzer-process.mp4',
  'chronic-care-followup-3': '/medical-assets/diabetes-a1c/red-cells-glucose-macro.mp4',
  'chronic-care-followup-4': '/medical-assets/diabetes-a1c/a1c-three-month-average.mp4',
  'chronic-care-followup-6': '/medical-assets/diabetes-a1c/night-shift-kitchen.mp4',
  'chronic-care-followup-7': '/medical-assets/diabetes-a1c/writing-questions-note.mp4',
  // ccf-5 (clinician reviewing results) remains a polished slot until generated.

  // ── Genomics & consent (Henry, 64) — real ElevenLabs-generated clips ──
  'genomics-consent-1': '/medical-assets/genomics/genomics-saliva-kit.mp4',
  'genomics-consent-2': '/medical-assets/genomics/dna-double-helix.mp4',
  'genomics-consent-3': '/medical-assets/genomics/dna-sequencing-lab.mp4', // realistic lab (preferred)
  'genomics-consent-4': '/medical-assets/genomics/genomics-consent-form.mp4',
  'genomics-consent-5': '/medical-assets/genomics/identifiers-fading.mp4', // original identifiers (preferred over screen)
  'genomics-consent-7': '/medical-assets/genomics/secure-data-center.mp4', // realistic data center (preferred)
  // gc-6 (de-identified into database) remains a polished slot until generated.

  // ── Blood pressure follow-up (Carlos, 55 — Spanish) — real ElevenLabs clips ──
  'language-access-1': '/medical-assets/blood-pressure/bp-cuff-on-arm.mp4',
  'language-access-2': '/medical-assets/blood-pressure/bp-cuff-inflating.mp4',
  'language-access-2b': '/medical-assets/blood-pressure/beating-heart.mp4',
  'language-access-3': '/medical-assets/blood-pressure/artery-pulse-flow.mp4',
  'language-access-4': '/medical-assets/blood-pressure/home-bp-monitor.mp4',
  'language-access-7': '/medical-assets/blood-pressure/spanish-education-phone.mp4',
  // la-5 (son helping) and la-6 (clinician) remain polished slots — human scenes for stock.

  // ── Medication journey (Linda, 59) — real ElevenLabs-generated clips ──
  'medication-journey-1': '/medical-assets/medication/weekly-pill-organizer.mp4',
  'medication-journey-2': '/medical-assets/medication/taking-pill-with-water.mp4',
  'medication-journey-3': '/medical-assets/medication/pill-dissolving-bloodstream.mp4',
  'medication-journey-3b': '/medical-assets/medication/medication-to-heart.mp4',
  'medication-journey-4': '/medical-assets/medication/receptor-key-lock.mp4',
  'medication-journey-7': '/medical-assets/medication/care-team-reminder.mp4',
  // mj-5 (symptom tracking) and mj-6 (pharmacist) remain polished slots.

  // ── Clinical trial education (Maria, 61) — real clips + one coded timeline ──
  'clinical-trial-education-1': '/medical-assets/clinical-trials/coordinator-consultation.mp4',
  'clinical-trial-education-2': '/medical-assets/clinical-trials/informed-consent-form.mp4',
  'clinical-trial-education-3': '/medical-assets/clinical-trials/study-visit-room.mp4',
  'clinical-trial-education-4': '/medical-assets/clinical-trials/study-sample-monitoring.mp4',
  'clinical-trial-education-5': '/medical-assets/clinical-trials/patient-rights-choice.mp4',
  // cte-6 (daughter helping) remains a slot; cte-7 (timeline) is a coded in-app scene.

  // ── Colonoscopy prep (Elaine, 58) — real clips + coded prep-day timeline (pp-2) ──
  'procedure-prep-1': '/medical-assets/colonoscopy-prep/prep-instruction-sheet.mp4',
  'procedure-prep-3': '/medical-assets/colonoscopy-prep/clear-liquids-counter.mp4',
  'procedure-prep-4': '/medical-assets/colonoscopy-prep/procedure-center-arrival.mp4',
  'procedure-prep-5': '/medical-assets/colonoscopy-prep/colonoscopy-suite.mp4',
  'procedure-prep-6': '/medical-assets/colonoscopy-prep/recovery-area.mp4',
  'procedure-prep-7': '/medical-assets/colonoscopy-prep/ride-pickup.mp4',

  // ── Post-discharge recovery (Robert, 68) — real clips + coded follow-up plan (pd-5) ──
  'post-discharge-recovery-3': '/medical-assets/discharge/medication-review.mp4',
  'post-discharge-recovery-4': '/medical-assets/discharge/recovery-walk.mp4',
  'post-discharge-recovery-7': '/medical-assets/discharge/care-team-phone-support.mp4',

  // ── Prenatal visit prep (Amina, 31) — real clips + coded visit timeline (pn-3) ──
  'prenatal-visit-prep-1': '/medical-assets/prenatal/prenatal-exam-room.mp4',
  'prenatal-visit-prep-2': '/medical-assets/prenatal/ultrasound-machine.mp4',
  'prenatal-visit-prep-2b': '/medical-assets/prenatal/fetal-doppler-device.mp4',
  'prenatal-visit-prep-4': '/medical-assets/prenatal/routine-prenatal-checks.mp4',

  // ── Lab result (David, 43) — real clips + coded result report (lab-4) ──
  'lab-result-explanation-1': '/medical-assets/labs/lab-sample-tube.mp4',
  'lab-result-explanation-3': '/medical-assets/labs/lab-analyzer-processing.mp4',

  // ── Care navigation (Tasha, 39) — real clips ──
  'health-equity-transport-1': '/medical-assets/care-navigation/route-to-clinic-map.mp4',
  'health-equity-transport-2': '/medical-assets/care-navigation/transportation-support.mp4',
  'health-equity-transport-4': '/medical-assets/care-navigation/care-navigator-message.mp4',
  'health-equity-transport-6': '/medical-assets/care-navigation/clinic-arrival-exterior.mp4',

  // ── Caregiver education (Nina/George, 74) — real clips + coded summary/meds (cg-2, cg-3) ──
  'caregiver-education-1b': '/medical-assets/caregiver/caregiver-organizing-papers.mp4',
  'caregiver-education-3b': '/medical-assets/caregiver/caregiver-pill-organizer.mp4',
};

/** Returns the public path for an uploaded asset, or undefined if it's still a slot. */
export function getMedicalAsset(assetId: string): string | undefined {
  return medicalAssetManifest[assetId];
}

/** True when a real asset has been uploaded for this id. */
export function hasMedicalAsset(assetId: string): boolean {
  return Boolean(medicalAssetManifest[assetId]);
}
