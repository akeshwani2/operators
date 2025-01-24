import { getAuthUrl } from '@/services/auth/google'
import { NextResponse } from 'next/server'

export async function GET() {
  const authUrl = getAuthUrl()
  return NextResponse.json({ url: authUrl })
}