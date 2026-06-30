/**
 * Builds the playable timeline by alternating PERSONALIZED UI scenes with ASSET-BACKED
 * real-world treatment scenes:
 *   intro (UI) → treatment → personalized scene → treatment → prep/questions → … → disclaimer (UI)
 *
 * Treatment scenes come from the treatment asset plan (real image/video, or a polished
 * slot if not yet uploaded). The older primitive SVG clinical scenes are kept only as a
 * fallback for use cases with no treatment assets.
 */

import type {
  ClinicalVisualPlan,
  DemoUseCase,
  StoryboardScene,
  TreatmentAssetEntry,
} from '@/lib/types';
import { clinicalVisualsFor } from '@/lib/clinicalVisuals';
import { treatmentAssetsForUseCase } from '@/lib/treatmentVisualAssetPlan';
import { hasMedicalAsset } from '@/lib/medicalAssetManifest';
import { hasCodedScene } from '@/components/treatment-visuals/coded';

const CLINICAL_SEGMENT_SECONDS = 10;
const TREATMENT_SEGMENT_SECONDS = 9;

/** Use cases whose treatment clips play back-to-back (procedure walkthroughs), with the
 * personalized UI scenes after the procedure rather than interleaved. */
const CONTIGUOUS_TREATMENT_IDS = new Set<string>(['coronary-stent']);

export type VideoSegment =
  | { kind: 'ui'; key: string; caption: string; durationSec: number; label: string; scene: StoryboardScene }
  | {
      kind: 'treatment';
      key: string;
      caption: string;
      durationSec: number;
      label: string;
      entry: TreatmentAssetEntry;
      personalizationNote: string;
    }
  | {
      kind: 'clinical';
      key: string;
      caption: string;
      durationSec: number;
      label: string;
      plan: ClinicalVisualPlan;
    };

const isClinicalScene = (s: StoryboardScene) => Boolean(s.clinicalVisualCategory);

/** The treatment asset entries a use case shows (for the demo "real-world visuals" panel). */
export function treatmentScenesForUseCase(u: DemoUseCase): TreatmentAssetEntry[] {
  return treatmentAssetsForUseCase(u.id);
}

export function buildVideoTimeline(u: DemoUseCase): VideoSegment[] {
  // Only real, uploaded clips (or coded in-app scenes) play — never prompt-only slots.
  const treatments = treatmentAssetsForUseCase(u.id).filter(
    (t) => hasMedicalAsset(t.assetId) || hasCodedScene(t.assetId),
  );
  const uiScenes = u.storyboard.filter((s) => !isClinicalScene(s));

  // Primary path: interleave personalized UI scenes with the real treatment clips.
  // The closing disclaimer card is intentionally dropped — the video ends on a warm,
  // forward-looking clinical beat instead of a legal note.
  if (treatments.length) {
    const closing = uiScenes.find((s) => s.visualType === 'closing-card');
    const core = uiScenes.filter((s) => s !== closing);
    const intro = core[0];
    const rest = core.slice(1);

    const segs: VideoSegment[] = [];
    if (intro) segs.push(uiSeg(intro, 0));

    // Procedure walkthroughs play their clips back-to-back as one continuous sequence,
    // with the personalized UI scenes after — so the visual procedure isn't interrupted.
    if (CONTIGUOUS_TREATMENT_IDS.has(u.id)) {
      treatments.forEach((t, i) => segs.push(treatmentSeg(t, i)));
      rest.forEach((s, i) => segs.push(uiSeg(s, i + 1)));
      return segs;
    }

    const maxLen = Math.max(treatments.length, rest.length);
    for (let i = 0; i < maxLen; i++) {
      if (treatments[i]) segs.push(treatmentSeg(treatments[i], i));
      if (rest[i]) segs.push(uiSeg(rest[i], i + 1));
    }
    return segs;
  }

  // Fallback: older embedded SVG clinical scenes / injected clinical plans.
  const allUi: VideoSegment[] = u.storyboard.map((scene, i) => uiSeg(scene, i));
  const plans = u.clinicalVisuals?.length ? u.clinicalVisuals : clinicalVisualsFor(u.id);
  if (!plans.length) return allUi;
  const clinicalSegs: VideoSegment[] = plans.map((plan, i) => ({
    kind: 'clinical',
    key: `cl-${i}`,
    caption: plan.patientFriendlyExplanation,
    durationSec: CLINICAL_SEGMENT_SECONDS,
    label: plan.realWorldConceptShown,
    plan,
  }));
  const [intro, ...rest] = allUi;
  return intro ? [intro, ...clinicalSegs, ...rest] : [...clinicalSegs, ...allUi];
}

function uiSeg(scene: StoryboardScene, i: number): VideoSegment {
  return {
    kind: 'ui',
    key: `ui-${i}`,
    caption: scene.narration,
    durationSec: scene.durationSec,
    label: scene.sceneTitle,
    scene,
  };
}

function treatmentSeg(entry: TreatmentAssetEntry, i: number): VideoSegment {
  return {
    kind: 'treatment',
    key: `tx-${i}`,
    // The spoken narration doubles as the on-screen subtitle, so audio and captions match.
    caption: entry.voiceover ?? entry.whatPatientLearns,
    durationSec: TREATMENT_SEGMENT_SECONDS,
    label: entry.visualDescription,
    entry,
    personalizationNote: entry.personalizationOverlay,
  };
}
