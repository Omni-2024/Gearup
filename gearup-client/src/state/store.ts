import { proxy } from 'valtio';

interface UserState {
    user: {
        name: string;
        email: string;
        role: 'USER' | 'ADMIN';
        token: string;
    } | null;
    loading: boolean;
    error: string | null;
}

export const store = proxy<UserState>({
    user: null,
    loading: false,
    error: null,
});