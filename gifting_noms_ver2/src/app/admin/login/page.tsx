'use client';

import { useActionState, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
// import api from '@/app/_lib/axios';

import { login } from './actions';
import Loading from '@/app/loading';

const initialState = {
    message: '',
};

export default function LoginPage() {
    const [state, formAction, isPending] = useActionState(login, initialState);

    const [errors, setErrors] = useState<string | null>(null);

    const router = useRouter();

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        setErrors(null); // Clear previous errors when a new request starts
    }, []);

    return (
        <>
            <div className="flex flex-col items-center gap-3 ">
                <form action={formAction} className="">
                    <h1 className="">Login</h1>
                    {errors && (
                        <div className="" style={{ color: 'blue' }}>
                            {errors}
                        </div>
                    )}
                    {state.message && <p>{state.message}</p>}
                    <Input
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        className="m-2 hov-input"
                    />

                    {state.message && <p>{state.message}</p>}
                    <Input
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        className="m-2 "
                    />

                    <button
                        className="hov-button"
                        type="submit"
                        disabled={isPending}
                    >
                        {isPending ? <Loading /> : 'Sign In'}
                    </button>
                </form>
            </div>
        </>
    );
}
