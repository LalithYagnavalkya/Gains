import { createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../api/api.slice';

import { loginResType } from './types'
import { setAuth } from './user.slice';


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
        providesTags: ['Auth'],

        transformResponse: (res: loginResType, state: any) => {
          usersAdapter.setAll(initialState, { isAuthenticated: true, user: res.user, token: res.token })
        }
      }),
      async onCacheEntryAdded(
        arg,
        { dispatch, cacheDataLoaded, }
      ) {
        const authData = await cacheDataLoaded;
        if (authData && authData.data && !authData.data.error) {
          localStorage.setItem("currentUser", JSON.stringify({ user: authData.data.user, token: authData.data.token }));
          dispatch(setAuth({ isAuthenticated: true, user: authData.data.user, token: authData.data.token }));
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
      async onCacheEntryAdded(
        arg,
        { dispatch, cacheDataLoaded, }
      ) {
        const authData = await cacheDataLoaded;
        if (authData && authData.data && !authData.data.error) {
          localStorage.clear();
          dispatch(setAuth({ isAuthenticated: false, user: null, token: null }));
        }
      },
      invalidatesTags: ['Auth'],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
} = authSlice;