'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CourtCard } from '@/components/home/CourtCard';
import type { Court } from '@/types';
import { fetchCourts } from '@/services/courtService';
import { store } from '@/state/store';
import { useRouter } from 'next/navigation';
import { useSnapshot } from 'valtio';

export default function CourtsPage() {
  const [courts, setCourts] = useState<Court[]>([]);
  const [selectedArea, setSelectedArea] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [areas, setAreas] = useState<string[]>(['all']);
  
  const router = useRouter();
  const snap = useSnapshot(store);

  useEffect(() => {
    const loadCourts = async () => {
      try {
        // Ensure user is logged in
        if (!snap.user) {
          router.push('/login');
          return;
        }

        setIsLoading(true);
        const response = await fetchCourts();
        // Ensure response.data is an array or default to empty array
        const courtsData = Array.isArray(response?.data) ? response.data : [];
        setCourts(courtsData);
        
        // Update areas after courts are loaded
        const uniqueAreas = Array.from(new Set(courtsData.map(court => court.area)));
        setAreas(['all', ...uniqueAreas]);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load courts');
        setCourts([]); // Reset courts to empty array on error
      } finally {
        setIsLoading(false);
      }
    };

    loadCourts();
  }, [snap.user, router]);

  const filteredCourts = Array.isArray(courts) ? courts.filter(court => 
    selectedArea === "all" || court.area === selectedArea
  ) : [];

  const getHeaderText = () => {
    if (selectedArea === "all") {
      // Get unique areas and join them with commas
      const allAreas = Array.from(new Set(courts.map(court => court.area))).join(", ");
      return `${allAreas} Courts`;
    }
    return `${selectedArea} Courts`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0D1F1D] py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="animate-pulse">
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
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0D1F1D] py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Error</h1>
          <p className="text-gray-400 mb-8">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-[#00FF29] text-black px-6 py-3 rounded-full font-medium text-sm hover:bg-[#00CC21] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D1F1D] py-20 px-4">
      <div className="container mx-auto">
        <motion.h1 
          key={selectedArea}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-white text-center mb-4"
        >
          {getHeaderText()}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-400 text-center mb-8"
        >
          Find and book your perfect court
        </motion.p>
        
        <div className="flex justify-center gap-2 mb-12">
          {areas.map((area, index) => (
            <motion.button
              key={area}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedArea(area)}
              className={`px-4 py-2 ${
                selectedArea === area
                  ? 'bg-[#1C3F39] text-white'
                  : 'bg-transparent border border-gray-600 text-white hover:border-[#00FF29] hover:text-[#00FF29]'
              } rounded-full transition-colors capitalize`}
            >
              {area === "all" ? "All Areas" : area}
            </motion.button>
          ))}
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredCourts.map((court) => (
              <motion.div
                key={court.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ 
                  duration: 0.3,
                  layout: { duration: 0.3 }
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <CourtCard
                    id={court.id}
                    name={court.name}
                    location={court.location}
                    imagePath={court.imagePath}
                    price={court.price}
                  />
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
