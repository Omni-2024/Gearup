'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { store } from '@/state/store';
import { useSnapshot } from 'valtio';
import Link from 'next/link';
import axios from 'axios';

interface AuthFormProps {
  type: 'login' | 'signup';
}

export const AuthForm = ({ type }: AuthFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobileNumber: '',
    location: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const snap = useSnapshot(store);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (type === 'signup') {
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm password';
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (!formData.mobileNumber) newErrors.mobileNumber = 'Mobile number is required';
      if (!formData.location) newErrors.location = 'Location is required';
    }

    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      store.loading = true;
      store.error = null;
      const res = type === 'login' 
        ? await login(formData.email, formData.password)
        : await signup(formData);
      
      const { accessToken, user } = res.data;
      store.user = { ...user, token: accessToken };
      router.push('/');
    } catch (error: any) {
      store.error = error.response?.data?.message || `${type === 'login' ? 'Login' : 'Registration'} failed`;
    } finally {
      store.loading = false;
    }
  };

  return (
    <div className="min-h-screen bg-[#02080D] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-white mb-2">
            {type === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-gray-400">
            {type === 'login' ? (
              <>
                New to Gearup?{' '}
                <Link href="/signup" className="font-medium text-[#00ff94] hover:text-[#00FF29] transition-colors">
                  Create an account
                </Link>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <Link href="/login" className="font-medium text-[#00ff94] hover:text-[#00FF29] transition-colors">
                  Sign in
                </Link>
              </>
            )}
          </p>
        </div>

        {snap.error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-500">{snap.error}</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-[#1C3F39] rounded-2xl shadow-2xl overflow-hidden p-8">
          <div className="space-y-5">
            {type === 'signup' && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-1">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none block w-full px-4 py-3 rounded-lg bg-[#0D1F1D] border border-[#2A4D47] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00FF29] focus:border-transparent transition-colors"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none block w-full px-4 py-3 rounded-lg bg-[#0D1F1D] border border-[#2A4D47] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00FF29] focus:border-transparent transition-colors"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none block w-full px-4 py-3 rounded-lg bg-[#0D1F1D] border border-[#2A4D47] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00FF29] focus:border-transparent transition-colors"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
            </div>

            {type === 'signup' && (
              <>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-200 mb-1">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    className="appearance-none block w-full px-4 py-3 rounded-lg bg-[#0D1F1D] border border-[#2A4D47] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00FF29] focus:border-transparent transition-colors"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
                </div>

                <div>
                  <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-200 mb-1">
                    Mobile Number
                  </label>
                  <input
                    id="mobileNumber"
                    name="mobileNumber"
                    type="tel"
                    required
                    className="appearance-none block w-full px-4 py-3 rounded-lg bg-[#0D1F1D] border border-[#2A4D47] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00FF29] focus:border-transparent transition-colors"
                    placeholder="+94 XX XXX XXXX"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                  />
                  {errors.mobileNumber && <p className="mt-1 text-sm text-red-500">{errors.mobileNumber}</p>}
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-200 mb-1">
                    Location
                  </label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    required
                    className="appearance-none block w-full px-4 py-3 rounded-lg bg-[#0D1F1D] border border-[#2A4D47] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00FF29] focus:border-transparent transition-colors"
                    placeholder="Your city"
                    value={formData.location}
                    onChange={handleChange}
                  />
                  {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location}</p>}
                </div>
              </>
            )}
          </div>

          <div className="mt-8">
            <button
              type="submit"
              disabled={snap.loading}
              className="w-full flex justify-center py-3 px-4 rounded-lg font-medium text-black bg-[#00FF29] hover:bg-[#00CC21] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00FF29] transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {snap.loading ? (
                <div className="flex items-center">
                  <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="ml-2">Processing...</span>
                </div>
              ) : (
                type === 'login' ? 'Sign in' : 'Create account'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

async function login(email: string, password: string) {
    // Temporary bypass for development
    if (email === 'aa@aa.com' && password === 'aa@aa.com') {
        return Promise.resolve({
            data: {
                accessToken: 'fake-token-for-development',
                user: {
                    id: '1',
                    name: 'Development User',
                    email: 'a@a.com',
                    mobileNumber: '1234567890',
                    location: 'Development Location'
                }
            }
        });
    }
    return axios.post('/api/auth/login', { email, password });
}

async function signup(formData: { name: string; email: string; password: string; confirmPassword: string; mobileNumber: string; location: string; }) {
    const { confirmPassword, ...signupData } = formData;
    return axios.post('/api/auth/signup', signupData);
}

