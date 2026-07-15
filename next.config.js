/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
  },
  experimental: {
    // SQLite DB must ship inside the serverless function bundle (demo portal).
    outputFileTracingIncludes: {
      "/**": ["./data/opera_local.db"],
    },
    // The local-render path drags the entire video-renderer tree (clip
    // library + past renders, 400MB+) into the serverless bundle, which
    // blows Netlify's function upload limit. Netlify never renders locally
    // (OPERA_RENDER_UPSTREAM proxies to App Runner), and App Runner runs
    // from the full filesystem — safe to exclude from tracing everywhere.
    outputFileTracingExcludes: {
      "*": ["./video-renderer/**", "./OperaTruveta/**", "./WallyOpera/**", "./OperaBola/**"],
    },
  },
  typescript: {
    // Temporarily ignore TypeScript errors during build
    ignoreBuildErrors: true,
  },
  eslint: {
    // Temporarily ignore ESLint errors during build
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
