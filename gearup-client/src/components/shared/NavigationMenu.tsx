'use client';

import Link from 'next/link';
import { useSnapshot } from 'valtio';
import { store } from '@/state/store';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export function NavigationMenu() {
  const [mounted, setMounted] = useState(false);
  const snap = useSnapshot(store);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    store.user = null;
    localStorage.removeItem('gearup_user');
    router.push('/login');
  };

  if (!mounted) {
    return <div className="w-[200px]" />; // Placeholder to prevent layout shift
  }

  return (
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
  );
}
