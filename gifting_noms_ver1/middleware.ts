// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
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
}

export const config = {
    matcher: '/api/admin/:path*',
};
