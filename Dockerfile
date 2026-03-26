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
RUN cd video-renderer && npx tsx prebundle.ts

# Non-root user for security
RUN groupadd -r opera && useradd -r -g opera -d /app -s /bin/bash opera
# Give opera user write access to /tmp (Remotion creates bundles there)
# and to the entire app directory
RUN chown -R opera:opera /app && chmod 1777 /tmp
USER opera

EXPOSE 3000

CMD ["npm", "start"]
