#!/bin/bash
# Script to remove large files from git history

cd "$(dirname "$0")"

echo "Removing large files from git history..."

# Remove files from all commits
FILTER_BRANCH_SQUELCH_WARNING=1 git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch greyfinch-complete-rag.txt practice-data.txt" \
  --prune-empty --tag-name-filter cat -- --all

# Clean up
rm -rf .git/refs/original/
git reflog expire --expire=now --all
git gc --prune=now --aggressive

echo "Done! Large files removed from history."
echo "You can now push to GitHub."

