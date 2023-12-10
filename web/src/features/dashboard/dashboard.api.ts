import { createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../api/api.slice';
import { Transaction } from './types';

const dashboardAdapter = createEntityAdapter();

const initialState = dashboardAdapter.getInitialState();

const dashbaordRoute: string = '/admin/dashboard'

export const dashboardAPI = apiSlice.injectEndpoints({
    endpoints: (builder: any) => ({
        getRecentTransactions: builder.query({
            query: (credentials: any) => ({
                url: dashbaordRoute + '/fetchDashboardTransactionsData',
                method: 'GET',

            }),
           
            providesTags: ['DashboardTransactions'],

        }),

    }),
});

export const {
    useGetRecentTransactionsQuery,
} = dashboardAPI;