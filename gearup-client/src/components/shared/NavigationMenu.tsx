'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSnapshot } from 'valtio';
import { store } from '@/state/store';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

export function NavigationMenu() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const snap = useSnapshot(store);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
        <div className="relative" ref={dropdownRef}>
          <div className="cursor-pointer relative z-50" onClick={() => setIsOpen(!isOpen)}>
            <div className="absolute inset-0 bg-white rounded-full p-0.5" />
            <Image
                src="/asserts/profile.jpg"
                alt="Profile"
                width={32}
                height={32}
                className="rounded-full relative z-10"
                style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                priority
              />
          </div>
          <div className={`${isOpen ? 'block' : 'hidden'} absolute right-0 mt-2 bg-white rounded-lg shadow-lg py-2 min-w-[200px]`}>
            <div className="flex items-center border-b">
              <div className="relative mx-3">
                <div className="absolute inset-0 bg-white rounded-full" />
                <Image
                  src="/asserts/profile.jpg"
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-full relative z-10"
                  style={{ width: '32px', height: '28px', objectFit: 'cover' }}
                  priority
                />
              </div>
              <div className="flex items-center justify-between w-full pr-2">
                <p className="text-black">{snap.user?.name || 'User'}</p>
                <Link 
                  href="/profile" 
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg stroke="#000000" fill="#000000" strokeWidth="0" viewBox="0 0 24 24" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                    <path fill="none" strokeWidth="2" d="M14,4 L20,10 L14,4 Z M22.2942268,5.29422684 C22.6840146,5.68401459 22.6812861,6.3187139 22.2864907,6.71350932 L9,20 L2,22 L4,15 L17.2864907,1.71350932 C17.680551,1.319449 18.3127724,1.31277239 18.7057732,1.70577316 L22.2942268,5.29422684 Z M3,19 L5,21 M7,17 L15,9"></path>
                  </svg>
                </Link>
              </div>
            </div>
            <Link href="/profile" className="block px-4 py-2 text-black hover:bg-gray-100">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-black rounded-full mr-2"></div>
                My Bookings
              </div>
            </Link>
            <Link href="/gu-card" className="block px-4 py-2 text-black hover:bg-gray-100">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                GU Card
              </div>
            </Link>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100"
            >
              <div className="flex items-center">
                <div className="w-2 h-2 bg-black rounded-full mr-2"></div>
                Logout
              </div>
            </button>
          </div>
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
