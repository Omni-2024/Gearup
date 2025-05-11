'use client';

import { Icon } from '@iconify/react';

interface ServiceProps {
  services: {
    name: string;
    icon: string;
    available: boolean;
  }[];
}

export function Services({ services }: ServiceProps) {
  return (
    <div className="py-8">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-white mb-6">Services & Amenities</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`flex items-center gap-3 p-4 rounded-lg ${
                service.available ? 'bg-[#1C3F39]' : 'bg-[#1C3F39]/50'
              }`}
            >
              <Icon 
                icon={service.icon} 
                className={`w-6 h-6 ${
                  service.available ? 'text-[#00FF29]' : 'text-gray-400'
                }`} 
              />
              <span className={
                service.available ? 'text-white' : 'text-gray-400'
              }>
                {service.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
