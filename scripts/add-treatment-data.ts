#!/usr/bin/env ts-node

const fs = require('fs').promises;
const path = require('path');

// Sample treatment data for different types of dental work
const TREATMENT_TYPES = [
  'Braces (Traditional)',
  'Invisalign',
  'Crown #14',
  'Crown #19', 
  'Filling #3',
  'Filling #12',
  'Root Canal #30',
  'Dental Implant #6',
  'Bridge #11-13',
  'Veneers #8-9',
  'Deep Cleaning (SRP)',
  'Wisdom Tooth Extraction',
  'Orthodontic Retainer',
  'Night Guard',
  'Dental Cleaning',
  'Fluoride Treatment'
];

const TREATMENT_STATUSES = [
  'Completed',
  'In Progress', 
  'Scheduled',
  'Follow-up Needed',
  'Maintenance'
];

const TREATMENT_DATES = [
  '2023-01-15',
  '2023-03-22',
  '2023-05-10',
  '2023-07-18',
  '2023-09-05',
  '2023-11-12',
  '2024-01-08',
  '2024-03-15',
  '2024-05-20',
  '2024-07-30'
];

// Generate realistic treatment associations
function generateTreatmentsForPatient(patientName: string, numTreatments: number = 1): string[] {
  const treatments: string[] = [];
  const shuffledTypes = [...TREATMENT_TYPES].sort(() => Math.random() - 0.5);
  const shuffledStatuses = [...TREATMENT_STATUSES].sort(() => Math.random() - 0.5);
  const shuffledDates = [...TREATMENT_DATES].sort(() => Math.random() - 0.5);
  
  for (let i = 0; i < numTreatments; i++) {
    const treatment = shuffledTypes[i % shuffledTypes.length];
    const status = shuffledStatuses[i % shuffledStatuses.length];
    const date = shuffledDates[i % shuffledDates.length];
    
    treatments.push(`Treatment: ${patientName} - ${treatment} (${status}) - ${date}`);
  }
  
  return treatments;
}

async function addTreatmentData() {
  try {
    const dataPath = path.resolve('/Users/anishsuvarna/Downloads/opera copy/practice-data.txt');
    const content = await fs.readFile(dataPath, 'utf8');
    
    console.log('📊 Reading practice data...');
    
    // Extract unique patient names from appointments
    const patientNames = new Set<string>();
    const lines = content.split('\n');
    
    lines.forEach((line: string) => {
      if (line.includes('Appointment:')) {
        const match = line.match(/Appointment:\s*(.+?)\s+on/);
        if (match) {
          patientNames.add(match[1]);
        }
      }
    });
    
    console.log(`👥 Found ${patientNames.size} unique patients`);
    
    // Convert to array and select patients for treatment data
    const patientArray = Array.from(patientNames);
    
    // Add treatment data for about 30% of patients (more realistic)
    const patientsWithTreatments = patientArray
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(patientArray.length * 0.3));
    
    console.log(`🦷 Adding treatments for ${patientsWithTreatments.length} patients...`);
    
    // Generate treatment data
    const treatmentLines: string[] = [];
    treatmentLines.push('\n# Patient Treatment History');
    treatmentLines.push('# Format: Treatment: Patient Name - Treatment Type (Status) - Date');
    
    patientsWithTreatments.forEach(patientName => {
      // 70% get 1 treatment, 20% get 2, 10% get 3
      const rand = Math.random();
      let numTreatments = 1;
      if (rand < 0.2) numTreatments = 2;
      else if (rand < 0.1) numTreatments = 3;
      
      const treatments = generateTreatmentsForPatient(patientName, numTreatments);
      treatmentLines.push(...treatments);
    });
    
    // Add some service definitions
    treatmentLines.push('\n# Available Services');
    treatmentLines.push('Service: Orthodontics - Braces, Invisalign, Retainers');
    treatmentLines.push('Service: Restorative - Crowns, Fillings, Bridges');
    treatmentLines.push('Service: Endodontics - Root Canals');
    treatmentLines.push('Service: Oral Surgery - Extractions, Implants');
    treatmentLines.push('Service: Cosmetic - Veneers, Whitening');
    treatmentLines.push('Service: Preventive - Cleanings, Fluoride, Exams');
    treatmentLines.push('Service: Periodontics - Deep Cleanings, Gum Treatment');
    
    // Append treatment data to the file
    const newContent = content + '\n' + treatmentLines.join('\n');
    
    await fs.writeFile(dataPath, newContent, 'utf8');
    
    console.log('✅ Treatment data added successfully!');
    console.log(`📈 Added ${treatmentLines.length - 8} treatment records`);
    console.log(`🩺 Added 7 service categories`);
    
    // Show some examples
    console.log('\n📋 Sample treatments added:');
    treatmentLines.slice(2, 7).forEach(line => {
      if (line.startsWith('Treatment:')) {
        console.log(`   ${line}`);
      }
    });
    
  } catch (error) {
    console.error('❌ Error adding treatment data:', error);
  }
}

// Run the script
addTreatmentData().catch(console.error);
