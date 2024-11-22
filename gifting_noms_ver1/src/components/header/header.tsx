'use client';

// next navigation
import { useRouter } from 'next/navigation';

import { Citrus, Icon, Menu } from 'lucide-react';

import Link from 'next/link';

import Headerlink from './headerlink';

export default function header() {
    const router = useRouter();

    const goToPage = (path: string) => {
        router.push(path);
    };

    return (
        <header className="header-top-desk">
            <div className='hidden sm:block'>
                <Menu />
            </div>
            <h1 className="h-full flex items-center home">
                <Link
                    className="text-1xl text-bold px-2 flex flex-row"
                    href="/"
                >
                    <Citrus className="mx-2" />
                    GiftingNomYums
                </Link>
            </h1>
            <div>
                {/* w-full h-[100px] items-center bg-black text-white flex flex-row justify-between */}
            </div>
            <nav className="hidden sm:block">
                <ul className="links-container">
                    <li className="link-tag">
                        <Link href="/">Explore</Link>
                    </li>
                    <li className="link-tag">
                        <Link href="/">About</Link>
                    </li>
                </ul>
            </nav>
            <div className="">
                <Headerlink />
            </div>
        </header>
    );
}
