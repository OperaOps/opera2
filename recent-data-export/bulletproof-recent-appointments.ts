#!/usr/bin/env ts-node

const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '../.env.local' });

// Configuration
const GREYFINCH_API_URL = process.env.GREYFINCH_API_URL || 'https://connect-api.greyfinch.com/v1/graphql';
const GREYFINCH_API_KEY = process.env.GREYFINCH_API_KEY || 'your_api_key_here';
const GREYFINCH_API_SECRET = process.env.GREYFINCH_API_SECRET || 'your_api_secret_here';

const PAGE_SIZE = 50;
const MAX_RETRIES = 5;
const RETRY_DELAY = 2000;
const OUTPUT_FILE = path.resolve(__dirname, 'recent-appointments-2024-2025.txt');
const CHECKPOINT_FILE = path.resolve(__dirname, 'checkpoint-recent-appointments.json');

// Rate limiting
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 100; // 100ms between requests

// Checkpoint structure
interface Checkpoint {
  entity: string;
  lastOffset: number;
  totalRecords: number;
  startTime: string;
  lastUpdateTime: string;
  dateRange: string;
}

// Authentication
let accessToken: string | null = null;

async function getAccessToken(): Promise<string> {
  if (accessToken) return accessToken;

  console.log('🔐 Authenticating with Greyfinch API...');
  
  const loginMutation = `
    mutation login($key: String!, $secret: String!) {
      apiLogin(key: $key, secret: $secret) {
        accessToken
        accessTokenExpiresIn
        status
      }
    }
  `;

  try {
    const response = await axios.post(GREYFINCH_API_URL, {
      query: loginMutation,
      variables: {
        key: GREYFINCH_API_KEY,
        secret: GREYFINCH_API_SECRET
      }
    }, {
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.data.errors) {
      throw new Error(`Login failed: ${JSON.stringify(response.data.errors)}`);
    }

    accessToken = response.data.data.apiLogin.accessToken;
    console.log('✅ Authentication successful');
    return accessToken!;
  } catch (error: any) {
    console.error('❌ Authentication failed:', error.message);
    throw error;
  }
}

async function makeRequestWithRetry(query: string, variables: any = {}, retryCount = 0): Promise<any> {
  const token = await getAccessToken();
  
  // Rate limiting
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    await new Promise(resolve => setTimeout(resolve, MIN_REQUEST_INTERVAL - timeSinceLastRequest));
  }
  lastRequestTime = Date.now();

  try {
    const response = await axios.post(GREYFINCH_API_URL, {
      query,
      variables
    }, {
      timeout: 120000, // 2 minutes timeout
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    // Check for rate limiting
    const rateLimitRemaining = response.headers['x-ratelimit-remaining'];
    const rateLimitReset = response.headers['x-ratelimit-reset'];
    const retryAfter = response.headers['retry-after'];

    if (rateLimitRemaining && parseInt(rateLimitRemaining) <= 2) {
      console.log(`⚠️ Rate limit approaching. Remaining: ${rateLimitRemaining}`);
      if (rateLimitReset) {
        const resetTime = parseInt(rateLimitReset) * 1000;
        const waitTime = Math.max(resetTime - Date.now(), 1000);
        console.log(`⏳ Waiting ${Math.round(waitTime / 1000)}s for rate limit reset...`);
        await new Promise(resolve => setTimeout(resolve, waitTime + 1000)); // Add buffer
      }
    }

    if (response.data.errors) {
      throw new Error(`GraphQL errors: ${JSON.stringify(response.data.errors)}`);
    }

    return response.data;
  } catch (error: any) {
    console.error(`❌ Request failed (attempt ${retryCount + 1}/${MAX_RETRIES}):`, error.message);
    
    if (retryCount < MAX_RETRIES - 1) {
      const delay = RETRY_DELAY * Math.pow(2, retryCount) + Math.random() * 1000; // Exponential backoff with jitter
      console.log(`⏳ Retrying in ${Math.round(delay)}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return makeRequestWithRetry(query, variables, retryCount + 1);
    }
    
    throw error;
  }
}

function formatAppointmentRecord(record: any): string {
  const patientName = record.appointment?.patient?.person ? 
    `${record.appointment.patient.person.firstName || ''} ${record.appointment.patient.person.lastName || ''}`.trim() : 
    'Unknown Patient';
  const startDate = record.localStartDate || 'Unknown';
  const startTime = record.localStartTime || 'Unknown';

  return `Appointment: ${patientName} on ${startDate} at ${startTime}`;
}

async function loadCheckpoint(): Promise<Checkpoint | null> {
  try {
    const data = await fs.readFile(CHECKPOINT_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
}

async function saveCheckpoint(checkpoint: Checkpoint): Promise<void> {
  await fs.writeFile(CHECKPOINT_FILE, JSON.stringify(checkpoint, null, 2));
}

async function exportRecentAppointments() {
  console.log('🚀 Starting recent appointments export (2024-2025)...');
  
  // Load checkpoint
  let checkpoint = await loadCheckpoint();
  let offset = checkpoint?.lastOffset || 0;
  let totalRecords = checkpoint?.totalRecords || 0;
  
  const startTime = checkpoint?.startTime || new Date().toISOString();
  const dateRange = '2024-01-01 to 2025-12-31';
  
  console.log(`📅 Date Range: ${dateRange}`);
  console.log(`📍 Starting from offset: ${offset}`);
  console.log(`📊 Total records so far: ${totalRecords}`);

  // GraphQL query for recent appointments (2024-2025)
  const query = `
    query GetRecentAppointments($limit: Int!, $offset: Int!) {
      appointmentBookings(
        limit: $limit
        offset: $offset
        where: {
          localStartDate: { _gte: "2024-01-01" }
        }
      ) {
        localStartDate
        localStartTime
        appointment {
          patient {
            person {
              firstName
              lastName
            }
          }
        }
      }
    }
  `;

  let batchCount = 0;
  let hasMoreData = true;

  // Open output file for appending
  const outputStream = require('fs').createWriteStream(OUTPUT_FILE, { flags: 'a' });

  try {
    while (hasMoreData) {
      batchCount++;
      console.log(`\n📦 Processing batch ${batchCount} (offset: ${offset})...`);

      try {
        const response = await makeRequestWithRetry(query, {
          limit: PAGE_SIZE,
          offset: offset
        });

        const appointments = response.data.appointmentBookings;
        
        if (!appointments || appointments.length === 0) {
          console.log('✅ No more data found. Export complete!');
          hasMoreData = false;
          break;
        }

        console.log(`📋 Found ${appointments.length} appointments in this batch`);

        // Process and write records
        for (const appointment of appointments) {
          const formattedRecord = formatAppointmentRecord(appointment);
          outputStream.write(formattedRecord + '\n');
          totalRecords++;
        }

        // Update checkpoint
        const checkpointData: Checkpoint = {
          entity: 'appointmentBookings',
          lastOffset: offset,
          totalRecords: totalRecords,
          startTime: startTime,
          lastUpdateTime: new Date().toISOString(),
          dateRange: dateRange
        };
        await saveCheckpoint(checkpointData);

        console.log(`✅ Batch ${batchCount} completed. Total records: ${totalRecords}`);
        
        // Show sample record from this batch
        if (appointments.length > 0) {
          const sampleRecord = formatAppointmentRecord(appointments[0]);
          console.log(`📝 Sample record: ${sampleRecord.substring(0, 100)}...`);
        }

        // Move to next batch
        offset += PAGE_SIZE;

        // Check if we got fewer records than requested (end of data)
        if (appointments.length < PAGE_SIZE) {
          console.log('✅ Reached end of data (partial batch received)');
          hasMoreData = false;
        }

      } catch (error: any) {
        console.error(`❌ Error processing batch ${batchCount}:`, error.message);
        
        if (error.message.includes('rate limit') || error.message.includes('429')) {
          console.log('⏳ Rate limited. Waiting longer before retry...');
          await new Promise(resolve => setTimeout(resolve, 30000)); // Wait 30 seconds
          continue; // Retry the same batch
        }
        
        // For other errors, wait and try next batch
        await new Promise(resolve => setTimeout(resolve, 5000));
        offset += PAGE_SIZE;
        continue;
      }
    }

  } finally {
    outputStream.end();
  }

  console.log('\n🎉 Export completed successfully!');
  console.log(`📊 Total records exported: ${totalRecords}`);
  console.log(`📁 Output file: ${OUTPUT_FILE}`);
  console.log(`⏱️ Total time: ${Math.round((Date.now() - new Date(startTime).getTime()) / 1000)}s`);

  // Clean up checkpoint file
  try {
    await fs.unlink(CHECKPOINT_FILE);
    console.log('🧹 Checkpoint file cleaned up');
  } catch (error) {
    console.log('⚠️ Could not clean up checkpoint file');
  }
}

// Run the export
exportRecentAppointments().catch(console.error);
