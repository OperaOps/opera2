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
    
    // Query for today's agenda
    const query = `
      query docs_todays_agenda {
        appointmentBookings(where: { localStartDate: { _eq: "now()" } }) {
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
    `

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({ query })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    
    if (data.errors) {
      throw new Error(`Query failed: ${JSON.stringify(data.errors)}`)
    }

    return NextResponse.json(data.data)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}


