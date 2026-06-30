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
}

/**
 * A full treatment scene: real asset (or polished slot) + callouts + caption +
 * personalization. Fills its parent (use inside a relative 16:9 container or the player).
 */
export function TreatmentVideoScene({ entry, durationSec, progress }: TreatmentSceneProps) {
  const Coded = codedTreatmentScenes[entry.assetId];
  const src = getMedicalAsset(entry.assetId);
  const hasAsset = Boolean(src);

  // In the player, only real clips (or coded scenes) ever reach here. The visual plays
  // clean — no callouts, chips, or labels on top — with just a soft bottom scrim so the
  // single-line subtitle (rendered by the player) stays legible.
  return (
    <div className="absolute inset-0 overflow-hidden">
      {Coded ? (
        <Coded progress={progress ?? 0} />
      ) : hasAsset ? (
        <MedicalAssetScene entry={entry} src={src!} durationSec={durationSec} />
      ) : (
        <TreatmentAssetSlot entry={entry} variant="frame" />
      )}

      {hasAsset && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent"
        />
      )}
    </div>
  );
}

/** Public entry point used by the player and galleries. */
export function TreatmentVisualRenderer(props: TreatmentSceneProps) {
  return <TreatmentVideoScene {...props} />;
}
