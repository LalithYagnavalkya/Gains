import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isAuthenticated: false,
        user: null,
        token: null,
    },
    reducers: {
        setAuth(state, action) {
            return {
                ...state,
                ...action.payload,
            };
        },
        logout(state) {
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                token: null,
            };
        },
    },
});

export const { setAuth, logout } = userSlice.actions;
export const selectAuth = (state: any) => state.auth;
export default userSlice.reducer;
