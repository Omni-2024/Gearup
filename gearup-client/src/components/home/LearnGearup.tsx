'use client';

import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface LearnItem {
  id: number;
  title: string;
  subtitle: string;
  details: string[];
}

const learnItems: LearnItem[] = [
  {
    id: 1,
    title: 'How to make a',
    subtitle: 'Permanent booking',
    details: [
      'Navigate to the booking section or page',
      'Select the option for Permanent Booking.',
      'Select the date and time slots for your permanent booking.',
      'Confirm the booking and proceed to payment if required.',
      'Your booking will now be automatically reserved for the selected time slots on the specified days.'
    ]
  },
  {
    id: 2,
    title: 'How to use a',
    subtitle: 'GU card',
    details: [
      'Access the My Bookings section.',
      "Cancel a booking that you won't be able to attend.",
      "Upon cancellation, you'll receive a GU card ticket as credit.",
      'Next time you make a booking, choose the option to use GU card credit',
      'Apply the GU card credit during the checkout process.',
      'The value of the GU card ticket will be deducted from your total booking cost.'
    ]
  }
];

export const LearnGearup = () => {
  const [activeItem, setActiveItem] = useState<number | null>(null);

  const toggleItem = (id: number) => {
    setActiveItem(activeItem === id ? null : id);
  };

  return (
    <div className="py-16 bg-[#02080D]">
      <h1 className="text-4xl font-bold text-center text-white mb-12">
        LEARN GEARUP
      </h1>
      <div className="max-w-3xl mx-auto px-4">
        {learnItems.map((item) => (
          <div
            key={item.id}
            className="mb-4 bg-[#0A1118] rounded-lg overflow-hidden cursor-pointer"
          >
            <div
              className="p-6 transition-all duration-300 hover:bg-[#131B25]"
              onClick={() => toggleItem(item.id)}
            >
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <h2 className="text-gray-400 text-xl">{item.title}</h2>
                  <h3 className="text-white text-2xl font-semibold">{item.subtitle}</h3>
                </div>
                <ChevronDownIcon 
                  className={`w-6 h-6 text-white transition-transform duration-300 ${
                    activeItem === item.id ? 'transform rotate-180' : ''
                  }`}
                />
              </div>
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                activeItem === item.id ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <div className="p-6 bg-[#131B25]">
                {item.details.map((detail, index) => (
                  <p key={index} className="text-gray-300 mb-2">• {detail}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
