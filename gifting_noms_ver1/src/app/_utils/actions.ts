'use server'

import { SigninFormSchema } from '@/app/_lib/definitions';

export async function signin(state:any ,formData: FormData){
    
    console.log(formData);
    // 1. Validate fields
    // const validationResult = SigninFormSchema.safeParse({
    //     email: formData.get('email'),
    //     password: formData.get('password'),
    // })

    // if (!validationResult.success){
    //     return{
    //             errors: validationResult.error.flatten().fieldErrors,
    //         }
    // }

    // get the validated email and password
    // const { email, password } = validationResult.data

    // an API call to verify the credentials
    // try {
    //     const response = await fetch('/auth/session', {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({ email, password })
    //     })
  
    //     if (!response.ok) {
    //       const errorData = await response.json()
    //       throw new Error(errorData.error || 'Login failed')
    //     }
  
    //     // const data = await response.json()
    //     // Successful login - redirect to dashboard
    //   } catch (error) {
    //     console.log(error)
    //     // errors: error instanceof Error ? error.message : 'Login failed'
    //   }
   
    
      return { success: true, errors: {}, };
}
// components/signin/actions.ts 
// export async function signinAdapter(state: any, payload: FormData) { return signin(payload); }
