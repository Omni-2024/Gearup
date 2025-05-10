"use client";

import Image from "next/image";
import Link from "next/link";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useState, useEffect } from "react";
import { CourtCard, CourtCardSkeleton } from "./CourtCard";

export const FeaturedPlaces = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedArea, setSelectedArea] = useState("Colombo");
  
  const featuredCourts = [
    { 
      id: 1, 
      name: "Elite Futsal Arena", 
      location: "Downtown Sports Complex", 
      price: "$25/hr",
      area: "Colombo",
      imagePath: "/asserts/futsal-1.jpg"
    },
    { 
      id: 2, 
      name: "Victory Field", 
      location: "Central Park", 
      price: "$20/hr",
      area: "Galle",
      imagePath: "/asserts/futsal-2.jpg"
    },
    { 
      id: 3, 
      name: "Champions Court", 
      location: "Westside Stadium", 
      price: "$22/hr",
      area: "Dehiwala",
      imagePath: "/asserts/futsal-3.jpg"
    },
    { 
      id: 4, 
      name: "Pro Pitch", 
      location: "Eastgate Sports Center", 
      price: "$18/hr",
      area: "Colombo",
      imagePath: "/asserts/futsal-4.jpg"
    },
    { 
      id: 5, 
      name: "Golden Goal Arena", 
      location: "South Bay Complex", 
      price: "$30/hr",
      area: "Galle",
      imagePath: "/asserts/futsal-1.jpg"
    },
    { 
      id: 6, 
      name: "Premier Futsal", 
      location: "North Hills Center", 
      price: "$28/hr",
      area: "Dehiwala",
      imagePath: "/asserts/futsal-2.jpg"
    },
    { 
      id: 7, 
      name: "Sports Hub", 
      location: "Marina Bay Area", 
      price: "$24/hr",
      area: "Colombo",
      imagePath: "/asserts/futsal-3.jpg"
    },
    { 
      id: 8, 
      name: "Urban Kicks", 
      location: "City Center", 
      price: "$26/hr",
      area: "Galle",
      imagePath: "/asserts/futsal-4.jpg"
    },
  ];

  const filteredCourts = featuredCourts.filter(court => 
    selectedArea === "all" || court.area === selectedArea
  );

  const areas = ["Colombo", "Galle", "Dehiwala"];

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

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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
              {areas.map((area) => (
                <button
                  key={area}
                  onClick={() => setSelectedArea(area)}
                  className={`px-4 py-2 ${
                    selectedArea === area
                      ? 'bg-[#1C3F39] text-white'
                      : 'bg-transparent border border-gray-600 text-white hover:border-[#00FF29] hover:text-[#00FF29]'
                  } rounded-full transition-colors`}
                >
                  {area}
                </button>
              ))}
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
        >
          {isLoading ? (
            Array(8).fill(null).map((_, index) => (
              <CourtCardSkeleton key={index} />
            ))
          ) : (
            filteredCourts.map((court) => (
              <CourtCard
                key={court.id}
                id={court.id}
                name={court.name}
                location={court.location}
                imagePath={court.imagePath}
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
