'use client';

import { useState, useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { store } from '@/state/store';
import { useRouter } from 'next/navigation';
import ViewProfile from '@/components/profile/ViewProfile';
import EditProfile from '@/components/profile/EditProfile';
import MyBookings from '@/components/profile/MyBookings';
import { motion, AnimatePresence } from 'framer-motion';

type Tab = 'view' | 'edit' | 'bookings';

export default function ProfilePage() {
  const snap = useSnapshot(store);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('view');

  useEffect(() => {
    if (!snap.user) {
      router.push('/login');
    }
  }, [snap.user, router]);

  if (!snap.user) {
    return (
      <div className="min-h-screen bg-[#02080D] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#00FF29] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#02080D] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1C3F39] rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="border-b border-[#2A4D47]">
            <nav className="flex" aria-label="Tabs">
              {[
                { id: 'view', label: 'View Profile' },
                { id: 'edit', label: 'Edit Profile' },
                { id: 'bookings', label: 'My Bookings' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as Tab)}
                  className={`relative w-1/3 py-4 px-1 text-center text-sm font-medium transition-all duration-200
                    ${activeTab === tab.id 
                      ? 'text-[#00FF29]' 
                      : 'text-gray-400 hover:text-gray-300'}`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00FF29]"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6 md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'view' && <ViewProfile />}
                {activeTab === 'edit' && <EditProfile onCancel={() => setActiveTab('view')} />}
                {activeTab === 'bookings' && <MyBookings />}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
