'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface CourtGalleryProps {
  images: string[];
}

export function CourtGallery({ images }: CourtGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);
  const nextImage = () => {
    if (selectedImage !== null && selectedImage < images.length - 1) {
      setSelectedImage(selectedImage + 1);
    }
  };
  const prevImage = () => {
    if (selectedImage !== null && selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    }
  };

  return (
    <div className="py-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => openLightbox(index)}
            >
              <Image
                src={image}
                alt={`Court view ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <button 
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-[#00FF29] transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          <button 
            onClick={prevImage}
            className="absolute left-4 text-white hover:text-[#00FF29] transition-colors disabled:opacity-50"
            disabled={selectedImage === 0}
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <div className="relative w-[90vw] h-[80vh]">
            <Image
              src={images[selectedImage]}
              alt={`Court view ${selectedImage + 1}`}
              fill
              className="object-contain"
            />
          </div>
          <button 
            onClick={nextImage}
            className="absolute right-4 text-white hover:text-[#00FF29] transition-colors disabled:opacity-50"
            disabled={selectedImage === images.length - 1}
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      )}
    </div>
  );
}
