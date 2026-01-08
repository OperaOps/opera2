import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

// Claude API configuration
const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY || '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'
const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages'

// Feature flag for smart router
const OPERA_SMART_ROUTER = process.env.OPERA_SMART_ROUTER === 'on'

async function readPracticeData(): Promise<string> {
  // Demo mode: Return demo data summary
  return `Demo Practice Data:
Total Patients: 1,247
Total Appointments: 3,420
Services Offered: 18
Locations: 1
Collection Rate: 98.3%
Days in AR: 28
Production Last Week: $185,600
Top Provider: Dr. Anya Sharma ($810/hr)
Busiest Hours: 9am, 10am, 2pm, 3pm, 4pm
Current Month Collections: $195,450
Pending Treatment Plans: 19 (over $4,000 each)
Underperforming Chairs: Chair 2, Chair 5
Front Desk Call Answer Rate: 78%
High Cancellation Risk Patients: 7`
}

async function callClaude(messages: any[], maxTokens: number = 1000): Promise<string> {
  const response = await fetch(CLAUDE_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': CLAUDE_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: maxTokens,
      temperature: 0.3,
      messages: messages
    })
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Claude API error: ${response.status} - ${errorText}`)
  }

  const data = await response.json()
  return data.content[0].text
}

function createOptimizedSummary(data: string): any {
  const lines = data.split('\n')
  
  const patients = new Set<string>()
  const services = new Set<string>()
  const locations = new Set<string>()
  const appointmentTypes = new Set<string>()
  const appointments: any[] = []
  const hourlyStats = new Map<string, number>()
  const dateStats = new Map<string, number>()
  const patientStats = new Map<string, number>()
  
  // Track data sources
  let recentDataCount = 0
  let historicalDataCount = 0
  
  // Intelligent data extraction
  lines.forEach(line => {
    // Parse appointment lines (both recent and historical formats)
    if (line.includes('Appointment:')) {
      // Recent format: "Appointment: Olivia Schaad on 2024-01-02 at 07:40:00"
      let match = line.match(/Appointment:\s*(.+?)\s+on\s+(\d{4}-\d{2}-\d{2})\s+at\s+(\d{2}):(\d{2}):\d{2}/)
      if (!match) {
        // Historical format: "Appointment: Steve Wallace on 1999-07-02 at 15:45:00"
        match = line.match(/Appointment:\s*(.+?)\s+on\s+(\d{4}-\d{2}-\d{2})\s+at\s+(\d{2}):(\d{2}):\d{2}/)
      }
      
      if (match) {
        const patient = match[1] || 'Unknown'
        const date = match[2] || 'Unknown'
        const hour = match[3] || '00'
        const year = date.split('-')[0]
        
        patients.add(patient)
        appointments.push({ 
          date: `${date} ${hour}:00`, 
          patient, 
          type: 'General',
          year: year
        })
        appointmentTypes.add('General')
        
        hourlyStats.set(hour, (hourlyStats.get(hour) || 0) + 1)
        dateStats.set(date, (dateStats.get(date) || 0) + 1)
        patientStats.set(patient, (patientStats.get(patient) || 0) + 1)
        
        // Track data source
        if (year >= '2024') {
          recentDataCount++
        } else {
          historicalDataCount++
        }
      }
    }
    
    // Parse tab-separated appointment data (historical format)
    if (line.startsWith('appointmentBookings\t')) {
      const parts = line.split('\t')
      if (parts.length >= 4) {
        try {
          const appointmentData = JSON.parse(parts[3])
          const patient = appointmentData.appointment?.patient?.person ? 
            `${appointmentData.appointment.patient.person.firstName || ''} ${appointmentData.appointment.patient.person.lastName || ''}`.trim() : 
            'Unknown Patient'
          const date = appointmentData.localStartDate || 'Unknown'
          const time = appointmentData.localStartTime || '00:00:00'
          const hour = time.split(':')[0] || '00'
          const year = date.split('-')[0]
          
          if (patient !== 'Unknown Patient' && date !== 'Unknown') {
            patients.add(patient)
            appointments.push({ 
              date: `${date} ${hour}:00`, 
              patient, 
              type: 'General',
              year: year
            })
            appointmentTypes.add('General')
            
            hourlyStats.set(hour, (hourlyStats.get(hour) || 0) + 1)
            dateStats.set(date, (dateStats.get(date) || 0) + 1)
            patientStats.set(patient, (patientStats.get(patient) || 0) + 1)
            
            // Track data source
            if (year >= '2024') {
              recentDataCount++
            } else {
              historicalDataCount++
            }
          }
        } catch (e) {
          // Skip malformed JSON
        }
      }
    }
    
    // Parse patient lines (both formats)
    if (line.includes('Patient:')) {
      const match = line.match(/Patient:\s*(.+?)(?:\s+\(ID:\s*[\w-]+\))?(?:\s+- Created:\s*.+)?/)
      if (match) {
        patients.add(match[1].trim() || 'Unknown')
      }
    }
    
    // Parse tab-separated patient data (historical format)
    if (line.startsWith('patients\t')) {
      const parts = line.split('\t')
      if (parts.length >= 4) {
        try {
          const patientData = JSON.parse(parts[3])
          const patientName = `${patientData.firstName || ''} ${patientData.lastName || ''}`.trim()
          if (patientName) {
            patients.add(patientName)
            const createdAt = parts[2] || ''
            const year = createdAt.split('-')[0]
            if (year >= '2024') {
              recentDataCount++
            } else {
              historicalDataCount++
            }
          }
        } catch (e) {
          // Skip malformed JSON
        }
      }
    }
    
    // Parse intelligent insights
    if (line.includes('- Total unique patients:')) {
      const match = line.match(/- Total unique patients: (\d+)/)
      if (match) services.add(`Patient Database: ${match[1]} patients`)
    }
    
    if (line.includes('- Patients with multiple appointments:')) {
      const match = line.match(/- Patients with multiple appointments: (\d+)/)
      if (match) services.add(`Returning Patients: ${match[1]} loyal patients`)
    }
    
    if (line.includes('- Average appointments per day:')) {
      const match = line.match(/- Average appointments per day: (\d+)/)
      if (match) services.add(`Daily Capacity: ${match[1]} appointments/day`)
    }
    
    if (line.includes('- Practice efficiency:')) {
      const match = line.match(/- Practice efficiency: (.+)/)
      if (match) services.add(`Efficiency Rating: ${match[1]}`)
    }
    
    // Parse location lines: "Location: Main Office - Colorado Springs, CO"
    if (line.includes('Location:')) {
      const match = line.match(/Location:\s*(.+)/)
      if (match) {
        locations.add(match[1] || 'Unknown')
      }
    }
    
    // Parse service lines
    if (line.includes('Service:')) {
      const match = line.match(/Service:\s*(.+)/)
      if (match) {
        services.add(match[1] || 'Unknown')
      }
    }
  })
  
  const busiestHours = Array.from(hourlyStats.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([hour, count]) => ({ hour, count }))
  
  const busiestDates = Array.from(dateStats.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([date, count]) => ({ date, count }))
  
  const frequentPatients = Array.from(patientStats.entries())
    .filter(([_, count]) => count > 1)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([patient, count]) => ({ patient, count }))
  
  // Separate recent vs historical data
  const recentAppointments = appointments.filter(apt => apt.year >= '2024')
  const historicalAppointments = appointments.filter(apt => apt.year < '2024')
  const recentPatients = new Set(recentAppointments.map(apt => apt.patient))
  const historicalPatients = new Set(historicalAppointments.map(apt => apt.patient))

  return {
    totalPatients: patients.size,
    totalAppointments: appointments.length,
    services: Array.from(services),
    locations: Array.from(locations),
    appointmentTypes: Array.from(appointmentTypes),
    recentAppointments: recentAppointments.slice(-5),
    busiestHours,
    busiestDates,
    frequentPatients,
    dataSources: {
      recentDataCount,
      historicalDataCount,
      recentPatients: recentPatients.size,
      historicalPatients: historicalPatients.size
    },
    intelligentInsights: {
      returningPatients: Array.from(patientStats.values()).filter(count => count > 1).length,
      peakHour: busiestHours[0]?.hour || 'N/A',
      busiestDay: busiestDates[0]?.date || 'N/A',
      averageDailyAppointments: Math.round(appointments.length / dateStats.size)
    }
  }
}


export async function POST(req: NextRequest) {
  try {
    const { question, params, fileIds, images } = await req.json()
    if (!question || typeof question !== 'string') {
      return NextResponse.json({ error: 'Missing question' }, { status: 400 })
    }

    console.log(`💬 Claude AI processing: "${question}"`)

    // Handle simple greetings
    const lowerQuestion = question.toLowerCase().trim()
    
    if (lowerQuestion === 'hi' || lowerQuestion === 'hello' || lowerQuestion === 'hey') {
      return NextResponse.json({ 
        answer: 'Hi! I\'m Opera, your practice assistant. How can I help you today?' 
      })
    }
    
    if (lowerQuestion.includes('how are you') || lowerQuestion.includes('how\'s it going')) {
      return NextResponse.json({ 
        answer: 'I\'m doing great! Ready to help you with your practice. What would you like to know?' 
      })
    }

    // Check if we have images to analyze
    if (images && images.length > 0) {
      console.log(`🖼️ Analyzing ${images.length} image(s) with Claude`)
      
      const imageMessages = [
        {
          role: 'user' as const,
          content: [
            {
              type: 'text' as const,
              text: `Please analyze this image and answer: ${question}`
            },
            ...images.map((img: any) => ({
              type: 'image' as const,
              source: {
                type: 'base64' as const,
                media_type: img.mimeType,
                data: img.base64
              }
            }))
          ]
        }
      ]

      const imageAnswer = await callClaude(imageMessages, 1000)
      
      console.log('✅ Claude image analysis completed')
      
      return NextResponse.json({
        answer: imageAnswer,
        analysisHtml: `<div style="background: #e8f5e8; border: 1px solid #4caf50; padding: 12px; margin: 12px 0; border-radius: 8px;">
          <strong>🖼️ Image Analysis</strong><br>
          Model: Claude Haiku | Images: ${images.length}
        </div>`,
        answerHtml: `<div style="padding: 12px;">${imageAnswer}</div>`
      })
    }

    // Get practice data and create optimized summary
    const practiceData = await readPracticeData()
    console.log(`📊 Loaded practice data for analysis`)
    
    const summary = createOptimizedSummary(practiceData)
    console.log(`📈 Created optimized summary: ${summary.totalPatients} patients, ${summary.totalAppointments} appointments`)

    // Create intelligent, conversational prompt
    const optimizedPrompt = `You are Opera, an intelligent dental practice assistant. You have access to comprehensive practice data spanning both historical (1999) and recent (2024-2025) periods.

