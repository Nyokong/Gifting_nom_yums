"use client";

import Header from "@/components/header/header";

// next navigation
import { useRouter } from "next/navigation";

export default function Home() {
  // const router = useRouter();

  // const goToPage = (path: string) => {
  //   router.push(path);
  // };

  return (
    <div className=" items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Header />

      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* <Signupform /> */}
        {/* <div className="">
          <button onClick={() => goToPage("/dashboard")}>dashboard</button>
          <button onClick={() => goToPage("/auth/login")}>Login</button>
        </div> */}
      </main>
    </div>
  );
}
