'use client';

import { useSnapshot } from 'valtio';
import { store } from '@/state/store';
import { motion } from 'framer-motion';

const ProfileField = ({ label, value }: { label: string; value: string | undefined }) => (
  <div className="p-4 bg-[#142F2B] rounded-xl hover:bg-[#1A3632] transition-colors duration-200">
    <label className="block text-sm font-medium text-gray-400 mb-1">
      {label}
    </label>
    <div className="text-white font-medium">
      {value || 'Not provided'}
    </div>
  </div>
);

export default function ViewProfile() {
  const snap = useSnapshot(store);

  if (!snap.user) return null;

  const fields = [
    { label: 'Name', value: snap.user.name },
    { label: 'Email', value: snap.user.email },
    { label: 'Mobile Number', value: snap.user.mobileNumber },
    { label: 'Location', value: snap.user.location }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-block p-2 rounded-full bg-[#142F2B] mb-4">
          <div className="w-24 h-24 rounded-full bg-[#1A3632] flex items-center justify-center">
            <span className="text-3xl text-[#00FF29] font-bold">
              {snap.user.name.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">{snap.user.name}</h2>
        <p className="text-gray-400">Member since 2024</p>
      </div>

      <div className="grid gap-4">
        {fields.map((field, index) => (
          <motion.div
            key={field.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ProfileField {...field} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
