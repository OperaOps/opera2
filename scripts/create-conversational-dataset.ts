#!/usr/bin/env npx tsx

import fs from 'fs';
import path from 'path';

interface DataFile {
  name: string;
  path: string;
  entityType: string;
}

const dataFiles: DataFile[] = [
  {
    name: 'greyfinchactualfinal.txt',
    path: '/Users/anishsuvarna/Downloads/opera copy/greyfinchactualfinal.txt',
    entityType: 'appointments'
  },
  {
    name: 'greyfinchpatients.txt', 
    path: '/Users/anishsuvarna/Downloads/opera copy/greyfinchpatients.txt',
    entityType: 'patients'
  },
  {
    name: 'greyfinchapptypes.txt',
    path: '/Users/anishsuvarna/Downloads/opera copy/greyfinchapptypes.txt', 
    entityType: 'services'
  },
  {
    name: 'greyfinchlocations.txt',
    path: '/Users/anishsuvarna/Downloads/opera copy/greyfinchlocations.txt',
    entityType: 'locations'
  },
  {
    name: 'greyfinchpatienttreatments.txt',
    path: '/Users/anishsuvarna/Downloads/opera copy/greyfinchpatienttreatments.txt',
    entityType: 'treatments'
  }
];

interface ParsedRecord {
  entityType: string;
  id: string;
  date: string;
  data: any;
}

function parseDataFile(content: string, entityType: string): ParsedRecord[] {
  const records: ParsedRecord[] = [];
  const lines = content.split('\n').filter(line => line.trim() && !line.startsWith('#'));
  
  for (const line of lines) {
    const parts = line.split('\t');
    if (parts.length >= 4) {
      try {
        const id = parts[1];
        const date = parts[2];
        const jsonBlob = JSON.parse(parts[3]);
        records.push({ entityType, id, date, data: jsonBlob });
      } catch (e) {
        // Skip invalid lines
      }
    }
  }
  
  return records;
}

function formatAppointmentForAI(record: ParsedRecord): string {
  const data = record.data;
  const patientName = data.appointment?.patient?.person ? 
    `${data.appointment.patient.person.firstName} ${data.appointment.patient.person.lastName}` : 
    'Unknown Patient';
  const date = data.localStartDate || 'Unknown Date';
  const time = data.localStartTime || 'Unknown Time';
  
  return `Appointment: ${patientName} on ${date} at ${time}`;
}

function formatPatientForAI(record: ParsedRecord): string {
  const data = record.data;
  const firstName = data.person?.firstName || 'Unknown';
  const lastName = data.person?.lastName || 'Unknown';
  
  return `Patient: ${firstName} ${lastName} (created ${record.date})`;
}

function formatServiceForAI(record: ParsedRecord): string {
  const data = record.data;
  const name = data.name || 'Unknown Service';
  
  return `Service: ${name}`;
}

function formatLocationForAI(record: ParsedRecord): string {
  const data = record.data;
  const name = data.name || 'Unknown Location';
  const city = data.address?.city || 'Unknown City';
  const state = data.address?.state || 'Unknown State';
  
  return `Location: ${name} in ${city}, ${state}`;
}

function formatTreatmentForAI(record: ParsedRecord): string {
  const data = record.data;
  const patientName = data.appointment?.patient?.person ? 
    `${data.appointment.patient.person.firstName} ${data.appointment.patient.person.lastName}` : 
    'Unknown Patient';
  const date = data.localStartDate || 'Unknown Date';
  const time = data.localStartTime || 'Unknown Time';
  
  return `Treatment: ${patientName} on ${date} at ${time}`;
}

function formatRecordForAI(record: ParsedRecord): string {
  switch (record.entityType) {
    case 'appointments':
      return formatAppointmentForAI(record);
    case 'patients':
      return formatPatientForAI(record);
    case 'services':
      return formatServiceForAI(record);
    case 'locations':
      return formatLocationForAI(record);
    case 'treatments':
      return formatTreatmentForAI(record);
    default:
      return `${record.entityType}: ${record.id}`;
  }
}

async function createConversationalDataset(): Promise<string> {
  console.log('🔄 Creating conversational dataset for dynamic AI responses...');
  
  let dataset = '';
  let totalRecords = 0;
  
  // Simple, clean header
  dataset += 'Practice Data for AI Analysis\n\n';
  
  // Process each data file and add records in simple format
  for (const file of dataFiles) {
    try {
      console.log(`📄 Processing ${file.name}...`);
      
      if (!fs.existsSync(file.path)) {
        console.log(`⚠️  File not found: ${file.path}`);
        continue;
      }
      
      const content = fs.readFileSync(file.path, 'utf8');
      const records = parseDataFile(content, file.entityType);
      
      if (records.length === 0) {
        console.log(`⚠️  No records found in ${file.name}`);
        continue;
      }
      
      totalRecords += records.length;
      
      // Add records in simple, clean format
      records.forEach((record, index) => {
        if (index < 1000) { // Limit to first 1000 records per type for manageable size
          dataset += formatRecordForAI(record) + '\n';
        }
      });
      
      console.log(`✅ Added ${Math.min(1000, records.length)} ${file.entityType} records`);
      
    } catch (error) {
      console.error(`❌ Error processing ${file.name}:`, error);
    }
  }
  
  return dataset;
}

async function main() {
  try {
    const conversationalDataset = await createConversationalDataset();
    
    const outputPath = '/Users/anishsuvarna/Downloads/opera copy/practice-data.txt';
    fs.writeFileSync(outputPath, conversationalDataset, 'utf8');
    
    const fileSize = (fs.statSync(outputPath).size / 1024).toFixed(2);
    
    console.log('\n🎉 Successfully created conversational dataset!');
    console.log(`📁 Output file: ${outputPath}`);
    console.log(`📊 File size: ${fileSize} KB`);
    console.log(`📈 Total records: ${conversationalDataset.split('\n').filter(line => line.trim()).length}`);
    
    // Show preview
    console.log('\n📋 Preview of conversational dataset:');
    console.log(conversationalDataset.split('\n').slice(0, 20).join('\n'));
    console.log('\n... (dataset continues) ...');
    
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
