'use client';

import { useEffect } from 'react';
import { orbit } from 'ldrs';

export default function Loading() {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Only run in the client side
            orbit.register();
        }
    }, []);

    return (
        <div className="flex flex-row items-center justify-center h-full w-full">
            <l-orbit size="35" speed=".5" color="white"></l-orbit>
        </div>
    );
}
