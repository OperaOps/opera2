import axios from 'axios';

const API_URL = "https://connect-api.greyfinch.com/v1/graphql";
const API_KEY = process.env.GREYFINCH_API_KEY || "pk_user_pcK2+6R5H/DJiNLzZvW8dnydQ6UgLeP5";
const API_SECRET = process.env.GREYFINCH_API_SECRET || "sk_user_c1PDU7HA3KgnBJ1e3NomYcF6pd7j1ydB";

let accessToken: string | null = null;

async function getAccessToken(): Promise<string> {
  if (accessToken) return accessToken;
  
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
    headers: { 'Content-Type': 'application/json' },
    timeout: 30000
  });

  if (response.data.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(response.data.errors)}`);
  }

  accessToken = response.data.data.apiLogin.accessToken;
  return accessToken;
}

async function testEntity(entityName: string, fields: string[]): Promise<{ exists: boolean, recordCount: number, error?: string }> {
  try {
    const token = await getAccessToken();
    const fieldsStr = fields.join('\n      ');
    
    const query = `
      query test${entityName} {
        ${entityName}(limit: 5) {
          ${fieldsStr}
        }
      }
    `;
    
    const response = await axios.post(API_URL, {
      query
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      timeout: 30000
    });

    if (response.data.errors) {
      return { exists: false, recordCount: 0, error: response.data.errors[0].message };
    }

    const records = response.data.data?.[entityName] || [];
    return { exists: true, recordCount: records.length };
    
  } catch (error: any) {
    return { exists: false, recordCount: 0, error: error.message };
  }
}

async function main() {
  console.log('🔍 GREYFINCH API ENTITY DISCOVERY');
  console.log('==================================\n');

  const entitiesToTest = [
    { name: 'appointmentBookings', fields: ['id', 'createdAt', 'localStartDate'] },
    { name: 'patients', fields: ['id', 'createdAt', 'person { firstName lastName }'] },
    { name: 'appointmentTypes', fields: ['id', 'name'] },
    { name: 'locations', fields: ['id', 'name', 'address { city state }'] },
    { name: 'procedures', fields: ['id', 'procedureDate', 'procedureType'] },
    { name: 'providers', fields: ['id', 'name', 'specialty'] },
    { name: 'treatmentPlans', fields: ['id', 'patientId', 'status'] },
    { name: 'invoices', fields: ['id', 'patientId', 'amount', 'date'] },
    { name: 'payments', fields: ['id', 'invoiceId', 'amount', 'date'] },
    { name: 'tasks', fields: ['id', 'description', 'dueDate', 'status'] },
    { name: 'notes', fields: ['id', 'patientId', 'content', 'date'] },
    { name: 'staff', fields: ['id', 'name', 'role'] },
    { name: 'treatments', fields: ['id', 'name', 'category'] },
    { name: 'billing', fields: ['id', 'patientId', 'amount'] },
    { name: 'insurance', fields: ['id', 'patientId', 'provider', 'policyNumber'] },
    { name: 'appointments', fields: ['id', 'patientId', 'date', 'time'] },
    { name: 'schedules', fields: ['id', 'providerId', 'date', 'timeSlots'] },
    { name: 'rooms', fields: ['id', 'name', 'location'] },
    { name: 'equipment', fields: ['id', 'name', 'type', 'location'] },
    { name: 'inventory', fields: ['id', 'item', 'quantity', 'location'] }
  ];

  const results = [];
  
  for (const entity of entitiesToTest) {
    console.log(`Testing ${entity.name}...`);
    const result = await testEntity(entity.name, entity.fields);
    results.push({ ...entity, ...result });
    
    if (result.exists) {
      console.log(`  ✅ EXISTS - ${result.recordCount} records found`);
    } else {
      console.log(`  ❌ NOT FOUND - ${result.error || 'Unknown error'}`);
    }
    
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('\n📊 DISCOVERY RESULTS SUMMARY');
  console.log('============================');
  
  const availableEntities = results.filter(r => r.exists);
  const unavailableEntities = results.filter(r => !r.exists);
  
  console.log(`\n✅ AVAILABLE ENTITIES (${availableEntities.length}):`);
  availableEntities.forEach(entity => {
    console.log(`  - ${entity.name}: ${entity.recordCount} records`);
  });
  
  console.log(`\n❌ UNAVAILABLE ENTITIES (${unavailableEntities.length}):`);
  unavailableEntities.forEach(entity => {
    console.log(`  - ${entity.name}: ${entity.error}`);
  });
  
  console.log('\n🎯 RECOMMENDATIONS:');
  if (availableEntities.length > 0) {
    console.log('  Available entities that can be exported:');
    availableEntities.forEach(entity => {
      console.log(`    • ${entity.name} (${entity.recordCount} records)`);
    });
  } else {
    console.log('  No additional entities found beyond the ones already exported.');
  }
}

if (require.main === module) {
  main().catch(console.error);
}
