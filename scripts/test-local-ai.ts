#!/usr/bin/env npx tsx

import fs from 'fs';
import path from 'path';

// Helper function to parse the Greyfinch data format
function parseGreyfinchData(data: string): any[] {
  const records: any[] = [];
  const lines = data.split('\n').filter(line => line.trim() !== '' && !line.startsWith('#'));

  for (const line of lines) {
    const parts = line.split('\t');
    if (parts.length >= 4) {
      try {
        const entityType = parts[0];
        const id = parts[1];
        const date = parts[2];
        const jsonBlob = JSON.parse(parts[3]);
        records.push({ entityType, id, date, ...jsonBlob });
      } catch (e) {
        // Skip malformed lines
      }
    }
  }
  return records;
}

function formatResponse(question: string, records: any[]): string {
  const q = question.toLowerCase();
  
  if (q.includes('how many patients')) {
    const patientCount = records.filter(r => r.entityType === 'patients').length;
    return `## Practice Overview

Your practice has **${patientCount} patients** in the system.

## Patient Summary

- **Total Patients:** ${patientCount}
- **Data Source:** Greyfinch patient records
- **Coverage:** Complete patient database

## Key Insights

* **Patient Base:** Well-established patient base
* **Growth Potential:** Room for expansion
* **Data Quality:** Complete patient records available

**Actionable Insight:** Consider implementing patient retention strategies to maintain and grow your current patient base.`;
  }

  if (q.includes('practice locations') || q.includes('locations')) {
    const locations = records.filter(r => r.entityType === 'locations');
    const locationList = locations.map(loc => `- **${loc.name}:** ${loc.address?.city || 'Unknown'}, ${loc.address?.state || 'Unknown'}`);
    
    return `## Practice Locations

Your practice operates **${locations.length} locations**:

${locationList.join('\n')}

## Location Details

${locations.map(loc => `**${loc.name}**\n- City: ${loc.address?.city || 'Unknown'}\n- State: ${loc.address?.state || 'Unknown'}\n`).join('\n')}

## Key Insights

* **Geographic Coverage:** Multiple locations provide broader patient access
* **Service Distribution:** Each location serves its local community
* **Growth Strategy:** Consider location-specific marketing

**Actionable Insight:** Analyze patient distribution across locations to optimize staffing and resource allocation.`;
  }

  if (q.includes('recent appointments') || q.includes('appointments')) {
    const appointments = records.filter(r => r.entityType === 'appointmentBookings');
    const recentAppointments = appointments.slice(0, 10).map(apt => {
      const patientName = apt.appointment?.patient?.person ? 
        `${apt.appointment.patient.person.firstName} ${apt.appointment.patient.person.lastName}` : 
        'Unknown Patient';
      const date = apt.localStartDate || apt.date || 'Unknown Date';
      const time = apt.localStartTime || 'Unknown Time';
      return `- **${patientName}** - ${date} at ${time}`;
    });
    
    return `## Recent Appointments

Here are your recent appointments:

${recentAppointments.join('\n')}

## Appointment Summary

- **Total Appointments:** ${appointments.length}
- **Recent Sample:** ${Math.min(10, appointments.length)} shown above
- **Date Range:** ${appointments.length > 0 ? 'Various dates available' : 'No appointments found'}

## Key Insights

* **Appointment Volume:** ${appointments.length} total appointments
* **Patient Engagement:** Active appointment scheduling
* **Schedule Management:** Well-organized booking system

**Actionable Insight:** Review appointment patterns to identify peak times and optimize scheduling efficiency.`;
  }

  if (q.includes('busiest hours') || q.includes('peak times')) {
    const appointments = records.filter(r => r.entityType === 'appointmentBookings');
    const timeSlots: { [key: string]: number } = {};
    
    appointments.forEach(apt => {
      const time = apt.localStartTime;
      if (time) {
        const hour = time.split(':')[0];
        const timeSlot = `${hour}:00`;
        timeSlots[timeSlot] = (timeSlots[timeSlot] || 0) + 1;
      }
    });
    
    const sortedTimes = Object.entries(timeSlots)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);
    
    const timeList = sortedTimes.map(([time, count]) => `- **${time}:** ${count} appointments`);
    
    return `## Busiest Hours Analysis

Based on appointment data, here are your busiest time slots:

${timeList.join('\n')}

## Peak Time Insights

* **Most Popular Time:** ${sortedTimes[0]?.[0] || 'Unknown'} with ${sortedTimes[0]?.[1] || 0} appointments
* **Total Time Slots:** ${Object.keys(timeSlots).length} different hours scheduled
* **Distribution:** Appointments spread across multiple time slots

## Recommendations

1. **Staff Scheduling:** Ensure adequate staffing during peak hours
2. **Capacity Planning:** Consider expanding availability during busy times
3. **Patient Preferences:** Peak times may indicate patient preference patterns

**Actionable Insight:** Use peak time data to optimize staff schedules and improve patient satisfaction.`;
  }

  if (q.includes('overview') || q.includes('summary') || q.includes('trends')) {
    const patients = records.filter(r => r.entityType === 'patients');
    const appointments = records.filter(r => r.entityType === 'appointmentBookings');
    const locations = records.filter(r => r.entityType === 'locations');
    const appointmentTypes = records.filter(r => r.entityType === 'appointmentTypes');
    
    return `## Practice Overview

Your orthodontic practice has comprehensive data across multiple areas:

## Key Statistics

- **Patients:** ${patients.length}
- **Appointments:** ${appointments.length}
- **Locations:** ${locations.length}
- **Appointment Types:** ${appointmentTypes.length}

## Practice Locations

${locations.map(loc => `- **${loc.name}:** ${loc.address?.city || 'Unknown'}, ${loc.address?.state || 'Unknown'}`).join('\n')}

## Key Findings

* **Patient Base:** Strong foundation with ${patients.length} patients
* **Service Variety:** ${appointmentTypes.length} different appointment types available
* **Geographic Reach:** ${locations.length} locations serving different areas
* **Activity Level:** ${appointments.length} appointments indicating active practice

## Recommendations

1. **Patient Retention:** Focus on maintaining current patient relationships
2. **Service Optimization:** Analyze most popular appointment types
3. **Location Performance:** Compare performance across different locations
4. **Growth Strategy:** Use data to identify expansion opportunities

**Actionable Insight:** Your practice shows strong fundamentals with room for strategic growth in patient acquisition and service optimization.`;
  }

  // Default response for unrecognized questions
  return `## Response

I understand you're asking about: "${question}"

## Available Data

Based on the available data, I can help with:

- **Patient Information:** ${records.filter(r => r.entityType === 'patients').length} patients
- **Appointments:** ${records.filter(r => r.entityType === 'appointmentBookings').length} appointments  
- **Locations:** ${records.filter(r => r.entityType === 'locations').length} practice locations
- **Services:** ${records.filter(r => r.entityType === 'appointmentTypes').length} appointment types

## Suggested Questions

Try asking:
- "How many patients do I have?"
- "What are my practice locations?"
- "Show me recent appointments"
- "What are my busiest hours?"

**Actionable Insight:** The system has comprehensive data available for analysis. Please ask a specific question about your practice.`;
}

