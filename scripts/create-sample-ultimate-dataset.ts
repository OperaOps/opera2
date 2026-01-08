#!/usr/bin/env npx tsx

import fs from 'fs';
import path from 'path';

async function createSampleUltimateDataset(): Promise<void> {
  console.log('🔄 Creating sample of ultimate RAG dataset for testing...');
  
  const fullDatasetPath = '/Users/anishsuvarna/Downloads/opera copy/RAG-Data/ultimate-practice-dataset.txt';
  const sampleDatasetPath = '/Users/anishsuvarna/Downloads/opera copy/RAG-Data/sample-ultimate-dataset.txt';
  
  try {
    const fullContent = fs.readFileSync(fullDatasetPath, 'utf8');
    const lines = fullContent.split('\n');
    
    // Take first 5000 lines (header + sample data)
    const sampleLines = lines.slice(0, 5000);
    const sampleContent = sampleLines.join('\n');
    
    // Add note about sampling
    const sampleNote = `\n\n---\n\n**NOTE:** This is a sample of the full dataset containing ${lines.length} total lines. The full dataset has 324,129 records. This sample contains the first ${sampleLines.length} lines for testing purposes.\n\n`;
    
    fs.writeFileSync(sampleDatasetPath, sampleContent + sampleNote, 'utf8');
    
    const sampleSize = (fs.statSync(sampleDatasetPath).size / 1024).toFixed(2);
    const fullSize = (fs.statSync(fullDatasetPath).size / 1024 / 1024).toFixed(2);
    
    console.log('\n🎉 Successfully created sample dataset!');
    console.log(`📁 Sample file: ${sampleDatasetPath}`);
    console.log(`📊 Sample size: ${sampleSize} KB`);
    console.log(`📈 Sample lines: ${sampleLines.length}`);
    console.log(`📊 Full dataset size: ${fullSize} MB`);
    console.log(`📈 Full dataset lines: ${lines.length}`);
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

if (require.main === module) {
  createSampleUltimateDataset();
}
