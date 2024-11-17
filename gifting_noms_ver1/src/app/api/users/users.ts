// In app/api/users/route.ts
import { prisma } from '@/app/_lib/prisma';
import { NextResponse } from 'next/server';

// This is a Next.js API Route handler for GET requests
export async function GET() {
  try {
    // 1. Query the database using Prisma
    const users = await prisma.user.findMany({
      // 2. Include related posts for each user
      include: {
        posts: true,
      },
      // 3. You can add more query options:
      select: {
        id: true,
        name: true,
        email: true,
        posts: {
          select: {
            id: true,
            title: true,
            content: true,
          }
        }
      },
      // 4. Add filters
      where: {
        posts: {
          some: {
            published: true
          }
        }
      },
      // 5. Add sorting
      orderBy: {
        createdAt: 'desc'
      },
      // 6. Add pagination
      take: 10,
      skip: 0
    });

    // 7. Return the response
    return NextResponse.json(users);
  } catch (error) {
    // 8. Error handling
    return NextResponse.json(
      { error: error.message }, 
      { status: 500 }
    );
  }
}