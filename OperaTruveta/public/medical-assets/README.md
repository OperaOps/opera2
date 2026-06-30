# Medical assets

Drop real clinical/treatment visuals here (images or short motion videos). The app
turns them into polished, personalized video scenes with Ken Burns motion, animated
callouts, captions, and patient-specific overlays.

Until an asset exists, each scene renders a **polished asset slot** that shows the exact
generation/stock prompt and the recommended filename — never fake abstract medical art.

## How to add an asset

1. Find the asset's plan entry in `lib/treatmentVisualAssetPlan.ts` (it lists the
   `recommendedFileName`, `assetType`, exact image/video generation prompt, and stock
   search terms).
2. Generate or source the asset (high-end medical explainer style — Mayo/Cleveland
   Clinic / premium Osmosis-style; educational, non-graphic).
3. Save it in the matching folder below using the recommended filename.
4. Register it in `lib/medicalAssetManifest.ts`:
   ```ts
   export const medicalAssetManifest: Record<string, string> = {
     'colon-screening-1': '/medical-assets/colon-screening/colon-anatomy.jpg',
   };
   ```
   (key = `assetId` from the plan, value = public path). The scene swaps from slot to
   real asset automatically.

## Folders
colon-screening · diabetes-a1c · clinical-trials · discharge · medication · labs ·
prenatal · blood-pressure · colonoscopy-prep · genomics · caregiver · care-navigation

## Safety
Educational only. Non-graphic — no gore, no surgical close-ups, no frightening imagery.
Visuals never interpret a patient's result, recommend treatment, or imply enrollment.
