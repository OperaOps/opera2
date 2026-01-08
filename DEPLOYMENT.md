# Deploy Opera AI to getopera.ai

## Option 1: Deploy to Vercel (Recommended - Easiest)

Vercel is made by the Next.js team and offers the easiest deployment process.

### Step 1: Push your code to GitHub
```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit"

# Create a repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/opera-ai.git
git push -u origin main
```

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings
5. Click "Deploy"

### Step 3: Connect your GoDaddy domain
1. In your Vercel project, go to "Settings" → "Domains"
2. Add `getopera.ai` and `www.getopera.ai`
3. Vercel will give you DNS records to add

### Step 4: Update DNS in GoDaddy
1. Log into your GoDaddy account
2. Go to "My Products" → "DNS" for getopera.ai
3. Add these records:
   - Type: `A` | Name: `@` | Value: `76.76.21.21`
   - Type: `CNAME` | Name: `www` | Value: `cname.vercel-dns.com`
4. Wait 24-48 hours for DNS propagation

---

## Option 2: Deploy to Netlify

### Step 1: Build settings
- Build command: `npm run build`
- Publish directory: `.next`

### Step 2: Connect domain
- Netlify will give you DNS records similar to Vercel

---

## Option 3: Deploy to your own server (Advanced)

### Requirements:
- Server with Node.js 18+ installed
- PM2 for process management
- Nginx for reverse proxy

### Steps:
1. Build your app: `npm run build`
2. Upload files to server
3. Install dependencies: `npm install --production`
4. Start with PM2: `pm2 start npm --name "opera-ai" -- start`
5. Configure Nginx to proxy to port 3000
6. Setup SSL with Let's Encrypt

---

## Quick Start (Vercel - Recommended)

1. **Install Vercel CLI** (optional, you can use the web interface):
   ```bash
   npm i -g vercel
   ```

2. **Deploy from command line**:
   ```bash
   cd /Users/anishsuvarna/Desktop/opera2
   vercel
   ```
   Follow the prompts, then run `vercel --prod` for production.

3. **Add domain in Vercel dashboard**:
   - Go to your project → Settings → Domains
   - Add `getopera.ai`

4. **Update GoDaddy DNS**:
   - Add the DNS records Vercel provides

---

## Important Notes:

- Make sure `.env` files are NOT committed to git (should be in .gitignore)
- Add any environment variables in Vercel's dashboard (Settings → Environment Variables)
- The site will be live at `getopera.ai` once DNS propagates
- DNS propagation can take 24-48 hours, but usually works within a few hours

---

## Need Help?

If you run into issues:
1. Check Vercel's deployment logs
2. Ensure your build completes successfully locally: `npm run build`
3. Verify DNS records are correct in GoDaddy

