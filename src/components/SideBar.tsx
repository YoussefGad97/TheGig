'use client';

import Link from 'next/link';
import useAuth from '@/hooks/useAuth';

interface SideBarProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const SideBar: React.FC<SideBarProps> = ({ isOpen, onClose, className }) => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-[var(--card-background)] text-[var(--foreground)] shadow-lg transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 transition-transform duration-300 ease-in-out z-40 ${className || ''}`}
    >
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-6 text-[var(--primary)]">Navigation</h2>
        <ul className="space-y-4">
          <li>
            <Link href="/" className="block text-[var(--foreground)] hover:text-[var(--primary)] hover:bg-[var(--background)] px-3 py-2 rounded-md transition-all duration-300" onClick={onClose}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/featured" className="block text-[var(--foreground)] hover:text-[var(--primary)] hover:bg-[var(--background)] px-3 py-2 rounded-md transition-all duration-300" onClick={onClose}>
              Featured
            </Link>
          </li>
          {isAuthenticated && (
            <>
              <li>
                <Link href="/profile" className="block text-[var(--foreground)] hover:text-[var(--primary)] hover:bg-[var(--background)] px-3 py-2 rounded-md transition-all duration-300" onClick={onClose}>
                  Profile
                </Link>
              </li>
              <li>
                <button onClick={() => { logout(); onClose(); }} className="w-full text-left text-[var(--foreground)] hover:text-[var(--primary)] hover:bg-[var(--background)] px-3 py-2 rounded-md transition-all duration-300">
                  Logout
                </button>
              </li>
            </>
          )}
          {!isAuthenticated && (
            <>
              <li>
                <Link href="/login" className="block text-[var(--foreground)] hover:text-[var(--primary)] hover:bg-[var(--background)] px-3 py-2 rounded-md transition-all duration-300" onClick={onClose}>
                  Login
                </Link>
              </li>
              <li>
                <Link href="/register" className="block text-[var(--foreground)] hover:text-[var(--primary)] hover:bg-[var(--background)] px-3 py-2 rounded-md transition-all duration-300" onClick={onClose}>
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
