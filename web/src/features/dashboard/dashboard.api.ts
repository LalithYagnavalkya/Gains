import { createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../api/api.slice';
import { Transaction } from './types';

const dashbaordRoute: string = '/admin/dashboard'

export const dashboardAPI = apiSlice.injectEndpoints({
    endpoints: (builder: any) => ({
        getRecentTransactions: builder.query({
            query: () => ({
                url: dashbaordRoute + '/fetchDashboardTransactionsData',
                method: 'GET',

            }),
           
            providesTags: ['DashboardTransactions'],

        }),
        dashboardCustomerStats: builder.query({
            query: () => ({
                url: dashbaordRoute + '/dashboardCustomerStats',
                method: 'GET',

            }),
           
            providesTags: ['DashboardCustomerStats'],

        }),

    }),
});

export const {
    useGetRecentTransactionsQuery,
} = dashboardAPI;