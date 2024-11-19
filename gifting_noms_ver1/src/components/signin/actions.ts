'use server';

import { z } from 'zod';
import api from '@/app/_lib/axios';
import { createSession } from '@/app/_lib/session';
// import { redirect } from 'next/navigation';

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

    if (!validationResult.success) {
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
        console.log('API response data:', data); // Add this log

        if (data.errors) {
            // Handle errors from the API response
            return { errors: data.errors };
        } else {
            const id = data.user.id;
            // Handle successful sign-in (e.g., redirect)
            console.log('user ID:', id);
            await createSession(id);

            return { user: data.user, redirect: true };
        }
    } catch (error: any) {
        if (error.response) {
            console.error('Error response:', error.response.data);
            console.error('Status code:', error.response.status);
            console.error('Headers:', error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error message:', error.message);
        }
        console.error('Error config:', error.config);
    }
}

export async function logout() {}
