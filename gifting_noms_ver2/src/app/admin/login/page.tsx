'use client';
import { Button } from '@/components/ui/button';

import axios from 'axios';

import React from 'react';

export default function page() {
    return (
        <div className="container flex justify-center items-center mt-5 ">
            <div className="h-[auto] w-[500px] bg-slate-800 rounded-sm flex justify-center items-center gap-3 flex-col p-5">
                <label htmlFor="" className="text-white text-2xl">
                    Enter your pass-code
                </label>
                <input
                    type="text"
                    name="code"
                    placeholder="Enter your pin/code"
                    className="h-10 w-[270px] rounded-md px-3"
                    autoComplete="none"
                />

                <Button className="text-white w-[100px] h-[40px] rounded-lg">
                    Next
                </Button>
            </div>
        </div>
    );
}
