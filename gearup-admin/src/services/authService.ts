import api from '@/lib/axios';

export const login = (email: string, password: string) =>
    api.post('/auth/login', { email, password });

export const refresh = () =>
    api.post('/auth/refresh');


export async function requestPasswordReset(email: string): Promise<void> {
    // Replace with actual API call
    return new Promise((resolve, reject) => {
        // Simulate API call
        setTimeout(() => {
            // For demo purposes, always succeed
            resolve()
        }, 1000)
    })
}

export async function verifyOtp(email: string, otp: string): Promise<void> {
    // Replace with actual API call
    return new Promise((resolve, reject) => {
        // Simulate API call
        setTimeout(() => {
            // For demo purposes, accept any 6-digit OTP
            if (otp.length === 6 && /^\d+$/.test(otp)) {
                resolve()
            } else {
                reject({
                    response: {
                        data: {
                            message: "Invalid OTP. Please try again.",
                        },
                    },
                })
            }
        }, 1000)
    })
}

export async function resetPassword(email: string, otp: string, newPassword: string): Promise<void> {
    // Replace with actual API call
    return new Promise((resolve, reject) => {
        // Simulate API call
        setTimeout(() => {
            // For demo purposes, always succeed
            resolve()
        }, 1000)
    })
}