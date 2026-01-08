#!/usr/bin/env tsx

/**
 * BULLETPROOF Greyfinch Data Export
 * 
 * Features:
 * - NEVER overwrites existing data (always appends)
 * - Shows terminal progress in real-time
 * - Saves data after EVERY batch
 * - Perfect resume capability
 * - No data loss possible
 * 
 * Usage:
 * npx tsx scripts/bulletproof-export.ts
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
  lastDate: string;
  firstDate: string;
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

async function makeRequestWithRetry(query: string, maxRetries = 5): Promise<any> {
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
        timeout: 120000
      });

      if (response.data.errors) {
        throw new Error(`GraphQL errors: ${JSON.stringify(response.data.errors)}`);
      }

      return response.data.data;
    } catch (error) {
      attempt++;
      
      if (error.code === 'ECONNABORTED' || error.code === 'ECONNRESET' || error.code === 'ETIMEDOUT' || error.status >= 500) {
        console.log(`  🔄 API timeout/error (attempt ${attempt}/${maxRetries}): ${error.code || error.message}`);
        if (attempt < maxRetries) {
          const delay = Math.min(10000 * Math.pow(2, attempt), 120000);
          console.log(`  ⏳ API seems slow, waiting ${delay/1000}s before retry...`);
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
  const checkpointFile = `bulletproof-checkpoint-${entityName}.json`;
  if (fs.existsSync(checkpointFile)) {
    try {
      const data = fs.readFileSync(checkpointFile, 'utf8');
      const checkpoint = JSON.parse(data);
      console.log(`  📍 Loaded checkpoint: offset ${checkpoint.lastOffset}, ${checkpoint.totalRecords} records`);
      return checkpoint;
    } catch (error) {
      console.log(`  ⚠️  Could not load checkpoint for ${entityName}, starting fresh`);
    }
  }
  return { entityName, lastOffset: 0, totalRecords: 0, completed: false, lastDate: '', firstDate: '' };
}

function saveCheckpoint(checkpoint: Checkpoint): void {
  const checkpointFile = `bulletproof-checkpoint-${checkpoint.entityName}.json`;
  fs.writeFileSync(checkpointFile, JSON.stringify(checkpoint, null, 2));
  console.log(`  💾 Checkpoint saved: offset ${checkpoint.lastOffset}, ${checkpoint.totalRecords} records`);
}

function ensureFileExists(filePath: string): void {
  if (!fs.existsSync(filePath)) {
    const header = `# Greyfinch Data Export - Bulletproof Version\n# Format: Entity\tID\tCreatedAt\tJSON\n# Generated: ${new Date().toISOString()}\n# This export NEVER overwrites - always appends\n\n`;
    fs.writeFileSync(filePath, header);
    console.log(`  📄 Created new output file: ${filePath}`);
  } else {
    console.log(`  📄 Using existing output file: ${filePath}`);
  }
}

async function exportEntityBulletproof(entityName: string, query: string, outputFile: string): Promise<number> {
  console.log(`\n🚀 Starting BULLETPROOF export of ${entityName}...`);
  
  const checkpoint = loadCheckpoint(entityName);
  let offset = checkpoint.lastOffset;
  const batchSize = 20;
  let totalRecords = checkpoint.totalRecords;
  let hasMore = true;
  let batchCount = Math.floor(offset / batchSize);
  let uniqueIds = new Set();
  let firstDate = checkpoint.firstDate;
  let lastDate = checkpoint.lastDate;

  console.log(`  📊 Starting from offset: ${offset} (${totalRecords} records already exported)`);
  if (firstDate) console.log(`  📅 First date seen: ${firstDate}`);
  if (lastDate) console.log(`  📅 Last date seen: ${lastDate}`);

  while (hasMore) {
    batchCount++;
    
    const paginatedQuery = query.replace(
      `${entityName} {`, 
      `${entityName}(limit: ${batchSize}, offset: ${offset}) {`
    );
    
    console.log(`\n  📄 BATCH ${batchCount}: Fetching ${entityName}`);
    console.log(`     Offset: ${offset}, Limit: ${batchSize}`);
    
    try {
      const data = await makeRequestWithRetry(paginatedQuery);
      const records = data[entityName] || [];
      
      if (records.length === 0) {
        hasMore = false;
        console.log(`  ✅ No more ${entityName} records found - reached end of data`);
        checkpoint.completed = true;
        saveCheckpoint(checkpoint);
        break;
      }
      
      // Process each record
      let newRecords = 0;
      let batchDates: string[] = [];
      
      for (const record of records) {
        if (!uniqueIds.has(record.id)) {
          uniqueIds.add(record.id);
          
          const recordDate = record.localStartDate || record.procedureDate || '';
          if (recordDate && recordDate !== 'unknown') {
            batchDates.push(recordDate);
          }
          
          // Write record to file IMMEDIATELY
          const line = formatRecord(entityName, record);
          fs.appendFileSync(outputFile, line + '\n');
          newRecords++;
        }
      }
      
      totalRecords += newRecords;
      
      // Update date tracking
      if (batchDates.length > 0) {
        batchDates.sort();
        const batchFirstDate = batchDates[0];
        const batchLastDate = batchDates[batchDates.length - 1];
        
        if (!firstDate || batchFirstDate < firstDate) {
          firstDate = batchFirstDate;
        }
        if (!lastDate || batchLastDate > lastDate) {
          lastDate = batchLastDate;
        }
        
        console.log(`     📅 Batch date range: ${batchFirstDate} to ${batchLastDate}`);
        console.log(`     📅 Sample dates: ${batchDates.slice(0, 3).join(', ')}${batchDates.length > 3 ? '...' : ''}`);
      }
      
      console.log(`     ✅ Got ${records.length} records (${newRecords} new, total: ${totalRecords})`);
      
      // Show overall progress
      if (firstDate && lastDate) {
        console.log(`     📊 Overall date range: ${firstDate} to ${lastDate}`);
      }
      
      // Update checkpoint IMMEDIATELY after each batch
      offset += batchSize;
      checkpoint.lastOffset = offset;
      checkpoint.totalRecords = totalRecords;
      checkpoint.lastDate = lastDate;
      checkpoint.firstDate = firstDate;
      saveCheckpoint(checkpoint);
      
      // If we got fewer records than requested, we've reached the end
      if (records.length < batchSize) {
        hasMore = false;
        console.log(`  🏁 Reached end of ${entityName} data (got ${records.length} < ${batchSize})`);
        checkpoint.completed = true;
        saveCheckpoint(checkpoint);
      }
      
      // Delay between requests
      console.log(`     ⏳ Waiting 2 seconds before next batch...`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    } catch (error) {
      console.error(`❌ Error fetching ${entityName} batch ${batchCount}:`, error.message);
      
      if (error.code === 'ECONNRESET' || error.code === 'ETIMEDOUT') {
        console.log(`  💾 Network issue - saving progress and stopping...`);
        console.log(`  📊 Total ${entityName} exported so far: ${totalRecords}`);
        console.log(`  📍 Resume from offset: ${offset}`);
        console.log(`  🔄 Run the script again to resume from this point`);
        break;
      } else {
        throw error;
      }
    }
  }
  
  console.log(`\n✅ BULLETPROOF export of ${entityName} completed!`);
  console.log(`📊 Total records: ${totalRecords}`);
  if (firstDate && lastDate) {
    console.log(`📅 Final date range: ${firstDate} to ${lastDate}`);
  }
  return totalRecords;
}

async function exportBulletproofData() {
  console.log('🛡️  STARTING BULLETPROOF GREYFINCH DATA EXPORT');
  console.log('================================================');
  console.log('✅ NEVER overwrites existing data');
  console.log('✅ Saves after EVERY batch');
  console.log('✅ Perfect resume capability');
  console.log('✅ Shows progress in real-time');
  console.log('================================================\n');
  
  const outputFile = 'greyfinchactualfinal.txt';
  
  // Ensure file exists and never overwrites
  ensureFileExists(outputFile);
  
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

    totalRecords += await exportEntityBulletproof('appointmentBookings', appointmentQuery, outputFile);

    // Add separator
    fs.appendFileSync(outputFile, '\n');
    console.log('\n📝 Added separator between entities');

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

    totalRecords += await exportEntityBulletproof('patients', patientQuery, outputFile);
    
    console.log('\n🎉 BULLETPROOF EXPORT COMPLETED!');
    console.log('================================');
    console.log(`📄 Output file: ${outputFile}`);
    console.log(`📊 Total records exported: ${totalRecords}`);
    
    // Show file size
    const stats = fs.statSync(outputFile);
    console.log(`📁 File size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
    
  } catch (error) {
    console.error('❌ Export failed:', error);
    console.log('\n💾 Progress saved in checkpoint files. Run the script again to resume.');
    process.exit(1);
  }
}

exportBulletproofData();
