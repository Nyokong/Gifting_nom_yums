"use client";

import Header from '@/components/header/header';
import Signinform from '@/components/signin/signinform';

export default function page() {
    return (
        <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-[100%]">
            <Header />
            <div className="flex flex-col items-center gap-3 div-col-container">
                <Signinform />
            </div>
        </div>
    );
}
