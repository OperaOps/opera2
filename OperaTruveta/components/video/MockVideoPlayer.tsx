'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Languages } from 'lucide-react';
import type { DemoUseCase } from '@/lib/types';
import { VideoSceneRenderer, firstName } from '@/components/scenes/sceneVisuals';
import { ClinicalSceneRenderer } from '@/components/scenes/clinicalScenes';
import { TreatmentVisualRenderer } from '@/components/treatment-visuals';
import { buildVideoTimeline } from '@/lib/videoTimeline';
import { cn, formatSeconds } from '@/lib/utils';
import { useNarration } from './useNarration';
import { SyncedSubtitle } from './SyncedSubtitle';

/** Spoken pacing: ~2.3 words/sec plus a beat, clamped — times each scene to its narration. */
function sceneSeconds(text: string): number {
  const words = (text || '').trim().split(/\s+/).filter(Boolean).length;
  return Math.min(22, Math.max(5, words / 2.3 + 1.2));
}

export function MockVideoPlayer({ useCase }: { useCase: DemoUseCase }) {
  const segments = buildVideoTimeline(useCase);
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [soundOn, setSoundOn] = useState(false);
  const [progress, setProgress] = useState(0); // 0..1 within current segment
  const [showES, setShowES] = useState(useCase.patient.language.toLowerCase().includes('span'));
  const raf = useRef<number>();
  const start = useRef<number>(0);
  const { speak, stop } = useNarration();

  const bilingual = /span|english \+/i.test(useCase.patient.language);
  const segment = segments[i];

  // Stable advance ref so a narration callback never fires on a stale index.
  const advance = useCallback(() => {
    setProgress(0);
    setI((prev) => (prev + 1) % segments.length);
  }, [segments.length]);
  const advanceRef = useRef(advance);
  advanceRef.current = advance;

  // Each scene: rAF drives the progress bar; the scene advances when the spoken line
  // finishes (sound on) or after its estimated duration (sound off). Captions = narration,
  // so audio and subtitles stay locked together.
  useEffect(() => {
    if (!playing) {
      stop();
      return;
    }
    let mounted = true;
    let done = false;
    const durMs = sceneSeconds(segment.caption) * 1000;
    start.current = performance.now();

    const finish = () => {
      if (done || !mounted) return;
      done = true;
      advanceRef.current();
    };

    if (soundOn) speak(segment.caption, finish);
    // Sound off advances exactly on duration; sound on uses a generous backstop in case
    // an onend event is dropped by the audio/speech engine.
    const safety = window.setTimeout(finish, soundOn ? durMs * 2 + 2500 : durMs);

    const tick = (now: number) => {
      if (!mounted) return;
      setProgress(Math.min((now - start.current) / durMs, 1));
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      mounted = false;
      window.clearTimeout(safety);
      if (raf.current) cancelAnimationFrame(raf.current);
      stop();
    };
  }, [playing, soundOn, i, segment.caption, speak, stop]);

  const go = (dir: number) => {
    setProgress(0);
    setI((prev) => (prev + dir + segments.length) % segments.length);
  };

  const enableSound = () => {
    setProgress(0);
    setI(0); // start the narrated watch cleanly from scene one
    setSoundOn(true);
    setPlaying(true);
  };

  const overall = (i + progress) / segments.length;

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200/70 bg-navy-950 shadow-soft-lg">
      {/* Top bar */}
      <div className="border-b border-white/5 px-4 py-3">
        <p className="truncate text-[11px] font-medium uppercase tracking-wide text-teal-300/80">
          For {firstName(useCase)} · {useCase.department}
        </p>
        <p className="truncate text-sm font-semibold text-white">{useCase.title}</p>
      </div>

      {/* Scene area */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-navy-950">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            {segment.kind === 'treatment' ? (
              <TreatmentVisualRenderer
                entry={segment.entry}
                patientName={firstName(useCase)}
                caption={segment.caption}
                personalizationNote={segment.personalizationNote}
                language={useCase.patient.language}
                progress={progress}
              />
            ) : segment.kind === 'clinical' ? (
              <ClinicalSceneRenderer useCase={useCase} plan={segment.plan} />
            ) : (
              <VideoSceneRenderer useCase={useCase} scene={segment.scene} />
            )}
          </motion.div>
        </AnimatePresence>

        {/* One clean single-line subtitle, advanced in step with the narration */}
        <SyncedSubtitle caption={segment.caption} progress={progress} />

        {/* Tap-to-enable-sound (browsers block autoplay audio until a gesture) */}
        {!soundOn && (
          <button
            onClick={enableSound}
            className="absolute inset-0 z-30 flex items-center justify-center bg-navy-950/30 backdrop-blur-[1px] transition-colors hover:bg-navy-950/40"
            aria-label="Play with sound"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-5 py-2.5 text-sm font-semibold text-navy-900 shadow-soft-lg ring-1 ring-black/5">
              <Volume2 className="h-4 w-4" />
              Play with narration
            </span>
          </button>
        )}
      </div>

      {/* Controls */}
      <div className="space-y-3 px-4 py-3.5">
        {/* progress segments — teal = personalized, sky = real-world clinical */}
        <div className="flex items-center gap-1">
          {segments.map((s, idx) => (
            <button
              key={s.key}
              onClick={() => go(idx - i)}
              className="group relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/12"
              title={`${s.kind === 'clinical' ? 'Real-world · ' : ''}${s.label}`}
            >
              <span
                className={cn(
                  'absolute inset-y-0 left-0 rounded-full',
                  s.kind === 'clinical'
                    ? 'bg-gradient-to-r from-sky-400 to-sky-300'
                    : 'bg-gradient-to-r from-teal-400 to-teal-300',
                )}
                style={{ width: idx < i ? '100%' : idx === i ? `${progress * 100}%` : '0%' }}
              />
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Ctrl onClick={() => go(-1)} label="Previous">
              <SkipBack className="h-4 w-4" />
            </Ctrl>
            <Ctrl onClick={() => setPlaying((p) => !p)} label={playing ? 'Pause' : 'Play'} primary>
              {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 translate-x-px" />}
            </Ctrl>
            <Ctrl onClick={() => go(1)} label="Next">
              <SkipForward className="h-4 w-4" />
            </Ctrl>
            <button
              onClick={() => (soundOn ? setSoundOn(false) : enableSound())}
              className="ml-2 inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[11px] font-medium text-white/60 transition-colors hover:bg-white/10 hover:text-white/90"
              aria-label={soundOn ? 'Mute narration' : 'Unmute narration'}
            >
              {soundOn ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
            </button>
            <span className="flex items-center gap-1.5 text-[11px] text-white/50">
              {formatSeconds(Math.round(overall * useCase.estimatedRuntimeSec))} /{' '}
              {formatSeconds(useCase.estimatedRuntimeSec)}
            </span>
          </div>

          {bilingual && (
            <button
              onClick={() => setShowES((v) => !v)}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/80 transition-colors hover:bg-white/10"
            >
              <Languages className="h-3.5 w-3.5" />
              {showES ? 'Español' : 'English'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Ctrl({
  children,
  onClick,
  label,
  primary,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
  primary?: boolean;
}) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className={cn(
        'flex items-center justify-center rounded-full transition-all',
        primary
          ? 'h-9 w-9 bg-white text-navy-900 hover:scale-105'
          : 'h-8 w-8 text-white/70 hover:bg-white/10 hover:text-white',
      )}
    >
      {children}
    </button>
  );
}
