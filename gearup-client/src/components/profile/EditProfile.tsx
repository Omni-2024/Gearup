'use client';

import { useState } from 'react';
import { useSnapshot } from 'valtio';
import { store } from '@/state/store';
import { motion } from 'framer-motion';

interface EditProfileProps {
  onCancel: () => void;
}

export default function EditProfile({ onCancel }: EditProfileProps) {
  const snap = useSnapshot(store);
  const [formData, setFormData] = useState({
    name: snap.user?.name || '',
    email: snap.user?.email || '',
    mobileNumber: snap.user?.mobileNumber || '',
    location: snap.user?.location || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (snap.user) {
      store.user = {
        ...snap.user,
        ...formData
      };
      onCancel();
    }
  };

  const inputClasses = `
    w-full bg-[#142F2B] border-2 border-[#2A4D47] text-white rounded-xl
    px-4 py-3 focus:outline-none focus:border-[#00FF29]
    placeholder-gray-500 transition-all duration-200
    hover:border-[#3A5D57]
  `;

  const labelClasses = "block text-gray-400 text-sm font-medium mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Edit Your Profile</h2>
        <p className="text-gray-400">Update your personal information</p>
      </div>

      <div className="space-y-6">
        {[
          { label: 'Name', name: 'name', type: 'text', placeholder: 'Enter your full name' },
          { label: 'Email', name: 'email', type: 'email', placeholder: 'Enter your email' },
          { label: 'Mobile Number', name: 'mobileNumber', type: 'tel', placeholder: 'Enter your mobile number' },
          { label: 'Location', name: 'location', type: 'text', placeholder: 'Enter your location' }
        ].map((field, index) => (
          <motion.div
            key={field.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <label htmlFor={field.name} className={labelClasses}>
              {field.label}
            </label>
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={formData[field.name as keyof typeof formData]}
              onChange={handleChange}
              placeholder={field.placeholder}
              className={inputClasses}
            />
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-end space-x-4 pt-6 border-t border-[#2A4D47]">
        <motion.button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 border-2 border-[#2A4D47] text-gray-300 rounded-xl
                   hover:bg-[#142F2B] transition-colors duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Cancel
        </motion.button>
        <motion.button
          type="submit"
          className="px-6 py-2 bg-[#00FF29] text-black font-medium rounded-xl
                   hover:bg-[#00CC21] transition-colors duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Save Changes
        </motion.button>
      </div>
    </form>
  );
}
