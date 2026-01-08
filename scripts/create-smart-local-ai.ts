#!/usr/bin/env npx tsx

import fs from 'fs';
import path from 'path';

interface PracticeData {
  patients: any[];
  appointments: any[];
  locations: any[];
  appointmentTypes: any[];
  treatments: any[];
}

function analyzePracticeData(records: any[]): PracticeData {
  const data: PracticeData = {
    patients: records.filter(r => r.entityType === 'patients'),
    appointments: records.filter(r => r.entityType === 'appointmentBookings'),
    locations: records.filter(r => r.entityType === 'locations'),
    appointmentTypes: records.filter(r => r.entityType === 'appointmentTypes'),
    treatments: records.filter(r => r.entityType === 'patientTreatments')
  };
  
  return data;
}

function generateSmartResponse(question: string, data: PracticeData): string {
  const q = question.toLowerCase();
  
  // Time analysis
  const timeSlots: { [key: string]: number } = {};
  data.appointments.forEach(apt => {
    const time = apt.localStartTime;
    if (time) {
      const hour = time.split(':')[0];
      const timeSlot = `${hour}:00`;
      timeSlots[timeSlot] = (timeSlots[timeSlot] || 0) + 1;
    }
  });
  
  const sortedTimes = Object.entries(timeSlots).sort(([,a], [,b]) => b - a).slice(0, 5);
  
  // Date analysis
  const today = new Date().toISOString().split('T')[0];
  const todayAppointments = data.appointments.filter(apt => apt.localStartDate === today);
  
  // Patient analysis
  const uniquePatients = new Set();
  data.patients.forEach(patient => {
    if (patient.person?.firstName && patient.person?.lastName) {
      uniquePatients.add(`${patient.person.firstName} ${patient.person.lastName}`);
    }
  });
  
  // Appointment type analysis
  const uniqueAppointmentTypes = new Set();
  data.appointmentTypes.forEach(type => {
    if (type.name) {
      uniqueAppointmentTypes.add(type.name);
    }
  });
  
  // Location analysis
  const locationNames = data.locations.map(loc => loc.name).filter(name => name);
  
  // Smart response generation
  if (q.includes('today') && (q.includes('schedule') || q.includes('appointment'))) {
    if (todayAppointments.length > 0) {
      const todaySchedule = todayAppointments.map(apt => {
        const patientName = apt.appointment?.patient?.person ? 
          `${apt.appointment.patient.person.firstName} ${apt.appointment.patient.person.lastName}` : 
          'Unknown Patient';
        const time = apt.localStartTime || 'Unknown Time';
        return `- **${patientName}** at ${time}`;
      });
      
      return `## Today's Schedule

You have **${todayAppointments.length} appointments** scheduled for today:

${todaySchedule.join('\n')}

## Today's Insights

* **Appointment Volume:** ${todayAppointments.length} patients scheduled
* **Time Distribution:** Appointments spread throughout the day
* **Patient Load:** Manageable schedule for quality care

## Recommendations

1. **Time Management:** Ensure adequate time between appointments
2. **Patient Preparation:** Review patient files before each appointment
3. **Staff Coordination:** Brief team on today's schedule
4. **Contingency Planning:** Allow buffer time for unexpected delays

**Actionable Insight:** With ${todayAppointments.length} appointments today, focus on efficient patient flow and quality care delivery.`;
    } else {
      return `## Today's Schedule

You have **no appointments** scheduled for today.

## Schedule Analysis

- **Today's Appointments:** 0
- **Available Slots:** Full day available
- **Opportunity:** Consider scheduling follow-ups or new patients

## Recommendations

1. **Follow-up Calls:** Reach out to patients who missed appointments
2. **Administrative Tasks:** Use time for practice management
3. **Marketing Activities:** Focus on patient acquisition
4. **Training:** Staff development and education

**Actionable Insight:** Use this free day for practice improvement activities and patient outreach.`;
    }
  }
  
  if (q.includes('how many patients')) {
    return `## Patient Count Analysis

Your practice currently serves **${data.patients.length} patients**.

## Patient Base Breakdown

- **Total Active Patients:** ${data.patients.length}
- **Unique Patient Names:** ${uniquePatients.size}
- **Geographic Distribution:** Across ${data.locations.length} locations
- **Appointment History:** ${data.appointments.length} total bookings

## Patient Insights

* **Growth Potential:** ${data.patients.length} patients provide referral opportunities
* **Retention Rate:** ${data.appointments.length} appointments indicate strong engagement
* **Service Utilization:** Average ${data.appointments.length > 0 ? Math.round(data.appointments.length / data.patients.length) : 0} appointments per patient
* **Location Coverage:** Patients distributed across ${data.locations.length} practice sites

## Growth Strategies

1. **Referral Programs:** Leverage ${data.patients.length} satisfied patients
2. **Retention Focus:** Maintain high appointment volume
3. **Service Expansion:** Add new appointment types based on patient needs
4. **Location Optimization:** Maximize utilization across all ${data.locations.length} sites

**Actionable Insight:** With ${data.patients.length} patients and strong appointment volume, focus on retention and referral programs to grow your practice.`;
  }
  
  if (q.includes('busiest hours') || q.includes('peak times')) {
    return `## Peak Hours Analysis

Based on ${data.appointments.length} appointment records, here are your busiest time slots:

${sortedTimes.map(([time, count]) => `- **${time}:** ${count} appointments`).join('\n')}

## Peak Time Insights

* **Most Popular Time:** ${sortedTimes[0]?.[0] || 'Unknown'} with ${sortedTimes[0]?.[1] || 0} appointments
* **Total Active Hours:** ${Object.keys(timeSlots).length} different time slots scheduled
* **Distribution Pattern:** ${sortedTimes.length > 0 ? 'Concentrated peak times' : 'Evenly distributed'}

## Staffing Recommendations

1. **Peak Hour Coverage:** Ensure adequate staffing during ${sortedTimes[0]?.[0] || 'busy periods'}
2. **Capacity Planning:** Consider extending availability during high-demand times
3. **Patient Scheduling:** Optimize appointment distribution to reduce wait times
4. **Resource Allocation:** Align staff schedules with appointment volume patterns

**Actionable Insight:** Focus staffing resources on ${sortedTimes[0]?.[0] || 'peak hours'} when ${sortedTimes[0]?.[1] || 0} appointments typically occur. Consider offering premium slots during off-peak times.`;
  }
  
  if (q.includes('appointments') && !q.includes('today')) {
    const recentAppointments = data.appointments.slice(0, 10).map(apt => {
      const patientName = apt.appointment?.patient?.person ? 
        `${apt.appointment.patient.person.firstName} ${apt.appointment.patient.person.lastName}` : 
        'Unknown Patient';
      const date = apt.localStartDate || 'Unknown Date';
      const time = apt.localStartTime || 'Unknown Time';
      return `- **${patientName}** - ${date} at ${time}`;
    });
    
    return `## Appointment Analysis

Here are your recent appointments from the dataset:

${recentAppointments.join('\n')}

## Appointment Metrics

- **Total Appointments:** ${data.appointments.length}
- **Sample Shown:** ${Math.min(10, data.appointments.length)} recent bookings
- **Average Volume:** ${data.appointments.length > 0 ? Math.round(data.appointments.length / 30) : 0} appointments per month
- **Time Slots Used:** ${Object.keys(timeSlots).length} different hours

## Scheduling Insights

* **Patient Engagement:** ${data.appointments.length} appointments show active patient care
* **Time Distribution:** Appointments spread across ${Object.keys(timeSlots).length} time slots
* **Peak Utilization:** ${sortedTimes[0]?.[0] || 'Various times'} most popular
* **Service Demand:** ${uniqueAppointmentTypes.size} appointment types available

## Optimization Recommendations

1. **Schedule Efficiency:** Analyze ${Object.keys(timeSlots).length} time slots for optimization
2. **Patient Flow:** Review appointment patterns for wait time reduction
3. **Capacity Management:** Monitor peak hours for resource allocation
4. **Service Mix:** Evaluate ${uniqueAppointmentTypes.size} appointment types for demand

**Actionable Insight:** With ${data.appointments.length} appointments, focus on optimizing peak hour scheduling and reducing patient wait times through better capacity planning.`;
  }
  
  if (q.includes('overview') || q.includes('summary') || q.includes('practice')) {
    return `## Practice Overview

Your orthodontic practice demonstrates strong operational metrics across multiple dimensions.

## Key Statistics

- **Total Patients:** ${data.patients.length}
- **Appointment Volume:** ${data.appointments.length} bookings
- **Service Locations:** ${data.locations.length} practice sites
- **Service Types:** ${uniqueAppointmentTypes.size} appointment categories
- **Treatment Records:** ${data.treatments.length} procedures

## Practice Locations

${locationNames.map(name => `- **${name}**`).join('\n')}

## Operational Insights

* **Patient Base:** Strong foundation with ${data.patients.length} active patients
* **Service Diversity:** ${uniqueAppointmentTypes.size} different appointment types indicating comprehensive care
* **Geographic Reach:** ${data.locations.length} locations providing broad market coverage
* **Activity Level:** ${data.appointments.length} appointments showing active patient engagement

## Performance Metrics

- **Peak Hours:** ${sortedTimes[0]?.[0] || 'Not available'} with ${sortedTimes[0]?.[1] || 0} appointments
- **Average Daily Volume:** ${data.appointments.length > 0 ? Math.round(data.appointments.length / 365) : 0} appointments per day
- **Patient Utilization:** ${data.appointments.length > 0 ? Math.round(data.appointments.length / data.patients.length) : 0} appointments per patient

## Strategic Recommendations

1. **Patient Retention:** Leverage ${data.patients.length} patient base for referral programs
2. **Capacity Optimization:** Analyze peak hour patterns for staffing efficiency
3. **Service Expansion:** Consider additional appointment types based on demand
4. **Location Performance:** Compare metrics across ${data.locations.length} locations

**Actionable Insight:** Your practice shows healthy growth indicators with ${data.patients.length} patients and ${data.appointments.length} appointments. Focus on optimizing peak hour utilization and expanding high-demand services.`;
  }
  
  // Default dynamic response
  return `## Practice Analysis

Based on your question "${question}", here's what I found in your practice data:

## Current Practice Status

- **Patient Base:** ${data.patients.length} patients across ${data.locations.length} locations
- **Appointment Volume:** ${data.appointments.length} bookings with ${Object.keys(timeSlots).length} time slots
- **Service Portfolio:** ${uniqueAppointmentTypes.size} appointment types
- **Treatment Activity:** ${data.treatments.length} treatment records

## Key Insights

* **Operational Scale:** ${data.patients.length} patients with ${data.appointments.length} appointments indicates healthy practice
* **Service Diversity:** ${uniqueAppointmentTypes.size} appointment types show comprehensive care offerings
* **Geographic Reach:** ${data.locations.length} locations provide broad market coverage
* **Activity Level:** Strong appointment volume suggests good patient engagement

## Available Analysis

I can help you analyze:
- **Scheduling Patterns:** Peak hours and time distribution
- **Patient Demographics:** Patient count and utilization
- **Service Performance:** Appointment types and locations
- **Today's Operations:** Current day schedule and activities

**Actionable Insight:** Your practice shows strong fundamentals with ${data.patients.length} patients and ${data.appointments.length} appointments. Ask me about specific aspects like today's schedule, busiest hours, or patient analysis for detailed insights.`;
}

