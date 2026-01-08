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
    sampleSize: 15000 // Larger sample for production
  },
  {
    name: 'greyfinchpatients.txt', 
    path: '/Users/anishsuvarna/Downloads/opera copy/greyfinchpatients.txt',
    entityType: 'patients',
    sampleSize: 3000 // Larger sample
  },
  {
    name: 'greyfinchapptypes.txt',
    path: '/Users/anishsuvarna/Downloads/opera copy/greyfinchapptypes.txt', 
    entityType: 'appointmentTypes',
    sampleSize: 100 // Most appointment types
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
    sampleSize: 8000 // Larger sample for treatments
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

async function createProductionRAGSample(): Promise<string> {
  console.log('🔄 Creating production RAG sample with larger dataset...');
  
  let combinedData = '';
  let totalRecords = 0;
  
  // Add header information
  combinedData += '# Greyfinch Production RAG Sample\n';
  combinedData += `# Generated: ${new Date().toISOString()}\n`;
  combinedData += '# This file contains a production-optimized sample of ALL Greyfinch data\n';
  combinedData += '# Balanced for comprehensive coverage while staying within API limits\n\n';
  
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
      combinedData += `\n## ${file.entityType.toUpperCase()} DATA (${sampledRecords.length} sampled from ${recordLines.length} total records)\n`;
      combinedData += `# Source: ${file.name}\n\n`;
      
      // Add the sampled data
      combinedData += sampledRecords.join('\n') + '\n\n';
      
      console.log(`✅ Added ${sampledRecords.length} ${file.entityType} records (sampled from ${recordLines.length})`);
      
    } catch (error) {
      console.error(`❌ Error processing ${file.name}:`, error);
    }
  }
  
  // Add summary
  combinedData += `\n## SUMMARY\n`;
  combinedData += `# Total Sampled Records: ${totalRecords}\n`;
  combinedData += `# Data Sources: ${dataFiles.length}\n`;
  combinedData += `# Generated: ${new Date().toISOString()}\n`;
  combinedData += `# This production sample provides comprehensive coverage with optimal performance\n`;
  
  return combinedData;
}

async function main() {
  try {
    const productionSample = await createProductionRAGSample();
    
    const outputPath = '/Users/anishsuvarna/Downloads/opera copy/greyfinch-production-rag.txt';
    fs.writeFileSync(outputPath, productionSample, 'utf8');
    
    const fileSize = (fs.statSync(outputPath).size / 1024 / 1024).toFixed(2);
    
    console.log('\n🎉 Successfully created production RAG sample!');
    console.log(`📁 Output file: ${outputPath}`);
    console.log(`📊 File size: ${fileSize} MB`);
    console.log(`📈 Total sampled records: ${productionSample.split('\n').filter(line => 
      line.trim() && 
      !line.startsWith('#') && 
      !line.startsWith('Format:') &&
      !line.startsWith('Generated:') &&
      !line.startsWith('This export') &&
      !line.startsWith('##') &&
      !line.includes('Source:')
    ).length}`);
    
    // Show first few lines as preview
    console.log('\n📋 Preview of production sample:');
    console.log(productionSample.split('\n').slice(0, 20).join('\n'));
    
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
