#!/usr/bin/env tsx

/**
 * Continuous Greyfinch Export Script
 * 
 * Continuously pulls data in batches of 20 with delays until all data is exhausted.
 * This ensures we get ALL available data, not just the first batch.
 * 
 * Usage:
 * npx tsx scripts/continuous-export.ts
 */

import axios from 'axios';
import * as fs from 'fs';

const API_URL = "https://connect-api.greyfinch.com/v1/graphql";
const API_KEY = process.env.GREYFINCH_API_KEY || "pk_user_pcK2+6R5H/DJiNLzZvW8dnydQ6UgLeP5";
const API_SECRET = process.env.GREYFINCH_API_SECRET || "sk_user_c1PDU7HA3KgnBJ1e3NomYcF6pd7j1ydB";

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

async function makeRequest(query: string): Promise<any> {
  const accessToken = await getAccessToken();
  
  const response = await axios.post(API_URL, {
    query
  }, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });

  if (response.data.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(response.data.errors)}`);
  }

  return response.data.data;
}

function formatRecord(entityName: string, record: any): string {
  const id = record.id || 'unknown';
  const createdAt = record.localStartDate || record.procedureDate || 'unknown';
  
  // Create compact JSON
  const compactRecord = {
    id,
    createdAt,
    ...record
  };

  const jsonStr = JSON.stringify(compactRecord);
  return `${entityName}\t${id}\t${createdAt}\t${jsonStr}`;
}

async function exportEntityContinuously(entityName: string, query: string, outputStream: fs.WriteStream): Promise<number> {
  console.log(`📊 Continuously exporting ${entityName}...`);
  let offset = 0;
  const batchSize = 20; // Use smaller batches to ensure we get all data
  let allRecords = [];
  let hasMore = true;
  let batchCount = 0;
  let uniqueIds = new Set(); // Track unique IDs to detect duplicates

  while (hasMore) {
    batchCount++;
    
    // Build the paginated query
    const paginatedQuery = query.replace(
      `${entityName} {`, 
      `${entityName}(limit: ${batchSize}, offset: ${offset}) {`
    );
    
    console.log(`  📄 Batch ${batchCount}: Fetching ${entityName} (offset: ${offset}, limit: ${batchSize})`);
    
    try {
      const data = await makeRequest(paginatedQuery);
      const records = data[entityName] || [];
      
      if (records.length === 0) {
        hasMore = false;
        console.log(`  ✅ No more ${entityName} records found - reached end of data`);
        break;
      }
      
      // Check for duplicates (if we start getting the same IDs, we've wrapped around)
      let newRecords = 0;
      for (const record of records) {
        if (!uniqueIds.has(record.id)) {
          uniqueIds.add(record.id);
          allRecords.push(record);
          newRecords++;
        } else {
          console.log(`  🔄 Duplicate record detected (ID: ${record.id}) - stopping pagination`);
          hasMore = false;
          break;
        }
      }
      
      if (hasMore) {
        console.log(`  ✅ Got ${records.length} ${entityName} (${newRecords} new, total unique: ${allRecords.length})`);
        
        // Show some sample data to verify we're getting different records
        if (records.length > 0) {
          const sampleRecord = records[0];
          const sampleDate = sampleRecord.localStartDate || 'unknown';
          console.log(`  📅 Sample record date: ${sampleDate}`);
        }
        
        offset += batchSize;
        
        // If we got fewer records than requested, we've reached the end
        if (records.length < batchSize) {
          hasMore = false;
          console.log(`  🏁 Reached end of ${entityName} data (got ${records.length} < ${batchSize})`);
        }
        
        // Delay between requests to be respectful to the API
        console.log(`  ⏳ Waiting 1 second before next batch...`);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
    } catch (error) {
      console.error(`❌ Error fetching ${entityName} batch ${batchCount}:`, error);
      throw error;
    }
  }
  
  // Write all unique records to output
  for (const record of allRecords) {
    const line = formatRecord(entityName, record);
    outputStream.write(line + '\n');
  }
  
  console.log(`✅ Exported ${allRecords.length} unique ${entityName} records`);
  return allRecords.length;
}

async function exportAllDataContinuously() {
  console.log('🚀 Starting Continuous Greyfinch Data Export...');
  console.log('📝 This will pull ALL available data in batches until exhausted\n');
  
  const outputFile = 'greyfinch-continuous-export.txt';
  const outputStream = fs.createWriteStream(outputFile, { flags: 'w' });

  // Write header
  outputStream.write('# Greyfinch Continuous Data Export - ALL Available Data\n');
  outputStream.write('# Format: Entity\tID\tCreatedAt\tJSON\n');
  outputStream.write(`# Generated: ${new Date().toISOString()}\n`);
  outputStream.write('# This export uses continuous pagination to ensure ALL data is captured\n\n');

  let totalRecords = 0;

  try {
    // Export Appointment Bookings continuously
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

    totalRecords += await exportEntityContinuously('appointmentBookings', appointmentQuery, outputStream);

    // Add separator between entity types
    outputStream.write('\n');

    // Export Patients continuously
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

    totalRecords += await exportEntityContinuously('patients', patientQuery, outputStream);

    outputStream.end();
    
    console.log('\n🎉 Continuous export completed successfully!');
    console.log(`📄 Output saved to: ${outputFile}`);
    console.log(`📊 Total unique records exported: ${totalRecords}`);
    
    // Show a preview of the data
    console.log('\n📋 Preview of exported data:');
    const preview = fs.readFileSync(outputFile, 'utf8');
    const lines = preview.split('\n').slice(0, 15); // First 15 lines
    lines.forEach(line => {
      if (line.trim() && !line.startsWith('#')) {
        console.log(line);
      }
    });
    
  } catch (error) {
    console.error('❌ Export failed:', error);
    outputStream.end();
    process.exit(1);
  }
}

exportAllDataContinuously();
