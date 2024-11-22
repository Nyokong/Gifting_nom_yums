// app/admin/page.tsx
'use client';

// export default function page() {
//   return (
//     <div>
//       <h1>Welcome to the admin page</h1>
//     </div>
//   )
// }

import { SessionProvider, signOut, useSession } from 'next-auth/react';

export default function AdminPage() {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (!session || session.user?.role !== 'ADMIN') {
        return <div>Access Denied</div>;
    }

    if (status === 'authenticated') {
        return (
            <div>
                {' '}
                <p>Welcome, {session.user.email}</p>{' '}
                <button onClick={() => signOut()}>Sign out</button>{' '}
            </div>
        );
    }

    // return (
    //     <div>
    //         <h1>Admin Dashboard</h1>
    //         <p>Welcome {session.user.name}</p>
    //     </div>
    // );
}
