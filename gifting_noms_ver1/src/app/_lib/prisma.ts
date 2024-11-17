// 1. Import PrismaClient
import { PrismaClient } from '@prisma/client';

// 2. Define a type for the global object
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// 3. Create or reuse a Prisma instance
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

// 4. Save the instance in development
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;