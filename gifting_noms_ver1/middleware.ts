// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// get session
import { middlwareVerification } from '@/app/_lib/session';

export async function middleware(request: NextRequest) {
    const protectedRoutes = ['/admin/dashboard'];

    // // Check if the current request matches a protected route
    // if (
    //     protectedRoutes.some(route =>
    //         request.nextUrl.pathname.startsWith(route),
    //     )
    // ) {
    //     const session = await middlwareVerification();

    //     if (!session) {
    //         // Redirect to login page if the session is invalid
    //         return NextResponse.redirect(new URL('/auth/login', request.url));
    //     }
    // }

    // Only protect /api/admin routes
    if (request.nextUrl.pathname.startsWith('/api/admin')) {
        const token = await getToken({ req: request });

        if (!token || token.role !== 'ADMIN') {
            return new NextResponse(
                JSON.stringify({ message: 'Unauthorized' }),
                {
                    status: 403,
                    headers: { 'content-type': 'application/json' },
                },
            );
        }
    }
    if (request.nextUrl.pathname.startsWith('/admin/dashboard')) {
        const token = await getToken({ req: request });

        if (!token || token.role !== 'ADMIN') {
            console.log('admin user is logged in');
            return new NextResponse(
                JSON.stringify({ message: 'Unauthorized' }),
                {
                    status: 403,
                    headers: { 'content-type': 'application/json' },
                },
            );
        }
    }

    // Allow the request to proceed
    return NextResponse.next();
}

export const config = {
    matcher: '/api/admin/:path*',
};
