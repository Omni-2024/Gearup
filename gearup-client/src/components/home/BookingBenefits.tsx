'use client';

import Image from 'next/image';

const benefits = [
  { 
    icon: '/asserts/g-24.png', 
    title: 'BOOK', 
    subtitle: 'ANYTIME',
    width: 96,
    height: 96
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
    <section className="py-6 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 place-items-center">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center w-full max-w-xs hover:transform hover:scale-105 transition-transform duration-300"
            >
              <div className={`w-24 h-24 flex-shrink-0 flex items-center justify-center mb-6 border-1 border-[#41c335] rounded-xl bg-[#E8F5E9]`}>
                <Image
                  src={benefit.icon}
                  alt={`${benefit.subtitle}`}
                  width={benefit.width}
                  height={benefit.height}
                  className="w-full h-full object-contain p-2"
                />
              </div>
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-bold tracking-wide mb-2 text-black">{benefit.title}</h3>
                <p className="text-xl md:text-2xl font-semibold text-[#297216]">{benefit.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}