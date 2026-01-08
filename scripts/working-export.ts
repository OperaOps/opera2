#!/usr/bin/env tsx

/**
 * Working Greyfinch Export Script
 * 
 * Exports ALL available data from Greyfinch Connect GraphQL API using proper pagination.
 * 
 * Usage:
 * npx tsx scripts/working-export.ts
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

async function exportAppointmentBookings(outputStream: fs.WriteStream): Promise<number> {
  console.log('📊 Exporting appointment bookings...');
  let offset = 0;
  const limit = 20;
  let allRecords = [];
  let hasMore = true;
  let batchCount = 0;

  while (hasMore) {
    batchCount++;
    
    const query = `
      query {
        appointmentBookings(limit: ${limit}, offset: ${offset}) {
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
    
    console.log(`  📄 Fetching appointment bookings batch ${batchCount}: offset ${offset}, limit ${limit}`);
    
    try {
      const data = await makeRequest(query);
      const records = data.appointmentBookings || [];
      
      if (records.length === 0) {
        hasMore = false;
        console.log(`  ✅ No more appointment bookings found`);
      } else {
        allRecords = allRecords.concat(records);
        offset += limit;
        
        console.log(`  ✅ Got ${records.length} appointment bookings (total so far: ${allRecords.length})`);
        
        // If we got fewer records than requested, we've reached the end
        if (records.length < limit) {
          hasMore = false;
          console.log(`  🏁 Reached end of appointment bookings data`);
        }
        
        // Small delay between requests
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    } catch (error) {
      console.error(`❌ Error fetching appointment bookings batch ${batchCount}:`, error);
      throw error;
    }
  }
  
  // Write all records to output
  for (const record of allRecords) {
    const line = formatRecord('appointmentBookings', record);
    outputStream.write(line + '\n');
  }
  
  console.log(`✅ Exported ${allRecords.length} appointment bookings`);
  return allRecords.length;
}

async function exportPatients(outputStream: fs.WriteStream): Promise<number> {
  console.log('📊 Exporting patients...');
  let offset = 0;
  const limit = 20;
  let allRecords = [];
  let hasMore = true;
  let batchCount = 0;

  while (hasMore) {
    batchCount++;
    
    const query = `
      query {
        patients(limit: ${limit}, offset: ${offset}) {
          id
          person {
            id
            firstName
            lastName
          }
        }
      }
    `;
    
    console.log(`  📄 Fetching patients batch ${batchCount}: offset ${offset}, limit ${limit}`);
    
    try {
      const data = await makeRequest(query);
      const records = data.patients || [];
      
      if (records.length === 0) {
        hasMore = false;
        console.log(`  ✅ No more patients found`);
      } else {
        allRecords = allRecords.concat(records);
        offset += limit;
        
        console.log(`  ✅ Got ${records.length} patients (total so far: ${allRecords.length})`);
        
        // If we got fewer records than requested, we've reached the end
        if (records.length < limit) {
          hasMore = false;
          console.log(`  🏁 Reached end of patients data`);
        }
        
        // Small delay between requests
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    } catch (error) {
      console.error(`❌ Error fetching patients batch ${batchCount}:`, error);
      throw error;
    }
  }
  
  // Write all records to output
  for (const record of allRecords) {
    const line = formatRecord('patients', record);
    outputStream.write(line + '\n');
  }
  
  console.log(`✅ Exported ${allRecords.length} patients`);
  return allRecords.length;
}

async function exportAllData() {
  console.log('🚀 Starting Complete Greyfinch Data Export...');
  
  const outputFile = 'greyfinch-complete-export.txt';
  const outputStream = fs.createWriteStream(outputFile, { flags: 'w' });

  // Write header
  outputStream.write('# Greyfinch Complete Data Export - ALL Available Data\n');
  outputStream.write('# Format: Entity\tID\tCreatedAt\tJSON\n');
  outputStream.write(`# Generated: ${new Date().toISOString()}\n\n`);

  let totalRecords = 0;

  try {
    // Export Appointment Bookings
    totalRecords += await exportAppointmentBookings(outputStream);

    // Export Patients
    totalRecords += await exportPatients(outputStream);

    outputStream.end();
    
    console.log('\n🎉 Complete export finished successfully!');
    console.log(`📄 Output saved to: ${outputFile}`);
    console.log(`📊 Total records exported: ${totalRecords}`);
    
    // Show a preview of the data
    console.log('\n📋 Preview of exported data:');
    const preview = fs.readFileSync(outputFile, 'utf8');
    const lines = preview.split('\n').slice(0, 10); // First 10 lines
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

exportAllData();
