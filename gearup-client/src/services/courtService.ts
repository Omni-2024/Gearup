import api from '@/lib/axios';
import type { Court } from '@/types';

export const fetchCourts = () => api.get('/courts');

export const fetchCourtById = (id: number) => api.get(`/courts/${id}`);

export const fetchAvailableSlots = (courtId: number, date: string) => 
  api.get(`/booking/courts/${courtId}/slots`, { params: { date } });

export const bookCourt = (data: {
  courtId: number;
  date: string;
  startTime: string;
  endTime: string;
}) => api.post('/booking/book', data);
