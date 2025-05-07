import axios from 'axios';
import { store } from '@/state/store';
import {refresh} from "@/services/authService";

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const res = await refresh();
                const newAccessToken = res.data.accessToken;

                store.user!.token = newAccessToken;
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return instance(originalRequest);
            } catch (refreshError) {
                store.user = null;
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default instance;