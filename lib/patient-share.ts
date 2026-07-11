/**
 * Patient share-link context — powers /v/[id] (the patient portal page) and the
 * Ask Opera assistant. Resolves a share id to the full treatment context:
 *   1. patient_videos.id  (per-video share link — preferred)
 *   2. patient_accounts.id (legacy single-video patients)
 *   3. "demo" → the Jessica veneers flagship demo
 */

import { getDb } from "@/lib/db/patient-portal-schema";
import {
  dynamoGetJob,
  isDynamoJobStoreEnabled,
} from "@/app/api/patient-video/_lib/job-store-dynamo";

export interface ShareContext {
  id: string;
  videoUrl: string;
  videoTitle: string;
  patientFirstName: string;
  patientLastName?: string;
  clinicName: string;
  clinicLogoUrl?: string;
  provider?: string;
  treatmentType: string;
  providerNotes?: string;
  consultationDate?: string;
  /** Office contact details — the assistant hands these out verbatim. */
  clinicContact?: {
    phone: string;
    email?: string;
    address?: string;
    hours?: string;
  };
  /** Clinic knowledge base (insurance plans, financing, policies) fed to the assistant. */
  knowledgeBase?: string;
  isDemo?: boolean;
}

const DEMO_CONTEXT: ShareContext = {
  id: "demo",
  videoUrl: "/videos/demo-veneers.mp4",
  videoTitle: "Your Porcelain Veneers, Step by Step",
  patientFirstName: "Jessica",
  clinicName: "Luminous Dental Studio",
  provider: "Dr. Bennett",
  treatmentType: "veneers",
  consultationDate: "today",
  providerNotes:
    "Jessica, 29. Porcelain veneers on the upper front teeth for discoloration and small gaps. " +
    "Getting married in June — wants her smile ready well before the wedding; sister Emma had " +
    "veneers and Jessica loved how natural they looked. Worried veneers might look fake and " +
    "about how much enamel is removed (minimal-prep approach, whisper-thin reduction only). " +
    "Plan: shade match + digital scan, prep visit, temporaries ~2 weeks, seat finals ~1 month out. " +
    "$10,800 total on a 12-month plan. Night guard recommended (clenches when stressed).",
  clinicContact: {
    phone: "(415) 555-0142",
    email: "hello@luminousdental.com",
    address: "2210 Fillmore Street, San Francisco, CA 94115",
    hours: "Mon–Fri 8am–5pm, Sat 9am–1pm",
  },
  knowledgeBase:
    "INSURANCE PLANS ACCEPTED: Delta Dental PPO, MetLife PDP Plus, Cigna Total DPPO, Aetna PPO, " +
    "Guardian PPO, and United Healthcare Dental. Out-of-network claims are filed as a courtesy for any PPO plan. " +
    "COVERAGE FOR VENEERS: most plans classify veneers as cosmetic, which is typically not covered. When veneers " +
    "restore damaged, chipped, or structurally compromised teeth, plans sometimes cover a portion as a 'major " +
    "restorative' benefit (usually 50% after deductible, subject to the plan's annual maximum, commonly $1,500–$2,000). " +
    "The office runs a free benefits check before any treatment — patients just need their member ID. " +
    "Pre-treatment estimates take 2–3 weeks with most carriers. " +
    "FINANCING: 12-month in-house plan at 0% interest (Jessica is already set up on this), CareCredit 6/12/18-month " +
    "options, and 5% courtesy discount for paid-in-full treatment. HSA/FSA cards accepted. " +
    "APPOINTMENTS: book by phone or text to the office number; the schedule fills ~2 weeks out. 48-hour notice for " +
    "reschedules. Free parking behind the building off Clay Street. " +
    "AFTER-HOURS: for urgent dental issues, call the office line and press 1 for the on-call doctor.",
  isDemo: true,
};

