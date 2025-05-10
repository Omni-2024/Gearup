"use client";

import Image from "next/image";
import Link from "next/link";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useState, useEffect } from "react";
import { CourtCard, CourtCardSkeleton } from "./CourtCard";

export const FeaturedPlaces = () => {
  const [isLoading, setIsLoading] = useState(true);
  const featuredCourts = [
    { id: 1, name: "Elite Futsal Arena", location: "Downtown Sports Complex", price: "$25/hr" },
    { id: 2, name: "Victory Field", location: "Central Park", price: "$20/hr" },
    { id: 3, name: "Champions Court", location: "Westside Stadium", price: "$22/hr" },
    { id: 4, name: "Pro Pitch", location: "Eastgate Sports Center", price: "$18/hr" },
    { id: 5, name: "Golden Goal Arena", location: "South Bay Complex", price: "$30/hr" },
    { id: 6, name: "Premier Futsal", location: "North Hills Center", price: "$28/hr" },
    { id: 7, name: "Sports Hub", location: "Marina Bay Area", price: "$24/hr" },
    { id: 8, name: "Urban Kicks", location: "City Center", price: "$26/hr" },
  ];

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <section className="py-10 px-4 bg-[#0D1F1D]">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-between mb-8 space-y-2">
          <h2 className="text-3xl font-bold text-white">Featured Places To Play</h2>
          <p className="text-gray-400">Popular Places To Book Your Court That's Recommended For You</p>
        </div>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-[#1C3F39] text-white rounded-full hover:bg-[#2A5F58] transition-colors">Colombo</button>
              <button className="px-4 py-2 bg-transparent border border-gray-600 text-white rounded-full hover:border-[#00FF29] hover:text-[#00FF29] transition-colors">Galle</button>
              <button className="px-4 py-2 bg-transparent border border-gray-600 text-white rounded-full hover:border-[#00FF29] hover:text-[#00FF29] transition-colors">Dehiwala</button>
            </div>
          </div>
          <Link href="/courts" className="text-[#00FF29] hover:underline group flex items-center">
            View All 
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <Carousel 
          responsive={responsive}
          infinite={true}
          showDots={true}
          itemClass="px-2"
          swipeable={true}
          draggable={true}
          ssr={true}
          dotListClass="custom-dot-list-style"
          keyBoardControl={true}
          containerClass="carousel-container"
          // removeArrowOnDeviceType={["tablet", "mobile"]}
        >
          {isLoading ? (
            Array(8).fill(null).map((_, index) => (
              <CourtCardSkeleton key={index} />
            ))
          ) : (
            featuredCourts.map((court, index) => (
              <CourtCard
                key={court.id}
                id={court.id}
                name={court.name}
                location={court.location}
                imageIndex={index + 1}
                price={court.price}
              />
            ))
          )}
        </Carousel>
      </div>
      <style jsx>{`
        :global(.custom-dot-list-style) {
          margin-top: 32px !important;
        }
      `}</style>
    </section>
  );
};
