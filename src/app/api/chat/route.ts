import { processMessage } from '@/services/ai'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { message } = await request.json()
    console.log('Received chat message:', message)

    const response = await processMessage(message)
    console.log('AI Response:', response)

    return NextResponse.json(response)
  } catch (error) {
    console.error('Chat API Error:', error)
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    )
  }
}