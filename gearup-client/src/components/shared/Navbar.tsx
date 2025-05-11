'use client';

import Image from 'next/image';
import Link from 'next/link';
import { NavigationMenu } from './NavigationMenu';

export const Navbar = () => {

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

          <NavigationMenu />
          </div>
      </div>
    </nav>
  );
};