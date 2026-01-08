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
    sampleSize: 500
  },
  {
    name: 'greyfinchpatients.txt', 
    path: '/Users/anishsuvarna/Downloads/opera copy/greyfinchpatients.txt',
    entityType: 'patients',
    sampleSize: 200
  },
  {
    name: 'greyfinchapptypes.txt',
    path: '/Users/anishsuvarna/Downloads/opera copy/greyfinchapptypes.txt', 
    entityType: 'appointmentTypes',
    sampleSize: 50
  },
  {
    name: 'greyfinchlocations.txt',
    path: '/Users/anishsuvarna/Downloads/opera copy/greyfinchlocations.txt',
    entityType: 'locations',
    sampleSize: 10
  },
  {
    name: 'greyfinchpatienttreatments.txt',
    path: '/Users/anishsuvarna/Downloads/opera copy/greyfinchpatienttreatments.txt',
    entityType: 'patientTreatments',
    sampleSize: 300
  }
];

function sampleRecords(lines: string[], sampleSize: number): string[] {
  if (lines.length <= sampleSize) {
    return lines;
  }
  
  const step = Math.floor(lines.length / sampleSize);
  const sampled: string[] = [];
  
  for (let i = 0; i < lines.length && sampled.length < sampleSize; i += step) {
    sampled.push(lines[i]);
  }
  
  if (lines.length > 0 && !sampled.includes(lines[lines.length - 1])) {
    sampled.push(lines[lines.length - 1]);
  }
  
  return sampled;
}

async function createIntelligentDataset(): Promise<string> {
  console.log('🔄 Creating intelligent dataset with comprehensive context...');
  
  let combinedData = '';
  let totalRecords = 0;
  
  // Add comprehensive header with context
  combinedData += '# Opera AI Practice Management System - Complete Dataset\n';
  combinedData += `# Generated: ${new Date().toISOString()}\n`;
  combinedData += '# This dataset contains comprehensive practice data for AI analysis\n\n';
  
  combinedData += '## SYSTEM CONTEXT\n';
  combinedData += 'This is a dental/orthodontic practice management system with the following data types:\n';
  combinedData += '- APPOINTMENT_BOOKINGS: Patient appointments with dates, times, and details\n';
  combinedData += '- PATIENTS: Patient demographic and contact information\n';
  combinedData += '- APPOINTMENT_TYPES: Different types of services offered\n';
  combinedData += '- LOCATIONS: Practice locations and addresses\n';
  combinedData += '- PATIENT_TREATMENTS: Treatment records and procedures\n\n';
  
  combinedData += '## DATA FORMAT INSTRUCTIONS\n';
  combinedData += 'Each record follows this format: [ENTITY_TYPE] [ID] [DATE] [JSON_DATA]\n';
  combinedData += 'The AI should analyze this data to answer questions about:\n';
  combinedData += '- Practice performance and statistics\n';
  combinedData += '- Patient demographics and patterns\n';
  combinedData += '- Appointment scheduling and trends\n';
  combinedData += '- Business insights and recommendations\n';
  combinedData += '- Operational efficiency and optimization\n\n';
  
  for (const file of dataFiles) {
    try {
      console.log(`📄 Processing ${file.name}...`);
      
      if (!fs.existsSync(file.path)) {
        console.log(`⚠️  File not found: ${file.path}`);
        continue;
      }
      
      const content = fs.readFileSync(file.path, 'utf8');
      const lines = content.split('\n').filter(line => line.trim());
      
      const recordLines = lines.filter(line => 
        line.trim() && 
        !line.startsWith('#') && 
        !line.startsWith('Format:') &&
        !line.startsWith('Generated:') &&
        !line.startsWith('This export') &&
        !line.startsWith('##') &&
        !line.includes('Source:')
      );
      
      const sampledRecords = sampleRecords(recordLines, file.sampleSize);
      totalRecords += sampledRecords.length;
      
      // Add entity section with context
      combinedData += `## ${file.entityType.toUpperCase()}_DATA\n`;
      combinedData += `# Contains ${sampledRecords.length} records from ${file.name}\n`;
      combinedData += `# Use this data to analyze ${file.entityType} patterns and trends\n\n`;
      
      // Add the actual data
      combinedData += sampledRecords.join('\n') + '\n\n';
      
      console.log(`✅ Added ${sampledRecords.length} ${file.entityType} records`);
      
    } catch (error) {
      console.error(`❌ Error processing ${file.name}:`, error);
    }
  }
  
  // Add comprehensive summary and analysis instructions
  combinedData += '## ANALYSIS CAPABILITIES\n';
  combinedData += 'The AI can analyze this data to provide insights on:\n';
  combinedData += '- Practice growth and patient acquisition trends\n';
  combinedData += '- Appointment scheduling patterns and peak times\n';
  combinedData += '- Location performance and geographic distribution\n';
  combinedData += '- Service popularity and appointment type analysis\n';
  combinedData += '- Patient retention and treatment patterns\n';
  combinedData += '- Business metrics and operational efficiency\n';
  combinedData += '- Revenue optimization and capacity planning\n';
  combinedData += '- Staff scheduling and resource allocation\n\n';
  
  combinedData += '## RESPONSE FORMATTING GUIDELINES\n';
  combinedData += 'When answering questions, the AI should:\n';
  combinedData += '1. Use clear section headers with ## for main topics\n';
  combinedData += '2. Use bullet points (-) for lists and key findings\n';
  combinedData += '3. Use numbered lists (1., 2., 3.) for recommendations\n';
  combinedData += '4. Use **bold text** for emphasis and key statistics\n';
  combinedData += '5. Provide actionable insights and practical recommendations\n';
  combinedData += '6. Structure responses with clear sections and proper formatting\n';
  combinedData += '7. Always include relevant statistics and data-driven insights\n\n';
  
  combinedData += `## DATASET SUMMARY\n`;
  combinedData += `Total Records: ${totalRecords}\n`;
  combinedData += `Data Sources: ${dataFiles.length} files\n`;
  combinedData += `Generated: ${new Date().toISOString()}\n`;
  combinedData += `This comprehensive dataset enables detailed practice analysis and insights.\n`;
  
  return combinedData;
}

async function main() {
  try {
    const intelligentDataset = await createIntelligentDataset();
    
    const outputPath = '/Users/anishsuvarna/Downloads/opera copy/greyfinch-intelligent-rag.txt';
    fs.writeFileSync(outputPath, intelligentDataset, 'utf8');
    
    const fileSize = (fs.statSync(outputPath).size / 1024 / 1024).toFixed(2);
    
    console.log('\n🎉 Successfully created intelligent dataset!');
    console.log(`📁 Output file: ${outputPath}`);
    console.log(`📊 File size: ${fileSize} MB`);
    console.log(`📈 Total records: ${intelligentDataset.split('\n').filter(line => 
      line.trim() && 
      !line.startsWith('#') && 
      !line.startsWith('Format:') &&
      !line.startsWith('Generated:') &&
      !line.startsWith('This export') &&
      !line.startsWith('##') &&
      !line.includes('Source:') &&
      !line.includes('SYSTEM CONTEXT') &&
      !line.includes('DATA FORMAT') &&
      !line.includes('ANALYSIS CAPABILITIES') &&
      !line.includes('RESPONSE FORMATTING') &&
      !line.includes('DATASET SUMMARY')
    ).length}`);
    
    // Show preview
    console.log('\n📋 Preview of intelligent dataset:');
    console.log(intelligentDataset.split('\n').slice(0, 30).join('\n'));
    
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
