import Image from "next/image";
import { FC } from "react";

interface CourtCardProps {
  id: number;
  name: string;
  location: string;
  imageIndex: number;
  rating?: number;
  price?: string;
}

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
  imageIndex,
  rating = 4.5,
  price = "$20/hr"
}) => {
  return (
    <div className="carousel-item-wrapper">
      <div className="bg-[#1C3F39] rounded-2xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer">
        <div className="aspect-[4/3] relative">
          <Image
            src={`/asserts/futsal-${(imageIndex % 3) + 1}.jpg`}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 hover:scale-110"
          />
          <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
            <div className="flex items-center gap-1">
              <svg
                className="w-4 h-4 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-white text-sm font-medium">{rating}</span>
            </div>
          </div>
        </div>
        <div className="p-4 space-y-3">
          <h3 className="text-white font-semibold text-lg">{name}</h3>
          <div className="flex items-center gap-2 text-gray-400">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-sm">{location}</span>
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="text-[#00FF29] font-semibold">{price}</span>
            <button className="bg-[#00FF29] text-black px-4 py-2 rounded-full font-medium text-sm hover:bg-[#00CC21] transition-colors">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};