import axios from 'axios';
import fs from 'fs';

const API_URL = "https://connect-api.greyfinch.com/v1/graphql";
const API_KEY = process.env.GREYFINCH_API_KEY || "pk_user_pcK2+6R5H/DJiNLzZvW8dnydQ6UgLeP5";
const API_SECRET = process.env.GREYFINCH_API_SECRET || "sk_user_c1PDU7HA3KgnBJ1e3NomYcF6pd7j1ydB";

// Global variables
let accessToken: string | null = null;
const OUTPUT_FILE = 'greyfinchpatienttreatments.txt';
const CHECKPOINT_FILE = 'checkpoint-patient-treatments.json';

// GraphQL query for patient treatments (extracted from appointmentBookings)
const PATIENT_TREATMENTS_QUERY = `
  query getPatientTreatments($limit: Int, $offset: Int) {
    appointmentBookings(limit: $limit, offset: $offset) {
      id
      createdAt
      localStartDate
      localStartTime
      appointment {
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

async function getAccessToken(): Promise<string> {
  if (accessToken) return accessToken;
  
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
    headers: {
      'Content-Type': 'application/json'
    },
    timeout: 30000
  });

  if (response.data.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(response.data.errors)}`);
  }

  accessToken = response.data.data.apiLogin.accessToken;
  return accessToken;
}