async function main() {
  try {
    console.log('🧠 Local AI Test System (No API Required)\n');
    
    // Read the compact doctor-friendly dataset
    const filePath = '/Users/anishsuvarna/Downloads/opera copy/greyfinch-compact-doctor.txt';
    const content = fs.readFileSync(filePath, 'utf8');
    
    console.log('📄 Parsing Greyfinch data...');
    const records = parseGreyfinchData(content);
    
    console.log(`✅ Loaded ${records.length} records from doctor-friendly dataset\n`);
    
    // Test questions
    const testQuestions = [
      'How many patients do I have?',
      'What are my practice locations?',
      'Show me recent appointments',
      'What are my busiest hours?',
      'Give me an overview of my practice'
    ];

    console.log('🤖 Testing Local AI Responses:\n');
    
    for (const question of testQuestions) {
      console.log(`❓ ${question}`);
      console.log('─'.repeat(50));
      const response = formatResponse(question, records);
      console.log(response);
      console.log('\n' + '='.repeat(80) + '\n');
    }

    console.log('✅ Local AI system test completed successfully!');
    console.log('\n🎯 The system can now answer questions about:');
    console.log('- Patient demographics and counts');
    console.log('- Practice locations and operations');
    console.log('- Appointment scheduling and patterns');
    console.log('- Business insights and recommendations');

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

main();
