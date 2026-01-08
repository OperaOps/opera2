// Integration with your existing Greyfinch authentication system

import { DynamicRAGOrchestrator } from './dynamic-rag-orchestrator';

// This would integrate with your existing authentication system
// from your existing Greyfinch API routes
async function getGreyfinchAccessToken(): Promise<string> {
  // You already have this logic in your existing API routes
  // This is just showing how to integrate it
  
  const GREYFINCH_API_URL = 'https://connect-api.greyfinch.com/v1/graphql';
  const GREYFINCH_API_KEY = process.env.GREYFINCH_API_KEY || 'your_api_key';
  const GREYFINCH_API_SECRET = process.env.GREYFINCH_API_SECRET || 'your_api_secret';

  try {
    const loginResponse = await fetch(GREYFINCH_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          mutation Login($apiKey: String!, $apiSecret: String!) {
            login(apiKey: $apiKey, apiSecret: $apiSecret) {
              accessToken
            }
          }
        `,
        variables: {
          apiKey: GREYFINCH_API_KEY,
          apiSecret: GREYFINCH_API_SECRET
        }
      })
    });

    const loginData = await loginResponse.json();
    
    if (loginData.errors) {
      throw new Error(`Login failed: ${JSON.stringify(loginData.errors)}`);
    }

    return loginData.data.login.accessToken;
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  }
}

// Enhanced AI route that uses Dynamic RAG
async function createEnhancedAIRoute() {
  console.log('🔧 Setting up Enhanced AI Route with Dynamic RAG...');

  // Get access token using your existing auth system
  const accessToken = await getGreyfinchAccessToken();

  // Create Dynamic RAG instance
  const dynamicRAG = new DynamicRAGOrchestrator({
    apiUrl: 'https://connect-api.greyfinch.com/v1/graphql',
    accessToken: accessToken
  });

  // This would be your new AI route handler
  return async function enhancedAIHandler(question: string) {
    try {
      console.log(`🤖 Enhanced AI processing: "${question}"`);

      // Instead of loading all practice data, get targeted data
      const targetedData = await dynamicRAG.processQuestion(question);
      
      // Option 1: Return the formatted response directly (fastest)
      return {
        answer: targetedData,
        method: 'direct_dynamic_rag'
      };

      // Option 2: Pass minimal data to Gemini for enhanced responses
      /*
      const geminiResponse = await callGeminiWithMinimalContext(targetedData, question);
      return {
        answer: geminiResponse,
        method: 'dynamic_rag_plus_gemini'
      };
      */

    } catch (error) {
      console.error('Enhanced AI error:', error);
      return {
        answer: 'Sorry, I encountered an error while processing your request.',
        error: error.message
      };
    }
  };
}

// Example of how to replace your existing AI route
async function replaceExistingAIRoute() {
  console.log('🔄 Replacing existing AI route with Dynamic RAG...');

  // Your existing route probably looks like this:
  /*
  export async function POST(req: NextRequest) {
    const { question } = await req.json();
    
    // OLD WAY: Load all practice data (inefficient)
    const allPracticeData = await readPracticeData(); // 70,000+ tokens
    const prompt = `${allPracticeData}\n\nQuestion: ${question}`;
    const response = await callGeminiAPI(prompt);
    
    return NextResponse.json({ answer: response });
  }
  */

  // NEW WAY: Use Dynamic RAG (efficient)
  const enhancedHandler = await createEnhancedAIRoute();
  
  return async function POST(req: NextRequest) {
    const { question } = await req.json();
    const result = await enhancedHandler(question);
    return NextResponse.json(result);
  };
}

// Performance monitoring
class PerformanceMonitor {
  private metrics: Map<string, { count: number, totalTime: number }> = new Map();

  startTimer(operation: string): () => void {
    const startTime = Date.now();
    
    return () => {
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      const existing = this.metrics.get(operation) || { count: 0, totalTime: 0 };
      this.metrics.set(operation, {
        count: existing.count + 1,
        totalTime: existing.totalTime + duration
      });
      
      console.log(`⏱️ ${operation}: ${duration}ms`);
    };
  }

  getMetrics(): Record<string, { count: number, averageTime: number }> {
    const result: Record<string, { count: number, averageTime: number }> = {};
    
    for (const [operation, data] of this.metrics.entries()) {
      result[operation] = {
        count: data.count,
        averageTime: data.totalTime / data.count
      };
    }
    
    return result;
  }

  printReport(): void {
    console.log('\n📊 Performance Report:');
    console.log('─'.repeat(40));
    
    const metrics = this.getMetrics();
    for (const [operation, data] of Object.entries(metrics)) {
      console.log(`${operation}:`);
      console.log(`  Requests: ${data.count}`);
      console.log(`  Avg Time: ${data.averageTime.toFixed(2)}ms`);
    }
  }
}

// Test the integration
async function testIntegration() {
  console.log('🧪 Testing Dynamic RAG Integration...\n');

  const monitor = new PerformanceMonitor();
  
  try {
    const enhancedHandler = await createEnhancedAIRoute();
    
    const testQuestions = [
      "What's my schedule for today?",
      "How many patients do I have?",
      "Show me some patients"
    ];

    for (const question of testQuestions) {
      const endTimer = monitor.startTimer('dynamic_rag_query');
      
      try {
        const result = await enhancedHandler(question);
        endTimer();
        
        console.log(`✅ Question: "${question}"`);
        console.log(`📝 Response: ${result.answer.substring(0, 100)}...`);
        console.log(`🔧 Method: ${result.method}\n`);
        
      } catch (error) {
        endTimer();
        console.error(`❌ Error with question "${question}":`, error.message);
      }
    }

    monitor.printReport();

  } catch (error) {
    console.error('❌ Integration test failed:', error);
  }
}

export { 
  createEnhancedAIRoute, 
  replaceExistingAIRoute, 
  PerformanceMonitor, 
  testIntegration 
};

// Run integration test if this file is executed directly
if (require.main === module) {
  testIntegration().catch(console.error);
}
