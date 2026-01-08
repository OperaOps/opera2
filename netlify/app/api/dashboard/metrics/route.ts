import { NextResponse } from 'next/server'
import { demoData } from '../../../../lib/demo-data'

export async function GET() {
  try {
    console.log('📊 Serving demo practice metrics to dashboard')
    
    return NextResponse.json({
      success: true,
      metrics: demoData.metrics
    })
    
  } catch (error) {
    console.error('Error in metrics API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
