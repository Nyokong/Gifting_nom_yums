'use server'

import { SigninFormSchema } from '@/app/_lib/definitions';
import api from '../_lib/axios';

export async function signin(state: any, formData: FormData) {
    console.log(formData);
    // 1. Validate fields
    const validationResult = SigninFormSchema.safeParse(
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

        if (data.errors) {
        } else {
            // Handle successful sign-in (e.g., redirect)
        }
    } catch (error) {
        console.error('Error logging in:', error);
        // setErrors(error);
    }
}
// components/signin/actions.ts 
// export async function signinAdapter(state: any, payload: FormData) { return signin(payload); }
