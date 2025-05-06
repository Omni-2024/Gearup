'use client';

import Image from 'next/image';

const benefits = [
  { icon: '/asserts/g-24.png', title: 'BOOK', subtitle: 'ANYTIME' },
  { icon: '/asserts/g-world.png', title: 'BOOK', subtitle: 'ANYWHERE' },
  { icon: '/asserts/g-cash-on-delivery.png', title: 'BOOK', subtitle: 'CHEAP' }
];

export const BookingBenefits = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-4">
              <Image
                src={benefit.icon}
                alt={`${benefit.subtitle}`}
                width={80}
                height={80}
              />
              <div className="text-white">
                <h3 className="text-xl font-bold">{benefit.title}</h3>
                <p>{benefit.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}