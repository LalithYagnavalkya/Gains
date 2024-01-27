import { createEntityAdapter } from '@reduxjs/toolkit';
import { adminBaseAPI } from '../api/api.slice';

import { loginResType } from './types'
import { setAuth } from './user.slice';


const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState({
  isAuthenticated: false,
  user: null,
  token: null,
});

const authBackendRoute: string = '/auth'

export const authSlice = adminBaseAPI.injectEndpoints({
  endpoints: (builder: any) => ({
    login: builder.mutation({
      query: (credentials: any) => ({
        url: authBackendRoute + '/login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      }),
      transformResponse: (res: loginResType, state: any) => {
        localStorage.setItem("currentUser", JSON.stringify({ user: res.user, token: res.token }));
        return usersAdapter.setAll(initialState, { isAuthenticated: true, user: res.user, token: res.token })
      },
    //   async onCacheEntryAdded(
    //     arg: any,
    //     { dispatch, cacheDataLoaded }: { dispatch: any, cacheDataLoaded: any }
    //   ) {
    //     const authData = await cacheDataLoaded;
    //     if (authData && authData.data && !authData.data.error) {
    //       localStorage.setItem("currentUser", JSON.stringify({ user: authData.data.user, token: authData.data.token }));
    //       dispatch(setAuth({ isAuthenticated: true, user: authData.data.user, token: authData.data.token }));
    //     }
    //   },
    //   invalidatesTags: ['Auth'],


    }),
    logout: builder.mutation({
      query: () => ({
        url: authBackendRoute + '/logout',
        method: 'POST',
      }),
      async onCacheEntryAdded(
        arg: any,
        { dispatch, cacheDataLoaded }: { dispatch: any, cacheDataLoaded: any }
      ) {
        const authData = await cacheDataLoaded;
        if (authData && authData.data && !authData.data.error) {
          dispatch(setAuth({ isAuthenticated: false, user: null, token: null }));
        }
      },
      invalidatesTags: ['Auth'],
    }),
    forgotPassword: builder.mutation({
      query: (email: string) => ({
        url: authBackendRoute + '/forgotpassword',
        method: 'POST',
        body: email
      }),
    }),
    resetPassword: builder.mutation({
      query: (email: string) => ({
        url: authBackendRoute + '/resetPassword',
        method: 'POST',
        body: email
      }),
    })
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation
} = authSlice;