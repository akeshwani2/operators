import { google } from 'googleapis'
import { prisma } from '@/lib/prisma'

const calendar = google.calendar('v3')

export class GoogleCalendarService {
  private auth: any

  constructor(tokens: any) {
    this.auth = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    )
    this.auth.setCredentials(tokens)

    // Set up token refresh callback
    this.auth.on('tokens', async (tokens: any) => {
      if (tokens.refresh_token) {
        // Update tokens in database
        await prisma.user.update({
          where: { id: 'default-user' },
          data: {
            googleTokens: {
              ...tokens,
              refresh_token: tokens.refresh_token
            }
          }
        })
      }
    })
  }

  async createEvent({ summary, description, startTime, endTime }: {
    summary: string
    description?: string
    startTime: Date
    endTime: Date
  }) {
    try {
      console.log('Creating calendar event with:', {
        summary,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
      })

      const response = await calendar.events.insert({
        auth: this.auth,
        calendarId: 'primary',
        requestBody: {
          summary,
          description,
          start: {
            dateTime: startTime.toISOString(),
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
          end: {
            dateTime: endTime.toISOString(),
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
        },
      })

      console.log('Calendar API Response:', response.data)
      return response.data
    } catch (error) {
      console.error('Failed to create calendar event:', error)
      throw error
    }
  }

  // List events
  async listEvents(timeMin: Date, timeMax: Date) {
    try {
      const response = await calendar.events.list({
        auth: this.auth,
        calendarId: 'primary',
        timeMin: timeMin.toISOString(),
        timeMax: timeMax.toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
      })

      return response.data.items
    } catch (error) {
      console.error('Failed to list calendar events:', error)
      throw error
    }
  }

  // Update event
  async updateEvent(eventId: string, updates: {
    summary?: string
    description?: string
    startTime?: Date
    endTime?: Date
  }) {
    try {
      const response = await calendar.events.patch({
        auth: this.auth,
        calendarId: 'primary',
        eventId: eventId,
        requestBody: {
          summary: updates.summary,
          start: updates.startTime ? {
            dateTime: updates.startTime.toISOString(),
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          } : undefined,
          end: updates.endTime ? {
            dateTime: updates.endTime.toISOString(),
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          } : undefined,
        },
      })

      return response.data
    } catch (error) {
      console.error('Failed to update calendar event:', error)
      throw error
    }
  }

  // Delete event
  async deleteEvent(eventId: string) {
    try {
      await calendar.events.delete({
        auth: this.auth,
        calendarId: 'primary',
        eventId: eventId,
      })
      return true
    } catch (error) {
      console.error('Failed to delete calendar event:', error)
      throw error
    }
  }

  // Get week summary
  async getWeekSummary() {
    const now = new Date()
    const weekStart = new Date(now)
    weekStart.setHours(0, 0, 0, 0)
    
    const weekEnd = new Date(now)
    weekEnd.setDate(weekEnd.getDate() + 7)
    weekEnd.setHours(23, 59, 59, 999)

    const events = await this.listEvents(weekStart, weekEnd)
    return this.formatEventSummary(events || [])
  }

  private formatEventSummary(events: any[]) {
    return events.map(event => ({
      title: event.summary,
      start: event.start.dateTime || event.start.date,
      end: event.end.dateTime || event.end.date,
      id: event.id
    }))
  }
}
