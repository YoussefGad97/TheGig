'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import SuccessMessage from '@/components/SuccessMessage';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [instrument, setInstrument] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const router = useRouter();
  const { login } = useAuth(); // Assuming successful registration also logs the user in

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate a local registration for testing purposes
    console.log('Local Register Attempt:', { username, email, password, instrument });

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Simulate successful registration and login
    const dummyToken = 'dummy-jwt-token-for-testing'; // In a real app, this would come from the API
    login(dummyToken); // Log in the user after registration
    setShowSuccessMessage(true); // Show success message
  };

  const handleCloseSuccessMessage = () => {
    setShowSuccessMessage(false);
    router.push('/'); // Redirect to home page after closing message
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <form onSubmit={handleSubmit} className="bg-[var(--card-background)] p-8 rounded-lg shadow-xl w-full max-w-md md:max-w-lg lg:max-w-xl border-[var(--border-color)]">
        <h1 className="text-3xl font-bold mb-6 text-[var(--primary)] text-center">Register</h1>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-[var(--border-color)] rounded-md bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            required
          />
        </div>
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
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-[var(--border-color)] rounded-md bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Instrument</label>
          <input
            type="text"
            value={instrument}
            onChange={(e) => setInstrument(e.target.value)}
            className="w-full p-2 border border-[var(--border-color)] rounded-md bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            required
          />
        </div>
        <button type="submit" className="w-full bg-[var(--primary)] text-[var(--background)] p-3 rounded-md font-semibold hover:bg-[var(--accent)] transition-colors duration-300">
          Register
        </button>
      </form>

      {showSuccessMessage && (
        <SuccessMessage
          message="Registration successful! You are now logged in."
          onClose={handleCloseSuccessMessage}
          redirectPath="/profile"
        />
      )}
    </div>
  );
}
