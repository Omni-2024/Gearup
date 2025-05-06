// 'use client';

import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedPlaces } from '@/components/home/FeaturedPlaces';
import { BookingBenefits } from '@/components/home/BookingBenefits';
import { PartnerSection } from '@/components/home/PartnerSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#02080D]">
      <HeroSection />
      <FeaturedPlaces />
      <BookingBenefits />
      <PartnerSection />
    </main>
  );
}