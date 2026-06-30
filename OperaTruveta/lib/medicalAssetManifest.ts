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
};

/** Returns the public path for an uploaded asset, or undefined if it's still a slot. */
export function getMedicalAsset(assetId: string): string | undefined {
  return medicalAssetManifest[assetId];
}

/** True when a real asset has been uploaded for this id. */
export function hasMedicalAsset(assetId: string): boolean {
  return Boolean(medicalAssetManifest[assetId]);
}
