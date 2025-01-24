import { getTokens } from '@/services/auth/google'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 })
  }

  try {
    const tokens = await getTokens(code)
    
    // Convert tokens to a plain object that Prisma can store as JSON
    const tokenData = {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      scope: tokens.scope,
      token_type: tokens.token_type,
      expiry_date: tokens.expiry_date
    }

    // Store tokens in database
    await prisma.user.upsert({
      where: { id: 'default-user' }, // For now, just use a default user
      update: { googleTokens: tokenData },
      create: {
        id: 'default-user',
        googleTokens: tokenData
      }
    })

    // Redirect back to the main app
    return NextResponse.redirect(new URL('/', request.url))
  } catch (error) {
    console.error('Token exchange error:', error)
    return NextResponse.json({ error: 'Failed to exchange code' }, { status: 500 })
  }
}