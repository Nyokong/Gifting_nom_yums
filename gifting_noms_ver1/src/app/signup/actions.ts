'use server'


import bcrypt from 'bcrypt';
import { SignupFormSchema } from '@/app/_lib/definitions';
import { query } from '@/app/_utils/db';

export async function signup(state: any, formData: { get: (arg0: string) => any; }){
    // 1. Validate fields
    const validationResult = SignupFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    })
    if (!validationResult.success){
        return{
                errors: validationResult.error.flatten().fieldErrors,
            }
        
    }

    const { name, email, password } = validationResult.data

    // 2. Create user
    const hashedPassword = await bcrypt.hash(password, 10)

    const text = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *'; 
    const values = [name, email, hashedPassword]; 
    const data = await query(text, values);

    const user = data.rows[0];
    
    // 3. Create session
    return { user };
}