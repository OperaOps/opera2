import { DynamicRAGOrchestrator } from './dynamic-rag-orchestrator';

// Configuration - you'll need to get these from your existing setup
const config = {
  apiUrl: 'https://connect-api.greyfinch.com/v1/graphql',
  accessToken: 'YOUR_ACCESS_TOKEN_HERE' // You'll need to get this from your existing auth system
};

async function testDynamicRAG() {
  const dynamicRAG = new DynamicRAGOrchestrator(config);
  
  // Test questions that would trigger different types of API calls
  const testQuestions = [
    "What's my schedule for today?",
    "Show me some patients",
    "How many patients do I have?",
    "What services do you offer?",
    "Show me patient John Doe",
    "What are my practice locations?",
    "Show me recent appointment history",
    "How many appointments do I have total?"
  ];

  console.log('🚀 Testing Dynamic RAG System\n');
  console.log('Available query types:');
  dynamicRAG.getAvailableQueryTypes().forEach(type => {
    console.log(`  - ${type}`);
  });
  console.log('\n' + '='.repeat(50) + '\n');

  for (const question of testQuestions) {
    try {
      console.log(`❓ Question: "${question}"`);
      console.log('─'.repeat(50));
      
      const response = await dynamicRAG.processQuestion(question);
      console.log(`💬 Response:\n${response}`);
      
      console.log('\n' + '='.repeat(50) + '\n');
      
      // Add a small delay between requests to be respectful to the API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error(`❌ Error processing question "${question}":`, error.message);
      console.log('\n' + '='.repeat(50) + '\n');
    }
  }
}

// Example of how this would be integrated into your existing AI system
async function integrateWithExistingAI(userQuestion: string): Promise<string> {
  const dynamicRAG = new DynamicRAGOrchestrator(config);
  
  // Instead of loading all data upfront, make targeted queries
  const targetedResponse = await dynamicRAG.processQuestion(userQuestion);
  
  // You could then pass this smaller, focused response to Gemini
  // instead of the massive context file
  
  return targetedResponse;
}

// Run the test if this file is executed directly
if (require.main === module) {
  testDynamicRAG().catch(console.error);
}

export { testDynamicRAG, integrateWithExistingAI };