COMBINED DATASET INTELLIGENCE:
- Total Patients: ${summary.totalPatients} (${summary.dataSources.recentPatients} recent + ${summary.dataSources.historicalPatients} historical)
- Total Appointments: ${summary.totalAppointments} (${summary.dataSources.recentDataCount} recent + ${summary.dataSources.historicalDataCount} historical)
- Returning Patients: ${summary.intelligentInsights.returningPatients} (${Math.round(summary.intelligentInsights.returningPatients/summary.totalPatients*100)}% loyalty rate)
- Peak Hour: ${summary.intelligentInsights.peakHour}:00
- Busiest Day: ${summary.intelligentInsights.busiestDay}
- Daily Average: ${summary.intelligentInsights.averageDailyAppointments} appointments

DATA SOURCES:
- Recent Data (2024-2025): ${summary.dataSources.recentDataCount} appointments, ${summary.dataSources.recentPatients} patients
- Historical Data (1999): ${summary.dataSources.historicalDataCount} appointments, ${summary.dataSources.historicalPatients} patients

PATIENT INSIGHTS:
${summary.frequentPatients.map((p: any) =>
  `- ${p.patient}: ${p.count} appointments (loyal patient)`
).join('\n')}

BUSIEST TIMES:
${summary.busiestHours.map((h: any) => 
  `- ${h.hour}:00: ${h.count} appointments`
).join('\n')}

