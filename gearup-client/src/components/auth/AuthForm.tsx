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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {type === 'login' ? 'Sign in to your account' : 'Create your account'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {type === 'login' ? (
              <>
                Or{' '}
                <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                  create a new account
                </Link>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                  Sign in
                </Link>
              </>
            )}
          </p>
        </div>

        {snap.error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-600">{snap.error}</p>
              </div>
            </div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {type === 'signup' && (
              <>
                <div>
                  <label htmlFor="name" className="sr-only">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="appearance-none rounded-t-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
              </>
            )}

            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className={`appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm ${type === 'login' ? 'rounded-t-md' : ''}`}
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            {type === 'signup' && (
              <>
                <div>
                  <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                </div>

                <div>
                  <label htmlFor="mobileNumber" className="sr-only">Mobile Number</label>
                  <input
                    id="mobileNumber"
                    name="mobileNumber"
                    type="tel"
                    required
                    className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Mobile Number"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                  />
                  {errors.mobileNumber && <p className="text-red-500 text-xs mt-1">{errors.mobileNumber}</p>}
                </div>

                <div>
                  <label htmlFor="location" className="sr-only">Location</label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    required
                    className="appearance-none rounded-b-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                  {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
                </div>
              </>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={snap.loading}
            >
              {snap.loading ? (
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
              ) : null}
              {snap.loading ? 'Processing...' : type === 'login' ? 'Sign in' : 'Create account'}
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

