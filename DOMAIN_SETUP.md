# Connect getopera.ai to Vercel Deployment

## Step 1: Deploy to Vercel

Run this command in your terminal:
```bash
cd /Users/anishsuvarna/Desktop/opera2
vercel
```

Follow the prompts:
- Login to Vercel (it will open browser)
- Link to existing project or create new? → **Create new**
- Project name? → Press Enter (or name it `opera-ai`)
- Which directory? → Press Enter (use current directory)
- Override settings? → **No**

Once deployed, run:
```bash
vercel --prod
```
This deploys to production.

---

## Step 2: Add Domain in Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and login
2. Click on your project
3. Go to **Settings** → **Domains**
4. Click **Add Domain**
5. Enter: `getopera.ai`
6. Click **Add**
7. Also add: `www.getopera.ai` (same process)

Vercel will show you DNS records like:
- **Type A** | **Name @** | **Value:** `76.76.21.21` (or similar IP)
- **Type CNAME** | **Name www** | **Value:** `cname.vercel-dns.com` (or similar)

**Copy these records!** You'll need them in GoDaddy.

---

## Step 3: Update DNS in GoDaddy

1. **Login to GoDaddy:**
   - Go to [godaddy.com](https://godaddy.com)
   - Login to your account

2. **Go to DNS Management:**
   - Click **My Products**
   - Find `getopera.ai` in your domains
   - Click **DNS** (or "Manage DNS")

3. **Add/Update Records:**
   
   **For root domain (getopera.ai):**
   - Find or add a **Type A** record:
     - **Name/Host:** `@` (or leave blank, or `getopera.ai`)
     - **Value:** The IP address Vercel gave you (e.g., `76.76.21.21`)
     - **TTL:** `600` (or default)
     - **Save**
   
   **For www subdomain (www.getopera.ai):**
   - Find or add a **Type CNAME** record:
     - **Name/Host:** `www`
     - **Value:** The CNAME value Vercel gave you (e.g., `cname.vercel-dns.com`)
     - **TTL:** `600` (or default)
     - **Save**

4. **Remove conflicting records:**
   - If there are existing A or CNAME records pointing elsewhere, delete them
   - Only keep the ones pointing to Vercel

---

## Step 4: Wait for DNS Propagation

- DNS changes take **15 minutes to 48 hours** to propagate
- Usually works within **1-2 hours**
- You can check status at:
  - [whatsmydns.net](https://www.whatsmydns.net) - Check if DNS has propagated
  - Or just try visiting `getopera.ai` in your browser

---

## Step 5: Verify in Vercel

1. Go back to Vercel dashboard
2. **Settings** → **Domains**
3. Check status - should show "Valid Configuration" when DNS is correct
4. It might show "Pending" while DNS propagates

---

## Troubleshooting

**If domain doesn't work after 24 hours:**
- Check Vercel dashboard for any errors
- Verify DNS records in GoDaddy match exactly what Vercel provided
- Make sure no conflicting records exist
- Try clearing your browser cache

**Need SSL?**
- Vercel automatically provides free SSL certificates
- Once DNS is configured, SSL will be active automatically

---

**That's it! Your site will be live at getopera.ai once DNS propagates!**

