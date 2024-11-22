'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import api from '@/app/_lib/axios';

const schema = z.object({
    name: z.string().min(5),
});

export async function create(prevState: any, formData: FormData) {
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
            const response = await api.post('/api/tests/post', {name});

            // console.log(response.data);
            // If the request succeeds, handle the response as needed
            // console.log('Client Side: ', response.data);
        } catch (error: any) {
            console.error(error);
            return {
                message: error,
            };
        }
    }
    // redirect('/');
}