async function main() {
  try {
    console.log('🧠 Testing Smart Local AI System\n');
    
    // Read the intelligent dataset
    const filePath = '/Users/anishsuvarna/Downloads/opera copy/greyfinch-intelligent-rag.txt';
    const content = fs.readFileSync(filePath, 'utf8');
    
    console.log('📄 Parsing Greyfinch data...');
    
    // Parse the data (simplified version of the parsing function)
    const records: any[] = [];
    const lines = content.split('\n').filter(line => line.trim() !== '' && !line.startsWith('#'));
    
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
          // Skip invalid lines
        }
      }
    }
    
    console.log(`📊 Loaded ${records.length} records for analysis\n`);
    
    // Analyze the data
    const data = analyzePracticeData(records);
    
    // Test questions
    const testQuestions = [
      "What's today's schedule?",
      "How many patients do I have?",
      "What are my busiest hours?",
      "Show me recent appointments",
      "Give me an overview of my practice"
    ];
    
    console.log('🤖 Smart Local AI Test Results:\n');
    
    for (const question of testQuestions) {
      console.log(`❓ ${question}`);
      const answer = generateSmartResponse(question, data);
      console.log(answer);
      console.log('\n' + '='.repeat(80) + '\n');
    }
    
    console.log('✅ Smart local AI system test completed successfully!');
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

if (require.main === module) {
  main();
}
