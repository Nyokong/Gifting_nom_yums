// types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
    interface Session extends DefaultSession {
        user: {
            id: string;
            email: string;
            name: string;
            role: string;
        } & DefaultSession['user'];
    }

    interface User extends DefaultUser {
        id: string;
        email: string;
        name: string;
        role: string;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: string;
        email: string;
        name: string;
        role: string;
    }
}
