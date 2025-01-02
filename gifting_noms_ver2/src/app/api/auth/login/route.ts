'use server';

// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/app/_lib/auth';

import { NextResponse } from 'next/server';
import { prisma } from '@/app/_lib/prisma';
import bcrypt from 'bcryptjs';
import { createSession } from '@/app/_lib/session';

// import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
    message?: string;
    error?: string;
    user?: any;
};

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 },
            );
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 },
            );
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            console.log('error on password');
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 },
            );
        }

        // creates the session
        createSession(user.id);

        return NextResponse.json({
            message: 'Login successful',
            user: {
                id: user.id,
                email: user.email,
            },
        });
    } catch (error) {
        // console.error('Login error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 },
        );
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
