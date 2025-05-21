'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CourtCard } from '@/components/home/CourtCard';
import type { Court } from '@/types';
import { fetchCourts } from '@/services/courtService';
import { store } from '@/state/store';
import { useRouter } from 'next/navigation';
import { useSnapshot } from 'valtio';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

export default function CourtsPage() {
  const [courts, setCourts] = useState<Court[]>([]);
  const [selectedArea, setSelectedArea] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [areas, setAreas] = useState<string[]>(['all']);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    type: 'all',
    priceRange: { min: 0, max: 10000 },
    minRating: 0,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const areaSliderRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const snap = useSnapshot(store);

  useEffect(() => {
    const loadCourts = async () => {
      try {
        if (!snap.user) {
          router.push('/login');
          return;
        }

        setIsLoading(true);
        const response = await fetchCourts();
        const courtsData = Array.isArray(response?.data) ? response.data : [];
        setCourts(courtsData);

        const uniqueAreas = Array.from(new Set(courtsData.map(court => court.area)));
        setAreas(['all', ...uniqueAreas]);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load courts');
        setCourts([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadCourts();
  }, [snap.user, router]);

  const scrollLeft = () => {
    if (areaSliderRef.current) {
      areaSliderRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (areaSliderRef.current) {
      areaSliderRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  const filteredCourts = Array.isArray(courts) ? courts.filter(court => {
    const areaMatch = selectedArea === "all" || court.area === selectedArea;
    const typeMatch = filters.type === 'all' || court.type === filters.type;
    const priceMatch = (
      parseInt(court.price) >= filters.priceRange.min &&
      parseInt(court.price) <= filters.priceRange.max
    );
    const ratingMatch = (court.rating || 0) >= filters.minRating;
    const searchMatch = searchQuery === '' || 
      court.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      court.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      court.area.toLowerCase().includes(searchQuery.toLowerCase());

    return areaMatch && typeMatch && priceMatch && ratingMatch && searchMatch;
  }) : [];

  const getHeaderText = () => {
    if (selectedArea === "all") {
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

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search courts by name, location, or area..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1C3F39] text-white pl-12 pr-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-[#00FF29] placeholder-gray-400"
            />
          </div>
        </div>
        
        {/* Area filter carousel */}
        <div className="relative mb-6 px-14">
          <button
            onClick={scrollLeft}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#1C3F39] p-2 rounded-full text-white hover:bg-[#2A5A52] transition-colors z-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div 
            ref={areaSliderRef}
            className="flex overflow-x-auto scrollbar-hide gap-3 scroll-smooth px-4"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
          >
            {areas.map((area, index) => (
              <motion.button
                key={area}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedArea(area)}
                className={`px-6 py-2 whitespace-nowrap flex-shrink-0 ${
                  selectedArea === area
                    ? 'bg-[#1C3F39] text-white'
                    : 'bg-transparent border border-gray-600 text-white hover:border-[#00FF29] hover:text-[#00FF29]'
                } rounded-full transition-colors capitalize`}
              >
                {area === "all" ? "All Areas" : area}
              </motion.button>
            ))}
          </div>

          <button
            onClick={scrollRight}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#1C3F39] p-2 rounded-full text-white hover:bg-[#2A5A52] transition-colors z-10"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Filter toggle button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="bg-[#1C3F39] text-white px-6 py-2 rounded-full hover:bg-[#2A5A52] transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            Filters
          </button>
        </div>

        {/* Sliding filter panel */}
        <motion.div 
          initial={false}
          animate={{ height: isFilterOpen ? 'auto' : 0 }}
          className="overflow-hidden mb-8"
        >
          <div className="bg-[#1C3F39] rounded-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Court Type Filter */}
            <div>
              <h3 className="text-white font-medium mb-3">Court Type</h3>
              <div className="space-y-2">
                {['all', 'Indoor', 'Outdoor', 'Covered'].map(type => (
                  <button
                    key={type}
                    onClick={() => setFilters(prev => ({ ...prev, type }))}
                    className={`block w-full text-left px-4 py-2 rounded ${
                      filters.type === type
                        ? 'bg-[#00FF29] text-black'
                        : 'text-white hover:bg-[#2A5A52]'
                    } transition-colors`}
                  >
                    {type === 'all' ? 'All Types' : type}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <h3 className="text-white font-medium mb-3">Price Range</h3>
              <div className="space-y-4">
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="500"
                  value={filters.priceRange.max}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    priceRange: { ...prev.priceRange, max: parseInt(e.target.value) }
                  }))}
                  className="w-full accent-[#00FF29]"
                />
                <div className="text-white">
                  Max Price: Rs.{filters.priceRange.max}
                </div>
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <h3 className="text-white font-medium mb-3">Minimum Rating</h3>
              <div className="flex gap-2">
                {[0, 3, 3.5, 4, 4.5].map(rating => (
                  <button
                    key={rating}
                    onClick={() => setFilters(prev => ({ ...prev, minRating: rating }))}
                    className={`px-4 py-2 rounded ${
                      filters.minRating === rating
                        ? 'bg-[#00FF29] text-black'
                        : 'text-white hover:bg-[#2A5A52]'
                    } transition-colors flex items-center gap-1`}
                  >
                    {rating === 0 ? 'All' : (
                      <>
                        {rating}
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.95-.69l1.07-3.292z" />
                        </svg>
                      </>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

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
                    rating={court.rating}
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
