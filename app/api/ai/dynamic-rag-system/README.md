# Dynamic RAG System

This is a mini-project that demonstrates how to replace bulk data loading with targeted API queries for more efficient AI responses.

## 🎯 **The Problem**

Currently, the system loads ALL practice data (thousands of records) and passes it to the AI every time, even for simple questions like "What's today's schedule?" This is inefficient and expensive.

## 💡 **The Solution**

Instead of loading everything upfront, this system:
1. **Analyzes** the user's question to understand what they want
2. **Makes targeted API calls** to get exactly the data needed
3. **Formats the response** naturally without overwhelming the AI with irrelevant data

## 🚀 **How It Works**

### 1. Question Analysis
```typescript
// User asks: "What's my schedule for today?"
// System detects: today_schedule intent
// Makes targeted query for today's appointments only
```

### 2. Dynamic API Queries
```typescript
// Instead of loading 10,000+ records:
query TodaySchedule($date: String!) {
  appointmentBookings(
    where: { localStartDate: { _eq: $date } }
    limit: 50
  ) {
    localStartTime
    appointment { patient { person { firstName, lastName } } }
  }
}
```

### 3. Focused Responses
```typescript
// Returns only relevant data:
"📅 Today's Schedule:
1. John Doe - 9:00 AM
2. Jane Smith - 10:30 AM
Total appointments today: 2"
```

## 📊 **Benefits**

| Current System | Dynamic RAG System |
|---|---|
| 🐌 Loads ALL data (10,000+ records) | ⚡ Loads only what's needed (5-50 records) |
| 💰 High token costs (~70,000 tokens) | 💰 Low token costs (~500-2,000 tokens) |
| 🐌 Slow responses | ⚡ Fast responses |
| 📊 Generic answers | 🎯 Precise, targeted answers |
| 🔄 Same data for every question | 🔄 Fresh, real-time data |

## 🎯 **Supported Query Types**

1. **Today's Schedule** - "What's my schedule today?"
2. **Patient Lookup** - "Show me patient John Doe"
3. **Patient History** - "Show me recent appointments"
4. **Service Analysis** - "What services do you offer?"
5. **Location Info** - "What are my practice locations?"
6. **General Stats** - "How many patients do I have?"

## 🛠 **Implementation**

### Basic Usage
```typescript
import { DynamicRAGOrchestrator } from './dynamic-rag-orchestrator';

const dynamicRAG = new DynamicRAGOrchestrator({
  apiUrl: 'https://connect-api.greyfinch.com/v1/graphql',
  accessToken: 'your_token_here'
});

const response = await dynamicRAG.processQuestion("What's today's schedule?");
```

### Integration with Existing AI
```typescript
// Instead of this:
const allData = await loadAllPracticeData(); // 70,000+ tokens
const aiResponse = await geminiAPI.generate(allData + userQuestion);

// Do this:
const targetedData = await dynamicRAG.processQuestion(userQuestion); // 500-2,000 tokens
const aiResponse = await geminiAPI.generate(targetedData + userQuestion);
```

## 🔧 **Setup**

1. **Install dependencies:**
   ```bash
   npm install axios
   ```

2. **Configure API access:**
   ```typescript
   const config = {
     apiUrl: 'https://connect-api.greyfinch.com/v1/graphql',
     accessToken: 'your_greyfinch_access_token'
   };
   ```

3. **Test the system:**
   ```bash
   npx tsx test-dynamic-rag.ts
   ```

## 📈 **Performance Comparison**

### Current System
- **Data Loading:** 10,000+ records
- **Token Usage:** ~70,000 tokens per request
- **Response Time:** 3-5 seconds
- **Cost:** High (due to token usage)

### Dynamic RAG System
- **Data Loading:** 5-50 records (targeted)
- **Token Usage:** ~500-2,000 tokens per request
- **Response Time:** 1-2 seconds
- **Cost:** Low (due to minimal token usage)

## 🎯 **Real-World Examples**

### Example 1: Today's Schedule
```
User: "What's my schedule for today?"

Current System:
- Loads ALL appointments from 1999-2025
- Passes 70,000+ tokens to AI
- AI has to filter through everything

Dynamic RAG:
- Makes targeted query for today only
- Returns 5-20 appointments
- Passes ~1,000 tokens to AI
- Faster, more accurate response
```

### Example 2: Patient Lookup
```
User: "Show me patient John Doe"

Current System:
- Loads ALL patients
- AI searches through 1,000+ patients

Dynamic RAG:
- Makes targeted search for "John Doe"
- Returns 1-5 matching patients
- Much more efficient
```

## 🔮 **Future Enhancements**

1. **Caching** - Cache frequently requested data
2. **Smart Pagination** - Load more data if needed
3. **Natural Language Processing** - Better intent detection
4. **Real-time Updates** - Live data streaming
5. **Multi-query Optimization** - Combine multiple queries efficiently

## 🤔 **Why This Works Better**

1. **Efficiency** - Only fetch what's needed
2. **Accuracy** - Real-time data, not stale bulk data
3. **Cost** - Dramatically reduced token usage
4. **Speed** - Faster API calls and responses
5. **Scalability** - Works with any amount of data
6. **Flexibility** - Easy to add new query types

This system transforms your AI from a "data dump" approach to an intelligent, targeted query system that's both faster and more cost-effective!
