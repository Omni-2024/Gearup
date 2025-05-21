'use client';

import { useParams, useRouter } from 'next/navigation';
import { CourtHeader } from '@/components/court/CourtHeader';
import { CourtGallery } from '@/components/court/CourtGallery';
import { CourtAbout } from '@/components/court/CourtAbout';
import { CourtNote } from '@/components/court/CourtNote';
import { CourtReview } from '@/components/court/CourtReview';
import { Services } from '@/components/court/Services';
import { courtData } from '@/data/tempCourtData';

export default function CourtPage() {
  const router = useRouter();
  const { id } = useParams();
  
  // In real implementation, we would fetch data based on the id
  // For now, we'll use our temporary data
  const court = courtData;

  return (
    <main className="min-h-screen bg-white pt-10">
      {/* Header Section - Responsive for both mobile and desktop */}
      <div className='grid grid-cols-1'>
      <div className="container mx-auto px-4 py-6 order-2 md:order-1">
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] items-start gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold   tracking-tight">{court.name}</h1>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1">
                <span className="text-sm">{court.rating}</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-4 h-4 ${
                        star <= court.rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-500">({court.totalReviews})</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <span>•</span>
                <span>{court.area}</span>
                <span>•</span>
                <span className="hover:text-gray-700 cursor-pointer">Get Direction</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => router.push(`/booking/${court.id}`)}
            className="w-full sm:w-auto bg-green-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors text-lg shadow-lg self-start"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="order-1 md:order-2">
        <CourtGallery 
          images={court.images}
        />
      </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex gap-8">
          <div className="flex-1">
            {/* About Section */}
            <CourtAbout 
              description={court.description}
              details={court.details}
            />

            {/* Services Section */}
            <Services 
              services={court.services}
            />

            {/* Important Notes Section */}
            <CourtNote 
              notes={court.notes}
            />

            {/* Reviews Section */}
            <CourtReview 
              reviews={court.reviews}
              averageRating={court.averageRating}
              totalReviews={court.totalReviews}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
