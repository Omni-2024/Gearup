'use client';
import { useState } from 'react';
import { store } from '@/state/store';
import { useSnapshot } from 'valtio';
import { useRouter } from 'next/navigation';
import { login } from '@/services/authService';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const snap = useSnapshot(store);
    const router = useRouter();

    async function handleLogin() {
        store.loading = true;
        store.error = null;
        try {
            const res = await login(email, password);
            const { accessToken, user } = res.data;
            store.user = { ...user, token: accessToken };
            router.push('/');
        } catch (error: any) {
            store.error = error.response?.data?.message || 'Login failed';
        } finally {
            store.loading = false;
        }
    }

    return (
        <div className="p-4 max-w-md mx-auto">
            <h1 className="text-2xl mb-4">Login</h1>
            {snap.error && <p className="text-red-500">{snap.error}</p>}
            <input
                type="email"
                placeholder="Email"
                className="border p-2 w-full mb-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                className="border p-2 w-full mb-4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded" disabled={snap.loading}>
                {snap.loading ? 'Logging in...' : 'Login'}
            </button>
        </div>
    );
}