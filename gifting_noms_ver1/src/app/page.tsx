'use client';

import '@/app/styles/globals.scss';

import Header from '@/components/header/header';
import Hero from '@/components/hero/hero';
import CardGrid from '@/components/card/cardgrid';

export default function Home() {
    return (
        <>
            <Header />
            <Hero />
            <CardGrid />
        </>
    );
}
