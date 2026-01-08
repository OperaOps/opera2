#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

async function extractRateLimitedData() {
  try {
    console.log('🚀 Starting RATE-LIMITED extraction (100 requests/minute)...');
    console.log('⏱️  This will respect Greyfinch API limits and get ALL your data!\n');
    
    const response = await fetch('http://localhost:3000/api/greyfinch/extract-rate-limited');
    const result = await response.json();
    
    if (result.success) {
      console.log('🎉 SUCCESS! Complete dataset extracted:');
      console.log(`📅 Total Appointments: ${result.totalAppointments}`);
      console.log(`🏥 Appointment Types: ${result.appointmentTypes}`);
      console.log(`📍 Practice Locations: ${result.locations}`);
      
      console.log('\n📊 Date Distribution:');
      Object.entries(result.dateDistribution).sort().forEach(([year, count]) => {
        console.log(`   ${year}: ${count} appointments`);
      });
      
      // Save to text file
      const outputPath = path.join(__dirname, 'greyfinch-complete-all-appointments.txt');
      fs.writeFileSync(outputPath, result.textOutput, 'utf8');
      
      console.log(`\n💾 Complete dataset saved to: ${outputPath}`);
      console.log('\n🎉 ALL appointments extracted successfully!');
    } else {
      console.error('❌ Extraction failed:', result.error);
    }
  } catch (error) {
    console.error('❌ Error during extraction:', error.message);
  }
}

extractRateLimitedData();


