import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../api/api.slice';

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState({
  isAuthenticated: false,
  user: null,
});

export const authSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      }),
      invalidatesTags: ['User'],
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
} = authSlice;