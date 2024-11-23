'use server';

import { z } from 'zod';
import api from '@/app/_lib/axios';
import { createSession } from '@/app/_lib/session';
import { redirect } from 'next/navigation';

const loginSchema = z.object({
    email: z.string().email({ message: 'Invalid Email Address' }).trim(),
    password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters' })
        .trim(),
});

export async function login(prevState: any, formData: FormData) {
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

            const data = response.data;

            const id = data.user.id;

            const session = await createSession(id);

            if (session) {
                redirect('/');
            }

            // return { user: data.user, redirect: true, errors: data.message };
        } catch (error: any) {
            if (error.response) {
                console.error(error);
                return {
                    message: error,
                };
                // return {
                //     errors: {
                //         message: error.response.data,
                //         status: error.response.status,
                //     },
                // };
            }
        }
    }
}

export async function logout() {}
