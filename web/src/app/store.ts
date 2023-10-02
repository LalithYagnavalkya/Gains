import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { apiSlice } from '../features/api/api.slice';
import userSlice from "@/features/auth/user.slice";


const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: userSlice, // Include the authentication slice reducer
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
});