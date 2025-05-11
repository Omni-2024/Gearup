import api from '@/lib/axios';

interface SignupData {
  name: string;
  email: string;
  password: string;
  mobileNumber: string;
  location: string;
}

export const login = (email: string, password: string) =>
  api.post('/auth/login', { email, password });

export const signup = (data: SignupData) =>
  api.post('/auth/signup', data);

export const refresh = () =>
  api.post('/auth/refresh');

export const requestPasswordReset = (email: string) =>
  api.post('/auth/request-reset', { email });

export const verifyOtp = (email: string, otp: string) =>
  api.post('/auth/verify-otp', { email, otp });

export const resetPassword = (email: string, otp: string, newPassword: string) =>
  api.post('/auth/reset-password', { email, otp, newPassword });