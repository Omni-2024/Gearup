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
    <nav className="fixed w-full z-50">
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
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="px-4 py-0.5 text-sm rounded-full border-2 border-white text-white hover:text-[#00ff94] hover:border-[#00ff94] hover:drop-shadow-[0_0_10px_rgba(0,255,148,0.6)] transition-all duration-300"
                >
                  LOGIN
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-1.5 text-sm rounded-full bg-black text-white hover:bg-green-500 transition-colors"
                >
                  SIGN UP
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};