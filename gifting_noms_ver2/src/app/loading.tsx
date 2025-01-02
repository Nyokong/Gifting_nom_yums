'use client';

import { useEffect } from 'react';

export default function Loading() {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Only run in the client side
        }
    }, []);

    return (
        <div className="flex flex-row items-center justify-center h-full w-full">
            Loading...
        </div>
    );
}
