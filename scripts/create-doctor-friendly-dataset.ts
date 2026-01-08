#!/usr/bin/env npx tsx

import fs from 'fs';
import path from 'path';

interface DataFile {
  name: string;
  path: string;
  entityType: string;
  sampleSize: number;
}

const dataFiles: DataFile[] = [
  {
    name: 'greyfinchactualfinal.txt',
    path: '/Users/anishsuvarna/Downloads/opera copy/greyfinchactualfinal.txt',
    entityType: 'appointmentBookings',
    sampleSize: 2000 // Larger sample for better analysis
  },
  {
    name: 'greyfinchpatients.txt', 
    path: '/Users/anishsuvarna/Downloads/opera copy/greyfinchpatients.txt',
    entityType: 'patients',
    sampleSize: 500 // More patients for analysis
  },
  {
    name: 'greyfinchapptypes.txt',
    path: '/Users/anishsuvarna/Downloads/opera copy/greyfinchapptypes.txt', 
    entityType: 'appointmentTypes',
    sampleSize: 50 // Most appointment types
  },
  {
    name: 'greyfinchlocations.txt',
    path: '/Users/anishsuvarna/Downloads/opera copy/greyfinchlocations.txt',
    entityType: 'locations',
    sampleSize: 10 // All locations
  },
  {
    name: 'greyfinchpatienttreatments.txt',
    path: '/Users/anishsuvarna/Downloads/opera copy/greyfinchpatienttreatments.txt',
    entityType: 'patientTreatments',
    sampleSize: 1000 // More treatments for analysis
  }
];

function sampleRecords(lines: string[], sampleSize: number): string[] {
  if (lines.length <= sampleSize) {
    return lines;
  }
  
  // Take records from beginning, middle, and end for better coverage
  const step = Math.floor(lines.length / sampleSize);
  const sampled: string[] = [];
  
  for (let i = 0; i < lines.length && sampled.length < sampleSize; i += step) {
    sampled.push(lines[i]);
  }
  
  // Always include the last record
  if (lines.length > 0 && !sampled.includes(lines[lines.length - 1])) {
    sampled.push(lines[lines.length - 1]);
  }
  
  return sampled;
}

function formatAppointmentForDoctor(line: string): string {
  try {
    const parts = line.split('\t');
    if (parts.length >= 4) {
      const entityType = parts[0];
      const id = parts[1];
      const date = parts[2];
      const jsonData = JSON.parse(parts[3]);
      
      if (entityType === 'appointmentBookings') {
        const patientName = jsonData.appointment?.patient?.person ? 
          `${jsonData.appointment.patient.person.firstName} ${jsonData.appointment.patient.person.lastName}` : 
          'Unknown Patient';
        const appointmentDate = jsonData.localStartDate || date;
        const appointmentTime = jsonData.localStartTime || 'Unknown Time';
        
        return `Appointment: ${patientName} on ${appointmentDate} at ${appointmentTime}`;
      }
    }
  } catch (error) {
    // If parsing fails, return original line
  }
  return line;
}

function formatPatientForDoctor(line: string): string {
  try {
    const parts = line.split('\t');
    if (parts.length >= 4) {
      const entityType = parts[0];
      const id = parts[1];
      const date = parts[2];
      const jsonData = JSON.parse(parts[3]);
      
      if (entityType === 'patients') {
        const firstName = jsonData.firstName || 'Unknown';
        const lastName = jsonData.lastName || 'Unknown';
        const createdDate = jsonData.createdAt || date;
        
        return `Patient: ${firstName} ${lastName} (since ${createdDate})`;
      }
    }
  } catch (error) {
    // If parsing fails, return original line
  }
  return line;
}

function formatTreatmentForDoctor(line: string): string {
  try {
    const parts = line.split('\t');
    if (parts.length >= 4) {
      const entityType = parts[0];
      const id = parts[1];
      const date = parts[2];
      const jsonData = JSON.parse(parts[3]);
      
      if (entityType === 'patientTreatments') {
        const patientName = jsonData.patientName || 'Unknown Patient';
        const treatmentDate = jsonData.treatmentDate || date;
        const treatmentTime = jsonData.treatmentTime || 'Unknown Time';
        const treatmentType = jsonData.treatmentType || 'General';
        
        return `Treatment: ${patientName} on ${treatmentDate} at ${treatmentTime} (${treatmentType})`;
      }
    }
  } catch (error) {
    // If parsing fails, return original line
  }
  return line;
}

