// utils/auth.ts
import { PrismaClient, Role } from '@prisma/client';
import { prisma } from '@/app/_lib/prisma';
import bcrypt from 'bcryptjs';

export async function createAdminUser({
    email,
    password,
    name,
}: {
    email: string;
    password: string;
    name: string;
}) {
    // Check if admin already exists
    const existingAdmin = await prisma.user.findFirst({
        where: {
            role: Role.ADMIN,
        },
    });

    if (existingAdmin) {
        throw new Error('Admin user already exists');
    }

    //else
    // Hash password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        const admin = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name: name || '', // Provide a default value if name is optional
                role: Role.ADMIN,
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                // Don't select password in the return value
            },
        });

        return admin;
    } catch (error) {
        console.error('Error creating admin:', error);
        throw new Error('Failed to create admin user');
    }
}
