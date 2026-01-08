export async function withBackoff<T>(fn: () => Promise<T>): Promise<T> {
  const delays = [500, 1000, 2000, 4000, 8000]; // Exponential backoff delays in ms
  let lastError: Error;
  
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;
      
      // Check if it's a rate limit error
      if (error.status === 429 || error.status === 503 || 
          error.message?.includes('rate limit') || 
          error.message?.includes('too many requests')) {
        
        if (attempt < delays.length) {
          console.log(`⏳ Rate limit hit, waiting ${delays[attempt]}ms before retry ${attempt + 1}/5`);
          await new Promise(resolve => setTimeout(resolve, delays[attempt]));
          continue;
        }
      }
      
      // For non-rate-limit errors, throw immediately
      throw error;
    }
  }
  
  throw lastError!;
}
