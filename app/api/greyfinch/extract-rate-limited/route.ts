import { NextRequest, NextResponse } from 'next/server'

const API_URL = "https://connect-api.greyfinch.com/v1/graphql"
const API_KEY = process.env.GREYFINCH_API_KEY || "pk_user_pcK2+6R5H/DJiNLzZvW8dnydQ6UgLeP5"
const API_SECRET = process.env.GREYFINCH_API_SECRET || "sk_user_c1PDU7HA3KgnBJ1e3NomYcF6pd7j1ydB"

async function apiLogin() {
  const mutation = `
    mutation login($key: String!, $secret: String!) {
      apiLogin(key: $key, secret: $secret) {
        accessToken
        accessTokenExpiresIn
        status
      }
    }
  `
  
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: mutation,
      variables: {
        key: API_KEY,
        secret: API_SECRET
      }
    })
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data = await response.json()
  
  if (data.errors) {
    throw new Error(`Login failed: ${JSON.stringify(data.errors)}`)
  }
  
  return data.data.apiLogin.accessToken
}

export async function GET() {
  try {
    const accessToken = await apiLogin()
    
    console.log('Starting rate-limited extraction (100 requests/minute)...')
    
    // Function to get ALL appointments with proper rate limiting
    async function getAllAppointments() {
      let allAppointments = []
      let offset = 0
      const limit = 20 // Use the confirmed working limit
      let hasMore = true
      let totalFetched = 0
      let batchNumber = 1
      let requestCount = 0
      const maxRequestsPerMinute = 90 // Stay under 100 limit
      const minuteInMs = 60 * 1000
      let lastMinuteStart = Date.now()
      
      while (hasMore) {
        // Check if we need to wait for rate limit reset
        const now = Date.now()
        if (now - lastMinuteStart >= minuteInMs) {
          // New minute, reset counter
          requestCount = 0
          lastMinuteStart = now
          console.log('Rate limit window reset')
        }
        
        if (requestCount >= maxRequestsPerMinute) {
          const waitTime = minuteInMs - (now - lastMinuteStart)
          console.log(`Rate limit reached. Waiting ${Math.ceil(waitTime/1000)} seconds...`)
          await new Promise(resolve => setTimeout(resolve, waitTime))
          requestCount = 0
          lastMinuteStart = Date.now()
        }
        
        console.log(`Fetching batch ${batchNumber} (offset: ${offset}, requests this minute: ${requestCount + 1})...`)
        
        const query = `
          query appointmentBookings($limit: Int!, $offset: Int!) {
            appointmentBookings(
              limit: $limit
              offset: $offset
            ) {
              id
              localStartDate
              localStartTime
              appointment {
                id
                patient {
                  id
                  person {
                    firstName
                    lastName
                  }
                }
              }
            }
          }
        `
        
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
          body: JSON.stringify({ 
            query: query,
            variables: { limit: limit, offset: offset }
          })
        })

        requestCount++

        if (!response.ok) {
          if (response.status === 429) {
            const retryAfter = response.headers.get('retry-after')
            const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : 60000
            console.log(`Rate limited. Waiting ${waitTime/1000} seconds...`)
            await new Promise(resolve => setTimeout(resolve, waitTime))
            continue // Retry the same batch
          }
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        
        if (data.errors) {
          throw new Error(`Query failed: ${JSON.stringify(data.errors)}`)
        }

        const appointments = data.data.appointmentBookings || []
        allAppointments = allAppointments.concat(appointments)
        totalFetched += appointments.length
        
        console.log(`Batch ${batchNumber}: Got ${appointments.length} appointments (total: ${totalFetched})`)
        
        // Check if we got fewer results than requested (end of data)
        if (appointments.length < limit) {
          hasMore = false
          console.log(`Reached end of data. Total appointments: ${totalFetched}`)
        } else {
          offset += limit
          batchNumber++
        }
        
        // Safety check to prevent infinite loops
        if (offset > 10000) {
          console.log(`Stopping pagination at offset ${offset} for safety`)
          break
        }
        
        // Small delay between requests to be respectful
        await new Promise(resolve => setTimeout(resolve, 100))
      }
      
      return allAppointments
    }

    // Get all appointments
    const allAppointments = await getAllAppointments()

    // Get other data (single requests)
    const appointmentTypesQuery = `
      query allAppointmentTypes {
        appointmentTypes {
          id
          name
        }
      }
    `
    
    const locationsQuery = `
      query locations {
        locations {
          id
          name
          address {
            city
            state
          }
        }
      }
    `

    console.log('Fetching appointment types and locations...')
    
    const [appointmentTypesResponse, locationsResponse] = await Promise.all([
      fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ query: appointmentTypesQuery })
      }),
      fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ query: locationsQuery })
      })
    ])

    const appointmentTypesData = await appointmentTypesResponse.json()
    const locationsData = await locationsResponse.json()

    // Analyze date distribution
    const dateDistribution = {}
    allAppointments.forEach(apt => {
      const year = apt.localStartDate.split('-')[0]
      dateDistribution[year] = (dateDistribution[year] || 0) + 1
    })

    // Format the data for the text file
    let textOutput = "GREYFINCH COMPLETE DATASET - ALL APPOINTMENTS\n"
    textOutput += "==============================================\n\n"
    textOutput += `Generated: ${new Date().toISOString()}\n`
    textOutput += `API Endpoint: ${API_URL}\n`
    textOutput += `Rate Limit: 100 requests/minute (stayed under limit)\n\n`

    // Add summary statistics
    textOutput += "EXTRACTION SUMMARY\n"
    textOutput += "==================\n\n"
    textOutput += `Total Appointments: ${allAppointments.length} records\n`
    textOutput += `Appointment Types: ${appointmentTypesData.data?.appointmentTypes?.length || 0} records\n`
    textOutput += `Practice Locations: ${locationsData.data?.locations?.length || 0} records\n\n`

    textOutput += "DATE DISTRIBUTION\n"
    textOutput += "=================\n"
    Object.entries(dateDistribution).sort().forEach(([year, count]) => {
      textOutput += `${year}: ${count} appointments\n`
    })
    textOutput += "\n"

    // Add appointments data
    textOutput += `\nALL APPOINTMENTS (${allAppointments.length} records)\n`
    textOutput += "=" + "=".repeat(50) + "\n\n"
    textOutput += JSON.stringify({ appointmentBookings: allAppointments }, null, 2)
    textOutput += "\n\n"

    // Add appointment types
    textOutput += `\nAPPOINTMENT TYPES (${appointmentTypesData.data?.appointmentTypes?.length || 0} records)\n`
    textOutput += "=" + "=".repeat(50) + "\n\n"
    textOutput += JSON.stringify(appointmentTypesData.data, null, 2)
    textOutput += "\n\n"

    // Add locations
    textOutput += `\nPRACTICE LOCATIONS (${locationsData.data?.locations?.length || 0} records)\n`
    textOutput += "=" + "=".repeat(50) + "\n\n"
    textOutput += JSON.stringify(locationsData.data, null, 2)
    textOutput += "\n\n"

    return NextResponse.json({
      success: true,
      totalAppointments: allAppointments.length,
      appointmentTypes: appointmentTypesData.data?.appointmentTypes?.length || 0,
      locations: locationsData.data?.locations?.length || 0,
      dateDistribution: dateDistribution,
      textOutput: textOutput,
      summary: {
        appointments: allAppointments.length,
        appointmentTypes: appointmentTypesData.data?.appointmentTypes?.length || 0,
        locations: locationsData.data?.locations?.length || 0,
        dateDistribution: dateDistribution
      }
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({
      success: false,
      error: error.message
    })
  }
}


