/**
 * Placeholder for the patient-video background renderer.
 *
 * The `template_ai` refactor (commit c368f5f) pointed the generate route at this
 * module, but its implementation was never committed — leaving `next build`
 * broken on a missing import. This stub restores a green build; video jobs are
 * created but not rendered until the real pipeline lands.
 *
 * TODO: implement the actual render pipeline to replace this no-op.
 */
export function runRenderInBackground(jobId: string, _input: unknown): void {
  console.warn(
    `[patient-video] runRenderInBackground called for job ${jobId}, but the render pipeline is not implemented yet — job will remain in "processing".`
  );
}
