"use client";

/**
 * The pre-consult welcome page: a personalized intro that settles into the
 * clinic tour on the left with a warm what-to-expect column on the right.
 * If the clinic's video has no baked music, a soft bed plays alongside it
 * (started on the same tap, so browsers allow it).
 */

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function PreconsultWelcome({
  firstName,
  clinicName,
  provider,
  appointmentType,
  appointmentDate,
  personalNote,
  videoUrl,
  audioBaked,
  genericVisual,
}: {
  firstName: string;
  clinicName: string;
  provider?: string;
  appointmentType: string;
  appointmentDate?: string;
  personalNote?: string;
  videoUrl: string;
  audioBaked?: boolean;
  genericVisual?: boolean;
}) {
  const [intro, setIntro] = useState(true);
  const [started, setStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const bgmRef = useRef<HTMLAudioElement>(null);

  const start = () => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {});
    setStarted(true);
  };

  // Keep the music bed in step with whatever the patient does via the
  // native controls (play/pause/scrub).
  const syncBgm = (playing: boolean) => {
    if (audioBaked || !bgmRef.current) return;
    if (playing) {
      bgmRef.current.volume = 0.3;
      bgmRef.current.play().catch(() => {});
    } else {
      bgmRef.current.pause();
    }
  };

  const apptLabel = appointmentType.replace(/_/g, " ");

  return (
    <>
      {/* ——— personalized intro ——— */}
      <AnimatePresence>
        {intro && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white px-6"
            onAnimationComplete={() => {
              /* auto-dismiss after the greeting breathes */
            }}
          >
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
              className="cf-mono text-[12px] uppercase tracking-[0.24em] text-[#5f7a61]"
            >
              {clinicName}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.45, ease: EASE }}
              className="cf-display mt-4 text-center text-[clamp(2.2rem,6vw,4rem)] font-light leading-[1.05] tracking-[-0.02em] text-[#1a1a17]"
            >
              Your welcome video, {firstName}!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.8, ease: EASE }}
              className="cf-body mt-4 text-center text-[15.5px] text-[#5e6a60]"
            >
              We can&rsquo;t wait to meet you — the {clinicName} team made this
              just for you.
            </motion.p>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1, ease: EASE }}
              onClick={() => setIntro(false)}
              className="cf-body mt-9 rounded-full bg-[#5f7a61] px-8 py-3 text-[15.5px] font-medium text-white transition-colors hover:bg-[#4e6650]"
            >
              Watch your welcome
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ——— big centered title + video, post-consult style ——— */}
      <div className="mx-auto mt-8 max-w-3xl px-5 text-center">
        <p className="cf-mono text-[11.5px] uppercase tracking-[0.22em] text-[#5f7a61]">
          Before your {apptLabel}
        </p>
        <h2 className="cf-display mt-2 text-[clamp(1.7rem,3.4vw,2.5rem)] font-light leading-[1.1] tracking-[-0.02em] text-[#1a1a17]">
          Welcome to {clinicName}, {firstName}.
        </h2>
        <p className="cf-body mt-3 text-[14.5px] text-[#5e6a60]">
          {appointmentDate
            ? `Your visit is ${appointmentDate}. `
            : "Your visit is coming up. "}
          {genericVisual
            ? `${provider ? `${provider} and the whole team` : "The whole team"} can't wait to meet you — here's a short hello made just for you.`
            : `Here's a look at where you're headed${provider ? ` and the team around ${provider}` : ""} — so walking in feels familiar.`}
        </p>
      </div>

      <div className="mx-auto mt-6 max-w-3xl px-5">
        <div className="relative overflow-hidden rounded-2xl border border-[#1a1a17]/10 bg-black shadow-[0_24px_70px_rgba(63,85,64,0.18)]">
          <video
            ref={videoRef}
            src={videoUrl}
            playsInline
            controls
            preload="metadata"
            onPlay={() => {
              setStarted(true);
              syncBgm(true);
            }}
            onPause={() => syncBgm(false)}
            className="aspect-video w-full object-contain"
          />
          {!started && (
            <button
              aria-label="Play welcome video"
              onClick={start}
              className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors hover:bg-black/15"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-lg">
                <Play size={24} className="ml-1 text-[#1a1a17]" />
              </span>
            </button>
          )}
          {!audioBaked && <audio ref={bgmRef} src="/audio/opera-bgm.m4a" loop />}
        </div>
      </div>

      {/* ——— what to expect + note, centered under the video ——— */}
      <div className="mx-auto mt-10 max-w-3xl px-5">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            "A warm welcome at the front desk — no paperwork marathon.",
            "A comfortable look around, plus any photos or scans we need.",
            provider ? `Time with ${provider} to talk through what you're noticing.` : "Time with your doctor to talk through what you're noticing.",
            "A relaxed conversation about options. No decisions needed on the spot.",
          ].map((t, i) => (
            <div key={i} className="flex items-start gap-3 rounded-2xl border border-[#1a1a17]/[0.08] bg-[#f5f8f5]/60 px-4 py-3.5">
              <span className="cf-mono mt-0.5 shrink-0 text-[11px] text-[#5f7a61]">
                0{i + 1}
              </span>
              <p className="cf-body text-[14px] leading-relaxed text-[#1a1a17]/80">{t}</p>
            </div>
          ))}
        </div>

        {personalNote && (
          <div className="mt-5 rounded-2xl border border-[#5f7a61]/20 bg-[#5f7a61]/[0.05] px-6 py-5 text-center">
            <p className="cf-mono text-[10.5px] uppercase tracking-[0.16em] text-[#5f7a61]">
              A note from {clinicName}
            </p>
            <p className="cf-display mt-1.5 text-[16.5px] italic leading-relaxed text-[#1a1a17]">
              &ldquo;{personalNote}&rdquo;
            </p>
          </div>
        )}

        <p className="cf-body mt-6 text-center text-[14px] text-[#5e6a60]">
          Questions before your visit? Ask below — any time, day or night.
        </p>
      </div>
    </>
  );
}
