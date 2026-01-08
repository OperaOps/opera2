#!/usr/bin/env ts-node

// Test script for 10 priority questions with Claude Haiku
const API_URL = 'http://localhost:3004/api/ai/ask';

const PRIORITY_QUESTIONS = [
  "What's today's schedule?",
  "How many new patients did we see this month?",
  "What are our busiest hours?",
  "Show me patient treatment history",
  "What services do we offer?",
  "How many appointments do we have this week?",
  "What's our collection rate?",
  "Show me provider productivity",
  "What are our practice locations?",
  "How many no-shows did we have last month?"
];

async function testQuestion(question: string, index: number) {
  console.log(`\n🔍 Testing Question ${index + 1}/10: "${question}"`);
  
  try {
    const startTime = Date.now();
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question })
    });

    const endTime = Date.now();
    const responseTime = endTime - startTime;

    if (!response.ok) {
      const errorData = await response.json();
      console.log(`❌ Error: ${response.status} - ${errorData.error || 'Unknown error'}`);
      return false;
    }

    const data = await response.json();
    
    console.log(`✅ Response (${responseTime}ms):`);
    console.log(`📝 Answer: ${data.answer?.substring(0, 200)}...`);
    
    if (data.analysisHtml) {
      console.log(`🤖 Analysis banner included`);
    }
    
    return true;
  } catch (error: any) {
    console.log(`❌ Network Error: ${error.message}`);
    return false;
  }
}

async function runTests() {
  console.log('🚀 Testing 10 Priority Questions with Claude Haiku');
  console.log('=' .repeat(60));
  
  let successCount = 0;
  const results: boolean[] = [];
  
  for (let i = 0; i < PRIORITY_QUESTIONS.length; i++) {
    const success = await testQuestion(PRIORITY_QUESTIONS[i], i);
    results.push(success);
    if (success) successCount++;
    
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('\n' + '=' .repeat(60));
  console.log(`📊 Test Results: ${successCount}/${PRIORITY_QUESTIONS.length} questions passed`);
  
  if (successCount === PRIORITY_QUESTIONS.length) {
    console.log('🎉 All tests passed! Claude integration is working perfectly.');
  } else {
    console.log('⚠️  Some tests failed. Check the errors above.');
    
    const failedQuestions = PRIORITY_QUESTIONS.filter((_, i) => !results[i]);
    console.log('\n❌ Failed questions:');
    failedQuestions.forEach((q, i) => console.log(`   ${i + 1}. ${q}`));
  }
}

// Run the tests
runTests().catch(console.error);
