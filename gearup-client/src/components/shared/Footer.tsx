import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

export const Footer = () => {
    const currentYear = new Date().getFullYear();

  return (
    <footer className="text-white py-8 relative pb-32">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/asserts/GU Footer.webp"
          alt="Footer background"
          fill
          className="object-cover hidden md:block"
          priority
        />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:justify-end gap-8 mb-8">
          {/* Company Section */}
          <div className="relative rounded-xl border-2 p-1 border-[#07bc0c]">
            <div className="bg-white/95 text-black p-4 rounded-lg text-center md:text-left w-full h-full">
              <h2 className="text-2xl font-bold mb-4">Company</h2>
              <ul className="space-y-2">
                <li><Link href="/about" className="hover:text-green-500">About Us</Link></li>
                <li><Link href="/account" className="hover:text-green-500">My Account</Link></li>
                <li><Link href="/faqs" className="hover:text-green-500">FAQs</Link></li>
                <li><Link href="/teams" className="hover:text-green-500">Teams</Link></li>
                <li><Link href="/contact" className="hover:text-green-500">Contact</Link></li>
              </ul>
            </div>
          </div>

          {/* Follow Us Section */}
          <div className="relative rounded-xl border-2 p-1 border-[#07bc0c]">
            <div className="bg-white/95 text-black p-4 rounded-lg text-center md:text-left w-full h-full">
              <h2 className="text-2xl font-bold mb-4">Follow Us</h2>
              <ul className="space-y-4">
                <li>
                  <Link href="https://facebook.com" className="hover:text-green-500 inline-flex items-center gap-2">
                    <FaFacebook size={24} />
                    <span>Facebook</span>
                  </Link>
                </li>
                <li>
                  <Link href="https://instagram.com" className="hover:text-green-500 inline-flex items-center gap-2">
                    <FaInstagram size={24} />
                    <span>Instagram</span>
                  </Link>
                </li>
                <li>
                  <Link href="mailto:contact@gearup.com" className="hover:text-green-500 inline-flex items-center gap-2">
                    <MdEmail size={24} />
                    <span>Gmail</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="fixed bottom-0 left-0 right-0 w-full border-t border-gray-800 py-2 px-3 bg-[#131220]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400 text-center md:text-left">© {currentYear} omnitrix - All rights reserved</p>
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 text-center md:text-left">
              <Link href="/privacy-policy" className="text-sm text-gray-400 hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-gray-400 hover:text-white">
                Terms and Conditions
              </Link>
              <Link href="/cookies" className="text-sm text-gray-400 hover:text-white">
                Cookies Settings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};