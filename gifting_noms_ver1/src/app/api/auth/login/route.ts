import { NextResponse } from 'next/server'
import { prisma } from '@/app/_lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/_lib/auth'
import bcrypt from 'bcryptjs';


export async function POST(req: Request) {
    try {
      // const session = await getServerSession(authOptions)
      
      const { email, password } = await req.json()

      const user = await prisma.user.findUnique({
        where: { 
              email,
              password, 
            },
      })

      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
      }
  
    // Successful login, handle session management, token generation, etc.
    return NextResponse.json({ message: 'Login successful' });
  
    } catch (error) {
      console.error('Error creating user:', error)
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    }
  }