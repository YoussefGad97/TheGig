import { useState, useEffect } from 'react';
import Link from 'next/link';
import ThemeSwitcher from './ThemeSwitcher';
import useAuth from '@/hooks/useAuth';
import UploadModal from './UploadModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faStar, faUser, faUpload, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  toggleSidebar: () => void;
}

const navItems = [
  { name: 'Home', href: '/', icon: faHome },
  { name: 'Featured', href: '/featured', icon: faStar },
  { name: 'Profile', href: '/profile', icon: faUser, authRequired: true },
];

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { isAuthenticated, logout } = useAuth();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const pathname = usePathname();

  const handleUploadClick = () => {
    setIsUploadModalOpen(true);
  };

  return (
    <header className="bg-[var(--background)] text-[var(--foreground)] p-4 shadow-lg flex justify-between items-center md:ml-64 fixed top-0 left-0 right-0 z-40">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="md:hidden mr-4 text-[var(--primary)] text-2xl hidden">
          &#9776; {/* Hamburger icon */}
        </button>
        <Link href="/" className="text-3xl font-bold text-[var(--primary)] hover:text-[var(--accent)] transition-colors duration-300 tracking-wide">
          The Gig
        </Link>
      </div>
      <nav className="flex items-center space-x-2 md:space-x-4">
        {navItems.map((item) => {
          if (item.authRequired && !isAuthenticated) {
            return null;
          }
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href} className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-[var(--primary)]' : 'text-[var(--foreground)]'} hover:text-[var(--primary)] transition-colors duration-300`}>
              <FontAwesomeIcon icon={item.icon} className="text-lg" />
              <span className="hidden md:inline">{item.name}</span>
            </Link>
          );
        })}

        {isAuthenticated && (
          <button
            onClick={handleUploadClick}
            className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-[var(--foreground)] hover:text-[var(--primary)] transition-colors duration-300"
          >
            <FontAwesomeIcon icon={faUpload} className="text-lg" />
            <span className="hidden md:inline">Upload</span>
          </button>
        )}

        {!isAuthenticated && (
          <>
            <Link href="/login" className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${pathname === '/login' ? 'text-[var(--primary)]' : 'text-[var(--foreground)]'} hover:text-[var(--primary)] transition-colors duration-300`}>
              <FontAwesomeIcon icon={faSignInAlt} className="text-lg" />
              <span className="hidden md:inline">Login</span>
            </Link>
            <Link href="/register" className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${pathname === '/register' ? 'text-[var(--primary)]' : 'text-[var(--foreground)]'} hover:text-[var(--primary)] transition-colors duration-300`}>
              <FontAwesomeIcon icon={faUserPlus} className="text-lg" />
              <span className="hidden md:inline">Register</span>
            </Link>
          </>
        )}
        <ThemeSwitcher />
      </nav>
      <UploadModal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} />
    </header>
  );
};

export default Header;
