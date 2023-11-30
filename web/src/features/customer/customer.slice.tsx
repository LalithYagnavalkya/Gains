import { createSlice } from '@reduxjs/toolkit';

const userJSON = localStorage.getItem("currentUser");
const user = userJSON ? JSON.parse(userJSON) : null;


const customoerSlice = createSlice({
    name: 'user',
    initialState: {
       isPaymentModalOpen: false,
    },
    reducers: {
        togglePaymentModal(state, action) {
            return {
                ...state,
                ...action.payload,
            };
        },
        logout(state) {
            localStorage.removeItem('currentUser')
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                token: null,
            };
        },
    },
});

export const { togglePaymentModal } = customoerSlice.actions;
export default customoerSlice.reducer;
