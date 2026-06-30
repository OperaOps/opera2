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

/** The real asset layer (image with Ken Burns, or looping video). */
export function MedicalAssetScene({
  entry,
  src,
}: {
  entry: TreatmentAssetEntry;
  src: string;
}) {
  if (isVideo(entry, src)) return <TreatmentVideoAssetPlayer src={src} />;
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
}

/**
 * A full treatment scene: real asset (or polished slot) + callouts + caption +
 * personalization. Fills its parent (use inside a relative 16:9 container or the player).
 */
export function TreatmentVideoScene({ entry }: TreatmentSceneProps) {
  const src = getMedicalAsset(entry.assetId);
  const hasAsset = Boolean(src);

  // In the player, only real clips ever reach here. The visual plays clean — no
  // callouts, chips, or labels on top of it — with just a soft bottom scrim so the
  // single-line subtitle (rendered by the player) stays legible.
  return (
    <div className="absolute inset-0 overflow-hidden">
      {hasAsset ? (
        <MedicalAssetScene entry={entry} src={src!} />
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
