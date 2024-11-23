'use client';

import Header from '@/components/header/header';
import Hero from '@/components/hero/hero';
import CardGrid from '@/components/card/cardgrid';
// import { verifySession } from '@/app/_lib/session';
import { useEffect } from 'react';

export default function Home() {
    // useEffect(() => {
    //     const logged = verifySession();

    //     if (!logged) {
    //         console.log('not logged');
    //     } else {
    //         console.log(logged);
    //     }
    // }, []);

    return (
        <>
            <Header />
            <Hero />
            <CardGrid />
        </>
    );
}
