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
    return (
      <div className="flex justify-center items-center min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] p-8">
      <div className="max-w-2xl mx-auto bg-[var(--card-background)] p-8 rounded-lg shadow-xl border-[var(--border-color)]">
        <h1 className="text-3xl font-bold mb-6 text-[var(--primary)] text-center">User Profile</h1>
        <div className="space-y-4">
          <p className="text-lg">
            <strong className="font-semibold text-[var(--accent)]">Username:</strong> {user.username}
          </p>
          <p className="text-lg">
            <strong className="font-semibold text-[var(--accent)]">Email:</strong> {user.email}
          </p>
          <p className="text-lg">
            <strong className="font-semibold text-[var(--accent)]">Instrument:</strong> {user.instrument}
          </p>
        </div>
      </div>
    </div>
  );
}
