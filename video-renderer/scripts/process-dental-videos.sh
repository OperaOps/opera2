#!/bin/bash
# Process raw .mov dental animation recordings into clean MP4s for Remotion
# Removes: bottom control bar, play button frames, watermarks
# Normalizes: 1280x720, 30fps, H.264

STORAGE="/Users/anishsuvarna/Desktop/opera2/opera-demo-mvp/backend/storage"
OUT="/Users/anishsuvarna/Desktop/opera2/video-renderer/public/dental-videos"

# Common ffmpeg flags:
# -ss X        = trim first X seconds (skip paused play-button frames)
# crop=W:H:X:Y = crop from top-left (X,Y) with size WxH
# For 1876x1190 videos: bottom bar ~90px → crop to 1876x1100 from top
# For 844x748 gum videos: no bar on gum treatment, minimal crop
# For 1976x1152 root canal: bottom bar ~90px → crop to 1976x1062
# For 2078x1366 dentures: bottom bar ~100px → crop to 2078x1266
# Then scale everything to 1280x720 and encode at 30fps

process() {
  local input="$1"
  local output="$2"
  local trim_start="${3:-1.5}"   # seconds to skip at start
  local crop_bottom="${4:-90}"   # pixels to crop from bottom
  local src_width="${5:-1876}"
  local src_height="${6:-1190}"

  local crop_h=$((src_height - crop_bottom))

  echo "Processing: $(basename "$input") → $(basename "$output")"
  echo "  Trim: ${trim_start}s, Crop: ${src_width}x${crop_h} (remove bottom ${crop_bottom}px)"

  ffmpeg -y -ss "$trim_start" -i "$input" \
    -vf "crop=${src_width}:${crop_h}:0:0,scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2:black" \
    -r 30 \
    -c:v libx264 -preset medium -crf 20 \
    -an \
    -movflags +faststart \
    "$output" 2>/dev/null

  if [ $? -eq 0 ]; then
    local size=$(du -h "$output" | cut -f1)
    echo "  ✓ Done ($size)"
  else
    echo "  ✗ FAILED"
  fi
}

echo "=== Processing Dental Treatment Videos ==="
echo ""

# Crown (2 clips) - 1876x1190, has bottom bar + play button at start
process "$STORAGE/crown1.mov" "$OUT/crown/step1.mp4" 1.5 90 1876 1190
process "$STORAGE/crown2.mov" "$OUT/crown/step2.mp4" 1.0 90 1876 1190

# Filling (2 clips) - 1876x1190
process "$STORAGE/filling1.mov" "$OUT/filling/step1.mp4" 1.5 90 1876 1190
process "$STORAGE/filling2.mov" "$OUT/filling/step2.mp4" 1.0 90 1876 1190

# Implant (2 clips) - 1876x1190
process "$STORAGE/implants1.mov" "$OUT/implant/step1.mp4" 1.5 90 1876 1190
process "$STORAGE/implant2.mov" "$OUT/implant/step2.mp4" 1.0 90 1876 1190

# Whitening (2 clips) - 1876x1190
process "$STORAGE/whitening1.mov" "$OUT/whitening/step1.mp4" 1.5 90 1876 1190
process "$STORAGE/whitening2.mov" "$OUT/whitening/step2.mp4" 1.0 90 1876 1190

# Veneers (1 clip) - 1876x1190 - NOTE: contains both 3D animation and person talking
process "$STORAGE/veneers.mov" "$OUT/veneers/step1.mp4" 1.5 90 1876 1190

# Root Canal - problem + treatment - 1976x1152
process "$STORAGE/rootcanalproblem.mov" "$OUT/root_canal/problem.mp4" 1.5 90 1976 1152
process "$STORAGE/rootcanaltreatment.mov" "$OUT/root_canal/treatment.mp4" 1.5 90 1976 1152

# Tooth Extraction - 1876x1190
process "$STORAGE/toothextraction.mov" "$OUT/extraction/step1.mp4" 1.5 90 1876 1190

# Dental Bridge - 1876x1190
process "$STORAGE/dentalbridge.mov" "$OUT/bridge/step1.mp4" 1.5 90 1876 1190

# Dentures - 2078x1366 (higher res)
process "$STORAGE/dentures.mov" "$OUT/dentures/step1.mp4" 1.5 100 2078 1366

# Gum Disease - 844x748 (different source, smaller, may have less/no bar)
# The "howithappens" video is the problem scene
# The "treatment" video is the treatment scene (240fps source, no visible bar in mid-frame)
process "$STORAGE/gumdiseasehowithappens.mov" "$OUT/gum_treatment/problem.mp4" 0.5 60 844 748
process "$STORAGE/gumdiseasetreatment.mov" "$OUT/gum_treatment/treatment.mp4" 0.5 0 844 748

# Final result - generic outcome video - 1876x1190
process "$STORAGE/finalresult.mov" "$OUT/crown/outcome.mp4" 1.5 90 1876 1190

echo ""
echo "=== All videos processed ==="
echo ""
ls -lhR "$OUT"
