import { prisma } from '@/app/_lib/prisma';
import { NextResponse } from 'next/server';
import { z } from 'zod';

type ResponseData = {
    message?: string;
    error?: string;
    user?: any;
};

const schema = z.object({});

// export async function POST(request: Request) {
//     try {
//         const body = await request.json();
//         const { name } = body;

//         // const users = await prisma.user.findMany({});
//         console.log('Result:', name);
//         return NextResponse.json(name);
//     } catch (error: any) {
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }
// }

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
    const data = req.body;
    res.status(200).json({ data });

    console.log(data);
}
