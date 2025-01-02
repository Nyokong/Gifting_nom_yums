import { prisma } from '@/app/_lib/prisma';
import { NextResponse } from 'next/server';

import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
    message?: string;
    error?: string;
    user?: any;
};

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name } = body;

        // const users = await prisma.user.findMany({});
        return NextResponse.json(name);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
