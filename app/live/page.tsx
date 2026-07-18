/**
 * /live — the live demo: the Jessica veneers patient experience exactly as
 * a patient receives it, restyled to the current brand. Video on top,
 * Ask Opera underneath.
 */

import { getShareContext, suggestedQuestions } from "@/lib/patient-share";
import { AskOpera } from "@/Components/patient/AskOpera";
import { CALENDLY_URL } from "@/lib/concepts/shared";

export const dynamic = "force-dynamic";

export default async function LiveDemo() {
  const ctx = (await getShareContext("demo"))!;
  const treatmentLabel = ctx.treatmentType.replace(/_/g, " ");

  return (
    <div className="min-h-screen bg-white text-[#1a1a17]">
      {/* site header */}
      <header className="border-b border-[#1a1a17]/10">
        <div className="mx-auto flex h-[64px] max-w-[1240px] items-center justify-between px-6">
          <a href="/" className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/videos/sitepics/logo-mark.png" alt="" className="h-[32px] w-[32px]" />
            <span className="cf-display text-[22px] leading-none tracking-[-0.01em]">
              Opera<span className="text-[#5f7a61]">AI</span>
            </span>
          </a>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cf-body rounded-full bg-[#5f7a61] px-6 py-2.5 text-[15px] font-medium text-white transition-colors duration-300 hover:bg-[#4e6650]"
          >
            Book a demo
          </a>
        </div>
      </header>

      {/* clinic strip */}
      <div className="mx-auto flex max-w-3xl items-center justify-between px-5 pt-8">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#5f7a61] text-[14px] font-semibold text-white">
            {ctx.clinicName.charAt(0)}
          </span>
          <div className="leading-tight">
            <p className="cf-body text-[14.5px] font-semibold">{ctx.clinicName}</p>
            {ctx.provider && <p className="cf-body text-[12.5px] text-[#5e6a60]">{ctx.provider}</p>}
          </div>
        </div>
        <span className="cf-mono rounded-full bg-[#5f7a61]/10 px-3 py-1 text-[11px] uppercase tracking-[0.1em] text-[#3e5540]">
          {treatmentLabel}
        </span>
      </div>

      {/* title */}
      <div className="mx-auto max-w-3xl px-5 pt-9 text-center">
        <p className="cf-mono text-[12px] uppercase tracking-[0.22em] text-[#5f7a61]">
          Made for {ctx.patientFirstName}
        </p>
        <h1 className="cf-display mt-3 text-[clamp(1.8rem,3.4vw,2.6rem)] font-light leading-[1.08] tracking-[-0.02em]">
          {ctx.videoTitle}
        </h1>
        <p className="cf-body mt-3 text-[15px] text-[#5e6a60]">
          A personal walkthrough from {ctx.provider ?? "your doctor"} and the {ctx.clinicName} team.
        </p>
      </div>

      {/* the video */}
      <div className="mx-auto mt-7 max-w-3xl px-5">
        <div className="overflow-hidden rounded-2xl border border-[#1a1a17]/10 bg-black shadow-[0_30px_80px_-30px_rgba(63,85,64,0.35)]">
          <video
            src={ctx.videoUrl}
            controls
            playsInline
            preload="metadata"
            className="aspect-video w-full bg-white object-contain"
          />
        </div>
      </div>

      {/* Ask Opera */}
      <div className="mx-auto max-w-3xl px-5 pb-20 pt-10">
        <AskOpera
          shareId={ctx.id}
          patientFirstName={ctx.patientFirstName}
          clinicName={ctx.clinicName}
          provider={ctx.provider}
          suggestions={suggestedQuestions(ctx.treatmentType)}
        />
      </div>

      <footer className="border-t border-[#1a1a17]/10 py-5 text-center">
        <span className="cf-body text-[12.5px] text-[#5e6a60]">
          Powered by{" "}
          <span className="cf-display text-[13px] text-[#1a1a17]">
            Opera<span className="text-[#5f7a61]">AI</span>
          </span>{" "}
          · Personalized patient education
        </span>
      </footer>
    </div>
  );
}
