# Recent Data Export (2024-2025)

This folder contains scripts to export recent practice data from Greyfinch Connect API, focusing on 2024-2025 data instead of the historical 1999 data.

## 🎯 Purpose

- **Export recent data** from 2024-2025 for current operations
- **Same structure** as the 1999 export but with recent dates
- **Intelligent batching** with checkpointing and retry logic
- **Real-time insights** for current practice management

## 📁 Files

### Export Scripts
- `bulletproof-recent-appointments.ts` - Recent appointments (2024-2025)
- `bulletproof-recent-patients.ts` - Recent patients (2024-2025) 
- `bulletproof-recent-locations.ts` - Practice locations
- `bulletproof-recent-appointment-types.ts` - Service types

### Utility Scripts
- `combine-recent-data.ts` - Combines all exports into one file
- `run-all-exports.sh` - Runs all exports in sequence
- `README.md` - This documentation

## 🚀 Quick Start

### 1. Setup Environment
Make sure your `.env.local` file in the parent directory contains:
```bash
GREYFINCH_API_URL=https://connect-api.greyfinch.com/v1/graphql
GREYFINCH_API_KEY=your_api_key_here
GREYFINCH_API_SECRET=your_api_secret_here
```

### 2. Run All Exports
```bash
cd recent-data-export
./run-all-exports.sh
```

### 3. Individual Exports
```bash
# Export recent appointments
npx ts-node bulletproof-recent-appointments.ts

# Export recent patients
npx ts-node bulletproof-recent-patients.ts

# Export locations
npx ts-node bulletproof-recent-locations.ts

# Export appointment types
npx ts-node bulletproof-recent-appointment-types.ts

# Combine all data
npx ts-node combine-recent-data.ts
```

## 📊 Output Files

- `recent-appointments-2024-2025.txt` - Recent appointment data
- `recent-patients-2024-2025.txt` - Recent patient data
- `recent-locations-2024-2025.txt` - Location data
- `recent-appointment-types-2024-2025.txt` - Service types
- `recent-practice-data-2024-2025.txt` - **Combined file for AI system**

## 🔧 Features

### Robust Export
- **Pagination** - Handles large datasets with limit/offset
- **Checkpointing** - Resume from where it left off if interrupted
- **Rate limiting** - Respects API limits with exponential backoff
- **Error handling** - Retries failed requests with intelligent delays

### Data Quality
- **Recent focus** - 2024-2025 data for current operations
- **Consistent format** - Same structure as historical data
- **Intelligent parsing** - Extracts key information for AI analysis
- **Real names** - Uses actual patient and location names

## 🤖 AI Integration

### To Use Recent Data in AI System:

1. **Copy the combined file:**
   ```bash
   cp recent-practice-data-2024-2025.txt ../practice-data.txt
   ```

2. **Or create a hybrid system:**
   - Keep both 1999 and 2024-2025 data
   - Let AI choose which dataset to use based on question

3. **Test with recent questions:**
   - "What's today's schedule?"
   - "How many new patients this month?"
   - "What are our current busiest hours?"

## 📈 Expected Results

### Recent Data Benefits:
- **Current insights** - Real-time practice information
- **Accurate scheduling** - Today's actual schedule
- **Recent trends** - Last 2 months of performance
- **Up-to-date patients** - Current patient base

### Sample Questions That Will Work Better:
- ✅ "What's today's schedule?" (Real current data)
- ✅ "How many patients did we see this week?" (Recent data)
- ✅ "What are our busiest hours this month?" (Current patterns)
- ✅ "Show me recent new patients" (2024-2025 patients)

## ⚠️ Notes

- **API Limits** - Scripts respect rate limits and may take time
- **Data Volume** - Recent data may be smaller than 1999 historical data
- **Resumability** - Scripts can be stopped and restarted safely
- **Checkpointing** - Progress is saved in checkpoint files

## 🆚 Comparison: 1999 vs 2024-2025

| Aspect | 1999 Data | 2024-2025 Data |
|--------|-----------|----------------|
| **Use Case** | Historical analysis | Current operations |
| **Schedule** | Past appointments | Today's schedule |
| **Patients** | Historical patients | Current patients |
| **Trends** | Long-term patterns | Recent patterns |
| **Questions** | "What happened in 1999?" | "What's happening now?" |

## 🔄 Integration Options

### Option 1: Replace Historical Data
- Use 2024-2025 data instead of 1999 data
- Better for current operations
- Simpler system

### Option 2: Hybrid System
- Keep both datasets
- AI chooses appropriate dataset
- Best of both worlds

### Option 3: Dynamic Switching
- User can choose dataset
- "Show me 1999 trends" vs "Show me current trends"
- Most flexible approach
