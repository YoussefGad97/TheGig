import Link from 'next/link';
import ThemeSwitcher from './ThemeSwitcher';

const Header = () => {
  return (
    <header className="bg-[var(--background)] text-[var(--foreground)] p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-[var(--primary)] hover:text-[var(--accent)] transition-colors duration-300">
          The Gig
        </Link>
        <nav className="flex items-center space-x-4">
          <ul className="flex space-x-4">
            <li>
              <Link href="/upload" className="hover:text-[var(--accent)] transition-colors duration-300">
                Upload
              </Link>
            </li>
            <li>
              <Link href="/profile" className="hover:text-[var(--accent)] transition-colors duration-300">
                Profile
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-[var(--accent)] transition-colors duration-300">
                Login
              </Link>
            </li>
            <li>
              <Link href="/register" className="hover:text-[var(--accent)] transition-colors duration-300">
                Register
              </Link>
            </li>
          </ul>
          <ThemeSwitcher />
        </nav>
      </div>
    </header>
  );
};

export default Header;
