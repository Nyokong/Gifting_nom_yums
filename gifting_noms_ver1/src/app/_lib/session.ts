import 'server-only';
import { JWTPayload, SignJWT, jwtVerify } from 'jose';

import { cookies } from 'next/headers';
import { setCookie } from 'cookies-next';

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
    const session = await encrypt({ userId, expiresAt });

    const sessionCookie = await cookies();

    if (session) {
        console.log('session has been created: ', session);
        // setCookie('session', session, { maxAge: 60 * 60 * 1 });
        sessionCookie.set({
            name: 'session',
            value: session,
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 1,
        });
    }
}

// export async function verifySession(){
//   const cookie = (await cookies()).get(cookie.name)?.value;
//   const session = await decrypt(cookie);

//   if(!session?.userId){
//     redirect('/login');
//   }

//   return {userId: session.userId }
// }
