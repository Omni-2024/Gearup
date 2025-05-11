'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface Booking {
  id: string;
  courtName: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  price: number;
}

// Temporary mock data until API is implemented
const mockBookings: Booking[] = [
  {
    id: '1',
    courtName: 'Futsal Court A',
    date: '2025-05-15',
    startTime: '18:00',
    endTime: '19:00',
    status: 'upcoming',
    price: 50
  },
  {
    id: '2',
    courtName: 'Futsal Court B',
    date: '2025-05-10',
    startTime: '19:00',
    endTime: '20:00',
    status: 'completed',
    price: 50
  }
];

export default function MyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'upcoming' | 'completed' | 'cancelled'>('all');

  useEffect(() => {
    // Temporary: using mock data
    // TODO: Replace with API call
    setBookings(mockBookings);
  }, []);

  const filteredBookings = bookings.filter(booking => 
    selectedFilter === 'all' || booking.status === selectedFilter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'text-[#00FF29] bg-[#142F2B]';
      case 'completed':
        return 'text-blue-400 bg-blue-900/20';
      case 'cancelled':
        return 'text-red-400 bg-red-900/20';
      default:
        return 'text-gray-400 bg-gray-800/20';
    }
  };

  const filterButtons = [
    { id: 'all', label: 'All Bookings' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'completed', label: 'Completed' },
    { id: 'cancelled', label: 'Cancelled' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white">My Bookings</h2>
        <Link 
          href="/courts" 
          className="text-[#00FF29] hover:text-[#00CC21] transition-colors duration-200"
        >
          Book New Court →
        </Link>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {filterButtons.map((button) => (
          <motion.button
            key={button.id}
            onClick={() => setSelectedFilter(button.id as typeof selectedFilter)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
              ${selectedFilter === button.id 
                ? 'bg-[#00FF29] text-black' 
                : 'bg-[#142F2B] text-gray-400 hover:bg-[#1A3632]'}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {button.label}
          </motion.button>
        ))}
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {filteredBookings.map((booking) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-[#142F2B] rounded-xl p-4 hover:bg-[#1A3632] transition-colors duration-200"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-white font-medium text-lg mb-1">{booking.courtName}</h3>
                  <p className="text-gray-400 text-sm">
                    {new Date(booking.date).toLocaleDateString('en-US', { 
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {booking.startTime} - {booking.endTime}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[#00FF29] font-medium text-lg">${booking.price}</span>
                  <div className={`mt-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </div>
                </div>
              </div>

              {booking.status === 'upcoming' && (
                <div className="border-t border-[#2A4D47] pt-3 mt-3">
                  <motion.button
                    className="text-red-400 text-sm hover:text-red-300 transition-colors duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel Booking
                  </motion.button>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredBookings.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8"
          >
            <p className="text-gray-400">No bookings found</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
