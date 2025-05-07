'use client';

import Image from 'next/image';
import Link from 'next/link';

export const WelcomeSection = () => {
  return (
    <section className="relative min-h-screen bg-[#02080D] flex items-center">
      {/* Green gradient effect in the background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#02080D] via-[#02080D] to-[#297216]/20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left side with image */}
          <div className="relative w-full h-[400px] md:h-[500px] max-w-lg mx-auto">
            <Image
              src="/asserts/football-players.png"
              alt="Football Players"
              fill
              className="object-contain"
              priority
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/asserts/Players.png"; // Fallback image
              }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Right side with text content */}
          <div className="text-white space-y-6 container mx-auto px-12 md:px-0">
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className='text-xl md:text-2xl'>Hello</span><br />
              WE WELCOME<br />
              YOU TO <span className="text-[#77e53e]">GEARUP</span>
            </h1>
            <hr className='border-t-3 text-[#4b8b37]'/>
            <p className="text-gray-300 text-lg md:text-sm max-w-xl">
              At GearUp, we're not just a platform; we're a community of sports 
              enthusiasts dedicated to transforming the way you book sports 
              facilities. Our passion for active lifestyles drives on this journey 
              and discover a new level of convenience, choice, and connection 
              in the world of sports!
            </p>
            <Link 
              href="/join"
              className="inline-block px-8 py-2 border-2 text-sm border-[#7cd44e] text-[#7cd44e] font-bold rounded-lg hover:border-[#00CC21] hover:text-[#00CC21] transition-colors"
            >
              JOIN NOW
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};