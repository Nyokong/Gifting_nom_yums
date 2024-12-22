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

export default function SigninForm() {
    const [state, formAction, isPending] = useActionState(login, initialState);

    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<string | null>(null);
    // const [pending, setPending] = useState(false);

    const router = useRouter();

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        setErrors(null); // Clear previous errors when a new request starts
    }, []);

    return (
        <>
            {isClient ? (
                <div className="flex flex-col items-center gap-3 div-col-container">
                    <form action={formAction} className="form-col-container">
                        <h1 className="">Login</h1>
                        {errors && (
                            <div
                                className="alert-tab"
                                style={{ color: 'blue' }}
                            >
                                {errors}
                            </div>
                        )}
                        {state?.errors?.email && (
                            <p className="mt-3 alert-tab">
                                {state?.errors?.email}
                            </p>
                        )}
                        <Input
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            className="m-2 hov-input"
                        />

                        {state?.errors?.password && (
                            <p className="mt-3 alert-tab">
                                {state?.errors?.password}
                            </p>
                        )}
                        <Input
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            className="m-2 hov-input"
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
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
}
