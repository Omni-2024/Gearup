'use client';

import Image from 'next/image';

export const PartnerSection = () => {
  return (
    <section className="py-16 bg-[#020E07]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-white">
            <h2 className="text-2xl font-bold mb-4">Become A Partner</h2>
            <h3 className="text-4xl font-bold mb-4">
              Make your<br />
              Bookings at<br />
              <span className="text-[#00FF29]">GEARUP</span>
            </h3>
            <form className="space-y-4 max-w-md">
              <input
                type="text"
                placeholder="Your Contact"
                className="w-full px-4 py-2 bg-transparent border border-gray-600 rounded text-white"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 bg-transparent border border-gray-600 rounded text-white"
              />
              <button
                type="submit"
                className="px-8 py-2 bg-[#00FF29] text-black font-bold rounded hover:bg-[#00CC21]"
              >
                APPLY
              </button>
            </form>
          </div>
          <div className="relative h-[400px]">
            <Image
              src="/asserts/Players.webp"
              alt="Football Players"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}