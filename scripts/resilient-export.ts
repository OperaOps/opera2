#!/usr/bin/env tsx

/**
 * Resilient Greyfinch Export Script
 * 
 * Continuously pulls data with network error recovery and checkpointing.
 * Can resume from where it left off if interrupted.
 * 
 * Usage:
 * npx tsx scripts/resilient-export.ts
 */

import axios from 'axios';
import * as fs from 'fs';

const API_URL = "https://connect-api.greyfinch.com/v1/graphql";
const API_KEY = process.env.GREYFINCH_API_KEY || "pk_user_pcK2+6R5H/DJiNLzZvW8dnydQ6UgLeP5";
const API_SECRET = process.env.GREYFINCH_API_SECRET || "sk_user_c1PDU7HA3KgnBJ1e3NomYcF6pd7j1ydB";

interface Checkpoint {
  entityName: string;
  lastOffset: number;
  totalRecords: number;
  completed: boolean;
}

async function getAccessToken(): Promise<string> {
  const mutation = `
    mutation login($key: String!, $secret: String!) {
      apiLogin(key: $key, secret: $secret) {
        accessToken
        accessTokenExpiresIn
        status
      }
    }
  `;
  
  const response = await axios.post(API_URL, {
    query: mutation,
    variables: { key: API_KEY, secret: API_SECRET }
  }, {
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.data.errors) {
    throw new Error(`Login failed: ${JSON.stringify(response.data.errors)}`);
  }
  
  return response.data.data.apiLogin.accessToken;
}

async function makeRequestWithRetry(query: string, maxRetries = 3): Promise<any> {
  let attempt = 0;
  
  while (attempt < maxRetries) {
    try {
      const accessToken = await getAccessToken();
      
      const response = await axios.post(API_URL, {
        query
      }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        timeout: 30000 // 30 second timeout
      });

      if (response.data.errors) {
        throw new Error(`GraphQL errors: ${JSON.stringify(response.data.errors)}`);
      }

      return response.data.data;
    } catch (error) {
      attempt++;
      
      if (error.code === 'ECONNRESET' || error.code === 'ETIMEDOUT' || error.status >= 500) {
        console.log(`  🔄 Network error (attempt ${attempt}/${maxRetries}): ${error.code || error.message}`);
        if (attempt < maxRetries) {
          const delay = Math.min(1000 * Math.pow(2, attempt), 10000); // Exponential backoff, max 10s
          console.log(`  ⏳ Waiting ${delay}ms before retry...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
      }
      
      throw error;
    }
  }
}

function formatRecord(entityName: string, record: any): string {
  const id = record.id || 'unknown';
  const createdAt = record.localStartDate || record.procedureDate || 'unknown';
  
  const compactRecord = {
    id,
    createdAt,
    ...record
  };

  const jsonStr = JSON.stringify(compactRecord);
  return `${entityName}\t${id}\t${createdAt}\t${jsonStr}`;
}

function loadCheckpoint(entityName: string): Checkpoint {
  const checkpointFile = `checkpoint-${entityName}.json`;
  if (fs.existsSync(checkpointFile)) {
    try {
      const data = fs.readFileSync(checkpointFile, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.log(`  ⚠️  Could not load checkpoint for ${entityName}, starting fresh`);
    }
  }
  return { entityName, lastOffset: 0, totalRecords: 0, completed: false };
}

function saveCheckpoint(checkpoint: Checkpoint): void {
  const checkpointFile = `checkpoint-${checkpoint.entityName}.json`;
  fs.writeFileSync(checkpointFile, JSON.stringify(checkpoint, null, 2));
}

async function exportEntityResiliently(entityName: string, query: string, outputStream: fs.WriteStream): Promise<number> {
  console.log(`📊 Exporting ${entityName} with checkpointing...`);
  
  const checkpoint = loadCheckpoint(entityName);
  let offset = checkpoint.lastOffset;
  const batchSize = 20;
  let allRecords = [];
  let hasMore = true;
  let batchCount = 0;
  let uniqueIds = new Set();

  console.log(`  📍 Resuming from offset: ${offset} (${checkpoint.totalRecords} records already exported)`);

  while (hasMore) {
    batchCount++;
    
    const paginatedQuery = query.replace(
      `${entityName} {`, 
      `${entityName}(limit: ${batchSize}, offset: ${offset}) {`
    );
    
    console.log(`  📄 Batch ${batchCount}: Fetching ${entityName} (offset: ${offset}, limit: ${batchSize})`);
    
    try {
      const data = await makeRequestWithRetry(paginatedQuery);
      const records = data[entityName] || [];
      
      if (records.length === 0) {
        hasMore = false;
        console.log(`  ✅ No more ${entityName} records found - reached end of data`);
        checkpoint.completed = true;
        break;
      }
      
      // Check for duplicates
      let newRecords = 0;
      for (const record of records) {
        if (!uniqueIds.has(record.id)) {
          uniqueIds.add(record.id);
          allRecords.push(record);
          newRecords++;
        } else {
          console.log(`  🔄 Duplicate record detected (ID: ${record.id}) - stopping pagination`);
          hasMore = false;
          checkpoint.completed = true;
          break;
        }
      }
      
      if (hasMore) {
        console.log(`  ✅ Got ${records.length} ${entityName} (${newRecords} new, total unique: ${allRecords.length})`);
        
        // Show sample data
        if (records.length > 0) {
          const sampleRecord = records[0];
          const sampleDate = sampleRecord.localStartDate || 'unknown';
          console.log(`  📅 Sample record date: ${sampleDate}`);
        }
        
        // Write records immediately to avoid losing data
        for (const record of records.slice(0, newRecords)) {
          const line = formatRecord(entityName, record);
          outputStream.write(line + '\n');
        }
        
        offset += batchSize;
        checkpoint.lastOffset = offset;
        checkpoint.totalRecords = allRecords.length;
        saveCheckpoint(checkpoint);
        
        // If we got fewer records than requested, we've reached the end
        if (records.length < batchSize) {
          hasMore = false;
          console.log(`  🏁 Reached end of ${entityName} data (got ${records.length} < ${batchSize})`);
          checkpoint.completed = true;
          saveCheckpoint(checkpoint);
        }
        
        // Delay between requests
        console.log(`  ⏳ Waiting 2 seconds before next batch...`);
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      
    } catch (error) {
      console.error(`❌ Error fetching ${entityName} batch ${batchCount}:`, error.message);
      
      if (error.code === 'ECONNRESET' || error.code === 'ETIMEDOUT') {
        console.log(`  💾 Saving progress and stopping due to network issues...`);
        console.log(`  📊 Total ${entityName} exported so far: ${allRecords.length}`);
        console.log(`  📍 Resume from offset: ${offset}`);
        break;
      } else {
        throw error;
      }
    }
  }
  
  console.log(`✅ Exported ${allRecords.length} unique ${entityName} records`);
  return allRecords.length;
}

async function exportAllDataResiliently() {
  console.log('🚀 Starting Resilient Greyfinch Data Export...');
  console.log('📝 This will pull ALL available data with checkpointing and error recovery\n');
  
  const outputFile = 'greyfinch-resilient-export.txt';
  const outputStream = fs.createWriteStream(outputFile, { flags: 'a' }); // Append mode

  // Write header only if file is empty
  const stats = fs.existsSync(outputFile) ? fs.statSync(outputFile) : null;
  if (!stats || stats.size === 0) {
    outputStream.write('# Greyfinch Resilient Data Export - ALL Available Data\n');
    outputStream.write('# Format: Entity\tID\tCreatedAt\tJSON\n');
    outputStream.write(`# Generated: ${new Date().toISOString()}\n`);
    outputStream.write('# This export uses continuous pagination with checkpointing\n\n');
  }

  let totalRecords = 0;

  try {
    // Export Appointment Bookings
    const appointmentQuery = `
      query {
        appointmentBookings {
          id
          localStartDate
          localStartTime
          appointment {
            id
            patient {
              id
              person {
                firstName
                lastName
              }
            }
          }
        }
      }
    `;

    totalRecords += await exportEntityResiliently('appointmentBookings', appointmentQuery, outputStream);

    // Add separator
    outputStream.write('\n');

    // Export Patients
    const patientQuery = `
      query {
        patients {
          id
          person {
            id
            firstName
            lastName
          }
        }
      }
    `;

    totalRecords += await exportEntityResiliently('patients', patientQuery, outputStream);

    outputStream.end();
    
    console.log('\n🎉 Resilient export completed!');
    console.log(`📄 Output saved to: ${outputFile}`);
    console.log(`📊 Total unique records exported: ${totalRecords}`);
    
  } catch (error) {
    console.error('❌ Export failed:', error);
    outputStream.end();
    console.log('\n💾 Progress saved in checkpoint files. Run the script again to resume.');
    process.exit(1);
  }
}

exportAllDataResiliently();