async function createDoctorFriendlyDataset(): Promise<string> {
  console.log('🔄 Creating doctor-friendly dataset with practical insights...');
  
  let combinedData = '';
  let totalRecords = 0;
  
  // Add header information
  combinedData += '# Opera AI - Doctor-Friendly Practice Data\n';
  combinedData += `# Generated: ${new Date().toISOString()}\n`;
  combinedData += '# This dataset is optimized for answering practical questions doctors ask\n';
  combinedData += '# Formatted for easy analysis of schedules, patient patterns, and practice insights\n\n';
  
  for (const file of dataFiles) {
    try {
      console.log(`📄 Processing ${file.name}...`);
      
      if (!fs.existsSync(file.path)) {
        console.log(`⚠️  File not found: ${file.path}`);
        continue;
      }
      
      const content = fs.readFileSync(file.path, 'utf8');
      const lines = content.split('\n').filter(line => line.trim());
      
      // Filter out header lines
      const recordLines = lines.filter(line => 
        line.trim() && 
        !line.startsWith('#') && 
        !line.startsWith('Format:') &&
        !line.startsWith('Generated:') &&
        !line.startsWith('This export') &&
        !line.startsWith('##') &&
        !line.includes('Source:')
      );
      
      // Sample records strategically
      const sampledRecords = sampleRecords(recordLines, file.sampleSize);
      totalRecords += sampledRecords.length;
      
      // Add section header
      combinedData += `\n## ${file.entityType.toUpperCase()} DATA (${sampledRecords.length} records)\n`;
      combinedData += `# Source: ${file.name}\n\n`;
      
      // Format records for doctor-friendly analysis
      let formattedRecords: string[] = [];
      
      if (file.entityType === 'appointmentBookings') {
        formattedRecords = sampledRecords.map(formatAppointmentForDoctor);
      } else if (file.entityType === 'patients') {
        formattedRecords = sampledRecords.map(formatPatientForDoctor);
      } else if (file.entityType === 'patientTreatments') {
        formattedRecords = sampledRecords.map(formatTreatmentForDoctor);
      } else {
        formattedRecords = sampledRecords;
      }
      
      // Add the formatted data
      combinedData += formattedRecords.join('\n') + '\n\n';
      
      console.log(`✅ Added ${sampledRecords.length} ${file.entityType} records (formatted for doctor analysis)`);
      
    } catch (error) {
      console.error(`❌ Error processing ${file.name}:`, error);
    }
  }
  
  // Add summary
  combinedData += `\n## SUMMARY\n`;
  combinedData += `# Total Records: ${totalRecords}\n`;
  combinedData += `# Data Sources: ${dataFiles.length}\n`;
  combinedData += `# Generated: ${new Date().toISOString()}\n`;
  combinedData += `# This dataset is optimized for answering practical doctor questions\n`;
  
  return combinedData;
}

async function main() {
  try {
    const doctorDataset = await createDoctorFriendlyDataset();
    
    const outputPath = '/Users/anishsuvarna/Downloads/opera copy/greyfinch-doctor-friendly.txt';
    fs.writeFileSync(outputPath, doctorDataset, 'utf8');
    
    const fileSize = (fs.statSync(outputPath).size / 1024 / 1024).toFixed(2);
    
    console.log('\n🎉 Successfully created doctor-friendly dataset!');
    console.log(`📁 Output file: ${outputPath}`);
    console.log(`📊 File size: ${fileSize} MB`);
    console.log(`📈 Total records: ${doctorDataset.split('\n').filter(line => 
      line.trim() && 
      !line.startsWith('#') && 
      !line.startsWith('Format:') &&
      !line.startsWith('Generated:') &&
      !line.startsWith('This export') &&
      !line.startsWith('##') &&
      !line.includes('Source:')
    ).length}`);
    
    // Show first few lines as preview
    console.log('\n📋 Preview of doctor-friendly dataset:');
    console.log(doctorDataset.split('\n').slice(0, 20).join('\n'));
    
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
