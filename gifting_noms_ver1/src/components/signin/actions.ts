'use server';

import { z } from 'zod';
import api from '@/app/_lib/axios';
import { createSession } from '@/app/_lib/session';
import { redirect } from 'next/dist/server/api-utils';

const loginSchema = z.object({
    email: z.string().email({ message: 'Invalid Email Address' }).trim(),
    password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters' })
        .trim(),
});

export async function login(_prevState: any, formData: FormData) {
    // 1. Validate fields
    const validationResult = loginSchema.safeParse(
        Object.fromEntries(formData),
    );

    if (validationResult.error) {
        console.log('Ok progress');
    }

    if (!validationResult.success) {
        console.log(
            'show me some errors:',
            validationResult.error.flatten().fieldErrors,
        );
        return {
            errors: validationResult.error.flatten().fieldErrors,
        };
    }

    // get the validated email and password
    const { email, password } = validationResult.data;

    // an API call to verify the credentials
    try {
        const response = await api.post('/api/auth/login', {
            email,
            password,
        });

        const data = response.data;

        const id = data.user.id;

        await createSession(id);

        // redirect('/admin/dashboard');

        return { user: data.user, redirect: true, errors: data.message };
    } catch (error: any) {
        if (error.response) {
            console.error('Error response:', error.response.data);
            console.error('Status code:', error.response.status);
            return {
                errors: {
                    message: error.response.data,
                    status: error.response.status,
                },
            };
        }
    }
}

export async function logout() {}
