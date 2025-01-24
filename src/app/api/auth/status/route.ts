import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const user = await prisma.user.findUnique({
      where: { id: 'default-user' },
      select: { googleTokens: true }
    })

    return NextResponse.json({
      authenticated: !!user?.googleTokens,
    })
  } catch (error) {
    console.error('Auth status check failed:', error)
    return NextResponse.json({
      authenticated: false,
      error: 'Failed to check authentication status'
    })
  }
}