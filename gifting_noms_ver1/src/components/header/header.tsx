"use client";

// next navigation
import { useRouter } from "next/navigation";
import { signIn, signOut } from 'next-auth/react';

import Link from 'next/link';
import styles from './Header.module.scss';

import '@/app/styles/globals.scss';
import Headerlink from './headerlink';

export default function header() {
    const router = useRouter();

    const goToPage = (path: string) => {
        router.push(path);
    };

    return (
        <header className={styles.header}>
            <h1 className="h-full flex items-center">
                <Link href="/">Gifting Nom Yums</Link>
            </h1>
            <div className={styles.logo}>
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
                    <li>
                        <Link href="/">Login</Link>
                    </li>
                </ul>
            </nav>
            <div className="">
                <Headerlink />
            </div>
        </header>
    );
}
