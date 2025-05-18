'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { Star } from 'lucide-react';
import type { Court } from '@/types';

type CourtCardProps = Pick<Court, 'id' | 'name' | 'location' | 'imagePath' | 'rating' | 'price'>;

export const CourtCardSkeleton = () => (
  <div className="carousel-item-wrapper animate-pulse">
    <div className="bg-[#1C3F39] rounded-2xl overflow-hidden shadow-lg">
      <div className="aspect-[4/3] relative bg-gray-700" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        <div className="flex justify-between items-center">
          <div className="h-4 bg-gray-700 rounded w-1/4"></div>
          <div className="h-8 w-20 bg-gray-700 rounded-full"></div>
        </div>
      </div>
    </div>
  </div>
);

export const CourtCard: FC<CourtCardProps> = ({
  id,
  name,
  location,
  imagePath,
  rating = 4.5,
  price = "Rs.0"
}) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/courts/${id}`);
  };

  const handleBooking = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/booking/${id}`);
  };

  return (
    <div className="carousel-item-wrapper">
      <div 
        onClick={handleCardClick}
        className="bg-[#1C3F39] rounded-2xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer"
      >
        <div className="aspect-[4/3] relative">
          <Image
            src={imagePath}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg text-white font-medium">{name}</h3>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-[#00FF29] fill-[#00FF29]" />
              <span className="text-white">{rating.toFixed(1)}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-4 text-gray-400">
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm">{location}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#00FF29] font-semibold">{price}</span>
            <button 
              className="bg-[#00FF29] text-black px-4 py-2 rounded-full font-medium text-sm hover:bg-[#00CC21] transition-colors"
              onClick={handleBooking}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};