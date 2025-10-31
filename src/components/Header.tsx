import { useEffect } from 'react'; // Import useEffect
import Link from 'next/link';
import ThemeSwitcher from './ThemeSwitcher';
import useAuth from '@/hooks/useAuth';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();


  return (
    <header className="bg-[var(--background)] text-[var(--foreground)] p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold text-[var(--primary)] hover:text-[var(--accent)] transition-colors duration-300 tracking-wide">
          The Gig
        </Link>
        <nav className="flex items-center space-x-2 md:space-x-4">
          <ul className="flex items-center space-x-2 md:space-x-4">
            <li>
              <Link href="/" className="text-[var(--foreground)] hover:text-[var(--primary)] hover:bg-[var(--card-background)] px-3 py-2 rounded-md transition-all duration-300">
                Home
              </Link>
            </li>
            <li>
              <Link href="/featured" className="text-[var(--foreground)] hover:text-[var(--primary)] hover:bg-[var(--card-background)] px-3 py-2 rounded-md transition-all duration-300">
                Featured
              </Link>
            </li>
            {isAuthenticated && (
              <>
                <li>
                  <Link href="/upload" className="text-[var(--foreground)] hover:text-[var(--primary)] hover:bg-[var(--card-background)] px-3 py-2 rounded-md transition-all duration-300">
                    Upload
                  </Link>
                </li>
                <li>
                  <Link href="/profile" className="text-[var(--foreground)] hover:text-[var(--primary)] hover:bg-[var(--card-background)] px-3 py-2 rounded-md transition-all duration-300">
                    Profile
                  </Link>
                </li>
                <li>
                  <button onClick={logout} className="text-[var(--foreground)] hover:text-[var(--primary)] hover:bg-[var(--card-background)] px-3 py-2 rounded-md transition-all duration-300">
                    Logout
                  </button>
                </li>
              </>
            )}
            {!isAuthenticated && (
              <>
                <li>
                  <Link href="/login" className="text-[var(--foreground)] hover:text-[var(--primary)] hover:bg-[var(--card-background)] px-3 py-2 rounded-md transition-all duration-300">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="text-[var(--foreground)] hover:text-[var(--primary)] hover:bg-[var(--card-background)] px-3 py-2 rounded-md transition-all duration-300">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
          <ThemeSwitcher />
        </nav>
      </div>
    </header>
  );
};

export default Header;
