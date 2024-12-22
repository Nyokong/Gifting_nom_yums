'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import api from '@/app/_lib/axios';

const schema = z.object({
    name: z.string().min(5),
});

export async function create(_prevState: any, formData: FormData) {
    const validatedFields = schema.safeParse({
        name: formData.get('name'),
    });

    // Return early if the form data is invalid
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    } else {
        try {
            console.log(validatedFields.data.name);
            const { name } = validatedFields.data;
            const response = await api.post('/api/tests/post', { name });

            // console.log(response.data);
            // If the request succeeds, handle the response as needed
            // console.log('Client Side: ', response.data);
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

            // throw error;
        }
        redirect('/');
    }
}
