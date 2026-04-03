#!/bin/bash
# Opera AI — Container startup script
# All assets (dental-3d/, dental-videos/, stock/) are baked into the Docker image.

echo "[start] Starting Next.js server..."
exec npm start
