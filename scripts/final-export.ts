#!/usr/bin/env tsx

/**
 * Final Greyfinch Export Script
 * 
 * Exports all available data from Greyfinch Connect GraphQL API.
 * 
 * Usage:
 * npx tsx scripts/final-export.ts
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

async function exportAllData() {
  console.log('🚀 Starting Greyfinch Data Export...');
  
  const outputFile = 'greyfinch-export.txt';
  const outputStream = fs.createWriteStream(outputFile, { flags: 'w' });

  // Write header
  outputStream.write('# Greyfinch Data Export - All Available Data\n');
  outputStream.write('# Format: Entity\tID\tCreatedAt\tJSON\n');
  outputStream.write(`# Generated: ${new Date().toISOString()}\n\n`);

  let totalRecords = 0;

  try {
    // Export Appointment Bookings with pagination
    console.log('📊 Exporting appointment bookings...');
    let appointmentOffset = 0;
    const appointmentLimit = 100;
    let allAppointments = [];
    let hasMoreAppointments = true;

    while (hasMoreAppointments) {
      const appointmentQuery = `
        query {
          appointmentBookings(limit: ${appointmentLimit}, offset: ${appointmentOffset}) {
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

      console.log(`  📄 Fetching appointments batch: offset ${appointmentOffset}, limit ${appointmentLimit}`);
      const appointmentData = await makeRequest(appointmentQuery);
      const appointments = appointmentData.appointmentBookings || [];
      
      if (appointments.length === 0) {
        hasMoreAppointments = false;
      } else {
        allAppointments = allAppointments.concat(appointments);
        appointmentOffset += appointmentLimit;
        
        console.log(`  ✅ Got ${appointments.length} appointments (total so far: ${allAppointments.length})`);
        
        // If we got fewer records than requested, we've reached the end
        if (appointments.length < appointmentLimit) {
          hasMoreAppointments = false;
        }
        
        // Small delay between requests
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    
    for (const appointment of allAppointments) {
      const line = formatRecord('appointmentBookings', appointment);
      outputStream.write(line + '\n');
    }
    
    console.log(`✅ Exported ${allAppointments.length} appointment bookings`);
    totalRecords += allAppointments.length;

    // Export Patients with pagination
    console.log('📊 Exporting patients...');
    let patientOffset = 0;
    const patientLimit = 100;
    let allPatients = [];
    let hasMorePatients = true;

    while (hasMorePatients) {
      const patientQuery = `
        query {
          patients(limit: ${patientLimit}, offset: ${patientOffset}) {
            id
            person {
              id
              firstName
              lastName
            }
          }
        }
      `;

      console.log(`  📄 Fetching patients batch: offset ${patientOffset}, limit ${patientLimit}`);
      const patientData = await makeRequest(patientQuery);
      const patients = patientData.patients || [];
      
      if (patients.length === 0) {
        hasMorePatients = false;
      } else {
        allPatients = allPatients.concat(patients);
        patientOffset += patientLimit;
        
        console.log(`  ✅ Got ${patients.length} patients (total so far: ${allPatients.length})`);
        
        // If we got fewer records than requested, we've reached the end
        if (patients.length < patientLimit) {
          hasMorePatients = false;
        }
        
        // Small delay between requests
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    
    for (const patient of allPatients) {
      const line = formatRecord('patients', patient);
      outputStream.write(line + '\n');
    }
    
    console.log(`✅ Exported ${allPatients.length} patients`);
    totalRecords += allPatients.length;

    outputStream.end();
    
    console.log('\n🎉 Export completed successfully!');
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
