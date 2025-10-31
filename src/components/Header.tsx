import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-gray-800 text-foreground p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white">
          The Gig
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/upload" className="hover:text-gray-400">
                Upload
              </Link>
            </li>
            <li>
              <Link href="/profile" className="hover:text-gray-400">
                Profile
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-gray-400">
                Login
              </Link>
            </li>
            <li>
              <Link href="/register" className="hover:text-gray-400">
                Register
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
