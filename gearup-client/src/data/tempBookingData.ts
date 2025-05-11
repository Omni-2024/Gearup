import { addDays, format, parse } from 'date-fns';

// Generate time slots for a given date
const generateTimeSlots = (date: string) => {
  const slots = [];
  const startHour = 8; // 8 AM
  const endHour = 22; // 10 PM

  for (let hour = startHour; hour < endHour; hour++) {
    const isAvailable = Math.random() > 0.3; // 70% chance of being available
    slots.push({
      id: `${date}-${hour}`,
      startTime: `${hour.toString().padStart(2, '0')}:00`,
      endTime: `${(hour + 1).toString().padStart(2, '0')}:00`,
      isAvailable,
      price: Math.floor(Math.random() * (40 - 20 + 1) + 20), // Random price between $20-$40
    });
  }

  return slots;
};

// Mock API response delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API functions
export const mockFetchCourtById = async (id: string) => {
  await delay(800); // Simulate network delay
  
  // Get court from tempCourtData
  const court = {
    id,
    name: "Elite Sports Complex",
    location: "123 Sports Avenue, Downtown",
    imagePath: "/asserts/futsal-1.jpg",
    description: "Professional indoor futsal court with high-quality turf and modern amenities.",
    price: "$25/hr"
  };

  return { data: court };
};

export const mockFetchAvailableSlots = async (courtId: string, date: string) => {
  await delay(500); // Simulate network delay
  
  return { data: generateTimeSlots(date) };
};

export const mockBookCourt = async (bookingData: {
  courtId: string;
  date: string;
  startTime: string;
  endTime: string;
}) => {
  await delay(1000); // Simulate network delay
  
  // 90% chance of successful booking
  if (Math.random() > 0.1) {
    return { data: { success: true, bookingId: Math.random().toString(36).substring(7) } };
  } else {
    throw new Error('Booking failed. Please try again.');
  }
};
