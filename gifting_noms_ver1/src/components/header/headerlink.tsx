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
        <div className="flex flex-row w-auto h-full items-center ">
            <button
                className=" hidden sm:block hov-button"
                onClick={() => goToPage('/auth/login')}
            >
                Login
            </button>
            <div className="div-border-separator "></div>
            <button
                className=" w-[auto] mx-1 cart-icon-container"
                onClick={() => goToPage('/dashboard')}
            >
                <div className="h-[40px] w-[40px] rounded-[20px] flex items-center justify-center flex-row">
                    <ShoppingCart size={24} />
                </div>
                <p>0 items in cart</p>
            </button>
        </div>
    );
}