export async function getShareContext(id: string): Promise<ShareContext | null> {
  if (id === "demo") return DEMO_CONTEXT;

  // Generated-video jobs (the pipeline's Dynamo store) — every video produced
  // by Generate Video gets a patient page at /v/{jobId} with the Ask Opera bar.
  if (isDynamoJobStoreEnabled() && /^[0-9a-f-]{36}$/.test(id)) {
    try {
      const job = await dynamoGetJob(id);
      if (job?.status === "completed" && job.videoUrl) {
        const input = job.input ?? ({} as Record<string, string>);
        const patientName = (input.patientName || "there").trim();
        const [firstName, ...rest] = patientName.split(/\s+/);
        const treatment = input.treatment || "treatment";
        const notes = [
          input.treatmentNotes && `Treatment notes: ${input.treatmentNotes}`,
          input.concerns && `Patient concerns: ${input.concerns}`,
          input.patientStatus && `Patient status: ${input.patientStatus}`,
        ]
          .filter(Boolean)
          .join(" ");
        return {
          id,
          videoUrl: job.videoUrl,
          videoTitle: `Your ${treatment.replace(/_/g, " ")} video, ${firstName}`,
          patientFirstName: firstName,
          patientLastName: rest.join(" ") || undefined,
          clinicName: input.clinicName || "your clinic",
          provider: input.doctorName || undefined,
          treatmentType: treatment,
          providerNotes: notes || undefined,
        };
      }
    } catch {
      /* job store unavailable — fall through to the portal DB */
    }
  }

  try {
    const db = getDb();

    // 1) per-video share link
    const video = db
      .prepare(
        `SELECT v.id, v.video_url, v.video_title, v.treatment_type, v.provider_notes,
                p.first_name, p.last_name, p.consulting_provider, p.consultation_date,
                c.clinic_name, c.clinic_logo_url
         FROM patient_videos v
         JOIN patient_accounts p ON p.id = v.patient_id
         JOIN clinic_accounts c ON c.id = v.clinic_id
         WHERE v.id = ? AND v.is_active = 1`
      )
      .get(id) as Record<string, string> | undefined;

    if (video?.video_url) {
      return {
        id,
        videoUrl: video.video_url,
        videoTitle: video.video_title || "Your Personalized Treatment Video",
        patientFirstName: video.first_name,
        patientLastName: video.last_name,
        clinicName: video.clinic_name,
        clinicLogoUrl: video.clinic_logo_url || undefined,
        provider: video.consulting_provider || undefined,
        treatmentType: video.treatment_type,
        providerNotes: video.provider_notes || undefined,
        consultationDate: video.consultation_date || undefined,
      };
    }

    // 2) legacy: patient_accounts with a single video
    const patient = db
      .prepare(
        `SELECT p.id, p.video_url, p.video_title, p.treatment_type, p.first_name,
                p.last_name, p.consulting_provider, p.consultation_date,
                c.clinic_name, c.clinic_logo_url
         FROM patient_accounts p
         JOIN clinic_accounts c ON c.id = p.clinic_id
         WHERE p.id = ?`
      )
      .get(id) as Record<string, string> | undefined;

    if (patient?.video_url) {
      return {
        id,
        videoUrl: patient.video_url,
        videoTitle: patient.video_title || "Your Personalized Treatment Video",
        patientFirstName: patient.first_name,
        patientLastName: patient.last_name,
        clinicName: patient.clinic_name,
        clinicLogoUrl: patient.clinic_logo_url || undefined,
        provider: patient.consulting_provider || undefined,
        treatmentType: patient.treatment_type || "treatment",
        consultationDate: patient.consultation_date || undefined,
      };
    }
  } catch {
    // DB unavailable (fresh env) — only the demo link works
  }

  return null;
}

/** Treatment-aware suggested questions for the Ask Opera bar. */
export function suggestedQuestions(treatmentType: string): string[] {
  const t = (treatmentType || "").toLowerCase();
  const label = t.replace(/_/g, " ");
  const plural = /(veneers|braces|dentures|aligners|retainers)$/.test(label);
  const article = plural ? "" : /^[aeiou]/.test(label) ? "an " : "a ";
  const base = [
    `Why do I need ${article}${label}?`,
    "What happens if I wait?",
    "Will insurance cover this?",
    "Explain this in simpler words.",
  ];
  if (/braces|invisalign|aligner|expander|retainer/.test(t)) {
    return [base[0], "How long will treatment take?", "Will it hurt?", base[1], base[2], base[3]];
  }
  if (/extraction|implant|jaw|surgery|root_canal/.test(t)) {
    return [base[0], "What should I expect after the procedure?", "How long is recovery?", base[1], base[2], base[3]];
  }
  if (/veneers|whitening/.test(t)) {
    return [base[0], "Will it look natural?", "How long will it last?", base[1], base[2], base[3]];
  }
  return [base[0], "What should I expect during the visit?", "How long does it take?", base[1], base[2], base[3]];
}
