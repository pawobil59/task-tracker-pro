import { NextResponse } from 'next/server'

// GET /api/health - Health check endpoint
export async function GET() {
  return NextResponse.json({ 
    status: 'ok', 
    message: 'Task Tracker Pro API is running',
    timestamp: new Date().toISOString()
  })
}
