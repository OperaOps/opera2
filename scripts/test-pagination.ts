#!/usr/bin/env tsx

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

async function testPagination() {
  try {
    const accessToken = await getAccessToken();
    console.log('✅ Authentication successful');
    
    // Test 1: Default query (should get 20)
    console.log('\n📊 Test 1: Default query (no limit/offset)');
    const query1 = `
      query {
        appointmentBookings {
          id
          localStartDate
        }
      }
    `;

    const response1 = await axios.post(API_URL, {
      query: query1
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    console.log(`Got ${response1.data.data.appointmentBookings.length} records`);

    // Test 2: With limit 5
    console.log('\n📊 Test 2: With limit 5');
    const query2 = `
      query {
        appointmentBookings(limit: 5) {
          id
          localStartDate
        }
      }
    `;

    const response2 = await axios.post(API_URL, {
      query: query2
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    console.log(`Got ${response2.data.data.appointmentBookings.length} records`);

    // Test 3: With limit 100
    console.log('\n📊 Test 3: With limit 100');
    const query3 = `
      query {
        appointmentBookings(limit: 100) {
          id
          localStartDate
        }
      }
    `;

    const response3 = await axios.post(API_URL, {
      query: query3
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    console.log(`Got ${response3.data.data.appointmentBookings.length} records`);

    // Test 4: With offset 10
    console.log('\n📊 Test 4: With offset 10');
    const query4 = `
      query {
        appointmentBookings(offset: 10) {
          id
          localStartDate
        }
      }
    `;

    const response4 = await axios.post(API_URL, {
      query: query4
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    console.log(`Got ${response4.data.data.appointmentBookings.length} records`);
    if (response4.data.data.appointmentBookings.length > 0) {
      console.log('First record ID:', response4.data.data.appointmentBookings[0].id);
    }

    // Test 5: With both limit and offset
    console.log('\n📊 Test 5: With limit 5 and offset 10');
    const query5 = `
      query {
        appointmentBookings(limit: 5, offset: 10) {
          id
          localStartDate
        }
      }
    `;

    const response5 = await axios.post(API_URL, {
      query: query5
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    console.log(`Got ${response5.data.data.appointmentBookings.length} records`);
    if (response5.data.data.appointmentBookings.length > 0) {
      console.log('First record ID:', response5.data.data.appointmentBookings[0].id);
    }

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

testPagination();
