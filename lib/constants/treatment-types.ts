/**
 * Shared treatment type definitions.
 * Source of truth — matches the VALID_TREATMENTS set in
 * app/api/patient-video/generate/route.ts
 */

export const TREATMENT_TYPES = [
  { value: "crown", label: "Crown", specialty: "dental" },
  { value: "filling", label: "Filling", specialty: "dental" },
  { value: "root_canal", label: "Root Canal", specialty: "dental" },
  { value: "implant", label: "Dental Implant", specialty: "dental" },
  { value: "extraction", label: "Extraction", specialty: "dental" },
  { value: "bridge", label: "Dental Bridge", specialty: "dental" },
  { value: "veneers", label: "Veneers", specialty: "dental" },
  { value: "whitening", label: "Teeth Whitening", specialty: "dental" },
  { value: "gum_treatment", label: "Periodontal Treatment", specialty: "dental" },
  { value: "dentures", label: "Dentures", specialty: "dental" },
  { value: "full_mouth", label: "Full Mouth Restoration", specialty: "dental" },
  { value: "full_mouth_rehab", label: "Full Mouth Rehab", specialty: "dental" },
  { value: "inlay_onlay", label: "Inlay / Onlay", specialty: "dental" },
  { value: "braces", label: "Traditional Braces", specialty: "orthodontic" },
  { value: "invisalign", label: "Invisalign", specialty: "orthodontic" },
  { value: "ceramic_braces", label: "Ceramic Braces", specialty: "orthodontic" },
  { value: "lingual_braces", label: "Lingual Braces", specialty: "orthodontic" },
  { value: "expander", label: "Palatal Expander", specialty: "orthodontic" },
  { value: "retainer", label: "Retainer", specialty: "orthodontic" },
  { value: "jaw_surgery", label: "Jaw Surgery", specialty: "orthodontic" },
  { value: "space_maintainer", label: "Space Maintainer", specialty: "orthodontic" },
  { value: "headgear", label: "Headgear", specialty: "orthodontic" },
  { value: "sleep_apnea", label: "Sleep Apnea Treatment", specialty: "dental" },
] as const;

export type TreatmentValue = (typeof TREATMENT_TYPES)[number]["value"];

export function getTreatmentLabel(value: string): string {
  const found = TREATMENT_TYPES.find((t) => t.value === value);
  return found?.label ?? value.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
