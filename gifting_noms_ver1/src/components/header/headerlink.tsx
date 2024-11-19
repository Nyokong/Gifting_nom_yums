'use client';

// next navigation
import { useRouter } from 'next/navigation';

import { ShoppingCart } from 'lucide-react';

export default function headerlink() {
    const router = useRouter();

    const goToPage = (path: string) => {
        router.push(path);
    };
    return (
        <div className="flex flex-row w-[300px] h-[auto] items-center justify-evenly div-vertical-cont">
            <button className="" onClick={() => goToPage('/dashboard')}>
                <ShoppingCart size={24} color="#000" />
            </button>
            <div className="div-border-separater"></div>
            <button className="" onClick={() => goToPage('/auth/login')}>
                Login
            </button>
        </div>
    );
}
