'use client';

import { useParams } from 'next/navigation';
import { CourtHeader } from '@/components/court/CourtHeader';
import { CourtGallery } from '@/components/court/CourtGallery';
import { CourtAbout } from '@/components/court/CourtAbout';
import { CourtNote } from '@/components/court/CourtNote';
import { CourtReview } from '@/components/court/CourtReview';
import { Services } from '@/components/court/Services';
import { courtData } from '@/data/tempCourtData';

export default function CourtPage() {
  const { id } = useParams();
  
  // In real implementation, we would fetch data based on the id
  // For now, we'll use our temporary data
  const court = courtData;

  return (
    <main className="min-h-screen bg-[#02080D]">
      {/* Header Section */}
      <CourtHeader
        id={court.id}
        name={court.name}
        mainImage={court.mainImage}
        rating={court.rating}
        type={court.type}
        area={court.area}
        price={court.price}
      />

      {/* Gallery Section */}
      <CourtGallery 
        images={court.images}
      />

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
    </main>
  );
}
