# Remove Large Files from Git History

If you've already committed large files and need to remove them from git history:

## Option 1: If you haven't pushed yet (Easiest)

```bash
cd netlify
# Remove files from staging
git reset HEAD greyfinch-complete-rag.txt practice-data.txt 2>/dev/null || true

# Remove files if they exist
rm -f greyfinch-complete-rag.txt practice-data.txt

# Make sure they're in .gitignore (already done)
# Now commit normally
git add .
git commit -m "Initial commit - Opera AI"
```

## Option 2: If you've already committed (Remove from history)

```bash
cd netlify

# Remove files from git history using filter-branch
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch greyfinch-complete-rag.txt practice-data.txt" \
  --prune-empty --tag-name-filter cat -- --all

# Force push (WARNING: This rewrites history)
# git push origin --force --all
```

## Option 3: Using BFG Repo-Cleaner (Recommended for large repos)

```bash
# Install BFG (if not installed)
# brew install bfg  # on macOS

cd netlify
bfg --delete-files greyfinch-complete-rag.txt
bfg --delete-files practice-data.txt
git reflog expire --expire=now --all
git gc --prune=now --aggressive
```

## Quick Fix (If files aren't in netlify folder)

The files might be in the parent directory. Check:

```bash
cd /Users/anishsuvarna/Desktop/opera2
find . -name "greyfinch-complete-rag.txt" -o -name "practice-data.txt" | grep -v node_modules
```

If found, delete them and make sure they're in .gitignore.

