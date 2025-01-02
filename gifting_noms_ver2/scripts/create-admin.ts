// scripts/create-admin.ts
import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createFirstAdmin() {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminName = process.env.ADMIN_NAME;

    // if you didnt provide admin in the env
    if (!adminEmail || !adminPassword) {
        console.error(
            'Please provide ADMIN_EMAIL and ADMIN_PASSWORD in your .env file',
        );
        return;
    }

    try {
        // checks if the user with the role admin already exists
        const existingAdmin = await prisma.user.findFirst({
            where: {
                role: Role.ADMIN,
            },
        });

        // if exists return
        if (existingAdmin) {
            console.log('Admin already exists!');
            return;
        }

        // generates salt
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(adminPassword, salt);

        // where it creates the user
        const admin = await prisma.user.create({
            data: {
                email: adminEmail,
                password: hashedPassword,
                name: adminName || 'Admin User',
                role: Role.ADMIN,
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
            },
        });

        console.log('Admin created successfully:', admin);
    } catch (error) {
        console.error('Error creating admin:', error);
    } finally {
        await prisma.$disconnect();
    }
}

createFirstAdmin();