async function makeRequestWithRetry(query: string, variables: any = {}, maxRetries: number = 5): Promise<any> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const token = await getAccessToken();
      
      const response = await axios.post(API_URL, {
        query,
        variables
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        timeout: 120000 // 2 minutes timeout
      });

      if (response.data.errors) {
        throw new Error(`GraphQL errors: ${JSON.stringify(response.data.errors)}`);
      }

      return response.data;
    } catch (error: any) {
      console.log(`  🔄 API timeout/error (attempt ${attempt}/${maxRetries}): ${error.code || error.message}`);
      
      if (attempt === maxRetries) {
        throw error;
      }
      
      // Wait with exponential backoff
      const waitTime = Math.min(1000 * Math.pow(2, attempt - 1), 120000);
      console.log(`  ⏳ API seems slow, waiting ${waitTime/1000}s before retry...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }
}

function loadCheckpoint(): any {
  try {
    if (fs.existsSync(CHECKPOINT_FILE)) {
      const data = fs.readFileSync(CHECKPOINT_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.log('  ⚠️ Could not load checkpoint, starting fresh');
  }
  return null;
}

function saveCheckpoint(offset: number, totalRecords: number, firstDate?: string, lastDate?: string) {
  const checkpoint = {
    entityName: 'patientTreatments',
    lastOffset: offset,
    totalRecords: totalRecords,
    completed: false,
    lastDate: lastDate,
    firstDate: firstDate
  };
  
  try {
    fs.writeFileSync(CHECKPOINT_FILE, JSON.stringify(checkpoint, null, 2));
  } catch (error) {
    console.log('  ⚠️ Could not save checkpoint');
  }
}

function formatPatientTreatmentRecord(record: any): string {
  // Extract key treatment information (appointments represent treatments)
  const compactData = {
    appointmentId: record.id,
    createdAt: record.createdAt,
    treatmentDate: record.localStartDate,
    treatmentTime: record.localStartTime,
    patientId: record.appointment?.patient?.id || 'Unknown',
    patientName: record.appointment?.patient?.person ? 
      `${record.appointment.patient.person.firstName || ''} ${record.appointment.patient.person.lastName || ''}`.trim() : 'Unknown',
    treatmentType: 'Appointment', // Since we don't have specific treatment names, we'll use 'Appointment'
    treatmentCategory: 'General' // Default category since we don't have specific categories
  };

  // Truncate very long text fields
  const truncatedData = JSON.stringify(compactData).substring(0, 1000);
  
  return `patientTreatments\t${record.id}\t${record.localStartDate || 'Unknown'}\t${truncatedData}`;
}

async function exportPatientTreatmentsBulletproof(): Promise<void> {
  console.log('🚀 Starting bulletproof patient treatments export...');
  
  // Load checkpoint
  const checkpoint = loadCheckpoint();
  let offset = checkpoint?.lastOffset || 0;
  let totalRecords = checkpoint?.totalRecords || 0;
  let batchNumber = Math.floor(offset / 20) + 1;
  
  console.log(`📍 Resuming from offset ${offset} (${totalRecords} records already exported)`);
  
  // Track unique records and date ranges
  const uniqueRecords = new Set<string>();
  let firstDate = checkpoint?.firstDate;
  let lastDate = checkpoint?.lastDate;
  
  // Load existing unique records from file if resuming
  if (fs.existsSync(OUTPUT_FILE)) {
    try {
      const existingData = fs.readFileSync(OUTPUT_FILE, 'utf8');
      const lines = existingData.trim().split('\n');
      for (const line of lines) {
        if (line.startsWith('patientTreatments\t')) {
          const parts = line.split('\t');
          if (parts.length >= 2) {
            uniqueRecords.add(parts[1]); // Use ID as unique identifier
          }
        }
      }
      console.log(`📊 Loaded ${uniqueRecords.size} existing unique records from file`);
    } catch (error) {
      console.log('  ⚠️ Could not load existing records from file');
    }
  }
  
  const outputStream = fs.createWriteStream(OUTPUT_FILE, { flags: 'a' });
  
  try {
    while (true) {
      console.log(`\n  📄 BATCH ${batchNumber}: Fetching patient treatments`);
      console.log(`     Offset: ${offset}, Limit: 20`);
      
      const response = await makeRequestWithRetry(PATIENT_TREATMENTS_QUERY, {
        limit: 20,
        offset: offset
      });
      
      const records = response.data.appointmentBookings || [];
      
      if (records.length === 0) {
        console.log('  ✅ No more records found - export complete!');
        break;
      }
      
      // Track date ranges
      const batchDates = records
        .map((r: any) => r.localStartDate)
        .filter(Boolean)
        .sort();
      
      if (batchDates.length > 0) {
        const batchFirst = batchDates[0];
        const batchLast = batchDates[batchDates.length - 1];
        
        if (!firstDate || batchFirst < firstDate) firstDate = batchFirst;
        if (!lastDate || batchLast > lastDate) lastDate = batchLast;
        
        console.log(`     📅 Batch date range: ${batchFirst} to ${batchLast}`);
        console.log(`     📅 Sample dates: ${batchDates.slice(0, 3).join(', ')}${batchDates.length > 3 ? '...' : ''}`);
      }
      
      // Process records and write to file
      let newRecords = 0;
      for (const record of records) {
        if (!uniqueRecords.has(record.id)) {
          uniqueRecords.add(record.id);
          const formattedRecord = formatPatientTreatmentRecord(record);
          outputStream.write(formattedRecord + '\n');
          newRecords++;
        }
      }
      
      totalRecords = uniqueRecords.size;
      offset += records.length;
      
      console.log(`     ✅ Got ${records.length} records (${newRecords} new, total: ${totalRecords})`);
      console.log(`     📊 Overall date range: ${firstDate || 'Unknown'} to ${lastDate || 'Unknown'}`);
      
      // Save checkpoint
      saveCheckpoint(offset, totalRecords, firstDate, lastDate);
      console.log(`  💾 Checkpoint saved: offset ${offset}, ${totalRecords} records`);
      
      // Wait before next batch (reduced delay for faster export)
      console.log(`     ⏳ Waiting 0.5 seconds before next batch...`);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      batchNumber++;
    }
    
    console.log('\n🎉 Export completed successfully!');
    console.log(`📊 Total unique patient treatments exported: ${totalRecords}`);
    console.log(`📅 Date range: ${firstDate || 'Unknown'} to ${lastDate || 'Unknown'}`);
    
  } catch (error: any) {
    console.error(`❌ Error fetching patient treatments batch ${batchNumber}:`, error.message);
    console.error('❌ Export failed:', error);
    
    // Save checkpoint on error
    saveCheckpoint(offset, totalRecords, firstDate, lastDate);
    console.log('💾 Progress saved in checkpoint files. Run the script again to resume.');
  } finally {
    outputStream.end();
  }
}

// Main execution
async function main() {
  try {
    await exportPatientTreatmentsBulletproof();
  } catch (error: any) {
    console.error('❌ Fatal error:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
