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
    entityType: 'appointment_types'
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

function formatAppointmentRecord(record: ParsedRecord): string {
  const data = record.data;
  const patientName = data.appointment?.patient?.person ? 
    `${data.appointment.patient.person.firstName} ${data.appointment.patient.person.lastName}` : 
    'Unknown Patient';
  const date = data.localStartDate || 'Unknown Date';
  const time = data.localStartTime || 'Unknown Time';
  const appointmentId = data.appointment?.id || 'Unknown';
  
  return `**Appointment ID:** ${record.id}
**Patient:** ${patientName}
**Date:** ${date}
**Time:** ${time}
**Appointment ID:** ${appointmentId}
**Created:** ${record.date}`;
}

function formatPatientRecord(record: ParsedRecord): string {
  const data = record.data;
  const firstName = data.person?.firstName || 'Unknown';
  const lastName = data.person?.lastName || 'Unknown';
  const patientId = data.id || 'Unknown';
  
  return `**Patient ID:** ${record.id}
**Name:** ${firstName} ${lastName}
**Patient System ID:** ${patientId}
**Created:** ${record.date}`;
}

function formatAppointmentTypeRecord(record: ParsedRecord): string {
  const data = record.data;
  const name = data.name || 'Unknown Service';
  
  return `**Service ID:** ${record.id}
**Service Name:** ${name}`;
}

function formatLocationRecord(record: ParsedRecord): string {
  const data = record.data;
  const name = data.name || 'Unknown Location';
  const city = data.address?.city || 'Unknown City';
  const state = data.address?.state || 'Unknown State';
  
  return `**Location ID:** ${record.id}
**Location Name:** ${name}
**Address:** ${city}, ${state}`;
}

function formatTreatmentRecord(record: ParsedRecord): string {
  const data = record.data;
  const patientName = data.appointment?.patient?.person ? 
    `${data.appointment.patient.person.firstName} ${data.appointment.patient.person.lastName}` : 
    'Unknown Patient';
  const date = data.localStartDate || 'Unknown Date';
  const time = data.localStartTime || 'Unknown Time';
  
  return `**Treatment ID:** ${record.id}
**Patient:** ${patientName}
**Date:** ${date}
**Time:** ${time}
**Treatment Type:** Appointment
**Category:** General`;
}

function formatRecord(record: ParsedRecord): string {
  switch (record.entityType) {
    case 'appointments':
      return formatAppointmentRecord(record);
    case 'patients':
      return formatPatientRecord(record);
    case 'appointment_types':
      return formatAppointmentTypeRecord(record);
    case 'locations':
      return formatLocationRecord(record);
    case 'treatments':
      return formatTreatmentRecord(record);
    default:
      return `**ID:** ${record.id}\n**Type:** ${record.entityType}\n**Date:** ${record.date}`;
  }
}

