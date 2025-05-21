'use client';

import { Icon } from '@iconify/react';
import { useState } from 'react';

interface ServiceProps {
  services: {
    name: string;
    icon: string;
    available: boolean;
  }[];
}

export function Services({ services }: ServiceProps) {
  const [activeTab, setActiveTab] = useState('Featured');
  const tabs = ['Featured', 'Amenities', 'Prices', 'Policies'];

  return (
    <div className="courts-section w-full">
      <div className="services-section max-w-7xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-black">Services</h2>
        <div className="services-section-body">
          <div className="service-card bg-[#f1f5f9] rounded-lg min-h-[400px] my-5 w-full">
            <div className="service-card-nav grid grid-cols-2 sm:flex sm:flex-nowrap sm:justify-around mt-5 mx-auto w-[90%] sm:w-[80%] md:w-[60%] lg:w-1/2">
              {tabs.map((tab) => (
                <a
                  key={tab}
                  className={`m-2 sm:m-[20px_10px_10px] p-[10px_20px] text-center font-bold rounded-[20px] cursor-pointer whitespace-nowrap -webkit-tap-highlight-color-transparent ${
                    activeTab === tab 
                      ? 'selected bg-black text-[#c5c6d0]' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </a>
              ))}
            </div>
            <div className="service-content m-3 sm:m-5">
              {activeTab === 'Featured' && (
                <div className="service-featured">
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Court Information</h3>
                  <p className="text-sm sm:text-base text-gray-700">
                    Welcome to our state-of-the-art indoor cricket facility, where passion meets precision! 
                    Our indoor cricket court is a haven for enthusiasts of the game, offering a thrilling 
                    and immersive experience for players of all levels. With meticulously maintained pitches 
                    and top-notch equipment, our courts are designed to elevate your game to new heights.
                  </p>
                </div>
              )}
              {activeTab === 'Amenities' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
                  {services.map((service, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3"
                    >
                      <Icon 
                        icon={service.icon} 
                        className={`w-4 h-4 sm:w-5 sm:h-5 ${
                          service.available ? 'text-green-500' : 'text-gray-400'
                        }`} 
                      />
                      <span className={`text-sm sm:text-base ${service.available ? 'text-black' : 'text-gray-400'}`}>
                        {service.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 'Prices' && (
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Pricing Information</h3>
                  <p className="text-sm sm:text-base text-gray-700">
                    Please contact us for detailed pricing information.
                  </p>
                </div>
              )}
              {activeTab === 'Policies' && (
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Court Policies</h3>
                  <p className="text-sm sm:text-base text-gray-700">
                    Our court policies ensure a safe and enjoyable experience for all players.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
