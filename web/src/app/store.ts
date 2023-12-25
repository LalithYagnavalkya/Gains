import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authBaseAPI, adminBaseAPI } from '../features/api/api.slice';
import userSlice from "@/features/auth/user.slice";
import customerSlice from "@/features/customer/customer.slice";


const rootReducer = combineReducers({
    [authBaseAPI.reducerPath]: authBaseAPI.reducer,
    [adminBaseAPI.reducerPath]: adminBaseAPI.reducer,
    user: userSlice, // Include the authentication slice reducer
    customer: customerSlice,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(authBaseAPI.middleware, adminBaseAPI.middleware),
    devTools: true
});