#!/usr/bin/env ts-node

// Quick test script to verify recent data export setup
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

// Load environment variables from .env.local
require('dotenv').config({ path: '../.env.local' });

async function testRecentExportSetup() {
  console.log('🧪 Testing Recent Data Export Setup');
  console.log('===================================');

  // Check environment variables
  const apiKey = process.env.GREYFINCH_API_KEY;
  const apiSecret = process.env.GREYFINCH_API_SECRET;
  const apiUrl = process.env.GREYFINCH_API_URL || 'https://connect-api.greyfinch.com/v1/graphql';

  console.log('🔧 Environment Check:');
  console.log(`   API URL: ${apiUrl || 'Not set'}`);
  console.log(`   API Key: ${apiKey ? `${apiKey.substring(0, 10)}...` : 'Not set'}`);
  console.log(`   API Secret: ${apiSecret ? `${apiSecret.substring(0, 10)}...` : 'Not set'}`);

  if (!apiKey || !apiSecret || !apiUrl) {
    console.log('❌ Missing environment variables. Please check .env.local file');
    return;
  }

  // Test authentication
  console.log('\n🔐 Testing Authentication...');
  try {
    const loginMutation = `
      mutation login($key: String!, $secret: String!) {
        apiLogin(key: $key, secret: $secret) {
          accessToken
          accessTokenExpiresIn
          status
        }
      }
    `;

    const response = await axios.post(apiUrl, {
      query: loginMutation,
      variables: {
        key: apiKey,
        secret: apiSecret
      }
    }, {
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.data.errors) {
      console.log('❌ Authentication failed:', response.data.errors[0].message);
      return;
    }

    console.log('✅ Authentication successful');
    const accessToken = response.data.data.apiLogin.accessToken;
    console.log(`   Token: ${accessToken.substring(0, 20)}...`);

    // Test recent appointments query
    console.log('\n📅 Testing Recent Appointments Query...');
    const appointmentsQuery = `
      query TestRecentAppointments {
        appointmentBookings(
          limit: 5
          where: {
            localStartDate: { _gte: "2024-01-01" }
          }
        ) {
          localStartDate
          localStartTime
          appointment {
            patient {
              person {
                firstName
                lastName
              }
            }
          }
        }
      }
    `;

    const appointmentsResponse = await axios.post(apiUrl, {
      query: appointmentsQuery
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (appointmentsResponse.data.errors) {
      console.log('❌ Recent appointments query failed:', appointmentsResponse.data.errors[0].message);
      return;
    }

    const appointments = appointmentsResponse.data.data.appointmentBookings;
    console.log(`✅ Found ${appointments.length} recent appointments`);
    
    if (appointments.length > 0) {
      const sample = appointments[0];
      console.log(`   Sample: ${sample.appointment?.patient?.person?.firstName} ${sample.appointment?.patient?.person?.lastName} on ${sample.localStartDate}`);
    }

    // Test patients query
    console.log('\n👥 Testing Recent Patients Query...');
    const patientsQuery = `
      query TestRecentPatients {
        patients(
          limit: 5
          where: {
            createdAt: { _gte: "2024-01-01" }
          }
        ) {
          id
          createdAt
          person {
            firstName
            lastName
          }
        }
      }
    `;

    const patientsResponse = await axios.post(apiUrl, {
      query: patientsQuery
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (patientsResponse.data.errors) {
      console.log('❌ Recent patients query failed:', patientsResponse.data.errors[0].message);
      return;
    }

    const patients = patientsResponse.data.data.patients;
    console.log(`✅ Found ${patients.length} recent patients`);
    
    if (patients.length > 0) {
      const sample = patients[0];
      console.log(`   Sample: ${sample.person?.firstName} ${sample.person?.lastName} (created: ${sample.createdAt})`);
    }

    // Check output directory
    console.log('\n📁 Checking Output Directory...');
    const outputDir = __dirname;
    console.log(`   Output directory: ${outputDir}`);
    
    try {
      await fs.access(outputDir, fs.constants.W_OK);
      console.log('✅ Output directory is writable');
    } catch (error) {
      console.log('❌ Output directory is not writable');
      return;
    }

    console.log('\n🎉 Setup Test Complete!');
    console.log('========================');
    console.log('✅ Environment variables configured');
    console.log('✅ API authentication working');
    console.log('✅ Recent data queries working');
    console.log('✅ Output directory ready');
    console.log('\n🚀 Ready to run: ./run-all-exports.sh');

  } catch (error: any) {
    console.log('❌ Test failed:', error.message);
    if (error.response) {
      console.log('   Response status:', error.response.status);
      console.log('   Response data:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

// Run the test
testRecentExportSetup().catch(console.error);
