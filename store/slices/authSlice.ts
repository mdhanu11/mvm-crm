// src/store/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Permission, Role } from '../../types/common.type';

interface AuthState {
    role: Role | null;
    full_name: string;
    permissions: Permission[];
    username: string;
}

const initialState: AuthState = {
    role: null,
    full_name: "User",
    username: "",
    permissions: []
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthState: (state, action: PayloadAction<Partial<AuthState>>) => {
            return {
                ...state,
                ...action.payload,
            };
        },
        logout: () => {
            return initialState;
        },
    },
});

export const { setAuthState, logout } = authSlice.actions;
export default authSlice.reducer;
