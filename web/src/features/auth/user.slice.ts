import { createSlice } from '@reduxjs/toolkit';

const userJSON = localStorage.getItem("currentUser");
const user = userJSON ? JSON.parse(userJSON) : null;


const userSlice = createSlice({
    name: 'user',
    initialState: {
        isAuthenticated: user? true: false,
        user: user ? user.user : null,
        token: user? user.token: null,
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
