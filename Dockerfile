# Opera AI - Production Dockerfile
# Handles both Next.js frontend and Remotion video rendering
FROM node:20-bookworm AS base

# Install Chrome dependencies for Remotion and ffmpeg
RUN apt-get update && apt-get install -y \
  chromium \
  ffmpeg \
  fonts-liberation \
  fonts-noto-color-emoji \
  libasound2 \
  libatk-bridge2.0-0 \
  libatk1.0-0 \
  libcups2 \
  libdbus-1-3 \
  libdrm2 \
  libgbm1 \
  libgtk-3-0 \
  libnspr4 \
  libnss3 \
  libxcomposite1 \
  libxdamage1 \
  libxrandr2 \
  xdg-utils \
  --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

# Tell Remotion/Puppeteer where Chrome is
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV REMOTION_CHROME_EXECUTABLE=/usr/bin/chromium
# Chromium needs --no-sandbox when running as non-root in Docker
ENV CHROMIUM_FLAGS="--no-sandbox --disable-gpu --disable-dev-shm-usage"
# Default BGM under narration (override in App Runner if you ship a different file)
ENV OPERA_BGM_PUBLIC_PATH=audio/opera-bgm.m4a

WORKDIR /app

# Copy package files for both main app and video-renderer
COPY package.json package-lock.json ./
COPY video-renderer/package.json video-renderer/package-lock.json ./video-renderer/

# Install dependencies
RUN npm ci --ignore-scripts
RUN cd video-renderer && npm ci

# Copy all source code
COPY . .

# Fix case-sensitivity: macOS is case-insensitive, Linux is not.
# Imports use lowercase paths but directories are uppercase.
RUN ln -sf Components components 2>/dev/null || true \
    && ln -sf Pages pages 2>/dev/null || true \
    && ln -sf Entities entities 2>/dev/null || true

# Build the Next.js app
RUN npm run build

# Create output directories for video rendering
RUN mkdir -p video-renderer/out video-renderer/.tmp video-renderer/public

# Pre-bundle Remotion project at build time (saves 90-120s on first render)
# Non-fatal: render pipeline falls back to runtime bundling if this fails
RUN cd video-renderer && npx tsx prebundle.ts || echo "[prebundle] skipped — will bundle at runtime"

# Non-root user for security.
# IMPORTANT: Do NOT `chown -R` the full /app tree — it stresses Docker's overlayfs and has
# caused BuildKit I/O errors on Docker Desktop. Scoped chown under video-renderer is fine.
#
# Render worker cwd is video-renderer/. Remotion resolves its download/cache dir to
# video-renderer/node_modules/.remotion (see @remotion/renderer/.../get-download-destination.js),
# and chmods native binaries under @remotion/*. Non-root cannot mkdir/chmod root-owned
# node_modules → own the full video-renderer/node_modules for user opera.
#
# Also writable: out/, .tmp/, public/, .remotion-bundle/ (see render-pipeline).
RUN groupadd -r opera && useradd -r -g opera -d /app -s /bin/bash opera \
  && mkdir -p /app/video-renderer/.remotion-bundle \
  && chown -R opera:opera \
    /app/video-renderer/out \
    /app/video-renderer/.tmp \
    /app/video-renderer/public \
    /app/video-renderer/.remotion-bundle \
    /app/video-renderer/node_modules \
  && if [ -d /app/video-renderer/node_modules/@remotion/compositor-linux-x64-gnu ]; then \
       chmod 755 /app/video-renderer/node_modules/@remotion/compositor-linux-x64-gnu/remotion 2>/dev/null || true; \
     fi \
  && chmod 1777 /tmp
USER opera

EXPOSE 3000

# start.sh syncs dental-video assets from S3, then launches the server
CMD ["/bin/bash", "/app/start.sh"]
