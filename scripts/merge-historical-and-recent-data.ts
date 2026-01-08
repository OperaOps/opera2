#!/usr/bin/env ts-node

const fs = require('fs').promises;
const path = require('path');

async function mergeHistoricalAndRecentData() {
  try {
    console.log('🔄 Merging Historical (1999) and Recent (2024-2025) Data...');
    
    // Read the recent 2024-2025 data
    const recentDataPath = path.resolve(__dirname, '../recent-data-export/recent-practice-data-2024-2025.txt');
    const recentData = await fs.readFile(recentDataPath, 'utf8');
    
    // Read the original 1999 data files
    const historicalFiles = [
      '../greyfinchpatients.txt',
      '../greyfinchapptypes.txt', 
      '../greyfinchlocations.txt',
      '../greyfinchpatienttreatments.txt',
      '../greyfinchactualfinal.txt'
    ];
    
    let historicalData = '';
    let totalHistoricalRecords = 0;
    
    console.log('📚 Reading historical data files...');
    
    for (const file of historicalFiles) {
      const filePath = path.resolve(__dirname, file);
      try {
        const content = await fs.readFile(filePath, 'utf8');
        const lines = content.split('\n').filter((line: string) => line.trim());
        
        if (lines.length > 0) {
          const fileName = path.basename(file, '.txt');
          historicalData += `\n# ${fileName.replace('greyfinch', '').toUpperCase()} (1999 Data)\n`;
          historicalData += content + '\n';
          totalHistoricalRecords += lines.length;
          console.log(`✅ Added ${lines.length} records from ${fileName}`);
        }
      } catch (error: any) {
        console.log(`⚠️ Could not read ${file}: ${error.message}`);
      }
    }
    
    // Combine both datasets
    const combinedData = `# Combined Practice Data (1999 Historical + 2024-2025 Recent)
# Generated from Greyfinch Connect API
# Combined on: ${new Date().toISOString()}

# =============================================================================
# RECENT DATA (2024-2025) - Current Operations
# =============================================================================

${recentData}

# =============================================================================
# HISTORICAL DATA (1999) - Historical Analysis & Trends
# =============================================================================

${historicalData}

# =============================================================================
# SYSTEM CONTEXT FOR AI ASSISTANT
# =============================================================================

# This combined dataset contains:
# - Recent Data (2024-2025): ${recentData.split('\n').filter((line: string) => line.trim() && !line.startsWith('#')).length} records for current operations
# - Historical Data (1999): ${totalHistoricalRecords} records for trend analysis and historical insights
# - Total Records: ${recentData.split('\n').filter((line: string) => line.trim() && !line.startsWith('#')).length + totalHistoricalRecords}

# AI Instructions:
# - Use RECENT data (2024-2025) for current operations, today's schedule, recent patients
# - Use HISTORICAL data (1999) for trend analysis, long-term patterns, historical comparisons
# - When asked about "today" or "current", prioritize recent data
# - When asked about "trends" or "patterns", analyze both datasets
# - Provide context about data sources when relevant

# Data Quality:
# - Recent data: Real-time, current operations
# - Historical data: Comprehensive, trend analysis
# - Combined intelligence: Best of both worlds for comprehensive insights
`;

    // Write the combined dataset
    const outputPath = path.resolve(__dirname, '../practice-data.txt');
    await fs.writeFile(outputPath, combinedData, 'utf8');
    
    const recentRecords = recentData.split('\n').filter((line: string) => line.trim() && !line.startsWith('#')).length;
    const totalRecords = recentRecords + totalHistoricalRecords;
    
    console.log('✅ Data merge completed successfully!');
    console.log(`📊 Recent data (2024-2025): ${recentRecords} records`);
    console.log(`📚 Historical data (1999): ${totalHistoricalRecords} records`);
    console.log(`🎯 Total combined records: ${totalRecords}`);
    console.log(`📁 Output file: ${outputPath}`);
    
    // Show file size
    const stats = await fs.stat(outputPath);
    console.log(`📏 File size: ${Math.round(stats.size / 1024)} KB`);
    
    console.log('\n🎉 Combined dataset ready!');
    console.log('🤖 AI can now answer questions about:');
    console.log('   ✅ Current operations (2024-2025 data)');
    console.log('   ✅ Historical trends (1999 data)');
    console.log('   ✅ Comparative analysis (both datasets)');
    
  } catch (error) {
    console.error('❌ Error merging data:', error);
  }
}

// Run the merge
mergeHistoricalAndRecentData().catch(console.error);

