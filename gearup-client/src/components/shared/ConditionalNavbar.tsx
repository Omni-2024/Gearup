'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';
import { LogoNavbar } from './LogoNavbar';

export const ConditionalNavbar = () => {
  const pathname = usePathname();
  
  // Show logo-only navbar for login and signup pages
  const isAuthPage = pathname === '/login' || pathname === '/signup';
  
  return isAuthPage ? <LogoNavbar /> : <Navbar />;
};
