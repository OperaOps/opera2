'use client';

/**
 * Asset-backed treatment visual system.
 *
 * Each clinical scene is a REAL medical asset (image or short motion video) presented
 * with Ken Burns motion, animated callouts, a caption, and a patient-personalization
 * overlay. When the asset hasn't been uploaded yet, a polished asset slot shows the
 * exact generation prompt instead — never fake abstract medical art.
 */

import type { TreatmentAssetEntry } from '@/lib/types';
import { getMedicalAsset } from '@/lib/medicalAssetManifest';
import { KenBurnsTreatmentImage, TreatmentVideoAssetPlayer } from './media';
import { TreatmentAssetSlot } from './TreatmentAssetSlot';
import { codedTreatmentScenes } from './coded';

export { KenBurnsTreatmentImage, TreatmentVideoAssetPlayer } from './media';
export { TreatmentAssetSlot } from './TreatmentAssetSlot';
export {
  AnimatedMedicalCallout,
  SceneCaptionOverlay,
  PatientPersonalizationOverlay,
  SceneProgressBar,
} from './overlays';

const isVideo = (entry: TreatmentAssetEntry, src: string) =>
  entry.assetType === 'short-motion-video' ||
  entry.assetType === 'stock-video' ||
  /\.(mp4|webm|mov)$/i.test(src);

/** The real asset layer (image with Ken Burns, or a clip fitted to the scene length). */
export function MedicalAssetScene({
  entry,
  src,
  durationSec,
}: {
  entry: TreatmentAssetEntry;
  src: string;
  durationSec?: number;
}) {
  if (isVideo(entry, src)) return <TreatmentVideoAssetPlayer src={src} targetSec={durationSec} />;
  return <KenBurnsTreatmentImage src={src} alt={entry.visualDescription} />;
}

export interface TreatmentSceneProps {
  entry: TreatmentAssetEntry;
  patientName?: string;
  caption?: string;
  personalizationNote?: string;
  language?: string;
  /** 0..1 progress within this scene — renders a thin top progress bar when provided. */
  progress?: number;
  /** Target scene length (s) — the clip is gently slowed to fill it, then freezes. */
  durationSec?: number;
  /** 1-based position of this clip among the video's clip scenes (for the STEP eyebrow). */
  sceneIndex?: number;
  /** Total number of clip scenes in the video. */
  sceneCount?: number;
}

/**
 * A treatment scene presented as a clean white slide (flagship format): the clip
 * plays inside a framed panel on the left, with the scene's key takeaway and the
 * patient-personalization note on the right. Never full-bleed.
 */
export function TreatmentVideoScene({
  entry,
  durationSec,
  progress,
  personalizationNote,
  sceneIndex,
  sceneCount,
}: TreatmentSceneProps) {
  const Coded = codedTreatmentScenes[entry.assetId];
  const src = getMedicalAsset(entry.assetId);
  const hasAsset = Boolean(src);

  const visual = Coded ? (
    <Coded progress={progress ?? 0} />
  ) : hasAsset ? (
    <MedicalAssetScene entry={entry} src={src!} durationSec={durationSec} />
  ) : (
    <TreatmentAssetSlot entry={entry} variant="frame" />
  );

  return (
    <div className="absolute inset-0 overflow-hidden bg-white">
      <div className="flex h-full w-full items-center gap-[4%] px-[5%] pb-[10%] pt-[4%]">
        {/* Framed clip panel — the visual never takes the whole screen */}
        <div className="relative h-full w-[58%] shrink-0 overflow-hidden rounded-2xl border border-slate-900/10 bg-slate-100 shadow-[0_18px_44px_rgba(11,18,32,0.16)]">
          <div className="absolute inset-0">{visual}</div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t from-black/25 to-transparent"
          />
        </div>

        {/* Right column — takeaway + personalization */}
        <div className="min-w-0 flex-1">
          {sceneIndex != null && (
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-teal-700 sm:text-xs">
              {`Scene ${String(sceneIndex).padStart(2, '0')}${sceneCount ? ` of ${String(sceneCount).padStart(2, '0')}` : ''}`}
            </p>
          )}
          <p className="mt-2 text-sm font-semibold leading-snug text-navy-900 sm:text-lg lg:text-xl">
            {entry.whatPatientLearns}
          </p>
          {personalizationNote && (
            <div className="mt-3 flex items-start gap-2.5 sm:mt-4">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-teal-500" />
              <p className="text-xs leading-relaxed text-slate-500 sm:text-sm">
                {personalizationNote}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/** Public entry point used by the player and galleries. */
export function TreatmentVisualRenderer(props: TreatmentSceneProps) {
  return <TreatmentVideoScene {...props} />;
}
