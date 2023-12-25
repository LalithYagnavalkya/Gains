import { createEntityAdapter } from '@reduxjs/toolkit';
import { adminBaseAPI } from '../api/api.slice';
import { Transaction } from './types';

const dashbaordRoute: string = '/dashboard'

export const dashboardAPI = adminBaseAPI.injectEndpoints({
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
    useDashboardCustomerStatsQuery
} = dashboardAPI;