// Demo dataset for Opera AI Dashboard
// All data is consistent across the application

export const demoData = {
  // Dashboard metrics
  metrics: {
    totalPatients: 1247,
    totalAppointments: 3420,
    uniquePatients: 1247,
    servicesOffered: 18,
    locations: 1,
    averageAppointmentsPerPatient: 2.74,
    mostPopularService: "Routine Cleaning",
    appointmentYears: [
      { year: "2024", count: 1850 },
      { year: "2025", count: 1570 }
    ],
    busiestHours: [
      { hour: "09:00", count: 245 },
      { hour: "10:00", count: 280 },
      { hour: "14:00", count: 265 },
      { hour: "15:00", count: 290 },
      { hour: "16:00", count: 220 }
    ],
    todaySchedule: [
      { time: "09:00", patient: "Sarah Johnson", type: "Routine Cleaning" },
      { time: "10:30", patient: "Michael Chen", type: "Crown Prep" },
      { time: "14:00", patient: "Jennifer Brown", type: "Implant Consult" },
      { time: "15:30", patient: "David Miller", type: "Fillings" }
    ],
    dateRange: {
      earliest: "2024-01-15",
      latest: "2025-01-15"
    }
  },

  // Financial metrics
  financial: {
    totalCollections: 195450,
    adjustedProduction: 218580,
    daysInAR: 28,
    cleanClaimRate: 96.8,
    collectionRate: 98.3,
    arAging: [
      { name: '0-30d', value: 120500 },
      { name: '31-60d', value: 45200 },
      { name: '61-90d', value: 18900 },
      { name: '91-120d', value: 7600 },
      { name: '>120d', value: 3100 }
    ],
    payerMix: [
      { name: 'Delta Dental', value: 45 },
      { name: 'Cigna', value: 25 },
      { name: 'Self-Pay', value: 15 },
      { name: 'Other', value: 15 }
    ]
  },

  // Production metrics (for AI answers)
  production: {
    lastWeek: {
      production: 185600,
      previousWeek: 212000,
      change: -12.4,
      reasons: [
        "Two high-value Invisalign starts rescheduled",
        "Chair 3 ran at 68% utilization (usual 85%)"
      ],
      projectedRecovery: 14200
    },
    chairs: {
      "Chair 1": { utilization: 92, status: "performing" },
      "Chair 2": { utilization: 68, status: "underperforming", idleMinutes: 31 },
      "Chair 3": { utilization: 85, status: "performing" },
      "Chair 4": { utilization: 88, status: "performing" },
      "Chair 5": { utilization: 72, status: "underperforming", overSchedulePercent: 18 }
    },
    capacity: {
      booked: 92,
      productionGenerating: 76,
      gap: 16,
      optimizationPotential: 3800
    },
    cancellationRisk: {
      highRiskCount: 7,
      highValueCount: 3,
      potentialLoss: 6400,
      reasons: "Historical behavior, appointment type, and lead time"
    }
  },

  // Front desk metrics
  frontDesk: {
    callAnswerRate: 78,
    previousMonthRate: 71,
    change: 9,
    averageBookingTime: 142, // seconds
    previousAverageBookingTime: 184,
    timeSaved: 42,
    missedCallsPeakHours: "12-1pm"
  },

  // Treatment/workflow metrics
  treatment: {
    pendingPlans: 19,
    pendingOverTenDays: 19,
    averagePlanValue: 4000,
    potentialRevenue: 52000,
    acceptanceRate: 25,
    bandingAppointments: {
      averageOverSchedule: 14, // minutes
      dailyChairHoursFreed: 1.6
    }
  },

  // Staffing metrics
  staffing: {
    afternoon: {
      hygieneCoverage: 0.8, // excess staff-hours
      clinicalSupport: "tight",
      peakHours: "10-12",
      recommendation: "Reallocate one staff member earlier"
    }
  },

  // Revenue opportunities
  opportunities: {
    underutilizedChairTime: 38000,
    invisalignCaseAcceptance: 61000,
    reduceCancellations: 19000,
    totalPotential: 118000,
    percentageIncrease: 14
  },

  // Monthly projection
  monthlyProjection: {
    currentPace: -7, // % below target
    primaryReasons: [
      "Mid-month schedule gaps",
      "Unclosed treatment plans"
    ],
    withHighImpactFixes: {
      projection: "+4-6%",
      exceedsTarget: true
    }
  }
};


