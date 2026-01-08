import axios from 'axios';

// Types for our dynamic query system
interface QueryIntent {
  type: 'patient_lookup' | 'appointment_schedule' | 'today_schedule' | 'patient_history' | 'service_analysis' | 'location_info' | 'general_stats';
  entity?: string;
  filters?: {
    date?: string;
    patientName?: string;
    serviceType?: string;
    location?: string;
    timeRange?: string;
  };
  parameters?: {
    limit?: number;
    offset?: number;
  };
}

interface GreyfinchQuery {
  query: string;
  variables?: Record<string, any>;
}

class DynamicQueryAnalyzer {
  private apiUrl: string;
  private accessToken: string;

  constructor(apiUrl: string, accessToken: string) {
    this.apiUrl = apiUrl;
    this.accessToken = accessToken;
  }

  // Analyze user question and determine what API calls to make
  analyzeQuestion(question: string): QueryIntent[] {
    const lowerQuestion = question.toLowerCase();
    const intents: QueryIntent[] = [];

    // Today's schedule queries
    if (lowerQuestion.includes('today') && (lowerQuestion.includes('schedule') || lowerQuestion.includes('appointment'))) {
      intents.push({
        type: 'today_schedule',
        filters: {
          date: new Date().toISOString().split('T')[0] // Today's date
        }
      });
    }

    // Specific patient queries
    if (lowerQuestion.includes('patient') || lowerQuestion.includes('show me') && lowerQuestion.includes('patient')) {
      // Try to extract patient name if mentioned
      const patientName = this.extractPatientName(question);
      intents.push({
        type: 'patient_lookup',
        filters: patientName ? { patientName } : undefined
      });
    }

    // Appointment history queries
    if (lowerQuestion.includes('history') || lowerQuestion.includes('past') || lowerQuestion.includes('previous')) {
      intents.push({
        type: 'patient_history'
      });
    }

    // Service analysis queries
    if (lowerQuestion.includes('service') || lowerQuestion.includes('treatment') || lowerQuestion.includes('procedure')) {
      intents.push({
        type: 'service_analysis'
      });
    }

    // Location queries
    if (lowerQuestion.includes('location') || lowerQuestion.includes('where')) {
      intents.push({
        type: 'location_info'
      });
    }

    // General statistics
    if (lowerQuestion.includes('how many') || lowerQuestion.includes('count') || lowerQuestion.includes('total')) {
      intents.push({
        type: 'general_stats'
      });
    }

    // If no specific intent found, return general stats
    if (intents.length === 0) {
      intents.push({
        type: 'general_stats'
      });
    }

    return intents;
  }

  // Extract patient name from question using simple pattern matching
  private extractPatientName(question: string): string | undefined {
    // Look for patterns like "show me John Doe" or "patient John Doe"
    const patterns = [
      /show me ([A-Za-z]+\s+[A-Za-z]+)/i,
      /patient ([A-Za-z]+\s+[A-Za-z]+)/i,
      /([A-Za-z]+\s+[A-Za-z]+) patient/i
    ];

    for (const pattern of patterns) {
      const match = question.match(pattern);
      if (match) {
        return match[1];
      }
    }

    return undefined;
  }

