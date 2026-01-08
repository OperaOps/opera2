# Opera AI - Netlify Deployment

This folder contains a complete, deployable version of the Opera AI website ready for Netlify deployment.

## Quick Deploy to Netlify

### Option 1: Deploy via Netlify Dashboard (Easiest)

1. **Push to GitHub:**
   ```bash
   cd netlify
   git init
   git add .
   git commit -m "Initial commit - Opera AI"
   # Create repo on GitHub, then:
   git remote add origin https://github.com/YOUR_USERNAME/opera-ai-netlify.git
   git push -u origin main
   ```

2. **Deploy on Netlify:**
   - Go to [netlify.com](https://netlify.com) and sign up/login
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
   - Netlify will auto-detect Next.js settings
   - Click "Deploy site"

3. **Connect Domain:**
   - Go to Site settings → Domain management
   - Add custom domain: `getopera.ai`
   - Follow Netlify's DNS instructions

### Option 2: Deploy via Netlify CLI

```bash
cd netlify
npm install
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

## Build Settings

- **Build command:** `npm run build`
- **Publish directory:** `.next`
- **Node version:** 18

## Environment Variables

If you need environment variables (API keys, etc.), add them in:
- Netlify Dashboard → Site settings → Environment variables

## Local Development

```bash
cd netlify
npm install
npm run dev
```

Visit `http://localhost:3000`

## What's Included

- ✅ All app pages and API routes
- ✅ All components and UI elements
- ✅ Static assets (images, etc.)
- ✅ All configuration files
- ✅ Demo data for testing

## What's Excluded

- ❌ Development scripts
- ❌ Large data files
- ❌ Backup folders
- ❌ Test files
- ❌ Local database files

---

**Ready to deploy!** 🚀

