import { DynamicQueryAnalyzer } from './dynamic-query-analyzer';
import { ResponseFormatter } from './response-formatter';

interface DynamicRAGConfig {
  apiUrl: string;
  accessToken: string;
}

class DynamicRAGOrchestrator {
  private queryAnalyzer: DynamicQueryAnalyzer;
  private responseFormatter: ResponseFormatter;

  constructor(config: DynamicRAGConfig) {
    this.queryAnalyzer = new DynamicQueryAnalyzer(config.apiUrl, config.accessToken);
    this.responseFormatter = new ResponseFormatter();
  }

  // Main method to process user questions with dynamic API calls
  async processQuestion(question: string): Promise<string> {
    try {
      console.log(`🤖 Dynamic RAG processing: "${question}"`);
      
      // Step 1: Analyze the question and determine what data to fetch
      const results = await this.queryAnalyzer.processQuestion(question);
      
      // Step 2: Format the results into a natural response
      const response = this.responseFormatter.formatResponse(question, results);
      
      console.log(`✅ Dynamic RAG response generated`);
      return response;
      
    } catch (error) {
      console.error('❌ Dynamic RAG error:', error);
      return `Sorry, I encountered an error while processing your request: ${error.message}`;
    }
  }

  // Method to get available query types for documentation
  getAvailableQueryTypes(): string[] {
    return [
      'today_schedule - Get today\'s appointments',
      'patient_lookup - Find specific patients or get patient list',
      'patient_history - Get appointment history',
      'service_analysis - Get available services/treatments',
      'location_info - Get practice locations',
      'general_stats - Get practice statistics'
    ];
  }
}

export { DynamicRAGOrchestrator, DynamicRAGConfig };
