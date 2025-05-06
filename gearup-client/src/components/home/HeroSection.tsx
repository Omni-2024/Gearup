'use client';

import Image from 'next/image';
import Link from 'next/link';

export const HeroSection = () => {
  return (
    <section className="relative h-screen">
      <div className="absolute inset-0">
        <Image
          src="/asserts/GU Web Cover BG.png"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#02080D]/90" />
      
      <div className="relative z-10 h-full flex flex-col items-center justify-end pb-20">
        <Link href="/courts">
          <div className="animate-pulse bg-transparent rounded-full px-8 py-3 border-2 border-[#00ff94] hover:scale-105 transition-all duration-300">
            <span className="font-bold text-xl bg-gradient-to-r from-[#00ffff] to-[#00ff94] text-transparent bg-clip-text">
              EXPLORO COURTS
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}