async function createUltimateRAGDataset(): Promise<string> {
  console.log('🔄 Creating ultimate RAG dataset with comprehensive organization...');
  
  let dataset = '';
  let totalRecords = 0;
  
  // Comprehensive header
  dataset += '# OPERA AI - COMPREHENSIVE PRACTICE MANAGEMENT DATASET\n';
  dataset += `# Generated: ${new Date().toISOString()}\n`;
  dataset += '# This dataset contains all practice data organized for optimal AI analysis\n\n';
  
  dataset += '## DATASET OVERVIEW\n\n';
  dataset += 'This comprehensive dataset contains all practice management data including:\n';
  dataset += '- **Patient Information:** Complete patient demographics and records\n';
  dataset += '- **Appointment Data:** All scheduled appointments with dates, times, and patient details\n';
  dataset += '- **Service Types:** Available appointment types and services offered\n';
  dataset += '- **Practice Locations:** All practice locations and addresses\n';
  dataset += '- **Treatment Records:** Patient treatment history and procedures\n\n';
  
  dataset += '## DATA ORGANIZATION\n\n';
  dataset += 'Each section below contains detailed information organized for easy analysis.\n';
  dataset += 'The AI can analyze patterns, trends, and relationships across all data types.\n\n';
  
  // Process each data file
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
      
      // Add section header
      dataset += `## ${file.entityType.toUpperCase().replace('_', ' ')} DATA\n\n`;
      dataset += `**Total Records:** ${records.length}\n`;
      dataset += `**Source File:** ${file.name}\n\n`;
      
      // Add records with proper spacing
      records.forEach((record, index) => {
        dataset += `### ${file.entityType.toUpperCase().replace('_', ' ')} #${index + 1}\n\n`;
        dataset += formatRecord(record) + '\n\n';
        
        // Add spacing between records
        if (index < records.length - 1) {
          dataset += '---\n\n';
        }
      });
      
      dataset += '\n';
      console.log(`✅ Added ${records.length} ${file.entityType} records`);
      
    } catch (error) {
      console.error(`❌ Error processing ${file.name}:`, error);
    }
  }
  
  // Add comprehensive analysis section
  dataset += '## ANALYSIS CAPABILITIES\n\n';
  dataset += 'This dataset enables comprehensive analysis including:\n\n';
  
  dataset += '### **PATIENT ANALYSIS**\n';
  dataset += '- Patient demographics and distribution\n';
  dataset += '- Patient appointment frequency and patterns\n';
  dataset += '- Patient retention and engagement metrics\n';
  dataset += '- Geographic distribution of patients\n\n';
  
  dataset += '### **APPOINTMENT ANALYSIS**\n';
  dataset += '- Peak hours and busy time analysis\n';
  dataset += '- Appointment scheduling patterns\n';
  dataset += '- Daily, weekly, and monthly trends\n';
  dataset += '- Appointment distribution across time slots\n\n';
  
  dataset += '### **OPERATIONAL ANALYSIS**\n';
  dataset += '- Practice capacity and utilization\n';
  dataset += '- Service demand and popularity\n';
  dataset += '- Location performance comparison\n';
  dataset += '- Resource allocation optimization\n\n';
  
  dataset += '### **BUSINESS INTELLIGENCE**\n';
  dataset += '- Growth trends and patterns\n';
  dataset += '- Revenue optimization opportunities\n';
  dataset += '- Patient acquisition insights\n';
  dataset += '- Operational efficiency metrics\n\n';
  
  // Add sample questions
  dataset += '## SAMPLE ANALYSIS QUESTIONS\n\n';
  dataset += 'The AI can answer questions like:\n\n';
  dataset += '- **"What are my busiest hours?"** - Analyze appointment time distribution\n';
  dataset += '- **"How many patients do I have?"** - Count total and unique patients\n';
  dataset += '- **"Show me today\'s schedule"** - Display appointments for specific dates\n';
  dataset += '- **"What services are most popular?"** - Analyze appointment type frequency\n';
  dataset += '- **"How is my practice performing?"** - Comprehensive performance analysis\n';
  dataset += '- **"What are my patient demographics?"** - Patient distribution and patterns\n';
  dataset += '- **"Which location is busiest?"** - Compare location performance\n';
  dataset += '- **"What trends do you see?"** - Identify patterns and insights\n\n';
  
  dataset += '## DATASET STATISTICS\n\n';
  dataset += `- **Total Records:** ${totalRecords}\n`;
  dataset += `- **Data Sources:** ${dataFiles.length} files\n`;
  dataset += `- **Generated:** ${new Date().toISOString()}\n`;
  dataset += `- **Coverage:** Complete practice data for comprehensive analysis\n\n`;
  
  dataset += '---\n\n';
  dataset += '*This dataset is optimized for AI analysis and provides comprehensive insights into practice operations.*\n';
  
  return dataset;
}

async function main() {
  try {
    const ultimateDataset = await createUltimateRAGDataset();
    
    const outputPath = '/Users/anishsuvarna/Downloads/opera copy/RAG-Data/ultimate-practice-dataset.txt';
    fs.writeFileSync(outputPath, ultimateDataset, 'utf8');
    
    const fileSize = (fs.statSync(outputPath).size / 1024 / 1024).toFixed(2);
    
    console.log('\n🎉 Successfully created ultimate RAG dataset!');
    console.log(`📁 Output file: ${outputPath}`);
    console.log(`📊 File size: ${fileSize} MB`);
    console.log(`📈 Total records: ${ultimateDataset.split('###').length - 1}`);
    
    // Show preview
    console.log('\n📋 Preview of ultimate dataset:');
    console.log(ultimateDataset.split('\n').slice(0, 50).join('\n'));
    console.log('\n... (dataset continues with all records) ...');
    
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
