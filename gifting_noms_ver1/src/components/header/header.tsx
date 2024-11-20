"use client";

// next navigation
import { useRouter } from 'next/navigation';

import Link from 'next/link';

import Headerlink from './headerlink';

export default function header() {
    const router = useRouter();

    const goToPage = (path: string) => {
        router.push(path);
    };

    return (
        <header>
            <h1 className="h-full flex items-center div-container">
                <Link href="/">Gifting Nom Yums</Link>
            </h1>
            <div>
                {/* w-full h-[100px] items-center bg-black text-white flex flex-row justify-between */}
            </div>
            <nav>
                <ul>
                    <li>
                        <Link href="/">Explore</Link>
                    </li>
                    <li>
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
