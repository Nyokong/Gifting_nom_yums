"use client";

import Signupform from "@/components/signup/signupform";

// next navigation
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const goToPage = (path) => {
    router.push(path);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Gifting Nom Yums</h1>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* <Signupform /> */}
        <div>
          <button onClick={() => goToPage("/dashboard")}>dashboard</button>
          <button onClick={() => goToPage("/contact")}>
            Go to Contact Page
          </button>
        </div>
      </main>
    </div>
  );
}
