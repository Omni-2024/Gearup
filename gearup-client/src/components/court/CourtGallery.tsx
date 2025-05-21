'use client';

import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect, useState } from 'react';
import styles from './CourtGallery.module.css';

interface CourtGalleryProps {
  images: string[];
}

type SliderSettings = {
  dots: boolean;
  infinite: boolean;
  speed: number;
  slidesToShow: number;
  slidesToScroll: number;
  arrows: boolean;
  autoplay: boolean;
  autoplaySpeed: number;
};

export function CourtGallery({ images }: CourtGalleryProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const sliderSettings: SliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000
  };

  if (isMobile) {
    return (
      <div className={`relative mb-8 ${styles.sliderContainer}`}>
        <Slider {...sliderSettings}>
          {images.map((image, index) => (
            <div key={index} className="relative aspect-[4/3]">
              <Image
                src={image}
                alt={`Court view ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </Slider>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 mb-8">
      <div className="grid grid-cols-3 gap-4">
        {/* Main large image */}
        <div className="col-span-2 relative aspect-[4/3] rounded-lg overflow-hidden">
          <Image
            src={images[0]}
            alt="Main court view"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Side images */}
        <div className="space-y-4">
          {images.slice(1, 3).map((image, index) => (
            <div 
              key={index}
              className="relative aspect-[4/3] rounded-lg overflow-hidden"
            >
              <Image
                src={image}
                alt={`Court view ${index + 2}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
