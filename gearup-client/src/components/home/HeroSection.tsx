'use client';

import Image from 'next/image';
import Link from 'next/link';

export const HeroSection = () => {
  return (
    <section className="relative h-screen">
      <div className="absolute inset-0">
        <Image
          src="/asserts/Website-BG.png"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#02080D]/90" />
      
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
        <h1 className="text-[80px] font-bold text-white tracking-wider" style={{ textShadow: '0 0 10px rgba(0,255,0,0.3)' }}>
          BOOK NOW
        </h1>
        <button className="mt-8">
          <Link href="/courts">
            <Image
              src="/asserts/button-explore.png"
              alt="Explore Courts"
              width={200}
              height={60}
              className="hover:scale-105 transition-transform"
            />
          </Link>
        </button>
      </div>
    </section>
  );
}