'use server';

import { z } from 'zod';
import api from '@/app/_lib/axios';
import { redirect } from 'next/navigation';
import { getCookie, setCookie } from 'cookies-next/client';

const loginSchema = z.object({
    email: z.string().email({ message: 'Invalid Email Address' }).trim(),
    password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters' })
        .trim(),
});

export async function login(_prevState: any, formData: FormData) {
    // 1. Validate fields
    const validatedFields = loginSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    });

    if (!validatedFields.success) {
        console.log(
            'show me some errors:',
            validatedFields.error.flatten().fieldErrors,
        );
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    } else {
        // get the validated email and password
        const { email, password } = validatedFields.data;

        // an API call to verify the credentials
        try {
            const response = await api.post('/api/auth/login', {
                email,
                password,
            });
        } catch (error: any) {
            if (error.response) {
                // Server responded with a status other than 2xx
                console.error('API Error Response:', error.response.data);
                return error;
            } else if (error.request) {
                // Request was made but no response received
                console.error('API Error Request:', error.request);
                return error;
            } else {
                // Something else happened
                console.error('Unexpected Error:', error.message);
                return error;
            }
        }
        redirect('/admin/dashboard');
    }
}

export async function logout() {}
