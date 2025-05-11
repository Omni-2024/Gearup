export interface Court {
  id: string;
  name: string;
  type: 'Indoor' | 'Outdoor' | 'Covered';
  size: '5-a-side' | '7-a-side' | '11-a-side';
  location: string;
  area: string;
  price: string;
  description?: string;
  imagePath: string;
  rating?: number;
  galleryImages: string[];
  status: 'Available' | 'Booked' | 'Maintenance';
}

export interface Venue {
  id: string;
  name: string;
  location: string;
  area: string;
  courts: Court[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  token: string;
}

export interface Booking {
  id: string;
  courtId: string;
  userId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'Pending' | 'Confirmed' | 'Cancelled';
  paymentStatus: 'Paid' | 'Unpaid';
  amount: number;
}
