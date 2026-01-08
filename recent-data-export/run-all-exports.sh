#!/bin/bash

# Recent Data Export Script (2024-2025)
# This script runs all the export scripts in sequence

echo "🚀 Starting Recent Data Export (2024-2025)"
echo "=========================================="

# Check if .env.local exists
if [ ! -f "../.env.local" ]; then
    echo "❌ .env.local file not found in parent directory"
    echo "Please make sure your Greyfinch API credentials are set up"
    exit 1
fi

# Load environment variables
export $(cat ../.env.local | grep -v '^#' | xargs)

echo "📅 Exporting data from 2024-2025..."
echo "🔑 Using API Key: ${GREYFINCH_API_KEY:0:10}..."

# Create output directory
mkdir -p ../recent-data-output

# Export appointments
echo ""
echo "1️⃣ Exporting Recent Appointments..."
npx ts-node bulletproof-recent-appointments.ts

# Export patients  
echo ""
echo "2️⃣ Exporting Recent Patients..."
npx ts-node bulletproof-recent-patients.ts

# Export locations
echo ""
echo "3️⃣ Exporting Recent Locations..."
npx ts-node bulletproof-recent-locations.ts

# Export appointment types
echo ""
echo "4️⃣ Exporting Recent Appointment Types..."
npx ts-node bulletproof-recent-appointment-types.ts

# Combine all data
echo ""
echo "5️⃣ Combining All Recent Data..."
npx ts-node combine-recent-data.ts

echo ""
echo "🎉 Recent Data Export Complete!"
echo "=========================================="
echo "📁 Output files are in the current directory"
echo "📊 Combined data: recent-practice-data-2024-2025.txt"
echo ""
echo "To use this data in your AI system:"
echo "1. Copy recent-practice-data-2024-2025.txt to your main directory"
echo "2. Update your AI system to use this file instead of practice-data.txt"
echo "3. Test with questions about recent data!"
