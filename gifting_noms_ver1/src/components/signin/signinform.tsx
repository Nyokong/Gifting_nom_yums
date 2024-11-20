"use client";

import { useActionState, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
// import api from '@/app/_lib/axios';

import { login } from './actions';

export default function SigninForm() {
    const [state, loginAction] = useActionState(login, undefined);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pending, setPending] = useState(false);

    const router = useRouter();

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);

        // If state contains user, perform client-side redirection
        if (state?.user && state.redirect) {
            router.push('/');
            // Redirect on successful login
        }
        // Handle errors if they exist in state
        if (state?.errors) {
            setErrors(state.errors);
            setPending(false);
        }
    }, [state, router]);

    // const handleSubmit = async (e: any) => {
    //     e.preventDefault();
    //     setPending(true);

    //     const formData = new FormData();
    //     formData.append('email', email);
    //     formData.append('password', password);

    //     // try {
    //     //     const response = await loginAction({},formData);
    //     //     if (response.user) {
    //     //         console.log('User ID:', response.user.id);
    //     //         setPending(false);
    //     //         router.push('/');
    //     //     } else if (response.errors) {
    //     //         setPending(false);
    //     //         console.error('Login errors:', response.errors);
    //     //     }
    //     // } catch (error) {
    //     //     console.error('Error during login:', error);
    //     //     setPending(false);
    //     // }
    // };

    return (
        <>
            {isClient ? (
                <form
                    action={loginAction}
                    className="w-[300px] h-[auto] flex flex-col justify-center items-center div-container"
                >
                    <Input
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        className="m-2 p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    {state?.errors?.email && <p>{state.errors.email}</p>}
                    <Input
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        className="m-2 p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    {state?.errors?.password && <p>{state.errors.password}</p>}
                    <button className="button" type="submit" disabled={pending}>
                        {pending ? 'Submitting...' : 'Sign In'}
                    </button>
                </form>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
}
function setErrors(errors: any) {
    throw new Error('Function not implemented.');
}

