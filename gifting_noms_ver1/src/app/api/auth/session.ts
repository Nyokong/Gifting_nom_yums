import { prisma } from '@/app/_lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { randomBytes } from 'crypto'
import bcrypt from 'bcryptjs'

// generate session id
function generateSessionId(): string {
  return randomBytes(32).toString('hex')
}

// generate session token
function generateSessionToken(): string {
  return randomBytes(32).toString('hex')
}

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const { email, password } = req.body

  try {
    // gets the user from the request body
    // const { user } = req.body

    // if (!user || !user.id) {
    //   return res.status(400).json({ error: 'Invalid user data' })
    // }
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email }
    })

    // Validate password
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // set session id to generated sessionid
    const sessionId = generateSessionId()

    // create session token
    const sessionToken = generateSessionToken()
    
    // Use Prisma to insert session
    const session = await prisma.session.create({
      data: {
        id: sessionId,
        sessionToken: sessionToken,
        userId: user.id,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
      }
    })

    // then create a cookie 
    // Set secure HTTP-only cookie (client-side)
    res.setHeader('Set-Cookie', `session=${sessionToken}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict`)

    // set response message 
    res.status(200).json({ 
      message: 'Login successful',
      user: { 
        id: user.id, 
        email: user.email 
      }
    })

    res.status(200).json({ sessionId: session.id })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}