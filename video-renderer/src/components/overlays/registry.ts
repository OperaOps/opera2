/**
 * Registry: maps (treatment, scene) → overlay component.
 * Scenes import getOverlay() and render the result on top of their background image.
 */

import React from "react";
import type { OverlayProps } from "./shared";
import {
  CrownProblemOverlay,
  CrownTreatmentOverlay,
  CrownOutcomeOverlay,
} from "./CrownOverlay";
import {
  RootCanalProblemOverlay,
  RootCanalTreatmentOverlay,
  RootCanalOutcomeOverlay,
} from "./RootCanalOverlay";
import {
  InvisalignProblemOverlay,
  InvisalignTreatmentOverlay,
  InvisalignOutcomeOverlay,
} from "./InvisalignOverlay";

type SceneType = "problem" | "treatment" | "outcome" | "deepDive" | "whatToExpect";
type OverlayComponent = React.FC<OverlayProps>;

const overlayMap: Record<string, Record<SceneType, OverlayComponent | null>> = {
  crown: {
    problem: CrownProblemOverlay,
    treatment: CrownTreatmentOverlay,
    outcome: CrownOutcomeOverlay,
    deepDive: CrownProblemOverlay,       // reuse problem for deep dive
    whatToExpect: CrownOutcomeOverlay,    // reuse outcome for what to expect
  },
  filling: {
    problem: CrownProblemOverlay,         // similar dental restoration
    treatment: CrownTreatmentOverlay,
    outcome: CrownOutcomeOverlay,
    deepDive: CrownProblemOverlay,
    whatToExpect: CrownOutcomeOverlay,
  },
  root_canal: {
    problem: RootCanalProblemOverlay,
    treatment: RootCanalTreatmentOverlay,
    outcome: RootCanalOutcomeOverlay,
    deepDive: RootCanalProblemOverlay,
    whatToExpect: RootCanalOutcomeOverlay,
  },
  implant: {
    problem: RootCanalProblemOverlay,     // shows infected/damaged tooth
    treatment: CrownTreatmentOverlay,     // shows placement
    outcome: CrownOutcomeOverlay,
    deepDive: RootCanalProblemOverlay,
    whatToExpect: CrownOutcomeOverlay,
  },
  extraction: {
    problem: RootCanalProblemOverlay,
    treatment: RootCanalTreatmentOverlay,
    outcome: RootCanalOutcomeOverlay,
    deepDive: RootCanalProblemOverlay,
    whatToExpect: RootCanalOutcomeOverlay,
  },
  bridge: {
    problem: RootCanalProblemOverlay,
    treatment: CrownTreatmentOverlay,
    outcome: CrownOutcomeOverlay,
    deepDive: RootCanalProblemOverlay,
    whatToExpect: CrownOutcomeOverlay,
  },
  veneers: {
    problem: CrownProblemOverlay,
    treatment: CrownTreatmentOverlay,
    outcome: CrownOutcomeOverlay,
    deepDive: CrownProblemOverlay,
    whatToExpect: CrownOutcomeOverlay,
  },
  whitening: {
    problem: CrownProblemOverlay,
    treatment: CrownTreatmentOverlay,
    outcome: CrownOutcomeOverlay,
    deepDive: CrownProblemOverlay,
    whatToExpect: CrownOutcomeOverlay,
  },
  gum_treatment: {
    problem: RootCanalProblemOverlay,
    treatment: RootCanalTreatmentOverlay,
    outcome: RootCanalOutcomeOverlay,
    deepDive: RootCanalProblemOverlay,
    whatToExpect: RootCanalOutcomeOverlay,
  },
  dentures: {
    problem: RootCanalProblemOverlay,
    treatment: CrownTreatmentOverlay,
    outcome: CrownOutcomeOverlay,
    deepDive: RootCanalProblemOverlay,
    whatToExpect: CrownOutcomeOverlay,
  },
  inlay_onlay: {
    problem: CrownProblemOverlay,
    treatment: CrownTreatmentOverlay,
    outcome: CrownOutcomeOverlay,
    deepDive: CrownProblemOverlay,
    whatToExpect: CrownOutcomeOverlay,
  },

  // Orthodontic treatments — all use Invisalign overlays (teeth alignment animations)
  invisalign: {
    problem: InvisalignProblemOverlay,
    treatment: InvisalignTreatmentOverlay,
    outcome: InvisalignOutcomeOverlay,
    deepDive: InvisalignProblemOverlay,
    whatToExpect: InvisalignOutcomeOverlay,
  },
  braces: {
    problem: InvisalignProblemOverlay,
    treatment: InvisalignTreatmentOverlay,
    outcome: InvisalignOutcomeOverlay,
    deepDive: InvisalignProblemOverlay,
    whatToExpect: InvisalignOutcomeOverlay,
  },
  ceramic_braces: {
    problem: InvisalignProblemOverlay,
    treatment: InvisalignTreatmentOverlay,
    outcome: InvisalignOutcomeOverlay,
    deepDive: InvisalignProblemOverlay,
    whatToExpect: InvisalignOutcomeOverlay,
  },
  lingual_braces: {
    problem: InvisalignProblemOverlay,
    treatment: InvisalignTreatmentOverlay,
    outcome: InvisalignOutcomeOverlay,
    deepDive: InvisalignProblemOverlay,
    whatToExpect: InvisalignOutcomeOverlay,
  },
  expander: {
    problem: InvisalignProblemOverlay,
    treatment: InvisalignTreatmentOverlay,
    outcome: InvisalignOutcomeOverlay,
    deepDive: InvisalignProblemOverlay,
    whatToExpect: InvisalignOutcomeOverlay,
  },
  retainer: {
    problem: InvisalignProblemOverlay,
    treatment: InvisalignTreatmentOverlay,
    outcome: InvisalignOutcomeOverlay,
    deepDive: InvisalignProblemOverlay,
    whatToExpect: InvisalignOutcomeOverlay,
  },
  jaw_surgery: {
    problem: InvisalignProblemOverlay,
    treatment: InvisalignTreatmentOverlay,
    outcome: InvisalignOutcomeOverlay,
    deepDive: InvisalignProblemOverlay,
    whatToExpect: InvisalignOutcomeOverlay,
  },
  headgear: {
    problem: InvisalignProblemOverlay,
    treatment: InvisalignTreatmentOverlay,
    outcome: InvisalignOutcomeOverlay,
    deepDive: InvisalignProblemOverlay,
    whatToExpect: InvisalignOutcomeOverlay,
  },
  space_maintainer: {
    problem: InvisalignProblemOverlay,
    treatment: InvisalignTreatmentOverlay,
    outcome: InvisalignOutcomeOverlay,
    deepDive: InvisalignProblemOverlay,
    whatToExpect: InvisalignOutcomeOverlay,
  },
  sleep_apnea: {
    problem: InvisalignProblemOverlay,
    treatment: InvisalignTreatmentOverlay,
    outcome: InvisalignOutcomeOverlay,
    deepDive: InvisalignProblemOverlay,
    whatToExpect: InvisalignOutcomeOverlay,
  },
  full_mouth: {
    problem: RootCanalProblemOverlay,
    treatment: CrownTreatmentOverlay,
    outcome: CrownOutcomeOverlay,
    deepDive: RootCanalProblemOverlay,
    whatToExpect: CrownOutcomeOverlay,
  },
  full_mouth_rehab: {
    problem: RootCanalProblemOverlay,
    treatment: CrownTreatmentOverlay,
    outcome: CrownOutcomeOverlay,
    deepDive: RootCanalProblemOverlay,
    whatToExpect: CrownOutcomeOverlay,
  },
};

/**
 * Get the overlay component for a given treatment and scene.
 * Returns null if no overlay is configured.
 */
export function getOverlay(
  treatment: string,
  scene: SceneType
): OverlayComponent | null {
  return overlayMap[treatment]?.[scene] ?? null;
}
