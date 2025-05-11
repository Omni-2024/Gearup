'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';
import { store } from '@/state/store';
import { mockFetchCourtById, mockFetchAvailableSlots, mockBookCourt } from '@/data/tempBookingData';

interface Court {
  id: string;
  name: string;
  location: string;
  imagePath: string;
  description?: string;
  price: string;
}

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  price: number;
}

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const snap = useSnapshot(store);
  
  const [court, setCourt] = useState<Court | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBooking, setIsBooking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load court details
  useEffect(() => {
    const loadCourt = async () => {
      if (!snap.user) {
        router.push('/login');
        return;
      }

      try {
        setIsLoading(true);
        const response = await mockFetchCourtById(params.id as string);
        setCourt(response.data);
      } catch (err: any) {
        setError(err.message || 'Failed to load court details');
      } finally {
        setIsLoading(false);
      }
    };

    loadCourt();
  }, [params.id, snap.user, router]);

  // Load available slots when date changes
  useEffect(() => {
    const loadSlots = async () => {
      if (!court) return;

      try {
        const response = await mockFetchAvailableSlots(court.id, selectedDate);
        setAvailableSlots(response.data);
      } catch (err: any) {
        setError(err.message || 'Failed to load available slots');
      }
    };

    loadSlots();
  }, [court, selectedDate]);

  const handleBooking = async () => {
    if (!court || !selectedSlot) return;

    try {
      setIsBooking(true);
      await mockBookCourt({
        courtId: court.id,
        date: selectedDate,
        startTime: selectedSlot.startTime,
        endTime: selectedSlot.endTime,
      });

      // Show success animation before redirecting
      router.push('/profile'); // Redirect to profile page after successful booking
    } catch (err: any) {
      setError(err.message || 'Failed to book court');
    } finally {
      setIsBooking(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0D1F1D] py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="animate-pulse">
            <div className="aspect-[16/9] relative bg-gray-700 rounded-2xl mb-8" />
            <div className="space-y-4">
              <div className="h-8 bg-gray-700 rounded w-1/2" />
              <div className="h-4 bg-gray-700 rounded w-3/4" />
              <div className="h-4 bg-gray-700 rounded w-1/4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0D1F1D] py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Error</h1>
          <p className="text-gray-400 mb-8">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-[#00FF29] text-black px-6 py-3 rounded-full font-medium hover:bg-[#00CC21] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!court) return null;

  return (
    <div className="min-h-screen bg-[#0D1F1D] py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Court Details Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1C3F39] rounded-2xl overflow-hidden shadow-lg mb-8"
        >
          <div className="aspect-[16/9] relative">
            <Image
              src={court.imagePath}
              alt={court.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="p-6">
            <h1 className="text-3xl font-bold text-white mb-2">{court.name}</h1>
            <div className="flex items-center gap-2 text-gray-400 mb-4">
              <svg
                className="w-5 h-5"
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
              <span>{court.location}</span>
            </div>
            {court.description && (
              <p className="text-gray-400">{court.description}</p>
            )}
          </div>
        </motion.div>

        {/* Booking Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#1C3F39] rounded-2xl p-6 shadow-lg"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Book a Slot</h2>
          
          {/* Date Selection */}
          <div className="mb-6">
            <label className="block text-gray-400 mb-2">Select Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              max={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
              className="w-full px-4 py-2 bg-[#0D1F1D] border border-[#79e840] rounded text-white focus:border-[#00FF29] focus:outline-none focus:ring-1 focus:ring-[#00FF29]"
            />
          </div>

          {/* Time Slots */}
          <div className="mb-6">
            <label className="block text-gray-400 mb-2">Available Time Slots</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              <AnimatePresence mode="popLayout">
                {availableSlots.map((slot) => (
                  <motion.button
                    key={slot.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedSlot(slot)}
                    disabled={!slot.isAvailable}
                    className={`p-3 rounded-lg text-center transition-colors ${
                      selectedSlot?.id === slot.id
                        ? 'bg-[#00FF29] text-black'
                        : slot.isAvailable
                        ? 'bg-[#0D1F1D] border border-[#79e840] text-white hover:border-[#00FF29] hover:text-[#00FF29]'
                        : 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <div className="text-sm font-medium">{slot.startTime}</div>
                    <div className="text-xs opacity-75">${slot.price}</div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Booking Button */}
          <motion.button
            onClick={handleBooking}
            disabled={!selectedSlot || isBooking}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3 rounded-full font-medium transition-colors ${
              selectedSlot && !isBooking
                ? 'bg-[#00FF29] text-black hover:bg-[#00CC21]'
                : 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isBooking ? 'Booking...' : 'Confirm Booking'}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
