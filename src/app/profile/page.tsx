'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const [user, setUser] = useState<{ username: string; email: string; instrument: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    // In a real application, you would fetch the user's data from the server
    // using the token. For now, we'll just use a placeholder.
    setUser({
      username: 'Test User',
      email: 'test@example.com',
      instrument: 'Guitar',
    });
  }, [router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Profile</h1>
      <p>
        <strong>Username:</strong> {user.username}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Instrument:</strong> {user.instrument}
      </p>
    </div>
  );
}
