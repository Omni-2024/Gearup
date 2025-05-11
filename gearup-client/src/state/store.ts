import { proxy } from 'valtio';
import { subscribeKey } from 'valtio/utils';

interface UserState {
    user: {
        id?: string;
        name: string;
        email: string;
        role: 'USER' | 'ADMIN';
        token: string;
        mobileNumber?: string;
        location?: string;
    } | null;
    loading: boolean;
    error: string | null;
}

export const store = proxy<UserState>({
    user: null,
    loading: false,
    error: null,
});

// Initialize store with localStorage data on client side only
if (typeof window !== 'undefined') {
    const storedUser = localStorage.getItem('gearup_user');
    if (storedUser) {
        store.user = JSON.parse(storedUser);
    }
}

// Subscribe to changes and update localStorage
const updateStorage = () => {
    if (typeof window === 'undefined') return;
    const user = store.user;
    if (user) {
        localStorage.setItem('gearup_user', JSON.stringify(user));
    } else {
        localStorage.removeItem('gearup_user');
    }
};

// Watch for user changes
export const subscribe = () => {
    if (typeof window === 'undefined') return;
    const unsubscribe = subscribeKey(store, 'user', updateStorage);
    return unsubscribe;
};