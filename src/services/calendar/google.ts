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
}
