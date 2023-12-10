import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const getAuthToken = () => {
    const storedData = localStorage.getItem('currentUser');
    if (storedData) {
        const currentUser = JSON.parse(storedData);
        const token = currentUser?.token;
        return token ? `Bearer ${token}` : '';
    }
    return '';
};

export const apiSlice: any = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000/api/v1',
        prepareHeaders: (headers) => {
            const token = getAuthToken();
            if (token) {
                headers.set('Authorization', token);
            }
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    tagTypes: ['Post', 'User', 'Auth', 'Customer','DashboardTransactions','DashboardCustomerStats'],
    endpoints: builder => ({})
})