import { createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../api/api.slice';


const usersAdapter = createEntityAdapter();

const customerBackend: string = '/admin/customer'

export const customerSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCustomers: builder.query({
            query: (data) => ({
                url: customerBackend + '/getCustomers',
                method: 'GET',
                params: data,
                providesTags: ['Customers'],

                // transformResponse: (res, state: any) => {
                //     usersAdapter.setAll(initialState, { isAuthenticated: true, user: res.user, token: res.token })
                // }
            }),
          
        }),
    }),
});

export const {
    useGetCustomersQuery,
} = customerSlice;