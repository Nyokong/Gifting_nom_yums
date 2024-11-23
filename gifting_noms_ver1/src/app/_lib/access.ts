import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function isAuthenticated(request: NextRequest) {
    const token = await getToken({ req: request });

    // show me something
    if (token?.role == 'ADMIN') {
        console.log('Middleware Admin User Loggedin');
        return true;
    }
}
