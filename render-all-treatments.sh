#!/bin/bash
# Render all 17 treatments using PremiumOrthoVideo composition
# Run with: nohup bash render-all-treatments.sh > treatmenttests/render.log 2>&1 &
set -e
cd /Users/anishsuvarna/Desktop/opera2/video-renderer

OUT="/Users/anishsuvarna/Desktop/opera2/treatmenttests"
mkdir -p "$OUT"

# treatment|diagnosis pairs (matching API TREATMENT_TO_DIAGNOSIS)
CASES=(
  "crown|cracked_tooth"
  "filling|cavity"
  "implant|missing_tooth"
  "whitening|cavity"
  "veneers|spacing"
  "root_canal|cavity"
  "extraction|cracked_tooth"
  "bridge|missing_tooth"
  "dentures|missing_tooth"
  "gum_treatment|gum_disease"
  "braces|crowding"
  "invisalign|crowding"
  "ceramic_braces|crowding"
  "lingual_braces|crowding"
  "expander|crowding"
  "retainer|crowding"
  "jaw_surgery|underbite"
)

TOTAL=${#CASES[@]}
SUCCESS=0
FAIL=0

echo "=== Starting render of $TOTAL treatments at $(date) ==="

for case in "${CASES[@]}"; do
  IFS='|' read -r treatment diagnosis <<< "$case"
  IDX=$((SUCCESS+FAIL+1))
  echo ""
  echo "--- [$IDX/$TOTAL] $treatment (diagnosis: $diagnosis) at $(date) ---"

  if npx remotion render PremiumOrthoVideo "$OUT/$treatment.mp4" \
    --props="{\"patientName\":\"Test Patient\",\"doctorName\":\"Dr. Martinez\",\"clinicName\":\"Bright Smiles Dental\",\"diagnosis\":\"$diagnosis\",\"treatment\":\"$treatment\",\"accentColor\":\"#7c3aed\",\"scenes\":{\"intro\":{\"durationSeconds\":4},\"problem\":{\"durationSeconds\":7,\"heading\":\"What We Found\",\"bullets\":[\"Condition identified\",\"Needs attention\"]},\"deepDive\":{\"durationSeconds\":6,\"heading\":\"Understanding Your Condition\",\"bullets\":[\"Why this matters\",\"How it develops\"]},\"treatment\":{\"durationSeconds\":9,\"heading\":\"Your Treatment Plan\",\"bullets\":[\"Step one\",\"Step two\",\"Step three\"]},\"journey\":{\"durationSeconds\":6,\"heading\":\"Your Treatment Journey\",\"bullets\":[\"Regular progress checks\",\"Gradual improvement\"]},\"outcome\":{\"durationSeconds\":7,\"heading\":\"Expected Results\",\"bullets\":[\"Improved health\",\"Long-lasting results\"]},\"whatToExpect\":{\"durationSeconds\":5,\"heading\":\"After Treatment\",\"bullets\":[\"Maintenance plan\",\"Follow-up visits\"]},\"cta\":{\"durationSeconds\":4,\"heading\":\"Schedule Your Visit\"}}}" \
    2>&1; then
    echo "  ✓ $treatment OK ($(du -h "$OUT/$treatment.mp4" | awk '{print $1}'))"
    SUCCESS=$((SUCCESS+1))
  else
    echo "  ✗ $treatment FAILED"
    FAIL=$((FAIL+1))
  fi
done

echo ""
echo "=== Completed at $(date) ==="
echo "=== Results: $SUCCESS OK, $FAIL failed out of $TOTAL ==="
echo ""
echo "Files:"
ls -lhS "$OUT"/*.mp4 2>/dev/null | awk '{print $5, $NF}'
echo "=== Done ==="
