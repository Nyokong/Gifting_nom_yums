import { prisma } from "@/app/_lib/prisma"


async function getAllUsers() {
  const users = await prisma.user.findMany({
    where: { 
      // Optional filtering
      //gte: new Date('2023-01-01') 
      createdAt: { }
    },
    orderBy: { createdAt: 'asc' }
  })
  return users
}