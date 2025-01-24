import { prisma } from '@/lib/prisma'
import { GoogleCalendarService } from '@/services/calendar/google'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('Received calendar request:', body)

    const { title, date, time } = body

    // Parse the exact date and time
    const [hours, minutes] = time.split(':')
    const eventDateTime = new Date(`${date}T${time}:00`)

    // Create end time (1 hour later)
    const endDateTime = new Date(eventDateTime)
    endDateTime.setHours(endDateTime.getHours() + 1)

    console.log('Event times:', {
      start: eventDateTime.toISOString(),
      end: endDateTime.toISOString()
    })

    // Get tokens from database
    const user = await prisma.user.findUnique({
      where: { id: 'default-user' }
    })

    if (!user?.googleTokens) {
      return NextResponse.json(
        { error: 'No Google tokens found. Please connect your Google Calendar.' },
        { status: 401 }
      )
    }

    const calendarService = new GoogleCalendarService(user.googleTokens)
    
    const event = await calendarService.createEvent({
      summary: title,
      description: `Created via AI Assistant`,
      startTime: eventDateTime,
      endTime: endDateTime
    })

    return NextResponse.json({ 
      success: true, 
      event,
      message: `Successfully created "${title}" for ${date} at ${time}`
    })

  } catch (error) {
    console.error('Calendar operation failed:', error)
    return NextResponse.json(
      { error: 'Failed to create calendar event' },
      { status: 500 }
    )
  }
}