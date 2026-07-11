/**
 * /v/[id] — the patient portal: a private share link with the patient's
 * personalized video on top and the Ask Opera assistant underneath.
 * No login required — the link itself is the key.
 */

import { notFound } from "next/navigation";
import { getShareContext, suggestedQuestions } from "@/lib/patient-share";
import { AskOpera } from "@/Components/patient/AskOpera";

export const dynamic = "force-dynamic";

export default function PatientSharePage({ params }: { params: { id: string } }) {
  const ctx = getShareContext(params.id);
  if (!ctx) notFound();

  const treatmentLabel = ctx.treatmentType.replace(/_/g, " ");

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50/60 via-white to-white text-gray-900 antialiased">
      {/* Clinic header */}
      <header className="mx-auto flex max-w-3xl items-center justify-between px-5 pt-6">
        <div className="flex items-center gap-2.5">
          {ctx.clinicLogoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={ctx.clinicLogoUrl}
              alt={ctx.clinicName}
              className="h-8 w-8 rounded-lg object-cover"
            />
          ) : (
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-violet-500 text-[13px] font-bold text-white">
              {ctx.clinicName.charAt(0)}
            </span>
          )}
          <div className="leading-tight">
            <p className="text-[13.5px] font-semibold text-gray-900">{ctx.clinicName}</p>
            {ctx.provider && <p className="text-[11.5px] text-gray-400">{ctx.provider}</p>}
          </div>
        </div>
        <span className="rounded-full bg-purple-100 px-3 py-1 text-[11px] font-semibold capitalize text-purple-700">
          {treatmentLabel}
        </span>
      </header>

      {/* Title */}
      <div className="mx-auto max-w-3xl px-5 pt-8 text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-purple-600">
          Made for {ctx.patientFirstName}
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{ctx.videoTitle}</h1>
        <p className="mt-2 text-[13.5px] text-gray-500">
          A personal walkthrough from {ctx.provider ?? "your doctor"} and the {ctx.clinicName} team.
        </p>
      </div>

      {/* The video */}
      <div className="mx-auto mt-6 max-w-3xl px-5">
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-black shadow-[0_24px_70px_rgba(88,28,135,0.16)]">
          <video
            src={ctx.videoUrl}
            controls
            playsInline
            preload="metadata"
            className="aspect-video w-full bg-white object-contain"
          />
        </div>
      </div>

      {/* Ask Opera — right under the video, per spec */}
      <div className="mx-auto max-w-3xl px-5 pb-20 pt-10">
        <AskOpera
          shareId={ctx.id}
          patientFirstName={ctx.patientFirstName}
          clinicName={ctx.clinicName}
          provider={ctx.provider}
          suggestions={suggestedQuestions(ctx.treatmentType)}
        />
      </div>

      <footer className="border-t border-gray-100 py-5 text-center text-[11px] text-gray-400">
        Powered by <span className="font-semibold text-gray-500">Opera<span className="text-purple-500">AI</span></span> · Personalized patient education
      </footer>
    </div>
  );
}
