import { createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../api/api.slice';
import { Transaction } from './types';

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState({
    isAuthenticated: false,
    user: null,
    token: null,
});

const dashbaordRoute: string = '/admin/dashboard'

export const dashboardAPI = apiSlice.injectEndpoints({
    endpoints: (builder: any) => ({
        getRecentTransactions: builder.query({
            query: (credentials: any) => ({
                url: dashbaordRoute + '/getRecentTransactions',
                method: 'GET',
                
            }),
            transformResponse: (res: Transaction, state: any) => {
                console.log(res)
                // usersAdapter.setAll(initialState, { isAuthenticated: true, user: res.user, token: res.token })
            },
            providesTags: ['DashboardTransactions'],
           
        }),
       
    }),
});

export const {
    useGetRecentTransactionsQuery,
} = dashboardAPI;