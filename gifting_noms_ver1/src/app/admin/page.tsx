// app/admin/page.tsx
"use client";

import { SessionProvider, useSession } from "next-auth/react";

export default function AdminPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session || session.user?.role !== "ADMIN") {
    return <div>Access Denied</div>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome {session.user.name}</p>
    </div>
  );
}
