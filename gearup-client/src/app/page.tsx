// 'use client';

import { HeroSection } from '@/components/home/HeroSection';
import { WelcomeSection } from '@/components/home/WelcomeSection';
import { FeaturedPlaces } from '@/components/home/FeaturedPlaces';
import { BookingBenefits } from '@/components/home/BookingBenefits';
import { PartnerSection } from '@/components/home/PartnerSection';
import { Footer } from '@/components/shared/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#02080D]">
      <HeroSection />
      <WelcomeSection />
      <FeaturedPlaces />
      <BookingBenefits />
      <PartnerSection />
      <Footer />
    </main>
  );
}