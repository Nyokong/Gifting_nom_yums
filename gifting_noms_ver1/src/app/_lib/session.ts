import { Role } from '@prisma/client';
import 'server-only';
import { JWTPayload, SignJWT, jwtVerify } from 'jose';

import { prisma } from '@/app/_lib/prisma';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const key = new TextEncoder().encode(process.env.SECRET);

type SessionPayLoad = {
    userId: string;
    expiresAt: Date;
};

export async function encrypt(payload: SessionPayLoad) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1day')
        .sign(key);
}

export async function decrypt(session: string | Uint8Array) {
    try {
        const { payload } = await jwtVerify(session, key, {
            algorithms: ['HS256'],
        });

        return payload;
    } catch (error) {
        console.log('failed to verify session');
        return null;
    }
}

export async function createSession(userId: string) {
    const expiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
    const sessionToken = await encrypt({ userId, expiresAt });

    const sessionCookie = await cookies();

    if (sessionToken) {
        console.log('session has been created!');
        sessionCookie.set({
            name: 'session',
            value: sessionToken,
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 1,
        });

        // creating the session database entry
        try {
            const admin = await prisma.session.create({
                data: {
                    sessionToken,
                    userId,
                    expires: expiresAt,
                },
            });
            return admin;
        } catch (error) {
            console.error('Error creating admin:', error);
            throw new Error('Failed to create admin user');
        }
    }
}

export async function verifySession() {
    const sessionCookie = await cookies();
    const token = sessionCookie.get('session');
    if (token) {
        const session = await decrypt(token.value);

        console.log('user is logged in');

        if (!session?.userId) {
            redirect('/auth/login');
        }

        return { userId: session.userId };
    } else {
        console.error('Cookie value is undefined');
    }
}

export async function middlwareVerification() {
    const sessionCookie = await cookies();
    const token = sessionCookie.get('session');
    console.log('from session page');

    if (!token) {
        console.error('Cookie value is undefined');
        return null;
    }

    const session = await decrypt(token.value);

    if (!session?.userId) {
        console.error('Invalid or expired session');
        return null;
    }

    return { userId: session.userId, role: session.Role };
}
