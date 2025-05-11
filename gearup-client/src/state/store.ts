import { proxy } from 'valtio';

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