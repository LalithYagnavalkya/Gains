import { createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../api/api.slice';


const customerAdapter = createEntityAdapter();
const initialState = customerAdapter.getInitialState()
const customerBackend: string = '/admin/customer'


export const customerSlice = apiSlice.injectEndpoints({
    endpoints: (builder: any) => ({
        getCustomers: builder.query({
            query: (data: any) => ({
                url: customerBackend + '/getCustomers',
                method: 'GET',
                params: data,
                // providesTags: ['Customer'],

                transformResponse: (responseData: any, state: any) => {
                    console.log(responseData)
                    customerAdapter.setAll(initialState, responseData)
                },
                providesTags: (result: any, error: any, arg: any) => [
                    { type: 'Customer', id: "LIST" },
                    ...result.ids.map((id: any) => ({ type: 'Customer', id }))
                ]
            }),

        }),

        addCustomer: builder.mutation({
            query: (data: any) => ({
                url: customerBackend + '/addCustomer',
                method: 'POST',
                body: {
                    ...data,
                    // memberShipFee: Number(memberShiptFee)
                }
            }),
            invalidatesTags: [
                { type: 'Customer', id: "LIST" }
            ]
        }),

        checkIfUserNameOrPhoneExists: builder.query({
            query: (data: any) => ({
                url: customerBackend + '/checkIfUserNameOrPhoneExists',
                method: 'GET',
                params: data,
               
            }),

        }),
    }),
});

export const {
    useGetCustomersQuery,
    useAddCustomerMutation,
    useCheckIfUserNameOrPhoneExistsQuery,
} = customerSlice;