'use client';

import api from '@/app/_lib/axios';
import Loading from '@/app/loading';
import React, { useState, FormEvent, useActionState, useEffect } from 'react';

// import { useFormState } from 'react-dom';
import { create } from './action';

const initialState = {
    message: '',
};

export default function Page() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [state, formAction, isPending] = useActionState(create, initialState);

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        setError(null); // Clear previous errors when a new request starts

        // const formData = new FormData(event.currentTarget);
        // const formDataObject = Object.fromEntries(formData.entries());
    }

    return (
        <div>
            {/* <div>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <form onSubmit={onSubmit} className="div-col-container">
                    <input
                        className="hov-input "
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="hov-button mt-3"
                    >
                        {isLoading ? <Loading /> : 'Submit'}
                    </button>
                </form>
            </div> */}
            <div className="mt-4 div-col-container">
                {error && (
                    <div className="alert-tab" style={{ color: 'blue' }}>
                        {error}
                    </div>
                )}
                <form
                    // onSubmit={onSubmit}
                    action={formAction}
                    className="form-col-container"
                >
                    <h1 className="label-normal">Test Input</h1>
                    <input
                        className="hov-input "
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                    />
                    {state?.message && (
                        <p className="mt-3 alert-tab">{state?.message}</p>
                    )}
                    {state?.errors?.name && (
                        <p className="mt-2 alert-tab">{state.errors.name}</p>
                    )}
                    <button className="hov-button mt-4">
                        {isPending ? <Loading /> : 'TestCreate'}
                    </button>
                </form>
            </div>
        </div>
    );
}
