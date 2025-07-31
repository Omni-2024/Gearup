'use client';

import Image from 'next/image';
import Link from 'next/link';

export const LogoNavbar = () => {
  return (
    <nav className="fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-16">
          <Link href="/" className="flex items-center">
            <Image
              src="/asserts/Gearup-logo-white-big.png"
              alt="Gearup Logo"
              width={200}
              height={50}
              priority
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};
