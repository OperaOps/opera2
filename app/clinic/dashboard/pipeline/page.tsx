/**
 * Generate Video — the clinic portal embeds the exact same Patient Video
 * Studio that runs on App Runner (/patient-video). On Netlify the studio's
 * API calls are proxied upstream via OPERA_RENDER_UPSTREAM, so generation
 * happens on the real pipeline either way.
 */

export { default } from "../../../patient-video/page";
