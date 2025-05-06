'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSnapshot } from 'valtio';
import { store } from '@/state/store';
import { useRouter } from 'next/navigation';

export const Navbar = () => {
  const snap = useSnapshot(store);
  const router = useRouter();

  const handleLogout = () => {
    store.user = null;
    router.push('/login');
  };

  return (
    <nav className="fixed w-full z-50 bg-[#02080D]/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <Image
              src="/asserts/GearupLogo-green.svg"
              alt="Gearup Logo"
              width={120}
              height={40}
              priority
            />
          </Link>

          <div className="flex items-center space-x-6">
            <Link href="/courts" className="text-white hover:text-green-500 transition-colors">
              Courts
            </Link>
            <Link href="/bookings" className="text-white hover:text-green-500 transition-colors">
              Bookings
            </Link>
            {snap.user ? (
              <div className="flex items-center space-x-4">
                <Link href="/profile" className="text-white hover:text-green-500 transition-colors">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-red-500 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="text-white hover:text-green-500 transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};