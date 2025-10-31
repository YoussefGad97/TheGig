'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import SuccessMessage from '@/components/SuccessMessage';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate a local login for testing purposes
    console.log('Local Login Attempt:', { email, password });

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Simulate successful login
    const dummyToken = 'dummy-jwt-token-for-testing';
    login(dummyToken); // Use the login function from useAuth
    setShowSuccessMessage(true); // Show success message
  };

  const handleCloseSuccessMessage = () => {
    setShowSuccessMessage(false);
    router.push('/'); // Redirect to home page after closing message
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <form onSubmit={handleSubmit} className="bg-[var(--card-background)] p-8 rounded-lg shadow-xl w-full max-w-md md:max-w-lg lg:max-w-xl border-[var(--border-color)]">
        <h1 className="text-3xl font-bold mb-6 text-[var(--primary)] text-center">Login</h1>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-[var(--border-color)] rounded-md bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-[var(--border-color)] rounded-md bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            required
          />
        </div>
        <button type="submit" className="w-full bg-[var(--primary)] text-[var(--background)] p-3 rounded-md font-semibold hover:bg-[var(--accent)] transition-colors duration-300">
          Login
        </button>
      </form>

      {showSuccessMessage && (
        <SuccessMessage
          message="You have successfully logged in!"
          onClose={handleCloseSuccessMessage}
          redirectPath="/profile"
        />
      )}
    </div>
  );
}
