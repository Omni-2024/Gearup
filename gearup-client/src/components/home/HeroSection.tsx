'use client';

import Image from 'next/image';
import Link from 'next/link';

export const HeroSection = () => {
  return (
    <section className="relative h-screen hero-glow-effect">
      <div className="absolute inset-0">
         <h1 className="flex md:hidden absolute top-1/5 left-1/2 transform -translate-x-1/2 -translate-y-5 md:-translate-y-1/5 text-6xl md:text-8xl font-black text-white z-10 whitespace-nowrap md:tracking-[.55em] tracking-widest">Book Now</h1>
        <Image
          src="/asserts/GU Web Cover BG.png"
          alt="Back Image"
          fill
          className="object-cover z-[5]"
          priority
        />
        <Image
          src="/asserts/BookNow.png"
          alt="Book Now"
          fill
          className="object-cover z-10 hidden md:flex"
          priority
        />
        <Image
          src="/asserts/Players.png"
          alt="Front Image"
          fill
          className="object-cover z-20"
          priority
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[50px] bg-gradient-to-t from-[#02080D]/90 to-transparent z-50" />
      
      <div className="relative z-20 h-full flex flex-col items-center justify-end pb-20">
        <Link href="/courts">
          <div className="animate-pulse bg-transparent rounded-full px-8 py-3 border-2 border-[#00ff94] hover:scale-105 transition-all duration-300">
            <span className="font-bold text-xs bg-gradient-to-r from-[#00ffff] to-[#00ff94] text-transparent bg-clip-text">
              EXPLORE COURTS
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}