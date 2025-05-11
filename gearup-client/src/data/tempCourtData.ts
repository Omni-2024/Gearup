// Temporary data until API is ready
export const courtData = {
  id: '1',
  name: 'Elite Sports Complex',
  mainImage: '/asserts/futsal-1.jpg',
  images: [
    '/asserts/futsal-1.jpg',
    '/asserts/futsal-2.jpg',
    '/asserts/futsal-3.jpg',
    '/asserts/futsal-4.jpg',
  ],
  rating: 4.8,
  type: 'Indoor Futsal',
  area: 'Downtown',
  price: '$25/hr',
  description: 'Elite Sports Complex offers state-of-the-art futsal facilities in the heart of the city. Our indoor court features professional-grade flooring and advanced lighting systems to ensure the best playing experience.',
  details: {
    size: '25m x 15m',
    surface: 'Professional Futsal Turf',
    indoor: true,
    lighting: true,
    changeRoom: true,
    parking: true
  },
  notes: [
    {
      title: 'Booking Policy',
      description: 'Minimum booking duration is 1 hour. Cancellations must be made at least 24 hours in advance for a full refund.'
    },
    {
      title: 'Equipment',
      description: 'Basic equipment (balls, bibs) available for rent. Players must bring their own indoor shoes.'
    }
  ],
  services: [
    {
      name: 'Equipment Rental',
      icon: 'soccer-ball',
      available: true
    },
    {
      name: 'Changing Rooms',
      icon: 'door',
      available: true
    },
    {
      name: 'Parking',
      icon: 'car',
      available: true
    },
    {
      name: 'Coaching',
      icon: 'whistle',
      available: false
    }
  ],
  reviews: [
    {
      id: '1',
      user: 'John Smith',
      rating: 5,
      date: '2025-05-01',
      comment: 'Excellent court with great facilities. The surface is perfect for futsal.',
      helpful: 12
    },
    {
      id: '2',
      user: 'Sarah Wilson',
      rating: 4,
      date: '2025-04-28',
      comment: 'Good location and well-maintained. Would recommend for casual games.',
      helpful: 8
    },
    {
      id: '3',
      user: 'Mike Johnson',
      rating: 5,
      date: '2025-04-25',
      comment: 'Best futsal court in the area. The lighting is perfect for evening games.',
      helpful: 15
    }
  ],
  averageRating: 4.8,
  totalReviews: 45
};
