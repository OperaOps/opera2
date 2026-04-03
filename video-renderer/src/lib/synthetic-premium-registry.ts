import type { ComponentType } from "react";
import { PulpTherapyCrossSectionVisual } from "../components/dental/synthetic/PulpTherapyCrossSectionVisual";
import { CrownPrepSeatVisual } from "../components/dental/synthetic/CrownPrepSeatVisual";
import { GumPocketHealingVisual } from "../components/dental/synthetic/GumPocketHealingVisual";
import { CompositeLayeringVisual } from "../components/dental/synthetic/CompositeLayeringVisual";
import { RidgeAugmentationVisual } from "../components/dental/treatments/RidgeAugmentationVisual";
import { HealingOsseointegrationVisual } from "../components/dental/treatments/HealingOsseointegrationVisual";
import { FullArchRestorationVisual } from "../components/dental/treatments/FullArchRestorationVisual";
import { PremiumCrowdingVisual } from "../components/dental/premium/PremiumCrowdingVisual";
import { PremiumBracesVisual } from "../components/dental/premium/PremiumBracesVisual";
import { PremiumInvisalignVisual } from "../components/dental/premium/PremiumInvisalignVisual";
import { PremiumUnderbiteVisual } from "../components/dental/premium/PremiumUnderbiteVisual";

export type SyntheticPremiumVisual = ComponentType<{ progress: number }>;

/**
 * Premium 8-scene deep dive: custom SVG beats where stock video/stills would repeat
 * or mismatch the narrative. Every treatment gets a two-beat visual in premium mode.
 */
export const PREMIUM_SYNTHETIC_DEEP_DIVE: Record<string, SyntheticPremiumVisual> = {
  // Dental
  root_canal: PulpTherapyCrossSectionVisual,
  crown: CrownPrepSeatVisual,
  gum_treatment: GumPocketHealingVisual,
  filling: CompositeLayeringVisual,
  implant: HealingOsseointegrationVisual,
  extraction: PulpTherapyCrossSectionVisual,
  bridge: CrownPrepSeatVisual,
  dentures: FullArchRestorationVisual,
  veneers: CrownPrepSeatVisual,
  whitening: CompositeLayeringVisual,
  // Orthodontic
  braces: PremiumBracesVisual,
  invisalign: PremiumInvisalignVisual,
  ceramic_braces: PremiumBracesVisual,
  lingual_braces: PremiumBracesVisual,
  expander: PremiumCrowdingVisual,
  retainer: PremiumInvisalignVisual,
  jaw_surgery: PremiumUnderbiteVisual,
};

/**
 * Curated synthetic modules — use for imports/docs. Scene transitions (FMR) live in
 * JourneyScene / DeepDiveScene / WhatToExpectScene; general deep dives route via
 * {@link getPremiumSyntheticDeepDive}.
 */
export const SYNTHETIC_PREMIUM_ASSET_LIBRARY: {
  deepDiveByTreatment: Record<string, SyntheticPremiumVisual>;
  fullMouthRehab: {
    ridgeAugmentation: SyntheticPremiumVisual;
    healingOsseointegration: SyntheticPremiumVisual;
    fullArchRestoration: SyntheticPremiumVisual;
  };
} = {
  deepDiveByTreatment: PREMIUM_SYNTHETIC_DEEP_DIVE,
  fullMouthRehab: {
    ridgeAugmentation: RidgeAugmentationVisual,
    healingOsseointegration: HealingOsseointegrationVisual,
    fullArchRestoration: FullArchRestorationVisual,
  },
};

export function getPremiumSyntheticDeepDive(
  treatment: string | undefined
): SyntheticPremiumVisual | null {
  if (!treatment) return null;
  return PREMIUM_SYNTHETIC_DEEP_DIVE[treatment] ?? null;
}
