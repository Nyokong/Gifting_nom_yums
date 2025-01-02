'use client';

import React from 'react';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AlignJustify, Search, ShoppingCart } from 'lucide-react';

export default function header() {
    return (
        <div className="w-full h-[120px] flex flex-col items-center justify-center">
            <div className="bg-primary text-white w-full h-[30px] text-[10px] flex flex-row justify-center items-center fixed top-0">
                <p>for detailed sites text this whatsapp number </p>
                <Link
                    href="tel:+2348100000000"
                    className="mx-3 hover:text-purple-600"
                >
                    +27 792 4732
                </Link>
            </div>
            <div className="w-full flex flex-row items-center h-[auto]  px-4">
                <Link href="/" className="text-1xl w-[100px] ">
                    Gifiting-Nom-Yums
                </Link>

                {/* For mobile devices */}
                <div className="md:hidden flex justify-end w-full">
                    <AlignJustify />
                </div>

                {/* for desktop */}
                <div className=" w-[auto] h-[100px] hidden md:flex flex-row items-center">
                    <div className="h-full w-[auto] px-2 flex flex-row items-center">
                        {/* search */}
                        <form className="flex flex-row items-center">
                            <Input
                                placeholder="Search For Yums..."
                                className="rounded-[10px] w-[500px] mx-2"
                                type="search"
                            />
                            <Button className="h-[40px] w-[40px]">
                                <Search />
                            </Button>
                        </form>
                    </div>
                    {/* shopping stuff */}
                    <div className="mx-2 bg-slate-500 h-[auto] w-[auto] flex flex-row items-center rounded-md p-2">
                        <Button className="h-[40px] w-[40px]">
                            <ShoppingCart />
                        </Button>
                        <p className="h-[40px] w-[70px] mx-4 flex flex-row justify-center items-center text-background">
                            0 Items
                        </p>
                    </div>
                </div>
            </div>
            <div className="h-[20px] w-full bg-black">bottom header</div>
        </div>
    );
}
