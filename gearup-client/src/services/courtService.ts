import api from '@/lib/axios';
import type { Court } from '@/types';
import { tempCourts } from '@/data/tempCourtData';

// Using temporary data for development
export const fetchCourts = () => {
    // Return promise to maintain same interface as real API
    return Promise.resolve({ data: tempCourts });
};

export const fetchCourtById = (id: number) => api.get(`/courts/${id}`);

export const fetchAvailableSlots = (courtId: number, date: string) => 
  api.get(`/booking/courts/${courtId}/slots`, { params: { date } });

export const bookCourt = (data: {
  courtId: number;
  date: string;
  startTime: string;
  endTime: string;
}) => api.post('/booking/book', data);
