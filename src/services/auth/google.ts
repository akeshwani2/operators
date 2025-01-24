import { google } from 'googleapis'

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
)

// Define all the scopes we need
const SCOPES = [
  'https://www.googleapis.com/auth/calendar',        // Full calendar access
  'https://www.googleapis.com/auth/calendar.events', // Manage events
  'https://www.googleapis.com/auth/calendar.readonly', // Read-only access
  'profile',                                        // Basic profile info
  'email'                                          // Email address
]

export function getAuthUrl() {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',      // Get refresh token
    scope: SCOPES,
    prompt: 'consent'            // Force consent screen to get refresh token
  })
}

export async function getTokens(code: string) {
  const { tokens } = await oauth2Client.getToken(code)
  return tokens
}

export function setCredentials(tokens: any) {
  oauth2Client.setCredentials(tokens)
  return oauth2Client
}