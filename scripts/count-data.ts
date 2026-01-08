#!/usr/bin/env tsx

/**
 * Greyfinch Data Count Script
 * 
 * Counts the total number of records in each entity type without downloading the actual data.
 * 
 * Usage:
 * npx tsx scripts/count-data.ts
 */

import axios from 'axios';

const API_URL = "https://connect-api.greyfinch.com/v1/graphql";
const API_KEY = process.env.GREYFINCH_API_KEY || "pk_user_pcK2+6R5H/DJiNLzZvW8dnydQ6UgLeP5";
const API_SECRET = process.env.GREYFINCH_API_SECRET || "sk_user_c1PDU7HA3KgnBJ1e3NomYcF6pd7j1ydB";

async function getAccessToken(): Promise<string> {
  const mutation = `
    mutation login($key: String!, $secret: String!) {
      apiLogin(key: $key, secret: $secret) {
        accessToken
        accessTokenExpiresIn
        status
      }
    }
  `;
  
  const response = await axios.post(API_URL, {
    query: mutation,
    variables: { key: API_KEY, secret: API_SECRET }
  }, {
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.data.errors) {
    throw new Error(`Login failed: ${JSON.stringify(response.data.errors)}`);
  }
  
  return response.data.data.apiLogin.accessToken;
}

async function makeRequest(query: string): Promise<any> {
  const accessToken = await getAccessToken();
  
  const response = await axios.post(API_URL, {
    query
  }, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });

  if (response.data.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(response.data.errors)}`);
  }

  return response.data.data;
}

async function countRecords(entityName: string, query: string): Promise<number> {
  console.log(`📊 Counting ${entityName}...`);
  let offset = 0;
  const limit = 100; // Use larger limit for counting
  let totalCount = 0;
  let hasMore = true;
  let batchCount = 0;

  while (hasMore) {
    batchCount++;
    
    // Add pagination parameters to the query
    const paginatedQuery = query.replace(
      `${entityName} {`, 
      `${entityName}(limit: ${limit}, offset: ${offset}) {`
    );
    
    try {
      const data = await makeRequest(paginatedQuery);
      const records = data[entityName] || [];
      
      if (records.length === 0) {
        hasMore = false;
      } else {
        totalCount += records.length;
        offset += limit;
        
        console.log(`  📄 Batch ${batchCount}: Found ${records.length} records (total so far: ${totalCount})`);
        
        // If we got fewer records than requested, we've reached the end
        if (records.length < limit) {
          hasMore = false;
        }
        
        // Small delay between requests
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    } catch (error) {
      console.error(`❌ Error counting ${entityName} batch ${batchCount}:`, error);
      throw error;
    }
  }
  
  console.log(`✅ Total ${entityName}: ${totalCount}`);
  return totalCount;
}

async function countAllData() {
  console.log('🚀 Starting Greyfinch Data Count...\n');
  
  const results = {};

  try {
    // Count Appointment Bookings
    const appointmentQuery = `
      query {
        appointmentBookings {
          id
        }
      }
    `;
    results['appointmentBookings'] = await countRecords('appointmentBookings', appointmentQuery);

    // Count Patients
    const patientQuery = `
      query {
        patients {
          id
        }
      }
    `;
    results['patients'] = await countRecords('patients', patientQuery);

    // Count Providers (if available)
    try {
      const providerQuery = `
        query {
          providers {
            id
          }
        }
      `;
      results['providers'] = await countRecords('providers', providerQuery);
    } catch (error) {
      console.log('⚠️  Providers not available or accessible');
      results['providers'] = 0;
    }

    // Count Treatment Plans (if available)
    try {
      const treatmentPlanQuery = `
        query {
          treatmentPlans {
            id
          }
        }
      `;
      results['treatmentPlans'] = await countRecords('treatmentPlans', treatmentPlanQuery);
    } catch (error) {
      console.log('⚠️  Treatment Plans not available or accessible');
      results['treatmentPlans'] = 0;
    }

    // Count Procedures (if available)
    try {
      const procedureQuery = `
        query {
          procedures {
            id
          }
        }
      `;
      results['procedures'] = await countRecords('procedures', procedureQuery);
    } catch (error) {
      console.log('⚠️  Procedures not available or accessible');
      results['procedures'] = 0;
    }

    // Generate summary report
    console.log('\n🎉 Data Count Complete!\n');
    console.log('📊 GREYFINCH DATA SUMMARY:');
    console.log('='.repeat(50));
    
    let grandTotal = 0;
    for (const [entity, count] of Object.entries(results)) {
      console.log(`${entity.padEnd(20)}: ${count.toLocaleString()} records`);
      grandTotal += count;
    }
    
    console.log('='.repeat(50));
    console.log(`TOTAL RECORDS: ${grandTotal.toLocaleString()}`);
    console.log('='.repeat(50));

    // Save summary to file
    const summaryFile = 'greyfinch-data-summary.txt';
    const summary = [
      '# Greyfinch Data Summary',
      `# Generated: ${new Date().toISOString()}`,
      '',
      'ENTITY COUNTS:',
      ...Object.entries(results).map(([entity, count]) => `${entity}: ${count} records`),
      '',
      `TOTAL RECORDS: ${grandTotal}`,
      '',
      'This summary shows the total number of records available for export from each entity type.'
    ].join('\n');

    require('fs').writeFileSync(summaryFile, summary);
    console.log(`\n📄 Summary saved to: ${summaryFile}`);
    
  } catch (error) {
    console.error('❌ Count failed:', error);
    process.exit(1);
  }
}

countAllData();
