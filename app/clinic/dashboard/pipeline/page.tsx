"use client";

/**
 * Generate — two stages. Post-consult renders the full flagship treatment
 * video; Pre-consult creates an instant welcome page from the clinic's own
 * tour video. ?patient=<id> prefills the post-consult form.
 */

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { VideoStudio } from "@/Components/patient-video/VideoStudio";
import PreConsultForm from "@/Components/clinic-portal/PreConsultForm";

function GenerateInner() {
  const params = useSearchParams();
  const [stage, setStage] = useState<"post" | "pre">("post");

  return (
    <div>
      <div className="mx-auto mb-8 flex max-w-xl items-center justify-center">
        <div className="flex rounded-full border border-[#1a1a17]/12 bg-white p-1">
          {(
            [
              ["pre", "Pre-consult"],
              ["post", "Post-consult"],
            ] as const
          ).map(([k, label]) => (
            <button
              key={k}
              onClick={() => setStage(k)}
              className={`cf-body rounded-full px-6 py-2 text-[14.5px] font-medium transition-colors ${
                stage === k
                  ? "bg-[#5f7a61] text-white"
                  : "text-[#1a1a17]/55 hover:text-[#1a1a17]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {stage === "pre" ? (
        <PreConsultForm />
      ) : (
        <VideoStudio embedded prefillPatientId={params?.get("patient") ?? null} />
      )}
    </div>
  );
}

export default function GenerateVideoPage() {
  return (
    <Suspense fallback={null}>
      <GenerateInner />
    </Suspense>
  );
}
