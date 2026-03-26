#!/bin/bash
# Opera AI - AWS EC2 Deployment Script
# Run this on your LOCAL machine after setting up EC2

set -e

# ============================================================
# CONFIGURATION - Edit these before running
# ============================================================
EC2_HOST=""          # e.g., ec2-XX-XX-XX-XX.us-west-2.compute.amazonaws.com
EC2_USER="ubuntu"    # default for Ubuntu AMI
KEY_PATH=""          # e.g., ~/.ssh/opera-key.pem
DOMAIN=""            # optional, e.g., video.operaai.co

if [ -z "$EC2_HOST" ] || [ -z "$KEY_PATH" ]; then
  echo "❌ Edit this script first: set EC2_HOST and KEY_PATH"
  exit 1
fi

SSH_CMD="ssh -i $KEY_PATH $EC2_USER@$EC2_HOST"
SCP_CMD="scp -i $KEY_PATH"

echo "🚀 Deploying Opera AI to $EC2_HOST..."

# ============================================================
# Step 1: Set up the EC2 instance
# ============================================================
echo "📦 Installing dependencies on EC2..."
$SSH_CMD << 'REMOTE'
  # Update system
  sudo apt-get update -y
  sudo apt-get upgrade -y

  # Install Node.js 20
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs

  # Install Chrome for Remotion
  sudo apt-get install -y chromium-browser ffmpeg

  # Install PM2 for process management
  sudo npm install -g pm2

  # Create app directory
  sudo mkdir -p /opt/opera
  sudo chown ubuntu:ubuntu /opt/opera
REMOTE

# ============================================================
# Step 2: Upload the code
# ============================================================
echo "📤 Uploading code..."

# Create a clean tarball (exclude heavy stuff)
tar czf /tmp/opera-deploy.tar.gz \
  --exclude='node_modules' \
  --exclude='video-renderer/node_modules' \
  --exclude='.next' \
  --exclude='video-renderer/out' \
  --exclude='video-renderer/.tmp' \
  --exclude='.git' \
  --exclude='opera-demo-mvp' \
  --exclude='netlify' \
  --exclude='*.mov' \
  --exclude='*.mp4' \
  --exclude='Screenshot*' \
  -C /Users/anishsuvarna/Desktop opera2

$SCP_CMD /tmp/opera-deploy.tar.gz $EC2_USER@$EC2_HOST:/tmp/

$SSH_CMD << 'REMOTE'
  cd /opt/opera
  rm -rf opera2
  tar xzf /tmp/opera-deploy.tar.gz
  cd opera2

  # Install dependencies
  npm ci
  cd video-renderer && npm ci && cd ..

  # Build Next.js
  npm run build
REMOTE

# ============================================================
# Step 3: Upload env vars
# ============================================================
echo "🔐 Uploading environment variables..."
$SCP_CMD /Users/anishsuvarna/Desktop/opera2/.env.local $EC2_USER@$EC2_HOST:/opt/opera/opera2/.env.local

# ============================================================
# Step 4: Start the app with PM2
# ============================================================
echo "▶️  Starting application..."
$SSH_CMD << 'REMOTE'
  cd /opt/opera/opera2

  # Tell Remotion where Chrome is
  export REMOTION_CHROME_EXECUTABLE=$(which chromium-browser)

  # Stop existing instance if any
  pm2 delete opera 2>/dev/null || true

  # Start with PM2
  pm2 start npm --name "opera" -- start
  pm2 save
  pm2 startup | tail -1 | sudo bash

  echo ""
  echo "✅ Opera AI is running!"
  echo "   Access at: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4):3000"
REMOTE

echo ""
echo "✅ Deployment complete!"
echo "   URL: http://$EC2_HOST:3000"
echo ""
echo "   Next steps:"
echo "   - Point a domain to this IP (Route53 or your DNS)"
echo "   - Set up HTTPS with: sudo apt install certbot python3-certbot-nginx"
