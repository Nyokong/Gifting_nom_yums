"use client";

// next navigation
import { useRouter } from "next/navigation";

export default function header() {
  const router = useRouter();

  const goToPage = (path: string) => {
    router.push(path);
  };
  return (
    <div className="w-full h-[100px] items-center bg-black text-white flex flex-row justify-between">
      <h1 className="h-full flex items-center">Gifting Nom Yums</h1>
      <div className="flex flex-row w-[300px] h-full items-center justify-evenly">
        <button onClick={() => goToPage("/dashboard")}>dashboard</button>
        <button onClick={() => goToPage("/auth/login")}>Login</button>
      </div>
    </div>
  );
}
