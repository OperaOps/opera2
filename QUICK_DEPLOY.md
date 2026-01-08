# Quick Deploy to Vercel

## Method 1: Vercel CLI (Fastest)

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   cd /Users/anishsuvarna/Desktop/opera2
   vercel
   ```
   - Follow prompts (it will ask you to login)
   - When asked, say yes to link to existing project or create new
   - Run `vercel --prod` for production deployment

3. **Add domain:**
   - After deployment, go to vercel.com dashboard
   - Your project → Settings → Domains
   - Add `getopera.ai`

4. **Update GoDaddy DNS:**
   - Use the DNS records Vercel provides

---

## Method 2: Via GitHub (Easier for updates)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Ready for deployment"
   # Create repo on github.com, then:
   git remote add origin https://github.com/YOUR_USERNAME/opera-ai.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to vercel.com
   - "Add New Project"
   - Import your GitHub repo
   - Click "Deploy"

3. **Add domain:** (same as Method 1)

---

**Your site will be live at getopera.ai once DNS is configured!**

