import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

export const Footer = () => {
    const currentYear = new Date().getFullYear();

  return (
    <footer className="text-white w-full bg-[#031003]">
      <div className="relative mb-0">
        <div className="absolute inset-0 w-full h-full">
         
          <Image
            src="/asserts/Bar.png"
            alt="Footer background mobile"
            fill
            className="object-cover block md:hidden rotate-180 scale-x-[-1] -translate-x-3"
            priority
            
          />
          <Image
            src="/asserts/GU Footer.webp"
            alt="Footer background desktop"
            fill
            className="object-cover hidden md:block z-[0]"
            priority
          />
        </div>
         <div className="inset-0 bg-black/50 md:hidden z-[1] absolute"></div>
        <div className="container mx-auto px-4 relative z-10 py-8">
          <div className="flex flex-col md:flex-row md:justify-end gap-2 mb-8">
            {/* Combined Company and Follow Us Section */}
            <div className="relative rounded-xl border-2 p-1 border-[#07bc0c]">
              <div className="bg-white/95 text-black p-4 rounded-lg text-center md:text-left w-full h-full">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Company Section */}
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Company</h2>
                    <ul className="space-y-2">
                      <li><Link href="/about" className="hover:text-green-500">About Us</Link></li>
                      <li><Link href="/account" className="hover:text-green-500">My Account</Link></li>
                      <li><Link href="/faqs" className="hover:text-green-500">FAQs</Link></li>
                      <li><Link href="/teams" className="hover:text-green-500">Teams</Link></li>
                      <li><Link href="/contact" className="hover:text-green-500">Contact</Link></li>
                    </ul>
                  </div>
                  {/* Follow Us Section */}
                  <div>
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
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Full Width */}
      <div className="w-full border-t border-gray-800 bg-[#131220]">
        <div className="w-full px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-screen-2xl mx-auto">
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
          <div className="text-center text-xs text-gray-400 mt-4">
            Icons made from <a href="https://www.onlinewebfonts.com/icon" className="hover:text-white">svg icons</a> is licensed by CC BY 4.0
          </div>
        </div>
      </div>
    </footer>
  );
};