import { prisma } from '@/lib/prisma'
import { GoogleCalendarService } from '@/services/calendar/google'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('Calendar API received:', body)
    const { action, title, date, time, period, eventId, changes } = body

    // Get tokens from database first
    const user = await prisma.user.findUnique({
      where: { id: 'default-user' }
    })

    if (!user?.googleTokens) {
      return NextResponse.json(
        { error: 'No Google tokens found. Please connect your Google Calendar.' },
        { status: 401 }
      )
    }

    // Initialize calendar service with tokens
    const calendarService = new GoogleCalendarService(user.googleTokens)

    switch (action) {
      case 'list_events':
        const now = new Date()
        const endDate = new Date(now)
        if (period === 'week') endDate.setDate(endDate.getDate() + 7)
        else if (period === 'month') endDate.setMonth(endDate.getMonth() + 1)
        else endDate.setDate(endDate.getDate() + 1)
        
        const events = await calendarService.listEvents(now, endDate)
        return NextResponse.json({ success: true, events })

      case 'update_event':
        // First, get the event details to update
        const upcomingEvents = await calendarService.listEvents(
          new Date(), // from now
          new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // to 30 days from now
        ) || []
        
        // Find the event with matching title or closest match
        const eventToUpdate = upcomingEvents.find((event: any) => 
          event.summary.toLowerCase().includes(title.toLowerCase())
        )

        if (!eventToUpdate || !eventToUpdate.id) {
          return NextResponse.json(
            { error: 'Could not find the event to update' },
            { status: 404 }
          )
        }

        // Parse the new date and time
        const newDateTime = new Date(`${date}T${time}:00`)
        const newEndDateTime = new Date(newDateTime)
        newEndDateTime.setHours(newEndDateTime.getHours() + 1) // Assume 1-hour duration

        const updatedEvent = await calendarService.updateEvent(
          eventToUpdate.id as string, // Type assertion since we checked it exists above
          {
            summary: changes?.newTitle || eventToUpdate.summary,
            startTime: newDateTime,
            endTime: newEndDateTime
          }
        )

        return NextResponse.json({ 
          success: true, 
          event: updatedEvent,
          message: `Successfully rescheduled "${eventToUpdate.summary}" to ${date} at ${time}`
        })

      case 'delete_event':
        await calendarService.deleteEvent(eventId)
        return NextResponse.json({ success: true, message: 'Event deleted' })

      case 'create_event':
        const eventDateTime = new Date(`${date}T${time}:00`)
        const endDateTime = new Date(eventDateTime)
        endDateTime.setHours(endDateTime.getHours() + 1)

        const event = await calendarService.createEvent({
          summary: title,
          description: `Created via EVO`,
          startTime: eventDateTime,
          endTime: endDateTime
        })

        return NextResponse.json({ 
          success: true, 
          event,
          message: `Successfully created "${title}" for ${date} at ${time}`
        })

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch (error) {
    console.error('Calendar operation failed:', error)
    return NextResponse.json(
      { error: 'Operation failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}