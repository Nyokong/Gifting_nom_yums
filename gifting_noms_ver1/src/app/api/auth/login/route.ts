'use server';

import { NextResponse } from 'next/server';
import { prisma } from '@/app/_lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/_lib/auth';
import bcrypt from 'bcryptjs';

import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  message?: string;
  error?: string;
  user?: any;
};

// export async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<ResponseData>,
// ) {
//   // Check if method is POST
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }
//   try {
//     // For POST requests, the body is already parsed in Next.js
//     const { email, password } = req.body;

//     console.log('in the server side', email)

//     // Validate input
//     if (!email || !password) {
//       return res.status(400).json({ error: 'Email and password are required' });
//     }

//     console.log(email);
//     console.log(password);

//     // Your login logic here (e.g., database queries, authentication)

//     res.status(200).json({ message: 'Login successful' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    return NextResponse.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
      }
    })

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// export async function POST(req: Request) {
//   const { email, password } = await req.json();

//   console.log('return some response');
//   console.log('Received email:', email);
//   console.log('Received password:', password);

//   console.log(`in the backend: ${email}`);

//   const user = await prisma.user.findUnique({
//     where: {
//       email,
//       password,
//     },
//   });

//   if (!user) {
//     return NextResponse.json({ error: 'User not found' }, { status: 404 });
//   }

//   const passwordMatch = await bcrypt.compare(password, user.password);

//   if (!passwordMatch) {
//     return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
//   }

//   if (user && passwordMatch) {
//     // Login successful, send JSON data
//     return NextResponse.json({ message: 'Login successful' });
//   } else {
//     // Login failed, send JSON error
//     return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
//   }
// }
