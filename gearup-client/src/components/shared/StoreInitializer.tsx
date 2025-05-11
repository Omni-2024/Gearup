'use client';

import { useEffect } from 'react';
import { store } from '@/state/store';
import { subscribe } from '@/state/store';

export function StoreInitializer() {
  useEffect(() => {
    const storedUser = localStorage.getItem('gearup_user');
    if (storedUser) {
      store.user = JSON.parse(storedUser);
    }

    const unsubscribe = subscribe();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return null;
}
