'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CourtHeaderProps {
  id: string;
  name: string;
  mainImage: string;
  rating: number;
  type: string;
  area: string;
  price: string;
}

export function CourtHeader({ id, name, mainImage, rating, type, area, price }: CourtHeaderProps) {
  const router = useRouter();

  const handleBooking = () => {
    router.push(`/booking/${id}`);
  };

  return (
    <div className="relative w-full h-[400px] rounded-2xl overflow-hidden">
      <Image
        src={mainImage}
        alt={name}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold text-white">{name}</h1>
            <button 
              onClick={handleBooking}
              className="bg-[#00FF29] text-black px-6 py-3 rounded-full font-medium text-sm hover:bg-[#00CC21] transition-colors transform hover:scale-105 duration-200"
            >
              Book Now
            </button>
          </div>
          <div className="flex items-center gap-4 text-white/80">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-[#00FF29] fill-[#00FF29]" />
              <span>{rating.toFixed(1)}</span>
            </div>
            <span>•</span>
            <span>{type}</span>
            <span>•</span>
            <span>{area}</span>
            <span>•</span>
            <span className="text-[#00FF29] font-semibold">{price}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
