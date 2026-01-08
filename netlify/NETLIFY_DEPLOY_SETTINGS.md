# Netlify Deployment Settings - Quick Reference

## ✅ Your netlify folder is ready to deploy!

The `netlify.toml` file is already configured, so Netlify will auto-detect most settings. But here are the exact values if you need to enter them manually:

---

## 📋 Netlify Dashboard Settings

### **Build Settings (If Auto-Detection Fails):**

- **Base directory:** `netlify` (leave blank if deploying netlify folder as root, or use `netlify` if deploying from parent repo)
- **Build command:** `npm run build`
- **Publish directory:** `.next`
- **Node version:** `18` (set in Environment variables or use `.nvmrc` file)

### **Environment Variables (Optional - Add if needed):**

If you need API keys or environment variables:
- Go to: **Site settings → Environment variables**
- Add any variables your app needs (e.g., `API_KEY`, `ANTHROPIC_API_KEY`, etc.)

---

## 🚀 Two Deployment Options:

### **Option 1: Deploy netlify folder directly (RECOMMENDED)**

1. **Push netlify folder to GitHub:**
   ```bash
   cd /Users/anishsuvarna/Desktop/opera2/netlify
   git init
   git add .
   git commit -m "Initial commit - Opera AI"
   # Create repo on GitHub, then:
   git remote add origin https://github.com/YOUR_USERNAME/opera-ai-netlify.git
   git push -u origin main
   ```

2. **In Netlify Dashboard:**
   - **Repository:** Your `opera-ai-netlify` repo
   - **Base directory:** (leave blank - root is netlify folder)
   - **Build command:** (auto-detected: `npm run build`)
   - **Publish directory:** (auto-detected: `.next`)
   - Click **Deploy site**

### **Option 2: Deploy from parent opera2 repo**

1. **Push entire opera2 repo to GitHub:**
   ```bash
   cd /Users/anishsuvarna/Desktop/opera2
   git add .
   git commit -m "Ready for Netlify deployment"
   git push origin main
   ```

2. **In Netlify Dashboard:**
   - **Repository:** Your `opera2` repo
   - **Base directory:** `netlify`
   - **Build command:** `npm run build`
   - **Publish directory:** `netlify/.next`
   - Click **Deploy site**

---

## ⚙️ Advanced Settings (Already Configured)

Your `netlify.toml` file contains:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[build.environment]
  NODE_VERSION = "18"
```

Netlify will automatically:
- ✅ Use Next.js build command
- ✅ Install the Next.js plugin
- ✅ Set Node version to 18
- ✅ Configure functions and routing

---

## 🔗 Connect Domain (getopera.ai)

After deployment:

1. Go to **Site settings → Domain management**
2. Click **Add custom domain**
3. Enter: `getopera.ai`
4. Follow Netlify's DNS instructions:
   - Add A record or CNAME in GoDaddy
   - Netlify will provide the exact values

---

## ✅ Verification Checklist

Before deploying, make sure:
- ✅ `netlify.toml` exists (✅ already done)
- ✅ `package.json` has build script (✅ already done)
- ✅ `.gitignore` excludes large files (✅ already done)
- ✅ All source files are present (✅ already done)

---

## 🎯 Quick Deploy (Easiest Method)

**Just connect your GitHub repo - Netlify will auto-detect everything!**

1. Go to [netlify.com](https://netlify.com)
2. **Add new site → Import an existing project**
3. Connect GitHub → Select your repo
4. **Netlify auto-detects:**
   - ✅ Build command: `npm run build`
   - ✅ Publish directory: `.next`
   - ✅ Node version: 18 (from `.nvmrc`)
5. Click **Deploy site**

That's it! Netlify handles the rest. 🚀

