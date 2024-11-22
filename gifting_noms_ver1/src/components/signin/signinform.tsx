'use client';

import { useActionState, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
// import api from '@/app/_lib/axios';

import { login } from './actions';
import Loading from '@/app/loading';

export default function SigninForm() {
    const [state, loginAction, isLoading] = useActionState(login, undefined);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [errors, setErrors] = useState('');
    const [pending, setPending] = useState(false);

    const router = useRouter();

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleSubmit = (event: any) => {
        // event.preventDefault();
        setPending(true);

        setTimeout(() => {
            // Handle actual submission process here
            setPending(false);
        }, 7000);
    };

    // const form = event.target;
    // const formData = new FormData(form);
    // // Extract form data
    // const email = formData.get('email');
    // const password = formData.get('password');

    // // Perform the login action and handle the response
    // try {
    //     const response = await loginAction({email, password}); // Assuming loginAction returns a promise
    // // if (response.errors) {
    // //     console.log('client side errors:', response.errors);
    // //     // setErrors(response.errors.message);
    // //     // Assuming errors have a message property
    // //     }
    // } catch (error) {
    //     console.error('An error occurred during login:', error);
    //     // setErrors('An unexpected error occurred.');
    //     // Set a generic error message
    //     }
    //     finally { setPending(false); }
    // };
    // Simulate form submission process

    return (
        <>
            {isClient ? (
                <div className="flex flex-col items-center gap-3 div-col-container">
                    <form
                        action={loginAction}
                        className="form-col-container"
                        onSubmit={handleSubmit}
                    >
                        <h1 className="">Login</h1>
                        <Input
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            className="m-2 hov-input"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        {/* {errors && <p>{errors}</p>} */}
                        {state?.errors?.email && <p>{state.errors.email}</p>}
                        <Input
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            className="m-2 hov-input"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />

                        {state?.errors?.password && (
                            <p>{state.errors.password}</p>
                        )}
                        <button
                            className="hov-button"
                            type="submit"
                            disabled={isLoading}
                            // onClick={handleSubmit}
                        >
                            {isLoading ? <Loading /> : 'Sign In'}
                        </button>
                    </form>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
}