BUSIEST DAYS:
${summary.busiestDates.map((d: any) => 
  `- ${d.date}: ${d.count} appointments`
).join('\n')}

RECENT ACTIVITY (2024-2025):
${summary.recentAppointments.map((apt: any) => 
  `- ${apt.date}: ${apt.patient}`
).join('\n')}

INTELLIGENT CAPABILITIES:
You can analyze patterns, identify trends, make associations, and provide insights about:
- Current operations (use recent 2024-2025 data)
- Historical trends and patterns (use 1999 data)
- Comparative analysis between periods
- Patient behavior and loyalty patterns
- Scheduling efficiency and optimization
- Practice performance metrics over time
- Appointment distribution and capacity
- Operational insights and recommendations

QUESTION: ${question}

Be conversational, intelligent, and provide insights. Use the appropriate dataset based on the question:
- For "today", "current", "recent" questions → use 2024-2025 data
- For "historical", "trends", "patterns" questions → use 1999 data
- For comparative analysis → use both datasets
- Make associations from the data. If asked about specific patients, use real names from the data. Be helpful and analytical.

CRITICAL RESPONSE FORMATTING REQUIREMENTS:
You are Opera Assistant. Your job is to return clean, simple answers in plain text format.

FORMATTING RULES:
- Write in plain text paragraphs only
- NO markdown formatting (no #, ##, ###, **, *, -, bullets, lists)
- NO HTML tags (no <div>, <br>, <h1>, etc.)
- NO special characters or symbols
- Use simple paragraphs with clear sentences
- Separate different topics with blank lines between paragraphs
- Be conversational and easy to read
- No emojis, no formatting symbols, no special characters

RESPONSE STRUCTURE:
- Start with a clear answer to the question
- Provide supporting details in separate paragraphs
- Include relevant numbers and facts in natural sentences
- End with any additional insights or recommendations

EXAMPLE FORMAT:
"Based on our practice data, we have 14,335 total patients across both historical and recent periods. This includes 1,661 patients from our current 2024-2025 records and 10,540 patients from our historical 1999 dataset.

The practice shows strong patient retention with 59% of patients being returning patients. This indicates excellent patient satisfaction and loyalty to our practice.

For current operations, we have 20 active patients with recent appointments. Our busiest hours are consistently at 15:00, followed by 16:00 and 08:00, suggesting patients prefer mid-afternoon and early morning appointments.

I recommend focusing staffing resources during the 15:00-16:00 peak hours and considering strategies to balance appointment distribution throughout the day for optimal efficiency."`

    const messages = [
      {
        role: 'user' as const,
        content: optimizedPrompt
      }
    ]

    console.log(`🔑 Using Claude Haiku API`)
    
    const answer = await callClaude(messages, 1000)
    
    console.log('✅ Claude response generated successfully')

    // Add smart router analysis if enabled
    let analysisHtml = ''
    if (OPERA_SMART_ROUTER) {
      analysisHtml = `<div style="background: #e3f2fd; border: 1px solid #2196f3; padding: 12px; margin: 12px 0; border-radius: 8px;">
        <strong>🤖 Smart Analysis</strong><br>
        Data: ${summary.totalPatients} patients, ${summary.totalAppointments} appointments | Model: Claude Haiku
      </div>`
    }

        return NextResponse.json({
          answer: answer,
          analysisHtml: analysisHtml || undefined,
          answerHtml: answer // Return clean markdown, let the UI handle rendering
        })

  } catch (error: any) {
    console.error('❌ Error in Claude AI:', error)
    return NextResponse.json({ 
      error: 'Internal server error', 
      details: error?.message || 'Unknown error'
    }, { status: 500 })
  }
}