import { Court } from '@/types';

// Temporary courts data until API is ready
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

// Sample courts list for the courts page
export const tempCourts: Court[] = [
    {
        id: '1',
        name: 'Urban Futsal Arena',
        area: 'Colombo',
        location: 'Reid Avenue, Colombo 07',
        description: 'State-of-the-art indoor futsal facility with professional-grade turf',
        imagePath: '/asserts/futsal-1.jpg',
        price: '4500',
        rating: 4.8,
        galleryImages: [
            '/asserts/futsal-2.jpg',
            '/asserts/futsal-3.jpg',
            '/asserts/futsal-4.jpg'
        ],
    },
    {
        id: '2',
        name: 'Goal Master Futsal',
        area: 'Nugegoda',
        location: 'High Level Road, Nugegoda',
        description: 'Premier futsal venue with night playing facilities',
        imagePath: '/asserts/futsal-2.jpg',
        price: '3500',
        rating: 4.5,
        galleryImages: [
            '/asserts/futsal-1.jpg',
            '/asserts/futsal-3.jpg',
            '/asserts/futsal-4.jpg'
        ],
    },
    {
        id: '3',
        name: 'Champions Arena',
        area: 'Rajagiriya',
        location: 'Parliament Road, Rajagiriya',
        description: 'Modern futsal court with excellent facilities and parking',
        imagePath: '/asserts/futsal-3.jpg',
        price: '4000',
        rating: 4.7,
        galleryImages: [
            '/asserts/futsal-1.jpg',
            '/asserts/futsal-2.jpg',
            '/asserts/futsal-4.jpg'
        ],
    },
    {
        id: '4',
        name: 'Victory Grounds',
        area: 'Colombo',
        location: 'Marine Drive, Colombo 03',
        description: 'Beachside futsal court with amazing views and facilities',
        imagePath: '/asserts/futsal-4.jpg',
        price: '5000',
        rating: 4.9,
        galleryImages: [
            '/asserts/futsal-1.jpg',
            '/asserts/futsal-2.jpg',
            '/asserts/futsal-3.jpg'
        ],
    },
    {
        id: '5',
        name: 'Petta Futsal Center',
        area: 'Pettah',
        location: 'Main Street, Pettah',
        description: 'Convenient location with modern amenities',
        imagePath: '/asserts/futsal-1.jpg',
        price: '3000',
        rating: 4.3,
        galleryImages: [
            '/asserts/futsal-2.jpg',
            '/asserts/futsal-3.jpg',
            '/asserts/futsal-4.jpg'
        ],
    },
    {
        id: '6',
        name: 'Dehiwala Sports Hub',
        area: 'Dehiwala',
        location: 'Galle Road, Dehiwala',
        description: 'Family-friendly futsal facility with training programs',
        imagePath: '/asserts/futsal-2.jpg',
        price: '3800',
        rating: 4.6,
        galleryImages: [
            '/asserts/futsal-1.jpg',
            '/asserts/futsal-3.jpg',
            '/asserts/futsal-4.jpg'
        ],
    },
    {
        id: '7',
        name: 'Mount Futsal',
        area: 'Mount Lavinia',
        location: 'Hotel Road, Mount Lavinia',
        description: 'Beach view futsal court with professional lighting',
        imagePath: '/asserts/futsal-3.jpg',
        price: '4200',
        rating: 4.4,
        galleryImages: [
            '/asserts/futsal-1.jpg',
            '/asserts/futsal-2.jpg',
            '/asserts/futsal-4.jpg'
        ],
    },
    {
        id: '8',
        name: 'Battaramulla Arena',
        area: 'Battaramulla',
        location: 'Battaramulla South',
        description: 'Modern facility with covered court and refreshments',
        imagePath: '/asserts/futsal-4.jpg',
        price: '3700',
        rating: 4.5,
        galleryImages: [
            '/asserts/futsal-1.jpg',
            '/asserts/futsal-2.jpg',
            '/asserts/futsal-3.jpg'
        ],
    }
];
