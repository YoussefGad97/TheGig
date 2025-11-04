"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faStar, faUser, faUpload, faEnvelope } from '@fortawesome/free-solid-svg-icons';

import UploadModal from './UploadModal';

const navItems = [
  { name: 'Home', href: '/', icon: faHome },
  { name: 'Featured', href: '/featured', icon: faStar },
  { name: 'Profile', href: '/profile', icon: faUser, authRequired: true },
  { name: 'Messages', href: '/messages', icon: faEnvelope, authRequired: true }, // Assuming a messages page
];

const MobileNavBar = () => {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();
  const [activeItem, setActiveItem] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  useEffect(() => {
    const currentItem = navItems.find(item => item.href === pathname);
    if (currentItem) {
      setActiveItem(currentItem.name);
    }
  }, [pathname]);

  const handleUploadClick = () => {
    setIsUploadModalOpen(true);
  };

  const renderNavItem = (item: typeof navItems[0], index: number) => {
    if (item.authRequired && !isAuthenticated) {
      return null;
    }
    const isActive = activeItem === item.name;
    return (
      <Link
        key={item.name}
        href={item.href}
        className="flex flex-col items-center justify-center flex-1 text-white relative z-10 transition-colors duration-300"
      >
        <FontAwesomeIcon
          icon={item.icon}
          className={`transition-all duration-300 ease-in-out ${isActive ? 'text-[var(--primary)] text-2xl' : 'text-[var(--foreground)] text-xl'}`}
        />
        <span className={`text-xs mt-1 transition-all duration-300 ease-in-out ${isActive ? 'text-[var(--primary)] font-bold' : 'text-[var(--foreground)]'}`}>
          {item.name}
        </span>
      </Link>
    );
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[var(--background)] shadow-lg md:hidden z-50">
      <div className="flex justify-around items-center h-16 relative">
        {renderNavItem(navItems[0], 0)} {/* Home */}
        {renderNavItem(navItems[1], 1)} {/* Featured */}

        {isAuthenticated && (
          <button
            onClick={handleUploadClick}
            className="flex flex-col items-center justify-center flex-1 relative z-20 -top-4"
          >
            <div className="w-16 h-16 bg-[var(--primary)] rounded-full flex items-center justify-center shadow-lg text-white text-3xl">
              <FontAwesomeIcon icon={faUpload} />
            </div>
            <span className="text-xs mt-1 text-white">Upload</span>
          </button>
        )}

        {renderNavItem(navItems[2], 2)} {/* Profile */}
        {renderNavItem(navItems[3], 3)} {/* Messages */}
      </div>
      <UploadModal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} />
    </nav>
  );
};

export default MobileNavBar;
