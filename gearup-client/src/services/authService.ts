import api from '@/lib/axios';

export const login = (email: string, password: string) =>
    api.post('/auth/login', { email, password });

export const refresh = () =>
    api.post('/auth/refresh');