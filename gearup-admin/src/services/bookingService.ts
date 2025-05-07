import api from '@/lib/axios';

export const getAvailableSlots = (courtId: number, date: string) =>
    api.get(`/booking/courts/${courtId}/slots`, { params: { date } });

export const initiatePayment = (bookingData: any) =>
    api.post('/payment/initiate', bookingData);