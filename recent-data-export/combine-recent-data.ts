#!/usr/bin/env ts-node

const fs = require('fs').promises;
const path = require('path');

async function combineRecentData() {
  try {
    console.log('🔄 Combining recent data files (2024-2025)...');
    
    const dataDir = __dirname;
    const outputFile = path.resolve(dataDir, 'recent-practice-data-2024-2025.txt');
    
    // List of files to combine
    const filesToCombine = [
      'recent-appointments-2024-2025.txt',
      'recent-patients-2024-2025.txt', 
      'recent-locations-2024-2025.txt',
      'recent-appointment-types-2024-2025.txt'
    ];
    
    let combinedContent = '# Recent Practice Data (2024-2025)\n';
    combinedContent += '# Generated from Greyfinch Connect API\n';
    combinedContent += `# Combined on: ${new Date().toISOString()}\n\n`;
    
    let totalRecords = 0;
    
    for (const filename of filesToCombine) {
      const filePath = path.resolve(dataDir, filename);
      
      try {
        const content = await fs.readFile(filePath, 'utf8');
        const lines = content.split('\n').filter((line: string) => line.trim());
        
        if (lines.length > 0) {
          combinedContent += `\n# ${filename.replace('-2024-2025.txt', '').replace('-', ' ').toUpperCase()}\n`;
          combinedContent += content + '\n';
          totalRecords += lines.length;
          console.log(`✅ Added ${lines.length} records from ${filename}`);
        } else {
          console.log(`⚠️ No data found in ${filename}`);
        }
      } catch (error) {
        console.log(`⚠️ Could not read ${filename}: ${(error as any).message}`);
      }
    }
    
    // Add intelligent insights section
    combinedContent += '\n\n# Intelligent Data Analysis\n';
    combinedContent += `# Total Records: ${totalRecords}\n`;
    combinedContent += `# Data Period: 2024-2025\n`;
    combinedContent += `# Generated: ${new Date().toISOString()}\n\n`;
    
    // Add system context for AI
    combinedContent += '# System Context for AI Assistant\n';
    combinedContent += '# This data contains recent practice information from 2024-2025\n';
    combinedContent += '# Use this for current operations, recent trends, and up-to-date insights\n';
    combinedContent += '# Format: Entity: Details - Additional Info\n\n';
    
    // Write combined file
    await fs.writeFile(outputFile, combinedContent, 'utf8');
    
    console.log('✅ Recent data combination completed!');
    console.log(`📊 Total records: ${totalRecords}`);
    console.log(`📁 Output file: ${outputFile}`);
    
    // Show file sizes
    const stats = await fs.stat(outputFile);
    console.log(`📏 File size: ${Math.round(stats.size / 1024)} KB`);
    
  } catch (error) {
    console.error('❌ Error combining recent data:', error);
  }
}

// Run the combination
combineRecentData().catch(console.error);
