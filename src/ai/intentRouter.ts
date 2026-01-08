export type Intent = 
  | 'list_locations' 
  | 'list_services' 
  | 'schedule_today' 
  | 'filter_schedule'
  | 'new_patients_range' 
  | 'no_show_recent' 
  | 'service_stats_monthly'
  | 'provider_load_week' 
  | 'patient_history' 
  | 'reschedule_streaks' 
  | 'pdf_analyze' 
  | 'general_chat';

export type DataSource = 'dynamic' | 'bulk' | 'hybrid';

export interface DataPlan {
  dataSource: DataSource;
  pageSize: number;
  softCap: number;
  filters?: Record<string, any>;
  exporter?: 'csv';
}

const INTENT_PATTERNS: Record<string, Intent> = {
  'today.*schedule|schedule.*today|todays.*schedule': 'schedule_today',
  'tomorrow.*schedule|schedule.*tomorrow': 'filter_schedule',
  'schedule.*location|location.*schedule': 'filter_schedule',
  'new.*patients?|patients?.*new|recent.*patients?': 'new_patients_range',
  'patient.*history|history.*patient': 'patient_history',
  'services?.*offer|offer.*services?|what.*services?': 'list_services',
  'appointment.*types?|types?.*appointment': 'list_services',
  'service.*stats?|stats?.*service|top.*services?': 'service_stats_monthly',
  'services?.*popular|popular.*services?': 'service_stats_monthly',
  'locations?|offices?|practices?': 'list_locations',
  'where.*located|address': 'list_locations',
  'no.*shows?|missed.*appointments?|cancelled': 'no_show_recent',
  'reschedule.*streaks?|streaks?.*reschedule': 'reschedule_streaks',
  'provider.*load|load.*provider|workload': 'provider_load_week',
  'analyze.*pdf|pdf.*analyze|summarize.*file': 'pdf_analyze',
};

export function detectIntent(query: string): Intent {
  const lowerQuery = query.toLowerCase();
  
  for (const [pattern, intent] of Object.entries(INTENT_PATTERNS)) {
    const regex = new RegExp(pattern, 'i');
    if (regex.test(lowerQuery)) {
      return intent;
    }
  }
  
  // Default to schedule_today for ambiguous queries
  return 'schedule_today';
}

export function chooseDataSource(intent: Intent): DataSource {
  switch (intent) {
    case 'schedule_today':
    case 'filter_schedule':
    case 'patient_history':
    case 'list_locations':
    case 'list_services':
      return 'dynamic';
      
    case 'service_stats_monthly':
    case 'no_show_recent':
    case 'reschedule_streaks':
    case 'provider_load_week':
      return 'bulk';
      
    case 'pdf_analyze':
      return 'bulk';
      
    default:
      return 'dynamic';
  }
}

export function buildPlan(intent: Intent, params: Record<string, any> = {}): DataPlan {
  const dataSource = chooseDataSource(intent);
  
  return {
    dataSource,
    pageSize: 20,
    softCap: 200,
    filters: params,
    exporter: params.export ? 'csv' : undefined
  };
}
