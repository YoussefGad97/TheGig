"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
    };

    checkAuth(); // Check auth status on mount

    // Listen for changes in localStorage across tabs/windows
    window.addEventListener('storage', checkAuth);

    // Clean up the event listener
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []); // Empty dependency array to run only once on mount and setup listener

  const login = (token: string) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    router.push('/login'); // Redirect to login page after logout
  };

  return { isAuthenticated, login, logout };
};

export default useAuth;
