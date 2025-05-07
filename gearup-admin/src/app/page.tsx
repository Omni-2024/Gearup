'use client';
import { useSnapshot } from 'valtio';
import { store } from '@/state/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const snap = useSnapshot(store);
  const router = useRouter();

  useEffect(() => {
    if (!snap.user) {
      router.push('/login');
    }
  }, [snap.user, router]);

  if (!snap.user) return null;

  return (
      <div className="p-4">
        <h1 className="text-2xl">Welcome, {snap.user.name}</h1>
        <p>Role: {snap.user.role}</p>
      </div>
  );
}