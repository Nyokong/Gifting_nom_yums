import { prisma } from '@/app/_lib/prisma';
import { NextResponse } from 'next/server';

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
//   if (req.method !== 'GET') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }else{
//     console.log('it works bro ')
//     return res.status(200).json({ error: 'success' });
//   }
// }

// export async function GET() {
//   try {
//     const users = await prisma.user.findMany({});
//     return NextResponse.json(users);
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    // const users = await prisma.user.findMany({});
    return NextResponse.json(email);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}