// @/app/_lib/definitions.ts
import { z } from 'zod';

// Define the SignupFormSchema using Zod
export const SignupFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});
