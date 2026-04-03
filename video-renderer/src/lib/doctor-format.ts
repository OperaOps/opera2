/**
 * Doctor naming for on-screen UI (last name only, no "Dr." prefix)
 * vs. spoken narration (always "Dr. Lastname").
 */

export function stripDoctorPrefix(name: string): string {
  return name.replace(/^\s*Dr\.?\s+/i, "").trim();
}

/** For TTS and templates: always "Dr. Martinez", never bare "Martinez". */
export function spokenDoctorName(name: string): string {
  const last = stripDoctorPrefix(name);
  if (!last) return "Doctor";
  return `Dr. ${last}`;
}
