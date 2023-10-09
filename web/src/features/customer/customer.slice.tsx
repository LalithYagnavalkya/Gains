import { createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../api/api.slice';


const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState({
    isAuthenticated: false,
    user: null,
    token: null,
});

const authBackendRoute: string = '/auth'

export const customerSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: authBackendRoute + '/login',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
                providesTags: ['Auth'],

                // transformResponse: (res, state: any) => {
                //     usersAdapter.setAll(initialState, { isAuthenticated: true, user: res.user, token: res.token })
                // }
            }),
          
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'POST',
            }),
            invalidatesTags: ['Auth'],
        }),
    }),
});

export const {
    useLoginMutation,
    useLogoutMutation,
} = customerSlice;