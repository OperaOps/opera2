/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Serve under a subpath (e.g. /truvetademo) when NEXT_PUBLIC_BASE_PATH is set in the
  // deploy env. Unset locally, so dev stays at the root.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
};

module.exports = nextConfig;
