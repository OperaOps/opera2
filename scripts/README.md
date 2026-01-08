# Greyfinch Export Script

This script exports all data from Greyfinch Connect GraphQL API with pagination, rate limiting, retry logic, and resumability.

## Setup

1. **Set environment variables:**
   ```bash
   export GREYFINCH_API_URL="https://api.greyfinch.com/graphql"
   export GREYFINCH_API_TOKEN="your_token_here"
   ```

2. **Install dependencies (already done):**
   ```bash
   npm install tsx axios
   ```

## Usage

### Dry Run (Test Mode)
Fetch only the first 2 pages per entity to verify correctness:
```bash
npx tsx scripts/greyfinch-export.ts --dry-run
```

### Full Export
Export all data from all entities:
```bash
npx tsx scripts/greyfinch-export.ts
```

### Resume from Checkpoint
If the script stops mid-run, resume from where it left off:
```bash
npx tsx scripts/greyfinch-export.ts --resume
```

## Output

The script creates `greyfinch-export.txt` with all exported data in a RAG-friendly format:
```
patients	12345	2024-01-15T10:30:00Z	{"firstName":"John","lastName":"Doe",...}
appointments	67890	2024-01-16T14:00:00Z	{"scheduledAt":"2024-01-20T09:00:00Z",...}
```

## Features

- ✅ **Pagination**: Handles large datasets with limit/offset
- ✅ **Rate Limiting**: Respects API rate limits with automatic backoff
- ✅ **Retry Logic**: Handles transient errors and network issues
- ✅ **Resumability**: Can resume from checkpoints if interrupted
- ✅ **Progress Logging**: Shows real-time progress and status
- ✅ **Dry Run Mode**: Test with limited data before full export
- ✅ **Error Handling**: Graceful error handling with clear messages

## Entities Exported

- **patients**: Patient information and demographics
- **appointments**: Scheduled appointments and visits
- **treatments**: Treatment plans and procedures
- **invoices**: Billing and invoice data
- **payments**: Payment records and transactions
- **notes**: Clinical notes and documentation

## Configuration

You can modify the entities and queries in the script by editing the `DEFAULT_ENTITIES` array in `greyfinch-export.ts`.
