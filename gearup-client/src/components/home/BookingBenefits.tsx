'use client';

import Image from 'next/image';

const benefits = [
  { 
    icon: '/asserts/g-24.png', 
    title: 'BOOK', 
    subtitle: 'ANYTIME',
    width: 120,
    height: 120
  },
  { 
    icon: '/asserts/g-world.png', 
    title: 'BOOK', 
    subtitle: 'ANYWHERE',
    width: 96,
    height: 96
  },
  { 
    icon: '/asserts/g-cash-on-delivery.png', 
    title: 'BOOK', 
    subtitle: 'CHEAP',
    width: 96,
    height: 96
  }
];

export const BookingBenefits = () => {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 justify-items-center items-center">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="flex flex-col md:flex-row items-center text-center md:text-left gap-6 w-full max-w-xs hover:transform hover:scale-105 transition-transform duration-300"
            >
              <div className={`${benefit.icon.includes('g-24') ? 'w-32 h-32' : 'w-24 h-24'} flex-shrink-0 flex items-center justify-center`}>
                <Image
                  src={benefit.icon}
                  alt={`${benefit.subtitle}`}
                  width={benefit.width}
                  height={benefit.height}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="">
                <h3 className="text-2xl md:text-3xl font-bold tracking-wide mb-2">{benefit.title}</h3>
                <p className="text-xl md:text-2xl font-semibold text-gearupgreen">{benefit.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}