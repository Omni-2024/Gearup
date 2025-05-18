'use client';

import Image from 'next/image';
import { FormEvent, useState } from 'react';

export const PartnerSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: ''
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: Handle form submission
    console.log(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section 
      className="py-16 bg-[#020E07] relative min-h-[600px] flex items-center"
      style={{
        backgroundImage: `url('/asserts/Bar.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
      }}
    >
      <div className="absolute inset-0 bg-black/50 z-[1]" />
      
      <div className="container mx-auto px-4 relative z-[2] w-full flex items-center justify-center">
        <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl">
          {/* Text content - left side on desktop */}
          <div className="w-full md:w-[55%]">
            <div className='flex flex-col text-center md:text-left justify-center mb-4 md:mb-0'>
              <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white">Become A Partner</h2>
              <h3 className="text-5xl md:text-6xl font-bold mb-2 text-white leading-tight">
                Make your<br />
                Bookings at<br />
                <span className="text-[#00FF29]">GEARUP</span>
              </h3>
            </div>
          </div>
          
          {/* Form - right side on desktop */}
          <div className="w-full md:w-[45%] flex justify-center md:justify-start">
            <form onSubmit={handleSubmit} className="space-y-3 w-full max-w-xs">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-white">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your Name"
                  className="w-full px-4 py-2 bg-transparent border border-[#79e840] rounded text-white focus:border-[#79e840] focus:outline-none focus:shadow-[0_0_3px_#79e840]"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="contact" className="block text-sm font-medium text-white">Contact</label>
                <input
                  id="contact"
                  name="contact"
                  type="tel"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                  placeholder="Your Contact"
                  className="w-full px-4 py-2 bg-transparent border border-[#79e840] rounded text-white focus:border-[#79e840] focus:outline-none focus:shadow-[0_0_3px_#79e840]"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Your Email"
                  className="w-full px-4 py-2 bg-transparent border border-[#79e840] rounded text-white focus:border-[#79e840] focus:outline-none focus:shadow-[0_0_3px_#79e840]"
                />
              </div>
              <button
                type="submit"
                className="w-full px-8 py-3 bg-[#00FF29] text-black font-bold rounded hover:bg-[#00CC21] transition-colors duration-200"
              >
                APPLY
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}