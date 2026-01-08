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
    entityType: 'appointmentBookings'
  },
  {
    name: 'greyfinchpatients.txt', 
    path: '/Users/anishsuvarna/Downloads/opera copy/greyfinchpatients.txt',
    entityType: 'patients'
  },
  {
    name: 'greyfinchapptypes.txt',
    path: '/Users/anishsuvarna/Downloads/opera copy/greyfinchapptypes.txt', 
    entityType: 'appointmentTypes'
  },
  {
    name: 'greyfinchlocations.txt',
    path: '/Users/anishsuvarna/Downloads/opera copy/greyfinchlocations.txt',
    entityType: 'locations'
  },
  {
    name: 'greyfinchpatienttreatments.txt',
    path: '/Users/anishsuvarna/Downloads/opera copy/greyfinchpatienttreatments.txt',
    entityType: 'patientTreatments'
  }
];

async function combineGreyfinchData(): Promise<string> {
  console.log('🔄 Combining all Greyfinch data files for RAG...');
  
  let combinedData = '';
  let totalRecords = 0;
  
  // Add header information
  combinedData += '# Greyfinch Complete Data Export for RAG\n';
  combinedData += `# Generated: ${new Date().toISOString()}\n`;
  combinedData += '# This file contains ALL available Greyfinch data for AI analysis\n\n';
  
  for (const file of dataFiles) {
    try {
      console.log(`📄 Processing ${file.name}...`);
      
      if (!fs.existsSync(file.path)) {
        console.log(`⚠️  File not found: ${file.path}`);
        continue;
      }
      
      const content = fs.readFileSync(file.path, 'utf8');
      const lines = content.split('\n').filter(line => line.trim());
      
      // Count records (excluding header lines)
      const recordLines = lines.filter(line => 
        line.trim() && 
        !line.startsWith('#') && 
        !line.startsWith('Format:') &&
        !line.startsWith('Generated:') &&
        !line.startsWith('This export')
      );
      
      totalRecords += recordLines.length;
      
      // Add section header
      combinedData += `\n## ${file.entityType.toUpperCase()} DATA (${recordLines.length} records)\n`;
      combinedData += `# Source: ${file.name}\n\n`;
      
      // Add the actual data
      combinedData += content + '\n\n';
      
      console.log(`✅ Added ${recordLines.length} ${file.entityType} records`);
      
    } catch (error) {
      console.error(`❌ Error processing ${file.name}:`, error);
    }
  }
  
  // Add summary
  combinedData += `\n## SUMMARY\n`;
  combinedData += `# Total Records: ${totalRecords}\n`;
  combinedData += `# Data Sources: ${dataFiles.length}\n`;
  combinedData += `# Generated: ${new Date().toISOString()}\n`;
  
  return combinedData;
}

async function main() {
  try {
    const combinedData = await combineGreyfinchData();
    
    const outputPath = '/Users/anishsuvarna/Downloads/opera copy/greyfinch-complete-rag.txt';
    fs.writeFileSync(outputPath, combinedData, 'utf8');
    
    const fileSize = (fs.statSync(outputPath).size / 1024 / 1024).toFixed(2);
    
    console.log('\n🎉 Successfully combined all Greyfinch data!');
    console.log(`📁 Output file: ${outputPath}`);
    console.log(`📊 File size: ${fileSize} MB`);
    console.log(`📈 Total records: ${combinedData.split('\n').filter(line => 
      line.trim() && 
      !line.startsWith('#') && 
      !line.startsWith('Format:') &&
      !line.startsWith('Generated:') &&
      !line.startsWith('This export')
    ).length}`);
    
    // Show first few lines as preview
    console.log('\n📋 Preview of combined data:');
    console.log(combinedData.split('\n').slice(0, 20).join('\n'));
    
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
