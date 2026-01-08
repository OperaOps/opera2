#!/usr/bin/env tsx

/**
 * Recent Greyfinch Data Export Script
 * 
 * Exports recent data starting from today and going backwards.
 * Writes each batch immediately to prevent data loss.
 * 
 * Usage:
 * npx tsx scripts/recent-data-export.ts
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
        timeout: 120000 // 120 second timeout
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
          const delay = Math.min(10000 * Math.pow(2, attempt), 120000); // Longer delays: 10s, 20s, 40s, 80s, 120s max
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
  const checkpointFile = `checkpoint-${entityName}.json`;
  if (fs.existsSync(checkpointFile)) {
    try {
      const data = fs.readFileSync(checkpointFile, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.log(`  ⚠️  Could not load checkpoint for ${entityName}, starting fresh`);
    }
  }
  return { entityName, lastOffset: 0, totalRecords: 0, completed: false, lastDate: '' };
}

function saveCheckpoint(checkpoint: Checkpoint): void {
  const checkpointFile = `checkpoint-${checkpoint.entityName}.json`;
  fs.writeFileSync(checkpointFile, JSON.stringify(checkpoint, null, 2));
}

function isDateRecent(dateStr: string): boolean {
  if (!dateStr || dateStr === 'unknown') return true;
  
  try {
    const recordDate = new Date(dateStr);
    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
    
    return recordDate >= twoYearsAgo;
  } catch (error) {
    return true; // If we can't parse the date, include it
  }
}

async function exportEntityRecent(entityName: string, query: string, outputStream: fs.WriteStream): Promise<number> {
  console.log(`📊 Exporting recent ${entityName} data (last 2 years)...`);
  
  const checkpoint = loadCheckpoint(entityName);
  let offset = checkpoint.lastOffset;
  const batchSize = 20;
  let totalRecords = checkpoint.totalRecords;
  let hasMore = true;
  let batchCount = Math.floor(offset / batchSize);
  let uniqueIds = new Set();
  let oldDataCount = 0;

  console.log(`  📍 Resuming from offset: ${offset} (${totalRecords} records already exported)`);

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
      
      // Process each record
      let newRecords = 0;
      let batchRecentCount = 0;
      let oldestDate = '';
      
      for (const record of records) {
        if (!uniqueIds.has(record.id)) {
          uniqueIds.add(record.id);
          
          const recordDate = record.localStartDate || record.procedureDate || '';
          if (recordDate) {
            if (oldestDate === '' || recordDate < oldestDate) {
              oldestDate = recordDate;
            }
          }
          
          // Check if this record is from the last 2 years
          if (isDateRecent(recordDate)) {
          const line = formatRecord(entityName, record);
          outputStream.write(line + '\n');
            newRecords++;
            batchRecentCount++;
          } else {
            oldDataCount++;
            console.log(`  📅 Skipping old record from ${recordDate}`);
          }
        }
      }
      
      totalRecords += newRecords;
      
      console.log(`  ✅ Got ${records.length} ${entityName} (${batchRecentCount} recent, ${oldDataCount} old skipped, total recent: ${totalRecords})`);
      
      if (records.length > 0 && oldestDate) {
        console.log(`  📅 Oldest date in batch: ${oldestDate}`);
        
        // If we're getting very old data, we might want to stop
        if (!isDateRecent(oldestDate) && batchCount > 10) {
          console.log(`  🛑 Stopping - data is older than 2 years (${oldestDate})`);
          hasMore = false;
          checkpoint.completed = true;
          break;
        }
      }
      
      // Update checkpoint
      offset += batchSize;
      checkpoint.lastOffset = offset;
      checkpoint.totalRecords = totalRecords;
      checkpoint.lastDate = oldestDate;
      saveCheckpoint(checkpoint);
      
      // If we got fewer records than requested, we've reached the end
      if (records.length < batchSize) {
        hasMore = false;
        console.log(`  🏁 Reached end of ${entityName} data (got ${records.length} < ${batchSize})`);
        checkpoint.completed = true;
        saveCheckpoint(checkpoint);
      }
      
      // Delay between requests
      console.log(`  ⏳ Waiting 5 seconds before next batch...`);
      await new Promise(resolve => setTimeout(resolve, 5000));
      
    } catch (error) {
      console.error(`❌ Error fetching ${entityName} batch ${batchCount}:`, error.message);
      
      if (error.code === 'ECONNRESET' || error.code === 'ETIMEDOUT') {
        console.log(`  💾 Saving progress and stopping due to network issues...`);
        console.log(`  📊 Total recent ${entityName} exported so far: ${totalRecords}`);
        console.log(`  📍 Resume from offset: ${offset}`);
        break;
      } else {
        throw error;
      }
    }
  }
  
  console.log(`✅ Exported ${totalRecords} recent ${entityName} records (${oldDataCount} old records skipped)`);
  return totalRecords;
}

async function exportRecentData() {
  console.log('🚀 Starting Recent Greyfinch Data Export (Last 2 Years)...');
  console.log('📝 This will pull recent data starting from today and going backwards\n');
  
  const outputFile = 'greyfinch-recent-data.txt';
  
  // Write header
  const outputStream = fs.createWriteStream(outputFile, { flags: 'w' });
  outputStream.write('# Greyfinch Recent Data Export (Last 2 Years)\n');
  outputStream.write('# Format: Entity\tID\tCreatedAt\tJSON\n');
  outputStream.write(`# Generated: ${new Date().toISOString()}\n`);
  outputStream.write('# This export focuses on recent data from the last 2 years\n\n');
  outputStream.end();

  let totalRecords = 0;

  try {
    // Export Recent Appointment Bookings
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

    // Reopen stream for appending
    const appointmentStream = fs.createWriteStream(outputFile, { flags: 'a' });
    totalRecords += await exportEntityRecent('appointmentBookings', appointmentQuery, appointmentStream);
    appointmentStream.end();

    // Add separator
    const separatorStream = fs.createWriteStream(outputFile, { flags: 'a' });
    separatorStream.write('\n');
    separatorStream.end();

    // Export Recent Patients
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

    const patientStream = fs.createWriteStream(outputFile, { flags: 'a' });
    totalRecords += await exportEntityRecent('patients', patientQuery, patientStream);
    patientStream.end();
    
    console.log('\n🎉 Recent data export completed!');
    console.log(`📄 Output saved to: ${outputFile}`);
    console.log(`📊 Total recent records exported: ${totalRecords}`);
    
    // Show file size
    const stats = fs.statSync(outputFile);
    console.log(`📁 File size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
    
  } catch (error) {
    console.error('❌ Export failed:', error);
    console.log('\n💾 Progress saved in checkpoint files. Run the script again to resume.');
    process.exit(1);
  }
}

exportRecentData();
