'use client';

import Image from 'next/image';
import Link from 'next/link';

export const FeaturedPlaces = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-white">Featured Places To Play</h2>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-[#1C3F39] text-white rounded-full">Complete</button>
              <button className="px-4 py-2 bg-transparent border border-gray-600 text-white rounded-full">Partial</button>
              <button className="px-4 py-2 bg-transparent border border-gray-600 text-white rounded-full">Work</button>
            </div>
          </div>
          <Link href="/courts" className="text-[#00FF29] hover:underline">
            View All →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-[#1C3F39] rounded-lg p-4 hover:scale-105 transition-transform cursor-pointer">
              <div className="aspect-square relative mb-4 rounded-lg overflow-hidden">
                <Image
                  src={`/asserts/futsal-${item}.jpg`}
                  alt={`Featured Court ${item}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                <div className="h-4 bg-gray-600 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}