  // Convert query intent to actual GraphQL query
  generateGraphQLQuery(intent: QueryIntent): GreyfinchQuery {
    switch (intent.type) {
      case 'today_schedule':
        return {
          query: `
            query TodaySchedule($date: String!, $limit: Int!, $offset: Int!) {
              appointmentBookings(
                where: { localStartDate: { _eq: $date } }
                limit: $limit
                offset: $offset
                order_by: { localStartTime: asc }
              ) {
                id
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
          `,
          variables: {
            date: intent.filters?.date || new Date().toISOString().split('T')[0],
            limit: intent.parameters?.limit || 50,
            offset: intent.parameters?.offset || 0
          }
        };

      case 'patient_lookup':
        if (intent.filters?.patientName) {
          // Search for specific patient
          return {
            query: `
              query PatientLookup($firstName: String!, $lastName: String!, $limit: Int!, $offset: Int!) {
                patients(
                  where: {
                    person: {
                      firstName: { _ilike: $firstName }
                      lastName: { _ilike: $lastName }
                    }
                  }
                  limit: $limit
                  offset: $offset
                ) {
                  id
                  createdAt
                  person {
                    firstName
                    lastName
                  }
                }
              }
            `,
            variables: {
              firstName: `%${intent.filters.patientName.split(' ')[0]}%`,
              lastName: `%${intent.filters.patientName.split(' ')[1] || ''}%`,
              limit: intent.parameters?.limit || 10,
              offset: intent.parameters?.offset || 0
            }
          };
        } else {
          // Get general patient list
          return {
            query: `
              query PatientList($limit: Int!, $offset: Int!) {
                patients(
                  limit: $limit
                  offset: $offset
                  order_by: { createdAt: desc }
                ) {
                  id
                  createdAt
                  person {
                    firstName
                    lastName
                  }
                }
              }
            `,
            variables: {
              limit: intent.parameters?.limit || 20,
              offset: intent.parameters?.offset || 0
            }
          };
        }

      case 'patient_history':
        return {
          query: `
            query PatientHistory($limit: Int!, $offset: Int!) {
              appointmentBookings(
                limit: $limit
                offset: $offset
                order_by: { localStartDate: desc }
              ) {
                id
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
          `,
          variables: {
            limit: intent.parameters?.limit || 50,
            offset: intent.parameters?.offset || 0
          }
        };

      case 'service_analysis':
        return {
          query: `
            query ServiceAnalysis($limit: Int!, $offset: Int!) {
              appointmentTypes(
                limit: $limit
                offset: $offset
              ) {
                id
                name
              }
            }
          `,
          variables: {
            limit: intent.parameters?.limit || 50,
            offset: intent.parameters?.offset || 0
          }
        };

      case 'location_info':
        return {
          query: `
            query LocationInfo($limit: Int!, $offset: Int!) {
              locations(
                limit: $limit
                offset: $offset
              ) {
                id
                name
                address {
                  city
                  state
                }
              }
            }
          `,
          variables: {
            limit: intent.parameters?.limit || 20,
            offset: intent.parameters?.offset || 0
          }
        };

      case 'general_stats':
        return {
          query: `
            query GeneralStats {
              patients_aggregate {
                aggregate {
                  count
                }
              }
              appointmentBookings_aggregate {
                aggregate {
                  count
                }
              }
              appointmentTypes_aggregate {
                aggregate {
                  count
                }
              }
              locations_aggregate {
                aggregate {
                  count
                }
              }
            }
          `
        };

      default:
        return {
          query: `
            query DefaultQuery {
              patients_aggregate {
                aggregate {
                  count
                }
              }
            }
          `
        };
    }
  }

  // Execute the GraphQL query
  async executeQuery(graphqlQuery: GreyfinchQuery): Promise<any> {
    try {
      const response = await axios.post(
        this.apiUrl,
        {
          query: graphqlQuery.query,
          variables: graphqlQuery.variables || {}
        },
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          },
          timeout: 30000
        }
      );

      if (response.data.errors) {
        console.error('GraphQL errors:', response.data.errors);
        throw new Error(`GraphQL errors: ${JSON.stringify(response.data.errors)}`);
      }

      return response.data.data;
    } catch (error) {
      console.error('Query execution error:', error);
      throw error;
    }
  }

  // Main method to process a user question
  async processQuestion(question: string): Promise<any> {
    console.log(`🔍 Analyzing question: "${question}"`);
    
    const intents = this.analyzeQuestion(question);
    console.log(`📋 Detected intents:`, intents);

    const results = [];

    for (const intent of intents) {
      try {
        const graphqlQuery = this.generateGraphQLQuery(intent);
        console.log(`🚀 Executing query for ${intent.type}:`, graphqlQuery);
        
        const data = await this.executeQuery(graphqlQuery);
        console.log(`✅ Query result:`, data);
        
        results.push({
          intent,
          data
        });
      } catch (error) {
        console.error(`❌ Error executing query for ${intent.type}:`, error);
        results.push({
          intent,
          error: error.message
        });
      }
    }

    return results;
  }
}

export { DynamicQueryAnalyzer, QueryIntent, GreyfinchQuery };
