import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../api/api.slice';

import { loginResType } from './types'


const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState({
  isAuthenticated: false,
  user: null,
  token: null,
});

const authBackendRoute: string = '/auth'

export const authSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: authBackendRoute + '/login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      }),
      transformResponse: (res: loginResType) => {
        // return usersAdapter.setAll(initialState, { isAuthenticated: true, user: res.user, token: res.token })
        const { user, token } = res; // Extract necessary data
        return {
          ...initialState,
          isAuthenticated: true,
          user,
          token,
        };
        console.log("inside RTK ")
        console.log("inside RTK ",res)
        // return usersAdapter.setAll(initialState, res)
      },
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