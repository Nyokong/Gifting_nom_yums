import { NextResponse } from 'next/server'
import { createAdminUser } from '@/app/_utils/auth'

export async function POST(req: Request) {
  try {
    // In production, you might want to add additional security like API keys
    const { email, password, name, secretKey } = await req.json()

    // Verify secret key (should match environment variable)
    if (secretKey !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const admin = await createAdminUser({ email, password, name })
    
    return NextResponse.json({
      message: 'Admin created successfully',
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role
      }
    })
  } catch (error) {
    console.error('Error creating admin:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create admin' },
      { status: 500 }
    )
  }
}