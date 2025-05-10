"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CourtCard } from "@/components/home/CourtCard";

const courts = [
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

export default function CourtsPage() {
  const [selectedArea, setSelectedArea] = useState("all");
  const areas = ["all", "Colombo", "Galle", "Dehiwala"];

  const filteredCourts = courts.filter(court => 
    selectedArea === "all" || court.area === selectedArea
  );

  return (
    <div className="min-h-screen bg-[#0D1F1D] py-20 px-4">
      <div className="container mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-white text-center mb-4"
        >
          All Courts
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-400 text-center mb-8"
        >
          Find and book your perfect court
        </motion.p>
        
        <div className="flex justify-center gap-2 mb-12">
          {areas.map((area, index) => (
            <motion.button
              key={area}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedArea(area)}
              className={`px-4 py-2 ${
                selectedArea === area
                  ? 'bg-[#1C3F39] text-white'
                  : 'bg-transparent border border-gray-600 text-white hover:border-[#00FF29] hover:text-[#00FF29]'
              } rounded-full transition-colors capitalize`}
            >
              {area}
            </motion.button>
          ))}
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredCourts.map((court) => (
              <motion.div
                key={court.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <CourtCard
                  id={court.id}
                  name={court.name}
                  location={court.location}
                  imagePath={court.imagePath}
                  price={court.price}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
