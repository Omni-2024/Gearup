export interface Court {
  id: number;
  name: string;
  type: 'Indoor' | 'Outdoor' | 'Covered';
  size: '5-a-side' | '7-a-side' | '11-a-side';
  location: string;
  area: string;
  price: string;
  description?: string;
  imagePath: string;
  rating?: number;
  status: 'Available' | 'Booked' | 'Maintenance';
}

export interface Venue {
  id: number;
  name: string;
  location: string;
  area: string;
  courts: Court[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  token: string;
}

export interface Booking {
  id: string;
  courtId: number;
  userId: number;
  date: string;
  startTime: string;
  endTime: string;
  status: 'Pending' | 'Confirmed' | 'Cancelled';
  paymentStatus: 'Paid' | 'Unpaid';
  amount: number;
}
