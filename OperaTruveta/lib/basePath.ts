/**
 * When the app is served under a subpath (e.g. getopera.ai/truvetademo), Next.js prefixes
 * <Link> and next/image automatically — but NOT raw <video>/<img> src strings or fetch()
 * URLs. This helper prefixes those. Driven by NEXT_PUBLIC_BASE_PATH, which is unset locally
 * (so dev serves at the root) and set to "/truvetademo" in the production deployment.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** Prefix an absolute app path with the base path (no-op when BASE_PATH is empty). */
export function withBasePath(path: string): string {
  if (!BASE_PATH || !path.startsWith('/')) return path;
  return `${BASE_PATH}${path}`;
}
